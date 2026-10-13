# Local growth-pattern review — 13 October 2026

## Scope

Item 3 adds `linear-interactive-demo`, `gamma-shared-folders`, and the observed New workspace entry to existing `tally-plan-comparison`. The local directory now contains 34 experiments. This revision has not been published or pushed. The separately approved Gamma release remains the 32-experiment snapshot documented in [published-release.md](published-release.md).

## Evidence

Seventeen new registered originals were copied unchanged and checked against their captured SHA-256 hashes through the local allowlisted reference endpoint. Fifteen are exactly 1440 × 900. Gamma’s two one-time promotion captures remain unchanged at 1425 × 891 despite the confirmed 1440 × 900 source CSS viewport; the browser capture mismatch has no established cause. Six accessible Gamma states were recaptured at 1440 × 900. Supporting earlier captures remain archived and are not registered. The viewer decoded representative originals from all three sources at their recorded native dimensions.

Private originals, provenance and review captures remain ignored. Provenance requests return 404. The new source folders are absent from the published Worker source list and 72-file original-reference allowlist. No new source material was transmitted to TypeSafe, no inference was invoked, and no release command was run for this revision.

One empty private Gamma research folder was created to inspect the connected destination. No source invitation was sent or access changed. Linear was explored through its official public demo; no account was created. Tally’s workspace request reached the paid-plan boundary; no purchase was made.

## Browser checks

Reviewed in the in-app browser at actual outer CSS viewports of 1440 × 900 and 320 × 900. The browser was at 110% scale, so the viewport override was adjusted to obtain those measured CSS sizes. The embedded narrow wireframes were smaller than the outer viewport. Original screenshots were not resized. Local proof images use the browser’s native capture bounds and are not claimed to be 1440px source originals.

- **Linear:** Welcome → seeded issues → ENG-411; Todo → Done → Todo produced visible status feedback. Signup method boundary, Escape, Back to Linear and Restart worked. Guide me described the welcome state. Narrow issue controls fit without horizontal overflow; returning from signup restored the visible mobile Sign up control. Review fixed duplicate status icons/shortcut digits and duplicate In Progress groups. Recheck showed trigger “In Progress”, one In Progress group with two rows and one Todo row. The source filter returned one Linear experiment and opened its direct route.
- **Gamma:** Full promotion card and explanation stay yellow; routine creation and sharing stay blue. Manage access opens the explanation; Got it returns focus to Create a folder. Empty names disable creation. Local naming opens the folder and Share; changing example access displays explicit local-only feedback. Email/link invitation tabs remain a no-send example. Restart restores the promotion and the first Guide lesson is present. Review fixed a double translation on the sharing modal and side placement on narrow screens. At 320px outer width, the 272px frame contains the explainer from x16 to 257 and sharing modal from x12 to 261. Mobile keyboard Close restores Share focus. Desktop sharing is 896px wide, starts 64px down, and pointer Close dismisses it.
- **Tally:** Back returns to empty home; New workspace opens the same monthly plans. At 320px it remains visible within the 272px frame. Close restores New workspace focus. At 1440px monthly billing is selected on re-entry. Guide step 3 of 4 explains collaboration as a paid benefit. The new plan-gate original decodes at 1440 × 900. Existing checkout boundaries are unchanged.

The review exercised pointer, native accessibility and keyboard actions, checking resulting visible state. The browser’s locator click occasionally missed transformed iframe controls; native accessibility activation and keyboard operation were used to verify those controls. This is not a claim of exhaustive testing or observed source mobile behavior.

## Validation

Final `npm run build` passed after all fixes: TypeScript, 1,759 transformed modules, 56 semantic token roles and 308 defined contrast pairs. `git diff --check` passed. A separate read-only review covered central registration, preview dispatch, references and release separation. No outstanding findings remain in this scoped review.

The local development server remains at http://127.0.0.1:5173/blueprint-wireframe-kit/?view=experiments . Private proof files and the exact reference hash report are in ignored `local-references/review-2026-10-13/`.
