/**
 * Mock Apollo link — intercepts all GraphQL operations and returns demo data.
 * Enabled when VITE_MOCK_API=true in .env
 *
 * Simulates a single WordPress BE instance that:
 *  - Returns site config (theme + features) based on domain
 *  - Resolves routes to WP content types
 *  - Returns page content with real block structures
 */

import { ApolloLink } from "@apollo/client/link";
import { Observable } from "@apollo/client/utilities";

// ─── Demo site config ──────────────────────────────────────────────────────────
// Change these to demo different scenarios:
//  { theme: "base",       features: [] }              → no features, base theme
//  { theme: "municipal",  features: ["news"] }         → municipal, news only
//  { theme: "municipal",  features: ["news","albums","flash-infos"] } → full demo

const DEMO_CONFIG = {
  theme: "municipal",
  features: ["news", "albums", "flash-infos"],
  siteName: "Ville de Démo",
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_STRUCTURED_CONTENT = [
  {
    __typename: "FlashInfoBlock",
    id: "flash-1",
    anchor: null,
    title: "Information importante",
    content: "<p>La médiathèque sera <strong>fermée</strong> du 24 au 26 décembre pour les fêtes de fin d'année.</p>",
    url: "/info/fermeture-mediatheque",
    innerBlocks: null,
  },
  {
    __typename: "NewsBlock",
    id: "news-1",
    anchor: "actualites",
    listUrl: "/actualites",
    proposeUrl: null,
    focusedNews: {
      __typename: "News",
      id: "news-focus-1",
      title: "Conseil municipal — résultats du vote sur le PLU",
      url: "/actualites/conseil-municipal-plu",
      publicationDate: "2025-03-14",
      leadText: "Le plan local d'urbanisme révisé a été adopté à la majorité lors du conseil municipal du 12 mars.",
      images: {
        ratio_3x2: {
          url: "https://picsum.photos/seed/news1/900/600",
          width: 900,
          height: 600,
          alt: "Salle du conseil municipal",
        },
      },
      categories: [{ __typename: "Category", title: "Conseil municipal" }],
    },
    news: [
      {
        __typename: "News",
        id: "news-2",
        title: "Travaux rue du Général-de-Gaulle : nouvelles dates",
        url: "/actualites/travaux-rue-general-de-gaulle",
        publicationDate: "2025-03-10",
        leadText: "Les travaux de réfection de la chaussée sont reportés au 7 avril.",
        images: null,
        categories: [{ __typename: "Category", title: "Travaux & Voirie" }],
      },
      {
        __typename: "News",
        id: "news-3",
        title: "Appel à projets : associations sportives 2025",
        url: "/actualites/appel-projets-sport",
        publicationDate: "2025-03-05",
        leadText: "La ville lance son appel à projets annuel pour les associations sportives.",
        images: null,
        categories: [{ __typename: "Category", title: "Sport & Loisirs" }],
      },
    ],
    briefNews: [
      {
        __typename: "BriefNewsItem",
        id: "brief-1",
        title: "Collecte des ordures : modification du calendrier",
        url: "/actualites/collecte-ordures",
        publicationDate: "2025-03-08",
      },
      {
        __typename: "BriefNewsItem",
        id: "brief-2",
        title: "Recrutement : agent de médiathèque",
        url: "/actualites/recrutement-mediatheque",
        publicationDate: "2025-03-06",
      },
    ],
    innerBlocks: null,
  },
  {
    __typename: "AlbumsBlock",
    id: "albums-1",
    anchor: "albums",
    listUrl: "/albums",
    albums: [
      {
        __typename: "AlbumItem",
        id: "album-1",
        title: "Carnaval 2025",
        url: "/albums/carnaval-2025",
        coverImage: {
          url: "https://picsum.photos/seed/album1/600/400",
          width: 600,
          height: 400,
          alt: "Carnaval 2025",
        },
        count: 42,
      },
      {
        __typename: "AlbumItem",
        id: "album-2",
        title: "Inauguration médiathèque",
        url: "/albums/inauguration-mediatheque",
        coverImage: {
          url: "https://picsum.photos/seed/album2/600/400",
          width: 600,
          height: 400,
          alt: "Inauguration de la médiathèque",
        },
        count: 28,
      },
      {
        __typename: "AlbumItem",
        id: "album-3",
        title: "Fête de la musique 2024",
        url: "/albums/fete-musique-2024",
        coverImage: {
          url: "https://picsum.photos/seed/album3/600/400",
          width: 600,
          height: 400,
          alt: "Fête de la musique",
        },
        count: 67,
      },
    ],
    innerBlocks: null,
  },
];

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
    case "GetRoute":
      return {
        data: {
          route: {
            __typename: "Page",
            url: (variables.url as string) ?? "/",
          },
        },
      };

    case "GetPage":
      return {
        data: {
          page: {
            __typename: "Page",
            title: "Accueil — Ville de Démo",
            structuredContent: MOCK_STRUCTURED_CONTENT,
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
