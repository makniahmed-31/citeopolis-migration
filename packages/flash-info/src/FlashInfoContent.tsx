import clsx from "clsx";
import type { FlashInfoItem } from "./types";
import styles from "./FlashInfoContent.module.scss";

interface FlashInfoContentProps {
  item: FlashInfoItem;
}

export default function FlashInfoContent({ item: flashInfo }: FlashInfoContentProps) {
  return (
    <div className={styles.flashInfo}>
      <i className={clsx("fa fa-triangle-exclamation", styles.topIcon)} aria-hidden="true" />
      {flashInfo.url ? (
        <div className={styles.wrapper}>
          <a href={flashInfo.url} className={styles.content}>
            {flashInfo.title && (
              <span className={styles.title}>
                <span className={styles.underline}>{flashInfo.title}</span>
              </span>
            )}
            {flashInfo.description && (
              <span className={styles.description}>
                <span className={styles.underline}>{flashInfo.description}</span>
              </span>
            )}
          </a>
          <i className={clsx("fa fa-plus", styles.plusIcon)} aria-hidden="true" />
        </div>
      ) : (
        <div className={styles.content}>
          {flashInfo.title && <h3 className={styles.title}>{flashInfo.title}</h3>}
          {flashInfo.description && <p className={styles.description}>{flashInfo.description}</p>}
        </div>
      )}
    </div>
  );
}
