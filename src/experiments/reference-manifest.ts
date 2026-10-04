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

/** User-supplied originals. Posters are previews; source files retain their original bytes. */
export const experimentReferences: Record<string, ReferenceAsset[]> = {
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
