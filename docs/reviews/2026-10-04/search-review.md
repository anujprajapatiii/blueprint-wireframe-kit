# Search-first index review

Reviewed locally on 4 October 2026. Not published. Working preview: `http://127.0.0.1:5176/blueprint-wireframe-kit/?view=experiments`.

## Delivered

A large search field above the goal buttons, immediate keyword lookup, explicit-submit semantic search, suggested queries, Best match sorting, and combined goal/source/type refinement. Search context survives opening an experiment and returning. The static GitHub Pages build retains keyword search; TypeSafe inference remains local and server-side.

## Data boundary

Automatic approval review blocked the initial live check because its candidate projection included research observations. The implementation was reduced to an explicit public-listing allowlist before continuing: ID, title, summary, source name, type, focus, goals, mechanisms, and format. The core rejects additional candidate fields. Research observations, original copy, audience/account details, journeys, assets, source URLs, paths and private captures are excluded. The current registry, ElevenLabs metadata, and taxonomy are unchanged from published commit `4424c62`; its verified deployment is recorded in [Index curation](index-curation.md#publication).

## Live results

All five queries returned valid responses from `jev-1.13.0`, catalog version `9be1c666d935ea5b`:

| Query | Observed result |
| --- | --- |
| Explain a paid upgrade when someone hits a premium feature | Only `el-professional-clone-capability-gate`, probability 0.91 |
| Introduce a new feature with benefits and a clear way to try it | Eight results; dubbing introduction, Flows introduction and v4 discovery ranked first; Notion also included |
| Reward people for exploring recommendations | Only `steam-growth-banners`, 0.86 |
| Reward people for recommending our product | Only `el-affiliate-advocacy-entry`, 0.94 |
| Recover an abandoned shopping cart with an email reminder | No matches |

The 0.55 inclusion gate is provisional. These checks verify representative retrieval behavior and the API contract, not broad model accuracy. Match probabilities are not business impact or confidence in a causal claim.

## Completed verification

- Twelve deterministic search tests passed: input bounds, safe catalog projection and final field allowlist, complete candidate batching, ranking/ties/no-match, malformed outputs, bounded retries, duplicate coalescing, busy responses, and cache behavior.
- TypeScript and production build passed, including 308 token contrast pairs across 56 semantic roles. Production JavaScript contains no TypeSafe endpoint, credential variable, or local search/curator endpoint strings.
- Non-billable endpoint checks verified origin and cross-site rejection, malformed/oversized inputs, method/content-type/route handling, no-store, and no CORS allowance.
- Browser checks verified the premium-gate result, combined Expansion and ElevenLabs filters, the experiment return link, preserved ranking/query/filter state, keyboard Enter submission, and clearing back to 19 items.
- Whitespace-only search resets Best match to Recently updated without losing other filters. The corresponding read/write URL boundaries also normalize that state.
- The full index and search box were reviewed at desktop and an actual 320 CSS pixels. Document width matched viewport width; the goal row scrolls inside its own container. The viewport override was reset afterward.

Full viewport captures: [desktop index](search-index.jpg), [live search](search-live.jpg), and [mobile index](search-mobile.jpg).
