# Index curation — 4 October 2026

## Decision

Anuj asked for a growth-focused library and explicitly removed **Upgrade from usage context**. The previous import treated almost every useful product interaction as a growth pattern. This pass removes 17 standalone ElevenLabs entries from the active catalog and their experiment routes, leaving **19 active experiments: 16 from ElevenLabs plus Steam, Notion, and GitHub**.

The original 33-entry research catalog, observations, media provenance, and private screenshots remain evidence. Their presence in research data does not make them active index items. Preserve useful supporting states inside retained flows where needed, without restoring removed experiments as standalone destinations.

## Inclusion criterion

Admit a specific, visible growth intervention with an evidenced prompt or proposition aimed at a defined transition: discovering or adopting a capability, reaching a product's first value, choosing a paid commitment, expanding an account, inviting others, contributing supply, or participating in a referral program.

A generic task, useful control, clear label, reduced effort, or imagined success metric does not qualify by itself. Standard navigation, configuration, validation, content editing, and transaction execution stay product context. An explicit user request for a particular reconstruction or inclusion can override this default; record the exception without inventing a growth rationale.

This is a curation decision for this library, not a claim that the removed interfaces cannot influence business outcomes. Growth intent remains an interpretation; retained patterns do not establish measured lift.

## Removed standalone entries

| ID                                      | Previous title                  | Reason                                                                                                                                                        |
| --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el-home-intent-to-creation`            | Start with a goal               | Broad creation entry, composer, and shortcuts describe the core product. Goal framing alone does not establish a distinct growth intervention.                |
| `el-model-choice-guidance`              | Choose the right model          | Model configuration and fit guidance; no separate adoption or commercial proposition is established.                                                          |
| `el-balance-context-upgrade`            | Upgrade from usage context      | Explicit user removal. A static balance panel and ordinary upgrade route do not establish a triggered capacity or upsell intervention.                        |
| `el-upgrade-commitment-clarity`         | Review an upgrade               | Standard purchase confirmation. Retain as supporting context after the annual offer when needed, rather than a standalone growth pattern.                     |
| `el-voice-pathway-effort-guidance`      | Choose a voice pathway          | Ordinary method selection. The explicit premium capability gate is retained separately.                                                                       |
| `el-voice-design-prompt-starters`       | Start from a voice prompt       | Prompt editing aids within a core creation task; the captured existing-user state does not establish a distinct onboarding/adoption intervention.             |
| `el-instant-clone-guided-prerequisites` | Guide clone setup               | Core upload, requirements, and validation flow. Required task steps alone are not a growth mechanism.                                                         |
| `el-curated-voice-discovery`            | Find a suitable voice           | Marketplace browsing, search, and general ranking/curation. The broad screen was classified from usefulness rather than a focused growth proposition.         |
| `el-inspiration-to-populated-project`   | Start from a complete example   | A useful sample-to-editor workflow, but the observed state does not establish growth-specific targeting or a distinct proposition beyond normal template use. |
| `el-studio-agent-task-starters`         | Suggest an assistant task       | Suggested tasks and permission controls support ordinary assistant use; insufficient evidence of a separate growth intervention.                              |
| `el-music-browse-or-create`             | Browse or create music          | Core browse/create functionality. The broad screen should not inherit growth status from an incidental model announcement.                                    |
| `el-sound-effects-community-reuse`      | Reuse community sounds          | Community browsing and reuse are core functionality here; the publishing disclosure alone does not establish a distinct growth intervention for this catalog. |
| `el-audiobook-create-or-publish`        | Choose production or publishing | Product task selection and setup dominated the entry; the broad flow exceeds the bounded publishing proposition supported by the evidence.                    |
| `el-product-switcher-positioning`       | Explain adjacent products       | Product navigation with descriptive labels, not a distinct cross-promotion intervention.                                                                      |
| `el-api-first-request-scaffold`         | Scaffold a first API request    | Standard documentation/code tools; a first-use onboarding state or guided activation sequence was not established.                                            |
| `el-api-topup-amount-scaffold`          | Preview a credit purchase       | Ordinary amount entry, presets, and purchase review without a distinct offer or growth prompt.                                                                |
| `el-api-auto-topup-continuity`          | Prevent capacity interruption   | An optional billing setting; a lifecycle intervention, interruption recovery, or retention effect was inferred rather than observed.                          |

## Retained scope

Clear feature promotions, benefit-led introductions, premium gates, annual savings, plan framing, affiliate rewards, and the dated model offer remain. Five less obvious entries are retained only for their bounded interventions:

- **Basic Seats:** the explicit collaboration allowance and invitation proposition, not the email field itself.
- **Invite while sharing:** the embedded team invitation card, not ordinary access controls.
- **Contributor setup:** the earnings proposition and contribution checklist, not payout administration.
- **Unmet voice demand:** the high-demand/low-competition opportunity proposition intended to encourage supply, not generic table filtering.
- **Agent onboarding:** the observed new-product onboarding template entry and guided starting proposition, not every later agent editor control.

Yellow marking and Guide me explanations must follow those boundaries. Other regions remain blue product context.

## Index contract from this revision

Goal filters form a rectangular icon-button row above search and the finer Source/Type/sort controls. Show All and goals with active catalog coverage; use the shared taxonomy so newly represented goals appear automatically. Do not show empty categories merely because the taxonomy defines them.

Cards use the darker semantic `surface-sunken` role, with larger shared gutters and consistent spacious preview padding. Goal badges are yellow. In titles, highlight the first word only if it matches the shared explicit verb allowlist; nouns such as “Feature,” “Discovery,” and “Event” remain ordinary text. Use the semantic growth highlight role for yellow text on blue surfaces and its checked contrast pair.

These presentation rules belong to [Index design](../../index-design.md); the admission gate belongs to [Reference workflow](../../reference-workflow.md). Earlier 33/36-entry checks describe the catalog before pruning.

## Verification

- Production build, TypeScript, 56 semantic mappings, and all 308 supported contrast pairs passed.
- All 19 retained routes load their wireframe and growth annotations. Initial rendered HTML text checks reported no failing pairs; these checks do not certify every interaction, SVG, gradient, or overlapping layer.
- The deleted usage-context route redirects to the ElevenLabs index with 16 active entries.
- Goal, source, and type filters work together; opening an experiment and returning preserves them. Empty results and reset return the expected catalog.
- At 1728px, cards use 40px column gaps, 48px row gaps, and 32px thumbnail padding. At 320px, thumbnails use consistent 24px padding and the document stays 320px wide. The goal row scrolls internally; selecting the far-right Referral goal returns its one experiment.
- All 19 goal badges use the yellow theme. The 16 verb-led titles highlight their opening word; the three noun-led titles remain unchanged. The index's 477 sampled HTML text elements had no reported contrast failures.

Full visible viewport captures: [index](index-refined.jpg), [cards and badges](index-refined-cards.jpg), and [mobile index](index-refined-mobile.jpg). [Route observations](index-route-review.json) preserve the current initial-view checks. This revision remains local.
