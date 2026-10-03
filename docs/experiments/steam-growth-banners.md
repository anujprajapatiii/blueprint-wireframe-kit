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
- Directly below it, a wider banner places the discovery queue heading and explanatory copy on the left. Landscape game cards form one tilted strip on the right side.
- Across approximately 0–10.917 seconds, the queue artwork advances continuously along a fixed negative angle: cards enter from the upper-right and leave toward the lower-left. The strip is tilted as a whole; individual cards do not rock or reverse. The store remains in the same viewport; no navigation, scrolling, sticky trigger, or release behavior is visible.
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

Replace Steam branding, game artwork, sticker illustrations, promotional colors, and source typography with the kit's semantic blueprint surfaces, text, boundaries, and simple placeholders. Preserve the compact-strip-to-wide-banner sequence, content hierarchy, and the angled rolling sequence that explains the queue. Surrounding store cards remain plain scaffolding.

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

## Motion correction — 2026-10-03

The user clarified that the discovery cards should roll continuously at an angle. The initial implementation incorrectly oscillated a small portrait-card fan. Reinspection of the recording shows a landscape-card strip moving along a fixed tilted axis.

Implement one rotated rail with a continuously translating track. Repeat the complete card sequence for a seamless wrap, maintain constant speed, and retain pause/resume and reduced-motion behavior. The approximately −12° angle and 21 px/s speed are visual estimates from the supplied recording. A full repeat cycle is not visible in the 11-second clip; looping is required by the user's marquee clarification.

Correction verification: the production build and 127 token contrast checks pass. Browser inspection confirms a fixed −12° rail, linear forward-only translation, and two equal-length sequences (1000px each on desktop, 760px each at 320px) for the exact half-track wrap. Pause/resume and keyboard banner activation work. The 320px page has no horizontal overflow, and the mobile artwork stays below its copy.

## Sticker motion and marquee edges — 2026-10-03

User instruction: add shadows to all three sticker cards and simple looping graphics inside each. Fade the discovery marquee's text-facing edge on desktop, matching the reference. Mobile must have no fade and no invisible clipping boundary.

Use the kit's deep surface token for restrained card shadows. Animate the existing neutral circle, diamond, and square inside stationary cards; one pause control and reduced-motion preference must stop all decorative loops. On desktop, use an alpha mask so the rolling cards fade into the actual banner surface. On mobile, place the angled strip below the copy in normal layout, reserve space for its sloped silhouette, and let only the visible outer banner boundary crop the cards. These sticker glyph animations and the mobile arrangement are requested prototype refinements, not transcriptions of the source artwork.

Verification: production build and all 127 token contrast checks pass. Browser inspection confirms shadows on all three sticker cards, three running glyph loops, and the desktop alpha mask. The shared control pauses and resumes all four animations. At 320px and 640px, the mask is `none`, the marquee's internal overflow is visible, and the page has no horizontal overflow. The sloped strip is reserved below the copy and cropped only by the outer banner. Reduced-motion CSS disables all four loops; OS preference switching was not exercised.

## Local design workbench — 2026-10-03

The user requested a local-first workflow for current and future design work, plus controls that expose token choices. This revision stays local for review. Publishing is a separate explicit action.

The local Tune design panel changes existing semantic surface, outline, radius, type, and spacing tokens, and exposes experiment-specific motion values. Each token displays its name, resolved value, and Tailwind utility. Save to project writes validated settings to `src/experiments/steam-growth-banners.config.json`; Revert returns to the saved settings. Source token definitions remain unchanged. The panel and save endpoint are removed from the production build.

Verified: token selection updates the rendered surface; Save writes the JSON file and survives reload; Revert restores settings; marquee angle updates the responsive slope; zero shadow strength produces transparent shadows. The endpoint rejects invalid settings (400) and foreign origins (403). The production bundle contains no editor or save-endpoint code. Token contrast checks still pass; changing composition still requires review before publishing.

Narrow-screen review: the editor fits at 320px with no whole-page horizontal overflow. At the maximum 20° marquee angle, the mobile mask stays off and reserved space follows the new slope. Closing the panel returns keyboard focus to Tune design; opening brings the controls into view. Automated axe checks reported zero violations in tested editor views, with rendered colour contrast left for manual review. The existing 127 token-pair checks pass.
