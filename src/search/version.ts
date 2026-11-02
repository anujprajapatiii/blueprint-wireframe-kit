import type { SearchEntry, SearchManifest } from "./contracts.ts";

/** Change deliberately after reviewing a model upgrade; explicit config can override it. */
export const SEARCH_DEFAULT_MODEL = "jev-1.13.0";

/** Bump when the matching instructions or interpretation of answers changes. */
export const SEARCH_PROMPT_VERSION = "growth-match-v2";

/** Shared browser/server change identifier, not a security or integrity check. */
export function getSearchManifest(
  catalog: readonly SearchEntry[],
): SearchManifest {
  let hash = 0xcbf29ce484222325n;
  for (const byte of new TextEncoder().encode(JSON.stringify(catalog))) {
    hash ^= BigInt(byte);
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return {
    catalogVersion: hash.toString(16).padStart(16, "0"),
    catalogCount: catalog.length,
    promptVersion: SEARCH_PROMPT_VERSION,
  };
}
