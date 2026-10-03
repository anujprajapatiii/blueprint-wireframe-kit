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

## Preserve meaning, reduce visual detail

- Retain information hierarchy, sequence, placement, and behavior that matter to the question being studied.
- Keep useful original writing verbatim when available. Do not introduce marketing copy, rewrite labels for style, or claim reconstructed text is an exact transcription.
- Use plain labels or placeholders for irrelevant surrounding content. A contextual header, repeated rows, or blank cards can establish scrolling and layout without recreating an entire source page.
- Replace artwork, photography, logos, promotional treatments, gradients, and brand typography with neutral surfaces, boundaries, text, and simple placeholders from the kit.
- Use color only through semantic kit roles to communicate hierarchy, selection, feedback, or state. Do not imitate source branding with one-off colors.
- Remove decorative crosses, eyebrow labels, and rulers. Avoid adding decorative technical details that distract from the product question.
- Reproduce only the motion necessary to explain the interaction, using the kit's motion tokens and reduced-motion support.

## Make behavior reviewable

Demonstrate the states needed for the focused experience: entry, active, completed, dismissed, or error states where relevant. Keep supporting controls understandable and accessible. A control that looks actionable should perform its local prototype behavior, or be clearly identified as unavailable in the prototype.

For a sticky element, document its observed trigger, position, release point, and relationship to other content. For a queue or sequence, document entry, advancement, progress, and completion only to the extent they are observed or explicitly requested. Label any added demonstration behavior as an assumption.

Do not infer an entire hidden flow from a single screenshot. When a source is unavailable, the directory entry, intent record, and plain scaffold can still be prepared; keep reference-dependent content marked as awaiting inspection.

## Keep the directory useful over time

- Give every experiment a stable URL and a link back to the directory and kit.
- Organize implementation under `src/experiments/`; add shared components to the kit only when they are useful beyond one experiment.
- Preserve the initial intent when updating a page. Record meaningful changes and conclusions so a later visit explains what was learned.
- Create a separate variant or experiment when the question changes substantially. Keep old IDs resolvable; archive instead of silently repurposing them.
- Store only necessary source metadata. Do not bundle uploaded videos, screenshots, or other source assets into the public repository or deployed site by default.
- Promote repeated preferences into these rules when the user expresses a reusable intent. Keep a one-off request in its experiment record rather than making it a universal rule.
- Treat explicit later user instructions as authoritative and update the affected record or rule accordingly.

## Review before publishing

Run the production build, which includes token validation and contrast checks. Verify the focused interactions, visible keyboard focus, readable labels, narrow-screen layout, and direct-link refresh. Add state-specific accessibility checks where composition introduces risk. Record what was actually checked and any unresolved source or behavior questions.

Design and review in a local preview first. Publishing is a separate step that requires Anuj’s explicit request for that revision; previous publishing requests do not carry over to later edits. Keep local tuning controls token-aware, save accepted values in project source, and exclude the editor from production builds. When publishing is requested, push the reviewed source and explicitly dispatch the GitHub Pages workflow. Describe the result as a wireframe experiment, with clear limits, rather than claiming production readiness or formal accessibility conformance.
