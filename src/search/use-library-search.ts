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
    fetch(`${import.meta.env.BASE_URL}__search/status`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const status = (await response.json()) as SearchStatus;
        if (typeof status?.configured !== "boolean") throw new Error();
        setConnection(status.configured ? "ready" : "unconfigured");
      })
      .catch(() => {
        if (!controller.signal.aborted) setConnection("unavailable");
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (!import.meta.env.DEV || !requested || connection !== "ready") return;
    const controller = new AbortController();
    let current = true;
    const timeout = setTimeout(() => controller.abort(), 90_000);
    setState({ query: requested });
    fetch(`${import.meta.env.BASE_URL}__search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: requested }),
      signal: controller.signal,
    })
      .then(async (response) => {
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
      })
      .catch((error: unknown) => {
        if (!current) return;
        setState({
          query: requested,
          error: controller.signal.aborted
            ? "Idea search took too long. Try again, or search by name."
            : error instanceof Error && !error.message.startsWith("Unexpected")
              ? error.message
              : "Idea search is unavailable. You can still search by name or keyword.",
        });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      current = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [requested, connection, attempt]);

  const result =
    requested && state.query === requested ? state.result : undefined;
  const error =
    requested && state.query === requested ? state.error : undefined;
  return {
    connection,
    result,
    error,
    loading: Boolean(requested && connection === "ready" && !result && !error),
    retry: () => {
      setState({ query: requested });
      setAttempt((value) => value + 1);
    },
  };
}
