# Password-protected Blueprint website

This implementation places the entire Blueprint website, its JavaScript and styles, search, public source recordings, and all 51 private original JPEGs behind one password at `https://blueprint-private-references.portfolio-v5.workers.dev/blueprint-wireframe-kit/`. The prepared GitHub Pages artifact contains only a redirect; live deployment verification is in progress. This service uses the same Cloudflare destination explicitly approved by Anuj; it does not publish originals to GitHub Pages or Git.

## Access contract

Anonymous requests to any website, image, script, recording, search or unknown URL receive only a small inline password form with HTTP 401. The form contains no external scripts or assets. Non-loopback HTTP requests redirect to HTTPS before the form is displayed.

`POST /session` accepts a bounded, URL-encoded form with `password` and `returnTo`. The request's `Origin` must equal the service origin. A correct password creates a signed session cookie and redirects to a validated path within `/blueprint-wireframe-kit/`, preserving the requested view's query string. Invalid passwords receive plain feedback; five login attempts per minute per IP trigger a one-minute wait.

The `__Host-blueprint-access` cookie is `HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`. The frontend never reads the token or stores the password. Access expires after one hour. `POST /logout`, also checked for the exact same origin, expires the cookie and returns to the website. Rotating either server secret invalidates existing sessions.

Once authenticated, requests can fetch only the generated website allowlist and the 51 exact paths in `allowlist.json`: 38 ElevenLabs captures and 13 Cloudflare captures. Originals retain their exact bytes at `/blueprint-wireframe-kit/__private-references/{source}/{filename.jpg}`. Archives, research metadata and provenance are excluded. Authenticated video requests support `Range` and `If-Range`, allowing the existing Notion and Steam recordings to seek.

## Search

The gate proxies only authenticated `GET /search/status` and same-origin `POST /search` through the `SEARCH_SERVICE` binding to `blueprint-jev-search`. Search bodies are capped at 3 KiB; cookies and arbitrary client headers are never forwarded. The service supplies the upstream's existing origin constant and connecting IP. Search has no public Worker endpoint. A missing search binding disables search without bypassing the website password or blocking other authenticated pages.

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

`site:build` builds the frontend with private references enabled and the protected search URL, then runs asset staging. `site:check` type-checks the Worker and runs its 18 tests. `site:dev` runs the local protected Worker on port 8788; run `site:build` first and provide local-only development secrets. `site:deploy` rebuilds the protected site and deploys it.

The staging script consumes that finished `dist` directory and the selected private originals. It rejects symlinks, unexpected local source entries, unsupported frontend file types and source metadata. It verifies unchanged bytes for every copy and stages the complete site in the gitignored `.wrangler/protected-site-assets` directory. It generates only non-secret path lists for the Worker. The original screenshots remain gitignored under `local-references/`.

Cloudflare requires two Worker secrets supplied securely through stdin or its dashboard, never command-line arguments or source files:

- `REFERENCE_PASSWORD_SHA256`: the generated password's SHA-256 digest, exactly 64 lowercase hexadecimal characters.
- `SESSION_SECRET`: a separate high-entropy signing secret, recommended 32 random bytes encoded as 64 lowercase hexadecimal characters.

An upload without these secrets remains inaccessible. After configuring the secrets, deploy using `npm run site:deploy`. Never log passwords, digests or cookies. Before release, verify the native browser login and lock forms, anonymous script/image/search denial, authenticated original-byte hashes, query routes, recording range requests and the GitHub Pages redirect.

## Release record — 6 October 2026

Anuj explicitly authorized uploading all private references to this Cloudflare destination and then clarified that the entire website must share the password gate. The initial reference-only upload completed as version `0e75ee67-f5ec-445e-9a0b-797f94ab8675` without secrets and remained closed to access. This implementation replaces that upload with the complete protected website; final deployment and browser verification are in progress.

Local browser verification passed: the native form showed wrong-password feedback, successful login preserved the exact experiment query, the original Cloudflare screenshot loaded at 1271 × 1108, and **Lock site** returned to the login form. All 18 Worker tests passed.

The release scan checked 233 public source/build files and found no credentials or copies of private-original image bytes. The prepared Pages artifact contains exactly `index.html`, `404.html`, and `.nojekyll`. These are local implementation and artifact checks; whole-site deployment and live verification remain in progress.
