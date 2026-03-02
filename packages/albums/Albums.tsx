import Typography from "@/components/ui/typography/Typography";
import { AlbumsBlock } from "@/generated/graphql/graphql";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./Albums.module.scss";

const AlbumsItem = dynamic(() => import("./AlbumsItem"));
const Button = dynamic(() => import("@/components/ui/button/Button"));

type AlbumsProps = Partial<Omit<AlbumsBlock, "__typename" | "innerBlocks">>;

export default function Albums({ anchor, listUrl, albums }: AlbumsProps) {
  return (
    <section id={anchor ?? undefined} className={clsx("block block-albums contained", styles.albums)}>
      <Typography variant="display-3" as="h2" className={styles.title}>
        Voir & revoir
      </Typography>

      {albums && albums.length > 0 && (
        <ul className={styles.list}>
          {albums.map((album, index) => (
            <li key={index}>
              <AlbumsItem album={album} />
            </li>
          ))}
        </ul>
      )}

      {listUrl && (
        <div className={styles.actions}>
          {listUrl && (
            <Button asChild variant="contained" size="lg" startIcon="fa fa-plus">
              <Link href={listUrl}>Tous les albums</Link>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
