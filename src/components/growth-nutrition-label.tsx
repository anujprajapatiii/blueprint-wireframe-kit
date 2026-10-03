import { useId } from "react";
import {
  growthCategoryById,
  type GrowthCategoryId,
  type GrowthNutrition,
} from "../growth/taxonomy";

function CategoryLink({ id }: { id: GrowthCategoryId }) {
  const category = growthCategoryById[id];
  return (
    <a
      href={`?#growth-category-${id}`}
      className="underline decoration-input underline-offset-4 hover:decoration-foreground"
      title={category.job}
    >
      {category.name}
    </a>
  );
}

/** Describes a growth hypothesis, never a score or a claim of measured impact. */
export function GrowthNutritionLabel({
  nutrition,
  name,
  className = "",
}: {
  nutrition: GrowthNutrition;
  name: string;
  className?: string;
}) {
  const headingId = useId();
  const rows = [
    ["Audience / state", nutrition.audience],
    ["Journey", nutrition.journey],
    ["Mechanism", nutrition.mechanisms.join(" · ")],
    ["Format", nutrition.format],
    ["Measure", nutrition.measure],
  ];

  return (
    <section
      aria-labelledby={headingId}
      className={`min-w-0 rounded-md border border-input bg-surface-sunken p-4 text-sm ${className}`}
    >
      <h3
        id={headingId}
        className="border-b-4 border-input pb-2 text-lg font-semibold tracking-tight"
      >
        Growth nutrition
        <span className="sr-only"> for {name}</span>
      </h3>
      <dl className="break-words">
        <div className="grid grid-cols-1 gap-1 min-[400px]:grid-cols-[6.5rem_minmax(0,1fr)] min-[400px]:gap-3 border-b-2 border-input py-3">
          <dt className="font-semibold">Primary</dt>
          <dd className="font-semibold">
            <CategoryLink id={nutrition.primary} />
          </dd>
        </div>
        {nutrition.secondary.length > 0 && (
          <div className="grid grid-cols-1 gap-1 min-[400px]:grid-cols-[6.5rem_minmax(0,1fr)] min-[400px]:gap-3 border-b border-border py-2.5">
            <dt className="text-muted-foreground">Secondary</dt>
            <dd>
              {nutrition.secondary.map((id, index) => (
                <span key={id}>
                  {index > 0 && " · "}
                  <CategoryLink id={id} />
                </span>
              ))}
            </dd>
          </div>
        )}
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-1 gap-1 min-[400px]:grid-cols-[6.5rem_minmax(0,1fr)] min-[400px]:gap-3 border-b border-border py-2.5 leading-5"
          >
            <dt className="text-muted-foreground">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Intent hypothesis · Measures not yet tested
      </p>
      <details className="mt-1">
        <summary className="w-fit cursor-pointer py-2 text-xs underline decoration-input underline-offset-4">
          Why this classification?
        </summary>
        <p className="pb-1 text-xs leading-5 text-muted-foreground">
          {nutrition.basis}
        </p>
      </details>
    </section>
  );
}
