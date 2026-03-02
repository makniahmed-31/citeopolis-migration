import Hx from "@/components/utils/Hx";
import type { News } from "@/generated/graphql/graphql";
import useTitleLevel, { SubtitleLevelProvider } from "@/lib/hooks/useTitleLevel";
import NewsBriefItem from "./NewsBriefItem";
import styles from "./NewsBriefList.module.scss";

interface NewsBriefListProps {
  items: News[];
}

export default function NewsBriefList({ items }: NewsBriefListProps) {
  const titleLevel = useTitleLevel();

  return (
    <div className={styles.newsBriefList}>
      <Hx level={titleLevel} className={styles.title}>
        En Bref
      </Hx>
      <SubtitleLevelProvider level={titleLevel}>
        <ul className={styles.list}>
          {items?.slice(0, 4).map((brief, index) => (
            <li key={index}>
              <NewsBriefItem news={brief} />
            </li>
          ))}
        </ul>
      </SubtitleLevelProvider>
    </div>
  );
}
