import type { ReferenceAsset } from "../reference-manifest";

/** Additional workspace-entry evidence; append to the existing plan references. */
export const tallyWorkspaceReferences: ReferenceAsset[] = [
  {
    id: "tally-workspace-upgrade-2026-10-13",
    kind: "image",
    src: "__private-references/tally-growth-2026-10-13/05-workspace-upgrade-1440.jpg",
    title: "New workspace — paid-plan gate",
    description:
      "Unchanged 1440 × 900 full viewport captured 13 October 2026. New workspace on the free account opened the monthly Pro and Business comparison. No purchase was attempted.",
    alt: "Tally monthly Pro and Business plans reached from New workspace, with Back, Close, billing choices and paid benefits.",
    private: true,
    width: 1440,
    height: 900,
  },
  {
    id: "tally-empty-home-2026-10-13",
    kind: "image",
    src: "__private-references/tally-growth-2026-10-13/04-home-1440.jpg",
    title: "New workspace — home context",
    description:
      "Unchanged 1440 × 900 full viewport captured 13 October 2026. The empty home shows New workspace beside New form; Back from the paid-plan gate restores this page.",
    alt: "Tally empty home with the sidebar, No forms yet message, New workspace and New form controls.",
    private: true,
    width: 1440,
    height: 900,
  },
];
