import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import { useQuery } from "@apollo/client/react";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { getApolloClient } from "@/lib/graphql";
import { SITE_CONFIG_QUERY, type SiteConfigQueryResult } from "@/lib/siteConfig";
import { applyTheme, FeaturesContext, ThemeContext } from "@/lib/theme";
import { ACTIVE_THEME } from "@/lib/env";
import { router } from "@/router";

// ─── Provider selection ────────────────────────────────────────────────────────

let mockClientInstance: ApolloClient | null = null;

function getMockClient(): ApolloClient {
  if (mockClientInstance) return mockClientInstance;
  // Dynamic require keeps mock handlers out of production bundles
  // VITE_MOCK_API is a static string — bundler eliminates the dead branch
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { mockLink } = require("@/mock/handlers");
  mockClientInstance = new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
  });
  return mockClientInstance;
}

function getClient(): ApolloClient {
  if (import.meta.env.VITE_MOCK_API === "true") return getMockClient();
  return getApolloClient();
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ApolloProvider client={getClient()}>
      <AppContent />
    </ApolloProvider>
  );
}

// ─── Site config resolution ────────────────────────────────────────────────────

/**
 * Queries the BE for site configuration on app init.
 * The BE maps the current domain → theme + feature list.
 * Once resolved, applies CSS token cascade and provides contexts to the tree.
 */
function AppContent() {
  const { data, loading } = useQuery<SiteConfigQueryResult>(SITE_CONFIG_QUERY);

  const theme = data?.siteConfig?.theme ?? ACTIVE_THEME;
  const features = data?.siteConfig?.features ?? [];
  const siteName = data?.siteConfig?.siteName;

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (siteName) document.title = siteName;
  }, [siteName]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "var(--color-neutral-500)", fontSize: "var(--font-size-sm)" }}>
          Chargement de la configuration…
        </p>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <FeaturesContext.Provider value={features}>
        <RouterProvider router={router} />
      </FeaturesContext.Provider>
    </ThemeContext.Provider>
  );
}
