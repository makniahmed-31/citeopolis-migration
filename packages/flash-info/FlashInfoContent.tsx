import type { FlashInfo } from "@/generated/graphql/graphql";
import clsx from "clsx";
import Link from "next/link";
import styles from "./FlashInfoContent.module.scss";

interface FlashInfoContentProps {
  item: Partial<FlashInfo>;
}

export default function FlashInfoContent({ item: flashInfo }: FlashInfoContentProps) {
  return (
    <div className={styles.flashInfo}>
      <i className={clsx("fa fa-triangle-exclamation", styles.topIcon)} aria-hidden="true"></i>
      {flashInfo.url ? (
        <div className={styles.wrapper}>
          <Link href={flashInfo.url} className={styles.content}>
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
          </Link>
          <i className={clsx("fa fa-plus", styles.plusIcon)} aria-hidden="true"></i>
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
