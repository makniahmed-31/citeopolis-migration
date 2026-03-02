import type { FeatureManifest } from "@/lib/autoloader";

/**
 * Albums feature manifest.
 *
 * Future: this file moves to packages/albums/src/manifest.ts when the feature
 * is extracted into a standalone workspace package.
 */
const manifest: FeatureManifest = {
  slug: "albums",

  blocks: {
    // GraphQL typename "AlbumsBlock" → src/modules/albums/blocks/AlbumsBlock.tsx
    AlbumsBlock: () =>
      import("./blocks/block") as Promise<{
        default: React.ComponentType<Record<string, unknown>>;
      }>,
  },

  // No detail page for albums yet.
};

export default manifest;
