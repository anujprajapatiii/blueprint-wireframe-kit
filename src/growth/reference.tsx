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

export function GrowthReference({
  headingLevel = 2,
}: {
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const SectionHeading = headingLevel === 1 ? "h2" : "h3";
  const DetailHeading = headingLevel === 1 ? "h3" : "h4";
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
      className={
        headingLevel === 1
          ? "scroll-mt-28"
          : "mt-16 scroll-mt-28 border-t border-border pt-8"
      }
    >
      <Heading
        id="growth-heading"
        className={
          headingLevel === 1
            ? "text-3xl font-semibold tracking-tight sm:text-4xl"
            : "text-2xl font-semibold tracking-tight"
        }
      >
        Growth guide
      </Heading>
      <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
        Find the goal behind a pattern: attract people, help them keep using a
        product, or earn revenue.
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        These are Blueprint’s working definitions. They describe intended
        effects, not measured results.
      </p>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {growthOutcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="rounded-md border border-border bg-surface-sunken p-5"
          >
            <SectionHeading className="text-base font-semibold">
              {outcome.name}
            </SectionHeading>
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
        The eight goals below are more specific. Helping someone get started
        supports retention. Helping a paying customer buy more supports
        monetization.
      </p>

      <div className="mt-6 grid items-start gap-4 xl:grid-cols-2">
        {growthCategories.map((category) => (
          <article
            key={category.id}
            aria-labelledby={`growth-category-${category.id}`}
            className="min-w-0 rounded-md border border-border bg-card"
          >
            <div className="p-5">
              <SectionHeading
                id={`growth-category-${category.id}`}
                className="scroll-mt-28 text-base font-semibold"
              >
                {category.name}
              </SectionHeading>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {category.job}
              </p>
            </div>
            <details className="group border-t border-border">
              <summary className="flex min-h-11 list-none items-center justify-between gap-3 rounded-b-md px-5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                <span>
                  Examples and measures
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
                  <dt className="font-medium">Example patterns</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {category.families.join("; ")}.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">What to measure</dt>
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
        <SectionHeading className="text-lg font-semibold">
          How to describe a pattern
        </SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {growthClassificationLayers.map((layer) => (
            <div
              key={layer.name}
              className="rounded-md border border-border bg-card p-5"
            >
              <DetailHeading className="text-sm font-semibold">
                {layer.name}
              </DetailHeading>
              <p className="mt-2 text-sm leading-6">{layer.question}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {layer.examples}.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          For example: grow an account → add paid seats → explain the value and
          make buying easy → show an upgrade modal.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <ReferenceDisclosure title="Design intent example">
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Record the main and supporting goals, audience, action, and format.
            Explain why it may help, what you would measure, and any
            assumptions. Keep measured results separate.
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
              journey: "Find and compare an additional product",
              mechanisms: [
                "Relevant offer",
                "Clear added value",
                "Easy comparison",
              ],
              format: "Navigation card",
              measure: "Customers who buy and use the additional product",
              basis:
                "Example from the research note. Results have not been measured.",
            }}
          />
        </ReferenceDisclosure>

        <ReferenceDisclosure title="Similar goals, different purposes">
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

        <ReferenceDisclosure title="One format can serve different goals">
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

        <ReferenceDisclosure title="Patterns that support several goals">
          <dl className="space-y-5 text-sm leading-6">
            <div>
              <dt className="font-medium">Shared approaches</dt>
              <dd className="mt-1 text-muted-foreground">
                Onboarding, rewards, personalized suggestions, and customer
                reviews can support several goals. Choose the goal by the action
                you want people to take. A conversion measures that action; an
                experiment tests what helps. People may buy through the product
                or with help from a sales team.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Marketplace audiences</dt>
              <dd className="mt-1 text-muted-foreground">
                Choose goals separately for each side: buyers and sellers, or
                hosts and guests. Also track whether people find a suitable
                match and complete a transaction. A marketplace can involve
                several growth goals.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Growth loops</dt>
              <dd className="mt-1 text-muted-foreground">
                Some actions lead to more of the same: people invite others,
                shared content attracts readers, or revenue funds advertising.
                Show how the patterns connect. Each step can have its own goal.
              </dd>
            </div>
          </dl>
        </ReferenceDisclosure>
      </div>
    </section>
  );
}
