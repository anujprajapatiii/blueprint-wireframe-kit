# Working on Blueprint

This repository is a professional wireframing kit and a lasting directory of experiments. Its purpose is to help Anuj reason about experiences, screens, flows, content, and interaction. Keep visual decisions restrained so the product problem stays clear.

## Reference-to-wireframe workflow

- Read `docs/experiment-rules.md` when creating or changing an experiment.
- Treat a pasted reference or supplied file as evidence for an experiment. Record the user's intent and scope in the experiment record before implementation; carry forward relevant instructions when revising it.
- Preserve useful original writing and observed interaction mechanics. Replace source branding, artwork, decorative styling, and visual polish with the shared neutral blueprint components and semantic tokens.
- Keep the requested components as the focus. Use plain supporting scaffolding only where it helps explain placement, scrolling, or a flow.
- Inspect references before describing their behavior. Separate observations, user instructions, and assumptions. If a reference cannot be opened, record that limitation and leave the affected behavior unverified; never invent observations.
- Save decisions and reusable rules in this repository so future work can recover them. Do not claim that repository rules establish memory outside this project.

## Implementation

- Reuse `src/components/kit.tsx` and `src/components/patterns.tsx`. Put experiment-specific code under `src/experiments/` and register each experiment in the directory.
- Give each experiment a stable ID, direct URL, clear title, scope, and status. Preserve existing links when revising it.
- Use Tailwind CSS v4 and the semantic tokens in `src/tokens.json`. Change foundations centrally; regenerate `src/tokens.css` instead of editing it directly.
- Keep decorative corner crosses, eyebrow labels, and rulers out of the interface. The grid is optional and must carry no meaning.
- Use semantic HTML, accessible names, keyboard operation, visible focus, and meaningful states. Wireframe fidelity does not excuse broken interactions or inaccessible controls.
- Keep reference media out of the public build by default. Record provenance without copying private attachment locations, sensitive information, or source files into public pages.
- Build and check the affected interaction, narrow-screen reflow, and relevant accessibility behavior. State verification limits honestly; never describe an automated check as certification.
- Deploy this project through its existing GitHub Pages workflow. Do not migrate it to Sites or another hosting service unless the user explicitly changes that instruction.
