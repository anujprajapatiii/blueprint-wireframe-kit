import privatePaths from "./allowlist.json" with { type: "json" };
import sitePaths from "./site-allowlist.json" with { type: "json" };

interface AssetBinding {
  fetch(request: Request): Promise<Response>;
}
interface LoginLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}
export interface Env {
  REFERENCE_PASSWORD_SHA256?: string;
  SESSION_SECRET?: string;
  PRIVATE_ASSETS?: AssetBinding;
  LOGIN_LIMITER?: LoginLimiter;
  SEARCH_SERVICE?: AssetBinding;
}

type ConfiguredEnv = Required<Omit<Env, "SEARCH_SERVICE">> &
  Pick<Env, "SEARCH_SERVICE">;

const BASE = "/blueprint-wireframe-kit/";
const PRIVATE_PREFIX = `${BASE}__private-references/`;
const PRIVATE_PATHS = new Set<string>(privatePaths);
const SITE_PATHS = new Set<string>(sitePaths);
const COOKIE_NAME = "__Host-blueprint-access";
const SESSION_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 2048;
const TOKEN_PAYLOAD_BYTES = 25;
const TOKEN_BYTES = TOKEN_PAYLOAD_BYTES + 32;
const encoder = new TextEncoder();

function headers(contentType = "text/html; charset=utf-8") {
  return new Headers({
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Content-Type": contentType,
    Vary: "Cookie",
  });
}
function text(request: Request, status: number, message: string) {
  return new Response(request.method === "HEAD" ? null : message, {
    status,
    headers: headers("text/plain; charset=utf-8"),
  });
}
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
export function safeReturnTo(value: string, origin: string) {
  if (!value.startsWith(BASE) || /[\\\u0000-\u001f\u007f]/.test(value))
    return BASE;
  try {
    const parsed = new URL(value, origin);
    if (parsed.origin !== origin || !parsed.pathname.startsWith(BASE))
      return BASE;
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return BASE;
  }
}
function loginPage(
  request: Request,
  status: number,
  message = "",
  returnTo?: string,
) {
  const url = new URL(request.url);
  const destination = safeReturnTo(
    returnTo ?? `${url.pathname}${url.search}`,
    url.origin,
  );
  const responseHeaders = headers();
  // Native form POSTs need an Origin header; no-referrer makes it null.
  responseHeaders.set("Referrer-Policy", "same-origin");
  responseHeaders.set(
    "Content-Security-Policy",
    "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
  );
  const markup = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unlock Blueprint</title><style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#eef1ff;background:#293b7e;color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;padding:24px}main{width:100%;max-width:380px}h1{font-size:28px;letter-spacing:-.04em;margin:0 0 12px}p{color:#bbc5eb;font-size:15px;line-height:1.6;margin:0 0 28px}label{display:block;font-size:14px;margin-bottom:9px}input,button{font:inherit;width:100%;min-height:46px;border-radius:8px}input{padding:10px 12px;background:#1c2b59;color:#edf4ff;border:1px solid #6475b0}input:focus-visible,button:focus-visible{outline:3px solid #a8ccff;outline-offset:3px}button{cursor:pointer;background:#e6edff;color:#1c2b59;border:0;font-weight:600;margin-top:16px;padding:10px}small{display:block;color:#bbc5eb;font-size:12px;line-height:1.6;margin-top:20px}.error{color:#ffd1d1;margin:0 0 20px;padding:12px;border:1px solid #956472;border-radius:8px}
</style></head><body><main><h1>Unlock Blueprint</h1><p>Enter the password to view the website and its original references.</p>${message ? `<p class="error" role="alert">${escapeHtml(message)}</p>` : ""}<form action="/session" method="post"><input type="hidden" name="returnTo" value="${escapeHtml(destination)}"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" maxlength="128" required autofocus><button type="submit">Unlock website</button></form><small>Access lasts for one hour in this browser.</small></main></body></html>`;
  return new Response(request.method === "HEAD" ? null : markup, {
    status,
    headers: responseHeaders,
  });
}
function redirect(location: string, cookie?: string) {
  const result = headers();
  result.set("Location", location);
  if (cookie) result.set("Set-Cookie", cookie);
  return new Response(null, { status: 303, headers: result });
}
function sessionCookie(token: string, maxAge: number) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}
function configured(env: Env): env is ConfiguredEnv {
  return (
    typeof env.REFERENCE_PASSWORD_SHA256 === "string" &&
    /^[a-f0-9]{64}$/.test(env.REFERENCE_PASSWORD_SHA256) &&
    typeof env.SESSION_SECRET === "string" &&
    env.SESSION_SECRET.length >= 32 &&
    env.SESSION_SECRET.length <= 1024 &&
    typeof env.PRIVATE_ASSETS?.fetch === "function" &&
    typeof env.LOGIN_LIMITER?.limit === "function"
  );
}

