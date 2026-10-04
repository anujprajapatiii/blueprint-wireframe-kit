import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  Ban,
  Check,
  ChevronLeft,
  ChevronRight,
  Film,
  Pause,
  Play,
  Star,
} from "lucide-react";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  cn,
} from "../components/kit";
import "./discovery-queue.css";
import { growthTarget } from "../components/growth-education";

const queueLength = 12;
const games = Array.from({ length: queueLength }, (_, i) => ({
  title:
    i === 0
      ? "How to Fish"
      : i === 1
        ? "Graveyard Keeper 2"
        : `Game ${String(i + 1).padStart(2, "0")}`,
  tags:
    i === 0
      ? ["Online Co-Op", "Indie", "Multiplayer", "Action"]
      : i === 1
        ? ["RPG", "Sandbox", "Building", "Crafting"]
        : ["Adventure", "Singleplayer", "Indie"],
}));
type Collection = "stickers" | "wishlist" | "ignored" | "store" | "help" | null;

// The surface, border, and contents travel together as one carousel card.
function cardPosition(offset: number): CSSProperties {
  return {
    "--card-offset": offset,
    "--card-angle": `${Math.sign(offset) * -8}deg`,
    "--card-scale": offset === 0 ? 1 : 0.92,
    opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.45 : 0,
    zIndex: offset === 0 ? 2 : 1,
  } as CSSProperties;
}

