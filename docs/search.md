# Finding an experiment

The large Jev Search field is the first control above the goal buttons. It supports both known-item lookup and a description of a design need. Search remains a blue library control. The existing yellow growth markers keep their meaning.

## Behavior

- Typing filters by keywords immediately. Submitting with Enter, Jev Search, or a suggested query runs an idea search. Do not call the model on every keystroke.
- Best match ranks results by relevance. Source, type, and both primary/secondary goals narrow that set locally without another request. Recently updated and Name A–Z remain available.
- Preserve `q`, `search=meaning`, `sort`, `goal`, `source`, and `type` through experiment, embedded, related-flow, reference, and return links. Clearing the search restores the normal sort and keeps the other filters. Clearing filters resets the whole search.
- Loading, no matches, unavailable service, and retry are distinct states. A failed idea search must not silently become zero keyword matches; show a recoverable failure panel and an explicit keyword-search option. Recheck service availability on each submitted query and retry, with connection checking included in loading. A newer query must never display a late result for an earlier one. Empty or whitespace-only queries restore browsing.
- Keyword search remains available as an explicit fallback. Development uses the local search plugin; production uses the public `VITE_SEARCH_API_URL` endpoint. That variable contains a URL only, never credentials. An unconfigured production build has keyword search only and must not be published as a completed Jev integration.

## Hosted search requirement

Anuj expects Jev Search to work on the published site as well as locally, even when his computer is off. The website stays on GitHub Pages. The Cloudflare Worker in `workers/search/` hosts the API at <https://blueprint-jev-search.portfolio-v5.workers.dev> and reads the TypeSafe key from a Worker secret. It shares the existing Jev judgment and public catalog contract with local search.

The Pages workflow reads repository variable `JEV_SEARCH_API_URL` and refuses to publish until the hosted status endpoint reports configured. Deploy the Worker, store `TYPESAFE_API_KEY` as its secret, verify a real search, and set that repository variable before publishing Pages. Full setup is in [the Worker guide](../workers/search/README.md). The Worker, secret configuration, and live Jev searches were verified on 4 October 2026, including “upselling” and “getting custoemrs into higher tier plans.” The Pages release is in progress. See [the hosted search review](reviews/2026-10-04/search-hosted-review.md) for deployment evidence.

One SQLite Durable Object coordinates requests across Cloudflare locations. It persists only bounded quota counters: 100 actual upstream attempts per UTC day, including retries, and 6 requests per minute / 30 per UTC day per client. Client identities use a daily HMAC of Cloudflare's connection IP; raw IPs and queries are not stored. Expired counters are cleaned by an alarm. Successful responses stay in bounded memory cache only. Origin checks restrict normal browser use to the GitHub Pages origin; they are not authentication. Durable quotas limit API usage even if a caller spoofs an Origin header.

## Search data and TypeSafe

Use the installed TypeSafe skill and current Noul/reranking documentation. The server owns the candidate list, using only active experiments. The client submits a query of at most 300 characters, never candidate records or credentials.

The inference catalog is an explicit projection of public index-facing metadata: ID, title, summary, source name, type, focus, goals, mechanisms, and format. Do not send research observations, original copy, audience/account details, source URLs, filenames, private captures, archives, review notes, or local paths. Do not expand this boundary by spreading full experiment or research objects into a model request. The current metadata comes from the unchanged registry used in the verified public revision `4424c62`.

Each candidate gets an independent Noul question about whether it meaningfully fits the design need. Batch these questions in one request. The current 19-item catalog is small enough to consider all entries, avoiding a keyword shortlist that would discard paraphrases. Unsupported query constraints should reduce relevance; a hypothetical business measure does not prove a mechanism. Code validates the returned IDs and probabilities, retains matches at the provisional 0.55 gate, and sorts by match probability. This number is not accuracy or demonstrated design impact.

The local server reads the existing `TYPESAFE_API_KEY` and optional `TYPESAFE_MODEL`; the Worker reads equivalent server-side bindings. Keep credentials server-side. Responses and queries are not written to disk. Each service keeps a bounded, success-only cache keyed by query, catalog version, model, and credential; duplicate in-flight queries share a request. A different simultaneous request receives a recoverable busy response. Cache resets do not reset the Worker's persistent daily request budget.

The request has bounded input, catalog, response, and time limits. If the catalog exceeds 100 entries or 80,000 serialized characters, extend retrieval deliberately rather than silently dropping entries. Keep documented transient retries bounded and never turn service failure into simulated semantic matches.

## Checks

Run `npm run search:check` for deterministic transport, data-boundary, ranking, and cache checks, and `npm run search:worker:check` for hosted guards, SQLite quota persistence, retry accounting, and catalog freshness. `npm run search:worker:build` packages the Worker without deploying. Verify live queries separately: upselling, a misspelled higher-tier-plan query, a premium gate, a feature introduction, exploration rewards versus referral rewards, and an unrelated request with no match. Check combined filters, return navigation, whitespace reset, and a narrow viewport. Record the model and the results that actually ran; do not call mocked tests live verification.
