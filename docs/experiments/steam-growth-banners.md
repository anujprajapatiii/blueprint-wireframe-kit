# Steam growth banners

| Field         | Record                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ID            | `steam-growth-banners`                                                                                                             |
| Direct URL    | [Open the experiment](https://anujprajapatiii.github.io/blueprint-wireframe-kit/?view=experiments&experiment=steam-growth-banners) |
| Status        | Ready for review — implemented and checked on 2026-10-03.                                                                          |
| Source        | User-supplied **Steam Growth Banners.mp4**, showing the Steam desktop client's store.                                              |
| Source access | Inspected across the 10.917-second recording. No clicks or scrolling are shown.                                                    |

## Intent and scope

This is the first entry in a lasting directory for wireframing experiences, screens, and flows. The user wants references reduced to neutral wireframes that preserve useful original writing and the product idea, so they can return to the experiments later.

Study two adjacent components: the compact sticker reward strip and the larger discovery queue entry banner. Keep the rest of the store as plain context. The user's “store stick” wording is interpreted as the sticker strip visible in the recording; the recording does not establish sticky positioning.

## Observed structure and behavior

- At the start of the recording, a compact reward strip places three fanned sticker images on the left and reward copy on the right. “View your stickers” is visibly underlined as a link.
- Directly below it, a wider banner places the discovery queue heading and explanatory copy on the left. Angled, overlapping game cards occupy the right side.
- Across approximately 0–10.917 seconds, the queue artwork slowly moves left and rotates. The store remains in the same viewport; no navigation, scrolling, sticky trigger, or release behavior is visible.
- Four store cards above and a store grid below establish surrounding context. Their content is outside this experiment's focus.

## Preserved copy

Sticker strip:

> Earn free stickers by going through your discovery queue!
>
> Now through Oct 8 - View your stickers

Discovery queue banner:

> Explore Your Discovery Queue
>
> Click to open your queue of top-selling, new, and recommended titles

“Now through Oct 8” is retained as historical reference copy. It is not a current offer or a claim that this prototype awards stickers.

## Neutralized visuals

Replace Steam branding, game artwork, sticker illustrations, promotional colors, and source typography with the kit's semantic blueprint surfaces, text, boundaries, and simple placeholders. Preserve the compact-strip-to-wide-banner sequence, content hierarchy, and the overlapping arrangement that explains the queue. Surrounding store cards remain plain scaffolding.

Any card-stack motion should demonstrate the observed movement with neutral outlines, use the kit's motion conventions, and provide a pause control. Respect reduced-motion preferences. Do not add decorative edge crosses, eyebrow labels, or rulers.

## Assumptions and prototype extensions

- Both banners stay in normal document flow. No sticky behavior is inferred from the recording or the user's abbreviated wording.
- The sticker link and queue entry open plain local destination placeholders so their actions are reviewable. These destinations are prototype extensions: the recording does not show the actual sticker collection or queue flow. Do not present invented advancement, progress, completion, or reward mechanics as observed behavior.
- Narrow-screen stacking and wrapping are responsive extrapolations; the reference only establishes the desktop composition.
- Pausing the artwork and adapting it for reduced motion are accessibility provisions, not observed source controls.
- The experiment uses local demonstration content and does not connect to Steam, retrieve account data, or grant rewards.
- Retain descriptive source metadata only. The supplied video is omitted from the public repository and deployed build.

## Review notes

Checked on 2026-10-03:

- Production build and all 127 defined token contrast pairs pass.
- Directory search, type filtering, empty results, and clear filters work.
- Directory and banner screen have no whole-page horizontal overflow at 320px; the kit header also fits its 768px navigation breakpoint.
- Both entry actions open local placeholders. Dialog focus containment, Escape dismissal, and focus return were checked.
- Pause/resume changes the cards’ computed animation state. Reduced-motion CSS disables the animation and replaces the control with a static “Motion reduced” label; OS preference switching was not exercised.
- Copy-link success feedback and local direct-link refresh were checked.
- axe-core reported zero violations in the tested directory, banner, and destination-dialog views. The directory and banner checks had no incomplete results; dialog scans left ARIA-hidden focus and some contrast cases for manual review. These results are not a full accessibility conformance audit.

The prototype remains scoped to the two entry banners. No underlying Steam queue or sticker collection flow is reproduced.
