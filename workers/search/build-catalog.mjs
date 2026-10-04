import { build } from "esbuild";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const repo = fileURLToPath(new URL("../../", import.meta.url));
const bundled = await build({
  stdin: {
    contents:
      'import { experiments } from "./src/experiments/registry.ts"; import { buildSearchCatalog } from "./src/search/catalog.ts"; export default buildSearchCatalog(experiments);',
    resolveDir: repo,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
});
const { default: catalog } = await import(
  `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`
);
// Only this public projection enters the deployed Worker bundle.
await writeFile(
  new URL("./catalog.generated.json", import.meta.url),
  `${JSON.stringify(catalog, null, 2)}\n`,
);
console.log(`Prepared ${catalog.length} public search entries.`);
