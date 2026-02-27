import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { themePlugin } from "./src/lib/vite-plugin-theme";

// Active theme and site — set via .env or CLI env vars
const THEME = process.env.THEME ?? "base";
const SITE = process.env.SITE ?? "demo";

export default defineConfig({
  plugins: [
    // TanStack Router file-based routing (auto-generates routeTree.gen.ts)
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    svgr({ include: /\.svg$/ }),
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
