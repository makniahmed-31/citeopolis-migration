import { Link } from "@tanstack/react-router";
import { Image } from "@/lib/image";
import type { NewsItem } from "@/generated/graphql/graphql";
import styles from "./NewsFocus.module.scss";

interface NewsFocusProps {
  news: NewsItem;
}

export default function NewsFocus({ news }: NewsFocusProps) {
  const { title, url, images, leadText, publicationDate } = news;
  const image = images?.ratio_3x2;

  return (
    <article className={styles.focus}>
      {image && (
        <div className={styles.image}>
          <Image src={image.url} width={image.width} height={image.height} alt={image.alt} priority />
        </div>
      )}
      <div className={styles.content}>
        {publicationDate && (
          <time className={styles.date} dateTime={publicationDate}>
            {new Date(publicationDate).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
        <h3 className={styles.title}>
          <Link to={url} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
        {leadText && <p className={styles.lead}>{leadText}</p>}
      </div>
    </article>
  );
}
