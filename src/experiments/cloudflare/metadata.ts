import type { Experiment } from "../registry";

const common = {
  sourceName: "Cloudflare",
  addedAt: "2026-10-05",
  updatedAt: "2026-10-05",
  status: "Ready for review" as const,
  sourceAccess: "Inspected" as const,
  neutralizedVisuals: [
    "Cloudflare branding and decorative treatment become shared blueprint surfaces. Account identifiers, project names and usage values become generic context.",
    "The desktop shell retains its sidebar, header and content relationships. Yellow identifies only the studied intervention; supporting controls remain blue.",
  ],
};

/** Manual admission from observed promotions; model-review limits remain per entry. */
export const cloudflareExperiments: Experiment[] = [
  {
    ...common,
    id: "cf-agent-onboarding",
    title: "Agent onboarding promotion",
    summary:
      "A compact dashboard invitation offers a setup prompt for a compatible agent.",
    preview: "cf-agent-onboarding",
    type: "Screen",
    focus: ["Feature promotion", "Setup prompt", "Dashboard"],
    source: "Cloudflare account home · private full-viewport reference",
    intent:
      "Study the small agent promotion in its dashboard context and the observed copied feedback.",
    observations: [
      "A small pill above ‘Let's get to work.’ says ‘Onboard your agent to Cloudflare’. Its accessible description names Claude, Codex, Cursor, and OpenCode.",
      "Selecting the pill briefly shows ‘Setup prompt copied’ above it while the dashboard remains visible.",
      "‘Don't show this again’ is available but was not selected. Search, projects, an event announcement and analytics surround the pill.",
    ],
    preservedCopy: [
      "Onboard your agent to Cloudflare",
      "Works with Claude, Codex, Cursor, and OpenCode",
      "Setup prompt copied",
      "Don't show this again",
      "Let's get to work.",
    ],
    assumptions: [
      "The prototype simulates feedback only. Clipboard contents and downstream agent setup were not inspected; it does not copy an invented setup prompt.",
      "Any local dismissal and restoration are review adaptations. Source dismissal persistence is unknown.",
      "Narrow-screen reflow is a prototype adaptation; the reference viewport is desktop.",
    ],
    reviewNotes: [
      "Jev returned needs_review: feature promotion confidence 0.81 and pill growth-role confidence 0.98, but no sufficiently established primary goal. This is an advisory uncertainty, not model approval.",
      "Manual admission: the explicit agent promotion invites broader feature use from an existing dashboard. Engagement is a provisional interpretation; initial meaningful value was not observed.",
      "A refined review submission was rejected by automatic approval review over account-usage context and downstream authorization. It was not retried; no later Jev endorsement is claimed.",
      "Evidence, limits and completed local review are recorded in docs/experiments/cf-agent-onboarding.md.",
    ],
    growth: {
      primary: "engagement",
      secondary: [],
      audience:
        "Signed-in Cloudflare users encountering an agent feature; prior agent use and commercial status unknown",
      journey: "Notice the agent invitation and obtain the setup prompt",
      mechanisms: [
        "Feature discovery",
        "Compatible-tool cues",
        "Low-effort starting action",
      ],
      format: "Compact dashboard promotion pill",
      measure:
        "Subsequent successful agent use among users exposed to the promotion; prompt selection is only a supporting diagnostic",
      basis:
        "The visible feature promotion supports an engagement interpretation for an existing product user. The copied message does not establish setup success, activation, adoption or causal lift. This classification is manual and provisional; proposed measures are untested.",
    },
  },
  {
    ...common,
    id: "cf-workers-plans",
    title: "Workers paid-plan comparison",
    summary:
      "Free and Paid offers connect a $5 monthly proposition to a bounded checkout preview.",
    preview: "cf-workers-plans",
    type: "Flow",
    focus: ["Plan comparison", "Free to paid", "Checkout boundary"],
    source: "Cloudflare Workers plans · private full-viewport references",
    intent:
      "Study Paid plan framing beside the current Free offer, retaining the observed upgrade and exit boundary.",
    observations: [
      "At the captured 1271px viewport, Free, Paid and Enterprise offers stack vertically. Free is $0 and marked ‘Current plan’; Paid is ‘$5 / month + usage’ with ‘Upgrade’.",
      "The highlights contrast Free limits with Paid request allowance, CPU time, support, Containers and Email sending.",
      "Upgrade opens ‘Upgrade to Workers Paid’ with empty billing/payment fields and a $5/month order summary. ‘Exit checkout’ returns to Workers & Pages, where a standalone Upgrade control sits beside usage.",
      "The plan highlights promise up to 5 minutes CPU per request while checkout shows 30 seconds per request and 30 million CPU milliseconds per month. Both are observed source copy.",
    ],
    preservedCopy: [
      "Workers plans",
      "Free",
      "$0",
      "For personal use and simple applications",
      "Current plan",
      "Paid",
      "$5 / month + usage",
      "For business use and scaling applications",
      "Upgrade",
      "Enterprise",
      "Let's talk",
      "For mission-critical applications at scale",
      "Contact us",
      "100,000 requests per day",
      "Up to 10 ms CPU time per request",
      "Community support",
      "10 million requests included monthly, then $0.30 per million",
      "Up to 5 min CPU time per request",
      "Standard ticket support",
      "Containers & Email sending included",
      "Upgrade to Workers Paid",
      "Exit checkout",
    ],
    assumptions: [
      "Checkout is a local boundary preview with disabled payment fields; no billing details, terms, purchase or subscription are submitted.",
      "Enterprise contact and other uninspected destinations remain explicitly bounded. A paid existing relationship was not established.",
      "The source CPU discrepancy is preserved, not reconciled into a new promise. Captured prices are reference copy, not a live pricing guarantee.",
      "The Workers & Pages standalone Upgrade and usage region remain blue context in this experiment; they are not a separate admitted item.",
      "Narrow-screen reflow is a prototype adaptation; the reference viewport is desktop.",
    ],
    reviewNotes: [
      "Jev returned needs_review with plan-framing confidence 0.83 and unresolved classification, component-role and evidence flags. It did not approve this catalog entry.",
      "Manual admission: the explicit Paid benefits, price and Upgrade proposition are the intervention. Monetization fits the observed current Free plan; expansion would require an established paid relationship.",
      "A refined review submission was rejected by automatic approval review over account-usage context and downstream authorization. It was not retried; no later Jev endorsement is claimed.",
      "Evidence, limits and completed local review are recorded in docs/experiments/cf-workers-plans.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience:
        "Signed-in users with Workers Free marked as their current plan; other commercial relationships unknown",
      journey:
        "Compare the current Free offer with Paid and consider an upgrade",
      mechanisms: [
        "Price and benefit framing",
        "Current-plan comparison",
        "Explicit capacity differences",
      ],
      format: "Stacked plan offers with feature highlights",
      measure:
        "Completed Workers Free-to-Paid conversions after viewing the comparison, with checkout entry and exit as supporting diagnostics",
      basis:
        "The Paid proposition invites a commercial exchange from the observed Free plan. This supports monetization rather than expansion. Checkout shows the next boundary but no purchase, conversion rate or lift was observed. Classification is manual; measures are untested.",
    },
  },
  {
    ...common,
    id: "cf-containers-gate",
    title: "Containers paid capability gate",
    summary:
      "A feature-entry card connects access to Containers with the Workers Paid plan.",
    preview: "cf-containers-gate",
    type: "Flow",
    focus: [
      "Premium capability gate",
      "Contextual purchase",
      "Checkout boundary",
    ],
    source: "Cloudflare Containers · private full-viewport references",
    intent:
      "Study the paid-plan requirement at Containers entry and the observed purchase-to-checkout boundary.",
    observations: [
      "Below the Containers heading, a large centered card says ‘Enable Containers’ and explains the Workers Paid requirement.",
      "‘Purchase Workers Paid’ opens the Workers Paid checkout. ‘Exit checkout’ returns to Containers.",
      "‘View pricing’ points to public Containers pricing documentation; its destination was not inspected. No Container was enabled or product activated.",
    ],
    preservedCopy: [
      "Containers",
      "Enhance your Workers with serverless containers.",
      "Enable Containers",
      "Containers is included in the Workers Paid plan. To start using Containers, upgrade your Workers plan.",
      "Purchase Workers Paid",
      "View pricing",
      "Upgrade to Workers Paid",
      "Exit checkout",
    ],
    assumptions: [
      "The whole offer card is the smallest complete premium gate. Its pricing alternative stays within that proposition; the link alone does not qualify as a separate growth pattern.",
      "Checkout is a local boundary preview with disabled payment fields. No purchase, terms agreement or capability activation occurs.",
      "The pricing link target was observed but not visited. The prototype identifies this uninspected boundary.",
      "Narrow-screen reflow is a prototype adaptation; the reference viewport is desktop.",
    ],
    reviewNotes: [
      "Jev returned needs_review: premium gate confidence 1.00, monetization confidence 0.93 and proposition growth-role confidence 0.99, with an uncertain View pricing component role.",
      "Manual inspection resolves the complete bounded card as the intervention. View pricing is an alternative within the gate, while plain navigation and checkout fields stay blue context. This is a manual decision, not Jev endorsement.",
      "A refined review submission was rejected by automatic approval review over account-usage context and downstream authorization. It was not retried.",
      "Evidence, limits and completed local review are recorded in docs/experiments/cf-containers-gate.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience:
        "Signed-in users reaching Containers without the required Workers Paid access; other commercial relationships unknown",
      journey:
        "Understand the paid requirement at feature entry and consider Workers Paid",
      mechanisms: [
        "Capability gating",
        "Contextual relevance",
        "Explicit paid-plan requirement",
      ],
      format: "Product-entry premium capability card",
      measure:
        "Completed Workers Paid purchases from the Containers gate, followed by successful Containers use as a supporting value measure",
      basis:
        "The card explicitly ties access to a purchase, which supports monetization. Neither a purchase nor product activation was observed; a paid existing relationship is not established. Admission and the complete-card boundary are manual interpretations, and proposed measures are untested.",
    },
  },
  {
    ...common,
    id: "cf-event-promotion",
    title: "Connect event promotion",
    summary:
      "A dashboard banner advertises Connect and hands off to the paid event website.",
    preview: "cf-event-promotion",
    type: "Screen",
    status: "Ready for review",
    focus: ["Event advertising", "Cross-sell", "External handoff"],
    source:
      "Cloudflare account home and Connect event website · full-viewport references",
    intent:
      "Study the compact Connect event advertisement in dashboard context and its external handoff, without rebuilding the event website.",
    observations: [
      "A broad, shallow banner between recent work and Analytics says ‘Meet the Agentic Internet Builders IRL’, with event copy, five overlapping speaker portraits and ‘Learn more’.",
      "Learn more links to https://www.cloudflare.com/connect/ in a new tab. The inspected destination identifies Connect 2026, October 19–21 at Moscone West, San Francisco, and shows Register Now.",
      "The destination's tickets section lists a $595 Conference Pass, a $495 University add-on and $495 Group/Team passes for groups of 5–9. Registration was not started and no purchase was made.",
      "The speaker cue names Evan You, Tanner Linsley, Corey Quinn, Peter Steinberger and Fred Schott. ‘Browse all’ links to https://www.cloudflare.com/connect/speakers/; that destination was not inspected.",
      "The later home capture says ‘What's on the agenda?’ above search. Its agent pill, navigation, work shortcuts and analytics are context for this event-focused experiment.",
    ],
    preservedCopy: [
      "Meet the Agentic Internet Builders IRL",
      "Connect brings the Cloudflare community together once a year to learn, collaborate, and shape what comes next. Oct 19–21, San Francisco.",
      "Learn more",
      "Browse all",
      "What's on the agenda?",
    ],
    assumptions: [
      "The entire event banner is the smallest complete advertising proposition. The agent promotion stays blue context in this experiment and retains its own separate experiment.",
      "The scope ends at external handoff. Learn more opens the observed public event URL in a new tab; this wireframe does not recreate registration, ticket selection or payment.",
      "Speaker portraits become restrained generic circles. The destination's ticket prices substantiate classification and remain reference evidence, not added dashboard banner copy or a live pricing guarantee.",
      "The speaker-page URL is an observed handoff; its content remains uninspected. Attendance, ticket ownership, paid account status, conversion and later outcomes are unknown.",
      "Narrow-screen reflow is a prototype adaptation; the inspected dashboard is desktop.",
    ],
    reviewNotes: [
      "The user explicitly requested this separate event-promotion experiment and corrected the earlier omission. Event advertising and cross-sell with an explicit proposition and invited action qualify even when the destination is external.",
      "Admission is manual from inspected banner and event-destination evidence. Paid conversion proof is unnecessary for admission; the verified paid event supports a monetization interpretation without establishing expansion.",
      "No new Jev review was submitted for this event. The earlier needs_review reports concern the other three Cloudflare patterns; their uncertainty is not an event assessment. A previous refined submission was blocked by automatic approval review, and no retry or later model endorsement is claimed.",
      "Evidence, completed local checks and remaining source limits are recorded in docs/experiments/cf-event-promotion.md and docs/reviews/2026-10-05/cloudflare-event-review.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience:
        "Signed-in Cloudflare users exposed to a paid event promotion; event interest, ticket ownership and paid account relationship unknown",
      journey:
        "Notice Connect in the dashboard and follow the event proposition to evaluate attendance",
      mechanisms: [
        "Contextual event advertising",
        "Speaker credibility",
        "Dated event proposition",
        "External evaluation handoff",
      ],
      format: "Dashboard event promotion banner",
      measure:
        "Completed event ticket purchases attributed to the banner; event-page visits are a supporting diagnostic",
      basis:
        "The visible banner advertises an event, and the inspected destination confirms paid tickets. This supports monetization without requiring an observed conversion. An existing paid relationship and any expansion, attendance or causal lift are unestablished. Admission is manual under the user's explicit request, and proposed measures are untested.",
    },
  },
];
