import { gql } from "@apollo/client/core";

/**
 * Site factory query.
 *
 * `theme` and `features` come from the site-factory schema extension
 * (src/mock/site-factory-extension.graphql). They are not in the upstream
 * @citeopolis-graphql/schema yet — they will be added when the BE implements
 * the site factory API. The mock layer returns them today.
 */
export const SITE_CONFIG_QUERY = gql`
  query GetSiteConfig {
    siteConfig {
      siteName
      theme
      features
    }
  }
`;

export interface SiteConfigQueryResult {
  siteConfig?: {
    siteName?: string | null;
    /** Active theme slug. Null until BE implements the site factory. */
    theme?: string | null;
    /** Enabled feature-module slugs. Empty = all allowed (dev default). */
    features?: string[] | null;
  } | null;
}
