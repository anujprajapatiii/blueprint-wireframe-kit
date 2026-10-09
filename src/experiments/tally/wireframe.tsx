import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpCircle,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Code,
  ExternalLink,
  Eye,
  FileText,
  FolderPlus,
  Gift,
  Globe,
  Heart,
  History,
  Home,
  Info,
  LayoutTemplate,
  LifeBuoy,
  Link,
  ListChecks,
  Mail,
  Map,
  Menu,
  MessageCircle,
  Paintbrush,
  Plus,
  QrCode,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Trophy,
  Users,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "../../components/kit";
import { growthTarget } from "../../components/growth-education";
import "./tally.css";

type Boundary = { title: string; description: string };
type Page = "home" | "domains";
type ReferralTab = "invite" | "rewards";
const guide = (id: string, title: string, description: string, order = 0) =>
  growthTarget({ id, title, description, order });

const proBenefits = [
  [
    Paintbrush,
    "Remove Tally branding.",
    "Hide all branding and make your forms truly your own.",
  ],
  [
    Globe,
    "Custom domains.",
    "Host forms on your custom (sub)domain to create branded links.",
  ],
  [
    Users,
    "Collaboration.",
    "Invite unlimited team members to shared workspaces.",
  ],
  [
    FileText,
    "Partial submissions.",
    "Capture unfinished form responses before respondents submit your form.",
  ],
  [
    Paintbrush,
    "Advanced customization.",
    "Customize your forms with built-in design options.",
  ],
  [Code, "Custom CSS.", "Inject custom CSS to fully control your form design."],
  [
    Send,
    "Email notifications.",
    "Send tailored emails to yourself and respondents.",
  ],
  [
    Mail,
    "Custom email domains.",
    "Send email notifications from your custom domain.",
  ],
  [
    Link,
    "Customize link preview.",
    "Change the form’s OG image, favicon, title and description.",
  ],
  [
    FolderPlus,
    "Workspaces & folders.",
    "Organize forms into workspaces and folders, and manage team access.",
  ],
  [
    FileText,
    "Unlimited uploads.",
    "Remove the 10 MB per file size limit when using the File Upload block.",
  ],
  [
    Eye,
    "Form visit analytics.",
    "Extended historical data for key metrics, such as visits, visit duration, and traffic sources.",
  ],
  [
    ListChecks,
    "Drop-off analytics.",
    "Identify where respondents abandon your form and increase completion rates.",
  ],
  [
    History,
    "Version history.",
    "Restore your form to a previous version up to 30 days ago.",
  ],
  [
    Globe,
    "Premium integrations.",
    "Analyze traffic sources with Google Analytics and optimize ad campaigns with Meta Pixel.",
  ],
] as const;
const businessBenefits = [
  [
    ListChecks,
    "Everything in Pro.",
    "Plus the following features tailored for organizations with advanced needs.",
  ],
  [
    ShieldCheck,
    "Control data retention.",
    "Automatically delete form submissions after a set period to comply with privacy frameworks.",
  ],
  [
    Mail,
    "Verify emails.",
    "Confirm respondents' email addresses to capture high-quality leads and increase conversions.",
  ],
  [
    History,
    "Version history.",
    "Restore your form to a previous version up to 90 days ago.",
  ],
  [
    Sparkles,
    "More to come.",
    "We are working on more Business features. Stay tuned!",
  ],
] as const;

