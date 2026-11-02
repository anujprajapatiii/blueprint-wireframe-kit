import { ArrowUpRight } from "lucide-react";
import { BlueprintLogo } from "./blueprint-logo";
import { SiteLock } from "./site-lock";
import { cn } from "./kit";
import type { SiteView } from "../site-navigation";

const links: { view: SiteView; label: string }[] = [
  { view: "experiments", label: "Experiments" },
  { view: "guide", label: "Growth guide" },
  { view: "kit", label: "UI kit" },
];

export function SiteHeader({ active }: { active: SiteView }) {
  return (
    <header className="sticky top-0 z-[var(--layer-sticky)] border-b border-border bg-surface-sunken">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3 lg:px-8">
        <BlueprintLogo />
        <nav
          aria-label="Main navigation"
          className="order-last flex w-full items-center gap-5 text-sm sm:order-none sm:w-auto sm:flex-1 sm:justify-end"
        >
          {links.map(({ view, label }) => (
            <a
              key={view}
              href={`?view=${view}`}
              aria-current={active === view ? "page" : undefined}
              className={cn(
                "flex min-h-10 items-center rounded-sm whitespace-nowrap",
                active === view
                  ? "underline decoration-input underline-offset-8"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a
            href="https://github.com/anujprajapatiii/blueprint-wireframe-kit"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-10 items-center gap-1 rounded-sm text-muted-foreground hover:text-foreground"
          >
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <SiteLock />
        </div>
      </div>
    </header>
  );
}
