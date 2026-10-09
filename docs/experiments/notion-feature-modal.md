# Feature announcement

| Field | Record |
| --- | --- |
| ID | `notion-feature-modal` |
| Source name | Notion |
| Direct URL | `?view=experiments&experiment=notion-feature-modal` |
| Intent | Recreate the supplied feature-announcement modal as a neutral wireframe, preserving its copy, hierarchy, feature selection, and changes of state. |
| Focus | A centered modal on a plain background, with an expandable feature selector and a changing preview. |
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

Source colors, typography, branding, illustrations, and mascot are replaced with semantic blueprint surfaces, boundaries, and simple structural previews. The “Just shipped” eyebrow is omitted under the kit’s existing rule. At the user’s request, the document backdrop and visible intent notes are removed; the surrounding page retains only simple experiment navigation, a title, and the modal opener.

## User refinements

- 2026-10-07: Removed the nested blue preview palette. HTML blocks, Skills, MCP, and the local Try for free handoff now keep the whole modal yellow, including header, illustration, actions, and close control. Copy, dimensions, feature switching, dismissal, and restoration are unchanged.

- 2026-10-04: Use the shared monochromatic yellow growth theme for the announcement and its actions. The complete announcement, including its abstract product previews, shares the yellow palette. Its illustrations belong to the same modal rather than forming separate blue islands. Explain feature discovery, the Try/Save choice, and the unobserved trial destination boundary through **Guide me**, without separate help controls. The guided walkthrough uses these annotations; it does not imply that the original product includes an onboarding tour. Keep the plain backdrop, original wording, fixed modal frame, and source-supported feature changes.

- 2026-10-04: “Remove the background content. Keep it simple and plain.” The source’s document backdrop remains an observation, but the current experiment uses a plain background so the modal is the focus. The experiment’s intent and reference notes remain in this record and the directory registry.
- 2026-10-03: The index now uses the task-focused title **Feature announcement**, with **Notion** shown separately as its source. Preserve the existing ID and direct URL. The user requested the original reference on each experiment page, so this revision includes the original recording locally in the shared **Original reference** view.

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

No tuning controls were added. These checks describe the modal implementation before the later index and reference-viewer revision; they do not verify that revision. Publishing awaits an explicit request for the current revision.

## Original reference — 2026-10-03

The user explicitly requested the source media alongside the wireframe. Include the original **Notion Modal.mp4** recording, not a reconstructed sequence or a cropped replacement. Keep the source's visible workspace and document context in the original viewer; the wireframe continues to use the requested plain background. Use native video controls, a poster, and no autoplay. Keep private upload locations out of the public interface.

The shared **Wireframe / Original reference** navigation keeps the recording reachable even though the wireframe opens its modal automatically. The original-reference URL opens the media directly. Direct entry, keyboard switching, narrow-screen reflow, media loading, and feature-state preservation passed the checks recorded in [the index review](../index-design.md#review--2026-10-03).
