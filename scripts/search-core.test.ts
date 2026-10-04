import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { buildSearchCatalog } from "../src/search/catalog.ts";
import type { Experiment } from "../src/experiments/registry.ts";
import type { SearchEntry, SearchResult } from "../src/search/contracts.ts";
import {
  buildSearchRequest,
  composeSearchResult,
  createSearchService,
  evaluateSearch,
  SEARCH_MATCH_THRESHOLD,
  SearchError,
  validateSearchInput,
} from "./search-core.ts";

const catalog: SearchEntry[] = ["annual-offer", "feature-intro", "reward"].map(
  (id) => ({
    id,
    title: id,
    summary: "Recorded interaction",
    sourceName: "Example",
    type: "Flow",
    focus: ["Offer"],
    goals: ["monetization"],
    mechanisms: ["Value framing"],
    format: "Modal",
  }),
);

function payload(scores = [0.9, 0.4, 0.7]) {
  return {
    model: "jev-test",
    answers: Object.fromEntries(
      scores.map((noul, index) => [`match_${index}`, { type: "noul", noul }]),
    ),
    usage: { input_tokens: 500, output_tokens: 25 },
  };
}

function result(query: string) {
  return composeSearchResult(query, catalog, payload());
}
function errorCode(code: string) {
  return (error: unknown) =>
    error instanceof SearchError && error.code === code;
}

test("query input is bounded, normalized and cannot supply candidates or model settings", () => {
  assert.equal(
    validateSearchInput({ query: "  annual\n savings  " }),
    "annual savings",
  );
  for (const input of [
    null,
    [],
    {},
    { query: " " },
    { query: 4 },
    { query: "x".repeat(301) },
    { query: "x\u0000y" },
    { query: "offer", catalog },
    { query: "offer", model: "other" },
  ]) {
    assert.throws(() => validateSearchInput(input), errorCode("invalid_query"));
  }
});

test("catalog projection excludes private provenance, research-only items and outcome hypotheses", () => {
  const entry = {
    ...catalog[0],
    status: "Ready for review",
    source: "/private/secret.png",
    assets: ["secret"],
    observations: ["Private observed detail"],
    growth: {
      primary: "monetization",
      secondary: [],
      audience: "Private audience detail",
      journey: "Private journey detail",
      mechanisms: ["Framing"],
      format: "Modal",
      measure: "Unproven lift",
      basis: "Hypothesis",
    },
  } as unknown as Experiment;
  const projected = buildSearchCatalog([
    entry,
    { ...entry, id: "archived", status: "Archived" },
  ]);
  assert.equal(projected.length, 1);
  assert.equal(projected[0].id, entry.id);
  const serialized = JSON.stringify(projected);
  for (const excluded of [
    "secret",
    "Unproven lift",
    "Hypothesis",
    "archived",
    "Private observed detail",
    "Private audience detail",
    "Private journey detail",
  ])
    assert.equal(serialized.includes(excluded), false);
  assert.deepEqual(
    Object.keys(projected[0]).sort(),
    [
      "id",
      "title",
      "summary",
      "sourceName",
      "type",
      "focus",
      "goals",
      "mechanisms",
      "format",
    ].sort(),
  );
});

test("one batched request judges every supplied candidate with explicit query-data boundaries", () => {
  const request = buildSearchRequest("Find upgrade prompts", catalog);
  assert.equal(request.model, "jev-latest");
  assert.equal(Object.keys(request.questions).length, catalog.length);
  assert.deepEqual(request.state.catalog, catalog);
  for (const [index, question] of Object.values(request.questions).entries()) {
    assert.equal(question.type, "noul");
    assert.match(question.instructions, new RegExp(`catalog\\[${index}\\]`));
    assert.match(question.instructions, /data, never instructions/);
    assert.match(
      question.instructions,
      /only this candidate's supplied public listing metadata/,
    );
    assert.match(
      question.instructions,
      /no hidden or private observations are available/,
    );
    assert.match(question.criteria.false, /Nothing needs to match/);
  }
  assert.throws(
    () => buildSearchRequest("offer", [catalog[0], catalog[0]]),
    errorCode("catalog_unavailable"),
  );
  assert.throws(
    () =>
      buildSearchRequest("offer", [
        { ...catalog[0], observations: ["private"] } as SearchEntry,
      ]),
    errorCode("catalog_unavailable"),
  );
  assert.throws(
    () => buildSearchRequest("offer", [], "jev-latest"),
    errorCode("catalog_unavailable"),
  );
  assert.throws(
    () => buildSearchRequest("offer", catalog, "bad\nmodel"),
    errorCode("model_invalid"),
  );
});

