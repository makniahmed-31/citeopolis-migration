import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Image } from "@/lib/image";
import NotFound from "@components/system/NotFound";
import type { News } from "@/generated/graphql/graphql";
import styles from "./NewsPage.module.scss";

const NEWS_QUERY = gql`
  query GetNews($url: URL!) {
    route(url: $url) {
      ... on News {
        id
        title
        leadText
        publicationDate
        modifiedDate
        structuredContent
        images {
          ratio_3x2 { url width height alt }
        }
        categories { title level }
        breadcrumbs { items { title url } }
        metadata { title description }
      }
    }
  }
`;

interface NewsPageProps {
  url: string;
}

export default function NewsPage({ url }: NewsPageProps) {
  const { data, loading, error } = useQuery<{ route?: News }>(
    NEWS_QUERY,
    { variables: { url } }
  );

  const news = data?.route?.__typename === "News" ? data.route : undefined;

  useEffect(() => {
    if (news?.metadata?.title) {
      document.title = news.metadata.title;
    }
  }, [news?.metadata?.title]);

  if (loading) return <div className="sr-only" aria-live="polite">Chargement…</div>;
  if (error) throw error;
  if (!news) return <NotFound />;

  const { title, leadText, images, publicationDate, breadcrumbs, structuredContent } = news;
  const image = images?.ratio_3x2;

  const surtitle = news.categories
    .filter((c: { level: number; title: string }) => c.level === 0)
    .map((c: { level: number; title: string }) => c.title)
    .join(", ");

  return (
    <>
      {breadcrumbs.items.length > 0 && (
        <nav aria-label="Fil d'Ariane" className={styles.breadcrumbs}>
          <ol className={styles.breadcrumbsList}>
            {breadcrumbs.items.map((item: { title: string; url: string }, i: number) => (
              <li key={i}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <header className={styles.heading}>
        <div className={styles.headingContent}>
          {surtitle && <p className={styles.surtitle}>{surtitle}</p>}
          <h1 className={styles.title}>{title ?? "Sans titre"}</h1>
          {leadText && <p className={styles.lead}>{leadText}</p>}
          {publicationDate && (
            <time className={styles.date} dateTime={publicationDate}>
              Publié le{" "}
              {new Date(publicationDate).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
        </div>
        {image && (
          <div className={styles.headingImage}>
            <Image src={image.url} width={image.width} height={image.height} alt={image.alt} priority />
          </div>
        )}
      </header>

      <div className="layout-1column-fullwidth">
        <div className="column main">
          <BlockRenderer structuredContent={structuredContent} />
        </div>
      </div>
    </>
  );
}
