/**
 * Mock Apollo link — intercepts all GraphQL operations and returns demo data.
 * Enabled when VITE_MOCK_API=true in .env
 *
 * Simulates a WordPress multisite backend (site factory):
 *  - GetSiteConfig  → domain → theme + features + siteName
 *  - GetPage        → homepage blocks driven by site capabilities, or empty generic page
 *  - GetRoute       → typename resolution for any URL
 */

import { ApolloLink } from "@apollo/client/link";
import { Observable } from "@apollo/client/utilities";
import { resolveSiteConfig } from "@/lib/siteConfigs";

// ─── Mock content builders ─────────────────────────────────────────────────────

/** Returns a NewsBlock with demo articles. */
function mockNewsBlock() {
  return {
    __typename: "NewsBlock",
    id: "news-block-home",
    anchor: null,
    listUrl: "/actualites",
    proposeUrl: null,
    focusedNews: {
      __typename: "News",
      id: "news-1",
      title: "Inauguration du nouveau centre culturel",
      url: "/actualites/inauguration-centre-culturel",
      publicationDate: "2026-02-15",
      leadText:
        "Le centre culturel municipal ouvre ses portes ce samedi avec une journée portes ouvertes.",
      images: null,
      categories: [{ __typename: "NewsCategory", title: "Culture" }],
    },
    news: [
      {
        __typename: "News",
        id: "news-2",
        title: "Budget participatif 2026 : votez pour vos projets",
        url: "/actualites/budget-participatif-2026",
        publicationDate: "2026-02-10",
        leadText: null,
        images: null,
        categories: [{ __typename: "NewsCategory", title: "Démocratie locale" }],
      },
      {
        __typename: "News",
        id: "news-3",
        title: "Travaux rue de la République : déviation en place",
        url: "/actualites/travaux-rue-republique",
        publicationDate: "2026-02-05",
        leadText: null,
        images: null,
        categories: [{ __typename: "NewsCategory", title: "Voirie" }],
      },
    ],
    briefNews: [
      {
        __typename: "News",
        id: "news-4",
        title: "Collecte des déchets : changement de jours",
        url: "/actualites/collecte-dechets",
        publicationDate: "2026-02-01",
      },
    ],
  };
}

/** Returns an AlbumsBlock with demo albums. */
function mockAlbumsBlock() {
  return {
    __typename: "AlbumsBlock",
    id: "albums-block-home",
    anchor: null,
    listUrl: "/albums",
    albums: [
      {
        __typename: "Album",
        id: "album-1",
        title: "Fête de la Musique 2025",
        url: "/albums/fete-musique-2025",
        images: null,
      },
      {
        __typename: "Album",
        id: "album-2",
        title: "Inauguration du parc central",
        url: "/albums/inauguration-parc-central",
        images: null,
      },
    ],
  };
}

/**
 * Builds homepage structuredContent blocks from the site's declared capabilities.
 * Add a new case here when adding a new feature module.
 */
function buildMockBlocks(features: string[]) {
  const blocks = [];
  if (features.includes("news"))   blocks.push(mockNewsBlock());
  if (features.includes("albums")) blocks.push(mockAlbumsBlock());
  return blocks;
}

// ─── Response resolver ─────────────────────────────────────────────────────────

function getHostname() {
  return typeof window !== "undefined" ? window.location.hostname : "localhost";
}

function getMockResponse(
  operationName: string,
  variables: Record<string, unknown>,
) {
  switch (operationName) {
    case "GetSiteConfig": {
      const siteConfig = resolveSiteConfig(getHostname());
      return {
        data: {
          siteConfig: {
            __typename: "SiteConfig",
            siteName: siteConfig.siteName,
            theme: siteConfig.theme,
            features: siteConfig.features,
          },
        },
      };
    }

    case "GetPage": {
      const url = (variables.url as string) ?? "/";

      if (url === "/") {
        // Homepage: content driven by site capabilities
        const siteConfig = resolveSiteConfig(getHostname());
        return {
          data: {
            page: {
              title: siteConfig.siteName,
              structuredContent: buildMockBlocks(siteConfig.features),
            },
          },
        };
      }

      // Generic page: no structured content in mock
      return {
        data: {
          page: {
            title: `Page — ${url}`,
            structuredContent: [],
          },
        },
      };
    }

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
      return {
        data: null,
        errors: [{ message: `No mock for "${operationName}"` }],
      };
  }
}

// ─── Apollo mock link ──────────────────────────────────────────────────────────

export const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { operationName, variables } = operation;

    // Small delay to simulate network latency (shows loading states)
    const timer = setTimeout(() => {
      observer.next(
        getMockResponse(
          operationName ?? "",
          variables as Record<string, unknown>,
        ),
      );
      observer.complete();
    }, 300);

    return () => clearTimeout(timer);
  });
});
