import { useTheme } from "@/lib/theme";
import styles from "./Header.module.scss";

/**
 * Municipal theme Header override.
 * Demonstrates component-level theme inheritance:
 * - Different layout (logo left, nav right with distinct styling)
 * - Uses municipal-specific CSS tokens
 * - Falls back to base Header if this file doesn't exist
 */
export default function Header() {
  const { theme } = useTheme();

  return (
    <header className={styles.header} role="banner">
      <div className={styles.topBar}>
        <span className={styles.themeBadge}>Thème : {theme}</span>
      </div>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Accueil">
          <span className={styles.logoIcon} aria-hidden>
            🏛
          </span>
          <div className={styles.logoText}>
            <strong>Ville de Démo</strong>
            <span>Citéopolis Municipal</span>
          </div>
        </a>

        <nav className={styles.nav} aria-label="Navigation principale">
          <a href="/" className={styles.navLink}>
            Accueil
          </a>
          <a href="/actualites" className={styles.navLink}>
            Actualités
          </a>
          <a href="/albums" className={styles.navLink}>
            Albums
          </a>
        </nav>
      </div>
    </header>
  );
}
