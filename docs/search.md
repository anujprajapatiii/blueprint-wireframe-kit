# Finding an experiment

The large search field is the first control above the goal buttons. It supports both known-item lookup and a description of a design need. Search remains a blue library control. The existing yellow growth markers keep their meaning.

## Behavior

- Typing filters by keywords immediately. Submitting with Enter, Search, or a suggested query runs an idea search in the local app. Do not call the model on every keystroke.
- Best match ranks results by relevance. Source, type, and both primary/secondary goals narrow that set locally without another request. Recently updated and Name A–Z remain available.
- Preserve `q`, `search=meaning`, `sort`, `goal`, `source`, and `type` through experiment, embedded, related-flow, reference, and return links. Clearing the search restores the normal sort and keeps the other filters. Clearing filters resets the whole search.
- Loading, no matches, unavailable service, and retry are real states. A newer query must never display a late result for an earlier one. Empty or whitespace-only queries restore browsing.
- Keyword search remains available when the API is unavailable and in the static GitHub Pages build. Live idea search runs only on the local server; publishing the static UI does not create a hosted inference service.

## Search data and TypeSafe

Use the installed TypeSafe skill and current Noul/reranking documentation. The server owns the candidate list, using only active experiments. The client submits a query of at most 300 characters, never candidate records or credentials.

The inference catalog is an explicit projection of public index-facing metadata: ID, title, summary, source name, type, focus, goals, mechanisms, and format. Do not send research observations, original copy, audience/account details, source URLs, filenames, private captures, archives, review notes, or local paths. Do not expand this boundary by spreading full experiment or research objects into a model request. The current metadata comes from the unchanged registry used in the verified public revision `4424c62`.

Each candidate gets an independent Noul question about whether it meaningfully fits the design need. Batch these questions in one request. The current 19-item catalog is small enough to consider all entries, avoiding a keyword shortlist that would discard paraphrases. Unsupported query constraints should reduce relevance; a hypothetical business measure does not prove a mechanism. Code validates the returned IDs and probabilities, retains matches at the provisional 0.55 gate, and sorts by match probability. This number is not accuracy or demonstrated design impact.

The local server reads the existing `TYPESAFE_API_KEY` and optional `TYPESAFE_MODEL`. Keep credentials server-side. Responses and queries are not written to disk. The process keeps a bounded, success-only cache keyed by query, catalog version, model, and credential; duplicate in-flight queries share a request. A different simultaneous request receives a recoverable busy response. The cache clears when the preview restarts.

The request has bounded input, catalog, response, and time limits. If the catalog exceeds 100 entries or 80,000 serialized characters, extend retrieval deliberately rather than silently dropping entries. Keep documented transient retries bounded and never turn service failure into simulated semantic matches.

## Checks

Run `npm run search:check` for deterministic transport, data-boundary, ranking, and cache checks. Verify live queries separately: a premium gate, a feature introduction, exploration rewards versus referral rewards, and an unrelated request with no match. Check combined filters, return navigation, whitespace reset, and a narrow viewport. Record the model and the results that actually ran; do not call mocked tests live verification.
