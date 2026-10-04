import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { localDesignPlugin } from "./scripts/local-design-plugin";
import { privateReferencePlugin } from "./scripts/private-reference-plugin";
import { curatorPlugin } from "./scripts/curator-plugin";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localDesignPlugin(),
    privateReferencePlugin(),
    curatorPlugin(),
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    // Workspace edits may arrive without native file events; keep local review current.
    watch: { usePolling: true, interval: 500 },
    fs: {
      // Keep Vite's default exclusions and prevent its static / @fs routes
      // from bypassing the allowlisted private-reference middleware.
      deny: [
        ".env",
        ".env.*",
        "*.{crt,pem}",
        "**/.git/**",
        "**/local-references/**",
        "**/local-curator/**",
      ],
    },
  },
  base: "/blueprint-wireframe-kit/",
});
