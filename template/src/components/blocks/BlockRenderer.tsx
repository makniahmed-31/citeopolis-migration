import { pascalCase } from "change-case";
import { ComponentType, lazy, Suspense } from "react";
import type { BlockInterface } from "@/generated/graphql/graphql";
import { useFeatures } from "@/lib/theme";

/**
 * Auto-registers all block components from feature modules.
 * Vite's import.meta.glob replaces webpack's require.context.
 *
 * Convention: modules/{name}/blocks/block.ts → typename = PascalCase(name) + "Block"
 * Example:    modules/news/blocks/block.ts   → "NewsBlock"
 *
 * Feature filtering (driven by siteConfig.features from BE):
 *   features = ["news", "albums"]   → only NewsBlock + AlbumsBlock render
 *   features = []                   → all installed blocks render (dev default)
 *   Missing component               → always silently skipped
 *
 * To add a feature module: create src/modules/{name}/blocks/block.ts
 * BlockRenderer auto-discovers it — no manual registration needed.
 */
const blockEntries = import.meta.glob<{
  default: ComponentType<Record<string, unknown>>;
}>("../../modules/*/blocks/block.ts");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components = new Map<string, ComponentType<any>>();

for (const [filepath, loader] of Object.entries(blockEntries)) {
  const match = filepath.match(/modules\/([^/]+)\/blocks\/block\.ts$/);
  if (!match) continue;
  const typename = pascalCase(match[1]) + "Block"; // "news" → "NewsBlock"
  components.set(typename, lazy(loader));
}

/**
 * Maps GraphQL typename back to the feature slug used in siteConfig.features.
 * "NewsBlock"      → "news"
 * "AlbumsBlock"    → "albums"
 * "FlashInfoBlock" → "flash-info"  (pascal→kebab, strip "Block")
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
        // This mirrors the BE behaviour (route 404 / structuredContent filtering)
        // but provides an extra client-side guard for partial enablement.
        if (
          features.length > 0 &&
          !features.includes(typenameToFeature(typename))
        ) {
          return null;
        }

        const Component = components.get(typename);
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
