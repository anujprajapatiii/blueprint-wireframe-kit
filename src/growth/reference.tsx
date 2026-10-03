import { useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { DesignIntent } from "../components/design-intent";
import {
  growthBoundaries,
  growthCategories,
  growthClassificationExamples,
  growthClassificationLayers,
  growthOutcomes,
} from "./taxonomy";

function ReferenceDisclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-md border border-border bg-card">
      <summary className="flex min-h-12 list-none items-center justify-between gap-4 rounded-md px-5 py-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="shrink-0 group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-border p-5">{children}</div>
    </details>
  );
}

export function GrowthReference() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash !== "#growth" && !hash.startsWith("#growth-category-")) return;

    // The gallery loads lazily, after the browser's initial fragment lookup.
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="growth"
      aria-labelledby="growth-heading"
      className="mt-16 scroll-mt-28 border-t border-border pt-8"
    >
      <h2 id="growth-heading" className="text-2xl font-semibold tracking-tight">
        Growth definitions
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
        Classify a pattern by the behavior it is intended to change. Three
        overarching outcomes and eight practical categories give each experiment
        a consistent design-intent summary.
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        This is a working synthesis from the supplied growth-design research
        note, not a universal standard. A label records the intended objective
        and a proposed success measure; it does not establish that a pattern
        caused growth.
      </p>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {growthOutcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="rounded-md border border-border bg-surface-sunken p-5"
          >
            <h3 className="text-base font-semibold">{outcome.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {outcome.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {growthCategories
                .filter((category) => category.outcome === outcome.id)
                .map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#growth-category-${category.id}`}
                      className="underline decoration-input underline-offset-4 hover:decoration-foreground"
                    >
                      {category.shortName}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
        Retention and monetization each have a broad umbrella meaning and a
        narrower category meaning. Activation contributes to retention;
        expansion is a form of monetization.
      </p>

      <div className="mt-6 grid items-start gap-4 xl:grid-cols-2">
        {growthCategories.map((category) => (
          <article
            key={category.id}
            aria-labelledby={`growth-category-${category.id}`}
            className="min-w-0 rounded-md border border-border bg-card"
          >
            <div className="p-5">
              <h3
                id={`growth-category-${category.id}`}
                className="scroll-mt-28 text-base font-semibold"
              >
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {category.job}
              </p>
            </div>
            <details className="group border-t border-border">
              <summary className="flex min-h-11 list-none items-center justify-between gap-3 rounded-b-md px-5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                <span>
                  Pattern families &amp; measures
                  <span className="sr-only"> for {category.name}</span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 group-open:rotate-180"
                />
              </summary>
              <dl className="space-y-4 border-t border-border px-5 py-4 text-sm leading-6">
                <div>
                  <dt className="font-medium">Pattern families</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {category.families.join("; ")}.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Example measures</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {category.measures.join("; ")}.
                  </dd>
                </div>
              </dl>
            </details>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Keep four layers distinct</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {growthClassificationLayers.map((layer) => (
            <div
              key={layer.name}
              className="rounded-md border border-border bg-card p-5"
            >
              <h4 className="text-sm font-semibold">{layer.name}</h4>
              <p className="mt-2 text-sm leading-6">{layer.question}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {layer.examples}.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          For example: expansion → adding paid seats → clear value and reduced
          purchasing effort → an in-product modal.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <ReferenceDisclosure title="Design intent format">
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Give each pattern one primary category, optional secondary
            categories, the user or account state, journey, mechanism, UI
            format, and success measure. Record the classification basis so
            intent and assumptions remain inspectable. Store measured results
            separately when an experiment produces evidence.
          </p>
          <p className="mt-5 text-sm font-semibold">
            Example: Recommended product card
          </p>
          <DesignIntent
            name="Recommended product card"
            className="mt-3 max-w-xl"
            intent={{
              primary: "expansion",
              secondary: [],
              audience: "Existing paid account",
              journey: "Discover and evaluate an additional product",
              mechanisms: [
                "Relevance",
                "Clear incremental value",
                "Reduced comparison effort",
              ],
              format: "Navigation card",
              measure: "Additional-product purchase and subsequent adoption",
              basis:
                "Illustrative classification supplied in the research note; no measured result is asserted.",
            }}
          />
        </ReferenceDisclosure>

        <ReferenceDisclosure title="Category boundaries">
          <dl className="grid gap-5 lg:grid-cols-2">
            {growthBoundaries.map((boundary) => (
              <div key={boundary.name}>
                <dt className="text-sm font-medium">{boundary.name}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                  {boundary.distinction}
                </dd>
              </div>
            ))}
          </dl>
        </ReferenceDisclosure>

        <ReferenceDisclosure title="Classify the same format in different contexts">
          <dl className="divide-y divide-border">
            {growthClassificationExamples.map((example) => (
              <div
                key={example.name}
                className="grid gap-2 py-4 first:pt-0 last:pb-0 lg:grid-cols-[210px_1fr] lg:gap-6"
              >
                <dt className="text-sm font-medium">{example.name}</dt>
                <dd className="text-sm leading-6 text-muted-foreground">
                  {example.rule}
                </dd>
              </div>
            ))}
          </dl>
        </ReferenceDisclosure>

        <ReferenceDisclosure title="Cross-cutting methods, audiences, and growth loops">
          <dl className="space-y-5 text-sm leading-6">
            <div>
              <dt className="font-medium">Methods and mechanisms</dt>
              <dd className="mt-1 text-muted-foreground">
                Conversion is a measurable transition throughout the system.
                Onboarding can serve activation, engagement, or reactivation.
                Personalization, gamification, trust, and social proof can
                support many objectives. Experimentation is a learning method;
                product-led and sales-led growth are delivery motions.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Marketplace audiences</dt>
              <dd className="mt-1 text-muted-foreground">
                Apply the categories separately to buyers and sellers, hosts and
                guests, or creators and consumers. Track system outcomes such as
                successful matching and liquidity alongside each audience’s
                objective. Marketplace growth is a context spanning these
                categories.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Growth loops</dt>
              <dd className="mt-1 text-muted-foreground">
                Referral, content, and revenue-funded acquisition loops connect
                multiple behaviors into a repeating system. Document a loop as
                relationships between patterns, rather than forcing the whole
                loop into one category.
              </dd>
            </div>
          </dl>
        </ReferenceDisclosure>
      </div>
    </section>
  );
}
