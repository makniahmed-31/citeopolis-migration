/* eslint-disable unicorn/filename-case */
import type { Preview } from "@storybook/react-vite";
import { applyTheme } from "../src/lib/theme";
import "../src/styles/global.scss";

// All registered themes — add new themes here
const THEMES = ["base", "municipal"] as const;
type Theme = (typeof THEMES)[number];

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Active theme — drives CSS token cascade",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: THEMES.map((t) => ({ value: t, title: t })),
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    // Chromatic: render every story under every theme
    chromatic: {
      modes: Object.fromEntries(
        THEMES.map((theme) => [theme, { theme }])
      ),
    },

    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "376px", height: "668px" }, type: "mobile" },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        desktop: { name: "Desktop", styles: { width: "1600px", height: "1024px" }, type: "desktop" },
      },
    },

    backgrounds: {
      options: {
        light: { name: "Light", value: "#FFFFFF" },
        dark: { name: "Dark", value: "#0d2044" },
      },
    },

    docs: { autodocs: true },

    a11y: {
      context: { include: ["#storybook-root"] },
    },
  },

  tags: ["autodocs"],

  decorators: [
    // Switch active theme via data-theme attribute on <html>
    (Story, context) => {
      const theme = (context.globals["theme"] as Theme) ?? "base";
      applyTheme(theme);
      return <Story />;
    },
  ],
};

export default preview;
