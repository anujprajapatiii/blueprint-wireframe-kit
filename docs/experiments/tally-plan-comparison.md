# Paid plans and annual saving

- **Stable ID:** `tally-plan-comparison`
- **Direct route:** `?view=experiments&experiment=tally-plan-comparison`
- **User intent and scope:** Study comparison of Pro and Business and the annual savings proposition, including the observed New workspace entry, toggle and Back behavior. Stop before checkout.
- **Reference:** Authenticated Tally free account, inspected 7 October 2026. Original captures remain private and local; personal identifiers and referral codes are omitted from this record.
- **Evidence:** `tally-04-plans-monthly`, `tally-05-plans-yearly`. Every original is an unchanged full-viewport JPEG, 1271 × 1108, captured 7 October 2026.

## Observed structure and behavior

Upgrade plan opens a full-screen comparison headed “Do more with Tally”, with “Upgrade to access advanced features designed for growing teams and creators.” Back is at the upper left and Close at the upper right. The default is monthly: Pro is $29 per month / “Pay $29 Every Month”; Business is $89 per month / “Pay $89 Every Month”.

Selecting Pay yearly shows Pro at $24 per month / “Pay $290 Every Year” and Business at $74 per month / “Pay $890 Every Year”. The nearby offer says “2 months off”. These displayed monthly prices are rounded source copy and must not be recalculated. The wider Pro panel has a two-column feature grid; Business lists everything in Pro plus retention controls, email verification and longer version history. Upgrade to Pro and Upgrade to Business were visible but not selected. Back returns to the underlying page; reopening starts on monthly billing. Members also reaches this comparison and is not a separate admitted experiment.

## Proportions and context

Source measurements below are approximate. The index uses a static 960 × 560 SVG summary with compressed vertical context; it does not mount the live flow or display private screenshots.

| Region            | Source measurement                                          | Wireframe treatment                                      |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Comparison header | Content approximately x147–1125px, or 978px wide            | Keep the heading left and abstract illustration right    |
| Plan panels       | Approximately 568px Pro + 380px Business with a 30px gutter | Retain the unequal columns; Pro benefits use two columns |
| Billing choice    | Single control row between introduction and offers          | Keep the savings cue with the monthly/yearly choice      |

## Admission and classification

Jev report 0e6eab99-49e6-40b0-a212-c2eb344fdb6a returned needs_review: plan framing was identified, but a primary goal, target action and yellow boundary did not pass the provisional gates. The original uncertainty is preserved.

Manual source-based admission: the inspected free account sees explicit Pro/Business prices, benefit lists, upgrade actions and an annual saving. These establish a paid offer with monetization intent; no checkout or conversion outcome is inferred.

Model judgments are advisory. Their confidence values are not measured UI effectiveness. Full classification, audience and proposed measures live in the registry metadata.

## Prototype decisions and limits

The complete full-screen plan overlay is one yellow offer container, including its heading, billing choice, plan cards, illustration placeholder and Back/Close controls. The underlying app shell stays blue. Upgrade actions open a local boundary; checkout, payment, trial terms and purchase outcomes were not inspected. The proposed monetization measure describes a hypothesis, not measured conversion.

Account identity and decorative visual branding become neutral Blueprint context. Source motion timing was not measured; no measured animation is inferred. The 320px reflow is a local adaptation rather than a claim about Tally’s mobile behavior. Shared Guide me explains only visible focal mechanisms and must not advance the product flow. References remain unchanged and locally served through the allowlisted development endpoint; this revision does not authorize an upload or publication.

## Local review before the color-boundary revision

Reviewed on 7 October 2026. Checked monthly ↔ yearly switching with the observed annual $24/$74 monthly figures and $290/$890 totals, both upgrade boundaries, Back and resetting to monthly after reopening. At 320px, the comparison scroll reaches Business and its local boundary. The guide’s Next, Back and Escape preserve the plan state and return focus correctly after ending.

All five desktop entry layouts were compared with the inspected captures. All five entry layouts were also reviewed at an actual **320px viewport and 320px page width**. The narrow layout is still a prototype adaptation; no source mobile behavior was observed. Guide text was checked in each experiment. Plan-guide Next and Back were exercised, and Escape preserved the underlying flow. After fresh navigation, ending the guide returned focus to Guide me in both the standalone plans view and the outer iframe viewer.

