import { mkdir, writeFile, rm } from "node:fs/promises";
const origin = "https://blueprint-private-references.portfolio-v5.workers.dev";
// Pages contains only this pointer. No app bundle or original reference is copied.
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>Blueprint has moved</title></head><body><p>Blueprint is now password protected.</p><a href="${origin}/blueprint-wireframe-kit/">Open Blueprint</a><script>location.replace(${JSON.stringify(origin)}+location.pathname+location.search+location.hash)</script></body></html>`;
await rm("pages-redirect", { recursive: true, force: true });
await mkdir("pages-redirect");
for (const file of ["index.html", "404.html"])
  await writeFile(`pages-redirect/${file}`, html);
await writeFile("pages-redirect/.nojekyll", "");
console.log(
  "Prepared the GitHub Pages redirect only; no website or reference assets are included.",
);
