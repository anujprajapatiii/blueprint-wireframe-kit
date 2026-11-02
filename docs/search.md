# Finding an experiment

The Search experiments field is the first control above the goal buttons. It supports both finding a known experiment and describing a design need. Search remains a blue library control. The existing yellow growth markers keep their meaning.

## Behavior

- Typing filters by keywords immediately. Submitting with Enter, Search, or a suggested query runs an idea search. Do not call the model on every keystroke.
- Best match ranks results by relevance. Source, type, and both primary/secondary goals narrow that set locally without another request. Recently updated and Name A–Z remain available.
- Typing keeps instant keyword results; Search or Enter runs Jev. When filters hide matches, show the hidden count and a Show all matches action that preserves the search.
- Preserve `q`, `search=meaning`, `sort`, `goal`, `source`, and `type` through experiment, embedded, related-flow, reference, and return links. Clearing the search restores the normal sort and keeps the other filters. Clearing filters resets the whole search.
- Loading, no matches, unavailable service, and retry are distinct states. A failed idea search must not silently become zero keyword matches; show a recoverable failure panel and an explicit keyword-search option. Recheck service availability on each submitted query and retry, with connection checking included in loading. A newer query must never display a late result for an earlier one. Empty or whitespace-only queries restore browsing.
- Keyword search remains available as an explicit fallback. Development uses the local search plugin; production uses the public `VITE_SEARCH_API_URL` endpoint. That variable contains a URL only, never credentials. An unconfigured production build has keyword search only and must not be published as a completed Jev integration.

## Hosted search requirement

Anuj expects Jev Search to work on the published site as well as locally, even when his computer is off. The website stays on GitHub Pages. The Cloudflare Worker in `workers/search/` hosts the API at <https://blueprint-jev-search.portfolio-v5.workers.dev> and reads the TypeSafe key from a Worker secret. It shares the existing Jev judgment and public catalog contract with local search.

The Pages workflow reads repository variable `JEV_SEARCH_API_URL` and refuses to publish until the hosted status endpoint reports configured. Deploy the Worker, store `TYPESAFE_API_KEY` as its secret, verify a real search, and set that repository variable before publishing Pages. Full setup is in [the Worker guide](../workers/search/README.md). The Worker and GitHub Pages integration were published and verified on 4 October 2026. The public site returned relevant results for “upselling” and “getting custoemrs into higher tier plans.” Search runs in Cloudflare and does not depend on Anuj's computer staying on. See [the hosted search review](reviews/2026-10-04/search-hosted-review.md) for the deployed revision and verification evidence.

One SQLite Durable Object coordinates requests across Cloudflare locations. It persists only bounded quota counters: 100 actual upstream attempts per UTC day, including retries, and 6 requests per minute / 30 per UTC day per client. Client identities use a daily HMAC of Cloudflare's connection IP; raw IPs and queries are not stored. Expired counters are cleaned by an alarm. Successful responses stay in bounded memory cache only. Origin checks restrict normal browser use to the GitHub Pages origin; they are not authentication. Durable quotas limit API usage even if a caller spoofs an Origin header.

## Search data and TypeSafe

Use the installed TypeSafe skill and current Noul/reranking documentation. The server owns the candidate list, using only active experiments. The client submits a query of at most 300 characters, never candidate records or credentials.

The inference catalog is an explicit projection of public index-facing metadata: ID, title, summary, source name, type, focus, goals, mechanisms, and format. Do not send research observations, original copy, audience/account details, source URLs, filenames, private captures, archives, review notes, or local paths. Do not expand this boundary by spreading full experiment or research objects into a model request. The catalog includes the four Cloudflare experiments added on 5 October 2026 and retains the same public-field allowlist.

`src/search/descriptions.ts` contains reviewed public product descriptions for the active experiments. These supply the catalog's summary without changing the short summary on an experiment card. Describe the action, who benefits, the trigger, offer and relevant surface using supported product facts. New experiments should receive a description here; until then, the catalog falls back to their display summary. Keyword search also includes these descriptions. Keep the private-field exclusions above intact.

