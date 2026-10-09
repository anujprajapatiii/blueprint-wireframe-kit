import type { Experiment } from "../registry";

const common = {
  sourceName: "Tally",
  addedAt: "2026-10-07",
  updatedAt: "2026-10-07",
  status: "Ready for review" as const,
  sourceAccess: "Inspected" as const,
  neutralizedVisuals: [
    "Tally branding, illustrations and decorative color become shared blueprint surfaces. The account name, avatar and personal referral link become neutral placeholders.",
    "The sidebar, main content, overlay and drawer retain their observed relationships. Each complete offer container is yellow across its connected states; the surrounding product environment remains blue.",
  ],
};
const localLimits = [
  "The desktop source was inspected at 1271 × 1108. The 320px reflow is a local adaptation, not observed mobile behavior.",
  "Source motion timing was not measured. Local transitions do not claim to reproduce a measured animation.",
  "No form, invitation, purchase, domain connection, reward claim, event registration or posted review is performed by this prototype.",
];
const localReview = [
  "Whole-container color revision on 7 October 2026: referral states, the complete plan overlay and both community invitations now use whole yellow containers. Existing browser/build evidence predates this scope-only revision; a fresh visual check is pending.",
  "Before the whole-container color revision, reviewed locally on 7 October 2026: all five desktop entry layouts were compared with the source, and all five entry layouts were inspected at an actual 320px viewport and 320px page width. Source mobile behavior remains unobserved.",
];

