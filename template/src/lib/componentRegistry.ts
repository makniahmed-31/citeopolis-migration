import { ComponentType, lazy } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ComponentLoader = () => Promise<{ default: ComponentType<never> }>;

export interface ThemeManifest {
  /** Parent theme name — used to walk the inheritance chain. null = root. */
  parent: string | null;
  /** Map of component path → dynamic import loader. */
  overrides: Record<string, ComponentLoader>;
}

// ─── Discovery ────────────────────────────────────────────────────────────────

/**
 * All theme manifests discovered at build time.
 * Vite bundles every theme variant as a separate lazy chunk.
 * Key format: "../themes/{name}/theme.manifest.ts"
 */
const rawManifests = import.meta.glob<{ default: ThemeManifest }>(
  "../themes/*/theme.manifest.ts",
  { eager: true }
);

// Build registry: { "municipal": ThemeManifest, "base": ThemeManifest }
const registry: Record<string, ThemeManifest> = {};
for (const [path, mod] of Object.entries(rawManifests)) {
  const name = path.match(/themes\/([^/]+)\/theme\.manifest/)?.[1];
  if (name && mod.default) registry[name] = mod.default;
}

// ─── Default component loaders (src/components/ fallback) ─────────────────────

const defaultLoaders: Record<string, ComponentLoader> = {
  "layout/Header": () => import("@/components/layout/Header"),
  "layout/Footer": () => import("@/components/layout/Footer"),
  "system/NotFound": () => import("@/components/system/NotFound"),
  "system/ErrorBoundary": () => import("@/components/system/ErrorBoundary"),
};

// ─── Resolution ───────────────────────────────────────────────────────────────

/** Cache prevents re-creating lazy() wrappers on every render. */
const cache = new Map<string, ComponentType<never>>();

/**
 * Resolves a component path against the active theme chain.
 *
 * Resolution order (highest → lowest priority):
 *   themes/{theme}/components/...  (child → parent → ... → base)
 *   src/components/...             (fallback)
 *
 * Example for theme "municipal":
 *   chain = ["municipal", "base"]
 *   "layout/Header" → found in municipal → returns municipal Header
 *   "layout/Footer" → not in municipal, not in base → returns default Footer
 */
export function resolveComponent<T = Record<string, unknown>>(
  componentPath: string,
  theme: string
): ComponentType<T> {
  const key = `${theme}:${componentPath}`;

  if (cache.has(key)) {
    return cache.get(key) as ComponentType<T>;
  }

  const chain = buildChain(theme);

  for (const themeName of chain) {
    const loader = registry[themeName]?.overrides[componentPath];
    if (loader) {
      const component = lazy(loader) as ComponentType<T>;
      cache.set(key, component as ComponentType<never>);
      return component;
    }
  }

  // Fallback to base src/components/
  const defaultLoader = defaultLoaders[componentPath];
  if (defaultLoader) {
    const component = lazy(defaultLoader) as ComponentType<T>;
    cache.set(key, component as ComponentType<never>);
    return component;
  }

  throw new Error(
    `[componentRegistry] Component not found: "${componentPath}" for theme "${theme}"`
  );
}

/**
 * Walks the theme parent chain.
 * "municipal" → ["municipal", "base"]
 * "municipal-dark" → ["municipal-dark", "municipal", "base"]
 */
function buildChain(theme: string): string[] {
  const chain: string[] = [];
  const visited = new Set<string>();
  let current: string | null = theme;

  while (current && !visited.has(current)) {
    visited.add(current);
    chain.push(current);
    current = registry[current]?.parent ?? null;
  }

  return chain;
}
