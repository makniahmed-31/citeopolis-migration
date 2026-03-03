import { graphql } from "@/generated/graphql";

/**
 * Site factory query.
 *
 * `theme` and `features` come from the site-factory schema extension
 * (src/mock/site-factory-extension.graphql). They are not in the upstream
 * @citeopolis-graphql/schema yet — they will be added when the BE implements
 * the site factory API. The mock layer returns them today.
 */
export const SITE_CONFIG_QUERY = graphql(`
  query GetSiteConfig {
    siteConfig {
      siteName
      theme
      features
    }
  }
`);
