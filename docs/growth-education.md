# Growth education

Yellow identifies the growth intervention being studied. Blue retains the product environment that makes its placement and timing understandable. This is the library's analytical annotation, not a claim about the source product's visual design or measured performance.

**Guide me is the only growth explanation interface.** The 4 October 2026 simplification removes the separate `?` buttons, growth tooltips, and pinned help popovers. Keep explanations in the shared Driver.js walkthrough, with the visible color key. Existing product controls and source copy remain intact.

## Color has a specific job

Use shared monochromatic `--growth-*` tokens through `growth-scope`. Scope chooses a palette only; every theme boundary also needs an explicit surface and matching foreground, either from the shared component or semantic utilities. Use `growth-context` with its own blue paint pair for nested environment regions. Portals need an explicit scope; SVG groups need painted shapes beneath their text. Follow [Colour tokens and theme boundaries](tokens.md), with live pairings and shared-control specimens in **Foundations → Yellow growth**. Blue remains the default.

Scope the smallest complete mechanism: a benefit banner inside an invitation modal, suggested prompts below a blank field, a recommended plan beside the current plan, or an event offer in a right rail. Keep unrelated navigation, fields, shell panels, and editorial copy blue. When an announcement modal itself is the pattern, its full surface can be yellow. Every primary action or paid feature is not automatically a growth intervention.

Use the same scopes in index thumbnails. The library shell, card surfaces, source/date pills, and filter surroundings remain blue. The index deliberately uses yellow goal badges and a checked yellow text role for approved leading verbs, following [Index design](index-design.md). Preserve panel proportions, context, and source density; annotation must not enlarge the focal component.

## Write the guide at the mechanism

Attach `growthTarget` definitions from `src/components/growth-education.tsx` to the actual focal regions. Each target needs a stable ID, a short mechanism title, and one concise explanation. Use explicit order when reading order differs from the intended lesson. Give materially different flow states distinct target IDs so the shared guide can identify newly available explanations.

Connect three things in the explanation:

1. **Visible mechanism:** what the element does.
2. **Invited behavior:** what the user can do next.
3. **Intended role:** how that action might support the documented goal.

Example: “These starter prompts give a new user a concrete first input, reducing the work needed to try voice creation.” This explains an interpretation; it does not assert increased activation.

Prefer names such as “Starter prompts,” “Annual savings,” or “Invite while sharing.” Avoid generic “growth hack” labels, unexplained jargon, and repeated category definitions that do not teach the particular pattern. Preserve original offers, titles, instructions, and calls to action; guide copy is a separate library layer.

## Keep guidance optional and state-aware

- Start only after **Guide me** is chosen. Keep progress, Back/Next, a clear ending/close action, keyboard dismissal, and sensible focus return.
- Pair yellow with the named **Growth pattern / Product context** key and a visible Guide me control. Color alone must not carry the distinction.
- Collect targets from the current visible state. Exclude closed dialogs, hidden tabs, unmounted panels, and unrelated flow branches. Re-evaluate when the user opens a new screen; never keep pointing at stale targets.
- After the current screen's lesson, guidance may remain enabled to explain newly opened states. The user advances the prototype independently; the tour must not click, submit, invite, purchase, generate content, or invent unseen transitions.
- Keep source actions operable when the lesson is closed. **End guide** and Escape stop guidance; closing it must not also close the source modal or advance a carousel underneath.
- Preserve keyboard focus across dialogs, portals, and the experiment iframe. On small screens, keep popovers readable and all dismissal/navigation controls reachable. Respect reduced motion.
- Switching to Original reference stops guidance while retaining the wireframe state. Reference media remains unchanged.

## Review the distinction

Inspect the full-context preview, starting screen, and relevant follow-up states at desktop and narrow widths. Verify only intended mechanisms are yellow, context stays blue, proportions and copy remain intact, and no growth `?` buttons remain. Exercise Guide me Next/Back/End, keyboard dismissal and focus recovery, dialog targets, and newly opened flow states. Check supported themes and the token contrast checks.

Use the [canonical reference workflow](reference-workflow.md) for capture, index integration, and local handoff. Keep unverified intent and proposed outcomes in the shared Design intent record. Publishing requires an explicit request for the current revision.

## Earlier implementation review — 4 October 2026

The first education pass introduced the 11-shade yellow scale, 46 growth roles, and shared Driver.js integration. Its build checked 56 scoped mappings and 260 contrast pairs. Browser review covered all 36 starting routes at 320px and selected desktop, dialog, focus, and Steam continuation states.

That earlier pass included inline hints and pinned popovers, now superseded by the Guide me-only contract above. Its checks describe that version and do not verify the subsequent tooltip removal or container cleanup. Record new verification with the affected implementation; do not reuse earlier results as proof.

Driver.js references: [configuration](https://driverjs.com/docs/configuration) and [async tours](https://driverjs.com/docs/async-tour). The project lockfile pins the installed dependency.
