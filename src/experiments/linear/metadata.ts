import type { Experiment } from "../registry";

export const linearExperiments: Experiment[] = [
  {
    id: "linear-interactive-demo",
    title: "Try the product before signup",
    summary:
      "A sample workspace lets visitors learn the basics and change an issue’s status before creating an account.",
    sourceName: "Linear",
    addedAt: "2026-10-13",
    updatedAt: "2026-10-13",
    preview: "linear-interactive-demo",
    type: "Flow",
    focus: ["Interactive demo", "Sample data", "First useful action", "Signup"],
    source: "Linear public demo and start guide · full-viewport references",
    status: "Ready for review",
    sourceAccess: "Inspected",
    intent:
      "Study how a public sample workspace, a pinned welcome guide and a persistent signup route let someone try a useful product action before registration.",
    observations: [
      "Linear’s official start guide links to a public demo that can be explored before signing up. The guide says changes stay local and reset on refresh, and identifies settings and SLAs as excluded capabilities.",
      "On 13 October 2026, the demo opened in Agent. A pinned Welcome to Linear! [README] document explained the sample workspace, its concepts, keyboard shortcuts and unavailable integrations. The prototype starts at this inspected document rather than claiming it was the demo’s default landing page.",
      "The Engineering Issues view contained three visible sample issues: one In Progress and two Todo. ENG-411 opened the issue Surface OAuth token expiry in integration diagnostics.",
      "The issue’s status control opened eight choices: Backlog, Todo, In Progress, In Review, Done, Canceled, Duplicate and Triage. Choosing Done immediately changed the visible status on the issue.",
      "Sign up stayed at the top of the demo sidebar. Selecting it opened Create your workspace with Continue with Google, Continue with email, Continue with SAML SSO and Back to Linear.",
      "No account was created. AI generation, authentication completion, invitation acceptance, production collaboration and saved account data were not inspected.",
    ],
    preservedCopy: [
      "Linear Demo",
      "Sign up",
      "Welcome to Linear! [README]",
      "Explore this workspace to get familiar with how Linear looks and feels. Some functionality (like integrations) aren't present, but it should help you get comfortable with the basics.",
      "How work is organized",
      "Top keyboard shortcuts",
      "Engineering",
      "Issues",
      "Surface OAuth token expiry in integration diagnostics",
      "Show the token expiration state and last refresh result in the integration diagnostics view to simplify sandbox troubleshooting.",
      "Change status…",
      "Todo",
      "Done",
      "Create your workspace",
      "Continue with Google",
      "Continue with email",
      "Continue with SAML SSO",
      "Back to Linear",
    ],
    neutralizedVisuals: [
      "Source branding, near-black surfaces, purple status accents and icons become shared Blueprint tokens and simple line icons. Useful source copy, dense navigation, document placement and issue/property columns remain recognizable.",
      "The complete welcome document panel, including its breadcrumb header, uses yellow. The entire signup choice panel and the persistent standalone Sign up button are yellow. Ordinary issue lists, controls and sample activity remain blue product context.",
      "Long sample activity and secondary issue metadata are shortened without inventing people or events. Static, out-of-scope controls remain contextual text rather than implying a working unobserved flow.",
    ],
    assumptions: [
      "Seven original captures are unchanged 1440 × 900 full viewports from 13 October 2026. They show the public demo and signup entry, not a signed-in free workspace. Originals remain private; published copies require the Blueprint website password.",
      "The prototype begins at the pinned welcome document so the guidance is reviewable. The captured default demo entry was Agent and remains in the original-reference sequence for context.",
      "The status menu’s eight options are preserved and reversible locally. Only choosing Done was exercised in the source. Reversing the choice and regrouping the sample row in the local list are review provisions, not separately observed source transitions.",
      "Selecting a signup method shows an explicit local boundary. Back to Linear returns to the prior demo view in this prototype; the source Back to Linear destination was not inspected. No credentials are requested or stored.",
      "Status survives view changes in this mounted local flow and resets through library Restart or page refresh. This is not production persistence. The welcome document’s displayed keyboard shortcuts are source copy, not implemented application shortcuts.",
      "At 320px, navigation becomes a compact header, issue rows wrap and the status control moves above the issue. Mobile layout and focus management are local accessibility provisions; no mobile source was inspected.",
      "No source motion timing was measured. View changes are immediate and no promotional animation is invented.",
    ],
    reviewNotes: [
      "Manual evidence-based admission: the studied intervention is the before-signup sample workspace plus welcome guidance and signup route. The ordinary issue editor is contextual evidence of a meaningful trial action, not a separately admitted growth pattern.",
      "The TypeSafe skill and current documentation index were consulted. No source material was transmitted to the external curator; automated admission was not run and no model assessment is claimed.",
      "Reviewed locally on 13 October 2026: welcome-to-issue navigation, Todo → Done → Todo, the signup-method preview, Escape, Back to Linear, library Restart to welcome, a Guide me tip and an original reference at its natural 1440 × 900 dimensions.",
      "The corrected status trigger shows one icon and only its label. Returning to the list with In Progress produces one group containing ENG-411 and count 2, alongside Todo count 1.",
      "At an actual 320 × 900 outer viewport, the embedded frame was 286px wide and its document measured 272px. The issue status fitted, and Sign up → Back restored focus to the visible mobile Sign up control. This is a local narrow adaptation, not observed source behavior.",
      "Formatting and TypeScript checks passed after the focused fixes. The shared review record holds the final combined build result and detailed verification: docs/reviews/2026-10-13/local-growth-review.md. These focused checks are not full accessibility certification.",
    ],
    growth: {
      primary: "activation",
      secondary: ["acquisition"],
      audience:
        "Prospective users exploring Linear’s public sample workspace before signup",
      journey:
        "Read the welcome guide, try changing a sample issue, and decide whether to create a workspace",
      mechanisms: [
        "Sample work ready to use",
        "Helpful starting guidance",
        "Working product trial",
        "Signup after exploration",
      ],
      format:
        "Public demo workspace with a welcome document and persistent signup action",
      measure:
        "Visitors who complete a useful demo task, followed by signup and a first useful action in their own workspace",
      basis:
        "The sample workspace and guide support experiencing a product task before setup, so activation is a provisional first-value intent and acquisition captures the explicit signup route. A demo status change is not proof of real user value, successful signup, retention or measured lift.",
    },
  },
];
