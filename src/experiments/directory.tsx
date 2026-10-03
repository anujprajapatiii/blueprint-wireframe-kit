import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Badge, Button, Input, Label } from "../components/kit";
import { GrowthNutritionLabel } from "../components/growth-nutrition-label";
import {
  growthCategories,
  growthCategoryById,
  type GrowthCategoryId,
} from "../growth/taxonomy";
import { experimentHref, experiments, type ExperimentType } from "./registry";

const experimentTypes: ExperimentType[] = ["Screen", "Flow", "Experience"];

function BannerPreview() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-48 min-w-0 flex-col justify-center gap-3 overflow-hidden border-b border-border bg-surface-sunken p-5 md:min-h-60 md:border-r md:border-b-0"
    >
      <div className="h-2 w-2/5 rounded-xs bg-border-subtle" />
      <div className="flex items-center gap-3 rounded-sm border border-input bg-secondary p-3">
        <div className="relative h-8 w-10 shrink-0">
          <div className="absolute top-1 left-0 h-6 w-5 -rotate-12 rounded-xs border border-input bg-surface-sunken" />
          <div className="absolute top-1 right-0 h-6 w-5 rotate-12 rounded-xs border border-input bg-surface-sunken" />
          <div className="absolute top-0 left-2.5 h-7 w-5 rounded-xs border border-input bg-card" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-20 rounded-xs bg-muted-foreground" />
          <div className="h-1.5 w-24 max-w-full rounded-xs bg-border" />
        </div>
      </div>
      <div className="flex min-h-20 items-center justify-between gap-3 overflow-hidden rounded-sm border border-input bg-card p-3">
        <div className="space-y-2">
          <div className="h-2 w-24 rounded-xs bg-muted-foreground" />
          <div className="h-1.5 w-20 rounded-xs bg-border" />
          <div className="h-5 w-16 rounded-xs border border-input" />
        </div>
        <div className="relative h-14 w-16 shrink-0">
          <div className="absolute top-1 left-0 h-12 w-8 -rotate-12 rounded-xs border border-input bg-surface-sunken" />
          <div className="absolute top-1 right-0 h-12 w-8 rotate-12 rounded-xs border border-input bg-surface-sunken" />
          <div className="absolute top-0 left-4 h-14 w-8 rounded-xs border border-input bg-secondary" />
        </div>
      </div>
    </div>
  );
}

function ModalPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-48 items-center justify-center overflow-hidden border-b border-border bg-surface-deep p-6 md:min-h-60 md:border-r md:border-b-0"
    >
      <div className="relative w-full max-w-72 rounded-md border border-input bg-card p-4 shadow-md">
        <div className="mb-4 h-2 w-3/5 rounded-xs bg-muted-foreground" />
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
          <div className="space-y-2">
            <div className="space-y-2 rounded-xs border border-input bg-secondary p-2">
              <div className="h-1.5 w-4/5 rounded-xs bg-muted-foreground" />
              <div className="h-1 w-full rounded-xs bg-border" />
              <div className="h-1 w-3/5 rounded-xs bg-border" />
            </div>
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="flex h-4 items-center justify-between px-2"
              >
                <div className="h-1.5 w-3/5 rounded-xs bg-border" />
                <div className="size-1.5 rotate-45 border-t border-r border-input" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-sm border border-border bg-surface-sunken p-3">
            <div className="h-2 w-2/3 rounded-xs bg-border" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-9 rounded-xs border border-input bg-card" />
              <div className="h-9 rounded-xs border border-input bg-secondary" />
            </div>
            <div className="h-1 w-4/5 rounded-xs bg-border" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-4 w-14 rounded-xs bg-muted-foreground" />
          <div className="h-4 w-14 rounded-xs border border-input" />
        </div>
      </div>
    </div>
  );
}

