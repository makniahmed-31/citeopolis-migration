export interface ThemeColors {
  /** Main brand color (--color-primary-500) */
  primary: string;
  /** Accent / secondary brand (--color-secondary-500) */
  secondary: string;
  /** Tertiary accent (--color-tertiary-500) */
  tertiary: string;
}

export interface ThemeConfig {
  /** Unique theme identifier — matches folder name and data-theme attribute */
  name: string;
  /** Parent theme to inherit from. null = root theme */
  parent: string | null;
  /** Human-readable label shown in the BE theme picker */
  displayName?: string;
  /**
   * Feature-module slugs this theme is designed for.
   * Must match FeatureManifest.slug values defined in each module manifest.
   * Exposed to the BE via /public/citeopolis-themes.json.
   */
  capabilities: string[];
  /**
   * Default brand colors for this theme.
   * The BE theme-creation wizard shows these as a preview palette.
   * Source of truth: the primary-500 values in each theme's tokens/_color.scss.
   */
  defaultColors: ThemeColors;
}

const config: ThemeConfig = {
  name: "base",
  parent: null,
  displayName: "Base",
  capabilities: [],
  defaultColors: {
    primary: "#214fab",   // --color-primary-500
    secondary: "#3ec8ad", // --color-secondary-500
    tertiary: "#eec478",  // --color-tertiary-500
  },
};

export default config;
