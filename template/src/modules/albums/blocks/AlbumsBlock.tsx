import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { lazy, Suspense } from "react";
import Typography from "@components/ui/typography/Typography";
import type { AlbumsBlock as AlbumsBlockType } from "@/generated/graphql/graphql";
import styles from "./AlbumsBlock.module.scss";

const AlbumsItem = lazy(() => import("./AlbumsItem"));
const Button = lazy(() => import("@components/ui/button/Button"));

type AlbumsProps = Partial<Omit<AlbumsBlockType, "__typename" | "innerBlocks">>;

/**
 * Displays a photo album grid.
 * Module: @citeopolis/albums
 */
export default function AlbumsBlock({ anchor, listUrl, albums }: AlbumsProps) {
  return (
    <section id={anchor ?? undefined} className={clsx("block block-albums contained", styles.albums)}>
      <Typography variant="display-3" as="h2" className={styles.title}>
        Voir &amp; revoir
      </Typography>

      {albums && albums.length > 0 && (
        <ul className={styles.list}>
          {albums.map((album, index) => (
            <li key={album.id ?? index}>
              <Suspense fallback={null}>
                <AlbumsItem album={album} />
              </Suspense>
            </li>
          ))}
        </ul>
      )}

      {listUrl && (
        <div className={styles.actions}>
          <Suspense fallback={null}>
            <Button asChild variant="contained" size="lg" startIcon="fa fa-plus">
              <Link to={listUrl}>Tous les albums</Link>
            </Button>
          </Suspense>
        </div>
      )}
    </section>
  );
}
