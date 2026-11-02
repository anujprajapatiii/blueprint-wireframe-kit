import { useSyncExternalStore } from "react";

export type SiteView = "experiments" | "guide" | "kit";
export type KitSection = "components" | "foundations" | "usage";

// Keep the original component anchors reachable from bookmarks and shared links.
export const componentAnchors = new Set([
  "buttons",
  "form",
  "card",
  "input",
  "select",
  "textarea",
  "checkbox",
  "radio",
  "switch",
  "tabs",
  "accordion",
  "dialog",
  "badge",
  "avatar",
  "dropdown",
  "slider",
  "progress",
  "tooltip",
  "alert",
  "toast",
  "popover",
  "table",
  "breadcrumb",
  "pagination",
  "skeleton",
  "empty",
  "placeholder",
  "typography",
  "separator",
  "validation",
]);

export function resolveSiteView(search: string, hash: string): SiteView {
  const params = new URLSearchParams(search);
  const view = params.get("view");
  if (view === "experiments" || view === "guide" || view === "kit") return view;
  if (
    view ||
    params.has("experiment") ||
    params.has("collection") ||
    params.has("tool")
  ) {
    return "experiments";
  }
  if (hash === "#growth" || hash.startsWith("#growth-category-"))
    return "guide";
  const anchor = hash.slice(1);
  if (
    ["components", "foundations", "usage"].includes(anchor) ||
    componentAnchors.has(anchor)
  ) {
    return "kit";
  }
  return "experiments";
}

export function resolveKitSection(hash: string): KitSection {
  if (hash === "#foundations") return "foundations";
  if (hash === "#usage") return "usage";
  return "components";
}

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

export function useSiteLocation() {
  const href = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.href,
  );
  return new URL(href);
}
