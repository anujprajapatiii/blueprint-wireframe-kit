import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Search,
  X,
  LayoutGrid,
  UserPlus,
  Zap,
  MousePointerClick,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  TrendingUp,
  Share2,
  FileSearch,
  LoaderCircle,
} from "lucide-react";
import {
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from "../components/kit";
import { DesignIntent } from "../components/design-intent";
import { GrowthLegend } from "../components/growth-education";
import {
  growthCategories,
  growthCategoryById,
  type GrowthCategoryId,
} from "../growth/taxonomy";
import { experiments, type Experiment, type ExperimentType } from "./registry";
import { ExperimentPreview } from "./experiment-preview";
import { useLibrarySearch } from "../search/use-library-search";

const types: ExperimentType[] = ["Screen", "Flow", "Experience"];
const goalIcons = {
  acquisition: UserPlus,
  activation: Zap,
  engagement: MousePointerClick,
  retention: ShieldCheck,
  reactivation: RotateCcw,
  monetization: CreditCard,
  expansion: TrendingUp,
  referral: Share2,
};
const goalCounts = Object.fromEntries(
  growthCategories.map(({ id }) => [
    id,
    experiments.filter(
      ({ growth }) => growth.primary === id || growth.secondary.includes(id),
    ).length,
  ]),
) as Record<GrowthCategoryId, number>;

// Explicit editorial vocabulary: nouns such as “Discovery” and “Feature”
// remain ordinary title text. Extend this list when adding a new title verb.
const titleVerbs = new Set([
  "start",
  "discover",
  "choose",
  "upgrade",
  "compare",
  "offer",
  "review",
  "invite",
  "explain",
  "guide",
  "find",
  "suggest",
  "introduce",
  "browse",
  "reuse",
  "build",
  "preview",
  "show",
  "reward",
  "scaffold",
  "prevent",
  "time",
]);
function TitleText({ title }: { title: string }) {
  const space = title.indexOf(" ");
  const opening = space < 0 ? title : title.slice(0, space);
  if (!titleVerbs.has(opening.toLocaleLowerCase())) return title;
  return (
    <>
      <span className="text-growth-highlight">{opening}</span>
      {space < 0 ? "" : title.slice(space)}
    </>
  );
}
const sources = [
  ...new Set(experiments.map((experiment) => experiment.sourceName)),
].sort();
const addedDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
type Filters = {
  query: string;
  goal: GrowthCategoryId | "all";
  type: ExperimentType | "all";
  source: string;
  sort: "recent" | "title" | "relevance";
  search: "keyword" | "meaning";
};
const defaults: Filters = {
  query: "",
  goal: "all",
  type: "all",
  source: "all",
  sort: "recent",
  search: "keyword",
};

function readFilters(): Filters {
  const params = new URLSearchParams(location.search);
  const goal = params.get("goal");
  const type = params.get("type");
  const source = params.get("source");
  const query = (params.get("q") ?? "").slice(0, 300);
  return {
    query,
    goal: growthCategories.some((item) => item.id === goal)
      ? (goal as GrowthCategoryId)
      : "all",
    type: types.includes(type as ExperimentType)
      ? (type as ExperimentType)
      : "all",
    source: source && sources.includes(source) ? source : "all",
    sort:
      params.get("sort") === "title"
        ? "title"
        : params.get("sort") === "relevance" && query.trim()
          ? "relevance"
          : "recent",
    search:
      params.get("search") === "meaning" && query.trim()
        ? "meaning"
        : "keyword",
  };
}

function filterParams(filters: Filters) {
  const params = new URLSearchParams({ view: "experiments" });
  if (filters.query.trim()) params.set("q", filters.query);
  if (filters.goal !== "all") params.set("goal", filters.goal);
  if (filters.type !== "all") params.set("type", filters.type);
  if (filters.source !== "all") params.set("source", filters.source);
  if (
    filters.sort !== "recent" &&
    (filters.sort !== "relevance" || filters.query.trim())
  )
    params.set("sort", filters.sort);
  if (filters.query.trim() && filters.search === "meaning")
    params.set("search", "meaning");
  return params;
}

function experimentLink(experiment: Experiment, filters: Filters) {
  const params = filterParams(filters);
  params.set("experiment", experiment.id);
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
  return (
    <article
      aria-labelledby={`${experiment.id}-title`}
      className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface-sunken text-foreground shadow-sm"
    >
      <a
        href={experimentLink(experiment, filters)}
        aria-label={`Open ${experiment.title} wireframe`}
        className="group block rounded-t-lg focus-visible:outline-offset-[-4px]"
      >
        <div className="experiment-thumbnail border-b border-border bg-surface-deep p-6 sm:p-8">
          <div className="aspect-[12/7]">
            <ExperimentPreview kind={experiment.preview} />
          </div>
        </div>
        <div className="p-5 pb-4 sm:p-6 sm:pb-5">
          <div className="flex items-start justify-between gap-4">
            <h2
              id={`${experiment.id}-title`}
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              <TitleText title={experiment.title} />
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
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full px-3 text-xs">
              {experiment.sourceName}
            </Badge>
            <Badge className="growth-scope rounded-full px-3 text-xs">
              {goal.shortName}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 text-xs whitespace-nowrap"
            >
              <span>
                Added{" "}
                <time dateTime={experiment.addedAt}>
                  {addedDateFormat.format(new Date(experiment.addedAt))}
                </time>
              </span>
            </Badge>
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
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="shrink-0 text-muted-foreground group-open/intent:rotate-180"
            />
          </summary>
          <DesignIntent
            name={experiment.title}
            intent={experiment.growth}
            className="pb-5"
          />
        </details>
      </div>
    </article>
  );
}

export function ExperimentDirectory() {
  const [filters, setFilters] = useState<Filters>(readFilters);
  const searchInput = useRef<HTMLInputElement>(null);
  const semantic = useLibrarySearch(
    filters.query,
    filters.search === "meaning",
  );
  const ideaSearch =
    import.meta.env.DEV &&
    filters.search === "meaning" &&
    Boolean(filters.query.trim());
  const searchUnavailable = ideaSearch && !semantic.loading && !semantic.result;
  const update = (change: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...change }));
  const search = (query = filters.query) => {
    const clean = query.trim().replace(/\s+/g, " ");
    if (!clean) return;
    if (
      filters.search === "meaning" &&
      clean === filters.query.trim().replace(/\s+/g, " ")
    )
      semantic.retry();
    update({
      query: clean,
      search: import.meta.env.DEV ? "meaning" : "keyword",
      sort: "relevance",
    });
  };
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
    const terms = query.split(/\s+/).filter(Boolean);
    const ranked = semantic.result
      ? new Map(semantic.result.matches.map((match) => [match.id, match.score]))
      : null;
    const keywordScores = new Map<string, number>();
    return experiments
      .filter((experiment) => {
        const goal = experiment.growth;
        const searchable = [
          experiment.title,
          experiment.summary,
          experiment.sourceName,
          experiment.source,
          ...experiment.focus,
          experiment.intent,
          ...experiment.observations,
          ...experiment.preservedCopy,
          ...experiment.assumptions,
          growthCategoryById[goal.primary].name,
          ...goal.secondary.map((id) => growthCategoryById[id].name),
          goal.audience,
          goal.journey,
          ...goal.mechanisms,
          goal.format,
          goal.measure,
          goal.basis,
        ]
          .join(" ")
          .toLocaleLowerCase();
        const title = experiment.title.toLocaleLowerCase();
        const source = experiment.sourceName.toLocaleLowerCase();
        const summary = experiment.summary.toLocaleLowerCase();
        keywordScores.set(
          experiment.id,
          (title === query ? 100 : title.includes(query) ? 20 : 0) +
            terms.reduce(
              (score, term) =>
                score +
                (title.includes(term) ? 5 : 0) +
                (source.includes(term) ? 4 : 0) +
                (summary.includes(term) ? 2 : 0),
              0,
            ),
        );
        return (
          (filters.type === "all" || experiment.type === filters.type) &&
          (filters.source === "all" ||
            experiment.sourceName === filters.source) &&
          (filters.goal === "all" ||
            goal.primary === filters.goal ||
            goal.secondary.includes(filters.goal)) &&
          (ranked
            ? ranked.has(experiment.id)
            : terms.every((term) => searchable.includes(term)))
        );
      })
      .sort((a, b) =>
        filters.sort === "title"
          ? a.title.localeCompare(b.title)
          : filters.sort === "relevance"
            ? ((ranked ?? keywordScores).get(b.id) ?? 0) -
                ((ranked ?? keywordScores).get(a.id) ?? 0) ||
              a.title.localeCompare(b.title)
            : b.updatedAt.localeCompare(a.updatedAt),
      );
  }, [filters, semantic.result]);
  const filtered = Boolean(
    filters.query.trim() ||
    filters.type !== "all" ||
    filters.goal !== "all" ||
    filters.source !== "all",
  );
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
          <div className="flex flex-wrap items-center gap-3">
            {import.meta.env.DEV && (
              <Button asChild variant="outline" size="sm">
                <a href={`?${filterParams(filters)}&tool=curator`}>
                  <FileSearch aria-hidden="true" /> Review a reference
                </a>
              </Button>
            )}
            <a
              href="?#growth"
              aria-label="Growth definitions"
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-xs text-muted-foreground hover:text-foreground sm:px-3 sm:text-sm"
            >
              <BookOpen size={16} aria-hidden="true" />
              Definitions
            </a>
          </div>
        </div>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Growth patterns to study, test, and reuse.
        </p>
      </header>

      <form
        role="search"
        aria-label="Jev Search"
        onSubmit={(event) => {
          event.preventDefault();
          search();
        }}
        className="mt-8"
      >
        <Label htmlFor="experiment-search" className="sr-only">
          Jev Search
        </Label>
        <div className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-input bg-surface-sunken p-3 text-foreground shadow-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring sm:flex-nowrap sm:gap-4 sm:p-4">
          <Search
            aria-hidden="true"
            className="ml-1 size-6 shrink-0 text-muted-foreground sm:ml-2 sm:size-7"
          />
          <Input
            id="experiment-search"
            ref={searchInput}
            type="search"
            value={filters.query}
            maxLength={300}
            autoComplete="off"
            aria-describedby="experiment-search-help"
            onChange={(event) =>
              update({
                query: event.target.value,
                search: "keyword",
                ...(event.target.value.trim() ? {} : { sort: "recent" }),
              })
            }
            placeholder={
              import.meta.env.DEV
                ? "Search patterns or ideas"
                : "Search names or goals"
            }
            className="h-12 w-0 flex-1 rounded-none border-0 bg-transparent px-1 text-base shadow-none focus-visible:outline-none sm:h-14 sm:text-xl [&::-webkit-search-cancel-button]:hidden"
          />
          {filters.query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Clear search"
              onClick={() => {
                update({ query: "", search: "keyword", sort: "recent" });
                searchInput.current?.focus();
              }}
              className="shrink-0"
            >
              <X aria-hidden="true" />
            </Button>
          )}
          <Button
            type="submit"
            disabled={!filters.query.trim() || semantic.loading}
            className="h-11 w-full gap-2 px-6 sm:h-12 sm:w-auto"
          >
            {semantic.loading ? (
              <LoaderCircle
                aria-hidden="true"
                className="motion-safe:animate-spin"
              />
            ) : (
              <ArrowRight aria-hidden="true" />
            )}
            {semantic.loading ? "Searching…" : "Jev Search"}
          </Button>
        </div>
        <p
          id="experiment-search-help"
          className="mt-3 text-sm text-muted-foreground"
        >
          {import.meta.env.DEV
            ? "Describe what you want people to do, then press Enter to search by meaning."
            : "Keyword search on this site. Search by meaning with Jev in the local library."}
        </p>
        {import.meta.env.DEV && (
          <div className="mt-1 flex flex-wrap items-center gap-x-1 gap-y-0 text-xs text-muted-foreground">
            <span className="mr-1">Try</span>
            {[
              [
                "Explain an upgrade",
                "Explain a paid upgrade when someone hits a premium feature",
              ],
              [
                "Introduce a feature",
                "Introduce a new feature with benefits and a clear way to try it",
              ],
              [
                "Reward exploration",
                "Reward people for exploring recommendations",
              ],
            ].map(([label, query]) => (
              <button
                key={label}
                type="button"
                disabled={semantic.loading}
                onClick={() => search(query)}
                className="min-h-10 rounded-sm px-2 underline decoration-border underline-offset-4 hover:text-foreground disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </form>

      <div
        role="group"
        aria-label="Filter by growth goal"
        className="mt-7 flex gap-3 overflow-x-auto px-1 pt-1 pb-3 -mx-1"
      >
        {[
          {
            id: "all" as const,
            label: "All goals",
            count: experiments.length,
            Icon: LayoutGrid,
          },
          ...growthCategories
            .filter(({ id }) => goalCounts[id] > 0 || filters.goal === id)
            .map(({ id, shortName }) => ({
              id,
              label: shortName,
              count: goalCounts[id],
              Icon: goalIcons[id],
            })),
        ].map(({ id, label, count, Icon }) => (
          <Button
            key={id}
            variant="outline"
            aria-pressed={filters.goal === id}
            aria-label={`${label}, ${count} ${count === 1 ? "experiment" : "experiments"}`}
            onClick={() => update({ goal: id })}
            className={cn(
              "h-auto min-h-24 min-w-36 flex-1 flex-col gap-3 rounded-md px-4 py-4 lg:min-w-0",
              filters.goal === id
                ? "growth-scope border-input bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:outline-ring-inverse"
                : "border-border bg-surface-sunken hover:border-input",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "!size-6",
                filters.goal !== id && "text-growth-highlight",
              )}
            />
            <span className="flex items-center gap-2">
              {label}
              <span
                className={cn(
                  "text-xs tabular-nums",
                  filters.goal === id
                    ? "text-muted-foreground"
                    : "text-foreground-subtle",
                )}
              >
                {count}
              </span>
            </span>
          </Button>
        ))}
      </div>

      <div
        role="group"
        aria-label="Refine results"
        className="mt-5 grid grid-cols-2 gap-4 sm:max-w-lg"
      >
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="experiment-source">Source</Label>
          <Select
            value={filters.source}
            onValueChange={(source) => update({ source })}
          >
            <SelectTrigger id="experiment-source" className="h-11 min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="experiment-type">Type</Label>
          <Select
            value={filters.type}
            onValueChange={(type) => update({ type: type as Filters["type"] })}
          >
            <SelectTrigger id="experiment-type" className="h-11 min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 mb-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p role="status" className="text-sm text-muted-foreground">
            {semantic.loading ? (
              "Finding relevant patterns…"
            ) : searchUnavailable ? (
              "Idea search unavailable"
            ) : (
              <>
                {results.length}{" "}
                {results.length === 1 ? "wireframe" : "wireframes"}
                {semantic.result
                  ? " matching your idea"
                  : filters.query.trim()
                    ? " matching your keywords"
                    : ""}
              </>
            )}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={() => setFilters(defaults)}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-sm px-2 text-xs hover:bg-secondary"
            >
              <X size={13} aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>
        <GrowthLegend className="sm:ml-auto sm:mr-5" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <label htmlFor="experiment-sort">Sort</label>
          <Select
            value={filters.sort}
            onValueChange={(sort) => update({ sort: sort as Filters["sort"] })}
          >
            <SelectTrigger
              id="experiment-sort"
              className="w-auto border-0 bg-transparent"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filters.query.trim() && (
                <SelectItem value="relevance">Best match</SelectItem>
              )}
              <SelectItem value="recent">Recently updated</SelectItem>
              <SelectItem value="title">Name A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {semantic.loading ? (
        <div
          role="status"
          className="flex min-h-56 items-center justify-center gap-3 rounded-lg border border-border bg-surface-sunken px-5 text-muted-foreground"
        >
          <LoaderCircle
            aria-hidden="true"
            className="size-5 motion-safe:animate-spin"
          />
          <p>Looking for the right patterns…</p>
        </div>
      ) : searchUnavailable ? (
        <section
          role="status"
          className="rounded-lg border border-input bg-surface-sunken px-5 py-14 text-center"
          aria-labelledby="search-unavailable-title"
        >
          <Search
            aria-hidden="true"
            className="mx-auto mb-4 size-6 text-muted-foreground"
          />
          <h2 id="search-unavailable-title" className="text-xl font-semibold">
            {semantic.connection === "unconfigured"
              ? "Connect idea search"
              : "Idea search couldn’t finish"}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            {semantic.connection === "unconfigured"
              ? "Connect TypeSafe to find patterns by meaning. Keyword search is available without it."
              : (semantic.error ??
                "The search service couldn’t connect. Try again to reconnect.")}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {semantic.connection === "unconfigured" ? (
              <Button asChild>
                <a href={`?${filterParams(filters)}&tool=curator`}>
                  Connect TypeSafe
                </a>
              </Button>
            ) : (
              <Button onClick={semantic.retry}>Try again</Button>
            )}
            <Button
              variant="outline"
              onClick={() => update({ search: "keyword" })}
            >
              Search by keyword
            </Button>
          </div>
        </section>
      ) : results.length ? (
        <div className="grid items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-10 lg:gap-y-12">
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
              ? `${semantic.result ? "No results" : "No keyword matches"} for “${filters.query.trim()}”`
              : "Nothing matches these filters"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {import.meta.env.DEV && filters.query.trim() && !semantic.result
              ? "Press Jev Search or Enter to find patterns by meaning, including related words and ideas."
              : "Try a different search or clear the filters to browse everything."}
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => setFilters(defaults)}
          >
            Show everything
          </Button>
        </section>
      )}
    </main>
  );
}
