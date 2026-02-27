import { gql } from "@apollo/client/core";

/**
 * GraphQL fragments for the news module.
 * Used by page queries — compose these into larger queries.
 */

export const NEWS_ITEM_FRAGMENT = gql`
  fragment NewsItemFragment on News {
    id
    title
    url
    publicationDate
    leadText
    images {
      ratio_3x2 {
        url
        width
        height
        alt
      }
    }
    categories {
      title
    }
  }
`;

export const NEWS_BLOCK_FRAGMENT = gql`
  fragment NewsBlockFragment on NewsBlock {
    anchor
    listUrl
    proposeUrl
    focusedNews {
      ...NewsItemFragment
    }
    news {
      ...NewsItemFragment
    }
    briefNews {
      id
      title
      url
      publicationDate
    }
  }
  ${NEWS_ITEM_FRAGMENT}
`;
