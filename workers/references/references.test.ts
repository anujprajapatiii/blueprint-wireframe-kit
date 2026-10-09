import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker, { handleRequest, safeReturnTo, type Env } from "./index.ts";
import privatePaths from "./allowlist.json" with { type: "json" };
import sitePaths from "./site-allowlist.json" with { type: "json" };

const origin = "https://blueprint-private-references.example";
const base = "/blueprint-wireframe-kit/";
const privatePath = `${base}__private-references/cloudflare/06-containers-gate.jpg`;
const password = "test-only-password-not-a-real-credential";
const image = new Uint8Array([255, 216, 255, 224, 10, 20, 30, 255, 217]);
const now = 1801728000000;
const scriptPath = sitePaths.find((path) => path.endsWith(".js"))!;
const videoPath = sitePaths.find((path) => path.endsWith(".mp4"))!;

function fixture() {
  const assetCalls: Request[] = [];
  const rateKeys: string[] = [];
  const searchCalls: Request[] = [];
  const env: Required<Env> = {
    REFERENCE_PASSWORD_SHA256: createHash("sha256")
      .update(password)
      .digest("hex"),
    SESSION_SECRET: "test-only-signing-secret-with-at-least-32-characters",
    PRIVATE_ASSETS: {
      async fetch(request) {
        assetCalls.push(request);
        const path = new URL(request.url).pathname;
        const body = path.includes("__private-references")
          ? image
          : path.endsWith(".mp4")
            ? "test video"
            : path.endsWith(".js")
              ? "test script"
              : "test app index";
        const type = path.includes("__private-references")
          ? "image/jpeg"
          : path.endsWith(".mp4")
            ? "video/mp4"
            : path.endsWith(".js")
              ? "text/javascript"
              : "text/html";
        return new Response(request.method === "HEAD" ? null : body, {
          headers: {
            "Content-Type": type,
            "Content-Length": String(
              typeof body === "string" ? body.length : body.length,
            ),
            "Cache-Control": "public, max-age=31536000",
            ETag: "must-not-leak",
          },
        });
      },
    },
    LOGIN_LIMITER: {
      async limit({ key }) {
        rateKeys.push(key);
        return { success: true };
      },
    },
    SEARCH_SERVICE: {
      async fetch(request) {
        searchCalls.push(request);
        return Response.json({ matches: [] });
      },
    },
  };
  return { env, assetCalls, rateKeys, searchCalls };
}
function request(
  path: string,
  cookie?: string,
  method = "GET",
  extraHeaders: HeadersInit = {},
) {
  return new Request(`${origin}${path}`, {
    method,
    headers: { ...(cookie ? { Cookie: cookie } : {}), ...extraHeaders },
  });
}
function loginRequest(
  value = password,
  returnTo = base,
  headers: HeadersInit = {},
) {
  return new Request(`${origin}/session`, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/x-www-form-urlencoded",
      "CF-Connecting-IP": "192.0.2.1",
      ...headers,
    },
    body: new URLSearchParams({ password: value, returnTo }),
  });
}
async function login(env: Env, time = now, returnTo = base) {
  const response = await handleRequest(
    loginRequest(password, returnTo),
    env,
    time,
  );
  assert.equal(response.status, 303);
  const cookie = response.headers.get("Set-Cookie")!;
  assert.match(
    cookie,
    /^__Host-blueprint-access=[A-Za-z0-9_-]{76}; HttpOnly; Secure; SameSite=Lax; Path=\/; Max-Age=3600$/,
  );
  return { cookie: cookie.split(";")[0], response };
}

