/**
 * Blueprint's working growth taxonomy, adapted from the supplied research note.
 * Classifications describe intended behavior, not demonstrated impact.
 * The source's unresolved citation markers are deliberately not reproduced.
 */
export type GrowthCategoryId =
  | "acquisition"
  | "activation"
  | "engagement"
  | "retention"
  | "reactivation"
  | "monetization"
  | "expansion"
  | "referral";

export type GrowthOutcomeId = "acquire" | "retain" | "monetize";

export type GrowthCategory = {
  id: GrowthCategoryId;
  name: string;
  shortName: string;
  outcome: GrowthOutcomeId;
  job: string;
  families: string[];
  measures: string[];
};

export type GrowthNutrition = {
  primary: GrowthCategoryId;
  secondary: GrowthCategoryId[];
  audience: string;
  journey: string;
  mechanisms: string[];
  format: string;
  measure: string;
  basis: string;
};

export const growthOutcomes: {
  id: GrowthOutcomeId;
  name: string;
  description: string;
}[] = [
  {
    id: "acquire",
    name: "Acquire users",
    description: "Bring additional people or accounts into the product.",
  },
  {
    id: "retain",
    name: "Retain users",
    description:
      "Help people experience value, continue receiving it, and return after lapsing.",
  },
  {
    id: "monetize",
    name: "Monetize value",
    description: "Generate revenue and grow the commercial relationship.",
  },
];

export const growthCategories: GrowthCategory[] = [
  {
    id: "acquisition",
    name: "Acquisition",
    shortName: "Acquisition",
    outcome: "acquire",
    job: "Help suitable prospects discover, understand, evaluate, and start using the offering.",
    families: [
      "Campaign-to-page continuity",
      "Value propositions",
      "Use-case pages",
      "Comparison pages",
      "Testimonials",
      "Interactive demos",
      "Lead capture",
      "Demo booking",
      "Signup",
      "App installation",
    ],
    measures: [
      "Qualified signup rate",
      "Qualified leads",
      "Acquisition cost",
      "Downstream activation",
    ],
  },
  {
    id: "activation",
    name: "Activation",
    shortName: "Activation",
    outcome: "retain",
    job: "Help a new user or account reach meaningful initial value.",
    families: [
      "Goal-based onboarding",
      "Setup wizards",
      "Data import",
      "Integrations",
      "Starter templates",
      "Useful empty states",
      "Guided first tasks",
      "Onboarding checklists",
      "Initial team setup",
    ],
    measures: ["Activation rate", "Time to value", "First successful outcome"],
  },
  {
    id: "engagement",
    name: "Engagement & adoption",
    shortName: "Engagement",
    outcome: "retain",
    job: "Help existing users receive more value through deeper, broader, or appropriately repeated use.",
    families: [
      "Feature discovery",
      "Contextual education",
      "Recommendations",
      "Next-best actions",
      "Progress feedback",
      "Recurring workflows",
      "Saved preferences",
      "Habit support",
      "Collaboration",
    ],
    measures: [
      "Adoption of valuable features",
      "Breadth/depth of use",
      "Core-action frequency",
    ],
  },
  {
    id: "retention",
    name: "Retention & churn prevention",
    shortName: "Retention",
    outcome: "retain",
    job: "Preserve an existing usage or customer relationship.",
    families: [
      "Renewal journeys",
      "Value summaries",
      "Loyalty benefits",
      "At-risk interventions",
      "Service recovery",
      "Pause/downgrade options",
      "Payment-detail updates",
      "Continuity across devices",
    ],
    measures: ["Cohort retention", "Renewal rate", "Churn", "Retained revenue"],
  },
  {
    id: "reactivation",
    name: "Reactivation & win-back",
    shortName: "Reactivation",
    outcome: "retain",
    job: "Restore a relationship after meaningful inactivity or departure.",
    families: [
      "Win-back messages",
      "Return incentives",
      "What’s changed experiences",
      "Resume-where-you-left-off",
      "Simplified re-onboarding",
      "Restoring previous work or preferences",
    ],
    measures: [
      "Reactivation rate",
      "Sustained usage after return",
      "Recovered customers",
    ],
  },
  {
    id: "monetization",
    name: "Monetization & purchase",
    shortName: "Monetization",
    outcome: "monetize",
    job: "Help users choose, understand, and complete a commercial exchange.",
    families: [
      "Pricing and packaging",
      "Plan comparisons",
      "Trials",
      "Paywalls",
      "Premium previews",
      "Checkout",
      "Payment methods",
      "Billing cadence",
      "Financing",
      "Advertising or transaction-fee experiences",
    ],
    measures: [
      "Paid conversion",
      "Completed purchases",
      "Net revenue",
      "Revenue per user",
    ],
  },
  {
    id: "expansion",
    name: "Expansion",
    shortName: "Expansion",
    outcome: "monetize",
    job: "Increase value and revenue within an existing commercial relationship.",
    families: [
      "Paid-plan upgrades",
      "Additional seats",
      "Usage-tier increases",
      "Add-ons",
      "Cross-sell",
      "Bundles",
      "Team-to-enterprise journeys",
      "Purchasing approvals",
    ],
    measures: [
      "Expansion revenue",
      "Paid seats",
      "Add-on adoption",
      "Account revenue",
    ],
  },
  {
    id: "referral",
    name: "Referral, advocacy & distribution",
    shortName: "Referral",
    outcome: "acquire",
    job: "Turn existing users, relationships, or product outputs into sources of new users.",
    families: [
      "Referral rewards",
      "Invitations",
      "Shareable outputs",
      "Public pages",
      "Embeds",
      "Attribution links",
      "Review requests",
      "Advocacy and community contributions",
    ],
    measures: [
      "Referred users who activate",
      "Invite acceptance",
      "Acquisition from shared outputs",
    ],
  },
];

