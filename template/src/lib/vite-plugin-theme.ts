import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

interface ThemePluginOptions {
  theme: string;
  site?: string;
}

/**
 * Resolves @components/* imports through the theme chain.
 *
 * Resolution order (highest → lowest priority):
 *   1. sites/{site}/overrides/components/
 *   2. themes/{theme}/components/          (child → parent → ... → base)
 *   3. src/components/                     (fallback)
 *
 * Example:
 *   import Header from '@components/layout/Header'
 *   → tries sites/demo/overrides/components/layout/Header.tsx
 *   → tries themes/municipal/components/layout/Header.tsx
 *   → tries themes/base/components/layout/Header.tsx
 *   → falls back to src/components/layout/Header.tsx
 */
export function themePlugin(options: ThemePluginOptions): Plugin {
  const templateDir = path.resolve(import.meta.dirname, "..");
  const chain = buildResolutionChain(options, templateDir);

  return {
    name: "citeopolis-theme",

    resolveId(id) {
      if (!id.startsWith("@components/")) return;

      const relativePath = id.replace("@components/", "");

      for (const baseDir of chain) {
        const resolved = tryResolveWithExtensions(baseDir, relativePath);
        if (resolved) return resolved;
      }

      // Not found in any override — let Vite resolve normally via alias
      return;
    },
  };
}

function buildResolutionChain(options: ThemePluginOptions, templateDir: string): string[] {
  const chain: string[] = [];

  // 1. Site-specific overrides (highest priority)
  if (options.site) {
    const siteOverridesDir = path.join(templateDir, "..", "sites", options.site, "overrides", "components");
    chain.push(siteOverridesDir);
  }

  // 2. Theme chain (child → parent → ... → base)
  const themeChain = resolveThemeChain(options.theme, templateDir);
  for (const themeName of themeChain) {
    chain.push(path.join(templateDir, "src", "themes", themeName, "components"));
  }

  // 3. Base components (fallback — always last)
  chain.push(path.join(templateDir, "src", "components"));

  return chain;
}

/**
 * Walks up the parent chain to build ordered theme resolution list.
 * e.g. 'municipal-dark' → ['municipal-dark', 'municipal', 'base']
 */
function resolveThemeChain(themeName: string, templateDir: string): string[] {
  const chain: string[] = [];
  const visited = new Set<string>();
  let current: string | null = themeName;

  while (current && !visited.has(current)) {
    visited.add(current);
    chain.push(current);

    const configPath = path.join(templateDir, "src", "themes", current, "theme.config.ts");
    const parentName = readParentFromConfig(configPath);
    current = parentName;
  }

  return chain;
}

function readParentFromConfig(configPath: string): string | null {
  if (!fs.existsSync(configPath)) return null;

  const content = fs.readFileSync(configPath, "utf-8");
  // Simple regex parse — avoids ts-node dependency at build time
  const match = content.match(/parent:\s*['"]([^'"]+)['"]/);
  return match?.[1] ?? null;
}

const EXTENSIONS = [".tsx", ".ts", "/index.tsx", "/index.ts"];

function tryResolveWithExtensions(baseDir: string, relativePath: string): string | null {
  const base = path.join(baseDir, relativePath);

  // Try exact path first
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;

  // Try with extensions
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}
