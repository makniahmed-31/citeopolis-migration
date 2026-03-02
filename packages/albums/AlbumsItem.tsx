import IconButton from "@/components/ui/icon-button/IconButton";
import Typography from "@/components/ui/typography/Typography";
import MaybeLink from "@/components/utils/MaybeLink";
import type { Album } from "@/generated/graphql/graphql";
import clsx from "clsx";
import Image from "next/image";
import styles from "./AlbumsItem.module.scss";

interface AlbumsItemProps {
  album: Album;
}

export default function AlbumsItem({ album: { images, url, title, categories, media } }: AlbumsItemProps) {
  const [category] = categories ?? [];
  const image = images?.ratio_3x2 ?? null;
  const hasVideo = media.some((item) => item.__typename === "AlbumVideo");

  return (
    <article className={styles.albumsItem}>
      <div className={styles.details}>
        <IconButton size={{ mobile: "md", desktop: "lg" }} color={hasVideo ? "secondary" : "primary"} asChild>
          <div className={styles.button}>
            <i className={clsx("fa", hasVideo ? "fa-play" : "fa-eye")} aria-hidden="true" />
            <span className="sr-only">En savoir plus</span>
          </div>
        </IconButton>
        <Typography variant="h5" as="h3" className={styles.title}>
          {category && (
            <Typography variant="subtitle-2" color="text-brand" className={styles.category}>
              {category.title}
              <span className="sr-only">:</span>
            </Typography>
          )}
          <MaybeLink href={url} className={styles.titleLink}>
            {title}
          </MaybeLink>
        </Typography>
      </div>
      {image?.url && (
        <Image
          className={styles.image}
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.alt ?? ""}
          sizes="(max-width: 767px) 100vw, 592px"
        />
      )}
    </article>
  );
}
