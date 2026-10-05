# Review a reference with the growth curator

The local curator helps decide whether an observed experience belongs in this growth library and which parts should be yellow. It uses TypeSafe's Jev model for bounded judgments; project code owns the admission rules, report assembly, and next steps. A report is a draft brief, not an indexed experiment.

## Use it locally

1. Open **Review a reference** from the local experiments index, or use `?view=experiments&tool=curator`.
2. Use **Connect TypeSafe** to enter your API key in the masked local input. The development server stores `TYPESAFE_API_KEY` in gitignored `.env.local`. Keep the key out of chat, source files, `VITE_*` variables, browser storage, and published assets.
3. Supply the reference title, source, input kind, observed evidence, component descriptions, and visible actions, or import a prepared observation brief as JSON. Use one observation, component, or action per line. Record missing states and uncertainty in the observations instead of filling gaps with assumptions.
4. Run the review and inspect its decision, evidence, component roles, and unresolved points. The server saves JSON and Markdown reports in gitignored `local-curator/reviews/`.
5. Continue the [reference workflow](reference-workflow.md) for an admitted pattern: build the wireframe and Guide me, preserve the original, file the metadata and preview, and verify the complete local experience.

This tool runs only with the local development server. It is not an API on GitHub Pages. **TypeSafe key saved** confirms local configuration; saving does not authenticate the key. Only a successful review verifies the live TypeSafe integration. The default model is `jev-latest`; an optional server-side `TYPESAFE_MODEL` setting selects a different model.

## Start from observed evidence

When Anuj pastes a screenshot, video, or link, Codex still inspects the original before using the curator. Preserve full-screen or full-frame context and follow the existing evidence rules. For a video, inspect the whole supplied sequence and include the relevant timestamps. For a link, inspect accessible screens and identify boundaries that were not visited. The user should not need to transcribe the reference or complete a form for Codex.

Prepare observations that another reviewer can trace back to the reference. Describe both the candidate intervention and its surroundings. List only actions that are visible or observed; do not turn an inferred business outcome into a selectable action. Add important visible copy verbatim where useful. Do not include account secrets or unrelated personal information.

Include explicit event advertising and product/service cross-sell promotions among candidate interventions. Record their proposition and visible action even if the destination is external; an unobserved purchase or downstream outcome does not make the promotion ordinary navigation. Apply the [canonical admission rule](reference-workflow.md), keep generic links as context, and distinguish uncertainty about the primary goal from evidence that a promotion exists. Preserve the model's original uncertainty when recording a manual decision from the inspected evidence.

Jev receives the extracted text and the project's classification criteria. It does not watch a video, inspect a screenshot, open the source URL, or reconstruct the interface. The optional source URL stays in the local report and is not sent to TypeSafe. Keep private transfer URLs and local capture paths out of the submitted text. The original files remain in their existing reference archive.

## Read the result

| Result                               | Meaning and next step                                                                                                                                                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Growth pattern** (`include`)       | The evidence supports a visible growth intervention and its invited behavior. Review the supporting observations, then continue implementation.                                                                                                      |
| **Product context** (`context_only`) | The reference establishes ordinary product functionality without a distinct growth intervention. Preserve useful evidence; do not add it as a growth experiment by assigning a speculative metric. It can support a qualifying flow as blue context. |
| **Needs review** (`needs_review`)    | Evidence, confidence, or consistency is insufficient. Reinspect the original and improve the observations where possible. Retain unresolved limits rather than inventing an intervention.                                                            |

The report proposes a goal from the shared taxonomy, a mechanism, an observed target action, evidence, and a role for each described component. A **growth** role proposes the smallest complete yellow intervention. A **context** role stays blue. An **unclear** role needs evidence before being treated as growth. These judgments do not replace checks of source proportions, token contrast, interactions, or responsive layout.

Goal uncertainty and component uncertainty are separate. A clearly supported growth component can stay yellow while the overall brief needs review to choose its primary goal. Do not erase an established boundary because two growth categories overlap; keep admission under review until its required classification is resolved.

