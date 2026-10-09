import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import worker, { SearchCoordinator } from "./index.ts";
import { ALLOWED_ORIGIN, clientHash } from "./http.ts";
import { dailyLimit, SearchLimitError, SearchQuota } from "./quota.ts";
import type { SearchEnv, SearchStorage } from "./runtime.ts";
import catalog from "./catalog.generated.json" with { type: "json" };

function storage() {
  const db = new DatabaseSync(":memory:");
  let alarm: number | undefined;
  const api: SearchStorage = {
    sql: {
      exec<T extends Record<string, unknown>>(
        query: string,
        ...bindings: (string | number | null)[]
      ) {
        const rows = db.prepare(query).all(...bindings) as T[];
        return { toArray: () => rows };
      },
    },
    transactionSync<T>(callback: () => T): T {
      db.exec("BEGIN");
      try {
        const value = callback();
        db.exec("COMMIT");
        return value;
      } catch (error) {
        db.exec("ROLLBACK");
        throw error;
      }
    },
    async setAlarm(time: number) {
      alarm = time;
    },
  };
  return { api, db, alarm: () => alarm };
}

function env(
  fetcher: (request: Request) => Promise<Response> = async () =>
    new Response("{}"),
): SearchEnv {
  return {
    TYPESAFE_API_KEY: "test-key",
    SEARCH_COORDINATOR: {
      idFromName: (name) => name,
      get: () => ({ fetch: fetcher }),
    },
  };
}

function request(
  path = "/search",
  method = "POST",
  body: unknown = { query: "upselling" },
  origin: string | null = ALLOWED_ORIGIN,
) {
  return new Request(`https://search.example${path}`, {
    method,
    headers: {
      ...(origin ? { Origin: origin } : {}),
      "Content-Type": "application/json",
      "CF-Connecting-IP": "203.0.113.9",
    },
    ...(method === "GET" || method === "OPTIONS"
      ? {}
      : { body: JSON.stringify(body) }),
  });
}

test("only the approved origin, exact routes and supported methods reach the coordinator", async () => {
  let calls = 0;
  const bindings = env(async () => {
    calls++;
    return new Response("{}");
  });
  for (const invalid of [
    request("/search", "POST", {}, null),
    request("/search", "POST", {}, "https://other.example"),
    request("/search?extra=1"),
    request("/search/"),
    request("/unknown"),
    request("/search", "GET"),
    request("/search/status", "POST"),
  ]) {
    assert.ok(
      [403, 404, 405].includes((await worker.fetch(invalid, bindings)).status),
    );
  }
  assert.equal(calls, 0);
  const denied = await worker.fetch(
    request("/search", "POST", {}, "https://other.example"),
    bindings,
  );
  assert.equal(denied.headers.get("Access-Control-Allow-Origin"), null);
  const status = await worker.fetch(request("/search/status", "GET"), bindings);
  assert.deepEqual(await status.json(), {
    configured: true,
    model: "jev-latest",
  });
  assert.equal(
    status.headers.get("Access-Control-Allow-Origin"),
    ALLOWED_ORIGIN,
  );
  const preflight = request("/search", "OPTIONS");
  preflight.headers.set("Access-Control-Request-Method", "POST");
  preflight.headers.set("Access-Control-Request-Headers", "content-type");
  assert.equal((await worker.fetch(preflight, bindings)).status, 204);
  preflight.headers.set("Access-Control-Request-Headers", "authorization");
  assert.equal((await worker.fetch(preflight, bindings)).status, 403);
});