test("the private allowlist contains only the 59 reviewed JPEGs", () => {
  assert.equal(privatePaths.length, 59);
  assert.equal(new Set(privatePaths).size, 59);
  assert.equal(
    privatePaths.filter((path) => path.includes("/cloudflare/")).length,
    13,
  );
  assert.equal(
    privatePaths.filter((path) => path.includes("/elevenlabs/")).length,
    38,
  );
  assert.equal(
    privatePaths.filter((path) => path.includes("/tally/")).length,
    8,
  );
  assert.ok(
    privatePaths.every((path) =>
      /^\/blueprint-wireframe-kit\/__private-references\/(cloudflare|elevenlabs|tally)\/\d{2}-[a-z0-9-]+\.jpg$/.test(
        path,
      ),
    ),
  );
  assert.ok(sitePaths.includes(`${base}index.html`));
  assert.ok(scriptPath && videoPath);
  assert.ok(!sitePaths.some((path) => path.includes("__private-references")));
});

test("every unauthenticated URL returns only the inline login page without accessing assets or search", async () => {
  const { env, assetCalls, searchCalls } = fixture();
  for (const path of [
    "/",
    base,
    `${base}?view=experiments`,
    scriptPath,
    videoPath,
    privatePath,
    `${base}__private-references/tally/01-referral-invite.jpg`,
    "/unknown",
    "/assets/cloudflare/06-containers-gate.jpg",
    "/search/status",
  ]) {
    const response = await handleRequest(request(path), env, now);
    assert.equal(response.status, 401, path);
    assert.match(response.headers.get("Content-Type")!, /text\/html/);
    assert.equal(response.headers.get("Cache-Control"), "private, no-store");
    const markup = await response.text();
    assert.match(markup, /Unlock Blueprint/);
    assert.match(markup, /Unlock website/);
    assert.doesNotMatch(
      markup,
      /<script|test app index|test script|test video/,
    );
  }
  const head = await handleRequest(
    request(privatePath, undefined, "HEAD"),
    env,
    now,
  );
  assert.equal(head.status, 401);
  assert.equal((await head.arrayBuffer()).byteLength, 0);
  assert.equal(assetCalls.length, 0);
  assert.equal(searchCalls.length, 0);
});

test("successful form login sets a one-hour HttpOnly host cookie and preserves the requested view", async () => {
  const { env, rateKeys } = fixture();
  const destination = `${base}?view=experiments&experiment=cf-containers-gate&mode=reference`;
  const { cookie, response } = await login(env, now, destination);
  assert.equal(response.headers.get("Location"), destination);
  assert.deepEqual(rateKeys, ["login:192.0.2.1"]);
  assert.equal(await response.text(), "");
  assert.ok(cookie.length > 76);
});

test("wrong-password feedback never reflects the submitted password", async () => {
  const { env, assetCalls } = fixture();
  const response = await handleRequest(
    loginRequest("private-wrong-password-123"),
    env,
    now,
  );
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("Set-Cookie"), null);
  const markup = await response.text();
  assert.match(markup, /password isn’t correct/);
  assert.doesNotMatch(markup, /private-wrong-password-123/);
  assert.equal(assetCalls.length, 0);
});

test("login and logout reject cross-origin or missing-origin submissions", async () => {
  const { env } = fixture();
  for (const badOrigin of [
    "https://evil.example",
    `${origin}.evil.example`,
    "null",
    "",
  ]) {
    assert.equal(
      (
        await handleRequest(
          loginRequest(password, base, { Origin: badOrigin }),
          env,
          now,
        )
      ).status,
      403,
    );
    assert.equal(
      (
        await handleRequest(
          request("/logout", undefined, "POST", { Origin: badOrigin }),
          env,
          now,
        )
      ).status,
      403,
    );
  }
  const { cookie } = await login(env);
  const response = await handleRequest(
    request("/logout", cookie, "POST", { Origin: origin }),
    env,
    now,
  );
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("Location"), base);
  assert.match(
    response.headers.get("Set-Cookie")!,
    /__Host-blueprint-access=; HttpOnly; Secure; SameSite=Lax; Path=\/; Max-Age=0/,
  );
});

