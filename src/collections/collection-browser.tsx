import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  Search,
  X,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/kit";
import { DesignIntent } from "../components/design-intent";
import {
  ReferenceImageDialog,
  ReferencePreview,
  ReferenceViewer,
} from "../components/reference-viewer";
import {
  growthCategories,
  growthCategoryById,
  type GrowthCategoryId,
} from "../growth/taxonomy";
import type {
  CollectionEvidence,
  CollectionPattern,
  PatternCollection,
} from "./types";

import { matchesPattern } from "./search";

type Section = "patterns" | "references" | "coverage";
type Filters = {
  query: string;
  goal: GrowthCategoryId | "all";
  flow: string;
  sort: "recent" | "title";
};
const defaults: Filters = {
  query: "",
  goal: "all",
  flow: "all",
  sort: "recent",
};
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function readFilters(): Filters {
  const params = new URLSearchParams(location.search);
  const goal = params.get("goal");
  return {
    query: params.get("q") ?? "",
    goal: growthCategories.some((item) => item.id === goal)
      ? (goal as GrowthCategoryId)
      : "all",
    flow: params.get("flow") ?? "all",
    sort: params.get("sort") === "title" ? "title" : "recent",
  };
}

function readSection(): Section {
  const section = new URLSearchParams(location.search).get("section");
  return section === "references" || section === "coverage"
    ? section
    : "patterns";
}

function collectionParams(id: string, filters: Filters) {
  const params = new URLSearchParams({ view: "experiments", collection: id });
  if (filters.query.trim()) params.set("q", filters.query);
  if (filters.goal !== "all") params.set("goal", filters.goal);
  if (filters.flow !== "all") params.set("flow", filters.flow);
  if (filters.sort !== "recent") params.set("sort", filters.sort);
  const directoryType = new URLSearchParams(location.search).get("type");
  if (directoryType) params.set("type", directoryType);
  if (new URLSearchParams(location.search).has("audit"))
    params.set("audit", "1");
  return params;
}

function directoryHref(filters: Filters) {
  const params = new URLSearchParams({ view: "experiments" });
  if (filters.query.trim()) params.set("q", filters.query);
  if (filters.goal !== "all") params.set("goal", filters.goal);
  if (filters.sort !== "recent") params.set("sort", filters.sort);
  const directoryType = new URLSearchParams(location.search).get("type");
  if (directoryType) params.set("type", directoryType);
  return `?${params}`;
}

function patternHref(
  pattern: CollectionPattern,
  filters: Filters,
  section: Section = "patterns",
) {
  const params = collectionParams(pattern.collectionId, filters);
  params.set("pattern", pattern.id);
  if (section !== "patterns") params.set("section", section);
  return `?${params}`;
}

function PatternBadges({ pattern }: { pattern: CollectionPattern }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline" className="rounded-full px-3 text-xs">
        {pattern.sourceName}
      </Badge>
      <Badge variant="outline" className="rounded-full px-3 text-xs">
        {growthCategoryById[pattern.growth.primary].shortName}
      </Badge>
      <Badge variant="outline" className="rounded-full px-3 text-xs">
        <span>
          Added{" "}
          <time dateTime={pattern.addedAt}>
            {dateFormat.format(new Date(pattern.addedAt))}
          </time>
        </span>
      </Badge>
    </div>
  );
}

function IntentDisclosure({ pattern }: { pattern: CollectionPattern }) {
  return (
    <details className="group/intent">
      <summary className="flex min-h-14 list-none items-center justify-between gap-3 rounded-sm py-3 text-sm [&::-webkit-details-marker]:hidden">
        <span className="font-medium">
          Design intent<span className="sr-only"> for {pattern.title}</span>
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="shrink-0 text-muted-foreground group-open/intent:rotate-180"
        />
      </summary>
      <DesignIntent
        name={pattern.title}
        intent={pattern.growth}
        className="pb-5"
      />
    </details>
  );
}

function PatternCard({
  pattern,
  asset,
  filters,
}: {
  pattern: CollectionPattern;
  asset?: CollectionEvidence;
  filters: Filters;
}) {
  return (
    <article
      aria-labelledby={`${pattern.id}-title`}
      className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface-raised shadow-sm"
    >
      <a
        href={patternHref(pattern, filters)}
        className="group block rounded-t-lg focus-visible:outline-offset-[-4px]"
      >
        {asset && (
          <div className="aspect-[12/7] overflow-hidden border-b border-border bg-surface-deep p-3 sm:p-4">
            <ReferencePreview asset={asset} />
          </div>
        )}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2
              id={`${pattern.id}-title`}
              className="text-xl font-semibold tracking-tight"
            >
              {pattern.title}
            </h2>
            <ArrowRight
              className="mt-1 size-5 shrink-0 text-muted-foreground group-hover:text-foreground"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {pattern.summary}
          </p>
          <div className="mt-4">
            <PatternBadges pattern={pattern} />
          </div>
        </div>
      </a>
      <div className="mx-5 border-t border-border sm:mx-6">
        <IntentDisclosure pattern={pattern} />
      </div>
    </article>
  );
}