An explicit user request to include a specific experience takes precedence over the default admission rule. Set `explicitInclusion` only when that instruction exists. Importing JSON into the form always resets this flag to false; select **Include this at my request** to record an applicable user instruction. The report retains the model's original decision and marks an override when it changes the admission outcome. Inclusion does not establish an unsupported goal, mechanism, action, or yellow component.

Independent questions are evaluated together. The saved report preserves their raw answers, including Choice distributions and Noul probabilities, plus model and usage details. Confidence describes a model distribution; it is not a measured success rate or proof that the reference was understood. The code's uncertainty thresholds are provisional and need evaluation against this library's labeled cases. Never describe a mocked response or an offline check as a live model result.

## Agent input contract

The shared schema is [`src/curator/contracts.ts`](../src/curator/contracts.ts). Keep IDs stable within one input so selected actions, components, and evidence remain traceable. Each list accepts at most 20 entries; each entry's text accepts at most 3,000 characters. Keep the complete serialized input within 30,000 characters. IDs must be unique within their list, start with a lowercase letter, and contain only lowercase letters, numbers, hyphens, or underscores; `unknown` is reserved. The following is a synthetic format example, not a claim about an inspected product:

```json
{
  "version": 1,
  "title": "Invite teammates from a project",
  "sourceName": "Example workspace",
  "referenceKind": "screenshot",
  "observations": [
    {
      "id": "o1",
      "text": "A panel beside the project says ‘Invite your team to collaborate’ and includes an Invite teammates button."
    },
    {
      "id": "o2",
      "text": "The surrounding screen contains a project list and navigation. The invitation destination is not shown."
    }
  ],
  "components": [
    {
      "id": "c1",
      "text": "Team invitation panel with its supporting copy and button"
    },
    { "id": "c2", "text": "Project list and navigation" }
  ],
  "actions": [
    { "id": "a1", "text": "Select Invite teammates" },
    { "id": "a2", "text": "Open an existing project" }
  ],
  "explicitInclusion": false
}
```

An agent can submit a prepared JSON file to the local endpoint. With the key already configured on the server, this request needs no API key:

```sh
curl --fail-with-body \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Origin: http://127.0.0.1:5174' \
  --data-binary @local-curator/reference-input.json \
  'http://127.0.0.1:5174/blueprint-wireframe-kit/__curator/review'
```

Use the actual local preview port if it differs, changing both the request URL and `Origin` header to match exactly. All POST requests require this local origin. Keep input files with private observations under the gitignored `local-curator/` directory. A successful response contains the typed report and its assembled `briefMarkdown`; neither the request nor the saved report automatically registers an experiment. Service failures or malformed responses must remain errors, not simulated reviews.

## Maintain the integration

Read the installed [TypeSafe skill](../.agents/skills/typesafe-ai/SKILL.md) and current [HTTP API](https://docs.typesafe.ai/api), [confidence guidance](https://docs.typesafe.ai/confidence), and [evidence verification example](https://docs.typesafe.ai/cookbooks/citation_check) before changing the integration. The local server calls the HTTP API directly; no browser-side SDK or model credential is needed.

Keep growth definitions in the shared taxonomy and admission rules in the canonical workflow. When tuning judgments, compare clear growth interventions, ordinary product controls, incomplete evidence, and explicit inclusion overrides. Inspect the exact submitted observations and raw answers before changing thresholds. Preserve local reports for review without committing or publishing private evidence.

Run `npm run curator:check` with Node.js 24 to check the integration's code paths using native TypeScript stripping. These deterministic checks do not verify live model quality or credentials; record live evaluations separately when they have actually run.

When launching the preview from an agent environment with a session-scoped network proxy, keep `npm run dev` attached to a running terminal session. A detached process can outlive its proxy and lose API access while still serving the page. If a direct evaluation succeeds but the preview reports a connection failure, check that server lifecycle before asking for a replacement key. Use the actual port printed by Vite.
