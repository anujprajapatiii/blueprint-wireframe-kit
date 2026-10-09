# Referral reward invitation

- **Stable ID:** `tally-referral-reward`
- **Direct route:** `?view=experiments&experiment=tally-referral-reward`
- **User intent and scope:** Study the two-sided referral proposition, its explanation and empty rewards state. Sharing, reward claiming and payment setup stop at local boundaries.
- **Reference:** Authenticated Tally free account, inspected 7 October 2026. Original captures remain private and local; personal identifiers and referral codes are omitted from this record.
- **Evidence:** `tally-01-referral-invite`, `tally-02-referral-how-it-works`, `tally-03-referral-rewards`. Every original is an unchanged full-viewport JPEG, 1271 × 1108, captured 7 October 2026.

## Observed structure and behavior

The sidebar Rewards action opens a centered widget over the dimmed dashboard. Invite and Rewards tabs sit above the content, alongside How it works and Close. The observed Invite headline is “Give 50% off. Get up to $150.” Friends receive 50% off for 3 months on any plan; the referrer earns 20% of the subscription cost, capped at $150 per referral.

The invite-link panel is followed by Copy invite link and actions for X (Twitter), email, LinkedIn and QR code. These sharing actions were not performed in the source. The How it works view explains sharing, the reward, first claim setup and later transfers. Rewards shows “Ready to claim: $0”, zero link views and “No rewards yet”, with Add payment details left unopened. Close and reopening through Rewards were observed.

## Proportions and context

Source measurements below are approximate. The index uses a static 960 × 560 SVG summary with compressed vertical context; it does not mount the live flow or display private screenshots.

| Region  | Source measurement                                                              | Wireframe treatment                                                    |
| ------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Modal   | Approximately 440 × 430px; left 415px, top 340px                                | Keep a compact centered modal over the full dashboard context          |
| Sidebar | Approximately 249px of the 1271px viewport                                      | Preserve navigation and empty-dashboard placement in blue              |
| Offer   | Headline, supporting paragraph, invite link and direct action inside the widget | Use yellow for the complete referral modal across its connected states |

## Admission and classification

Jev report 6f35ae07-1074-40a1-a651-ed7d64a9daa0 returned needs_review: the referral goal and offer were established, while the invite-link and sharing controls had an unclear role. This remains model uncertainty, not model approval.

Manual source-based admission: the two-sided discount/reward and directly connected invite action establish the referral mechanism. At Anuj’s request, the full referral modal is yellow across Invite, How it works and Rewards, including header, tabs, close control and footer. The dashboard remains blue.

Model judgments are advisory. Their confidence values are not measured UI effectiveness. Full classification, audience and proposed measures live in the registry metadata.

## Prototype decisions and limits

The account identity and referral code become neutral examples. No personal link is copied or sent, no QR payload or external send is invented, and no payout is claimed. The source establishes the empty rewards view, not a successful referral or payout. The observed reward administration stays within the same yellow referral container; its guide describes progress without implying a successful reward.

Account identity and decorative visual branding become neutral Blueprint context. Source motion timing was not measured; no measured animation is inferred. The 320px reflow is a local adaptation rather than a claim about Tally’s mobile behavior. Shared Guide me explains only visible focal mechanisms and must not advance the product flow. References remain unchanged and locally served through the allowlisted development endpoint; this revision does not authorize an upload or publication.

## Local review before the color-boundary revision

Reviewed on 7 October 2026. Checked Invite and Rewards tabs, How it works and Back, the local copy boundary, Close and reopening from Rewards. The modal and guide were readable at 320px. The source widget’s social sends, QR behavior, payment setup and successful rewards remain uninspected boundaries.

All five desktop entry layouts were compared with the inspected captures. All five entry layouts were also reviewed at an actual **320px viewport and 320px page width**. The narrow layout is still a prototype adaptation; no source mobile behavior was observed. Guide text was checked in each experiment. Plan-guide Next and Back were exercised, and Escape preserved the underlying flow. After fresh navigation, ending the guide returned focus to Guide me in both the standalone plans view and the outer iframe viewer.

The Original reference viewer decoded a source image at **1271 × 1108**; its selector, enlargement and Escape dismissal were checked. Switching to references preserved the wireframe’s Rewards selection, and the outer Restart restored Invite. All eight originals were byte-checked locally and through the local reference endpoint. No external invitation, purchase, domain connection, reward claim, registration or review submission was performed.

Review evidence: [desktop collection](../reviews/2026-10-07/tally/collection-desktop.jpg), [office-hours desktop](../reviews/2026-10-07/tally/office-hours-desktop.jpg), and [office-hours at 320px](../reviews/2026-10-07/tally/office-hours-320.jpg).

Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs. These checks cover the described states and interactions; they do not claim that every possible branch was tested. No publication or private-reference upload occurred.

## Whole-container color revision — 7 October 2026

Anuj requested complete yellow containers instead of partial yellow sections. The referral modal now stays yellow through Invite, How it works and Rewards; the full plan overlay is yellow; both invitations share one yellow community card. The custom-domain proposition remains one yellow group, and surrounding app navigation and release notes stay blue. Guide targets remain specific to the visible behavior. Thumbnails use the same boundaries. Dimensions, source copy and interactions are unchanged. The earlier review evidence above predates this scope-only revision. Completed color checks, the passing build, and current screenshots are recorded in the [whole-container review](../reviews/2026-10-07/whole-yellow-containers.md).

### Single surface follow-up

Removed the artificial background and rounded inset from the referral body and How it works content. The modal surface now continues through these regions; the original invite-link and reward panels remain distinct. Removed the redundant thumbnail body rectangle. Browser readback confirms a transparent content background and matching inherited text color. [Current preview](../reviews/2026-10-07/whole-yellow-containers/referral-single-surface.jpg).
