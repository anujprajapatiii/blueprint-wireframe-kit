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

export type GrowthIntent = {
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
    description: "Help new people and teams start using the product.",
  },
  {
    id: "retain",
    name: "Retain users",
    description:
      "Help people get value, keep using the product, and return after a break.",
  },
  {
    id: "monetize",
    name: "Monetize value",
    description: "Help people buy and help paying customers get more value.",
  },
];

export const growthCategories: GrowthCategory[] = [
  {
    id: "acquisition",
    name: "Acquisition",
    shortName: "Acquisition",
    outcome: "acquire",
    job: "Help people who could benefit from the product find it, compare it, and get started.",
    families: [
      "Ads and landing pages that match",
      "Clear product benefits",
      "Pages for specific needs",
      "Comparison pages",
      "Testimonials",
      "Interactive demos",
      "Contact forms for interested buyers",
      "Demo booking",
      "Signup",
      "App installation",
    ],
    measures: [
      "Signup rate among the intended audience",
      "Interested buyers who match the audience",
      "Acquisition cost",
      "New signups who reach a first useful result",
    ],
  },
  {
    id: "activation",
    name: "Activation",
    shortName: "Activation",
    outcome: "retain",
    job: "Help a new person or team reach their first useful result.",
    families: [
      "Setup tailored to a person’s goal",
      "Setup wizards",
      "Data import",
      "Integrations",
      "Starter templates",
      "Useful empty states",
      "Guided first tasks",
      "Onboarding checklists",
      "Initial team setup",
    ],
    measures: [
      "Share of new users who reach a first useful result",
      "Time to a first useful result",
      "First completed task",
    ],
  },
  {
    id: "engagement",
    name: "Engagement & adoption",
    shortName: "Engagement",
    outcome: "retain",
    job: "Help people get more value by using helpful features and returning when they need them.",
    families: [
      "Feature discovery",
      "Tips shown when needed",
      "Recommendations",
      "Suggested next steps",
      "Progress feedback",
      "Recurring workflows",
      "Saved preferences",
      "Habit support",
      "Collaboration",
    ],
    measures: [
      "Use of helpful features",
      "Features used and depth of use",
      "How often key tasks are completed",
    ],
  },
  {
    id: "retention",
    name: "Retention & churn prevention",
    shortName: "Retention",
    outcome: "retain",
    job: "Help people keep using or paying for the product.",
    families: [
      "Renewal reminders and steps",
      "Value summaries",
      "Loyalty benefits",
      "Help for people likely to leave",
      "Help after a problem",
      "Pause/downgrade options",
      "Payment updates",
      "Continue work across devices",
    ],
    measures: [
      "People from a signup group still active after a set time",
      "Renewal rate",
      "Customers who leave",
      "Retained revenue",
    ],
  },
  {
    id: "reactivation",
    name: "Reactivation & win-back",
    shortName: "Reactivation",
    outcome: "retain",
    job: "Help people return after they stopped using or paying for the product.",
    families: [
      "Messages inviting people back",
      "Offers for returning customers",
      "Updates on what has changed",
      "Resume earlier work",
      "Easy setup when returning",
      "Restoring previous work or preferences",
    ],
    measures: [
      "Share of inactive people who return",
      "Continued use after returning",
      "Customers who return",
    ],
  },
  {
    id: "monetization",
    name: "Monetization & purchase",
    shortName: "Monetization",
    outcome: "monetize",
    job: "Help people understand an offer, choose, and complete a purchase.",
    families: [
      "Prices and what each plan includes",
      "Plan comparisons",
      "Trials",
      "Paywalls",
      "Previews of paid features",
      "Checkout",
      "Payment methods",
      "Monthly or annual billing",
      "Financing",
      "Ads and transaction fees",
    ],
    measures: [
      "Share of people who become paying customers",
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
    job: "Help paying customers get more value by buying more seats, features, or products.",
    families: [
      "Paid-plan upgrades",
      "Additional seats",
      "Higher usage limits",
      "Add-ons",
      "Offers for related products",
      "Bundles",
      "Moving from team to enterprise plans",
      "Purchase approvals",
    ],
    measures: [
      "Additional revenue from existing customers",
      "Paid seats",
      "Use of purchased add-ons",
      "Account revenue",
    ],
  },
  {
    id: "referral",
    name: "Referral, advocacy & distribution",
    shortName: "Referral",
    outcome: "acquire",
    job: "Help existing users bring in new people through invites, reviews, and shared work.",
    families: [
      "Referral rewards",
      "Invitations",
      "Work people can share",
      "Public pages",
      "Embeds",
      "Product links in shared work",
      "Review requests",
      "Recommendations and community contributions",
    ],
    measures: [
      "Referred people who reach a first useful result",
      "Invite acceptance",
      "New users from shared work",
    ],
  },
];

export const growthCategoryById = Object.fromEntries(
  growthCategories.map((category) => [category.id, category]),
) as Record<GrowthCategoryId, GrowthCategory>;

export const growthClassificationLayers = [
  {
    name: "Goal",
    question: "What do you want to improve?",
    examples: "Activation, retention, expansion",
  },
  {
    name: "Task",
    question: "What is the person doing?",
    examples: "Setting up a workspace, choosing a plan, renewing",
  },
  {
    name: "Why it may help",
    question: "What could make the action easier or more appealing?",
    examples:
      "Clear benefits, less effort, trust, relevant offers, well-timed reminders",
  },
  {
    name: "Format",
    question: "Where does the person see it?",
    examples: "Modal, banner, tooltip, inline card, email, push notification",
  },
];

export const growthBoundaries = [
  {
    name: "Activation / engagement",
    distinction:
      "Activation helps people reach their first useful result. Engagement helps them keep finding value.",
  },
  {
    name: "Engagement / retention",
    distinction:
      "Engagement is about useful activity. Retention is about whether people keep using or paying over time.",
  },
  {
    name: "Retention / reactivation",
    distinction:
      "Retention helps current users stay. Reactivation helps people return after they leave.",
  },
  {
    name: "Monetization / expansion",
    distinction:
      "Monetization helps people buy. Expansion helps existing paying customers buy more.",
  },
];

export const growthClassificationExamples = [
  {
    name: "Pricing page",
    rule: "Monetization when it helps people choose and buy. Acquisition when it helps new visitors compare the product and start a trial.",
  },
  {
    name: "Trust badges or testimonials",
    rule: "Reviews and badges build trust. Choose the goal based on the action they support, such as signing up or buying.",
  },
  {
    name: "Modal shown before leaving",
    rule: "Acquisition when it collects contact details from interested buyers. Monetization when it helps finish a purchase. Retention when it helps someone reconsider cancelling.",
  },
  {
    name: "Invite a teammate",
    rule: "Activation when a teammate is needed to get started. Engagement when they improve ongoing work. Expansion when the invite adds a paid seat. Referral when its purpose is to bring in new users.",
  },
  {
    name: "Abandoned-cart email",
    rule: "Monetization: it helps finish a purchase. An unfinished purchase alone does not mean the customer has stopped using the product.",
  },
  {
    name: "Failed-payment recovery",
    rule: "Retention when it keeps an existing subscription active. Monetization when it helps finish a first purchase.",
  },
  {
    name: "Public templates or shared work",
    rule: "Referral when shared work attracts new people. Activation when a template helps someone get started.",
  },
  {
    name: "Search, filters, or recommendations",
    rule: "Choose the goal by what they help people do: find a product before buying, use more helpful features, or reach a first useful result.",
  },
  {
    name: "Accessibility, speed, or localization",
    rule: "These can help throughout a product. Add a growth goal only when you can name the action the change is intended to support.",
  },
];
