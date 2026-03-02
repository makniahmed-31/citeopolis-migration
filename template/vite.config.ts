import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { modulesPlugin } from "./src/lib/vite-plugin-modules";
import { themePlugin } from "./src/lib/vite-plugin-theme";

// Active theme and site — set via .env or CLI env vars
const THEME = process.env.THEME ?? "base";
const SITE = process.env.SITE ?? "demo";

export default defineConfig({
  server: {
    // Listen on all interfaces so metropolis.localhost / base.localhost
    // resolve correctly on WSL2 without mirrored networking mode.
    host: true,
    // Allow serving files from workspace packages outside the template root.
    fs: { allow: [".."] },
  },

  // Workspace packages are source-only (no build step). Their CJS dependencies
  // (swiper, usehooks-ts) must be listed here so Vite pre-bundles them on the
  // first cold start without requiring a reinstall to refresh the dep cache.
  optimizeDeps: {
    include: [
      "@packages/flash-info > swiper",
      "@packages/flash-info > usehooks-ts",
      "@packages/flash-info > clsx",
      "@packages/news > clsx",
      "@packages/albums > clsx",
    ],
  },

  plugins: [
    // TanStack Router file-based routing (auto-generates routeTree.gen.ts)
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    svgr({ include: /\.svg$/ }),
    // Block manifest discovery from installed @packages/* workspace packages
    modulesPlugin(__dirname),
    // Theme component resolution chain
    themePlugin({ theme: THEME, site: SITE }),
  ],

  resolve: {
    alias: {
      // Base alias — all src imports
      "@": path.resolve(__dirname, "./src"),
      // @theme → active theme directory (tokens, fonts)
      "@theme": path.resolve(__dirname, `./src/themes/${THEME}`),
      // @components → resolved by themePlugin at runtime;
      // this fallback points to base src/components
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  define: {
    __THEME__: JSON.stringify(THEME),
    __SITE__: JSON.stringify(SITE),
  },
});
