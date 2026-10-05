import { relatedExperimentHref as href } from "./navigation";
import { growthTarget } from "../../components/growth-education";
import { useId, useMemo, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AudioLines,
  Check,
  ChevronRight,
  Circle,
  Coins,
  FileAudio,
  Headphones,
  Home,
  Library,
  LockKeyhole,
  Mic,
  Pause,
  Play,
  Plus,
  Search,
  Settings2,
  Shuffle,
  Sparkles,
  Upload,
  Volume2,
  Wallet,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  cn,
} from "../../components/kit";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/patterns";

export const voicePatternIds = [
  "el-professional-clone-capability-gate",
  "el-voice-supplier-earnings-checklist",
  "el-demand-guided-voice-supply",
];

const links = {
  chooser: "el-professional-clone-capability-gate",
  gate: "el-professional-clone-capability-gate",
  earnings: "el-voice-supplier-earnings-checklist",
  opportunities: "el-demand-guided-voice-supply",
};

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring";

function Boundary({
  children,
  onDismiss,
}: {
  children: ReactNode;
  onDismiss?: () => void;
}) {
  return (
    <Alert title="End of the observed flow" className="text-left" role="status">
      <p>{children}</p>
      {onDismiss && (
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={onDismiss}
        >
          Back to the wireframe
        </Button>
      )}
    </Alert>
  );
}

function PatternLink({
  id,
  children,
  className,
  variant = "outline",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: "outline" | "ghost" | "default";
}) {
  return (
    <Button asChild variant={variant} className={className}>
      <a href={href(id)} target="_top">
        {children}
      </a>
    </Button>
  );
}

