import type { Experiment } from "../experiments/registry";
import type { SearchEntry } from "./contracts";

/** Public index fields only: exclude reference notes, audiences, journeys and assets. */
export function buildSearchCatalog(
  experiments: readonly Experiment[],
): SearchEntry[] {
  return experiments
    .filter((experiment) => experiment.status !== "Archived")
    .map((experiment) => ({
      id: experiment.id,
      title: experiment.title,
      summary: experiment.summary,
      sourceName: experiment.sourceName,
      type: experiment.type,
      focus: [...experiment.focus],
      goals: [experiment.growth.primary, ...experiment.growth.secondary],
      mechanisms: [...experiment.growth.mechanisms],
      format: experiment.growth.format,
    }));
}
