import type { Experiment } from "../registry";

export const gammaCollaborationExperiments: Experiment[] = [
  {
    id: "gamma-shared-folders",
    title: "Shared folder promotion",
    summary:
      "A sidebar message introduces shared folders and shows how to create one with limited access.",
    sourceName: "Gamma",
    addedAt: "2026-10-13",
    updatedAt: "2026-10-13",
    preview: "gamma-shared-folders",
    type: "Flow",
    focus: ["Feature discovery", "Team collaboration", "Contextual promotion"],
    source:
      "Gamma free workspace · private full-viewport captures at 1440px CSS width",
    status: "Ready for review",
    sourceAccess: "Inspected",
    intent:
      "Study how a contextual folder promotion explains a shared-work benefit and provides a direct first step.",
    observations: [
      "The home sidebar includes a FOLDERS card with NEW Manage access, a folder illustration, Group related gammas and share them all at once, and Create a folder.",
      "Manage access opens a popover beside the card. Folders with access explains choosing people once for every gamma in a folder and gives team spaces and private work as use cases.",
      "Got it dismisses the Manage access announcement. The card’s folder benefit and Create a folder action remain.",
      "Create a folder opens a name field with a 250-character limit and This folder will be private until you share it. Creating one scratch folder led to a private, empty folder page.",
      "Share opens an Add people search, Workspace members with No access, and the current user with Full Access. Workspace permission choices are Full Access, Edit, Comment, View, and No access.",
      "The separate Invite teammates entry opens email and link options. These ordinary account controls are supporting context; they are not indexed as a separate growth intervention.",
      "No invitations were sent and no workspace access was changed. The inspected scratch folder was empty; successful shared collaboration was not observed.",
    ],
    preservedCopy: [
      "NEW",
      "Manage access",
      "Group related gammas and share them all at once.",
      "Create a folder",
      "Folders with access",
      "Share a folder with just the people you choose. They get access to every gamma inside.",
      "Good for team spaces and anything that isn’t meant for the whole workspace.",
      "Learn more",
      "Got it",
      "Create folder",
      "This folder will be private until you share it",
      "This folder is empty",
      "Create new gammas or move existing ones into this folder to see them here.",
      "Workspace members",
      "No workspace access",
      "Copy folder link",
    ],
    neutralizedVisuals: [
      "The complete sidebar promotion and its complete feature explainer use the yellow growth palette. Navigation, the creator, folder creation, sharing, and invitations remain blue product context.",
      "Source photography, template art, and the small promotion demo become structural placeholders. Workspace identity, owner name, and private URLs are replaced with generic or explicit example data.",
    ],
    assumptions: [
      "The inspected browser viewport was 1440 × 900 on 13 October 2026. The two initial promotion files measure 1425 × 891 despite the confirmed 1440 × 900 CSS viewport; the cause of this capture mismatch was not established. The other six references were recaptured at exactly 1440 × 900. All originals remain unchanged. Source mobile layouts and animation timing were not inspected; narrow reflow and instant transitions are local adaptations.",
      "Local folder creation, permission selection, invitation feedback, and example copying are review provisions. They do not alter the Gamma account or send a message.",
      "The source’s Learn more destination, invitation success, permission-change confirmation, and resulting collaboration were not inspected. No downstream success screens are invented.",
      "Folder feature adoption is the supported growth interpretation. The visible promotion does not establish first value, paid-seat expansion, monetization, retention lift, or successful team adoption.",
      "Library Restart restores the initial invitation and clears example state; source dismissal persistence across sessions was not established.",
    ],
    reviewNotes: [
      "Manual evidence-based admission: explicit new-feature promotion, team/private-use benefit, and a Create a folder action qualify. Required naming and sharing controls alone would not qualify.",
      "The optional TypeSafe curator was not called because permission to transfer source-derived account observations was not granted; no model endorsement is claimed.",
      "The experiment and eight unchanged originals are approved for the password-protected Blueprint website. Originals remain excluded from Git and public assets.",
      "Reviewed in the integrated browser at 1440 × 900 and 320 × 900 outer viewports. The narrow experiment frame was 272px wide; promotion popover and sharing dialog fit within it. Folder creation, local permission selection, pointer/keyboard closure and Share focus recovery were checked.",
      "Restart restored the promotion; the first Guide me lesson and invitation tabs were inspected. TypeScript and whitespace checks passed after correcting dialog translation and mobile popover placement. This is a focused review, not full accessibility conformance.",
      "Verification and source geometry are recorded in docs/experiments/gamma-shared-folders.md and docs/reviews/2026-10-13/local-growth-review.md.",
    ],
    growth: {
      primary: "engagement",
      secondary: [],
      audience:
        "Signed-in Gamma users with a free workspace who have not yet created a folder",
      journey:
        "Notice a shared-work benefit, learn selective access, create a private folder, and inspect sharing choices",
      mechanisms: [
        "Contextual feature promotion",
        "Concrete team use cases",
        "One action for related work",
        "Direct first step",
      ],
      format:
        "Sidebar promotion with a benefit popover and connected folder flow",
      measure:
        "Useful adoption of shared folders after viewing the promotion; folder creation alone is a supporting signal",
      basis:
        "The source explicitly promotes a collaboration feature. Engagement is an interpretation of broader feature use, not measured impact. Invitation and permission controls are context, and no paid-seat expansion is inferred.",
    },
  },
];