test("returnTo rejects external, scheme-relative, backslash and traversing redirects", async () => {
  const { env } = fixture();
  for (const value of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    `${base}../../evil`,
    `${base}%2e%2e/%2e%2e/evil`,
    `${base}\\evil`,
    `${base}\r\nLocation: https://evil.example`,
    "/search",
  ]) {
    assert.equal(safeReturnTo(value, origin), base, value);
    const { response } = await login(env, now, value);
    assert.equal(response.headers.get("Location"), base);
  }
  assert.equal(
    safeReturnTo(`${base}?view=experiments`, origin),
    `${base}?view=experiments`,
  );
});

test("valid cookies serve byte-identical originals and app routes while stripping sensitive request headers", async () => {
  const { env, assetCalls } = fixture();
  const { cookie } = await login(env);
  const imageRequest = request(privatePath, cookie, "GET", {
    Authorization: "Bearer should-not-forward",
    "If-None-Match": "must-not-leak",
  });
  const imageResponse = await handleRequest(imageRequest, env, now);
  assert.equal(imageResponse.status, 200);
  assert.deepEqual(new Uint8Array(await imageResponse.arrayBuffer()), image);
  assert.equal(imageResponse.headers.get("Cache-Control"), "private, no-store");
  assert.equal(imageResponse.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(imageResponse.headers.get("Referrer-Policy"), "no-referrer");
  assert.equal(imageResponse.headers.get("ETag"), null);
  assert.deepEqual([...assetCalls[0].headers], []);
  const appResponse = await handleRequest(
    request(`${base}?view=experiments`, cookie),
    env,
    now,
  );
  assert.equal(await appResponse.text(), "test app index");
  assert.equal(
    assetCalls[1].url,
    `https://private-assets.invalid${base}index.html`,
  );
  assert.equal(
    appResponse.headers.get("Content-Security-Policy"),
    "frame-ancestors 'self'",
  );
  assert.equal(
    await (
      await handleRequest(request(`${scriptPath}?v=1`, cookie), env, now)
    ).text(),
    "test script",
  );
  const head = await handleRequest(
    request(privatePath, cookie, "HEAD"),
    env,
    now,
  );
  assert.equal(head.status, 200);
  assert.equal((await head.arrayBuffer()).byteLength, 0);
  assert.equal(head.headers.get("Content-Length"), String(image.length));
});

test("video ranges work only after authentication and retain no-store headers", async () => {
  const { env, assetCalls } = fixture();
  const { cookie } = await login(env);
  env.PRIVATE_ASSETS = {
    async fetch(req) {
      assetCalls.push(req);
      return new Response("clip", {
        status: 206,
        headers: {
          "Content-Type": "video/mp4",
          "Content-Range": "bytes 0-3/100",
          "Accept-Ranges": "bytes",
          "Content-Length": "4",
        },
      });
    },
  };
  const response = await handleRequest(
    request(videoPath, cookie, "GET", {
      Range: "bytes=0-3",
      "If-Range": "test-version",
      Cookie: cookie,
    }),
    env,
    now,
  );
  assert.equal(response.status, 206);
  assert.equal(await response.text(), "clip");
  assert.equal(response.headers.get("Content-Range"), "bytes 0-3/100");
  assert.equal(response.headers.get("Accept-Ranges"), "bytes");
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.deepEqual(
    [...assetCalls[0].headers],
    [
      ["if-range", "test-version"],
      ["range", "bytes=0-3"],
    ],
  );
});

test("expired, tampered, duplicate and bearer-only sessions are denied", async () => {
  const { env, assetCalls } = fixture();
  const { cookie } = await login(env);
  assert.equal(
    (await handleRequest(request(base, cookie), env, now + 3_600_000)).status,
    401,
  );
  const tampered = `${cookie.slice(0, -1)}${cookie.endsWith("A") ? "B" : "A"}`;
  assert.equal(
    (await handleRequest(request(base, tampered), env, now)).status,
    401,
  );
  assert.equal(
    (await handleRequest(request(base, `${cookie}; ${cookie}`), env, now))
      .status,
    401,
  );
  assert.equal(
    (
      await handleRequest(
        request(base, undefined, "GET", {
          Authorization: `Bearer ${cookie.split("=")[1]}`,
        }),
        env,
        now,
      )
    ).status,
    401,
  );
  assert.equal(assetCalls.length, 0);
});

test("rotating either secret revokes sessions and missing configuration fails closed", async () => {
  const { env, assetCalls } = fixture();
  const { cookie } = await login(env);
  for (const changed of [
    { ...env, SESSION_SECRET: `${env.SESSION_SECRET}-rotated` },
    { ...env, REFERENCE_PASSWORD_SHA256: "a".repeat(64) },
  ])
    assert.equal(
      (await handleRequest(request(base, cookie), changed, now)).status,
      401,
    );
  for (const missing of [
    "REFERENCE_PASSWORD_SHA256",
    "SESSION_SECRET",
    "PRIVATE_ASSETS",
    "LOGIN_LIMITER",
  ] as const) {
    const broken: Env = { ...env };
    delete broken[missing];
    assert.equal(
      (await handleRequest(request(base, cookie), broken, now)).status,
      503,
    );
  }
  assert.equal(
    (
      await handleRequest(
        request(base, cookie),
        { ...env, SESSION_SECRET: "weak" },
        now,
      )
    ).status,
    503,
  );
  assert.equal(assetCalls.length, 0);
});

test("authenticated root redirects and unknown, encoded, traversing or auxiliary paths never reach assets", async () => {
  const { env, assetCalls } = fixture();
  const { cookie } = await login(env);
  const response = await handleRequest(
    request("/?view=experiments", cookie),
    env,
    now,
  );
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("Location"), `${base}?view=experiments`);
  for (const path of [
    "/unknown",
    `${base}__private-references/cloudflare/provenance.json`,
    `${base}__private-references/elevenlabs/elevenlabs-growth-patterns-evidence.zip`,
    `${base}__private-references/cloudflare/%30%36-containers-gate.jpg`,
    `${base}__private-references/../../source-files.json`,
    "/assets/cloudflare/06-containers-gate.jpg",
  ])
    assert.equal(
      (await handleRequest(request(path, cookie), env, now)).status,
      404,
      path,
    );
  assert.equal(assetCalls.length, 0);
});

