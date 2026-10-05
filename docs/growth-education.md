# Growth education

Yellow identifies the growth intervention being studied. Blue retains the product environment that makes its placement and timing understandable. This is the library's analytical annotation, not a claim about the source product's visual design or measured performance.

**Guide me is the only growth explanation interface.** The 4 October 2026 simplification removes the separate `?` buttons, growth tooltips, and pinned help popovers. Keep explanations in the shared Driver.js walkthrough, with the visible color key. Existing product controls and source copy remain intact.

## Color has a specific job

Use shared monochromatic `--growth-*` tokens through `growth-scope`. Scope chooses a palette only; every theme boundary also needs an explicit surface and matching foreground, either from the shared component or semantic utilities. Use `growth-context` with its own blue paint pair for nested environment regions. Portals need an explicit scope; SVG groups need painted shapes beneath their text. Follow [Colour tokens and theme boundaries](tokens.md), with live pairings and shared-control specimens in **Foundations → Yellow growth**. Blue remains the default.

Scope the smallest complete mechanism: a benefit banner inside an invitation modal, suggested prompts below a blank field, a recommended plan beside the current plan, or an event offer in a right rail. Keep unrelated navigation, fields, shell panels, and editorial copy blue. When an announcement modal itself is the pattern, its full surface can be yellow. Every primary action or paid feature is not automatically a growth intervention.

Use the same scopes in index thumbnails. The library shell, card surfaces, source/date pills, and filter surroundings remain blue. The index deliberately uses yellow goal badges and a checked yellow text role for approved leading verbs, following [Index design](index-design.md). Preserve panel proportions, context, and source density; annotation must not enlarge the focal component.

## Write the guide at the mechanism

Attach `growthTarget` definitions from `src/components/growth-education.tsx` to the actual focal regions. Each target needs a stable ID, a short mechanism title, and one concise explanation. Use explicit order when reading order differs from the intended lesson. Give materially different flow states distinct target IDs so the shared guide can identify newly available explanations.

Write for someone seeing the pattern for the first time:

- Use a plain heading of about 2–5 words: “Show the added benefits” or “Try now or save”.
- Explain one visible design choice and why it can help someone act. Use one or two short sentences, usually 15–28 words; keep the body under 35 words.
- Name the actual control or offer. Prefer “paid plan”, “next step”, “try”, and “invite” over “monetization”, “handoff”, “activation”, and “expansion boundary”.
- Keep detailed classification, evidence limits, proposed metrics, and implementation notes in Design intent or the experiment record. A brief preview limit belongs in a tip only when it explains why the visible flow stops.
- Describe the design's purpose without claiming measured success. Preserve original product offers, labels, instructions, and calls to action; these tips are a separate library layer.
- Apply the same standard to starting screens, dialogs, and tips shown after an action. Do not repeat instructions already covered by the guide controls.

Example: **Show the added benefits** — “Higher limits and added support show what the paid plan offers. This helps people decide whether upgrading is useful.”

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

## Guide review safeguards

- Treat every guide exit path as a keyboard interaction: toolbar stop, close button and Escape must return focus to the invoking Guide me control (including across the workspace iframe). Do not restore focus to the document body.
- Inspect the rendered third-party popover semantics. Driver’s header/footer wrappers must not create duplicate page landmarks; its dialog keeps a labeled title. Check an active guide as well as the underlying screen.
- Transient product feedback must not make an explanation unreadable. A guide may explain the last completed action after a toast disappears, without extending the source toast or advancing the product flow.

## Plain-language review — 5 October 2026

Simplified all 90 guide messages across 84 target definitions, including alternate and follow-up states. Headings are at most five words; bodies are 16–24 words. The repeated final-step paragraph was removed, and the final button now says “Keep exploring”. Original product copy, target IDs, and flow behavior were preserved.

Source review covered all guide definitions. Browser checks sampled the Cloudflare event guide in its workspace at desktop and 320 × 800, and the ElevenLabs annual offer dialog at desktop, including Next, Back, and Escape. The narrow guide had no horizontal overflow and its controls remained visible. This was a focused wording and layout check, not a new audit of every interaction. The final build, token checks, formatting, and `git diff --check` passed. No publication occurred.

Review captures: [event guide](reviews/2026-10-05/guide-copy/event-desktop.jpg), [narrow event guide](reviews/2026-10-05/guide-copy/event-mobile.jpg), and [annual offer guide](reviews/2026-10-05/guide-copy/annual-desktop.jpg).
