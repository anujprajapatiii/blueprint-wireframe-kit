# Protected Gamma release — 13 October 2026

Anuj selected publishing the four finished Gamma experiments and their registered original screenshots to the existing password-protected website, then explicitly confirmed that scope. The concurrent new-pattern research remains local and is not included in this release.

## Deployment

- Website: https://blueprint-private-references.portfolio-v5.workers.dev/blueprint-wireframe-kit/?view=experiments&source=Gamma
- Website Worker version: `089172be-e4a0-4aa4-a658-f103ba275e6e`.
- Internal search Worker version: `d3ccc263-3dfd-4501-8247-4dec4363305d`.
- Released search catalog: 32 experiments, including `gamma-feature-tour`, `gamma-credit-upsell`, `gamma-referral-credits` and `gamma-plan-comparison`.
- Protected originals: 72 total — the previous 59 plus 13 Gamma captures, all 1440 × 900.
- Gamma captures 04–16 are the exact selected viewer references. Onboarding captures 01–03, provenance and local review images are excluded.
- Password, signing secret, quotas, service binding and Pages redirect remain unchanged. Originals and credentials remain gitignored. No GitHub push occurred.

## Completed verification

- Production build, 56 semantic token-role checks and 308 contrast-pair checks passed.
- All 18 gate tests and 8 search tests passed. Both deployment dry runs passed.
- A scan of 170 source/build files found no saved credentials or private-original image bytes.
- The four Gamma search records contain only public index metadata, without prices, account identity, private-reference URLs or local paths. No inference was invoked.
- Live anonymous requests for HTML, JavaScript, CSS, recordings, a Gamma original, search status and unknown paths returned HTTP 401 with only the inline password form and no-store policy.
- Valid login returned 303, preserved the exact Gamma experiment/reference query and set the existing HttpOnly, Secure, SameSite=Lax one-hour cookie.
- All 72 live originals and all 51 live website files matched the prepared local snapshot exactly. This includes the 13 newly uploaded Gamma originals and the previously published originals and recordings.
- All four Gamma experiment routes returned the authenticated application.
- Excluded Gamma onboarding captures, provenance and review paths returned 404 after authentication.
- Authenticated internal-search status reported configured. Its public endpoint returned 404.
- Modified cookies were denied and logout expired the session cookie.
- GitHub Pages remained redirect-only, with no application module script.

Live checks used system curl with normal certificate verification. Recording byte identity was verified; live partial-response/seek behavior was not rechecked. Live browser review confirmed the native password form, preservation of the original Gamma experiment/reference query, the selected Original reference tab, and the complete Gamma 5 announcement image decoded at 1440 × 900. The browser-review proof (1098 × 975 pixels; the displayed original is 1440 × 900) is retained only in the gitignored `local-references/gamma/review/gamma-published-reference-2026-10-13.jpg`; it is not committed or included in the deployed assets.

[Non-sensitive check results and exact staged-file hashes](release-check.json).
