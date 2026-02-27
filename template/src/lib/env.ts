/**
 * Runtime public environment variables.
 * All public vars must be prefixed with VITE_ in .env
 */
export interface PublicEnv {
  GRAPHQL_URL: string;
  BACKEND_URL: string;
}

export function getEnv(): PublicEnv {
  return {
    GRAPHQL_URL: import.meta.env.VITE_GRAPHQL_URL as string,
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string,
  };
}

// Expose active theme and site (injected at build time via vite.config.ts define)
export const ACTIVE_THEME = __THEME__;
export const ACTIVE_SITE = __SITE__;
