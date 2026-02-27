/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_BACKEND_URL: string;
  /** Set to "true" to enable mock GraphQL handlers (no real API needed) */
  readonly VITE_MOCK_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare const __THEME__: string;
declare const __SITE__: string;
