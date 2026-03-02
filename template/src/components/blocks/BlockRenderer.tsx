import { Suspense } from "react";
import type { BlockInterface } from "@/generated/graphql/graphql";
import { useFeatures } from "@/lib/theme";
import { blockRegistry } from "@/lib/autoloader";

/**
 * Renders a structuredContent array from the GraphQL API.
 *
 * Block components are discovered automatically from feature manifests
 * (src/modules\/*\/manifest.ts) via the autoloader — no manual registration
 * needed here. See src/lib/autoloader.ts for details.
 *
 * Feature filtering (driven by siteConfig.features from BE):
 *   features = ["news", "albums"]  → only NewsBlock + AlbumsBlock render
 *   features = []                  → all installed blocks render (dev default)
 *
 * To add a block: create src/modules/{name}/manifest.ts and register it there.
 */

/**
 * Maps a GraphQL block typename back to the feature slug used in
 * siteConfig.features.  Examples:
 *   "NewsBlock"      → "news"
 *   "AlbumsBlock"    → "albums"
 *   "FlashInfoBlock" → "flash-info"
 */
function typenameToFeature(typename: string): string {
  return typename
    .replace(/Block$/, "")
    .replace(/([A-Z])/g, (_m, l, i) =>
      i === 0 ? l.toLowerCase() : `-${l.toLowerCase()}`,
    );
}

interface BlockRendererProps {
  structuredContent:
    | (BlockInterface & { __typename?: string })[]
    | null
    | undefined;
}

export default function BlockRenderer({
  structuredContent,
}: BlockRendererProps) {
  const features = useFeatures();

  return (
    <>
      {structuredContent?.map((block, index) => {
        const { __typename: typename, innerBlocks, ...data } = block;

        if (!typename) return null;

        // Feature gate: non-empty features list restricts which blocks render.
        if (
          features.length > 0 &&
          !features.includes(typenameToFeature(typename))
        ) {
          return null;
        }

        const Component = blockRegistry.get(typename);
        if (!Component) {
          console.log(`[BlockRenderer] no component for block "${typename}"`);
          return null;
        }

        return (
          <Suspense
            key={((data as Record<string, unknown>)["id"] as string) ?? index}
            fallback={null}
          >
            <Component {...data}>
              {innerBlocks && <BlockRenderer structuredContent={innerBlocks} />}
            </Component>
          </Suspense>
        );
      })}
    </>
  );
}
