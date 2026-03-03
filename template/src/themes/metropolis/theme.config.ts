import type { ThemeConfig } from "../base/theme.config";

const config: ThemeConfig = {
  name: "metropolis",
  parent: "base",
  displayName: "Métropolis",
  capabilities: ["albums"],
  defaultColors: {
    primary: "#1b263b",   // --color-primary-500 (dark steel blue)
    secondary: "#e63946", // --color-secondary-500 (vivid red)
    tertiary: "#f7b731",  // --color-tertiary-500 (golden yellow)
  },
};

export default config;
