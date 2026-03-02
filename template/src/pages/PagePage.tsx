import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import NotFound from "@components/system/NotFound";

const PAGE_QUERY = gql`
  query GetPage($url: String!) {
    page(url: $url) {
      title
      structuredContent
    }
  }
`;

interface PagePageProps {
  url: string;
}

export default function PagePage({ url }: PagePageProps) {
  const { data, loading, error } = useQuery<{
    page?: {
      title?: string | null;
      structuredContent?: Parameters<
        typeof BlockRenderer
      >[0]["structuredContent"];
    };
  }>(PAGE_QUERY, { variables: { url } });

  useEffect(() => {
    if (data?.page?.title) {
      document.title = data.page.title;
    }
  }, [data?.page?.title]);

  if (loading)
    return (
      <div className="sr-only" aria-live="polite">
        Chargement…
      </div>
    );
  if (error) throw error;
  if (!data?.page) return <NotFound />;
  console.log("data.page.structuredContent", data.page.structuredContent);
  return (
    <div className="layout-1column-fullwidth">
      <div className="column main">
        <BlockRenderer structuredContent={data.page.structuredContent} />
      </div>
    </div>
  );
}
