import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { lazy, Suspense } from "react";
import Typography from "@components/ui/typography/Typography";
import { SubtitleLevelProvider } from "@/lib/hooks/useTitleLevel";
import type { NewsBlockData } from "../types";
import styles from "./NewsBlock.module.scss";

const Button = lazy(() => import("@components/ui/button/Button"));
const NewsBriefList = lazy(() => import("./NewsBriefList"));
const NewsFocus = lazy(() => import("./NewsFocus"));
const NewsList = lazy(() => import("./NewsList"));

export default function NewsBlock({
  anchor,
  briefNews,
  focusedNews,
  listUrl,
  news,
  proposeUrl,
}: NewsBlockData) {
  return (
    <section id={anchor ?? undefined} className={clsx("block block-news contained", styles.news)}>
      <div className={styles.titleWrapper}>
        <Typography variant="display-3" as="h2">
          Actualités
        </Typography>
      </div>

      <SubtitleLevelProvider level={2}>
        {focusedNews && (
          <Suspense fallback={null}>
            <NewsFocus news={focusedNews} />
          </Suspense>
        )}
        {news && news.length > 0 && (
          <Suspense fallback={null}>
            <NewsList items={news} />
          </Suspense>
        )}
        {briefNews && briefNews.length > 0 && (
          <Suspense fallback={null}>
            <NewsBriefList items={briefNews} />
          </Suspense>
        )}
      </SubtitleLevelProvider>

      {(listUrl || proposeUrl) && (
        <div className={styles.actions}>
          {listUrl && (
            <Suspense fallback={null}>
              <Button asChild variant="contained" size="lg" startIcon="fa fa-plus">
                <Link to={listUrl}>Toutes les actualités</Link>
              </Button>
            </Suspense>
          )}
          {proposeUrl && (
            <Suspense fallback={null}>
              <Button asChild variant="outlined" size="lg" startIcon="fa fa-lightbulb-on">
                <Link to={proposeUrl}>Proposer une actualité</Link>
              </Button>
            </Suspense>
          )}
        </div>
      )}
    </section>
  );
}
