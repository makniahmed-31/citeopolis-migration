import type { ThemeManifest } from "@/lib/componentRegistry";

/**
 * Municipal theme manifest — overrides specific components.
 * Parent: base (inherits all base components not listed here).
 */
const manifest: ThemeManifest = {
  parent: "base",
  overrides: {
    "layout/Header": () => import("./components/layout/Header"),
  },
};

export default manifest;
