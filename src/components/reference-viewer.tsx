import { useState, type ReactNode } from "react";
import { ArrowUpRight, ImageOff, Maximize2, RotateCcw } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  cn,
} from "./kit";
import {
  referenceAssetUrl,
  type ReferenceAsset,
} from "../experiments/reference-manifest";

type ViewableReference = ReferenceAsset & {
  private?: boolean;
  width?: number;
  height?: number;
};

export function referenceIsAvailable(asset: ViewableReference) {
  return !asset.private || import.meta.env.DEV;
}

/** Keeps account captures local while public experiment references remain usable. */
export function ReferencePreview({
  asset,
  className,
}: {
  asset: ViewableReference;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!referenceIsAvailable(asset) || failed) {
    return (
      <div
        className={cn(
          "flex h-full min-h-40 flex-col items-center justify-center gap-3 bg-surface-deep p-6 text-center text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="size-6" aria-hidden="true" />
        <span className="text-sm">
          {failed
            ? "Reference unavailable"
            : "Reference available in the local library"}
        </span>
      </div>
    );
  }
  return (
    <img
      src={referenceAssetUrl(
        asset.kind === "video" && asset.poster ? asset.poster : asset.src,
      )}
      alt={asset.alt ?? asset.title}
      width={asset.width}
      height={asset.height}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-contain", className)}
    />
  );
}

function ReferenceMedia({
  asset,
  originalSize = false,
}: {
  asset: ViewableReference;
  originalSize?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  if (!referenceIsAvailable(asset)) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
        <ImageOff className="size-7 text-muted-foreground" aria-hidden="true" />
        <p className="font-medium">Reference available in the local library</p>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          This account capture is kept out of the published site. The wireframe
          and study notes remain available here.
        </p>
      </div>
    );
  }
  if (failed) {
    return (
      <div
        className="flex min-h-56 flex-col items-center justify-center gap-3 px-6 py-12 text-center"
        role="alert"
      >
        <p className="font-medium">The reference couldn’t load</p>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Its description and study notes are still available.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setFailed(false);
            setAttempt((value) => value + 1);
          }}
        >
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
      </div>
    );
  }
  const src = referenceAssetUrl(asset.src);
  return asset.kind === "video" ? (
    <video
      key={`${asset.id}-${attempt}`}
      controls
      playsInline
      preload="metadata"
      poster={asset.poster ? referenceAssetUrl(asset.poster) : undefined}
      aria-label={asset.title}
      onError={() => setFailed(true)}
      className="mx-auto h-auto max-h-[70dvh] w-full"
    >
      <source src={src} type="video/mp4" />
      Your browser cannot play this recording.
    </video>
  ) : (
    <img
      key={`${asset.id}-${attempt}`}
      src={src}
      alt={asset.alt ?? asset.title}
      width={asset.width}
      height={asset.height}
      onError={() => setFailed(true)}
      className={cn(
        "mx-auto h-auto max-w-full",
        originalSize ? "w-auto" : "max-h-[70dvh] w-full object-contain",
      )}
    />
  );
}

export function ReferenceImageDialog({
  asset,
  children,
}: {
  asset: ViewableReference;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[94dvh] w-[calc(100%_-_1rem)] max-w-[1700px] gap-4 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{asset.title}</DialogTitle>
          <DialogDescription>{asset.description}</DialogDescription>
        </DialogHeader>
        <div className="min-w-0 overflow-auto rounded-md border border-border bg-surface-deep">
          <ReferenceMedia asset={asset} originalSize />
        </div>
        {referenceIsAvailable(asset) && (
          <Button asChild variant="outline" className="justify-self-start">
            <a
              href={referenceAssetUrl(asset.src)}
              target="_blank"
              rel="noreferrer"
            >
              Open original file <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ReferenceViewer({ asset }: { asset: ViewableReference }) {
  return (
    <figure className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface-raised">
      <div className="flex min-h-48 items-center justify-center bg-surface-deep p-2 sm:p-4">
        <ReferenceMedia asset={asset} />
      </div>
      <figcaption className="flex flex-wrap items-start justify-between gap-4 border-t border-border p-4 sm:p-5">
        <div className="min-w-0 flex-1 basis-64">
          <h3 className="font-medium">{asset.title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {asset.description}
          </p>
        </div>
        {referenceIsAvailable(asset) && (
          <ReferenceImageDialog asset={asset}>
            <Button variant="outline" size="sm">
              <Maximize2 aria-hidden="true" />
              Enlarge<span className="sr-only"> {asset.title}</span>
            </Button>
          </ReferenceImageDialog>
        )}
      </figcaption>
    </figure>
  );
}
