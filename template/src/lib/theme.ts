import { createContext, useContext } from "react";

// ─── CSS theme application ─────────────────────────────────────────────────────

/**
 * Sets data-theme on <html> — triggers CSS token cascade for the active theme.
 * All themes are pre-compiled in global.scss; switching is a DOM attr change only.
 *
 * Resolution order in CSS (specificity cascade):
 *   :root { }                          ← base tokens (always applied)
 *   :root[data-theme="municipal"] { }  ← municipal overrides
 */
export function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
}

/** Returns the currently active theme from the DOM. */
export function getActiveTheme(): string {
  return document.documentElement.dataset.theme ?? "base";
}

// ─── Runtime contexts (populated by App from siteConfig BE query) ──────────────

/**
 * Active theme name — driven by BE siteConfig.theme (domain → theme mapping).
 * Default: "base" (safe fallback before siteConfig resolves).
 */
export const ThemeContext = createContext<string>("base");

/**
 * Active feature list — driven by BE siteConfig.features.
 * Controls which BlockRenderer blocks are rendered.
 * Empty array = all features allowed (permissive default for dev).
 */
export const FeaturesContext = createContext<string[]>([]);

export function useActiveTheme(): string {
  return useContext(ThemeContext);
}

export function useFeatures(): string[] {
  return useContext(FeaturesContext);
}
