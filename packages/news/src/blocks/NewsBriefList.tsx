import type { BriefNewsItemData } from "../types";
import NewsBriefItem from "./NewsBriefItem";
import styles from "./NewsBriefList.module.scss";

interface NewsBriefListProps {
  items: BriefNewsItemData[];
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
