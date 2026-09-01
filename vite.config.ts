import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
// Security note: NEVER read GEMINI_API_KEY here with a VITE_ prefix.
// Any env var prefixed VITE_ gets bundled into client JS and shipped to the
// browser. The Gemini key stays server-side only (see /functions/gemini-proxy.ts)
// and is read via plain process.env there, never through import.meta.env.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards to the local Express server (server/index.ts) during
      // `npm run dev`. In production this path is served by whatever
      // backend you deploy functions/gemini-proxy.ts as (Cloud Function /
      // Cloud Run) — point your hosting rewrite at the same path.
      "/api": {
        target: "http://localhost:5174",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
});