import { createFileRoute, redirect } from "@tanstack/react-router";
import { gql } from "@apollo/client/core";
import { lazy, Suspense } from "react";
import { getApolloClient } from "@/lib/graphql";
import type { RouteType } from "@/generated/graphql/graphql";
import ErrorBoundary from "@components/system/ErrorBoundary";
import NotFound from "@components/system/NotFound";

// ─── GraphQL Route Query ───────────────────────────────────────────────────────
const ROUTE_QUERY = gql`
  query GetRoute($url: URL!) {
    route(url: $url) {
      __typename
      ... on Redirect {
        redirectCode
        url
      }
      ... on Page { url }
      ... on News { url }
    }
  }
`;

// ─── Page Component Registry ───────────────────────────────────────────────────
const pageComponents: Record<string, React.LazyExoticComponent<React.ComponentType<{ url: string }>>> = {
  Page: lazy(() => import("@/pages/PagePage")),
  News: lazy(() => import("@/pages/news/NewsPage")),
};

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/$")({
  async loader({ params }) {
    const splat = (params as Record<string, string>)["_splat"] ?? "";
    const url = "/" + splat;

    const client = getApolloClient();

    let data: { route?: RouteType } | null = null;

    try {
      const result = await client.query<{ route: RouteType }>({
        query: ROUTE_QUERY,
        variables: { url },
        errorPolicy: "all",
      });
      data = result.data ?? null;
    } catch (err) {
      console.error("Route query failed:", err);
      throw err;
    }

    const route = data?.route;

    if (route?.__typename === "Redirect" && route.url) {
      throw redirect({
        href: route.url,
        statusCode: route.redirectCode ?? 302,
      });
    }

    return { typename: route?.__typename ?? null, url };
  },

  errorComponent: ({ error }) => (
    <ErrorBoundary error={error instanceof Error ? error : new Error(String(error))} />
  ),

  component: CatchAllPage,
});

function CatchAllPage() {
  const { typename, url } = Route.useLoaderData();

  if (!typename) return <NotFound />;

  const Component = pageComponents[typename];

  if (!Component) {
    console.warn(`CatchAllPage: no page component registered for typename "${typename}"`);
    return <NotFound />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="sr-only">Chargement…</div>}>
        <Component url={url} />
      </Suspense>
    </ErrorBoundary>
  );
}
