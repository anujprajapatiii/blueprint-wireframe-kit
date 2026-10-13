# Credit balance upgrade prompt

- **Stable ID:** `gamma-credit-upsell`
- **Direct route:** `?view=experiments&experiment=gamma-credit-upsell`
- **User intent and scope:** Study the free-plan credit popover's paid offer and its observed path to plan comparison.
- **Reference:** Signed-in Gamma free account, inspected 10 October 2026.
- **Evidence:** `gamma-11-credit-balance`; connected plan states `gamma-13-plans-annual`, `gamma-14-plans-monthly`, `gamma-15-plans-business`; surrounding home in `gamma-16-home-context`. Unchanged full-viewport JPEGs, **1440 × 900**.

## Observed structure and behavior

A pill in the top-right of home showed 400 credits. Opening it revealed a popover headed “Free plan”. The popover repeated “400” and “Credit balance”, explained “Credits let you create and edit with AI.” and offered “Upgrade for more credits that refresh monthly.” A full-width Upgrade button opened the plan comparison.

The same popover had a separate footer row containing Refer a friend and Invite teammate. Refer a friend opened the observed referral-reward modal. Invite teammate was not opened. These are connected source controls; they do not establish an invitation or referral outcome.

The inspected account still had credits. No exhausted balance, blocked generation, credit deduction, renewal or hard limit was observed. The studied growth mechanism is the upgrade offer beside the balance, not the existence of a usage counter alone.

## Proportions and context

Measurements are approximate source bounds at 1440 × 900.

| Region         | Source measurement                                     | Wireframe treatment                                          |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Navigation     | 72px icon rail plus 320px sidebar                      | Preserve the two-part blue home context                      |
| Credit control | Top right; approximately x1330, y24, width85, height40 | Keep its relation to the top bar and anchored popover        |
| Popover        | x1136, y72, width279, height252                        | Use one complete yellow container with a separate footer row |
| Offer          | Balance and short copy above a full-width button       | Preserve compact hierarchy and line wrapping                 |
| Home content   | Composer and templates remain visible; no source scrim | Keep surrounding home blue and undimmed in this state        |

## Admission and classification

Manual source-based admission: the recurring-credit proposition and direct Upgrade action establish a monetization intervention for a free account. This is not an observed scarcity prompt or exhausted-credit paywall. The referral alternative is studied independently in `gamma-referral-credits`.

The automated curator request was blocked before any model assessment. No model endorsement or measured business result is claimed. Proposed measures are recorded in typed metadata.

## Prototype decisions and limits

The whole popover is yellow, including its title, balance, Upgrade button and footer. The surrounding app stays blue. Guide me may explain the balance, recurring benefit and paid-plan path separately without adding separate colored insets.

The connected comparison retains the annual/monthly and audience choices actually inspected. Purchase and invitation destinations are local boundaries; no checkout, teammate invitation or account change is performed. The displayed balance remains an observed starting state, not a simulated real account balance.

Mobile source behavior and exact animation timing were not inspected. Narrow reflow is a local adaptation. Account identity, decorative images and unrelated template content become neutral placeholders.

## Local review

Reviewed on **10 October 2026**. Compared the 1440px popover to the source and inspected its actual 320px layout. Checked Upgrade into annual plans, referral entry, dismissal and returning keyboard focus to the 400-credit trigger, including after opening and closing plans from the separate upgrade button. Uninspected actions retain local boundaries.

Full-viewport proof captures are kept in ignored local reference review storage. All sixteen source originals were dimension-checked and preserved byte-for-byte. Focused accessibility scans after the fixes reported no violations; automatic modal-focus and some contrast checks required manual inspection. Token checks passed for 56 semantic roles and 308 contrast pairs, and the build passed with 1,748 modules. These checks do not establish complete accessibility conformance.

This revision remains local. No publication, Git push, Gamma-original upload, real invitation, content generation or payment was performed.
