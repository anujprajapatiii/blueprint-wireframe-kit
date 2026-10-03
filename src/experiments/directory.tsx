import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Film,
  Search,
  X,
} from "lucide-react";
import { Button, Input, Label } from "../components/kit";
import { DesignIntent } from "../components/design-intent";
import {
  growthCategories,
  growthCategoryById,
  type GrowthCategoryId,
} from "../growth/taxonomy";
import { experiments, type Experiment, type ExperimentType } from "./registry";
import { ExperimentPreview } from "./experiment-preview";
import { experimentReferences } from "./reference-manifest";

const types: ExperimentType[] = ["Screen", "Flow", "Experience"];
type Filters = {
  query: string;
  goal: GrowthCategoryId | "all";
  type: ExperimentType | "all";
  sort: "recent" | "title";
};
const defaults: Filters = {
  query: "",
  goal: "all",
  type: "all",
  sort: "recent",
};

function readFilters(): Filters {
  const params = new URLSearchParams(location.search);
  const goal = params.get("goal");
  const type = params.get("type");
  return {
    query: params.get("q") ?? "",
    goal: growthCategories.some((item) => item.id === goal)
      ? (goal as GrowthCategoryId)
      : "all",
    type: types.includes(type as ExperimentType)
      ? (type as ExperimentType)
      : "all",
    sort: params.get("sort") === "title" ? "title" : "recent",
  };
}

function filterParams(filters: Filters) {
  const params = new URLSearchParams({ view: "experiments" });
  if (filters.query.trim()) params.set("q", filters.query);
  if (filters.goal !== "all") params.set("goal", filters.goal);
  if (filters.type !== "all") params.set("type", filters.type);
  if (filters.sort !== "recent") params.set("sort", filters.sort);
  return params;
}

function experimentLink(
  experiment: Experiment,
  filters: Filters,
  reference = false,
) {
  const params = filterParams(filters);
  params.set("experiment", experiment.id);
  if (reference) params.set("mode", "reference");
  return `?${params}`;
}

