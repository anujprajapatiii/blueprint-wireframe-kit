import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Bell,
  Blocks,
  Box,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleX,
  Clock3,
  FileText,
  Flag,
  Home,
  Inbox,
  Layers,
  Link2,
  ListFilter,
  Lock,
  MessageSquare,
  MoreHorizontal,
  MousePointer2,
  Paperclip,
  Plus,
  Settings,
  SlidersHorizontal,
  Star,
  Triangle,
  Users,
} from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from "../../components/kit";
import { growthTarget } from "../../components/growth-education";
import "./linear.css";

type View = "welcome" | "issues" | "issue" | "signup";
const statuses = [
  "Backlog",
  "Todo",
  "In Progress",
  "In Review",
  "Done",
  "Canceled",
  "Duplicate",
  "Triage",
] as const;
type IssueStatus = (typeof statuses)[number];
const issueTitle = "Surface OAuth token expiry in integration diagnostics";
const guide = (id: string, title: string, description: string, order = 0) =>
  growthTarget({ id, title, description, order });

function StatusMark({ status }: { status: string }) {
  const Icon =
    status === "Done"
      ? CircleCheck
      : status === "Backlog"
        ? CircleDashed
        : status === "Canceled" || status === "Duplicate"
          ? CircleX
          : status === "In Progress" || status === "In Review"
            ? CircleDot
            : status === "Triage"
              ? Inbox
              : Circle;
  return <Icon aria-hidden="true" className="linear-status-icon" />;
}

