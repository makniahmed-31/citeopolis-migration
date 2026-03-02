import type { News } from "@/generated/graphql/graphql";
import NewsItem from "./NewsItem";
import styles from "./NewsList.module.scss";

interface NewsListProps {
  items: News[];
}

export default function NewsList({ items }: NewsListProps) {
  return (
    <ul className={styles.newsList}>
      {items.map((newsItem, index) => (
        <li key={index}>
          <NewsItem news={newsItem} />
        </li>
      ))}
    </ul>
  );
}
