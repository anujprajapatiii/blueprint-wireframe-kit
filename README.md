# Blueprint Wireframe Kit

A professional wireframing foundation for exploring product structure, content, behavior, and states. A restrained blueprint palette keeps the work visually consistent. Semantic tokens provide darker surfaces, layered panels, inverse areas, accessible text, controls, and optional feedback colours without introducing a new styling decision for every screen.

The app is a browsable component gallery inspired by the way shadcn presents examples. The reusable components live in this repository, so their source and styling stay under your control. This is a standalone kit, not the Blueprint.js library or a published shadcn registry.

## Experiments

[Browse the experiment directory](https://anujprajapatiii.github.io/blueprint-wireframe-kit/?view=experiments) · [Steam growth banners](https://anujprajapatiii.github.io/blueprint-wireframe-kit/?view=experiments&experiment=steam-growth-banners)

Experiments are lasting wireframes of screens, flows, and experiences. Keep useful source copy, structure, and observed interaction behavior; replace branding and visual detail with kit primitives. Preserve the user's intent alongside each experiment so later work can recover the reason for its design.

Start with [the project rules](AGENTS.md) and [the reference-to-wireframe workflow](docs/experiment-rules.md). The first [experiment record](docs/experiments/steam-growth-banners.md) distinguishes observed reference behavior from prototype decisions. Original uploaded media is not bundled into the public site.

To add an experiment:

1. Capture its intent, source, scope, observations, copy, and assumptions in `docs/experiments/<id>.md`.
2. Add its typed metadata to `src/experiments/registry.ts` and its view under `src/experiments/`.
3. Register the view in `src/experiments/app.tsx`. Use `?view=experiments&experiment=<id>` for a stable link that refreshes directly on GitHub Pages.
4. Verify the focused states and responsive layout, then update its status and review notes.

The component gallery and experiments load separately. Existing gallery anchors continue to work.

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

## Publish with GitHub Pages

The Vite base path is `/blueprint-wireframe-kit/`, matching a repository named `blueprint-wireframe-kit`.

1. Put the project at the root of that GitHub repository, including `package-lock.json` and `.github/workflows/deploy.yml`.
2. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
3. Push to `main`, or manually run **Deploy to GitHub Pages** from the **Actions** tab.

The workflow installs locked dependencies with `npm ci`, builds with Node 22, uploads `dist/`, and deploys through the `github-pages` environment. The successful deployment provides the published URL. No personal access token is needed in the workflow; it uses GitHub's built-in token with Pages permissions.

For a different repository name, update `base` in `vite.config.ts` to `/<repository-name>/`. For an account root site or a custom domain served at the domain root, use `/`.

## References

- [Visual reference: Blueprint Generator](https://blueprint-generator.vercel.app/)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
