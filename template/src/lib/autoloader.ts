/**
 * Feature module autoloader.
 *
 * Block components are discovered from installed @packages/* workspace
 * packages via a Vite virtual module (see vite-plugin-modules.ts).
 * Only packages listed in package.json dependencies are included — so
 * adding or removing a package with `pnpm add / remove` directly controls
 * which blocks are registered (after a dev server restart).
 *
 * Page components (template-specific, e.g. NewsPage) are declared in
 * local manifests under src/modules/{name}/manifest.ts and merged in at
 * load time.
 *
 * ─── Adding a new feature package ────────────────────────────────────────────
 * 1. pnpm add @packages/{name}  (adds it to package.json + node_modules)
 * 2. Restart the dev server — the virtual module picks it up automatically.
 * 3. Optionally create src/modules/{name}/manifest.ts if the feature needs
 *    a template-side page component (typename → lazy page loader).
 */

import { lazy } from "react";
import type { ComponentType } from "react";
import pkgManifests from "virtual:@packages/manifests";

// ─── Public interface ──────────────────────────────────────────────────────────

export interface FeatureManifest {
  /**
   * Feature slug — must match keys in siteConfig.features (kebab-case).
   * Examples: "news", "albums", "flash-info"
   */
  slug: string;

  /**
   * Block components contributed by this feature.
   *   Key:   GraphQL __typename  (e.g. "NewsBlock")
   *   Value: lazy loader returning { default: Component }
   */
  blocks?: Record<
    string,
    () => Promise<{ default: ComponentType<Record<string, unknown>> }>
  >;

  /**
   * Page components contributed by this feature (used by the catch-all route).
   *   Key:   GraphQL __typename for the route result (e.g. "News")
   *   Value: lazy loader returning { default: Component }
   */
  pages?: Record<
    string,
    () => Promise<{ default: ComponentType<{ url: string }> }>
  >;
}

// ─── Local page manifests ──────────────────────────────────────────────────────
// Declare template-side page components for features that need them.
// Must NOT redeclare blocks — those come from the virtual module above.

type ManifestModule = { default: FeatureManifest };

const localManifests = import.meta.glob<ManifestModule>(
  "../modules/*/manifest.ts",
  { eager: true },
);

// ─── Block registry ────────────────────────────────────────────────────────────

/**
 * Maps GraphQL __typename → lazy React block component.
 * Populated from installed @packages/* manifests only.
 *
 * Example: "NewsBlock" → lazy(() => import("@packages/news/blocks/block"))
 */
export const blockRegistry = new Map<
  string,
  ComponentType<Record<string, unknown>>
>();

// ─── Page registry ─────────────────────────────────────────────────────────────

/**
 * Maps GraphQL route __typename → lazy React page component.
 * Populated from local src/modules/{name}/manifest.ts files.
 *
 * Example: "News" → lazy(() => import("@/pages/news/NewsPage"))
 */
export const pageRegistry = new Map<string, ComponentType<{ url: string }>>();

// ─── All manifests: package blocks + local pages ───────────────────────────────

export const featureManifests: FeatureManifest[] = [
  ...pkgManifests,
  ...Object.values(localManifests).map((m) => m.default),
];

// ─── Build registries ──────────────────────────────────────────────────────────

for (const manifest of featureManifests) {
  for (const [typename, loader] of Object.entries(manifest.blocks ?? {})) {
    blockRegistry.set(
      typename,
      lazy(
        loader as () => Promise<{
          default: ComponentType<Record<string, unknown>>;
        }>,
      ),
    );
  }

  for (const [typename, loader] of Object.entries(manifest.pages ?? {})) {
    pageRegistry.set(
      typename,
      lazy(
        loader as () => Promise<{ default: ComponentType<{ url: string }> }>,
      ),
    );
  }
}
