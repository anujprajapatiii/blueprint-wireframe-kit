import { collectionById } from "../../collections/registry";
import type { Experiment, ExperimentType } from "../registry";
import type { ElevenPreviewKind } from "./thumbnails";

/** Explicit editorial catalog. Research observations are retained separately. */
export type ElevenWireframeGroup =
  "billing" | "voice" | "creation" | "studio" | "platform";
const presentation: Record<
  string,
  {
    type: ExperimentType;
    preview: ElevenPreviewKind;
    group: ElevenWireframeGroup;
  }
> = {
  "el-v4-discovery-to-trial": {
    type: "Flow",
    preview: "model-promotion",
    group: "creation",
  },
  "el-adjacent-tool-discovery": {
    type: "Screen",
    preview: "settings-promotion",
    group: "creation",
  },
  "el-plan-value-ladder": {
    type: "Flow",
    preview: "plan-ladder",
    group: "billing",
  },
  "el-annual-cadence-framing": {
    type: "Screen",
    preview: "annual-pricing",
    group: "billing",
  },
  "el-annual-upgrade-intercept": {
    type: "Flow",
    preview: "annual-offer",
    group: "billing",
  },
  "el-basic-seat-collaboration-bridge": {
    type: "Flow",
    preview: "seat-invitation",
    group: "platform",
  },
  "el-professional-clone-capability-gate": {
    type: "Screen",
    preview: "voice-gate",
    group: "voice",
  },
  "el-project-context-collaboration-invite": {
    type: "Flow",
    preview: "project-sharing",
    group: "studio",
  },
  "el-flows-first-visit-introduction": {
    type: "Flow",
    preview: "flows-intro",
    group: "studio",
  },
  "el-image-video-example-to-action": {
    type: "Flow",
    preview: "visual-examples",
    group: "creation",
  },
  "el-dubbing-launch-sample-entry": {
    type: "Flow",
    preview: "dubbing-intro",
    group: "studio",
  },
  "el-voice-supplier-earnings-checklist": {
    type: "Flow",
    preview: "earnings-checklist",
    group: "voice",
  },
  "el-demand-guided-voice-supply": {
    type: "Screen",
    preview: "opportunity-table",
    group: "voice",
  },
  "el-affiliate-advocacy-entry": {
    type: "Screen",
    preview: "affiliate-invitation",
    group: "platform",
  },
  "el-agents-template-assisted-onboarding": {
    type: "Experience",
    preview: "agent-templates",
    group: "platform",
  },
  "el-api-time-bounded-model-offer": {
    type: "Screen",
    preview: "model-pricing",
    group: "platform",
  },
};

export const activeElevenLabsIds = Object.keys(presentation);
export function elevenLabsWireframeGroup(id: string) {
  return presentation[id]?.group;
}

const researchById = new Map(
  collectionById.elevenlabs.patterns.map((pattern) => [pattern.id, pattern]),
);

export const elevenLabsExperiments: Experiment[] = activeElevenLabsIds.map(
  (id) => {
    const entry = presentation[id];
    const pattern = researchById.get(id);
    if (!pattern)
      throw new Error(
        `Missing source observation for curated experiment: ${id}`,
      );
    return {
      id: pattern.id,
      title: pattern.title,
      summary: pattern.summary,
      sourceName: pattern.sourceName,
      addedAt: pattern.addedAt,
      updatedAt: "2026-10-04",
      preview: entry.preview,
      type: entry.type,
      focus: [pattern.flowGroup, pattern.flow, pattern.growth.format],
      source: pattern.sourceUrl,
      status: "Ready for review",
      intent: `Study ${pattern.title.toLocaleLowerCase()} as an interactive neutral wireframe, preserving the observed hierarchy, proportions, useful copy, and local changes of state.`,
      sourceAccess: "Inspected",
      observations: [pattern.trigger, pattern.observed, pattern.nextState],
      preservedCopy: pattern.copy,
      neutralizedVisuals: [
        "Source branding, artwork, media, and decorative treatments are replaced with shared blueprint surfaces and neutral placeholders.",
        "Supporting containers retain the placement and relative scale of the focused interaction while unrelated content is abstracted.",
      ],
      assumptions: [
        pattern.limit,
        "Actions are local demonstrations; they do not create accounts or content, send invitations, run generation, or change billing.",
        "Responsive reflow and accessible keyboard behavior are prototype provisions; the captured source is desktop.",
      ],
      reviewNotes: [
        "Original observations, copy, evidence relationships, and inspection limits are retained in the ElevenLabs research catalog.",
        "The 4 October 2026 growth-only review retains this observed intervention as an individually filterable wireframe. Ordinary product controls remain context, and the original research archive remains intact.",
      ],
      growth: pattern.growth,
    };
  },
);
