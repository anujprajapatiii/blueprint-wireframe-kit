/** Opt-in live relevance checks. Uses only the public catalog and local server credentials. */
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { loadEnv } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const value = (flag) => {
  const index = args.indexOf(flag);
  return index < 0 ? undefined : args[index + 1];
};
const bundle = await build({
  stdin: {
    contents:
      'import { experiments } from "./src/experiments/registry.ts"; import { buildSearchCatalog } from "./src/search/catalog.ts"; export const catalog = buildSearchCatalog(experiments); export { evaluateSearch } from "./scripts/search-core.ts"; export { SEARCH_DEFAULT_MODEL } from "./src/search/version.ts";',
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
});
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
const catalog = value("--catalog")
  ? JSON.parse(await readFile(value("--catalog"), "utf8"))
  : runtime.catalog;
const environment = loadEnv("development", root, "TYPESAFE_");
const key = environment.TYPESAFE_API_KEY?.trim();
assert.ok(key, "Configure local TypeSafe access before running live checks.");
const model =
  environment.TYPESAFE_MODEL?.trim() || runtime.SEARCH_DEFAULT_MODEL;
const fixtures = JSON.parse(
  await readFile(
    value("--fixtures") ||
      new URL("./search-quality.fixtures.json", import.meta.url),
    "utf8",
  ),
);
assert.ok(
  Array.isArray(fixtures) && fixtures.length > 0 && fixtures.length <= 10,
  "Run at most ten deliberate live checks.",
);
for (const fixture of fixtures) {
  assert.ok(
    typeof fixture.query === "string" && fixture.query.trim(),
    "Each check needs a query.",
  );
  for (const field of ["include", "exclude"]) {
    assert.ok(
      fixture[field] === undefined || Array.isArray(fixture[field]),
      `${field} must be a list of experiment IDs.`,
    );
    for (const id of fixture[field] || [])
      assert.ok(
        catalog.some((entry) => entry.id === id),
        `Unknown fixture ID: ${id}`,
      );
  }
}
const report = {
  requestedModel: model,
  catalogSize: catalog.length,
  cases: [],
};
for (const fixture of fixtures) {
  let scores = [];
  const started = Date.now();
  const inspectFetch = async (...arguments_) => {
    const response = await fetch(...arguments_);
    if (response.ok) {
      const body = await response.clone().json();
      scores = catalog.map((entry, index) => {
        const score = body.answers?.[`match_${index}`]?.noul;
        return {
          id: entry.id,
          score:
            typeof score === "number" && Number.isFinite(score) ? score : null,
        };
      });
    }
    return response;
  };
  try {
    const result = await runtime.evaluateSearch(
      fixture.query,
      catalog,
      key,
      model,
      inspectFetch,
    );
    const ids = result.matches.map(({ id }) => id);
    const missing = (fixture.include || []).filter((id) => !ids.includes(id));
    const unwanted = fixture.none
      ? ids
      : (fixture.exclude || []).filter((id) => ids.includes(id));
    const row = {
      query: fixture.query,
      model: result.model,
      elapsedMs: Date.now() - started,
      usage: result.usage,
      matches: result.matches,
      missing,
      unwanted,
      passed: missing.length === 0 && unwanted.length === 0,
      scores,
    };
    report.cases.push(row);
    console.log(
      JSON.stringify({
        ...row,
        scores: scores.filter(
          ({ id, score }) => score >= 0.2 || fixture.include?.includes(id),
        ),
      }),
    );
  } catch (error) {
    // No upstream bodies, environment values, or credentials enter a report.
    report.cases.push({
      query: fixture.query,
      passed: false,
      error: error?.code || "evaluation_failed",
    });
    console.error(JSON.stringify(report.cases.at(-1)));
  }
}
if (value("--report"))
  await writeFile(value("--report"), `${JSON.stringify(report, null, 2)}\n`);
if (report.cases.some(({ passed }) => !passed)) process.exitCode = 1;
