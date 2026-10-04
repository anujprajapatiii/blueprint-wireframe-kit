# Hosted Jev Search release

Prepared and first deployed on 4 October 2026 after Anuj asked to publish Jev Search and suggested Cloudflare for its backend. The website remains on GitHub Pages. The Worker is deployed, its secret is configured, and live Jev searches pass. The Pages release is in progress.

## Changes

- Separate Cloudflare Worker with one SQLite Durable Object; shares the local TypeSafe search core.
- Worker bundles only a generated projection of the 19 public index records. No private research, account fields, original assets or API key is bundled.
- Durable global cap of 100 actual upstream attempts per UTC day, including retries; per-client throttle of 6/minute and 30/day. Queries/results remain in bounded memory only.
- Production frontend reads a public `VITE_SEARCH_API_URL`; local preview retains its local endpoint. Jev Search, suggested queries, failure recovery and explicit keyword fallback work through the same hook.
- GitHub Pages workflow reads `JEV_SEARCH_API_URL` and checks the hosted configuration before publishing. An absent/unconfigured API now blocks deployment.

## Completed checks

- Thirteen shared search-core tests passed, including a real localhost HTTP 307 response proving that redirects are not followed, redirect targets receive no request or credential, and redirects are not retried.
- Eight hosted-backend tests passed, including real SQLite quota persistence, retry counting, catalog privacy/freshness, CORS and body validation.
- Worker TypeScript check and Wrangler dry run passed (approximately 33 KiB uncompressed bundle).
- Production build passed with a placeholder HTTPS endpoint to exercise the production search path. This is a build check, not a live hosted result. Token checks passed: 308 pairs across 56 roles.
- Local Cloudflare runtime started with temporary config storage and polling to avoid this Mac's restricted global write location and watcher limit. Status returned 200/configured=false, missing Origin returned 403, and an unknown route returned 404. No TypeSafe key was supplied to this runtime check. It was stopped afterward.
- An independent focused review found no remaining implementation blockers after the custom-build working directory was corrected.

## Deployment

- Worker: <https://blueprint-jev-search.portfolio-v5.workers.dev>.
- Initial deployed version: `82721ad2-ceb7-4f29-9ba6-a464c949d927`.
- Current version after the transport fix: `2e5b063c-1f00-47b7-b16a-a482f8031587`.
- Current upload: 34.04 KiB, 9.89 KiB compressed; reported startup time: 7 ms.
- The existing TypeSafe key was uploaded successfully as a Worker secret. The hosted status endpoint returned HTTP 200 with `configured: true`.
- The first inference returned HTTP 502. A constructor-only Miniflare reproduction isolated a Workerd runtime mismatch: `redirect: 'error'` is unsupported. The deployed fix uses `redirect: 'manual'`; existing non-success handling rejects redirect responses without following them. The Workerd constructor probe passed, temporary runtime diagnostics were removed, and repeat live inference succeeded.
- GitHub repository variable `JEV_SEARCH_API_URL` was set to the deployed Worker URL.
- The Pages release has not yet been confirmed.

## Live hosted searches

Both requests returned HTTP 200 from the deployed Worker, using model `jev-1.13.0` and catalog version `9be1c666d935ea5b`. These are observed query results, not a general accuracy claim. Scores are Noul match probabilities.

| Query | Returned matches | Leading matches | Observed duration |
| --- | --- | --- | --- |
| `upselling` | 7 | Compare paid tiers (`el-plan-value-ladder`): 0.85; Offer annual billing (`el-annual-upgrade-intercept`): 0.83; Explain a premium gate (`el-professional-clone-capability-gate`): 0.82 | 9.045 s |
| `getting custoemrs into higher tier plans` | 6 | Compare paid tiers (`el-plan-value-ladder`): 0.89; Explain a premium gate (`el-professional-clone-capability-gate`): 0.87; Invite with Basic Seats (`el-basic-seat-collaboration-bridge`): 0.71 | 682 ms |

## Authorization history

Cloudflare's existing CLI session had expired and the dashboard required sign-in. Automatic approval review initially blocked opening the Wrangler OAuth authorization request because explicit consent for account/user read access, Workers write access, and renewable offline access was missing. At that point, no Cloudflare account was authenticated, no Worker was deployed, and no TypeSafe key had been uploaded.

Anuj explicitly approved account/user read access, Workers management, renewable login, and storing the existing TypeSafe key as a Cloudflare Worker secret in the next turn. These permissions do not need to be requested again. Wrangler's approved OAuth flow opened successfully. Automatic approval review then blocked choosing Google as the login provider because a specific Google account had not been selected by the user. Anuj completed Cloudflare sign-in himself and confirmed it.

The initial `workers:write` OAuth scope did not authorize the deployment endpoint. Reconnecting with `workers_scripts:write`, account/user read access, and offline access resolved the scope mismatch, and the Worker deployed successfully. No additional user authorization was needed because the existing consent already covered Workers management.
