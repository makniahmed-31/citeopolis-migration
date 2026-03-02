import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";
import { getEnv } from "./env";
import introspectionData from "@/generated/graphql/introspection.json";
// Vite replaces import.meta.env at build time — this import is tree-shaken in production.
import { mockLink } from "@/mock/handlers";

let client: ApolloClient | null = null;

/**
 * Returns the singleton Apollo Client used throughout the app.
 *
 * When VITE_MOCK_API=true the mock link is used so that both the ApolloProvider
 * (used by useQuery hooks) and the route loaders (which call this function
 * directly) share the same client and receive mock data.
 */
export function getApolloClient(): ApolloClient {
  if (client) return client;

  if (import.meta.env.VITE_MOCK_API === "true") {
    client = new ApolloClient({
      link: mockLink,
      cache: new InMemoryCache(),
    });
    return client;
  }

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
