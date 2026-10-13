import { useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Code2,
  FileText,
  Folder,
  Globe,
  Home,
  Image,
  Layers,
  Menu,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Palette,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Trash2,
  Upload,
  UserPlus,
  Users,
  WandSparkles,
} from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "../../components/kit";
import { growthTarget } from "../../components/growth-education";
import "./gamma.css";

type Surface = "announcement" | "referral" | "plans" | null;
type Boundary = { title: string; description: string };
const guide = (id: string, title: string, description: string, order = 0) =>
  growthTarget({ id, title, description, order });

const slides = [
  {
    title: "More visual variety",
    text: "Describe what you want, import examples, or attach inspiration from anywhere.",
    tip: "Show more possibilities",
    lesson:
      "Examples make the update easier to picture. A short description connects the new options to something the user can try.",
  },
  {
    title: "Our most powerful agent",
    text: "Brainstorm, research, design, and edit with a single agent.",
    tip: "Name the new benefit",
    lesson:
      "One short sentence shows the work the new agent can help with, making the update relevant to everyday tasks.",
  },
  {
    title: "Import that works",
    text: "Import PDF and PPT designs for ongoing use. Edit them yourself, or ask Gamma to redesign them.",
    tip: "Bring existing work",
    lesson:
      "The import example shows how to reuse existing files. That gives people a familiar starting point for trying the update.",
  },
  {
    title: "Connect your tools",
    text: "Pull live data, text, transcripts, files, and context from Slack, Notion, HubSpot, and more.",
    tip: "Connect to familiar tools",
    lesson:
      "Recognizable tools show where useful content can come from. The update feels connected to work people already have.",
  },
  {
    title: "And so much more",
    text: "",
    tip: "Finish with a next step",
    lesson:
      "New and newly free features make the update tangible. Start creating turns the announcement into a clear invitation to try it.",
  },
];
const features = [
  ["Custom instructions", "NEW"],
  ["Pixel-perfect import", "NEW"],
  ["Freeform editing", "NEW"],
  ["Private folders", "NEW"],
  ["High-fidelity export", "NEW"],
  ["Custom fonts", "NOW FREE"],
  ["Better brand controls", "NEW"],
  ["Media library", "NEW"],
  ["Workspace templates", "NOW FREE"],
  ["Improved agentic editing", "NEW"],
  ["Enterprise plan", "NEW"],
];

