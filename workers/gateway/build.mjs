import { copyFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('./', import.meta.url);
const output = new URL('../../.wrangler/generic-gateway/', import.meta.url);
const files = ['_worker.js', '_routes.json', '404.html'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of files) {
  await copyFile(new URL(file, source), new URL(file, output));
}
console.log(`Gateway staged: ${files.length} files in ${fileURLToPath(output)}`);