export const growthCategoryById = Object.fromEntries(
  growthCategories.map((category) => [category.id, category]),
) as Record<GrowthCategoryId, GrowthCategory>;

export const growthClassificationLayers = [
  {
    name: "Growth objective",
    question: "What outcome are we trying to change?",
    examples: "Activation, retention, expansion",
  },
  {
    name: "Journey or task",
    question: "What is the person doing?",
    examples: "Setting up a workspace, choosing a plan, renewing",
  },
  {
    name: "Behavioral mechanism",
    question: "Why might the intervention change behavior?",
    examples:
      "Clarity, reduced effort, trust, relevance, motivation, timely prompting",
  },
  {
    name: "UI format or channel",
    question: "How is the intervention delivered?",
    examples: "Modal, banner, tooltip, inline card, email, push notification",
  },
];

export const growthBoundaries = [
  {
    name: "Activation / engagement",
    distinction:
      "Achieving initial value versus developing ongoing or additional value.",
  },
  {
    name: "Engagement / retention",
    distinction:
      "What people do and how much value they receive versus whether the relationship continues over time.",
  },
  {
    name: "Retention / reactivation",
    distinction:
      "Preserving a relationship versus restoring one after it has lapsed.",
  },
  {
    name: "Monetization / expansion",
    distinction:
      "Completing or improving a commercial exchange versus increasing an existing customer relationship’s commercial value.",
  },
];

export const growthClassificationExamples = [
  {
    name: "Pricing page",
    rule: "Monetization when helping people choose and buy; acquisition when primarily helping prospects evaluate and begin a trial.",
  },
  {
    name: "Trust badges or testimonials",
    rule: "Tag the mechanism as trust/social proof; assign the objective from the journey they support.",
  },
  {
    name: "Exit-intent modal",
    rule: "Acquisition for lead capture; monetization for checkout recovery; retention when addressing cancellation intent.",
  },
  {
    name: "Invite a teammate",
    rule: "Activation if collaboration is needed for first value; engagement if it improves ongoing work; expansion if it adds paid seats; referral if its purpose is new-user acquisition.",
  },
  {
    name: "Abandoned-cart email",
    rule: "Purchase recovery under monetization; it does not automatically mean the customer has lapsed.",
  },
  {
    name: "Failed-payment recovery",
    rule: "Retention when preserving an existing subscription; monetization when rescuing a first purchase.",
  },
  {
    name: "Public templates or shareable artifacts",
    rule: "Distribution when they attract new users; activation when they help those users start successfully.",
  },
  {
    name: "Search, filters, or recommendations",
    rule: "Classify by the targeted behavior: product discovery before purchase, deeper ongoing use, or first successful match.",
  },
  {
    name: "Accessibility, speed, or localization",
    rule: "Cross-cutting improvements; attach a growth category only when there is a specific growth hypothesis.",
  },
];
