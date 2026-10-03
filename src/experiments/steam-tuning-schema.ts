import tokens from "../tokens.json";
import type { TuningField, TuningOption } from "../tuning/types";
import type { SteamDesign } from "./steam-design";

const colours: Record<string, string> = { ...tokens.palette };
for (const group of tokens.groups)
  for (const token of group.tokens) colours[token.name] = token.value;
function resolveColour(name: string): string {
  const value = colours[name];
  return value.startsWith("{") ? resolveColour(value.slice(1, -1)) : value;
}
function colourOptions(names: string[], utility: string): TuningOption[] {
  return names.map((name) => ({
    value: name,
    label: name,
    token: `--${name}`,
    resolved: resolveColour(name).toUpperCase(),
    swatch: resolveColour(name),
    utility: `${utility}-${name}`,
  }));
}
const surfaces = [
  "surface-deep",
  "surface-sunken",
  "background",
  "card",
  "popover",
  "muted",
  "surface-raised",
];

export const steamTuningFields: TuningField[] = [
  {
    key: "bannerSurface",
    label: "Banner surface",
    group: "Tokens",
    kind: "token",
    options: colourOptions(surfaces, "bg"),
  },
  {
    key: "stickerSurface",
    label: "Sticker surface",
    group: "Tokens",
    kind: "token",
    options: colourOptions(surfaces, "bg"),
  },
  {
    key: "outline",
    label: "Card outlines",
    group: "Tokens",
    kind: "token",
    options: colourOptions(["input", "border-strong", "foreground"], "border"),
  },
  {
    key: "radius",
    label: "Corner radius",
    group: "Tokens",
    kind: "token",
    options: Object.entries(tokens.foundations.radii)
      .filter(([name]) => name !== "full")
      .map(([name, value]) => ({
        value: name,
        label: name,
        token: `--corner-${name}`,
        resolved: value,
        utility: `rounded-${name}`,
      })),
  },
  {
    key: "headingSize",
    label: "Banner heading",
    group: "Tokens",
    kind: "token",
    options: ["base", "lg", "xl", "2xl"].map((name) => ({
      value: name,
      label: name,
      token: `--type-${name}`,
      resolved:
        tokens.foundations.typeScale[
          name as keyof typeof tokens.foundations.typeScale
        ],
      utility: `text-${name}`,
    })),
  },
  {
    key: "bannerGap",
    label: "Space between banners",
    group: "Tokens",
    kind: "token",
    options: tokens.foundations.spacing
      .filter((size) => size >= 4 && size <= 48)
      .map((size) => ({
        value: size,
        label: `space-${size}`,
        token: `--space-${size}`,
        resolved: `${size}px`,
        utility: `gap-${size / 4}`,
      })),
  },
  {
    key: "tilt",
    label: "Marquee angle",
    group: "Marquee",
    kind: "number",
    min: 4,
    max: 20,
    step: 1,
    unit: "°",
    note: "Experiment value · mobile space follows the angle",
  },
  {
    key: "speed",
    label: "Marquee speed",
    group: "Marquee",
    kind: "number",
    min: 8,
    max: 40,
    step: 1,
    unit: " px/s",
    note: "Experiment value · constant speed on both layouts",
  },
  {
    key: "fade",
    label: "Desktop edge fade",
    group: "Marquee",
    kind: "number",
    min: 0,
    max: 60,
    step: 1,
    unit: "%",
    note: "Experiment value · mobile always has no fade",
  },
  {
    key: "stickerFan",
    label: "Sticker fan angle",
    group: "Stickers",
    kind: "number",
    min: 0,
    max: 24,
    step: 1,
    unit: "°",
    note: "Experiment value · outer cards",
  },
  {
    key: "shadow",
    label: "Shadow strength",
    group: "Stickers",
    kind: "number",
    min: 0,
    max: 1.5,
    step: 0.1,
    unit: "×",
    note: "Component recipe · colour uses --surface-deep",
  },
  {
    key: "stickerTempo",
    label: "Graphic animation speed",
    group: "Stickers",
    kind: "number",
    min: 0.5,
    max: 2,
    step: 0.1,
    unit: "×",
    note: "Experiment value · reduced motion takes precedence",
  },
];

// The browser controls and the local write endpoint share this allowlist.
export function validateSteamDesign(value: unknown): SteamDesign {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Expected design settings.");
  const record = value as Record<string, unknown>;
  if (Object.keys(record).length !== steamTuningFields.length)
    throw new Error("Unexpected or missing settings.");
  const result: Record<string, string | number> = {};
  for (const field of steamTuningFields) {
    const entry = record[field.key];
    if (field.kind === "token") {
      if (!field.options.some((option) => option.value === entry))
        throw new Error(`Choose a valid token for ${field.label}.`);
    } else if (
      typeof entry !== "number" ||
      !Number.isFinite(entry) ||
      entry < field.min ||
      entry > field.max
    ) {
      throw new Error(`${field.label} is outside its supported range.`);
    }
    result[field.key] = entry as string | number;
  }
  return result as SteamDesign;
}
