# Complete yellow containers — 7 October 2026

Anuj asked to replace partial yellow insets with complete yellow chunks and check all flows. The implementation now uses the whole bounded intervention card, modal, banner, or panel, including its internal chrome. Specific Guide me targets remain independent from the palette boundary. Surrounding app and library controls remain blue.

## Source audit

All 28 active experiments were audited in source, including reachable follow-up views. Existing dimensions, copy, and interactions were retained.

| Family     | Audited | Corrections                                                                                                                                                                                                                                                           |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tally      | 5       | Entire referral modal across Invite, Rewards and How it works; entire plan overlay; complete shared community card in office-hours and review entries. The domain proposition was already one complete group. Thumbnails follow the same boundaries.                  |
| ElevenLabs | 16      | Full Share project dialog and its Select menus; joined model-selector/trial-offer card; complete agent-template preview panel; full Voice Design follow-up modal. Sharing, pricing and agent thumbnails were aligned. Other complete cards and dialogs were retained. |
| Cloudflare | 4       | Whole compact agent-promotion group, including copied feedback and dismissal. Complete Workers offer panels, Containers gate and event banner were retained.                                                                                                          |
| Notion     | 1       | Entire feature announcement, including its illustration previews.                                                                                                                                                                                                     |
| Steam      | 1       | Entire discovery modal, including media, header, navigation, progress, completion and local follow-ups.                                                                                                                                                               |
| GitHub     | 1       | Event card and local handoff were already complete yellow groups; retained.                                                                                                                                                                                           |

## Completed validation

- Browser-reviewed Tally referral Invite, Rewards and How it works; the modal remains 440 × 430px on desktop and has no blue content resets. Reviewed the annual plan overlay, office-hours card, and review card on mobile.
- Browser-reviewed Notion announcement, Steam discovery modal, ElevenLabs Share project, v4-selected speech card, agent-template Workflow/Preview panel, Voice Design follow-up, and Cloudflare agent promotion with copied feedback.
- The office-hours guide still explains the specific invitation inside the wholly yellow card. Referral guide Escape returns focus to Guide me.
- At an actual 320 × 800 viewport, referral and community views have a 320px document width and readable controls. No broad re-test of unchanged interactions was performed for this color-only revision.
- `npm run build` passed: 1,742 modules; 56 semantic mappings and 308 token contrast pairs passed. `git diff --check` passed.

The earlier Tally review screenshots show the previous partial coloring. Current evidence: [referral desktop](whole-yellow-containers/referral-desktop.jpg), [referral at 320px](whole-yellow-containers/referral-320.jpg), and [community card at 320px](whole-yellow-containers/community-320.jpg).

Project contracts now record the complete-container preference. No private originals, credentials, publishing configuration, or external account state changed. This revision remains local; no commit, push or deployment was performed.
