import type { ReactNode } from "react";
import {
  growthCategoryById,
  type GrowthCategoryId,
  type GrowthIntent,
} from "../growth/taxonomy";

function CategoryLink({ id }: { id: GrowthCategoryId }) {
  return (
    <a
      href={`?#growth-category-${id}`}
      className="underline decoration-input underline-offset-4 hover:decoration-foreground"
    >
      {growthCategoryById[id].name}
    </a>
  );
}

export function DesignIntent({
  intent,
  name,
  className = "",
}: {
  intent: GrowthIntent;
  name: string;
  className?: string;
}) {
  const rows: [string, ReactNode][] = [
    ["Goal", <CategoryLink id={intent.primary} />],
    ...(intent.secondary.length
      ? ([
          [
            "Also supports",
            intent.secondary.map((id, index) => (
              <span key={id}>
                {index > 0 && " · "}
                <CategoryLink id={id} />
              </span>
            )),
          ],
        ] as [string, ReactNode][])
      : []),
    ["Audience", intent.audience],
    ["Journey", intent.journey],
    ["Mechanism", intent.mechanisms.join(" · ")],
    ["Format", intent.format],
    ["Proposed measure", intent.measure],
  ];
  return (
    <div className={`min-w-0 text-sm ${className}`}>
      <dl
        aria-label={`Design intent for ${name}`}
        className="divide-y divide-border"
      >
        {rows.map(([term, value]) => (
          <div
            key={term}
            className="grid gap-1 py-3 first:pt-0 min-[480px]:grid-cols-[8rem_minmax(0,1fr)] min-[480px]:gap-4"
          >
            <dt className="text-muted-foreground">{term}</dt>
            <dd className="min-w-0 leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
        {intent.basis}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        A working hypothesis. Results haven’t been measured.
      </p>
    </div>
  );
}