function ExperimentCard({
  experiment,
  filters,
}: {
  experiment: Experiment;
  filters: Filters;
}) {
  const goal = growthCategoryById[experiment.growth.primary];
  const references = experimentReferences[experiment.id] ?? [];
  return (
    <article
      aria-labelledby={`${experiment.id}-title`}
      className="min-w-0 overflow-hidden rounded-lg border border-border bg-card"
    >
      <a
        href={experimentLink(experiment, filters)}
        aria-label={`Open ${experiment.title} wireframe`}
        className="group block rounded-t-lg focus-visible:outline-offset-[-4px]"
      >
        <div className="aspect-[12/7] overflow-hidden border-b border-border bg-surface-deep transition-colors duration-[var(--motion-fast)] group-hover:bg-surface-sunken motion-reduce:transition-none">
          <ExperimentPreview kind={experiment.preview} />
        </div>
        <div className="p-5 pb-4 sm:p-6 sm:pb-5">
          <div className="flex items-start justify-between gap-4">
            <h2
              id={`${experiment.id}-title`}
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {experiment.title}
            </h2>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            />
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {experiment.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {experiment.sourceName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{experiment.type}</span>
            <span aria-hidden="true">·</span>
            <span>{experiment.status}</span>
          </div>
        </div>
      </a>
      <div className="mx-5 border-t border-border sm:mx-6">
        <details className="group/intent">
          <summary className="flex min-h-14 list-none items-center justify-between gap-3 rounded-sm py-3 text-sm [&::-webkit-details-marker]:hidden">
            <span className="font-medium">
              Design intent
              <span className="sr-only"> for {experiment.title}</span>
            </span>
            <span className="flex items-center gap-3 text-muted-foreground">
              <span>{goal.shortName}</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="shrink-0 group-open/intent:rotate-180"
              />
            </span>
          </summary>
          <DesignIntent
            name={experiment.title}
            intent={experiment.growth}
            className="pb-5"
          />
        </details>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-2.5 sm:px-6">
        <a
          href={experimentLink(experiment, filters, true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm hover:underline hover:underline-offset-4"
          aria-label={`View original reference for ${experiment.title}`}
        >
          <Film size={16} aria-hidden="true" />
          Original reference
        </a>
        <span className="text-xs text-muted-foreground">
          {references.length
            ? `${references.length} ${references.length === 1 ? "recording" : "references"}`
            : "Not added"}
        </span>
      </div>
    </article>
  );
}

export function ExperimentDirectory() {
  const [filters, setFilters] = useState<Filters>(readFilters);
  const update = (change: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...change }));
  useEffect(() => {
    const params = filterParams(filters);
    if (new URLSearchParams(location.search).has("audit"))
      params.set("audit", "1");
    history.replaceState(history.state, "", `?${params}`);
  }, [filters]);
  useEffect(() => {
    const restore = () => setFilters(readFilters());
    addEventListener("popstate", restore);
    return () => removeEventListener("popstate", restore);
  }, []);

  const results = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase();
    return experiments
      .filter((experiment) => {
        const goal = experiment.growth;
        const searchable = [
          experiment.title,
          experiment.summary,
          experiment.sourceName,
          experiment.source,
          ...experiment.focus,
          growthCategoryById[goal.primary].name,
          ...goal.secondary.map((id) => growthCategoryById[id].name),
          goal.audience,
          goal.journey,
          ...goal.mechanisms,
          goal.format,
          goal.measure,
        ]
          .join(" ")
          .toLocaleLowerCase();
        return (
          (filters.type === "all" || experiment.type === filters.type) &&
          (filters.goal === "all" ||
            goal.primary === filters.goal ||
            goal.secondary.includes(filters.goal)) &&
          searchable.includes(query)
        );
      })
      .sort((a, b) =>
        filters.sort === "title"
          ? a.title.localeCompare(b.title)
          : b.updatedAt.localeCompare(a.updatedAt),
      );
  }, [filters]);
  const filtered = Boolean(
    filters.query.trim() || filters.type !== "all" || filters.goal !== "all",
  );
  const selectClass =
    "h-11 w-full min-w-0 rounded-md border border-input bg-surface-sunken px-3 text-sm text-foreground";

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10"
    >
      <header>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Experiments
          </h1>
          <a
            href="?#growth"
            aria-label="Growth definitions"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-xs text-muted-foreground hover:text-foreground sm:px-3 sm:text-sm"
          >
            <BookOpen size={16} aria-hidden="true" />
            Definitions
          </a>
        </div>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Product experiences to study, test, and reuse.
        </p>
      </header>

      <form
        role="search"
        aria-label="Find experiments"
        onSubmit={(event) => event.preventDefault()}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-[minmax(180px,1fr)_minmax(160px,.6fr)_minmax(112px,.35fr)]"
      >
        <div className="col-span-2 flex min-w-0 flex-col gap-2 sm:col-span-1">
          <Label htmlFor="experiment-search">Search</Label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-3.5 left-3 size-4 text-muted-foreground"
            />
            <Input
              id="experiment-search"
              type="search"
              value={filters.query}
              onChange={(event) => update({ query: event.target.value })}
              placeholder="Search by name, source, or idea"
              className="h-11 pl-9"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="experiment-goal">Goal</Label>
          <select
            id="experiment-goal"
            value={filters.goal}
            onChange={(event) =>
              update({ goal: event.target.value as Filters["goal"] })
            }
            className={selectClass}
          >
            <option value="all">All goals</option>
            {growthCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.shortName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="experiment-type">Type</Label>
          <select
            id="experiment-type"
            value={filters.type}
            onChange={(event) =>
              update({ type: event.target.value as Filters["type"] })
            }
            className={selectClass}
          >
            <option value="all">All types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="mt-4 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p role="status" className="text-sm text-muted-foreground">
            {filtered
              ? `${results.length} of ${experiments.length} experiments`
              : `${experiments.length} experiments`}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={() => setFilters({ ...defaults, sort: filters.sort })}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-sm px-2 text-xs hover:bg-secondary"
            >
              <X size={13} aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <label htmlFor="experiment-sort">Sort</label>
          <select
            id="experiment-sort"
            value={filters.sort}
            onChange={(event) =>
              update({ sort: event.target.value as Filters["sort"] })
            }
            className="min-h-10 rounded-sm border-0 bg-transparent pr-1 pl-2 text-sm text-foreground"
          >
            <option value="recent">Recently updated</option>
            <option value="title">Name A–Z</option>
          </select>
        </div>
      </div>

      {results.length ? (
        <div className="grid items-start gap-6 md:grid-cols-2">
          {results.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              filters={filters}
            />
          ))}
        </div>
      ) : (
        <section
          className="rounded-lg border border-dashed border-input bg-surface-sunken px-5 py-14 text-center"
          aria-labelledby="no-results-title"
        >
          <Search
            size={24}
            aria-hidden="true"
            className="mx-auto mb-4 text-muted-foreground"
          />
          <h2 id="no-results-title" className="text-xl font-semibold">
            {filters.query.trim()
              ? `No experiments for “${filters.query.trim()}”`
              : "No experiments match these filters"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Try a different search or clear the filters to browse everything.
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => setFilters(defaults)}
          >
            Show all experiments
          </Button>
        </section>
      )}
    </main>
  );
}
