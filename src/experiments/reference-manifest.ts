export type ReferenceAsset = {
  id: string;
  kind: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  description: string;
  alt?: string;
  duration?: string;
};

/** User-supplied source recordings. Posters are previews; videos retain the original bytes. */
export const experimentReferences: Record<string, ReferenceAsset[]> = {
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