export function DiscoveryQueue() {
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(0);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [ignored, setIgnored] = useState<Set<number>>(new Set());
  const [collection, setCollection] = useState<Collection>(null);
  const [playing, setPlaying] = useState(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const slide = useRef<HTMLDivElement>(null);
  const complete = index === queueLength;
  const game = games[Math.min(index, queueLength - 1)];

  useEffect(() => {
    if (index < queueLength) {
      setViewed((previous) => new Set(previous).add(`${round}-${index}`));
      setPlaying(true);
    }
    if (index === 0 || index === queueLength)
      heading.current?.focus({ preventScroll: true });
  }, [index, round]);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [collection]);

  useEffect(() => {
    if (slide.current) slide.current.scrollTop = 0;
  }, [index, collection]);

  function move(next: number) {
    setCollection(null);
    setIndex(Math.max(0, Math.min(queueLength, next)));
  }
  function toggle(kind: "wishlist" | "ignored") {
    const update = kind === "wishlist" ? setWishlist : setIgnored;
    const other = kind === "wishlist" ? setIgnored : setWishlist;
    update((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    other((previous) => {
      const next = new Set(previous);
      next.delete(index);
      return next;
    });
  }
  const collectionTitle =
    collection === "stickers"
      ? "Your stickers"
      : collection === "wishlist"
        ? "Your wishlist"
        : collection === "ignored"
          ? "Ignored games"
          : collection === "store"
            ? game.title
            : "About your Discovery Queue";

  return (
    <DialogContent
      className="discovery-dialog"
      onKeyDown={(event) => {
        if (
          document.body.classList.contains("driver-active") ||
          (event.target instanceof Element &&
            event.target.closest(".growth-tour"))
        )
          return;
        if (collection || event.altKey || event.metaKey || event.ctrlKey)
          return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(index - 1);
        }
      }}
    >
      <header className="discovery-header">
        <DialogTitle className="text-base font-medium">
          Your Discovery Queue
        </DialogTitle>
        <button
          className="min-h-10 text-sm text-muted-foreground underline underline-offset-4"
          onClick={() => setCollection("help")}
        >
          Learn More
        </button>
      </header>
      <DialogDescription className="sr-only">
        Browse twelve sample games with the previous and next buttons or the
        left and right arrow keys. Video content is represented by a neutral
        placeholder.
      </DialogDescription>
      <div className="discovery-stage">
        <div className="discovery-slide">
          {collection ? (
            <section className="discovery-collection">
              <Button
                variant="ghost"
                className="mb-6"
                onClick={() => {
                  setCollection(null);
                  heading.current?.focus();
                }}
              >
                <ArrowLeft aria-hidden="true" />
                Back to {complete ? "summary" : "queue"}
              </Button>
              <h2
                ref={heading}
                tabIndex={-1}
                className="text-2xl font-semibold"
              >
                {collectionTitle}
              </h2>
              {collection === "stickers" ? (
                <>
                  <p className="mt-3 text-muted-foreground">
                    You've earned all 3 Autumn Sale 2026 stickers!
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="grid h-32 w-24 place-items-center rounded-md border border-input bg-surface-raised"
                      >
                        <span
                          className={cn(
                            "size-8 border border-foreground",
                            i === 0 && "rounded-full",
                            i === 1 && "rotate-45",
                          )}
                        />
                        <span className="sr-only">Sticker {i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Sample rewards for this wireframe.
                  </p>
                </>
              ) : collection === "wishlist" || collection === "ignored" ? (
                <ul className="mt-6 space-y-3">
                  {[...(collection === "wishlist" ? wishlist : ignored)].map(
                    (i) => (
                      <li
                        key={i}
                        className="rounded-md border border-border p-4"
                      >
                        {games[i].title}
                      </li>
                    ),
                  )}
                  {(collection === "wishlist" ? wishlist : ignored).size ===
                    0 && (
                    <li className="text-muted-foreground">
                      No games here yet.
                    </li>
                  )}
                </ul>
              ) : (
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  {collection === "store"
                    ? "Store page placeholder. This experiment focuses on browsing the queue and reaching its reward screen."
                    : "Explore games, save favourites to your wishlist, or ignore titles that don’t interest you. Advance through the queue to reach the summary. Games, video playback, rewards, and statistics are local demonstration content."}
                </p>
              )}
            </section>
          ) : (
            <div key={round} className="discovery-track">
              {games.map((game, gameIndex) => (
                <div
                  key={gameIndex}
                  className="discovery-panel"
                  style={cardPosition(gameIndex - index)}
                  ref={index === gameIndex ? slide : undefined}
                  inert={index !== gameIndex}
                  aria-hidden={index !== gameIndex}
                  data-active={index === gameIndex}
                >
                  <article
                    className="discovery-game"
                    aria-label={`${game.title}, game ${gameIndex + 1} of ${queueLength}`}
                  >
                    <div className="discovery-video">
                      <p className="absolute left-5 top-4 text-sm text-muted-foreground">
                        Trailer preview · {game.title}
                      </p>
                      <div className="text-center text-muted-foreground">
                        <Film
                          className="mx-auto mb-4 size-12"
                          strokeWidth={1}
                          aria-hidden="true"
                        />
                        <p>Video placeholder</p>
                      </div>
                      <div className="absolute inset-x-4 bottom-4 flex items-center gap-3">
                        <Button
                          variant="secondary"
                          size="icon"
                          aria-label={
                            playing
                              ? "Pause trailer preview"
                              : "Play trailer preview"
                          }
                          onClick={() => setPlaying(!playing)}
                        >
                          {playing ? (
                            <Pause aria-hidden="true" />
                          ) : (
                            <Play aria-hidden="true" />
                          )}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {playing ? "Autoplay · muted" : "Paused"}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          16:9
                        </span>
                      </div>
                    </div>
                    <div
                      className="growth-scope discovery-details text-card-foreground"
                      {...(index === gameIndex
                        ? growthTarget({
                            id: "steam-recommendation",
                            title: "Personalized discovery",
                            description:
                              "The relevance explanation gives a reason to consider this game. Wishlist and ignore capture a preference with little effort, while visible progress makes the twelve-game sequence finite. The blue trailer is product content; the yellow panel supports the growth action.",
                            order: 3,
                          })
                        : {})}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="h-24 w-16 shrink-0 rounded-sm border border-input bg-surface-sunken"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <h2
                            ref={index === gameIndex ? heading : undefined}
                            tabIndex={-1}
                            className="text-xl font-semibold sm:text-2xl"
                          >
                            {game.title}
                          </h2>
                          <p className="mt-4 text-sm text-muted-foreground">
                            Game details
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {game.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm">
                        {gameIndex === 0
                          ? "Overwhelmingly Positive"
                          : gameIndex === 1
                            ? "Mostly Positive"
                            : "Player reviews"}
                      </p>
                      <div className="text-sm leading-relaxed">
                        <h3 className="font-medium">
                          Why this game is relevant to you:
                        </h3>
                        <p className="mt-2 flex gap-2 text-muted-foreground">
                          <Check
                            className="mt-1 size-4 shrink-0"
                            aria-hidden="true"
                          />
                          Similar to games you've played
                        </p>
                        <div className="mt-4 space-y-2" aria-hidden="true">
                          <div className="h-2 w-full bg-border-subtle" />
                          <div className="h-2 w-5/6 bg-border-subtle" />
                          <div className="h-2 w-2/3 bg-border-subtle" />
                        </div>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <Button
                          className="min-w-32 flex-1"
                          onClick={() => setCollection("store")}
                        >
                          View store page
                        </Button>
                        <Button
                          size="icon"
                          variant={
                            wishlist.has(gameIndex) ? "default" : "secondary"
                          }
                          aria-label="Add to wishlist"
                          aria-pressed={wishlist.has(gameIndex)}
                          onClick={() => toggle("wishlist")}
                        >
                          <Star
                            aria-hidden="true"
                            fill={
                              wishlist.has(gameIndex) ? "currentColor" : "none"
                            }
                          />
                        </Button>
                        <Button
                          size="icon"
                          variant={
                            ignored.has(gameIndex) ? "default" : "secondary"
                          }
                          aria-label="Ignore game"
                          aria-pressed={ignored.has(gameIndex)}
                          onClick={() => toggle("ignored")}
                        >
                          <Ban aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
              <div
                className="discovery-panel"
                style={cardPosition(queueLength - index)}
                ref={complete ? slide : undefined}
                inert={!complete}
                aria-hidden={!complete}
                data-active={complete}
              >
                <section className="discovery-completion">
                  <h2
                    ref={complete ? heading : undefined}
                    tabIndex={-1}
                    className="text-2xl font-semibold sm:text-3xl"
                  >
                    You've reached the end of this Discovery Queue
                  </h2>
                  <div
                    className="growth-scope discovery-reward text-foreground"
                    {...(complete
                      ? growthTarget({
                          id: "steam-completion-reward",
                          title: "Close the reward loop",
                          description:
                            "The completion state confirms the promised reward and makes it available to view. Session statistics acknowledge progress, and Continue offers another round. These are local demonstration rewards; no Steam stickers are granted.",
                          order: 4,
                        })
                      : {})}
                  >
                    <span className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-input bg-surface-sunken">
                      <Check className="size-7" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">
                        You've earned all 3 Autumn Sale 2026 stickers!
                      </h3>
                      <button
                        onClick={() => setCollection("stickers")}
                        className="min-h-10 text-sm underline underline-offset-4"
                      >
                        View your stickers
                      </button>
                    </div>
                  </div>
                  <section
                    className="w-full max-w-2xl"
                    aria-label="Queue statistics"
                  >
                    <h3 className="mb-4 text-sm text-muted-foreground">
                      Your lifetime discovery queue stats
                    </h3>
                    <dl className="discovery-stats">
                      <div>
                        <dt>Viewed</dt>
                        <dd>{viewed.size}</dd>
                        <span>Titles</span>
                      </div>
                      <div>
                        <dt>Wishlisted</dt>
                        <dd>{wishlist.size}</dd>
                        <button onClick={() => setCollection("wishlist")}>
                          View wishlist
                        </button>
                      </div>
                      <div>
                        <dt>Ignored</dt>
                        <dd>{ignored.size}</dd>
                        <button onClick={() => setCollection("ignored")}>
                          View ignored
                        </button>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Demo stats · this session only
                    </p>
                  </section>
                  <div className="flex gap-3">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="min-w-28"
                      >
                        Done
                      </Button>
                    </DialogClose>
                    <Button
                      variant="secondary"
                      className="growth-scope min-w-28 focus-visible:outline-ring-inverse"
                      onClick={() => {
                        setRound(round + 1);
                        move(0);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
        {!collection && (
          <>
            <Button
              className="discovery-arrow discovery-previous"
              size="icon"
              variant="secondary"
              disabled={index === 0}
              aria-label="Previous game"
              onClick={() => move(index - 1)}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            {!complete && (
              <Button
                className="discovery-arrow discovery-next"
                size="icon"
                variant="secondary"
                aria-label={
                  index === queueLength - 1 ? "Finish queue" : "Next game"
                }
                onClick={() => move(index + 1)}
              >
                <ChevronRight aria-hidden="true" />
              </Button>
            )}
          </>
        )}
      </div>
      <footer className="discovery-footer">
        <p className="sr-only" role="status">
          {complete
            ? "Queue complete"
            : `${game.title}. Game ${index + 1} of ${queueLength}`}
        </p>
        {!collection && !complete && (
          <>
            <nav
              className="growth-scope discovery-progress rounded-md border border-border bg-card text-card-foreground px-1"
              aria-label="Queue progress"
            >
              {games.map((item, i) => (
                <button
                  key={i}
                  className="discovery-dot"
                  aria-label={`Game ${i + 1}: ${item.title}`}
                  aria-current={index === i ? "step" : undefined}
                  onClick={() => move(i)}
                >
                  <span data-visited={viewed.has(`${round}-${i}`)} />
                </button>
              ))}
            </nav>
            <span className="text-xs text-muted-foreground">
              {index + 1} / {queueLength}
            </span>
          </>
        )}
      </footer>
    </DialogContent>
  );
}