export const tallyExperiments: Experiment[] = [
  {
    ...common,
    id: "tally-referral-reward",
    title: "Referral reward invitation",
    summary:
      "A two-sided offer gives friends a discount and rewards the person who refers them.",
    preview: "tally-referral-reward",
    type: "Flow",
    focus: ["Referral reward", "Friend discount", "Share invitation"],
    source: "Tally Rewards widget · private full-viewport references",
    intent:
      "Study the referral proposition, sharing choices, explanation and empty rewards state in their dashboard context.",
    observations: [
      "Rewards in the sidebar opens a centered modal with Invite and Rewards tabs, a How it works control and Close. It can be closed and reopened from the sidebar.",
      "The Invite tab offers friends 50% off for 3 months on any plan and the referrer 20% of the subscription cost, up to $150 per referral.",
      "A personal invite-link panel is followed by Copy invite link, X (Twitter), email, LinkedIn and QR-code actions. Sharing and copying were not performed during source inspection.",
      "How it works explains sharing, the discount and reward, choosing a reward option after the first earned reward, and subsequent automatic transfers.",
      "The Rewards tab shows Ready to claim: $0, zero link views, No rewards yet and Add payment details. Payment details and reward claiming were not opened.",
    ],
    preservedCopy: [
      "Give 50% off. Get up to $150.",
      "Invite your friends to Tally and give them 50% off for 3 months on any plan. You'll earn 20% of their subscription cost, up to $150 per referral.",
      "Invite",
      "Rewards",
      "How it works",
      "Invite link",
      "Copy invite link",
      "Ready to claim: $0",
      "Your link has been viewed 0 time(s)",
      "No rewards yet",
      "You will find your rewards here when someone uses your link to upgrade.",
      "Add payment details",
    ],
    assumptions: [
      ...localLimits,
      "The personal referral code is replaced by an example placeholder. Sharing, QR and payment destinations use local preview boundaries; no private link is copied or transmitted.",
      "The empty rewards state is observed; successful referral, attribution, payout eligibility and reward receipt are unknown.",
    ],
    reviewNotes: [
      ...localReview,
      "Jev report 6f35ae07-1074-40a1-a651-ed7d64a9daa0 returned needs_review: the referral goal and offer were established, while the invite-link and sharing controls had an unclear role. This remains model uncertainty, not model approval.",
      "Manual source-based admission: the two-sided discount/reward and directly connected invite action establish the referral mechanism. At Anuj’s request, the whole referral modal is yellow across Invite, How it works and Rewards, including its header, tabs and footer. The empty dashboard remains blue.",
      "Checked Invite/Rewards, How it works and Back, the copy boundary, Close and reopening. Rewards selection survives Original reference switching; outer Restart restores Invite. Guide text and Escape behavior were inspected; no real referral was sent.",
      "Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs.",
      "Evidence and implementation decisions are recorded in docs/experiments/tally-referral-reward.md.",
    ],
    growth: {
      primary: "referral",
      secondary: [],
      audience:
        "Signed-in Tally users invited to refer friends; the inspected account is free and has no rewards",
      journey:
        "Understand the two-sided offer and choose a way to share a referral invitation",
      mechanisms: [
        "Two-sided incentive",
        "Specific reward cap",
        "Multiple sharing options",
        "Reward transparency",
      ],
      format: "Tabbed referral modal with an explanation and reward status",
      measure:
        "Referred accounts that activate and become paying customers; sharing actions are supporting diagnostics",
      basis:
        "The explicit friend discount and referrer reward establish a referral intervention. The source shows an empty rewards state, not a completed referral, paid conversion, payout or measured lift. Proposed measures are untested.",
    },
  },
  {
    ...common,
    id: "tally-plan-comparison",
    title: "Paid plans and annual saving",
    summary:
      "Pro and Business offers pair concrete benefits with monthly or yearly billing and two months off.",
    preview: "tally-plan-comparison",
    type: "Flow",
    focus: ["Plan comparison", "Annual saving", "Paid upgrade"],
    source: "Tally Upgrade plan · private full-viewport references",
    intent:
      "Study the paid-plan comparison and observed billing toggle, stopping before the uninspected purchase destination.",
    observations: [
      "Upgrade plan opens a full-screen overlay headed Do more with Tally, with Back and Close above two unequal-width plan panels.",
      "Monthly is selected on entry: Pro shows $29 per month and Pay $29 Every Month; Business shows $89 per month and Pay $89 Every Month.",
      "Pay yearly changes the displayed monthly prices to $24 for Pro and $74 for Business, with Pay $290 Every Year and Pay $890 Every Year. The toggle is accompanied by 2 months off.",
      "Pro benefits use two columns, including branding removal, custom domains, collaboration and customization. Business lists Everything in Pro, data-retention controls, email verification and longer version history.",
      "Upgrade to Pro and Upgrade to Business were visible but not selected. Back returns to the underlying page; reopening starts on monthly billing. Members also leads to the same upgrade screen.",
    ],
    preservedCopy: [
      "Do more with Tally",
      "Upgrade to access advanced features designed for growing teams and creators.",
      "Pay monthly",
      "Pay yearly",
      "2 months off",
      "Pro",
      "Business",
      "Upgrade to Pro",
      "Upgrade to Business",
      "$29",
      "$89",
      "$24",
      "$74",
      "Pay $29 Every Month",
      "Pay $89 Every Month",
      "Pay $290 Every Year",
      "Pay $890 Every Year",
      "Remove Tally branding",
      "Custom domains",
      "Collaboration",
      "Partial submissions",
      "Advanced customization",
      "Custom CSS",
      "Email notifications",
      "Custom email domains",
      "Customize link preview",
      "Workspaces & folders",
      "Unlimited uploads",
      "Form visit analytics",
      "Drop-off analytics",
      "Version history",
      "Premium integrations",
      "Everything in Pro",
      "Control data retention",
      "Verify emails",
      "More to come",
      "Tally's plans are subject to our Fair Use Policy.",
    ],
    assumptions: [
      ...localLimits,
      "The displayed annual monthly amounts are the observed rounded source prices; they are not recalculated from the annual totals.",
      "Selecting an upgrade in the wireframe opens a local boundary. No checkout, trial, purchase success, billing details or payment state was inspected.",
    ],
    reviewNotes: [
      ...localReview,
      "Jev report 0e6eab99-49e6-40b0-a212-c2eb344fdb6a returned needs_review: plan framing was identified, but a primary goal, target action and yellow boundary did not pass the provisional gates. The original uncertainty is preserved.",
      "Manual source-based admission: the inspected free account sees explicit Pro/Business prices, benefit lists, upgrade actions and an annual saving. These establish a paid offer with monetization intent; no checkout or conversion outcome is inferred.",
      "Checked monthly/yearly reversal, the exact displayed annual prices and totals, upgrade boundaries, Back and monthly reset on reopening. Guide Next/Back/Escape were checked; after fresh navigation Escape returns focus to Guide me while preserving the plan overlay. At 320px, scrolling reaches the Business boundary.",
      "Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs.",
      "Evidence and implementation decisions are recorded in docs/experiments/tally-plan-comparison.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience: "A signed-in free Tally account evaluating its first paid plan",
      journey:
        "Compare paid capabilities, choose monthly or yearly billing, and consider an upgrade",
      mechanisms: [
        "Benefit comparison",
        "Annual saving",
        "Visible billing totals",
        "Tier differentiation",
      ],
      format: "Full-screen paid-plan comparison with billing-cadence control",
      measure:
        "Completed first paid subscriptions by plan and billing cadence, with subsequent retained value",
      basis:
        "A free account encounters explicit paid offers and an annual incentive, supporting monetization rather than expansion of an established paid relationship. Purchase destinations and results were not inspected. The proposed measure is untested.",
    },
  },
  {
    ...common,
    id: "tally-custom-domain-gate",
    title: "Custom-domain upgrade prompt",
    summary:
      "A branded-link benefit and Pro marker connect an empty domain list to the paid-plan comparison.",
    preview: "tally-custom-domain-gate",
    type: "Flow",
    focus: ["Premium capability gate", "Custom domains", "Contextual upgrade"],
    source:
      "Tally Domains and upgrade overlay · private full-viewport references",
    intent:
      "Study the visible custom-domain proposition and its observed route into the paid-plan comparison.",
    observations: [
      "Domains has the persistent sidebar and a header action. The centered empty state shows a globe, No custom domains yet, a Pro badge, a branded-link benefit and Add domain.",
      "The copy says Personalize the form links with your own domain, followed by Learn about custom domains.",
      "Selecting Add domain opens the same monthly paid-plan overlay. Back restores Domains. No domain is connected or entered.",
      "The help link points to https://tally.so/help/custom-domains; its destination was not opened during inspection.",
    ],
    preservedCopy: [
      "Domains",
      "No custom domains yet",
      "Pro",
      "Personalize the form links with your own domain.",
      "Learn about custom domains.",
      "Add domain",
    ],
    assumptions: [
      ...localLimits,
      "The complete custom-domain proposition is yellow, and its shared plan overlay is yellow as a whole. The page header and sidebar remain blue product context.",
      "The plan overlay reuses the independently indexed comparison; checkout and the custom-domain help destination remain uninspected boundaries.",
    ],
    reviewNotes: [
      ...localReview,
      "Jev report f9819d33-b18a-47c9-9de1-30132aaceaf1 returned include with monetization, a premium-capability gate and Add domain as the observed action. This advisory assessment does not verify source fidelity, usability or performance.",
      "Manual source-based admission agrees with the visible Pro marker, branded-link benefit and observed route into paid plans. The focal proposition and direct action are yellow, while the account environment stays blue.",
      "Checked Add domain into the paid-plan overlay and Back to Domains. Desktop and true 320px entry layouts and visible guide text were inspected. No domain connection or purchase occurred.",
      "Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs.",
      "Evidence and implementation decisions are recorded in docs/experiments/tally-custom-domain-gate.md.",
    ],
    growth: {
      primary: "monetization",
      secondary: [],
      audience:
        "A free Tally account considering branded form links through custom domains",
      journey:
        "Discover the custom-domain benefit, encounter its Pro requirement, and consider a paid plan",
      mechanisms: [
        "Contextual premium gate",
        "Visible paid-tier marker",
        "Concrete branding benefit",
      ],
      format:
        "Premium-feature empty-state proposition leading to a plan overlay",
      measure:
        "Paid subscriptions attributed to the domain prompt, followed by successful custom-domain use",
      basis:
        "The Pro marker, specific branded-link benefit and observed Add domain route into paid plans establish a premium intervention. Ordinary empty-state usability alone would not qualify. No subscription or domain setup outcome was observed; proposed measures are untested.",
    },
  },
  {
    ...common,
    id: "tally-office-hours",
    title: "Founder office-hours invitation",
    summary:
      "A free monthly session invites users to meet the founders, ask questions and get help with forms.",
    preview: "tally-office-hours",
    type: "Screen",
    focus: ["Community event", "Founder access", "Product help"],
    source: "Tally What's new drawer · private full-viewport reference",
    intent:
      "Study the office-hours invitation within the shared community card, preserving the separate review request as context.",
    observations: [
      "What's new opens an undimmed right drawer over Domains, with a fixed title and Close above scrolling contents.",
      "The top card contains two independent interventions. Its second paragraph promotes monthly office hours as a free, open session with Tally founders Marie and Filip.",
      "The invitation names asking questions, sharing feedback and getting help with forms. Join our next office hours points to https://luma.com/tallyforms.",
      "The first paragraph asks for a customer review. A dated dashboard/search announcement and screenshot sit below the card. Event registration was not inspected or performed.",
    ],
    preservedCopy: [
      "What's new",
      "We also host monthly office hours — a free, open session where you can ask Marie and Filip, the founders of Tally, anything directly. Come say hi, share feedback, or get help with your forms.",
      "Join our next office hours →",
      "September 11, 2026 —",
      "Faster search and a dashboard redesign",
      "Faster search",
    ],
    assumptions: [
      ...localLimits,
      "The entire shared community card is yellow, including both invitations. This experiment’s guide still focuses specifically on office hours; the drawer and release notes remain blue.",
      "The visible invitation supports an engagement interpretation. Attendance, registration, support outcomes and any effect on product use are unknown.",
      "The external action stops at a local preview boundary; the source's historical changelog is represented by the visible announcement context.",
    ],
    reviewNotes: [
      ...localReview,
      "Jev report daa1df56-b2e5-427d-be59-5a33a4437147 returned needs_review because the separate review request had an unclear component role. The office-hours invitation, engagement goal and event-page action were established.",
      "Manual source-based admission: the explicit free founder session and event link establish this invitation. At Anuj’s request, both paragraphs share one yellow card; the office-hours guide focus and the independent review-request classification remain separate.",
      "Checked the office-hours local external-destination boundary, drawer Close/reopening and visible guide text. The 320px drawer begins 95px from the top, clearing the 87px guide toolbar; its content remains readable.",
      "Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs.",
      "Evidence and implementation decisions are recorded in docs/experiments/tally-office-hours.md.",
    ],
    growth: {
      primary: "engagement",
      secondary: [],
      audience:
        "Existing Tally users encountering a free office-hours invitation in What's new",
      journey:
        "Notice an opportunity to ask founders questions and get help with ongoing form use",
      mechanisms: [
        "Direct founder access",
        "Free participation",
        "Specific support benefit",
        "Community invitation",
      ],
      format:
        "Office-hours paragraph and event link within a changelog drawer card",
      measure:
        "Attendees who resolve form-use questions and subsequently use relevant capabilities successfully",
      basis:
        "The explicit free event invitation qualifies through its offer and action. Help with forms supports a provisional engagement goal; the source does not establish initial-value onboarding, retention lift, event attendance or registration. Proposed measures are untested.",
    },
  },
  {
    ...common,
    id: "tally-review-request",
    title: "Customer review invitation",
    summary:
      "A bootstrapped-company appeal asks satisfied users to support Tally by leaving a quick review.",
    preview: "tally-review-request",
    type: "Screen",
    focus: ["Customer advocacy", "Review request", "Support appeal"],
    source: "Tally What's new drawer · private full-viewport reference",
    intent:
      "Study the customer-review request within the shared community card, preserving office hours as a separate contextual intervention.",
    observations: [
      "What's new opens an undimmed right drawer over Domains. Its top card contains a review request followed by a separate office-hours invitation.",
      "The first paragraph describes Tally as bootstrapped and growing through customer support, then asks people who love Tally to leave a quick review.",
      "The review link points to https://www.g2.com/products/tally-forms-tally/take_survey. The destination was not inspected and no review was posted.",
      "The office-hours paragraph and the dated search/dashboard announcement below remain visible in the same drawer.",
    ],
    preservedCopy: [
      "What's new",
      "Tally is a bootstrapped company and grows through the support of amazing customers like you. If you love using Tally, the best way to support us is by leaving a quick review ❤️",
      "September 11, 2026 —",
      "Faster search and a dashboard redesign",
      "Faster search",
    ],
    assumptions: [
      ...localLimits,
      "The entire shared community card is yellow, including office hours. This independently indexed study’s guide focuses on the review request; the drawer and release notes remain blue.",
      "The review action uses a local preview boundary. No external survey, review submission, reward for reviews or resulting acquisition outcome is fabricated.",
      "The two drawer experiments study independent actions and goals in one observed card; they are not presented as successive flow states.",
    ],
    reviewNotes: [
      ...localReview,
      "The live Jev request failed with HTTP 502 because returned probabilities did not sum to one. No assessment was saved; this entry has no valid model endorsement.",
      "Manual source-based admission: the observed bootstrapped-company appeal asks existing users to leave a public review. The linked review paragraph establishes customer advocacy under referral. At Anuj’s request, the whole community card is yellow, while the guide retains its distinct review focus.",
      "Checked the local review-destination boundary and visible guide text. The earlier desktop and true 320px review checked the shared drawer/card and its review guide. No review was posted.",
      "Before the whole-container color revision, npm run build passed: 1,742 modules, 56 semantic roles and 308 token contrast pairs.",
      "Evidence and implementation decisions are recorded in docs/experiments/tally-review-request.md.",
    ],
    growth: {
      primary: "referral",
      secondary: [],
      audience:
        "Existing Tally users who love using the product and may choose to advocate for it",
      journey:
        "Read the customer-support appeal and consider leaving a public review",
      mechanisms: [
        "Customer advocacy",
        "Bootstrapped-company appeal",
        "Small requested effort",
      ],
      format: "Linked review request within a changelog drawer card",
      measure:
        "Genuine customer reviews and qualified new users who later discover Tally through that advocacy",
      basis:
        "The request turns existing customer sentiment into public advocacy, which fits the shared referral, advocacy and distribution category. It is distinct from the same card's office-hours invitation. No review submission, referral attribution or measured acquisition effect was observed; proposed measures are untested.",
    },
  },
];
