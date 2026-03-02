/**
 * Generates public/citeopolis-themes.json from src/themes/*/theme.config.ts.
 *
 * Usage:
 *   pnpm run generate:themes
 *
 * The output is consumed by the WordPress BE site-creation wizard at:
 *   GET {FE_URL}/citeopolis-themes.json
 *
 * Only themes that declare at least one capability are included,
 * so internal / parent-only themes (e.g. "base") are excluded automatically.
 * To include a theme with no capabilities, set capabilities: [] explicitly and
 * remove the filter below, or add it manually to the static file.
 *
 * Runner: vite-node (bundled with vitest / vite — no extra dependency needed).
 */

import { readdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { ThemeConfig } from "../src/themes/base/theme.config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const themesDir = resolve(__dirname, "../src/themes");
const outFile = resolve(__dirname, "../public/citeopolis-themes.json");

// ─── Collect themes ────────────────────────────────────────────────────────────

const entries = readdirSync(themesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const themes: {
  name: string;
  capabilities: string[];
  defaultColors: { primary: string; secondary: string; tertiary: string };
}[] = [];

for (const dir of entries) {
  try {
    const mod = await import(`../src/themes/${dir}/theme.config.ts`);
    const cfg = mod.default as ThemeConfig;

    // Skip themes with no declared capabilities (parent / base themes).
    if (!cfg.capabilities || cfg.capabilities.length === 0) continue;

    themes.push({
      name: cfg.name,
      capabilities: cfg.capabilities,
      defaultColors: cfg.defaultColors,
    });
  } catch {
    // Directory has no theme.config.ts — skip silently.
  }
}

// ─── Write output ──────────────────────────────────────────────────────────────

writeFileSync(outFile, JSON.stringify({ themes }, null, 2) + "\n", "utf-8");
console.log(`✓ Generated ${outFile} (${themes.length} theme(s))`);
