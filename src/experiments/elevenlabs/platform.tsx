import { useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Box,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  FileCode2,
  Grid2X2,
  Home,
  KeyRound,
  Layers3,
  MessageCircle,
  Network,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../../components/kit";
import { growthTarget } from "../../components/growth-education";
import "./platform.css";
import { relatedExperimentHref as patternLink } from "./navigation";

export const platformPatternIds = [
  "el-basic-seat-collaboration-bridge",
  "el-affiliate-advocacy-entry",
  "el-agents-template-assisted-onboarding",
  "el-api-time-bounded-model-offer",
];

function PrototypeNotice({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-md border border-border bg-surface-sunken p-3 text-sm leading-5 text-muted-foreground"
    >
      {children}
    </p>
  );
}

function AbstractArt({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden bg-surface-sunken", className)}
    >
      <div className="absolute left-[8%] top-[22%] h-[70%] w-[38%] -rotate-12 rounded-xl border border-border-strong bg-surface-raised" />
      <div className="absolute left-[32%] top-[8%] h-[65%] w-[38%] rotate-12 rounded-xl border border-border-strong bg-secondary" />
      <div className="absolute left-[64%] top-[40%] h-[70%] w-[30%] -rotate-12 rounded-xl border border-border-strong bg-card" />
    </div>
  );
}

function QuietCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="platform-wireframe min-h-[760px] bg-background text-foreground">
      <div className="grid min-h-[760px] grid-cols-1 sm:grid-cols-[minmax(176px,16%)_minmax(0,1fr)]">
        <aside
          className="order-last flex min-w-0 flex-col border-t border-border bg-surface-sunken p-3 sm:order-first sm:border-r sm:border-t-0"
          aria-label="Application context"
        >
          <div className="mb-8 hidden items-center gap-2 text-sm font-medium sm:flex">
            <Layers3 className="size-4" aria-hidden="true" />
            Workspace
          </div>
          <div aria-hidden="true" className="hidden space-y-5 sm:block">
            {["Home", "Voices", "Studio", "Flows"].map((label) => (
              <p key={label} className="text-sm text-muted-foreground">
                {label}
              </p>
            ))}
          </div>
          <div className="mt-auto">{children}</div>
        </aside>
        <div className="min-w-0 p-5 sm:p-8">
          <p className="border-b border-border pb-4 text-sm text-muted-foreground">
            Home
          </p>
          <div aria-hidden="true" className="mx-auto mt-28 max-w-lg space-y-4">
            <div className="mx-auto h-5 w-2/3 rounded bg-muted" />
            <div className="h-12 rounded-md border border-border bg-surface-sunken" />
            <div className="grid grid-cols-4 gap-3 pt-16">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-md border border-border" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicSeats() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <QuietCanvas>
        <DialogTrigger asChild>
          <button
            type="button"
            className="growth-scope w-full rounded-md border border-border bg-card p-3 text-card-foreground text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-inverse"
          >
            <Users className="mb-3 size-5" aria-hidden="true" />
            <span className="block text-sm font-medium">
              Invite team members
            </span>
            <span className="mt-1 block text-xs leading-4 text-muted-foreground">
              Bring your team in to collaborate and share your creations.
            </span>
          </button>
        </DialogTrigger>
      </QuietCanvas>
      <DialogContent className="growth-scope platform-wireframe max-w-[512px] gap-0 overflow-y-auto p-0">
        <AbstractArt className="h-[clamp(130px,24vw,248px)] border-b border-border" />
        <div className="p-4 pt-7">
          <div
            {...growthTarget({
              id: "seats-collaboration",
              title: "Bring collaborators into your workspace",
              description:
                "Basic Seats explains what invited people can access and how many credits they get, making it easier to decide who to invite.",
              order: 1,
            })}
          >
            <DialogTitle>Introducing Basic Seats</DialogTitle>
            <DialogDescription className="mt-2 text-foreground">
              Basic Seats are a new way to collaborate with friends on
              ElevenLabs.
            </DialogDescription>
            <p className="mt-2 text-sm leading-5">
              Invite up to 20 people and share your work with them. They will
              retain access to their current workspace and will be able to
              collaborate on content you created and generate their own, up to
              50,000 credits per billing period.
            </p>
          </div>
          <form
            {...growthTarget({
              id: "seats-invite",
              title: "Invite from this screen",
              description:
                "An email field and Invite button sit inside the introduction, so you can take the next step while the benefits are fresh.",
              order: 2,
            })}
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              setNote(
                "The captured flow ends before sending. This local prototype does not send an invitation.",
              );
            }}
          >
            <Label htmlFor="platform-invite-email">Invite colleague</Label>{" "}
            <Input
              id="platform-invite-email"
              className="mt-2"
              type="email"
              placeholder="Email address"
              autoComplete="off"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setNote("");
              }}
              required
            />
            <p
              {...growthTarget({
                id: "seats-expansion",
                title: "Explain when to upgrade",
                description:
                  "The note names the Scale plan needed for Full Seats, so you can see how to give collaborators more access.",
                order: 3,
              })}
              className="mt-4 text-xs leading-4 text-muted-foreground"
            >
              The person you invite will be added to your workspace on a Basic
              Seat. To unlock additional Full Seats you need to{" "}
              <a
                className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
                target="_top"
                href={patternLink("el-plan-value-ladder")}
              >
                upgrade to a Scale tier subscription.
              </a>
            </p>
            {note && (
              <div className="mt-4">
                <PrototypeNotice>{note}</PrototypeNotice>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={!email.trim()}>
                Invite
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Affiliate() {
  const [open, setOpen] = useState(true);
  const [note, setNote] = useState("");
  const boundary = (destination: string) =>
    setNote(
      `${destination} was not opened in the reference. This prototype stops at the program introduction.`,
    );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <QuietCanvas>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="growth-scope h-auto min-h-control-default w-full whitespace-normal bg-card py-2 focus-visible:outline-ring-inverse"
          >
            Become an affiliate
          </Button>
        </DialogTrigger>
      </QuietCanvas>
      <DialogContent className="growth-scope platform-wireframe max-w-[512px] gap-0 p-0">
        <div className="px-5 pt-5">
          <div
            {...growthTarget({
              id: "affiliate-incentive",
              title: "Give a reason to share",
              description:
                "The invitation connects recommending ElevenLabs with a chance to earn, giving people a reason to explore the affiliate program.",
              order: 1,
            })}
          >
            <DialogTitle className="pr-6">
              ElevenLabs Affiliate Program
            </DialogTitle>
            <DialogDescription className="mt-5 text-base text-foreground">
              Become an affiliate and earn with every recommendation.
            </DialogDescription>
            <p className="text-base leading-6">
              Learn more about the program{" "}
              <button
                className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
                onClick={() => boundary("Program information")}
              >
                here
              </button>
              .
            </p>
          </div>
          <div
            {...growthTarget({
              id: "affiliate-segment",
              title: "Offer creators a separate option",
              description:
                "Creators with a large following get a separate contact link, making it easy to ask about offers suited to them.",
              order: 2,
            })}
          >
            <h3 className="mt-5 text-base font-medium">
              Are you an established creator?
            </h3>
            <p className="text-base leading-6">
              If you have a large following,{" "}
              <button
                className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
                onClick={() => boundary("The creator contact route")}
              >
                contact us
              </button>{" "}
              for exclusive opportunities.
            </p>
          </div>
        </div>
        <div
          className="relative my-4 h-[220px] overflow-hidden"
          aria-hidden="true"
        >
          {[
            "left-[-3%] top-[20%] h-[56%] w-[30%]",
            "left-[17%] top-[56%] h-[40%] w-[34%]",
            "left-[39%] top-[5%] h-[58%] w-[34%]",
            "left-[70%] top-[37%] h-[51%] w-[34%]",
          ].map((position) => (
            <div
              key={position}
              className={cn(
                "absolute rounded-md border border-border-strong bg-surface-sunken",
                position,
              )}
            >
              <div className="mx-auto mt-[15%] size-10 rounded-full border border-border bg-muted" />
              <div className="mx-auto mt-2 h-8 w-2/3 rounded-t-xl border border-border bg-muted" />
            </div>
          ))}
        </div>
        <div
          {...growthTarget({
            id: "affiliate-handoff",
            title: "Explain where sign-up leads",
            description:
              "The panel names PartnerStack and links the program terms, so you can see who manages sign-up before you join.",
            order: 3,
          })}
          className="mx-5 mb-5 rounded-md border border-border bg-surface-sunken px-5 py-7 text-center"
        >
          <p className="text-xl font-semibold">PartnerStack</p>
          <p className="mt-5 text-sm leading-5 text-muted-foreground">
            The ElevenLabs Affiliate Program is managed by PartnerStack, a
            third-party management platform. By signing up, you agree to our{" "}
            <button
              className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
              onClick={() => boundary("Affiliate Program terms")}
            >
              Affiliate Program terms.
            </button>
          </p>
          <Button
            className="mt-5 h-auto min-h-control-default max-w-full whitespace-normal py-2"
            onClick={() => boundary("Affiliate sign-up")}
          >
            Sign up for the affiliate program
          </Button>
        </div>
        {note && (
          <div className="mx-5 mb-5">
            <PrototypeNotice>{note}</PrototypeNotice>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PlatformSwitcher() {
  const [open, setOpen] = useState(true);
  const keepOpenForEducation = (event: {
    target: EventTarget | null;
    preventDefault: () => void;
  }) => {
    const target = event.target;
    if (
      document.body.classList.contains("driver-active") ||
      (target instanceof Element && target.closest(".growth-tour"))
    ) {
      event.preventDefault();
    }
  };
  const products = [
    {
      title: "ElevenCreative",
      copy: "Create, edit and localize content with AI",
      icon: Layers3,
      id: "el-home-intent-to-creation",
    },
    {
      title: "ElevenAgents",
      copy: "Deploy and monitor conversational agents",
      icon: MessageCircle,
      id: "el-agents-template-assisted-onboarding",
    },
    {
      title: "ElevenAPI",
      copy: "Build with our leading AI audio models",
      icon: Code2,
      id: "el-api-first-request-scaffold",
    },
  ];
  return (
    <QuietCanvas>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-1">
            <span className="flex items-center gap-2">
              <Layers3 aria-hidden="true" />
              ElevenCreative
            </span>
            <ChevronDown aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="growth-scope platform-wireframe w-[min(303px,calc(100vw-24px))] p-1"
          onInteractOutside={keepOpenForEducation}
          onFocusOutside={keepOpenForEducation}
        >
          {products.map(({ title, copy, icon: Icon, id }, index) => (
            <div
              key={title}
              {...growthTarget({
                id: `switcher-${id}`,
                title: [
                  "Explain what each product does",
                  "Introduce another useful product",
                  "Point developers to their tools",
                ][index],
                description: [
                  "A short description says what ElevenCreative helps you make, so you can compare it with the other products before choosing.",
                  "The ElevenAgents row appears alongside creation tools, helping you discover a related product for setting up and managing conversational agents.",
                  "The ElevenAPI description speaks directly to people building with audio models, helping developers find the product that fits their task.",
                ][index],
                order: index + 1,
              })}
              className="relative border-b border-border last:border-b-0"
            >
              <DropdownMenuItem
                asChild
                className="items-start gap-2 rounded-none p-2"
              >
                <a target="_top" href={patternLink(id)}>
                  <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-sm text-foreground">
                      {title}
                    </span>
                    <span className="block text-xs leading-4 text-muted-foreground">
                      {copy}
                    </span>
                  </span>
                </a>
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </QuietCanvas>
  );
}

function CompactRail() {
  return (
    <aside
      aria-label="Application context"
      className="platform-rail border-r border-border bg-surface-sunken"
    >
      <Layers3 className="size-5" aria-hidden="true" />
      <div aria-hidden="true" className="space-y-7">
        {[Search, Home, Plus, Box, Settings, Grid2X2, Users].map((Icon, i) => (
          <Icon key={i} className="size-4 text-muted-foreground" />
        ))}
      </div>
      <Code2 className="mt-auto size-4" aria-hidden="true" />
    </aside>
  );
}

const templates = [
  {
    title: "Customer Support",
    description: "Customer support representative to field support inquiries",
    integrations: "2 integrations",
    source: "community",
    use: "support",
  },
  {
    title: "Language Practice Tutor",
    description:
      "Interactive language learning — adapts to level, corrects, teaches…",
    integrations: "1 integration",
    source: "community",
    use: "learning",
  },
  {
    title: "Front Desk Receptionist",
    description:
      "A general front desk receptionist to handle department transfers and…",
    integrations: "1 integration",
    source: "community",
    use: "support",
  },
  {
    title: "Inbound Lead Qualifier",
    description:
      "Qualifies inbound leads from web forms and ads, assesses budget a…",
    integrations: "2 integrations",
    source: "community",
    use: "sales",
  },
  {
    title: "Hotel Reservation Agent",
    description: "Books hotel reservations, checks room availability, handles…",
    integrations: "ElevenLabs",
    source: "elevenlabs",
    use: "support",
  },
  {
    title: "E-Commerce Shopping Assistant",
    description: "Help shoppers navigate your e-commerce site and give…",
    integrations: "ElevenLabs · 9 tools",
    source: "elevenlabs",
    use: "sales",
  },
  {
    title: "Renewal & Expansion Agent",
    description:
      "Outbound CS agent that proactively drives renewals and surfaces…",
    integrations: "2 integrations",
    source: "community",
    use: "sales",
  },
  {
    title: "Voice Reading Companion",
    description:
      "Summarize a chapter, discuss a theme, or question a plot point. Thi…",
    integrations: "ElevenLabs",
    source: "elevenlabs",
    use: "learning",
  },
];

function LocalSelect({
  label,
  value,
  setValue,
  options,
  growth = false,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: { value: string; label: string }[];
  growth?: boolean;
}) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        aria-label={label}
        className="h-9 w-auto min-w-0 gap-2 text-xs"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className={growth ? "growth-scope" : undefined}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function AgentTemplates() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [use, setUse] = useState("all");
  const [selected, setSelected] = useState(templates[0]);
  const [view, setView] = useState("workflow");
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const filtered = templates.filter(
    (template) =>
      `${template.title} ${template.description}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (source === "all" || template.source === source) &&
      (use === "all" || template.use === use),
  );
  const boundary = (action: string) =>
    setNote(
      `${action} is outside the captured gallery. No agent or integration is created in this prototype.`,
    );
  return (
    <div className="platform-wireframe platform-agent-shell bg-background text-foreground">
      <CompactRail />
      <div className="min-w-0">
        <div className="flex min-h-12 items-center justify-between gap-2 border-b border-border px-4">
          <span className="text-sm">Agents</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAssistantOpen(!assistantOpen)}
            aria-expanded={assistantOpen}
          >
            <Sparkles aria-hidden="true" />
            Architect
          </Button>
        </div>
        <div
          className={cn(
            "platform-agent-columns",
            !assistantOpen && "platform-agent-columns-wide",
          )}
        >
          <section
            className="min-w-0 border-b border-border lg:border-b-0 lg:border-r"
            aria-labelledby="platform-template-title"
          >
            <div className="border-b border-border p-4">
              <h2
                id="platform-template-title"
                className="text-lg font-semibold"
              >
                Browse templates
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Input
                  aria-label="Search templates"
                  placeholder="Search templates"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-9 basis-full text-xs"
                />
                <LocalSelect
                  label="Template source"
                  value={source}
                  setValue={setSource}
                  options={[
                    { value: "all", label: "Source" },
                    { value: "elevenlabs", label: "ElevenLabs" },
                  ]}
                />
                <LocalSelect
                  label="Template use case"
                  value={use}
                  setValue={setUse}
                  options={[
                    { value: "all", label: "Use case" },
                    { value: "support", label: "Support" },
                    { value: "sales", label: "Sales" },
                    { value: "learning", label: "Learning" },
                  ]}
                />
                {(query || source !== "all" || use !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setSource("all");
                      setUse("all");
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => boundary("Blank-agent creation")}
              >
                <Plus aria-hidden="true" />
                Create Blank Agent
              </Button>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((template, index) => (
                  <button
                    key={template.title}
                    {...(index === 0
                      ? growthTarget({
                          id: "agents-templates",
                          title: "Start from a template",
                          description:
                            "Templates show tasks an agent could handle. Search and filters help you find a useful starting point before setting one up.",
                          order: 1,
                        })
                      : {})}
                    type="button"
                    aria-pressed={selected.title === template.title}
                    className={cn(
                      "growth-scope min-h-[150px] min-w-0 rounded-md border bg-card p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-inverse",
                      selected.title === template.title
                        ? "border-border-strong bg-selected text-selected-foreground"
                        : "border-border text-card-foreground hover:bg-secondary",
                    )}
                    onClick={() => {
                      setSelected(template);
                      setView("details");
                      setNote("");
                    }}
                  >
                    <span className="flex items-start gap-2 text-sm font-medium">
                      <MessageCircle
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {template.title}
                    </span>
                    <span className="mt-2 block text-sm leading-5 text-muted-foreground">
                      {template.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs">
                      <Network className="size-3" aria-hidden="true" />
                      {template.integrations}
                    </span>
                  </button>
                ))}
                {!filtered.length && (
                  <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
                    No matching templates.
                  </p>
                )}
              </div>
            </div>
          </section>
          <section
            aria-label="Template preview"
            className="min-w-0 bg-surface-sunken p-3"
          >
            <div
              {...growthTarget({
                id: "agents-preview",
                title: "Look before you choose",
                description:
                  "The preview sits beside the selected template and Use template button, helping you understand the starting point before choosing it.",
                order: 2,
              })}
              className="growth-scope flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-card p-2 text-card-foreground"
            >
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant={view === "workflow" ? "secondary" : "ghost"}
                  aria-pressed={view === "workflow"}
                  onClick={() => {
                    setSelected(templates[0]);
                    setView("workflow");
                  }}
                >
                  Workflow
                </Button>
                <Button
                  size="sm"
                  variant={view === "details" ? "secondary" : "ghost"}
                  aria-pressed={view === "details"}
                  onClick={() => setView("details")}
                >
                  Preview
                </Button>
              </div>
              <div className="flex gap-1">
                <Button size="sm" onClick={() => boundary("Use template")}>
                  Use template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setView("details")}
                >
                  View details
                </Button>
              </div>
            </div>
            {view === "workflow" ? (
              <ObservedWorkflow />
            ) : (
              <Card className="mt-5 p-5">
                <div className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-1 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold">{selected.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {selected.description}
                    </p>
                    <Badge className="mt-4">{selected.integrations}</Badge>
                  </div>
                </div>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
                  Only the gallery description was captured for this template.
                  Its configuration and preview were not inspected.
                </p>
              </Card>
            )}
            {note && (
              <div className="mt-4">
                <PrototypeNotice>{note}</PrototypeNotice>
              </div>
            )}
          </section>
          {assistantOpen && (
            <aside
              {...growthTarget({
                id: "agents-assistance",
                title: "Offer help getting started",
                description:
                  "Architect asks what you want an agent to do, offering help when you are unsure which template to choose.",
                order: 3,
              })}
              className="growth-scope flex min-w-0 flex-col border-t border-border bg-surface-sunken p-3 text-foreground lg:border-t-0 lg:border-l"
              aria-label="Architect assistant"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium">New chat</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close Architect"
                  onClick={() => setAssistantOpen(false)}
                >
                  <X aria-hidden="true" />
                </Button>
              </div>
              <p className="mt-4 text-sm leading-5">
                Welcome to the Agents Platform! These templates are a quick way
                to create your first agent, or you can start from a blank one.
                Tell me what you'd like your agent to do and I'll help you pick
                the best starting point.
              </p>
              <form
                className="mt-8 lg:mt-auto"
                onSubmit={(event) => {
                  event.preventDefault();
                  boundary("An Architect conversation");
                }}
              >
                <Textarea
                  aria-label="Message Architect"
                  placeholder="Ask anything… Type @ to reference"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-24 bg-card"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="mt-2"
                  disabled={!message.trim()}
                >
                  Send
                  <ArrowRight aria-hidden="true" />
                </Button>
              </form>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkflowNode({
  title,
  children,
  small = false,
}: {
  title: string;
  children?: ReactNode;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full rounded-md border border-border bg-card p-3",
        small ? "max-w-28 text-center" : "max-w-52",
      )}
    >
      <p className="text-xs font-medium">{title}</p>
      {children && (
        <p className="mt-2 text-xs leading-4 text-muted-foreground">
          {children}
        </p>
      )}
    </div>
  );
}

function ObservedWorkflow() {
  return (
    <div className="px-1 py-6" aria-label="Customer Support workflow">
      <WorkflowNode title="Start" small />
      <ArrowDown
        className="mx-auto my-5 h-9 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <WorkflowNode title="Identify Issue">
        Open warmly: “Hey, this is Jamie from support — what can I help with
        toda…”
      </WorkflowNode>
      <div className="my-4 flex justify-around" aria-hidden="true">
        <ArrowDown className="size-5" />
        <ArrowDown className="size-5" />
      </div>
      <div className="grid grid-cols-2 items-start gap-3">
        <div>
          <p className="mb-2 text-center text-xs text-muted-foreground">
            Technical issue
          </p>
          <WorkflowNode title="Troubleshoot">
            Methodical troubleshooting. Propose ONE concrete first step…
          </WorkflowNode>
        </div>
        <div>
          <p className="mb-2 text-center text-xs text-muted-foreground">
            Account access
          </p>
          <WorkflowNode title="Account & Billing">
            Account or billing question. Verify identity BEFORE sharing…
          </WorkflowNode>
        </div>
      </div>
      <ArrowDown
        className="mx-auto my-5 h-9 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <WorkflowNode title="Resolve or Escalate">
        If the issue is resolved on the call: confirm the fix worked…
      </WorkflowNode>
      <ArrowDown
        className="mx-auto my-5 h-9 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <WorkflowNode title="End" small />
    </div>
  );
}

function DeveloperShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="platform-wireframe platform-developer-shell min-h-[800px] bg-background text-foreground">
      <CompactRail />
      <div className="min-w-0">
        <div className="flex min-h-12 items-center gap-2 border-b border-border px-4 text-sm text-muted-foreground">
          {title}
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-foreground">
            {title === "Developers" ? "Overview" : "ElevenAPI"}
          </span>
        </div>
        <div className="mx-auto w-[88%] max-w-[1152px] py-10 sm:py-16">
          {children}
        </div>
      </div>
    </div>
  );
}

const quickstartCode = `import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const agent = await elevenlabs.conversationalAi.agents.create({
  name: "My conversational agent",
  conversationConfig: {
    agent: {
      prompt: {
        prompt: "You are a helpful assistant that can answer questions and help with tasks.",
      },
    },
  },
});`;

function ApiQuickstart() {
  const [note, setNote] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const boundary = (item: string) =>
    setNote(
      `${item} was not inspected in the captured flow. The prototype ends at this overview.`,
    );
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(quickstartCode);
      setCopied(true);
      setNote(
        "Example code copied. The captured sample has not been validated or run.",
      );
    } catch {
      setNote(
        "Copy is unavailable in this browser. You can select the example text to copy it.",
      );
    }
  };
  return (
    <DeveloperShell title="Developers">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl">Developers</h2>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a
              target="_top"
              href={patternLink("el-api-time-bounded-model-offer")}
            >
              API Pricing
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => boundary("Documentation")}
          >
            Documentation
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>
      <nav
        aria-label="Developer sections"
        className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-b border-border pb-2"
      >
        {[
          "Overview",
          "API Keys",
          "Webhooks",
          "Analytics",
          "Request Log",
          "Alerts",
          "Environment variables",
        ].map((item) => (
          <button
            key={item}
            aria-current={item === "Overview" ? "page" : undefined}
            className={cn(
              "min-h-9 rounded-sm text-sm focus-visible:outline-2 focus-visible:outline-ring",
              item === "Overview"
                ? "font-medium underline underline-offset-8"
                : "text-muted-foreground",
            )}
            onClick={() => (item === "Overview" ? setNote("") : boundary(item))}
          >
            {item}
          </button>
        ))}
      </nav>
      <Card
        {...growthTarget({
          id: "developer-adjacent-product",
          title: "Introduce a related tool",
          description:
            "The Speech Engine banner explains its benefit beside your agent work. A documentation link gives you a way to learn more.",
          order: 1,
        })}
        className="growth-scope mt-4 flex min-w-0 flex-wrap items-center gap-3 p-3"
      >
        <div className="hidden size-16 shrink-0 items-center justify-center rounded-md border border-border bg-surface-sunken sm:flex">
          <Network className="size-7" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium">
            Build voice agents with Speech Engine
          </h3>
          <p className="mt-1 max-w-lg text-sm leading-5 text-muted-foreground">
            Add voice to any chat agent while keeping full control of your LLM,
            tools, and server logic.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => boundary("Speech Engine documentation")}
        >
          Read the docs
        </Button>
      </Card>
      <Card
        {...growthTarget({
          id: "developer-quickstart",
          title: "Make the first step concrete",
          description:
            "A code example and Get started button help you make a first API request without starting from scratch.",
          order: 2,
        })}
        className="growth-scope platform-quickstart mt-7 min-w-0 overflow-hidden bg-surface-sunken p-4 text-foreground sm:p-5"
      >
        <div className="flex flex-col items-start justify-end py-2">
          <h3 className="text-lg font-semibold">Developer quickstart</h3>
          <p className="mt-3 text-sm leading-5 text-muted-foreground">
            Learn the basics and make your first request with the ElevenLabs
            API.
          </p>
          <Button
            className="mt-4"
            onClick={() => boundary("Developer quickstart documentation")}
          >
            Get started
          </Button>
        </div>
        <div className="relative min-w-0 rounded-md border border-border bg-card">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 size-8 bg-card"
            aria-label={copied ? "Code copied" : "Copy code"}
            onClick={copyCode}
          >
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
          </Button>
          <pre
            tabIndex={0}
            aria-label="JavaScript quickstart example"
            className="overflow-x-auto p-4 pt-12 font-mono text-xs leading-[1.6] focus-visible:outline-2 focus-visible:outline-ring"
          >
            <code>{quickstartCode}</code>
          </pre>
          <div className="flex justify-end p-2">
            <LocalSelect
              growth
              label="Code language"
              value={language}
              setValue={setLanguage}
              options={[{ value: "javascript", label: "JavaScript" }]}
            />
          </div>
        </div>
      </Card>
      {note && (
        <div className="mt-4">
          <PrototypeNotice>{note}</PrototypeNotice>
        </div>
      )}
      <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section>
          <h3 className="mb-3 text-lg font-semibold">Usage</h3>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Top up balance</p>
            <div
              aria-label="Account balance omitted"
              className="mt-3 h-5 w-16 rounded bg-muted"
            />
          </Card>
        </section>
        <section
          {...growthTarget({
            id: "developer-next-actions",
            title: "Keep useful next steps nearby",
            description:
              "Links to API keys, models, and reference guides sit below the example, so you can find what you need to keep going.",
            order: 3,
          })}
          className="min-w-0"
        >
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { label: "Create an API Key", icon: KeyRound },
              { label: "Browse Models", icon: Grid2X2 },
              { label: "API Reference", icon: BookOpen },
              { label: "Libraries & SDKs", icon: FileCode2 },
            ].map(({ label, icon: Icon }) => (
              <Button
                key={label}
                variant="outline"
                className="growth-scope h-auto min-h-12 min-w-0 justify-start whitespace-normal bg-card py-2 text-left focus-visible:outline-ring-inverse"
                onClick={() => boundary(label)}
              >
                <Icon aria-hidden="true" />
                {label}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </DeveloperShell>
  );
}

const apiModels = [
  {
    name: "v4",
    description: "Our fastest and most emotive, human-like model",
    price: "₹1.936",
    original: "₹7.04",
    offer: true,
    features: [
      "Audio tags for fine-grained control",
      "90+ languages supported",
    ],
  },
  {
    name: "v4 Turbo",
    description: "Our best model for real-time and agents",
    price: "₹0.968",
    original: "₹3.52",
    offer: true,
    features: [
      "Ultra-low latency (~100ms)",
      "v4 emotiveness, tuned for latency",
      "90+ languages supported",
    ],
  },
  {
    name: "v3",
    description: "Emotionally rich delivery for dramatic performances",
    price: "₹7.04",
    offer: false,
    features: [
      "High quality, expressive delivery",
      "70+ languages supported",
      "5,000 character limit",
      "Supports multi-speaker dialogue",
    ],
  },
  {
    name: "v3 Conversational",
    description: "Low-latency v3, tuned for realtime conversation",
    price: "₹3.52",
    offer: false,
    features: [
      "Low latency (~280ms)",
      "High quality, expressive delivery",
      "70+ languages supported",
      "Custom audio tags",
    ],
  },
  {
    name: "v2 Multilingual",
    description: "Lifelike, consistent speech for long-form audio",
    price: "₹7.04",
    offer: false,
    features: [
      "High quality voice",
      "29 languages",
      "10,000 character limit",
      "Stable on long generations",
    ],
  },
];

function ModelOffer() {
  const track = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState("");
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const scroll = (direction: number) =>
    track.current?.scrollBy({
      left:
        direction * (track.current.firstElementChild?.clientWidth ?? 240) * 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <DeveloperShell title="Subscription">
      <h2 className="text-2xl">Subscription</h2>
      <nav
        aria-label="Subscription products"
        className="mt-4 flex flex-wrap gap-5 border-b border-border pb-2"
      >
        <a
          target="_top"
          href={patternLink("el-plan-value-ladder")}
          className="min-h-9 py-2 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          ElevenCreative
        </a>
        <button
          className="min-h-9 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          onClick={() =>
            setNote(
              "ElevenAgents subscription details were not part of this captured pricing view.",
            )
          }
        >
          ElevenAgents
        </button>
        <span
          aria-current="page"
          className="min-h-9 py-2 text-sm underline underline-offset-8"
        >
          ElevenAPI
        </span>
      </nav>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Top up balance</p>
          <div
            aria-label="Account balance omitted"
            className="mt-3 h-5 w-16 rounded bg-muted"
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() =>
                setNote(
                  "Credit purchasing is ordinary billing context. This growth experiment focuses on the dated model offer; no payment is submitted.",
                )
              }
            >
              <Plus aria-hidden="true" /> Add credits
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setNote(
                  "Automatic top-up is ordinary billing configuration. It is outside this model-offer experiment and no billing setting changes.",
                )
              }
            >
              Auto Top Up<Badge className="text-xs">Off</Badge>
            </Button>
          </div>
        </Card>
        <Card
          {...growthTarget({
            id: "api-plan-benefits",
            title: "Explain what a plan adds",
            description:
              "The note names better audio, voice cloning, and more requests at once, giving you clear reasons to consider a paid plan.",
            order: 1,
          })}
          className="growth-scope p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm">Your current plan</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setNote(
                  "Billing details were not inspected. No billing action is available in this prototype.",
                )
              }
            >
              <Settings aria-hidden="true" />
              Billing
            </Button>
          </div>
          <p className="mt-5 text-sm leading-5 text-muted-foreground">
            To unlock higher concurrency, higher audio quality, and voice
            cloning, subscribe to an ElevenCreative or ElevenAgents plan.
          </p>
        </Card>
      </div>
      {note && (
        <div className="mt-4">
          <PrototypeNotice>{note}</PrototypeNotice>
        </div>
      )}
      <div className="mt-6 flex items-center justify-between gap-4">
        <h3 className="text-xl">Model Pricing</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous models"
            disabled={!canPrevious}
            onClick={() => scroll(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next models"
            disabled={!canNext}
            onClick={() => scroll(1)}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Business tier starting prices. Prices exclude all taxes, levies and
        duties.
      </p>
      <div
        ref={track}
        onScroll={(event) => {
          const element = event.currentTarget;
          setCanPrevious(element.scrollLeft > 2);
          setCanNext(
            element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
          );
        }}
        className="platform-model-track mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
        tabIndex={0}
        aria-label="API model pricing comparison"
      >
        {apiModels.map((model, index) => (
          <Card
            key={model.name}
            {...(model.offer
              ? growthTarget({
                  id: `api-offer-${index}`,
                  title:
                    index === 0
                      ? "Draw attention to something new"
                      : "Make savings easy to compare",
                  description:
                    index === 0
                      ? "A New label and a discount with an end date give you reasons to look at a newer model and consider trying it."
                      : "The original and discounted prices use the same unit, so you can compare the saving and judge whether to try the model.",
                  order: index + 2,
                })
              : {})}
            className={cn(
              "flex min-h-[350px] w-[calc((100%_-_48px)/4)] min-w-[220px] shrink-0 snap-start flex-col overflow-hidden",
              model.offer && "growth-scope",
            )}
          >
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-semibold">{model.name}</h4>
                {model.offer && (
                  <Badge className="rounded-full px-1.5 py-0 text-xs">
                    New
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Text to Speech
              </p>
              <p className="mt-3 min-h-10 text-sm leading-5 text-muted-foreground">
                {model.description}
              </p>
              <div className="mt-2 min-h-6">
                {model.offer && (
                  <Badge className="rounded-full px-2 py-0 text-xs">
                    72% off until Oct 12
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-lg font-semibold">
                {model.price}{" "}
                {model.original && (
                  <s className="text-xs font-normal text-muted-foreground">
                    {model.original}
                  </s>
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                per 1K characters
              </p>
            </div>
            <ul className="flex-1 space-y-4 border-t border-border bg-surface-sunken p-4">
              {model.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-5"
                >
                  <Check
                    className="mt-0.5 size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Reference offer captured on 4 October 2026. Displayed prices and savings
        are source copy from that date.
      </p>
    </DeveloperShell>
  );
}

export function PlatformWireframe({ patternId }: { patternId: string }) {
  if (!platformPatternIds.includes(patternId)) return null;
  if (patternId === "el-basic-seat-collaboration-bridge") return <BasicSeats />;
  if (patternId === "el-affiliate-advocacy-entry") return <Affiliate />;
  if (patternId === "el-product-switcher-positioning")
    return <PlatformSwitcher />;
  if (patternId === "el-agents-template-assisted-onboarding")
    return <AgentTemplates />;
  if (patternId === "el-api-first-request-scaffold") return <ApiQuickstart />;
  if (patternId === "el-api-time-bounded-model-offer") return <ModelOffer />;
  return null;
}
