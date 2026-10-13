import type { ReferenceAsset } from "../reference-manifest";

const captures = [
  [
    "01-demo-entry.jpg",
    "Demo entry — Agent",
    "The public demo’s observed default Agent view, full sidebar and persistent Sign up action. No AI generation was started.",
  ],
  [
    "02-welcome-guide.jpg",
    "Pinned welcome guide",
    "The inspected welcome document introduces the demo workspace, its limits, work concepts and keyboard shortcuts.",
  ],
  [
    "03-sample-issues.jpg",
    "Ready-made sample issues",
    "The Engineering issue list contains three visible sample rows before any change, with ENG-411 in Todo.",
  ],
  [
    "04-sample-issue.jpg",
    "A useful task before signup",
    "ENG-411 opens with its description, activity and issue properties. Its status is Todo.",
  ],
  [
    "05-status-options.jpg",
    "Working status choices",
    "The open status control contains eight choices, from Backlog through Triage.",
  ],
  [
    "06-demo-result.jpg",
    "Immediate result — Done",
    "Choosing Done changes the visible sample issue status immediately, before any account is created.",
  ],
  [
    "07-signup-handoff.jpg",
    "Create your workspace",
    "Sign up opens three signup methods and Back to Linear. No authentication option was submitted.",
  ],
] as const;

export const linearReferences: Record<string, ReferenceAsset[]> = {
  "linear-interactive-demo": captures.map(([filename, title, description]) => ({
    id: `linear-${filename.replace(/\.jpg$/, "")}`,
    kind: "image",
    src: `__private-references/linear-growth-2026-10-13/${filename}`,
    title,
    description,
    alt: `Linear public demo, complete 1440 by 900 viewport: ${title}.`,
    private: true,
    width: 1440,
    height: 900,
  })),
};
