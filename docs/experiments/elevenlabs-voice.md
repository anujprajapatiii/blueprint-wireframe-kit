# ElevenLabs voice experiments

This record preserves the original import and subsequent implementation decisions. Active index inclusion is governed by the later [growth-focused curation](../reviews/2026-10-04/index-curation.md); removed IDs no longer open standalone experiment routes.

Added 4 October 2026. Source: the signed-in ElevenLabs inspection and six original desktop screenshots retained in the private reference collection. User intent: turn every collected pattern into an ordinary, independently filterable Blueprint experiment with a working neutral wireframe and its original reference.

## Scope and evidence

All six originals were opened and visually inspected before implementation. The module is `src/experiments/elevenlabs/voice.tsx`; the existing registry supplies the original research and design-intent records.

| Stable experiment ID                    | Focal state                                                               | Inspected source                                              |
| --------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `el-voice-pathway-effort-guidance`      | Method chooser with effort, input requirements, alternative library route | `10-create-voice-pathways.jpg`                                |
| `el-professional-clone-capability-gate` | Disabled professional clone option with attached Creator-tier requirement | `10-create-voice-pathways.jpg`                                |
| `el-voice-design-prompt-starters`       | Editable voice prompt, example chips, cost and generation action          | `11-voice-design-starters.jpg`                                |
| `el-instant-clone-guided-prerequisites` | Upload step, quality guidance, minimum input and remaining step names     | `12-instant-clone-onboarding.jpg`                             |
| `el-curated-voice-discovery`            | Search, use-case filters, six trending voices, curated collection row     | `13-voice-library-discovery.jpg`                              |
| `el-voice-supplier-earnings-checklist`  | Zero-of-three contributor checklist beside empty payout panels            | `29-voice-earnings-entry.jpg`, `10-create-voice-pathways.jpg` |
| `el-demand-guided-voice-supply`         | Language/category filters and ranked voice-supply opportunity table       | `30-voice-supply-opportunities.jpg`                           |

Each direct URL uses `?view=experiments&experiment=<stable-id>`. These seven IDs are individually addressable; sharing the chooser composition between its general choice pattern and its inline gate follows the same reference, rather than fabricating an unrelated screen.

## Source proportions

Measurements below are approximate, taken from the captured content frames (no browser/OS chrome).

- **Creation chooser:** 512 × 843 px crop. Content inset 32 px; inner cards 448 px wide. Ordinary method cards are about 119 px tall, with 12–14 px gaps. The professional option is about 199 px including its attached 61 px gate row. Final library card is about 105 px. Wireframe retains a 512 px maximum panel, 32 px desktop inset, 20 px card padding, compact body copy and a scrollable dialog where viewport height requires it.
- **Prompt design:** 512 × 393 px crop. Prompt composition occupies x32–480, y140–304; footer controls begin at y326. The wireframe uses the same 512 px panel and 448 px desktop interior, editable multiline prompt and chips within its common well, and a wide generation control beside Settings. Readable kit control heights and visible local boundary feedback can extend the panel vertically.
- **Instant clone:** 1728 × 996 px full-screen content. Central setup bounds about x316–1200: 884 px wide. Left step outline about 184 px; gap about 28 px; upload column about 672 px. The drop target is roughly 672 × 250 px, with three quality tips above and requirement/Next row below. Wireframe uses the fixed 884 px maximum group and the same 184 px / fluid-column composition until it stacks at narrow widths.
- **Voices pages:** 1728 px wide; application sidebar x0–255 (~15%); toolbar about 90 px high including the promotional strip. Focal content begins at x416; the source’s unrelated top promotion is abstracted away. Wireframe retains the 15% sidebar and breadcrumb container, using a centered 88% content width in the remaining region. The top inset is reduced to the shared spacing scale because the promotional strip is outside these patterns.
- **Discovery:** six trending voices are in three columns and two rows. Curated cards are about 340 × 164 px, with a roughly 45% media area. The wireframe retains this grid and the collection card’s split geometry; artwork becomes simple neutral icon blocks. It retains a short row of abstracted content below so the library does not end at the focal collection.
- **Earnings:** section navigation about 108 px wide. Checklist panel about 300 px against a 650 px payout region (~0.46:1), separated by about 48 px in the source. The wireframe preserves the column ratio, uses a shared 24 px gap, and keeps two payout summaries above the empty-state container. Actual account amounts are replaced with a dash; the meaning of an empty payout state is preserved.
- **Opportunities:** focal table about 996 px wide; rows roughly 41 px high. Columns keep rank, language, accent, category, library count and score in the same order. The wireframe retains all 11 legible captured rows, numbers and directional indicators. The table scrolls horizontally when its six columns cannot fit readably.

Narrow-screen references were not provided. The 320 px adaptation hides the abstract application sidebar, wraps controls, stacks discovery/checklist columns and clone prerequisites, and scrolls wide tabular data. The design does not shrink the entire desktop frame to unreadable text.

## Preserved copy and local interactions

