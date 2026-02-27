import styles from "./Footer.module.scss";

/**
 * Base site footer.
 * Override per theme/site — same resolution as Header.
 */
export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Citeopolis. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
