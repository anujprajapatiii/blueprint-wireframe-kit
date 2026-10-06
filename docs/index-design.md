# Experiment index

## Purpose

This is a curated growth-pattern reference library for Anuj's design practice. Its main jobs are to recognize a growth intervention, find a relevant experiment, open its wireframe or source, and return later without losing context. Visual restraint remains part of the kit: clear hierarchy and precise behavior matter more than ornament.

This document owns the directory and reference-viewer contract. Follow [Reference workflow](reference-workflow.md) for the end-to-end process from a pasted reference to a locally reviewed index item.

## Composition and writing

- Use a two-column desktop gallery and one column on narrow screens. Keep preview aspect ratios consistent and landscape, with enough space to reveal the experiment's distinctive structure.
- Use the darker semantic `surface-sunken` role for gallery cards, with a quiet outline and small shadow. Keep generous shared gaps between cards and consistent spacious preview padding; do not tune gutters independently for individual entries. The preview must retain its full composition inside that space.
- Previews are recognition aids. Preserve the full composition and the surrounding containers that explain the focal component's placement; do not crop it into isolation or inflate it. Use yellow for the studied intervention and blue for context. Abstract inner content, keep previews static and lightweight, and make different structures recognizable.
- Place the title and task-focused sentence directly under the preview. Show the source, primary goal, and full added date in wrapping pills using the kit Badge. Goal badges use the yellow growth theme and its explicit surface/foreground pair; source and date retain blue context. Store the original local-calendar addition date in `addedAt`, independently of `updatedAt`; format it as “Added 3 October 2026.” The initial Notion and Steam dates come from their first addition commits. Omit type, status, separator dots, and recording counts from cards; keep type available as a filter.
- Use plain, recognizable names and preserve existing IDs for retained items. Highlight a title's first word in yellow only when it matches the shared explicit verb allowlist. Do not treat every first word as a verb: “Feature,” “Discovery,” and “Event” stay ordinary text. Use the checked semantic growth-highlight role for yellow text on blue, not a raw palette shade.
- Keep instructions short and specific to the next action. Avoid long introductory explanations, repeated footer advice, decorative eyebrow text, or a competing marketing voice.
- Treat library titles and descriptions as navigation copy. Improve their clarity without rewriting the original copy preserved inside an experiment. Apply targeted feedback to the shared rule or component responsible, keeping unrelated composition intact.
- Make title and preview links open the experiment. Keep the design-intent disclosure separate from the link. Original references are accessed through the toggle inside each experiment, with no reference footer on index cards.

## Design intent

Use **Design intent**, not the nutritional metaphor. Preserve the structured classification and its distinctions in [the data contract](design-intent.md).

Show the primary goal in a yellow pill beside the source and date. Keep the disclosure summary to **Design intent** and its chevron. Put the complete record inside: Goal, Also supports when present, Audience, Journey, Mechanism, Format, and Proposed measure. Show reasoning and measurement limits as a plain footnote, without a second nested disclosure. Do not make the classification table taller or more visually dominant than the recognition preview by default.

Use the shared `DesignIntent` renderer on cards, experiment pages, and examples. Its Lucide icons identify each field consistently: Target for Goal, GitBranch for Also supports, Users for Audience, Route for Journey, Cog for Mechanism, PanelsTopLeft for Format, and ChartColumn for Proposed measure. Keep these icons decorative beside visible labels; they do not replace the labels.

Keep the eight growth categories and three overarching outcomes unchanged. The kit's **Growth definitions** remain the shared source for their meaning. Proposed outcomes are hypotheses, not claims of observed improvement.

## Find and return

- Search titles, source names, summaries, focus, observed behavior, original copy, inspection limits, and design-intent fields. Match both primary and secondary goals. Use stable goal and type values from the shared definitions.
- Put a large, full-width search field above the rectangular goal buttons. Support finding a known name and describing a design need. Keep the search surface blue; it is a library control. Follow it with the goal row, then finer Source/Type/sort controls. Include **All** and only categories with coverage in the active catalog, including supported secondary goals. Use the shared taxonomy for labels and ordering so newly represented goals appear automatically; do not maintain a separate hard-coded category list or show empty taxonomy categories.
- Keep the goal row keyboard-operable with visible selection and focus, and let it scroll within its own container on narrow screens. Icons accompany visible labels. Do not duplicate goal selection in a dropdown below it.
- Use the kit's shared Select for Source, Type, and sort controls so icon spacing, keyboard behavior, and menu styling stay consistent with the component library.
- Show the result count and a useful empty state with one clear reset action. Preserve selected filters while editing the query.
- Keep search, search mode, sort, and filters in the URL. Opening either an experiment or its original reference, then returning to the directory, should preserve that context. Existing unfiltered experiment links must continue to work.
- Offer recently updated and alphabetical order, plus Best match while a query is present. Typing gives keyword matches; submitting an idea in the local library uses TypeSafe to rank the active catalog. Goal, source, and type refine those ranked results without extra inference. Never apply the old literal-query filter again after semantic retrieval. A meaningful no-match is preferable to forced unrelated suggestions. See [Search behavior](search.md).

## Original references

Use one shared **Wireframe / Original reference** experience, driven by asset metadata. Each record identifies the media type, descriptive label, original filename, source, and availability. Base-path-safe URLs must work locally and on the password-protected Cloudflare site. GitHub Pages redirects old links to the protected site.

