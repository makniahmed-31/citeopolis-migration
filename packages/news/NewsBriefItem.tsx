import Typography from "@/components/ui/typography/Typography";
import Hx from "@/components/utils/Hx";
import type { News } from "@/generated/graphql/graphql";
import useTitleLevel from "@/lib/hooks/useTitleLevel";
import Link from "next/link";
import styles from "./NewsBriefItem.module.scss";

interface NewsBriefItemProps {
  news: News;
}

export default function NewsBriefItem({ news }: NewsBriefItemProps) {
  const { url, title, categories } = news;
  const [category] = categories ?? [];
  const titleLevel = useTitleLevel();

  return (
    <article className={styles.briefNews}>
      <Hx level={titleLevel} className={styles.title}>
        {category && (
          <Typography variant="subtitle-2" color="text-brand" className={styles.category} as="span">
            {category.title}
            <span className="sr-only">:</span>
          </Typography>
        )}
        {url ? (
          <Link href={url} className={styles.titleLink}>
            {title}
          </Link>
        ) : (
          title
        )}
      </Hx>
    </article>
  );
}
