import { createFileRoute, redirect } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { getApolloClient } from "@/lib/graphql";
import {
  GetRouteDocument,
  type GetRouteQuery,
} from "@/generated/graphql/graphql";
import ErrorBoundary from "@components/system/ErrorBoundary";
import NotFound from "@components/system/NotFound";

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

    let route: GetRouteQuery["route"] = null;

    try {
      const result = await client.query<GetRouteQuery>({
        query: GetRouteDocument,
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
    <ErrorBoundary error={error instanceof Error ? error : new Error(String(error))} />
  ),

  component: CatchAllPage,
});

// ─── Component ────────────────────────────────────────────────────────────────
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