function ContextItem({
  children,
  icon,
  indent = false,
}: {
  children: ReactNode;
  icon: ReactNode;
  indent?: boolean;
}) {
  return (
    <div className={cn("linear-context-item", indent && "is-indented")}>
      <span aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export function LinearWireframe() {
  const [view, setView] = useState<View>("welcome");
  const [status, setStatus] = useState<IssueStatus>("Todo");
  const [signupMethod, setSignupMethod] = useState<string | null>(null);
  const [statusChanged, setStatusChanged] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const signupReturnView = useRef<View>("welcome");
  const signupReturnFocus = useRef<HTMLElement | null>(null);
  const boundaryReturnFocus = useRef<HTMLElement | null>(null);
  const moveFocus = useRef(false);
  const returningFromSignup = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    content.current?.scrollTo(0, 0);
    if (returningFromSignup.current) {
      returningFromSignup.current = false;
      if (signupReturnFocus.current?.isConnected) {
        signupReturnFocus.current.focus();
        return;
      }
      Array.from(
        document.querySelectorAll<HTMLButtonElement>(".linear-signup-button"),
      )
        .find((button) => button.getClientRects().length > 0)
        ?.focus();
      return;
    }
    heading.current?.focus();
  }, [view]);

  const navigate = (next: View) => {
    if (next === view) return;
    moveFocus.current = true;
    setView(next);
  };
  const openSignup = () => {
    signupReturnView.current = view;
    signupReturnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    navigate("signup");
  };
  const backToDemo = () => {
    returningFromSignup.current = true;
    navigate(signupReturnView.current);
  };
  const openSignupBoundary = (method: string) => {
    boundaryReturnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSignupMethod(method);
  };
  const signup = (mobile = false) => (
    <Button
      variant="secondary"
      className={cn(
        "growth-scope linear-signup-button focus-visible:outline-ring-inverse",
        mobile && "is-mobile",
      )}
      onClick={openSignup}
      {...guide(
        mobile ? "linear-signup-mobile" : "linear-signup",
        "Keep signup close",
        "Sign up stays visible while people explore. They can try the sample workspace first, then choose to create their own.",
        4,
      )}
    >
      Sign up
    </Button>
  );

  const sampleIssueRow = (
    <Button
      variant="ghost"
      className="linear-issue-row linear-issue-link"
      onClick={() => navigate("issue")}
    >
      <MoreHorizontal aria-hidden="true" />
      <span className="linear-issue-id">ENG-411</span>
      <StatusMark status={status} />
      <span className="linear-issue-row-title">{issueTitle}</span>
      <span className="linear-row-date">Sep 18</span>
    </Button>
  );

  return (
    <div className="linear-wireframe" data-pattern="linear-interactive-demo">
      {view === "signup" ? (
        <main className="linear-signup-page">
          <Button variant="ghost" className="linear-back" onClick={backToDemo}>
            <ArrowLeft />
            Back to Linear
          </Button>
          <section
            className="growth-scope linear-signup-panel"
            {...guide(
              "linear-signup-options",
              "Choose how to join",
              "After trying the demo, people can choose a familiar signup method. This preview stops before creating an account.",
              0,
            )}
          >
            <div className="linear-brand-mark" aria-hidden="true">
              <Layers />
            </div>
            <h1 ref={heading} tabIndex={-1}>
              Create your workspace
            </h1>
            <Button
              className="linear-auth-button"
              onClick={() => openSignupBoundary("Google")}
            >
              Continue with Google
            </Button>
            <Button
              variant="secondary"
              className="linear-auth-button"
              onClick={() => openSignupBoundary("email")}
            >
              Continue with email
            </Button>
            <Button
              variant="secondary"
              className="linear-auth-button"
              onClick={() => openSignupBoundary("SAML SSO")}
            >
              Continue with SAML SSO
            </Button>
          </section>
        </main>
      ) : (
        <div className="linear-shell">
          <aside
            className="linear-sidebar"
            aria-label="Demo workspace navigation"
          >
            <div className="linear-workspace-name">
              <span>
                <Layers aria-hidden="true" />
                Linear Demo
              </span>
              {signup()}
            </div>
            <ContextItem icon={<Inbox />}>
              Inbox <small>10</small>
            </ContextItem>
            <ContextItem icon={<CircleDashed />}>My issues</ContextItem>
            <ContextItem icon={<MousePointer2 />}>Agent</ContextItem>
            <p className="linear-nav-label">
              Workspace <ChevronDown aria-hidden="true" />
            </p>
            <ContextItem icon={<Flag />}>Initiatives</ContextItem>
            <ContextItem icon={<Box />}>Projects</ContextItem>
            <ContextItem icon={<Layers />}>Views</ContextItem>
            <ContextItem icon={<Blocks />}>Loops</ContextItem>
            <ContextItem icon={<MoreHorizontal />}>More</ContextItem>
            <p className="linear-nav-label">
              Favorites <ChevronDown aria-hidden="true" />
            </p>
            <Button
              variant="ghost"
              className={cn(
                "linear-nav-button",
                view === "welcome" && "is-current",
              )}
              onClick={() => navigate("welcome")}
              aria-current={view === "welcome" ? "page" : undefined}
            >
              <FileText />
              <span>Welcome to Linear! [README]</span>
            </Button>
            <ContextItem icon={<SlidersHorizontal />}>
              Weekly Metrics Review
            </ContextItem>
            <p className="linear-nav-label linear-team-label">
              Your teams <ChevronDown aria-hidden="true" />
            </p>
            <ContextItem icon={<Settings />}>
              Engineering <ChevronDown />
            </ContextItem>
            <ContextItem icon={<Home />} indent>
              Home
            </ContextItem>
            <ContextItem icon={<CircleDot />} indent>
              Triage <small>13</small>
            </ContextItem>
            <Button
              variant="ghost"
              className={cn(
                "linear-nav-button is-indented",
                (view === "issues" || view === "issue") && "is-current",
              )}
              onClick={() => navigate("issues")}
              aria-current={
                view === "issues" || view === "issue" ? "page" : undefined
              }
            >
              <Blocks />
              <span>Issues</span>
            </Button>
            <ContextItem icon={<Clock3 />} indent>
              Cycles
            </ContextItem>
            <div className="linear-cycle-context">
              <span>Current</span>
              <span>Upcoming</span>
            </div>
            <ContextItem icon={<Flag />} indent>
              Initiatives
            </ContextItem>
            <ContextItem icon={<Box />} indent>
              Projects
            </ContextItem>
            <ContextItem icon={<Layers />} indent>
              Views
            </ContextItem>
            <ContextItem icon={<Lock />}>
              Private Team <Lock />
            </ContextItem>
            <div className="linear-news-context">
              <span>What’s new</span>
              <strong>Stacked pull requests</strong>
            </div>
          </aside>
          <div className="linear-mobile-nav" aria-label="Demo navigation">
            <span>
              <Layers aria-hidden="true" />
              Linear Demo
            </span>
            {signup(true)}
            <nav>
              <Button
                variant="ghost"
                onClick={() => navigate("welcome")}
                aria-current={view === "welcome" ? "page" : undefined}
              >
                Welcome
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("issues")}
                aria-current={
                  view === "issues" || view === "issue" ? "page" : undefined
                }
              >
                Issues
              </Button>
            </nav>
          </div>
          <main
            ref={content}
            className={cn(
              "linear-main",
              view === "welcome" && "growth-scope linear-welcome-panel",
            )}
          >
            <div className="linear-topbar">
              <span className="linear-breadcrumb-team">
                <Settings aria-hidden="true" />
                Engineering
                <ChevronRight aria-hidden="true" />
              </span>
              {view === "welcome" ? (
                <>
                  <span>Documents</span>
                  <ChevronRight aria-hidden="true" />
                  <span className="linear-breadcrumb-current">
                    Welcome to Linear! [README]
                  </span>
                  <Star aria-hidden="true" />
                </>
              ) : (
                <>
                  {view === "issue" ? (
                    <Button
                      variant="ghost"
                      className="linear-breadcrumb-button"
                      onClick={() => navigate("issues")}
                    >
                      Issues
                    </Button>
                  ) : (
                    <span>Issues</span>
                  )}
                  {view === "issue" && (
                    <>
                      <ChevronRight aria-hidden="true" />
                      <span className="linear-breadcrumb-current">
                        ENG-411 <span>{issueTitle}</span>
                      </span>
                    </>
                  )}
                  <Star aria-hidden="true" />
                </>
              )}
              <MoreHorizontal aria-hidden="true" />
              <span className="linear-topbar-spacer" />
              <Bell aria-hidden="true" />
            </div>
            {view === "welcome" && (
              <article
                className="linear-welcome"
                {...guide(
                  "linear-welcome-guidance",
                  "Start with useful context",
                  "The welcome page explains the sample workspace and its limits. Familiar examples give people somewhere useful to start exploring.",
                  0,
                )}
              >
                <div className="linear-document-icon" aria-hidden="true">
                  <FileText />
                </div>
                <h1 ref={heading} tabIndex={-1}>
                  Welcome to Linear! [README]
                </h1>
                <p>
                  Linear is the shared workspace for planning, tracking, and
                  delivering product work. It brings product, design,
                  engineering, and other partners into the same workflow, so
                  decisions, priorities, and progress stay connected to the work
                  itself.
                </p>
                <p>
                  Explore this workspace to get familiar with how Linear looks
                  and feels. Some functionality (like integrations) aren&apos;t
                  present, but it should help you get comfortable with the
                  basics.
                </p>
                <h2>How work is organized</h2>
                <ul>
                  <li>
                    <strong>Workspace (&quot;Linear Demo&quot;):</strong> the
                    home for everyone in your organization.
                  </li>
                  <li>
                    <strong>Teams (&quot;Engineering&quot;):</strong> groups
                    that own a stream of work, such as Engineering, Product, or
                    Mobile. Each team has its own issues, workflow, cycles, and
                    views.
                  </li>
                  <li>
                    <strong>Issues:</strong> the individual units of work. Use
                    issues for bugs, tasks, improvements, and decisions that
                    need an owner and a clear outcome.
                  </li>
                  <li>
                    <strong>Projects:</strong> collections of related work that
                    deliver a larger outcome, such as launching a new expense
                    policy experience. Projects can span teams and provide a
                    shared status, timeline, and updates.
                  </li>
                  <li>
                    <strong>Initiatives:</strong> high-level strategic efforts
                    that group related projects.
                  </li>
                  <li>
                    <strong>Cycles:</strong> time-boxed planning periods that
                    help teams focus on a manageable set of issues.
                  </li>
                </ul>
                <h2>Top keyboard shortcuts</h2>
                <ul className="linear-shortcut-context">
                  <li>
                    <strong>Open the command menu:</strong>{" "}
                    <kbd>Cmd/Ctrl + K</kbd>
                  </li>
                  <li>
                    <strong>Navigate issues in a list or board:</strong>{" "}
                    <kbd>J</kbd> / <kbd>K</kbd> or <kbd>↑</kbd> / <kbd>↓</kbd>
                  </li>
                  <li>
                    <strong>Select an issue:</strong> <kbd>X</kbd>; select all
                    visible issues with <kbd>Cmd/Ctrl + A</kbd>
                  </li>
                  <li>
                    <strong>Clear a selection:</strong> <kbd>Esc</kbd>
                  </li>
                </ul>
              </article>
            )}
            {view === "issues" && (
              <section
                className="linear-issues"
                aria-labelledby="linear-issues-heading"
                {...guide(
                  "linear-seeded-workspace",
                  "Try with sample work",
                  "Ready-made issues let people explore a real task without setting up their own data. Open ENG-411 to try changing its status.",
                  1,
                )}
              >
                <h1
                  ref={heading}
                  tabIndex={-1}
                  id="linear-issues-heading"
                  className="sr-only"
                >
                  Engineering issues
                </h1>
                <div className="linear-list-toolbar">
                  <span>Active</span>
                  <span>Backlog</span>
                  <span className="is-selected">All issues</span>
                  <Layers aria-hidden="true" />
                  <div />
                  <ListFilter aria-hidden="true" />
                  <SlidersHorizontal aria-hidden="true" />
                </div>
                <div className="linear-issue-group">
                  <ChevronDown aria-hidden="true" />
                  <StatusMark status="In Progress" />
                  In Progress <span>{status === "In Progress" ? 2 : 1}</span>
                </div>
                <div className="linear-issue-row">
                  <MoreHorizontal aria-hidden="true" />
                  <span className="linear-issue-id">ENG-179</span>
                  <StatusMark status="In Progress" />
                  <span className="linear-issue-row-title">
                    Content Management System Integration
                  </span>
                  <span className="linear-row-extra">
                    Finance Platform Marketing Site Refresh
                  </span>
                  <span className="linear-row-date">Feb 2024</span>
                </div>
                {status === "In Progress" && sampleIssueRow}
                <div className="linear-issue-group">
                  <ChevronDown aria-hidden="true" />
                  <StatusMark status="Todo" />
                  Todo <span>{status === "Todo" ? 2 : 1}</span>
                </div>
                <div className="linear-issue-row">
                  <SlidersHorizontal aria-hidden="true" />
                  <span className="linear-issue-id">ENG-436</span>
                  <StatusMark status="Todo" />
                  <span className="linear-issue-row-title">
                    Show the processing cutoff for scheduled vendor payments
                  </span>
                  <span className="linear-row-extra">
                    Vendor Payments Mobile Experience
                  </span>
                  <span className="linear-row-date">Oct 1</span>
                </div>
                {status !== "Todo" && status !== "In Progress" && (
                  <div className="linear-issue-group">
                    <ChevronDown aria-hidden="true" />
                    <StatusMark status={status} />
                    {status}
                    <span>1</span>
                  </div>
                )}
                {status !== "In Progress" && sampleIssueRow}
                <p className="linear-hidden-issues">
                  13 issues hidden by display options <span>Show options</span>
                </p>
              </section>
            )}
            {view === "issue" && (
              <section
                className="linear-issue-detail"
                aria-labelledby="linear-issue-heading"
              >
                <div className="linear-issue-body">
                  <h1 ref={heading} tabIndex={-1} id="linear-issue-heading">
                    {issueTitle}
                  </h1>
                  <p>
                    Show the token expiration state and last refresh result in
                    the integration diagnostics view to simplify sandbox
                    troubleshooting.
                  </p>
                  <div className="linear-issue-tools" aria-hidden="true">
                    <MessageSquare />
                    <Paperclip />
                  </div>
                  <div className="linear-add-subissue">
                    <Plus aria-hidden="true" />
                    Add sub-issues
                  </div>
                  <div className="linear-activity-heading">
                    <h2>Activity</h2>
                    <span>Subscribe</span>
                    <Users aria-hidden="true" />
                  </div>
                  <ul
                    className="linear-activity-list"
                    aria-label="Sample issue history"
                  >
                    <li>
                      <Blocks aria-hidden="true" />
                      Linear created the issue <span>· 25d ago</span>
                    </li>
                    <li>
                      <CircleDot aria-hidden="true" />
                      Linear notified a teammate <span>· 25d ago</span>
                    </li>
                    <li>
                      <Circle aria-hidden="true" />
                      Linear moved from Triage to Todo <span>· 24d ago</span>
                    </li>
                    <li>
                      <Users aria-hidden="true" />
                      Linear assigned to deleted user <span>· 24d ago</span>
                    </li>
                    <li>
                      <Layers aria-hidden="true" />
                      Linear added a related issue <span>· 22d ago</span>
                    </li>
                    <li>
                      <Clock3 aria-hidden="true" />
                      Linear moved issue through two cycles to Cycle 75{" "}
                      <span>· 4d ago</span>
                    </li>
                  </ul>
                  <div className="linear-comment-context">
                    Leave a comment…
                    <div aria-hidden="true">
                      <Paperclip />
                      <CircleDot />
                    </div>
                  </div>
                </div>
                <aside
                  className="linear-properties"
                  aria-label="Issue properties"
                >
                  <h2>Properties</h2>
                  <div
                    {...guide(
                      statusChanged
                        ? "linear-status-result"
                        : "linear-core-action",
                      statusChanged
                        ? "See the change immediately"
                        : "Try a real action",
                      statusChanged
                        ? "The selected status appears on the issue right away. Trying this small task shows how the product works before signup."
                        : "A sample issue has working controls. Changing its status lets people try a useful task before committing to an account.",
                      2,
                    )}
                  >
                    <Select
                      value={status}
                      onValueChange={(value) => {
                        setStatus(value as IssueStatus);
                        setStatusChanged(true);
                      }}
                    >
                      <SelectTrigger
                        className="linear-status-trigger"
                        aria-label="Issue status"
                      >
                        <span className="linear-status-value">
                          <StatusMark status={status} />
                          <SelectValue>{status}</SelectValue>
                        </span>
                      </SelectTrigger>
                      <SelectContent
                        className="linear-status-menu"
                        align="start"
                      >
                        <div className="linear-status-menu-title">
                          Change status…
                        </div>
                        {statuses.map((item, index) => (
                          <SelectItem key={item} value={item}>
                            <span className="linear-status-option">
                              <StatusMark status={item} />
                              {item}
                              <small>{index === 7 ? 0 : index + 1}</small>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <ContextItem icon={<Settings />}>Engineering</ContextItem>
                  <ContextItem icon={<MoreHorizontal />}>
                    Set priority
                  </ContextItem>
                  <ContextItem icon={<Users />}>Assign</ContextItem>
                  <ContextItem icon={<Triangle />}>Set estimate</ContextItem>
                  <ContextItem icon={<Clock3 />}>Cycle 75</ContextItem>
                  <h2>Labels</h2>
                  <ContextItem icon={<Link2 />}>Add label</ContextItem>
                  <h2>Project</h2>
                  <ContextItem icon={<Box />}>Add to project</ContextItem>
                  <h2>Related</h2>
                  <ContextItem icon={<Circle />}>
                    Support SSO renewal before bank-feed token…
                  </ContextItem>
                </aside>
                <span className="sr-only" role="status">
                  {statusChanged
                    ? `Sample issue status changed to ${status}.`
                    : ""}
                </span>
              </section>
            )}
          </main>
          <div className="linear-bottom-context" aria-hidden="true">
            <MousePointer2 />
            Agent
            <Clock3 />
          </div>
        </div>
      )}
      <Dialog
        open={signupMethod !== null}
        onOpenChange={(open) => {
          if (!open) setSignupMethod(null);
        }}
      >
        <DialogContent
          className="growth-scope linear-boundary"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            boundaryReturnFocus.current?.focus();
          }}
        >
          <DialogTitle>Signup preview</DialogTitle>
          <DialogDescription>
            {signupMethod ? `Continue with ${signupMethod}` : "Signup"} is the
            observed next step. This local wireframe does not connect to Linear
            or create an account.
          </DialogDescription>
          <Button onClick={() => setSignupMethod(null)}>
            Back to signup options
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
