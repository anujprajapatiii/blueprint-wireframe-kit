import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Download,
  FileText,
  Folder,
  Network,
  Settings2,
  Sparkles,
} from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/kit";
import "./notion-feature-modal.css";
import { growthTarget } from "../components/growth-education";

const features = [
  {
    id: "html",
    title: "HTML blocks",
    description:
      "bring interactive visuals to any page and we can’t stop playing with them!",
    icon: Blocks,
  },
  {
    id: "skills",
    title: "Skills",
    description:
      "are reusable instructions for all your agents — no more writing the same prompt twice",
    icon: Sparkles,
  },
  {
    id: "mcp",
    title: "MCP",
    description: "gives your tools the context they need to complete tasks",
    icon: Network,
  },
] as const;
type Feature = (typeof features)[number]["id"];

function HtmlPreview() {
  return (
    <div className="notion-html-preview" aria-hidden="true">
      <div className="notion-demo-sheet notion-sheet-back">
        <span className="notion-demo-label">Interactive block</span>
        <div className="notion-block-grid">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div className="notion-demo-sheet notion-sheet-middle">
        <span className="notion-demo-label">Workspace</span>
        <FileText size={24} />
        <div className="notion-placeholder-line" />
        <div className="notion-placeholder-line" />
      </div>
      <div className="notion-demo-sheet notion-sheet-front">
        <span className="notion-demo-label">ROI Notes</span>
        <div className="mt-8 flex gap-5">
          <div className="flex-1 space-y-4">
            <div className="notion-placeholder-line" />
            <div className="h-8 rounded-sm border border-input" />
            <div className="notion-placeholder-line" />
            <div className="h-8 rounded-sm border border-input" />
          </div>
          <div className="flex-1">
            <span className="text-xs text-muted-foreground">Total ROI</span>
            <div className="my-4 h-4 w-3/4 bg-border" />
            <div className="notion-preview-bars">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function SkillsPreview() {
  return (
    <div className="notion-skills-preview" aria-hidden="true">
      <div className="notion-skills-sheet">
        <div className="mb-6 flex items-center gap-2 text-xl font-semibold">
          <Sparkles size={22} />
          Skills
          <span className="ml-auto h-4 w-7 rounded-full border border-input bg-secondary" />
        </div>
        {[
          "Investigate issue",
          "GTM Planning Skill",
          "Triage emails",
          "Review RFC Skill",
        ].map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 py-2 text-xs text-muted-foreground"
          >
            <FileText size={14} />
            {label}
          </div>
        ))}
        <div className="notion-placeholder-line mt-4" />
      </div>
      <div className="notion-download-sheet">
        <div className="mb-3 flex items-center gap-2 border-b pb-3 text-xs font-medium">
          <Download size={14} />
          Download for local agents
        </div>
        {["Claude code", "Codex", "Cursor", "Gemini", "Grok Build"].map(
          (label) => (
            <div
              key={label}
              className="flex items-center gap-2 py-1.5 text-xs text-muted-foreground"
            >
              <span className="size-3 rounded-sm border border-input" />
              {label}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
function McpPreview() {
  return (
    <div className="notion-mcp-preview" aria-hidden="true">
      <div className="notion-mcp-dock">
        {[Folder, FileText, Code2, Settings2].map((Icon, i) => (
          <div className="notion-app-placeholder" key={i}>
            <Icon strokeWidth={1.25} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1 w-8 bg-border" />
        ))}
      </div>
    </div>
  );
}

export function NotionFeatureModal({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [feature, setFeature] = useState<Feature>("html");
  const [destination, setDestination] = useState(false);
  const [saved, setSaved] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const destinationTitle = useRef<HTMLHeadingElement>(null);
  const current = features.find((item) => item.id === feature)!;
  function reopen() {
    setDestination(false);
    setOpen(true);
  }

  return (
    <main
      id="main-content"
      className={
        embedded
          ? "notion-embedded"
          : "mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-10"
      }
    >
      {embedded && <h1 className="sr-only">Feature announcement wireframe</h1>}
      {!embedded && (
        <a
          href="?view=experiments"
          className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All experiments
        </a>
      )}
      <div className="flex flex-wrap items-start justify-between gap-5">
        {!embedded && (
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Notion feature modal
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A feature announcement with expandable copy and a changing
              preview.
            </p>
          </div>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={reopen}>
              Open modal
            </Button>
          </DialogTrigger>
          <DialogContent
            className="growth-scope notion-feature-dialog"
            {...(!destination
              ? growthTarget({
                  id: "notion-feature-discovery",
                  title: "Make new value discoverable",
                  description:
                    "The announcement brings new capabilities into an existing user's workflow. Choosing a feature reveals its benefit and changes the blue product preview, so people can understand the value before trying it. The yellow announcement is the growth component; the preview is supporting context.",
                  order: 1,
                })
              : {})}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              title.current?.focus();
            }}
          >
            <header className="notion-feature-header flex items-center gap-3">
              <DialogTitle
                ref={title}
                tabIndex={-1}
                className="text-2xl font-semibold sm:text-3xl"
              >
                We’ve been cooking!
              </DialogTitle>

              <DialogDescription className="sr-only">
                Explore newly available features. Choose a feature to read about
                it and change the preview. Routines is coming soon.
              </DialogDescription>
            </header>
            {destination ? (
              <section
                className="notion-try-view"
                {...growthTarget({
                  id: "notion-feature-handoff",
                  title: "Feature trial handoff",
                  description:
                    "Try for free turns interest in the selected capability into an action. The original recording ends before this destination, so this local placeholder marks the boundary of what is known rather than inventing an activation flow.",
                  order: 3,
                })}
              >
                <Button
                  variant="ghost"
                  className="mb-6"
                  onClick={() => {
                    setDestination(false);
                    requestAnimationFrame(() => title.current?.focus());
                  }}
                >
                  <ArrowLeft aria-hidden="true" />
                  Back to features
                </Button>
                <div className="flex items-center gap-3">
                  <h2
                    ref={destinationTitle}
                    tabIndex={-1}
                    className="text-2xl font-semibold"
                  >
                    Try {current.title}
                  </h2>
                </div>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                  This is a local destination placeholder. The recording does
                  not show what happens after “Try for free”.
                </p>
                <div className="mt-7 rounded-md border border-dashed border-input bg-surface-sunken p-8">
                  <current.icon className="mb-4 size-8" aria-hidden="true" />
                  <p>
                    <strong>{current.title}</strong> {current.description}
                  </p>
                </div>
              </section>
            ) : (
              <Tabs
                value={feature}
                onValueChange={(value) => setFeature(value as Feature)}
                orientation="vertical"
                className="notion-feature-layout"
              >
                <TabsList
                  aria-label="New features"
                  className="notion-feature-list"
                >
                  {features.map((item) => (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      className="notion-feature-option"
                      aria-label={item.title}
                      aria-describedby={
                        feature === item.id
                          ? `notion-feature-${item.id}-description`
                          : undefined
                      }
                    >
                      <item.icon
                        className="notion-feature-icon"
                        size={18}
                        aria-hidden="true"
                      />
                      <span className="notion-feature-copy">
                        <span
                          className={
                            feature === item.id
                              ? "font-semibold"
                              : "font-normal"
                          }
                        >
                          {item.title}
                        </span>
                        {feature === item.id && (
                          <span
                            id={`notion-feature-${item.id}-description`}
                            className="font-normal"
                          >
                            {" "}
                            {item.description}
                          </span>
                        )}
                      </span>
                      <ChevronRight
                        size={16}
                        className="notion-feature-chevron"
                        aria-hidden="true"
                      />
                    </TabsTrigger>
                  ))}
                  <TabsTrigger
                    value="routines"
                    disabled
                    className="notion-feature-option"
                    aria-label="Routines — Coming soon"
                    aria-controls={undefined}
                  >
                    <Clock3
                      size={18}
                      className="notion-feature-icon"
                      aria-hidden="true"
                    />
                    <span className="notion-feature-copy">
                      Routines{" "}
                      <span className="notion-coming-soon">Coming soon</span>
                    </span>
                    <ChevronRight
                      size={16}
                      className="notion-feature-chevron"
                      aria-hidden="true"
                    />
                  </TabsTrigger>
                </TabsList>
                <div className="growth-context notion-feature-previews text-foreground">
                  {features.map((item) => (
                    <TabsContent
                      forceMount
                      key={item.id}
                      value={item.id}
                      tabIndex={-1}
                      aria-hidden={feature !== item.id}
                      inert={feature !== item.id}
                      className="notion-feature-preview"
                    >
                      <div
                        role="img"
                        aria-label={
                          item.id === "html"
                            ? "Wireframe preview of interactive HTML blocks in overlapping document windows"
                            : item.id === "skills"
                              ? "Wireframe preview of a reusable skills list and agent download menu"
                              : "Wireframe preview of connected tools in an application dock"
                        }
                      >
                        {item.id === "html" ? (
                          <HtmlPreview />
                        ) : item.id === "skills" ? (
                          <SkillsPreview />
                        ) : (
                          <McpPreview />
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </div>
                <div
                  className="notion-feature-actions"
                  {...growthTarget({
                    id: "notion-feature-actions",
                    title: "Act now, or keep it for later",
                    description:
                      "Try for free offers the next step for the selected feature. Save for later provides a lower-commitment exit for someone who is busy. The design intent is feature adoption; this wireframe does not establish whether the real product sends a reminder.",
                    order: 2,
                  })}
                >
                  <div className="flex items-center gap-2">
                    <Button
                      className="min-w-0 flex-1"
                      onClick={() => {
                        setDestination(true);
                        requestAnimationFrame(() =>
                          destinationTitle.current?.focus(),
                        );
                      }}
                    >
                      Try for free <ArrowRight aria-hidden="true" />
                    </Button>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setSaved(true);
                      setOpen(false);
                    }}
                  >
                    Save for later
                  </Button>
                </div>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <p
        role="status"
        className="mt-4 flex min-h-6 items-center gap-2 text-sm text-muted-foreground"
      >
        {saved && (
          <>
            <Check size={16} aria-hidden="true" />
            Saved for later in this preview. Reopen the modal whenever you’re
            ready.
          </>
        )}
      </p>
    </main>
  );
}
