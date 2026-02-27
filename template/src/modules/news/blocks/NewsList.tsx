import type { NewsItem } from "@/generated/graphql/graphql";
import NewsItemComponent from "./NewsItem";
import styles from "./NewsList.module.scss";

interface NewsListProps {
  items: NewsItem[];
}

export default function NewsList({ items }: NewsListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <NewsItemComponent item={item} />
        </li>
      ))}
    </ul>
  );
}
