export interface SiteConfig {
  /** Site identifier — matches the sites/ folder name */
  name: string;
  /** Active theme (must exist in template/src/themes/) */
  theme: string;
  /** Optional child theme (inherits from theme) */
  childTheme?: string;
  /** Enabled feature modules */
  features: string[];
  /** Per-site GraphQL URL override (optional — falls back to VITE_GRAPHQL_URL) */
  graphqlUrl?: string;
}

const config: SiteConfig = {
  name: "demo",
  theme: "municipal",
  features: ["news", "flash-info", "albums"],
};

export default config;
