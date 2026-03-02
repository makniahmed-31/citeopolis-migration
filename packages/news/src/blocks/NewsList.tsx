import type { NewsItemData } from "../types";
import NewsItem from "./NewsItem";
import styles from "./NewsList.module.scss";

interface NewsListProps {
  items: NewsItemData[];
}

export default function NewsList({ items }: NewsListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <NewsItem item={item} />
        </li>
      ))}
    </ul>
  );
}
