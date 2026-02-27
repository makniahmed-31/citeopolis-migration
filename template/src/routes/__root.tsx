import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense, useMemo } from "react";
import { resolveComponent } from "@/lib/componentRegistry";
import { useActiveTheme } from "@/lib/theme";
import Footer from "@/components/layout/Footer";

/**
 * Root layout — wraps every page with Header and Footer.
 *
 * Header is resolved at runtime via componentRegistry:
 *   theme "municipal" → themes/municipal/components/layout/Header.tsx
 *   theme "base"      → src/components/layout/Header.tsx (fallback)
 *
 * Changing the theme (via siteConfig.theme from BE) hot-swaps the Header
 * without a page reload — only the CSS tokens and this component swap.
 */
export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const theme = useActiveTheme();

  // Memoized: lazy() is only called once per theme change, not on every render
  const Header = useMemo(
    () => resolveComponent("layout/Header", theme),
    [theme]
  );

  return (
    <div id="top" className="site-wrapper">
      <a href="#main" className="sr-only">
        Aller au contenu principal
      </a>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main id="main" className="site-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
