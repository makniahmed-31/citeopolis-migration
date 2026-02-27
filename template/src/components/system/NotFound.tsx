import { Link } from "@tanstack/react-router";
import styles from "./NotFound.module.scss";

/**
 * 404 page component — replaces Next.js not-found.ts convention.
 */
export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page introuvable</h1>
      <p className={styles.message}>
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className={styles.link}>
        Retour à l'accueil
      </Link>
    </div>
  );
}
