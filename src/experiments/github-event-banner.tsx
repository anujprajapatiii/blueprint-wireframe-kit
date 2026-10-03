import { useEffect, useRef, useState } from "react";
import { RotateCcw, X } from "lucide-react";
import {
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/kit";
import { ImagePlaceholder } from "../components/patterns";

function DashboardContext() {
  return (
    <div className="hidden min-w-0 space-y-6 md:block" aria-hidden="true">
      <h2 className="text-2xl font-semibold tracking-tight">Home</h2>
      <Card className="space-y-10 bg-surface-sunken p-5">
        <div className="h-3 w-3/5 rounded-sm bg-border-subtle" />
        <div className="flex gap-2">
          <div className="h-8 w-16 rounded-sm border border-border bg-card" />
          <div className="h-8 w-28 rounded-sm border border-border bg-card" />
        </div>
      </Card>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-8 flex-1 rounded-full border border-border bg-surface-sunken"
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Feed</h3>
        <div className="h-7 w-16 rounded-sm border border-border bg-surface-sunken" />
      </div>
      {[0, 1].map((item) => (
        <Card key={item} className="space-y-5 bg-surface-sunken p-5">
          <div className="flex items-center gap-3">
            <div className="size-7 shrink-0 rounded-full bg-border-subtle" />
            <div className="h-3 w-1/2 rounded-sm bg-border-subtle" />
          </div>
          <div className="space-y-3 rounded-sm border border-border-subtle bg-card p-4">
            <div className="h-3 w-4/5 rounded-sm bg-border-subtle" />
            <div className="h-3 w-3/5 rounded-sm bg-border-subtle" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function RepositoryContext() {
  return (
    <div
      className="hidden space-y-5 border-r border-border bg-surface-sunken px-5 py-8 lg:block"
      aria-hidden="true"
    >
      <h2 className="text-sm font-medium">Top repositories</h2>
      <div className="h-9 rounded-md border border-border bg-background" />
      {[0, 1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <div className="size-4 shrink-0 rounded-full bg-border-subtle" />
          <div className="h-2 flex-1 rounded-sm bg-border-subtle" />
        </div>
      ))}
    </div>
  );
}

function ChangelogContext() {
  return (
    <Card className="bg-surface-sunken p-5" aria-hidden="true">
      <h3 className="text-sm font-medium">Latest from our changelog</h3>
      <div className="mt-5 ml-1 space-y-5 border-l border-border pl-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="relative space-y-2">
            <div className="absolute top-0 -left-5 size-2 rounded-full bg-border" />
            <div className="h-2 w-16 rounded-sm bg-border-subtle" />
            <div className="h-2 w-full rounded-sm bg-border-subtle" />
            <div className="h-2 w-3/4 rounded-sm bg-border-subtle" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function GitHubEventBanner() {
  const [dismissed, setDismissed] = useState(false);
  const dismissRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLButtonElement>(null);
  const shouldMoveFocus = useRef(false);

  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    (dismissed ? restoreRef : dismissRef).current?.focus();
    shouldMoveFocus.current = false;
  }, [dismissed]);

  function changeVisibility(nextDismissed: boolean) {
    shouldMoveFocus.current = true;
    setDismissed(nextDismissed);
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <h1 className="sr-only">Event promotion wireframe</h1>
      <div
        className="flex h-16 items-center justify-between gap-8 border-b border-border bg-surface-deep px-4 md:px-6"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-full bg-border-subtle" />
          <span className="text-sm font-medium">Dashboard</span>
        </div>
        <div className="hidden h-8 w-48 rounded-md border border-border bg-surface-sunken sm:block" />
      </div>

      <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)]">
        <RepositoryContext />
        <div className="grid min-w-0 items-start gap-6 p-4 md:grid-cols-[minmax(0,1fr)_20rem] md:p-6 xl:gap-8 xl:p-8">
          <DashboardContext />

          <div className="mx-auto w-full max-w-80 space-y-4 md:mx-0">
            {dismissed ? (
              <div className="space-y-4 rounded-md border border-dashed border-border p-5">
                <p role="status" className="text-sm text-muted-foreground">
                  Event banner dismissed.
                </p>
                <Button
                  ref={restoreRef}
                  variant="outline"
                  className="w-full"
                  onClick={() => changeVisibility(false)}
                >
                  <RotateCcw aria-hidden="true" />
                  Restore banner
                </Button>
              </div>
            ) : (
              <Card className="overflow-hidden bg-surface-raised shadow-sm">
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    UNIVERSE’26
                  </h2>
                  <Button
                    ref={dismissRef}
                    variant="ghost"
                    size="icon"
                    aria-label="Dismiss event banner"
                    onClick={() => changeVisibility(true)}
                  >
                    <X aria-hidden="true" />
                  </Button>
                </div>

                <ImagePlaceholder
                  label="Event artwork"
                  className="aspect-[5/2] rounded-none border-x-0 border-y border-solid"
                />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-4 py-4 font-mono text-xs leading-5">
                  <span>OCT 28–29</span>
                  <span>SAN FRANCISCO, CA</span>
                </div>

                <p className="border-b border-border px-4 py-5 text-xl font-medium leading-7 tracking-tight">
                  Save $600 with Super Early Bird passes through July 8.
                </p>

                <div className="p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-control-comfortable w-full">
                        Register now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Registration preview</DialogTitle>
                        <DialogDescription>
                          The reference shows this banner only. The registration
                          destination and next steps weren’t provided.
                        </DialogDescription>
                      </DialogHeader>
                      <p className="text-sm leading-6 text-muted-foreground">
                        This wireframe ends at the registration handoff. No
                        registration has been made.
                      </p>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Back to banner</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            )}
            <ChangelogContext />
          </div>
        </div>
      </div>
    </main>
  );
}
