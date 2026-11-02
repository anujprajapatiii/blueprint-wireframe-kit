import { useEffect, useState, type ReactNode } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Info,
  TriangleAlert,
} from "lucide-react";
import tokens from "../tokens.json";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "./kit";

const palette: Record<string, string> = tokens.palette;
const colourValues: Record<string, string> = {
  ...palette,
  ...Object.fromEntries(
    tokens.groups.flatMap((group) =>
      group.tokens.map(({ name, value }) => [name, value]),
    ),
  ),
};

function resolveColour(value: string, depth = 0): string {
  if (!value.startsWith("{") || depth > 10) return value;
  const nextValue = colourValues[value.slice(1, -1)];
  return nextValue ? resolveColour(nextValue, depth + 1) : value;
}

function FoundationCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-card p-5">
      <h3 className="text-base font-medium">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function TokenTable({
  values,
  label,
}: {
  values: Record<string, string | number>;
  label: string;
}) {
  return (
    <table className="w-full text-left text-sm" aria-label={label}>
      <thead className="sr-only">
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {Object.entries(values).map(([name, value]) => (
          <tr key={name}>
            <th
              scope="row"
              className="py-2.5 pr-4 font-mono font-normal break-all"
            >
              {name}
            </th>
            <td className="py-2.5 text-right font-mono break-all text-muted-foreground">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const surfaces = [
  { name: "surface-deep", label: "Deep", use: "App shell" },
  { name: "surface-sunken", label: "Sunken", use: "Inset areas" },
  { name: "background", label: "Canvas", use: "Page content" },
  { name: "card", label: "Card", use: "Grouped content" },
  { name: "surface-raised", label: "Raised", use: "Active areas" },
];

type ColourFamily = "blue" | "growth";

const pairingRecipes = [
  { surface: "background", foreground: "foreground", label: "Canvas" },
  { surface: "card", foreground: "card-foreground", label: "Card" },
  {
    surface: "surface-sunken",
    foreground: "muted-foreground",
    label: "Supporting text",
  },
  {
    surface: "surface-deep",
    foreground: "foreground-subtle",
    label: "Subtle text",
  },
  {
    surface: "popover",
    foreground: "popover-foreground",
    label: "Menu or dialog",
  },
  { surface: "inverse", foreground: "inverse-foreground", label: "Inverse" },
  {
    surface: "primary",
    foreground: "primary-foreground",
    label: "Primary · default",
  },
  {
    surface: "primary-hover",
    foreground: "primary-foreground",
    label: "Primary · hover",
  },
  {
    surface: "primary-active",
    foreground: "primary-foreground",
    label: "Primary · pressed",
  },
  {
    surface: "secondary",
    foreground: "secondary-foreground",
    label: "Secondary · default",
  },
  {
    surface: "secondary-hover",
    foreground: "secondary-foreground",
    label: "Secondary · hover",
  },
  {
    surface: "secondary-active",
    foreground: "secondary-foreground",
    label: "Secondary · pressed",
  },
  { surface: "selected", foreground: "selected-foreground", label: "Selected" },
  { surface: "disabled", foreground: "disabled-foreground", label: "Disabled" },
  {
    surface: "surface-sunken",
    foreground: "input",
    label: "Input boundary",
    boundary: true,
  },
  { surface: "card", foreground: "ring", label: "Focus ring", boundary: true },
  {
    surface: "inverse",
    foreground: "ring-inverse",
    label: "Inverse focus",
    boundary: true,
  },
];

function contrastRatio(foreground: string, background: string) {
  const luminance = (value: string) => {
    const hex = resolveColour(`{${value}}`);
    if (!/^#[\da-f]{6}$/i.test(hex)) return Number.NaN;
    const rgb = [1, 3, 5].map((offset) => {
      const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function ComponentSpecimens({ family }: { family: ColourFamily }) {
  const [action, setAction] = useState("");
  const growth = family === "growth";
  const prefix = `foundation-${family}`;
  return (
    <FoundationCard
      title="Components in context"
      description="Try the controls with a pointer or keyboard to see how they look in this theme."
    >
      <div
        className={cn(
          growth && "growth-scope",
          "min-w-0 space-y-6 rounded-md border border-border bg-card p-4 text-card-foreground sm:p-5",
        )}
      >
        <div>
          <h4 className="text-sm font-medium">Actions</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {(
              [
                ["default", "Primary"],
                ["secondary", "Secondary"],
                ["outline", "Outline"],
                ["ghost", "Ghost"],
              ] as const
            ).map(([variant, label]) => (
              <Button
                key={variant}
                variant={variant}
                onClick={() => setAction(`${label} button selected.`)}
              >
                {label}
              </Button>
            ))}
            <Button disabled>Disabled</Button>
          </div>
          <p
            className="mt-3 min-h-5 text-sm text-muted-foreground"
            role="status"
          >
            {action || "These examples do not save or send data."}
          </p>
        </div>
        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <Label htmlFor={`${prefix}-input`}>Experiment name</Label>
            <Input id={`${prefix}-input`} placeholder="Upgrade prompt" />
          </div>
          <div className="min-w-0 space-y-2">
            <Label htmlFor={`${prefix}-select`}>Growth goal</Label>
            <Select defaultValue="activation">
              <SelectTrigger id={`${prefix}-select`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={growth ? "growth-scope" : undefined}>
                <SelectItem value="activation">Activation</SelectItem>
                <SelectItem value="engagement">
                  Engagement & adoption
                </SelectItem>
                <SelectItem value="monetization">
                  Monetization & purchase
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-0 space-y-2">
            <Label htmlFor={`${prefix}-disabled`}>Disabled input</Label>
            <Input
              id={`${prefix}-disabled`}
              value="Unavailable in this state"
              disabled
            />
          </div>
          <div className="min-w-0 space-y-2">
            <Label htmlFor={`${prefix}-invalid`}>
              Experiment name (required)
            </Label>
            <Input
              id={`${prefix}-invalid`}
              placeholder="Upgrade prompt"
              aria-invalid="true"
              aria-describedby={`${prefix}-error`}
            />
            <p
              id={`${prefix}-error`}
              className="flex items-start gap-2 text-sm text-destructive-text"
            >
              <AlertCircle
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              Enter a name to continue.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-4">
          <label className="flex items-center gap-3 text-sm">
            <Checkbox defaultChecked /> Selected option
          </label>
          <label className="flex items-center gap-3 text-sm">
            <Switch defaultChecked /> Enabled setting
          </label>
          <label className="flex items-center gap-3 text-sm text-disabled-foreground">
            <Checkbox disabled /> Unavailable option
          </label>
        </div>
        <Tabs defaultValue="selected">
          <TabsList
            aria-label={`${growth ? "Yellow" : "Blue"} selection example`}
            className="max-w-full flex-wrap"
          >
            <TabsTrigger value="selected">Selected</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="selected"
            className="text-sm text-muted-foreground"
          >
            Selection uses a border and label as well as colour.
          </TabsContent>
          <TabsContent
            value="available"
            className="text-sm text-muted-foreground"
          >
            The same component keeps its keyboard and selection behavior.
          </TabsContent>
        </Tabs>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">Information</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
        {growth && (
          <div className="growth-context min-w-0 rounded-md border border-border bg-surface-sunken p-4 text-foreground">
            <h4 className="text-sm font-medium">Product context stays blue</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Use blue for surrounding product content. Use yellow for the
              complete growth card, modal, or banner being studied.
            </p>
          </div>
        )}
      </div>
    </FoundationCard>
  );
}

function ColourFoundations({
  family,
  copiedToken,
  copyStatus,
  copyToken,
  copyAllTokens,
}: {
  family: ColourFamily;
  copiedToken: string;
  copyStatus: string;
  copyToken: (name: string) => Promise<void>;
  copyAllTokens: () => Promise<void>;
}) {
  const growth = family === "growth";
  const nameFor = (name: string) => (growth ? `growth-${name}` : name);
  const colourName = growth ? "Yellow growth" : "Blue context";
  const swatchPrefix = growth ? "yellow-" : "blue-";
  const groups = tokens.groups.filter(
    (group) => group.id.startsWith("growth-") === growth,
  );
  return (
    <div className="space-y-5">
      <FoundationCard
        title={`${colourName} palette`}
        description={
          growth
            ? "Yellow highlights the complete growth pattern. Use dark text on light backgrounds and light text on dark buttons. Keep surrounding content blue."
            : "Blue is the default for the library, navigation, and surrounding product content. Use light text on blue backgrounds."
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Select a shade to copy its CSS variable.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void copyAllTokens()}
          >
            {copiedToken === "all-colours" ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            Copy colour tokens
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6 xl:grid-cols-11">
          {Object.entries(palette)
            .filter(([name]) => name.startsWith(swatchPrefix))
            .sort(
              ([a], [b]) => Number(a.split("-")[1]) - Number(b.split("-")[1]),
            )
            .map(([name, value]) => (
              <button
                key={name}
                type="button"
                onClick={() => void copyToken(name)}
                className="min-w-0 rounded-sm text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                aria-label={`Copy ${name}, ${value}`}
              >
                <span
                  className="block h-14 rounded-sm border border-input/50"
                  style={{ backgroundColor: `var(--${name})` }}
                  aria-hidden="true"
                />
                <span className="mt-2 flex items-center gap-1 font-mono text-sm">
                  {name.replace(swatchPrefix, "")}
                  {copiedToken === name && (
                    <Check className="size-3.5" aria-hidden="true" />
                  )}
                </span>
                <span className="mt-0.5 block font-mono text-sm break-all text-muted-foreground">
                  {value.toUpperCase()}
                </span>
              </button>
            ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Use the named background and text pairs below to keep text readable.
        </p>
      </FoundationCard>

      <FoundationCard
        title="Backgrounds and text"
        description="Choose a background for the component, then use its matching text colour."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ...surfaces.map(({ name, label, use }) => ({
              name,
              label,
              use,
              foreground: "foreground",
            })),
            {
              name: "inverse",
              label: "Inverse",
              use: "High-contrast area",
              foreground: "inverse-foreground",
            },
          ].map(({ name, label, use, foreground }) => (
            <div key={name} className="min-w-0">
              <div
                className="flex min-h-28 flex-col justify-end gap-1 rounded-sm border p-4"
                style={{
                  backgroundColor: `var(--${nameFor(name)})`,
                  color: `var(--${nameFor(foreground)})`,
                  borderColor: `var(--${nameFor("border")})`,
                }}
              >
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm">{use}</span>
              </div>
              <p className="mt-2 font-mono text-xs break-all text-muted-foreground">
                {nameFor(name)} + {nameFor(foreground)}
              </p>
            </div>
          ))}
        </div>
      </FoundationCard>

      <ComponentSpecimens family={family} />

      <details className="group rounded-md border border-border bg-card">
        <summary className="flex list-none items-center justify-between gap-3 rounded-md p-5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
          <span>
            <span className="font-medium">Colour pairs and contrast</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Current contrast ratios. Text target: 4.5:1. Control edges and
              focus indicators: 3:1.
            </span>
          </span>
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-border px-5">
          {pairingRecipes.map(({ surface, foreground, label, boundary }) => {
            const background = nameFor(surface);
            const ink = nameFor(foreground);
            const ratio = contrastRatio(ink, background);
            const minimum = boundary ? 3 : 4.5;
            return (
              <div
                key={`${surface}-${foreground}`}
                className="grid min-w-0 gap-3 border-b border-border py-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-center"
              >
                <span className="text-sm font-medium">{label}</span>
                <span className="min-w-0 font-mono text-xs leading-relaxed break-all text-muted-foreground">
                  {ink}
                  <span className="mx-1">on</span>
                  {background}
                </span>
                <span
                  className="w-fit rounded-sm border border-border px-2 py-1 font-mono text-sm"
                  aria-label={`${label}: ${ratio.toFixed(2)} to one; ${ratio >= minimum ? "meets" : "below"} ${minimum} to one target`}
                >
                  {ratio.toFixed(2)}:1{" "}
                  {ratio >= minimum ? (
                    <Check
                      className="ml-1 inline size-3.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <TriangleAlert
                      className="ml-1 inline size-3.5"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </div>
            );
          })}
          <p className="py-4 text-sm leading-relaxed text-muted-foreground">
            These ratios use solid colours. Check the finished screen when using
            transparency, overlays, or mixed themes. Decorative borders are not
            enough to identify an input. Colour checks alone do not establish
            accessibility.
          </p>
        </div>
      </details>

      <div className="space-y-3">
        {groups.map((group, index) => (
          <details
            key={group.id}
            open={index === 0}
            className="group rounded-md border border-border bg-card"
          >
            <summary className="flex list-none items-center justify-between gap-3 rounded-md p-5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="font-medium">{group.title}</span>
                <span className="ml-3 text-sm text-muted-foreground">
                  {group.tokens.length} tokens
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {group.description}
                </span>
              </span>
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="grid gap-1 border-t border-border p-2 md:grid-cols-2">
              {group.tokens.map(({ name, value, description }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => void copyToken(name)}
                  className="flex min-w-0 items-start gap-3 rounded-sm p-3 text-left hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  aria-label={`Copy ${name} CSS variable. ${description}`}
                >
                  <span
                    className="mt-0.5 block size-9 shrink-0 rounded-sm border border-input/60"
                    style={{ backgroundColor: `var(--${name})` }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block font-mono break-all">{name}</span>
                    <span className="mt-1 block text-muted-foreground">
                      {description}
                    </span>
                    <span className="mt-1 block font-mono text-muted-foreground">
                      {resolveColour(value).toUpperCase()}
                    </span>
                  </span>
                  {copiedToken === name ? (
                    <Check
                      className="mt-1 size-4 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy
                      className="mt-1 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          </details>
        ))}
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="min-h-5 break-words text-sm text-muted-foreground"
      >
        {copyStatus || "Select a token to copy its CSS variable."}
      </p>
    </div>
  );
}

export function Foundations({ standalone = false }: { standalone?: boolean }) {
  const [category, setCategory] = useState(() => {
    const requested = new URLSearchParams(location.search).get("foundation");
    return requested &&
      ["colours", "growth", "layout", "behaviour"].includes(requested)
      ? requested
      : "colours";
  });
  const [copiedToken, setCopiedToken] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    if (location.hash !== "#foundations") return;
    const frame = requestAnimationFrame(() =>
      document.getElementById("foundations")?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  async function copyToken(name: string) {
    try {
      await navigator.clipboard.writeText(`var(--${name})`);
      setCopiedToken(name);
      setCopyStatus(`Copied var(--${name}).`);
    } catch {
      setCopiedToken("");
      setCopyStatus(`Copy unavailable. Select and copy var(--${name}).`);
    }
  }

  async function copyAllTokens() {
    const lines = [
      ...Object.entries(palette).map(
        ([name, value]) => `  --${name}: ${value};`,
      ),
      ...tokens.groups.flatMap((group) =>
        group.tokens.map(
          ({ name, value }) =>
            `  --${name}: ${value.startsWith("{") ? `var(--${value.slice(1, -1)})` : value};`,
        ),
      ),
    ];
    try {
      await navigator.clipboard.writeText(`:root {\n${lines.join("\n")}\n}`);
      setCopiedToken("all-colours");
      setCopyStatus("Copied all colour tokens.");
    } catch {
      setCopiedToken("");
      setCopyStatus("Copy unavailable. Colour values are listed below.");
    }
  }

  return (
    <section
      id="foundations"
      aria-labelledby="foundations-heading"
      className={
        standalone
          ? "scroll-mt-28"
          : "mt-20 scroll-mt-28 border-t border-border pt-8"
      }
    >
      <h2
        id="foundations-heading"
        className="text-2xl font-semibold tracking-tight"
      >
        Styles
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        Shared colours, spacing, type, and interaction styles for every
        wireframe.
      </p>

      <Tabs
        value={category}
        onValueChange={(value) => {
          setCategory(value);
          const url = new URL(location.href);
          url.searchParams.set("foundation", value);
          history.replaceState(history.state, "", url);
        }}
        className="mt-6"
      >
        <TabsList
          aria-label="Style categories"
          className="h-auto max-w-full flex-wrap"
        >
          <TabsTrigger value="colours">Blue context</TabsTrigger>
          <TabsTrigger value="growth">Yellow growth</TabsTrigger>
          <TabsTrigger value="layout">Layout &amp; type</TabsTrigger>
          <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
        </TabsList>

        <TabsContent value="colours" className="mt-6">
          <ColourFoundations
            family="blue"
            copiedToken={copiedToken}
            copyStatus={copyStatus}
            copyToken={copyToken}
            copyAllTokens={copyAllTokens}
          />
        </TabsContent>
        <TabsContent value="growth" className="mt-6">
          <ColourFoundations
            family="growth"
            copiedToken={copiedToken}
            copyStatus={copyStatus}
            copyToken={copyToken}
            copyAllTokens={copyAllTokens}
          />
        </TabsContent>

        <TabsContent value="layout" className="mt-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <FoundationCard
              title="Spacing"
              description="Use multiples of 4px. Keep related content close and leave more space between tasks."
            >
              <div className="flex flex-wrap gap-2">
                {tokens.foundations.spacing.map((value) => (
                  <span
                    key={value}
                    className="rounded-sm border border-border bg-background px-3 py-2 font-mono text-sm"
                  >
                    {value}px
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Start with 8px within a control, 16px between related fields,
                24px inside panels, and 32px between sections. Adjust for the
                importance of each section.
              </p>
            </FoundationCard>

            <FoundationCard
              title="Control sizes"
              description="Use consistent sizes within a form or toolbar. Leave enough room to tap comfortably."
            >
              <TokenTable
                values={tokens.foundations.controlSizes}
                label="Control size tokens"
              />
            </FoundationCard>

            <FoundationCard
              title="Typography"
              description="Use sans-serif for interface text and monospace for code and values."
            >
              <TokenTable
                values={tokens.foundations.typeScale}
                label="Typography scale tokens"
              />
            </FoundationCard>

            <FoundationCard
              title="Rounded corners"
              description="Keep corners small and consistent. Use fully rounded edges for avatars, switches, and pills."
            >
              <div className="flex flex-wrap gap-4">
                {Object.entries(tokens.foundations.radii).map(
                  ([name, value]) => (
                    <div key={name} className="min-w-16 space-y-2 text-sm">
                      <div
                        className="h-10 w-14 border border-input bg-muted"
                        style={{ borderRadius: value }}
                        aria-hidden="true"
                      />
                      <span className="block font-mono">{name}</span>
                      <span className="block font-mono text-muted-foreground">
                        {value}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </FoundationCard>
          </div>
        </TabsContent>

        <TabsContent value="behaviour" className="mt-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <FoundationCard
              title="Status messages"
              description="Use colour, an icon, and clear text together to explain a status."
            >
              <div className="space-y-2">
                {[
                  {
                    name: "info",
                    icon: Info,
                    message: "A draft is available.",
                  },
                  {
                    name: "success",
                    icon: CheckCircle2,
                    message: "Changes saved.",
                  },
                  {
                    name: "warning",
                    icon: TriangleAlert,
                    message: "Review the draft before continuing.",
                  },
                  {
                    name: "destructive",
                    icon: AlertCircle,
                    message:
                      "Enter an email address, such as name@example.com.",
                  },
                ].map(({ name, icon: Icon, message }) => (
                  <div
                    key={name}
                    className="flex items-start gap-3 rounded-sm border p-3 text-sm leading-relaxed"
                    style={{
                      backgroundColor: `var(--${name}-subtle)`,
                      color: `var(--${name}-text)`,
                      borderColor: `var(--${name}-text)`,
                    }}
                  >
                    <Icon
                      className="mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{message}</span>
                  </div>
                ))}
              </div>
            </FoundationCard>

            <FoundationCard
              title="Interaction requirements"
              description="Check these when building a screen."
            >
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "Give each input a visible label. Explain how to fix errors beside the field.",
                  "Keep focus visible. Support keyboard navigation and return focus after closing overlays.",
                  "Check default, hover, pressed, selected, disabled, loading, and error states.",
                  "Design for narrow screens, text enlargement, reduced motion, and forced colours.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                Contrast targets: 4.5:1 for body text and 3:1 for large text and
                essential control edges. Check the completed flow against WCAG
                2.2 AA; passing colour checks alone is not enough.
              </p>
            </FoundationCard>

            <FoundationCard
              title="Motion"
              description="Keep transitions brief and useful. Respect reduced-motion settings."
            >
              <TokenTable
                values={tokens.foundations.motion}
                label="Motion tokens"
              />
            </FoundationCard>

            <FoundationCard
              title="Layer order"
              description="Use these layers to keep navigation, menus, dialogs, and messages in the right order."
            >
              <TokenTable
                values={tokens.foundations.layers}
                label="Stacking layer tokens"
              />
            </FoundationCard>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
