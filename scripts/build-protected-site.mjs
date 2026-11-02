import { spawnSync } from "node:child_process";
const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    VITE_PRIVATE_REFERENCES_ENABLED: "true",
    VITE_SEARCH_API_URL: "/search",
  },
});
if (result.status !== 0) process.exit(result.status ?? 1);
const assets = spawnSync(
  process.execPath,
  ["workers/references/build-assets.mjs"],
  { stdio: "inherit" },
);
process.exit(assets.status ?? 1);
