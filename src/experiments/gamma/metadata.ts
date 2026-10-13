import type { Experiment } from "../registry";

const common = {
  sourceName: "Gamma",
  addedAt: "2026-10-10",
  updatedAt: "2026-10-10",
  status: "Ready for review" as const,
  sourceAccess: "Inspected" as const,
  neutralizedVisuals: [
    "Gamma branding, photographs, gradients and animated promotional art become shared Blueprint surfaces and plain placeholders. Personal workspace details and the referral code are omitted.",
    "The complete studied modal or popover is yellow, including its header, controls and footer. The two-part sidebar, composer and template row remain blue product context.",
  ],
};

const limits = [
  "The signed-in free account was inspected on 10 October 2026. Every original capture is an unchanged 1440 × 900 full viewport. Mobile behavior was not inspected; the narrow layout is a prototype adaptation.",
  "Source animation timing was not measured. Local transitions do not claim to reproduce measured motion.",
  "This local prototype does not generate content, spend credits, invite anyone, send a referral, change a subscription or contact sales. Private original captures remain local and unpublished.",
];

const review = [
  "Manual source-based admission is used. The optional automated curator request was blocked before any text was transmitted or a model assessment returned; no model endorsement is claimed.",
  "Reviewed locally on 10 October 2026 at actual 1440px and 320px viewport widths. Full-container color, entry layouts, connected actions and narrow reflow were inspected against the captured source; mobile behavior remains a prototype adaptation.",
  "Checked tour Next, Back, direct slide controls and completion; safe example copying and referral dismissal; credit-to-plan and credit-to-referral paths; annual/monthly and Individual/Business reversal; seat input; checkout/sales boundaries; and keyboard focus recovery. Shared reference switching, Restart and filter-preserving return were checked on the plan workspace.",
  "The final focused accessibility scans reported no violations after correcting labels and target sizes. Automated modal-focus and some contrast checks required manual inspection. The build passed with 56 semantic roles, 308 token contrast pairs and 1,748 modules; this is not a claim of complete accessibility conformance.",
];

