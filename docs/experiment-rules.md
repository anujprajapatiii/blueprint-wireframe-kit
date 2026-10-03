# Experiment rules

An experiment is a small, referencable wireframe that preserves a product idea while removing the source's visual identity. It should make it easier to discuss what happens, why it happens, and what could change.

These are persistent rules for this repository. New references should extend the experiment records and, when appropriate, these rules; they do not establish memory in other projects.

## Capture intent before building

For each pasted link, text, screenshot, or video, record the following alongside its registry entry or experiment documentation. Keep the record short, specific, and available from the experiment directory.

| Field               | Record                                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ID and title        | A stable slug and a human-readable name.                                                                                      |
| Direct URL          | A link that can be opened and refreshed on GitHub Pages.                                                                      |
| Intent              | What the user wants to understand, compare, reproduce, or test.                                                               |
| Focus               | The components, screens, or flow steps being studied; also the boundary of the experiment.                                    |
| Source              | The supplied URL or a descriptive filename, with attribution where known. Avoid private storage paths.                        |
| Source access       | Inspected, partially inspected, or unavailable; record the relevant limits. For media, note useful timestamps when available. |
| Observed behavior   | Visible structure, actions, transitions, triggers, sticky behavior, and states supported by the source.                       |
| Preserved copy      | Original headings, labels, instructions, and calls to action retained because they explain the experience.                    |
| Neutralized visuals | Source imagery, branding, typography, colors, and ornament replaced by kit conventions.                                       |
| Assumptions         | Decisions needed to complete the wireframe that the source does not establish. Keep them distinct from observations.          |
| Status              | Awaiting reference, in progress, ready for review, or archived; record what remains unresolved.                               |
| Review notes        | Relevant interaction and accessibility checks, conclusions, and later decisions.                                              |

Use the user's own explanation as the strongest evidence for intent. If it is incomplete, write a provisional interpretation and continue with the useful work supported by the reference. Ask only for information that materially blocks the focused experiment.

## Record design intent

Every new experiment needs structured design intent in `src/experiments/registry.ts`, available in the index. Follow [the shared definitions and data contract](design-intent.md), also available in the kit at `?#growth`: one primary category, optional secondary categories, audience/account state, journey, mechanisms, UI format, and a proposed success measure. Use **Design intent** in the interface; avoid the nutritional metaphor. Show the primary goal in the card's pill row, with the full record in a disclosure. Reuse the shared renderer and its Lucide field icons wherever the record appears.

Classify the intended behavior rather than the component's appearance. Keep objective, journey, mechanism, and format distinct; record unknown user/account states and provisional interpretations explicitly. Treat proposed measures as hypotheses until actual evidence exists. Update the label when the experiment's intent changes, using the shared definitions instead of creating local category variants.

## Preserve meaning, reduce visual detail

- Retain information hierarchy, sequence, placement, and behavior that matter to the question being studied.
- Keep useful original writing verbatim when available. Do not introduce marketing copy, rewrite labels for style, or claim reconstructed text is an exact transcription.
- Distinguish source copy from library writing. Experiment titles and summaries should be concise and useful for retrieval; original headings, offers, and calls to action stay faithful inside the wireframe. A filename alone does not establish an event's format or a control's behavior.
- Use plain labels or placeholders for irrelevant surrounding content. Preserve meaningful containers and spatial relationships: panel boundaries, columns, gutters, alignment, and neighboring modules can explain why a focal component sits where it does. Simplifying content does not mean isolating the component or erasing its layout context. Keep only the structure needed for the question; an explicitly requested plain backdrop remains appropriate.
- Replace artwork, photography, logos, promotional treatments, gradients, and brand typography with neutral surfaces, boundaries, text, and simple placeholders from the kit.
- Use color only through semantic kit roles to communicate hierarchy, selection, feedback, or state. Do not imitate source branding with one-off colors.
- Remove decorative crosses, eyebrow labels, and rulers. Avoid adding decorative technical details that distract from the product question.
- Reproduce only the motion necessary to explain the interaction, using the kit's motion tokens and reduced-motion support.
- Start with the existing kit component for each control. Shared Select, Button, Badge, and dialog components own their icon spacing, focus treatment, and interaction conventions; do not recreate those provisions per experiment.

