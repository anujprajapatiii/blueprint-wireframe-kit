# Hosted Jev Search preparation

Prepared on 4 October 2026 after Anuj asked to publish Jev Search and suggested Cloudflare for its backend. The website remains on GitHub Pages. No public deployment has run yet.

## Changes

- Separate Cloudflare Worker with one SQLite Durable Object; shares the local TypeSafe search core.
- Worker bundles only a generated projection of the 19 public index records. No private research, account fields, original assets or API key is bundled.
- Durable global cap of 100 actual upstream attempts per UTC day, including retries; per-client throttle of 6/minute and 30/day. Queries/results remain in bounded memory only.
- Production frontend reads a public `VITE_SEARCH_API_URL`; local preview retains its local endpoint. Jev Search, suggested queries, failure recovery and explicit keyword fallback work through the same hook.
- GitHub Pages workflow reads `JEV_SEARCH_API_URL` and checks the hosted configuration before publishing. An absent/unconfigured API now blocks deployment.

## Completed checks

- Twelve shared search-core tests passed.
- Eight hosted-backend tests passed, including real SQLite quota persistence, retry counting, catalog privacy/freshness, CORS and body validation.
- Worker TypeScript check and Wrangler dry run passed (approximately 33 KiB uncompressed bundle).
- Production build passed with a placeholder HTTPS endpoint to exercise the production search path. This is a build check, not a live hosted result. Token checks passed: 308 pairs across 56 roles.
- Local Cloudflare runtime started with temporary config storage and polling to avoid this Mac's restricted global write location and watcher limit. Status returned 200/configured=false, missing Origin returned 403, and an unknown route returned 404. No TypeSafe key was supplied to this runtime check. It was stopped afterward.
- An independent focused review found no remaining implementation blockers after the custom-build working directory was corrected.

## Remaining deployment gate

Cloudflare's existing CLI session is expired and the dashboard requires sign-in. Automatic approval review blocked opening the Wrangler OAuth authorization request because explicit consent for account/user read access, Workers write access, and renewable offline access was missing. No Cloudflare account was authenticated, no Worker was deployed and no TypeSafe key was uploaded. The pending OAuth attempt must be regenerated if it expires.

After authorization: deploy the Worker, store the existing TypeSafe key as a server secret, verify live search and limits, set GitHub repository variable `JEV_SEARCH_API_URL`, then publish and verify GitHub Pages. The user's publishing request remains the intended next outcome.
