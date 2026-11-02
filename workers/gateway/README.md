# Generic-host gateway

This Cloudflare Pages project forwards requests directly to the existing protected
site through the `PROTECTED_SITE` service binding. It contains no app bundle,
original screenshots, passwords, or signing keys. The protected site continues to
authenticate every request.

Only the exact `CANONICAL_HOST` is accepted. Pages deployment and branch aliases
return a non-cacheable 404. A missing binding or failed service returns a
non-cacheable 503. The static fallback is empty.

Build and check from the repository root:

```sh
node --test workers/gateway/gateway.test.mjs
node workers/gateway/build.mjs
```

The build stages exactly `_worker.js`, `_routes.json`, and an empty `404.html` in
ignored `.wrangler/generic-gateway/`. Deploy with `workers/gateway/wrangler.toml`
only after the current revision is explicitly authorized for publication. Set the
Pages production branch to `main`. Keep the configured project name and canonical
host aligned if the assigned `pages.dev` address changes.


Live address: `https://blueprint-patterns.pages.dev/blueprint-wireframe-kit/`.
Pages production and preview settings both use `fail_open = false`. Preview hosts
are also rejected by the gateway itself. The production service binding points to
`blueprint-private-references` and holds no password or signing secret.

After authorization, deploy the prepared gateway from the repository root:

```sh
npx wrangler pages deploy --cwd workers/gateway --project-name blueprint-patterns --branch main --commit-dirty=true
```

Check the live password gate, same-origin login/search, original-file hashes,
preview-host rejection and fail-closed project settings after changing routing.
