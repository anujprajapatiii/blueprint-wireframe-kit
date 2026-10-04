import { useEffect, useState } from "react";
import type { SearchResult, SearchStatus } from "./contracts";

type SearchState = {
  query: string;
  result?: SearchResult;
  error?: string;
};

/** Ranking stays on the local server; the browser never receives the API key. */
export function useLibrarySearch(query: string, byMeaning: boolean) {
  const [connection, setConnection] = useState<
    "checking" | "ready" | "unconfigured" | "unavailable"
  >(import.meta.env.DEV ? "checking" : "unavailable");
  const [state, setState] = useState<SearchState>({ query: "" });
  const [attempt, setAttempt] = useState(0);
  const requested = byMeaning ? query.trim().replace(/\s+/g, " ") : "";

  useEffect(() => {
    if (!import.meta.env.DEV) return;
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
        const response = await fetch(
          `${import.meta.env.BASE_URL}__search/status`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );
        if (!response.ok) throw new Error();
        const status = (await response.json()) as SearchStatus;
        if (typeof status?.configured !== "boolean") throw new Error();
        if (!current) return;
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
        const response = await fetch(`${import.meta.env.BASE_URL}__search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: requested }),
          signal: controller.signal,
        });
        const body = await response.json();
        if (!response.ok) {
          throw new Error(
            response.status === 409 || response.status === 429
              ? "Idea search is busy. Try again shortly."
              : "Idea search couldn’t connect. You can still search by name or keyword.",
          );
        }
        if (
          body?.query !== requested ||
          !Array.isArray(body.matches) ||
          body.matches.some(
            (match: { id?: unknown; score?: unknown }) =>
              typeof match?.id !== "string" ||
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
    result,
    error,
    loading: Boolean(
      requested &&
      (connection === "checking" ||
        (connection === "ready" && !result && !error)),
    ),
    retry: () => {
      setConnection(import.meta.env.DEV ? "checking" : "unavailable");
      setState({ query: requested });
      setAttempt((value) => value + 1);
    },
  };
}
