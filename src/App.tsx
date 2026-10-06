import { SiteLock } from "./components/site-lock";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCheck,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Grid2X2,
  LayoutGrid,
  Menu,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "./components/kit";
import {
  Alert,
  Breadcrumb,
  EmptyState,
  ImagePlaceholder,
  KeyboardKey,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Toast,
} from "./components/patterns";

import { Foundations } from "./components/foundations";
import { BlueprintLogo } from "./components/blueprint-logo";
import { GrowthReference } from "./growth/reference";

const repository = "https://github.com/anujprajapatiii/blueprint-wireframe-kit";
const categories = [
  "All components",
  "Inputs",
  "Navigation",
  "Feedback",
  "Structure",
] as const;
type Category = (typeof categories)[number];
type Spec = {
  id: string;
  name: string;
  category: Category;
  code: string;
  content: ReactNode;
};

function Example({
  spec,
  notify,
}: {
  spec: Spec;
  notify: (s: string) => void;
}) {
  const [source, setSource] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(spec.code);
      notify(`${spec.name} example copied`);
    } catch {
      notify("Copy unavailable. Select and copy the example text.");
    }
  }
  return (
    <section
      id={spec.id}
      aria-labelledby={`${spec.id}-heading`}
      className="specimen scroll-mt-24 min-w-0 rounded-md border border-border bg-card"
    >
      <div className="flex min-h-14 items-center justify-between gap-2 border-b border-border px-5">
        <h2 id={`${spec.id}-heading`} className="text-sm font-medium">
          {spec.name}
        </h2>
        <button
          onClick={() => setSource(!source)}
          aria-pressed={source}
          aria-label={`${source ? "Preview" : "View code for"} ${spec.name}`}
          className="flex h-9 items-center gap-1.5 rounded-sm px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Code2 size={14} aria-hidden="true" />
          {source ? "Preview" : "Code"}
        </button>
      </div>
      {source ? (
        <div className="relative min-h-48 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              REACT / TSX
            </span>
            <Button variant="ghost" size="sm" onClick={copy}>
              <Copy size={14} />
              Copy
            </Button>
          </div>
          <pre className="code-view text-sm leading-6">
            <code>{spec.code}</code>
          </pre>
        </div>
      ) : (
        <div className="flex min-h-48 flex-col justify-center p-5 sm:p-6">
          {spec.content}
        </div>
      )}
    </section>
  );
}

function BriefForm({ notify }: { notify: (s: string) => void }) {
  const [title, setTitle] = useState("A better onboarding flow");
  const [error, setError] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) {
          setError(true);
          document.getElementById("brief-title")?.focus();
          return;
        }
        setError(false);
        notify("Brief saved for this demo");
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="brief-title">Project name</Label>
        <Input
          id="brief-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={error}
          aria-describedby={error ? "brief-error" : undefined}
        />
        {error && (
          <p id="brief-error" role="alert" className="text-sm">
            Enter a project name to continue.
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="brief-goal">What are we solving?</Label>
        <Textarea
          id="brief-goal"
          placeholder="Help people get to their first useful moment."
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setTitle("");
            setError(false);
          }}
        >
          Reset
        </Button>
        <Button type="submit">Save brief</Button>
      </div>
    </form>
  );
}

