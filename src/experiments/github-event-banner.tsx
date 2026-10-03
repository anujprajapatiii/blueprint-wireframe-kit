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
      <div className="h-5 w-24 rounded-sm bg-border-subtle" />
      <div className="space-y-8 rounded-md border border-border-subtle p-5">
        <div className="h-3 w-3/5 rounded-sm bg-border-subtle" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-sm bg-surface-sunken" />
          <div className="h-6 w-24 rounded-sm bg-surface-sunken" />
        </div>
      </div>
      {[0, 1].map((item) => (
        <div
          key={item}
          className="space-y-5 rounded-md border border-border-subtle p-5"
        >
          <div className="flex items-center gap-3">
            <div className="size-7 shrink-0 rounded-full bg-border-subtle" />
            <div className="h-3 w-1/2 rounded-sm bg-border-subtle" />
          </div>
          <div className="space-y-3 rounded-sm bg-surface-sunken p-4">
            <div className="h-3 w-4/5 rounded-sm bg-border-subtle" />
            <div className="h-3 w-3/5 rounded-sm bg-border-subtle" />
          </div>
        </div>
      ))}
    </div>
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
        className="hidden h-16 items-center justify-between gap-8 border-b border-border-subtle bg-surface-sunken px-6 md:flex"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-full bg-border-subtle" />
          <div className="h-3 w-24 rounded-sm bg-border-subtle" />
        </div>
        <div className="h-7 w-40 rounded-sm border border-border-subtle" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[minmax(0,1fr)_20rem] md:p-6 lg:grid-cols-[9rem_minmax(0,1fr)_20rem] lg:gap-8">
        <div
          className="hidden space-y-5 border-r border-border-subtle pr-6 lg:block"
          aria-hidden="true"
        >
          <div className="mb-8 h-3 w-3/4 rounded-sm bg-border-subtle" />
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-border-subtle" />
              <div className="h-2 flex-1 rounded-sm bg-border-subtle" />
            </div>
          ))}
        </div>

        <DashboardContext />

        <div className="mx-auto w-full max-w-80 md:mx-0">
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
        </div>
      </div>
    </main>
  );
}
