# Working on Blueprint

This repository is a professional wireframing kit and a lasting directory of experiments. Its purpose is to help Anuj reason about experiences, screens, flows, content, and interaction. Keep visual decisions restrained so the product problem stays clear.

## Reference-to-wireframe workflow

- Read `docs/experiment-rules.md` when creating or changing an experiment.
- Treat a pasted reference or supplied file as evidence for an experiment. Record the user's intent and scope in the experiment record before implementation; carry forward relevant instructions when revising it.
- Preserve useful original writing and observed interaction mechanics. Replace source branding, artwork, decorative styling, and visual polish with the shared neutral blueprint components and semantic tokens.
- Keep the requested components as the focus. Abstract surrounding content without removing containers, columns, gutters, or alignment that explain placement, scrolling, or a flow. Honor an explicit request for a plain backdrop where context is unnecessary.
- Preserve reference proportions in every experiment. Measure the source content frame and relative panel, column, card, and spacing dimensions before building; exclude browser and OS chrome. Compare the result at a matched content width or consistent scale, and record source-specific measurements in the experiment document. Neutral styling must not enlarge the focal component or change the page's density without a deliberate reason.
- Inspect references before describing their behavior. Separate observations, user instructions, and assumptions. If a reference cannot be opened, record that limitation and leave the affected behavior unverified; never invent observations.
- Save decisions and reusable rules in this repository so future work can recover them. Do not claim that repository rules establish memory outside this project.

## Design iteration

- Follow the session-derived iteration rules in `docs/experiment-rules.md`: low visual fidelity with precise behavior, progressive scope, targeted token-based edits, and explicit motion ownership.
- Before animating, identify whether the whole component, its contents, or a track moves. Preserve the object's frame and neighbouring states through the transition; check first and last states as well as the middle.
- Apply relevant installed design/animation skills to the requested work. Choose implementation skills for implementation requests; an advisory skill must not turn an authorized fix into an unnecessary approval or planning detour.
- Validate the visible result against the user's correction. A passing build or a transform in computed styles does not by itself establish the correct motion or perceived smoothness.
- Tuning controls are optional per scope. Do not add controls to every new screen or flow; preserve existing saved settings when making unrelated edits.

## Local-first design and publishing

- Build and iterate locally first. Keep the local preview available for Anuj to review and tune.
- Publish only when Anuj explicitly asks to publish the current revision. An earlier deployment does not authorize publishing later design edits.
- Local saves and local commits are fine during design; do not push a deployment-triggering branch or dispatch the Pages workflow without a publishing request.
- The Pages workflow is manual. When publishing is requested, run the relevant checks, push the reviewed changes, explicitly dispatch the workflow, and verify the live result.
- Use development-only tuning controls where helpful. Surface semantic token names, resolved values, and whether a setting is an experiment-specific value. Persist accepted settings to project source, not only browser memory. Keep the editor out of published builds.

## Implementation

- Inspect and reuse `src/components/kit.tsx` and `src/components/patterns.tsx` before making a control or local visual variant. Use the shared Select for styled dropdowns and Badge for pills; spacing and interaction corrections should benefit every instance. Put experiment-specific code under `src/experiments/` and register each experiment in the directory.
- Give each experiment a stable ID, direct URL, clear title, scope, and status. Preserve existing links when revising it.
- Follow `docs/index-design.md` for directory and reference-viewer changes. Prioritize recognizing, finding, opening, and revisiting experiments; keep full design intent available through progressive disclosure.
- Keep index cards distinct from the canvas. Use a concise source/goal/full added-date pill row and the shared Design intent field icons; do not restore removed type/status labels, separator dots, or reference-count footers.
- Use Tailwind CSS v4 and the semantic tokens in `src/tokens.json`. Change foundations centrally; regenerate `src/tokens.css` instead of editing it directly.
- Keep decorative corner crosses, eyebrow labels, and rulers out of the interface. The grid is optional and must carry no meaning.
- Use semantic HTML, accessible names, keyboard operation, visible focus, and meaningful states. Wireframe fidelity does not excuse broken interactions or inaccessible controls.
- Keep reference media out of the public build by default. An explicit request to include original references authorizes adding those assets to the project and shared reference viewer; record that exception and the assets' provenance. In this ongoing experiment-library workflow, Anuj has requested original references in each experiment; that authorization covers the Notion and Steam recordings and the supplied GitHub event-banner screenshot. Do not expose private attachment URLs or local paths. Adding media locally does not authorize deploying the current revision.
- Build and check the affected interaction, narrow-screen reflow, and relevant accessibility behavior. State verification limits honestly; never describe an automated check as certification.
- Deploy this project through its existing GitHub Pages workflow. Do not migrate it to Sites or another hosting service unless the user explicitly changes that instruction.
