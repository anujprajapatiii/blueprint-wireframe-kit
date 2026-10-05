# Containers paid capability gate

- **Stable ID:** `cf-containers-gate`
- **Direct route:** `?view=experiments&experiment=cf-containers-gate`
- **User intent and scope:** Reconstruct the explicit premium capability boundary at Containers entry as a normal indexed experiment, including the observed checkout and exit.
- **Reference:** Authenticated Cloudflare Containers and its Workers Paid checkout, inspected 5 October 2026. Private source URLs and account details stay in local provenance.
- **Evidence:** `cf-06-containers-gate` and `cf-07-containers-checkout-boundary`, each 1271 × 1108, full visible viewport without cropping.

## Observed structure and behavior

The product heading says “Containers” with “Enhance your Workers with serverless containers.” Below it, a bounded, centered card says “Enable Containers” and “Containers is included in the Workers Paid plan. To start using Containers, upgrade your Workers plan.” It offers “Purchase Workers Paid” and “View pricing”.

Purchase Workers Paid opens the same Workers Paid checkout observed from plans, including empty billing/payment fields and a $5/month order summary. Here “Exit checkout” returns to Containers. No purchase was attempted, no Containers product was enabled and no product activation was observed.

The View pricing link points to `https://developers.cloudflare.com/containers/pricing/`. That target was observed as a link, but its destination content was not inspected. Sidebar navigation, heading, documentation control and footer remain surrounding product context.

## Proportions and context

| Region         | Source measurement                                                   | Wireframe treatment                                                         |
| -------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Shell          | 1271 × 1108 viewport; approximately 260px sidebar and 58px header    | Preserve expanded Compute navigation and main boundary                      |
| Product header | Main heading near x=292, y=94; divider near y=172                    | Keep header outside the highlighted offer                                   |
| Gate card      | Approximately x=292, y=200, width=946, height=363                    | A broad card with centered icon, title, requirement copy and paired actions |
| Footer         | Begins near y=1025, leaving substantial empty context below the card | Retain the spacious product entry rather than enlarging the gate            |

The entire offer card is yellow: title, requirement, purchase action and pricing alternative form one complete premium gate. Its shell and checkout are blue. The landscape SVG thumbnail summarizes the same hierarchy with compressed empty vertical space; it never mounts the live experiment.

## Admission and classification

The first Jev assessment returned `needs_review`: premium gate confidence 1.00, monetization 0.93 and the proposition's growth role 0.99. The View pricing component role remained uncertain (confidence 0.26), so this was not an unconditional model approval.

Manual inspection treats the bounded card as the complete intervention. View pricing supplies an alternative within this explicit paid proposition; the link alone remains ordinary navigation and is not separately admitted. The gate connects requested capability access to purchase, which supports **monetization**. A previous paid relationship was not established, and no activation outcome was observed.

A refined submission was rejected by automatic approval review over account-usage context and downstream authorization. It was not retried. This manual admission preserves the initial model uncertainty and does not claim later Jev endorsement, purchase completion or measured lift.

## Prototype decisions and limits

- Purchase Workers Paid opens a local checkout boundary with disabled payment fields and no live billing submission.
- Exit returns to Containers; this differs deliberately from the Workers plans flow's exit to Workers & Pages.
- View pricing identifies the observed documentation destination without pretending its contents were inspected or reconstructed.
- Private account identifiers and values are absent from the prototype. The unchanged originals remain accessible only through the local reference endpoint.
- Guide me explains the explicit paid requirement and invited purchase at the gate; it does not activate the feature or treat checkout fields as a second intervention.
- The checkout’s +8/+5 inclusion summaries remain static because their expanded contents were not inspected.
- Narrow-screen reflow is a prototype provision; no source mobile view was observed.

- The sidebar, search and other non-focal context are intentionally limited to the observed study. Cross-pattern links open the independently indexed experiment and preserve directory filters; Workers & Pages stays as local supporting context.
- No custom source motion is inferred. The shared guide respects reduced motion in code; OS-level reduced-motion behavior was not exercised in this review.

## Local review

Reviewed locally on 5 October 2026 at 1271px and 320px. The desktop gate retains the header, broad centered card and empty lower context. The card and its stacked mobile actions fit 320px; the one-step guide remains readable. Purchase opens the disabled checkout and Exit returns to the gate. The lower checkout order summary remains reachable on mobile. The original reference loaded at 1271 × 1108. Opening from Cloudflare + Monetization + Flow, switching reference modes and returning to All experiments retained all three filters. See the [shared review record](../reviews/2026-10-05/cloudflare-local-review.md) for captures and build/privacy checks.

The pricing destination and product activation were not exercised. Nothing was published.