function TourArtwork({ slide }: { slide: number }) {
  if (slide === 0)
    return (
      <div
        className="gamma-variety-art"
        role="img"
        aria-label="Presentation examples, simplified"
      >
        <div>
          <span />
          <span />
          <span />
        </div>
        <div>
          <strong>A story in slides</strong>
          <div className="gamma-art-three">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div>
          <strong>Project overview</strong>
          <span />
          <span />
        </div>
        <div>
          <strong>Compare your options</strong>
          <span />
          <span />
          <span />
        </div>
        <div>
          <span />
          <span />
        </div>
      </div>
    );
  if (slide === 1)
    return (
      <div
        className="gamma-agent-art"
        role="img"
        aria-label="Agent and outline example, simplified"
      >
        <div>
          <strong>Eyewear market deck</strong>
          <p>A deck about the competitive market of the eyewear industry</p>
          <span>
            <Check /> Reasoning
          </span>
          <span>
            <Check /> Researching
          </span>
          <span>
            <Check /> Outlining
          </span>
        </div>
        <div>
          <strong>Outline</strong>
          <p>
            <b>1</b> Market overview
          </p>
          <span className="gamma-placeholder-line" />
          <span className="gamma-placeholder-line" />
        </div>
      </div>
    );
  if (slide === 2)
    return (
      <div
        className="gamma-import-art"
        role="img"
        aria-label="Imported presentation example, simplified"
      >
        <div>
          <strong>Q4 contact reasons</strong>
          <span className="gamma-placeholder-line" />
          <span className="gamma-placeholder-line" />
          <span className="gamma-placeholder-line" />
        </div>
        <div className="gamma-art-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  return null;
}

function Announcement({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = useState(-1);
  const nextButton = useRef<HTMLButtonElement>(null);
  const current = slides[slide];
  return (
    <>
      <div
        className={cn(
          "gamma-tour",
          slide < 0 && "gamma-tour-intro",
          slide === 3 && "gamma-tour-connect",
          slide === 4 && "gamma-tour-more",
        )}
      >
        {slide < 0 ? (
          <>
            <div
              className="gamma-tour-entry"
              {...guide(
                "gamma-update-invitation",
                "Invite people to explore",
                "A clear update announcement gives people a reason to look again. One button leads to a short tour of what changed.",
              )}
            >
              <Badge>NEW</Badge>
              <p className="gamma-five-large">
                GAMMA<span>5</span>
              </p>
              <DialogTitle>Our biggest update ever</DialogTitle>
              <DialogDescription>
                We rebuilt how Gamma thinks, designs, and edits. Your best ideas
                deserve better.
              </DialogDescription>
              <Button
                onClick={() => {
                  setSlide(0);
                  requestAnimationFrame(() => nextButton.current?.focus());
                }}
              >
                See what’s new
              </Button>
            </div>
            <p className="gamma-classic-note">
              You can still use Gamma Classic.
            </p>
          </>
        ) : (
          <>
            <p className="gamma-five-small">
              GAMMA<span>5</span>
            </p>
            {slide < 3 && <TourArtwork slide={slide} />}
            {slide === 3 && (
              <div className="gamma-tools-art" aria-hidden="true">
                {[
                  MessageSquare,
                  Layers,
                  FileText,
                  Users,
                  Globe,
                  Folder,
                  Code2,
                  Image,
                ].map((Icon, i) => (
                  <span key={i}>
                    <Icon />
                  </span>
                ))}
              </div>
            )}
            {slide === 4 && (
              <div
                className="gamma-feature-cloud"
                role="group"
                aria-label="More features"
              >
                {features.map(([label, status]) => (
                  <div key={label}>
                    <Sparkles aria-hidden="true" />
                    <span>{label}</span>
                    <Badge>{status}</Badge>
                  </div>
                ))}
              </div>
            )}
            <div
              className="gamma-tour-copy"
              {...guide(
                `gamma-update-slide-${slide + 1}`,
                current.tip,
                current.lesson,
              )}
              aria-live="polite"
            >
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription className={cn(!current.text && "sr-only")}>
                {current.text || "New and newly free features in Gamma 5."}
              </DialogDescription>
            </div>
            <div className="gamma-tour-controls">
              <div>
                {slide > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Previous slide"
                    onClick={() => setSlide(slide - 1)}
                  >
                    <ArrowLeft aria-hidden="true" />
                  </Button>
                )}
              </div>
              <div
                className="gamma-tour-dots"
                role="group"
                aria-label="Tour slides"
              >
                {slides.map((item, index) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    size="icon"
                    aria-label={`Go to slide ${index + 1}: ${item.title}`}
                    aria-current={index === slide ? "step" : undefined}
                    onClick={() => setSlide(index)}
                  >
                    <span />
                  </Button>
                ))}
              </div>
              <Button
                ref={nextButton}
                onClick={() =>
                  slide === slides.length - 1
                    ? onComplete()
                    : setSlide(slide + 1)
                }
              >
                {slide === slides.length - 1 ? "Start creating" : "Next"}
              </Button>
            </div>
          </>
        )}
      </div>
      {slide < 0 && <span className="gamma-hide-entry-close" />}
    </>
  );
}

