import { useState, type ReactNode } from "react";
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
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "./kit";

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

export function Foundations() {
  const [copiedToken, setCopiedToken] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

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
      setCopyStatus(
        "Copied the complete colour palette and semantic variables.",
      );
    } catch {
      setCopiedToken("");
      setCopyStatus("Copy unavailable. Colour values are listed below.");
    }
  }

  return (
    <section
      id="foundations"
      aria-labelledby="foundations-heading"
      className="mt-20 scroll-mt-28 border-t border-border pt-8"
    >
      <h2
        id="foundations-heading"
        className="text-2xl font-semibold tracking-tight"
      >
        Foundations
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        A shared language for every wireframe. Use semantic tokens for surfaces,
        hierarchy, states, and feedback; keep the underlying palette consistent.
      </p>

      <Tabs defaultValue="colours" className="mt-6">
        <TabsList
          aria-label="Foundation categories"
          className="h-auto max-w-full flex-wrap"
        >
          <TabsTrigger value="colours">Colours</TabsTrigger>
          <TabsTrigger value="layout">Layout &amp; type</TabsTrigger>
          <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
        </TabsList>

        <TabsContent value="colours" className="mt-6 space-y-5">
          <div className="rounded-md border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-medium">Blueprint palette</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  From paper-light to deep ink. Select a swatch to copy its CSS
                  variable.
                </p>
              </div>
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
                .filter(([name]) => /^blue-\d+$/.test(name))
                .sort(
                  ([a], [b]) =>
                    Number(a.split("-")[1]) - Number(b.split("-")[1]),
                )
                .map(([name, value]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => void copyToken(name)}
                    className="min-w-0 rounded-sm text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    aria-label={`Copy ${name}, ${value}`}
                    title={`Copy var(--${name})`}
                  >
                    <span
                      className="block h-14 rounded-sm border border-input/50"
                      style={{ backgroundColor: `var(--${name})` }}
                      aria-hidden="true"
                    />
                    <span className="mt-2 flex items-center gap-1 font-mono text-sm">
                      {name.replace("blue-", "")}
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
          </div>

          <FoundationCard
            title="Surface hierarchy"
            description="Separate navigation, work areas, cards, and overlays without adding decoration. Text uses the matching foreground token."
          >
            <div className="grid overflow-hidden rounded-md border border-border sm:grid-cols-5">
              {surfaces.map(({ name, label, use }) => (
                <div
                  key={name}
                  style={{ backgroundColor: `var(--${name})` }}
                  className="flex min-h-28 flex-col justify-end gap-1 border-b border-border p-4 last:border-0 sm:border-r sm:border-b-0"
                >
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm text-muted-foreground">{use}</span>
                </div>
              ))}
            </div>
          </FoundationCard>

          <div className="space-y-3">
            {tokens.groups.map((group, index) => (
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
                      title={`Copy var(--${name})`}
                    >
                      <span
                        className="mt-0.5 block size-9 shrink-0 rounded-sm border border-input/60"
                        style={{ backgroundColor: `var(--${name})` }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 text-sm">
                        <span className="block font-mono break-all">
                          {name}
                        </span>
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
            {copyStatus ||
              "Use bg-card, text-muted-foreground, or border-input in Tailwind. Select any token to copy its CSS variable."}
          </p>
        </TabsContent>

        <TabsContent value="layout" className="mt-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <FoundationCard
              title="Spacing"
              description="A 4px base rhythm. Keep related content close and separate distinct tasks."
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
                information hierarchy.
              </p>
            </FoundationCard>

            <FoundationCard
              title="Control sizes"
              description="Use one density consistently within a form or toolbar. Keep touch controls comfortably sized."
            >
              <TokenTable
                values={tokens.foundations.controlSizes}
                label="Control size tokens"
              />
            </FoundationCard>

            <FoundationCard
              title="Typography"
              description="Sans-serif for interface content. Monospace for code, values, and technical annotations."
            >
              <TokenTable
                values={tokens.foundations.typeScale}
                label="Typography scale tokens"
              />
            </FoundationCard>

            <FoundationCard
              title="Corner radius"
              description="Small, consistent corners keep the interface quiet. Reserve a full radius for avatars, toggles, and pills."
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
              title="Feedback has meaning"
              description="Use status accents only when the message needs them. Pair every colour with an icon and clear wording."
            >
              <div className="space-y-2">
                {[
                  {
                    name: "info",
                    icon: Info,
                    message: "Information: a draft is available.",
                  },
                  {
                    name: "success",
                    icon: CheckCircle2,
                    message: "Success: your changes were saved.",
                  },
                  {
                    name: "warning",
                    icon: TriangleAlert,
                    message: "Warning: review before continuing.",
                  },
                  {
                    name: "destructive",
                    icon: AlertCircle,
                    message: "Error: enter a valid email address.",
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
              description="These are foundations to preserve when composing new screens."
            >
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "Give every input a visible label, useful help, and a recoverable error state.",
                  "Keep focus visible. Support keyboard navigation and return focus after closing overlays.",
                  "Represent default, hover, pressed, selected, disabled, loading, and error states.",
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
                essential control boundaries. Assess WCAG 2.2 AA in the
                completed flow; tokens alone do not establish conformance.
              </p>
            </FoundationCard>

            <FoundationCard
              title="Motion"
              description="Short feedback transitions; no decorative movement. Respect the user’s reduced-motion preference."
            >
              <TokenTable
                values={tokens.foundations.motion}
                label="Motion tokens"
              />
            </FoundationCard>

            <FoundationCard
              title="Stacking layers"
              description="Named layers keep sticky navigation, menus, dialogs, and feedback in a predictable order."
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
