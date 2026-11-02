/**
 * Reviewed public product facts for search, independent of short display copy.
 * Keep the action, beneficiary, trigger and offer clear. Never copy private
 * account context, raw research notes, source URLs or outcome claims here.
 */
export const searchDescriptions: Readonly<Record<string, string>> = {
  "linear-interactive-demo":
    "A public sample workspace lets prospective users try Linear before creating an account. A pinned welcome guide explains the basics, and visitors can open a sample issue and change its status. A persistent Sign up action leads to workspace signup choices after exploration. Demo changes stay local and reset on refresh.",
  "gamma-feature-tour":
    "An announcement modal introduces a new Gamma release to people inside the product. See what’s new opens a five-slide tour explaining new creation, editing, import and integration capabilities. Users can move forward or back, close the tour, or select Start creating at the end to return to the home screen.",
  "gamma-credit-upsell":
    "Opening the credit balance reveals a popover explaining that credits power AI creation and editing. The Free plan message offers more credits that refresh monthly, with an Upgrade action leading to paid plans. Refer a friend is a separate route to a credit reward. The upgrade appears while credits are still available.",
  "gamma-referral-credits":
    "A referral modal offers product credits to both people: a new friend receives 200 credits and the person inviting them earns 200 credits when that friend signs up for Gamma. The offer states the signup condition beside a copyable invitation link. Users can dismiss it with Done or Close.",
  "gamma-plan-comparison":
    "A plan comparison overlay helps users choose a paid Gamma subscription by comparing AI credit allowances and features. Individual plans have monthly and annual billing choices, visible annual totals, a yearly saving and a Most popular label on Pro. A separate Business tab presents seat-based pricing and an Enterprise contact-sales option.",
  "gamma-shared-folders":
    "A sidebar promotion encourages Gamma users to group related work in folders and share it together. A nearby explainer describes giving selected people access to every item in a folder, with team spaces and private work as examples. Create a folder leads to naming a private folder, followed by sharing and permission choices.",
  "tally-referral-reward":
    "A referral dialog invites Tally users to earn money by recommending the product. Friends receive 50% off a paid plan for three months, while referrers earn 20% of the subscription cost, up to $150 per referral. A link and sharing options support invitations; explanation and rewards tabs describe the offer and track rewards.",
  "tally-plan-comparison":
    "Choosing New workspace or Members leads free Tally users to a paid-plan comparison for team and creator features. Pro and Business show benefits, upgrade actions and billing totals. A monthly-to-yearly toggle advertises two months off. Collaboration, shared workspaces, branding removal and custom domains help explain what the paid subscription unlocks.",
  "tally-custom-domain-gate":
    "The Domains page explains how users can personalize form links with their own domain. A Pro badge marks the feature as paid, beside an Add domain action and a help link. Selecting Add domain opens the paid-plan comparison, connecting the branding benefit to an upgrade decision before domain setup.",
  "tally-office-hours":
    "A community card in Tally’s What’s new drawer invites existing users to free monthly office hours with the founders. The invitation offers a place to ask questions, share feedback and get help with forms. A Join our next office hours link takes people to an external event page.",
  "tally-review-request":
    "A message in Tally’s What’s new drawer asks people who enjoy the product to support its growth by leaving a quick public review. The appeal explains that the company is bootstrapped and grows through customer support. A linked review request takes users to G2 to consider writing their review.",
  "cf-agent-onboarding":
    "A compact promotion on the Cloudflare dashboard invites users to onboard an AI coding agent. It names compatible tools to explain who can use it. Selecting the invitation displays Setup prompt copied feedback while keeping the dashboard in place. A Don’t show this again option is also available.",
  "cf-workers-plans":
    "A Workers plan comparison places Free, Paid and Enterprise offers together, with differences in request allowances, compute time, support and included features. The Paid offer shows a monthly base price plus usage. Upgrade opens a billing and payment checkout, while Exit checkout returns to the Workers area without completing a purchase.",
  "cf-containers-gate":
    "At the Containers feature entry, an Enable Containers card explains that access requires the Workers Paid plan. Users can select Purchase Workers Paid to open checkout or follow View pricing for more information. The message ties a specific capability to a paid upgrade before users can start using Containers.",
  "cf-event-promotion":
    "A banner on the Cloudflare dashboard advertises the Connect community event to existing product users. Event dates, location, speaker cues and a learning-and-collaboration invitation support the offer. Learn more opens the event website, where paid tickets and registration are presented, carrying interest from the product into an external event purchase path.",
  "el-v4-discovery-to-trial":
    "A launch banner on Home, a feature card, and an inline speech-settings prompt introduce a new speech model to existing users. Each explains the advertised benefits and offers a way to try the model. The announcement links directly to speech creation with that model selected.",
  "el-adjacent-tool-discovery":
    "A dismissible promotion above the voice and model controls introduces image and video creation to people using speech tools. It connects images, video, and lip sync in one workflow, showing another use for the product while the user is working in a familiar tool.",
  "el-plan-value-ladder":
    "Subscription cards help existing paid customers compare larger plans by the extra features and capacity they unlock. A current-plan label, a Popular badge, and prominent Upgrade actions distinguish the choices. Creative and agent plans use relevant units, such as credits, call minutes, and seats, with a sales-contact route for larger needs.",
  "el-annual-cadence-framing":
    "A Monthly and Yearly switch lets customers compare billing commitments on the subscription page. Choosing Yearly shows a lower monthly-equivalent price beside the crossed-out monthly price, advertises two months saved, and states that payment is billed annually. The comparison makes the yearly offer and payment schedule visible together.",
  "el-annual-upgrade-intercept":
    "After a paid customer selects a monthly upgrade, a modal offers yearly billing before the upgrade continues. It presents two months free and a stated annual discount, with separate Continue yearly and Continue monthly actions. The customer can review the savings while keeping the original monthly route available.",
  "el-basic-seat-collaboration-bridge":
    "A persistent sidebar invitation card opens a dialog explaining how colleagues can join with Basic Seats. It says invitees can keep their existing workspace while collaborating and generating content, then provides email entry for invitations. A nearby link identifies Scale as the plan required for additional Full Seats.",
  "el-professional-clone-capability-gate":
    "The voice-creation chooser keeps Professional Voice Cloning visible to customers on lower paid plans, with a description of the method and its audio requirements. The disabled option carries a lock message naming Creator as the minimum plan and a Subscribe action, connecting the blocked feature to a specific upgrade.",
  "el-project-context-collaboration-invite":
    "A Studio project's sharing dialog places an Invite team members card below the user and group search. The invitation appears while someone is deciding who can access a draft, alongside viewer and commenter choices. It introduces team collaboration at a project handoff, with the work being shared as context.",
  "el-flows-first-visit-introduction":
    "Opening Flows presents an introduction modal with a connected-node example and a single Get started action. The explanation shows existing users how to link image, video, and audio generation on an infinite canvas and use multiple models together. It introduces the feature before the user enters the tool.",
  "el-image-video-example-to-action":
    "An introduction explains image and video tools, followed by an Explore gallery of example outputs and creation starters. Example actions include Edit, Recreate, Reference, Video, Open Studio, and Extend. Existing users can move from seeing an example to choosing how to use it as a starting point for their own work.",
  "el-dubbing-launch-sample-entry":
    "A launch modal introduces a new dubbing capability when an existing user opens Dubbing. It describes the advertised language, voice, and delivery benefits, then offers Play samples alongside Get started. The sample route lets people hear an example before choosing to enter the tool.",
  "el-voice-supplier-earnings-checklist":
    "The Voices Earnings page invites creators to publish a voice and earn money whenever a paid user uses it. A three-step checklist covers creating a Professional Voice Clone, setting up payouts, and publishing the voice. The required cloning capability is available on Creator or higher plans.",
  "el-demand-guided-voice-supply":
    "An Opportunities table within Voices Earnings helps voice contributors choose what to supply. It lists language, accent, and use-case categories alongside existing library counts and an Opportunity Score. The product presents these as high-demand, low-competition gaps, giving prospective contributors a direction for their next voice contribution.",
  "el-affiliate-advocacy-entry":
    "An affiliate dialog reached from the account menu offers users the opportunity to earn money by recommending ElevenLabs. It provides program information and a sign-up action, explains that PartnerStack manages the program, and gives established creators a separate contact route for partnership opportunities based on their audience reach.",
  "el-agents-template-assisted-onboarding":
    "People entering ElevenAgents see a template gallery organized by industry and use case, with task descriptions, integration counts, and workflow previews. An assistant offers help choosing a starting template, while a blank-agent option remains available. This is onboarding into an adjacent product for existing users, guiding them toward setting up their first agent.",
  "el-api-time-bounded-model-offer":
    "Model-pricing cards introduce new API models with advertised benefits, crossed-out unit prices, and discounted prices carrying an explicit end date. The dated offer gives developers a reason to try a model during the promotion. Nearby copy connects higher concurrency and additional capabilities to a paid Creative or Agents subscription.",
  "github-event-banner":
    "A dismissible right-side dashboard card promotes a paid developer event, with its date, location, an early-bird ticket discount and a deadline. A Register now button invites existing GitHub users to the event.",
  "notion-feature-modal":
    "A new-feature announcement modal introduces interactive HTML blocks, reusable agent instructions and connected tools. Selecting a feature updates its description and preview inside the same dialog. Try for free and Save for later offer immediate or deferred exploration, while an upcoming feature is marked Coming soon.",
  "steam-growth-banners":
    "A store banner offers free collectible stickers for going through a discovery queue of recommended games. The connected game carousel and reward summary make progress toward the sticker visible, giving players a reason to explore titles.",
};
