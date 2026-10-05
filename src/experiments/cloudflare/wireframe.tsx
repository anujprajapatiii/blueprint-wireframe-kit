import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  Code,
  Globe,
  Search,
  X,
} from "lucide-react";
import { Button, Input } from "../../components/kit";
import { growthTarget } from "../../components/growth-education";
import "./cloudflare.css";

type Screen = "home" | "plans" | "containers" | "checkout" | "workers";
const paidBenefits = [
  "10 million requests included monthly, then $0.30 per million",
  "Up to 5 min CPU time per request",
  "Standard ticket support",
  "Containers & Email sending included",
];
const freeBenefits = [
  "100,000 requests per day",
  "Up to 10 ms CPU time per request",
  "Community support",
];
const enterpriseBenefits = [
  "Custom pricing and limits for all products",
  "Priority support",
  "Dedicated account team",
  "Advanced compliance and security",
  "Custom model deployment",
  "Enhanced Logpush",
  "Workers for Platforms base fee waived",
];
const computeItems = [
  "Workers & Pages",
  "Observability",
  "Workers for Platforms",
  "Containers",
  "Durable Objects",
  "Queues",
  "Workflows",
  "Browser Run",
  "VPC",
  "Email Service",
  "Workers plans",
  "Flagship",
];
const comparison = [
  {
    category: "COMPUTE",
    title: "Workers",
    rows: [
      ["Requests", "100,000 / day", "$0.30 / million requests"],
      ["CPU Time", "10 ms / request", "$0.02 / million CPU ms"],
      ["CPU time (max per invocation)", "10 ms", "5 min"],
      ["Subrequests per request", "50", "10,000"],
      ["Number of Workers", "100", "500"],
      ["Cron Triggers per account", "5", "250"],
    ],
  },
  {
    title: "Containers",
    rows: [
      ["Memory", "—", "$0.0000025 / GiB-second"],
      ["CPU", "—", "$0.000020 / vCPU-second"],
      ["Disk", "—", "$0.00000007 / GB-second"],
      ["Network Egress (NA/EU)", "—", "$0.025 / GB"],
    ],
  },
  {
    title: "Durable Objects",
    rows: [
      ["Requests", "100,000 / day", "$0.15 / million requests"],
      ["Duration", "13,000 GB-s / day", "$12.50 / million GB-s"],
      ["SQL Rows Read", "5,000,000 / day", "$0.001 / million rows"],
      ["SQL Rows Written", "100,000 / day", "$1.00 / million rows"],
      ["SQL Stored Data", "5 GB", "$0.20 / GB-month"],
    ],
  },
];

const furtherComparison = [
  {
    category: "STORAGE & DATA",
    title: "Workers KV",
    rows: [
      ["Stored Data", "1 GB", "$0.50 / GB-month"],
      ["Read Requests", "100,000 / day", "$0.50 / million requests"],
      [
        "Write, Delete, List requests",
        "1,000 / day",
        "$5.00 / million requests",
      ],
    ],
  },
  {
    title: "D1",
    rows: [
      ["Storage", "5 GB (total)", "$0.75 / GB-month"],
      ["Rows Read", "5,000,000 / day", "$0.001 / million rows"],
      ["Rows Written", "100,000 / day", "$1.00 / million rows"],
      ["Max databases", "10", "50,000"],
      ["Max account storage", "5 GB", "1 TB"],
    ],
  },
  {
    title: "Queues",
    rows: [
      ["Standard Operations", "10,000 / day included", "$0.40 / million ops"],
    ],
  },
  { title: "Hyperdrive", rows: [["Queries", "100,000 / day", "Unlimited"]] },
  {
    title: "Workers Analytics Engine",
    rows: [
      ["Data Points Written", "100,000 / day", "$0.25 / million"],
      ["Read Queries", "10,000 / day", "$1.00 / million"],
    ],
  },
  {
    title: "Basin Pipelines",
    rows: [
      ["Streams (ingress)", "—", "Unlimited"],
      ["SQL transforms", "—", "50 GB / month included, then $0.04 / GB"],
      [
        "Sinks (delivery to R2)",
        "—",
        "50 GB / month included, then $0.03 / GB (JSON) or $0.06 / GB (Parquet/Iceberg)",
      ],
    ],
  },
  {
    category: "AI",
    title: "Vectorize",
    rows: [
      [
        "Vector Dimensions Queried",
        "30,000,000 queried dimensions / month",
        "$0.01 / million",
      ],
      [
        "Vector Dimensions Stored",
        "5,000,000 stored dimensions",
        "$0.05 / hundred million",
      ],
    ],
  },
  {
    title: "Workers AI",
    rows: [["Neurons", "10,000 neurons / day", "$0.011 / thousand neurons"]],
  },
  { title: "AI Search", rows: [["Max instances", "100", "5,000"]] },
  { title: "AI Gateway", rows: [["Gateways", "10", "20"]] },
  {
    category: "OBSERVABILITY",
    title: "Workers Logs",
    rows: [["Events", "200,000 / day", "$0.60 / million events"]],
  },
  {
    title: "Workers Logpush",
    rows: [["Requests", "—", "$0.05 / million requests"]],
  },
  {
    category: "OTHER SERVICES",
    title: "Workers Builds",
    rows: [
      ["Build Minutes", "3,000 / month", "6,000 / month, then $0.005 / minute"],
      ["Concurrent builds", "1", "6"],
    ],
  },
  { title: "Email Sending", rows: [["Availability", "—", "Included"]] },
];

