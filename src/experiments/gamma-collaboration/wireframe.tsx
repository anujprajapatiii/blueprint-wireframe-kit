import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUp,
  Bell,
  ChevronDown,
  Code2,
  FileText,
  Folder,
  Globe,
  Home,
  Image,
  Layers,
  Link,
  Lock,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Palette,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Trash2,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "../../components/kit";
import { growthTarget } from "../../components/growth-education";
import "./gamma-collaboration.css";

type Surface = "create" | "share" | "invite" | "boundary" | null;
const permissions = [
  ["Full Access", "Can view, comment, edit, add, and share with others."],
  [
    "Edit",
    "Can view, comment, edit, and add to the folder, but not share with others.",
  ],
  ["Comment", "Can view and comment, but not edit."],
  ["View", "Can view, but not comment or edit."],
  ["No access", "Cannot view, comment, or edit."],
];
const guide = (id: string, title: string, description: string, order = 0) =>
  growthTarget({ id, title, description, order });

/** Source-backed folder promotion. Every account action stays in local state. */
export function GammaCollaborationWireframe() {
  const [surface, setSurface] = useState<Surface>(null);
  const [narrow, setNarrow] = useState(
    () => window.matchMedia("(max-width: 680px)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(max-width: 680px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [promotionOpen, setPromotionOpen] = useState(false);
  const [promotionSeen, setPromotionSeen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [createdFolder, setCreatedFolder] = useState("");
  const [folderPage, setFolderPage] = useState(false);
  const [permission, setPermission] = useState("No access");
  const [memberSearch, setMemberSearch] = useState("");
  const [email, setEmail] = useState("");
  const [inviteTab, setInviteTab] = useState("email");
  const [feedback, setFeedback] = useState("");
  const [boundary, setBoundary] = useState({ title: "", description: "" });
  const returnFocus = useRef<HTMLElement | null>(null);
  const createButton = useRef<HTMLButtonElement>(null);
  const shareButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const promotionButton = useRef<HTMLButtonElement>(null);
  const modalHandoff = useRef(false);

  const open = (next: Surface) => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    modalHandoff.current = promotionOpen;
    setPromotionOpen(false);
    setFeedback("");
    setSurface(next);
  };
  const showBoundary = (
    title: string,
    description = "This destination was not inspected. The local preview stops here.",
  ) => {
    setBoundary({ title, description });
    open("boundary");
  };
  const restoreFocus = () => {
    const saved = returnFocus.current;
    if (saved?.isConnected && saved.getClientRects().length) saved.focus();
    else if (folderPage) shareButton.current?.focus();
    else createButton.current?.focus();
  };
  const copyExample = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setFeedback("Copied an example link. It does not grant access.");
    } catch {
      setFeedback("Example link: " + url);
    }
  };
  const nav = (
    label: string,
    icon: ReactNode,
    selected = false,
    action?: () => void,
  ) => (
    <Button
      key={label}
      variant="ghost"
      className={cn("gc-nav-item", selected && "is-current")}
      aria-current={selected ? "page" : undefined}
      onClick={action ?? (() => showBoundary(label))}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );

  return (
    <div className="gc-wireframe">
      <div className="gc-shell">
        <aside className="gc-rail" aria-label="Main navigation">
          <Button
            variant="ghost"
            className="gc-brand"
            aria-label="Gamma home"
            onClick={() => setFolderPage(false)}
          >
            G
          </Button>
          <div className="gc-rail-items">
            {[
              ["Home", <Home key="h" />],
              ["Media", <Image key="i" />],
              ["Templates", <Layers key="l" />],
              ["Customize", <Palette key="p" />],
              ["Settings", <Settings key="s" />],
              ["More", <MoreHorizontal key="m" />],
            ].map(([label, icon]) => (
              <Button
                key={String(label)}
                variant="ghost"
                className={label === "Home" ? "is-current" : ""}
                onClick={() =>
                  label === "Home"
                    ? setFolderPage(false)
                    : showBoundary(String(label))
                }
              >
                {icon}
                <span>{label}</span>
              </Button>
            ))}
          </div>
          <div className="gc-rail-bottom">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Invite teammates"
              onClick={() => open("invite")}
            >
              <UserPlus />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Feedback"
              onClick={() => showBoundary("Feedback")}
            >
              <MessageSquare />
            </Button>
            <span className="gc-avatar">W</span>
          </div>
        </aside>
        <aside className="gc-sidebar" aria-label="Workspace navigation">
          <div className="gc-workspace">
            <span className="gc-avatar">W</span>
            <span>
              Workspace<small>Free</small>
            </span>
            <ChevronDown aria-hidden="true" />
            <Button
              ref={menuButton}
              className="gc-mobile-toggle"
              variant="ghost"
              size="icon"
              aria-label={mobileNav ? "Hide navigation" : "Show navigation"}
              aria-expanded={mobileNav}
              onClick={() => setMobileNav(!mobileNav)}
            >
              <Menu />
            </Button>
          </div>
          <nav
            className={cn("gc-navigation", mobileNav && "is-open")}
            aria-label="Workspace"
          >
            {nav("Create", <Plus />, !folderPage, () => setFolderPage(false))}
            {nav("Recent chats", <MessageSquare />)}
            {nav("Recent gammas", <Layers />)}
            <hr />
            {nav("Search", <Search />)}
            {nav("All", <Layers />)}
            {nav("Shared with you", <Users />)}
            {nav("Sites", <Globe />)}
            {nav("API Generated", <Code2 />)}
          </nav>
          <div className="gc-folders">
            <p className="gc-section-label">FOLDERS</p>
            {createdFolder ? (
              <>
                <p className="gc-recents">RECENTS</p>
                {nav(createdFolder, <Folder />, folderPage, () =>
                  setFolderPage(true),
                )}
              </>
            ) : (
              <div
                className="gc-promotion growth-scope"
                {...guide(
                  "gamma-folder-card",
                  "Show a shared use",
                  "The folder card promises one place for related work. Create a folder gives that benefit a clear next step.",
                )}
              >
                {!promotionSeen && (
                  <Popover open={promotionOpen} onOpenChange={setPromotionOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        ref={promotionButton}
                        variant="secondary"
                        className="gc-manage"
                      >
                        <Badge>NEW</Badge>
                        <span>Manage access</span>
                        <ArrowRight />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="gc-explainer growth-scope"
                      side={narrow ? "bottom" : "right"}
                      align="start"
                      sideOffset={10}
                      collisionPadding={16}
                      onCloseAutoFocus={(event) => {
                        if (modalHandoff.current) {
                          event.preventDefault();
                          modalHandoff.current = false;
                        } else if (promotionSeen) {
                          event.preventDefault();
                          createButton.current?.focus();
                        }
                      }}
                      {...guide(
                        "gamma-folder-benefit",
                        "Explain who benefits",
                        "The message connects folders to team spaces and private work. It explains that one choice covers every gamma inside.",
                      )}
                    >
                      <div className="gc-share-art" aria-hidden="true">
                        <div>
                          <b>
                            Share <span>Team launch</span>
                          </b>
                          <i />
                          <p>
                            <span className="gc-art-avatar" />
                            Teammate<span>Full Access</span>
                          </p>
                          <small>Copy folder link</small>
                        </div>
                      </div>
                      <div className="gc-explainer-copy">
                        <h2>Folders with access</h2>
                        <p>
                          Share a folder with just the people you choose. They
                          get access to every gamma inside.
                        </p>
                        <p>
                          Good for team spaces and anything that isn’t meant for
                          the whole workspace.
                        </p>
                        <div>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              showBoundary(
                                "Learn more",
                                "The source’s learning destination was not inspected. You can close this preview and create a folder to explore the captured flow.",
                              )
                            }
                          >
                            Learn more
                          </Button>
                          <Button
                            onClick={() => {
                              setPromotionOpen(false);
                              setPromotionSeen(true);
                              requestAnimationFrame(() =>
                                createButton.current?.focus(),
                              );
                            }}
                          >
                            Got it
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                <div className="gc-folder-placeholder" aria-hidden="true">
                  <Folder />
                  <i />
                </div>
                <div className="gc-folder-placeholder" aria-hidden="true">
                  <Folder />
                  <i />
                </div>
                <p>Group related gammas and share them all at once.</p>
                <Button
                  ref={createButton}
                  variant="ghost"
                  className="gc-create-link"
                  onClick={() => open("create")}
                >
                  Create a folder
                </Button>
              </div>
            )}
          </div>
          <div className="gc-trash">
            {nav("Trash", <Trash2 />)}
            <Button
              className="gc-mobile-invite"
              variant="ghost"
              onClick={() => open("invite")}
            >
              <UserPlus />
              Invite teammates
            </Button>
          </div>
        </aside>
        <main className="gc-main">
          {folderPage ? (
            <>
              <header className="gc-folder-header">
                <span>
                  <Layers />
                  All<span aria-hidden="true">›</span>
                  <Folder />
                  <strong>{createdFolder}</strong>
                  <ChevronDown />
                </span>
                <Button
                  ref={shareButton}
                  variant="ghost"
                  onClick={() => open("share")}
                >
                  <Lock />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Add a gamma"
                  onClick={() => showBoundary("Add a gamma")}
                >
                  <Plus />
                </Button>
                <div className="gc-header-spacer" />
                <Badge>
                  <Sparkles />
                  400
                </Badge>
                <Search aria-hidden="true" />
                <Bell aria-hidden="true" />
              </header>
              <div className="gc-folder-tools">
                {["All", "Recently viewed", "Created by you", "Favorites"].map(
                  (label, index) => (
                    <Button
                      key={label}
                      variant={index ? "ghost" : "secondary"}
                      onClick={() =>
                        setFeedback("This example folder is empty.")
                      }
                    >
                      {label}
                    </Button>
                  ),
                )}
                <span />
                <Button
                  variant="ghost"
                  onClick={() => showBoundary("Sort folders")}
                >
                  Last edited
                  <ChevronDown />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setFeedback("This example folder is empty.")}
                >
                  Grid
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setFeedback("This example folder is empty.")}
                >
                  List
                </Button>
              </div>
              <div className="gc-empty">
                <div aria-hidden="true" className="gc-empty-art">
                  <Folder />
                </div>
                <h1>This folder is empty</h1>
                <p>
                  Create new gammas or move existing ones into this folder to
                  see them here.
                </p>
              </div>
            </>
          ) : (
            <>
              <header className="gc-home-header">
                <Button
                  variant="outline"
                  onClick={() => showBoundary("Upgrade for more AI")}
                >
                  <Sparkles />
                  Upgrade for more AI
                </Button>
                <span />
                <Button
                  variant="ghost"
                  onClick={() => showBoundary("Use classic generator")}
                >
                  Use classic generator
                </Button>
                <Button
                  variant="outline"
                  onClick={() => showBoundary("New from blank")}
                >
                  <Plus />
                  New from blank
                </Button>
                <Button
                  variant="outline"
                  onClick={() => showBoundary("Credit balance")}
                >
                  <Sparkles />
                  400
                </Button>
              </header>
              <section className="gc-creator" aria-label="Creator context">
                <div className="gc-creator-art" aria-hidden="true">
                  <Image />
                </div>
                <h1>Trust the messy draft</h1>
                <div className="gc-composer">
                  <p>Describe what you want to create…</p>
                  <div>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Attach content"
                      onClick={() => showBoundary("Attach content")}
                    >
                      <Plus />
                    </Button>
                    <span />
                    <span>Lite⌄</span>
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label="Create with AI"
                      onClick={() =>
                        showBoundary(
                          "Create with AI",
                          "Content generation is outside this folder example. No credits are used.",
                        )
                      }
                    >
                      <ArrowUp />
                    </Button>
                  </div>
                </div>
                <div className="gc-formats">
                  {[
                    ["Presentation", <Layers key="p" />],
                    ["Document", <FileText key="d" />],
                    ["Carousel", <Layers key="c" />],
                    ["Image", <Image key="i" />],
                    ["Beautify", <WandSparkles key="b" />],
                    ["Import", <FileText key="f" />],
                  ].map(([label, icon]) => (
                    <Button
                      key={String(label)}
                      variant="outline"
                      onClick={() => showBoundary(String(label))}
                    >
                      {icon}
                      {label}
                    </Button>
                  ))}
                </div>
                <p className="gc-template-label">Suggested templates</p>
                <div className="gc-templates">
                  {Array.from({ length: 6 }, (_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => showBoundary("Template preview")}
                    >
                      <span aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      Template {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  className="gc-view-templates"
                  variant="outline"
                  onClick={() => showBoundary("View all templates")}
                >
                  View all templates
                </Button>
              </section>
            </>
          )}
          {!surface && feedback && (
            <p className="gc-page-feedback" role="status">
              {feedback}
            </p>
          )}
        </main>
      </div>
      <Dialog
        open={surface !== null}
        onOpenChange={(value) => {
          if (!value) setSurface(null);
        }}
      >
        <DialogContent
          className={cn(
            "gc-dialog growth-context",
            surface === "create" && "gc-create-dialog",
            surface === "share" && "gc-share-dialog",
            surface === "invite" && "gc-invite-dialog",
          )}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
          aria-describedby={
            surface === "share" ? undefined : "gc-dialog-description"
          }
        >
          {surface === "create" && (
            <>
              <DialogTitle>Create folder</DialogTitle>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!folderName.trim()) return;
                  setCreatedFolder(folderName.trim());
                  setFolderPage(true);
                  setSurface(null);
                  setPermission("No access");
                }}
              >
                <label className="gc-name-label" htmlFor="gc-folder-name">
                  <span className="sr-only">Folder name</span>
                  <span>{folderName.length}/250</span>
                </label>
                <Input
                  id="gc-folder-name"
                  placeholder="Folder name"
                  maxLength={250}
                  value={folderName}
                  onChange={(event) => setFolderName(event.target.value)}
                  autoComplete="off"
                />
                <DialogDescription id="gc-dialog-description">
                  This folder will be private until you share it
                </DialogDescription>
                <div className="gc-dialog-actions">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setSurface(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!folderName.trim()}>
                    Create folder
                  </Button>
                </div>
              </form>
            </>
          )}
          {surface === "share" && (
            <>
              <DialogTitle className="gc-share-title">
                Share{" "}
                <span>
                  <Folder />
                  {createdFolder}
                </span>
              </DialogTitle>
              <div className="gc-share-layout">
                <div className="gc-share-side">
                  <Share2 />
                  Share
                </div>
                <div className="gc-share-body">
                  <form
                    className="gc-member-search"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setFeedback(
                        "No example members found. No invitation has been sent.",
                      );
                    }}
                  >
                    <Input
                      aria-label="Add people"
                      placeholder="Add people"
                      value={memberSearch}
                      onChange={(event) => setMemberSearch(event.target.value)}
                    />
                    <Button disabled={!memberSearch.trim()}>Add</Button>
                  </form>
                  <div className="gc-person">
                    <span className="gc-avatar">
                      <Users />
                    </span>
                    <span>
                      <strong>Workspace members</strong>
                      <small>
                        {permission === "No access"
                          ? "No workspace access"
                          : "Example workspace access"}
                      </small>
                    </span>
                    <Select
                      value={permission}
                      onValueChange={(value) => {
                        setPermission(value);
                        setFeedback(
                          "Preview only. No workspace access has changed.",
                        );
                      }}
                    >
                      <SelectTrigger
                        className="gc-permission-trigger"
                        aria-label="Workspace members access"
                      >
                        <SelectValue>{permission}</SelectValue>
                      </SelectTrigger>
                      <SelectContent
                        className="gc-permissions growth-context"
                        align="end"
                      >
                        <p>Permissions</p>
                        {permissions.map(([label, description]) => (
                          <SelectItem key={label} value={label}>
                            <span className="gc-permission-option">
                              <strong>{label}</strong>
                              <small>{description}</small>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="gc-person">
                    <span className="gc-avatar">Y</span>
                    <span>
                      <strong>You</strong>
                      <small>Member</small>
                    </span>
                    <span className="gc-owner-access">Full Access</span>
                  </div>
                </div>
              </div>
              <div className="gc-share-footer">
                <Button
                  variant="outline"
                  onClick={() =>
                    copyExample("https://example.com/folder/preview")
                  }
                >
                  <Link />
                  Copy folder link
                </Button>
              </div>
            </>
          )}
          {surface === "invite" && (
            <>
              <DialogTitle>Invite members to Workspace</DialogTitle>
              <DialogDescription id="gc-dialog-description" className="sr-only">
                Explore invitation options using example details. No invitation
                will be sent.
              </DialogDescription>
              <Tabs
                value={inviteTab}
                onValueChange={(value) => {
                  setInviteTab(value);
                  setFeedback("");
                }}
              >
                <TabsList className="gc-invite-tabs">
                  <TabsTrigger value="email">
                    <UserPlus />
                    Invite with email address
                  </TabsTrigger>
                  <TabsTrigger value="link">
                    <Link />
                    Invite with link
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setFeedback("Preview only. No invitation was sent.");
                    }}
                  >
                    <label htmlFor="gc-invite-email">Email</label>
                    <Input
                      id="gc-invite-email"
                      placeholder="Type or paste email addresses"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <Button
                      className="gc-invite-submit"
                      type="submit"
                      disabled={!email.trim()}
                    >
                      Confirm and send invites (
                      {email.split(/[;,\s]+/).filter(Boolean).length})
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="link">
                  <p>
                    Anyone can use this link to join your workspace as a member.
                  </p>
                  <Input
                    aria-label="Example workspace invitation link"
                    readOnly
                    value="https://example.com/workspace/invite"
                  />
                  <Button
                    className="gc-invite-submit"
                    onClick={() =>
                      copyExample("https://example.com/workspace/invite")
                    }
                  >
                    Copy link
                  </Button>
                </TabsContent>
              </Tabs>
              <Button variant="ghost" onClick={() => setSurface(null)}>
                Cancel
              </Button>
            </>
          )}
          {surface === "boundary" && (
            <>
              <DialogTitle>{boundary.title}</DialogTitle>
              <DialogDescription id="gc-dialog-description">
                {boundary.description}
              </DialogDescription>
              <div className="gc-dialog-actions">
                <Button onClick={() => setSurface(null)}>
                  Back to preview
                </Button>
              </div>
            </>
          )}
          {feedback && (
            <p className="gc-feedback" role="status">
              {feedback}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
