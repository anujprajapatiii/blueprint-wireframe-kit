# Hosted Jev Search

The website stays on GitHub Pages. This separate Cloudflare Worker supplies its
Jev Search endpoint. `TYPESAFE_API_KEY` is a Worker secret; it must never appear in
Vite variables, browser storage, GitHub Pages output or committed configuration.

Run the commands below **from the repository root** after `npm ci`. Wrangler's
custom build regenerates `catalog.generated.json` from
`buildSearchCatalog(experiments)` on every build. The generated file contains only
public index fields and is checked against the current registry in the tests.
Private observations, account details, original captures and asset paths are not
bundled into this Worker or included in inference requests.

## Check locally

```sh
node workers/search/build-catalog.mjs
npx tsc --project workers/search/tsconfig.json
node --experimental-strip-types --test workers/search/search.test.ts
npx wrangler deploy --config workers/search/wrangler.toml --dry-run
```

The tests use Node's SQLite implementation to exercise persisted quota counters;
they stub the TypeSafe transport and do not spend API credits. Existing
`npm run search:check` covers the shared ranking and transport core. A Wrangler
dry run confirms that the actual Worker bundles successfully with `nodejs_compat`.

## Deploy after authentication

```sh
npx wrangler login
npx wrangler deploy --config workers/search/wrangler.toml
npx wrangler secret put TYPESAFE_API_KEY --config workers/search/wrangler.toml
```

The secret prompt accepts the existing TypeSafe key. Do not put a key directly in
a shell command. The initial deploy can happen before setting the secret: the
status route then reports `configured: false` and searches fail closed.

Set the Pages build's `VITE_SEARCH_API_URL` to the deployed endpoint, for example
`https://blueprint-jev-search.<account-subdomain>.workers.dev/search`. Only this
public endpoint belongs in the Pages build. Build and deploy the website after
the hosted status route is configured and a real search has been verified.

Workers Free supports the SQLite Durable Object used here. No paid plan is
required by this architecture; account-level Cloudflare and TypeSafe limits still
apply. Do not accept a paid plan or billing change as part of setup without the
user's approval.

## API and boundaries

| Route            | Request                                | Response                                        |
| ---------------- | -------------------------------------- | ----------------------------------------------- |
| `/search/status` | `GET`                                  | `{ "configured": true, "model": "jev-latest" }` |
| `/search`        | `POST` JSON `{ "query": "upselling" }` | Existing `SearchResult` contract                |

Both routes require the exact Origin `https://anujprajapatiii.github.io`.
Approved preflights permit the route's method and `Content-Type` only. There are
no credentialed cookies or browser tokens. CORS is a browser boundary, **not user
authentication**; non-browser callers can imitate an Origin, so the global API
cap below is mandatory. Do not broaden the origin list to `*`.

POST accepts only a `query` field, at most 300 characters and 4 KiB total JSON.
It reads the body with a five-second deadline. Callers cannot provide a catalog,
model, prompt or destination. The shared search core owns Jev evaluation, checks
typed results, and limits each upstream attempt to 25 seconds. Only upstream
429/529 responses can retry, with three total attempts and bounded backoff.

All responses use `Cache-Control: no-store`; errors expose safe messages and
machine-readable codes. Quota responses include `Retry-After`. Status never
exposes the key, account details, remaining budget or quota counters.

## Usage limits and retention

One named SQLite Durable Object (`blueprint-search-global-v1`) coordinates all
requests across regions. **Do not change this name to bypass exhausted quota.**

- **100 actual upstream attempts per UTC day**, including retries and failed
  attempts. The counter is atomically reserved before each network call and
  survives restarts and eviction. `DAILY_UPSTREAM_LIMIT` may be set to an integer
  from 1 through 1000; invalid values fail closed. Raising it changes the potential
  API spend and should be a deliberate owner decision.
- **6 searches per minute and 30 per UTC day per client IP**. These also apply to
  cached searches. Shared networks share this allowance. Raw IPs are replaced
  with secret-keyed, daily rotating HMAC identifiers before reaching the object.
- **20 successful results in memory**, with identical active queries coalesced.
  A different query during an active search returns `search_in_progress` (409).
  Cached/coalesced requests do not spend additional upstream attempts.
- Only counters and their expiry times are written to SQLite. Queries, results,
  raw IP addresses and account details are never persisted by application code.
  Expired minute/day counters are deleted during requests and by Durable Object
  alarms. The live counter table is bounded to roughly 4097 records to limit
  storage growth. Cloudflare's platform recovery/retention policies may retain
  deleted database history separately.
- Worker observability is explicitly disabled, and the application never logs
  request bodies, model results or keys. Cloudflare can still retain its normal
  infrastructure metadata under its service policies.

The daily cap limits request count, not currency. Token use depends on the public
catalog and TypeSafe pricing. Inference receives only the entered query and the
public metadata projection. Private reference handling is unchanged.

## Verified documentation

Implementation checked against the official documentation on 4 October 2026:

- [TypeSafe HTTP API](https://docs.typesafe.ai/api)
- [Cloudflare Durable Objects pricing and Free support](https://developers.cloudflare.com/durable-objects/platform/pricing/)
- [SQLite Durable Object storage and transactions](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/)
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
