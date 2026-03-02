import type { ThemeManifest } from "@/lib/componentRegistry";

const manifest: ThemeManifest = {
  parent: "base",
  overrides: {
    // Add component overrides here as the theme matures:
    // "layout/Header": () => import("./components/layout/Header"),
  },
};

export default manifest;
