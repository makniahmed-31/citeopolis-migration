import styles from "./Header.module.scss";

/**
 * Base site header.
 * Override per theme: create themes/{theme}/components/layout/Header.tsx
 * Override per site: create sites/{site}/overrides/components/layout/Header.tsx
 *
 * The vite-plugin-theme resolves @components/layout/Header through the chain.
 */
export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Accueil">
          <span className={styles.logoText}>Citeopolis</span>
        </a>

        <nav className={styles.nav} aria-label="Navigation principale">
          {/* Navigation populated from WP siteConfig in real implementation */}
        </nav>
      </div>
    </header>
  );
}
