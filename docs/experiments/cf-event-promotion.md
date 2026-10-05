# Connect event promotion

- **Stable ID:** `cf-event-promotion`
- **Direct route:** `?view=experiments&experiment=cf-event-promotion`
- **User intent and scope:** The user explicitly requested the Cloudflare home event banner as its own growth pattern and clarified that event advertising and cross-sell channels qualify. Reconstruct the banner and external handoff in dashboard context; the event website and registration flow are outside the wireframe scope.
- **Reference:** Authenticated Cloudflare account home and the public [Connect event website](https://www.cloudflare.com/connect/), inspected 5 October 2026. Dashboard identifiers stay in private local provenance.
- **Evidence:** `cf-10-event-home-entry` and `cf-11-event-home-banner` are full 1280 × 720 desktop viewports, at initial entry and approximately scrollY=396. `cf-12-event-destination` and `cf-13-event-tickets` establish the public destination and paid event. The earlier `cf-01-account-home` (1271 × 1108) also shows the banner in full dashboard context. Preserve all originals unchanged.

## Observed structure and behavior

Between recent work and Analytics, the shallow banner shows a square artwork block, the heading “Meet the Agentic Internet Builders IRL”, a cue of five overlapping speaker portraits, explanatory copy and a right-aligned “Learn more” action. Its copy is: “Connect brings the Cloudflare community together once a year to learn, collaborate, and shape what comes next. Oct 19–21, San Francisco.”

The speaker portraits name Evan You, Tanner Linsley, Corey Quinn, Peter Steinberger and Fred Schott. “Browse all” links to `https://www.cloudflare.com/connect/speakers/`; the link target was observed but that page's content was not inspected.

Learn more links to `https://www.cloudflare.com/connect/` with `target="_blank"`. The inspected landing page identifies Connect 2026 with “OCT 19-21 · MOSCONE WEST, SF” and “Register Now”. Its ticket section lists a $595 Conference Pass, a +$495 University option and $495 Group/Team passes for 5–9 people. No registration action, ticket selection or purchase was performed. The ticket evidence supports classification; it is not extra copy for the dashboard banner.

The later dashboard greeting is “What's on the agenda?” The earlier agent-onboarding reference says “Let's get to work.” Preserve that difference between the experiments instead of treating it as a universal dashboard heading.

## Proportions and context

| Region               | Source measurement                                                                                  | Wireframe treatment                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| App shell            | 1280 × 720 viewport; approximately 260px sidebar and 58px header                                    | Retain the sidebar, header and scrolling main content                                         |
| Event banner         | Approximately x=298, document y=680, width=944, height=96                                           | Keep a broad, shallow banner; do not enlarge it into a hero                                   |
| Scrolled banner view | Around viewport y=284 at scrollY=396                                                                | Retain recent-work context above and Analytics below                                          |
| Inner composition    | Approximately 96px artwork, copy and overlapping speaker cue in the middle, compact action at right | Use neutral artwork and generic circles, preserving the hierarchy and horizontal relationship |

The whole banner is yellow in this experiment. The home agent pill, navigation, search, projects and analytics are blue context. The index uses a static landscape SVG summary with compressed vertical context and the same yellow/blue boundary. The separate agent experiment keeps its own yellow pill and earlier greeting.

## Admission and classification

This experiment corrects the earlier omission of an explicit event advertisement. The promotion qualifies through its visible event proposition and invited action, including when the next step leaves the product. A completed purchase or proof of paid conversion is unnecessary for admission. The reusable distinction is recorded in the [reference workflow](../reference-workflow.md), [design intent](../design-intent.md) and [curator guidance](../curator.md); a generic navigation link alone remains insufficient.

**Monetization** is the primary interpretation because the inspected destination confirms paid event tickets. The dashboard placement does not establish a paid Cloudflare relationship, so expansion is not asserted. Community engagement is part of the event copy, but there is insufficient evidence to add a material secondary goal or claim measured attendance, adoption or lift.

Admission is manual and explicitly requested by the user. No new Jev assessment was submitted for the event. The earlier three Cloudflare assessments returned `needs_review` for those separate patterns; they are not an assessment of this banner. A previous refined submission had been rejected by automatic approval review over account-usage context and downstream authorization. It was not retried, and no later model endorsement is claimed.

## Prototype decisions and limits

- Learn more is the observed external handoff to the public Connect website. The local wireframe does not reconstruct or complete registration, ticket selection or payment.
- Browse all retains its observed speaker-page destination, whose contents remain uninspected.
- Generic circles replace speaker portraits while retaining the overlapping cue. Source event wording and dates remain intact.
- Account names, domains, projects and analytics values are generic. Private full-viewport originals remain local through the development-only reference endpoint.
- The event promotion alone receives this experiment's yellow scope. Guide me explains the event proposition, speaker cue and invited external evaluation; it does not click the link or imply a completed purchase.
- Narrow-screen reflow is a prototype adaptation. No mobile source or banner dismissal behavior was observed.

## Local review

Reviewed locally on 5 October 2026 at 1280px and 1271px desktop widths and 320 × 800. Stored desktop review captures are 1271 × 1108; the proportion measurements below came from the 1280px CSS-width check. The banner's approximately 956 × 98px local footprint preserves the source's 944 × 96px broad, shallow composition; its app position is approximately x=292, y=693 against source x=298, y=680. The whole banner is yellow and the agent pill remains blue. The narrow banner and shortened guide fit without horizontal overflow.

Keyboard Enter on Learn more opens the public Connect page in a new tab while retaining the dashboard. The guide changes to “Continue from dashboard”; Escape returns focus to Guide me. Reload and workspace Restart restore its initial state. Home/banner original-reference switching preserves natural 1280 × 720 dimensions. Cloudflare + Monetization + Screen returns only Connect event promotion, and All experiments preserves all three filters. Private-route, output-isolation, accessibility and code-check details, full-viewport review captures and specific final-check limits are recorded in the [event review](../reviews/2026-10-05/cloudflare-event-review.md). The experiment is Ready for review. No publication occurred.
