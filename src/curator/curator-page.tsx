import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  Copy,
  Download,
  FileSearch,
  KeyRound,
  LoaderCircle,
  Upload,
} from "lucide-react";
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
  Textarea,
} from "../components/kit";
import {
  decisionLabels,
  type CuratorInput,
  type CuratorReport,
  type CuratorStatus,
  type Observation,
  type ReferenceKind,
} from "./contracts";
import { curatorExamples } from "./examples";

const endpoint = `${import.meta.env.BASE_URL}__curator/`;
const blank: CuratorInput = {
  version: 1,
  title: "",
  sourceName: "",
  referenceKind: "screenshot",
  observations: [],
  components: [],
  actions: [],
  explicitInclusion: false,
};
type FormValues = {
  title: string;
  sourceName: string;
  sourceUrl: string;
  referenceKind: ReferenceKind;
  observations: string;
  components: string;
  actions: string;
  explicitInclusion: boolean;
};
const fromInput = (input: CuratorInput): FormValues => ({
  ...input,
  sourceUrl: input.sourceUrl ?? "",
  observations: input.observations.map((item) => item.text).join("\n"),
  components: input.components.map((item) => item.text).join("\n"),
  actions: input.actions.map((item) => item.text).join("\n"),
});
const lines = (text: string, prefix: string): Observation[] =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((text, index) => ({ id: `${prefix}${index + 1}`, text }));

async function request<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(
    `${endpoint}${path}`,
    body === undefined
      ? { cache: "no-store" }
      : {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
  );
  const data = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      typeof data?.error === "string"
        ? data.error
        : "The local curator is unavailable. Check the preview server and try again.",
    );
  if (!data || typeof data !== "object")
    throw new Error(
      "The local curator endpoint is unavailable. Restart the preview server, then retry the connection.",
    );
  return data as T;
}

