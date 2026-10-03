import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const App = React.lazy(() => import("./App"));
const ExperimentsApp = React.lazy(() =>
  import("./experiments/app").then((module) => ({
    default: module.ExperimentsApp,
  })),
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <main className="p-8 text-muted-foreground" aria-busy="true">
          Loading blueprint…
        </main>
      }
    >
      {new URLSearchParams(location.search).get("view") === "experiments" ? (
        <ExperimentsApp />
      ) : (
        <App />
      )}
    </React.Suspense>
  </React.StrictMode>,
);
if (import.meta.env.DEV && new URLSearchParams(location.search).has("audit"))
  void import("./audit");
