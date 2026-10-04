import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv, type Plugin } from "vite";
import { experiments } from "../src/experiments/registry";
import { buildSearchCatalog } from "../src/search/catalog";
import {
  createSearchService,
  SearchError,
  validateSearchInput,
} from "./search-core";

const localHosts = new Set(["127.0.0.1", "localhost", "[::1]"]);
const bodyLimit = 4_096;

function localRequest(request: IncomingMessage, requireOrigin: boolean) {
  try {
    const host = new URL(`http://${request.headers.host ?? ""}`);
    const site = request.headers["sec-fetch-site"];
    if (
      !localHosts.has(host.hostname) ||
      host.host !== request.headers.host ||
      (site !== undefined && site !== "same-origin" && site !== "none")
    )
      return false;
    return request.headers.origin
      ? new URL(request.headers.origin).origin === host.origin
      : !requireOrigin;
  } catch {
    return false;
  }
}

function respond(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status;
  response.end(JSON.stringify(body));
}

function readJson(request: IncomingMessage): Promise<unknown> {
  if (
    request.headers["content-type"]?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    throw new SearchError(
      415,
      "json_required",
      "Send an application/json request.",
    );
  }
  if (
    request.headers["content-encoding"] &&
    request.headers["content-encoding"] !== "identity"
  ) {
    throw new SearchError(
      415,
      "encoding_unsupported",
      "Compressed requests are not supported.",
    );
  }
  if (Number(request.headers["content-length"] ?? 0) > bodyLimit)
    throw new SearchError(
      413,
      "body_too_large",
      "Keep the search request below 4 KB.",
    );
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    const timeout = setTimeout(
      () =>
        fail(
          new SearchError(
            408,
            "request_timeout",
            "The search request took too long. Try again.",
          ),
        ),
      10_000,
    );
    function cleanup() {
      clearTimeout(timeout);
      request.removeListener("data", data);
      request.removeListener("end", end);
      request.removeListener("error", interrupted);
      request.removeListener("aborted", interrupted);
    }
    function fail(error: SearchError) {
      cleanup();
      request.resume();
      reject(error);
    }
    function interrupted() {
      fail(
        new SearchError(
          400,
          "request_interrupted",
          "The search request was interrupted. Try again.",
        ),
      );
    }
    function data(chunk: Buffer | string) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.byteLength;
      if (size > bodyLimit)
        fail(
          new SearchError(
            413,
            "body_too_large",
            "Keep the search request below 4 KB.",
          ),
        );
      else chunks.push(buffer);
    }
    function end() {
      cleanup();
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown);
      } catch {
        reject(
          new SearchError(
            400,
            "invalid_json",
            "The search request must contain valid JSON.",
          ),
        );
      }
    }
    request.on("data", data);
    request.on("end", end);
    request.on("error", interrupted);
    request.on("aborted", interrupted);
  });
}

/** Development-only server; the static Pages build has no key or API endpoint. */
export function searchPlugin(): Plugin {
  return {
    name: "blueprint-semantic-search",
    apply: "serve",
    configureServer(server) {
      const route = `${server.config.base}__search`;
      const search = createSearchService(buildSearchCatalog(experiments));
      function configuration() {
        const env = loadEnv(
          server.config.mode,
          server.config.envDir || server.config.root,
          "TYPESAFE_",
        );
        return {
          key: env.TYPESAFE_API_KEY?.trim() ?? "",
          model: env.TYPESAFE_MODEL?.trim() || "jev-latest",
        };
      }
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split("?")[0] ?? "";
        if (path !== route && !path.startsWith(`${route}/`)) return next();
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.setHeader("Cache-Control", "private, no-store");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
        response.setHeader("Referrer-Policy", "no-referrer");
        response.removeHeader("Access-Control-Allow-Origin");
        response.removeHeader("Access-Control-Allow-Credentials");
        try {
          if (!localRequest(request, request.method === "POST"))
            throw new SearchError(
              403,
              "local_origin_required",
              "Use search from this local preview.",
            );
          if (path !== route && path !== `${route}/status`)
            throw new SearchError(
              404,
              "not_found",
              "Search endpoint not found.",
            );
          const method = path === route ? "POST" : "GET";
          if (request.method !== method) {
            response.setHeader("Allow", method);
            throw new SearchError(
              405,
              "method_not_allowed",
              `Use ${method} for this endpoint.`,
            );
          }
          const config = configuration();
          if (method === "GET")
            return respond(response, 200, {
              configured: Boolean(config.key),
              model: config.model,
            });
          const query = validateSearchInput(await readJson(request));
          if (!config.key)
            throw new SearchError(
              503,
              "key_required",
              "Connect TypeSafe in Review a reference to search by meaning.",
            );
          respond(response, 200, await search(query, config.key, config.model));
        } catch (error) {
          if (error instanceof SearchError)
            return respond(response, error.status, {
              error: error.message,
              code: error.code,
            });
          // Do not log or reflect upstream errors, queries, keys or environment values.
          respond(response, 502, {
            error: "Search is unavailable. Try again or use keyword search.",
            code: "search_unavailable",
          });
        }
      });
    },
  };
}