function ModalDemo({ notify }: { notify: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-12 w-16 place-items-center rounded-md border border-dashed border-input">
          <LayoutGrid size={22} strokeWidth={1} />
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          A little space for a focused decision.
        </p>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a wireframe</DialogTitle>
          <DialogDescription>
            Give the idea a name. You can change it later.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            notify("Wireframe created for this demo");
          }}
        >
          <div className="my-6 space-y-2">
            <Label htmlFor="wireframe-name">Name</Label>
            <Input
              id="wireframe-name"
              required
              defaultValue="Onboarding exploration"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create wireframe</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [category, setCategory] = useState<Category>("All components");
  const [query, setQuery] = useState("");
  const [grid, setGrid] = useState(true);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [slider, setSlider] = useState([60]);
  const [progress, setProgress] = useState(64);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [taskOne, setTaskOne] = useState(true);
  const notify = (text: string) => setMessage(text);
  const specs: Spec[] = [
    {
      id: "buttons",
      name: "Button",
      category: "Inputs",
      code: '<Button>Continue</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Quiet action</Button>\n<Button variant="destructive">Delete item</Button>\n<Button disabled>Unavailable</Button>',
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => notify("Primary action selected")}>
              Continue
            </Button>
            <Button
              variant="secondary"
              onClick={() => notify("Secondary action selected")}
            >
              Secondary
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => notify("Quiet action selected")}
            >
              Quiet action
            </Button>
            <Button disabled>Unavailable</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => notify("Outline action selected")}
            >
              Outline
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                notify("Destructive action preview — no data deleted")
              }
            >
              Delete item
            </Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => notify("New item added for this demo")}
            >
              <Plus size={16} />
              Add item
            </Button>
            <Button asChild size="icon" variant="outline">
              <a
                href={`${repository}/archive/refs/heads/main.zip`}
                aria-label="Download kit source"
              >
                <Download size={16} />
              </a>
            </Button>
            <Button size="sm" disabled>
              <Spinner />
              Working
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "form",
      name: "Form",
      category: "Inputs",
      code: '<form onSubmit={handleSubmit}>\n  <Label htmlFor="name">Project name</Label>\n  <Input id="name" required />\n  <Button type="submit">Save brief</Button>\n</form>',
      content: <BriefForm notify={notify} />,
    },
    {
      id: "card",
      name: "Card",
      category: "Structure",
      code: "<Card>\n  <CardHeader>\n    <CardTitle>First things first.</CardTitle>\n    <CardDescription>Start with the problem.</CardDescription>\n  </CardHeader>\n  <CardContent>What needs to change?</CardContent>\n</Card>",
      content: (
        <Card className="border-input">
          <CardHeader>
            <CardTitle>First things first.</CardTitle>
            <CardDescription>
              What should someone be able to do here?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <Checkbox
                id="card-task"
                checked={taskOne}
                onCheckedChange={(v) => setTaskOne(v === true)}
              />
              <Label htmlFor="card-task" className="leading-5">
                Define the problem
              </Label>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Checkbox id="card-task-2" />
              <Label htmlFor="card-task-2" className="leading-5">
                Sketch the smallest useful flow
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => notify("Ready for your next idea")}
            >
              Keep exploring
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: "input",
      name: "Input",
      category: "Inputs",
      code: '<Label htmlFor="email">Email</Label>\n<Input id="email" type="email" placeholder="you@example.com" />\n<Input aria-label="Read-only value" readOnly value="Read only" />',
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-example">With an icon</Label>
            <div className="relative">
              <Search
                className="absolute left-3 top-3"
                size={16}
                aria-hidden="true"
              />
              <Input
                id="search-example"
                placeholder="Find something…"
                className="pl-9"
              />
            </div>
          </div>
          <Input
            aria-label="Disabled input example"
            placeholder="Disabled input"
            disabled
          />
        </div>
      ),
    },
    {
      id: "select",
      name: "Select",
      category: "Inputs",
      code: '<Label htmlFor="stage">Stage</Label>\n<Select defaultValue="sketch">\n  <SelectTrigger id="stage"><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="sketch">Sketching</SelectItem>\n    <SelectItem value="review">In review</SelectItem>\n  </SelectContent>\n</Select>',
      content: (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="stage">Stage of the idea</Label>
            <Select defaultValue="sketch">
              <SelectTrigger id="stage">
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="sketch">Sketching</SelectItem>
                <SelectItem value="review">In review</SelectItem>
                <SelectItem value="ready">Ready to test</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Give the work a place to be, even when it isn’t finished.
          </p>
        </div>
      ),
    },
    {
      id: "textarea",
      name: "Textarea",
      category: "Inputs",
      code: '<Label htmlFor="notes">Working notes</Label>\n<Textarea id="notes" rows={4} placeholder="Start with a question…" />',
      content: (
        <div className="space-y-2">
          <Label htmlFor="notes">Working notes</Label>
          <Textarea
            id="notes"
            rows={4}
            placeholder="What do we know? What are we assuming?"
          />
          <p className="text-sm text-muted-foreground">
            Rough thoughts are welcome.
          </p>
        </div>
      ),
    },
    {
      id: "checkbox",
      name: "Checkbox",
      category: "Inputs",
      code: '<div className="flex items-center gap-3">\n  <Checkbox id="research" defaultChecked />\n  <Label htmlFor="research">Understand the problem</Label>\n</div>',
      content: (
        <div className="space-y-5">
          {[
            "Understand the problem",
            "Explore a few directions",
            "Test with real people",
          ].map((s, i) => (
            <div className="flex items-center gap-3" key={s}>
              <Checkbox id={`check-${i}`} defaultChecked={i === 0} />
              <Label htmlFor={`check-${i}`}>{s}</Label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "radio",
      name: "Radio group",
      category: "Inputs",
      code: '<RadioGroup defaultValue="low" aria-label="Fidelity">\n  <RadioGroupItem value="low" id="low" />\n  <Label htmlFor="low">Low fidelity</Label>\n</RadioGroup>',
      content: (
        <RadioGroup
          defaultValue="low"
          aria-label="Wireframe fidelity"
          className="gap-5"
        >
          {[
            ["low", "Low fidelity"],
            ["medium", "Medium fidelity"],
            ["high", "High fidelity"],
          ].map(([v, l]) => (
            <div key={v} className="flex items-center gap-3">
              <RadioGroupItem id={`radio-${v}`} value={v} />
              <Label htmlFor={`radio-${v}`}>{l}</Label>
            </div>
          ))}
        </RadioGroup>
      ),
    },
    {
      id: "switch",
      name: "Switch",
      category: "Inputs",
      code: '<div className="flex items-center justify-between">\n  <Label htmlFor="annotations">Show annotations</Label>\n  <Switch id="annotations" defaultChecked />\n</div>',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="annotations">Show annotations</Label>
            <Switch id="annotations" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="notifications">Review reminders</Label>
            <Switch id="notifications" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="disabled-switch" className="text-muted-foreground">
              Read-only example
            </Label>
            <Switch id="disabled-switch" disabled />
          </div>
        </div>
      ),
    },
    {
      id: "tabs",
      name: "Tabs",
      category: "Navigation",
      code: '<Tabs defaultValue="overview">\n  <TabsList aria-label="Project">\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="notes">Notes</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Start with the why.</TabsContent>\n  <TabsContent value="notes">Capture open questions.</TabsContent>\n</Tabs>',
      content: (
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="w-full" aria-label="Project details">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex-1">
              Notes
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">
              Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4">
            <h3 className="mb-2 font-medium">Start with the why.</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Make the first useful action easier to find and easier to finish.
            </p>
          </TabsContent>
          <TabsContent value="notes" className="pt-4">
            <h3 className="mb-2 font-medium">Questions worth asking.</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              What does success look like? What can we remove?
            </p>
          </TabsContent>
          <TabsContent value="activity" className="pt-4">
            <h3 className="mb-2 font-medium">A work in progress.</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              First exploration created. Ready for a fresh pair of eyes.
            </p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "accordion",
      name: "Accordion",
      category: "Structure",
      code: '<Accordion type="single" collapsible>\n  <AccordionItem value="one">\n    <AccordionTrigger>What are we solving?</AccordionTrigger>\n    <AccordionContent>A problem worth understanding.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
      content: (
        <Accordion type="single" collapsible defaultValue="problem">
          <AccordionItem value="problem">
            <AccordionTrigger>What are we solving?</AccordionTrigger>
            <AccordionContent>
              Help people find the next useful step without having to figure out
              the whole product.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="audience">
            <AccordionTrigger>Who is this for?</AccordionTrigger>
            <AccordionContent>
              Someone trying the product for the very first time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="learn">
            <AccordionTrigger>What do we need to learn?</AccordionTrigger>
            <AccordionContent>
              Whether the first step feels clear, useful, and achievable.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      id: "dialog",
      name: "Dialog",
      category: "Feedback",
      code: "<Dialog>\n  <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Create a wireframe</DialogTitle>\n    <DialogDescription>Give the idea a name.</DialogDescription>\n  </DialogContent>\n</Dialog>",
      content: <ModalDemo notify={notify} />,
    },
    {
      id: "badge",
      name: "Badge",
      category: "Feedback",
      code: '<Badge>Draft</Badge>\n<Badge variant="outline">In review</Badge>\n<Badge variant="success">Ready</Badge>\n<Badge variant="warning">Needs review</Badge>\n<Badge variant="error">Blocked</Badge>\n<Badge variant="info">New</Badge>',
      content: (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <Badge>Draft</Badge>
            <Badge variant="outline">In review</Badge>
            <Badge variant="success">
              <Check size={14} />
              Ready
            </Badge>
            <Badge variant="warning">Needs review</Badge>
            <Badge variant="error">Blocked</Badge>
            <Badge variant="info">New</Badge>
          </div>
          <Separator />
          <p className="text-sm leading-6 text-muted-foreground">
            State in words. Meaning doesn’t depend on colour.
          </p>
        </div>
      ),
    },
    {
      id: "avatar",
      name: "Avatar",
      category: "Structure",
      code: "<Avatar><AvatarFallback>AJ</AvatarFallback></Avatar>\n<Avatar><AvatarFallback>MK</AvatarFallback></Avatar>",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Alex Jordan</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Exploring possibilities
              </p>
            </div>
          </div>
          <div
            className="flex -space-x-2"
            aria-label="Project collaborators: Alex, Morgan, Sam, and two others"
          >
            {["AJ", "MK", "SL", "+2"].map((s) => (
              <Avatar key={s} className="border-2 border-background">
                <AvatarFallback>{s}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "dropdown",
      name: "Dropdown menu",
      category: "Navigation",
      code: '<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="outline">Project actions</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem onSelect={duplicate}>Duplicate</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
      content: (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal size={16} />
                Project actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Wireframe</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => notify("Wireframe duplicated for this demo")}
              >
                Duplicate
                <Copy size={14} />
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => notify("Renaming selected for this demo")}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => notify("Wireframe archived for this demo")}
              >
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="mt-5 text-sm text-muted-foreground">
            A home for the less frequent actions.
          </p>
        </div>
      ),
    },
    {
      id: "slider",
      name: "Slider",
      category: "Inputs",
      code: '<Label id="confidence-label">Confidence</Label>\n<Slider aria-labelledby="confidence-label" defaultValue={[60]} max={100} step={10} />',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label id="confidence-label">Confidence in this idea</Label>
            <span className="font-mono text-sm" aria-live="polite">
              {slider[0]}%
            </span>
          </div>
          <Slider
            aria-labelledby="confidence-label"
            value={slider}
            onValueChange={setSlider}
            max={100}
            step={10}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>A hunch</span>
            <span>Well understood</span>
          </div>
        </div>
      ),
    },
    {
      id: "progress",
      name: "Progress",
      category: "Feedback",
      code: '<Progress value={64} aria-label="Research progress" />',
      content: (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Research progress</span>
            <span className="font-mono text-sm">{progress}%</span>
          </div>
          <Progress value={progress} aria-label="Research progress" />
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={progress === 0}
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              <Minus size={14} />
              Less
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={progress === 100}
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              <Plus size={14} />
              More
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "tooltip",
      name: "Tooltip",
      category: "Feedback",
      code: '<Tooltip>\n  <TooltipTrigger asChild><Button variant="outline">Hover or focus</Button></TooltipTrigger>\n  <TooltipContent>Helpful context, right here.</TooltipContent>\n</Tooltip>',
      content: (
        <div className="text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover or focus</Button>
            </TooltipTrigger>
            <TooltipContent>Helpful context, right here.</TooltipContent>
          </Tooltip>
          <p className="mt-5 text-sm text-muted-foreground">
            A small note, when you need it.
          </p>
        </div>
      ),
    },
    {
      id: "alert",
      name: "Alert",
      category: "Feedback",
      code: '<Alert title="A useful constraint" variant="info">\n  Keep the first version focused on one job.\n</Alert>',
      content: (
        <div className="space-y-3">
          <Alert title="A useful constraint" variant="info">
            Keep the first version focused on one job.
          </Alert>
          <Alert title="Ready for a second look" variant="success">
            Your changes have been saved.
          </Alert>
          <Alert title="Check the assumptions" variant="warning">
            This direction still needs validation.
          </Alert>
          <Alert title="Something needs attention" variant="error">
            Resolve the missing information before continuing.
          </Alert>
        </div>
      ),
    },
    {
      id: "toast",
      name: "Toast",
      category: "Feedback",
      code: '<Toast message="Changes saved" onDismiss={dismiss} />',
      content: (
        <div className="text-center">
          <div className="mb-5 flex items-center gap-3 rounded-md border border-input p-3 text-left text-sm">
            <CheckCheck size={18} aria-hidden="true" />
            <span>Changes saved. Keep thinking.</span>
          </div>
          <Button
            variant="outline"
            onClick={() => notify("Changes saved. Keep thinking.")}
          >
            Show toast
          </Button>
        </div>
      ),
    },
    {
      id: "popover",
      name: "Popover",
      category: "Feedback",
      code: '<Popover>\n  <PopoverTrigger asChild><Button variant="outline">View note</Button></PopoverTrigger>\n  <PopoverContent aria-label="Working note">Try removing a step before adding one.</PopoverContent>\n</Popover>',
      content: (
        <div className="text-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">View working note</Button>
            </PopoverTrigger>
            <PopoverContent aria-labelledby="working-note-heading">
              <p id="working-note-heading" className="mb-2 font-medium">
                A question to keep nearby
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                Could we remove a step before adding another one?
              </p>
            </PopoverContent>
          </Popover>
          <p className="mt-5 text-sm text-muted-foreground">
            More context, without leaving the flow.
          </p>
        </div>
      ),
    },
    {
      id: "table",
      name: "Table",
      category: "Structure",
      code: "<Table>\n  <TableCaption>Explorations</TableCaption>\n  <TableHeader><TableRow><TableHead>Idea</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>Onboarding</TableCell></TableRow></TableBody>\n</Table>",
      content: (
        <Table>
          <TableCaption>Current explorations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Exploration</TableHead>
              <TableHead className="text-right">Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Onboarding", "Draft"],
              ["Search flow", "In review"],
              ["Empty states", "Ready"],
            ].map(([a, b]) => (
              <TableRow key={a}>
                <TableCell>{a}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{b}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
    },
    {
      id: "breadcrumb",
      name: "Breadcrumb",
      category: "Navigation",
      code: '<Breadcrumb items={[\n  { label: "Kit", href: "#components" },\n  { label: "Components", href: "#components" },\n  { label: "Breadcrumb" }\n]} />',
      content: (
        <div className="space-y-6">
          <Breadcrumb
            items={[
              { label: "Kit", href: "#components" },
              { label: "Components", href: "#components" },
              { label: "Breadcrumb" },
            ]}
          />
          <Separator />
          <p className="text-sm leading-6 text-muted-foreground">
            Where you are, and a way back.
          </p>
        </div>
      ),
    },
    {
      id: "pagination",
      name: "Pagination",
      category: "Navigation",
      code: "<Pagination page={page} totalPages={5} onPageChange={setPage} />",
      content: (
        <div className="space-y-5">
          <Pagination page={page} totalPages={5} onPageChange={setPage} />
          <p
            className="text-center text-sm text-muted-foreground"
            aria-live="polite"
          >
            Page {page} of 5
          </p>
        </div>
      ),
    },
    {
      id: "skeleton",
      name: "Skeleton",
      category: "Feedback",
      code: '<div aria-label="Loading content" role="status">\n  <Skeleton className="h-10 w-10 rounded-full" />\n  <Skeleton className="mt-4 h-4 w-3/4" />\n  <Skeleton className="mt-3 h-4 w-1/2" />\n</div>',
      content: (
        <div
          role="status"
          aria-label="Loading content example"
          className="space-y-5"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
          <span className="sr-only">Loading content example</span>
        </div>
      ),
    },
    {
      id: "empty",
      name: "Empty state",
      category: "Structure",
      code: '<EmptyState title="Room for an idea" description="Start with something worth exploring.">\n  <Button variant="outline">Add an idea</Button>\n</EmptyState>',
      content: (
        <EmptyState
          title="Room for an idea"
          description="Start with something worth exploring."
        >
          <Button
            size="sm"
            variant="outline"
            onClick={() => notify("Your first idea starts here")}
          >
            <Plus size={15} />
            Add an idea
          </Button>
        </EmptyState>
      ),
    },
    {
      id: "placeholder",
      name: "Image placeholder",
      category: "Structure",
      code: '<ImagePlaceholder label="Image · 16:9" className="aspect-video" />',
      content: (
        <ImagePlaceholder label="Image · 16:9" className="aspect-video" />
      ),
    },
    {
      id: "typography",
      name: "Typography",
      category: "Structure",
      code: '<h2 className="text-2xl font-semibold tracking-tight">A clear heading.</h2>\n<p className="text-sm text-muted-foreground">Supporting details.</p>',
      content: (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">
            A clear heading.
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A little supporting text. Just enough to move the thinking forward.
          </p>
          <p className="mt-5 text-sm">
            Press <KeyboardKey>Tab</KeyboardKey> to explore.
          </p>
        </div>
      ),
    },
    {
      id: "separator",
      name: "Separator",
      category: "Structure",
      code: '<p>One thought</p>\n<Separator className="my-4" />\n<p>The next thought</p>',
      content: (
        <div className="space-y-5">
          <p className="text-sm">One thought</p>
          <Separator />
          <p className="text-sm text-muted-foreground">The next thought</p>
          <div className="mt-6 flex h-6 items-center gap-4 text-sm">
            <span>Structure</span>
            <Separator orientation="vertical" />
            <span>Rhythm</span>
            <Separator orientation="vertical" />
            <span>Space</span>
          </div>
        </div>
      ),
    },
    {
      id: "validation",
      name: "Validation",
      category: "Feedback",
      code: '<Label htmlFor="required-name">Project name</Label>\n<Input id="required-name" aria-invalid="true" aria-describedby="name-error" />\n<p id="name-error">Enter a project name to continue.</p>',
      content: (
        <div className="space-y-3">
          <Label htmlFor="required-name">Project name</Label>
          <Input
            id="required-name"
            aria-invalid="true"
            aria-describedby="name-error"
            placeholder="Give your idea a name"
            className="border-dashed"
          />
          <p id="name-error" className="flex items-start gap-2 text-sm">
            <span
              aria-hidden="true"
              className="grid h-4 w-4 shrink-0 place-items-center rounded-full border text-xs"
            >
              !
            </span>
            Enter a project name to continue.
          </p>
          <p className="pt-2 text-sm text-muted-foreground">
            Describe what needs fixing in plain language.
          </p>
        </div>
      ),
    },
  ];
  const filtered = specs.filter(
    (s) =>
      (category === "All components" || s.category === category) &&
      `${s.name} ${s.category}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <TooltipProvider delayDuration={250}>
      <div className={cn("min-h-screen", grid && "blueprint-grid")}>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0"
        >
          Skip to components
        </a>
        <header className="sticky top-0 z-[var(--layer-sticky)] border-b border-border bg-surface-sunken">
          <div className="mx-auto flex h-[72px] max-w-[1800px] items-center justify-between gap-4 px-5 lg:px-8">
            <BlueprintLogo />
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-7 text-sm md:flex"
            >
              <a
                href="#components"
                className="underline underline-offset-8 decoration-input"
              >
                Components
              </a>
              <a
                href="#foundations"
                className="text-muted-foreground hover:text-foreground"
              >
                Foundations
              </a>
              <a
                href="#growth"
                className="text-muted-foreground hover:text-foreground"
              >
                Growth
              </a>
              <a
                href="#usage"
                className="text-muted-foreground hover:text-foreground"
              >
                How to use
              </a>
              <a
                href="?view=experiments"
                className="text-muted-foreground hover:text-foreground"
              >
                Experiments
              </a>
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              <SiteLock />
              <a
                href={repository}
                target="_blank"
                rel="noreferrer"
                className={`${import.meta.env.VITE_PRIVATE_REFERENCES_ENABLED === "true" ? "hidden sm:flex" : "flex"} h-10 items-center gap-2 rounded-md border border-input px-3 text-sm hover:bg-muted`}
              >
                Source <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle navigation"
                aria-expanded={mobileNav}
                onClick={() => setMobileNav(!mobileNav)}
                className="md:hidden"
              >
                {mobileNav ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </div>
          </div>
          {mobileNav && (
            <nav
              aria-label="Mobile navigation"
              className="flex flex-wrap gap-5 border-t px-5 py-4 text-sm md:hidden"
            >
              {[
                ["Components", "components"],
                ["Foundations", "foundations"],
                ["Growth", "growth"],
                ["How to use", "usage"],
              ].map(([a, b]) => (
                <a key={b} href={`#${b}`} onClick={() => setMobileNav(false)}>
                  {a}
                </a>
              ))}
              <a href="?view=experiments">Experiments</a>
            </nav>
          )}
        </header>
        <div className="mx-auto flex max-w-[1800px]">
          <aside className="no-print sticky top-[72px] hidden h-[calc(100dvh-72px)] w-[216px] shrink-0 flex-col border-r border-border bg-surface-sunken px-5 py-8 lg:flex">
            <nav aria-label="Component categories" className="space-y-1">
              {categories.map((c, i) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setQuery("");
                    document.getElementById("components")?.scrollIntoView();
                  }}
                  className="sidebar-link flex min-h-10 w-full items-center justify-between rounded-md border border-transparent px-3 text-left text-sm text-muted-foreground hover:bg-muted/60"
                  aria-current={category === c ? "true" : undefined}
                >
                  <span>{c === "All components" ? "Overview" : c}</span>
                  <span className="font-mono text-xs">
                    {i === 0
                      ? specs.length
                      : specs.filter((s) => s.category === c).length}
                  </span>
                </button>
              ))}
            </nav>
            <Separator className="my-6" />
            <a
              href="#foundations"
              className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground"
            >
              Design tokens
            </a>
            <a
              href="#growth"
              className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground"
            >
              Growth definitions
            </a>
            <a
              href="#usage"
              className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground"
            >
              Using the kit
            </a>
          </aside>
          <main
            id="main-content"
            className="min-w-0 flex-1 px-5 pb-12 pt-8 sm:px-8 lg:px-10"
          >
            <section id="components" className="scroll-mt-28">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Wireframe components
                    <span className="text-muted-foreground">.</span>
                  </h1>
                  <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                    Reusable components and foundations for professional
                    wireframing.
                  </p>
                </div>
              </div>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-5 xl:flex-row xl:items-center">
                <div
                  className="flex flex-wrap gap-1.5"
                  aria-label="Filter components"
                >
                  {categories.map((c) => (
                    <button
                      key={c}
                      aria-pressed={category === c}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "min-h-10 rounded-md border px-3 text-sm",
                        category === c
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:bg-muted",
                      )}
                    >
                      {c}
                      {c === "All components" && (
                        <span className="ml-2 font-mono text-xs">
                          {specs.length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="relative min-w-0 flex-1 xl:w-48">
                    <Search
                      size={15}
                      aria-hidden="true"
                      className="absolute left-3 top-3.5 text-muted-foreground"
                    />
                    <Input
                      aria-label="Find a component"
                      placeholder="Find a component…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="h-10 pl-9 text-sm"
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Toggle blueprint grid"
                        aria-pressed={grid}
                        onClick={() => setGrid(!grid)}
                      >
                        <Grid2X2 size={17} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle blueprint grid</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p className="sr-only" aria-live="polite">
                {filtered.length} component examples shown
              </p>
              {filtered.length ? (
                <div className="grid items-start gap-5 md:grid-cols-2 2xl:grid-cols-3">
                  {filtered.map((s) => (
                    <Example key={s.id} spec={s} notify={notify} />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-input bg-card py-12">
                  <EmptyState
                    title="No components found"
                    description="Try a different name or category."
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery("");
                        setCategory("All components");
                      }}
                    >
                      Clear filters
                    </Button>
                  </EmptyState>
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
                <span>{filtered.length} component examples</span>
                <span>React · Tailwind · Radix</span>
              </div>
            </section>
            <Foundations />
            <GrowthReference />
            <section
              id="usage"
              className="mt-16 scroll-mt-28 border-t border-border pt-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                Using the kit
              </h2>
              <div className="mt-5 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="max-w-lg text-base leading-7 text-muted-foreground">
                    Use the components as building blocks. Keep the theme in one
                    place, compose a screen, and spend your energy on the
                    problem.
                  </p>
                  <ol className="mt-6 space-y-4 text-sm">
                    <li className="flex gap-3">
                      <span className="font-mono text-muted-foreground">
                        01
                      </span>
                      Get the source from the repository.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-muted-foreground">
                        02
                      </span>
                      Copy a component example from any tile.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-muted-foreground">
                        03
                      </span>
                      Compose, question, and change it.
                    </li>
                  </ol>
                  <a
                    href={repository}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-input px-4 text-sm hover:bg-muted"
                  >
                    Open repository
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="min-w-0 rounded-md border border-border bg-card p-5">
                  <div className="mb-5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <Code2 size={15} />
                    NextIdea.tsx
                  </div>
                  <pre className="code-view text-sm leading-7">
                    <code>
                      {
                        'import { Button, Input, Label }\n  from "./components/kit"\n\nexport function NextIdea() {\n  return (\n    <div className="space-y-4">\n      <Label htmlFor="idea">What if…</Label>\n      <Input id="idea" />\n      <Button>Explore the idea</Button>\n    </div>\n  )\n}'
                      }
                    </code>
                  </pre>
                </div>
              </div>
            </section>
            <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
              <span>Blueprint wireframe kit</span>
              <a
                href="https://blueprint-generator.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Inspired by Blueprint Generator
              </a>
              <span>Version 0.3</span>
            </footer>
          </main>
        </div>
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {message}
        </div>
        {message && (
          <div className="fixed bottom-5 right-5 z-[var(--layer-toast)] max-w-[calc(100vw-40px)]">
            <Toast
              announce={false}
              key={message}
              message={message}
              onDismiss={() => setMessage("")}
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
export default App;
