import type { GrowthCategoryId } from "../growth/taxonomy";

export type ReferenceKind = "screenshot" | "video" | "link";
export type CuratorDecision = "include" | "context_only" | "needs_review";
export type ComponentRole = "growth" | "context" | "unclear";
export type Observation = { id: string; text: string };

/** Observations come from a person or a vision-capable agent inspecting the original. */
export type CuratorInput = {
  version: 1;
  title: string;
  sourceName: string;
  sourceUrl?: string;
  referenceKind: ReferenceKind;
  observations: Observation[];
  components: Observation[];
  actions: Observation[];
  explicitInclusion: boolean;
};

export const decisionLabels: Record<CuratorDecision, string> = {
  include: "Growth pattern",
  context_only: "Product context",
  needs_review: "Needs review",
};

export const mechanismOptions = {
  feature_promotion: "Feature promotion",
  incentive: "Incentive or reward",
  premium_gate: "Premium capability gate",
  plan_framing: "Plan or savings framing",
  contextual_invitation: "Contextual invitation",
  first_value_onboarding: "First-value onboarding",
  contribution_proposition: "Contribution proposition",
  referral_reward: "Referral proposition",
  retention_intervention: "Retention intervention",
  reactivation_prompt: "Reactivation prompt",
  other: "Other visible intervention",
  none: "Not established",
} as const;
export type MechanismId = keyof typeof mechanismOptions;

export type ChoiceAnswer = {
  type: "choice";
  choice: string;
  confidence: number;
  probabilities: Record<string, number>;
};
export type NoulAnswer = { type: "noul"; noul: number };
export type CuratorAnswer = ChoiceAnswer | NoulAnswer;

export type CuratorReport = {
  version: 1;
  id: string;
  assessedAt: string;
  model: string;
  input: CuratorInput;
  decision: CuratorDecision;
  modelDecision: CuratorDecision;
  overrideApplied: boolean;
  goal: { id: GrowthCategoryId; label: string; confidence: number } | null;
  mechanism: { id: MechanismId; label: string; confidence: number } | null;
  targetAction: (Observation & { confidence: number }) | null;
  evidence: Observation[];
  components: (Observation & { role: ComponentRole; confidence: number })[];
  reviewNotes: string[];
  answers: Record<string, CuratorAnswer>;
  usage: { input_tokens?: number; output_tokens?: number };
  briefMarkdown: string;
};

export type CuratorStatus = { configured: boolean; model: string };
export type CuratorError = { error: string; code?: string };
