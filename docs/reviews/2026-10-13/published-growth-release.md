# Published Linear, Gamma and Tally update — 13 October 2026

Anuj asked to publish the new Linear and Gamma experiments and Tally update to the existing password-protected website, then explicitly confirmed uploading all 17 originals (7 Linear, 8 Gamma, 2 Tally). The initial automatic approval rejection was resolved by that specific confirmation before the upload.

## Released scope

- Website: https://blueprint-private-references.portfolio-v5.workers.dev/blueprint-wireframe-kit/
- Website Worker: `2005341b-daa9-49fa-be9f-bbd3c71bcd1d`.
- Internal search Worker: `4827c0e4-1ad9-471a-a98d-e38b0904d6f8`.
- Added `linear-interactive-demo` and `gamma-shared-folders`; updated `tally-plan-comparison` with its connected workspace entry.
- Library and search catalog: 34 experiments. Protected assets: 61 website files and 89 unchanged originals, preserving all previous 72 originals and adding the selected 17.
- Password, signing secret, session rules, internal service binding and search quotas are unchanged. No inference was invoked. No GitHub push or commit was performed.

The 17 new originals include 15 exact 1440 × 900 captures and two unchanged 1425 × 891 Gamma promotion captures. The dismissed one-time promotion could not be recaptured; that documented exception remains visible in the experiment notes. Supporting earlier captures, provenance, research archives and review images remain excluded. All private originals remain gitignored and are served only after site authentication.

## Validation

The production build passed, including TypeScript, 56 semantic token roles and 308 defined contrast pairs. All 18 gate tests, all 8 search tests and both deployment dry runs passed. The updated search projection matches the registry and contains no private-reference URLs, local paths or account identifiers. A 153-file source/build scan found no saved credentials or private original image bytes in the frontend bundle.

Live checks used normal certificate verification:

- Anonymous pages, JavaScript, CSS, recordings, originals from all three new source folders, search status and unknown paths returned 401 with only the inline password form and no-store policy.
- Login returned 303 and preserved the exact Linear experiment/reference query. Cookie flags remain HttpOnly, Secure, SameSite=Lax, Path=/ and Max-Age=3600.
- All 89 original hashes and 61 website-file hashes matched the immutable prepared snapshot. The three updated experiment routes returned the application.
- Excluded supporting captures and provenance returned 404 after authentication.
- Authenticated search status reported configured. Search’s public endpoint remained 404, and GitHub Pages remained redirect-only without an application module script.
- Modified cookies were rejected; logout expired the cookie.

The authenticated browser decoded Linear at 1440 × 900, the retained Gamma promotion at 1425 × 891 and the new Tally gate at 1440 × 900. It checked Linear’s welcome-to-issues route, Gamma’s Manage access explanation and dismissal, and Tally’s Back → New workspace → paid plans path. Existing browser authentication was reused; native login was verified through the HTTP form flow for this release. Earlier desktop/mobile review remains in [the local review](local-growth-review.md).

Live recording byte identity passed as part of the complete asset check; partial-response/seek behavior was not rechecked. No exhaustive accessibility or motion claim is made. The browser proof is 1265 × 712 and remains in ignored `local-references/review-2026-10-13/published-growth-release.jpg`; it is separate from unchanged source originals and is not uploaded.

[Exact release hashes and non-sensitive check results](growth-release-check.json).
