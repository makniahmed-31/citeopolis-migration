/**
 * Feature module autoloader.
 *
 * Discovers feature manifests from src/modules/*\/manifest.ts using Vite's
 * import.meta.glob — the Vite equivalent of webpack's require.context.
 *
 * Each manifest explicitly declares which block components and page components
 * the feature contributes. The autoloader merges them into typed registries
 * that BlockRenderer and the catch-all route consume.
 *
 * ─── Adding a local module ────────────────────────────────────────────────────
 * Create src/modules/{name}/manifest.ts exporting a FeatureManifest.
 * The autoloader picks it up automatically — no registration needed.
 *
 * ─── Future: workspace / npm packages ────────────────────────────────────────
 * When features move to packages\/*\/src\/manifest.ts, add a second glob:
 *
 *   const pkgModules = import.meta.glob<ManifestModule>(
 *     "../../packages\/*\/src\/manifest.ts",
 *     { eager: true },
 *   );
 *
 * Merge pkgModules into manifestModules and rebuild the registries.
 * No other changes needed — BlockRenderer and $.tsx stay untouched.
 */

import { lazy } from "react";
import type { ComponentType } from "react";

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

// ─── Manifest discovery ────────────────────────────────────────────────────────

type ManifestModule = { default: FeatureManifest };

const manifestModules = import.meta.glob<ManifestModule>(
  "../modules/*/manifest.ts",
  { eager: true },
);

/** All discovered feature manifests, in filesystem order. */
export const featureManifests: FeatureManifest[] = Object.values(
  manifestModules,
).map((m) => m.default);

// ─── Block registry ────────────────────────────────────────────────────────────

/**
 * Maps GraphQL __typename → lazy React block component.
 * Built at module-load time from all discovered manifests.
 *
 * Example: "NewsBlock" → lazy(() => import("@/modules/news/blocks/block"))
 */
export const blockRegistry = new Map<
  string,
  ComponentType<Record<string, unknown>>
>();

// ─── Page registry ─────────────────────────────────────────────────────────────

/**
 * Maps GraphQL route __typename → lazy React page component.
 * Built at module-load time from all discovered manifests.
 *
 * Example: "News" → lazy(() => import("@/pages/news/NewsPage"))
 */
export const pageRegistry = new Map<string, ComponentType<{ url: string }>>();

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
