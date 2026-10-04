import { ArrowRight } from "lucide-react";
import { Badge } from "../components/kit";
import type { PatternCollection } from "./types";

/** A schematic recognition aid for a collection, not a reconstructed experiment. */
function CollectionPreview() {
  return (
    <svg
      viewBox="0 0 480 240"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
      fontFamily="var(--font-sans)"
    >
      <rect
        x="22"
        y="26"
        width="190"
        height="187"
        rx="8"
        fill="var(--card)"
        stroke="var(--input)"
      />
      <path
        d="M39 49h76"
        stroke="var(--foreground)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x="37"
            y={69 + i * 43}
            width="160"
            height="33"
            rx="4"
            fill="var(--surface-sunken)"
            stroke="var(--border)"
          />
          <circle
            cx="53"
            cy={85 + i * 43}
            r="5"
            fill="none"
            stroke="var(--muted-foreground)"
          />
          <path
            d={`M68 ${85 + i * 43}h${70 - i * 9}`}
            stroke="var(--border-strong)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect
        x="232"
        y="48"
        width="220"
        height="152"
        rx="8"
        fill="var(--card)"
        stroke="var(--input)"
      />
      <text
        x="250"
        y="75"
        fill="var(--foreground)"
        fontSize="12"
        fontWeight="600"
      >
        Pay less with annual billing
      </text>
      <path
        d="M250 93h175M250 105h112"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="250"
        y="125"
        width="94"
        height="22"
        rx="11"
        fill="var(--surface-sunken)"
        stroke="var(--border)"
      />
      <text
        x="297"
        y="140"
        fill="var(--muted-foreground)"
        textAnchor="middle"
        fontSize="10"
      >
        2 months free
      </text>
      <rect
        x="250"
        y="161"
        width="184"
        height="23"
        rx="4"
        fill="var(--primary)"
      />
      <text
        x="342"
        y="176"
        fill="var(--primary-foreground)"
        textAnchor="middle"
        fontSize="10"
      >
        Continue yearly
      </text>
    </svg>
  );
}

export function CollectionCard({
  collection,
  href,
  matchCount,
  filtered,
}: {
  collection: PatternCollection;
  href: string;
  matchCount: number;
  filtered: boolean;
}) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(collection.addedAt));
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface-raised shadow-sm">
      <a
        href={href}
        className="group grid rounded-lg focus-visible:outline-offset-[-4px] sm:grid-cols-[minmax(220px,.8fr)_1.2fr]"
        aria-label={`Explore ${collection.sourceName} collection${filtered ? `, ${matchCount} matching patterns` : ""}`}
      >
        <div className="aspect-[2/1] border-b border-border bg-surface-deep sm:aspect-auto sm:border-r sm:border-b-0">
          <CollectionPreview />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {collection.title}
            </h3>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="mt-1 shrink-0 text-muted-foreground group-hover:text-foreground"
            />
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            {collection.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full px-3 text-xs">
              {filtered
                ? `${matchCount} matching patterns`
                : `${collection.patterns.length} patterns`}
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 text-xs">
              <span>
                Added <time dateTime={collection.addedAt}>{date}</time>
              </span>
            </Badge>
          </div>
        </div>
      </a>
    </article>
  );
}
