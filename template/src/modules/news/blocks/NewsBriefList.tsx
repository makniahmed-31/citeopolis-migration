import type { BriefNewsItem } from "@/generated/graphql/graphql";
import NewsBriefItem from "./NewsBriefItem";
import styles from "./NewsBriefList.module.scss";

interface NewsBriefListProps {
  items: BriefNewsItem[];
}

export default function NewsBriefList({ items }: NewsBriefListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <NewsBriefItem item={item} />
        </li>
      ))}
    </ul>
  );
}
