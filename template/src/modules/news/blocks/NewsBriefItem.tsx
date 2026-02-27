import { Link } from "@tanstack/react-router";
import type { BriefNewsItem } from "@/generated/graphql/graphql";
import styles from "./NewsBriefItem.module.scss";

interface NewsBriefItemProps {
  item: BriefNewsItem;
}

export default function NewsBriefItem({ item }: NewsBriefItemProps) {
  const { title, url, publicationDate } = item;

  return (
    <article className={styles.item}>
      {publicationDate && (
        <time className={styles.date} dateTime={publicationDate}>
          {new Date(publicationDate).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })}
        </time>
      )}
      <Link to={url} className={styles.title}>
        {title}
      </Link>
    </article>
  );
}
