# Founder office-hours invitation

- **Stable ID:** `tally-office-hours`
- **Direct route:** `?view=experiments&experiment=tally-office-hours`
- **User intent and scope:** Study the office-hours invitation as a distinct engagement intervention within one fully yellow community card; the guide retains its office-hours focus.
- **Reference:** Authenticated Tally free account, inspected 7 October 2026. Original captures remain private and local; personal identifiers and referral codes are omitted from this record.
- **Evidence:** `tally-08-community-promotions`, reused unchanged by the review-request experiment. Every original is an unchanged full-viewport JPEG, 1271 × 1108, captured 7 October 2026.

## Observed structure and behavior

What’s new opens a nonmodal right drawer over Domains without dimming the underlying page. The fixed header contains What’s new and Close; the content scrolls beneath. A light card at the top contains a review appeal followed by an independent office-hours invitation.

The focal paragraph says: “We also host monthly office hours — a free, open session where you can ask Marie and Filip, the founders of Tally, anything directly. Come say hi, share feedback, or get help with your forms.” “Join our next office hours →” points to https://luma.com/tallyforms. Registration was neither inspected nor performed. Beneath the card are “September 11, 2026 —”, “Faster search and a dashboard redesign”, a large screenshot and the Faster search article.

## Proportions and context

Source measurements below are approximate. The index uses a static 960 × 560 SVG summary with compressed vertical context; it does not mount the live flow or display private screenshots.

| Region               | Source measurement                                                   | Wireframe treatment                                                      |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Right drawer         | Approximately left657px/top61px, width600px, 15px right/bottom inset | Keep the underlying page visible and undimmed                            |
| Header               | Approximately 58px high with close at the right                      | Keep fixed above the scrolling contents                                  |
| Community card       | Approximately left678px/top130px, width559px, height198px            | Retain both paragraphs in one yellow card; guide office hours separately |
| Announcement context | Heading near y400; screenshot approximately 560 × 380px              | Use a plain screenshot placeholder and preserve visible article density  |

## Admission and classification

Jev report daa1df56-b2e5-427d-be59-5a33a4437147 returned needs_review because the separate review request had an unclear component role. The office-hours invitation, engagement goal and event-page action were established.

Manual source-based admission: the explicit free founder session and event link establish this invitation. At Anuj’s request, the whole community card is yellow, including the independent review request; the guide still focuses on office hours.

Model judgments are advisory. Their confidence values are not measured UI effectiveness. Full classification, audience and proposed measures live in the registry metadata.

## Prototype decisions and limits

Both paragraphs and their actions belong to one yellow community card. The guide focuses on office hours; the review request remains an independently indexed behavior. The visible event offer supports provisional engagement through help with ongoing form use; it does not establish onboarding completion, attendance or retention. The event action opens a local boundary. The historical changelog is limited to the currently visible context.

Account identity and decorative visual branding become neutral Blueprint context. Source motion timing was not measured; no measured animation is inferred. The 320px reflow is a local adaptation rather than a claim about Tally’s mobile behavior. Shared Guide me explains only visible focal mechanisms and must not advance the product flow. References remain unchanged and locally served through the allowlisted development endpoint; this revision does not authorize an upload or publication.

## Local review before the color-boundary revision

Reviewed on 7 October 2026. Checked the local office-hours external-destination boundary, drawer dismissal and reopening. At 320px the drawer begins 95px from the top to clear the 87px guide toolbar. That review verified drawer and guide readability before the whole-card yellow revision.

All five desktop entry layouts were compared with the inspected captures. All five entry layouts were also reviewed at an actual **320px viewport and 320px page width**. The narrow layout is still a prototype adaptation; no source mobile behavior was observed. Guide text was checked in each experiment. Plan-guide Next and Back were exercised, and Escape preserved the underlying flow. After fresh navigation, ending the guide returned focus to Guide me in both the standalone plans view and the outer iframe viewer.

The Original reference viewer decoded a source image at **1271 × 1108**; its selector, enlargement and Escape dismissal were checked. Switching to references preserved the wireframe’s Rewards selection, and the outer Restart restored Invite. All eight originals were byte-checked locally and through the local reference endpoint. No external invitation, purchase, domain connection, reward claim, registration or review submission was performed.

Review evidence: [desktop collection](../reviews/2026-10-07/tally/collection-desktop.jpg), [office-hours desktop](../reviews/2026-10-07/tally/office-hours-desktop.jpg), and [office-hours at 320px](../reviews/2026-10-07/tally/office-hours-320.jpg).

Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs. These checks cover the described states and interactions; they do not claim that every possible branch was tested. No publication or private-reference upload occurred.

## Whole-container color revision — 7 October 2026

Anuj requested complete yellow containers instead of partial yellow sections. The referral modal now stays yellow through Invite, How it works and Rewards; the full plan overlay is yellow; both invitations share one yellow community card. The custom-domain proposition remains one yellow group, and surrounding app navigation and release notes stay blue. Guide targets remain specific to the visible behavior. Thumbnails use the same boundaries. Dimensions, source copy and interactions are unchanged. The earlier review evidence above predates this scope-only revision. Completed color checks, the passing build, and current screenshots are recorded in the [whole-container review](../reviews/2026-10-07/whole-yellow-containers.md).
