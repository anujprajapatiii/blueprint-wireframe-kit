import { SiteLock } from "../components/site-lock";
import { lazy, Suspense, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../components/kit";
import { BlueprintLogo } from "../components/blueprint-logo";
import { GrowthEducation } from "../components/growth-education";
import { ExperimentDirectory } from "./directory";
import { SteamGrowthBanners } from "./steam-growth-banners";
import { NotionFeatureModal } from "./notion-feature-modal";
import { GitHubEventBanner } from "./github-event-banner";
import { experiments } from "./registry";
import { ExperimentWorkspace } from "./experiment-workspace";
import { collectionById } from "../collections/registry";
const CollectionBrowser = lazy(() =>
  import("../collections/collection-browser").then((module) => ({
    default: module.CollectionBrowser,
  })),
);
const ElevenLabsWireframe = lazy(() =>
  import("./elevenlabs/wireframe").then((module) => ({
    default: module.ElevenLabsWireframe,
  })),
);

const CloudflareWireframe = lazy(() =>
  import("./cloudflare/wireframe").then((module) => ({
    default: module.CloudflareWireframe,
  })),
);

function LegacyElevenLabsLink() {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const patternId = params.get("pattern");
    if (patternId && experiments.some((entry) => entry.id === patternId)) {
      params.set("experiment", patternId);
      if (params.get("section") === "references")
        params.set("mode", "reference");
    } else {
      // The source archive is broader than the curated growth library.
      for (const key of ["experiment", "mode", "embed"]) params.delete(key);
    }
    params.set("source", "ElevenLabs");
    for (const key of ["collection", "pattern", "section", "flow"])
      params.delete(key);
    location.replace(`?${params}`);
  }, []);
  return (
    <main id="main-content" role="status" className="p-8">
      Opening experiments…
    </main>
  );
}
const SteamWorkbench = import.meta.env.DEV
  ? lazy(() => import("./steam-workbench"))
  : null;
const CuratorPage = import.meta.env.DEV
  ? lazy(() => import("../curator/curator-page"))
  : null;

export function ExperimentsApp() {
  const params = new URLSearchParams(location.search);
  const curator = Boolean(CuratorPage && params.get("tool") === "curator");
  const id = params.get("experiment");
  const collectionId = params.get("collection");
  const collection = collectionId ? collectionById[collectionId] : undefined;
  const pattern = collection?.patterns.find(
    (entry) => entry.id === params.get("pattern"),
  );
  const embedded = params.get("embed") === "1";
  const experiment = experiments.find((entry) => entry.id === id);
  useEffect(() => {
    document.title = `${curator ? "Review a reference" : (pattern?.title ?? collection?.title ?? experiment?.title ?? "Experiments")} — Blueprint`;
  }, [experiment, collection, pattern, curator]);
  const archivedElevenLabsEntry =
    id &&
    !experiment &&
    collectionById.elevenlabs.patterns.some((entry) => entry.id === id);
  if (collectionId === "elevenlabs" || archivedElevenLabsEntry)
    return <LegacyElevenLabsLink />;
  if (embedded && experiment) {
    return (
      <div className="experiment-embedded">
        <GrowthEducation experimentId={experiment.id} />
        {id?.startsWith("cf-") ? (
          <Suspense
            fallback={
              <p role="status" className="p-8">
                Loading wireframe…
              </p>
            }
          >
            <CloudflareWireframe patternId={id} title={experiment.title} />
          </Suspense>
        ) : id?.startsWith("el-") ? (
          <Suspense
            fallback={
              <p role="status" className="p-8">
                Loading wireframe…
              </p>
            }
          >
            <ElevenLabsWireframe patternId={id} title={experiment.title} />
          </Suspense>
        ) : id === "notion-feature-modal" ? (
          <NotionFeatureModal embedded />
        ) : id === "github-event-banner" ? (
          <GitHubEventBanner />
        ) : id === "steam-growth-banners" &&
          SteamWorkbench &&
          params.get("tune") === "1" ? (
          <Suspense fallback={<p className="p-8">Loading local preview…</p>}>
            <SteamWorkbench embedded />
          </Suspense>
        ) : id === "steam-growth-banners" ? (
          <SteamGrowthBanners embedded />
        ) : (
          <main id="main-content" className="p-8">
            <h1 className="text-xl font-semibold">
              Wireframe not available yet
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              This experiment’s reference is ready to explore.
            </p>
          </main>
        )}
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-[var(--layer-sticky)] border-b bg-surface-sunken">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 lg:px-8">
          <BlueprintLogo />
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-5 text-sm"
          >
            <a
              href="?"
              className="flex min-h-10 items-center text-muted-foreground hover:text-foreground"
            >
              Kit
            </a>
            <a
              href="?view=experiments"
              aria-current={id || collectionId ? undefined : "page"}
              className="flex min-h-10 items-center underline decoration-input underline-offset-8"
            >
              Experiments
            </a>
            <a
              href="https://github.com/anujprajapatiii/blueprint-wireframe-kit"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-10 items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              Source <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <SiteLock />
          </nav>
        </div>
      </header>
      {curator && CuratorPage ? (
        <Suspense
          fallback={
            <main id="main-content" className="p-8" role="status">
              Loading reference review…
            </main>
          }
        >
          <CuratorPage />
        </Suspense>
      ) : collectionId ? (
        collection ? (
          <Suspense
            fallback={
              <main
                id="main-content"
                className="mx-auto max-w-7xl px-5 py-12"
                role="status"
              >
                Loading collection…
              </main>
            }
          >
            <CollectionBrowser key={collection.id} collection={collection} />
          </Suspense>
        ) : (
          <main
            id="main-content"
            className="mx-auto max-w-3xl space-y-5 px-5 py-16"
          >
            <h1 className="text-3xl font-semibold">Collection not found</h1>
            <p className="text-muted-foreground">
              This collection isn’t in the library.
            </p>
            <Button asChild>
              <a href="?view=experiments">Browse experiments</a>
            </Button>
          </main>
        )
      ) : !id ? (
        <ExperimentDirectory />
      ) : experiment ? (
        <ExperimentWorkspace key={experiment.id} experiment={experiment} />
      ) : (
        <main
          id="main-content"
          className="mx-auto max-w-3xl space-y-5 px-5 py-16"
        >
          <h1 className="text-3xl font-semibold">Experiment not found</h1>
          <p className="text-muted-foreground">
            This link does not match an experiment in the directory.
          </p>
          <Button asChild>
            <a href="?view=experiments">Browse experiments</a>
          </Button>
        </main>
      )}
    </div>
  );
}
