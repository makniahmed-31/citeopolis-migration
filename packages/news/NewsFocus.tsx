import Typography from "@/components/ui/typography/Typography";
import Hx from "@/components/utils/Hx";
import type { News } from "@/generated/graphql/graphql";
import useTitleLevel from "@/lib/hooks/useTitleLevel";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsFocus.module.scss";

interface NewsFocusProps {
  news: News;
}

export default function NewsFocus({ news: { images, url, title, categories } }: NewsFocusProps) {
  const [category] = categories ?? [];
  const image = images?.ratio_3x2 ?? null;
  const titleLevel = useTitleLevel();

  return (
    <article className={styles.newsFocus}>
      <div className={styles.content}>
        {title && (
          <Hx level={titleLevel} className={styles.title}>
            {category && (
              <Typography variant="subtitle-1" color="text-brand" className={styles.category} as="span">
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
        )}
      </div>
      {image?.url && (
        <Image
          className={styles.image}
          src={image.url}
          width={592}
          height={395}
          alt={image.alt ?? ""}
          sizes="(max-width: 767px) 344px, (max-width: 1279px) 348px, 592px"
        />
      )}
    </article>
  );
}
