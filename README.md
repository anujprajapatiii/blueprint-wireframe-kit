# Blueprint Wireframe Kit

A personal wireframe kit for thinking through product structure, content, and behavior. A deliberately limited blue-and-white palette, simple outlines, and a decorative drafting grid keep the visual language consistent while the ideas change.

The app is a browsable component gallery inspired by the way shadcn presents examples. The reusable components live in this repository, so their source and styling stay under your control. This is a standalone kit, not the Blueprint.js library or a published shadcn registry.

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

The build runs TypeScript checks, then writes the static site to `dist/`. The preview command serves that production build locally.

## Where to work

| File                           | Purpose                                                                   |
| ------------------------------ | ------------------------------------------------------------------------- |
| `src/components/kit.tsx`       | Reusable React components and their variants                              |
| `src/index.css`                | Tailwind v4 entry point, theme tokens, shared styles, and gallery styling |
| `src/App.tsx`                  | Component gallery and interactive examples                                |
| `src/main.tsx`                 | Application entry point                                                   |
| `vite.config.ts`               | React, Tailwind, and the GitHub Pages base path                           |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages                                          |

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

1. Copy `src/components/kit.tsx` and `src/index.css` into the equivalent source folders. Import the CSS once from your application entry point. The stylesheet also contains gallery styles, which you can remove when you no longer need them.
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

## Design rules

- Use the shared theme tokens for blue canvas, white ink, surfaces, borders, and focus indicators. Adjust tokens centrally instead of adding unrelated colors to individual components.
- Keep the drafting grid decorative. It must not carry instructions, statuses, or information needed to use a screen.
- Use text and icons to distinguish states. Success, errors, selected items, and disabled controls must remain understandable within the monochrome palette.
- Use real headings, labels, buttons, links, and form controls. Wireframes should express the intended behavior as well as the intended layout.
- Preserve visible focus indicators, readable text, clear hierarchy, and comfortable interaction targets when making components denser.
- Favor reusable variants over one-off visual changes. Add new components to the gallery so their states can be reviewed together.

## Accessibility and verification

The target is **WCAG 2.2 AA**. This is a development target, not an accessibility certification or a guarantee that every future screen made with the kit conforms. Radix primitives help with interaction patterns, but accessible names, content, contrast, and composition still need review in each use.

Verification completed for this first version:

- TypeScript and the Vite production build pass.
- axe-core reported **zero automated violations** on the gallery and open dialog (53 and 36 passed checks respectively). It left some ARIA and contrast cases for manual review; this is not a complete conformance audit.
- Manually checked dialog focus containment, Escape close and focus return; arrow-key tab switching; component filtering; code copying; and mobile navigation.
- Checked reflow at 390px and 320px with no whole-page horizontal overflow.
- Calculated contrast: primary text **9.63:1**, secondary text **6.59:1**, control boundaries **4.69:1** against the canvas.

For a development-only automated check, open the local gallery with `?audit=1` and inspect `BLUEPRINT_A11Y` messages in the browser console. The audit reruns after clicks and is excluded from production builds.

A full screen-reader audit, browser zoom testing, and broader browser testing remain necessary before declaring formal conformance. Repeat relevant checks when changing colors or composing new flows.

The gallery is a prototype and does not provide a backend. Connect the reusable components to real data and business logic when building a production feature.

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
