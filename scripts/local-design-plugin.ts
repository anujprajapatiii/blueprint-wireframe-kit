import { rename, unlink, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { validateSteamDesign } from "../src/experiments/steam-tuning-schema";

// Development only, loopback only, same-origin only, one allowlisted JSON file.
export function localDesignPlugin(): Plugin {
  const file = fileURLToPath(
    new URL(
      "../src/experiments/steam-growth-banners.config.json",
      import.meta.url,
    ),
  );
  validateSteamDesign(JSON.parse(readFileSync(file, "utf8")));
  return {
    name: "blueprint-local-design",
    apply: "serve",
    configureServer(server) {
      const route = `${server.config.base}__blueprint/tuning/steam-growth-banners`;
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.split("?")[0] !== route) return next();
        response.setHeader("Content-Type", "application/json");
        response.setHeader("Cache-Control", "no-store");
        function send(code: number, message: string) {
          response.statusCode = code;
          response.end(JSON.stringify({ message }));
        }
        if (request.method !== "POST") {
          response.setHeader("Allow", "POST");
          return send(405, "Use Save to project in the local editor.");
        }
        let origin: URL;
        try {
          origin = new URL(request.headers.origin ?? "");
        } catch {
          return send(403, "A local preview origin is required.");
        }
        if (
          origin.protocol !== "http:" ||
          !["127.0.0.1", "localhost", "[::1]"].includes(origin.hostname) ||
          origin.host !== request.headers.host ||
          request.headers["x-blueprint-design"] !== "1"
        )
          return send(403, "Only the local preview can save settings.");
        if (!request.headers["content-type"]?.startsWith("application/json"))
          return send(415, "Expected JSON settings.");
        try {
          let body = "";
          for await (const chunk of request) {
            body += chunk.toString();
            if (Buffer.byteLength(body) > 8192)
              return send(413, "Settings are too large.");
          }
          const settings = validateSteamDesign(JSON.parse(body));
          const temporary = `${file}.${randomUUID()}.tmp`;
          try {
            await writeFile(
              temporary,
              `${JSON.stringify(settings, null, 2)}\n`,
              "utf8",
            );
            await rename(temporary, file);
          } finally {
            await unlink(temporary).catch(() => {});
          }
          send(200, "Saved to project. Ready for local review.");
        } catch (error) {
          send(
            400,
            error instanceof Error ? error.message : "Could not save settings.",
          );
        }
      });
    },
  };
}