test("login throttling and the 2KB streamed body cap fail closed", async () => {
  const { env } = fixture();
  assert.equal(
    (await handleRequest(loginRequest("x".repeat(2100)), env, now)).status,
    413,
  );
  assert.equal(
    (
      await handleRequest(
        loginRequest(password, base, { "Content-Length": "9999" }),
        env,
        now,
      )
    ).status,
    413,
  );
  assert.equal(
    (
      await handleRequest(
        loginRequest(password, base, { "Content-Type": "application/json" }),
        env,
        now,
      )
    ).status,
    415,
  );
  env.LOGIN_LIMITER = {
    async limit() {
      return { success: false };
    },
  };
  const response = await handleRequest(loginRequest(), env, now);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
  env.LOGIN_LIMITER = {
    async limit() {
      throw new Error("failure");
    },
  };
  assert.equal((await handleRequest(loginRequest(), env, now)).status, 503);
});

test("search is authenticated, same-origin, bounded and proxied only over the service binding", async () => {
  const { env, searchCalls } = fixture();
  const { cookie } = await login(env);
  const search = (value: string, headers: HeadersInit = {}) =>
    new Request(`${origin}/search`, {
      method: "POST",
      headers: {
        Cookie: cookie,
        Origin: origin,
        "Content-Type": "application/json",
        "CF-Connecting-IP": "192.0.2.1",
        ...headers,
      },
      body: value,
    });
  assert.equal(
    (
      await handleRequest(
        search('{"query":"events"}', { Cookie: "" }),
        env,
        now,
      )
    ).status,
    401,
  );
  assert.equal(searchCalls.length, 0);
  assert.equal(
    (
      await handleRequest(
        search('{"query":"events"}', { Origin: "https://evil.example" }),
        env,
        now,
      )
    ).status,
    403,
  );
  assert.equal(
    (await handleRequest(search("x".repeat(3073)), env, now)).status,
    413,
  );
  const result = await handleRequest(search('{"query":"events"}'), env, now);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("Cache-Control"), "private, no-store");
  assert.equal(searchCalls[0].url, "https://search-service.invalid/search");
  assert.deepEqual(
    [...searchCalls[0].headers],
    [
      ["cf-connecting-ip", "192.0.2.1"],
      ["content-type", "application/json"],
      ["origin", "https://anujprajapatiii.github.io"],
    ],
  );
  assert.equal(await searchCalls[0].text(), '{"query":"events"}');
  assert.equal(
    (await handleRequest(request("/search/status", cookie), env, now)).status,
    200,
  );
  const noSearch = { ...env, SEARCH_SERVICE: undefined };
  assert.equal(
    (await handleRequest(request("/search/status", cookie), noSearch, now))
      .status,
    503,
  );
  assert.equal(
    (await handleRequest(request(base, cookie), noSearch, now)).status,
    200,
  );
});

