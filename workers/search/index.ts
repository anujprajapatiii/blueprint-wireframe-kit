import {
  createSearchService,
  evaluateSearch,
  SearchError,
} from "../../scripts/search-core.ts";
import type { SearchEntry } from "../../src/search/contracts.ts";
import catalog from "./catalog.generated.json" with { type: "json" };
import {
  ALLOWED_ORIGIN,
  clientHash,
  errorResponse,
  jsonResponse,
  readQuery,
} from "./http.ts";
import { dailyLimit, SearchQuota } from "./quota.ts";
import type { SearchEnv, SearchState } from "./runtime.ts";

const COORDINATOR_NAME = "blueprint-search-global-v1";

function configured(env: SearchEnv): boolean {
  return Boolean(
    env.TYPESAFE_API_KEY &&
    env.TYPESAFE_API_KEY.length <= 1024 &&
    !/\s/.test(env.TYPESAFE_API_KEY),
  );
}

export default {
  async fetch(request: Request, env: SearchEnv): Promise<Response> {
    const approved = request.headers.get("Origin") === ALLOWED_ORIGIN;
    try {
      if (!approved)
        throw new SearchError(
          403,
          "origin_forbidden",
          "This search endpoint is only available from Blueprint.",
        );
      const url = new URL(request.url);
      if (url.search || !["/search", "/search/status"].includes(url.pathname))
        throw new SearchError(404, "not_found", "Search endpoint not found.");
      const method = url.pathname === "/search/status" ? "GET" : "POST";
      if (request.method === "OPTIONS") {
        const requestedHeaders = (
          request.headers.get("Access-Control-Request-Headers") ?? ""
        )
          .split(",")
          .map((h) => h.trim().toLowerCase())
          .filter(Boolean);
        if (
          request.headers.get("Access-Control-Request-Method") !== method ||
          requestedHeaders.some((h) => h !== "content-type")
        )
          throw new SearchError(
            403,
            "preflight_forbidden",
            "This search request is not supported.",
          );
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": method,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "600",
            "Cache-Control": "no-store",
            Vary: "Origin",
          },
        });
      }
      if (request.method !== method)
        return jsonResponse(
          {
            code: "method_not_allowed",
            error: "Search request method not allowed.",
          },
          405,
          true,
          { Allow: `${method}, OPTIONS` },
        );
      dailyLimit(env.DAILY_UPSTREAM_LIMIT);
      if (method === "GET")
        return jsonResponse(
          {
            configured: configured(env),
            model: env.TYPESAFE_MODEL || "jev-latest",
          },
          200,
          true,
        );
      const query = await readQuery(request);
      if (!configured(env))
        throw new SearchError(503, "key_required", "Search is not configured.");
      // Cloudflare overwrites CF-Connecting-IP at its public edge. Never trust a
      // caller-supplied client identifier or forward arbitrary request headers.
      const client = clientHash(
        request.headers.get("CF-Connecting-IP"),
        env.TYPESAFE_API_KEY!,
        Date.now(),
      );
      const stub = env.SEARCH_COORDINATOR.get(
        env.SEARCH_COORDINATOR.idFromName(COORDINATOR_NAME),
      );
      const response = await stub.fetch(
        new Request("https://search.internal/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Search-Client": client,
          },
          body: JSON.stringify({ query }),
        }),
      );
      const headers = new Headers(response.headers);
      headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
      headers.set("Vary", "Origin");
      return new Response(response.body, { status: response.status, headers });
    } catch (error) {
      return errorResponse(error, approved);
    }
  },
};

/** Singleton coordinator: the API cap survives eviction, restarts and edge regions. */
export class SearchCoordinator {
  readonly state: SearchState;
  readonly env: SearchEnv;
  readonly quota: SearchQuota;
  readonly search: ReturnType<typeof createSearchService>;

  constructor(state: SearchState, env: SearchEnv) {
    this.state = state;
    this.env = env;
    this.quota = new SearchQuota(
      state.storage,
      dailyLimit(env.DAILY_UPSTREAM_LIMIT),
    );
    const guardedFetch: typeof fetch = async (input, init) => {
      if (input !== "https://api.typesafe.ai/v1/systemone")
        throw new SearchError(
          503,
          "upstream_forbidden",
          "Search is temporarily unavailable.",
        );
      this.quota.reserveUpstream(Date.now());
      await this.scheduleCleanup();
      return fetch(input, init);
    };
    this.search = createSearchService(
      catalog as SearchEntry[],
      (query, entries, key, model) =>
        evaluateSearch(query, entries, key, model, guardedFetch),
    );
  }

  private async scheduleCleanup(): Promise<void> {
    const next = this.quota.nextExpiry();
    if (next !== undefined) await this.state.storage.setAlarm(next);
  }

  async alarm(): Promise<void> {
    this.quota.cleanup(Date.now());
    await this.scheduleCleanup();
  }

  async fetch(request: Request): Promise<Response> {
    try {
      if (
        request.method !== "POST" ||
        new URL(request.url).pathname !== "/search"
      )
        throw new SearchError(404, "not_found", "Search endpoint not found.");
      const query = await readQuery(request);
      this.quota.admitClient(
        request.headers.get("X-Search-Client") ?? "",
        Date.now(),
      );
      await this.scheduleCleanup();
      const result = await this.search(
        query,
        this.env.TYPESAFE_API_KEY ?? "",
        this.env.TYPESAFE_MODEL || "jev-latest",
      );
      return jsonResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
