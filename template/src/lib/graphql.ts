import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";
import { getEnv } from "./env";

// Placeholder until `pnpm generate` populates the real introspection file
let introspectionData: { possibleTypes: Record<string, string[]> } = {
  possibleTypes: {},
};

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  introspectionData = require("@/generated/graphql/introspection.json");
} catch {
  // Generated file not yet available — run `pnpm generate` first
}

let client: ApolloClient | null = null;

/**
 * Returns a singleton Apollo Client for client-side GraphQL queries.
 * Replaces Next.js server-side registerApolloClient — all queries are client-side in this SPA.
 */
export function getApolloClient(): ApolloClient {
  if (client) return client;

  const { GRAPHQL_URL } = getEnv();

  client = new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_URL, credentials: "include" }),
    cache: new InMemoryCache({
      possibleTypes: introspectionData.possibleTypes,
      typePolicies: {
        SiteConfig: { merge: true },
        Query: {
          fields: {
            route: { keyArgs: ["id", "url", "slug"], merge: true },
            page: { keyArgs: ["id", "url", "slug"], merge: true },
          },
        },
      },
    }),
  });

  return client;
}
