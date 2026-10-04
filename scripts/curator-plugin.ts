import { randomUUID } from "node:crypto";
import {
  chmod,
  lstat,
  mkdir,
  open,
  readFile,
  rename,
  unlink,
} from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { resolve } from "node:path";
import { loadEnv, type Plugin } from "vite";
import type { CuratorReport } from "../src/curator/contracts";
import {
  CuratorServiceError,
  evaluateCurator,
  validateCuratorInput,
} from "./curator-core";

const localHosts = new Set(["127.0.0.1", "localhost", "[::1]"]);
const bodyLimit = 64 * 1024;

class LocalRequestError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

function respond(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status;
  response.end(JSON.stringify(body));
}

function isLocalRequest(request: IncomingMessage, requireOrigin: boolean) {
  try {
    const host = new URL(`http://${request.headers.host ?? ""}`);
    const site = request.headers["sec-fetch-site"];
    if (
      !localHosts.has(host.hostname) ||
      host.host !== request.headers.host ||
      (site !== undefined && site !== "same-origin" && site !== "none")
    )
      return false;
    const origin = request.headers.origin;
    return origin ? new URL(origin).origin === host.origin : !requireOrigin;
  } catch {
    return false;
  }
}

function readJson(request: IncomingMessage): Promise<unknown> {
  if (
    request.headers["content-type"]?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    throw new LocalRequestError(
      415,
      "json_required",
      "Send an application/json request.",
    );
  }
  if (
    request.headers["content-encoding"] &&
    request.headers["content-encoding"] !== "identity"
  ) {
    throw new LocalRequestError(
      415,
      "encoding_unsupported",
      "Compressed requests are not supported.",
    );
  }
  if (Number(request.headers["content-length"] ?? 0) > bodyLimit) {
    throw new LocalRequestError(
      413,
      "body_too_large",
      "Keep the reference notes below 64 KB.",
    );
  }

  return new Promise((resolveBody, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    const timeout = setTimeout(
      () =>
        fail(
          new LocalRequestError(
            408,
            "request_timeout",
            "The request took too long. Try again.",
          ),
        ),
      30_000,
    );
    function cleanup() {
      clearTimeout(timeout);
      request.removeListener("data", onData);
      request.removeListener("end", onEnd);
      request.removeListener("error", onError);
      request.removeListener("aborted", onError);
    }
    function fail(error: LocalRequestError) {
      cleanup();
      request.resume();
      reject(error);
    }
    function onError() {
      fail(
        new LocalRequestError(
          400,
          "request_interrupted",
          "The request was interrupted. Try again.",
        ),
      );
    }
    function onData(chunk: Buffer | string) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.byteLength;
      if (size > bodyLimit) {
        fail(
          new LocalRequestError(
            413,
            "body_too_large",
            "Keep the reference notes below 64 KB.",
          ),
        );
      } else {
        chunks.push(buffer);
      }
    }
    function onEnd() {
      cleanup();
      try {
        resolveBody(
          JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown,
        );
      } catch {
        reject(
          new LocalRequestError(
            400,
            "invalid_json",
            "The request must contain valid JSON.",
          ),
        );
      }
    }
    request.on("data", onData);
    request.on("end", onEnd);
    request.on("error", onError);
    request.on("aborted", onError);
  });
}

async function assertRegularFile(path: string) {
  try {
    const stat = await lstat(path);
    if (!stat.isFile() || stat.isSymbolicLink())
      throw new Error("Unsafe local file.");
  } catch (error) {
    if (!(
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ))
      throw error;
  }
}

async function atomicPrivateWrite(path: string, contents: string) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  try {
    const handle = await open(temporary, "wx", 0o600);
    try {
      await handle.writeFile(contents, "utf8");
      await handle.sync();
    } finally {
      await handle.close();
    }
    await rename(temporary, path);
  } finally {
    await unlink(temporary).catch(() => {});
  }
}

async function saveCredential(directory: string, value: unknown) {
  const key =
    value && typeof value === "object" && "apiKey" in value
      ? value.apiKey
      : null;
  if (
    typeof key !== "string" ||
    !key.trim() ||
    key.length > 1024 ||
    /[\x00-\x20\x7f]/.test(key)
  ) {
    throw new LocalRequestError(
      400,
      "invalid_key",
      "Paste a single API key without spaces or line breaks.",
    );
  }
  // Choose a literal dotenv delimiter; credentials are never evaluated as code.
  // Escape expansion markers because Vite expands dollar signs in env values.
  const quote = ["'", "`", '"'].find((candidate) => !key.includes(candidate));
  if (!quote || (quote === '"' && /\\[nr]/.test(key))) {
    throw new LocalRequestError(
      400,
      "invalid_key",
      "This key contains unsupported quotation characters.",
    );
  }
  const encoded = `${quote}${key.replaceAll("$", "\\$")}${quote}`;
  const path = resolve(directory, ".env.local");
  await assertRegularFile(path);
  let previous = "";
  try {
    previous = await readFile(path, "utf8");
  } catch (error) {
    if (!(
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ))
      throw error;
  }
  // Replace existing assignments (including quoted multiline values), preserving
  // every unrelated env setting and comment. Avoid duplicate stale credentials.
  const assignment =
    /^[\t ]*(?:export[\t ]+)?TYPESAFE_API_KEY[\t ]*=[\t ]*(?:'[^']*'|"(?:[^"\\]|\\.)*"|`[^`]*`|[^\r\n]*)[^\r\n]*(?:\r?\n|$)/gm;
  const remaining = previous.replace(assignment, "");
  await atomicPrivateWrite(
    path,
    `${remaining}${remaining && !remaining.endsWith("\n") ? "\n" : ""}TYPESAFE_API_KEY=${encoded}\n`,
  );
  // An explicitly connected key replaces a inherited env value for this session.
  process.env.TYPESAFE_API_KEY = key;
}

