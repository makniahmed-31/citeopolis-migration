import { Link } from "@tanstack/react-router";
import { Image } from "@/lib/image";
import type { NewsItemData } from "../types";
import styles from "./NewsItem.module.scss";

interface NewsItemProps {
  item: NewsItemData;
}

export default function NewsItem({ item }: NewsItemProps) {
  const { title, url, images, publicationDate } = item;
  const image = images?.ratio_3x2;

  return (
    <article className={styles.item}>
      {image && (
        <div className={styles.image}>
          <Image src={image.url} width={400} height={267} alt={image.alt} />
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
      </div>
    </article>
  );
}
