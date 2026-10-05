# From a reference to an indexed experiment

A screenshot, video, or link is enough to start. Inspect it for a specific growth intervention; a qualifying reference becomes a working, locally reviewed experiment in the main index, with its original evidence and guided explanation. Follow this sequence; the linked contracts own the detail. If the user asks for research only or a targeted edit, honor that narrower scope.

## 1. Establish the question

Use the user's description to identify the focal component, intended behavior, and flow boundary. If none is supplied, choose the clearest visible intervention and record the interpretation as provisional. Continue without asking the user to fill out a form. Ask only for missing access or evidence that materially blocks the requested result.

Check for an existing experiment before creating one. Extend it when the question continues; otherwise give the new pattern a stable ID and plain, useful title. A bulk import creates individual items for qualifying growth patterns, not a bundled source card or an item for every product screen. Connected states of the same pattern belong in its flow; do not split every screenshot into a separate experiment.

Start a short record from [the template](templates/experiment-record.md). Separate user intent, observations, assumptions, and unknowns. Registry metadata is the source of truth for display copy and classification; the record holds evidence, geometry, decisions, and review notes.

## 2. Inspect and preserve the evidence

| Input      | Required inspection and capture                                                                                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Screenshot | Inspect the entire image, transcribe useful visible copy, and preserve the original file unchanged. Record its dimensions and visible app bounds. If it is cropped, mark the missing context; do not invent surrounding UI.                                                                                                                                               |
| Video      | Watch the complete supplied clip before implementation. Record meaningful entry, transition, intermediate, and end states with timestamps. Preserve the original video and take full-frame captures for those states; seek or replay motion as needed. A poster or a few isolated frames do not establish the whole sequence.                                             |
| Link       | Open the actual reference and inspect the relevant accessible screens and safe flow states. Preserve source URLs, access limits, and full-screen captures. Stop at unobserved or consequential boundaries; do not infer purchase, invitation, generation, or account outcomes. If access fails, record it and prepare the supported scaffold without claiming inspection. |

**All new source and review screenshots retain the full visible application/browser content viewport.** Keep navigation, neighboring panels, columns, and surrounding space so placement and scale remain legible. Do not take element-only screenshots or crop a capture to the focal component. Record the viewport size and scroll position when relevant. An optional full-page capture can explain a long layout, but does not replace the normal viewport capture used to judge proportions. Preserve supplied browser/OS chrome in the original file; exclude it only when measuring the application's bounds. Full video frames likewise retain all supplied context.

Save originals once and reuse their asset IDs across related experiments. Put authenticated/private captures in gitignored local reference storage served by the development endpoint; do not copy them into public assets or commit them. Register availability accurately in the shared reference manifest. Missing, partial, or locally available evidence must remain distinguishable. Existing public-reference exceptions and publishing rules are in [AGENTS.md](../AGENTS.md).

**Apply the admission gate before implementation.** Identify a visible growth-specific intervention and the behavior it invites: for example, a feature promotion, trial or premium proposition, savings incentive, contextual invitation, contribution incentive, or evidenced first-value onboarding. A useful input, task chooser, navigation menu, required setup step, payment form, or lower-friction interaction does not qualify on its own. A plausible growth category or proposed metric is not sufficient evidence.

**Event advertising and cross-sell are valid interventions.** An explicit promotion of an event, product, or service with an invited action qualifies even when the next step leaves the product. Admission does not require proof of paid conversion, a purchase flow, or a completed downstream outcome. Inspect the visible proposition and action, preserve destination limits, and classify from the observed audience and commercial relationship. A generic navigation link alone remains insufficient.

When no intervention is established, preserve useful evidence and state the limit instead of inventing a growth rationale or adding ordinary product work to the index. Surrounding product UI may still be reconstructed as blue context inside a qualifying experiment. An explicit request to build or include a specific experience overrides this default; record its scope honestly. The [4 October curation record](reviews/2026-10-04/index-curation.md) documents the boundary applied to existing entries.

### Review the admission with Jev

Use the local [growth curator](curator.md) after inspecting the original. Codex prepares the observed evidence, components, and visible actions; the user does not need to transcribe the source. Jev proposes admission, taxonomy, a mechanism, an observed target action, and yellow/blue roles through typed judgments. Keep uncertain results and explicit user inclusion overrides visible. Submit only the necessary extracted text; originals, private URLs, and the API key stay local. Its saved report is a draft brief. For an admitted pattern, continue every remaining step below to produce and file the working experiment. If credentials or the service are unavailable, apply the admission gate from the evidence and record that the model review was not run.