Videos have native controls, a poster, and no autoplay. Images and videos retain their natural aspect ratio and full frame, without zoom-to-fill cropping. New captures follow the full-viewport contract in [Reference workflow](reference-workflow.md). Multiple assets form a labeled sequence so recordings and screenshots are distinct. Opening a reference directly must not flash or require dismissing the wireframe's modal first. Switching views must not leave hidden video playing.

The user's ongoing request to include each experiment's original reference covers the Notion and Steam recordings and the supplied GitHub event-banner screenshot. Preserve the original files; the reference viewer can show source branding and account/workspace context that the wireframe intentionally removes. Do not expose private attachment URLs or local filesystem paths.

The three separate Steam queue screenshots are currently unavailable as files. Preserve their provenance and state this limitation plainly; do not recreate or replace them with unrelated video frames. The ongoing workflow includes preserving supplied or captured originals locally. Keep private account/workspace media outside public assets and git; availability and inspection status are separate concerns. On 6 October 2026, Anuj authorized all 51 existing private screenshots behind the same password as the entire website. After login, the shared viewer loads unchanged originals through the protected same-origin endpoint without a second password prompt. Public inclusion is governed by [the project rules](../AGENTS.md).

## Ownership and publishing

### Imported patterns

Admit a reference only when it establishes a specific growth intervention, following [Reference workflow](reference-workflow.md). Standard navigation, task execution, configuration, and transactional review do not become growth patterns merely because they reduce effort or have a proposed metric. Explicit user requests for a specific reconstruction or inclusion override the default.

**Build the wireframe for each admitted pattern and register it as a normal, independently filterable experiment.** Do not bundle a product's patterns into one index card or make a source collection a required browsing parent. Keep source data for provenance without letting the raw research catalog dictate active entries.

The initial 4 October import produced 33 ElevenLabs wireframes and 36 total entries. The later growth-focused curation removed 17 standalone entries, leaving **16 ElevenLabs patterns and 19 active experiments in total**. The [dated curation record](reviews/2026-10-04/index-curation.md) lists every removal and its reason. Retained items keep their IDs, original dates, observations, copy, design intent, and evidence relationships. Main-index search, goals, Source, and Type operate together on the active registry, with URL state preserved through retained flows and back to the index.

Use restrained schematic previews of each pattern's distinctive structure. Related patterns may share drawing primitives, but a pricing comparison, permission gate, onboarding checklist, composer, and template gallery must be recognizable as different experiences. Keep previews static and lightweight; do not mount every live experiment in the index.

The research catalog may remain the structured source of observations and provenance. It does not replace an interactive wireframe or a reference toggle. Keep all evidence accessible, including coverage-only captures that do not establish a separate growth pattern. Preserve earlier URLs for retained patterns and source filters. A deliberately removed ID must not continue opening an active experiment through a direct, embedded, legacy collection, or related-pattern route; provide the normal unavailable/return-to-index behavior instead. Supporting source states may remain inside a retained flow without restoring a standalone entry.

ElevenLabs account screenshots remain available locally through the development reference endpoint. The website bundle contains metadata and neutral wireframes; the protected Worker adds the selected unchanged original screenshots separately. Reports, provenance and archives remain local. Every page, app asset, reference and search request requires the site session. This restriction concerns asset availability, not whether the source was inspected. It does not change the normal placement of these wireframes in the library.

Registry metadata owns the title, source name, stable added date, update date, preview choice, scope, classification, and asset relationships. Shared components own card composition, design-intent rendering, and media viewing. Individual experiments own their behavior and original copy.

This revision is local first. Including requested reference files does not authorize deployment of the redesigned index. Publish the protected Cloudflare site only after Anuj explicitly requests the current revision. The GitHub Pages workflow publishes a redirect only.

## Review criteria

The revised composition and viewer need their own checks; earlier build and accessibility results do not verify them.

- Recognize each experiment from its thumbnail, source, and title.
- Find an entry through the goal row, source, format, or search, and recover from an empty result. Confirm that inactive/removed entries do not affect counts, search, available goals, or direct routes.
- Open the wireframe or original reference directly; return with search and filters intact.
- Expand design intent without navigation or conflicting card targets.
- Operate filters, links, disclosures, reference switching, and media controls by keyboard with visible focus.
- Check narrow reflow at 320px and a representative desktop width, including long titles and expanded details.
- Check video playback and pause behavior when changing views, direct-link refresh, and media URLs in a production build.
- Record only completed checks. Treat automated accessibility findings as evidence for the tested states, not certification.

## Historical review — 2026-10-03

- Production build passes, including TypeScript and all 127 defined token contrast pairs.
- Reviewed the gallery at desktop and 320px. The page has no horizontal overflow at 320px; reference media and the embedded Notion modal fit the narrow frame.
- Verified search, combined goal/type filters, empty-state reset, alphabetical sorting, keyboard disclosure, and filter persistence after opening and returning from an experiment.
- Both original recordings load without media errors and remain paused on entry. Steam playback works; switching to the wireframe unmounts the video. Production copies match the included originals byte-for-byte.
- Direct original-reference URLs load the media view. Keyboard arrow/Enter navigation switches views. The Steam queue remains on game 2 and Notion remains on Skills after a reference round trip.
- Axe reported no violations in the tested index and Notion reference states. Manual-review items were color contrast and video captions; both source recordings have no audio track. These checks do not establish full accessibility conformance or test every future media type.
- Code review found no blockers in filter context, reference routing, state preservation, inactive panels, playback cleanup, or GitHub Pages asset paths.

This historical review predates later additions and does not verify subsequent revisions. Publication status must be checked for the current revision.