Keep the mechanism clear when simplifying public titles, summaries, focus, and mechanisms. State who benefits, what they receive, and what triggers the benefit when those facts are established. A person earning cash from a referral is different from the business earning subscription revenue. Cash, product credits, discounts, and stickers are different rewards. Inviting a friend, publishing work, and buying an upgrade are different triggers. Do not reduce these descriptions to a broad label such as “rewards” or “monetization” and lose the distinction. Use the existing public fields; do not add private audience or account details to fill a gap.

Each candidate gets an independent Noul question about whether it directly fits the design need. Batch these questions in one request. The active catalog is small enough to consider all entries, avoiding a keyword shortlist that would discard paraphrases. Match the subject and incentive type as well as the action: an event invitation is different from a feature announcement. Unsupported query constraints should reduce relevance; a hypothetical business measure does not prove a mechanism. Code validates the returned IDs and probabilities, retains matches at the provisional 0.55 gate, and sorts by match probability. This number is not accuracy or demonstrated design impact.

The local server reads the existing `TYPESAFE_API_KEY` and optional `TYPESAFE_MODEL`; the Worker reads equivalent server-side bindings. The default model is pinned to `jev-1.13.0` in `src/search/version.ts` and Worker configuration. Keep credentials server-side. Ordinary searches are not written to disk. Each service keeps a success-only cache capped at 20 entries and ten minutes, keyed by query, catalog version, prompt version, model and credential; duplicate in-flight queries share a request. A different simultaneous request receives a recoverable busy response. Cache resets do not reset the Worker's persistent daily request budget.

Status and results include a public catalog fingerprint, record count and prompt version. The browser compares these with its own catalog and offers keyword search if the website and search service disagree. A collapsed Search details disclosure shows these fields in development only. The fingerprint detects revisions; it is not an authentication or integrity check.

After a successful Jev search, Missing a result? lets someone explicitly save the query, expected experiment, optional note and result version in this browser. Keep only the latest 50 suggestions, with download and clear controls inside the disclosure. Saving does not send anything to a server or automatically train Jev. This explicit feedback is the only browser storage exception to ordinary queries remaining transient.

For an approved release, `npm run release:deploy` prepares the current public catalog and protected site assets, then deploys the existing internal search Worker and protected site Worker together. The generic Pages gateway remains bound to the same site service. This command publishes; local work must not invoke it without authorization for that revision.

The request has bounded input, catalog, response, and time limits. If the catalog exceeds 100 entries or 80,000 serialized characters, extend retrieval deliberately rather than silently dropping entries. Keep documented transient retries bounded and never turn service failure into simulated semantic matches.

## Checks

Run `npm run search:check` for deterministic transport, data-boundary, ranking, and cache checks, and `npm run search:worker:check` for hosted guards, SQLite quota persistence, retry accounting, and catalog freshness. `npm run search:worker:build` packages the Worker without deploying.

Run `npm run search:quality` explicitly to check live relevance fixtures against the configured TypeSafe model. This is an opt-in check: it makes real API requests and consumes TypeSafe usage. It is separate from the build and deterministic tests. It uses the same public catalog boundary and must never print credentials.

The command prints only fixture queries, IDs, numeric judgments, model, timing, and usage. Add `-- --report /path/to/report.json` to save that diagnostic output deliberately. This does not change the running app's policy of keeping queries out of disk logs.

Fixtures should cover user earnings versus business revenue, cash versus credit rewards, paid-feature upgrades, event promotions, and an unrelated request with no match. Assert supported must-include and must-exclude experiment IDs, rather than exact scores or ordering. Allow other relevant results unless a query requires no matches. Keep assertions grounded in the public metadata; do not force one interpretation of an ambiguous query. Record the model, fixture results, and returned IDs from the run. A passing fixture set checks those queries only; it does not establish relevance for every search.

After changes to search behavior, also check combined filters, return navigation, whitespace reset, and a narrow viewport in the browser. Do not call mocked tests or a skipped live check live verification.

## Whole-site password protection — 6 October 2026

Search now runs through the authenticated site's same-origin `/search` and `/search/status` routes. The browser sends only the HttpOnly site session cookie; the gate verifies it before calling the existing search service through a Cloudflare service binding. The search Worker's public `workers.dev` endpoint and preview URLs are disabled. The TypeSafe key, quota and public-field catalog remain in the existing Worker. GitHub Pages no longer hosts the app. The previous public API check script is historical; use the protected-site release verification instead.