- **Chooser:** the five method names, original descriptions, effort badges, exact Creator requirement and Subscribe label remain. Choosing Voice Design opens its observed prompt dialog; Instant Voice Clone opens the observed upload step; Voice Library opens the separate discovery experiment. Close and reopen work through the shared Radix dialog. Subscribe and Voice Remixing report the uninspected branch without inventing an outcome.
- **Prompt:** the complete Evil Ogre prompt is transcribed from the saved image, along with the three visible example labels, Prompt, Best practices, Settings and Generate voice. The visible 171-credit figure is the captured product estimate, not a calculation or account debit. Editing and clearing the prompt work; empty prompts disable generation. The example chips replace the text and Randomize cycles the available examples. Little Mouse replacement was observed during research, but its wording was not preserved in the screenshot. The two non-Ogre examples use only their observed labels as input, with a note that the full prompt was not captured. No missing prompt copy is fabricated. Generation, Settings and linked guidance stop at the observed boundary.
- **Clone:** the complete first-step layout, original quality tips, audio/video file limit, ten-second minimum, three step labels and disabled initial Next are retained. A clearly labeled local sample can demonstrate satisfied input and removal. This is an assumed demonstration state, not an observed upload result. Record audio and the upload target never request microphone access or transfer a file. Next leads to a boundary notice because the two later steps were not inspected; no form fields, consent process or success state are invented.
- **Discovery:** original six captured voice names, category labels and language counts are retained. Search and use-case/language filtering operate over that captured subset, with an empty state and reset. Preview controls toggle a labeled silent preview state; no audio reference was captured. Add stops before account mutation. Collection selection narrows the captured subset and says that actual collection contents/ranking were not inspected. Artwork, logos and portraits are replaced by neutral geometry.
- **Contributor setup:** all three prerequisite labels, the earnings proposition, 0/3 progress and empty-state copy remain. Create Voice opens the independently reviewable professional gate experiment. Later steps remain visibly locked. Terms stop at the documented uninspected link; there is no fabricated payout or publish flow.
- **Opportunities:** language and category filters operate on the captured 11-row dataset; Library voices toggles a local ascending-count sort back to captured ranking. Sorting/filtering behavior is a prototype adaptation, not proof of source behavior. Source scores are labeled as captured signals with unverified calculation and predictive value; no segment outcome is fabricated.

## Review and limits

Shared semantic token classes, Button, Badge, Input, Textarea, Select, Dialog and Table primitives are reused. Labels, pressed states, selected filters, live boundary/empty-state messages, accessible modal titles, focus rings and reduced-motion-safe transitions are supplied. No external requests, account changes, audio generation, purchases, upload or microphone access are performed by these wireframes.

The seven component branches were source-reviewed, and the module is type-checked with the aggregate application. Root performs the integrated browser/layout and responsive review. The module’s initial TypeScript run found only a removed unused import in this file; other temporary errors came from concurrent unfinished modules and are not evidence of completed aggregate verification.

### Integrated narrow-screen correction

At 320 × 900 px, the opportunity table initially expanded the document to 552 px because absolutely positioned screen-reader text in score badges lacked a positioned ancestor inside the scroll container. The table wrapper now establishes that containing block, with explicit single-column/min-width containment. Browser verification after the fix measured a 320 px document with a 286 px table viewport and 660 px internal scroll width. The chooser and prompt dialogs both measured 286 px client/scroll width with a 320 px document; clone setup also remained within 320 px. The prompt footer deliberately wraps generation and Settings at this width.

## Growth focus and Guide me

The 4 October 2026 revision uses the shared monochromatic yellow growth scope for the studied intervention, keeping surrounding application context blue. The source copy and interaction boundaries above remain unchanged. Educational explanations are library annotations, not source copy or claims of measured impact. Target descriptions are exposed through the shared **Guide me** walkthrough, without separate growth tooltip controls.

| Experiment | Yellow targets and walkthrough sequence | Blue context retained |
| --- | --- | --- |
| Creation pathways | Effort/input guidance → professional capability gate → library alternative | Modal frame, back/close controls and prototype boundary notices |
| Professional clone gate | Capability benefit and input requirements → attached plan requirement and Subscribe route | Other voice methods, library alternative and modal frame |
| Prompt starters | Editable starter prompt and example chips → generation action with captured credit cost | Modal header, back/close controls and boundary feedback |
| Clone prerequisites | Step outline → recording-quality guidance → minimum input and Next gate | Upload/recording work area, application backdrop and local demonstration controls |
| Curated discovery | Search/use-case filters → trending short list with preview/Add → handpicked collections | Application navigation, page headings and the abstracted lower catalog section |
| Supplier earnings | Contribution incentive → prerequisite checklist → empty-state guidance | Payout amount summaries and application navigation |
| Supply opportunities | Relevant segment filters → library counts and opportunity signals | Application navigation, page introduction and capture/provenance note |

The chooser changes targets with its observed prompt and clone states, so subsequent screens have their own explanations. The professional gate route intentionally leaves unrelated methods blue. Voice-language and opportunity-language popovers carry the yellow scope through their portal.

The descriptions distinguish intended mechanisms from evidence: activation/conversion effects, ranking logic, opportunity-score calculation, predicted earnings and uninspected branches remain unverified. Source proportions remain the basis for layout. The shared [growth education contract](../growth-education.md) owns guidance and state handling; new layout and guide changes require their own review.
