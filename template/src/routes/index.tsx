import { createFileRoute, redirect } from "@tanstack/react-router";
import { gql } from "@apollo/client/core";
import { lazy, Suspense } from "react";
import { getApolloClient } from "@/lib/graphql";
import type { RouteType } from "@/generated/graphql/graphql";
import ErrorBoundary from "@components/system/ErrorBoundary";
import NotFound from "@components/system/NotFound";

const ROUTE_QUERY = gql`
  query GetHomepage {
    route(url: "/") {
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

const pageComponents: Record<string, React.LazyExoticComponent<React.ComponentType<{ url: string }>>> = {
  Page: lazy(() => import("@/pages/PagePage")),
  News: lazy(() => import("@/pages/news/NewsPage")),
};

export const Route = createFileRoute("/")({
  async loader() {
    const client = getApolloClient();

    const result = await client.query<{ route: RouteType }>({
      query: ROUTE_QUERY,
      errorPolicy: "all",
    });

    const route = result.data?.route ?? null;

    if (route?.__typename === "Redirect" && route.url) {
      throw redirect({ href: route.url, statusCode: route.redirectCode ?? 302 });
    }

    return { typename: route?.__typename ?? null, url: "/" };
  },

  errorComponent: ({ error }) => (
    <ErrorBoundary error={error instanceof Error ? error : new Error(String(error))} />
  ),

  component: IndexPage,
});

function IndexPage() {
  const { typename, url } = Route.useLoaderData();

  if (!typename) return <NotFound />;

  const Component = pageComponents[typename];

  if (!Component) return <NotFound />;

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="sr-only">Chargement…</div>}>
        <Component url={url} />
      </Suspense>
    </ErrorBoundary>
  );
}
