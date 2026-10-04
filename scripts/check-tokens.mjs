import { readFile } from "node:fs/promises";
import { loadTokens } from "./build-tokens.mjs";

const { source, resolved } = await loadTokens();

// Guard the theme boundary, not only its palette. Adding or renaming a semantic
// role must update both the yellow mapping and the blue-context restoration.
const themeCSS = await readFile(
  new URL("../src/components/growth-theme.css", import.meta.url),
  "utf8",
);
// Scopes select palettes; they must not silently paint a surface. This guards
// against reintroducing dark ink on transparent controls or colour-filled gaps.
for (const [, declaration] of themeCSS.matchAll(
  /:where\(\.(?:growth-scope|growth-context)\)\s*\{([^}]+)\}/g,
)) {
  if (/(?:^|;)\s*(?:color|background(?:-color)?)\s*:/.test(declaration))
    throw new Error(
      "Theme boundaries must not paint implicit surfaces or text.",
    );
}
function themeDeclarations(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = themeCSS.match(
    new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]+)\\}`),
  );
  if (!block) throw new Error(`Missing growth theme selector: ${selector}`);
  return new Map(
    [...block[1].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)].map(
      ([, name, value]) => [name, value.trim()],
    ),
  );
}
const contextAliases = themeDeclarations(":root");
const growthTheme = themeDeclarations(".growth-scope");
const contextTheme = themeDeclarations(".growth-context");
const colorAliases = themeDeclarations(".growth-scope,\n.growth-context");
const baseRoles = source.groups
  .filter((group) => !group.id.startsWith("growth-"))
  .flatMap((group) =>
    group.tokens.map((token) => ({
      ...token,
      feedback: group.id === "status",
    })),
  );
function requireThemeValue(declarations, name, expected) {
  if (declarations.get(name) !== expected)
    throw new Error(
      `Growth theme role --${name} must be ${expected}; got ${declarations.get(name) ?? "no mapping"}.`,
    );
}
for (const { name, feedback } of baseRoles) {
  requireThemeValue(contextAliases, `context-${name}`, `var(--${name})`);
  requireThemeValue(contextTheme, name, `var(--context-${name})`);
  requireThemeValue(colorAliases, `color-${name}`, `var(--${name})`);
  if (resolved.has(`growth-${name}`))
    requireThemeValue(growthTheme, name, `var(--growth-${name})`);
  else if (!feedback || growthTheme.has(name))
    throw new Error(`Missing growth counterpart for semantic role ${name}.`);
}
for (const name of growthTheme.keys())
  if (!baseRoles.some((role) => role.name === name))
    throw new Error(
      `Growth scope must not override raw palette colour ${name}.`,
    );
console.log(
  `Passed scoped theme mappings for ${baseRoles.length} semantic roles.`,
);

const failures = [];
const results = [];
function luminance(hex) {
  if (!/^#[\da-f]{6}$/i.test(hex))
    throw new Error(`Contrast checks require opaque colours: ${hex}`);
  const channels = [1, 3, 5].map(
    (offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255,
  );
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function check(foreground, background, minimum) {
  if (!resolved.has(foreground) || !resolved.has(background))
    throw new Error(`Unknown contrast pair: ${foreground}/${background}`);
  const a = luminance(resolved.get(foreground));
  const b = luminance(resolved.get(background));
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  results.push({ foreground, background, minimum, ratio });
  if (ratio < minimum)
    failures.push(
      `${foreground} on ${background}: ${ratio.toFixed(2)}:1 < ${minimum}:1`,
    );
}

const darkSurfaces = [
  "background",
  "surface-deep",
  "surface-sunken",
  "card",
  "popover",
  "muted",
  "surface-raised",
  "selected",
];
for (const surface of darkSurfaces) {
  for (const text of [
    "foreground",
    "muted-foreground",
    "foreground-subtle",
    "link",
    "link-hover",
  ])
    check(text, surface, 4.5);
  for (const boundary of ["input", "border-strong", "ring"])
    check(boundary, surface, 3);
}
for (const name of [
  "card",
  "popover",
  "inverse",
  "accent",
  "selected",
  "disabled",
  "success",
  "warning",
  "info",
])
  check(`${name}-foreground`, name, 4.5);
for (const action of ["primary", "secondary", "destructive"]) {
  for (const state of [action, `${action}-hover`, `${action}-active`])
    check(`${action}-foreground`, state, 4.5);
}
for (const status of ["destructive", "success", "warning", "info"]) {
  for (const surface of [...darkSurfaces, `${status}-subtle`])
    check(`${status}-text`, surface, 4.5);
  check("foreground", `${status}-subtle`, 4.5);
  check("ring", `${status}-subtle`, 3);
}
check("ring-inverse", "inverse", 3);

// Growth interventions use a separate light yellow theme. Check every shared
// text role and meaningful control boundary against its supported surfaces,
// including the strongest secondary-action fill.
const growthSurfaces = [
  "growth-background",
  "growth-surface-deep",
  "growth-surface-sunken",
  "growth-card",
  "growth-popover",
  "growth-muted",
  "growth-surface-raised",
  "growth-selected",
  "growth-secondary-active",
];
for (const surface of growthSurfaces) {
  for (const text of [
    "growth-foreground",
    "growth-muted-foreground",
    "growth-foreground-subtle",
    "growth-link",
    "growth-link-hover",
  ])
    check(text, surface, 4.5);
  for (const boundary of [
    "growth-input",
    "growth-border-strong",
    "growth-ring",
  ])
    check(boundary, surface, 3);
}
for (const name of [
  "growth-card",
  "growth-popover",
  "growth-inverse",
  "growth-accent",
  "growth-selected",
  "growth-disabled",
])
  check(`${name}-foreground`, name, 4.5);
for (const action of ["growth-primary", "growth-secondary"]) {
  for (const state of [action, `${action}-hover`, `${action}-active`])
    check(`${action}-foreground`, state, 4.5);
}
for (const status of ["destructive", "success", "warning", "info"]) {
  for (const surface of [...growthSurfaces, `growth-${status}-subtle`])
    check(`growth-${status}-text`, surface, 4.5);
  check("growth-foreground", `growth-${status}-subtle`, 4.5);
  check("growth-ring", `growth-${status}-subtle`, 3);
}
check("growth-ring-inverse", "growth-inverse", 3);
// Light growth components and their external focus rings must remain distinct
// when placed directly in the blue environment. Dark primary growth actions
// belong inside a light growth surface, not directly on this blue context.
for (const context of darkSurfaces) {
  check("growth-highlight", context, 4.5);
  for (const surface of [
    "growth-card",
    "growth-secondary",
    "growth-secondary-hover",
    "growth-secondary-active",
    "growth-ring-inverse",
  ])
    check(surface, context, 3);
}
if (failures.length) {
  console.error(
    `Token contrast failed (${failures.length}/${results.length} pairs):\n${failures.map((failure) => `  ${failure}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  const textMinimum = Math.min(
    ...results
      .filter((result) => result.minimum === 4.5)
      .map((result) => result.ratio),
  );
  const boundaryMinimum = Math.min(
    ...results
      .filter((result) => result.minimum === 3)
      .map((result) => result.ratio),
  );
  console.log(
    `Passed ${results.length} token contrast pairs. Lowest text: ${textMinimum.toFixed(2)}:1; boundary/focus: ${boundaryMinimum.toFixed(2)}:1.`,
  );
  console.log(
    "Checks cover defined opaque token pairs, not full WCAG conformance or arbitrary colour combinations.",
  );
}
