// Publishing requires a configured live API; a static build alone cannot run Jev.
const configured = process.env.VITE_SEARCH_API_URL?.trim();
let endpoint;
try {
  endpoint = new URL(configured);
  if (
    endpoint.protocol !== "https:" ||
    endpoint.username ||
    endpoint.password ||
    endpoint.search ||
    endpoint.hash ||
    endpoint.pathname !== "/search"
  )
    throw new Error();
} catch {
  throw new Error(
    "Set JEV_SEARCH_API_URL to the deployed HTTPS /search endpoint before publishing.",
  );
}

const response = await fetch(`${endpoint.href}/status`, {
  headers: { Origin: "https://anujprajapatiii.github.io" },
  signal: AbortSignal.timeout(15_000),
  redirect: "error",
});
if (!response.ok || !(await response.json()).configured) {
  throw new Error(
    "The hosted Jev API is not configured. Connect its server-side secret before publishing.",
  );
}
console.log("Hosted Jev Search is configured.");
