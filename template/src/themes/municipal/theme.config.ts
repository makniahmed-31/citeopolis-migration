import type { ThemeConfig } from "../base/theme.config";

const config: ThemeConfig = {
  name: "municipal",
  parent: "base",
  displayName: "Municipal",
  capabilities: ["news", "albums", "flash-info"],
  defaultColors: {
    primary: "#ff6f00",   // --color-primary-500 (orange override in _color.scss)
    secondary: "#3ec8ad", // --color-secondary-500 (inherited from base)
    tertiary: "#eec478",  // --color-tertiary-500 (inherited from base)
  },
};

export default config;