test("body size, query-only input and secret-free trusted forwarding", async () => {
  const received: Request[] = [];
  const bindings = env(async (incoming) => {
    received.push(incoming);
    return new Response("{}");
  });
  for (const [body, status] of [
    [{ query: "ok", candidates: [] }, 400],
    [{ query: "a".repeat(301) }, 400],
    [{ query: " " }, 400],
    [{ query: "a".repeat(5000) }, 413],
  ] as const)
    assert.equal(
      (await worker.fetch(request("/search", "POST", body), bindings)).status,
      status,
    );
  const wrongType = request();
  wrongType.headers.set("Content-Type", "text/plain");
  assert.equal((await worker.fetch(wrongType, bindings)).status, 415);
  const missingIP = request();
  missingIP.headers.delete("CF-Connecting-IP");
  assert.equal((await worker.fetch(missingIP, bindings)).status, 403);
  assert.equal(received.length, 0);
  const valid = request("/search", "POST", { query: "  higher  tier plans " });
  valid.headers.set("X-Search-Client", "attacker-controlled");
  valid.headers.set("Authorization", "caller-secret");
  assert.equal((await worker.fetch(valid, bindings)).status, 200);
  assert.deepEqual(await received[0].json(), { query: "higher tier plans" });
  assert.match(received[0].headers.get("X-Search-Client")!, /^[a-f0-9]{64}$/);
  assert.equal(received[0].headers.get("Authorization"), null);
  assert.equal(received[0].headers.get("CF-Connecting-IP"), null);
  assert.equal(received[0].headers.get("Origin"), null);
});

test("daily pseudonyms rotate and invalid budget settings fail closed", () => {
  const a = clientHash("203.0.113.9", "first-secret", 0);
  assert.notEqual(a, clientHash("203.0.113.9", "first-secret", 86_400_000));
  assert.notEqual(a, clientHash("203.0.113.9", "second-secret", 0));
  assert.equal(dailyLimit(), 100);
  assert.equal(dailyLimit("1"), 1);
  assert.equal(dailyLimit("1000"), 1000);
  for (const invalid of ["", "0", "-1", "1.5", "1001", "Infinity"])
    assert.throws(() => dailyLimit(invalid));
});

test("global API attempt budget survives a new coordinator and resets at UTC midnight", () => {
  const fixture = storage();
  const first = new SearchQuota(fixture.api, 2);
  first.reserveUpstream(1000);
  first.reserveUpstream(2000);
  const reloaded = new SearchQuota(fixture.api, 2);
  assert.throws(
    () => reloaded.reserveUpstream(3000),
    (error) =>
      error instanceof SearchLimitError && error.code === "daily_limit",
  );
  assert.equal(
    fixture.db.prepare("SELECT count FROM counters").get()!.count,
    2,
  );
  reloaded.reserveUpstream(86_400_000);
  assert.equal(
    fixture.db.prepare("SELECT count(*) AS count FROM counters").get()!.count,
    1,
  );
  fixture.db.close();
});

test("client quotas persist independently, with bounded expiry and no identifying data", () => {
  const fixture = storage();
  const quota = new SearchQuota(fixture.api, 100);
  const client = "a".repeat(64);
  for (let minute = 0; minute < 5; minute++) {
    for (let n = 0; n < 6; n++) quota.admitClient(client, minute * 60_000);
    assert.throws(
      () => quota.admitClient(client, minute * 60_000),
      (error) =>
        error instanceof SearchLimitError && error.code === "client_rate_limit",
    );
  }
  assert.throws(
    () => new SearchQuota(fixture.api, 100).admitClient(client, 300_000),
    (error) =>
      error instanceof SearchLimitError && error.code === "client_daily_limit",
  );
  quota.admitClient("b".repeat(64), 300_000);
  const rows = fixture.db.prepare("SELECT * FROM counters").all();
  assert.ok(
    rows.every(
      (row) => Object.keys(row).sort().join(",") === "count,expires_at,key",
    ),
  );
  assert.ok(rows.every((row) => Number(row.expires_at) <= 86_400_000));
  quota.cleanup(86_400_000);
  assert.equal(
    fixture.db.prepare("SELECT count(*) AS count FROM counters").get()!.count,
    0,
  );
  fixture.db.close();
});