## Preserve reference proportions

Proportionate sizing is a default for every reference-based experiment. Low visual fidelity simplifies styling and content; it does not relax the accuracy of the composition.

- Before implementation, identify the source viewport and content bounds, excluding browser and OS chrome. Record the important dimensions and ratios in the experiment document: column shares, panel and card widths and heights, padding, gutters, alignment, and visible content density. Mark approximate measurements as estimates.
- Preserve those relationships when abstracting inner content. A placeholder should retain the space and hierarchy of what it replaces. Do not enlarge the focal banner, modal, or card simply because it is the subject of the experiment.
- Use shared typography, spacing, and control tokens while checking their effect on the reference geometry. Make size adjustments deliberately; avoid arbitrarily inflating text, padding, or control height. Distinguish fixed, fluid, and maximum-width behavior only when the source supports it; record uncertain behavior as an implementation assumption.
- Compare the wireframe and reference at a matched content-frame width, or apply the same scale to both. Account for the experiment viewer's own frame rather than comparing unrelated viewport sizes. Check the full composition as well as the focal component.
- Keep narrow layouts readable and operable. Reflow where needed instead of shrinking the whole interface below usable sizes. If no narrow-screen reference exists, describe the mobile arrangement as a prototype adaptation, not observed source behavior.

The GitHub event-banner sizing correction on 4 October 2026 established this rule for future experiments. Its measured values remain specific to that experiment.

## Make behavior reviewable

Demonstrate the states needed for the focused experience: entry, active, completed, dismissed, or error states where relevant. Keep supporting controls understandable and accessible. A control that looks actionable should perform its local prototype behavior, or be clearly identified as unavailable in the prototype.

For a sticky element, document its observed trigger, position, release point, and relationship to other content. For a queue or sequence, document entry, advancement, progress, and completion only to the extent they are observed or explicitly requested. Label any added demonstration behavior as an assumption.

Do not infer an entire hidden flow from a single screenshot. When a source is unavailable, the directory entry, intent record, and plain scaffold can still be prepared; keep reference-dependent content marked as awaiting inspection.

## Iteration lessons from the first experiment

These rules capture how Anuj shaped the Steam experiment on 2026-10-03. They guide future work without turning its particular visual choices into universal requirements.

1. **Keep visuals simple and behavior precise.** Wireframe fidelity applies to artwork and styling, not to the accuracy of hierarchy, flow, spatial relationships, or interaction. Preserve useful reference copy. Neutral media placeholders are appropriate when the content is outside the question being explored.
2. **Expand scope in useful increments.** Start with the focal components, refine their behavior, then connect the next screens and ending as new references or instructions arrive. Extend the existing experiment when the intent continues. Do not infer unseen flows or build unrelated surrounding pages.
3. **Describe the moving object before coding motion.** Briefly identify the trigger, moving unit, stationary elements, direction, angle/depth, incoming and outgoing states, neighbouring items, and reduced-motion alternative. For example, a framed card rotating into view is different from content moving inside a fixed frame. State the interpretation and proceed when context supports it; ask only when a material ambiguity remains.
4. **Review boundaries before polishing the middle.** Check the first item, next and previous navigation, final item, completion, dismissal, and restart where applicable. Show adjacent cards only when those items exist. Decide whether the sequence ends or wraps from evidence or explicit instructions.
5. **Keep targeted edits targeted.** Resolve the selected element and the exact relationship being changed. Translate “one step” into the applicable token-scale increment, not an arbitrary value. Preserve unrelated layout, source copy, and user-saved tuning settings. Check overlap and legibility when changing layered compositions.
6. **Use controls selectively.** Expose token choices and resolved values when exploration benefits from direct manipulation. Distinguish shared foundations from experiment-specific values. Adding a flow does not imply adding another editor; honor requests for no tuning controls.
7. **Review motion as motion, and mobile as its own composition.** Inspect the transition in the local browser, including reversal or repeated navigation, rather than judging only static endpoints. Check mobile clipping, scrolling, reachable controls, and reduced motion separately. Report what was actually observed; compilation, CSS inspection, and screenshots alone do not prove smooth animation.
8. **Promote the principle, retain the exception locally.** General workflow corrections belong in reusable rules. Specific angles, card counts, desktop fades, mobile fade exceptions, shadows, and graphic treatments belong in the experiment record. Keep the stable experiment URL and update current scope so later sessions recover the intent.

