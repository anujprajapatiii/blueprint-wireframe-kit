import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { localDesignPlugin } from "./scripts/local-design-plugin";
export default defineConfig({
  plugins: [react(), tailwindcss(), localDesignPlugin()],
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
  base: "/blueprint-wireframe-kit/",
});
