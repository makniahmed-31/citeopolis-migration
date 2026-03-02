import type { ThemeConfig } from "../base/theme.config";

const config: ThemeConfig = {
  name: "metropolitain",
  parent: "base",
  displayName: "Métropolitain",
  capabilities: ["news", "events", "cartography"],
  defaultColors: {
    primary: "#4338ca",   // --color-primary-500 (indigo)
    secondary: "#0891b2", // --color-secondary-500 (cyan)
    tertiary: "#d97706",  // --color-tertiary-500 (amber)
  },
};

export default config;
