import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { getApolloClient } from "@/lib/graphql";
import {
  GetPageDocument,
  type GetPageQuery,
} from "@/generated/graphql/graphql";
import ErrorBoundary from "@components/system/ErrorBoundary";
import NotFound from "@components/system/NotFound";
import BlockRenderer from "@/components/blocks/BlockRenderer";

// ─── Query ────────────────────────────────────────────────────────────────────
// Uses GetPageDocument with url="/" — equivalent to page(url: "/") in Next.js.
// Switch to graphql(`query GetHomepage { page(url: "/") { ... } }`) after
// running `pnpm generate` to register the new query string.

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  async loader() {
    const client = getApolloClient();

    const { data } = await client.query<GetPageQuery>({
      query: GetPageDocument,
      variables: { url: "/" },
      errorPolicy: "all",
    });

    return data?.page ?? null;
  },

  errorComponent: ({ error }) => (
    <ErrorBoundary error={error instanceof Error ? error : new Error(String(error))} />
  ),

  component: IndexPage,
});

// ─── Component ────────────────────────────────────────────────────────────────
function IndexPage() {
  const page = Route.useLoaderData() as GetPageQuery["page"];

  useEffect(() => {
    if (page?.title) document.title = page.title;
  }, [page?.title]);

  if (!page) return <NotFound />;

  return (
    <div className="layout-1column-fullwidth">
      <div className="column main">
        <BlockRenderer structuredContent={page.structuredContent} />
      </div>
    </div>
  );
}
