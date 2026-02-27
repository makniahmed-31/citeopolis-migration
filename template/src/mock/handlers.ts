/**
 * Mock Apollo link — intercepts all GraphQL operations and returns demo data.
 * Enabled when VITE_MOCK_API=true in .env
 *
 * Simulates a single WordPress BE instance that:
 *  - Returns site config (siteName) based on domain
 *  - Resolves routes to WP content types
 */

import { ApolloLink } from "@apollo/client/link";
import { Observable } from "@apollo/client/utilities";

// ─── Demo site config ──────────────────────────────────────────────────────────

const DEMO_CONFIG = {
  siteName: "Ville de Démo",
};

// ─── Response resolver ─────────────────────────────────────────────────────────

function getMockResponse(operationName: string, variables: Record<string, unknown>) {
  switch (operationName) {
    case "GetSiteConfig":
      return {
        data: {
          siteConfig: {
            __typename: "SiteConfig",
            ...DEMO_CONFIG,
          },
        },
      };

    case "GetHomepage":
      return {
        data: {
          route: {
            __typename: "Page",
            url: "/",
            title: "Accueil — Ville de Démo",
            structuredContent: [],
          },
        },
      };

    case "GetRoute":
      return {
        data: {
          route: {
            __typename: "Page",
            url: (variables.url as string) ?? "/",
          },
        },
      };

    default:
      console.warn(`[mock] Unhandled operation: ${operationName}`, variables);
      return { data: null, errors: [{ message: `No mock for "${operationName}"` }] };
  }
}

// ─── Apollo mock link ──────────────────────────────────────────────────────────

export const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { operationName, variables } = operation;

    // Small delay to simulate network (shows loading states)
    const timer = setTimeout(() => {
      observer.next(getMockResponse(operationName ?? "", variables as Record<string, unknown>));
      observer.complete();
    }, 300);

    return () => clearTimeout(timer);
  });
});
