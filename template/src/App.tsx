import { ApolloProvider } from "@apollo/client/react";
import { useQuery } from "@apollo/client/react";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getApolloClient } from "@/lib/graphql";
import {
  SITE_CONFIG_QUERY,
  type SiteConfigQueryResult,
} from "@/lib/siteConfig";
import { applyTheme, FeaturesContext, ThemeContext } from "@/lib/theme";
import { resolveSiteConfig } from "@/lib/siteConfigs";
import { router } from "@/router";

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ApolloProvider client={getApolloClient()}>
      <AppContent />
    </ApolloProvider>
  );
}

// ─── Site config resolution ────────────────────────────────────────────────────

/**
 * Queries the BE for site configuration on app init.
 * The BE maps the current domain → theme + feature list.
 *
 * Falls back to resolveSiteConfig(hostname) so that local multi-site testing
 * works even without VITE_MOCK_API=true or when the BE doesn't yet return
 * `theme`/`features` (schema extension not deployed upstream).
 */
function AppContent() {
  const { data } = useQuery<SiteConfigQueryResult>(SITE_CONFIG_QUERY, {
    errorPolicy: "all",
  });

  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "localhost";
  const localConfig = resolveSiteConfig(hostname);

  const [theme, setTheme] = useState(localConfig.theme);
  const features = data?.siteConfig?.features ?? localConfig.features;
  const siteName = data?.siteConfig?.siteName;

  // Sync theme whenever the query resolves (BE overrides local default)
  useEffect(() => {
    const resolved = data?.siteConfig?.theme ?? localConfig.theme;
    setTheme(resolved);
    applyTheme(resolved);
  }, [data?.siteConfig?.theme, localConfig.theme]);

  useEffect(() => {
    if (siteName) document.title = siteName;
  }, [siteName]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <FeaturesContext.Provider value={features}>
        <RouterProvider router={router} />
      </FeaturesContext.Provider>
    </ThemeContext.Provider>
  );
}
