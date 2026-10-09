import elevenPatterns from "../collections/elevenlabs/patterns.json";
import elevenEvidence from "../collections/elevenlabs/evidence.json";

export type ReferenceAsset = {
  id: string;
  kind: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  description: string;
  alt?: string;
  duration?: string;
  private?: boolean;
  width?: number;
  height?: number;
};

const tallyAssets: Record<string, ReferenceAsset> = {
  "tally-01-referral-invite": {
    id: "tally-01-referral-invite",
    kind: "image",
    src: "__private-references/tally/01-referral-invite.jpg",
    title: "Referral invitation — dashboard context",
    description:
      "Full viewport of the Invite tab over the dashboard, with the two-sided offer, invite-link panel and sharing actions.",
    alt: "Tally referral invitation offering friends 50% off and the referrer up to $150, within the full dashboard viewport.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-02-referral-how-it-works": {
    id: "tally-02-referral-how-it-works",
    kind: "image",
    src: "__private-references/tally/02-referral-how-it-works.jpg",
    title: "Referral invitation — how it works",
    description:
      "Full viewport of the widget explanation covering referral sharing, friend discount, reward claiming and transfer expectations.",
    alt: "Tally referral widget explanation in its full dashboard context.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-03-referral-rewards": {
    id: "tally-03-referral-rewards",
    kind: "image",
    src: "__private-references/tally/03-referral-rewards.jpg",
    title: "Referral invitation — rewards state",
    description:
      "Full viewport of the observed empty Rewards tab, zero claimable balance and zero link views. Payment details were not opened.",
    alt: "Tally Rewards tab showing zero claimable rewards and the No rewards yet state.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-04-plans-monthly": {
    id: "tally-04-plans-monthly",
    kind: "image",
    src: "__private-references/tally/04-plans-monthly.jpg",
    title: "Paid plans — monthly billing",
    description:
      "Full viewport of the initial monthly comparison: Pro at $29 per month and Business at $89 per month, with benefits and upgrade actions.",
    alt: "Tally monthly Pro and Business offers with the billing switch, benefits and upgrade actions.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-05-plans-yearly": {
    id: "tally-05-plans-yearly",
    kind: "image",
    src: "__private-references/tally/05-plans-yearly.jpg",
    title: "Paid plans — yearly billing",
    description:
      "Full viewport after selecting yearly billing, preserving displayed rounded monthly prices and yearly totals unchanged.",
    alt: "Tally yearly plan comparison showing $24 and $74 per month, billed $290 and $890 every year.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-06-domains-empty": {
    id: "tally-06-domains-empty",
    kind: "image",
    src: "__private-references/tally/06-domains-empty.jpg",
    title: "Custom domains — premium proposition",
    description:
      "Full viewport of Domains, retaining the sidebar, header, Pro-marked benefit and Add domain action.",
    alt: "Tally Domains empty state with a Pro marker, branded-link benefit and Add domain action.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-07-domains-plan-gate": {
    id: "tally-07-domains-plan-gate",
    kind: "image",
    src: "__private-references/tally/07-domains-plan-gate.jpg",
    title: "Custom domains — paid-plan boundary",
    description:
      "Full viewport of the monthly plan overlay opened from Add domain. Back restores Domains; no purchase was attempted.",
    alt: "Tally paid-plan comparison reached from the custom-domain Add domain action.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "tally-08-community-promotions": {
    id: "tally-08-community-promotions",
    kind: "image",
    src: "__private-references/tally/08-community-promotions.jpg",
    title: "What’s new — review and office-hours invitations",
    description:
      "Full viewport of the undimmed right drawer. The same card contains distinct review and office-hours invitations above the search/dashboard announcement.",
    alt: "Tally What’s new drawer with a customer-review request, free founder office-hours invitation and release-note context.",
    private: true,
    width: 1271,
    height: 1108,
  },
};

const cloudflareAssets: Record<string, ReferenceAsset> = {
  "cf-10-event-home-entry": {
    id: "cf-10-event-home-entry",
    kind: "image",
    src: "__private-references/cloudflare/10-event-home-entry.jpg",
    title: "Connect event — home context",
    description:
      "Full viewport at the home entry. The compact event banner begins near the lower edge; the next capture preserves its complete context.",
    alt: "Cloudflare home with the Connect event banner below dashboard shortcuts.",
    private: true,
    width: 1280,
    height: 720,
  },
  "cf-11-event-home-banner": {
    id: "cf-11-event-home-banner",
    kind: "image",
    src: "__private-references/cloudflare/11-event-home-banner.jpg",
    title: "Connect event — banner and analytics",
    description:
      "Full viewport at scroll position 396px, showing the entire promotion, speaker cues and Learn more action above analytics.",
    alt: "Cloudflare Connect event banner in its dashboard context above analytics.",
    private: true,
    width: 1280,
    height: 720,
  },
  "cf-12-event-destination": {
    id: "cf-12-event-destination",
    kind: "image",
    src: "__private-references/cloudflare/12-event-destination.jpg",
    title: "Connect event — public destination",
    description:
      "Observed public event landing page reached by Learn more in a new tab. Registration was not started.",
    alt: "Cloudflare Connect 2026 public event landing page with dates and Register Now.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-13-event-tickets": {
    id: "cf-13-event-tickets",
    kind: "image",
    src: "__private-references/cloudflare/13-event-tickets.jpg",
    title: "Connect event — paid ticket evidence",
    description:
      "Observed ticket section on the public destination, showing the $595 Conference Pass and optional offers. No purchase was attempted.",
    alt: "Cloudflare Connect event ticket options including a $595 Conference Pass.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-01-account-home": {
    id: "cf-01-account-home",
    kind: "image",
    src: "__private-references/cloudflare/01-account-home.jpg",
    title: "Build with an agent — account home",
    description:
      "Original authenticated full-viewport capture from 5 October 2026. The account home supplies the context for the agent onboarding prompt.",
    alt: "Cloudflare account home with the agent onboarding prompt and surrounding product navigation.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-02-agent-prompt-copied": {
    id: "cf-02-agent-prompt-copied",
    kind: "image",
    src: "__private-references/cloudflare/02-agent-prompt-copied.jpg",
    title: "Build with an agent — prompt copied",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 showing the observed copied-prompt state.",
    alt: "Cloudflare agent onboarding prompt in its copied state, with full account-home context.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-03-workers-plans": {
    id: "cf-03-workers-plans",
    kind: "image",
    src: "__private-references/cloudflare/03-workers-plans.jpg",
    title: "Workers — plan comparison",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 showing the Workers plan comparison.",
    alt: "Cloudflare Workers plan comparison with free and paid options and surrounding dashboard context.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-04-workers-checkout-boundary": {
    id: "cf-04-workers-checkout-boundary",
    kind: "image",
    src: "__private-references/cloudflare/04-workers-checkout-boundary.jpg",
    title: "Workers — checkout boundary",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 at the Workers upgrade checkout entry. Inspection stopped before purchase or account changes.",
    alt: "Workers upgrade checkout entry, preserved as the observed boundary of the plan-comparison flow.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-05-workers-usage": {
    id: "cf-05-workers-usage",
    kind: "image",
    src: "__private-references/cloudflare/05-workers-usage.jpg",
    title: "Workers — usage context",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 showing Workers usage context associated with the plan comparison.",
    alt: "Cloudflare Workers usage screen with surrounding account navigation.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-06-containers-gate": {
    id: "cf-06-containers-gate",
    kind: "image",
    src: "__private-references/cloudflare/06-containers-gate.jpg",
    title: "Containers — paid-plan gate",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 showing the Containers paid-plan gate.",
    alt: "Cloudflare Containers entry showing the paid-plan requirement and upgrade action within the dashboard.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-07-containers-checkout-boundary": {
    id: "cf-07-containers-checkout-boundary",
    kind: "image",
    src: "__private-references/cloudflare/07-containers-checkout-boundary.jpg",
    title: "Containers — checkout boundary",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 at the checkout entry reached from Containers. This is a separate observed entry from the Workers plan flow; no purchase or account change was completed.",
    alt: "Checkout entry reached through the Containers upgrade action, preserved as the observed flow boundary.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-08-workers-comparison-scroll": {
    id: "cf-08-workers-comparison-scroll",
    kind: "image",
    src: "__private-references/cloudflare/08-workers-comparison-scroll.jpg",
    title: "Workers — compute comparison",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 showing the compute comparison rows around scroll position 1045px.",
    alt: "Cloudflare Workers plan comparison scrolled to the compute feature rows, with surrounding dashboard context.",
    private: true,
    width: 1271,
    height: 1108,
  },
  "cf-09-workers-highlights": {
    id: "cf-09-workers-highlights",
    kind: "image",
    src: "__private-references/cloudflare/09-workers-highlights.jpg",
    title: "Workers — plan highlights",
    description:
      "Original authenticated full-viewport capture from 5 October 2026 showing complete Free, Paid, and Enterprise highlights around scroll position 616px.",
    alt: "Cloudflare Workers comparison showing the complete Free, Paid, and Enterprise plan highlights.",
    private: true,
    width: 1271,
    height: 1108,
  },
};

/** User-supplied originals. Posters are previews; source files retain their original bytes. */
export const experimentReferences: Record<string, ReferenceAsset[]> = {
  "tally-referral-reward": [
    tallyAssets["tally-01-referral-invite"],
    tallyAssets["tally-02-referral-how-it-works"],
    tallyAssets["tally-03-referral-rewards"],
  ],
  "tally-plan-comparison": [
    tallyAssets["tally-04-plans-monthly"],
    tallyAssets["tally-05-plans-yearly"],
  ],
  "tally-custom-domain-gate": [
    tallyAssets["tally-06-domains-empty"],
    tallyAssets["tally-07-domains-plan-gate"],
    tallyAssets["tally-04-plans-monthly"],
    tallyAssets["tally-05-plans-yearly"],
  ],
  "tally-office-hours": [tallyAssets["tally-08-community-promotions"]],
  "tally-review-request": [tallyAssets["tally-08-community-promotions"]],
  "cf-event-promotion": [
    cloudflareAssets["cf-10-event-home-entry"],
    cloudflareAssets["cf-11-event-home-banner"],
    cloudflareAssets["cf-12-event-destination"],
    cloudflareAssets["cf-13-event-tickets"],
    cloudflareAssets["cf-01-account-home"],
  ],
  "cf-agent-onboarding": [
    cloudflareAssets["cf-01-account-home"],
    cloudflareAssets["cf-02-agent-prompt-copied"],
  ],
  "cf-workers-plans": [
    cloudflareAssets["cf-03-workers-plans"],
    cloudflareAssets["cf-04-workers-checkout-boundary"],
    cloudflareAssets["cf-05-workers-usage"],
    cloudflareAssets["cf-08-workers-comparison-scroll"],
    cloudflareAssets["cf-09-workers-highlights"],
  ],
  "cf-containers-gate": [
    cloudflareAssets["cf-06-containers-gate"],
    cloudflareAssets["cf-07-containers-checkout-boundary"],
  ],
  ...Object.fromEntries(
    elevenPatterns.map((pattern) => [
      pattern.id,
      pattern.evidenceIds.map((id) => {
        const asset = elevenEvidence.find((entry) => entry.id === id);
        if (!asset) throw new Error(`Missing original reference: ${id}`);
        return { ...asset, kind: "image" as const };
      }),
    ]),
  ),
  "github-event-banner": [
    {
      id: "github-event-screenshot",
      kind: "image",
      src: "references/github-event-banner/original.png",
      title: "GitHub event promotion",
      description:
        "Original screenshot of the GitHub dashboard. The Universe ’26 promotion at the top of the right rail is the focus of this experiment; surrounding dashboard content is abstracted in the wireframe.",
      alt: "GitHub dashboard with a Universe ’26 event card in the right rail: October 28–29 in San Francisco, a $600 early-bird saving through July 8, a Register now button, and a close control.",
    },
  ],
  "steam-growth-banners": [
    {
      id: "steam-banners-recording",
      kind: "video",
      src: "references/steam-growth-banners/original.mp4",
      poster: "references/steam-growth-banners/poster.jpg",
      title: "Steam store banners",
      description:
        "Original silent recording of the sticker reward strip and angled discovery queue marquee. The later queue flow was based on separate screenshots that are not available here.",
      duration: "0:11",
    },
  ],
  "notion-feature-modal": [
    {
      id: "notion-feature-recording",
      kind: "video",
      src: "references/notion-feature-modal/original.mp4",
      poster: "references/notion-feature-modal/poster.jpg",
      title: "Notion feature announcement",
      description:
        "Original silent recording showing HTML blocks, Skills, and MCP. The modal stays in place while the selected feature and preview change.",
      duration: "0:07",
    },
  ],
};

export const referenceAssetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path}`;
