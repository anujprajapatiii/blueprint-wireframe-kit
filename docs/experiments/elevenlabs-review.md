# Historical ElevenLabs import review — 4 October 2026

This review describes the initial import, when all 33 researched patterns were implemented as independent experiments and the main index contained 36 items. The subsequent [curation decision](../reviews/2026-10-04/index-curation.md) removed 17 standalone entries; the active catalog now contains 19 experiments. The checks below describe the pre-curation version and do not verify the new catalog or routes. Each keeps its existing `el-*` ID, added date, design intent, source observations, and original references. The default destination is the interactive wireframe. Source, goal, type, search, and sort operate across the full index.

## Checked locally

- All 33 initial wireframe routes rendered at desktop width and at 320px. No route produced a JavaScript error in the route review. An overflowing opportunity table was fixed to scroll inside its own container; the image/video introduction was fixed to wrap without an invisible horizontal cut. Voice prompt actions also wrap on narrow screens.
- Desktop interaction checks covered all five families: pricing cadence, annual-offer review, capacity validation; voice methods and prompt starters; creation shortcuts, model choice, example selection; Studio/template/assistant/sharing and audiobook routes; invitations, product switching, template filtering, API code copying, and pricing-carousel boundaries. The family documents describe source geometry and exact behavior limits.
- Combined source/goal/type/search produced the expected individual results. Opening an experiment preserved those filters in its return link. Related experiment links retain that context. Switching from a changed wireframe to its original reference and back retained the wireframe state.
- The main index and representative model-choice, clone-setup, sharing, Agents-onboarding, and automatic-top-up states reported no automated accessibility violations after adding a standalone wireframe heading. Some checks require manual review: contrast on the SVG index previews, hidden focus in modal compositions, and ARIA attributes in the Agents view. These results are not accessibility certification. Keyboard focus return and dialog dismissal were checked in the family reviews.
- The production build, TypeScript checks, all 127 defined token-contrast pairs, route-ID coverage, and whitespace checks passed. All 33 research IDs map uniquely to an implementation. Original account captures remain excluded from public assets, build output, and tracked files.

The shared dialog grid now uses a zero-minimum-width column so narrow children cannot enlarge its implicit grid track. Local Vite preview watches through polling because workspace edits did not reliably emit native file events during review.

## Scope

No ElevenLabs account actions are performed by these wireframes. The prototypes stop at unobserved generation, payment, invitation, upload, publishing, and API boundaries. Desktop references establish the source compositions; mobile arrangements are documented prototype adaptations. Original captures and the complete research archive are available in the local preview. This revision has not been published.
