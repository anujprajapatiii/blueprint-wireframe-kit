import { lazy, Suspense, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../components/kit";
import { ExperimentDirectory } from "./directory";
import { SteamGrowthBanners } from "./steam-growth-banners";
import { NotionFeatureModal } from "./notion-feature-modal";
import { experiments } from "./registry";
const SteamWorkbench = import.meta.env.DEV
  ? lazy(() => import("./steam-workbench"))
  : null;

export function ExperimentsApp() {
  const id = new URLSearchParams(location.search).get("experiment");
  useEffect(() => {
    const experiment = experiments.find((entry) => entry.id === id);
    document.title = `${experiment?.title ?? "Experiments"} — Blueprint`;
  }, [id]);
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
          <a
            href="?"
            className="text-lg font-semibold tracking-tight"
            aria-label="Blueprint kit home"
          >
            blueprint
          </a>
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
      ) : id === "notion-feature-modal" ? (
        <NotionFeatureModal />
      ) : id === "steam-growth-banners" ? (
        SteamWorkbench ? (
          <Suspense fallback={<p className="p-8">Loading local preview…</p>}>
            <SteamWorkbench />
          </Suspense>
        ) : (
          <SteamGrowthBanners />
        )
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
