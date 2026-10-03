# Event promotion

## Intent and scope

Added 4 October 2026 (Asia/Calcutta). Study the event banner in the right rail of the user-supplied **GitHub Webinar Card.png** screenshot. Preserve the banner's useful copy, hierarchy, placement, and visible controls. Abstract the dashboard's inner content while retaining the containers that explain the banner's placement: the header, repository sidebar, central composer/actions/feed groups, and neighboring changelog card.

Stable ID: `github-event-banner`. Source name: GitHub. The image shows an event promotion for Universe ’26; the filename does not establish a webinar format.

## Observed reference

- A bordered, rounded vertical card sits at the top of the right rail.
- The header contains “UNIVERSE’26” and a close icon.
- A landscape artwork area separates the header from the event details.
- The next strip reads “OCT 28–29” and “SAN FRANCISCO, CA”.
- The offer reads “Save $600 with Super Early Bird passes through July 8.”
- A full-width “Register now” button ends the card.
- The screenshot establishes no click destination, dismissal persistence, hover state, sticky behavior, mobile layout, or animation.

## Wireframe decisions

Use shared kit controls, Lucide icons, and semantic blueprint tokens. Replace branded art and logotype styling with a neutral image placeholder and plain event-name text. Keep the original event date and offer as reference copy; they are not a current availability claim.

Provide local dismissal and a restore action for repeatable review. The registration CTA ends in a clearly labeled local handoff preview because no destination or registration flow is supplied. These are prototype provisions, not observed source behavior. No tuning controls or decorative animation.

The first version reduced the surrounding dashboard too far. Anuj's correction on 4 October 2026 asks for enough containers to contextualize the panel's placement. Restore the header and full sidebar surface, central composer/actions/feed containers, and a changelog card below the event banner. Preserve desktop panel boundaries, columns, gutters, and alignment while keeping their inner content neutral and noninteractive. At narrow widths keep a compact header and the right-rail companion card; collapse the sidebar and central feed. This mobile composition is a prototype decision because no mobile reference was supplied.

Include the unaltered source image in the shared Original reference view, following the user's established reference-viewer request. The surrounding browser and account context remains part of the original only; it is abstracted away in the wireframe. Save locally; publishing requires a separate request.

## Design intent

Primary: Monetization & purchase. Audience: people using the signed-in GitHub dashboard; event-attendance intent and ticket ownership are unknown. Journey: notice an event offer and consider registering. Mechanisms: contextual placement, event relevance, an explicit saving, and a dated offer. Format: dismissible right-rail event card. Proposed measure: completed ticket purchases attributed to the promotion, with CTA-to-registration completion and dismissal as supporting diagnostics. The paid-pass offer supports this interpretation; actual outcomes are not measured and the registration destination is unknown.

## Review

The initial version was checked locally on 4 October 2026 (Asia/Calcutta):

- The production build, TypeScript, and all 127 defined token contrast checks pass.
- The directory shows the new landscape preview, GitHub and Monetization pills, and the original added date. Searching “GitHub” returns this entry; clearing the filter restores all three experiments.
- Desktop review confirms the event card in the right rail with subdued structural context. At a 320px viewport the surrounding dashboard is removed and the card fits the 286px embedded viewport without horizontal overflow. The offer and both card controls remain readable and reachable.
- Register now opens only the local handoff preview. Tab and Shift+Tab stay in the dialog; Escape closes it and returns focus to Register now. The dialog fits the narrow viewport.
- Dismiss transfers focus to Restore banner. Restore returns focus to the dismiss control. Switching to Original reference and back preserves the dismissed state.
- The original image loads at its native 2048 × 1323 dimensions. The production asset matches the included original byte-for-byte and uses the shared base-path-safe reference URL.
- Axe found no violations or incomplete checks in the tested standalone card state. The dialog had no reported violations, with ARIA-hidden focus and color contrast flagged for manual review; keyboard containment and focus return were checked separately. These results are not a complete accessibility certification.

Saved locally. No publishing performed.

The subsequent layout-context correction was checked at desktop and 320px: the header, full-height sidebar, central content groups, and companion changelog panel now establish placement clearly. On mobile the header and companion card remain, while the sidebar and feed collapse; the 286px embedded viewport has no horizontal overflow. Production build and all 127 token contrast checks pass. The directory thumbnail follows the same container hierarchy. This revision changes structural context; the interaction checks above describe the retained banner behavior.
