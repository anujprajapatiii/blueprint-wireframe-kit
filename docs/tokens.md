# Colour tokens and theme boundaries

The live design-system reference is **Foundations → Blue context / Yellow growth** in the component gallery. It shows all 11 shades in each palette, copyable semantic roles, surface/foreground pairings with calculated contrast ratios, and the real shared controls in both themes.

## One source of truth

| Layer                    | Owner                                                        | Responsibility                                                                                                 |
| ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Palette and roles        | `src/tokens.json`                                            | Canonical colour values and semantic aliases. Palette shades are ingredients; semantic roles define use.       |
| Generated utilities      | `scripts/build-tokens.mjs` → `src/tokens.css`                | CSS variables and Tailwind colour utilities. Regenerate; never edit generated CSS by hand.                     |
| Theme boundary           | `src/components/growth-theme.css`                            | Map semantic roles to yellow inside `growth-scope`; restore the original blue aliases inside `growth-context`. |
| Component recipe         | `src/components/kit.tsx`                                     | Surface, foreground, border, focus, and interaction states for each shared component.                          |
| Documentation and checks | `src/components/foundations.tsx`, `scripts/check-tokens.mjs` | Live specimens and token/mapping checks; inspect rendered compositions as well.                                |

Keep fixes at the layer that owns the problem. A semantic-role change belongs in the token source, a missing theme alias belongs in the theme map, and a Button or Input state belongs in the shared component recipe. Do not accumulate one-off text colours or descendant selectors in experiments to compensate for a faulty theme or control.

## Theme and paint are separate

`growth-scope` and `growth-context` choose the token family and native control colour scheme. **They do not paint a background or set the text colour.** Every HTML theme boundary needs an explicit surface/foreground pair, supplied by a shared component or by semantic utilities.

```tsx
<section className="growth-scope rounded-md border border-border bg-card p-5 text-card-foreground">
  <h2>Invite a teammate</h2>
  <p className="text-muted-foreground">Work together on your first project.</p>
  <Button>Invite teammate</Button>

  <aside className="growth-context mt-4 rounded-md bg-surface-sunken p-4 text-foreground">
    Existing workspace context
  </aside>
</section>
```

Do not place a yellow text scope on a transparent wrapper over a blue page: its dark ink will sit on the wrong background. Likewise, restoring blue tokens inside a yellow container requires a blue painted surface and its foreground. Keep scope on the smallest meaningful component; layout wrappers do not become coloured panels automatically.

Portals do not inherit their trigger's DOM scope. Apply the correct scope to the menu/dialog surface; shared `SelectContent`, `DialogContent`, and similar components provide their own paint pair. The scrim remains a separate layer and is not a readable text surface.

SVGs need SVG paint: a scoped group must contain a painted `rect` or other shape under its text, with matching `fill` roles. CSS `background-color` on a group does not paint that SVG region.

## Approved role pairings

The same base role names work in both themes. The `growth-` tokens are their yellow counterparts; compose with ordinary semantic utilities inside a scoped component.

| Purpose                   | Surface                                                                   | Foreground / boundary                                                                                       |
| ------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Canvas and ordinary inset | `background`, `surface-sunken`, `surface-deep`, `muted`, `surface-raised` | `foreground`; supporting copy uses `muted-foreground` or `foreground-subtle` on supported ordinary surfaces |
| Card                      | `card`                                                                    | `card-foreground`                                                                                           |
| Menu / dialog             | `popover`                                                                 | `popover-foreground`                                                                                        |
| Inverse area              | `inverse`                                                                 | `inverse-foreground`; focus uses `ring-inverse`                                                             |
| Primary action            | `primary`, `primary-hover`, `primary-active`                              | `primary-foreground` in every state                                                                         |
| Secondary action          | `secondary`, `secondary-hover`, `secondary-active`                        | `secondary-foreground` in every state                                                                       |
| Selected row / tab        | `selected`                                                                | `selected-foreground`, plus a border, check, or visible selection label                                     |
| Disabled control          | `disabled`                                                                | `disabled-foreground` and `disabled-border`; retain native disabled behavior                                |
| Input                     | `surface-sunken`                                                          | `foreground`, `foreground-subtle` placeholder, `input` boundary                                             |
| Keyboard focus            | Surrounding supported surface                                             | `ring` with an offset gap; use `ring-inverse` for an inverse surface                                        |
| Status message            | `<status>-subtle`                                                         | `<status>-text`; pair its hue with clear words or an icon                                                   |

