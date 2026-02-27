import { createFileRoute, redirect } from "@tanstack/react-router";
import { gql } from "@apollo/client/core";
import { useEffect } from "react";
import { getApolloClient } from "@/lib/graphql";
import type { BlockInterface } from "@/generated/graphql/graphql";
import ErrorBoundary from "@components/system/ErrorBoundary";
import NotFound from "@components/system/NotFound";
import BlockRenderer from "@/components/blocks/BlockRenderer";

// ─── GraphQL Route Query ───────────────────────────────────────────────────────
const ROUTE_QUERY = gql`
  query GetHomepage {
    route(url: "/") {
      __typename

      ... on Redirect {
        redirectCode
        url
      }

      ... on Page {
        url
        title
        structuredContent
      }
    }
  }
`;

interface HomepageRoute {
  __typename?: string;
  url?: string | null;
  redirectCode?: number | null;
  title?: string | null;
  structuredContent?: (BlockInterface & { __typename: string })[] | null;
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  async loader() {
    const client = getApolloClient();

    let route: HomepageRoute | null = null;

    try {
      const result = await client.query<{ route?: HomepageRoute | null }>({
        query: ROUTE_QUERY,
        errorPolicy: "all",
      });
      route = result.data?.route ?? null;
    } catch (err) {
      console.error("Route query failed:", err);
      throw err;
    }

    if (route?.__typename === "Redirect" && route.url) {
      throw redirect({ href: route.url, statusCode: route.redirectCode ?? 302 });
    }

    return {
      typename: route?.__typename ?? null,
      title: route?.__typename === "Page" ? (route.title ?? null) : null,
      structuredContent: route?.__typename === "Page" ? (route.structuredContent ?? null) : null,
    };
  },

  errorComponent: ({ error }) => (
    <ErrorBoundary error={error instanceof Error ? error : new Error(String(error))} />
  ),

  component: IndexPage,
});

// ─── Component ────────────────────────────────────────────────────────────────
function IndexPage() {
  const { typename, title, structuredContent } = Route.useLoaderData();

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  if (!typename) return <NotFound />;

  return (
    <div className="layout-1column-fullwidth">
      <div className="column main">
        <BlockRenderer structuredContent={structuredContent} />
      </div>
    </div>
  );
}
