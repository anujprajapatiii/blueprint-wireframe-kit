import { growthCategoryById, type GrowthCategoryId } from "../growth/taxonomy";
import type { PatternCollection } from "./types";
import patternData from "./elevenlabs/patterns.json";
import evidenceData from "./elevenlabs/evidence.json";
import coverageData from "./elevenlabs/coverage.json";

function categoryId(value: string): GrowthCategoryId {
  if (!Object.hasOwn(growthCategoryById, value)) {
    throw new Error(`Unknown collection growth category: ${value}`);
  }
  return value as GrowthCategoryId;
}

export const collections: PatternCollection[] = [
  {
    id: "elevenlabs",
    title: "ElevenLabs",
    description:
      "How ElevenLabs guides creation, introduces features, and encourages upgrades.",
    sourceName: "ElevenLabs",
    addedAt: "2026-10-04",
    downloadSrc:
      "__private-references/elevenlabs/elevenlabs-growth-patterns-evidence.zip",
    patterns: patternData.map((pattern) => ({
      ...pattern,
      growth: {
        ...pattern.growth,
        primary: categoryId(pattern.growth.primary),
        secondary: pattern.growth.secondary.map(categoryId),
      },
    })),
    assets: evidenceData.map((asset) => ({ ...asset, kind: "image" })),
    coverage: coverageData,
  },
];

export const collectionById: Record<string, PatternCollection> =
  Object.fromEntries(
    collections.map((collection) => [collection.id, collection]),
  );