function guide(id: string, title: string, description: string, order = 0) {
  return growthTarget({ id, title, description, order });
}
function Footer() {
  return (
    <footer className="cf-footer">
      <span>Support</span>
      <span>System Status</span>
      <span>Careers</span>
      <span>Terms of Use</span>
      <span>Report Security Issues</span>
      <span>Privacy Policy</span>
      <span>Cookie Preferences</span>
      <small>© 2026 Cloudflare, Inc.</small>
    </footer>
  );
}
function Benefits({ items }: { items: string[] }) {
  return (
    <ul className="cf-benefits">
      {items.map((item) => (
        <li key={item}>
          <Check size={15} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Shell({
  screen,
  onNavigate,
  children,
}: {
  screen: Screen;
  onNavigate: (next: Screen) => void;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [menuOpen]);
  const expanded = screen !== "home";
  const nav = (next: Screen) => {
    setMenuOpen(false);
    onNavigate(next);
  };
  return (
    <div className="cf-shell">
      <header className="cf-topbar">
        <div className="cf-account">
          <Cloud size={27} aria-hidden="true" />
          <span>Example account</span>
          <ChevronDown size={14} aria-hidden="true" />
        </div>
        <span className="cf-breadcrumb">
          {screen === "plans" ? "Workers plans" : ""}
        </span>
        <div className="cf-top-actions">
          <span>Ask AI</span>
          <span>Support</span>
          <span role="img" aria-label="Account">
            ○
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="cf-mobile-menu"
            ref={menuButton}
            aria-expanded={menuOpen}
            aria-controls="cf-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close menu" : "Menu"}
          </Button>
        </div>
      </header>
      <aside
        id="cf-navigation"
        className={"cf-sidebar" + (menuOpen ? " is-open" : "")}
        aria-label="Product navigation"
      >
        <div className="cf-quick-search">
          <Search size={14} aria-hidden="true" />
          <span>Quick search...</span>
          <small>⌘ K</small>
        </div>
        <nav>
          <button
            type="button"
            className={screen === "home" ? "is-current" : ""}
            onClick={() => nav("home")}
          >
            <Globe size={14} aria-hidden="true" />
            Account home
          </button>
          {["Recents", "Domains", "Observability"].map((item) => (
            <div className="cf-nav-context" key={item}>
              {item}
              <ChevronRight size={12} aria-hidden="true" />
            </div>
          ))}
          <p className="cf-nav-group">Build</p>
          <div className="cf-nav-context">
            <Code size={14} aria-hidden="true" />
            Compute
            <ChevronDown size={12} aria-hidden="true" />
          </div>
          {expanded && (
            <div className="cf-compute-nav">
              {computeItems.map((item) => {
                const target: Screen | undefined =
                  item === "Workers & Pages"
                    ? "workers"
                    : item === "Workers plans"
                      ? "plans"
                      : item === "Containers"
                        ? "containers"
                        : undefined;
                return target ? (
                  <button
                    key={item}
                    type="button"
                    className={screen === target ? "is-current" : ""}
                    aria-current={screen === target ? "page" : undefined}
                    onClick={() => nav(target)}
                  >
                    {item}
                  </button>
                ) : (
                  <div key={item} className="cf-nav-context">
                    {item}
                    {["VPC", "Flagship"].includes(item) && (
                      <span className="cf-nav-beta">Beta</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {["AI", "Storage & databases", "Images & Stream", "Realtime"].map(
            (item) => (
              <div className="cf-nav-context" key={item}>
                {item}
                <ChevronRight size={12} aria-hidden="true" />
              </div>
            ),
          )}
          <p className="cf-nav-group">Protect & connect</p>
          {[
            "Application security",
            "Zero Trust",
            "Networking",
            "Monetize",
            "Delivery & performance",
          ].map((item) => (
            <div className="cf-nav-context" key={item}>
              {item}
              <ChevronRight size={12} aria-hidden="true" />
            </div>
          ))}
          <div className="cf-nav-context cf-manage">
            Manage account
            <ChevronRight size={12} aria-hidden="true" />
          </div>
        </nav>
      </aside>
      <main id="main-content" className="cf-main" key={screen}>
        {children}
        <Footer />
      </main>
    </div>
  );
}

function EventPromotion() {
  const [selected, setSelected] = useState<"details" | "speakers" | null>(null);
  return (
    <section
      className="growth-scope cf-event cf-event-focus"
      aria-label="Connect 2026 announcement"
      {...guide(
        selected ? `cf-event-${selected}` : "cf-event-promotion",
        selected ? "Explore the event" : "Promote an event",
        selected
          ? "The event opens in a new tab, so you can explore it without losing your place in the dashboard."
          : "This banner introduces Connect while people use the dashboard. Dates, speakers and Learn more give them reasons to explore the event.",
      )}
    >
      <div className="cf-event-art" aria-hidden="true">
        <Globe size={38} />
      </div>
      <div className="cf-event-copy">
        <div className="cf-event-heading">
          <h2>Meet the Agentic Internet Builders IRL</h2>
          <div
            className="cf-event-speakers"
            role="group"
            aria-label="Featured speakers"
          >
            {[
              "Evan You",
              "Tanner Linsley",
              "Corey Quinn",
              "Peter Steinberger",
              "Fred Schott",
            ].map((name) => (
              <span
                key={name}
                role="img"
                aria-label={name}
                className="cf-speaker-placeholder"
              />
            ))}
            <a
              href="https://www.cloudflare.com/connect/speakers/"
              target="_blank"
              rel="noreferrer"
              aria-label="Browse all speakers (opens in a new tab)"
              className="cf-speaker-link"
              onClick={() => setSelected("speakers")}
            >
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <p>
          Connect brings the Cloudflare community together once a year to learn,
          collaborate, and shape what comes next. Oct 19–21, San Francisco.
        </p>
      </div>
      <Button asChild className="cf-event-action">
        <a
          href="https://www.cloudflare.com/connect/"
          target="_blank"
          rel="noreferrer"
          onClick={() => setSelected("details")}
        >
          Learn more<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Button>
    </section>
  );
}

function Home({
  onNavigate,
  eventFocus = false,
}: {
  onNavigate: (next: Screen) => void;
  eventFocus?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <div className="cf-home">
      <div className="cf-home-intro">
        <div className="cf-promotion-slot">
          {!dismissed && (
            <div className="cf-promotion-row">
              <div className="cf-promotion-anchor">
                <span className="cf-copy-status" role="status">
                  {copied ? "Setup prompt copied" : ""}
                </span>
                <Button
                  variant="secondary"
                  className={`${eventFocus ? "" : "growth-scope "}cf-agent-pill`}
                  aria-description="Works with Claude, Codex, Cursor, and OpenCode"
                  onClick={() => {
                    setCopied(true);
                    setHasCopied(true);
                  }}
                  {...(!eventFocus &&
                    guide(
                      hasCopied ? "cf-agent-copied" : "cf-agent-promotion",
                      hasCopied ? "Make setup easier" : "Introduce agent setup",
                      hasCopied
                        ? "A ready-made setup prompt saves people from writing their own. The short message confirms their action."
                        : "This small message invites people to try an agent with tools they already use. It keeps the dashboard nearby.",
                    ))}
                >
                  <span>Onboard your agent to Cloudflare</span>
                  <span className="cf-agent-symbols" aria-hidden="true">
                    ✳ ● ◈ ▣
                  </span>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="cf-dismiss"
                aria-label="Don't show this again"
                onClick={() => {
                  setDismissed(true);
                  heading.current?.focus();
                }}
              >
                <X size={14} aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
        <h1 ref={heading} tabIndex={-1}>
          {eventFocus ? "What's on the agenda?" : "Let's get to work."}
        </h1>
      </div>
      <div className="cf-home-search">
        <Search size={18} aria-hidden="true" />
        <Input aria-label="Search dashboard" placeholder="Search" readOnly />
        <span>⌘ K</span>
      </div>
      <div className="cf-shortcuts">
        <section>
          <h2>
            Domains <ChevronRight size={13} aria-hidden="true" />
          </h2>
          <div className="cf-shortcut-row">
            <Globe size={16} aria-hidden="true" />
            example.com
            <ChevronRight size={13} aria-hidden="true" />
          </div>
        </section>
        <section>
          <h2>
            Workers <ChevronRight size={13} aria-hidden="true" />
          </h2>
          {["example-api", "example-site"].map((name) => (
            <div className="cf-shortcut-row" key={name}>
              <Code size={16} aria-hidden="true" />
              {name}
              <ChevronRight size={13} aria-hidden="true" />
            </div>
          ))}
        </section>
        <section>
          <h2>Recents</h2>
          <div className="cf-shortcut-row">Workers / example-site</div>
          <button
            type="button"
            className="cf-shortcut-row"
            onClick={() => onNavigate("plans")}
          >
            Compute / Workers plans
            <ChevronRight size={13} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="cf-shortcut-row"
            onClick={() => onNavigate("workers")}
          >
            Compute / Workers & Pages
            <ChevronRight size={13} aria-hidden="true" />
          </button>
          <div className="cf-shortcut-row">SSL/TLS / Edge Certificates</div>
          <div className="cf-shortcut-row">Domains / example.com</div>
        </section>
      </div>
      {eventFocus ? (
        <EventPromotion />
      ) : (
        <section className="cf-event">
          <div className="cf-event-art" aria-hidden="true">
            <Globe size={38} />
          </div>
          <div>
            <h2>Meet the Agentic Internet Builders IRL</h2>
            <p>
              Connect brings the Cloudflare community together once a year to
              learn, collaborate, and shape what comes next. Oct 19–21, San
              Francisco.
            </p>
          </div>
          <span className="cf-context-action">Learn more</span>
        </section>
      )}
      <section className="cf-analytics">
        <div className="cf-section-heading">
          <h2>Analytics</h2>
          <span>Last 24 hours　 +　 ⟳</span>
        </div>
        <div className="cf-analytics-grid">
          {[
            "Total requests",
            "Worker invocations",
            "Workers errors",
            "Cache hit rate",
            "CPU time P90",
            "Build minutes",
          ].map((label, i) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{["1.2k", "980", "0", "12%", "1 ms", "0"][i]}</strong>
              <svg
                viewBox="0 0 400 130"
                role="img"
                aria-label={label + " sample trend"}
              >
                <path
                  d="M0 120H400M0 65H400M0 10H400"
                  stroke="var(--border)"
                  fill="none"
                />
                <path
                  d="M0 116L18 114L23 119L32 28L37 118L60 114L73 90L83 118L135 116L145 52L153 117L205 114L216 67L222 116L269 112L273 44L280 118L337 116L344 92L350 117L400 116"
                  fill="none"
                  stroke="var(--foreground-subtle)"
                  strokeWidth="1.5"
                />
              </svg>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Plans({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <div className="cf-plans">
      <h1 tabIndex={-1} data-screen-heading>
        Workers plans
      </h1>
      <div className="cf-plan-offers">
        <section className="cf-offer">
          <h2>Free</h2>
          <p className="cf-price">$0</p>
          <p>For personal use and simple applications</p>
          <Button variant="outline" disabled>
            Current plan
          </Button>
        </section>
        <section
          className="growth-scope cf-offer cf-paid"
          {...guide(
            "cf-paid-proposition",
            "Explain the paid plan",
            "The $5 starting price, usage charges and Upgrade button sit beside the free plan, making the paid option easier to compare.",
            1,
          )}
        >
          <h2>Paid</h2>
          <p className="cf-price">
            $5 <small>/ month + usage</small>
          </p>
          <p>For business use and scaling applications</p>
          <Button onClick={onUpgrade} data-upgrade-trigger>
            Upgrade
          </Button>
        </section>
        <section className="cf-offer">
          <h2>Enterprise</h2>
          <p className="cf-price">Let's talk</p>
          <p>For mission-critical applications at scale</p>
          <Button variant="outline" asChild>
            <a
              href="https://www.cloudflare.com/resource/contact-enterprise-sales/"
              target="_blank"
              rel="noreferrer"
            >
              Contact us <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </section>
      </div>
      <section className="cf-highlights">
        <h2>HIGHLIGHTS</h2>
        <section>
          <h3>Free</h3>
          <p>Includes</p>
          <Benefits items={freeBenefits} />
        </section>
        <section
          className="growth-scope cf-paid-benefits"
          {...guide(
            "cf-paid-benefits",
            "Show the added benefits",
            "Higher limits and added support show what the paid plan offers. This helps people decide whether upgrading is useful.",
            2,
          )}
        >
          <h3>Paid</h3>
          <p>Everything in Free</p>
          <Benefits items={paidBenefits} />
        </section>
        <section>
          <h3>Enterprise</h3>
          <p>Everything in Paid</p>
          <Benefits items={enterpriseBenefits} />
        </section>
      </section>
      <section className="cf-comparison">
        {[...comparison, ...furtherComparison].map((group) => (
          <section key={group.title}>
            {group.category && <h2>{group.category}</h2>}
            <h3>{group.title}</h3>
            <dl>
              {group.rows.map(([label, free, paid]) => (
                <div className="cf-comparison-row" key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <span>
                      <small>Free</small>
                      {free}
                    </span>
                    <span>
                      <small>Paid</small>
                      {paid}
                    </span>
                    <span>
                      <small>Enterprise</small>Custom
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </section>
      <a
        className="cf-doc-link"
        href="https://developers.cloudflare.com/workers/platform/limits/"
        target="_blank"
        rel="noreferrer"
      >
        View all account limits & quotas in the Workers docs{" "}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

function Containers({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <>
      <div className="cf-page-heading">
        <h1 tabIndex={-1} data-screen-heading>
          Containers
        </h1>
        <span className="cf-doc-chip">View docs</span>
        <p>Enhance your Workers with serverless containers.</p>
      </div>
      <div className="cf-gate-wrap">
        <section
          className="growth-scope cf-container-gate"
          {...guide(
            "cf-containers-gate",
            "Explain how to unlock Containers",
            "The message explains that Containers needs a paid plan. People can upgrade here or check prices before deciding.",
          )}
        >
          <Box size={44} strokeWidth={1.5} aria-hidden="true" />
          <h2>Enable Containers</h2>
          <p>
            Containers is included in the Workers Paid plan. To start using
            Containers,
            <br className="cf-wide-break" /> upgrade your Workers plan.
          </p>
          <div className="cf-gate-actions">
            <Button onClick={onUpgrade} data-upgrade-trigger>
              Purchase Workers Paid
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://developers.cloudflare.com/containers/pricing/"
                target="_blank"
                rel="noreferrer"
              >
                View pricing
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

function Workers({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <>
      <div className="cf-page-heading">
        <h1 tabIndex={-1} data-screen-heading>
          Workers & Pages
        </h1>
        <span className="cf-doc-chip">View docs</span>
        <p>
          Build & deploy serverless functions, sites, and full-stack
          applications.
        </p>
        <span className="cf-create-context">Create application</span>
      </div>
      <div className="cf-workers">
        <div className="cf-section-heading">
          <h2>Usage</h2>
          <Button size="sm" onClick={onUpgrade} data-upgrade-trigger>
            Upgrade
          </Button>
        </div>
        <div className="cf-usage-caption">
          <span>Requests today</span>
          <span>120 / 100,000</span>
        </div>
        <div className="cf-usage-track">
          <i />
        </div>
        <p className="cf-view-limits">View limits⌄</p>
        <p className="cf-period">October 1 – October 5</p>
        <div className="cf-usage-stats">
          {[
            "Requests",
            "CPU time",
            "Observability events",
            "Workers build mins",
          ].map((label, i) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{["6.2k", "3,200 ms", "0", "0"][i]}</strong>
            </article>
          ))}
        </div>
        <div className="cf-app-search">
          <Search size={16} aria-hidden="true" />
          <Input
            aria-label="Search applications"
            placeholder="Search applications"
            readOnly
          />
          <span>Show all　⌄</span>
          <span>Last modified　⌄</span>
        </div>
        {["example-api", "example-site"].map((name, i) => (
          <article className="cf-worker-card" key={name}>
            <div>
              <Code size={23} aria-hidden="true" />
              <div>
                <h3>{name}</h3>
                <p>{name}.workers.dev</p>
              </div>
              <span>{i ? "1d ago" : "19h ago"}　⋯</span>
            </div>
            <footer>
              <span>View deployments ↗</span>
              <span>{i ? "980" : "120"} requests　　0.8 ms</span>
            </footer>
          </article>
        ))}
        <div className="cf-pagination">
          <span>Showing 1–2 of 2</span>
          <span>«　 ‹　 1　 ›　 »</span>
        </div>
        <section className="cf-account-details">
          <h3>Account details</h3>
          <div>
            <span>Account ID</span>
            <span>Example account</span>
          </div>
          <div>
            <span>Subdomain</span>
            <span>example.workers.dev</span>
          </div>
        </section>
        <section className="cf-account-details">
          <h3>Cloudflare Access</h3>
          <p>
            Set up Zero Trust before requiring Access sign-in for Workers on
            this account.
          </p>
          <span>Set up Zero Trust</span>
        </section>
      </div>
    </>
  );
}

function Checkout({
  onExit,
  hasImages,
}: {
  onExit: () => void;
  hasImages: boolean;
}) {
  const exit = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    exit.current?.focus();
  }, []);
  return (
    <main id="main-content" className="cf-checkout">
      <Button
        ref={exit}
        variant="ghost"
        size="icon"
        className="cf-exit"
        aria-label="Exit checkout"
        onClick={onExit}
      >
        <X aria-hidden="true" />
      </Button>
      <div className="cf-checkout-columns">
        <section className="cf-payment">
          <p className="cf-secure">♧ Secure billing</p>
          <h1>Upgrade to Workers Paid</h1>
          <div className="cf-wallets">
            <Button disabled variant="secondary">
              Apple Pay
            </Button>
            <Button disabled variant="secondary">
              PayPal
            </Button>
          </div>
          <div className="cf-or">OR</div>
          <h2>Card</h2>
          <fieldset disabled>
            <legend>Card information</legend>
            <Input aria-label="Card number" placeholder="Card number" />
            <div className="cf-field-row">
              <Input aria-label="Expiration date" placeholder="MM / YY" />
              <Input aria-label="Security code" placeholder="Security code" />
            </div>
          </fieldset>
          <p className="cf-payment-terms">
            By providing your card information, you allow Cloudflare, Inc. to
            charge your card for future payments in accordance with their terms.
          </p>
          <fieldset disabled className="cf-billing">
            <legend>Billing address</legend>
            <div className="cf-field-row">
              <Input aria-label="First name" placeholder="First name" />
              <Input aria-label="Last name" placeholder="Last name" />
            </div>
            {[
              "Country",
              "Address line 1",
              "Address line 2 (optional)",
              "City",
            ].map((field) => (
              <Input key={field} aria-label={field} placeholder={field} />
            ))}
            <div className="cf-field-row">
              <Input aria-label="State" placeholder="State" />
              <Input aria-label="ZIP code" placeholder="ZIP code" />
            </div>
            <Input
              aria-label="Organization name"
              placeholder="Organization name (optional)"
            />
            <div className="cf-field-row">
              <Input aria-label="Account type" placeholder="Account type" />
              <Input aria-label="VAT or GST" placeholder="VAT/GST (optional)" />
            </div>
          </fieldset>
          <label className="cf-consent">
            <input type="checkbox" disabled />
            <span>
              I agree to the <u>Terms of Service</u> and <u>Privacy Policy</u>.
            </span>
          </label>
          <label className="cf-consent">
            <input type="checkbox" disabled />
            <span>
              I authorize Cloudflare to charge this card for{" "}
              <u>usage that exceeds free limits</u> each month{" "}
              <u>until cancellation</u>. Cancellation is effective at the end of
              the current billing period. Contact us via the Cloudflare
              Dashboard.
            </span>
          </label>
          <Button className="cf-confirm" disabled>
            Confirm upgrade
          </Button>
          <p className="cf-prototype-boundary">
            Reference boundary. Payment is disabled in this wireframe.
          </p>
        </section>
        <aside className="cf-order" aria-label="Order summary">
          <h2>Order summary</h2>
          <div className="cf-order-body">
            <div className="cf-order-line">
              <strong>Workers Paid Plan</strong>
              <strong>$5 / month</strong>
            </div>
            <h3>Included features</h3>
            <p>Products included with usage</p>
            <div className="cf-order-feature">
              <Check size={15} aria-hidden="true" />
              <div>
                <h4>Workers & Pages Functions</h4>
                <dl>
                  <div>
                    <dt>Requests</dt>
                    <dd>10M/month</dd>
                  </div>
                  <div>
                    <dt>CPU time</dt>
                    <dd>30s per request, 30M ms/month</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="cf-order-feature">
              <Check size={15} aria-hidden="true" />
              <div>
                <h4>Workers Builds</h4>
                <dl>
                  <div>
                    <dt>Build slots</dt>
                    <dd>6</dd>
                  </div>
                  <div>
                    <dt>Build minutes</dt>
                    <dd>6,000/month</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="cf-order-feature">
              <Check size={15} aria-hidden="true" />
              <div>
                <h4>Durable Objects</h4>
                <dl>
                  <div>
                    <dt>Requests</dt>
                    <dd>1M/month</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>400K GB-s/month</dd>
                  </div>
                  <div>
                    <dt>Storage</dt>
                    <dd>1 GB</dd>
                  </div>
                </dl>
              </div>
            </div>
            <span className="cf-more-context">⌄　+8 more</span>
            {hasImages && (
              <div className="cf-order-line cf-images">
                <span>Cloudflare Images + Stream</span>
                <strong>$0 / month</strong>
              </div>
            )}
            <h3>Overage rates</h3>
            <p>Applies when you exceed included allowance</p>
            <dl className="cf-overage">
              {[
                ["Workers requests", "$0.30/million"],
                ["Workers Builds", "$0.005/minute"],
                ["Durable Objects requests", "$0.15/million"],
                ["KV operations", "$0.50/million"],
                ["D1 rows", "$0.001/million"],
              ].map(([name, value]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <span className="cf-more-context">+5 more</span>
            <div className="cf-due">
              <div className="cf-order-line">
                <strong>Due today*</strong>
                <strong>$5/month</strong>
              </div>
              <p>
                Base fee charged today. Additional usage beyond included
                allowance billed monthly.
              </p>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}

export function CloudflareWireframe({
  patternId,
}: {
  patternId: string;
  title?: string;
}) {
  const initial: Screen =
    patternId === "cf-agent-onboarding" || patternId === "cf-event-promotion"
      ? "home"
      : patternId === "cf-containers-gate"
        ? "containers"
        : "plans";
  const [screen, setScreen] = useState<Screen>(initial);
  const [checkoutOrigin, setCheckoutOrigin] = useState<Screen>(initial);
  const focusPending = useRef(false);
  useEffect(() => {
    if (!focusPending.current || screen === "checkout") return;
    focusPending.current = false;
    const target = document.querySelector<HTMLElement>(
      "[data-upgrade-trigger], [data-screen-heading]",
    );
    target?.focus();
  }, [screen]);
  const navigate = (next: Screen) => {
    // Supporting product context stays within the currently reviewed pattern.
    if (next === "workers") {
      focusPending.current = true;
      setScreen(next);
      return;
    }
    const destination =
      next === "home"
        ? patternId === "cf-event-promotion"
          ? "cf-event-promotion"
          : "cf-agent-onboarding"
        : next === "containers"
          ? "cf-containers-gate"
          : "cf-workers-plans";
    if (destination === patternId) {
      setScreen(next);
      return;
    }
    const params = new URLSearchParams(location.search);
    params.set("view", "experiments");
    params.set("experiment", destination);
    for (const key of ["embed", "mode", "reference", "audit"])
      params.delete(key);
    window.parent.location.assign("?" + params.toString());
  };
  const upgrade = () => {
    setCheckoutOrigin(screen);
    setScreen("checkout");
  };
  const exit = () => {
    focusPending.current = true;
    setScreen(checkoutOrigin === "containers" ? "containers" : "workers");
  };
  return (
    <div className="cf-wireframe">
      {screen === "checkout" ? (
        <Checkout onExit={exit} hasImages={checkoutOrigin !== "containers"} />
      ) : (
        <Shell screen={screen} onNavigate={navigate}>
          {screen === "home" ? (
            <Home
              onNavigate={navigate}
              eventFocus={patternId === "cf-event-promotion"}
            />
          ) : screen === "plans" ? (
            <Plans onUpgrade={upgrade} />
          ) : screen === "containers" ? (
            <Containers onUpgrade={upgrade} />
          ) : (
            <Workers onUpgrade={upgrade} />
          )}
        </Shell>
      )}
    </div>
  );
}
