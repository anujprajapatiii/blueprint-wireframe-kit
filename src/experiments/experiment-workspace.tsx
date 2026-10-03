import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Maximize2, RotateCcw } from "lucide-react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/kit";
import type { Experiment } from "./registry";
import { DesignIntent } from "../components/design-intent";
import {
  experimentReferences,
  referenceAssetUrl,
  type ReferenceAsset,
} from "./reference-manifest";
import "./experiment-workspace.css";

type ViewMode = "wireframe" | "reference";

function currentMode(): ViewMode {
  return new URLSearchParams(location.search).get("mode") === "reference"
    ? "reference"
    : "wireframe";
}

function directoryHref() {
  const current = new URLSearchParams(location.search);
  const params = new URLSearchParams({ view: "experiments" });
  for (const key of ["q", "goal", "type", "sort"]) {
    const value = current.get(key);
    if (value) params.set(key, value);
  }
  return `?${params}`;
}

function wireframeHref(id: string) {
  const params = new URLSearchParams({
    view: "experiments",
    experiment: id,
    embed: "1",
  });
  if (
    import.meta.env.DEV &&
    new URLSearchParams(location.search).get("tune") === "1"
  ) {
    params.set("tune", "1");
  }
  return `?${params}`;
}

function OriginalReference({ asset }: { asset: ReferenceAsset }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const src = referenceAssetUrl(asset.src);
  return (
    <figure className="experiment-reference">
      <div className="experiment-reference-stage">
        {failed ? (
          <div className="experiment-reference-error" role="alert">
            <h2 className="text-lg font-semibold">
              The reference couldn’t load
            </h2>
            <p className="text-sm text-muted-foreground">
              Try again, or open the original file.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setFailed(false);
                  setAttempt(attempt + 1);
                }}
              >
                <RotateCcw aria-hidden="true" /> Try again
              </Button>
              <Button asChild variant="outline">
                <a href={src} target="_blank" rel="noreferrer">
                  Open file <ArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        ) : asset.kind === "video" ? (
          <video
            key={attempt}
            controls
            playsInline
            preload="metadata"
            poster={asset.poster ? referenceAssetUrl(asset.poster) : undefined}
            aria-label={asset.title}
            aria-describedby={`reference-description-${asset.id}`}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
            Your browser cannot play this recording. Open the original file
            below.
          </video>
        ) : (
          <img
            key={attempt}
            src={src}
            alt={asset.alt ?? asset.title}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="experiment-reference-caption">
        <div>
          <p className="text-sm font-medium">
            {asset.title}
            {asset.duration && (
              <span className="ml-2 font-normal text-muted-foreground">
                {asset.duration} · Silent recording
              </span>
            )}
          </p>
          <p
            id={`reference-description-${asset.id}`}
            className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground"
          >
            {asset.description}
          </p>
        </div>
        <a
          className="experiment-file-link"
          href={src}
          target="_blank"
          rel="noreferrer"
        >
          Open original file <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}

export function ExperimentWorkspace({
  experiment,
}: {
  experiment: Experiment;
}) {
  const [mode, setMode] = useState<ViewMode>(currentMode);
  const [wireframeVisited, setWireframeVisited] = useState(
    () => currentMode() === "wireframe",
  );
  const references = experimentReferences[experiment.id] ?? [];
  const [assetId, setAssetId] = useState(references[0]?.id ?? "");
  const selectedAsset =
    references.find((asset) => asset.id === assetId) ?? references[0];
  const frameHref = wireframeHref(experiment.id);

  useEffect(() => {
    const syncMode = () => {
      const next = currentMode();
      setMode(next);
      if (next === "wireframe") setWireframeVisited(true);
    };
    window.addEventListener("popstate", syncMode);
    return () => window.removeEventListener("popstate", syncMode);
  }, []);

  function changeMode(value: string) {
    const next = value as ViewMode;
    setMode(next);
    if (next === "wireframe") setWireframeVisited(true);
    const url = new URL(location.href);
    if (next === "reference") url.searchParams.set("mode", "reference");
    else url.searchParams.delete("mode");
    history.replaceState(history.state, "", url);
  }

  return (
    <main id="main-content" className="experiment-workspace">
      <a href={directoryHref()} className="experiment-back-link">
        <ArrowLeft size={16} aria-hidden="true" /> All experiments
      </a>
      <header className="experiment-workspace-heading">
        <h1>{experiment.title}</h1>
        <p>{experiment.summary}</p>
      </header>

      <Tabs value={mode} onValueChange={changeMode} activationMode="manual">
        <div className="experiment-view-toolbar">
          <TabsList aria-label="Experiment view">
            <TabsTrigger value="wireframe">Wireframe</TabsTrigger>
            <TabsTrigger value="reference">Original reference</TabsTrigger>
          </TabsList>
          {mode === "wireframe" && (
            <Button asChild variant="ghost" className="experiment-fullscreen">
              <a href={frameHref} target="_blank" rel="noreferrer">
                <Maximize2 aria-hidden="true" /> Full screen
                <span className="sr-only"> wireframe (opens in a new tab)</span>
              </a>
            </Button>
          )}
        </div>

        <TabsContent
          value="wireframe"
          forceMount
          hidden={mode !== "wireframe"}
          inert={mode !== "wireframe"}
          className="experiment-view-panel"
        >
          {wireframeVisited && (
            <iframe
              className="experiment-wireframe"
              src={frameHref}
              title={`${experiment.title} — interactive wireframe`}
            />
          )}
        </TabsContent>
        <TabsContent value="reference" className="experiment-view-panel">
          {references.length > 1 && (
            <div className="experiment-reference-picker">
              <label htmlFor="reference-asset">Reference</label>
              <select
                id="reference-asset"
                value={assetId}
                onChange={(event) => setAssetId(event.target.value)}
              >
                {references.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedAsset ? (
            <OriginalReference key={selectedAsset.id} asset={selectedAsset} />
          ) : (
            <div className="experiment-reference-empty">
              <h2 className="text-lg font-semibold">Reference not available</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This experiment has no original file attached yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <details className="mt-6 rounded-md border border-border bg-card px-5 sm:px-6">
        <summary className="min-h-14 py-4 text-sm font-medium">
          Design intent
        </summary>
        <DesignIntent
          intent={experiment.growth}
          name={experiment.title}
          className="max-w-4xl pb-6"
        />
      </details>
    </main>
  );
}
