import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { SearchError, validateSearchInput } from "../../scripts/search-core.ts";
import { SearchLimitError } from "./quota.ts";

export const ALLOWED_ORIGIN = "https://anujprajapatiii.github.io";
export const MAX_BODY_BYTES = 4096;

export function jsonResponse(
  value: unknown,
  status = 200,
  approvedOrigin = false,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      Vary: "Origin",
      ...(approvedOrigin
        ? { "Access-Control-Allow-Origin": ALLOWED_ORIGIN }
        : {}),
      ...extra,
    },
  });
}

export function errorResponse(
  error: unknown,
  approvedOrigin = false,
): Response {
  const known = error instanceof SearchError;
  const configuration =
    known &&
    ["key_required", "key_invalid", "model_invalid"].includes(error.code);
  return jsonResponse(
    {
      code: configuration
        ? "search_unavailable"
        : known
          ? error.code
          : "search_unavailable",
      error:
        configuration || !known
          ? "Jev Search is temporarily unavailable. Use keyword search for now."
          : error.message,
    },
    configuration ? 503 : known ? error.status : 503,
    approvedOrigin,
    error instanceof SearchLimitError
      ? { "Retry-After": String(error.retryAfter) }
      : {},
  );
}

export async function readQuery(request: Request): Promise<string> {
  if (
    !/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(
      request.headers.get("Content-Type") ?? "",
    )
  )
    throw new SearchError(415, "content_type", "Send a JSON search request.");
  const declared = request.headers.get("Content-Length");
  if (
    declared &&
    (!/^\d+$/.test(declared) || Number(declared) > MAX_BODY_BYTES)
  )
    throw new SearchError(
      413,
      "request_too_large",
      "Keep searches under 300 characters.",
    );
  const reader = request.body?.getReader();
  if (!reader)
    throw new SearchError(
      400,
      "invalid_query",
      "Enter something to search for.",
    );
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      void reader.cancel();
      reject(
        new SearchError(
          408,
          "request_timeout",
          "The search request timed out. Try again.",
        ),
      );
    }, 5000);
  });
  try {
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        void reader.cancel();
        throw new SearchError(
          413,
          "request_too_large",
          "Keep searches under 300 characters.",
        );
      }
      chunks.push(value);
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw new SearchError(
        400,
        "invalid_json",
        "Send a valid JSON search request.",
      );
    }
    return validateSearchInput(parsed);
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

/** Daily, secret-keyed pseudonym; never store or forward the raw client IP. */
export function clientHash(
  ip: string | null,
  secret: string,
  now: number,
): string {
  if (!ip || !isIP(ip))
    throw new SearchError(
      403,
      "client_unavailable",
      "Search could not verify this connection.",
    );
  return createHmac("sha256", secret)
    .update(`blueprint-search-client:${Math.floor(now / 86_400_000)}:${ip}`)
    .digest("hex");
}