test("every upstream retry consumes budget and cannot overrun the global cap", async () => {
  const fixture = storage();
  const originalFetch = globalThis.fetch;
  let externalCalls = 0;
  globalThis.fetch = async () => {
    externalCalls++;
    return new Response("{}", { status: 429, headers: { "Retry-After": "0" } });
  };
  try {
    const coordinator = new SearchCoordinator(
      { storage: fixture.api },
      { ...env(), DAILY_UPSTREAM_LIMIT: "2" },
    );
    const incoming = request();
    incoming.headers.set("X-Search-Client", "a".repeat(64));
    const response = await coordinator.fetch(incoming);
    assert.equal(response.status, 429);
    assert.equal(
      ((await response.json()) as { code: string }).code,
      "daily_limit",
    );
    assert.equal(externalCalls, 2);
    assert.ok(Number(response.headers.get("Retry-After")) > 0);
    assert.ok(fixture.alarm());
    const fresh = new SearchCoordinator(
      { storage: fixture.api },
      { ...env(), DAILY_UPSTREAM_LIMIT: "2" },
    );
    const again = request();
    again.headers.set("X-Search-Client", "b".repeat(64));
    assert.equal((await fresh.fetch(again)).status, 429);
    assert.equal(externalCalls, 2);
  } finally {
    globalThis.fetch = originalFetch;
    fixture.db.close();
  }
});

test("only public catalog metadata reaches Jev; duplicate/cache hits do not spend more budget", async () => {
  const fixture = storage();
  const originalFetch = globalThis.fetch;
  let calls = 0;
  let release: (() => void) | undefined;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  globalThis.fetch = async (_url, init) => {
    calls++;
    const body = JSON.parse(String(init?.body));
    assert.deepEqual(body.state.catalog, catalog);
    assert.ok(
      body.state.catalog.every(
        (entry: Record<string, unknown>) =>
          Object.keys(entry).sort().join(",") ===
          "focus,format,goals,id,mechanisms,sourceName,summary,title,type",
      ),
    );
    await held;
    return Response.json({
      model: "jev-test",
      answers: Object.fromEntries(
        catalog.map((_, index) => [
          `match_${index}`,
          { type: "noul", noul: 0.9 },
        ]),
      ),
      usage: { input_tokens: 1, output_tokens: 1 },
    });
  };
  try {
    const coordinator = new SearchCoordinator({ storage: fixture.api }, env());
    function incoming(query = "upselling") {
      const req = request("/search", "POST", { query });
      req.headers.set("X-Search-Client", "a".repeat(64));
      return req;
    }
    const first = coordinator.fetch(incoming());
    await new Promise((resolve) => setImmediate(resolve));
    const duplicate = coordinator.fetch(incoming());
    const busy = await coordinator.fetch(incoming("another query"));
    assert.equal(busy.status, 409);
    release!();
    assert.equal((await first).status, 200);
    assert.equal((await duplicate).status, 200);
    assert.equal((await coordinator.fetch(incoming())).status, 200);
    assert.equal(calls, 1);
    assert.equal(
      fixture.db
        .prepare("SELECT count FROM counters WHERE key LIKE 'upstream:%'")
        .get()!.count,
      1,
    );
    assert.ok(
      fixture.db
        .prepare("SELECT key FROM counters")
        .all()
        .every((row) => !String(row.key).includes("upselling")),
    );
  } finally {
    globalThis.fetch = originalFetch;
    fixture.db.close();
  }
});

test("generated deployed catalog matches the current public registry projection", async () => {
  const bundled = await build({
    stdin: {
      contents:
        'import { experiments } from "./src/experiments/registry.ts"; import { buildSearchCatalog } from "./src/search/catalog.ts"; export default buildSearchCatalog(experiments);',
      resolveDir: fileURLToPath(new URL("../../", import.meta.url)),
      loader: "ts",
    },
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
  });
  const { default: current } = await import(
    `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`
  );
  assert.deepEqual(catalog, current);
  assert.equal(catalog.length, 28);
  for (const id of [
    "tally-referral-reward",
    "tally-plan-comparison",
    "tally-custom-domain-gate",
    "tally-office-hours",
    "tally-review-request",
  ]) {
    assert.ok(
      catalog.some((entry) => entry.id === id),
      `Missing Tally experiment in the deployed search catalog: ${id}`,
    );
  }
  assert.equal(
    catalog.some((entry) => entry.id === "el-balance-context-upgrade"),
    false,
  );
});
