import { useEffect } from "react";
import { SiteHeader } from "../components/site-header";
import { GrowthReference } from "./reference";

export default function GrowthGuidePage() {
  useEffect(() => {
    document.title = "Growth guide — Blueprint";
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="?view=guide#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ behavior: "instant", block: "start" });
        }}
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader active="guide" />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-[1440px] scroll-mt-36 px-5 py-8 sm:px-8"
      >
        <GrowthReference headingLevel={1} />
      </main>
    </div>
  );
}
