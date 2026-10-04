# ElevenLabs experiments and source research

Added on **4 October 2026** from the authenticated desktop walkthrough of ElevenLabs. The initial import produced 33 individual wireframes; the later growth-focused curation retains **16 active ElevenLabs experiments**, alongside three earlier sources' entries for 19 total. See [the curation decision](../reviews/2026-10-04/index-curation.md) for the 17 removals and their reasons.

Retained patterns remain normal index items with direct wireframe routes and **Original reference** alongside them. Use the **Source** filter to see active ElevenLabs patterns. Removed IDs no longer open standalone experiments, including through old collection routes. Source metadata remains grouped here for provenance, without imposing a collection on navigation.

The preserved research collection contains **33 source records in 15 flow groups**, **38 original screenshots**, and **27 coverage records**. These are historical research counts, not active index counts. Twenty-two coverage records describe inspected flow areas; five describe areas that were not observed. One source record can have several related screenshots.

## Scope and evidence

The walkthrough used one existing paid account in desktop Chrome. It inspected Home and Creative Chat, speech and voice tools, subscription comparison and upgrade review, invitations, Studio, Flows, music, sound effects, image and video, dubbing, audiobooks, transcription, creator earnings, affiliate entry, Agents onboarding, and developer entry and billing controls.

Fresh signup and free-account conversion, cancellation and win-back, exhausted-credit states, lifecycle messages, mobile layouts, and cohort differences remain unobserved. An unobserved journey is not evidence that a pattern does not exist.

The review stopped before purchases, generation submissions, invitations, access changes, API execution, or publication. Opening the Film trailer inspiration automatically created a populated **Film trailer (Copy)** sample draft. This side effect is recorded in the relevant pattern; the account's original projects were not used as examples. The sample draft remained after collection.

Screenshots establish the visible state at the time of capture. Recorded live observations sometimes include controls that are not visible in the saved frame; those cases are stated in the pattern's limitation. Product claims, including popularity, savings, estimated effort, language support, and model quality, are reported as interface claims rather than independently verified facts.

## Data ownership

- `src/collections/types.ts` defines source research records; standard experiment metadata and wireframe implementations live under `src/experiments/`.
- `src/collections/registry.ts` registers the collection as `elevenlabs` and maps its design intent to the existing growth taxonomy.
- `src/collections/elevenlabs/patterns.json` contains all 33 stable `el-*` pattern IDs, concise navigation copy, recorded observations and source copy, triggers, next states, limitations, and evidence relationships.
- `src/collections/elevenlabs/evidence.json` contains all 38 original filenames, dimensions, dates, descriptions, and SHA-256 checksums. All assets are marked private.
- `src/collections/elevenlabs/coverage.json` preserves the 27 inspected or unobserved flow records and stopping points.

The source research files were `catalog.json`, `coverage.json`, and `evidence-index.json` in the saved ElevenLabs evidence collection. Navigation titles and summaries were shortened for library use. Original interface copy, observations, next states, and pattern limitations remain intact. Coverage wording omits personal cancellation and balance context while preserving what was and was not inspected. No private email, person name, account-specific project URL, or numerical account balance is needed in the metadata.

Screenshots `17-studio-export-options.jpg` and `27-transcription-setup.jpg` are retained as coverage evidence. They are not forced into invented growth-pattern records merely to make every image appear on a pattern card.

## Classification and interpretation

Apply the active-library admission gate in [Reference workflow](../reference-workflow.md) before classification. Use the existing `GrowthIntent` schema and the eight categories in `src/growth/taxonomy.ts` for retained interventions; the raw research classifications are historical interpretations, not inclusion decisions. Each record has one primary category and only material secondary categories. The mechanism and proposed measure are interpretations, not measured effects or confirmed company objectives.

Existing-user feature education is generally engagement. First Agents or API use can support activation of the adjacent product. Paid-account plan, seat, and capacity increases can support expansion. Annual billing comparison is a commercial-choice pattern; annual commitment alone does not demonstrate retention. Invitations do not establish referral without a new-user distribution proposition. Creator earnings describe value to the contributor, not automatically monetization for the platform.

Do not infer unseen states or invent completion behavior. The wireframes reproduce the captured structures and observed interactions, preserving proportions and useful source copy. Inputs and controls are local demonstrations: purchases, generation, uploads, invitations, publishing, and API requests do not contact ElevenLabs. Where inspection stopped, the prototype states that limit instead of fabricating a result. Mobile reflow is a prototype adaptation because no mobile reference was captured.

Implementation and source measurements are documented by flow family in `docs/experiments/elevenlabs-billing.md`, `elevenlabs-voice.md`, `elevenlabs-creation.md`, `elevenlabs-studio.md`, and `elevenlabs-platform.md`. Each pattern still has its own direct URL and focal starting state.

## Private original screenshots

The authenticated screenshots remain local review material. They may include account context even where the notes omit it. They must not be copied into `public/`, embedded in JavaScript or CSS, committed to the public repository, or deployed with GitHub Pages as part of this addition.

Asset URLs use the local-only route `__private-references/elevenlabs/<original filename>`. The local development server serves the originals from the gitignored `local-references/elevenlabs/` directory; production renders an unavailable-reference state. Natural dimensions in the manifest let the viewer preserve each original aspect ratio without cropping or invented replacements.

To restore missing originals on another local checkout, use the saved **elevenlabs-growth-patterns-evidence.zip** archive. Extract the 38 named JPEGs into `local-references/elevenlabs/` at the project root. Keep the original archive and its source research files in that same private directory. Match each file's SHA-256 checksum against `evidence.json`. Keep that directory excluded from Git and from production output. No public attachment URL or user-specific filesystem path belongs in the registry.

This addition follows the local-first workflow. It does not authorize publishing private account screenshots or deploying the current library revision.

## Data checks

On import, all 33 pattern IDs and 38 evidence IDs were checked for uniqueness. Every referenced screenshot resolves to the evidence manifest, all 38 images have positive natural dimensions, all 15 report flow groups are retained, and all 27 coverage records are present. Original observations, source copy, and limitations were compared with the research catalog. These are data-integrity checks, not verification of ElevenLabs' claims or growth impact.
