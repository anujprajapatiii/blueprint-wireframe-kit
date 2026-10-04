import { readFile, realpath } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";

const screenshotFiles = [
  "01-home.jpg",
  "02-speech-settings.jpg",
  "03-model-selection.jpg",
  "04-account-upgrade.jpg",
  "05-plans-monthly.jpg",
  "06-plans-yearly.jpg",
  "07-annual-upgrade-intercept.jpg",
  "08-upgrade-confirmation.jpg",
  "09-basic-seats-invite.jpg",
  "10-create-voice-pathways.jpg",
  "11-voice-design-starters.jpg",
  "12-instant-clone-onboarding.jpg",
  "13-voice-library-discovery.jpg",
  "14-studio-inspirations.jpg",
  "15-studio-template-project.jpg",
  "16-studio-sharing.jpg",
  "17-studio-export-options.jpg",
  "18-flows-feature-intro.jpg",
  "19-music-discovery.jpg",
  "20-sound-effects-starters.jpg",
  "21-image-video-entry.jpg",
  "22-image-video-discovery.jpg",
  "23-dubbing-launch.jpg",
  "24-audiobook-pathways.jpg",
  "25-audiobook-setup.jpg",
  "26-publish-to-reader.jpg",
  "27-transcription-setup.jpg",
  "28-creative-chat-entry.jpg",
  "29-voice-earnings-entry.jpg",
  "30-voice-supply-opportunities.jpg",
  "31-affiliate-program.jpg",
  "32-platform-switcher.jpg",
  "33-agents-get-started.jpg",
  "34-developer-quickstart.jpg",
  "35-api-credit-topup.jpg",
  "36-api-auto-topup.jpg",
  "37-api-plan-ladder.jpg",
  "38-agents-plan-ladder.jpg",
];

const downloads = new Map([
  ["catalog.json", "application/json"],
  ["coverage.json", "application/json"],
  ["evidence-index.json", "application/json"],
  ["elevenlabs-growth-patterns.csv", "text/csv; charset=utf-8"],
  ["elevenlabs-growth-patterns.html", "text/html; charset=utf-8"],
  ["elevenlabs-growth-patterns-evidence.zip", "application/zip"],
  ["README.txt", "text/plain; charset=utf-8"],
]);
const screenshots = new Set(screenshotFiles);
const localHosts = new Set(["127.0.0.1", "localhost", "[::1]"]);

/**
 * Authenticated research media is local-only. Nothing is emitted by a build,
 * and configurePreview deliberately has no equivalent middleware.
 * Restore missing originals from the authorized saved research archive into
 * local-references/elevenlabs; never fetch authenticated assets automatically.
 */
export function privateReferencePlugin(): Plugin {
  return {
    name: "blueprint-private-references",
    apply: "serve",
    configureServer(server) {
      const route = `${server.config.base}__private-references/`;
      const collectionRoute = `${route}elevenlabs/`;
      const directory = resolve(
        server.config.root,
        "local-references/elevenlabs",
      );

      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split("?")[0] ?? "";
        if (!pathname.startsWith(route)) return next();

        response.setHeader("Cache-Control", "private, no-store");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
        response.setHeader("Referrer-Policy", "no-referrer");
        function send(code: number, message: string) {
          response.statusCode = code;
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
          response.end(request.method === "HEAD" ? undefined : message);
        }

        if (request.method !== "GET" && request.method !== "HEAD") {
          response.setHeader("Allow", "GET, HEAD");
          return send(405, "Private references are read-only.");
        }

        try {
          const host = new URL(`http://${request.headers.host ?? ""}`);
          if (!localHosts.has(host.hostname))
            return send(403, "Private references are available locally only.");
          const origin = request.headers.origin;
          if (origin && new URL(origin).origin !== host.origin)
            return send(403, "Private references require the local origin.");
          if (request.headers["sec-fetch-site"] === "cross-site")
            return send(403, "Private references require the local origin.");
        } catch {
          return send(403, "Private references require the local origin.");
        }

        // Exact unencoded filenames only: no traversal, nested paths, listing,
        // or new file access merely because something is copied to this folder.
        const filename = pathname.startsWith(collectionRoute)
          ? pathname.slice(collectionRoute.length)
          : "";
        if (!screenshots.has(filename) && !downloads.has(filename))
          return send(404, "Reference not found.");

        try {
          const actualDirectory = await realpath(directory);
          const file = await realpath(resolve(directory, filename));
          if (dirname(file) !== actualDirectory)
            return send(404, "Reference not found.");
          const body = await readFile(file);
          response.setHeader(
            "Content-Type",
            screenshots.has(filename) ? "image/jpeg" : downloads.get(filename)!,
          );
          response.setHeader("Content-Length", body.byteLength);
          if (downloads.has(filename)) {
            response.setHeader(
              "Content-Disposition",
              `attachment; filename="${filename}"`,
            );
            response.setHeader("Content-Security-Policy", "sandbox");
          }
          response.end(request.method === "HEAD" ? undefined : body);
        } catch {
          send(404, "Reference unavailable on this device.");
        }
      });
    },
  };
}
