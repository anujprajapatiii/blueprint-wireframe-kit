# Blueprint growth nutrition labels

Every experiment carries a small structured label explaining its intended growth behavior. The label classifies intent, not appearance: a modal, banner, or recommendation can support different objectives in different journeys.

This is the working synthesis supplied by Anuj in **Pasted text.txt**, adopted for this library. It is not a universal or mutually exclusive industry standard. The source names established frameworks but contains unresolved citation placeholders; those references have not been independently verified here. The definitions are available in the kit at `?#growth`.

## Label contract

Keep the label in the experiment's typed registry metadata as `growth: GrowthNutrition` so the index and any future detail view share one record. `src/growth/taxonomy.ts` owns the schema and definitions; `src/components/growth-nutrition-label.tsx` renders the reusable label. Use plain language and shared blueprint tokens; do not imply nutritional quantities, scores, or measured impact.

| Field | What to record |
| --- | --- |
| Primary | Exactly one category: the principal behavior this experiment intends to change. |
| Secondary | Optional categories for material supporting outcomes. Do not add every plausible downstream effect. |
| Audience / state | The relevant person or account and their current relationship to the product. Record unknowns, including commercial status. |
| Journey | The task or transition the person is undertaking. |
| Mechanisms | Why the intervention might change behavior: clarity, reduced effort, relevance, trust, motivation, timely prompts, and similar explanations. |
| Format | The UI format or channel: modal, banner, inline card, email, and so on. |
| Success measure | A proposed observable outcome tied to the intended behavior. Distinguish it from a measured result; avoid relying on clicks alone when later value matters. |
| Basis | Why the classification fits, what the reference establishes, and what remains an interpretation or hypothesis. |

The registry field names are `primary`, `secondary`, `audience`, `journey`, `mechanisms`, `format`, `measure`, and `basis`. Explain provisional classifications and measurement limits alongside the label. A reference shows an interface and some behavior; it does not establish its actual business objective, causal effect, or performance. The initial labels state **Intent hypothesis · Measures not yet tested**.

## Three overarching outcomes

| Outcome | Meaning | Categories |
| --- | --- | --- |
| Acquire users | Bring additional people or accounts into the product. | Acquisition; Referral, advocacy & distribution |
| Retain users | Help people experience value, continue receiving it, and return after lapsing. | Activation; Engagement & adoption; Retention & churn prevention; Reactivation & win-back |
| Monetize value | Generate revenue and grow the commercial relationship. | Monetization & purchase; Expansion |

These are nested meanings: activation can contribute to the broad retention outcome, while narrow retention work concerns continuity. Expansion is a form of monetization within an existing commercial relationship.

## Eight growth categories

| Category | Behavioral job | Typical patterns | Example measures |
| --- | --- | --- | --- |
| Acquisition | Help suitable prospects discover, understand, evaluate, and start using the offering. | Value propositions, comparisons, demos, lead capture, signup, installation | Qualified signups or leads, acquisition cost, downstream activation |
| Activation | Help a new user or account reach meaningful initial value. | Setup, import, integrations, starter templates, useful empty states, guided first tasks | Activation rate, time to value, first successful outcome |
| Engagement & adoption | Help existing users receive more value through deeper, broader, or appropriately repeated use. | Feature discovery, contextual education, recommendations, progress feedback, recurring workflows | Valuable feature adoption, breadth/depth of use, core-action frequency |
| Retention & churn prevention | Preserve an existing usage or customer relationship. | Renewals, value summaries, loyalty benefits, at-risk interventions, recovery, pause/downgrade options | Cohort retention, renewal rate, churn, retained revenue |
| Reactivation & win-back | Restore a relationship after meaningful inactivity or departure. | Win-back messages, return incentives, what's changed, resume previous work, re-onboarding | Reactivation rate, sustained use after return, recovered customers |
| Monetization & purchase | Help users choose, understand, and complete a commercial exchange. | Pricing, plans, trials, paywalls, checkout, payment methods, billing cadence | Paid conversion, completed purchases, net revenue, revenue per user |
| Expansion | Increase value and revenue within an existing commercial relationship. | Paid upgrades, more seats or usage, add-ons, cross-sell, bundles, purchasing approvals | Expansion revenue, paid seats, add-on adoption, account revenue |
| Referral, advocacy & distribution | Turn existing users, relationships, or product outputs into sources of new users. | Referral rewards, invitations, shareable outputs, public pages, embeds, reviews, advocacy | Referred users who activate, invite acceptance, acquisition from shared outputs |

## Classification boundaries

- **Activation / engagement:** meaningful initial value versus ongoing or additional value. Feature onboarding for an existing user can serve engagement.
- **Engagement / retention:** what people do and the value they receive versus whether the relationship continues over time.
- **Retention / reactivation:** preserve an active relationship versus restore a lapsed one. An abandoned cart alone does not establish lapse.
- **Monetization / expansion:** a commercial exchange versus increasing an existing customer relationship's commercial value. A paid CTA alone does not establish expansion.
- **Objective / journey / mechanism / format:** keep these independent. For example, expansion → add paid seats → clear incremental value and reduced effort → in-product modal.

Classify ambiguous patterns from their intended behavior. A teammate invitation can support first value, ongoing collaboration, paid-seat expansion, or referral. A pricing page can support evaluation and acquisition or purchase. Failed-payment recovery can preserve a subscription (retention) or rescue a first purchase (monetization).

Conversion optimization is a transition measured across objectives. Onboarding is a journey; personalization is an approach; gamification, trust, and social proof are mechanisms; experimentation is a learning method. Product-led and sales-led growth describe ways of delivering the journey. None needs to become a ninth equivalent category.

Accessibility, performance, and localization are cross-cutting improvements. Attach a growth category only when there is a specific growth hypothesis. For marketplaces, identify the audience side—buyer/seller, host/guest, creator/consumer—and consider matching or liquidity outcomes. A growth loop connects multiple patterns and behaviors; record those relationships rather than forcing the loop into one category.

## Initial experiment interpretations

These labels are unvalidated design interpretations. Suggested measures are not instrumented or measured in these wireframes.

| Experiment | Primary / secondary | Audience and journey | Mechanisms / format | Proposed measures |
| --- | --- | --- | --- | --- |
| Steam growth banners | Engagement & adoption / Monetization & purchase (secondary hypothesis) | Existing store users; discover games and progress through the queue toward useful consideration | Reward, relevance, progress / sticker banner, discovery banner, modal carousel | Queue completion and wishlist additions; the downstream purchase intent is a hypothesis |
| Notion feature modal | Engagement & adoption / none | Existing workspace users; account tier unknown; discover and try features toward meaningful adoption | Contextual education, clear value, timely prompting / feature announcement modal | Feature adoption rate after viewing the announcement; no conversion or adoption result is available |

Revisit the primary objective when scope or evidence changes. Preserve the stable experiment ID and record why its classification changed.

## Local review — 2026-10-04

The index shows both labels, searches their fields, and filters by primary or secondary category together with experiment type. Checked matching and empty states, clearing filters, category deep links, keyboard disclosure, and 320px reflow of both labels and definitions without horizontal overflow. The build and 127 token contrast checks pass. Axe reported no violations in the tested index and kit states; the kit leaves some existing ARIA and contrast cases for manual review. This is a local design review, not a measured growth result or accessibility certification. Publishing remains a separate request.
