/**
 * Demo site — custom logo override.
 * Replaces the default logo in Header.tsx for this site.
 *
 * Used via: @components/layout/Logo → resolved to this file by vite-plugin-theme.
 */
export default function Logo() {
  return (
    <span style={{ fontWeight: 700, fontSize: "2rem", color: "var(--color-primary-brand)" }}>
      Démo
    </span>
  );
}
