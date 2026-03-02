import type { FeatureManifest } from "@/lib/autoloader";

/**
 * News feature manifest.
 *
 * Declares the block components and page components contributed by the news
 * feature. Discovered automatically by the autoloader — no manual registration
 * needed anywhere else.
 *
 * Future: this file moves to packages/news/src/manifest.ts when the feature
 * is extracted into a standalone workspace package.
 */
const manifest: FeatureManifest = {
  slug: "news",

  blocks: {
    // GraphQL typename "NewsBlock" → src/modules/news/blocks/NewsBlock.tsx
    NewsBlock: () =>
      import("./blocks/block") as Promise<{
        default: React.ComponentType<Record<string, unknown>>;
      }>,
  },

  pages: {
    // GraphQL route typename "News" → src/pages/news/NewsPage.tsx
    News: () =>
      import("../../pages/news/NewsPage") as Promise<{
        default: React.ComponentType<{ url: string }>;
      }>,
  },
};

export default manifest;