export const gammaExperiments: Experiment[] = [
  {
    ...common,
    id: "gamma-feature-tour",
    title: "New-release announcement and tour",
    summary:
      "A release announcement introduces five new capabilities and ends with an invitation to start creating.",
    preview: "gamma-feature-tour",
    type: "Flow",
    focus: ["Feature discovery", "Release announcement", "Product tour"],
    source: "Gamma 5 announcement · private full-viewport references",
    intent:
      "Study how an announcement turns a product release into a short, optional tour of new capabilities.",
    observations: [
      "The Gamma 5 announcement appeared automatically on first reaching the home screen after account setup. See what’s new opens a five-slide tour inside the same large modal.",
      "The entry says Our biggest update ever, explains the update and reassures users that Gamma Classic remains available.",
      "The tour covers More visual variety, Our most powerful agent, Import that works, Connect your tools and And so much more. Illustrated examples sit above each headline and description.",
      "Next and Back advance and reverse the tour, with five progress dots and a Close control. Direct navigation by a dot was not established during inspection.",
      "The last slide’s Start creating action dismissed the tour. A separate welcome coach then appeared on the home screen; it was skipped without generating content. A source path for reopening the release announcement was not inspected.",
    ],
    preservedCopy: [
      "NEW",
      "GAMMA 5",
      "Our biggest update ever",
      "We rebuilt how Gamma thinks, designs, and edits. Your best ideas deserve better.",
      "See what’s new",
      "You can still use Gamma Classic.",
      "More visual variety",
      "Describe what you want, import examples, or attach inspiration from anywhere.",
      "Our most powerful agent",
      "Brainstorm, research, design, and edit with a single agent.",
      "Import that works",
      "Import PDF and PPT designs for ongoing use. Edit them yourself, or ask Gamma to redesign them.",
      "Connect your tools",
      "Pull live data, text, transcripts, files, and context from Slack, Notion, HubSpot, and more.",
      "And so much more",
      "Next",
      "Back",
      "Start creating",
    ],
    assumptions: [
      ...limits,
      "The release tour is classified provisionally as engagement and feature adoption. Its appearance in a new account does not demonstrate that it leads to meaningful first value.",
      "Library Restart is a review provision, not an observed Gamma reopening path. The separate welcome coach is context and is not indexed as another growth experiment.",
      "Clickable progress dots and Escape dismissal on the announcement entry are local accessibility provisions; those source behaviors were not verified. Slide changes are instant.",
      "Decorative examples retain comparable space but use abstract content. Their source animation is not recreated as an exact sequence.",
    ],
    reviewNotes: [
      ...review,
      "The release proposition, specific capabilities and Start creating action establish a visible feature-adoption intervention. Completing the tour is not evidence that a feature was used successfully.",
      "Evidence and prototype limits are recorded in docs/experiments/gamma-feature-tour.md.",
    ],
    growth: {
      primary: "engagement",
      secondary: [],
      audience:
        "Signed-in users shown the Gamma 5 release announcement; the inspected account is newly created and free",
      journey:
        "Notice the release, explore new capabilities and choose whether to start creating",
      mechanisms: [
        "Release announcement",
        "Concrete feature benefits",
        "Short guided sequence",
        "Clear next action",
      ],
      format: "Announcement modal followed by a five-slide feature tour",
      measure:
        "Meaningful use of the introduced features after the tour; tour completion is a supporting signal",
      basis:
        "The source promotes broader use through feature discovery. Engagement is a provisional interpretation of the release message, not a claim about account maturity, first value, retention or measured lift. No introduced feature was used during inspection.",
    },
  },
  {
    ...common,
    id: "gamma-credit-upsell",
    title: "Credit balance upgrade prompt",
    summary:
      "A credit balance pairs the free plan with an offer of more credits that refresh every month.",
    preview: "gamma-credit-upsell",
    type: "Flow",
    focus: ["Credit balance", "Contextual upgrade", "Paid credits"],
    source: "Gamma credit balance popover · private full-viewport references",
    intent:
      "Study the upgrade proposition shown beside the free account’s available AI credits.",
    observations: [
      "The top-right credit control displays 400. Opening it shows a compact popover anchored beneath the control, headed Free plan.",
      "The popover repeats 400 with Credit balance, explains that credits allow creation and editing with AI, and offers more credits that refresh monthly.",
      "A full-width Upgrade action opens the plan comparison. Refer a friend and Invite teammate sit in a separate footer row within the same popover.",
      "Refer a friend opens the observed credit-reward referral modal. Invite teammate was not opened.",
      "The account still had credits. No exhausted-balance state, blocked generation, credit deduction or credit renewal was observed.",
    ],
    preservedCopy: [
      "Free plan",
      "400",
      "Credit balance",
      "Credits let you create and edit with AI.",
      "Upgrade for more credits that refresh monthly.",
      "Upgrade",
      "Refer a friend",
      "Invite teammate",
      "Upgrade for more AI",
    ],
    assumptions: [
      ...limits,
      "This is an upgrade prompt beside an available balance, not an observed hard limit or an exhausted-credit paywall.",
      "The referral footer is a connected alternative, studied separately in Referral credit reward. The main classification here follows the paid upgrade offer.",
      "Invite teammate and paid checkout stop at local boundaries because their source destinations were not inspected.",
    ],
    reviewNotes: [
      ...review,
      "The explicit monthly-credit offer and Upgrade action qualify for monetization. A usage counter alone would remain ordinary product context.",
      "Evidence and prototype limits are recorded in docs/experiments/gamma-credit-upsell.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience: "A signed-in free Gamma account with 400 available credits",
      journey:
        "Check the credit balance, consider recurring credits and open the paid-plan comparison",
      mechanisms: [
        "Offer beside usage",
        "Recurring-credit benefit",
        "Direct path to paid plans",
      ],
      format: "Credit-balance popover connected to a plan comparison",
      measure:
        "First paid subscriptions from the credit prompt, alongside subsequent useful credit consumption",
      basis:
        "The visible upgrade proposition supports monetization of a free account. The source does not establish credit scarcity, an enforced limit, conversion, or measured improvement; these measures are proposed.",
    },
  },
  {
    ...common,
    id: "gamma-referral-credits",
    title: "Referral credit reward",
    summary:
      "A simple offer gives 200 credits to a friend and 200 credits to the person who refers them.",
    preview: "gamma-referral-credits",
    type: "Flow",
    focus: ["Referral incentive", "Two-sided credits", "Copyable invitation"],
    source: "Gamma Refer a friend · private full-viewport references",
    intent:
      "Study how an equal credit reward and one invitation link explain the referral offer.",
    observations: [
      "Refer a friend in the credit popover opens a compact centered modal over the dimmed home screen.",
      "The offer is Give 200 credits and earn 200 credits for each new referral who signs up for Gamma.",
      "A single-row invitation URL includes a Copy link button. The source’s copy action was visible but not selected.",
      "Close appears in the top-right corner and Done at the bottom-right. Done dismisses the modal to the home screen.",
      "No referral was sent and no signup, eligibility confirmation, reward receipt or referral history was observed.",
    ],
    preservedCopy: [
      "Refer a friend",
      "Give 200 credits and earn 200 credits for each new referral who signs up for Gamma.",
      "Copy link",
      "Done",
    ],
    assumptions: [
      ...limits,
      "The private referral code is replaced with an example URL. Local copy behavior must not transmit or expose the real referral code.",
      "The displayed offer establishes a signup condition; other eligibility rules, successful attribution and credit delivery remain unknown.",
      "No sharing channels, reward history or referral-success screen are invented beyond the observed modal.",
    ],
    reviewNotes: [
      ...review,
      "The explicit benefit for both people and the invitation-link action establish the referral mechanism without requiring a completed referral.",
      "Evidence and prototype limits are recorded in docs/experiments/gamma-referral-credits.md.",
    ],
    growth: {
      primary: "referral",
      secondary: [],
      audience:
        "Signed-in Gamma users invited to bring a new person to the product",
      journey:
        "Understand the shared credit reward and copy an invitation link",
      mechanisms: [
        "Two-sided incentive",
        "Equal reward",
        "Single sharing action",
        "Visible signup condition",
      ],
      format: "Compact referral-offer modal with a copyable link",
      measure:
        "Eligible referred signups that reach useful product activity; link copies are a supporting signal",
      basis:
        "The source explicitly offers 200 credits to each side for a new referral signup. This establishes referral intent, not successful attribution, credit receipt, activation or measured lift.",
    },
  },
  {
    ...common,
    id: "gamma-plan-comparison",
    title: "Paid plans and annual saving",
    summary:
      "Three individual plans compare credit allowances and paid features, with an annual saving and a separate business offer.",
    preview: "gamma-plan-comparison",
    type: "Flow",
    focus: [
      "Plan comparison",
      "Annual saving",
      "Recommended plan",
      "Business offer",
    ],
    source: "Gamma upgrade plans · private full-viewport references",
    intent:
      "Study paid-plan differences, the annual saving and the separate business comparison, stopping before purchase or sales contact.",
    observations: [
      "Upgrade opens a large scrollable overlay headed Choose the plan that’s right for you, with Individual and Business tabs and a Close control.",
      "Individual opens on annual billing with Save up to 26%. Plus shows ₹400 per seat per month and ₹4,800 billed annually; Pro shows ₹950 and ₹11,400; Ultra shows ₹7,833.25 and ₹93,999.",
      "Pay monthly changes Plus to ₹500, Pro to ₹1,300 and Ultra to ₹8,704 per seat per month. Pro is marked Most popular. Each plan lists credit allowances and differentiated capabilities beneath its upgrade action.",
      "Business shows ₹3,482 per seat per month and ₹41,784 per seat billed annually, with a Number of seats control. Changing one seat to two left the displayed per-seat price unchanged.",
      "Enterprise shows Custom with an annual agreement, Flexible team size and Contact sales. The Business tab has two cards rather than the Individual tab’s three.",
      "Switching from Business back to Individual retained monthly billing within the open overlay. Closing and reopening the overlay reset it to Individual with annual billing. No upgrade or Contact sales action was selected.",
    ],
    preservedCopy: [
      "Choose the plan that’s right for you",
      "Individual",
      "Business",
      "Save up to 26% with annual billing",
      "Pay monthly",
      "Pay annually",
      "Plus",
      "Pro",
      "Ultra",
      "Most popular",
      "For extra AI power and removing Gamma branding",
      "For premium AI models, API, and more customization",
      "For 20× more AI usage and unlocking access to the most advanced models",
      "₹400",
      "₹950",
      "₹7,833.25",
      "₹4,800",
      "₹11,400",
      "₹93,999",
      "₹500",
      "₹1,300",
      "₹8,704",
      "/ seat / month",
      "1,000 monthly credits",
      "4,000 monthly credits",
      "20,000 monthly credits",
      "Create up to 100 slides per prompt",
      "Remove Gamma branding",
      "Advanced AI image models",
      "Premium AI image models",
      "Custom branding",
      "Detailed analytics & advanced sharing",
      "Publish up to 10 custom domains",
      "API access",
      "Access to the most advanced AI models (text, image, video)",
      "Publish up to 100 custom domains",
      "Early access to new features",
      "Upgrade to Plus",
      "Upgrade to Pro",
      "Upgrade to Ultra",
      "For organizations ready to make it official with Gamma",
      "₹3,482",
      "₹41,784",
      "Number of seats",
      "Upgrade to Business",
      "Enterprise",
      "Custom",
      "Annual agreement, tailored to your rollout",
      "Flexible team size",
      "Contact sales",
      "Prices are subject to tax depending on your location.",
    ],
    assumptions: [
      ...limits,
      "INR prices are preserved as shown to this account on the inspection date; they are not a claim about current global pricing. Ultra’s annual amount is not rounded or recomputed.",
      "Changing the seat count does not invent a checkout total. The source kept the displayed amount per seat; taxes and final payable totals were not inspected.",
      "Upgrade and Contact sales lead only to local preview boundaries. No trial, purchase completion, billing form, sales conversation or paid account state was inspected.",
    ],
    reviewNotes: [
      ...review,
      "The free account sees explicit paid benefits, prices, upgrade actions and an annual incentive. These support monetization. The business offer does not establish expansion of an existing paid relationship.",
      "Evidence and prototype limits are recorded in docs/experiments/gamma-plan-comparison.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience:
        "A free Gamma account comparing its first paid individual or business subscription",
      journey:
        "Compare paid capabilities and credit allowances, choose a billing cadence or business offer, and consider upgrading",
      mechanisms: [
        "Tier differentiation",
        "Annual saving",
        "Recommended plan",
        "Visible billing totals",
        "Business segmentation",
      ],
      format:
        "Scrollable plan overlay with audience tabs, billing toggle and seat count",
      measure:
        "Completed first paid subscriptions by plan and billing cadence, with subsequent retained product use",
      basis:
        "The inspected free account is offered paid plans, so monetization is the primary interpretation. The recommendation label and annual saving are visible, while their effect on choice, conversion and retention is unmeasured. Checkout and sales destinations remain uninspected.",
    },
  },
];
