# Blueprint Wireframe Kit

A professional wireframing foundation for exploring product structure, content, behavior, and states. A restrained blueprint palette keeps the work visually consistent. Semantic tokens provide darker surfaces, layered panels, inverse areas, accessible text, controls, and optional feedback colours without introducing a new styling decision for every screen.

The app is a browsable component gallery inspired by the way shadcn presents examples. The reusable components live in this repository, so their source and styling stay under your control. This is a standalone kit, not the Blueprint.js library or a published shadcn registry.

## Experiments

[Browse the experiment directory](https://anujprajapatiii.github.io/blueprint-wireframe-kit/?view=experiments) · [Discovery queue & rewards](https://anujprajapatiii.github.io/blueprint-wireframe-kit/?view=experiments&experiment=steam-growth-banners)

Experiments are lasting wireframes of screens, flows, and experiences. Keep useful source copy, structure, and observed interaction behavior; replace branding and visual detail with kit primitives. Preserve the user's intent alongside each experiment so later work can recover the reason for its design.

A pasted screenshot, video, or link starts the [reference-to-index workflow](docs/reference-workflow.md). Follow it to inspect and retain the full-context original, identify a specific growth intervention, then build its proportionate interactive wireframe, add **Guide me** explanations, and file a normal, independently filterable experiment. Ordinary product functionality stays context unless explicitly requested; [the curation record](docs/reviews/2026-10-04/index-curation.md) explains the current 19-item catalog. The [project rules](AGENTS.md) make this the default for future work in this repository; [the record template](docs/templates/experiment-record.md) keeps evidence and assumptions short and recoverable.

**Yellow marks the studied growth mechanism; blue retains its product context.** Guide me supplies the optional step-by-step education. Original product copy stays intact, and separate growth tooltip buttons are omitted.

Each experiment includes a distinctive landscape preview, shared Design intent, a stable direct URL, and a **Wireframe / Original reference** toggle. Preserve full-screen surrounding context in captures and thumbnails. Keep original media unchanged, with private account captures available locally and inside the password-protected website. One site login covers the wireframes, guides, 59 selected original screenshots and search. See [protected hosting](workers/references/README.md). The existing public originals are the Notion and Steam recordings and GitHub event screenshot; the three separate Steam queue screenshots remain unavailable as files.

Design and review locally, then publish only on an explicit request for the current revision. See [the index contract](docs/index-design.md) for card, filter, and reference-viewer behavior.

The component gallery and experiments load separately. Existing gallery anchors continue to work.

Each index entry has a **Design intent** disclosure: one primary objective, optional secondary objectives, audience/account state, journey, mechanisms, format, and a proposed success measure. Use [the shared definitions](docs/design-intent.md), available in the kit at `?#growth`. The eight categories are a working synthesis for classifying intent; they do not establish measured impact or a universal industry standard. Keep interpretations and unvalidated measures explicit when adding or revising an experiment.

Cards emphasize the preview, title, and a short description, with source, goal, and full added date in pills. The complete intent record uses shared Lucide field icons behind the disclosure. Focus new experiments on the requested component, preserve its useful source copy, and abstract unrelated page content.

## Local-first design workflow

Design and review locally. Publish only when Anuj explicitly asks for the current revision; earlier publishing requests do not authorize later redeployments. Local saves do not change the live site.

Start `npm run dev`, then open [the local design workbench](http://127.0.0.1:5173/blueprint-wireframe-kit/?view=experiments&experiment=steam-growth-banners&tune=1). The **Tune design** button opens the same panel.

- **Tokens:** choose surfaces, outlines, corners, type, and spacing. Every choice shows its semantic token, resolved value, and Tailwind utility.
- **Marquee / Stickers:** adjust angle, speed, fade, fan angle, shadow strength, and glyph tempo. These are identified as experiment-specific values or component recipes.
- **Save to project:** writes the validated values to `src/experiments/steam-growth-banners.config.json`. Reloading and later production builds use the saved values.
- **Revert:** returns the preview to the last saved project settings. Unsaved drafts survive a same-tab refresh when the source settings have not changed. **Copy values** copies the current settings for discussion.

The editor and local save endpoint are development-only. The save endpoint accepts only same-origin requests on loopback and a fixed, validated settings file. Production contains the saved design, without the editor. Changing token choices here selects existing foundations; it does not rewrite `src/tokens.json` globally.

The reusable editor is in `src/tuning/`. New experiments can supply their own field schema and settings, then add an explicit endpoint mapping. Keep save paths allowlisted and distinguish semantic tokens from experiment values.

## Run locally

Use Node.js 22.12 or newer in the Node 22 release line, plus npm.

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. The development path includes `/blueprint-wireframe-kit/` because the project is configured for a GitHub Pages repository site.

```bash
npm run build
npm run preview
```

The build regenerates token CSS, validates token references and contrast pairs, runs TypeScript checks, then writes the static site to `dist/`. The preview command serves that production build locally.

## Where to work

| File                             | Purpose                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `src/components/kit.tsx`         | Reusable React components and their variants                |
| `src/index.css`                  | Tailwind entry point, typography, shared and gallery styles |
| `src/tokens.json`                | Canonical colour and foundation tokens                      |
| `src/tokens.css`                 | Generated CSS variables and Tailwind utility mappings       |
| `scripts/build-tokens.mjs`       | Validates references and generates the token stylesheet     |
| `scripts/check-tokens.mjs`       | Checks the supported foreground/background contrast pairs   |
| `src/components/foundations.tsx` | Live colour, layout, typography, and behaviour reference    |
| `src/App.tsx`                    | Component gallery and interactive examples                  |
| `src/main.tsx`                   | Application entry point                                     |
| `vite.config.ts`                 | React, Tailwind, and the GitHub Pages base path             |
| `.github/workflows/deploy.yml`   | Build and deploy to GitHub Pages                            |

The stack is React, TypeScript, Vite, and Tailwind CSS v4. Radix UI supplies interaction primitives; Lucide supplies icons. `class-variance-authority`, `clsx`, and `tailwind-merge` support component variants and class composition.

## Reuse the kit

Inside this project, import components and compose them with normal React state and Tailwind layout utilities:

```tsx
import { Button, Input } from "./components/kit";

export function ProjectName() {
  return (
    <form
      className="flex max-w-sm flex-col gap-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="project-name">Project name</label>
      <Input
        id="project-name"
        name="projectName"
        placeholder="Onboarding exploration"
      />
      <Button type="submit">Create project</Button>
    </form>
  );
}
```

To use it in another React and TypeScript project:

1. Copy `src/components/kit.tsx`, `src/components/patterns.tsx`, `src/index.css`, and `src/tokens.css` into the equivalent source folders. Import `index.css` once from your application entry point. To maintain the token source in the destination project, also copy `src/tokens.json` and the two `scripts/*tokens.mjs` scripts. The stylesheet contains optional gallery styles you can remove.
2. Install the component dependencies:

   ```bash
   npm install radix-ui lucide-react class-variance-authority clsx tailwind-merge
   ```

3. For a Vite project, install and enable Tailwind v4:

   ```bash
   npm install -D tailwindcss @tailwindcss/vite
   ```

   Add Tailwind to your existing Vite plugins:

   ```ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   });
   ```

4. Keep the stylesheet's `@import "tailwindcss"` and theme declarations. Import the components into your screens, then add your own content and application logic.

Do not copy this repository's GitHub Pages base path into a differently named project. Set that path for the destination where your app will actually be hosted.

## Foundation contract

Browse **Foundations → Blue context / Yellow growth** for both 11-shade palettes, semantic roles, calculated contrast pairings, and live shared-control specimens. [Colour tokens and theme boundaries](docs/tokens.md) documents the approved composition rules and where to make systemic fixes.

`src/tokens.json` is the source of truth. Edit it, then run:

```bash
npm run tokens:build
npm run tokens:check
```

Development startup and production builds regenerate `src/tokens.css` automatically. Do not edit that generated file by hand. Commit both JSON and generated CSS so the kit can also be copied into another project without the generator.

Use semantic utilities in screens:

```tsx
<section className="bg-surface-sunken text-foreground p-6">
  <div className="rounded-md border border-border bg-card p-6">
    <h2 className="text-xl font-semibold">Project overview</h2>
    <p className="text-muted-foreground">Supporting information</p>
    <Button variant="secondary">Review details</Button>
  </div>
</section>
```

| Provision       | Intended use                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| Blue palette    | Tonal ramp from near-black blue to near-white; primitives for extending the system                      |
| Surfaces        | Deep shell, recessed areas, canvas, cards, floating content, and inverse areas                          |
| Text            | Primary, supporting, subtle, inverse, links, and disabled content                                       |
| Actions         | Primary, secondary, destructive, hover, pressed, selected, and disabled states                          |
| Boundaries      | Decorative dividers, strong boundaries, form outlines, and focus rings                                  |
| Feedback        | Info, success, warning, and error; pair colour with clear words or icons                                |
| Layout and type | Spacing rhythm, type scale, radii, and compact/standard/touch control sizes                             |
| Behaviour       | Motion durations and explicit stacking layers for sticky surfaces, popovers, dialogs, and notifications |

Surface names describe purpose, not a brightness ladder: floating content is deliberately dark and opaque. Use matching `*-foreground` tokens on filled primary, secondary, inverse, and status surfaces. Use pale status colours as text on their matching subtle surfaces. Use the blue ramp directly only when adding a documented role; prefer semantic names throughout product screens.

The contrast check covers intended pairs, not every possible combination of tokens. Faint `border` and `border-subtle` colours are for decoration. Use `input` or `border-strong` when a boundary is necessary to identify a control. Subtle text is still readable text; disabled tokens communicate inactivity and are not appropriate for body copy.

The default control height is 40px. Compact controls are for dense desktop contexts, and touch sizing is available for touch-first flows. Changing a size token does not remove the need to check labels, zoom, wrapping, and keyboard focus in the full layout.

## Design rules

- Use the shared theme tokens for blue canvas, white ink, surfaces, borders, and focus indicators. Adjust tokens centrally instead of adding unrelated colors to individual components.
- Keep the drafting grid decorative. It must not carry instructions, statuses, or information needed to use a screen.
- Use text and icons to distinguish states. Success, errors, selected items, and disabled controls must remain understandable when colours are removed.
- Use real headings, labels, buttons, links, and form controls. Wireframes should express the intended behavior as well as the intended layout.
- Preserve visible focus indicators, readable text, clear hierarchy, and comfortable interaction targets when making components denser.
- Favor reusable variants over one-off visual changes. Add new components to the gallery so their states can be reviewed together.

## Accessibility and verification

The target is **WCAG 2.2 AA**. This is a development target, not an accessibility certification or a guarantee that every future screen made with the kit conforms. Radix primitives help with interaction patterns, but accessible names, content, contrast, and composition still need review in each use.

Version 0.2 foundation checks:

- **68 colour tokens** (12 palette primitives and 56 semantic roles), generated from one JSON source.
- **127 intended contrast pairs pass**; minimum tested text contrast 4.53:1, meaningful boundary/focus contrast 3.26:1.
- Automated axe checks reported zero violations in tested gallery and foundation views. Some ARIA and rendered contrast cases still need manual review.
- All three foundation panels reflow at 320px without whole-page horizontal overflow. Single-token copying and full colour-variable export were checked in the browser.
- Floating menus sit above dialogs in the layer scale so portal-based controls can be composed inside modal forms.

Verification history for the initial gallery (v0.1):

- TypeScript and the Vite production build pass.
- axe-core reported **zero automated violations** on the gallery and open dialog (53 and 36 passed checks respectively). It left some ARIA and contrast cases for manual review; this is not a complete conformance audit.
- Manually checked dialog focus containment, Escape close and focus return; arrow-key tab switching; component filtering; code copying; and mobile navigation.
- Checked reflow at 390px and 320px with no whole-page horizontal overflow.
- Calculated contrast: primary text **9.63:1**, secondary text **6.59:1**, control boundaries **4.69:1** against the canvas.

For a development-only automated check, open the local gallery with `?audit=1` and inspect `BLUEPRINT_A11Y` messages in the browser console. The audit reruns after clicks and is excluded from production builds.

A full screen-reader audit, browser zoom testing, and broader browser testing remain necessary before declaring formal conformance. Repeat relevant checks when changing colors or composing new flows.

The gallery demonstrates real UI interactions with sample data and does not provide a backend. Connect the reusable components to real data and business logic when building a production feature.

## Publish the password-protected site

The website is hosted at `https://blueprint-private-references.portfolio-v5.workers.dev/blueprint-wireframe-kit/`. The existing GitHub Pages address redirects to it while preserving the path, query and fragment. No app bundle or originals are deployed to Pages.

After Anuj explicitly requests the current revision, run `npm run site:build`, the relevant checks, and `npm run site:deploy` from the local checkout that holds the private originals. The Cloudflare Worker checks the signed session before every page, asset, reference and search request. The generated password and server secrets remain in ignored, owner-only local files and Cloudflare secrets. Read [the deployment contract](workers/references/README.md) before changing this gate.

Push the reviewed source to `main`. Manually run **Redirect to password-protected Blueprint** only when the Pages redirect needs publication. Its artifact contains only the redirect and fallback pages; a push alone does not deploy anything. The search Worker has no public Workers URL and is reachable only through the protected site's service binding.

For a different repository name, update `base` in `vite.config.ts` to `/<repository-name>/`. For an account root site or a custom domain served at the domain root, use `/`.

## References

- [Visual reference: Blueprint Generator](https://blueprint-generator.vercel.app/)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
