# Paid plans and annual saving

- **Stable ID:** `gamma-plan-comparison`
- **Direct route:** `?view=experiments&experiment=gamma-plan-comparison`
- **User intent and scope:** Reconstruct the observed individual/business comparison, billing choices and seat control without entering checkout or contacting sales.
- **Reference:** Signed-in Gamma free account, inspected 10 October 2026. Currency and prices are those shown to this account at capture time.
- **Evidence:** `gamma-13-plans-annual`, `gamma-14-plans-monthly`, `gamma-15-plans-business`, and `gamma-16-home-context`. Unchanged private JPEGs, **1440 × 900 full viewport**.

## Observed structure and behavior

Upgrade opened a large scrollable overlay headed “Choose the plan that’s right for you”. Individual and Business tabs were centered below the heading, with Close at the top-right. Individual opened on Pay annually, under “Save up to 26% with annual billing”.

| Individual plan | Monthly billing, per seat/month | Annual billing, per seat/month | Annual charge per seat |
| --------------- | ------------------------------- | ------------------------------ | ---------------------- |
| Plus            | ₹500                            | ₹400                           | ₹4,800                 |
| Pro             | ₹1,300                          | ₹950                           | ₹11,400                |
| Ultra           | ₹8,704                          | ₹7,833.25                      | ₹93,999                |

The cards paired a price and billing explanation with an upgrade action, then a list of differentiated benefits. Plus offered 1,000 monthly credits, up to 100 slides per prompt, branding removal and advanced AI image models. Pro, marked “Most popular”, offered 4,000 monthly credits, premium image models, custom branding, analytics/sharing, 10 custom domains and API access. Ultra offered 20,000 monthly credits, the most advanced AI models, 100 custom domains and early access to new features.

Business replaced the three individual cards with two centered cards. Business showed ₹3,482 per seat/month and ₹41,784 per seat billed annually, a Number of seats control and Upgrade to Business. Its listed capabilities included 10,000 monthly credits per seat, shared workspace credits, SSO, SOC 2 documentation, advanced AI models and data controls. Changing one seat to two left the displayed **per-seat** price unchanged.

Enterprise showed “Custom”, “Annual agreement, tailored to your rollout”, “Flexible team size” and Contact sales, with organizational controls and support benefits. The footer stated that taxes depend on location. No upgrade or sales-contact action was selected.

Within one open overlay, switching from monthly Individual to Business and back retained monthly billing. Closing and reopening returned to Individual with annual billing. No checkout total, payment form, trial, purchase confirmation or sales response was observed.

## Proportions and context

Measurements are approximate source bounds at 1440 × 900.

| Region           | Source measurement                                                                   | Wireframe treatment                                                                  |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Overlay          | x144, y16, width1152; extends through the visible viewport and scrolls to the footer | Preserve a wide bounded overlay with reachable close control and internal scrolling  |
| Individual cards | Three approximately 320px cards with 16px gaps, beginning near x224 and y279         | Keep aligned prices, actions and benefit sections; stack for narrow local review     |
| Business cards   | Two approximately 320px cards with 16px gap, beginning near x392 and y178            | Keep the centered two-card arrangement                                               |
| Surroundings     | Blue home visible in the left/right margins under a scrim                            | Keep enough context to establish an overlay, rather than a disconnected pricing page |

The whole overlay is one yellow intervention container. Header, tabs, billing controls, cards and footer share that scope. Individual benefit regions do not become partial yellow patches. The thumbnail scales the full source composition without stretching the source proportions.

## Admission and classification

Manual source-based admission: explicit paid benefits, plan prices, direct upgrade actions and an annual incentive establish **monetization** for the inspected free account. The business offer does not demonstrate expansion of an existing paid relationship. “Most popular” is preserved source framing, not independently validated purchasing data.

The automated curator request was blocked before any model assessment. No model endorsement is claimed. Proposed conversion and retained-use measures remain hypotheses in the metadata.

## Prototype decisions and limits

Preserve the exact displayed INR amounts, including Ultra’s unrounded ₹7,833.25 annual monthly equivalent. These are captured prices, not a current global pricing guarantee. The seat control must not invent a final payable total: the source continued to show a per-seat amount. Taxes and checkout totals were uninspected.

Upgrade and Contact sales stop at local preview boundaries. No subscription changes, payment attempts, trial activation or messages occur. Info markers and links whose behavior was not inspected must not claim unobserved outcomes. Source branding and gradients become shared tokens; narrow reflow is a local adaptation because no mobile source was captured.

## Local review

Reviewed on **10 October 2026**. Compared the annual overlay at 1440px and reviewed stacked Individual and Business layouts at actual 320px width. Checked monthly prices, audience reversal with retained cadence, seat count, reachable Ultra and sales boundaries, return focus and preserved choices. The mobile dialog begins below Guide me. In the shared workspace, original loading (1440 by 900), view switching with monthly state retained, Restart to annual, guide dismissal focus and return with Source plus Goal filters were verified.

Full-viewport proof captures are kept in ignored local reference review storage. All sixteen source originals were dimension-checked and preserved byte-for-byte. Focused accessibility scans after the fixes reported no violations; automatic modal-focus and some contrast checks required manual inspection. Token checks passed for 56 semantic roles and 308 contrast pairs, and the build passed with 1,748 modules. These checks do not establish complete accessibility conformance.

This revision remains local. No publication, Git push, Gamma-original upload, real invitation, content generation or payment was performed.
