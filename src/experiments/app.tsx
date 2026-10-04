import { lazy, Suspense, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../components/kit";
import { BlueprintLogo } from "../components/blueprint-logo";
import { ExperimentDirectory } from "./directory";
import { SteamGrowthBanners } from "./steam-growth-banners";
import { NotionFeatureModal } from "./notion-feature-modal";
import { GitHubEventBanner } from "./github-event-banner";
import { experiments } from "./registry";
import { ExperimentWorkspace } from "./experiment-workspace";
const SteamWorkbench = import.meta.env.DEV
  ? lazy(() => import("./steam-workbench"))
  : null;

export function ExperimentsApp() {
  const params = new URLSearchParams(location.search);
  const id = params.get("experiment");
  const embedded = params.get("embed") === "1";
  const experiment = experiments.find((entry) => entry.id === id);
  useEffect(() => {
    document.title = `${experiment?.title ?? "Experiments"} — Blueprint`;
  }, [experiment]);
  if (embedded && experiment) {
    return (
      <div className="experiment-embedded">
        {id === "notion-feature-modal" ? (
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
              aria-current={id ? undefined : "page"}
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
          </nav>
        </div>
      </header>
      {!id ? (
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
