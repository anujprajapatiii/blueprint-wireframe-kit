# Password-protected Blueprint website

This implementation places the entire Blueprint website, its JavaScript and styles, search, public source recordings, and all 89 selected private original JPEGs behind one password at `https://blueprint-patterns.pages.dev/blueprint-wireframe-kit/`. A generic Cloudflare Pages gateway forwards requests through a service binding to the existing protected Worker; it holds no private assets or credentials. The former workers.dev address redirects to the generic address. GitHub Pages reaches it through that existing redirect. Blueprint has no personal-domain attachment. Release-specific verification is recorded below.

## Access contract

Anonymous requests to any website, image, script, recording, search or unknown URL receive only a small inline password form with HTTP 401. The form contains no external scripts or assets. Non-loopback HTTP requests redirect to HTTPS before the form is displayed.

`POST /session` accepts a bounded, URL-encoded form with `password` and `returnTo`. The request's `Origin` must equal the service origin. A correct password creates a signed session cookie and redirects to a validated path within `/blueprint-wireframe-kit/`, preserving the requested view's query string. Invalid passwords receive plain feedback; five login attempts per minute per IP trigger a one-minute wait.

The `__Host-blueprint-access` cookie is `HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`. The frontend never reads the token or stores the password. Access expires after one hour. `POST /logout`, also checked for the exact same origin, expires the cookie and returns to the website. Rotating either server secret invalidates existing sessions.

Once authenticated, requests can fetch only the generated website allowlist and the 89 exact paths in `allowlist.json`: 38 ElevenLabs captures, 13 Cloudflare captures, 10 Tally captures, 21 Gamma captures and 7 Linear captures. Originals retain their exact bytes at `/blueprint-wireframe-kit/__private-references/{source}/{filename.jpg}`. Archives, research metadata and provenance are excluded. Authenticated video requests support `Range` and `If-Range`, allowing the existing Notion and Steam recordings to seek.

## Search

The gate proxies only authenticated `GET /search/status` and same-origin `POST /search` through the `SEARCH_SERVICE` binding to `blueprint-jev-search`. Search bodies are capped at 3 KiB; cookies and arbitrary client headers are never forwarded. The service supplies the upstream's existing origin constant and connecting IP. The current internal search catalog contains 34 experiments. Search has no public Worker endpoint. A missing search binding disables search without bypassing the website password or blocking other authenticated pages.

## Security boundaries

`assets.run_worker_first = true` makes the Worker authenticate every request before the static asset binding can return bytes. No asset path bypasses the gate. Missing password/signing secrets or mandatory bindings fail closed. Only expected status codes and selected asset headers return to the browser; redirects from asset or search bindings do not pass through.

Every response uses `Cache-Control: private, no-store`, `nosniff`, and a no-index policy. Images, scripts and other non-document responses use `Referrer-Policy: no-referrer`. HTML uses `same-origin`, which suppresses external referrers while preserving the Origin header required for same-origin native login/logout forms. Login HTML disallows scripts and external resources through CSP. Authenticated content permits same-origin framing for the experiment workspaces. Version preview URLs and observability are disabled.

The server compares the password's SHA-256 digest with a secret. This requires a generated high-entropy password, not a short human-chosen one. Sessions use a version, expiry, random nonce and HMAC-SHA-256 signature. Cloudflare's native login rate limiter is local to each Cloudflare location and eventually consistent; it is a best-effort slowdown, not a globally exact limit. Someone with the password can view or save the website and its images.

