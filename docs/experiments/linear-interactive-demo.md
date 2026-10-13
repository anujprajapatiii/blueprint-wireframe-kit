# Try the product before signup

- **Stable ID:** `linear-interactive-demo`
- **Direct route:** `?view=experiments&experiment=linear-interactive-demo`
- **User intent and scope:** Mine a connected journey toward first useful value. The studied intervention is a public sample workspace, welcome guidance and a persistent signup route. The issue editor is contextual evidence of trying the product, not a separate growth experiment.
- **Sources:** [Official start guide](https://linear.app/docs/start-guide) and [public demo](https://linear.app/demo), inspected 13 October 2026. The demo opened in Agent. No authenticated account was created or inspected.
- **Evidence:** Seven unchanged, full-viewport JPEGs at **1440 × 900**. Source files are in ignored `local-references/linear-growth-2026-10-13/`. The viewer registers all seven in their observed order; no original was cropped or edited.

## Observed structure and behavior

The official start guide invites exploration before signing up. It describes locally stored changes that reset on refresh and notes settings and SLAs are excluded. The demo contains sample data and persistent **Sign up** in its top-left sidebar.

The actual first screen was Agent (capture 01). The pinned **Welcome to Linear! [README]** document (02) explains the workspace, teams, issues, projects, initiatives, cycles and keyboard shortcuts. Its second paragraph expressly invites exploration and describes missing integrations. The experiment deliberately begins at this inspected guide; it does not claim that the guide automatically appeared on entry.

Engineering → Issues displayed three sample rows (03). The inspected row **ENG-411 Surface OAuth token expiry in integration diagnostics** opened a description, existing activity and right-side properties (04). **Todo** opened eight status choices (05). Choosing **Done** changed the visible property immediately (06). A useful core action was possible before signup, although it did not establish real account value or persistence.

The persistent **Sign up** action opened **Create your workspace** (07), with Google, email and SAML SSO methods and **Back to Linear**. No method was selected in the source. No account, invitation, message, AI generation or purchase was submitted.

## Proportions and context

Measurements below are estimates from the complete 1440 × 900 references.

| Region     | Source geometry                                                                  | Wireframe treatment                                                                                                 |
| ---------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Shell      | 244px sidebar; main panel begins x244, y8 and ends near y864                     | Same desktop column and inset panel; compact blue sidebar keeps the source density                                  |
| Header     | Main header about 46px tall with breadcrumbs                                     | Preserved across guide/list/issue; guide header shares its whole yellow panel                                       |
| Welcome    | About 806px content width, starts x435 and y116                                  | Centered document content, original first paragraphs and hierarchy; full panel yellow                               |
| Issue list | Compact 36px group headers, 46px rows, sparse content below                      | Three seeded rows and grouping kept blue; no oversized hero treatment                                               |
| Issue      | Main text x306, y118; properties x1008; approximately 644px body and 54px gutter | Blue two-column issue context, original task text, shorter sample activity                                          |
| Status     | 32px trigger; 206px menu below its property                                      | Shared accessible Select with all eight observed labels; no independent yellow status inset                         |
| Signup     | Centered 288px-wide actions, symbol near y261; three 44px actions                | Whole central signup group is yellow, including symbol, title and choices; outer context and Back control stay blue |

## Admission and classification

Manual evidence-based admission uses the before-signup demo plus guidance and sample work. An ordinary issue status selector would not qualify alone. Primary **activation** reflects the provisional aim of experiencing a useful task before setup; secondary **acquisition** captures the persistent invitation to create an account. Proposed measures include a completed useful demo action, signup, and later meaningful use in the user's own workspace. None is an observed business result.

The required TypeSafe skill and current documentation index were consulted. No source data was sent to the external curator. Automated admission was not run; there is no model assessment or endorsement.

## Prototype decisions and limits

- Start at the pinned welcome guide, retaining the actual Agent entry as reference context. Agent generation and its controls are not rebuilt as an invented growth pattern.
- The inspected issue is the connected task. Other rows and navigation remain static context; they do not imply implemented destinations. Secondary sample activity is shortened, while the original issue title and description remain.
- All eight observed status choices are reversible in the local prototype. Only Todo → Done was exercised in the source. Regrouping the changed issue on return to the list is a local review provision, not a separately observed source result.
- The selected status survives navigation inside this mounted local flow and resets on Restart or refresh. It does not change Linear, save account data or imply that demo changes transfer to a new account.
- Signup choices stop at an explicit local boundary. Back to Linear returns to the last prototype view; its live source destination was not opened. No credentials are requested.
- Source keyboard-shortcut copy is retained as context; these application shortcuts are not implemented. Native button/Select keyboard operation, focus after navigation, Escape dismissal and focus restoration are local accessibility provisions.
- The 320px layout is an adaptation: sidebar becomes a compact header, issue rows wrap, and the working status control moves above the issue. Uninspected secondary properties are omitted from this narrow presentation. No mobile source is claimed.
- View changes are immediate. Source animation duration/easing was not measured.
- Originals remain local and ignored. The separate authorization to publish Gamma does not publish this Linear revision.

## Guide me

| Target              | Lesson                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------- |
| Welcome panel       | Explain the demo and give visitors useful starting context                             |
| Seeded issue list   | Try a task using sample work instead of configuring a workspace                        |
| Issue status/result | A working control demonstrates a useful action; a changed status is immediate feedback |
| Persistent Sign up  | Invite account creation while allowing exploration first                               |
| Signup choices      | Offer familiar entry methods and stop at the unobserved account boundary               |

Tips are short plain-language descriptions attached to current visible states. Yellow paints complete intervention containers; guide targets do not fragment their color.

## Local review

- Implementation prepared from all seven full-viewport captures on 13 October 2026.
- Desktop browser review covered welcome → issue navigation, Todo → Done → Todo feedback, the signup-method boundary, Escape and Back to Linear, library Restart to welcome, a Guide me tip, and an original reference whose natural dimensions were 1440 × 900.
- After two focused fixes, the status trigger shows one icon and its label without a copied shortcut. Selecting In Progress and returning to the list produces one In Progress group containing ENG-411 with count 2, and Todo with count 1.
- At an actual **320 × 900** outer viewport, the embedded frame measured 286px and its document width was 272px. The issue status fitted. Sign up → Back returned keyboard focus to the visible mobile Sign up control.
- Formatting and TypeScript checks passed after the focused changes. The [combined local review](../reviews/2026-10-13/local-growth-review.md) records the final combined build and the complete review evidence. No full accessibility-conformance claim is made.
- Metadata is **Ready for review**. This Linear revision and its originals remain local; it has not been published.

## Publication addendum — 13 October 2026

Anuj explicitly authorized publishing this Linear interactive demo and its 7 registered unchanged originals to the existing password-protected Blueprint website. It is deployed in website version `2005341b-daa9-49fa-be9f-bbd3c71bcd1d`; the internal search catalog is updated. The earlier local review and local-only statements above are retained as history, and the documented evidence and prototype limits still apply. Originals remain excluded from Git and public assets. See the [growth release record](../reviews/2026-10-13/published-growth-release.md) for release scope and live verification status.
