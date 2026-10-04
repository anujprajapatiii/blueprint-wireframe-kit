import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Check,
  ChevronRight,
  CircleHelp,
  FileAudio,
  Film,
  Home,
  Image,
  Layers3,
  MessageSquare,
  Mic,
  Music,
  Pause,
  Play,
  Search,
  Sparkles,
  ThumbsUp,
  WandSparkles,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
} from "../../components/kit";
import { ImagePlaceholder } from "../../components/patterns";
import { growthTarget } from "../../components/growth-education";
import { relatedExperimentHref as url } from "./navigation";
import "./creation.css";

export const creationPatternIds = [
  "el-v4-discovery-to-trial",
  "el-adjacent-tool-discovery",
  "el-image-video-example-to-action",
];

const links = {
  home: "el-v4-discovery-to-trial",
  speech: "el-adjacent-tool-discovery",
  music: null,
  sound: null,
  visual: "el-image-video-example-to-action",
};
const smallButton = "h-8 px-2.5 text-xs";

function Shell({
  children,
  current,
  announcement,
  onChat,
}: {
  children: ReactNode;
  current: string;
  announcement?: ReactNode;
  onChat?: () => void;
}) {
  const [contextNotice, setContextNotice] = useState("");
  const nav = [
    [Home, "Home", links.home],
    [MessageSquare, "Chat", links.home],
    [AudioLines, "Text to Speech", links.speech],
    [Music, "Music", links.music],
    [AudioLines, "Sound Effects", links.sound],
    [Film, "Image & Video", links.visual],
  ] as const;
  return (
    <div className="el-create-shell bg-background text-foreground">
      <aside className="el-create-sidebar border-r border-border bg-surface-sunken">
        <p className="px-3 py-4 text-sm font-semibold">Creative workspace</p>
        <nav aria-label="Creative tools" className="space-y-1 px-2">
          {nav.map(([Icon, label, id]) => (
            <Button
              key={label}
              variant={current === label ? "secondary" : "ghost"}
              asChild={Boolean(id) && (label !== "Chat" || !onChat)}
              className="h-9 w-full justify-start px-2 text-xs"
              {...(label === "Chat" && onChat
                ? { onClick: onChat }
                : !id
                  ? {
                      onClick: () =>
                        setContextNotice(
                          `${label} is surrounding product context. Its ordinary creation flow is outside this growth experiment.`,
                        ),
                    }
                  : {})}
            >
              {(label === "Chat" && onChat) || !id ? (
                <>
                  <Icon aria-hidden="true" />
                  {label}
                </>
              ) : (
                <a href={url(id)} target="_top">
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              )}
            </Button>
          ))}
        </nav>
        <div
          className="mt-5 space-y-4 px-4 text-xs text-muted-foreground"
          aria-hidden="true"
        >
          <p>Assets</p>
          <p>Studio</p>
          <p>Flows</p>
          <div className="h-px bg-border" />
          <p>Voice creation</p>
          <p>Dubbing</p>
          <p>Audiobooks</p>
        </div>
        <div className="mt-auto px-4 py-5 text-xs text-muted-foreground">
          Workspace
        </div>
      </aside>
      <div className="min-w-0">
        {announcement}
        <div className="el-create-topbar flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-xs">
          <p className="flex min-w-0 items-center gap-2">
            <Layers3 className="size-4 shrink-0" aria-hidden="true" />
            <span>{current}</span>
          </p>
          <div
            className="hidden w-1/3 items-center gap-2 rounded-md border border-border px-2 py-1.5 text-muted-foreground sm:flex"
            aria-hidden="true"
          >
            <Search className="size-3" />
            Search everything…
          </div>
          <span className="text-muted-foreground">Workspace</span>
        </div>
        {contextNotice && (
          <p
            role="status"
            className="mx-4 mt-4 rounded-md border border-border bg-surface-sunken p-3 text-sm text-muted-foreground"
          >
            {contextNotice}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

function Waveform({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 36"
      preserveAspectRatio="none"
      className={cn("h-8 w-full text-border-strong", className)}
      aria-hidden="true"
    >
      {Array.from({ length: 45 }, (_, i) => (
        <path
          key={i}
          d={`M${i * 4 + 2} ${18 - (3 + ((i * 17) % 27)) / 2}v${3 + ((i * 17) % 27)}`}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

function LaunchBanner({
  onTry,
  onDismiss,
}: {
  onTry: () => void;
  onDismiss: () => void;
}) {
  return (
    <div
      {...growthTarget({
        id: "model-announcement",
        title: "Put discovery in the path of work",
        description:
          "This announcement exposes an existing user to a new model. Try it out takes the user directly into the speech workspace with v4 selected; adoption and quality are not measured.",
        order: 1,
      })}
      className="growth-scope flex items-center justify-center gap-3 border-b border-border-strong bg-secondary text-secondary-foreground px-3 py-2 text-center text-xs"
    >
      <p className="flex-1">
        Eleven v4 is here — our fastest and most emotive voice model yet.{" "}
        <button
          onClick={onTry}
          className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
        >
          Try it out
        </button>
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="size-6"
        onClick={onDismiss}
        aria-label="Dismiss model announcement"
      >
        <X />
      </Button>
    </div>
  );
}

function LaunchFeature({ onTry }: { onTry: () => void }) {
  const [details, setDetails] = useState(false);
  return (
    <section
      {...growthTarget({
        id: "model-feature",
        title: "Connect the benefit to a trial",
        description:
          "The feature card pairs a short model proposition with a direct Try v4 action. Learn more offers a lower-commitment way to inspect the claim before switching tools.",
        order: 3,
      })}
      className="growth-scope el-create-launch min-w-0 rounded-md border border-border bg-card text-card-foreground"
    >
      <div className="hidden space-y-2 p-5 text-xs text-muted-foreground lg:block">
        <p>Inline voice control</p>
        <p>Consistent speaker identity</p>
        <p>Seamless regenerations</p>
        <p>Better multilingual quality</p>
        <p>More expressive voices</p>
      </div>
      <div className="flex flex-col items-center justify-center p-5 text-center">
        <h2 className="flex items-center gap-2 text-lg font-medium">
          Introducing Eleven v4
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Our fastest and most emotive voice model yet.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Button size="sm" className={smallButton} onClick={onTry}>
            Try v4
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={smallButton}
            aria-expanded={details}
            onClick={() => setDetails(!details)}
          >
            Learn more
          </Button>
        </div>
        {details && (
          <p className="mt-3 max-w-64 text-xs leading-5">
            Our fastest and most emotive model. Supports 90+ languages.
          </p>
        )}
      </div>
      <div
        className="hidden items-center justify-center border-l border-border bg-surface-sunken md:flex"
        aria-hidden="true"
      >
        <AudioLines className="size-12 text-muted-foreground" />
      </div>
    </section>
  );
}

const suggestions = [
  [
    "Product launch voiceover",
    "Write and produce a clear, professional voiceover for a product launch.",
  ],
  [
    "Podcast intro music",
    "Compose a distinctive intro theme for a podcast or show.",
  ],
  [
    "Images for a blog post",
    "Create polished images to accompany an article or blog post.",
  ],
  [
    "Product explainer video",
    "Produce a concise video that explains a product or service.",
  ],
] as const;

function HomeWireframe({ launch = false }: { launch?: boolean }) {
  const [view, setView] = useState<"home" | "chat" | "speech">("home");
  const [banner, setBanner] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [tab, setTab] = useState("Quickstarts");
  const [speechModel, setSpeechModel] = useState("Eleven v4");
  const [contextNotice, setContextNotice] = useState("");
  const tryModel = () => {
    setSpeechModel("Eleven v4");
    setView("speech");
  };
  if (view === "speech")
    return (
      <SpeechWireframe
        initialModel={speechModel}
        growthFocus="model-trial"
        onBack={() => setView("home")}
      />
    );
  const tasks = [
    [AudioLines, "Speech", links.speech],
    [Music, "Music", links.music],
    [Mic, "Voice Clone", "el-professional-clone-capability-gate"],
    [Image, "Image", links.visual],
    [Film, "Video", links.visual],
    [FileAudio, "Dubbing", "el-dubbing-launch-sample-entry"],
  ] as const;
  return (
    <Shell
      current={view === "chat" ? "Chat" : "Home"}
      onChat={() => setView("chat")}
      announcement={
        banner && (
          <LaunchBanner onTry={tryModel} onDismiss={() => setBanner(false)} />
        )
      }
    >
      <div className="el-create-home">
        {view === "chat" && (
          <Button
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={() => setView("home")}
          >
            <ArrowLeft />
            Home
          </Button>
        )}
        <section className="el-create-goal" aria-label="Creation goal">
          <h1 className="text-center text-2xl font-medium tracking-tight">
            What would you like to create?
          </h1>
          <div className="mt-5 flex items-center gap-2 rounded-full border border-border-strong bg-card text-card-foreground p-2 shadow-sm">
            <Sparkles
              className="ml-2 size-5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              aria-label="What would you like to create?"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Make a podcast intro with music..."
              className="h-9 border-0 bg-transparent px-1 text-xs shadow-none"
            />
            <Badge className="hidden text-xs sm:inline-flex">Alpha</Badge>
            <Button
              size="icon"
              className="size-8 rounded-full"
              disabled
              aria-label="Submit creation prompt — unavailable in this wireframe"
            >
              <ArrowRight />
            </Button>
          </div>
        </section>
        {view === "home" ? (
          <>
            <div
              className="el-create-task-grid"
              aria-label="Creation shortcuts"
            >
              {tasks.map(([Icon, label, id]) => {
                const className =
                  "flex flex-col items-center gap-2 rounded-md bg-card p-2 text-xs text-card-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
                const content = (
                  <>
                    <span className="flex size-9 items-center justify-center rounded-md border border-border bg-card">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {label}
                  </>
                );
                return id ? (
                  <a
                    key={label}
                    href={url(id)}
                    target="_top"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    key={label}
                    type="button"
                    className={className}
                    onClick={() =>
                      setContextNotice(
                        `${label} is surrounding product context. Its ordinary creation flow is outside this growth experiment.`,
                      )
                    }
                  >
                    {content}
                  </button>
                );
              })}
            </div>
            {contextNotice && (
              <p role="status" className="mt-3 text-sm text-muted-foreground">
                {contextNotice}
              </p>
            )}
            <LaunchFeature onTry={tryModel} />
            <div className="mt-8 flex gap-2" aria-label="Home content">
              {["Recents", "Quickstarts"].map((item) => (
                <Button
                  key={item}
                  variant={tab === item ? "secondary" : "ghost"}
                  size="sm"
                  className={smallButton}
                  aria-pressed={tab === item}
                  onClick={() => setTab(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            {tab === "Recents" ? (
              <div className="mt-3 rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
                Recent work
              </div>
            ) : (
              <SuggestionGrid setPrompt={setPrompt} />
            )}
          </>
        ) : (
          <div className="el-create-chat-suggestions">
            <p className="mb-2 text-xs text-muted-foreground">Suggestions</p>
            <SuggestionGrid setPrompt={setPrompt} />
          </div>
        )}
        {launch && (
          <p className="sr-only">
            The model launch can be explored from either the announcement or
            feature card.
          </p>
        )}
      </div>
    </Shell>
  );
}

function SuggestionGrid({ setPrompt }: { setPrompt: (value: string) => void }) {
  return (
    <div className="relative mt-3 grid gap-2 sm:grid-cols-2">
      {suggestions.map(([title, description]) => (
        <Button
          key={title}
          variant="outline"
          className="h-auto min-w-0 flex-col items-start gap-1 whitespace-normal bg-card px-3 py-3 text-left"
          onClick={() => setPrompt(description)}
        >
          <span className="text-xs font-medium">{title}</span>
          <span className="text-xs font-normal leading-5 text-muted-foreground">
            {description}
          </span>
        </Button>
      ))}
    </div>
  );
}

const models = [
  {
    name: "Eleven v4",
    description: "Our fastest and most emotive model. Supports 90+ languages.",
    languages: ["Afrikaans", "Arabic", "Armenian", "+82 more…"],
  },
  {
    name: "Eleven v3",
    description:
      "Our highly expressive model. Supports 70+ languages. Requires more prompt engineering than our previous models.",
    languages: ["Afrikaans", "Arabic", "Armenian", "+71 more…"],
  },
  {
    name: "Eleven Multilingual v2",
    description:
      "Our most life-like, emotionally rich mode in 29 languages. Best for voice overs, audiobooks, post-production, or any other content creation needs.",
    languages: ["English", "Japanese", "Chinese", "+26 more…"],
    recommended: true,
  },
];

function SpeechWireframe({
  initialModel = "Eleven v3",
  initialSelector = false,
  growthFocus = "adjacent-tool",
  onBack,
}: {
  initialModel?: string;
  initialSelector?: boolean;
  growthFocus?: "model-trial" | "adjacent-tool";
  onBack?: () => void;
}) {
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selector, setSelector] = useState(initialSelector);
  const [promotion, setPromotion] = useState(true);
  const [expandedModels, setExpandedModels] = useState(false);
  const [stability, setStability] = useState([0]);
  const [setting, setSetting] = useState<string | null>(null);
  const [language, setLanguage] = useState("Automatic");
  const [voice, setVoice] = useState("Red");
  const [text, setText] = useState("");
  return (
    <Shell current="Text to Speech">
      <div className="el-create-speech">
        <section className="el-create-editor p-5">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft />
                Home
              </Button>
            )}
            <h1 className="text-lg font-medium">Text to Speech</h1>
          </div>
          <Textarea
            aria-label="Text to turn into speech"
            placeholder="Start typing or paste your text here…"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-64 resize-y border-0 bg-transparent p-0 shadow-none"
          />
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              {text.length} characters
            </span>
            <Button size="sm" disabled>
              Generate speech
            </Button>
          </div>
        </section>
        <section
          className={cn(
            "el-create-settings border-l border-border p-4",
            selector && "bg-card text-card-foreground",
          )}
          aria-label={selector ? "Select a model" : "Speech settings"}
        >
          {selector ? (
            <>
              <div className="mb-3 flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="size-7"
                  aria-label="Back to speech settings"
                  onClick={() => setSelector(false)}
                >
                  <ArrowLeft />
                </Button>
                <h2 className="flex items-center gap-2 text-sm font-medium">
                  Select a model
                </h2>
              </div>
              <div className="space-y-3">
                {models.map((model) => (
                  <Button
                    key={model.name}
                    variant="outline"
                    aria-pressed={selectedModel === model.name}
                    className="h-auto w-full flex-col items-stretch gap-0 overflow-hidden whitespace-normal p-0 text-left"
                    onClick={() => {
                      setSelectedModel(model.name);
                      setSelector(false);
                    }}
                  >
                    <span className="space-y-2 p-3">
                      <span className="flex flex-wrap items-center gap-2 text-sm">
                        <span>{model.name}</span>
                        {model.recommended && (
                          <Badge className="text-xs">Studio Quality</Badge>
                        )}
                        {selectedModel === model.name && (
                          <Check
                            className="ml-auto size-4"
                            aria-label="Current model"
                          />
                        )}
                      </span>
                      <span className="block text-xs font-normal leading-5 text-muted-foreground">
                        {model.description}
                      </span>
                      <span className="flex flex-wrap gap-1">
                        {model.languages.map((item) => (
                          <Badge
                            key={item}
                            className="rounded-full text-[11px] font-normal"
                          >
                            {item}
                          </Badge>
                        ))}
                      </span>
                    </span>
                    {model.recommended && (
                      <span className="flex items-center gap-2 border-t border-border bg-secondary px-3 py-2 text-xs font-normal">
                        <ThumbsUp aria-hidden="true" />
                        Recommended for{" "}
                        <span className="font-medium">{voice}</span>
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full"
                aria-expanded={expandedModels}
                onClick={() => setExpandedModels(!expandedModels)}
              >
                {expandedModels ? "Show fewer models" : "Show all models"}
              </Button>
              {expandedModels && (
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Additional model options were not captured in this reference.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="mb-4 border-b border-border pb-3 text-sm font-medium">
                Settings
              </h2>
              {promotion && (
                <div
                  {...(growthFocus === "adjacent-tool"
                    ? growthTarget({
                        id: "adjacent-tool-promotion",
                        title: "Introduce an adjacent use case in context",
                        description:
                          "The Image & Video promotion sits beside speech settings, where an existing creator is already working. It connects to a related tool without replacing the current editor; the dismiss action keeps that work available.",
                        order: 1,
                      })
                    : {})}
                  className={cn(
                    "mb-5 flex items-center gap-3 rounded-md border border-border bg-card text-card-foreground p-2",
                    growthFocus === "adjacent-tool" && "growth-scope",
                  )}
                >
                  <span
                    className="flex size-14 shrink-0 items-center justify-center rounded-md border border-border bg-surface-sunken"
                    aria-hidden="true"
                  >
                    <Film className="size-6" />
                  </span>
                  <a
                    href={url(links.visual)}
                    target="_top"
                    className="min-w-0 rounded-sm text-xs leading-5 focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <span className="font-medium">
                      Introducing Image & Video generation
                    </span>
                    <span className="block text-muted-foreground">
                      Generate images, videos and lipsync with your favorite
                      models in a seamless flow.
                    </span>
                  </a>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 shrink-0"
                    aria-label="Dismiss Image & Video promotion"
                    onClick={() => setPromotion(false)}
                  >
                    <X />
                  </Button>
                </div>
              )}
              <Label htmlFor="el-create-voice">Voice</Label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger
                  id="el-create-voice"
                  className="mt-2 h-9 text-xs"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Red">Red</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-5">
                <Label>Model</Label>
                <Button
                  variant="outline"
                  className="mt-2 h-9 w-full justify-between rounded-b-none bg-card text-xs"
                  onClick={() => setSelector(true)}
                >
                  {selectedModel}
                  <ChevronRight />
                </Button>
                <div
                  {...(growthFocus === "model-trial"
                    ? growthTarget({
                        id: "model-trial",
                        title: "Offer a trial beside the existing choice",
                        description:
                          "The promoted Eleven v4 model has a direct Try action beneath the ordinary model picker. It lets an existing user try a newly announced capability without leaving their speech workspace. The editor and model settings are surrounding product context.",
                        order: 1,
                      })
                    : {})}
                  className={cn(
                    "flex flex-wrap items-center justify-between gap-2 rounded-b-md border border-t-0 border-border bg-secondary text-secondary-foreground px-2 py-2 text-xs",
                    growthFocus === "model-trial" && "growth-scope",
                  )}
                >
                  <span>Our most expressive model</span>
                  <Button
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setSelectedModel("Eleven v4")}
                  >
                    {selectedModel === "Eleven v4" ? (
                      <>
                        <Check />
                        Eleven v4 selected
                      </>
                    ) : (
                      "Try Eleven v4"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-5">
                <Label>Stability</Label>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Creative</span>
                  <span>Robust</span>
                </div>
                <Slider
                  aria-label="Stability"
                  value={stability}
                  onValueChange={setStability}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
              {["Language", "Audio effects", "Output Format"].map((name) => (
                <div key={name} className="mt-3">
                  <Button
                    variant="ghost"
                    className="h-10 w-full justify-between px-0 text-xs"
                    aria-expanded={setting === name}
                    onClick={() => setSetting(setting === name ? null : name)}
                  >
                    {name}
                    {name === "Output Format" ? (
                      <Badge className="text-[11px]">MP3 44.1kHz</Badge>
                    ) : (
                      <ChevronRight />
                    )}
                  </Button>
                  {setting === name &&
                    (name === "Language" ? (
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger aria-label="Speech language">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["Automatic", "English", "Japanese", "Chinese"].map(
                            (item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                        {name === "Output Format"
                          ? "MP3 44.1kHz (128kbps)"
                          : "No audio effects selected"}
                      </p>
                    ))}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="mt-5 ml-auto flex text-xs"
                onClick={() => {
                  setStability([0]);
                  setSelectedModel(initialModel);
                  setLanguage("Automatic");
                  setPromotion(true);
                }}
              >
                Reset values
              </Button>
              <p className="sr-only" role="status">
                Current model: {selectedModel}
              </p>
            </>
          )}
        </section>
      </div>
    </Shell>
  );
}

function PromptChips({
  items,
  onPick,
}: {
  items: string[];
  onPick: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 rounded-t-md bg-surface-sunken p-2">
      {items.map((item) => (
        <Button
          key={item}
          variant="outline"
          size="sm"
          className={smallButton}
          onClick={() => onPick(item)}
        >
          <WandSparkles />
          {item}
        </Button>
      ))}
    </div>
  );
}

function CategoryTiles({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div
      className="el-create-categories"
      style={{ "--el-tile-count": items.length } as CSSProperties}
    >
      {items.map((item, index) => (
        <Button
          key={item}
          variant={selected === item ? "secondary" : "outline"}
          aria-pressed={selected === item}
          className={cn(
            "growth-scope relative h-auto min-w-0 flex-col justify-end gap-4 whitespace-normal px-2 py-3 text-left focus-visible:outline-ring-inverse",
            selected !== item && "bg-card",
          )}
          onClick={() => onSelect(selected === item ? "" : item)}
        >
          <span
            aria-hidden="true"
            className="flex flex-1 items-center justify-center"
          >
            {index % 3 === 0 ? (
              <AudioLines className="size-6! text-muted-foreground" />
            ) : index % 3 === 1 ? (
              <Layers3 className="size-6! text-muted-foreground" />
            ) : (
              <Music className="size-6! text-muted-foreground" />
            )}
          </span>
          <span className="w-full text-xs">{item}</span>
        </Button>
      ))}
    </div>
  );
}

function MusicWireframe() {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [tooltip, setTooltip] = useState(true);
  const [improve, setImprove] = useState(true);
  const [duration, setDuration] = useState("1:00");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Marketplace");
  const [filter, setFilter] = useState("All");
  const tracks = [
    "Boss Move - Bold Brand Anthem",
    "Cinematic track",
    "Podcast theme",
  ];
  const visibleTracks = tracks.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Shell current="Music">
      <div className="el-create-content">
        <h1 className="text-xl font-medium">Music</h1>
        <div className="mt-3 flex gap-1 border-b border-border pb-2">
          {["Marketplace", "Generations", "Saved"].map((item) => (
            <Button
              key={item}
              size="sm"
              variant={tab === item ? "secondary" : "ghost"}
              aria-pressed={tab === item}
              className={smallButton}
              onClick={() => setTab(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div
          {...growthTarget({
            id: "music-starter",
            title: "Offer a starting point beside the cost",
            description:
              "Prompt chips make an original track easier to describe. Duration, prompt improvement, and the displayed credit estimate keep the setup and cost visible before the generation action.",
            order: 1,
          })}
          className="growth-scope el-create-music-composer relative rounded-md border border-border-strong bg-card text-card-foreground shadow-md"
        >
          <PromptChips
            items={[
              "Upbeat synthwave",
              "Acoustic folk ballad",
              "Energetic electronic dance",
            ]}
            onPick={setPrompt}
          />
          <div className="p-3">
            <Badge variant="outline" className="text-xs">
              <Music className="size-3" aria-hidden="true" />
              Generate
            </Badge>
            <Textarea
              aria-label="Music prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the music you want to create…"
              className="mt-3 min-h-20 border-0 bg-transparent px-0 py-1 text-sm"
            />
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                className={smallButton}
                aria-expanded={tooltip}
                onClick={() => setTooltip(!tooltip)}
              >
                <Music />
                v2.5
              </Button>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger
                  className="h-8 w-20 px-2 text-xs"
                  aria-label="Music duration"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="growth-scope">
                  {["0:30", "1:00", "2:00"].map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>Auto</span>
              <span className="hidden text-muted-foreground sm:inline">
                No Finetune
              </span>
              <Label htmlFor="el-music-improve" className="text-xs">
                Improve prompt
              </Label>
              <Switch
                id="el-music-improve"
                checked={improve}
                onCheckedChange={setImprove}
              />
              <span className="ml-auto text-muted-foreground">
                1,800 credits
              </span>
              <Button
                size="icon"
                className="size-8"
                disabled
                aria-label="Generate music — unavailable in this wireframe"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
          {tooltip && (
            <aside
              {...growthTarget({
                id: "music-model-introduction",
                title: "Explain a change where it is used",
                description:
                  "The anchored message introduces the new default model beside its control. It gives a reason to notice the update and can be dismissed; its quality claims have not been independently verified.",
                order: 2,
              })}
              className="el-create-model-tip rounded-md border border-border-strong bg-popover p-3 shadow-md"
            >
              <div className="flex items-start gap-2">
                <div>
                  <h2 className="text-xs font-medium">
                    Music v2.5 model is here
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Now on by default. Richer vocals, cleaner production,
                    sharper sound.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5"
                  aria-label="Dismiss Music model introduction"
                  onClick={() => setTooltip(false)}
                >
                  <X />
                </Button>
              </div>
            </aside>
          )}
        </div>
        {tab === "Marketplace" ? (
          <section
            {...growthTarget({
              id: "music-curation",
              title: "Let the task guide discovery",
              description:
                "Use-case collections and playable track entries offer a browse route alongside creation. They help a user look for a suitable existing output before investing in a new one; preview audio is not available here.",
              order: 3,
            })}
            className="relative"
          >
            <CategoryTiles
              items={[
                "Corporate",
                "Cinematic",
                "Podcasts",
                "Advertising",
                "Education",
                "Social",
                "Lifestyle",
                "Fitness",
              ]}
              selected={category}
              onSelect={setCategory}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger
                  className="h-9 w-36 text-xs"
                  aria-label="Browse music by"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All", "Genre", "Instrument", "Mood"].map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search music"
                placeholder="Search by title, genre or description"
                className="h-9 flex-1 text-xs"
              />
            </div>
            {(category || filter !== "All") && (
              <p role="status" className="mt-3 text-xs text-muted-foreground">
                {category || "All tracks"}
                {filter !== "All" ? ` · Browse by ${filter.toLowerCase()}` : ""}
              </p>
            )}
            <div className="mt-4">
              <div className="flex justify-between border-b border-border pb-2 text-xs text-muted-foreground">
                <span>Track</span>
                <span>Duration</span>
              </div>
              {visibleTracks.map((track, index) => (
                <div
                  key={track}
                  className={cn(
                    "flex items-center gap-3 border-b border-border py-3",
                    selected === track && "bg-selected",
                  )}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-full"
                    aria-pressed={selected === track}
                    aria-label={`Select preview: ${track}`}
                    onClick={() =>
                      setSelected(selected === track ? null : track)
                    }
                  >
                    {selected === track ? <Pause /> : <Play />}
                  </Button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      {category && index > 0
                        ? `${category} track ${index + 1}`
                        : track}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {selected === track
                        ? "Preview selected"
                        : category || "Music"}
                    </p>
                  </div>
                  <Waveform className="hidden max-w-44 sm:block" />
                  <span className="text-xs text-muted-foreground">1m 0s</span>
                </div>
              ))}
              {visibleTracks.length === 0 && (
                <p className="py-5 text-sm text-muted-foreground">
                  No matching tracks.
                </p>
              )}
            </div>
          </section>
        ) : (
          <div className="mt-8 rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {tab === "Saved" ? "Your saved music" : "Your music generations"}
          </div>
        )}
      </div>
    </Shell>
  );
}

function SoundWireframe() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Trending");
  const [prompt, setPrompt] = useState("");
  const [sharing, setSharing] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [looping, setLooping] = useState(false);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [tab, setTab] = useState("Explore");
  const sounds = [
    {
      title: "Card reveal",
      subtitle: "User Interface › Motion",
      downloads: 351,
    },
    {
      title:
        "A short, soft and satisfying zoom-in swoosh, gentle airy whoosh moving…",
      subtitle: "Swooshes › Whoosh",
      downloads: 567,
    },
    {
      title: "18-second fast-paced prehistoric documentary hook",
      subtitle: "Musical › Percussion",
      downloads: 174,
    },
    {
      title: "Cinematic tension",
      subtitle: "Designed › Riser",
      downloads: 548,
    },
  ];
  const visible = sounds
    .filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (tab !== "Favorites" || favorite.includes(item.title)),
    )
    .sort((a, b) => (sort === "Downloads" ? b.downloads - a.downloads : 0));
  return (
    <Shell current="Sound Effects">
      <div className="el-create-content">
        <h1 className="text-xl font-medium">Sound Effects</h1>
        <div className="mt-3 flex gap-1 border-b border-border pb-2">
          {["Explore", "History", "Favorites"].map((item) => (
            <Button
              key={item}
              size="sm"
              variant={tab === item ? "secondary" : "ghost"}
              aria-pressed={tab === item}
              className={smallButton}
              onClick={() => setTab(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <CategoryTiles
            items={[
              "Animals",
              "Bass",
              "Booms",
              "Braams",
              "Brass",
              "Cymbals",
              "Devices",
            ]}
            selected={category}
            onSelect={setCategory}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Input
            aria-label="Search sound effects"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search sound effects…"
            className="h-9 flex-1 text-xs"
          />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger
              className="h-9 w-32 text-xs"
              aria-label="Sort sound effects"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Trending">Trending</SelectItem>
              <SelectItem value="Downloads">Downloads</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          variant={looping ? "secondary" : "outline"}
          className="mt-2 h-7 px-2 text-xs"
          aria-pressed={looping}
          onClick={() => setLooping(!looping)}
        >
          Looping{looping && <Check />}
        </Button>
        {category && (
          <p role="status" className="mt-3 text-xs text-muted-foreground">
            {category} selected
          </p>
        )}
        <div
          {...growthTarget({
            id: "sound-community",
            title: "Make other creators’ outputs useful",
            description:
              "The public list gives the next creator reusable effects, previews, categories, and download counts. Those are discovery cues; they do not by themselves prove a growth loop or the quality of an effect.",
            order: 1,
          })}
          className="mt-5"
        >
          <div className="flex justify-between border-b border-border pb-2 text-xs text-muted-foreground">
            <span>Description</span>
            <span>Downloads</span>
          </div>
          {tab === "History" ? (
            <p className="py-8 text-sm text-muted-foreground">
              Your sound-effect generations
            </p>
          ) : (
            visible.map((item) => (
              <div
                key={item.title}
                className={cn(
                  "growth-scope flex min-w-0 items-center gap-3 border-b border-border bg-card text-card-foreground px-3 py-3",
                  selected === item.title &&
                    "bg-selected text-selected-foreground",
                )}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-full"
                  aria-label={`Select preview: ${item.title}`}
                  aria-pressed={selected === item.title}
                  onClick={() =>
                    setSelected(selected === item.title ? null : item.title)
                  }
                >
                  {selected === item.title ? <Pause /> : <Play />}
                </Button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">{item.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {selected === item.title
                      ? "Preview selected"
                      : item.subtitle}
                  </p>
                </div>
                <Waveform className="hidden max-w-28 md:block" />
                <span className="text-xs text-muted-foreground">
                  {item.downloads}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  aria-label={`${favorite.includes(item.title) ? "Remove favorite" : "Favorite"}: ${item.title}`}
                  aria-pressed={favorite.includes(item.title)}
                  onClick={() =>
                    setFavorite(
                      favorite.includes(item.title)
                        ? favorite.filter((value) => value !== item.title)
                        : [...favorite, item.title],
                    )
                  }
                >
                  {favorite.includes(item.title) ? <Check /> : <Sparkles />}
                </Button>
              </div>
            ))
          )}
          {tab !== "History" && visible.length === 0 && (
            <p className="py-6 text-sm text-muted-foreground">
              {tab === "Favorites"
                ? "No favorites yet."
                : "No matching sounds."}
            </p>
          )}
        </div>
        <div className="el-create-sound-composer">
          <div
            {...growthTarget({
              id: "sound-prompt-guidance",
              title: "Teach useful prompt dimensions",
              description:
                "Material and resonance suggestions show which details can shape a sound request. They prepare a local draft beside its visible cost; the quality of generated output is not tested.",
              order: 2,
            })}
            className="growth-scope rounded-md border border-border-strong bg-card text-card-foreground shadow-md"
          >
            <PromptChips
              items={[
                "Object material",
                "Surface material",
                "Resonance detail",
              ]}
              onPick={(value) =>
                setPrompt(
                  `${prompt}${prompt ? ", " : ""}${value.toLowerCase()}: `,
                )
              }
            />
            <div className="p-3">
              <Textarea
                aria-label="Sound effect description"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Describe your sound effect…"
                className="min-h-14 border-0 bg-transparent px-0 py-1"
              />
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{looping ? "Looping on" : "Looping off"}</span>
                <span>0.5s</span>
                <span>30%</span>
                <span className="ml-auto">8 credits</span>
                <Button
                  size="icon"
                  className="size-8"
                  disabled
                  aria-label="Generate sound effect — unavailable in this wireframe"
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
          <p
            {...growthTarget({
              id: "sound-sharing",
              title: "Disclose the contribution pathway",
              description:
                "This notice explains that a generation may become discoverable by other users and keeps a Disable choice beside the statement. It makes the possible reuse pathway visible before creation; no publication was observed.",
              order: 3,
            })}
            className="growth-scope mt-2 rounded-md bg-card p-1 text-center text-[11px] leading-5 text-muted-foreground"
            role="status"
          >
            {sharing
              ? "Generations may be shared to Explore page for other users to download."
              : "Sharing disabled for this draft."}{" "}
            <button
              className="rounded-sm font-medium text-foreground underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
              onClick={() => setSharing(!sharing)}
            >
              {sharing ? "Disable" : "Enable"}
            </button>
          </p>
        </div>
      </div>
    </Shell>
  );
}

function VisualWireframe() {
  const [intro, setIntro] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("Video");
  const [action, setAction] = useState("");
  const [filter, setFilter] = useState("All");
  const examples = [
    "Street scene",
    "Portrait",
    "Landscape",
    "Food composition",
  ];
  const chooseAction = (value: string) => {
    setAction(
      `${value}: ${selected === null ? "Example" : examples[selected]}`,
    );
    if (value === "Video" || value === "Extend") setMode("Video");
    setSelected(null);
  };
  return (
    <Shell current="Image & Video">
      <div className="el-create-content">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-medium">Image & Video</h1>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label="Show Image & Video introduction"
            onClick={() => setIntro(true)}
          >
            <CircleHelp />
          </Button>
        </div>
        <div className="mt-3 border-b border-border pb-3 text-xs">Explore</div>
        <section
          className="el-create-avatars mt-4 rounded-md bg-surface-sunken p-3"
          aria-label="Avatars"
        >
          <div>
            <h2 className="text-sm font-medium">Avatars</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Keep characters consistent
            </p>
          </div>
          <div
            className="flex min-w-0 gap-2 overflow-hidden"
            aria-hidden="true"
          >
            {["New", "Huang", "Jada", "Sofia", "Sem", "Larry", "Eva"].map(
              (name) => (
                <div
                  key={name}
                  className="flex aspect-square min-w-16 flex-1 items-end rounded-md border border-border bg-card p-2 text-xs text-muted-foreground"
                >
                  {name}
                </div>
              ),
            )}
          </div>
        </section>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Media type">
          {["All", "Image", "Video", "Lip sync"].map((item) => (
            <Button
              key={item}
              variant={filter === item ? "secondary" : "outline"}
              className={smallButton}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div
          {...growthTarget({
            id: "visual-examples",
            title: "Start from a visible possibility",
            description:
              "The example gallery demonstrates output types before asking for an original idea. Opening an example reveals possible creation actions; the source inspection did not test those actions’ results.",
            order: 1,
          })}
          className="el-create-gallery relative mt-4"
        >
          {examples
            .filter(
              (_, index) =>
                filter === "All" ||
                (filter === "Image"
                  ? index % 2 === 0
                  : filter === "Video"
                    ? index % 2 === 1
                    : index === 1 || index === 4),
            )
            .map((label) => (
              <button
                key={label}
                className="growth-scope group min-w-0 overflow-hidden rounded-md border border-border bg-card text-card-foreground text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-inverse"
                onClick={() => setSelected(examples.indexOf(label))}
                aria-label={`Open ${label} example`}
              >
                <ImagePlaceholder
                  label={label}
                  className="aspect-[4/5] rounded-none border-0 [&>span]:border-0 [&>span]:bg-transparent [&>span]:text-xs"
                />
                <span className="flex items-center justify-between border-t border-border bg-card p-2 text-xs">
                  Explore example
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </button>
            ))}
        </div>
        <div className="el-create-visual-composer rounded-md border border-border-strong bg-card text-card-foreground shadow-md">
          <PromptChips
            items={["Surreal Landscape", "Steampunk City", "Enchanted Forest"]}
            onPick={setPrompt}
          />
          <div className="p-3">
            <div className="flex flex-wrap gap-1">
              {["Image", "Video", "Lip sync"].map((item) => (
                <Button
                  key={item}
                  variant={mode === item ? "secondary" : "ghost"}
                  className={smallButton}
                  aria-pressed={mode === item}
                  onClick={() => setMode(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(mode === "Video"
                ? [
                    "Start frame",
                    "End frame",
                    "Image refs",
                    "Video refs",
                    "Audio refs",
                  ]
                : mode === "Image"
                  ? ["Image refs"]
                  : ["Video refs", "Audio refs"]
              ).map((label) => (
                <Button
                  key={label}
                  variant="outline"
                  className="h-14 flex-col gap-1 px-2 text-[11px]"
                  onClick={() => setAction(label)}
                >
                  <Image />
                  {label}
                </Button>
              ))}
            </div>
            {action && (
              <div
                role="status"
                className="mt-3 flex items-center justify-between rounded-md bg-selected px-2 py-1 text-xs"
              >
                <span>{action} selected</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  aria-label="Clear selected action"
                  onClick={() => setAction("")}
                >
                  <X />
                </Button>
              </div>
            )}
            <Textarea
              aria-label={`${mode} description`}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={`Describe your ${mode.toLowerCase()} or reference by using @…`}
              className="mt-3 min-h-14 border-0 bg-transparent px-0 py-1 text-sm"
            />
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>Seedance 2.5</span>
              <span>16:9</span>
              <span>720p</span>
              <span>5s</span>
              <span className="ml-auto">0 left</span>
              <Button
                size="icon"
                className="size-8"
                disabled
                aria-label="Generate visual — unavailable in this wireframe"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
        <Dialog open={intro} onOpenChange={setIntro}>
          <DialogContent
            {...growthTarget({
              id: "visual-introduction",
              title: "Explain the new capability before setup",
              description:
                "The introduction connects image, video, model access, and related editing tools through three short benefits. This is feature adoption for an existing user, not evidence of first-product activation.",
              order: 1,
            })}
            className="growth-scope max-h-[90dvh] min-w-0 max-w-lg grid-cols-1 overflow-y-auto p-0"
          >
            <div className="aspect-[2/1] min-w-0 border-b border-border bg-surface-sunken p-4 sm:p-6">
              <div className="mx-auto mt-4 min-w-0 max-w-sm rounded-md border border-border bg-card p-3 shadow-sm sm:p-4">
                <div className="flex min-w-0 flex-wrap justify-between gap-3">
                  <Badge variant="outline" className="text-xs">
                    Image refs
                  </Badge>
                  <Badge className="text-xs">Video</Badge>
                </div>
                <p className="my-5 text-sm text-muted-foreground">
                  Describe your video…
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>OpenAI Sora 2</span>
                  <span>16:9</span>
                  <span>720p</span>
                </div>
              </div>
            </div>
            <div className="min-w-0 p-5">
              <DialogTitle className="text-base">
                Introducing Image & Video
              </DialogTitle>
              <DialogDescription className="sr-only">
                Create images, videos and lip syncs from the same workspace.
              </DialogDescription>
              <ul className="my-5 space-y-4 text-sm">
                <li className="flex min-w-0 gap-3">
                  <Film className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 break-words">
                    Switch seamlessly between Image and Video
                  </span>
                </li>
                <li className="flex min-w-0 gap-3">
                  <Layers3 className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 break-words">
                    Access to popular models in one click
                  </span>
                </li>
                <li className="flex min-w-0 gap-3">
                  <WandSparkles
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words">
                    Upscale, Lip Sync and more all in the same flow
                  </span>
                </li>
              </ul>
              <div
                {...growthTarget({
                  id: "visual-introduction-entry",
                  title: "Give the explanation one next step",
                  description:
                    "Get started moves from the benefits summary to the example gallery. The next decision is what to explore or create, keeping this introduction short.",
                  order: 2,
                })}
              >
                <Button className="w-full" onClick={() => setIntro(false)}>
                  Get started
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={selected !== null}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <DialogContent
            {...growthTarget({
              id: "visual-example-detail",
              title: "Keep the example beside the next decision",
              description:
                "An example remains visible while the user considers what to do with it. Its media is abstracted here; the actions come from the inspected product.",
              order: 1,
            })}
            className="growth-scope max-h-[90dvh] min-w-0 max-w-2xl grid-cols-1 overflow-y-auto"
          >
            <DialogTitle>
              {selected !== null ? examples[selected] : "Example"}
            </DialogTitle>
            <DialogDescription>
              Choose how to use this example.
            </DialogDescription>
            <ImagePlaceholder
              label={selected !== null ? examples[selected] : "Example"}
            />
            <div
              {...growthTarget({
                id: "visual-example-actions",
                title: "Turn an example into a starting action",
                description:
                  "Recreate, Reference, and the adjacent editing actions give the example a practical next step. Their downstream inputs and costs were not inspected, so this wireframe only records the local choice.",
                order: 2,
              })}
              className="flex flex-wrap items-center gap-2"
            >
              {[
                "Edit",
                "Recreate",
                "Reference",
                "Video",
                "Open Studio",
                "Extend",
              ].map((item) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={item}
                  onClick={() => chooseAction(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
}

export function CreationWireframe({ patternId }: { patternId: string }) {
  if (!creationPatternIds.includes(patternId)) return null;
  if (patternId === "el-home-intent-to-creation")
    return <HomeWireframe key={patternId} />;
  if (patternId === "el-v4-discovery-to-trial")
    return <HomeWireframe key={patternId} launch />;
  if (patternId === "el-adjacent-tool-discovery")
    return <SpeechWireframe key={patternId} />;
  if (patternId === "el-model-choice-guidance")
    return <SpeechWireframe key={patternId} initialSelector />;
  if (patternId === "el-music-browse-or-create")
    return <MusicWireframe key={patternId} />;
  if (patternId === "el-sound-effects-community-reuse")
    return <SoundWireframe key={patternId} />;
  if (patternId === "el-image-video-example-to-action")
    return <VisualWireframe key={patternId} />;
  return null;
}
