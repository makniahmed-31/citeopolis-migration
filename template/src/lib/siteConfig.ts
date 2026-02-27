import { gql } from "@apollo/client/core";

export const SITE_CONFIG_QUERY = gql`
  query GetSiteConfig {
    siteConfig {
      siteName
    }
  }
`;

/**
 * theme and features are not in the current schema — they are provided by the
 * mock layer (VITE_MOCK_API) and will be added to the schema in a future version.
 * Until then, theme falls back to the build-time ACTIVE_THEME constant and
 * features defaults to [] (permissive: all blocks rendered).
 */
export interface SiteConfigQueryResult {
  siteConfig?: {
    siteName?: string | null;
    theme?: string | null;
    features?: string[] | null;
  } | null;
}
