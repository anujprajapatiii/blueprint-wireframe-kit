# Notion feature modal

| Field | Record |
| --- | --- |
| ID | `notion-feature-modal` |
| Direct URL | `?view=experiments&experiment=notion-feature-modal` |
| Intent | Recreate the supplied feature-announcement modal as a neutral wireframe, preserving its copy, hierarchy, feature selection, and changes of state. |
| Focus | A centered modal over plain document context, with an expandable feature selector and a changing preview. |
| Source | User-supplied `Notion Modal.mp4`, 6.84 seconds. |
| Source access | Inspected. The clip begins with the modal already open and shows two feature changes. |
| Status | Ready for review locally; not published. |

## Observed behavior

- A centered modal stays in place over dimmed document content.
- The heading is “We’ve been cooking!”
- A feature selector on the left lists HTML blocks, Skills, MCP, and Routines. The active feature expands to show descriptive text; chevrons communicate its state.
- Feature selection changes the illustration on the right while the modal frame stays fixed.
- HTML blocks is initially selected. The recording changes to Skills at approximately 3 seconds and MCP at approximately 4.6 seconds.
- Routines is marked “Coming soon”.
- The modal offers “Try for free” and “Save for later”. Their resulting destinations are not shown.

## Preserved copy

- “We’ve been cooking!”
- “HTML blocks bring interactive visuals to any page and we can’t stop playing with them!”
- “Skills are reusable instructions for all your agents — no more writing the same prompt twice”
- “MCP gives your tools the context they need to complete tasks”
- “HTML blocks”, “Skills”, “MCP”, “Routines”, and “Coming soon”
- “Try for free” and “Save for later”

## Neutralized visuals

Source colors, typography, branding, illustrations, and mascot are replaced with semantic blueprint surfaces, boundaries, and simple structural previews. The “Just shipped” eyebrow is omitted under the kit’s existing rule. Supporting document content remains plain scaffolding.

## Assumptions and scope

- The recording does not establish how the modal opens, how it is dismissed, or where either call to action leads. Any opener, dismissal, confirmation, or destination in this experiment is a local prototype fallback rather than an observed Notion flow.
- The video does not select Routines or reveal its destination. Keep the coming-soon state explicit without inventing a product flow.
- Responsive layout, keyboard navigation, focus management, and reduced-motion behavior are implementation provisions beyond the demonstrated recording.
- The modal frame is stationary during feature changes. Only the selected feature’s details and associated preview change; motion should communicate that relationship without introducing a moving modal.
- This is a separate experiment from the Steam discovery flow. It does not add tuning controls or change saved Steam settings.
- Build and review locally. Publishing requires a later explicit request.

## Review notes

Source observations above are supported by the supplied clip. The local implementation opens on HTML blocks, changes feature on click or arrow-key selection, and keeps the modal frame and actions stationary. The structural previews crossfade over the shared 180ms normal-motion token; the source's exact easing is not established by the short clip.

- Checked HTML blocks, Skills, and MCP, including repeated selection and visible keyboard focus. Routines remains unavailable.
- Checked the local Try for free placeholder and Back to features; Save for later dismisses with session-only feedback. Escape and the close button dismiss, focus returns to Open modal, and reopening retains the selected feature. Tab wraps within the dialog.
- Reviewed the desktop composition, 320×740 mobile layout, and 850×480 short landscape layout. Content scrolls when necessary, including both actions, with no horizontal overflow at 320px.
- Fixed short-screen action overlap by allowing the feature row its intrinsic height and making the dialog scrollable. Associated expanded descriptions with tabs and removed the unavailable tab's dangling panel reference.
- Production build and 127 token contrast checks pass. Axe reported no violations in tested states; some dialog checks leave ARIA-hidden focus and color contrast for manual review. This is not a formal accessibility certification.
- Reduced-motion CSS uses a brief opacity-only transition. The stylesheet was reviewed, but an OS reduced-motion override was not exercised. Browser captures show feature changes and crossfade states; perceived smoothness still needs user review.

No tuning controls were added, the Steam experiment was left unchanged, and the supplied video remains outside the public project. Publishing awaits an explicit request for this revision.
