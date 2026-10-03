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
    id: "notion-feature-modal",
    title: "Notion feature modal",
    summary:
      "Explore a feature-announcement modal with expandable details and changing previews.",
    type: "Screen",
    focus: ["Feature announcement", "Modal selection"],
    source: "Notion Modal.mp4",
    status: "Ready for review",
    intent:
      "Recreate the supplied modal as a neutral wireframe, preserving its copy, hierarchy, feature selection, and changes of state.",
    sourceAccess: "Inspected",
    observations: [
      "The 6.84-second clip begins with a centered modal already open over dimmed document context.",
      "The left selector expands the active feature’s description and changes the illustration on the right while the modal frame stays fixed.",
      "HTML blocks changes to Skills at approximately 3 seconds, then MCP at approximately 4.6 seconds. Routines is marked Coming soon.",
    ],
    preservedCopy: [
      "We’ve been cooking!",
      "HTML blocks bring interactive visuals to any page and we can’t stop playing with them!",
      "Skills are reusable instructions for all your agents — no more writing the same prompt twice",
      "MCP gives your tools the context they need to complete tasks",
      "HTML blocks", "Skills", "MCP", "Routines", "Coming soon",
      "Try for free", "Save for later",
    ],
    neutralizedVisuals: [
      "Source branding, typography, colors, and artwork use neutral blueprint tokens and structural previews.",
      "The source eyebrow and mascot are omitted; document context remains plain scaffolding.",
    ],
    assumptions: [
      "The opener, dismissal, CTA destinations, and Routines destination are not shown; any added behavior is an explicitly local prototype fallback.",
      "Narrow-screen reflow, focus management, keyboard operation, and reduced motion are implementation provisions.",
      "No tuning controls are added to this experiment.",
    ],
    reviewNotes: [
      "Built locally from the inspected video; all three feature states, keyboard selection, focus trapping, dismissal, reopening, and local button actions were checked.",
      "Narrow layout at 320px and short landscape layout at 850×480 were checked; the dialog scrolls when needed.",
      "Production build and 127 token contrast checks pass. Axe reported no violations in tested states; some dialog checks require manual ARIA-hidden and contrast review.",
      "Preview crossfades use shared motion tokens. Exact source easing is estimated; reduced-motion styling was inspected in code, not tested with an OS preference override.",
    ],
  },
  {
    id: "steam-growth-banners",
    title: "Steam growth banners",
    summary:
      "Explore the sticker reward, discovery queue carousel, and completion flow.",
    type: "Flow",
    focus: ["Sticker reward", "Discovery queue"],
    source: "Steam Growth Banners.mp4 and three queue screenshots",
    status: "Ready for review",
    intent:
      "Recreate the two banners as neutral wireframes, preserving useful source copy and interaction intent. Keep the rest of the page plain so the banners remain the focus.",
    sourceAccess: "Inspected",
    observations: [
      "The 10.917-second video shows a static store page with a compact sticker reward strip above a wider discovery queue banner.",
      "Three stickers fan out in the reward strip; landscape discovery cards roll continuously along one fixed tilted strip.",
      "Additional screenshots show the immersive game carousel and reward summary; trailer autoplay is described by the user.",
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
      "Twelve sample entries, local wishlist/ignore states and stats, responsive layout, and Continue replaying a sample queue are prototype decisions.",
      "Narrow-screen reflow and motion controls are accessibility provisions added for this experiment.",
      "The date is preserved reference copy, not a current offer.",
      "The fixed angle and marquee speed are estimated from the clip; seamless looping follows the user’s motion clarification.",
      "User-requested refinements: shadowed sticker cards with looping neutral glyphs; a desktop marquee edge fade; no mobile fade or internal clipping boundary.",
    ],
    reviewNotes: [
      "Sticker shadows, three glyph loops, shared pause/resume, desktop edge fading, and unclipped mobile layout at 320px and 640px were checked.",
      "Build and 127 token contrast checks pass. Directory and banner page reflow at 320px.",
      "Search, type filters, link feedback, motion pause/resume, destination dialogs, Escape, and focus return were checked in Chrome.",
      "Axe reported zero violations in tested directory, banner, and dialog states. Dialog checks leave ARIA-hidden and some contrast cases for manual review.",
    ],
  },
];

export function experimentHref(id: string) {
  return `?view=experiments&experiment=${encodeURIComponent(id)}`;
}
