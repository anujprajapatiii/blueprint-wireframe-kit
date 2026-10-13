import type { ReferenceAsset } from "../reference-manifest";

const captures = [
  [
    "01-home",
    "Home — folder promotion",
    "The whole home screen, including the sidebar folder offer and creator context.",
  ],
  [
    "11-invite-email-1440",
    "Invite teammates — email",
    "Email invitation form, preserved as blue product context. No invitation was sent.",
  ],
  [
    "12-invite-link-1440",
    "Invite teammates — link",
    "Link-based invitation option. The private link is preserved only in the protected original and never used by the prototype.",
  ],
  [
    "04-folder-promotion",
    "Folders with access — feature explanation",
    "The complete sidebar promotion and its contextual benefit popover.",
  ],
  [
    "10-create-folder-1440",
    "Create a private folder",
    "Name field, 250-character limit, privacy reassurance and creation controls.",
  ],
  [
    "13-private-folder-1440",
    "Private folder — empty state",
    "The empty private scratch folder after creation, with Share in the header.",
  ],
  [
    "14-folder-share-1440",
    "Share — member access",
    "Member search and the initial No access setting for workspace members.",
  ],
  [
    "15-folder-permissions-1440",
    "Share — permission choices",
    "The observed Full Access, Edit, Comment, View and No access options. No access setting was changed.",
  ],
];

export const gammaCollaborationReferences: Record<string, ReferenceAsset[]> = {
  "gamma-shared-folders": captures.map(([name, title, description]) => ({
    id: `gamma-growth-${name}`,
    kind: "image",
    src: `__private-references/gamma-growth-2026-10-13/${name}.jpg`,
    title,
    description,
    alt: `Gamma full browser viewport: ${title.toLowerCase()}.`,
    private: true,
    width: name.endsWith("-1440") ? 1440 : 1425,
    height: name.endsWith("-1440") ? 900 : 891,
  })),
};