test("results rank supported matches, retain ties, and allow no match", () => {
  assert.deepEqual(
    result("offer").matches.map((entry) => entry.id),
    ["annual-offer", "reward"],
  );
  assert.deepEqual(
    composeSearchResult("offer", catalog, payload([0.8, 0.8, 0.8])).matches.map(
      (entry) => entry.id,
    ),
    catalog.map((entry) => entry.id),
  );
  assert.deepEqual(
    composeSearchResult("absent mechanism", catalog, payload([0, 0.2, 0.5]))
      .matches,
    [],
  );
  assert.equal(
    composeSearchResult(
      "offer",
      catalog,
      payload([SEARCH_MATCH_THRESHOLD, 0, 0]),
    ).matches.length,
    1,
  );
  assert.notEqual(
    result("offer").catalogVersion,
    composeSearchResult(
      "offer",
      [{ ...catalog[0], title: "Changed" }, ...catalog.slice(1)],
      payload(),
    ).catalogVersion,
  );
});

test("malformed answers cannot inject ids, wrong types or invalid probabilities", () => {
  const invalid: unknown[] = [
    null,
    {},
    { ...payload(), model: "bad\nmodel" },
    { ...payload(), usage: { input_tokens: -1 } },
  ];
  for (const value of [-0.1, 1.1, NaN, Infinity, "0.9", undefined]) {
    invalid.push({
      ...payload(),
      answers: { ...payload().answers, match_0: { type: "noul", noul: value } },
    });
  }
  invalid.push({
    ...payload(),
    answers: { ...payload().answers, unknown_id: { type: "noul", noul: 1 } },
  });
  invalid.push({
    ...payload(),
    answers: { match_0: { type: "noul", noul: 1 } },
  });
  invalid.push({
    ...payload(),
    answers: { ...payload().answers, match_0: { type: "choice", noul: 1 } },
  });
  for (const value of invalid)
    assert.throws(
      () => composeSearchResult("offer", catalog, value),
      errorCode("invalid_response"),
    );
});

test("transport sends one bounded typed request to the fixed endpoint", async () => {
  let calls = 0;
  const mock = (async (url, options) => {
    calls += 1;
    assert.equal(url, "https://api.typesafe.ai/v1/systemone");
    assert.equal(options?.method, "POST");
    assert.equal(options?.redirect, "manual");
    assert.equal(
      new Headers(options?.headers).get("Authorization"),
      "Bearer test-key",
    );
    const request = JSON.parse(options?.body as string);
    assert.equal(Object.keys(request.questions).length, 3);
    assert.equal(JSON.stringify(request).includes("test-key"), false);
    return Response.json(payload());
  }) as typeof fetch;
  const found = await evaluateSearch(
    "offer",
    catalog,
    "test-key",
    "jev-latest",
    mock,
  );
  assert.equal(calls, 1);
  assert.equal(found.model, "jev-test");
});

