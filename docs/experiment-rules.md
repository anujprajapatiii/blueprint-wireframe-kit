# Experiment rules

An experiment is a reusable wireframe of a product question. It preserves the source's meaningful structure, copy, and behavior while removing its visual identity. The complete intake-to-index sequence is in [Reference workflow](reference-workflow.md); this document owns fidelity and iteration rules.

## Evidence and intent

Use the user's explanation as the strongest evidence for scope. Record a provisional interpretation when needed, then continue with what the reference supports. Keep observations, user instructions, prototype adaptations, and unknowns distinct in the [experiment record](templates/experiment-record.md).

Original files remain unchanged. New captures retain the full visible application/browser viewport, and video captures retain the full frame, following the workflow's capture contract. A cropped source does not authorize inventing its missing surroundings. An inaccessible source must remain marked partially inspected or unavailable.

Every experiment needs the shared [Design intent](design-intent.md) record: one primary category, relevant secondary categories, audience/account state, journey, mechanism, format, and a proposed measure. Classify behavior, not visual format. Interpretations and proposed measures are hypotheses, not measured business outcomes.

## Preserve meaning and context

- Keep useful original writing verbatim when available. Do not invent missing text or claim reconstructed wording is an exact transcription. Improve titles and summaries for retrieval without rewriting product copy inside the wireframe.
- Retain hierarchy, sequence, placement, and behavior relevant to the question. Keep surrounding containers, columns, gutters, alignment, neighboring modules, and scroll relationships when they explain the focal component's position.
- Replace irrelevant inner content with restrained placeholders that occupy comparable space. Simplifying content does not mean floating the focal component alone on a page. Honor an explicit request for a plain backdrop where the context is unnecessary.
- Replace photography, artwork, logos, gradients, brand typography, and promotional styling with semantic kit surfaces and simple placeholders. No decorative corner crosses, eyebrows, or rulers.
- Apply [the growth education contract](growth-education.md): yellow fills the complete visible card, modal, banner, or panel containing the studied mechanism; avoid partial yellow insets within that group. Blue preserves the separate surrounding environment. Keep the same distinction in thumbnails. **Guide me** supplies explanations; do not add growth tooltip or `?` controls.
- Start with shared Select, Button, Badge, and dialog components. Their spacing, focus, and interaction conventions should improve centrally rather than diverge per experiment.

## Preserve reference proportions

Low visual fidelity does not relax compositional accuracy.

- Identify source viewport dimensions and application bounds before building; exclude browser/OS chrome from measurements, not from the preserved original. Record important widths, heights, ratios, padding, gutters, alignment, and visible density. Label estimates.
- Preserve those relationships when abstracting content. Do not enlarge a focal banner, modal, or card just because it is the subject.
- Use shared typography, spacing, and control tokens while checking their effect on geometry. Make deviations deliberate. A single screenshot cannot establish whether a size is fixed, fluid, or responsive; record necessary assumptions.
- Compare the full source composition and wireframe at matching application widths or a consistent scale. Account for the experiment viewer's frame.
- Keep narrow layouts readable and operable. Reflow rather than shrinking the whole interface below usable sizes. Without a mobile reference, call the narrow layout a prototype adaptation.

The GitHub event-banner corrections on 4 October 2026 established contextual containers and proportionate sizing as defaults. Its specific column widths and panel measurements remain in its own record.

## Make containers reliable

Treat each container as a layout boundary with an explicit purpose, available width, and scroll behavior.

- Allow flex/grid children to shrink where appropriate; use `min-width: 0` and bounded tracks instead of content forcing the parent wider. Wrap labels, metadata, long names, and control groups.
- Keep nested cards, outlines, and padding inside their parent. Scope yellow tokens to the intended component; a themed wrapper must not unexpectedly recolor or resize its environment.
- Size dialogs against the available viewport and provide usable internal scrolling when needed. Keep close, confirm, and cancel controls reachable, including at short heights.
- Assign scrolling to the intended panel, table, or page. Do not hide overflow merely to conceal a broken layout or invisible cutoff. Preserve intentional masks and clipping only where the source calls for them.
- Inspect full-context screenshots and operate the UI at desktop and 320px. Check local overflow and boundaries as well as document width: a page can report no overflow while an inner card is visibly broken.

## Make behavior reviewable

Demonstrate supported entry, active, dismissed, completed, or error states relevant to the focus. An actionable-looking control should perform its local prototype behavior or clearly indicate its unavailable boundary. Do not infer an entire hidden flow from one screenshot.

For sticky elements, document the observed trigger, position, release point, and surrounding content. For sequences, document entry, advancement, progress, and completion only when observed or requested. Keep local demonstration behavior distinguishable from source behavior.

Before coding motion, identify the trigger, moving unit, stationary frame, direction/depth, incoming and outgoing states, neighbors, and reduced-motion alternative. A whole card rotating into place differs from content moving inside a fixed frame. Check first and last items, reversal, repeated navigation, dismissal, and restart where relevant. Adjacent items should exist before they are shown; wrapping requires evidence or an explicit choice.

Watch the actual transition. Compilation, computed transforms, and endpoint screenshots do not establish smoothness.

## Iterate without losing the original question

- Expand scope when new reference states or instructions arrive; extend the same experiment if intent continues. Build a separate variant when the question changes substantially, while keeping earlier URLs resolvable.
- Keep targeted edits targeted. Translate “one step” to the applicable token increment. Preserve unrelated layout, source copy, and accepted tuning values; check overlap and legibility after changes.
- Add tuning only when requested or useful for the particular exploration. Surface token names and resolved values, distinguish foundations from experiment-specific parameters, and save accepted values to source.
- Promote a reusable correction to its owning contract. Keep particular angles, card counts, shadows, timing, or mobile exceptions in the experiment record. Avoid appending duplicate rules across documents.
- Follow later explicit user instructions when they change an earlier rule or exception.

## Index and local review

Apply the growth admission gate in [Reference workflow](reference-workflow.md) before creating an entry. Each admitted pattern gets a normal index item with an interactive wireframe; research notes do not replace implementation for that scope. Source is a filter and pill, not a required collection to enter. The [index contract](index-design.md) owns card composition, metadata, direct links, filter preservation, and reference viewing.

Use the review and handoff steps in [Reference workflow](reference-workflow.md). Record only completed checks and unresolved limits. Keep source-specific review history dated; a previous pass does not verify a changed composition. Local work is the default. Publication requires an explicit request for the current revision and uses the existing GitHub Pages workflow.
