import { createHash } from "node:crypto";
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const workerDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(workerDirectory, "../..");
const sourceRoot = join(root, "local-references");
const outputParent = join(root, ".wrangler");
const dist = join(root, "dist");
const siteBase = "/blueprint-wireframe-kit";
const output = join(outputParent, "protected-site-assets");
const staging = join(
  outputParent,
  `protected-site-assets-staging-${process.pid}`,
);
const sourceFiles = JSON.parse(
  await readFile(join(workerDirectory, "source-files.json"), "utf8"),
);
const expectedCounts = { elevenlabs: 38, cloudflare: 13, tally: 8 };
const excludedKnownFiles = {
  elevenlabs: [
    "catalog.json",
    "coverage.json",
    "evidence-index.json",
    "elevenlabs-growth-patterns.csv",
    "elevenlabs-growth-patterns.html",
    "elevenlabs-growth-patterns-evidence.zip",
    "README.txt",
  ],
  cloudflare: ["provenance.json"],
  tally: [],
};

async function ordinaryDirectory(path) {
  const stat = await lstat(path);
  if (
    !stat.isDirectory() ||
    stat.isSymbolicLink() ||
    (await realpath(path)) !== path
  )
    throw new Error(`Expected a real directory: ${path}`);
}
function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

if (
  Object.keys(sourceFiles).sort().join(",") !==
  Object.keys(expectedCounts).sort().join(",")
)
  throw new Error(
    "Private reference source selection changed; review before uploading.",
  );
await ordinaryDirectory(root);
await ordinaryDirectory(sourceRoot);
const planned = [];
for (const [source, filenames] of Object.entries(sourceFiles)) {
  if (
    !Array.isArray(filenames) ||
    filenames.length !== expectedCounts[source] ||
    new Set(filenames).size !== filenames.length
  )
    throw new Error(`Unexpected private reference selection for ${source}.`);
  const sourceDirectory = join(sourceRoot, source);
  await ordinaryDirectory(sourceDirectory);
  const expectedEntries = new Set([
    ...filenames,
    ...excludedKnownFiles[source],
  ]);
  for (const entry of await readdir(sourceDirectory, { withFileTypes: true })) {
    if (
      !expectedEntries.has(entry.name) ||
      !entry.isFile() ||
      entry.isSymbolicLink()
    )
      throw new Error(`Unreviewed entry in ${source}; stop before uploading.`);
  }
  for (const filename of filenames) {
    if (
      typeof filename !== "string" ||
      !/^\d{2}-[a-z0-9-]+\.jpg$/.test(filename)
    )
      throw new Error(
        "Private references must use exact reviewed JPEG filenames.",
      );
    const path = join(sourceDirectory, filename);
    const stat = await lstat(path);
    if (
      !stat.isFile() ||
      stat.isSymbolicLink() ||
      (await realpath(path)) !== path
    )
      throw new Error(
        `Reference is not an ordinary source file: ${source}/${filename}`,
      );
    const bytes = await readFile(path);
    if (
      bytes.length < 4 ||
      bytes[0] !== 0xff ||
      bytes[1] !== 0xd8 ||
      bytes[2] !== 0xff
    )
      throw new Error(`Reference is not a JPEG: ${source}/${filename}`);
    planned.push({ source, filename, path, sha256: sha256(bytes) });
  }
}
if (planned.length !== 59)
  throw new Error("Expected exactly 59 authorized private originals.");
// The root frontend build must finish before this staging step.
await ordinaryDirectory(dist);
const siteFiles = [];
async function collectSite(directory, relative = "") {
  await ordinaryDirectory(directory);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (
      entry.isSymbolicLink() ||
      entry.name.startsWith(".") ||
      entry.name === "__private-references" ||
      !/^[a-zA-Z0-9_.-]+$/.test(entry.name)
    )
      throw new Error("Unexpected or linked entry in frontend output.");
    const path = join(directory, entry.name);
    const relativePath = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) await collectSite(path, relativePath);
    else if (entry.isFile()) {
      if (
        !/\.(html|js|css|svg|png|jpe?g|webp|gif|ico|mp4|webm|woff2?|ttf|otf)$/i.test(
          entry.name,
        )
      )
        throw new Error(`Unreviewed frontend asset type: ${relativePath}`);
      if ((await realpath(path)) !== path)
        throw new Error("Linked frontend file.");
      const bytes = await readFile(path);
      siteFiles.push({ path, relativePath, sha256: sha256(bytes) });
    } else throw new Error("Non-file entry in frontend output.");
  }
}
await collectSite(dist);
if (!siteFiles.some(({ relativePath }) => relativePath === "index.html"))
  throw new Error("Build the frontend before staging the protected website.");
await mkdir(outputParent, { recursive: true });
await ordinaryDirectory(outputParent);
try {
  await mkdir(staging);
  for (const item of planned) {
    const directory = join(
      staging,
      "blueprint-wireframe-kit",
      "__private-references",
      item.source,
    );
    await mkdir(directory, { recursive: true });
    const destination = join(directory, item.filename);
    await copyFile(item.path, destination);
    if (sha256(await readFile(destination)) !== item.sha256)
      throw new Error(
        `Copy differs from original: ${item.source}/${item.filename}`,
      );
  }
  for (const item of siteFiles) {
    const destination = join(
      staging,
      "blueprint-wireframe-kit",
      item.relativePath,
    );
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(item.path, destination);
    if (sha256(await readFile(destination)) !== item.sha256)
      throw new Error(`Frontend copy differs: ${item.relativePath}`);
  }
  try {
    await ordinaryDirectory(output);
    await rm(output, { recursive: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await rename(staging, output);
  const allowlist = planned
    .map(
      ({ source, filename }) =>
        `${siteBase}/__private-references/${source}/${filename}`,
    )
    .sort();
  // Only source names and reviewed filenames enter the public Worker bundle.
  await writeFile(
    join(workerDirectory, "allowlist.json"),
    `${JSON.stringify(allowlist, null, 2)}\n`,
  );
  await writeFile(
    join(workerDirectory, "site-allowlist.json"),
    `${JSON.stringify(siteFiles.map(({ relativePath }) => `${siteBase}/${relativePath}`).sort(), null, 2)}\n`,
  );
  process.stdout.write(
    `Prepared ${siteFiles.length} website files and ${planned.length} byte-identical originals behind the website password.\n`,
  );
} finally {
  await rm(staging, { recursive: true, force: true });
}