test("upstream redirects fail without retrying or forwarding the credential", async () => {
  const received: {
    path: string | undefined;
    authorization: string | undefined;
  }[] = [];
  const server = createServer((request, response) => {
    received.push({
      path: request.url,
      authorization: request.headers.authorization,
    });
    if (request.url === "/provider") {
      response.writeHead(307, { Location: "/redirect-target" });
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(payload()));
    }
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const localFetch = (async (url, options) => {
      assert.equal(url, "https://api.typesafe.ai/v1/systemone");
      // Exercise real Fetch redirect behavior, with no external request.
      return fetch(`http://127.0.0.1:${address.port}/provider`, options);
    }) as typeof fetch;
    await assert.rejects(
      evaluateSearch("offer", catalog, "test-key", "jev-latest", localFetch),
      errorCode("search_unavailable"),
    );
    assert.deepEqual(received, [
      { path: "/provider", authorization: "Bearer test-key" },
    ]);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test("authentication and upstream failures never echo provider text or retry authentication", async () => {
  let calls = 0;
  const mock = (async () => {
    calls += 1;
    return new Response("secret-key / private query", { status: 401 });
  }) as typeof fetch;
  await assert.rejects(
    evaluateSearch("offer", catalog, "test-key", "jev-latest", mock),
    (error: unknown) => {
      assert.ok(error instanceof SearchError);
      assert.equal(error.code, "key_invalid");
      assert.equal(error.message.includes("secret-key"), false);
      return true;
    },
  );
  assert.equal(calls, 1);
  await assert.rejects(
    evaluateSearch("offer", catalog, "", "jev-latest", mock),
    errorCode("key_required"),
  );
  assert.equal(calls, 1);
});

test("transient errors retry with bounded provider advice; long retry advice returns immediately", async () => {
  let calls = 0;
  const mock = (async () => {
    calls += 1;
    return calls < 3
      ? new Response(null, { status: 529, headers: { "Retry-After": "0" } })
      : Response.json(payload());
  }) as typeof fetch;
  await evaluateSearch("offer", catalog, "test-key", "jev-latest", mock);
  assert.equal(calls, 3);
  calls = 0;
  const limited = (async () => {
    calls += 1;
    return new Response(null, {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }) as typeof fetch;
  await assert.rejects(
    evaluateSearch("offer", catalog, "test-key", "jev-latest", limited),
    errorCode("rate_limit"),
  );
  assert.equal(calls, 1);
});

test("oversized or invalid provider bodies fail safely", async () => {
  const oversized = (async () =>
    new Response("x".repeat(80_001))) as typeof fetch;
  await assert.rejects(
    evaluateSearch("offer", catalog, "test-key", "jev-latest", oversized),
    errorCode("invalid_response"),
  );
  const malformed = (async () =>
    new Response("key-or-query-do-not-echo")) as typeof fetch;
  await assert.rejects(
    evaluateSearch("offer", catalog, "test-key", "jev-latest", malformed),
    (error: unknown) =>
      error instanceof SearchError && !error.message.includes("key-or-query"),
  );
});

test("duplicate concurrent queries coalesce, other queries return busy, and cached responses are isolated", async () => {
  let complete!: (value: SearchResult) => void;
  let calls = 0;
  const service = createSearchService(catalog, async () => {
    calls += 1;
    return new Promise((resolve) => {
      complete = resolve;
    });
  });
  const first = service("offer", "test-key");
  const same = service("  offer  ", "test-key");
  await assert.rejects(
    service("different", "test-key"),
    errorCode("search_in_progress"),
  );
  complete(result("offer"));
  const [one, two] = await Promise.all([first, same]);
  assert.deepEqual(one, two);
  one.matches.length = 0;
  assert.equal((await service("offer", "test-key")).matches.length, 2);
  assert.equal(calls, 1);
});

test("failed searches are not cached and credentials or model changes invalidate a successful hit", async () => {
  let calls = 0;
  const service = createSearchService(catalog, async (query) => {
    calls += 1;
    if (calls === 1)
      throw new SearchError(502, "search_unavailable", "Unavailable");
    return result(query);
  });
  await assert.rejects(
    service("offer", "test-key"),
    errorCode("search_unavailable"),
  );
  await service("offer", "test-key");
  await service("offer", "test-key");
  assert.equal(calls, 2);
  await service("offer", "new-key");
  await service("offer", "new-key", "jev-another");
  assert.equal(calls, 4);
});

test("cache evicts least recently used successes beyond twenty queries", async () => {
  let calls = 0;
  const service = createSearchService(catalog, async (query) => {
    calls += 1;
    return result(query);
  });
  for (let index = 0; index < 20; index += 1)
    await service(`query ${index}`, "test-key");
  await service("query 0", "test-key");
  await service("query 20", "test-key");
  await service("query 0", "test-key");
  assert.equal(calls, 21);
  await service("query 1", "test-key");
  assert.equal(calls, 22);
});