function AbstractSidebar() {
  return (
    <aside
      className="hidden w-[15%] min-w-32 shrink-0 border-r border-border bg-surface-sunken px-3 py-6 md:block"
      aria-label="Application context"
    >
      <div className="mb-7 flex items-center gap-2 px-2 text-sm font-semibold">
        <AudioLines className="size-5" aria-hidden="true" /> Workspace
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-3 px-2 py-2 text-muted-foreground">
          <Home className="size-4" aria-hidden="true" />
          Home
        </div>
        <div className="flex items-center gap-3 rounded-md bg-selected px-2 py-2 text-selected-foreground">
          <AudioLines className="size-4" aria-hidden="true" />
          Voices
        </div>
        {["Studio", "Flows", "Chat", "Assets"].map((label) => (
          <div
            key={label}
            className="flex items-center gap-3 px-2 py-2 text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-3.5 rounded-sm border border-border"
            />
            {label}
          </div>
        ))}
      </div>
      <div className="mt-9 space-y-5 px-2" aria-hidden="true">
        {[75, 85, 60, 80, 65].map((width, index) => (
          <div
            key={index}
            className="h-2 rounded-sm bg-border"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </aside>
  );
}

function VoicePage({
  section,
  children,
  earnings = false,
}: {
  section: string;
  children: ReactNode;
  earnings?: boolean;
}) {
  return (
    <section
      className="flex min-h-[760px] bg-background text-foreground"
      aria-label={`${section} wireframe`}
    >
      <AbstractSidebar />
      <div className="min-w-0 flex-1">
        <div className="flex min-h-12 items-center gap-2 border-b border-border px-4 text-xs text-muted-foreground md:px-6">
          <Library className="size-3.5" aria-hidden="true" />
          <span>Voices</span>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span>{earnings ? "Earnings" : section}</span>
          {earnings && (
            <>
              <ChevronRight className="size-3" aria-hidden="true" />
              <span>{section}</span>
            </>
          )}
        </div>
        <div className="mx-auto w-full px-4 pb-14 pt-7 sm:px-6 md:w-[88%] md:px-0 md:pt-12">
          <h2 className="text-2xl font-medium tracking-tight">Voices</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm",
                  !earnings && "bg-selected text-selected-foreground",
                )}
              >
                <AudioLines className="size-4" aria-hidden="true" /> Explore
              </span>
              <span className="px-2 text-sm text-muted-foreground">
                My Voices
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <PatternLink
                id={links.earnings}
                variant="ghost"
                className={cn(
                  "px-2",
                  earnings && "bg-selected text-selected-foreground",
                )}
              >
                <Wallet aria-hidden="true" />
                Earnings
              </PatternLink>
              <PatternLink
                id={links.chooser}
                variant="default"
                className="px-3"
              >
                <Plus aria-hidden="true" />
                Create Voice
              </PatternLink>
            </div>
          </div>
          {earnings ? (
            <div className="mt-5 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[108px_minmax(0,1fr)]">
              <nav
                aria-label="Voice earnings"
                className="flex gap-2 lg:flex-col"
              >
                <PatternLink
                  id={links.earnings}
                  variant="ghost"
                  className={cn(
                    "justify-start px-2",
                    section === "Payouts" &&
                      "bg-selected text-selected-foreground",
                  )}
                >
                  Payouts
                </PatternLink>
                <PatternLink
                  id={links.opportunities}
                  variant="ghost"
                  className={cn(
                    "justify-start px-2",
                    section === "Opportunities" &&
                      "bg-selected text-selected-foreground",
                  )}
                >
                  Opportunities
                </PatternLink>
              </nav>
              <div className="min-w-0">{children}</div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );
}

type CreatorStage = "chooser" | "design" | "clone";
function CreationDialog({
  initialStage = "chooser",
  gate = false,
}: {
  initialStage?: CreatorStage;
  gate?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState(initialStage);
  const [boundary, setBoundary] = useState("");
  const title = stage === "design" ? "Voice Design" : "Create voice";
  if (stage === "clone")
    return (
      <CloneSetup
        onBack={() => {
          setStage("chooser");
          setOpen(true);
        }}
      />
    );
  return (
    <section
      className="flex min-h-[820px] items-center justify-center bg-background p-4"
      aria-label="Voice creation wireframe"
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setStage(initialStage);
              setBoundary("");
            }}
          >
            <Plus aria-hidden="true" />
            {initialStage === "design" ? "Open Voice Design" : "Create voice"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100dvh_-_2rem)] max-w-[512px] gap-5 p-5 sm:p-8">
          <DialogHeader className="pr-8">
            <div className="flex items-center gap-4">
              {stage === "design" ? (
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Back to voice creation methods"
                  onClick={() => {
                    setStage("chooser");
                    setBoundary("");
                  }}
                >
                  <ArrowLeft aria-hidden="true" />
                </Button>
              ) : (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border">
                  <AudioLines className="size-5" aria-hidden="true" />
                </span>
              )}
              <DialogTitle className="text-xl">{title}</DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              Choose a voice creation method. This local wireframe stops before
              generation, upload, or subscription.
            </DialogDescription>
          </DialogHeader>
          {stage === "design" ? (
            <PromptDesign />
          ) : (
            <div className="space-y-3">
              <div
                className="space-y-3"
                {...(!gate
                  ? growthTarget({
                      id: "voice-pathways",
                      title: "Compare time and effort",
                      description:
                        "Time estimates and audio requirements let you compare voice creation methods before choosing one that fits your needs.",
                      order: 1,
                    })
                  : {})}
              >
                <MethodCard
                  growth={!gate}
                  icon={<Sparkles />}
                  title="Voice Design"
                  description="Design an entirely new voice from a text prompt."
                  duration="Less than a minute"
                  onClick={() => {
                    setStage("design");
                    setBoundary("");
                  }}
                />
                <MethodCard
                  growth={!gate}
                  icon={<Mic />}
                  title="Instant Voice Clone"
                  description="Clone your voice with only 10 seconds of audio."
                  duration="2 minutes"
                  onClick={() => setStage("clone")}
                />
              </div>
              <Card
                className={cn(
                  "growth-scope relative overflow-hidden",
                  gate && "border-border-strong",
                )}
                {...(!gate
                  ? growthTarget({
                      id: "voice-upgrade",
                      title: "Show the paid option",
                      description:
                        "Professional Voice Clone stays visible with its Creator plan requirement. Subscribe gives you a way to unlock it.",
                      order: 2,
                    })
                  : {})}
              >
                <div
                  className="relative"
                  {...(gate
                    ? growthTarget({
                        id: "voice-clone-benefit",
                        title: "What the upgrade adds",
                        description:
                          "The card explains how realistic the clone can be and how much audio it needs, helping you decide whether to upgrade.",
                        order: 1,
                      })
                    : {})}
                >
                  <div className="p-5" aria-disabled="true">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <AudioLines className="size-4" aria-hidden="true" />
                      Professional Voice Clone
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Create the most realistic digital replica of your voice.
                      Requires at least 30 minutes of clean audio.
                    </p>
                    <Badge
                      className="mt-2 rounded-full text-xs"
                      variant="outline"
                    >
                      5 minutes
                    </Badge>
                  </div>
                </div>
                <div
                  className="flex flex-wrap items-center gap-3 border-t border-border bg-surface-sunken px-5 py-3"
                  {...(gate
                    ? growthTarget({
                        id: "voice-clone-requirement",
                        title: "Explain how to unlock it",
                        description:
                          "The lock, Creator plan requirement, and Subscribe button sit together, so you can see why the feature is unavailable and what to do.",
                        order: 2,
                      })
                    : {})}
                >
                  <LockKeyhole
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="min-w-0 flex-1 basis-44 text-xs leading-4">
                    You need to be on at least the Creator plan to use
                    Professional Voice Cloning.
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setBoundary(
                        "The Creator requirement and Subscribe action were observed. The subscription branch was not followed; no plan changes here.",
                      )
                    }
                  >
                    Subscribe
                  </Button>
                </div>
              </Card>
              <div>
                <MethodCard
                  growth={!gate}
                  icon={<Settings2 />}
                  title="Voice Remixing"
                  description="Transform existing voices with text prompts to create new voices."
                  duration="Less than a minute"
                  onClick={() =>
                    setBoundary(
                      "Voice Remixing was visible in the chooser. Its next screen was not inspected.",
                    )
                  }
                />
              </div>
              <div
                className="relative"
                {...(!gate
                  ? growthTarget({
                      id: "voice-library-alternative",
                      title: "Offer a ready-made option",
                      description:
                        "The voice library gives you something to try when creating or cloning a voice feels like too much work.",
                      order: 3,
                    })
                  : {})}
              >
                <button
                  type="button"
                  onClick={() =>
                    setBoundary(
                      "The voice library is surrounding product context. Its browsing interface is outside this premium-gate experiment.",
                    )
                  }
                  className={cn(
                    "block w-full rounded-md border border-border bg-card p-5 text-card-foreground text-left transition-colors hover:bg-secondary",
                    focusClass,
                    !gate && "growth-scope focus-visible:outline-ring-inverse",
                  )}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Library className="size-4" aria-hidden="true" />
                    Voice Library
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                    Choose from thousands of high quality voices across
                    different ages, accents, and styles.
                  </span>
                </button>
              </div>
              {boundary && (
                <Boundary onDismiss={() => setBoundary("")}>
                  {boundary}
                </Boundary>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function MethodCard({
  icon,
  title,
  description,
  duration,
  onClick,
  growth = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  duration: string;
  onClick: () => void;
  growth?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full rounded-md border border-border bg-card p-5 text-card-foreground text-left transition-colors hover:bg-secondary motion-reduce:transition-none",
        focusClass,
        growth && "growth-scope focus-visible:outline-ring-inverse",
      )}
    >
      <span
        className="flex items-center gap-2 text-sm font-medium [&_svg]:size-4"
        aria-hidden="true"
      >
        {icon}
        <span>{title}</span>
      </span>
      <span className="sr-only">{title}</span>
      <span className="mt-2 block text-xs leading-5 text-muted-foreground">
        {description}
      </span>
      <Badge variant="outline" className="mt-2 rounded-full text-xs">
        {duration}
      </Badge>
    </button>
  );
}

const originalPrompt =
  "A deep, booming male voice of a massive evil ogre in his middle years. Thick, gravelly tone with a resonant, theatrical quality that's both menacing and absurdly silly. Speaking at a quick, excited pace with erratic bursts of maniacal energy. Perfect audio quality.";
const promptExamples = [
  { name: "Evil Ogre", prompt: originalPrompt },
  {
    name: "Little Mouse",
    prompt: "Little Mouse",
  },
  {
    name: "Southern Woman",
    prompt: "Southern Woman",
  },
];
function PromptDesign() {
  const inputId = useId();
  const [prompt, setPrompt] = useState(originalPrompt);
  const [example, setExample] = useState(0);
  const [boundary, setBoundary] = useState("");
  const choose = (index: number) => {
    setExample(index);
    setPrompt(promptExamples[index].prompt);
    setBoundary("");
  };
  return (
    <div className="space-y-5">
      <div
        className="growth-scope rounded-md border border-border bg-card p-3 text-card-foreground"
        {...growthTarget({
          id: "voice-prompt-starters",
          title: "Start with an example",
          description:
            "An editable example and prompt suggestions show how to describe a voice. You can try one as written or make it your own.",
          order: 1,
        })}
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={inputId}>Prompt</Label>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-0 underline underline-offset-4"
            onClick={() =>
              setBoundary(
                "Best practices was linked beside the prompt. The linked guidance was not inspected.",
              )
            }
          >
            Best practices <ArrowRight aria-hidden="true" />
          </Button>
        </div>
        <div className="rounded-md border border-input bg-surface-sunken p-2">
          <Textarea
            id={inputId}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="min-h-36 resize-y border-0 bg-transparent p-1 text-sm leading-5"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="size-8 rounded-full p-0"
              aria-label="Randomize voice prompt"
              onClick={() => choose((example + 1) % promptExamples.length)}
            >
              <Shuffle aria-hidden="true" />
            </Button>
            {promptExamples.map((item, index) => (
              <Button
                key={item.name}
                variant={example === index ? "secondary" : "outline"}
                size="sm"
                className="h-8 rounded-full px-2 text-xs"
                aria-pressed={example === index}
                onClick={() => choose(index)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
        {example !== 0 && (
          <p
            role="status"
            className="mt-2 text-xs leading-5 text-muted-foreground"
          >
            Only this example’s label was captured; its full prompt is
            unavailable.
          </p>
        )}
      </div>
      <div
        className="flex flex-wrap items-center gap-2"
        {...growthTarget({
          id: "voice-generation-cost",
          title: "Show the cost first",
          description:
            "The credit estimate sits beside Generate voice, so you can weigh the cost before trying your first voice.",
          order: 2,
        })}
      >
        <Button
          variant="outline"
          disabled={!prompt.trim()}
          className="growth-scope min-w-0 flex-1 basis-full justify-between bg-card focus-visible:outline-ring-inverse sm:basis-0"
          onClick={() =>
            setBoundary(
              "Generation was not submitted. This wireframe stops before creating a voice or spending credits.",
            )
          }
        >
          <span>Generate voice</span>
          <Badge variant="outline" className="rounded-full px-1.5 text-xs">
            <Coins className="size-3" aria-hidden="true" />
            171
          </Badge>
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setBoundary(
              "The Settings control was visible. Its contents were not inspected.",
            )
          }
        >
          <Settings2 aria-hidden="true" />
          Settings
        </Button>
      </div>
      {boundary && (
        <Boundary onDismiss={() => setBoundary("")}>{boundary}</Boundary>
      )}
    </div>
  );
}

function CloneSetup({ onBack }: { onBack?: () => void }) {
  const [open, setOpen] = useState(true);
  const [sample, setSample] = useState(false);
  const [boundary, setBoundary] = useState("");
  const tips = [
    {
      Icon: Volume2,
      title: "Avoid noisy environments",
      text: "Background sounds interfere with recording quality results.",
    },
    {
      Icon: Headphones,
      title: "Check microphone quality",
      text: "Try external units or headphone mics for better audio capture.",
    },
    {
      Icon: Mic,
      title: "Use consistent equipment",
      text: "Don’t change recording equipment between samples.",
    },
  ];
  return (
    <section
      className="relative min-h-[800px] bg-background px-4 py-12 text-foreground sm:px-8"
      aria-label="Instant Voice Clone setup wireframe"
    >
      {!open ? (
        <div className="flex min-h-[650px] items-center justify-center">
          <Button
            onClick={() => {
              setOpen(true);
              setSample(false);
              setBoundary("");
            }}
          >
            Open Instant Voice Clone
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3"
            aria-label="Close Instant Voice Clone"
            onClick={() => setOpen(false)}
          >
            <X aria-hidden="true" />
          </Button>
          <div className="mx-auto mt-10 max-w-[884px]">
            <div className="mb-5 flex size-11 items-center justify-center rounded-md border border-border">
              <AudioLines className="size-5" aria-hidden="true" />
            </div>
            <div className="grid gap-7 md:grid-cols-[184px_minmax(0,1fr)]">
              <div>
                <div
                  className="growth-scope rounded-md border border-border bg-card p-3 text-card-foreground"
                  {...growthTarget({
                    id: "clone-step-outline",
                    title: "Show the steps ahead",
                    description:
                      "The three-step outline shows where you are and what remains, making a longer setup easier to take one step at a time.",
                    order: 1,
                  })}
                >
                  <div className="flex items-start gap-2">
                    <h2 className="text-base font-semibold">
                      Instant Voice Clone
                    </h2>
                  </div>
                  <ol
                    aria-label="Clone setup steps"
                    className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm md:flex-col"
                  >
                    {["Upload Audio", "Voice Information", "Finish up"].map(
                      (step, index) => (
                        <li
                          key={step}
                          className={cn(
                            "flex items-center gap-2",
                            index === 0
                              ? "font-medium"
                              : "text-muted-foreground",
                          )}
                          aria-current={index === 0 ? "step" : undefined}
                        >
                          <Circle
                            className={cn(
                              "size-2",
                              index === 0 && "fill-current",
                            )}
                            aria-hidden="true"
                          />
                          {step}
                        </li>
                      ),
                    )}
                  </ol>
                </div>
                {onBack && (
                  <Button
                    variant="ghost"
                    className="mt-6 px-0"
                    onClick={onBack}
                  >
                    <ArrowLeft aria-hidden="true" />
                    All voice methods
                  </Button>
                )}
              </div>
              <div className="min-w-0">
                <div
                  className="relative grid gap-4 sm:grid-cols-3"
                  {...growthTarget({
                    id: "clone-quality-guidance",
                    title: "Help you prepare",
                    description:
                      "Recording tips appear before the upload, so you can prepare cleaner audio and give your first voice clone a better starting point.",
                    order: 2,
                  })}
                >
                  {tips.map(({ Icon, title, text }) => (
                    <div
                      key={title}
                      className="growth-scope min-w-0 rounded-md border border-border bg-card p-3 text-card-foreground"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-medium">{title}</h3>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex min-h-[248px] flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-surface-sunken px-4 py-6 text-center">
                  {sample ? (
                    <>
                      <FileAudio
                        className="mb-3 size-8 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium">
                        Sample audio · 12 seconds
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Local sample state. No audio has been recorded or
                        uploaded.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-5"
                        onClick={() => {
                          setSample(false);
                          setBoundary("");
                        }}
                      >
                        Remove sample
                      </Button>
                    </>
                  ) : (
                    <>
                      <Upload
                        className="mb-4 size-8 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <Button
                        variant="ghost"
                        className="h-auto whitespace-normal px-0 py-1"
                        onClick={() =>
                          setBoundary(
                            "The upload target was inspected without adding a file. Use the local sample below to demonstrate the input requirement.",
                          )
                        }
                      >
                        Click to upload, or drag and drop
                      </Button>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Audio or video files up to 10 MB each
                      </p>
                      <span className="my-3 text-xs text-muted-foreground">
                        or
                      </span>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setBoundary(
                            "Recording was not inspected. This wireframe does not request microphone access.",
                          )
                        }
                      >
                        <Mic aria-hidden="true" />
                        Record audio
                      </Button>
                    </>
                  )}
                </div>
                <div
                  className="growth-scope mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-card p-3 text-card-foreground"
                  {...growthTarget({
                    id: "clone-input-requirement",
                    title: "Show the minimum needed",
                    description:
                      "The ten-second minimum sits beside the disabled Next button, so you can see how much audio you need to continue.",
                    order: 3,
                  })}
                >
                  <p className="flex items-center gap-2 text-sm">
                    {sample ? (
                      <Check className="size-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <Circle
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    10 seconds of audio required
                  </p>

                  <Button
                    disabled={!sample}
                    onClick={() =>
                      setBoundary(
                        "Voice Information and Finish up were listed as later steps, but their contents were not inspected. No clone has been created.",
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
                {!sample && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-muted-foreground"
                    onClick={() => {
                      setSample(true);
                      setBoundary("");
                    }}
                  >
                    Use a local sample to try this step
                  </Button>
                )}
                {boundary && (
                  <div className="mt-5">
                    <Boundary onDismiss={() => setBoundary("")}>
                      {boundary}
                    </Boundary>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

const voices = [
  {
    name: "Bunty – Funny Best Friend",
    category: "Characters",
    language: "Hindi",
    languages: 17,
  },
  {
    name: "Raju – Clear, Natural and Warm",
    category: "Conversational",
    language: "Hindi",
    languages: 19,
  },
  {
    name: "Reyaansh – Deep Premium Brand Ad",
    category: "Advertisement",
    language: "Hindi",
    languages: 15,
  },
  {
    name: "Vikram S – Gripping Documentary H…",
    category: "Narration",
    language: "Hindi",
    languages: 16,
  },
  {
    name: "Misha – Vibrant & Lively Influencer",
    category: "Social Media",
    language: "Hindi",
    languages: 19,
  },
  {
    name: "Monika Sogam – Deep and Clear",
    category: "Conversational",
    language: "Hindi",
    languages: 17,
  },
];
const categories = [
  "Conversational",
  "Narration",
  "Characters",
  "Social Media",
  "Educational",
  "Advertisement",
  "Entertainment",
];
const collections = [
  { title: "Great voices for Eleven v4", filter: "All" },
  { title: "Popular Tiktok voices", filter: "Social Media" },
  { title: "Studio-Quality Conversational Voices", filter: "Conversational" },
];

function VoiceDiscovery() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("all");
  const [preview, setPreview] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [boundary, setBoundary] = useState("");
  const filtered = voices.filter(
    (voice) =>
      voice.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "All" || voice.category === category) &&
      (language === "all" || voice.language === language),
  );
  return (
    <VoicePage section="Explore">
      <div
        className="mt-4"
        {...growthTarget({
          id: "voice-discovery-filters",
          title: "Find a suitable voice",
          description:
            "Search and filters for language and purpose help you narrow the library to voices that could suit your project.",
          order: 1,
        })}
      >
        <div className="flex items-center gap-2">
          <div className="growth-scope relative min-w-0 flex-1 rounded-md bg-surface-sunken text-foreground">
            <Label htmlFor={searchId} className="sr-only">
              Search library voices
            </Label>
            <Search
              className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id={searchId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search library voices…"
              className="pl-9 focus-visible:outline-ring-inverse"
            />
          </div>
          <Button
            variant="outline"
            className="growth-scope bg-card focus-visible:outline-ring-inverse"
            aria-label="Reset voice filters"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setLanguage("all");
              setSelectedCollection("");
            }}
          >
            Reset
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger
              className="growth-scope w-36 focus-visible:outline-ring-inverse"
              aria-label="Voice language"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="growth-scope">
              <SelectItem value="all">Language</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "secondary" : "outline"}
              className={cn(
                "growth-scope px-3 focus-visible:outline-ring-inverse",
                category !== item && "bg-card",
              )}
              aria-pressed={category === item}
              onClick={() => {
                setCategory(category === item ? "All" : item);
                setSelectedCollection("");
              }}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div
        className="growth-scope mt-6 rounded-md border border-border bg-card p-3 text-card-foreground"
        {...growthTarget({
          id: "voice-trending-discovery",
          title: "Offer a short list",
          description:
            "Trending voices give you a few options to start with. Preview and Add let you listen before choosing.",
          order: 2,
        })}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-base font-medium">
            {selectedCollection || "Trending voices"}
          </h3>
          <span className="text-xs text-muted-foreground" role="status">
            {filtered.length} voices
          </span>
        </div>
        <div className="mt-4 grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((voice) => (
            <div key={voice.name} className="flex min-w-0 gap-3">
              <Button
                variant="outline"
                className="size-14 shrink-0 rounded-md bg-surface-sunken p-0"
                aria-label={`${preview === voice.name ? "Stop" : "Preview"} ${voice.name}`}
                aria-pressed={preview === voice.name}
                onClick={() =>
                  setPreview(preview === voice.name ? "" : voice.name)
                }
              >
                {preview === voice.name ? (
                  <Pause aria-hidden="true" />
                ) : (
                  <Play aria-hidden="true" />
                )}
              </Button>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-5">{voice.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {voice.category}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {voice.language}{" "}
                  <span className="ml-1">+{voice.languages}</span>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 h-7 px-0 text-xs underline underline-offset-4"
                  onClick={() =>
                    setBoundary(
                      "Add was available but was not activated during inspection. This wireframe does not add a voice to your account.",
                    )
                  }
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <Card className="mt-4 p-6 text-sm">
            <p>No captured voices match these filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLanguage("all");
              }}
            >
              Clear filters
            </Button>
          </Card>
        )}
        {preview && (
          <p
            role="status"
            className="mt-4 rounded-md border border-border bg-surface-sunken p-3 text-xs leading-5"
          >
            Preview selected: {preview}. Audio is represented by the play state;
            no recording is included in this wireframe.
          </p>
        )}
      </div>
      {boundary && (
        <div className="mt-4">
          <Boundary onDismiss={() => setBoundary("")}>{boundary}</Boundary>
        </div>
      )}
      <div
        className="mt-7"
        {...growthTarget({
          id: "voice-curated-collections",
          title: "Group voices by purpose",
          description:
            "Handpicked collections group voices by use, giving you a place to start even when you do not know a voice name.",
          order: 3,
        })}
      >
        <h3 className="flex items-center gap-2 text-base font-medium">
          Handpicked for your use case
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {collections.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={cn(
                "growth-scope flex min-h-36 items-center gap-3 rounded-md border border-border bg-surface-raised p-3 text-foreground text-left hover:bg-secondary",
                focusClass,
                "focus-visible:outline-ring-inverse",
              )}
              onClick={() => {
                setSelectedCollection(item.title);
                setCategory(item.filter);
                setQuery("");
                setPreview("");
              }}
            >
              <div
                className="flex h-28 w-[42%] shrink-0 items-center justify-center rounded-sm border border-dashed border-border bg-surface-sunken"
                aria-hidden="true"
              >
                {index === 0 ? (
                  <AudioLines className="size-7 text-muted-foreground" />
                ) : index === 1 ? (
                  <Mic className="size-7 text-muted-foreground" />
                ) : (
                  <Headphones className="size-7 text-muted-foreground" />
                )}
              </div>
              <span className="flex min-w-0 flex-1 flex-col gap-5 text-sm font-semibold leading-5">
                {item.title}
                <ArrowRight className="size-4 self-end" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
        {selectedCollection && (
          <p
            role="status"
            className="mt-3 text-xs leading-5 text-muted-foreground"
          >
            Showing the captured voices that match this use case. The source’s
            collection contents and ranking were not inspected.
          </p>
        )}
      </div>
      <div
        className="mt-8 border-t border-border pt-5"
        aria-label="Additional library content"
      >
        <p className="text-sm text-muted-foreground">Talking Avatars</p>
        <div className="mt-3 grid grid-cols-3 gap-3" aria-hidden="true">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-20 rounded-md border border-border bg-surface-sunken"
            />
          ))}
        </div>
      </div>
    </VoicePage>
  );
}

function EarningsChecklist() {
  const [boundary, setBoundary] = useState("");
  return (
    <VoicePage section="Payouts" earnings>
      <div
        className="growth-scope rounded-md border border-border bg-card p-3 text-card-foreground"
        {...growthTarget({
          id: "voice-earnings-incentive",
          title: "Explain how you can earn",
          description:
            "The earnings message gives voice owners a reason to share a voice: the chance to earn when paid customers use it.",
          order: 1,
        })}
      >
        <h2 className="flex items-center gap-2 text-xl font-medium tracking-tight">
          Record your voice. Get paid.
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Publish your voice to the Voice Library and earn every time it is used
          by a paid user.
        </p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)]">
        <div
          className="growth-scope rounded-md border border-border bg-card p-3 text-card-foreground"
          {...growthTarget({
            id: "voice-contributor-checklist",
            title: "Show the next task",
            description:
              "Three setup tasks and a progress count show what remains before publishing. Only the first action is available, keeping the next step clear.",
            order: 2,
          })}
        >
          <div className="mb-4 flex items-center justify-between text-sm">
            <h3 className="flex items-center gap-2 font-medium">Get Started</h3>
            <span className="text-muted-foreground">0 / 3</span>
          </div>
          <ol className="space-y-3">
            <li className="rounded-md border border-border-strong bg-surface-raised p-3">
              <div className="flex gap-2 text-sm">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs"
                  aria-hidden="true"
                >
                  1
                </span>
                <span className="pt-1">Create a Professional Voice Clone</span>
              </div>
              <div className="mt-8 flex justify-end">
                <PatternLink
                  id={links.gate}
                  variant="outline"
                  className="h-8 px-3 text-xs"
                >
                  Create Voice
                </PatternLink>
              </div>
            </li>
            {["Create Payout Account", "Publish Your Voice"].map(
              (step, index) => (
                <li
                  key={step}
                  className="flex min-h-14 items-center gap-2 rounded-md border border-border bg-surface-sunken p-3 text-sm text-muted-foreground"
                >
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs"
                    aria-hidden="true"
                  >
                    {index + 2}
                  </span>
                  {step}
                  <LockKeyhole
                    className="ml-auto size-3.5 shrink-0"
                    aria-label="Requires the previous step"
                  />
                </li>
              ),
            )}
          </ol>
          <Button
            variant="ghost"
            className="mt-4 h-auto w-full whitespace-normal px-1 py-2 text-xs underline underline-offset-4"
            onClick={() =>
              setBoundary(
                "The Voice Library Addendum was linked from onboarding. Its terms and later payout setup were not inspected.",
              )
            }
          >
            Voice Library Addendum to our Terms
          </Button>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium">Payouts</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {["Current Period", "All Time Payouts"].map((label) => (
              <Card
                key={label}
                className="flex flex-wrap items-center justify-between gap-2 p-3 text-xs"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className="rounded-sm bg-surface-sunken px-2 py-1">
                  — USD
                </span>
              </Card>
            ))}
          </div>
          <Card
            className="growth-scope mt-3 flex min-h-60 flex-col items-center justify-center p-6 text-center"
            {...growthTarget({
              id: "voice-earnings-empty-state",
              title: "Give empty reports a purpose",
              description:
                "The empty payout panel points you back to setup, giving you a useful next step before you have any earnings to view.",
              order: 3,
            })}
          >
            <Wallet
              className="mb-5 size-8 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">No payouts yet</p>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Complete the onboarding steps to start earning.
            </p>
          </Card>
        </div>
      </div>
      {boundary && (
        <div className="mt-5">
          <Boundary onDismiss={() => setBoundary("")}>{boundary}</Boundary>
        </div>
      )}
    </VoicePage>
  );
}

const opportunityRows = [
  {
    language: "English",
    accent: "American",
    category: "Conversational",
    voices: 1316,
    score: 97,
    trend: "up",
  },
  {
    language: "English",
    accent: "American",
    category: "Social Media",
    voices: 322,
    score: 97,
    trend: "down",
  },
  {
    language: "English",
    accent: "American",
    category: "Narration",
    voices: 1799,
    score: 97,
    trend: "steady",
  },
  {
    language: "English",
    accent: "American",
    category: "Characters",
    voices: 297,
    score: 97,
    trend: "up",
  },
  {
    language: "English",
    accent: "American",
    category: "Advertisement",
    voices: 165,
    score: 97,
    trend: "up",
  },
  {
    language: "Spanish",
    accent: "Latin American",
    category: "Advertisement",
    voices: 31,
    score: 97,
    trend: "up",
  },
  {
    language: "English",
    accent: "American",
    category: "Entertainment",
    voices: 143,
    score: 97,
    trend: "up",
  },
  {
    language: "Spanish",
    accent: "Latin American",
    category: "Narration",
    voices: 344,
    score: 96,
    trend: "up",
  },
  {
    language: "Portuguese",
    accent: "Brazilian",
    category: "Narration",
    voices: 216,
    score: 96,
    trend: "up",
  },
  {
    language: "Spanish",
    accent: "Latin American",
    category: "Social Media",
    voices: 70,
    score: 96,
    trend: "up",
  },
  {
    language: "Arabic",
    accent: "Modern Standard",
    category: "Characters",
    voices: 0,
    score: 96,
    trend: "up",
  },
];
function Opportunities() {
  const [language, setLanguage] = useState("all");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"source" | "supply">("source");
  const rows = useMemo(
    () =>
      opportunityRows
        .map((row, index) => ({ ...row, rank: index + 1 }))
        .filter(
          (row) =>
            (language === "all" || row.language === language) &&
            (category === "All" || row.category === category),
        )
        .sort((a, b) =>
          sort === "source" ? a.rank - b.rank : a.voices - b.voices,
        ),
    [language, category, sort],
  );
  return (
    <VoicePage section="Opportunities" earnings>
      <h2 className="flex items-center gap-2 text-xl font-medium tracking-tight">
        Opportunities
      </h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Discover voices in high demand and low competition.
      </p>
      <div
        className="mt-6 flex flex-wrap items-center gap-2"
        {...growthTarget({
          id: "voice-opportunity-filters",
          title: "Find relevant opportunities",
          description:
            "Language and category filters help you focus on voice types you could offer, making the list easier to compare.",
          order: 1,
        })}
      >
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger
            className="growth-scope w-36 focus-visible:outline-ring-inverse"
            aria-label="Opportunity language"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="growth-scope">
            <SelectItem value="all">Language</SelectItem>
            {["English", "Spanish", "Portuguese", "Arabic"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {categories.map((item) => (
          <Button
            key={item}
            variant={category === item ? "secondary" : "outline"}
            className={cn(
              "growth-scope px-3 focus-visible:outline-ring-inverse",
              category !== item && "bg-card",
            )}
            aria-pressed={category === item}
            onClick={() => setCategory(category === item ? "All" : item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div
        className="growth-scope relative mt-5 w-full min-w-0 max-w-full overflow-hidden rounded-md border border-border bg-card text-card-foreground"
        {...growthTarget({
          id: "voice-supply-signals",
          title: "Compare gaps in the library",
          description:
            "Voice counts and opportunity scores sit side by side, helping you compare categories and consider where your voice might add something different.",
          order: 2,
        })}
      >
        <Table className="min-w-[660px] text-xs">
          <caption className="sr-only">
            Captured voice supply opportunities. Scores are source-provided
            signals; their calculation and predictive value are unverified.
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead className="px-3">#</TableHead>
              <TableHead className="px-3">Language</TableHead>
              <TableHead className="px-3">Accent</TableHead>
              <TableHead className="px-3">Category</TableHead>
              <TableHead
                className="px-3"
                aria-sort={sort === "supply" ? "ascending" : "none"}
              >
                <button
                  type="button"
                  className={cn(
                    "flex min-h-8 items-center gap-1 text-left",
                    focusClass,
                  )}
                  onClick={() =>
                    setSort(sort === "supply" ? "source" : "supply")
                  }
                >
                  Library voices{" "}
                  {sort === "supply" && (
                    <ArrowUp className="size-3" aria-hidden="true" />
                  )}
                </button>
              </TableHead>
              <TableHead className="px-3">Opportunity Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.rank}>
                <TableCell className="px-3 py-3 text-muted-foreground">
                  {row.rank}
                </TableCell>
                <TableCell className="px-3 py-3">{row.language}</TableCell>
                <TableCell className="px-3 py-3 text-muted-foreground">
                  {row.accent}
                </TableCell>
                <TableCell className="px-3 py-3 text-muted-foreground">
                  {row.category}
                </TableCell>
                <TableCell className="px-3 py-3 text-center text-muted-foreground">
                  {row.voices.toLocaleString("en-US")}
                </TableCell>
                <TableCell className="px-3 py-3">
                  <Badge
                    variant="outline"
                    className="rounded-full px-2 text-xs"
                  >
                    <span className="sr-only">
                      {row.trend === "steady"
                        ? "Unchanged"
                        : row.trend === "up"
                          ? "Increasing"
                          : "Decreasing"}
                      :
                    </span>
                    {row.trend === "up" ? (
                      <ArrowUp className="size-3" aria-hidden="true" />
                    ) : row.trend === "down" ? (
                      <ArrowDown className="size-3" aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true">—</span>
                    )}
                    {row.score}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {rows.length === 0 && (
        <div role="status" className="mt-3">
          <p className="text-sm text-muted-foreground">
            No captured opportunities match these filters.
          </p>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => {
              setLanguage("all");
              setCategory("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Captured on 4 October 2026. These are the source’s opportunity signals,
        not verified demand or predicted earnings.
      </p>
    </VoicePage>
  );
}

export function VoiceWireframe({ patternId }: { patternId: string }) {
  if (!voicePatternIds.includes(patternId)) return null;
  switch (patternId) {
    case "el-voice-pathway-effort-guidance":
      return <CreationDialog />;
    case "el-professional-clone-capability-gate":
      return <CreationDialog gate />;
    case "el-voice-design-prompt-starters":
      return <CreationDialog initialStage="design" />;
    case "el-instant-clone-guided-prerequisites":
      return <CloneSetup />;
    case "el-curated-voice-discovery":
      return <VoiceDiscovery />;
    case "el-voice-supplier-earnings-checklist":
      return <EarningsChecklist />;
    case "el-demand-guided-voice-supply":
      return <Opportunities />;
    default:
      return <Boundary>This voice pattern has no captured wireframe.</Boundary>;
  }
}