function Plans({
  onBack,
  onBoundary,
}: {
  onBack: () => void;
  onBoundary: (boundary: Boundary) => void;
}) {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="tally-plan-back"
        onClick={onBack}
      >
        <ArrowLeft aria-hidden="true" /> Back
      </Button>
      <div className="tally-plan-content">
        <header className="tally-plan-hero">
          <div>
            <DialogTitle className="tally-plan-title">
              Do more with Tally
            </DialogTitle>
            <DialogDescription className="tally-plan-subtitle">
              Upgrade to access advanced features designed for growing teams and
              creators.
            </DialogDescription>
          </div>
          <div
            className="tally-hero-placeholder"
            aria-label="Illustration placeholder"
          >
            <div />
            <div />
            <div />
          </div>
        </header>
        <div
          className="tally-billing"
          {...guide(
            `tally-billing-${yearly ? "yearly" : "monthly"}`,
            "Choose how to pay",
            "The yearly option pairs a lower monthly figure with the full annual charge, making the saving and commitment visible.",
          )}
        >
          <Button
            variant={yearly ? "ghost" : "secondary"}
            size="sm"
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Pay monthly
          </Button>
          <Button
            variant={yearly ? "secondary" : "ghost"}
            size="sm"
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Pay yearly
          </Button>
          <Badge>2 months off</Badge>
        </div>
        <div className="tally-plan-grid">
          {(["Pro", "Business"] as const).map((name) => {
            const isPro = name === "Pro";
            const price = isPro ? (yearly ? "24" : "29") : yearly ? "74" : "89";
            const total = isPro
              ? yearly
                ? "290"
                : "29"
              : yearly
                ? "890"
                : "89";
            return (
              <section
                key={name}
                className="tally-plan-card"
                {...guide(
                  `tally-plan-${name.toLowerCase()}`,
                  isPro ? "Show the paid benefits" : "Compare the higher plan",
                  isPro
                    ? "Pro connects its price to practical benefits such as custom domains and collaboration, helping people judge what upgrading adds."
                    : "Business builds on Pro with controls for organizations. Keeping both plans visible helps people compare the added features and price.",
                  isPro ? 1 : 2,
                )}
              >
                <div className="tally-plan-heading">
                  <h2>{name}</h2>
                  <div className="tally-price">
                    <span>$</span>
                    <strong>{price}</strong>
                    <small>per month</small>
                  </div>
                </div>
                <Button
                  className="tally-plan-cta"
                  onClick={() =>
                    onBoundary({
                      title: `Upgrade to ${name}`,
                      description:
                        "The source checkout was not inspected. This local preview stops before payment or a subscription change.",
                    })
                  }
                >
                  Upgrade to {name}
                </Button>
                <p className="tally-payment">
                  Pay ${total} Every {yearly ? "Year" : "Month"}
                </p>
                <div
                  className={cn(
                    "tally-benefits",
                    isPro && "tally-benefits-pro",
                  )}
                >
                  {(isPro ? proBenefits : businessBenefits).map(
                    ([Icon, title, copy]) => (
                      <div className="tally-benefit" key={title}>
                        <Icon aria-hidden="true" />
                        <p>
                          <strong>{title}</strong> {copy}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </section>
            );
          })}
        </div>
        <p className="tally-fair-use">
          Tally's plans are subject to our{" "}
          <button
            onClick={() =>
              onBoundary({
                title: "Fair Use Policy",
                description:
                  "The policy destination was not inspected. This preview keeps you in the local wireframe.",
              })
            }
          >
            Fair Use Policy
          </button>
          .
        </p>
      </div>
    </>
  );
}

function Referral({
  onBoundary,
}: {
  onBoundary: (boundary: Boundary) => void;
}) {
  const [tab, setTab] = useState<ReferralTab>("invite");
  const [how, setHow] = useState(false);
  const boundary = (title: string) =>
    onBoundary({
      title,
      description:
        "This action was not followed in the source. The local preview stops before sharing, copying a referral link, or changing payment details.",
    });
  return (
    <>
      <DialogTitle className="sr-only">Tally referral rewards</DialogTitle>
      <DialogDescription className="sr-only">
        Invite friends, inspect referral rewards, and learn how the program
        works.
      </DialogDescription>
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as ReferralTab)}
        className="tally-referral-tabs"
      >
        <div className="tally-referral-header">
          {how ? (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Back"
              onClick={() => setHow(false)}
            >
              <ArrowLeft aria-hidden="true" /> How does it work?
            </Button>
          ) : (
            <>
              <TabsList
                aria-label="Referral program"
                className="tally-tab-list"
              >
                <TabsTrigger value="invite">Invite</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>
              <Button
                className="tally-how-button"
                variant="ghost"
                size="icon"
                aria-label="How it works"
                onClick={() => setHow(true)}
              >
                <Info aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
        {how ? (
          <div
            className="tally-how-content"
            {...guide(
              "tally-referral-how",
              "Explain how rewards work",
              "The rules describe who receives the discount, when a reward becomes available, and how future rewards are paid.",
            )}
          >
            <h3>
              <Trophy aria-hidden="true" /> How do our referrals work?
            </h3>
            <ul>
              <li>
                Share Tally with your friends &amp; network via our widget.
              </li>
              <li>
                We share 20% of their monthly subscription up to $150 with you
                if your referral becomes our customer.
              </li>
              <li>
                Your friends &amp; network will receive a 50% discount for the
                first 3 months of their Tally subscription.
              </li>
            </ul>
            <h3>
              <Gift aria-hidden="true" /> How do I claim my reward?
            </h3>
            <ul>
              <li>
                As soon as you have earned your first reward, you can choose
                your favorite reward option in our widget.
              </li>
              <li>
                You will receive your first reward after we have processed your
                input.
              </li>
              <li>
                All future rewards will be automatically transferred to you.
                Nothing else to do!
              </li>
            </ul>
            <h3>
              <Eye aria-hidden="true" /> Keep track of your rewards
            </h3>
            <p>
              The earned amounts will be displayed in your widget. For each new
              reward, we will notify &amp; reward you directly.
            </p>
            <div className="tally-referral-legal">
              <button onClick={() => boundary("Referral terms")}>Terms</button>
              <button onClick={() => boundary("Privacy policy")}>
                Privacy policy
              </button>
            </div>
          </div>
        ) : (
          <>
            <TabsContent
              value="invite"
              className="tally-referral-body"
              {...guide(
                "tally-referral-invite",
                "Give and get a reward",
                "The offer gives friends a discount and the sender a reward. Sharing options sit directly below the invitation link.",
              )}
            >
              <h2>Give 50% off. Get up to $150.</h2>
              <p>
                Invite your friends to Tally and give them 50% off for 3 months
                on any plan. You'll earn 20% of their subscription cost, up to
                $150 per referral.
              </p>
              <div className="tally-invite-link">
                <Gift aria-hidden="true" />
                <div>
                  <small>Invite link</small>
                  <span>tally.cello.so/example</span>
                </div>
              </div>
              <Button
                className="tally-full-button"
                onClick={() => boundary("Copy invite link")}
              >
                Copy invite link
              </Button>
              <div className="tally-share-actions">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on X (Twitter)"
                  onClick={() => boundary("Share on X (Twitter)")}
                >
                  <X aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share via email"
                  onClick={() => boundary("Share via email")}
                >
                  <Mail aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on LinkedIn"
                  onClick={() => boundary("Share on LinkedIn")}
                >
                  <span aria-hidden="true" className="tally-linkedin">
                    in
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Show QR code"
                  onClick={() => boundary("Show QR code")}
                >
                  <QrCode aria-hidden="true" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent
              value="rewards"
              className="tally-referral-body tally-rewards-body"
              {...guide(
                "tally-referral-rewards",
                "Make rewards visible",
                "The reward balance and empty state connect future earnings to a friend upgrading, while keeping the payment-details action available.",
              )}
            >
              <div className="tally-reward-balance">
                <strong>Ready to claim: $0</strong>
                <span
                  aria-label="Your link has been viewed 0 time(s)"
                  title="Your link has been viewed 0 time(s)"
                >
                  <Eye aria-hidden="true" /> 0
                </span>
              </div>
              <div className="tally-reward-empty">
                <Gift aria-hidden="true" />
                <h2>No rewards yet</h2>
                <p>
                  You will find your rewards here when someone uses your link to
                  upgrade.
                </p>
              </div>
              <Button
                className="tally-full-button"
                onClick={() => boundary("Add payment details")}
              >
                Add payment details
              </Button>
            </TabsContent>
          </>
        )}
      </Tabs>
      <footer className="tally-referral-footer">
        Share with <Link aria-hidden="true" /> cello
      </footer>
    </>
  );
}

function Announcement({
  review,
  onClose,
  onBoundary,
}: {
  review: boolean;
  onClose: () => void;
  onBoundary: (boundary: Boundary) => void;
}) {
  return (
    <aside
      className="tally-news growth-context"
      aria-labelledby="tally-news-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
    >
      <header className="tally-news-header">
        <h2 id="tally-news-title">What's new</h2>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close What's new"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </Button>
      </header>
      <div className="tally-news-scroll">
        <div className="tally-news-card growth-scope">
          <div
            className="tally-news-offer"
            {...(review
              ? guide(
                  "tally-review-request",
                  "Ask customers for support",
                  "The review request explains how an existing customer can support Tally. Its link offers a direct next step to leave a review.",
                )
              : {})}
          >
            <p>
              Tally is a bootstrapped company and grows through the support of
              amazing customers like you. If you love using Tally, the best way
              to support us is by{" "}
              <button
                className="tally-inline-link"
                onClick={() =>
                  onBoundary({
                    title: "Leave a quick review",
                    description:
                      "The source link leads to a G2 review page. That page and review submission were not inspected; this local preview stops here.",
                  })
                }
              >
                leaving a quick review
              </button>{" "}
              <Heart className="tally-inline-heart" aria-label="heart" />
            </p>
          </div>
          <div
            className="tally-news-offer"
            {...(!review
              ? guide(
                  "tally-office-hours",
                  "Offer direct help",
                  "Free office hours invite people to ask the founders questions. The session offers a clear reason to return and get help.",
                )
              : {})}
          >
            <p>
              We also host <strong>monthly office hours</strong> — a free, open
              session where you can ask Marie and Filip, the founders of Tally,
              anything directly. Come say hi, share feedback, or get help with
              your forms.
            </p>
            <button
              className="tally-inline-link tally-office-link"
              onClick={() =>
                onBoundary({
                  title: "Join our next office hours",
                  description:
                    "The source link leads to Tally’s events on Luma. Event details and registration were not inspected; this local preview stops here.",
                })
              }
            >
              Join our next office hours →
            </button>
          </div>
        </div>
        <article className="tally-update">
          <h3>
            <span>September 11, 2026 —</span>Faster search and a dashboard
            redesign
          </h3>
          <div
            className="tally-search-placeholder"
            role="img"
            aria-label="Placeholder for the dashboard search screenshot"
          >
            <div className="tally-mini-browser">
              <span />
              <span />
              <span />
              <i />
            </div>
            <div className="tally-mini-app">
              <div className="tally-mini-sidebar">
                {Array.from({ length: 11 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
              <div className="tally-mini-rows">
                {Array.from({ length: 6 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
              <div className="tally-mini-search">
                <Search aria-hidden="true" />
                {Array.from({ length: 5 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
            </div>
          </div>
          <h4>Faster search</h4>
          <p>
            Search in Tally is faster and a lot better at finding what you need.
            Open the search (tip: type <kbd>cmd/ctrl + K</kbd>) and start
            typing: your forms, workspaces, folders and help center articles now
            come up instantly, even from a partial name or a small typo. Help
            center searches understand what you're asking, so you can describe
            your problem in your own words instead of guessing the right
            keyword.
          </p>
        </article>
      </div>
    </aside>
  );
}

export function TallyWireframe({
  patternId,
  title,
}: {
  patternId: string;
  title?: string;
}) {
  const isCommunity =
    patternId === "tally-office-hours" || patternId === "tally-review-request";
  const [page, setPage] = useState<Page>(
    patternId === "tally-custom-domain-gate" || isCommunity
      ? "domains"
      : "home",
  );
  const [referralOpen, setReferralOpen] = useState(
    patternId === "tally-referral-reward",
  );
  const [plansOpen, setPlansOpen] = useState(
    patternId === "tally-plan-comparison",
  );
  const [newsOpen, setNewsOpen] = useState(isCommunity);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [boundary, setBoundaryState] = useState<Boundary | null>(null);
  const boundaryReturnFocus = useRef<HTMLElement | null>(null);
  const setBoundary = (next: Boundary | null) => {
    if (next)
      boundaryReturnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    setBoundaryState(next);
  };
  const returnFocus = useRef<HTMLElement | null>(null);
  const rewardsButton = useRef<HTMLButtonElement>(null);
  const upgradeButton = useRef<HTMLButtonElement>(null);
  const newsButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
  const rememberFocus = () => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setMobileMenu(false);
  };
  const restoreFocus = (fallback: HTMLButtonElement | null) => {
    const target = returnFocus.current;
    if (target?.isConnected && target.getClientRects().length) target.focus();
    else if (fallback?.getClientRects().length) fallback.focus();
    else mobileButton.current?.focus();
  };
  const openPlans = () => {
    rememberFocus();
    setNewsOpen(false);
    setPlansOpen(true);
  };
  const unobserved = (label: string) =>
    setBoundary({
      title: label,
      description:
        "This destination was not inspected. The local wireframe preserves the visible control and stops here.",
    });
  const nav = (
    label: string,
    icon: ReactNode,
    action?: () => void,
    current = false,
  ) => (
    <Button
      key={label}
      variant="ghost"
      className={cn("tally-nav-item", current && "is-current")}
      aria-current={current ? "page" : undefined}
      onClick={() => {
        setMobileMenu(false);
        (action ?? (() => unobserved(label)))();
      }}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
  const closeNews = () => {
    setNewsOpen(false);
    requestAnimationFrame(() =>
      newsButton.current?.getClientRects().length
        ? newsButton.current.focus()
        : mobileButton.current?.focus(),
    );
  };
  const domainGrowth = patternId === "tally-custom-domain-gate" && !newsOpen;
  return (
    <div className="tally-wireframe growth-context">
      <div className="tally-shell">
        <aside
          className={cn("tally-sidebar", mobileMenu && "is-mobile-open")}
          aria-label="Tally navigation"
        >
          <Button
            variant="ghost"
            className="tally-account"
            onClick={() => unobserved("Account")}
          >
            <span className="tally-avatar">A</span>
            <strong>Account</strong>
            <ChevronDown aria-hidden="true" />
          </Button>
          <nav aria-label="Main navigation">
            {nav(
              "Home",
              <Home aria-hidden="true" />,
              () => {
                setPage("home");
                setNewsOpen(false);
              },
              page === "home",
            )}
            {nav("Search", <Search aria-hidden="true" />)}
            {nav("Members", <Users aria-hidden="true" />, openPlans)}
            {nav(
              "Domains",
              <Globe aria-hidden="true" />,
              () => {
                setPage("domains");
                setNewsOpen(false);
              },
              page === "domains" && !newsOpen,
            )}
            {nav("Settings", <Settings aria-hidden="true" />)}
            <Button
              ref={upgradeButton}
              variant="ghost"
              className={cn(
                "tally-nav-item",
                patternId === "tally-plan-comparison" &&
                  !plansOpen &&
                  "growth-scope tally-reopen",
              )}
              onClick={openPlans}
              {...(patternId === "tally-plan-comparison" && !plansOpen
                ? guide(
                    "tally-plans-reopen",
                    "Revisit the paid plans",
                    "Upgrade plan keeps the comparison available from the sidebar, so people can return when they need the added features.",
                  )
                : {})}
            >
              <ArrowUpCircle aria-hidden="true" />
              Upgrade plan
            </Button>
            <p className="tally-nav-label">Workspaces</p>
            <p className="tally-nav-label">Product</p>
            {nav("Templates", <LayoutTemplate aria-hidden="true" />)}
            <Button
              ref={newsButton}
              variant="ghost"
              className={cn(
                "tally-nav-item",
                newsOpen && "is-current",
                isCommunity && !newsOpen && "growth-scope tally-reopen",
              )}
              onClick={() => {
                setMobileMenu(false);
                setNewsOpen((open) => !open);
              }}
              aria-expanded={newsOpen}
              aria-controls="tally-news-title"
              {...(isCommunity && !newsOpen
                ? guide(
                    "tally-news-reopen",
                    "Return to the invitation",
                    "What's new keeps the community invitation alongside product updates, giving people a familiar place to find it again.",
                  )
                : {})}
            >
              <Sparkles aria-hidden="true" />
              What's new
            </Button>
            {nav("Roadmap", <Map aria-hidden="true" />)}
            {nav("Feature requests", <MessageCircle aria-hidden="true" />)}
            <Button
              ref={rewardsButton}
              variant="ghost"
              className={cn(
                "tally-nav-item",
                patternId === "tally-referral-reward" &&
                  !referralOpen &&
                  "growth-scope tally-reopen",
              )}
              onClick={() => {
                rememberFocus();
                setNewsOpen(false);
                setReferralOpen(true);
              }}
              {...(patternId === "tally-referral-reward" && !referralOpen
                ? guide(
                    "tally-referral-reopen",
                    "Keep rewards within reach",
                    "Rewards gives the referral offer a permanent place in the sidebar, so people can return to share or check earnings.",
                  )
                : {})}
            >
              <Gift aria-hidden="true" />
              Rewards
            </Button>
            {nav("Trash", <Trash2 aria-hidden="true" />)}
            <p className="tally-nav-label">Help</p>
            {nav("Get started", <Send aria-hidden="true" />)}
            {nav("How-to guides", <BookOpen aria-hidden="true" />)}
            {nav("Help center", <LifeBuoy aria-hidden="true" />)}
            {nav("Contact support", <MessageCircle aria-hidden="true" />)}
          </nav>
          <Button
            variant="ghost"
            className="tally-feedback"
            onClick={() => unobserved("Give Feedback")}
          >
            <Heart aria-hidden="true" /> Give Feedback
          </Button>
        </aside>
        <main className="tally-main">
          <header className="tally-topbar">
            <Button
              ref={mobileButton}
              variant="ghost"
              size="icon"
              className="tally-mobile-menu"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu((open) => !open)}
            >
              {mobileMenu ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </Button>
            <span className="tally-breadcrumb">
              <Home aria-hidden="true" />
              {page === "domains" && (
                <>
                  <span>/</span> Domains
                </>
              )}
            </span>
            <div className="tally-top-actions">
              {page === "domains" ? (
                <Button size="sm" onClick={openPlans}>
                  <Plus aria-hidden="true" />
                  Add domain
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="tally-new-workspace"
                    onClick={() => unobserved("New workspace")}
                  >
                    <FolderPlus aria-hidden="true" />
                    New workspace
                  </Button>
                  <Button size="sm" onClick={() => unobserved("New form")}>
                    <Plus aria-hidden="true" />
                    New form
                  </Button>
                </>
              )}
            </div>
          </header>
          <div className="tally-page-content">
            {page === "domains" ? (
              <div
                className={cn(
                  "tally-domain-empty",
                  domainGrowth && "growth-scope",
                )}
                {...(domainGrowth
                  ? guide(
                      "tally-custom-domain-gate",
                      "Connect a benefit to Pro",
                      "The empty state explains branded form links and labels the feature Pro. Add domain opens the paid-plan comparison.",
                    )
                  : {})}
              >
                <Globe className="tally-empty-icon" aria-hidden="true" />
                <h1>
                  No custom domains yet <Badge>Pro</Badge>
                </h1>
                <p>
                  Personalize the form links with your own domain.{" "}
                  <button
                    className="tally-inline-link"
                    onClick={() =>
                      setBoundary({
                        title: "Learn about custom domains",
                        description:
                          "The source links to Tally’s custom-domain help page. That guide was not inspected; this local preview stops here.",
                      })
                    }
                  >
                    Learn about custom domains.
                  </button>
                </p>
                <Button onClick={openPlans}>
                  <Plus aria-hidden="true" />
                  Add domain
                </Button>
              </div>
            ) : (
              <div className="tally-home-empty">
                <div
                  className="tally-empty-art"
                  aria-label="Illustration placeholder"
                >
                  <FileText aria-hidden="true" />
                  <FileText aria-hidden="true" />
                  <FileText aria-hidden="true" />
                </div>
                <h1>No forms yet</h1>
                <p>
                  Roll up your sleeves and let’s get started.
                  <br />
                  It's as simple as one-two-three.
                </p>
                <Button onClick={() => unobserved("New form")}>
                  <Plus aria-hidden="true" />
                  New form
                </Button>
              </div>
            )}
          </div>
          <Button
            className="tally-help"
            variant="outline"
            size="icon"
            aria-label="Help"
            onClick={() => unobserved("Help")}
          >
            <CircleHelp aria-hidden="true" />
          </Button>
        </main>
      </div>
      {newsOpen && (
        <Announcement
          review={patternId === "tally-review-request"}
          onClose={closeNews}
          onBoundary={setBoundary}
        />
      )}
      <Dialog open={referralOpen} onOpenChange={setReferralOpen}>
        <DialogContent
          className="tally-wireframe tally-referral-dialog growth-scope"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus(rewardsButton.current);
          }}
        >
          <Referral onBoundary={setBoundary} />
        </DialogContent>
      </Dialog>
      <Dialog open={plansOpen} onOpenChange={setPlansOpen}>
        <DialogContent
          className="tally-wireframe tally-plans-dialog growth-scope"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus(upgradeButton.current);
          }}
        >
          <Plans onBack={() => setPlansOpen(false)} onBoundary={setBoundary} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(boundary)}
        onOpenChange={(open) => {
          if (!open) setBoundary(null);
        }}
      >
        <DialogContent
          className="tally-wireframe tally-boundary growth-context"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => boundaryReturnFocus.current?.focus());
          }}
        >
          <DialogTitle>{boundary?.title}</DialogTitle>
          <DialogDescription>{boundary?.description}</DialogDescription>
          <p className="tally-boundary-label">
            <ExternalLink aria-hidden="true" /> Local preview boundary
          </p>
          <Button onClick={() => setBoundary(null)}>Back to wireframe</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
