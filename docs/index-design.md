# Experiment index

## Purpose

This is a working reference library for Anuj's design practice. Its main jobs are to recognize an interaction, find a relevant experiment, open its wireframe or source, and return later without losing context. Visual restraint remains part of the kit: clear hierarchy and precise behavior matter more than ornament.

The 2026-10-03 revision responds to the user's request to refine the index, previews, writing, structured labels, and access to original references.

## Composition and writing

- Use a two-column desktop gallery and one column on narrow screens. Keep preview aspect ratios consistent and landscape, with enough space to reveal the experiment's distinctive structure.
- Use `surface-raised` for gallery cards with a quiet outline and small shadow so their content stays visibly separate from the page canvas. Keep thumbnails on the deeper preview surface.
- Previews are recognition aids. Depict the feature selector and preview for Notion; depict the sticker reward and discovery sequence for Steam. Keep neutral blueprint surfaces and avoid decorative motion in the index.
- Place the title and task-focused sentence directly under the preview. Show the source name in a simple pill using the kit Badge. Omit type, status, separator dots, and recording counts from cards; keep type available as a filter.
- Use plain names: **Feature announcement** from Notion and **Discovery queue & rewards** from Steam. Preserve their existing IDs and URLs.
- Keep instructions short and specific to the next action. Avoid long introductory explanations, repeated footer advice, decorative eyebrow text, or a competing marketing voice.
- Make title and preview links open the experiment. Keep the design-intent disclosure separate from the link. Original references are accessed through the toggle inside each experiment, with no reference footer on index cards.

## Design intent

Use **Design intent**, not the nutritional metaphor. Preserve the structured classification and its distinctions in [the data contract](design-intent.md).

Show the primary goal at a glance. Put the complete record in a single disclosure: Goal, Also supports when present, Audience, Journey, Mechanism, Format, and Proposed measure. Show reasoning and measurement limits as a plain footnote, without a second nested disclosure. Do not make the classification table taller or more visually dominant than the recognition preview by default.

Keep the eight growth categories and three overarching outcomes unchanged. The kit's **Growth definitions** remain the shared source for their meaning. Proposed outcomes are hypotheses, not claims of observed improvement.

## Find and return

- Search titles, source names, summaries, focus, and design-intent fields. Use stable goal and type values from the shared definitions.
- Use the kit's shared Select for goal, type, and sort controls so icon spacing, keyboard behavior, and menu styling stay consistent with the component library.
- Show the result count and a useful empty state with one clear reset action. Preserve selected filters while editing the query.
- Keep search and filters in the URL. Opening either an experiment or its original reference, then returning to the directory, should preserve that context. Existing unfiltered experiment links must continue to work.
- Offer recently updated and alphabetical order. Avoid adding further sorting modes, favorites, tags, or management workflows until the library needs them. The registry and layout should accommodate more entries without requiring a new card design for each.

## Original references

Use one shared **Wireframe / Original reference** experience, driven by asset metadata. Each record identifies the media type, descriptive label, original filename, source, and availability. Base-path-safe URLs must work locally and on GitHub Pages.

Videos have native controls, a poster, and no autoplay. Images and videos retain their natural aspect ratio. Multiple assets form a labeled sequence so recordings and screenshots are distinct. Opening a reference directly must not flash or require dismissing the wireframe's modal first. Switching views must not leave hidden video playing.

The user's request authorizes inclusion of the original Notion and Steam recordings in this revision. Preserve the original files; the reference viewer can show source branding and account/workspace context that the wireframe intentionally removes. Do not expose private attachment URLs or local filesystem paths.

The three separate Steam queue screenshots are currently unavailable as files. Preserve their provenance and state this limitation plainly; do not recreate or replace them with unrelated video frames. New media defaults to metadata-only unless the user authorizes including it.

## Ownership and publishing

Registry metadata owns the title, source name, update date, preview choice, scope, classification, and asset relationships. Shared components own card composition, design-intent rendering, and media viewing. Individual experiments own their behavior and original copy.

This revision is local first. Including requested reference files does not authorize deployment of the redesigned index. Publish through the existing GitHub Pages workflow only after Anuj explicitly requests the current revision.

## Review criteria

The revised composition and viewer need their own checks; earlier build and accessibility results do not verify them.

- Recognize each experiment from its thumbnail, source, and title.
- Find an entry by source, goal, format, or interaction, and recover from an empty result.
- Open the wireframe or original reference directly; return with search and filters intact.
- Expand design intent without navigation or conflicting card targets.
- Operate filters, links, disclosures, reference switching, and media controls by keyboard with visible focus.
- Check narrow reflow at 320px and a representative desktop width, including long titles and expanded details.
- Check video playback and pause behavior when changing views, direct-link refresh, and media URLs in a production build.
- Record only completed checks. Treat automated accessibility findings as evidence for the tested states, not certification.

## Review — 2026-10-03

- Production build passes, including TypeScript and all 127 defined token contrast pairs.
- Reviewed the gallery at desktop and 320px. The page has no horizontal overflow at 320px; reference media and the embedded Notion modal fit the narrow frame.
- Verified search, combined goal/type filters, empty-state reset, alphabetical sorting, keyboard disclosure, and filter persistence after opening and returning from an experiment.
- Both original recordings load without media errors and remain paused on entry. Steam playback works; switching to the wireframe unmounts the video. Production copies match the included originals byte-for-byte.
- Direct original-reference URLs load the media view. Keyboard arrow/Enter navigation switches views. The Steam queue remains on game 2 and Notion remains on Skills after a reference round trip.
- Axe reported no violations in the tested index and Notion reference states. Manual-review items were color contrast and video captions; both source recordings have no audio track. These checks do not establish full accessibility conformance or test every future media type.
- Code review found no blockers in filter context, reference routing, state preservation, inactive panels, playback cleanup, or GitHub Pages asset paths.

Saved locally. This revision has not been published.
