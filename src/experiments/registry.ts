export type ExperimentType = "Screen" | "Flow" | "Experience";

export type ExperimentStatus =
  "Awaiting reference" | "In progress" | "Ready for review" | "Archived";

export interface Experiment {
  id: string;
  title: string;
  summary: string;
  type: ExperimentType;
  focus: string[];
  source: string;
  status: ExperimentStatus;
  intent: string;
  sourceAccess: "Inspected" | "Partially inspected" | "Unavailable";
  observations: string[];
  preservedCopy: string[];
  neutralizedVisuals: string[];
  assumptions: string[];
  reviewNotes: string[];
}

export const experiments: Experiment[] = [
  {
    id: "steam-growth-banners",
    title: "Steam growth banners",
    summary:
      "Explore how a sticker reward strip and a discovery queue banner invite browsing.",
    type: "Screen",
    focus: ["Sticker reward", "Discovery queue"],
    source: "Steam Growth Banners.mp4",
    status: "Ready for review",
    intent:
      "Recreate the two banners as neutral wireframes, preserving useful source copy and interaction intent. Keep the rest of the page plain so the banners remain the focus.",
    sourceAccess: "Inspected",
    observations: [
      "The 10.917-second video shows a static store page with a compact sticker reward strip above a wider discovery queue banner.",
      "Three stickers fan out in the reward strip; the discovery queue card stack drifts and tilts automatically.",
      "The reference shows no scrolling, sticky behavior, clicks, or queue flow.",
    ],
    preservedCopy: [
      "Earn free stickers by going through your discovery queue!",
      "Now through Oct 8 - View your stickers",
      "Explore Your Discovery Queue",
      "Click to open your queue of top-selling, new, and recommended titles",
    ],
    neutralizedVisuals: [
      "Source branding, imagery, colors, and decorative styling use shared blueprint foundations instead.",
      "Supporting page content is plain scaffolding for placement and hierarchy.",
    ],
    assumptions: [
      "Local destination placeholders demonstrate entry actions; the next screens are not shown in the source.",
      "Narrow-screen reflow and motion controls are accessibility provisions added for this experiment.",
      "The date is preserved reference copy, not a current offer.",
    ],
    reviewNotes: [
      "Build and 127 token contrast checks pass. Directory and banner page reflow at 320px.",
      "Search, type filters, link feedback, motion pause/resume, destination dialogs, Escape, and focus return were checked in Chrome.",
      "Axe reported zero violations in tested directory, banner, and dialog states. Dialog checks leave ARIA-hidden and some contrast cases for manual review.",
    ],
  },
];

export function experimentHref(id: string) {
  return `?view=experiments&experiment=${encodeURIComponent(id)}`;
}
