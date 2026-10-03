import { useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  cn,
} from "../components/kit";
import "./steam-growth-banners.css";
import { DiscoveryQueue } from "./discovery-queue";
import {
  savedSteamDesign,
  steamDesignStyle,
  type SteamDesign,
} from "./steam-design";

function ContextCards({
  count = 4,
  compact = false,
}: {
  count?: number;
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid grid-cols-2 gap-3 md:grid-cols-4",
        compact && "grid-cols-4 gap-2",
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="min-w-0 border border-border-subtle bg-background p-3"
        >
          <div
            className={cn(
              "bg-surface-sunken",
              compact ? "h-12 sm:h-16" : "h-20 sm:h-28",
            )}
          />
          <div className="mt-3 h-1.5 w-2/3 bg-border-subtle" />
          {!compact && <div className="mt-2 h-1 w-1/3 bg-border-subtle" />}
        </div>
      ))}
    </div>
  );
}

function StickerStack({
  paused = false,
  fan = 14,
}: {
  paused?: boolean;
  fan?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative block h-14 w-24 shrink-0", paused && "is-paused")}
    >
      {[-fan, 0, fan].map((rotation, i) => (
        <span
          key={i}
          className="sticker-card absolute top-2 grid h-11 w-9 place-items-center rounded-sm border border-input bg-surface-raised"
          style={{
            left: `${i * 24}px`,
            transform: `rotate(${rotation}deg)`,
            zIndex: i === 1 ? 2 : 1,
          }}
        >
          <span className={`sticker-glyph sticker-glyph-${i}`} />
        </span>
      ))}
    </span>
  );
}

function Destination({
  kind,
  paused = false,
  design,
  designStyle,
}: {
  kind: "stickers" | "queue";
  paused?: boolean;
  design: SteamDesign;
  designStyle: CSSProperties;
}) {
  return (
    <DialogContent style={designStyle}>
      <DialogHeader>
        <DialogTitle>
          {kind === "stickers" ? "Your stickers" : "Your discovery queue"}
        </DialogTitle>
        <DialogDescription>
          This sticker collection is a placeholder. The discovery queue now
          demonstrates browsing and completion; this separate destination is
          outside the current flow.
        </DialogDescription>
      </DialogHeader>
      <div className="my-4 grid min-h-32 place-items-center rounded-md border border-dashed border-input bg-surface-sunken">
        {kind === "stickers" ? (
          <StickerStack paused={paused} fan={design.stickerFan} />
        ) : (
          <span className="text-sm text-muted-foreground">Queue content</span>
        )}
      </div>
      <DialogClose asChild>
        <Button className="w-full" variant="secondary">
          Back to banners
        </Button>
      </DialogClose>
    </DialogContent>
  );
}