export function ExperimentDirectory() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ExperimentType | "All types">("All types");
  const [growth, setGrowth] = useState<GrowthCategoryId | "all">("all");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingExperiments = experiments.filter((experiment) => {
    const matchesType = type === "All types" || experiment.type === type;
    const matchesGrowth =
      growth === "all" ||
      experiment.growth.primary === growth ||
      experiment.growth.secondary.includes(growth);
    const searchableText = [
      experiment.title,
      experiment.summary,
      experiment.source,
      ...experiment.focus,
      growthCategoryById[experiment.growth.primary].name,
      ...experiment.growth.secondary.map((id) => growthCategoryById[id].name),
      experiment.growth.audience,
      experiment.growth.journey,
      ...experiment.growth.mechanisms,
      experiment.growth.format,
      experiment.growth.measure,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      matchesType && matchesGrowth && searchableText.includes(normalizedQuery)
    );
  });

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14"
    >
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Experiments
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          A working archive of screens, flows, and experiences. References are
          reduced to structure, copy, and interaction so the product idea stays
          clear.
        </p>
        <a
          href="?#growth"
          className="inline-flex min-h-10 items-center gap-2 text-sm underline decoration-input underline-offset-4 hover:decoration-foreground"
        >
          Growth definitions & label guide{" "}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="w-full space-y-2 sm:max-w-md">
          <Label htmlFor="experiment-search">Search experiments</Label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-3 left-3 size-4 text-muted-foreground"
            />
            <Input
              id="experiment-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search experiments or growth labels"
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:w-64">
          <Label htmlFor="experiment-growth">Growth category</Label>
          <select
            id="experiment-growth"
            value={growth}
            onChange={(event) =>
              setGrowth(event.target.value as GrowthCategoryId | "all")
            }
            aria-describedby="growth-filter-help"
            className="h-control-default w-full rounded-md border border-input bg-surface-sunken px-3 text-sm text-foreground"
          >
            <option value="all">All growth categories</option>
            {growthCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <span id="growth-filter-help" className="sr-only">
            Matches primary or secondary growth categories.
          </span>
        </div>
        <div className="space-y-2 sm:w-44">
          <Label htmlFor="experiment-type">Type</Label>
          <select
            id="experiment-type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as ExperimentType | "All types")
            }
            className="h-control-default w-full rounded-md border border-input bg-surface-sunken px-3 text-sm text-foreground"
          >
            <option>All types</option>
            {experimentTypes.map((experimentType) => (
              <option key={experimentType}>{experimentType}</option>
            ))}
          </select>
        </div>
      </div>

      <p role="status" className="mt-5 text-sm text-muted-foreground">
        {matchingExperiments.length} experiment
        {matchingExperiments.length === 1 ? "" : "s"}
        {query.trim() || type !== "All types" || growth !== "all"
          ? " found"
          : ""}
      </p>

      <div className="mt-4 space-y-4">
        {matchingExperiments.map((experiment) => (
          <article
            key={experiment.id}
            aria-labelledby={`${experiment.id}-title`}
            className="overflow-hidden rounded-md border border-border bg-card md:grid md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.6fr)] lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.15fr)]"
          >
            {experiment.id === "notion-feature-modal" ? (
              <ModalPreview />
            ) : (
              <BannerPreview />
            )}
            <div className="flex min-w-0 flex-col items-start p-5 sm:p-6">
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <h2
                  id={`${experiment.id}-title`}
                  className="text-xl font-semibold tracking-tight"
                >
                  {experiment.title}
                </h2>
                <Badge variant="outline">{experiment.status}</Badge>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {experiment.summary}
              </p>
              <dl className="mt-5 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
                <dt className="text-muted-foreground">Type</dt>
                <dd>{experiment.type}</dd>
                <dt className="text-muted-foreground">Focus</dt>
                <dd>{experiment.focus.join(" · ")}</dd>
              </dl>
              <Button asChild variant="outline" className="mt-6">
                <a
                  href={experimentHref(experiment.id)}
                  aria-label={`Open ${experiment.title}`}
                >
                  Open experiment
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="min-w-0 border-t border-border p-5 md:col-span-2 lg:col-span-1 lg:border-t-0 lg:border-l">
              <GrowthNutritionLabel
                name={experiment.title}
                nutrition={experiment.growth}
              />
            </div>
          </article>
        ))}

        {matchingExperiments.length === 0 && (
          <div className="rounded-md border border-border bg-surface-sunken px-5 py-10 text-center">
            <h2 className="text-lg font-medium">No matching experiments</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Try another search or clear the type and growth filters.
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setQuery("");
                setType("All types");
                setGrowth("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-6 text-muted-foreground">
        Each experiment keeps its intent, source, and decisions alongside the
        wireframe, ready to revisit and build on.
      </p>
    </main>
  );
}
