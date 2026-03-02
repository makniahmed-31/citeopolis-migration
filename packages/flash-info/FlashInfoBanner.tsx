"use client";

import type { FlashInfo } from "@/generated/graphql/graphql";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import styles from "./FlashInfoBanner.module.scss";
import FlashInfoContent from "./FlashInfoContent";

interface FlashInfoBannerProps {
  color?: "primary" | "secondary" | "tertiary" | "neutral";
  flashInfos: Pick<Partial<FlashInfo>, "id" | "modifiedDate" | "title" | "description" | "url">[];
}

const FlashInfoCarousel = dynamic(() => import("./FlashInfoCarousel"));

/**
 * Localstorage item key to store closed flash infos.
 */
export const FLASH_INFO_CLOSED_KEY = "citeopolis:flash-infos:closed";

/**
 * Generate a unique key for a flash info, based on its modifiedDate,
 * so when a flash info content has changed, it is displayed again.
 */
function getFlashInfoKey({ id, modifiedDate }: Pick<Partial<FlashInfo>, "id" | "modifiedDate">) {
  return `flash-info|${id}|${modifiedDate}`;
}

/**
 * A banner that displays multiple flash infos.
 */
export default function FlashInfoBanner({ flashInfos, color = "primary" }: FlashInfoBannerProps) {
  const titleId = useId();
  const isClient = useIsClient();
  const [isClosed, setIsClosed] = useState(false);
  const [closedFlashInfoKeys, setClosedFlashInfoKeys] = useLocalStorage<string[]>(FLASH_INFO_CLOSED_KEY, []);

  const closeAll = () => {
    setClosedFlashInfoKeys(flashInfos.map((flashInfo) => getFlashInfoKey(flashInfo)));
    setIsClosed(true);
  };

  const activeFlashInfos = flashInfos
    .filter((flashInfo) => flashInfo.title || flashInfo.description)
    .filter((flashInfo) => !closedFlashInfoKeys.includes(getFlashInfoKey(flashInfo)));

  if (!isClient || activeFlashInfos.length === 0 || isClosed) {
    return null;
  }

  return (
    <article
      className={clsx(styles.flashInfoBanner, color && styles[`color-${color}`])}
      aria-labelledby={titleId}
      aria-roledescription={activeFlashInfos.length > 1 ? "Carrousel" : undefined}
    >
      <h2 id={titleId} className="sr-only">
        Flash Info
      </h2>
      {activeFlashInfos.length > 1 ? (
        <FlashInfoCarousel flashInfos={activeFlashInfos} />
      ) : (
        <div className={styles.bannerContent}>
          {activeFlashInfos.map((item, index) => (
            <FlashInfoContent key={index} item={item} />
          ))}
        </div>
      )}
      <button type="button" className={styles.closeButton} onClick={closeAll}>
        <span className="text">Fermer</span> <i className="fa fa-xmark" aria-hidden="true"></i>
      </button>
    </article>
  );
}