export function SteamGrowthBanners({
  design = savedSteamDesign,
  onTune,
  tuningOpen = false,
}: {
  design?: SteamDesign;
  onTune?: () => void;
  tuningOpen?: boolean;
}) {
  const designStyle = steamDesignStyle(design);
  const [motion, setMotion] = useState(true);
  const [copyState, setCopyState] = useState("");
  async function copyLink() {
    try {
      const url = new URL(location.href);
      url.searchParams.delete("audit");
      url.hash = "";
      await navigator.clipboard.writeText(url.href);
      setCopyState("Link copied");
    } catch {
      setCopyState(
        "Copy the address from your browser to save this experiment.",
      );
    }
  }
  return (
    <main
      id="main-content"
      style={designStyle}
      className="mx-auto max-w-[1280px] px-5 py-7 sm:px-8 sm:py-10"
    >
      <a
        href="?view=experiments"
        className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" /> All experiments
      </a>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Steam growth banners
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A small reward prompt followed by an invitation to explore. Original
            copy, neutral wireframe.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onTune && (
            <Button
              id="open-design-controls"
              variant="secondary"
              onClick={onTune}
              aria-expanded={tuningOpen}
              aria-controls="design-controls"
            >
              <SlidersHorizontal aria-hidden="true" />
              Tune design
            </Button>
          )}
          <Button variant="outline" onClick={copyLink}>
            {copyState === "Link copied" ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}{" "}
            Copy link
          </Button>
        </div>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="mt-2 min-h-5 text-sm text-muted-foreground"
      >
        {copyState}
      </p>

      <section
        aria-label="Store banner wireframe"
        className="mt-5 overflow-hidden rounded-lg border border-input bg-surface-sunken"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <h2 className="text-sm font-medium">Store</h2>
          <Button
            variant="ghost"
            onClick={() => setMotion(!motion)}
            className="h-10 px-3 text-xs motion-reduce:hidden"
          >
            {motion ? (
              <Pause aria-hidden="true" />
            ) : (
              <Play aria-hidden="true" />
            )}
            {motion ? "Pause animations" : "Resume animations"}
          </Button>
          <span className="hidden h-10 items-center text-xs text-muted-foreground motion-reduce:inline-flex">
            Motion reduced
          </span>
        </div>
        <div className="mx-auto max-w-[1056px] px-4 py-5 sm:px-7 sm:py-7">
          <ContextCards compact />
          <div className="my-7 flex flex-col gap-[var(--banner-gap)] sm:my-8">
            <section
              aria-label="Sticker reward"
              className="flex items-center gap-3 px-1 sm:gap-5"
            >
              <StickerStack paused={!motion} fan={design.stickerFan} />
              <div className="min-w-0 py-2 text-sm leading-relaxed">
                <h3 className="font-semibold">
                  Earn free stickers by going through your discovery queue!
                </h3>
                <p className="-mt-1 text-muted-foreground">
                  Now through Oct 8 <span aria-hidden="true">- </span>
                  <Dialog>
                    <DialogTrigger className="inline-flex min-h-10 items-center rounded-sm text-foreground underline decoration-input underline-offset-4 hover:decoration-foreground">
                      View your stickers
                    </DialogTrigger>
                    <Destination
                      kind="stickers"
                      paused={!motion}
                      design={design}
                      designStyle={designStyle}
                    />
                  </Dialog>
                </p>
              </div>
            </section>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="queue-banner group relative block w-full overflow-hidden rounded-md border border-input bg-card text-left transition-colors duration-[var(--motion-fast)] hover:bg-surface-raised"
                  aria-label="Explore Your Discovery Queue"
                  aria-describedby="queue-description"
                >
                  <span className="queue-copy relative z-10 block px-5 py-7 sm:px-8">
                    <span className="queue-heading flex items-center gap-3 font-semibold">
                      Explore Your Discovery Queue{" "}
                      <ArrowUpRight
                        className="shrink-0"
                        size={19}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      id="queue-description"
                      className="mt-2 block text-sm leading-relaxed text-muted-foreground"
                    >
                      Click to open your queue of top-selling, new, and
                      recommended titles
                    </span>
                  </span>
                  <span
                    className={cn("queue-art", !motion && "is-paused")}
                    aria-hidden="true"
                  >
                    <span className="queue-rail">
                      <span className="queue-track">
                        {/* Identical groups give the track an exact, seamless half-width wrap. */}
                        {[0, 1].map((copy) => (
                          <span className="queue-sequence" key={copy}>
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                className={`queue-card queue-card-${i}`}
                                key={i}
                              >
                                <span className="queue-card-image">
                                  <span />
                                </span>
                                <span className="queue-card-line" />
                                <span className="queue-card-line short" />
                              </span>
                            ))}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </button>
              </DialogTrigger>
              <DiscoveryQueue />
            </Dialog>
          </div>
          <ContextCards count={8} />
        </div>
      </section>

      <details className="mt-7 rounded-md border border-border px-5 py-1">
        <summary className="min-h-12 py-3 text-sm font-medium">
          Intent & reference notes
        </summary>
        <div className="grid gap-7 border-t py-6 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
          <div className="space-y-5">
            <section>
              <h2 className="mb-2 font-medium text-foreground">
                What this explores
              </h2>
              <p>
                How a time-bound sticker reward creates a reason to browse, and
                how the larger discovery banner provides the next action. Both
                components remain together, in their original order.
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-medium text-foreground">Reference</h2>
              <p>
                Steam Growth Banners.mp4 · 11-second recording. The reward
                strip, banner copy, and rolling card strip are visible
                throughout. Three additional screenshots show the immersive game
                carousel and completion screen. Trailer autoplay follows the
                user's description; no sticky behavior is established.
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-medium text-foreground">Retained</h2>
              <p>
                The two banners’ original writing, their relative hierarchy, the
                three-card sticker fan, and the continuous, angled discovery
                card marquee. “Now through Oct 8” is reference copy, not a
                current offer.
              </p>
            </section>
          </div>
          <div className="space-y-5">
            <section>
              <h2 className="mb-2 font-medium text-foreground">
                Reduced to wireframe
              </h2>
              <p>
                Game artwork, stickers, logos, promotional colors, gradients,
                and the store background become plain kit surfaces and outlines.
                Surrounding cards only establish page context.
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-medium text-foreground">
                Prototype decisions
              </h2>
              <p>
                Sticker shadows and animated glyphs, mobile reflow,
                pause/resume, and local demonstration data are prototype
                additions. The queue opens a twelve-game carousel and reward
                summary. The marquee fades at its desktop edge; mobile has no
                fade and only clips at the visible banner boundary. Trailer
                artwork is a neutral placeholder; wishlist, ignore, stats, and
                Continue work locally. No Steam rewards are granted. Motion
                stops when reduced motion is requested.
              </p>
            </section>
            <a
              className="inline-flex min-h-10 items-center gap-2 text-foreground underline underline-offset-4"
              href="https://github.com/anujprajapatiii/blueprint-wireframe-kit/blob/main/docs/experiments/steam-growth-banners.md"
              target="_blank"
              rel="noreferrer"
            >
              Full experiment record{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </details>
    </main>
  );
}
