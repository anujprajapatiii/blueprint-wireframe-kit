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
