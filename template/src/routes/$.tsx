import { createFileRoute, redirect } from "@tanstack/react-router";
import { gql } from "@apollo/client/core";
import { lazy, Suspense } from "react";
import { getApolloClient } from "@/lib/graphql";
import ErrorBoundary from "@components/system/ErrorBoundary";
import NotFound from "@components/system/NotFound";
import { pageRegistry } from "@/lib/autoloader";

// ─── GraphQL Query ─────────────────────────────────────────────────────────────

const GET_ROUTE = gql`
  query GetRoute($url: URL!) {
    route(url: $url) {
      __typename

      ... on Redirect {
        redirectCode
        url
      }
    }
  }
`;

interface RouteResult {
  route?: {
    __typename?: string;
    redirectCode?: number | null;
    url?: string | null;
  } | null;
}

// ─── Page Component Registry ───────────────────────────────────────────────────
//
// Core pages are declared here (always available).
// Feature pages (News, Albums, etc.) are auto-discovered from
// src/modules/*/manifest.ts via the autoloader — no manual entry needed.

const pageComponents: Map<string, React.ComponentType<{ url: string }>> =
  new Map([
    // Core: generic WordPress page renderer
    ["Page", lazy(() => import("@/pages/PagePage"))],
    // Feature pages from installed modules
    ...pageRegistry,
  ]);

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/$")({
  async loader({ params }) {
    const splat = (params as Record<string, string>)["_splat"] ?? "";
    const url = "/" + splat;

    const client = getApolloClient();

    let route: RouteResult["route"] = null;

    try {
      const result = await client.query<RouteResult>({
        query: GET_ROUTE,
        variables: { url },
        errorPolicy: "all",
      });
      route = result.data?.route ?? null;
    } catch (err) {
      console.error("Route query failed:", err);
      throw err;
    }

    if (route?.__typename === "Redirect" && route.url) {
      throw redirect({
        href: route.url,
        statusCode: route.redirectCode ?? 302,
      });
    }

    return { typename: route?.__typename ?? null, url };
  },

  errorComponent: ({ error }) => (
    <ErrorBoundary
      error={error instanceof Error ? error : new Error(String(error))}
    />
  ),

  component: CatchAllPage,
});

// ─── Component ────────────────────────────────────────────────────────────────
function CatchAllPage() {
  const { typename, url } = Route.useLoaderData();

  if (!typename) return <NotFound />;

  const Component = pageComponents.get(typename);

  if (!Component) {
    console.warn(
      `CatchAllPage: no page component registered for typename "${typename}"`,
    );
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
