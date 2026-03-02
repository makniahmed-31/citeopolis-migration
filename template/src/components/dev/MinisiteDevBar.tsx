import { SITE_CONFIGS, resolveSiteConfig } from "@/lib/siteConfigs";

/**
 * Dev-only minisite switcher bar.
 * Renders above the site header and lets you jump between configured minisites
 * without editing /etc/hosts or restarting the dev server.
 *
 * Stripped from production builds automatically (import.meta.env.DEV is false).
 */
export default function MinisiteDevBar() {
  if (!import.meta.env.DEV) return null;

  const hostname = window.location.hostname;
  const port = window.location.port;
  const current = resolveSiteConfig(hostname);

  return (
    <div style={styles.bar} aria-label="Minisite switcher (dev only)">
      <span style={styles.badge}>DEV</span>

      <nav style={styles.nav}>
        {SITE_CONFIGS.map((site) => {
          const isActive = site.hostname === current.hostname;
          const href = `http://${site.hostname}${port ? `:${port}` : ""}`;

          return (
            <a
              key={site.hostname}
              href={href}
              style={isActive ? { ...styles.link, ...styles.linkActive } : styles.link}
              aria-current={isActive ? "page" : undefined}
            >
              <span style={styles.siteName}>{site.siteName}</span>
              <span style={isActive ? { ...styles.tag, ...styles.tagActive } : styles.tag}>
                {site.theme}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// ─── Inline styles ─────────────────────────────────────────────────────────────
// Intentionally inline — this component must be independent of the theme system.

const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 12px",
    height: "32px",
    background: "#18181b",
    color: "#a1a1aa",
    fontSize: "11px",
    fontFamily: "monospace",
    position: "sticky",
    top: 0,
    zIndex: 9999,
    borderBottom: "1px solid #3f3f46",
  } as React.CSSProperties,

  badge: {
    padding: "1px 6px",
    background: "#7c3aed",
    color: "#fff",
    borderRadius: "3px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    marginRight: "4px",
  } as React.CSSProperties,

  nav: {
    display: "flex",
    gap: "2px",
  } as React.CSSProperties,

  link: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 10px",
    height: "32px",
    color: "#a1a1aa",
    textDecoration: "none",
    borderRadius: "4px",
    transition: "background 0.15s",
  } as React.CSSProperties,

  linkActive: {
    background: "#27272a",
    color: "#f4f4f5",
  } as React.CSSProperties,

  siteName: {
    whiteSpace: "nowrap",
  } as React.CSSProperties,

  tag: {
    padding: "1px 5px",
    background: "#3f3f46",
    color: "#a1a1aa",
    borderRadius: "3px",
    fontSize: "10px",
  } as React.CSSProperties,

  tagActive: {
    background: "#4f46e5",
    color: "#e0e7ff",
  } as React.CSSProperties,
} as const;
