import type { ThemeManifest } from "@/lib/componentRegistry";

/**
 * Base theme manifest — defines no component overrides.
 * All @components/* fall through to src/components/ defaults.
 */
const manifest: ThemeManifest = {
  parent: null,
  overrides: {},
};

export default manifest;