function encodeToken(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function decodeToken(value: string): Uint8Array | null {
  // Fixed-size binary token: version, expiry, random nonce, HMAC signature.
  if (!/^[A-Za-z0-9_-]{76}$/.test(value)) return null;
  const binary = atob(value.replaceAll("-", "+").replaceAll("_", "/"));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return bytes.length === TOKEN_BYTES ? bytes : null;
}

async function signingKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function signedPayload(
  payload: Uint8Array,
  digest: string,
): Uint8Array<ArrayBuffer> {
  // Rotating either secret revokes previously issued sessions.
  return new Uint8Array([...encoder.encode(digest), ...payload]);
}

async function issueSession(env: ConfiguredEnv, now: number) {
  const expiresAt = now + SESSION_MS;
  const payload = new Uint8Array(TOKEN_PAYLOAD_BYTES);
  payload[0] = 1;
  new DataView(payload.buffer).setBigUint64(1, BigInt(expiresAt));
  crypto.getRandomValues(payload.subarray(9));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(env.SESSION_SECRET),
    signedPayload(payload, env.REFERENCE_PASSWORD_SHA256),
  );
  return {
    token: encodeToken(
      new Uint8Array([...payload, ...new Uint8Array(signature)]),
    ),
    expiresAt,
  };
}

async function authenticated(
  request: Request,
  env: ConfiguredEnv,
  now: number,
) {
  const values = (request.headers.get("Cookie") ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (values.length !== 1) return false;
  const token = decodeToken(values[0].slice(COOKIE_NAME.length + 1));
  if (!token || token[0] !== 1) return false;
  const expiry = Number(
    new DataView(token.buffer, token.byteOffset, token.byteLength).getBigUint64(
      1,
    ),
  );
  if (
    !Number.isSafeInteger(expiry) ||
    expiry <= now ||
    expiry > now + SESSION_MS
  )
    return false;
  return crypto.subtle.verify(
    "HMAC",
    await signingKey(env.SESSION_SECRET),
    new Uint8Array(token.subarray(TOKEN_PAYLOAD_BYTES)),
    signedPayload(
      token.subarray(0, TOKEN_PAYLOAD_BYTES),
      env.REFERENCE_PASSWORD_SHA256,
    ),
  );
}

async function readLogin(
  request: Request,
): Promise<{ password: string; returnTo: string } | Response> {
  if (
    request.headers.get("Content-Type")?.split(";")[0].trim() !==
    "application/x-www-form-urlencoded"
  )
    return loginPage(request, 415, "Please use the password form.");
  const declaredLength = request.headers.get("Content-Length");
  if (
    declaredLength &&
    (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BODY_BYTES)
  )
    return loginPage(
      request,
      413,
      "The request is too large. Please try again.",
    );
  if (!request.body) return loginPage(request, 400, "Enter a password.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        return loginPage(
          request,
          413,
          "The request is too large. Please try again.",
        );
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const body = new URLSearchParams(
      new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    );
    const password = body.get("password");
    const returnTo = body.get("returnTo") ?? BASE;
    if (
      body.getAll("password").length !== 1 ||
      body.getAll("returnTo").length > 1 ||
      !password ||
      password.length > 128
    )
      return loginPage(request, 400, "Enter a password.", returnTo);
    return { password, returnTo };
  } catch {
    return loginPage(request, 400, "Enter a password.");
  } finally {
    reader.releaseLock();
  }
}
async function passwordMatches(password: string, expected: string) {
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(password)),
  );
  const supplied = [...digest]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  let difference = 0;
  for (let index = 0; index < expected.length; index++)
    difference |= supplied.charCodeAt(index) ^ expected.charCodeAt(index);
  return difference === 0;
}

async function proxySearch(
  request: Request,
  env: ConfiguredEnv,
): Promise<Response> {
  const url = new URL(request.url);
  const isStatus = url.pathname === "/search/status";
  if (url.search || request.method !== (isStatus ? "GET" : "POST"))
    return text(request, 405, "This search request is not supported.");
  if (!isStatus && request.headers.get("Origin") !== url.origin)
    return text(request, 403, "This request is not allowed.");
  if (!env.SEARCH_SERVICE)
    return text(request, 503, "Search is temporarily unavailable.");
  const upstreamHeaders = new Headers({
    Origin: "https://anujprajapatiii.github.io",
  });
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) upstreamHeaders.set("CF-Connecting-IP", ip);
  let body: Uint8Array<ArrayBuffer> | undefined;
  if (!isStatus) {
    if (
      request.headers.get("Content-Type")?.split(";")[0].trim() !==
      "application/json"
    )
      return text(request, 415, "Use a JSON search request.");
    const reader = request.body?.getReader();
    if (!reader) return text(request, 400, "Enter a search query.");
    const chunks: Uint8Array[] = [];
    let length = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 3072) {
          await reader.cancel();
          return text(request, 413, "Search request is too large.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    body = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    upstreamHeaders.set("Content-Type", "application/json");
  }
  const upstream = await env.SEARCH_SERVICE.fetch(
    new Request(`https://search-service.invalid${url.pathname}`, {
      method: request.method,
      headers: upstreamHeaders,
      body,
    }),
  );
  if (upstream.status >= 300 && upstream.status < 400) {
    await upstream.body?.cancel();
    return text(request, 503, "Search is temporarily unavailable.");
  }
  const resultHeaders = headers(
    upstream.headers.get("Content-Type") ?? "application/json",
  );
  const retryAfter = upstream.headers.get("Retry-After");
  if (retryAfter) resultHeaders.set("Retry-After", retryAfter);
  return new Response(upstream.body, {
    status: upstream.status,
    headers: resultHeaders,
  });
}

