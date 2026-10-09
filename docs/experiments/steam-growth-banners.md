# Discovery queue & rewards

| Field         | Record                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ID            | `steam-growth-banners`                                                                                                             |
| Source name   | Steam                                                                                                                              |
| Direct URL    | [Open the experiment](https://anujprajapatiii.github.io/blueprint-wireframe-kit/?view=experiments&experiment=steam-growth-banners) |
| Status        | Ready for review — implemented and checked on 2026-10-03.                                                                          |
| Source        | User-supplied **Steam Growth Banners.mp4** and three screenshots of the carousel and end screen.                                              |
| Source access | Inspected the 10.917-second recording and all three stills. Autoplay is user-described.                                                    |

## Intent and scope

Growth education palette — updated 2026-10-07: distinguish the engagement mechanism in a shared monochromatic yellow palette, while store scaffolding stays blue. Yellow applies to the complete reward strip and queue invitation, then to the entire bounded discovery modal: header, trailer placeholder, recommendation, navigation, progress, completion, and local collection states share one coherent palette. Existing proportions, reference copy, local state, marquee behavior, and whole-card carousel motion remain the design constraints. **Guide me** explains the reward promise, entry action, personalized discovery, and completion loop using only the currently available steps. There are no separate growth tooltip controls. The interpretation of intent is educational, not a claim of measured lift. This revision is local and does not expand the source-supported flow.

Scope extension — 2026-10-03: build the next steps of the discovery queue from three user-supplied screenshots. The references show a large modal with a video area, game details, neighbouring slide previews, previous/next arrows, progress indicators, wishlist/ignore actions, and an end screen with a sticker reward, stats, Done, and Continue. The user establishes that videos autoplay; still images do not establish motion or timing. Keep video and game artwork as neutral placeholders, preserve useful copy, and add no tuning controls for this flow. Use twelve demonstration entries; unknown games, responsive layout, transition timing, local stats, and Continue starting another sample queue are prototype assumptions. No actual video or Steam account integration is required.

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
- Initially both entries opened placeholders. The queue now follows the additional carousel and completion screenshots. The separate sticker destination remains a placeholder. Sample game entries and local behaviour are prototype extensions, distinct from observed structure.
- Narrow-screen stacking and wrapping are responsive extrapolations; the reference only establishes the desktop composition.
- Pausing the artwork and adapting it for reduced motion are accessibility provisions, not observed source controls.
- The experiment uses local demonstration content and does not connect to Steam, retrieve account data, or grant rewards.
- Original media was initially excluded. The user's later request authorizes including the original recording in the project and shared reference viewer; see the provenance note below. Publishing remains a separate step.

## Review notes

Checked on 2026-10-03:

- Production build and all 127 defined token contrast pairs pass.
- Directory search, type filtering, empty results, and clear filters work.
- Directory and banner screen have no whole-page horizontal overflow at 320px; the kit header also fits its 768px navigation breakpoint.
- Both entry actions open local placeholders. Dialog focus containment, Escape dismissal, and focus return were checked.
- Pause/resume changes the cards’ computed animation state. Reduced-motion CSS disables the animation and replaces the control with a static “Motion reduced” label; OS preference switching was not exercised.
- Copy-link success feedback and local direct-link refresh were checked.
- axe-core reported zero violations in the tested directory, banner, and destination-dialog views. The directory and banner checks had no incomplete results; dialog scans left ARIA-hidden focus and some contrast cases for manual review. These results are not a full accessibility conformance audit.

The original review above covered the two entry banners. The later scope extension adds the discovery queue flow; it does not connect to Steam.

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


## Discovery queue flow — 2026-10-03

The discovery banner now opens a large accessible modal: neutral trailer area, game details, previous/next controls, twelve progress positions, wishlist and ignore toggles, and a completion slide. Preserve the source completion heading and reward copy. Replace the source account's lifetime total with explicitly labelled session demo stats; never reproduce private account data as current user state. The two identifiable game titles are retained, while other entries use plain numbered placeholders. Autoplay/pause is represented as a wireframe state, not a fetched or playable video.

The end screen opens local sticker, wishlist, and ignored views. Done closes the modal; Continue repeats the sample queue. Store page and Learn More open plain explanatory views. The alternate classic queue is outside the requested flow and omitted. No new tuning controls were added. Existing banner settings are preserved. The desktop marquee also extends across 60% of the entry banner, with its fade overlapping the copy; reward text spacing is reduced by 4px.

Verified locally: production build and 127 defined token contrast checks; next and keyboard-arrow navigation through all twelve entries; completion with twelve viewed, one wishlisted, and one ignored; wishlist contents; Continue; mobile game and summary layout at 320px without internal horizontal overflow; slide scroll resets on navigation; Escape dismissal and focus return to the entry banner. Reduced-motion CSS suppresses slide transitions. These are focused checks, not formal accessibility certification. This revision has not been published.

## Carousel continuity — 2026-10-03

User correction: the first game has no preceding card, and carousel navigation should animate smoothly. Applied the local `css-animations` and `animation-accessibility` skills. Hide the left preview until a preceding game exists. Keep all twelve slides and the completion slide on one persistent track, using the kit's 240ms motion duration and easing for a transform-only transition. Retargeting interpolates from the current position instead of restarting an entrance keyframe. Inactive panels are inert and hidden from assistive technology. Continue starts a fresh track without sweeping backwards through the finished queue.

Reduced motion removes the sliding transition and uses a 120ms opacity-only cue. Verified this variant by temporarily activating its CSS in the local preview, then restoring its media query; no OS preference was changed. Verified the first-slide boundary, forward/reverse navigation, and one active accessible panel in Chrome. Build and token checks pass. Changes remain local.

## Whole-card rotation — 2026-10-03

The user clarified that the whole card must rotate into place, not slide its contents through a stationary frame. This supersedes the fixed-track viewport implementation above. Each persistent carousel panel now owns its border, background, clipping, and contents. Animate that entire panel with horizontal translation, a restrained 8° Y-axis turn, scale, and opacity, using the existing motion duration/easing. Side previews are the actual neighbouring cards, not decorative stand-ins; no preceding card exists at the first position. Keep the modal header, navigation, and progress controls fixed.

Verified the animated transform on the framed panel itself, actual neighbouring card previews, one active non-inert panel, mobile reflow at 320px, and completion/Continue. Reduced-motion rules disable panel transitions while retaining the opacity-only state cue. Production build and token checks pass; no publishing performed.

## Index and original reference — 2026-10-03

The index uses the title **Discovery queue & rewards**, with **Steam** shown separately as its source. Preserve the existing ID and direct URL. The preview should show the reward and discovery structure clearly within a landscape frame; it should not become a decorative vertical strip beside metadata.

The user explicitly requested the original references inside each experiment. This revision includes the original **Steam Growth Banners.mp4** recording locally in the shared **Original reference** view. Preserve the full recording, including visible source account context; it is reference evidence, not the wireframe's current user state. Use native video controls, a poster, and no autoplay. Keep private upload locations out of the public interface.

The three separately supplied queue and completion screenshots were inspected during the original build, but their files are not currently available. Keep their provenance and unavailable state explicit; do not substitute extracted video frames or fabricated images. The recording only shows the store banners, so it does not replace those flow references.

The revised gallery and reference viewer passed the checks recorded in [the index review](../index-design.md#review--2026-10-03). The current redesign remains local pending an explicit publishing request.

## Whole-container colour revision — 7 October 2026

The discovery modal now owns the yellow palette instead of assigning yellow separately to details, reward, progress, and Continue. Browsing all twelve games, completion, Continue, and the local help/store/sticker/wishlist/ignored views keep a coherent modal, including its header, media, close control, and footer. The entry banners and local sticker destination already use complete yellow containers. Copy, dimensions, queue state, and motion are unchanged.