function download(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Report({ report }: { report: CuratorReport }) {
  const [copyMessage, setCopyMessage] = useState("");
  const heading = report.overrideApplied
    ? "Included at your request"
    : report.decision === "include"
      ? "A growth pattern is present"
      : report.decision === "context_only"
        ? "Keep this as product context"
        : "Resolve these gaps first";
  return (
    <section
      aria-labelledby="curator-result-title"
      className="min-w-0 rounded-lg border border-border bg-surface-sunken p-5 text-foreground sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClipboardCheck size={18} aria-hidden="true" /> Suggested
          classification
        </span>
        <Badge
          variant="outline"
          className={
            report.decision === "include" && !report.overrideApplied
              ? "growth-scope rounded-full bg-secondary text-secondary-foreground border-input"
              : "rounded-full"
          }
        >
          {report.overrideApplied
            ? "Included by request"
            : decisionLabels[report.decision]}
        </Badge>
      </div>
      <h2
        id="curator-result-title"
        className="mt-5 text-2xl font-semibold tracking-tight"
      >
        {heading}
      </h2>
      <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
        {report.input.title}
      </p>
      {report.overrideApplied && (
        <p className="mt-4 rounded-md border border-border bg-background p-4 text-sm leading-6">
          The model classified this as{" "}
          {decisionLabels[report.modelDecision].toLowerCase()}. Your inclusion
          request is recorded separately from its growth assessment.
        </p>
      )}
      <dl className="mt-6 space-y-4 border-y border-border py-5 text-sm">
        <div>
          <dt className="text-muted-foreground">Growth goal</dt>
          <dd className="mt-1 font-medium">
            {report.goal?.label ?? "Not established from this reference"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Mechanism</dt>
          <dd className="mt-1 font-medium">
            {report.mechanism?.label ?? "Not established from this reference"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Invited action</dt>
          <dd className="mt-1 break-words leading-6">
            {report.targetAction?.text ?? "Not established from this reference"}
          </dd>
        </div>
      </dl>
      <h3 className="mt-6 font-medium">Growth and its surroundings</h3>
      <ul className="mt-3 space-y-3">
        {report.components.map((component) => (
          <li
            key={component.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <Badge
              variant="outline"
              className={
                component.role === "growth"
                  ? "growth-scope rounded-full border-input bg-secondary text-secondary-foreground"
                  : "rounded-full"
              }
            >
              {component.role === "growth"
                ? "Yellow · Growth"
                : component.role === "context"
                  ? "Blue · Context"
                  : "Needs review"}
            </Badge>
            <p className="mt-2 break-words text-sm leading-6">
              {component.text}
            </p>
          </li>
        ))}
      </ul>
      {report.evidence.length > 0 && (
        <>
          <h3 className="mt-6 font-medium">Supporting observations</h3>
          <ul className="mt-3 space-y-3">
            {report.evidence.map((item) => (
              <li key={item.id} className="border-l-2 border-input pl-4">
                <p className="break-words text-sm leading-6">{item.text}</p>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Source observation {item.id.replace(/^o/, "")}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      {report.reviewNotes.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium">Review notes</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {report.reviewNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-7 flex flex-wrap gap-3">
        <Button
          onClick={() =>
            download(`${report.id}.md`, report.briefMarkdown, "text/markdown")
          }
        >
          <Download aria-hidden="true" /> Download brief
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(report.briefMarkdown);
              setCopyMessage("Brief copied.");
            } catch {
              setCopyMessage(
                "Clipboard unavailable. Download the brief instead.",
              );
            }
          }}
        >
          <Copy aria-hidden="true" /> Copy brief
        </Button>
      </div>
      <p role="status" className="mt-3 text-sm text-muted-foreground">
        {copyMessage ||
          "Saved locally. The brief is ready for our wireframing workflow."}
      </p>
      <details className="mt-6 border-t border-border pt-4 text-sm">
        <summary className="cursor-pointer rounded py-2 text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring">
          Assessment details
        </summary>
        <p className="mt-3 break-words leading-6 text-muted-foreground">
          {report.model} · {new Date(report.assessedAt).toLocaleString()}.
          Confidence describes the model’s answer distribution, not proven
          accuracy. Review thresholds are provisional.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() =>
            download(
              `${report.id}.json`,
              JSON.stringify(report, null, 2),
              "application/json",
            )
          }
        >
          Download assessment JSON
        </Button>
      </details>
    </section>
  );
}

export default function CuratorPage() {
  const directoryParams = new URLSearchParams(location.search);
  directoryParams.delete("tool");
  const [form, setForm] = useState<FormValues>(() => fromInput(blank));
  const [connection, setConnection] = useState<CuratorStatus | null>(null);
  const [showConnection, setShowConnection] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<CuratorReport | null>(null);
  const [importMessage, setImportMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const resultRegion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    request<CuratorStatus>("status")
      .then((value) => {
        if (active) {
          setConnection(value);
          setShowConnection(!value.configured);
        }
      })
      .catch((reason) => {
        if (active) setConnectionError(reason.message);
      });
    return () => {
      active = false;
    };
  }, []);
  function change<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setReport(null);
    setError("");
    setImportMessage("");
  }
  async function refreshConnection() {
    setConnectionError("");
    try {
      const value = await request<CuratorStatus>("status");
      setConnection(value);
      setShowConnection(!value.configured);
    } catch (reason) {
      setConnectionError(
        reason instanceof Error
          ? reason.message
          : "Could not check the connection.",
      );
    }
  }
  async function connect(event: FormEvent) {
    event.preventDefault();
    setConnecting(true);
    setConnectionError("");
    try {
      const value = await request<CuratorStatus>("connect", { apiKey });
      setConnection(value);
      setApiKey("");
      setShowConnection(false);
    } catch (reason) {
      setConnectionError(
        reason instanceof Error
          ? reason.message
          : "Could not save the connection.",
      );
    } finally {
      setConnecting(false);
    }
  }
  async function assess(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setReport(null);
    const input: CuratorInput = {
      version: 1,
      title: form.title,
      sourceName: form.sourceName,
      ...(form.sourceUrl.trim() ? { sourceUrl: form.sourceUrl.trim() } : {}),
      referenceKind: form.referenceKind,
      observations: lines(form.observations, "o"),
      components: lines(form.components, "c"),
      actions: lines(form.actions, "a"),
      explicitInclusion: form.explicitInclusion,
    };
    try {
      setReport(await request<CuratorReport>("review", input));
      requestAnimationFrame(() => resultRegion.current?.focus());
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "The review could not be completed.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function importBrief(file?: File) {
    if (!file) return;
    setError("");
    try {
      if (file.size > 64000)
        throw new Error("Keep the observation brief below 64 KB.");
      const input = JSON.parse(await file.text()) as CuratorInput;
      if (
        input.version !== 1 ||
        typeof input.title !== "string" ||
        typeof input.sourceName !== "string" ||
        (input.sourceUrl !== undefined &&
          typeof input.sourceUrl !== "string") ||
        !["screenshot", "video", "link"].includes(input.referenceKind) ||
        ![input.observations, input.components, input.actions].every(
          (items) =>
            Array.isArray(items) &&
            items.every((item) => typeof item?.text === "string"),
        )
      )
        throw new Error(
          "Import an observation brief with a title, source, reference kind, observations, components, and actions.",
        );
      setForm(
        fromInput({
          ...input,
          explicitInclusion: false,
        }),
      );
      setReport(null);
      setImportMessage("Observation brief loaded. Review it before assessing.");
    } catch (reason) {
      setError(
        reason instanceof Error && reason.name !== "SyntaxError"
          ? reason.message
          : "This file is not valid JSON.",
      );
    }
    if (fileInput.current) fileInput.current.value = "";
  }
  return (
    <main
      id="main-content"
      className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-10 lg:py-10"
    >
      <a
        href={`?${directoryParams}`}
        className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <ArrowLeft size={16} aria-hidden="true" /> All experiments
      </a>
      <header className="mt-4 flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Review a reference
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
            Find the growth intervention. Keep its surroundings in context.
            Build from an evidence-backed brief.
          </p>
        </div>
        <Badge variant="outline" className="rounded-full px-3 py-1">
          Local tool
        </Badge>
      </header>

      <section
        aria-label="TypeSafe connection"
        className="mt-7 rounded-lg border border-border bg-surface-sunken p-5 text-foreground"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <KeyRound size={18} aria-hidden="true" />
            <div>
              <h2 className="text-sm font-medium">
                {connection?.configured
                  ? "TypeSafe key saved"
                  : "Connect TypeSafe"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {connection?.configured
                  ? "Ready to assess your observations with Jev."
                  : "Add your API key once to use the local curator."}
              </p>
            </div>
          </div>
          {connection?.configured && (
            <Button
              variant="ghost"
              size="sm"
              disabled={busy}
              onClick={() => setShowConnection((value) => !value)}
            >
              {showConnection ? "Cancel" : "Change key"}
            </Button>
          )}
        </div>
        {showConnection && (
          <form onSubmit={connect} className="mt-5 max-w-2xl">
            <Label htmlFor="typesafe-key">TypeSafe API key</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input
                id="typesafe-key"
                name="typesafe-key"
                type="password"
                autoComplete="off"
                spellCheck={false}
                required
                maxLength={1024}
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                disabled={connecting}
                placeholder="Paste your key here"
                aria-describedby="key-location"
              />
              <Button type="submit" disabled={connecting || !apiKey.trim()}>
                {connecting ? (
                  <LoaderCircle
                    className="motion-safe:animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Check aria-hidden="true" />
                )}{" "}
                Save key
              </Button>
            </div>
            <p
              id="key-location"
              className="mt-3 text-xs leading-5 text-muted-foreground"
            >
              Stored in this project’s private .env.local file. The browser
              sends it only to the local server; it stays out of GitHub and the
              published site.
            </p>
          </form>
        )}
        {connectionError && (
          <div className="mt-3">
            <p role="alert" className="text-sm text-destructive-text">
              {connectionError}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => void refreshConnection()}
            >
              Retry connection
            </Button>
          </div>
        )}
      </section>

      <div className="mt-8 grid items-start gap-7 lg:grid-cols-2 lg:gap-9">
        <section
          aria-labelledby="reference-input-title"
          className="min-w-0 rounded-lg border border-border bg-surface-sunken p-5 text-foreground sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="reference-input-title" className="text-xl font-semibold">
              Your reference
            </h2>
            <Button
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => fileInput.current?.click()}
            >
              <Upload aria-hidden="true" /> Import brief
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              aria-label="Import observation brief"
              tabIndex={-1}
              onChange={(event) => void importBrief(event.target.files?.[0])}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Use notes from the complete screenshot, recording, or page. Our chat
            workflow can inspect the original and prepare these for you.
          </p>
          <div
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Example references"
          >
            {curatorExamples.map((example) => (
              <Button
                key={example.name}
                variant="ghost"
                size="sm"
                disabled={busy}
                className="h-auto min-h-9 whitespace-normal py-2 text-left text-xs"
                onClick={() => {
                  setForm(fromInput(example.input));
                  setReport(null);
                  setError("");
                  setImportMessage(
                    "Fictional example loaded. Assessment runs only when you select Review reference.",
                  );
                }}
              >
                {example.name}
              </Button>
            ))}
          </div>
          {importMessage && (
            <p
              role="status"
              className="mt-3 text-xs leading-5 text-muted-foreground"
            >
              {importMessage}
            </p>
          )}
          <form onSubmit={assess} className="mt-6">
            <fieldset disabled={busy} className="min-w-0 space-y-5">
              <div>
                <Label htmlFor="reference-title">Working title</Label>
                <Input
                  id="reference-title"
                  className="mt-2"
                  value={form.title}
                  onChange={(event) => change("title", event.target.value)}
                  required
                  maxLength={160}
                  placeholder="e.g. Offer annual savings at upgrade"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="reference-source">Source</Label>
                  <Input
                    id="reference-source"
                    className="mt-2"
                    value={form.sourceName}
                    onChange={(event) =>
                      change("sourceName", event.target.value)
                    }
                    required
                    maxLength={100}
                    placeholder="Product or company"
                  />
                </div>
                <div>
                  <Label htmlFor="reference-kind">Reference type</Label>
                  <Select
                    value={form.referenceKind}
                    onValueChange={(value) =>
                      change("referenceKind", value as ReferenceKind)
                    }
                    disabled={busy}
                  >
                    <SelectTrigger id="reference-kind" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screenshot">Screenshot</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="reference-url">
                  Source link{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="reference-url"
                  type="url"
                  className="mt-2"
                  value={form.sourceUrl}
                  onChange={(event) => change("sourceUrl", event.target.value)}
                  maxLength={2000}
                  placeholder="https://"
                />
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Kept with the local brief. Links are not fetched
                  automatically.
                </p>
              </div>
              <div>
                <Label htmlFor="reference-observations">What is visible?</Label>
                <Textarea
                  id="reference-observations"
                  className="mt-2 min-h-40"
                  rows={6}
                  value={form.observations}
                  onChange={(event) =>
                    change("observations", event.target.value)
                  }
                  required
                  maxLength={16000}
                  placeholder="Describe the audience, trigger, visible proposition, and flow states. Preserve useful original copy."
                  aria-describedby="observations-help"
                />
                <p
                  id="observations-help"
                  className="mt-2 text-xs leading-5 text-muted-foreground"
                >
                  One observation per line. Include missing context and
                  unobserved steps.
                </p>
              </div>
              <div>
                <Label htmlFor="reference-components">
                  Components and their surroundings
                </Label>
                <Textarea
                  id="reference-components"
                  className="mt-2"
                  rows={4}
                  value={form.components}
                  onChange={(event) => change("components", event.target.value)}
                  required
                  maxLength={10000}
                  placeholder="One component per line, with enough detail to tell its role."
                  aria-describedby="components-help"
                />
                <p
                  id="components-help"
                  className="mt-2 text-xs leading-5 text-muted-foreground"
                >
                  Include the focal panel and surrounding navigation, forms, or
                  cards.
                </p>
              </div>
              <div>
                <Label htmlFor="reference-actions">Observed actions</Label>
                <Textarea
                  id="reference-actions"
                  className="mt-2"
                  rows={3}
                  value={form.actions}
                  onChange={(event) => change("actions", event.target.value)}
                  required
                  maxLength={5000}
                  placeholder="One available action per line, e.g. Choose annual billing."
                />
              </div>
              <div className="flex items-start gap-3 rounded-md border border-border bg-background p-4">
                <Checkbox
                  id="reference-override"
                  checked={form.explicitInclusion}
                  onCheckedChange={(value) =>
                    change("explicitInclusion", value === true)
                  }
                />
                <div>
                  <Label htmlFor="reference-override" className="leading-5">
                    Include this at my request
                  </Label>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Records your exception while preserving the model’s
                    assessment.
                  </p>
                </div>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Review sends these observations and component notes to TypeSafe.
                Original files and the source link stay local.
              </p>
              <Button
                type="submit"
                className="w-full"
                disabled={busy || !connection?.configured}
              >
                {busy ? (
                  <LoaderCircle
                    className="motion-safe:animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <FileSearch aria-hidden="true" />
                )}
                {busy ? "Reviewing reference…" : "Review reference"}
                {!busy && <ArrowRight aria-hidden="true" />}
              </Button>
            </fieldset>
            {!connection?.configured && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Connect TypeSafe above to start a review.
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="mt-4 text-sm leading-6 text-destructive-text"
              >
                {error}
              </p>
            )}
          </form>
        </section>

        <div
          ref={resultRegion}
          tabIndex={-1}
          aria-label="Reference assessment"
          aria-busy={busy}
          className="min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {report ? (
            <Report key={report.id} report={report} />
          ) : (
            <section className="rounded-lg border border-border bg-surface-deep p-6 text-foreground sm:p-8">
              <div className="inline-flex size-12 items-center justify-center rounded-lg border border-border bg-surface-sunken">
                <ClipboardCheck size={24} aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">
                {busy
                  ? "Finding the intervention"
                  : "A focused brief, ready to build"}
              </h2>
              <p
                role={busy ? "status" : undefined}
                className="mt-3 text-sm leading-6 text-muted-foreground"
              >
                {busy
                  ? "Checking growth intent, supporting evidence, and the role of each component."
                  : "Assess the observed behavior before adding another experiment to the library."}
              </p>
              <ul className="mt-7 space-y-5 text-sm">
                <li>
                  <strong className="block font-medium">
                    A clear growth decision
                  </strong>
                  <span className="mt-1 block leading-6 text-muted-foreground">
                    Distinguish an intervention from ordinary product
                    functionality.
                  </span>
                </li>
                <li>
                  <strong className="block font-medium">
                    Precise yellow and blue boundaries
                  </strong>
                  <span className="mt-1 block leading-6 text-muted-foreground">
                    Highlight the growth components and preserve the context
                    around them.
                  </span>
                </li>
                <li>
                  <strong className="block font-medium">
                    Evidence you can trace
                  </strong>
                  <span className="mt-1 block leading-6 text-muted-foreground">
                    Carry original observations, available actions, and
                    unresolved questions into the wireframe.
                  </span>
                </li>
              </ul>
              <p className="mt-7 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
                The curator prepares a draft. Building, checking, and filing the
                experiment remain part of our reference workflow.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
