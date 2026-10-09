import { useRef, useState, type ReactNode } from "react";
import { relatedExperimentHref } from "./navigation";
import { growthTarget } from "../../components/growth-education";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BookOpen,
  Check,
  ChevronRight,
  Film,
  Image,
  Layers3,
  MessageSquare,
  Network,
  Play,
  Search,
  Sparkles,
  Upload,
  Users,
  Video,
  Volume2,
} from "lucide-react";
import {
  Badge,
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../../components/kit";

export const studioPatternIds = [
  "el-project-context-collaboration-invite",
  "el-flows-first-visit-introduction",
  "el-dubbing-launch-sample-entry",
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function Note({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-md border border-border bg-surface-sunken p-3 text-sm leading-6 text-muted-foreground"
    >
      {children}
    </p>
  );
}

function Media({
  label,
  kind = "video",
  className,
}: {
  label: string;
  kind?: "video" | "audio" | "image";
  className?: string;
}) {
  const Icon = kind === "audio" ? AudioLines : kind === "image" ? Image : Film;
  return (
    <div
      className={cn(
        "flex aspect-video min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface-sunken text-muted-foreground",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-7" />
      <span className="text-xs">{label}</span>
    </div>
  );
}

function AppContext({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section
      className="min-h-[660px] bg-background text-foreground"
      aria-label={title}
    >
      <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Layers3 aria-hidden="true" className="size-4" />
          {title}
        </p>
        {action}
      </div>
      {children}
    </section>
  );
}

const inspirations = [
  "Film trailer",
  "Explainer video",
  "Product video",
  "Audio documentary",
  "How to tutorial",
  "Audio podcast",
  "Captions",
];

function InspirationGallery() {
  const [project, setProject] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  if (project) return <StudioEditor onBack={() => setProject(false)} />;
  return (
    <AppContext title="Studio / Inspirations">
      <div className="grid min-h-[600px] md:grid-cols-[15%_1fr]">
        <aside
          className="hidden border-r border-border bg-surface-sunken px-3 py-6 md:block"
          aria-label="Studio context"
        >
          <div className="mb-7 h-4 w-20 rounded bg-secondary" />
          <p className="rounded-md bg-secondary px-3 py-2 text-sm font-medium">
            Studio
          </p>
          {["Flows", "Chat", "Assets"].map((x) => (
            <p key={x} className="px-3 py-2 text-sm text-muted-foreground">
              {x}
            </p>
          ))}
        </aside>
        <div className="mx-auto w-full max-w-[850px] px-4 py-10 sm:px-8 md:py-14">
          <h2 className="flex items-center gap-2 text-xl font-medium">
            Inspirations
          </h2>
          <div className="relative mb-5 mt-4">
            <Search
              className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              className="pl-9"
              aria-label="Search inspirations"
              placeholder="Search inspirations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div
            {...growthTarget({
              id: "studio-inspiration-gallery",
              title: "Choose something to make",
              description:
                "The gallery groups examples by what you want to make, helping you find a starting point that fits your project.",
              order: 1,
            })}
            className="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4"
          >
            {inspirations
              .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
              .map((name) => (
                <div key={name} className="relative min-w-0">
                  <button
                    {...(name === "Film trailer"
                      ? growthTarget({
                          id: "studio-sample-entry",
                          title: "Open a complete example",
                          description:
                            "Film trailer opens a project with media and a filled timeline, so you can explore an example before building your own.",
                          order: 2,
                        })
                      : {})}
                    type="button"
                    className={cn("w-full min-w-0 rounded-md text-left", focus)}
                    onClick={() =>
                      name === "Film trailer"
                        ? setProject(true)
                        : setNotice(
                            `The ${name.toLowerCase()} entry was visible. Only the Film trailer example was opened in the reference.`,
                          )
                    }
                  >
                    <Media
                      className="growth-scope"
                      label={
                        name === "Captions"
                          ? "Captioned media"
                          : name.includes("Audio")
                            ? "Audio example"
                            : "Video example"
                      }
                      kind={name.includes("Audio") ? "audio" : "video"}
                    />
                    <span className="mt-2 block text-sm">{name}</span>
                  </button>
                </div>
              ))}
          </div>
          {inspirations.every(
            (x) => !x.toLowerCase().includes(query.toLowerCase()),
          ) && (
            <p className="py-8 text-sm text-muted-foreground">
              No inspirations match.{" "}
              <button
                className={cn("underline", focus)}
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </p>
          )}
          {notice && (
            <div className="mt-5">
              <Note>{notice}</Note>
            </div>
          )}
        </div>
      </div>
    </AppContext>
  );
}

const assets = [
  { label: "Block 3 — Transformation", kind: "video" as const },
  { label: "Card B — Main Title", kind: "image" as const },
  { label: "Black Frame", kind: "image" as const },
  { label: "Musik — Unstruck v2", kind: "audio" as const },
  { label: "Narration", kind: "audio" as const },
  { label: "Block 2 — The Road", kind: "video" as const },
];
const prompts = [
  "What's in my library?",
  "Help me plan this project",
  "Suggest a visual style",
];

function StudioAgent() {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <aside
      className="flex h-full min-h-[500px] min-w-0 flex-col border-border bg-card text-card-foreground p-3 md:border-l"
      aria-label="Studio Agent"
    >
      <p className="border-b border-border pb-3 text-sm font-medium">Chat</p>
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <MessageSquare
          className="mb-4 size-7 text-muted-foreground"
          aria-hidden="true"
        />
        <h3 className="text-sm font-medium">Direct the Studio Agent</h3>
        <p className="my-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Describe what you want. The agent can look through your library and
          help you think through the project.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {prompts.map((x) => (
            <Button
              key={x}
              size="sm"
              variant="outline"
              className="h-auto min-h-9 whitespace-normal px-2 py-1 text-xs"
              onClick={() => {
                setPrompt(x);
                setSubmitted(false);
              }}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        {submitted && (
          <Note>
            Prompt prepared. Agent execution and its response were not observed;
            this prototype does not run a task or spend credits.
          </Note>
        )}
        <div className="rounded-md border border-input bg-surface-sunken p-2">
          <Label className="sr-only" htmlFor="studio-prompt">
            Describe what you want to create
          </Label>
          <Textarea
            id="studio-prompt"
            className="min-h-20 resize-none border-0 bg-transparent"
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setSubmitted(false);
            }}
          />
          <div className="flex items-center justify-between gap-2 pt-2">
            <span className="text-xs text-muted-foreground">
              Auto under 300 credits
            </span>
            <Button
              type="submit"
              size="icon"
              className="size-8"
              disabled={!prompt.trim()}
              aria-label="Prepare agent prompt"
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </form>
    </aside>
  );
}

function StudioEditor({
  onBack,
  startSharing = false,
  focusAgent = false,
}: {
  onBack?: () => void;
  startSharing?: boolean;
  focusAgent?: boolean;
}) {
  const [sharing, setSharing] = useState(startSharing);
  const shareTrigger = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState("Film trailer preview");
  const [notice, setNotice] = useState("");
  return (
    <AppContext
      title="Studio / Film trailer (Copy)"
      action={
        <div className="flex flex-wrap gap-2">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft aria-hidden="true" />
              Inspirations
            </Button>
          )}
          <Button
            ref={shareTrigger}
            variant="outline"
            size="sm"
            onClick={() => setSharing(true)}
          >
            Share
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setNotice(
                "Export options were inspected, but no export was performed. This prototype keeps the sample in the editor.",
              )
            }
          >
            Export
          </Button>
        </div>
      }
    >
      <div className="grid md:grid-cols-[minmax(0,28fr)_minmax(0,47fr)_minmax(0,25fr)]">
        <aside
          {...(onBack
            ? growthTarget({
                id: "studio-seeded-library",
                title: "Skip the empty start",
                description:
                  "The example includes video and audio, so you can explore the project before finding and importing your own files.",
                order: 1,
              })
            : {})}
          className={cn(
            "min-w-0 border-b border-border p-3 md:col-start-1 md:row-start-1 md:border-r",
            focusAgent ? "order-3" : "order-2",
            onBack && "growth-scope bg-card text-card-foreground",
          )}
          aria-label="Project media library"
        >
          <div className="flex items-center justify-between gap-2 pb-3">
            <h3 className="text-sm font-medium">Library</h3>
            <Badge variant="outline">Project</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {assets.map((x) => (
              <button
                className={cn("min-w-0 rounded-md text-left", focus)}
                key={x.label}
                onClick={() => setSelected(x.label)}
              >
                <Media
                  label={x.kind === "audio" ? "Audio" : "Media"}
                  kind={x.kind}
                  className={
                    selected === x.label
                      ? "border-border-strong bg-secondary"
                      : ""
                  }
                />
                <span className="mt-1 block truncate text-xs">{x.label}</span>
              </button>
            ))}
          </div>
        </aside>
        <div
          className={cn(
            "flex min-h-[310px] min-w-0 flex-col justify-center border-b border-border p-4 md:col-start-2 md:row-start-1",
            focusAgent ? "order-2" : "order-1",
          )}
        >
          <Media label={selected} className="w-full" />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            16:9 · 1:06
          </p>
        </div>
        <div
          className={cn(
            "min-w-0 md:col-start-3 md:row-span-2 md:row-start-1",
            focusAgent ? "order-1" : "order-4",
          )}
        >
          <StudioAgent />
        </div>
        <div
          {...(onBack
            ? growthTarget({
                id: "studio-seeded-timeline",
                title: "See how it is built",
                description:
                  "The filled timeline shows how the video and audio fit together, giving you a structure to learn from and change.",
                order: 2,
              })
            : {})}
          className={cn(
            "order-3 min-w-0 border-b border-border bg-card px-3 pb-4 md:col-span-2 md:row-start-2",
            onBack && "growth-scope text-card-foreground",
          )}
          aria-label="Populated sample timeline"
        >
          <div className="flex items-center justify-between gap-2 py-3">
            <p className="text-xs text-muted-foreground">0:00 / 1:06</p>
            <p className="text-xs font-medium">Populated timeline</p>
          </div>
          {["V2", "V1", "A1", "A2"].map((track, row) => (
            <div key={track} className="mb-1 flex items-center gap-2">
              <span className="w-5 shrink-0 text-xs text-muted-foreground">
                {track}
              </span>
              <div className="flex min-w-0 flex-1 gap-1">
                {Array.from(
                  { length: row === 3 ? 2 : row === 2 ? 4 : 5 },
                  (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelected(`${track} · Clip ${i + 1}`)}
                      aria-label={`Select ${track} clip ${i + 1}`}
                      className={cn(
                        "flex h-9 min-w-0 flex-1 items-center justify-center rounded-sm border border-border bg-secondary text-muted-foreground",
                        focus,
                        row > 1 && "bg-surface-sunken",
                        row === 0 && i % 2 === 0 && "mx-1",
                      )}
                      style={{
                        flexGrow: row === 3 ? i + 2 : [2, 1, 3, 1, 2][i],
                      }}
                    >
                      {row > 1 ? (
                        <AudioLines aria-hidden="true" className="size-4" />
                      ) : (
                        <Film aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {notice && (
        <div className="p-4">
          <Note>{notice}</Note>
        </div>
      )}
      <SharingDialog
        open={sharing}
        onOpenChange={setSharing}
        restoreFocus={() => shareTrigger.current?.focus()}
      />
    </AppContext>
  );
}

function SharingDialog({
  open,
  onOpenChange,
  restoreFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restoreFocus: () => void;
}) {
  const [workspace, setWorkspace] = useState("restricted");
  const [publicAccess, setPublicAccess] = useState("no-access");
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="growth-scope max-w-[576px] gap-5 p-5"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          restoreFocus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Share project</DialogTitle>
          <DialogDescription>
            Choose who in your workspace can access this project.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label className="sr-only" htmlFor="studio-user-search">
            Search for users or groups
          </Label>
          <Input
            id="studio-user-search"
            placeholder="Search for users or groups"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <p className="mt-2 text-sm text-muted-foreground">
              No workspace directory is connected in this prototype.
            </p>
          )}
        </div>
        <div
          {...growthTarget({
            id: "project-invitation",
            title: "Invite while sharing",
            description:
              "The invitation appears while you choose who can access a project, connecting the request to work you already want to share.",
            order: 1,
          })}
          className="relative rounded-md bg-card text-card-foreground"
        >
          <Button
            variant="outline"
            className="h-auto w-full justify-start whitespace-normal px-3 py-3 text-left focus-visible:outline-ring-inverse"
            asChild
          >
            <a
              href={relatedExperimentHref("el-basic-seat-collaboration-bridge")}
              target="_top"
            >
              <Users aria-hidden="true" />
              <span>
                <span className="block">Invite team members</span>
                <span className="block text-xs font-normal leading-5 text-muted-foreground">
                  Bring your team in to collaborate and share your creations.
                </span>
              </span>
            </a>
          </Button>
        </div>
        <div className="space-y-5">
          {[
            {
              id: "studio-workspace-access",
              label: "Workspace Access",
              description:
                workspace === "restricted"
                  ? "Only admins in your workspace will be able to access your project"
                  : "Local preview of the selected workspace permission.",
              value: workspace,
              set: setWorkspace,
              first: "Restricted",
              key: "restricted",
            },
            {
              id: "studio-public-access",
              label: "Public access",
              description:
                publicAccess === "no-access"
                  ? "Only workspace members can access this project"
                  : "Local preview only. Public access has not been enabled.",
              value: publicAccess,
              set: setPublicAccess,
              first: "No Access",
              key: "no-access",
            },
          ].map((x) => (
            <div key={x.id} className="grid gap-2 sm:grid-cols-[1fr_150px]">
              <div>
                <Label htmlFor={x.id}>{x.label}</Label>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {x.description}
                </p>
              </div>
              <Select
                value={x.value}
                onValueChange={(value) => {
                  x.set(value);
                  setNote(
                    "Permissions are previewed locally. No project access has changed.",
                  );
                }}
              >
                <SelectTrigger id={x.id} aria-label={x.label}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="growth-scope">
                  <SelectItem value={x.key}>{x.first}</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="commenter">Commenter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        {note && <Note>{note}</Note>}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NodePreview() {
  return (
    <div
      className="relative grid aspect-[2/1] grid-cols-3 items-center gap-5 overflow-hidden border-b border-border bg-surface-sunken p-6"
      aria-label="An image input connects to an edit and a generated video"
    >
      <div
        className="absolute left-8 right-8 top-1/2 h-px bg-border-strong"
        aria-hidden="true"
      />
      {[
        { icon: Image, label: "Image", className: "-translate-y-3" },
        { icon: Layers3, label: "Edit", className: "-translate-y-6" },
        { icon: Video, label: "Video", className: "translate-y-2" },
      ].map(({ icon: Icon, label, className }) => (
        <div
          key={label}
          className={cn(
            "relative z-10 rounded-md border border-border-strong bg-card p-2 text-center",
            className,
          )}
        >
          <Icon
            aria-hidden="true"
            className="mx-auto my-4 size-7 text-muted-foreground"
          />
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

function FlowsIntro() {
  const [open, setOpen] = useState(true);
  const introTrigger = useRef<HTMLButtonElement>(null);
  const [started, setStarted] = useState(false);
  return (
    <AppContext
      title="Flows"
      action={
        <Button
          ref={introTrigger}
          size="sm"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          View introduction
        </Button>
      }
    >
      <div className="flex min-h-[600px] items-center justify-center px-5">
        <div className="max-w-md text-center">
          <Network
            aria-hidden="true"
            className="mx-auto mb-4 size-10 text-muted-foreground"
          />
          <h2 className="text-lg font-medium">Flows</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {started
              ? "Introduction complete. No node workflow was created or run in the reference."
              : "Create your content on an infinite canvas."}
          </p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="growth-scope max-w-[512px] gap-0 overflow-hidden p-0"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            introTrigger.current?.focus();
          }}
        >
          <div className="max-h-[85dvh] overflow-y-auto">
            <NodePreview />
            <DialogHeader
              {...growthTarget({
                id: "flows-introduction",
                title: "Show how Flows works",
                description:
                  "A connected example and three benefits explain what Flows does, helping you decide whether to try the canvas.",
                order: 1,
              })}
              className="px-6 pt-6"
            >
              <DialogTitle>Introducing Flows</DialogTitle>
              <DialogDescription className="sr-only">
                Connect generation tools on an infinite canvas.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 px-6 py-5">
              {[
                {
                  icon: Network,
                  text: "Add & connect nodes for image, video, and audio generation",
                },
                {
                  icon: Layers3,
                  text: "Visually create your content on an infinite canvas",
                },
                {
                  icon: Sparkles,
                  text: "Access to all the popular AI models without switching tools",
                },
              ].map(({ icon: Icon, text }) => (
                <p key={text} className="flex gap-3 text-sm leading-6">
                  <Icon aria-hidden="true" className="mt-1 size-4 shrink-0" />
                  {text}
                </p>
              ))}
            </div>
            <div
              {...growthTarget({
                id: "flows-entry",
                title: "Start from the introduction",
                description:
                  "Get started gives you one clear next step after the introduction, so you do not need to look for where to begin.",
                order: 2,
              })}
              className="px-4 pb-4"
            >
              <Button
                className="w-full"
                onClick={() => {
                  setStarted(true);
                  setOpen(false);
                }}
              >
                Get started
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppContext>
  );
}

function DubbingIntro() {
  const [open, setOpen] = useState(true);
  const introTrigger = useRef<HTMLButtonElement>(null);
  const [source, setSource] = useState("upload");
  const [url, setUrl] = useState("");
  const [sample, setSample] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <AppContext
      title="Dubbing"
      action={
        <Button
          ref={introTrigger}
          size="sm"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          View introduction
        </Button>
      }
    >
      <div className="mx-auto max-w-xl px-5 py-12">
        <h2 className="text-xl font-medium">Create a dub</h2>
        <p className="mb-6 mt-2 text-sm text-muted-foreground">
          Upload a file or enter a URL.
        </p>
        <div className="mb-5 flex gap-2">
          <Button
            variant={source === "upload" ? "secondary" : "ghost"}
            onClick={() => setSource("upload")}
            aria-pressed={source === "upload"}
          >
            Upload
          </Button>
          <Button
            variant={source === "url" ? "secondary" : "ghost"}
            onClick={() => setSource("url")}
            aria-pressed={source === "url"}
          >
            URL
          </Button>
        </div>
        {source === "upload" ? (
          <button
            type="button"
            onClick={() =>
              setNotice(
                "A source upload is the next step. This prototype does not upload or process a file.",
              )
            }
            className={cn(
              "flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-input bg-surface-sunken p-5",
              focus,
            )}
          >
            <Upload className="size-6" aria-hidden="true" />
            <span className="text-sm">Upload a file</span>
          </button>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="studio-dubbing-url">Source URL</Label>
            <Input
              id="studio-dubbing-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
            />
            <Button
              onClick={() =>
                setNotice(
                  "Source URL entered locally. No media is fetched and no dubbing is generated.",
                )
              }
              disabled={!url.trim()}
            >
              Continue
            </Button>
          </div>
        )}
        {notice && (
          <div className="mt-4">
            <Note>{notice}</Note>
          </div>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="growth-scope max-w-[450px] gap-0 overflow-hidden p-0"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            introTrigger.current?.focus();
          }}
        >
          <div className="max-h-[85dvh] overflow-y-auto">
            <div className="m-3 flex aspect-video items-center justify-center rounded-md border border-border bg-surface-sunken">
              <div className="text-center">
                <AudioLines
                  aria-hidden="true"
                  className="mx-auto mb-3 size-9 text-muted-foreground"
                />
                <p className="text-xl">
                  Dubbing <Badge variant="outline">v2 alpha</Badge>
                </p>
              </div>
            </div>
            <DialogHeader
              {...growthTarget({
                id: "dubbing-benefits",
                title: "Explain what is new",
                description:
                  "The announcement describes the promised improvements to emotion, language and timing, helping you decide whether the new dubbing tool is useful.",
                order: 1,
              })}
              className="px-6 pt-3"
            >
              <DialogTitle className="text-xl leading-7">
                Introducing Dubbing v2 alpha
              </DialogTitle>
              <DialogDescription className="sr-only">
                Explore the new dubbing capability or start with your own
                source.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 px-6 py-5">
              {[
                {
                  icon: AudioLines,
                  text: "Preserves the emotion and delivery of the original speaker",
                },
                {
                  icon: MessageSquare,
                  text: "Adapts phrasing to sound natural in 92 languages",
                },
                { icon: Volume2, text: "Automatic voice cloning and sync" },
              ].map(({ icon: Icon, text }) => (
                <p
                  key={text}
                  className="flex items-start gap-3 text-sm leading-6"
                >
                  <span className="rounded-md bg-secondary p-1.5">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {text}
                </p>
              ))}
              {sample && (
                <Note>
                  The sample action was visible, but the samples were not played
                  or captured. Audio playback is unavailable in this wireframe.
                </Note>
              )}
            </div>
            <div
              {...growthTarget({
                id: "dubbing-evaluate-or-start",
                title: "Listen first or start",
                description:
                  "Play samples lets you hear examples before providing your own material. Get started takes you straight to setup.",
                order: 2,
              })}
              className="relative grid grid-cols-2 gap-2 border-t border-border p-3"
            >
              <Button
                variant="outline"
                className="whitespace-normal px-2"
                onClick={() => setSample(!sample)}
                aria-expanded={sample}
              >
                <Play aria-hidden="true" />
                Play samples
              </Button>
              <Button className="px-2" onClick={() => setOpen(false)}>
                Get started
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppContext>
  );
}

type BookRoute = "create" | "publish";
function AudiobookPaths() {
  const lastTrigger = useRef<HTMLElement | null>(null);
  const [route, setRoute] = useState<BookRoute>("create");
  const [open, setOpen] = useState(false);
  const [narration, setNarration] = useState("single");
  const [inputSource, setInputSource] = useState("document");
  const [sampleFile, setSampleFile] = useState(false);
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState("");
  function choose(next: BookRoute) {
    lastTrigger.current = document.activeElement as HTMLElement | null;
    setRoute(next);
    setOpen(true);
    setNotice("");
  }
  return (
    <AppContext title="Audiobooks">
      <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-medium">Audiobooks</h2>
          <Button size="sm" onClick={() => choose("create")}>
            Create a new project
          </Button>
        </div>
        <div
          {...growthTarget({
            id: "audiobook-pathways",
            title: "Choose your goal",
            description:
              "One option creates audio to export; the other publishes to ElevenReader. Choosing the outcome first makes the next steps clearer.",
            order: 1,
          })}
          className="grid gap-3 sm:grid-cols-2"
        >
          {[
            {
              id: "create" as const,
              title: "Create an Audiobook",
              text: "Create high-quality audio to export and distribute everywhere",
              icon: BookOpen,
            },
            {
              id: "publish" as const,
              title: "Publish to ElevenReader",
              text: "Upload your eBook to ElevenReader with free dynamic narration, start earning",
              icon: Upload,
            },
          ].map(({ id, title, text, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => choose(id)}
              className={cn(
                "growth-scope flex min-h-20 min-w-0 items-center gap-3 rounded-md border border-border bg-card text-card-foreground p-3 text-left transition-colors hover:bg-secondary",
                focus,
                "focus-visible:outline-ring-inverse",
              )}
            >
              <span className="shrink-0 rounded-md bg-secondary p-2">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {text}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-border text-sm">
          <p className="border-b-2 border-primary pb-3 font-medium">
            Bookshelf
          </p>
          <p className="text-muted-foreground">Payouts</p>
          <p className="text-muted-foreground">Analytics</p>
          <p className="text-muted-foreground">Resources</p>
        </div>
        <div className="mt-5 rounded-md border border-border bg-surface-sunken px-3 py-3 text-sm text-muted-foreground">
          <Search aria-hidden="true" className="mr-2 inline size-4" />
          Search books and series...
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-md border border-border bg-card"
            />
          ))}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[900px] gap-0 overflow-hidden p-0"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastTrigger.current?.focus();
          }}
        >
          <div className="grid max-h-[85dvh] overflow-y-auto md:grid-cols-[28%_72%]">
            <aside
              className="border-b border-border p-3 pr-12 md:border-b-0 md:border-r md:pr-3"
              aria-label="Audiobook route"
            >
              <div className="flex gap-2 md:flex-col">
                {[
                  {
                    id: "create" as const,
                    label: "Create an Audiobook",
                    icon: BookOpen,
                  },
                  {
                    id: "publish" as const,
                    label: "Publish to ElevenReader",
                    icon: Upload,
                  },
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={route === id ? "secondary" : "ghost"}
                    className="h-auto min-h-10 flex-1 justify-start whitespace-normal px-2 py-2 text-left text-xs md:flex-none"
                    aria-pressed={route === id}
                    onClick={() => {
                      setRoute(id);
                      setNotice("");
                    }}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </Button>
                ))}
              </div>
              <p className="mt-4 hidden border-t border-border px-2 py-4 text-sm text-muted-foreground md:block">
                Create series
              </p>
            </aside>
            <div className="flex min-h-[570px] min-w-0 flex-col">
              <DialogHeader
                {...growthTarget({
                  id: `audiobook-${route}-guidance`,
                  title:
                    route === "create"
                      ? "Show the steps ahead"
                      : "Show where books go",
                  description:
                    route === "create"
                      ? "Upload, Formatting, Voice and Pronunciations show the steps ahead, so you know what setup involves before you begin."
                      : "The introduction explains how your book can reach ElevenReader listeners and earn money, giving you a reason to prepare it for publishing.",
                  order: 1,
                })}
                className="growth-scope border-b border-border bg-card text-card-foreground px-5 py-5 pr-12"
              >
                <DialogTitle
                  className={route === "create" ? "sr-only" : "text-lg"}
                >
                  {route === "create"
                    ? "Create an Audiobook"
                    : "Publish to ElevenReader"}
                </DialogTitle>
                {route === "create" ? (
                  <ol
                    aria-label="Audiobook setup steps"
                    className="flex flex-wrap gap-2 text-xs sm:text-sm"
                  >
                    {["Upload", "Formatting", "Voice", "Pronunciations"].map(
                      (step, i) => (
                        <li
                          key={step}
                          className={cn(
                            "flex items-center gap-2",
                            i > 0 && "text-muted-foreground",
                          )}
                          aria-current={i === 0 ? "step" : undefined}
                        >
                          {i > 0 && (
                            <ChevronRight
                              aria-hidden="true"
                              className="size-3"
                            />
                          )}
                          {step}
                        </li>
                      ),
                    )}
                  </ol>
                ) : null}
                <DialogDescription
                  className={route === "create" ? "sr-only" : "text-sm"}
                >
                  {route === "create"
                    ? "Upload a book and choose its narration style."
                    : "Upload your eBook to ElevenReader with free dynamic narration, start earning"}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 space-y-5 p-5">
                {route === "create" ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">File</p>
                      <button
                        className={cn(
                          "flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface-sunken p-4 text-sm",
                          focus,
                        )}
                        onClick={() => {
                          setSampleFile(true);
                          setNotice(
                            "A sample manuscript is selected locally for this wireframe. No file is uploaded.",
                          );
                        }}
                      >
                        <Upload aria-hidden="true" className="size-5" />
                        <span className="font-medium">
                          {sampleFile
                            ? "Sample manuscript.epub"
                            : "Choose an EPUB or PDF file"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {sampleFile
                            ? "Local sample selected"
                            : "Click to preview a sample file"}
                        </span>
                      </button>
                    </div>
                    <fieldset
                      {...growthTarget({
                        id: "audiobook-narration-choice",
                        title: "Compare narrator options",
                        description:
                          "Single cast and Multi cast explain one narrator versus separate character voices, helping you choose the style that suits your book.",
                        order: 2,
                      })}
                      className="min-w-0"
                    >
                      <legend className="mb-2 text-sm font-medium">
                        Narration style
                      </legend>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {[
                          {
                            id: "single",
                            label: "Single cast",
                            text: "One narrator voice for the entire book.",
                          },
                          {
                            id: "multi",
                            label: "Multi cast",
                            text: "Distinct voices for narrator and each character.",
                          },
                        ].map((x) => (
                          <label
                            key={x.id}
                            className={cn(
                              "growth-scope relative cursor-pointer rounded-md border bg-card text-card-foreground p-3 text-sm",
                              narration === x.id
                                ? "border-border-strong"
                                : "border-border",
                            )}
                          >
                            <input
                              type="radio"
                              name="studio-narration"
                              value={x.id}
                              checked={narration === x.id}
                              onChange={() => setNarration(x.id)}
                              className="sr-only peer"
                            />
                            <span className="absolute inset-0 rounded-md peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring-inverse" />
                            <span className="flex items-center justify-between gap-2">
                              <span>
                                {x.label}{" "}
                                {x.id === "multi" && (
                                  <Badge className="ml-1 py-0 text-xs">
                                    New
                                  </Badge>
                                )}
                              </span>
                              {narration === x.id && (
                                <Check className="size-4" aria-hidden="true" />
                              )}
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {x.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div>
                      <p className="mb-2 text-sm font-medium">Model</p>
                      <div className="rounded-md border border-border bg-card p-3 text-sm">
                        <p>Eleven v4</p>
                        <p className="my-1 text-muted-foreground">
                          Our fastest and most emotive model. Supports 90+
                          languages.
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {[
                            "Afrikaans",
                            "Arabic",
                            "Armenian",
                            "+82 more...",
                          ].map((x) => (
                            <Badge className="py-0 text-xs" key={x}>
                              {x}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-1 border-b border-border">
                      <Button
                        variant={
                          inputSource === "document" ? "secondary" : "ghost"
                        }
                        onClick={() => setInputSource("document")}
                        aria-pressed={inputSource === "document"}
                      >
                        Upload a document
                      </Button>
                      <Button
                        variant={inputSource === "url" ? "secondary" : "ghost"}
                        onClick={() => setInputSource("url")}
                        aria-pressed={inputSource === "url"}
                      >
                        Import URL
                      </Button>
                    </div>
                    {inputSource === "document" ? (
                      <button
                        onClick={() => {
                          setSampleFile(true);
                          setNotice(
                            "A sample document is selected locally. No document is uploaded or published.",
                          );
                        }}
                        className={cn(
                          "flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-md border border-input bg-surface-sunken p-4 text-sm",
                          focus,
                        )}
                      >
                        <Upload className="size-5" aria-hidden="true" />
                        <span>
                          {sampleFile
                            ? "Sample manuscript.epub"
                            : "Click to upload, or drag and drop"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          .epub, .pdf, .txt, .html, .docx, .xml, .fdx
                        </span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="studio-book-url">Import URL</Label>
                        <Input
                          id="studio-book-url"
                          type="url"
                          placeholder="https://"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                        <p className="text-xs leading-5 text-muted-foreground">
                          This local preview does not fetch the URL.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {notice && <Note>{notice}</Note>}
              </div>
              <DialogFooter className="border-t border-border px-5 py-3">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Back
                </Button>
                <div
                  {...(route === "publish"
                    ? growthTarget({
                        id: "audiobook-publish-preview",
                        title: "Preview before publishing",
                        description:
                          "Create and preview book offers a way to check the result after adding your document, before deciding to publish it.",
                        order: 2,
                      })
                    : {})}
                  className="flex items-center gap-2"
                >
                  <Button
                    variant={route === "publish" ? "secondary" : "default"}
                    className={
                      route === "publish"
                        ? "growth-scope focus-visible:outline-ring-inverse"
                        : undefined
                    }
                    disabled={
                      route === "create"
                        ? !sampleFile
                        : inputSource === "document"
                          ? !sampleFile
                          : !url.trim()
                    }
                    onClick={() =>
                      setNotice(
                        route === "create"
                          ? "Upload is the last inspected step. Formatting, voice selection and pronunciation setup were not observed; no audiobook is generated."
                          : "The setup action is demonstrated. Book preview and publishing were not observed; no book is created or published.",
                      )
                    }
                  >
                    {route === "create"
                      ? "Continue"
                      : "Create and preview book"}
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppContext>
  );
}

export function StudioWireframe({ patternId }: { patternId: string }) {
  if (!studioPatternIds.includes(patternId)) return null;
  switch (patternId) {
    case "el-inspiration-to-populated-project":
      return <InspirationGallery />;
    case "el-studio-agent-task-starters":
      return <StudioEditor focusAgent />;
    case "el-project-context-collaboration-invite":
      return <StudioEditor startSharing />;
    case "el-flows-first-visit-introduction":
      return <FlowsIntro />;
    case "el-dubbing-launch-sample-entry":
      return <DubbingIntro />;
    case "el-audiobook-create-or-publish":
      return <AudiobookPaths />;
    default:
      return (
        <section className="p-6">
          <p>Choose a Studio experiment to preview.</p>
        </section>
      );
  }
}