function Referral({ onDone }: { onDone: () => void }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const exampleLink = "https://gamma.app/signup?r=example";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(exampleLink);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };
  return (
    <>
      <DialogTitle>Refer a friend</DialogTitle>
      <div
        {...guide(
          "gamma-referral-reward",
          "Reward both people",
          "The same 200-credit reward gives the sender and their friend a reason to use the referral link when signing up.",
        )}
      >
        <DialogDescription>
          Give 200 credits and earn 200 credits for each new referral who signs
          up for Gamma.
        </DialogDescription>
      </div>
      <div
        className="gamma-referral-link"
        {...guide(
          "gamma-referral-share",
          "Make sharing easy",
          "A ready-made link makes the next step simple. This preview copies an example link, so it cannot earn referral credits.",
          1,
        )}
      >
        <Input
          aria-label="Example referral link"
          readOnly
          value={exampleLink}
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button variant="outline" size="sm" onClick={copyLink}>
          {copyState === "copied" ? "Copied example" : "Copy link"}
        </Button>
      </div>
      {copyState !== "idle" && (
        <p className="gamma-copy-status" role="status">
          {copyState === "copied"
            ? "Example link copied. No referral was sent."
            : "Copy is unavailable. Select the example link to copy it."}
        </p>
      )}
      <div className="gamma-referral-footer">
        <Button onClick={onDone}>Done</Button>
      </div>
    </>
  );
}

