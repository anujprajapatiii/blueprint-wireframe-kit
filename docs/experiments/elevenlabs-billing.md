# ElevenLabs billing wireframes

This record preserves the original import and subsequent implementation decisions. Active index inclusion is governed by the later [growth-focused curation](../reviews/2026-10-04/index-curation.md); removed IDs no longer open standalone experiment routes.

Added 4 October 2026. Source screenshots captured in the signed-in ElevenLabs application on the same date. The source URLs and growth definitions remain in each pattern's metadata.

## Intent and scope

Anuj requested functioning neutral wireframes for the collected patterns, with each pattern appearing independently in the experiment directory. These seven entries study distinct moments in the billing journey: recognizing capacity, comparing tiers, choosing cadence, considering an annual offer, reviewing commitment, adding prepaid capacity, and configuring continuity. Every URL opens its focal state directly; no payment or external account request is made.

| Stable experiment ID            | Focal entry and available behavior                                                                                                                                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el-balance-context-upgrade`    | Account menu starts open. Upgrade and Subscription open the local plan comparison; Account menu returns to the original entry. Click outside, Escape, and My account dismiss/reopen it.                                                     |
| `el-plan-value-ladder`          | Monthly Creative ladder. Scroll the plan row, change cadence, compare the observed Agents monthly ladder, or choose Creator Upgrade to enter the observed annual intercept.                                                                 |
| `el-annual-cadence-framing`     | The same observed comparison starts on Yearly, retaining monthly anchors and “Billed annually.” Monthly reverses the comparison.                                                                                                            |
| `el-annual-upgrade-intercept`   | Annual intercept starts open. Continue monthly advances to the observed final confirmation. Continue yearly states where the inspected evidence ends. Close, Escape, or outside click dismisses it; Reopen annual offer restores the entry. |
| `el-upgrade-commitment-clarity` | Final monthly confirmation starts open. Cancel/close dismisses; Reopen upgrade review restores it. Confirm explains that this is the inspected boundary and submits nothing.                                                                |
| `el-api-topup-amount-scaffold`  | Add credits starts open. Three amount presets and a custom number update the illustrative resulting balance. Cancel/close and Add credits reopen the dialog. The final action states the unobserved checkout boundary.                      |
| `el-api-auto-topup-continuity`  | Auto Top Up starts off with disabled fields as captured. Enable to adjust amount, threshold and optional cap locally. Save reports the local state without changing the account. Cancel/close and Auto Top Up reopen the dialog.            |

Direct URLs use `?view=experiments&experiment=<stable experiment ID>`.

## Inspected references and proportions

All eight relevant JPEGs were opened and visually inspected before implementation. These are content captures without browser/OS chrome. The small modal and menu captures are crops, so their position in an original viewport is not established.

| Evidence                      | Source dimensions | Geometry retained                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `04-account-upgrade`          | 224 × 674 px      | 224px account-menu width; two compact boxed account panels; balance action above ordinary navigation; roughly 12px inner padding. Unrelated bottom rows are abstracted.                                                                                                                                   |
| `05-plans-monthly`            | 1728 × 996 px     | Left rail approximately 255px / 14.8% of viewport. Pricing body x416–1568 = 1152px, approximately 78.2% of the remaining workspace. Two summary containers precede cadence controls and the plan row. Source cards approximately 242px each with 18px gaps, four full cards plus a partial fifth visible. |
| `06-plans-yearly`             | 1728 × 996 px     | Same frame and card geometry; annual equivalent appears beside the crossed-out monthly anchor, with commitment copy beneath.                                                                                                                                                                              |
| `07-annual-upgrade-intercept` | 512 × 238 px      | Maximum width 512px, 20px padding. The offer panel has a 28% icon column and 72% copy column. Two equal-width actions below.                                                                                                                                                                              |
| `08-upgrade-confirmation`     | 512 × 264 px      | Maximum width 512px, 20px padding, compact paragraphs, right-aligned cancel/confirm pair. The prototype adds a small no-charge disclosure beneath the actions.                                                                                                                                            |
| `35-api-credit-topup`         | 540 × 579 px      | Maximum width 540px, 20px padding; currency/amount row; right-aligned presets; three-row summary; tax disclosure; processing notice; final paired actions.                                                                                                                                                |
| `36-api-auto-topup`           | 540 × 681 px      | Maximum width 540px, 20px padding; switch in a split header row; three vertically stacked amount controls; tax and processing disclosure; final paired actions.                                                                                                                                           |
| `38-agents-plan-ladder`       | 1728 × 940 px     | Reuses the observed ladder with job-specific minutes/concurrency/seats. Unrelated chat panel and source chrome are abstracted.                                                                                                                                                                            |

At the smaller experiment viewer width, cards have a 190px minimum so the source's useful writing remains readable; fewer cards fit, and the row scrolls with buttons, touch, or keyboard. This is an explicit readability adaptation rather than a claim that the original app changes at the same breakpoint. The surrounding pricing body retains its measured desktop width ratio. Shared kit type, controls, and focus treatments replace source styles. No branded imagery or color is reproduced.

On narrow screens the navigation context is hidden, pricing summaries stack, the horizontal comparison stays within its own scroll region, dialog actions can stack, and dialog content scrolls within the viewport. Mobile was not included in the source evidence; this is a prototype adaptation.

## Preserved copy and privacy

Useful plan names, public prices visible in the captures, feature descriptions, savings claims, billing labels, upgrade charge, and tax/processing disclosures remain as observed. “Popular” and the 16% claim are source claims, not independent findings. The shared metadata preserves the analytical limitations.

Private usage, remaining balance, identity, workspace details, and cancellation timing are omitted. The account menu uses dashes for private figures. The Add credits dialog uses an explicitly illustrative zero starting balance, not a copied account balance. The wireframes do not request the original private assets and work in the public build without them.

The yearly Scale price was clipped in the screenshot and is therefore shown as not captured; it is not derived from a presumed discount. Agents yearly prices were not captured, so that control retains the observed monthly comparison and explains the boundary. A Creator monthly upgrade is the only checkout branch reconstructed from the observed sequence.

## Assumptions and boundaries

- Initial dialogs open directly to make each independent pattern reviewable. The underlying developer dashboard and home body are neutral structural context, not a reconstruction of unrelated source content.
- Preset selection, amount editing, enabling automatic top-up, and local cap validation are prototype mechanics suggested by visible controls. The original collection inspected these dialogs in their initial states; it did not exercise billing changes. A monthly cap below a single top-up is prevented as a local guard, not a claimed source validation rule.
- The annual branch, non-Creator upgrades, sales inquiry, payment success/failure, tax calculation, automatic funding execution, and cap enforcement remain unobserved. Their actions stop with explicit local boundary messages instead of invented outcomes.
- Closing and reopening preserves entered values for local comparison. This persistence is an implementation choice, not established account behavior.
- Radix shared Dialog/Popover own dismissal and keyboard handling. Upgrade review restores focus to its opener/reopen control. Plan scrolling honors reduced motion.

## Verification

The module uses the shared kit controls and semantic tokens throughout. Formatting and whole-project `tsc -b` passed after all wireframe families were present.

Desktop browser checks verified the annual offer's monthly transition, confirmation cancellation and return focus, reopen behavior, and both unobserved commitment boundaries. Monthly/annual pricing updated correctly. Credit preset selection updated the result, zero blocked submission, a custom amount reached the local boundary, and cancellation restored its trigger focus. Automatic top-up started off with disabled fields; enabling activated the fields; a cap below the top-up blocked Save; a sufficient cap reached the local-only state. Account Upgrade opened plans, and Account menu restored the entry. A review found and fixed the unnamed account popover and moved focus to Cancel on the monthly confirmation transition. The annual and automatic top-up dialogs were visually compared with their source crops at their original maximum widths. The parent implementation review owns narrow-screen verification across families.

## Growth education — 4 October 2026

The focused interventions now use the shared monochromatic yellow `growth-scope`, with the application rail, dashboard placeholders, ordinary account navigation, and plan/usage context kept blue. Yellow identifies the mechanism under discussion; it does not assert effectiveness.

The shared **Guide me** walkthrough uses `growthTarget` descriptions without separate growth tooltip controls. Monthly/yearly comparisons explain cadence framing, the value ladder, and the recommendation cue. The account menu explains upgrade placement and capacity comparison. Active annual/confirmation dialogs expose their own two steps so the tour explains the currently visible commitment rather than the page behind it. Credit dialogs explain editable value, presets/result preview, or explicit continuity and spend control. Dialog portals receive the yellow scope directly; only the balance panel within the account portal is yellow.

The content distinguishes source claims (savings, Popular) from design interpretation and retains the original payment/annual-checkout boundaries. No payment, account mutation, or claimed lift was introduced. Existing source proportions and responsive behavior remain the basis; explanations stay in the guide so the source layout needs no added help affordances.

Earlier education-pass verification (4 October 2026): formatting and whole-project `tsc --noEmit` passed. That pass included inline help controls, superseded by the Guide me-only contract. Its checks do not verify the subsequent removal or container changes; those require the current integration review.

## Complete component boundary review — 7 October 2026

The active monthly/yearly comparisons already color complete plan cards and the billing-cadence control. Annual-offer and confirmation states already color the entire modal, including headings, actions, and boundary feedback. Their thumbnails now match the live comparison: all plan cards and both cadence choices use yellow, without a blue current-plan card or half-blue cadence control. Source prices, copy, dimensions, actions, and guide targets are unchanged.