The Original reference viewer decoded a source image at **1271 × 1108**; its selector, enlargement and Escape dismissal were checked. Switching to references preserved the wireframe’s Rewards selection, and the outer Restart restored Invite. All eight originals were byte-checked locally and through the local reference endpoint. No external invitation, purchase, domain connection, reward claim, registration or review submission was performed.

Review evidence: [desktop collection](../reviews/2026-10-07/tally/collection-desktop.jpg), [office-hours desktop](../reviews/2026-10-07/tally/office-hours-desktop.jpg), and [office-hours at 320px](../reviews/2026-10-07/tally/office-hours-320.jpg).

Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs. These checks cover the described states and interactions; they do not claim that every possible branch was tested. No publication or private-reference upload occurred.

## Whole-container color revision — 7 October 2026

Anuj requested complete yellow containers instead of partial yellow sections. The referral modal now stays yellow through Invite, How it works and Rewards; the full plan overlay is yellow; both invitations share one yellow community card. The custom-domain proposition remains one yellow group, and surrounding app navigation and release notes stay blue. Guide targets remain specific to the visible behavior. Thumbnails use the same boundaries. Dimensions, source copy and interactions are unchanged. The earlier review evidence above predates this scope-only revision. Completed color checks, the passing build, and current screenshots are recorded in the [whole-container review](../reviews/2026-10-07/whole-yellow-containers.md).

## Workspace entry — 13 October 2026

The empty home’s **New workspace** action was inspected in the same free account. It opens the existing “Do more with Tally” comparison with monthly billing selected: Pro $29 and Business $89. The subtitle remains “Upgrade to access advanced features designed for growing teams and creators.” Back returns to the empty home. No workspace, teammate invitation or purchase was completed.

The relevant Pro benefits are “Collaboration. Invite unlimited team members to shared workspaces.” and “Workspaces & folders. Organize forms into workspaces and folders, and manage team access.” This is evidence of a paid-team offer at a workspace request. It supports the existing **monetization** classification; it does not establish expansion of an existing paid account, a completed team invitation, or a measured result.

The original private files are `local-references/tally-growth-2026-10-13/05-workspace-upgrade-1440.jpg` and `local-references/tally-growth-2026-10-13/04-home-1440.jpg`. Both are unchanged **1440 × 900 full-viewport** JPEGs, checked from the source files. The earlier 1280 × 720 captures remain unchanged in the local archive as supporting evidence and are not the displayed references. The later home capture includes the account’s “My workspace” sidebar row; this is contextual evidence, not proof that New workspace succeeded. They add a connected entry to the same question, so the experiment keeps its stable ID, addition date and direct plans entry. It does not add a duplicate catalog card.

In the local wireframe, choose Back or Close, then **New workspace** in the home header to reproduce this route. The button and empty home remain blue product context; the complete existing plans overlay remains yellow. A short Guide me tip points to Collaboration only when plans were opened from New workspace. Closing or going Back preserves home and returns focus to the invoking control. The narrow version keeps New workspace visible using compact header controls in this experiment only; this is a local mobile adaptation.

The added entry reuses the existing monthly/yearly state, prices and purchase boundaries. Reopening starts monthly. No new TypeSafe transmission, publication or push is part of this revision.

### Local verification — 13 October 2026

The integrating task checked the monthly entry at an actual **1440 × 900** desktop viewport. Back returned home, New workspace opened monthly plans, and Close restored focus to New workspace. Guide me showed the new teamwork explanation as step 3 of 4. The new gate original decoded at **1440 × 900** in the reference viewer.

At an actual **320 × 900** outer viewport, New workspace remained visible inside the **272px-wide experiment iframe**, with no horizontal overflow. The same Back, workspace-entry and focus-return behavior passed. This remains a local narrow-layout adaptation; Tally’s mobile source was not inspected.

`npm run build` passed after integration and again after the final Gamma layout fixes. Detailed evidence and the final combined result belong in the [local growth review](../reviews/2026-10-13/local-growth-review.md).

## Publication addendum — 13 October 2026

Anuj explicitly authorized publishing this Tally workspace-entry update and its 2 registered unchanged originals to the existing password-protected Blueprint website. It is deployed in website version `2005341b-daa9-49fa-be9f-bbd3c71bcd1d`; the internal search catalog is updated. The earlier local review and local-only statements above are retained as history, and the documented evidence and prototype limits still apply. Originals remain excluded from Git and public assets. See the [growth release record](../reviews/2026-10-13/published-growth-release.md) for release scope and live verification status.