const individualPlans = [
  {
    name: "Plus",
    description: "For extra AI power and removing Gamma branding",
    annual: "400",
    total: "4,800",
    monthly: "500",
    previous: "Free",
    benefits: [
      "1,000 monthly credits",
      "Create up to 100 slides per prompt",
      "Remove Gamma branding",
      "Advanced AI image models",
    ],
  },
  {
    name: "Pro",
    description: "For premium AI models, API, and more customization",
    annual: "950",
    total: "11,400",
    monthly: "1,300",
    previous: "Plus",
    benefits: [
      "4,000 monthly credits",
      "Premium AI image models",
      "Custom branding",
      "Detailed analytics & advanced sharing",
      "Publish up to 10 custom domains",
      "API access",
    ],
  },
  {
    name: "Ultra",
    description:
      "For 20× more AI usage and unlocking access to the most advanced models",
    annual: "7,833.25",
    total: "93,999",
    monthly: "8,704",
    previous: "Pro",
    benefits: [
      "20,000 monthly credits",
      "Access to the most advanced AI models (text, image, video)",
      "Publish up to 100 custom domains",
      "Early access to new features",
    ],
  },
];
const businessBenefits = [
  "10,000 monthly credits per seat",
  "Shared workspace credits for extra usage",
  "SSO authentication",
  "SOC 2 documentation upon request",
  "Access to the most advanced AI models",
  "Advanced data controls",
];
const enterpriseBenefits = [
  "Custom credits for your organization",
  "Advanced admin controls",
  "Connector & API governance",
  "Brand translation & elevation services",
  "SCIM provisioning",
  "Purchase orders & payment terms",
  "Priority customer support",
  "Dedicated onboarding & customer success",
];
function Benefits({ children }: { children: string[] }) {
  return (
    <ul className="gamma-plan-benefits">
      {children.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function Plans({ onBoundary }: { onBoundary: (boundary: Boundary) => void }) {
  const [annual, setAnnual] = useState(true);
  const [seats, setSeats] = useState("1");
  const upgrade = (name: string) =>
    onBoundary({
      title: `Upgrade to ${name}`,
      description:
        "This local preview stops before checkout. No plan is changed and no payment is made.",
    });
  return (
    <>
      <DialogTitle className="gamma-plan-heading">
        Choose the plan that’s right for you
      </DialogTitle>
      <DialogDescription className="sr-only">
        Compare individual and business plans.
      </DialogDescription>
      <Tabs defaultValue="individual" className="gamma-plan-tabs">
        <TabsList aria-label="Plan audience" className="gamma-plan-audiences">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="individual" className="gamma-plan-panel">
          <div
            className="gamma-billing"
            {...guide(
              `gamma-plan-billing-${annual ? "annual" : "monthly"}`,
              "Make annual savings visible",
              "The saving sits above the billing choice. Each annual price also shows the full yearly charge, making the commitment clear.",
            )}
          >
            <p>
              <strong>Save up to 26%</strong> with annual billing
            </p>
            <div>
              <Button
                variant={annual ? "ghost" : "secondary"}
                size="sm"
                aria-pressed={!annual}
                onClick={() => setAnnual(false)}
              >
                Pay monthly
              </Button>
              <Button
                variant={annual ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={annual}
                onClick={() => setAnnual(true)}
              >
                Pay annually
              </Button>
            </div>
          </div>
          <div
            className="gamma-plan-cards"
            {...guide(
              "gamma-plan-ladder",
              "Compare the added value",
              "Credits and features rise across the three plans. The most popular label gives people a suggested place to start comparing.",
              1,
            )}
          >
            {individualPlans.map((plan) => (
              <article
                className={cn(
                  "gamma-plan-card",
                  plan.name === "Pro" && "gamma-plan-popular",
                )}
                key={plan.name}
              >
                {plan.name === "Pro" && (
                  <Badge className="gamma-popular-label">Most popular</Badge>
                )}
                <div className="gamma-plan-summary">
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <div className="gamma-plan-price">
                    ₹{annual ? plan.annual : plan.monthly}
                  </div>
                  <p>/ seat / month</p>
                  <p className="gamma-plan-charge">
                    {annual
                      ? `₹${plan.total} per seat, billed annually`
                      : "Billed monthly"}
                  </p>
                </div>
                <div className="gamma-plan-details">
                  <Button
                    variant={plan.name === "Pro" ? "default" : "outline"}
                    onClick={() => upgrade(plan.name)}
                  >
                    Upgrade to {plan.name}
                  </Button>
                  <p>Everything in {plan.previous}, and:</p>
                  <Benefits>{plan.benefits}</Benefits>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="business" className="gamma-plan-panel">
          <div
            className="gamma-plan-cards gamma-business-cards"
            {...guide(
              "gamma-business-plans",
              "Offer a team path",
              "Business adds shared usage and team controls. Enterprise offers a separate conversation for organizations with more specific needs.",
            )}
          >
            <article className="gamma-plan-card">
              <div className="gamma-plan-summary">
                <h3>Business</h3>
                <p>For organizations ready to make it official with Gamma</p>
                <div className="gamma-plan-price">₹3,482</div>
                <p>/ seat / month</p>
                <p className="gamma-plan-charge">
                  ₹41,784 per seat, billed annually
                </p>
              </div>
              <div className="gamma-plan-seats">
                <label htmlFor="gamma-seats">Number of seats:</label>
                <Input
                  id="gamma-seats"
                  type="number"
                  min="1"
                  step="1"
                  value={seats}
                  onChange={(event) => setSeats(event.target.value)}
                  onBlur={() => {
                    if (!seats || Number(seats) < 1) setSeats("1");
                  }}
                />
              </div>
              <div className="gamma-plan-details">
                <Button variant="outline" onClick={() => upgrade("Business")}>
                  Upgrade to Business
                </Button>
                <p>Business includes:</p>
                <Benefits>{businessBenefits}</Benefits>
              </div>
            </article>
            <article className="gamma-plan-card">
              <div className="gamma-plan-summary">
                <h3>Enterprise</h3>
                <p>
                  For organizations that need centralized control, invoiced
                  billing, or dedicated customer success
                </p>
                <div className="gamma-plan-price gamma-custom-price">
                  Custom
                </div>
                <p>Annual agreement, tailored to your rollout</p>
              </div>
              <div className="gamma-plan-seats">Flexible team size</div>
              <div className="gamma-plan-details">
                <Button
                  variant="outline"
                  onClick={() =>
                    onBoundary({
                      title: "Contact sales",
                      description:
                        "This local preview stops before contacting Gamma. No message is sent and no sales request is created.",
                    })
                  }
                >
                  Contact sales
                </Button>
                <p>Everything in Business, plus:</p>
                <Benefits>{enterpriseBenefits}</Benefits>
                <p className="gamma-coming-soon">Coming soon:</p>
                <p>Workspace instructions</p>
              </div>
            </article>
          </div>
        </TabsContent>
      </Tabs>
      <footer className="gamma-plan-footer">
        <p>Prices are subject to tax depending on your location.</p>
        <p>We’re a SOC 2 Type II compliant organization.</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onBoundary({
              title: "Trust Center",
              description:
                "The external Trust Center was not inspected. This local preview stops here.",
            })
          }
        >
          Learn more at our Trust Center
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onBoundary({
              title: "Paid plans",
              description:
                "The external plan details page was not inspected. This local preview stops here.",
            })
          }
        >
          Learn more about our paid plans
        </Button>
      </footer>
    </>
  );
}

export function GammaWireframe({ patternId }: { patternId: string }) {
  const [surface, setSurface] = useState<Surface>(
    patternId === "gamma-feature-tour"
      ? "announcement"
      : patternId === "gamma-referral-credits"
        ? "referral"
        : patternId === "gamma-plan-comparison"
          ? "plans"
          : null,
  );
  const [creditsOpen, setCreditsOpen] = useState(
    patternId === "gamma-credit-upsell",
  );
  const [mobileMenu, setMobileMenu] = useState(false);
  const [boundary, setBoundaryState] = useState<Boundary | null>(null);
  const [prompt, setPrompt] = useState("");
  const creditsButton = useRef<HTMLButtonElement>(null);
  const upgradeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const boundaryFocus = useRef<HTMLElement | null>(null);
  const openingSurface = useRef(false);
  const lastSurface = useRef(surface);
  const rememberFocus = () => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  };
  const showBoundary = (next: Boundary) => {
    boundaryFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setBoundaryState(next);
  };
  const unobserved = (title: string) =>
    showBoundary({
      title,
      description:
        "This destination was not inspected. The local wireframe preserves the visible control and stops here.",
    });
  const openSurface = (next: Exclude<Surface, null>) => {
    rememberFocus();
    openingSurface.current = creditsOpen;
    lastSurface.current = next;
    setCreditsOpen(false);
    setMobileMenu(false);
    setSurface(next);
  };
  const restoreFocus = () => {
    const saved = returnFocus.current;
    const fallback =
      lastSurface.current === "plans"
        ? upgradeButton.current
        : creditsButton.current;
    if (saved?.isConnected && saved.getClientRects().length) saved.focus();
    else if (fallback?.getClientRects().length) fallback.focus();
    else menuButton.current?.focus();
  };
  const nav = (label: string, icon: ReactNode, selected = false) => (
    <Button
      key={label}
      variant="ghost"
      className={cn("gamma-nav-item", selected && "is-current")}
      aria-current={selected ? "page" : undefined}
      onClick={() => unobserved(label)}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
  const sidebar = (
    <>
      <Button
        variant="ghost"
        className="gamma-workspace"
        onClick={() => unobserved("Workspace")}
      >
        <span className="gamma-avatar">W</span>
        <span>
          Workspace<small>Free</small>
        </span>
        <ChevronDown aria-hidden="true" />
      </Button>
      <nav aria-label="Workspace">
        {nav("Create", <Plus aria-hidden="true" />, true)}
        {nav("Recent chats", <MessageSquare aria-hidden="true" />)}
        {nav("Recent gammas", <Layers aria-hidden="true" />)}
        <hr />
        {nav("Search", <Search aria-hidden="true" />)}
        {nav("All", <Layers aria-hidden="true" />)}
        {nav("Shared with you", <Users aria-hidden="true" />)}
        {nav("Sites", <Globe aria-hidden="true" />)}
        {nav("API Generated", <Code2 aria-hidden="true" />)}
      </nav>
      <div className="gamma-folders">
        <p>FOLDERS</p>
        <div>
          <Button
            variant="secondary"
            onClick={() => unobserved("Manage access")}
          >
            <Badge>NEW</Badge>Manage access
            <ArrowRight aria-hidden="true" />
          </Button>
          <span className="gamma-folder-placeholder">
            <Folder />
            <i />
          </span>
          <span className="gamma-folder-placeholder">
            <Folder />
            <i />
          </span>
          <p>Group related gammas and share them all at once.</p>
          <Button variant="ghost" onClick={() => unobserved("Create a folder")}>
            Create a folder
          </Button>
        </div>
      </div>
      {nav("Trash", <Trash2 aria-hidden="true" />)}
    </>
  );
  return (
    <div className="gamma-wireframe">
      <div className="gamma-shell">
        <aside className="gamma-rail" aria-label="Main navigation">
          <Button
            variant="ghost"
            className="gamma-brand"
            aria-label="Gamma home"
            onClick={() => {
              setSurface(null);
              setCreditsOpen(false);
            }}
          >
            G
          </Button>
          <div className="gamma-rail-items">
            {(
              [
                ["Home", Home],
                ["Media", Image],
                ["Templates", Layers],
                ["Customize", Palette],
                ["Settings", Settings],
                ["More", MoreHorizontal],
              ] as const
            ).map(([label, Icon]) => (
              <Button
                key={label}
                variant="ghost"
                className={cn(label === "Home" && "is-current")}
                onClick={() =>
                  label === "Home"
                    ? (setSurface(null), setCreditsOpen(false))
                    : unobserved(label)
                }
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
          <div className="gamma-rail-bottom">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Invite teammate"
              onClick={() => unobserved("Invite teammate")}
            >
              <UserPlus aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Feedback"
              onClick={() => unobserved("Feedback")}
            >
              <MessageSquare aria-hidden="true" />
            </Button>
            <span className="gamma-avatar">W</span>
          </div>
        </aside>
        <aside className="gamma-sidebar">{sidebar}</aside>
        <main className="gamma-main">
          <header className="gamma-topbar">
            <Button
              ref={menuButton}
              variant="ghost"
              size="icon"
              className="gamma-mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
            >
              <Menu aria-hidden="true" />
            </Button>
            <Button
              ref={upgradeButton}
              variant="outline"
              className="gamma-upgrade"
              onClick={() => openSurface("plans")}
            >
              <Sparkles aria-hidden="true" />
              <span>Upgrade for more AI</span>
            </Button>
            <div className="gamma-top-actions">
              <Button
                variant="ghost"
                className="gamma-classic"
                onClick={() => unobserved("Use classic generator")}
              >
                Use classic generator
              </Button>
              <Button
                variant="outline"
                className="gamma-new"
                onClick={() => unobserved("New from blank")}
              >
                <Plus aria-hidden="true" />
                <span>New from blank</span>
              </Button>
              <Popover open={creditsOpen} onOpenChange={setCreditsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    ref={creditsButton}
                    variant="secondary"
                    className="gamma-credits-trigger"
                    aria-label="400 credits"
                  >
                    <Sparkles aria-hidden="true" />
                    400
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="gamma-wireframe gamma-credits-popover growth-scope"
                  align="end"
                  onCloseAutoFocus={(event) => {
                    if (openingSurface.current) {
                      event.preventDefault();
                      openingSurface.current = false;
                    }
                  }}
                  aria-label="Credit balance"
                >
                  <p className="gamma-free-plan">Free plan</p>
                  <div
                    className="gamma-credit-content"
                    {...guide(
                      "gamma-credit-balance",
                      "Connect credits to upgrading",
                      "The credit balance explains what credits do and presents a paid plan for more. Monthly refreshes make the added value clear.",
                    )}
                  >
                    <div className="gamma-credit-number">
                      <strong>
                        <Sparkles aria-hidden="true" />
                        400
                      </strong>
                      <span>Credit balance</span>
                    </div>
                    <p>
                      Credits let you create and edit with AI. Upgrade for more
                      credits that refresh monthly.
                    </p>
                    <Button onClick={() => openSurface("plans")}>
                      Upgrade
                    </Button>
                  </div>
                  <div
                    className="gamma-credit-links"
                    {...guide(
                      "gamma-credit-alternatives",
                      "Offer another way forward",
                      "Referral and teammate links sit beside the upgrade offer, giving free users other actions to explore from the same place.",
                      1,
                    )}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openSurface("referral")}
                    >
                      Refer a friend
                    </Button>
                    <span aria-hidden="true">·</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => unobserved("Invite teammate")}
                    >
                      Invite teammate
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>
          <section className="gamma-creation">
            <div className="gamma-home-art" aria-hidden="true">
              <Layers aria-hidden="true" />
            </div>
            <h1>No magic words required</h1>
            <div className="gamma-composer">
              <textarea
                aria-label="What would you like to create?"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Pull the issues our team closed in the last two weeks from [Linear or Asana] and build a 7-slide sprint review: what shipped, what slipped, and what is next."
              />
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Attach a file"
                  onClick={() => unobserved("Attach a file")}
                >
                  <Plus aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Creation settings"
                  onClick={() => unobserved("Creation settings")}
                >
                  <SlidersHorizontal aria-hidden="true" />
                </Button>
                <span />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => unobserved("Choose model")}
                >
                  Lite
                  <ChevronDown aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Voice input"
                  onClick={() => unobserved("Voice input")}
                >
                  <Mic aria-hidden="true" />
                </Button>
                <Button
                  size="icon"
                  disabled={!prompt.trim()}
                  aria-label="Create with AI"
                  onClick={() =>
                    showBoundary({
                      title: "Create with AI",
                      description:
                        "This local preview stops before generation. No content is created and no Gamma credits are used.",
                    })
                  }
                >
                  <ArrowUp aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="gamma-creation-types">
              {(
                [
                  ["Presentation", Layers],
                  ["Document", FileText],
                  ["Carousel", Smartphone],
                  ["Image", Image],
                  ["Beautify", WandSparkles],
                  ["Import", Upload],
                ] as const
              ).map(([label, Icon]) => (
                <Button
                  key={label}
                  variant="outline"
                  onClick={() => unobserved(label)}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </Button>
              ))}
            </div>
            <div className="gamma-templates">
              <p>Suggested templates</p>
              <div>
                {[
                  "Iridescent Glass",
                  "Salt Air",
                  "The Quiet Deck",
                  "Daktilo Dispatch",
                  "Tangerine (Pulse)",
                  "Further Study",
                ].map((label, i) => (
                  <Button
                    variant="ghost"
                    className="gamma-template"
                    key={label}
                    onClick={() => unobserved(label)}
                  >
                    <span
                      className={cn(
                        "gamma-template-image",
                        `gamma-template-${i}`,
                      )}
                    >
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{label}</span>
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => unobserved("View all templates")}
              >
                View all templates
              </Button>
            </div>
          </section>
        </main>
      </div>
      <Dialog
        open={surface !== null}
        onOpenChange={(open) => {
          if (!open) setSurface(null);
        }}
      >
        <DialogContent
          className={cn(
            "gamma-wireframe growth-scope gamma-source-dialog",
            surface === "announcement" && "gamma-announcement-dialog",
            surface === "referral" && "gamma-referral-dialog",
            surface === "plans" && "gamma-plans-dialog",
          )}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          {surface === "announcement" && (
            <Announcement onComplete={() => setSurface(null)} />
          )}
          {surface === "referral" && (
            <Referral onDone={() => setSurface(null)} />
          )}
          {surface === "plans" && <Plans onBoundary={showBoundary} />}
        </DialogContent>
      </Dialog>
      <Dialog open={mobileMenu} onOpenChange={setMobileMenu}>
        <DialogContent
          className="gamma-wireframe gamma-mobile-sidebar growth-context"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            menuButton.current?.focus();
          }}
        >
          <DialogTitle className="sr-only">Workspace navigation</DialogTitle>
          <DialogDescription className="sr-only">
            Gamma workspace controls
          </DialogDescription>
          {sidebar}
        </DialogContent>
      </Dialog>
      <Dialog
        open={boundary !== null}
        onOpenChange={(open) => {
          if (!open) setBoundaryState(null);
        }}
      >
        <DialogContent
          className="gamma-wireframe gamma-boundary growth-context"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => boundaryFocus.current?.focus());
          }}
        >
          <DialogTitle>{boundary?.title}</DialogTitle>
          <DialogDescription>{boundary?.description}</DialogDescription>
          <p>Local preview boundary</p>
          <Button onClick={() => setBoundaryState(null)}>
            Back to wireframe
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
