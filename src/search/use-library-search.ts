import { useEffect, useState } from "react";
import type { SearchResult, SearchStatus } from "./contracts";
import { searchEndpoint, supportsIdeaSearch } from "./config";
import { buildSearchCatalog } from "./catalog";
import { getSearchManifest } from "./version";
import { experiments } from "../experiments/registry";

const catalog = buildSearchCatalog(experiments);
const expectedManifest = getSearchManifest(catalog);
const knownIds = new Set(catalog.map(({ id }) => id));
const sameCatalog = (value: SearchStatus | SearchResult) =>
  value.catalogVersion === expectedManifest.catalogVersion &&
  value.catalogCount === expectedManifest.catalogCount &&
  value.promptVersion === expectedManifest.promptVersion;

type SearchState = {
  query: string;
  result?: SearchResult;
  error?: string;
};

/** Ranking stays on the API server; the browser never receives the API key. */
export function useLibrarySearch(query: string, byMeaning: boolean) {
  const [status, setStatus] = useState<SearchStatus>();
  const [connection, setConnection] = useState<
    "checking" | "ready" | "unconfigured" | "unavailable"
  >(supportsIdeaSearch ? "checking" : "unavailable");
  const [state, setState] = useState<SearchState>({ query: "" });
  const [attempt, setAttempt] = useState(0);
  const requested = byMeaning ? query.trim().replace(/\s+/g, " ") : "";

  useEffect(() => {
    if (!searchEndpoint) return;
    const controller = new AbortController();
    let current = true;
    let timeout: ReturnType<typeof setTimeout>;
    setConnection("checking");
    setState({ query: requested });

    async function run() {
      // Recheck each submitted idea: an unavailable preview may have recovered.
      // Keep status and inference sequential so stale readiness cannot race this check.
      timeout = setTimeout(() => controller.abort(), 10_000);
      try {
        const response = await fetch(`${searchEndpoint}/status`, {
          signal: controller.signal,
          cache: "no-store",
          credentials: "same-origin",
        });
        if (
          response.status === 401 &&
          import.meta.env.VITE_PRIVATE_REFERENCES_ENABLED === "true"
        ) {
          window.location.reload();
          return;
        }
        if (!response.ok) throw new Error();
        const status = (await response.json()) as SearchStatus;
        if (
          typeof status?.configured !== "boolean" ||
          typeof status.model !== "string" ||
          !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(status.model)
        )
          throw new Error();
        if (!current) return;
        if (!sameCatalog(status)) {
          setConnection("unavailable");
          setState({
            query: requested,
            error:
              "Search records are out of date. Reload the page or use keyword search.",
          });
          return;
        }
        setStatus(status);
        setConnection(status.configured ? "ready" : "unconfigured");
        if (!status.configured || !requested) return;
      } catch {
        if (current) setConnection("unavailable");
        return;
      } finally {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => controller.abort(), 90_000);
      try {
        const response = await fetch(searchEndpoint!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: requested }),
          signal: controller.signal,
          credentials: "same-origin",
        });
        const body = await response.json();
        if (!response.ok) {
          const code =
            typeof body?.code === "string" ? body.code : body?.error?.code;
          throw new Error(
            code === "daily_limit" || code === "client_daily_limit"
              ? "Idea search has reached its daily limit. Try later, or search by keyword."
              : response.status === 409 || response.status === 429
                ? "Idea search is busy. Try again shortly."
                : "Idea search couldn’t connect. You can still search by name or keyword.",
          );
        }
        if (
          body?.query !== requested ||
          !sameCatalog(body) ||
          typeof body.model !== "string" ||
          !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(body.model) ||
          !Array.isArray(body.matches) ||
          new Set(body.matches.map((match: { id: string }) => match?.id))
            .size !== body.matches.length ||
          body.matches.some(
            (match: { id?: unknown; score?: unknown }) =>
              typeof match?.id !== "string" ||
              !knownIds.has(match.id) ||
              typeof match.score !== "number" ||
              !Number.isFinite(match.score) ||
              match.score < 0 ||
              match.score > 1,
          )
        )
          throw new Error(
            "Idea search returned an incomplete result. Try again.",
          );
        if (current)
          setState({ query: requested, result: body as SearchResult });
      } catch (error: unknown) {
        if (!current) return;
        setState({
          query: requested,
          error: controller.signal.aborted
            ? "Idea search took too long. Try again, or search by name."
            : error instanceof Error && !error.message.startsWith("Unexpected")
              ? error.message
              : "Idea search is unavailable. You can still search by name or keyword.",
        });
      } finally {
        clearTimeout(timeout);
      }
    }
    void run();
    return () => {
      current = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [requested, attempt]);

  const result =
    requested && state.query === requested ? state.result : undefined;
  const error =
    requested && state.query === requested ? state.error : undefined;
  return {
    connection,
    status,
    result,
    error,
    loading: Boolean(
      requested &&
      (connection === "checking" ||
        (connection === "ready" && !result && !error)),
    ),
    retry: () => {
      setConnection(supportsIdeaSearch ? "checking" : "unavailable");
      setState({ query: requested });
      setAttempt((value) => value + 1);
    },
  };
}
