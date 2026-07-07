import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rm } from "node:fs/promises";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  site: "https://turnkeyautomarketing.com",
  output: "static",
  trailingSlash: "ignore",
  redirects: {
    "/privacy": "/privacy-policy",
    "/terms": "/terms-of-service",
    "/terms-and-conditions": "/terms-of-service",
  },
  integrations: [
    react(),
    {
      name: "source-only-asset-cleanup",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          await rm(new URL("original-site-assets", dir), { recursive: true, force: true });
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