test("binding redirects and failures cannot expose alternate resources", async () => {
  const { env } = fixture();
  const { cookie } = await login(env);
  env.PRIVATE_ASSETS = {
    async fetch() {
      return new Response(null, {
        status: 302,
        headers: { Location: "https://evil.example" },
      });
    },
  };
  const redirected = await handleRequest(request(base, cookie), env, now);
  assert.equal(redirected.status, 503);
  assert.equal(redirected.headers.get("Location"), null);
  env.PRIVATE_ASSETS = {
    async fetch() {
      throw new Error("failure");
    },
  };
  assert.equal(
    (await handleRequest(request(base, cookie), env, now)).status,
    503,
  );
});

test("deployment always authorizes before assets, disables previews/logs, and binds private search", async () => {
  const config = await readFile(
    new URL("./wrangler.toml", import.meta.url),
    "utf8",
  );
  assert.match(config, /run_worker_first\s*=\s*true/);
  assert.match(config, /preview_urls\s*=\s*false/);
  assert.match(config, /\[observability\]\s*enabled\s*=\s*false/);
  assert.match(
    config,
    /\[ratelimits\.simple\]\s*limit\s*=\s*5\s*period\s*=\s*60/,
  );
  assert.match(
    config,
    /binding\s*=\s*"SEARCH_SERVICE"\s*service\s*=\s*"blueprint-jev-search"/,
  );
});

test("Worker entry point handles runtime context separately from the clock", async () => {
  const { env } = fixture();
  const response = await Reflect.apply(worker.fetch, null, [
    loginRequest(),
    env,
    { waitUntil() {} },
  ]);
  assert.equal(response.status, 303);
});

test("HTTP upgrades before showing login, while loopback remains available for local review", async () => {
  const { env, assetCalls } = fixture();
  const response = await handleRequest(
    new Request(
      `http://blueprint-private-references.example${base}?view=experiments`,
    ),
    env,
    now,
  );
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("Location"),
    `${origin}${base}?view=experiments`,
  );
  assert.equal(await response.text(), "");
  assert.equal(
    (await handleRequest(new Request(`http://127.0.0.1:8787${base}`), env, now))
      .status,
    401,
  );
  assert.equal(assetCalls.length, 0);
});

test("HTML keeps same-origin form Origin headers without leaking external referrers", async () => {
  const { env } = fixture();
  assert.equal(
    (await handleRequest(request(base), env, now)).headers.get(
      "Referrer-Policy",
    ),
    "same-origin",
  );
  const { cookie } = await login(env);
  assert.equal(
    (await handleRequest(request(base, cookie), env, now)).headers.get(
      "Referrer-Policy",
    ),
    "same-origin",
  );
  assert.equal(
    (await handleRequest(request(privatePath, cookie), env, now)).headers.get(
      "Referrer-Policy",
    ),
    "no-referrer",
  );
});
