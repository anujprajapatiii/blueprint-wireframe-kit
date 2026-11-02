import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { resolveSiteView, useSiteLocation } from "./site-navigation";
const App = React.lazy(() => import("./App"));
const GrowthGuidePage = React.lazy(() => import("./growth/guide-page"));
const ExperimentsApp = React.lazy(() =>
  import("./experiments/app").then((module) => ({
    default: module.ExperimentsApp,
  })),
);

function Site() {
  const location = useSiteLocation();
  const view = resolveSiteView(location.search, location.hash);
  if (view === "kit") return <App />;
  if (view === "guide") return <GrowthGuidePage />;
  return <ExperimentsApp />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <main className="p-8 text-muted-foreground" aria-busy="true">
          Loading Blueprint…
        </main>
      }
    >
      <Site />
    </React.Suspense>
  </React.StrictMode>,
);
if (import.meta.env.DEV && new URLSearchParams(location.search).has("audit"))
  void import("./audit");