export async function handleRequest(
  request: Request,
  env: Env,
  now = Date.now(),
): Promise<Response> {
  const url = new URL(request.url);
  if (
    url.protocol === "http:" &&
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  ) {
    url.protocol = "https:";
    const redirectHeaders = headers();
    redirectHeaders.set("Location", url.href);
    return new Response(null, { status: 308, headers: redirectHeaders });
  }
  if (!configured(env))
    return loginPage(
      request,
      503,
      "Blueprint is temporarily unavailable. Please try again.",
    );
  try {
    if (url.pathname === "/session" || url.pathname === "/logout") {
      if (request.method !== "POST") {
        if (request.method === "GET" || request.method === "HEAD")
          return loginPage(request, 401);
        return text(request, 405, "Use the password form.");
      }
      if (request.headers.get("Origin") !== url.origin)
        return text(request, 403, "This request is not allowed.");
      if (url.pathname === "/logout")
        return redirect(BASE, sessionCookie("", 0));
      const { success } = await env.LOGIN_LIMITER.limit({
        key: `login:${request.headers.get("CF-Connecting-IP") ?? "unknown"}`,
      });
      if (!success) {
        const response = loginPage(
          request,
          429,
          "Too many attempts. Wait a minute, then try again.",
        );
        response.headers.set("Retry-After", "60");
        return response;
      }
      const form = await readLogin(request);
      if (form instanceof Response) return form;
      if (
        !(await passwordMatches(form.password, env.REFERENCE_PASSWORD_SHA256))
      )
        return loginPage(
          request,
          401,
          "That password isn’t correct. Please try again.",
          form.returnTo,
        );
      const { token } = await issueSession(env, now);
      return redirect(
        safeReturnTo(form.returnTo, url.origin),
        sessionCookie(token, 3600),
      );
    }
    // Every app, script, style, image, recording, original and unknown URL is
    // authenticated before any request can reach the static asset binding.
    if (!(await authenticated(request, env, now))) {
      if (request.method === "GET" || request.method === "HEAD")
        return loginPage(request, 401);
      return text(request, 401, "Unlock Blueprint to continue.");
    }
    if (url.pathname === "/search" || url.pathname === "/search/status")
      return await proxySearch(request, env);
    if (request.method !== "GET" && request.method !== "HEAD")
      return text(request, 405, "The website is read-only.");
    if (url.pathname === "/" || url.pathname === BASE.slice(0, -1))
      return redirect(`${BASE}${url.search}`);
    if (url.pathname.includes("%") || url.pathname.includes("\\"))
      return text(request, 404, "Page not found.");
    const path = url.pathname === BASE ? `${BASE}index.html` : url.pathname;
    const isPrivate = path.startsWith(PRIVATE_PREFIX);
    if (isPrivate ? !PRIVATE_PATHS.has(path) : !SITE_PATHS.has(path))
      return text(request, 404, "Page not found.");
    const assetHeaders = new Headers();
    for (const name of ["Range", "If-Range"]) {
      const value = request.headers.get(name);
      if (value) assetHeaders.set(name, value);
    }
    const asset = await env.PRIVATE_ASSETS.fetch(
      new Request(`https://private-assets.invalid${path}`, {
        method: request.method,
        headers: assetHeaders,
      }),
    );
    if (![200, 206, 416].includes(asset.status)) {
      await asset.body?.cancel();
      return text(
        request,
        asset.status === 404 ? 404 : 503,
        "Page unavailable.",
      );
    }
    const responseHeaders = headers(
      isPrivate
        ? "image/jpeg"
        : (asset.headers.get("Content-Type") ?? "application/octet-stream"),
    );
    responseHeaders.set("Content-Security-Policy", "frame-ancestors 'self'");
    if (responseHeaders.get("Content-Type")?.startsWith("text/html"))
      responseHeaders.set("Referrer-Policy", "same-origin");
    for (const name of ["Content-Length", "Content-Range", "Accept-Ranges"]) {
      const value = asset.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new Response(request.method === "HEAD" ? null : asset.body, {
      status: asset.status,
      headers: responseHeaders,
    });
  } catch {
    return text(
      request,
      503,
      "Blueprint is temporarily unavailable. Please try again.",
    );
  }
}

export default {
  fetch(request: Request, env: Env) {
    return handleRequest(request, env);
  },
};
