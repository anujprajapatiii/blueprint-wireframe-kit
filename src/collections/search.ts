import { growthCategoryById, type GrowthCategoryId } from "../growth/taxonomy";
import type { CollectionPattern } from "./types";

/** Shared by the library and collection so a search never loses matches on entry. */
export function matchesPattern(
  pattern: CollectionPattern,
  query: string,
  goal: GrowthCategoryId | "all",
) {
  const intent = pattern.growth;
  if (
    goal !== "all" &&
    intent.primary !== goal &&
    !intent.secondary.includes(goal)
  )
    return false;
  const text = [
    pattern.title,
    pattern.summary,
    pattern.sourceName,
    pattern.flow,
    pattern.flowGroup,
    pattern.trigger,
    pattern.observed,
    pattern.nextState,
    pattern.limit,
    ...pattern.copy,
    intent.audience,
    intent.journey,
    ...intent.mechanisms,
    intent.format,
    intent.measure,
    intent.basis,
    growthCategoryById[intent.primary].name,
    ...intent.secondary.map((id) => growthCategoryById[id].name),
  ]
    .join(" ")
    .toLocaleLowerCase();
  return text.includes(query.trim().toLocaleLowerCase());
}
