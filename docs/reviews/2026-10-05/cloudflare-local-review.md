# Cloudflare local review — 5 October 2026

Three independently indexed experiments are ready for local review in the existing Blueprint repository. Nothing was published, pushed or deployed. No Cloudflare purchase, product activation, invitation or account-setting change occurred.

## Delivered experiments

| Experiment                      | Admission                                                         | Connected local states                                               | Local link                                                                                             |
| ------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Agent onboarding promotion      | Explicit feature promotion; provisional engagement interpretation | Home → copied feedback; local dismissal → library Restart            | [Open](http://127.0.0.1:5173/blueprint-wireframe-kit/?view=experiments&experiment=cf-agent-onboarding) |
| Workers paid-plan comparison    | Explicit Free-to-Paid proposition; monetization                   | Stacked plans → disabled checkout → Workers & Pages; Restart → plans | [Open](http://127.0.0.1:5173/blueprint-wireframe-kit/?view=experiments&experiment=cf-workers-plans)    |
| Containers paid capability gate | Explicit paid requirement at capability entry; monetization       | Containers → disabled checkout → Containers                          | [Open](http://127.0.0.1:5173/blueprint-wireframe-kit/?view=experiments&experiment=cf-containers-gate)  |

Every item includes a landscape SVG preview, structured design intent, observed/adapted/unknown evidence, private reference registration and shared state-aware Guide me targets. Ordinary checkout, navigation and the usage Upgrade control are context rather than additional admissions.

## Actual browser checks

- Compared the reconstructed desktop layouts with the captured source at 1271px width. Standalone review viewport was 1271 × 1164, leaving approximately 1107px of application height beneath the 57px library guide toolbar; source originals are 1271 × 1108. Sidebar/header separation, plan stacking, lower comparison, gate placement and main/sidebar scrolling are retained. Blueprint typography and generic account content are adaptations, not pixel-identical source reproductions.
- Checked all three entry screens at 320 × 800. Cards, actions and guides fit the viewport without document-level horizontal overflow. Plan comparison cells reflow into labeled vertical groups. The lower checkout order summary remains reachable by scrolling. The index, workspace controls and reference view also fit 320px. Mobile source behavior was not observed.
- Activated the home pill with Enter, observed transient copied feedback, opened the post-action guide after the toast disappeared, dismissed the promotion, and used library Restart to restore it. Dismissal focuses the hero; mobile menu Escape focuses Menu. The local simulation never reads or writes the clipboard.
- Exercised plans Upgrade with keyboard, disabled checkout fields and actions, Exit checkout to Workers & Pages, and Restart to plans. Exercised Containers Purchase → checkout → Exit to the gate. No billing input or agreement can be submitted by the wireframe.
- Exercised Guide me Next/Back, close button and Escape. The guide did not advance checkout. Parent-workspace Escape returned keyboard focus to Guide me; standalone close did the same. Checkout and dismissed home have no growth targets. Corrected shared focus restoration and Driver header/footer landmark semantics discovered during this review.
- Verified the Workers & Pages shortcut from home opens the supporting Workers screen, rather than mistakenly opening plans. Cross-pattern links route to the independent experiment while preserving directory filters.
- Verified Cloudflare source filtering shows three separate cards. Cloudflare + Monetization + Flow shows two. Opening a flow, switching original/wireframe mode, changing the plan reference, and returning via All experiments preserve the relevant filters. Direct route reload restores the entry state, including the Containers workspace after the final development-server restart.
- Loaded originals in the home, plans and Containers viewers at their natural 1271 × 1108 dimensions. The home original also loaded in the 320px workspace. Reference switching preserves the ongoing local wireframe state; Restart resets it.
- The development axe audit reported no violations for the home, plans, Containers and final active plans guide states checked. Some color-contrast checks remained incomplete (12 on home, 73 on initial mobile plans, 84 in the active mobile plan guide, and 1 on the Containers entry). This is a focused audit, not a claim of complete WCAG conformance.

No custom source animation was inferred. Shared guide reduced-motion support was checked in code; an OS-level reduced-motion setting was not exercised. Uninspected contact/pricing destinations, checkout expanders, payment completion, agent setup, source dismissal persistence and business outcomes remain outside the evidence boundary.

## Build and privacy checks

`npm run build` passed: TypeScript, Vite, 56 semantic-role mappings and 308 defined token contrast pairs. Lowest tested text pair was 4.53:1 and boundary/focus pair 3.26:1. These checks cover defined opaque token pairs, not every rendered combination. `git diff --check` passed.

Nine original JPEGs remain unchanged in the gitignored private source directory. Their recorded SHA-256 values match the captured files. The development-only exact allowlist serves the nine originals; unknown files, provenance, traversal, foreign origin/host, cross-site requests and unsupported methods were rejected. The final read-only endpoint review passed 23 checks, including Vite direct-path/@fs protections. The production output and public directory contain no original Cloudflare captures, private source URLs or inspected account identifier. Private provenance and Jev reports remain local.

## Full-viewport review captures

The following JPEGs contain generic local prototypes only. Original authenticated source images are deliberately excluded from this tracked review folder.

| Context                        | Captures                                                                                                                                                                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Index and filters              | [Desktop index](cloudflare/index-desktop.jpg), [final preview](cloudflare/index-desktop-final.jpg), [combined filters](cloudflare/filtered-index-desktop.jpg), [320px index](cloudflare/index-320.jpg)                                                                                                    |
| Home promotion                 | [Desktop](cloudflare/home-desktop.jpg), [copied feedback](cloudflare/home-copy-desktop.jpg), [320px](cloudflare/home-320.jpg), [post-copy guide](cloudflare/home-copy-guide-320.jpg), [320px workspace](cloudflare/workspace-320.jpg)                |
| Plans                          | [Desktop](cloudflare/plans-desktop.jpg), [checkout](cloudflare/plans-checkout-desktop.jpg), [320px](cloudflare/plans-320.jpg), [comparison reflow](cloudflare/plans-comparison-320.jpg), [benefits guide](cloudflare/plans-highlights-guide-320.jpg) |
| Containers and shared checkout | [Desktop](cloudflare/containers-desktop.jpg), [320px](cloudflare/containers-320.jpg), [guide](cloudflare/containers-guide-320.jpg), [checkout fields](cloudflare/checkout-320.jpg), [order summary](cloudflare/checkout-summary-320.jpg)             |

## Admission uncertainty

Three initial live Jev reviews returned `needs_review`. Automatic approval review blocked the refined submission over account-usage context and downstream authorization; that submission did not execute and was not retried. Admission was completed manually from the inspected intervention, with model uncertainty retained. No model endorsement or measured lift is claimed. Full evidence and report IDs are in [the intake continuation](cloudflare-intake.md#continuation-authenticated-access-restored) and the three experiment records.
