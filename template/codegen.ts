import type { CodegenConfig } from "@graphql-codegen/cli";
import assert from "node:assert";
import process from "node:process";

assert.ok(
  process.env.INTROSPECTION_URL,
  "The INTROSPECTION_URL environment variable is not set. Copy .env.example to .env first."
);

const config: CodegenConfig = {
  schema: [
    process.env.INTROSPECTION_URL!.startsWith("http")
      ? {
          [process.env.INTROSPECTION_URL!]: {
            headers: { "User-Agent": "graphql-codegen/5" },
          },
        }
      : process.env.INTROSPECTION_URL!,
  ],
  documents: ["./src/**/*.{ts,tsx}"],
  generates: {
    "./src/generated/graphql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        namingConvention: { enumValues: "change-case-all#upperCase" },
        scalars: {
          URL: "string",
          HTML: "string",
          StructuredContent: "(BlockInterface & { __typename: string })[]",
        },
      },
    },
    "./src/generated/graphql/introspection.json": {
      plugins: ["fragment-matcher"],
    },
  },
  overwrite: true,
  ignoreNoDocuments: true,
};

export default config;
