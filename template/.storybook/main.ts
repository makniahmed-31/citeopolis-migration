import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import svgr from "vite-plugin-svgr";
import { themePlugin } from "../src/lib/vite-plugin-theme";

const STORYBOOK_THEME = process.env.THEME ?? "base";
const STORYBOOK_SITE = process.env.SITE ?? "demo";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: [
    "../public",
    { from: "../src/themes/base/fonts", to: "/fonts" },
  ],

  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(import.meta.dirname, "../src"),
      "@theme": path.resolve(import.meta.dirname, `../src/themes/${STORYBOOK_THEME}`),
      // @components falls through to themePlugin resolution chain
      "@components": path.resolve(import.meta.dirname, "../src/components"),
    };

    config.define = {
      ...config.define,
      __THEME__: JSON.stringify(STORYBOOK_THEME),
      __SITE__: JSON.stringify(STORYBOOK_SITE),
    };

    config.plugins = config.plugins ?? [];
    config.plugins.push(
      svgr({ include: /\.svg$/ }),
      themePlugin({ theme: STORYBOOK_THEME, site: STORYBOOK_SITE })
    );

    return config;
  },
};

export default config;
