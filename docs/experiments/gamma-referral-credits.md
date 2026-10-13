# Referral credit reward

- **Stable ID:** `gamma-referral-credits`
- **Direct route:** `?view=experiments&experiment=gamma-referral-credits`
- **User intent and scope:** Reconstruct the observed two-sided credit offer and link action, stopping before real sharing or referral results.
- **Reference:** Signed-in Gamma free account, inspected 10 October 2026.
- **Evidence:** `gamma-12-referral-credits`; entry control in `gamma-11-credit-balance`, surrounding page in `gamma-16-home-context`. Each is an unchanged **1440 × 900 full-viewport JPEG**.

## Observed structure and behavior

Refer a friend in the credit-balance popover opened a compact centered modal over a dimmed home screen. The title was “Refer a friend” and the offer read “Give 200 credits and earn 200 credits for each new referral who signs up for Gamma.”

A single invitation URL sat in a bordered row with Copy link aligned inside its right edge. Copy link was visible but was not selected in the live product. Close was at the top-right; Done was at the bottom-right. Done dismissed the modal to home. The source offer gives a clear signup condition, but further eligibility rules were not inspected.

No link was sent, no other person signed up, and no referral credit was awarded during inspection. There was no observed reward-history or referral-success screen to reconstruct.

## Proportions and context

Measurements are approximate source bounds at 1440 × 900.

| Region          | Source measurement                                                    | Wireframe treatment                                                            |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Home            | 72px icon rail, 320px sidebar; composer and template row behind modal | Preserve the surrounding blue page under a separate scrim                      |
| Referral modal  | x496, y324, width448, height252                                       | Keep compact centered proportions; yellow fills the complete modal             |
| Content padding | Roughly 24px                                                          | Preserve the title, two-line offer, link row and trailing Done action          |
| Link row        | x520, y448, width400, height48                                        | Replace the private URL with an example; retain the copy action inside the row |

## Admission and classification

Manual source-based admission: the explicit 200-credit benefit for each person and invitation-link action establish a **referral** mechanism. Successful referral attribution or credit delivery is not needed to recognize the offer, and neither is asserted.

The automated curator request was blocked before any model assessment. No model endorsement is claimed. The metadata distinguishes the proposed measure of useful referred signups from the supporting action of copying a link.

## Prototype decisions and limits

The personal referral code is excluded from source code, thumbnails and notes. The wireframe uses an example URL and a local copy boundary. It must not disclose or transmit the original code. No sharing channels or success flow are invented.

The complete modal, including title, Close, body, link row and Done footer, is yellow. No false inner yellow panel or blue strip subdivides the same growth container. Home stays blue beneath the scrim. Guide me explains the equal reward and single sharing action in short, plain-language tips.

The source copy action was not performed, so any local feedback is a prototype provision rather than an observed Gamma success state. Mobile behavior and exact motion timing were not inspected. The 320px reflow is a local adaptation; the original files remain unchanged.

## Local review

Reviewed on **10 October 2026**. Compared the full 1440px modal to the source and inspected its actual 320px reflow. Checked copying the safe example URL with honest feedback, Done to home, reopening from credits, Guide me Next/Back/Escape and focus return. No real referral was copied or sent.

Full-viewport proof captures are kept in ignored local reference review storage. All sixteen source originals were dimension-checked and preserved byte-for-byte. Focused accessibility scans after the fixes reported no violations; automatic modal-focus and some contrast checks required manual inspection. Token checks passed for 56 semantic roles and 308 contrast pairs, and the build passed with 1,748 modules. These checks do not establish complete accessibility conformance.

This revision remains local. No publication, Git push, Gamma-original upload, real invitation, content generation or payment was performed.
