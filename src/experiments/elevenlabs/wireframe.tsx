import { lazy, Suspense } from "react";

import { activeElevenLabsIds, elevenLabsWireframeGroup } from "./metadata";

const components = {
  billing: lazy(() =>
    import("./billing").then((module) => ({
      default: module.BillingWireframe,
    })),
  ),
  voice: lazy(() =>
    import("./voice").then((module) => ({ default: module.VoiceWireframe })),
  ),
  creation: lazy(() =>
    import("./creation").then((module) => ({
      default: module.CreationWireframe,
    })),
  ),
  studio: lazy(() =>
    import("./studio").then((module) => ({ default: module.StudioWireframe })),
  ),
  platform: lazy(() =>
    import("./platform").then((module) => ({
      default: module.PlatformWireframe,
    })),
  ),
};

export const elevenWireframeIds = activeElevenLabsIds;

export function ElevenLabsWireframe({
  patternId,
  title,
}: {
  patternId: string;
  title: string;
}) {
  const group = elevenLabsWireframeGroup(patternId);
  if (!group) return <p className="p-6">Wireframe not found.</p>;
  const Component = components[group];
  return (
    <main id="main-content" className="min-h-dvh min-w-0 bg-background">
      <h1 className="sr-only">{title}</h1>
      <Suspense
        fallback={
          <p role="status" className="p-6 text-sm text-muted-foreground">
            Loading wireframe…
          </p>
        }
      >
        <Component key={patternId} patternId={patternId} />
      </Suspense>
    </main>
  );
}
