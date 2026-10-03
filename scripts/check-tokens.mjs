import { loadTokens } from "./build-tokens.mjs";

const { resolved } = await loadTokens();
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