## Keep the directory useful over time

- Give every experiment a stable URL and a link back to the directory and kit.
- Follow [the index design contract](index-design.md). Use a two-column desktop gallery with meaningful landscape previews, then a single column at narrow widths. Keep each title, source name, and task-focused description distinct; make the experiment easier to recognize than its metadata.
- Keep cards visibly separate from the page canvas through shared surface and shadow tokens. Show source, primary goal, and full added date in wrapping pills. Store `addedAt` as the original local-calendar addition date and `updatedAt` separately; later edits must not make an old experiment appear newly added.
- Remove metadata that does not help recognition or retrieval. Type/status text, separator dots, and reference-count footers stay off cards; retain useful underlying data for filters and records. Keep field icons consistent through the shared Design intent component.
- Preserve search and filter state in URLs when opening an experiment and returning. Use one registry for cards, search, classification, and reference assets instead of maintaining separate content copies.
- Give each experiment consistent **Wireframe** and **Original reference** views. Use native media controls and descriptive asset labels, preserve media aspect ratio, and keep references available without requiring the user to restart the wireframe flow.
- Organize implementation under `src/experiments/`; add shared components to the kit only when they are useful beyond one experiment.
- Preserve the initial intent when updating a page. Record meaningful changes and conclusions so a later visit explains what was learned.
- Create a separate variant or experiment when the question changes substantially. Keep old IDs resolvable; archive instead of silently repurposing them.
- Store only necessary source metadata by default. When the user explicitly asks to include original references, add the authorized files through the shared, data-driven reference viewer and record provenance and availability. Do not publish private transfer URLs or filesystem paths. Keep missing assets marked as unavailable; an extracted video frame is not a substitute for a separately supplied screenshot.
- Promote repeated preferences into these rules when the user expresses a reusable intent. Keep a one-off request in its experiment record rather than making it a universal rule.
- Treat explicit later user instructions as authoritative and update the affected record or rule accordingly.

Anuj requested original references inside each experiment as part of this ongoing library workflow. The authorized local assets include the Notion and Steam recordings and the subsequently supplied **GitHub Webinar Card.png** screenshot for the right-rail event-banner experiment. Preserve those originals in the shared viewer while abstracting irrelevant content in the wireframe. The three separately supplied Steam queue screenshots are not currently available as files and must not be fabricated or represented by video frames. Including references in the project remains separate from publishing the revision.

The GitHub event-banner correction on 4 October 2026 clarified that abstracting the rest of a page should retain enough containers to explain the panel's placement. Its header, sidebar, central content groups, and neighboring right-rail card belong to that experiment's context; they are not required scaffolding for every experiment.

## Review before publishing

Run the production build, which includes token validation and contrast checks. Verify the focused interactions, visible keyboard focus, readable labels, narrow-screen layout, and direct-link refresh. Add state-specific accessibility checks where composition introduces risk. Record what was actually checked and any unresolved source or behavior questions.

Design and review in a local preview first. Publishing is a separate step that requires Anuj’s explicit request for that revision; previous publishing requests do not carry over to later edits. Keep local tuning controls token-aware, save accepted values in project source, and exclude the editor from production builds. When publishing is requested, push the reviewed source and explicitly dispatch the GitHub Pages workflow. Describe the result as a wireframe experiment, with clear limits, rather than claiming production readiness or formal accessibility conformance.
