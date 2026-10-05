# Workers paid-plan comparison

- **Stable ID:** `cf-workers-plans`
- **Direct route:** `?view=experiments&experiment=cf-workers-plans`
- **User intent and scope:** Reconstruct the explicit Workers Paid proposition as an individual growth experiment, retaining the observed checkout boundary and return destination.
- **Reference:** Authenticated Cloudflare Workers plans, checkout and Workers & Pages overview, inspected 5 October 2026. Private source URLs and identifiers remain in local provenance only.
- **Evidence:** `cf-03-workers-plans`, `cf-04-workers-checkout-boundary`, `cf-05-workers-usage`, `cf-08-workers-comparison-scroll` and `cf-09-workers-highlights`, each 1271 × 1108, full visible viewport. The primary capture preserves top-of-page framing; `cf-09-workers-highlights` records the stacked highlights at approximately scrollY=616, and `cf-08-workers-comparison-scroll` records the lower Compute rows.

## Observed structure and behavior

At the captured width, Free, Paid and Enterprise stack vertically. Free shows “$0”, “For personal use and simple applications” and “Current plan”. Paid shows “$5 / month + usage”, “For business use and scaling applications” and “Upgrade”. Enterprise shows “Let's talk”, “For mission-critical applications at scale” and “Contact us”.

Highlights distinguish Free's 100,000 requests per day, up to 10 ms CPU per request and community support. The Paid copy is “10 million requests included monthly, then $0.30 per million”, “Up to 5 min CPU time per request”, “Standard ticket support” and “Containers & Email sending included”. Below these stacked highlights, Compute comparison rows put each metric label above three adjacent Free/Paid/Enterprise cells.

Upgrade opens “Upgrade to Workers Paid” at the route template `/<account>/workers/checkout/payment`. The checkout has empty billing/payment fields and a $5/month order summary. No field, terms control, confirmation or purchase was acted on. “Exit checkout” returns to Workers & Pages, rather than the plan comparison. This overview includes a standalone Upgrade control next to usage; it remains blue context and does not become a fourth catalog item. Enterprise contact was not inspected.

The source contains a discrepancy: the plan highlights say up to 5 minutes CPU per request, while checkout says 30 seconds per request and 30 million CPU milliseconds per month. Preserve both in their observed states. The reconstruction does not decide which promise applies.

## Proportions and context

| Region       | Source measurement                                                             | Wireframe treatment                                              |
| ------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Shell        | 1271 × 1108 viewport; approximately 260px sidebar and 58px header              | Preserve the expanded Compute navigation and content boundary    |
| Main content | Approximately x=292 through x=1238                                             | Wide content with a 32px inset from the sidebar                  |
| Plan offers  | Free starts near y=192, Paid y=416, Enterprise y=640; actions about 900 × 38px | Preserve stacked offers at the source viewport and broad actions |
| Highlights   | Starts around y=818 and continues below the viewport                           | Keep the comparison after the offers, with page scrolling        |

Only the Paid proposition is yellow; Free, Enterprise, navigation and ordinary checkout fields remain blue. Paid highlights that substantiate the proposition may carry the same scope. The static landscape thumbnail compresses vertical context and moves a short Paid-benefit summary into its Paid panel so Free/Paid contrast remains legible; it is not a substitute for the full original or live layout.

## Admission and classification

The first Jev assessment returned `needs_review`, identifying plan framing at confidence 0.83 with unresolved classification, component-role and evidence flags. These signals were advisory and did not establish admission.

Manual admission is grounded in the observed Paid benefit, price and Upgrade proposition. **Monetization** is the primary interpretation because Free is explicitly the current Workers plan. An existing paid commercial relationship was not established, so expansion is not justified. The ordinary checkout is a continuation boundary, not a separate growth intervention.

A refined submission was rejected by automatic approval review over account-usage context and downstream authorization and was not retried. No later model approval is claimed. A proposed paid-conversion measure is untested; source purchase completion and causal lift remain unknown.

## Prototype decisions and limits

- Local Upgrade opens the bounded checkout preview. Payment fields and final payment actions do not accept or submit billing data.
- Exit follows the observed return to Workers & Pages; local navigation can return to the plans to restart review.
- Source prices and limits are captured copy, not a guarantee of current product pricing. Preserve the observed CPU discrepancy.
- Usage metrics and private names are generic. The original full-viewport captures remain local and unchanged.
- Uninspected Enterprise and documentation destinations are explicitly bounded.
- Guide me targets Paid framing and its capacity proposition. Payment execution and blue context are not explained as new growth interventions.
- The checkout’s +8/+5 inclusion summaries remain static because their expanded contents were not inspected.
- Narrow-screen reflow is a prototype adaptation; no source mobile layout was inspected.

- The sidebar, search and other non-focal context are intentionally limited to the observed study. Cross-pattern links open the independently indexed experiment and preserve directory filters; Workers & Pages stays as local supporting context.
- No custom source motion is inferred. The shared guide respects reduced motion in code; OS-level reduced-motion behavior was not exercised in this review.

## Local review

Reviewed locally on 5 October 2026 at 1271px and 320px. The stacked offers and lower comparison preserve the observed reading order and main/sidebar scroll separation. At 320px, each comparison metric reflows to labeled Free/Paid/Enterprise rows without document overflow. Upgrade opens the disabled checkout, keyboard focus starts at Exit checkout, and exit returns to Workers & Pages. Restart returns to plans. The two-step guide supports Next/Back and dismissal without advancing checkout; checkout has no growth targets. Reference selection, direct refresh, combined filters and return navigation passed. Captures and build/privacy checks are in the [shared review record](../reviews/2026-10-05/cloudflare-local-review.md).

Payment execution, source mobile behavior, source checkout expanders and conversion outcomes remain unverified. Nothing was published.
