import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Virtual module ID: import manifests from "virtual:@packages/manifests"
 *
 * Resolves to an array of FeatureManifest objects, one per installed
 * @packages/* workspace package that exports a "./manifest" entry.
 *
 * ─── How feature gating works ─────────────────────────────────────────────────
 * Adding a package:    pnpm add @packages/news   → NewsBlock registered
 * Removing a package:  pnpm remove @packages/news → NewsBlock gone (after restart)
 *
 * The virtual module is rebuilt on each Vite dev server start, so a restart
 * is required after install/remove — same as any dependency change.
 */
export const MODULES_VIRTUAL_ID = "virtual:@packages/manifests";
const RESOLVED_ID = "\0" + MODULES_VIRTUAL_ID;

export function modulesPlugin(templateDir: string): Plugin {
  return {
    name: "citeopolis-modules",

    resolveId(id) {
      if (id === MODULES_VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id !== RESOLVED_ID) return;

      const pkgPath = path.join(templateDir, "package.json");
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8")) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };

      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      // Find all @packages/* dependencies that export a ./manifest entry
      const withManifest = Object.keys(deps)
        .filter((dep) => dep.startsWith("@packages/"))
        .filter((dep) => {
          try {
            const depPkgPath = path.join(
              templateDir,
              "node_modules",
              dep,
              "package.json",
            );
            const depPkg = JSON.parse(
              fs.readFileSync(depPkgPath, "utf-8"),
            ) as { exports?: Record<string, unknown> };
            return !!depPkg.exports?.["./manifest"];
          } catch {
            return false;
          }
        });

      const imports = withManifest
        .map((dep, i) => `import m${i} from ${JSON.stringify(`${dep}/manifest`)};`)
        .join("\n");
      const array = withManifest.map((_, i) => `m${i}`).join(", ");

      return `${imports}\nexport default [${array}];`;
    },
  };
}