Yellow ordinary surfaces are light, with dark yellow-brown ink. Yellow primary actions and inverse areas are dark and require their light foreground tokens. Never carry ordinary muted or subtle text onto a dark primary/inverse surface. Feedback preserves error, success, warning, and information semantics; it does not become monochromatic merely because it appears in a growth component.

Use `border` and `border-subtle` for decoration. Use `input` or `border-strong` when a boundary is necessary to recognize a control. Do not fade an entire control, text label, or boundary with opacity; use its explicit state roles.

Invalid inputs, checkboxes, radios, and selects use `destructive-text` for their error boundary. The light destructive fill is an action/feedback surface, not a contrasting outline on a light yellow field. The shared recipes own this distinction in both themes.

The index also uses `growth-highlight` for yellow title verbs on blue card surfaces. This is an explicit cross-theme annotation role, not the ordinary dark `growth-foreground` and not a reason to theme the whole card yellow. Its actual card and hover pairings must pass the contrast checks. Goal badges use the shared Badge recipe with an opaque yellow surface and its matching dark foreground.

## Actions at a colour boundary

Place dark yellow primary buttons inside a light yellow painted component so the control boundary and focus remain visible. If an isolated growth action sits directly on the blue environment, use an opaque light yellow secondary action or an outline action with an explicit light surface:

```tsx
<Button variant="secondary" className="growth-scope focus-visible:outline-ring-inverse">
  Explore templates
</Button>
<Button variant="outline" className="growth-scope bg-card focus-visible:outline-ring-inverse">
  Compare plans
</Button>
```

Transparent outline and ghost buttons are valid _inside_ a correctly painted theme container. They must not place dark growth text directly on blue context. Review hover, pressed, selected, disabled, and focus states at the boundary, not only the default fill.

An isolated yellow control uses the light `ring-inverse` against its surrounding blue canvas. Controls inside a light yellow container keep the dark `ring`. Focus is measured against the adjacent surface, not against the control's label.

## Contrast and verification

Target at least **4.5:1 for ordinary text** and **3:1 for meaningful control boundaries and focus** against their actual adjacent surfaces. Keep disabled labels readable even though inactive controls have different contrast requirements. Pairing ratios in Foundations are calculated from the current token source, not copied numbers.

Run `npm run tokens:build` and `npm run tokens:check` after foundation changes; `npm run build` runs both with TypeScript and the production build. Token checks cover declared opaque pairs and theme mappings. They cannot establish contrast for arbitrary transparency, images, overlapping layers, inherited foreground mistakes, or every rendered state.

The build also checks light yellow controls and focus rings against all supported blue surroundings, and rejects implicit background/text paint in theme boundaries. In local development, add `audit=1` to a gallery or standalone experiment URL to run the existing axe audit on entry and after interactions. Review `BLUEPRINT_A11Y` violations and incomplete nodes in the console; unresolved contrast nodes require visual inspection. For embedded flows use `embed=1&audit=1` so their portalled states are audited in the same document.

Contrast thresholds follow [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). A disabled state remains readable by this kit's own standard even when WCAG exempts an inactive control.

Review the real shared components and affected wireframes in the browser, including nested themes, portalled menus, input errors, selection, disabled controls, hover/pressed/focus states, and narrow reflow. Fix the owner of the problem and retain a focused regression check. A passing token report is evidence for its defined pairs, not full accessibility certification.

The yellow/blue distinction and Guide me content follow [Growth education](growth-education.md). New experiments follow [Reference workflow](reference-workflow.md).