async function privateDirectory(path: string) {
  try {
    await mkdir(path, { mode: 0o700 });
  } catch (error) {
    if (!(
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "EEXIST"
    ))
      throw error;
  }
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink())
    throw new Error("Unsafe review directory.");
  await chmod(path, 0o700);
}

async function saveReview(root: string, report: CuratorReport) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      report.id,
    )
  ) {
    throw new Error("Invalid review ID.");
  }
  const directory = resolve(root, "local-curator");
  const reviews = resolve(directory, "reviews");
  await privateDirectory(directory);
  await privateDirectory(reviews);
  const json = resolve(reviews, `${report.id}.json`);
  const markdown = resolve(reviews, `${report.id}.md`);
  try {
    await atomicPrivateWrite(json, `${JSON.stringify(report, null, 2)}\n`);
    await atomicPrivateWrite(markdown, report.briefMarkdown);
  } catch (error) {
    await Promise.all([
      unlink(json).catch(() => {}),
      unlink(markdown).catch(() => {}),
    ]);
    throw error;
  }
}

/** Local agent workbench only: no build output or preview middleware. */
export function curatorPlugin(): Plugin {
  let reviewing = false;
  let connecting = false;
  return {
    name: "blueprint-curator",
    apply: "serve",
    configureServer(server) {
      const route = `${server.config.base}__curator/`;
      const environmentDirectory = server.config.envDir || server.config.root;
      // This credential is read for every request. Vite's normal env-file
      // restart would discard unsaved intake notes when Connect saves the key.
      // Leave other env files and all source/config watching unchanged.
      server.watcher.unwatch(resolve(environmentDirectory, ".env.local"));
      function configuration() {
        // Read on each request so a newly supplied .env.local is picked up.
        const environment = loadEnv(
          server.config.mode,
          environmentDirectory,
          "TYPESAFE_",
        );
        return {
          key: environment.TYPESAFE_API_KEY?.trim() ?? "",
          model: environment.TYPESAFE_MODEL?.trim() || "jev-latest",
        };
      }
      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split("?")[0] ?? "";
        if (!pathname.startsWith(route)) return next();
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.setHeader("Cache-Control", "private, no-store");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
        response.setHeader("Referrer-Policy", "no-referrer");
        response.removeHeader("Access-Control-Allow-Origin");
        response.removeHeader("Access-Control-Allow-Credentials");
        try {
          if (!isLocalRequest(request, request.method === "POST")) {
            throw new LocalRequestError(
              403,
              "local_origin_required",
              "Use the curator from this local preview.",
            );
          }
          const endpoint = pathname.slice(route.length);
          if (!["status", "connect", "review"].includes(endpoint)) {
            throw new LocalRequestError(
              404,
              "not_found",
              "Curator endpoint not found.",
            );
          }
          const method = endpoint === "status" ? "GET" : "POST";
          if (request.method !== method) {
            response.setHeader("Allow", method);
            throw new LocalRequestError(
              405,
              "method_not_allowed",
              `Use ${method} for this request.`,
            );
          }
          if (endpoint === "status") {
            const config = configuration();
            return respond(response, 200, {
              configured: Boolean(config.key),
              model: config.model,
            });
          }
          const body = await readJson(request);
          if (endpoint === "connect") {
            if (connecting)
              throw new LocalRequestError(
                409,
                "connect_in_progress",
                "A key is already being saved. Try again shortly.",
              );
            connecting = true;
            try {
              await saveCredential(environmentDirectory, body);
            } catch (error) {
              if (error instanceof LocalRequestError) throw error;
              throw new LocalRequestError(
                500,
                "key_save_failed",
                "The key could not be saved locally. Check the project's file permissions.",
              );
            } finally {
              connecting = false;
            }
            return respond(response, 200, {
              configured: true,
              model: configuration().model,
            });
          }
          let input;
          try {
            input = validateCuratorInput(body);
          } catch {
            throw new LocalRequestError(
              400,
              "invalid_input",
              "Add a title, source, and valid reference observations before reviewing.",
            );
          }
          const config = configuration();
          if (!config.key)
            throw new LocalRequestError(
              503,
              "key_required",
              "Connect your TypeSafe API key to review this reference.",
            );
          if (reviewing)
            throw new LocalRequestError(
              409,
              "review_in_progress",
              "A review is already running. Wait for it to finish.",
            );
          reviewing = true;
          try {
            const report = await evaluateCurator(
              input,
              config.key,
              config.model,
            );
            try {
              await saveReview(server.config.root, report);
            } catch {
              throw new LocalRequestError(
                500,
                "review_save_failed",
                "The review completed, but its local record could not be saved. Check folder permissions before retrying.",
              );
            }
            respond(response, 200, report);
          } finally {
            reviewing = false;
          }
        } catch (error) {
          if (
            error instanceof LocalRequestError ||
            error instanceof CuratorServiceError
          ) {
            return respond(response, error.status, {
              error: error.message,
              code: error.code,
            });
          }
          // Provider responses and exceptions may include sensitive request data.
          // Only deliberate, allowlisted errors can cross this boundary.
          respond(response, 502, {
            error:
              "The curator could not complete this review. Check your key and connection, then try again.",
            code: "review_failed",
          });
        }
      });
    },
  };
}
