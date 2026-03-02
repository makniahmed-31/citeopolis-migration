import Typography from "@/components/ui/typography/Typography";
import Hx from "@/components/utils/Hx";
import type { News } from "@/generated/graphql/graphql";
import useTitleLevel from "@/lib/hooks/useTitleLevel";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsItem.module.scss";

interface NewsItemProps {
  news: News;
}

export default function NewsItem({ news }: NewsItemProps) {
  const { images, url, title, categories } = news;
  const [category] = categories ?? [];
  const image = images?.ratio_3x2 ?? null;
  const titleLevel = useTitleLevel();

  return (
    <article className={styles.newsItem}>
      <div className={styles.content}>
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
      </div>
      {image?.url && (
        <Image
          className={styles.image}
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.alt ?? ""}
        />
      )}
    </article>
  );
}
