"use client";

import Typography from "@/components/ui/typography/Typography";
import type { NewsBlock } from "@/generated/graphql/graphql";
import { SubtitleLevelProvider } from "@/lib/hooks/useTitleLevel";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./News.module.scss";

const Button = dynamic(() => import("@/components/ui/button/Button"));
const NewsBriefList = dynamic(() => import("./NewsBriefList"));
const NewsFocus = dynamic(() => import("./NewsFocus"));
const NewsList = dynamic(() => import("./NewsList"));
const Tags = dynamic(() => import("@/components/ui/tag-bar/TagBar"));

type NewsProps = Partial<Omit<NewsBlock, "__typename" | "innerBlocks">>;

/**
 * A block that displays a selection of news.
 */
export default function News({ anchor, briefNews, focusedNews, listUrl, news, proposeUrl, tags }: NewsProps) {
  return (
    <section id={anchor ?? undefined} className={clsx("block block-news contained", styles.news)}>
      <div className={styles.titleWrapper}>
        <Typography variant="display-3" as="h2">
          Actualités
        </Typography>
        {tags && (
          <Tags className={styles.tags} items={tags} aria-roledescription="Liste des thématiques" color="neutral" />
        )}
      </div>

      <SubtitleLevelProvider level={2}>
        {focusedNews && <NewsFocus news={focusedNews} />}
        {news && news.length > 0 && <NewsList items={news} />}
        {briefNews && briefNews.length > 0 && <NewsBriefList items={briefNews} />}
      </SubtitleLevelProvider>

      {(listUrl || proposeUrl) && (
        <div className={styles.actions}>
          {listUrl && (
            <Button asChild variant="contained" size="lg" startIcon="fa fa-plus">
              <Link href={listUrl}>Toutes les actualités</Link>
            </Button>
          )}
          {proposeUrl && (
            <Button asChild variant="outlined" size="lg" startIcon="fa fa-lightbulb-on">
              <Link href={proposeUrl}>Proposer une actualité</Link>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
