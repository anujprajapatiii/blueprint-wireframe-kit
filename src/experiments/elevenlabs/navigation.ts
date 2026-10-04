import { elevenLabsWireframeGroup } from "./metadata";

/** Keep the index context when an observed flow opens a related experiment. */
export function relatedExperimentHref(id: string) {
  const active = !id.startsWith("el-") || Boolean(elevenLabsWireframeGroup(id));
  const params = new URLSearchParams({ view: "experiments" });
  if (active) params.set("experiment", id);
  const current = new URLSearchParams(location.search);
  for (const key of ["q", "source", "goal", "type", "sort"]) {
    const value = current.get(key);
    if (value) params.set(key, value);
  }
  // Archived research entries must not create dead experiment links.
  if (!active) params.set("source", "ElevenLabs");
  return `?${params}`;
}
