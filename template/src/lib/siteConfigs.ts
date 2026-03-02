/**
 * Site factory configurations.
 *
 * Each entry simulates one WordPress multisite instance as the real backend
 * would resolve it: given the HTTP Host header, the BE returns a SiteConfig
 * with the active theme and enabled feature modules.
 *
 * ─── How to test a different site locally ─────────────────────────────────────
 * Add an entry to your /etc/hosts:
 *   127.0.0.1  metropolis.localhost
 *
 * Then open http://metropolis.localhost:5173 — the mock will serve the
 * metropolis config instead of the default municipal one.
 *
 * ─── Adding a new site ────────────────────────────────────────────────────────
 * 1. Add an entry below.
 * 2. Add the hostname to /etc/hosts (pointing to 127.0.0.1).
 * 3. Make sure the theme exists under src/themes/{theme}/.
 */

export interface SiteFactoryConfig {
  /** Hostname to match against window.location.hostname (exact or suffix). */
  hostname: string;
  /** Human-readable site name shown in the browser tab and page titles. */
  siteName: string;
  /** Theme slug — must match a directory under src/themes/. */
  theme: string;
  /**
   * Enabled feature-module slugs.
   * Must match directory names under src/modules/ (kebab-case).
   * Empty array = all installed modules are allowed (permissive dev default).
   */
  features: string[];
}

export const SITE_CONFIGS: SiteFactoryConfig[] = [
  {
    hostname: "localhost",
    siteName: "Ville de Démo — Municipal",
    theme: "municipal",
    features: ["news", "albums", "flash-info"],
  },
  {
    hostname: "metropolis.localhost",
    siteName: "Métropolis — Démo",
    theme: "metropolis",
    features: ["news"],
  },
  {
    hostname: "base.localhost",
    siteName: "Site de Base — Démo",
    theme: "base",
    features: [],
  },
];

/**
 * Resolves the SiteFactoryConfig for a given hostname.
 * Tries an exact match first, then a subdomain suffix match, then falls back
 * to the first entry.
 *
 * Exact match is checked before suffix so that e.g. "metropolis.localhost"
 * matches its own entry, not the "localhost" suffix entry.
 */
export function resolveSiteConfig(hostname: string): SiteFactoryConfig {
  return (
    SITE_CONFIGS.find((c) => hostname === c.hostname) ??
    SITE_CONFIGS.find((c) => hostname.endsWith(`.${c.hostname}`)) ??
    SITE_CONFIGS[0]
  );
}
