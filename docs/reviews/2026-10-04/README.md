# Colour architecture and container review — 4 October 2026

This records the colour review before the later index curation. Its 36-entry counts and captures are historical. See [Index curation](index-curation.md) for the current 19-entry catalog and its verification.

This local revision separates palette boundaries from component paint. `growth-scope` and `growth-context` now select semantic aliases and native colour scheme only. HTML components own explicit surface/foreground pairs; SVG thumbnails have actual painted shapes behind their text. Transparent outline controls only inherit yellow ink when they also have a yellow surrounding surface.

## Changes

- Documented all 11 yellow shades and 46 growth roles in Foundations → Yellow growth, alongside live shared controls, role pairings and calculated contrast examples. The section supports `?foundation=growth#foundations` links.
- Corrected all experiment families and the 36 index thumbnails. Yellow stays on growth components; layout gutters and surrounding context stay blue.
- Fixed isolated yellow buttons, selected cards, explicit nested foregrounds, disabled currency prefixes and external focus rings. Shared invalid Input, Textarea, Checkbox, Radio and Select boundaries use contrasting error ink rather than the pale error fill.
- Constrained menu/popover height to available space, fitted the account shell to its preview viewport, and corrected shrinkage and joined edges in creation/Studio layouts.
- Removed the 90 added question-mark explanation controls. Guide me remains the single growth education interface, including full-screen modal views.
- Consolidated reference intake in [the reference workflow](../../reference-workflow.md), with full-viewport screenshots, complete video inspection, proportional context, independent index items, original references and local-first review.

## Completed checks

| Check                           | Result                                                                                                                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Production build and TypeScript | Passed                                                                                                                                                                                                             |
| Theme mappings                  | 56 semantic role mappings passed                                                                                                                                                                                   |
| Token contrast                  | 300 supported pairs passed; lowest tested text 4.53:1, boundary/focus 3.26:1                                                                                                                                       |
| Desktop initial views           | All 36 routes inspected using rendered HTML foreground and ancestor background values; 1,129 text elements sampled, no failing pairs reported                                                                      |
| Narrow initial views            | All 36 routes at 320 × 740; 1,027 text elements sampled, no failing pairs reported and no horizontal page overflow                                                                                                 |
| SVG preview source audit        | All 36 rendered previews; 339 text/paint samples, including 227 growth samples, with no pair below 4.5:1                                                                                                           |
| Live Foundations                | Yellow roles, menu selection, primary/secondary focus, invalid/disabled inputs and nested blue context inspected; 320px layout fits                                                                                |
| Guide me                        | Account menu and Notion modal entry, next/back and Escape checked; underlying source surface remains open                                                                                                          |
| Representative follow-up states | Steam first/last/completion; clone local sample boundary; premium voice subscription boundary; Agents selected/preview/use-template states; automatic top-up enabled/invalid/saved local states; API language menu |

The rendered text audit is a focused computed-style check, not accessibility certification. It does not fully assess image backgrounds, gradients, opacity, overlapping geometry or every possible interaction combination. Axe reported no violations on the yellow Foundations view; decorative grid gradients and two existing generic ARIA labels required review. Open Radix Select menus produced additional focus/landmark audit findings, so this revision does not claim a clean comprehensive accessibility audit of all transient states. The inspected menu text contrast passed.

The token source covers disabled readability as an internal kit standard. Decorative borders do not carry the meaningful-control contrast requirement. Current policy and implementation responsibilities are documented in [Colour tokens and theme boundaries](../../tokens.md).

## Full-screen review evidence

All captures retain the full visible browser content viewport. These are wireframe review captures; historical original references were preserved unchanged and have not been recaptured.

- [Yellow foundations](yellow-foundations.jpg)
- [Yellow shared components and focus](yellow-components.jpg)
- [Experiments index](experiments-index.jpg)
- [Rendered contrast observations](rendered-contrast.json)

This revision remains local. No deployment or real source-product account action was performed.
