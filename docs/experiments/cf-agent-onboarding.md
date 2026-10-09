# Agent onboarding promotion

- **Stable ID:** `cf-agent-onboarding`
- **Direct route:** `?view=experiments&experiment=cf-agent-onboarding`
- **User intent and scope:** Continue the Cloudflare growth-pattern library with an individually indexed, interactive reconstruction of an observed promotion. Study the pill and copied feedback in dashboard context; downstream agent setup is outside the inspected boundary.
- **Reference:** Authenticated Cloudflare account home, inspected 5 October 2026. Original screenshots remain private and local; account identifiers are omitted from this record.
- **Evidence:** `cf-01-account-home` and `cf-02-agent-prompt-copied`, each 1271 × 1108, full visible viewport without cropping.

## Observed structure and behavior

A small “Onboard your agent to Cloudflare” pill sits above “Let's get to work.” Its accessible compatibility description says “Works with Claude, Codex, Cursor, and OpenCode”. Selecting the pill displays transient “Setup prompt copied” feedback immediately above it. The dashboard and route remain in place.

“Don't show this again” is present but was not selected because it may persist an account preference. The clipboard payload and downstream setup were not inspected. No agent was connected and no first-value outcome was observed.

The sidebar, search, three columns of domain/worker/recent entries, event announcement and analytics are the environment. They stay blue in this experiment. The complete compact promotion is yellow, including its pill, copied feedback, and dismissal control. The event banner is separately admitted as [Connect event promotion](cf-event-promotion.md), where the banner is yellow and this agent pill is blue context.

## Proportions and context

| Region        | Source measurement                                                | Wireframe treatment                                                 |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| Shell         | 1271 × 1108 viewport; approximately 260px sidebar and 58px header | Preserve the sidebar/content separation and header boundary         |
| Promotion     | Approximately 337 × 38px, centered near x=765, y=132              | Keep a small pill above the hero, not a banner or enlarged card     |
| Hero search   | Approximately x=292, y=250, width=946, height=51                  | Retain wide search and the three contextual columns below           |
| Lower context | Event card begins around y=677; analytics begin around y=824      | Keep surrounding density with generic private-content substitutions |

The landscape index thumbnail summarizes these relationships with compressed vertical context. It is a static SVG, not a live flow or an original screenshot.

## Admission and classification

The initial Jev advisory assessment returned `needs_review`. It identified feature promotion at confidence 0.81 and the pill's growth role at 0.98, but could not establish a primary goal at the configured confidence threshold. Its activation suggestion was uncertain; it is not used as proof of activation.

Manual admission follows the explicit promotion and invited action visible in the inspected source. The provisional primary goal is **engagement**: an existing dashboard user is invited to adopt another capability. A successful initial-value transition was not observed. Prompt selection is a diagnostic, not evidence of adoption or lift.

A refined submission was rejected by automatic approval review because of account-usage context and downstream authorization. It was not retried. The original uncertainty remains in the record, and this entry does not claim later Jev endorsement.

## Prototype decisions and limits

- Copied feedback is transient; the guide retains the last-action explanation until the screen is reset, so it remains readable after the toast disappears.
- Selecting the local pill simulates the observed copied feedback without reading or writing clipboard contents or inventing a real setup prompt.
- Any dismissal/restoration is local review behavior, not an assertion about source persistence.
- Account names, domains, worker names and metrics are generic. Private originals use the development-only reference endpoint.
- Narrow-screen reflow is a local adaptation; no mobile source was observed.
- Guide me explains the compact feature invitation at the pill. It does not assign growth roles to the surrounding dashboard or trigger the action.

- The sidebar, search and other non-focal context are intentionally limited to the observed study. Cross-pattern links open the independently indexed experiment and preserve directory filters; Workers & Pages stays as local supporting context.
- No custom source motion is inferred. The shared guide respects reduced motion in code; OS-level reduced-motion behavior was not exercised in this review.

## Local review

Reviewed locally on 5 October 2026 at the source width (1271px) and at 320px. The dashboard retains its sidebar/header, compact pill, search, three context columns, event panel and analytics. Keyboard activation shows copied feedback; the guide explains the post-action state after the transient toast ends. Local dismissal moves focus to the hero and leaves no growth target; library Restart restores the pill. Mobile menu Escape returns focus to Menu. The home reference loaded at its original 1271 × 1108 dimensions, including within the 320px workspace. Desktop and mobile review captures are linked in the [shared review record](../reviews/2026-10-05/cloudflare-local-review.md).

Source-only and combined directory filter navigation, reference switching, shared guide close/focus, direct route refresh and the build are recorded there. No publication occurred.

## Whole-container colour revision — 7 October 2026

The yellow palette now belongs to the complete promotion row, so copied feedback and dismissal no longer split the same small offer across blue and yellow. The event-focused experiment still keeps this entire agent promotion blue. Placement, copy, timing, and local dismissal behavior are unchanged.
