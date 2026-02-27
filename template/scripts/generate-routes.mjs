#!/usr/bin/env node
/**
 * Generates src/routeTree.gen.ts using @tanstack/router-generator.
 * Equivalent to `tsr generate` without needing the separate CLI package.
 */
import { Generator, getConfig } from "@tanstack/router-generator";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../../");

const config = getConfig(
  {
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
  },
  root,
);

const generator = new Generator({ config, root });
await generator.run();
console.log("Route tree generated: src/routeTree.gen.ts");