## 3. Map the composition and flow

Measure the important source relationships before styling: app frame, navigation, column shares, focal panel dimensions, gutters, padding, alignment, and visible density. Label estimates. Capture the states and transitions supported by the source, including boundaries such as first/last, dismiss/reopen, completion, and restart where observed.

Decide which regions are the growth mechanism and which are its environment. Keep the smallest complete intervention yellow; retain the context in blue. Abstract inner content while preserving the containers that explain placement. A supplied still does not establish animation, destinations, sticky behavior, responsive rules, or business results. Keep necessary prototype adaptations explicit. Follow [experiment rules](experiment-rules.md).

## 4. Build the experiment and its guide

Use shared kit controls, semantic tokens, and reusable layout primitives. Follow [the colour contract](tokens.md): theme scopes choose aliases, while components explicitly paint their surface and matching foreground. Check control states and nested/portalled boundaries; fix shared recipes rather than adding local colour patches. Preserve useful original copy and source proportions. Implement the supported states as local interactions, with clear boundaries where evidence stops. Do not perform real purchases, generation, invitations, or account changes as part of a wireframe.

Add ordered `growthTarget` definitions to the actual interventions and use the shared **Guide me** Driver.js integration. Explain the visible mechanism, the behavior it invites, and its possible role in the design goal. Teach only the current visible state. Keep the color key; add no `?` controls, growth tooltips, or pinned explanations. The user advances the product flow; guidance must not click through it. See [growth education](growth-education.md).

Do not add tuning controls by default. If motion matters, identify what moves before implementing it: the whole object, its content, or a track; then reproduce the observed trigger, direction, neighbors, and end conditions.

## 5. File it in the index

| Artifact                   | Repository integration                                                                                                                                                                                                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Interactive wireframe      | Component under `src/experiments/`, registered through `src/experiments/app.tsx`; use the shared experiment workspace.                                                                                                                                                                              |
| Metadata and design intent | Add an `Experiment` to the central registry or its imported source metadata. Include source, scope, type, observations, assumptions, and `GrowthIntent` using [shared definitions](design-intent.md). Keep `addedAt` as the original Asia/Calcutta calendar date and update `updatedAt` separately. |
| Preview                    | Add a lightweight static landscape preview through `experiment-preview.tsx`. Preserve recognizable container relationships and the yellow/blue distinction; do not crop away context or mount a live flow in every index card.                                                                      |
| Original references        | Register asset relationships in `reference-manifest.ts`. Reuse the **Wireframe / Original reference** view, preserve natural media aspect ratios, and label sequences and availability.                                                                                                             |
| Evidence and decisions     | Complete `docs/experiments/<id>.md`, or a clearly indexed shared record for related patterns, using the short template. Avoid duplicating the full registry.                                                                                                                                        |

Only admitted items enter the active registry and experiment routes. Keep source research separate so preserving evidence does not silently restore a removed item. The item must be independently discoverable through Source, Goal, Type, and search. Use `?view=experiments&experiment=<id>` for a refreshable direct link. Opening a flow, following a related experiment, changing reference mode, and returning must preserve directory filters. Keep the existing card composition and [index contract](index-design.md).

## 6. Review the complete result locally

Compare full-context reference and wireframe at matching app widths or a consistent scale. Check the index preview, entry state, relevant follow-up states, and narrow layout at 320px. Inspect container edges, nested cards, dialogs, flex/grid shrinkage, overlays, content wrapping, and scroll ownership; “no page overflow” alone does not establish intact containers. Avoid hiding overflow to mask broken layout.

Exercise the focused interaction, keyboard focus/dismissal, Guide me start/next/back/end and state changes, original-reference switching, direct-link refresh, combined filters, and return to the index. Watch motion in the browser and check its boundaries; still images do not verify smooth animation. Run `npm run build` for token, contrast, TypeScript, and production-build checks, plus relevant accessibility checks for changed compositions. Stop when the material risks are covered; do not report unrun checks as passed.

Save uncropped full-viewport review screenshots and note what was actually inspected. Mark the experiment ready for review only when its supported scope works; retain unresolved source limits in the record.

## 7. Hand over the local result

Keep the preview running and provide the direct local experiment link, a brief description of what was built, and any material evidence or verification limits. No extra confirmation is needed to complete this authorized local work. Publish through GitHub Pages only after an explicit request for the current revision.

When feedback establishes a reusable preference, update its owning contract rather than appending parallel instructions everywhere. Keep specific values and exceptions in the experiment record. Future pasted references inherit this workflow through the repository's AGENTS instructions.
