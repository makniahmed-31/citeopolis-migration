import type { FeatureManifest } from "@/lib/autoloader";

/**
 * News page manifest (template-side).
 *
 * Blocks are registered automatically from the installed @packages/news
 * package via the virtual module in vite-plugin-modules.ts.
 *
 * This file only declares the page component — the detail view rendered
 * when the GraphQL router returns a "News" typename.
 */
const manifest: FeatureManifest = {
  slug: "news",
  pages: {
    News: () =>
      import("../../pages/news/NewsPage") as Promise<{
        default: React.ComponentType<{ url: string }>;
      }>,
  },
};

export default manifest;