function PatternDetail({
  collection,
  pattern,
  results,
  filters,
}: {
  collection: PatternCollection;
  pattern: CollectionPattern;
  results: CollectionPattern[];
  filters: Filters;
}) {
  const assets = pattern.evidenceIds
    .map((id) => collection.assets.find((asset) => asset.id === id))
    .filter((asset): asset is CollectionEvidence => Boolean(asset));
  const [assetId, setAssetId] = useState(
    () =>
      new URLSearchParams(location.search).get("reference") ??
      assets[0]?.id ??
      "",
  );
  const asset = assets.find((item) => item.id === assetId) ?? assets[0];
  const index = results.findIndex((item) => item.id === pattern.id);
  const previous = index > 0 ? results[index - 1] : undefined;
  const next = index >= 0 ? results[index + 1] : undefined;
  const backParams = collectionParams(collection.id, filters);
  const origin = readSection();
  if (origin !== "patterns") backParams.set("section", origin);
  const back = `?${backParams}`;
  function changeAsset(value: string) {
    setAssetId(value);
    const url = new URL(location.href);
    url.searchParams.set("reference", value);
    history.replaceState(history.state, "", url);
  }
  return (
    <>
      <a
        href={back}
        className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {collection.sourceName}{" "}
        {origin === "references" ? "references" : "patterns"}
      </a>
      <header className="mt-4 max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {pattern.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
          {pattern.summary}
        </p>
        <div className="mt-5">
          <PatternBadges pattern={pattern} />
        </div>
      </header>
      <div className="mt-8 grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section aria-label="Original references" className="min-w-0">
          <div className="mb-4 flex min-h-10 flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Original reference</h2>
            {assets.length > 1 && (
              <div className="w-full min-w-0 sm:max-w-80">
                <Select value={asset?.id} onValueChange={changeAsset}>
                  <SelectTrigger aria-label="Choose original reference">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((item, assetIndex) => (
                      <SelectItem key={item.id} value={item.id}>
                        {assetIndex + 1}. {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {asset ? (
            <ReferenceViewer key={asset.id} asset={asset} />
          ) : (
            <p className="rounded-lg border border-border bg-surface-raised p-6 text-sm text-muted-foreground">
              No original reference is attached to this pattern.
            </p>
          )}
          {assets.length > 1 && (
            <p className="mt-3 text-sm text-muted-foreground">
              {assets.length} captured states in this sequence. Use the
              reference menu to view each one.
            </p>
          )}
        </section>
        <section aria-labelledby="study-notes-heading" className="min-w-0">
          <h2
            id="study-notes-heading"
            className="mb-4 flex min-h-10 items-center text-lg font-semibold"
          >
            Study notes
          </h2>
          <dl className="space-y-5 rounded-lg border border-border bg-surface-raised p-5 sm:p-6">
            {[
              ["Flow", pattern.flow],
              ["Trigger", pattern.trigger],
              ["Observed behavior", pattern.observed],
              ["Next step", pattern.nextState],
              ["Observation limits", pattern.limit],
            ].map(([label, text]) => (
              <div key={label}>
                <dt className="text-sm font-medium">{label}</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                  {text}
                </dd>
              </div>
            ))}
          </dl>
          {pattern.sourceUrl && (
            <Button asChild variant="outline" className="mt-4">
              <a href={pattern.sourceUrl} target="_blank" rel="noreferrer">
                Visit source <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
          {Boolean(pattern.relatedUrls?.length) && (
            <details className="mt-4 rounded-md border border-border bg-surface-raised px-4">
              <summary className="min-h-12 py-3 text-sm font-medium">
                Related source pages
              </summary>
              <ul className="space-y-3 pb-4">
                {pattern.relatedUrls?.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-sm leading-6 underline decoration-input underline-offset-4 hover:decoration-foreground"
                    >
                      {url}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </section>
      </div>
      <section
        aria-label="Pattern design intent"
        className="mt-6 rounded-lg border border-border bg-surface-raised px-5 sm:px-6"
      >
        <IntentDisclosure pattern={pattern} />
      </section>
      {pattern.copy.length > 0 && (
        <details className="group/copy mt-4 rounded-lg border border-border bg-surface-raised px-5 sm:px-6">
          <summary className="flex min-h-14 list-none items-center justify-between gap-3 rounded-sm py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            Original writing
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground group-open/copy:rotate-180"
            />
          </summary>
          <ul className="space-y-3 pb-6">
            {pattern.copy.map((copy, copyIndex) => (
              <li
                key={copyIndex}
                className="border-l-2 border-border-strong pl-4 text-sm leading-6"
              >
                {copy}
              </li>
            ))}
          </ul>
        </details>
      )}
      {(previous || next) && (
        <nav
          aria-label="Browse patterns"
          className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <a
              href={patternHref(previous, filters, origin)}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface-raised p-4 hover:bg-secondary"
            >
              <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">
                  Previous pattern
                </span>
                <span className="mt-1 block text-sm font-medium">
                  {previous.title}
                </span>
              </span>
            </a>
          ) : (
            <div />
          )}
          {next && (
            <a
              href={patternHref(next, filters, origin)}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-raised p-4 hover:bg-secondary"
            >
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">
                  Next pattern
                </span>
                <span className="mt-1 block text-sm font-medium">
                  {next.title}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
          )}
        </nav>
      )}
    </>
  );
}

export function CollectionBrowser({
  collection,
}: {
  collection: PatternCollection;
}) {
  const [filters, setFilters] = useState<Filters>(readFilters);
  const [section, setSection] = useState<Section>(readSection);
  const patternId = new URLSearchParams(location.search).get("pattern");
  const flows = useMemo(
    () =>
      [
        ...new Set(collection.patterns.map((pattern) => pattern.flowGroup)),
      ].sort((a, b) => a.localeCompare(b)),
    [collection],
  );
  const update = (change: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...change }));
  useEffect(() => {
    if (patternId) return;
    const params = collectionParams(collection.id, filters);
    if (section !== "patterns") params.set("section", section);
    history.replaceState(history.state, "", `?${params}`);
  }, [collection.id, filters, section, patternId]);
  useEffect(() => {
    const restore = () => {
      setFilters(readFilters());
      setSection(readSection());
    };
    addEventListener("popstate", restore);
    return () => removeEventListener("popstate", restore);
  }, []);
  const results = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase();
    return collection.patterns
      .filter(
        (pattern) =>
          matchesPattern(pattern, query, filters.goal) &&
          (filters.flow === "all" || pattern.flowGroup === filters.flow),
      )
      .sort((a, b) =>
        filters.sort === "title"
          ? a.title.localeCompare(b.title)
          : b.addedAt.localeCompare(a.addedAt),
      );
  }, [collection, filters]);
  const pattern = collection.patterns.find((item) => item.id === patternId);
  const filtered = Boolean(
    filters.query.trim() || filters.goal !== "all" || filters.flow !== "all",
  );
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10"
    >
      {pattern ? (
        <PatternDetail
          collection={collection}
          pattern={pattern}
          results={results}
          filters={filters}
        />
      ) : patternId ? (
        <div className="py-16 text-center">
          <h1 className="text-2xl font-semibold">Pattern not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This link doesn’t match a pattern in the collection.
          </p>
          <Button asChild className="mt-6">
            <a href={`?${collectionParams(collection.id, filters)}`}>
              Browse {collection.sourceName} patterns
            </a>
          </Button>
        </div>
      ) : (
        <>
          <a
            href={directoryHref(filters)}
            className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All experiments
          </a>
          <header className="mt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {collection.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {collection.patterns.length} patterns,{" "}
                {collection.assets.length} references
              </p>
            </div>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
              {collection.description}
            </p>
          </header>
          <Tabs
            value={section}
            onValueChange={(value) => setSection(value as Section)}
            activationMode="manual"
            className="mt-7"
          >
            <TabsList aria-label="Collection view" className="w-full sm:w-auto">
              <TabsTrigger value="patterns" className="flex-1 px-2 sm:px-3">
                Patterns
              </TabsTrigger>
              <TabsTrigger value="references" className="flex-1 px-2 sm:px-3">
                References
              </TabsTrigger>
              <TabsTrigger value="coverage" className="flex-1 px-2 sm:px-3">
                Coverage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patterns" className="mt-6">
              <div
                role="search"
                aria-label="Find a pattern"
                className="grid min-w-0 gap-4 rounded-lg border border-border bg-surface-raised p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] sm:p-5"
              >
                <div className="min-w-0">
                  <Label htmlFor="collection-query">Search</Label>
                  <div className="relative mt-2">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="collection-query"
                      value={filters.query}
                      onChange={(event) =>
                        update({ query: event.target.value })
                      }
                      placeholder="Find a pattern or interaction"
                      className="pl-9 pr-10"
                    />
                    {filters.query && (
                      <button
                        type="button"
                        onClick={() => update({ query: "" })}
                        className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:bg-secondary"
                        aria-label="Clear search"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="min-w-0">
                  <Label htmlFor="collection-goal">Goal</Label>
                  <Select
                    value={filters.goal}
                    onValueChange={(value) =>
                      update({ goal: value as Filters["goal"] })
                    }
                  >
                    <SelectTrigger id="collection-goal" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All goals</SelectItem>
                      {growthCategories.map((goal) => (
                        <SelectItem key={goal.id} value={goal.id}>
                          {goal.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-w-0">
                  <Label htmlFor="collection-flow">Flow</Label>
                  <Select
                    value={filters.flow}
                    onValueChange={(value) => update({ flow: value })}
                  >
                    <SelectTrigger id="collection-flow" className="mt-2">
                      <SelectValue placeholder="All flows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All flows</SelectItem>
                      {flows.map((flow) => (
                        <SelectItem key={flow} value={flow}>
                          {flow}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-w-0">
                  <Label htmlFor="collection-sort">Sort</Label>
                  <Select
                    value={filters.sort}
                    onValueChange={(value) =>
                      update({ sort: value as Filters["sort"] })
                    }
                  >
                    <SelectTrigger id="collection-sort" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently added</SelectItem>
                      <SelectItem value="title">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="my-5 flex min-h-9 items-center justify-between gap-3">
                <p role="status" className="text-sm text-muted-foreground">
                  {results.length}{" "}
                  {results.length === 1 ? "pattern" : "patterns"}
                  {filtered && ` of ${collection.patterns.length}`}
                </p>
                {filtered && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters(defaults)}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
              {results.length ? (
                <div className="grid items-start gap-6 md:grid-cols-2">
                  {results.map((item) => (
                    <PatternCard
                      key={item.id}
                      pattern={item}
                      asset={collection.assets.find(
                        (asset) => asset.id === item.evidenceIds[0],
                      )}
                      filters={filters}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-surface-raised px-6 py-16 text-center">
                  <h2 className="text-xl font-semibold">
                    No matching patterns
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Try a different search, goal, or flow.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5"
                    onClick={() => setFilters(defaults)}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="references" className="mt-6">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                  Original captures from the walkthrough. Open a reference to
                  inspect it at full size, or follow a linked pattern for its
                  context.
                </p>
                {import.meta.env.DEV && collection.downloadSrc && (
                  <Button asChild variant="outline">
                    <a
                      href={`${import.meta.env.BASE_URL}${collection.downloadSrc}`}
                      download
                    >
                      <Download aria-hidden="true" />
                      Download collection
                    </a>
                  </Button>
                )}
              </div>
              <div className="grid items-start gap-6 md:grid-cols-2">
                {collection.assets.map((asset) => {
                  const related = collection.patterns.filter((item) =>
                    item.evidenceIds.includes(asset.id),
                  );
                  return (
                    <article
                      key={asset.id}
                      className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface-raised shadow-sm"
                    >
                      <ReferenceImageDialog asset={asset}>
                        <button
                          type="button"
                          className="block aspect-[12/7] w-full border-b border-border bg-surface-deep p-3 focus-visible:outline-offset-[-4px] sm:p-4"
                          aria-label={`View ${asset.title}`}
                        >
                          <ReferencePreview asset={asset} />
                        </button>
                      </ReferenceImageDialog>
                      <div className="p-5">
                        <h2 className="text-lg font-semibold">{asset.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {asset.alt}
                        </p>
                        {related.length > 0 && (
                          <ul className="mt-4 space-y-2 border-t border-border pt-4">
                            {related.map((item) => (
                              <li key={item.id}>
                                <a
                                  href={patternHref(
                                    item,
                                    filters,
                                    "references",
                                  )}
                                  className="flex items-center justify-between gap-3 rounded-sm py-1 text-sm font-medium hover:underline hover:underline-offset-4"
                                >
                                  {item.title}
                                  <ArrowRight
                                    className="size-4 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="coverage" className="mt-6">
              <div className="mb-6 max-w-3xl">
                <h2 className="text-xl font-semibold">
                  What the walkthrough covers
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  These are observations from an existing signed-in account.
                  Each flow records where inspection stopped. Visible prompts
                  suggest a design intention; they don’t establish measured
                  impact.
                </p>
              </div>
              <div className="space-y-4">
                {collection.coverage.map((item, index) => (
                  <article
                    key={`${item.flow}-${index}`}
                    className="rounded-lg border border-border bg-surface-raised p-5 sm:p-6"
                  >
                    <h3 className="text-lg font-semibold">{item.flow}</h3>
                    <dl className="mt-4 grid gap-5 md:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium">Observed</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.observed}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium">
                          Where inspection stopped
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.stoppingPoint}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </main>
  );
}
