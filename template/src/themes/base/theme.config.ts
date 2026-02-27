export interface ThemeConfig {
  /** Unique theme identifier — matches folder name */
  name: string;
  /** Parent theme to inherit from. null = root theme */
  parent: string | null;
  displayName?: string;
}

const config: ThemeConfig = {
  name: "base",
  parent: null,
  displayName: "Base",
};

export default config;
