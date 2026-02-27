import type { FlashInfo } from "@/generated/graphql/graphql";
import clsx from "clsx";
import { lazy, Suspense, useId, useState } from "react";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import styles from "./FlashInfoBanner.module.scss";
import FlashInfoContent from "./FlashInfoContent";

interface FlashInfoBannerProps {
  color?: "primary" | "secondary" | "tertiary" | "neutral";
  flashInfos: Pick<
    Partial<FlashInfo>,
    "id" | "modifiedDate" | "title" | "description" | "url"
  >[];
}

/**
 * React native code-splitting (replaces next/dynamic)
 */
const FlashInfoCarousel = lazy(() => import("./FlashInfoCarousel"));

export const FLASH_INFO_CLOSED_KEY = "citeopolis:flash-infos:closed";

function getFlashInfoKey({
  id,
  modifiedDate,
}: Pick<Partial<FlashInfo>, "id" | "modifiedDate">) {
  return `flash-info|${id}|${modifiedDate}`;
}

export default function FlashInfoBanner({
  flashInfos,
  color = "primary",
}: FlashInfoBannerProps) {
  const titleId = useId();
  const isClient = useIsClient();

  const [isClosed, setIsClosed] = useState(false);
  const [closedFlashInfoKeys, setClosedFlashInfoKeys] = useLocalStorage<
    string[]
  >(FLASH_INFO_CLOSED_KEY, []);

  const closeAll = () => {
    setClosedFlashInfoKeys(
      flashInfos.map((flashInfo) => getFlashInfoKey(flashInfo)),
    );
    setIsClosed(true);
  };

  const activeFlashInfos = flashInfos
    .filter((f) => f.title || f.description)
    .filter((f) => !closedFlashInfoKeys.includes(getFlashInfoKey(f)));

  if (!isClient || activeFlashInfos.length === 0 || isClosed) {
    return null;
  }

  return (
    <article
      className={clsx(
        styles.flashInfoBanner,
        color && styles[`color-${color}`],
      )}
      aria-labelledby={titleId}
      aria-roledescription={
        activeFlashInfos.length > 1 ? "Carrousel" : undefined
      }
    >
      <h2 id={titleId} className="sr-only">
        Flash Info
      </h2>

      {activeFlashInfos.length > 1 ? (
        <Suspense fallback={null}>
          <FlashInfoCarousel flashInfos={activeFlashInfos} />
        </Suspense>
      ) : (
        <div className={styles.bannerContent}>
          {activeFlashInfos.map((item, index) => (
            <FlashInfoContent key={index} item={item} />
          ))}
        </div>
      )}

      <button type="button" className={styles.closeButton} onClick={closeAll}>
        <span className="text">Fermer</span>
        <i className="fa fa-xmark" aria-hidden="true" />
      </button>
    </article>
  );
}
