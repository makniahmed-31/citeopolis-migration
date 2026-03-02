import { Link } from "@tanstack/react-router";
import { Image } from "@/lib/image";
import type { AlbumItemData } from "../types";
import styles from "./AlbumsItem.module.scss";

interface AlbumsItemProps {
  album: AlbumItemData;
}

export default function AlbumsItem({ album }: AlbumsItemProps) {
  const { title, url, coverImage, count } = album;

  return (
    <article className={styles.item}>
      <Link to={url} className={styles.link}>
        {coverImage && (
          <div className={styles.cover}>
            <Image src={coverImage.url} width={400} height={300} alt={coverImage.alt || title} />
          </div>
        )}
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          {count !== undefined && count !== null && (
            <span className={styles.count}>{count} photos</span>
          )}
        </div>
      </Link>
    </article>
  );
}
