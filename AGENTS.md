# Working on Blueprint

This is Anuj's professional wireframing kit and lasting experiment directory. Preserve product structure, useful copy, context, and observed behavior; simplify visual identity so the design problem stays clear.

## Default task: reference to indexed experiment

When Anuj pastes a screenshot, video, or link into this project, follow **[docs/reference-workflow.md](docs/reference-workflow.md)** end to end unless the request explicitly has a different scope. First apply the growth-pattern admission gate. A qualifying reference becomes an interactive wireframe, its original references, Guide me explanations, a meaningful thumbnail, structured design intent, and an individual item in the filterable index. Research notes alone are not completion for an admitted pattern. Do not add ordinary product functionality merely by assigning it a growth metric.

That document is the canonical sequence. Use these focused contracts when needed:

- [Experiment rules](docs/experiment-rules.md): source fidelity, proportions, containers, behavior, and iteration.
- [Growth education](docs/growth-education.md): yellow growth components, blue context, and Guide me.
- [Colour tokens](docs/tokens.md): approved pairings, theme boundaries, component recipes, and contrast verification.
- [Index design](docs/index-design.md): cards, filters, direct links, and the reference viewer.
- [Design intent](docs/design-intent.md): the shared taxonomy and metadata fields.
- [Experiment record template](docs/templates/experiment-record.md): the short evidence and decision record.

Record intent and assumptions, then proceed with the supported work. Ask only when a material blocker remains. Update an existing experiment when its intent continues; keep its ID, original addition date, and links unless the user removes it from the active library. Save reusable corrections in the relevant contract, with source-specific choices in the experiment record. These rules persist within this repository; do not claim memory outside it.

## Non-negotiable defaults

- Capture **full-screen context**: the entire visible application/browser content viewport, including surrounding navigation, columns, and panels. Do not crop captures to the growth component. Keep original media unchanged; full-page captures are supplemental when useful. Follow the capture rules in the canonical workflow for video, private references, and already-cropped inputs.
- Keep reference proportions and meaningful containers. Abstract irrelevant inner content without erasing placement, page density, clipping boundaries, or scroll relationships. An explicit request for a plain backdrop takes precedence.
- Use monochromatic yellow only for the smallest meaningful growth mechanism, through shared `--growth-*` tokens and `growth-scope`. Keep its environment and library controls blue; thumbnails follow the same distinction.
- **Guide me is the only growth explanation interface.** Use shared Driver.js targets and the visible color key. Do not add `?` buttons, growth tooltips, pinned help popovers, or a second explanation layer. Preserve original product copy and state-aware guidance.
- Each admitted growth pattern is a normal main-index item with a stable direct URL, Source/Goal/Type filtering, design intent, and Original reference toggle. Require a visible growth intervention; clear navigation, useful task controls, reduced friction, or a speculative metric alone do not qualify. Explicit requests for a specific reconstruction or inclusion override this default. Keep removed items out of active catalog/routes while preserving source research. A source collection may hold research but must not become a mandatory browsing parent.

## Implementation

- Read and follow the installed [TypeSafe skill](.agents/skills/typesafe-ai/SKILL.md) when working on this project, as requested by Anuj. Use its current documentation and typed-decision guidance for TypeSafe/Jev features; preserve the chosen stack and task scope. The skill is installed for Codex through `npx skills`, with its source recorded in `skills-lock.json`.
- Reuse `src/components/kit.tsx` and `src/components/patterns.tsx` before introducing controls or local variants. Shared Select owns styled dropdowns; Badge owns pills; `DesignIntent` owns its field icons. Put experiment-specific code under `src/experiments/`.
- Use Tailwind CSS v4 and semantic tokens from `src/tokens.json`. Regenerate `src/tokens.css`; never edit it by hand. Theme scopes only select aliases: paint each boundary with an explicit surface/foreground pair. Fix token, theme, and component problems centrally at their owning layer, then check real rendered states; avoid accumulating local color overrides. Keep motion token-based and support reduced motion.
- Use the shared `BlueprintLogo` on every library page, without “/ kit.” Keep example headings unnumbered. Do not restore the sidebar tagline, decorative crosses, eyebrows, rulers, card status/type text, separator dots, or reference-count footers.
- Use semantic HTML, accessible names, keyboard operation, visible focus, and meaningful states. A passing build does not establish sound layout or motion; inspect the visible result and record only completed checks.
- Keep targeted edits scoped to the requested relationship. Preserve unrelated composition, original copy, and saved tuning values. Tuning is optional; do not add an editor to every experiment.
- Apply relevant installed design or animation skills when useful. An advisory workflow must not turn an authorized implementation into an unnecessary approval detour.

## Local work, originals, and publishing

- Design and review locally first. Keep the local preview available. Local saves and commits are allowed; publish only when Anuj explicitly requests the current revision. Prior deployments do not authorize later publishing.
- Preserve original references locally as part of this workflow. Keep private account/workspace captures out of git, `public/`, and production output. Use the development-only reference endpoint; never expose private transfer URLs or local paths.
- Existing public reference exceptions cover the supplied Notion and Steam recordings and GitHub event screenshot. The 38 ElevenLabs account captures remain gitignored in `local-references/elevenlabs/`; preserve their archive and safe provenance. Public inclusion of private originals needs explicitly selected assets; adding local references alone does not authorize publication.
- Persist accepted tuning values to project source and exclude the editor from production.
- Use the existing **GitHub Pages** deployment only. On an explicit publishing request, check the reviewed revision, push it, manually dispatch the Pages workflow, and verify the live result. Do not migrate to Sites or another host unless Anuj asks.