Official references: [Worker-first asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), [asset bindings](https://developers.cloudflare.com/workers/static-assets/binding/), [native rate limits](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/), and [form Origin/referrer behavior](https://fetch.spec.whatwg.org/#origin-header).

## Build and deployment

First build the production frontend with protected references enabled. From the repository root:

```sh
npm run site:build
npm run site:check
npx wrangler deploy --config workers/references/wrangler.toml --dry-run
```

`site:build` builds the frontend with private references enabled and the protected search URL, then runs asset staging. `site:check` type-checks the Worker and runs its 19 tests. `site:dev` runs the local protected Worker on port 8788; run `site:build` first and provide local-only development secrets. `site:deploy` rebuilds the protected site and deploys it.

The staging script consumes that finished `dist` directory and the selected private originals. It rejects symlinks, unexpected local source entries, unsupported frontend file types and source metadata. It verifies unchanged bytes for every copy and stages the complete site in the gitignored `.wrangler/protected-site-assets` directory. It generates only non-secret path lists for the Worker. The original screenshots remain gitignored under `local-references/`.

Cloudflare requires two Worker secrets supplied securely through stdin or its dashboard, never command-line arguments or source files:

- `REFERENCE_PASSWORD_SHA256`: the generated password's SHA-256 digest, exactly 64 lowercase hexadecimal characters.
- `SESSION_SECRET`: a separate high-entropy signing secret, recommended 32 random bytes encoded as 64 lowercase hexadecimal characters.

An upload without these secrets remains inaccessible. After configuring the secrets, deploy using `npm run site:deploy`. Never log passwords, digests or cookies. Before release, verify the native browser login and lock forms, anonymous script/image/search denial, authenticated original-byte hashes, query routes, recording range requests and the GitHub Pages redirect.

## Release record — 6 October 2026

Anuj explicitly authorized uploading all private references to this Cloudflare destination and then clarified that the entire website must share the password gate. The initial reference-only upload completed as version `0e75ee67-f5ec-445e-9a0b-797f94ab8675` without secrets and remained closed to access. That initial upload has now been replaced by the complete protected website. The deployment and live checks below record its current status.

Local browser verification passed: the native form showed wrong-password feedback, successful login preserved the exact experiment query, the original Cloudflare screenshot loaded at 1271 × 1108, and **Lock site** returned to the login form. All 18 Worker tests passed.

The release scan checked 233 public source/build files and found no credentials or copies of private-original image bytes. The prepared Pages artifact contains exactly `index.html`, `404.html`, and `.nojekyll`. These local implementation and artifact checks preceded the live verification below.

The protected website is deployed from application source commit `57b6cd597a26fc5f94465bfd1b1db9a5b9bc2d94` as Worker version `49b5db95-bac5-4148-904e-838218424107`, with both required secrets configured. The internal-only search Worker is version `2d7e1675-25ec-438c-9132-ca0900efa7e8`; its former public endpoint returned HTTP 404.

Live HTTP checks confirmed that pages, JavaScript, original references, search status and unknown paths return HTTP 401 without access. Wrong passwords return 401; valid login returns 303 and sets the expected HttpOnly, Secure, SameSite=Lax cookie with a 3600-second lifetime. All 51 authenticated original images matched the SHA-256 hashes of their local originals. A modified cookie returned 401, and logout returned 303.

The live browser confirmed native login, the decoded Cloudflare Containers original at 1271 × 1108, home navigation, and authenticated “event promotions” search returning both GitHub and Cloudflare experiments. **Lock site** returned to the login form. The login form fits a 320px viewport. The final home lock-control adjustment was checked locally at a 320px viewport with a 320px document width.

The migration is complete. [GitHub Pages redirect workflow 37488481377](https://github.com/anujprajapatiii/blueprint-wireframe-kit/actions/runs/37488481377) succeeded on 6 October 2026 at 21:08:09 IST (`2026-10-06T15:38:09Z`). Live HTTP checks found only the 582-byte redirect HTML at the old Pages base URL, with HTTP 200 and no module script. The old `references/github-event-banner/original.png` URL returned HTTP 404 with that same 582-byte redirect fallback, rather than the original image.

The browser followed the former Pages URL with `?view=experiments&source=Cloudflare&experiment=cf-containers-gate&mode=reference` to the protected Worker, preserving the exact path and query. Logged-out access showed **Unlock Blueprint**. The [live password-gate screenshot](../../docs/reviews/2026-10-06/password-gate-live.jpg) records this result without exposing credentials or private originals.


## Release record — 9 October 2026

Anuj authorized publishing the latest revision, including five Tally experiments and eight original screenshots to the existing protected website. The private allowlist now contains 59 images and the internal search catalog contains 28 experiments. Website version `fcd737ac-48ff-4297-a27d-c3009a019fce` and search version `7283703f-2189-4f96-afce-5c24566e7d4a` are deployed with the existing password and service boundaries.

The build, 18 gate tests and 8 search tests passed. Live checks confirmed anonymous denial, valid login and preserved routes, all 59 original hashes, all 35 HTML/JS/CSS build hashes, Tally search, modified-cookie denial, logout, and the retained Pages redirect. Browser review confirmed the Tally original at 1271 × 1108. The recording request returned the complete byte-identical file (200); live partial responses were not verified. See [the release record](../../docs/reviews/2026-10-09/published-release.md) for evidence and limits.


## Release record — 13 October 2026

Anuj selected publishing the four finished Gamma experiments and their registered original screenshots to this same password-protected website, then explicitly confirmed the upload scope. Website version `089172be-e4a0-4aa4-a658-f103ba275e6e` and internal search version `d3ccc263-3dfd-4501-8247-4dec4363305d` are deployed. The released catalog contains 32 experiments and the private allowlist contains 72 images, preserving the previous 59 and adding only Gamma captures 04–16. The three Gamma onboarding captures, provenance and local review images are excluded.

The production build, 18 gate tests, 8 search tests and both dry runs passed. Password, signing secret, quotas and service binding remain unchanged. No inference was invoked during this release. See [the release record](../../docs/reviews/2026-10-13/published-release.md) for completed live checks and their limits.

## Growth release record — 13 October 2026

Anuj explicitly authorized publishing the new Linear interactive demo, Gamma shared-folder experiment and Tally workspace-entry update, then confirmed inclusion of all 17 registered original screenshots on this same password-protected website. Website version `2005341b-daa9-49fa-be9f-bbd3c71bcd1d` and internal search version `4827c0e4-1ad9-471a-a98d-e38b0904d6f8` are deployed. The catalog contains 34 experiments and the staged release contains 61 website files and 89 private originals, preserving the previous 72 and adding only Gamma 8, Linear 7 and Tally 2 registered captures. Supporting captures and provenance remain excluded.

The production build, 18 gate tests, 8 search tests and both deployment dry runs passed. The existing password and service boundaries remain in place. See the [growth release record](../../docs/reviews/2026-10-13/published-growth-release.md) for live verification status and evidence. Earlier release records above retain their original scope and counts.


## URL migration — 15 October 2026

Anuj requested removing “portfolio” from the live address. The existing Worker now serves `https://blueprint.anujprajapati.com/blueprint-wireframe-kit/`, with the same password and protected assets. The former workers.dev address redirects navigation to the custom domain while preserving paths and queries. Search now uses the current origin's `/search` endpoint. The account subdomain and portfolio custom domains remain unchanged.

The production build, 19 gate tests and deployment dry run passed. Live checks verified the same-password login, anonymous denial, all 150 asset hashes, configured search, invalid-session denial, logout and old-link redirects. The browser confirmed the new-host login form. Worker version: `68f04a93-9201-4c43-80d4-33c13d1ea4a1`. See the [migration record](../../docs/reviews/2026-10-15/url-migration.md).


## Generic address — 15 October 2026

Anuj clarified that the live address must use neither his personal domain nor “portfolio”. The live website is now `https://blueprint-patterns.pages.dev/blueprint-wireframe-kit/`, connected through a minimal Pages gateway to the same protected Worker. Anuj explicitly approved adding Pages write access; the existing permissions were retained.

The personal `blueprint.anujprajapati.com` attachment was removed and is unreachable. The portfolio's own apex and www custom domains remain unchanged. The previous workers.dev link redirects to the generic address. See [the final generic-address record](../../docs/reviews/2026-10-15/generic-url.md) and [gateway setup](../gateway/README.md).
