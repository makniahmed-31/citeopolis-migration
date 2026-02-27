Architecture Summary
Current Architecture (Next.js 15, App Router)
Monorepo structure:

citeopolis-frontend/
├── packages/
│ ├── commitlint-config/ # Commit linting
│ ├── create-app/ # CLI to scaffold projects
│ ├── eslint-config/ # ESLint shared config
│ ├── prettier-config/ # Prettier shared config
│ └── stylelint-config/ # Stylelint shared config

└── template/ # The actual Next.js app
├── app/ # Next.js App Router
│ ├── (site)/ # Main site routes (grouped)
│ ├── (map)/ # Map routes (separate layout)
│ ├── (extranet)/ # Extranet routes
│ └── layout.tsx # Root layout
├── components/
│ ├── blocks/ # Content blocks (auto-registered)
│ ├── ui/ # UI components
│ ├── accessibility-config/
│ └── cart
The template directory contains the main Next.js application with route grouping to manage different sections of the site, each with their own layouts and components organized by feature and purpose.

Looking at the rest of the component structure, there are specialized folders for typography, comments, cookie consent, extranet features, filters, forms, polls, and various utility components. The lib directory holds server-only utilities, while the styles folder contains the SCSS design system with tokens and variables for consistent theming. There's also a utils folder for shared utilities, local fonts, and a public directory for static assets.

Now I'm seeing how the project is organized with Storybook stories, TypeScript types, and auto-generated GraphQL types. The key architectural patterns are becoming clear: the middleware uses a route-as-type system where every URL gets resolved through GraphQL to determine its typename, which then gets converted to a kebab-case path. The block system auto-discovers components through webpack's require.context, automatically registering them based on their directory names.

There's also a two-layer GraphQL setup with separate server and client Apollo instances, a design token system built on CSS custom properties with semantic color mapping, and heavy use of dynamic imports throughout. The current setup is single-theme only with no inheritance.

Now I'm looking at the new scaffold direction: moving to React 19 with Vite as the build tool instead of Next.js, using TanStack Router for minimal routing needs, keeping SCSS Modules for styling, and maintaining Apollo for GraphQL.

The core challenge is building out a proper theme system that supports multiple levels of inheritance—a base theme that can be overridden by parent themes like municipal or metropolis, which themselves can be overridden by child themes like municipal-dark, and finally site-specific overrides on top. The resolution order flows from site override down through child, parent, and base themes to defaults.

I'm structuring themes in a dedicated directory where each theme contains token overrides for colors, typography, and components, plus a config file with metadata about its parent relationship and a components folder for theme-specific component variations.

Setting up the file structure for themes...

The component resolver walks up the theme hierarchy—starting with the active theme, then its parent, and finally falling back to the base theme—to find the right component file to use.

For Vite, I'd implement this as a custom plugin that intercepts imports and resolves them according to this priority chain. The block system needs to move away from webpack's require.context and instead use Vite's import.meta.glob to dynamically load block modules.

Modules are self-contained packages that live in src/modules/{module-name}/ with their own blocks, pages, and configuration. They're optional and can be overridden at the theme level, so a theme like municipal-dark can selectively replace module styles or components without duplicating the entire module.

For routing, I'm using TanStack Router minimally since the backend drives everything through GraphQL—the catch-all route queries the backend for the page type and renders accordingly. This replaces Next.js patterns like middleware and dynamic routing with a simpler backend-driven approach, and I'm mapping Next.js conventions like next/link and next/image to their TanStack equivalents. For the catch-all route, I'll use a loader that queries the dynamic route type and renders the appropriate component based on the typename. Since this is a client-side SPA, the GraphQL query runs on the client during navigation. Now I'm mapping out the complete monorepo structure with all the packages and their organization.

Continuing with the directory layout... Continuing with the flash-info and albums modules, each following the same pattern with their own blocks, styles, and registry entries.

Now I'm mapping out the core components structure—there's a BlockRenderer that dynamically loads blocks using import.meta.glob, along with pure UI primitives like buttons and typography, plus the main layout components for headers, footers, and the overall site structure.

The theme system is organized with a base theme that includes design tokens for colors, typography, spacing, borders, and effects, plus global styles for resets and utilities, all configured through a theme config file.

Now I'm looking at how child themes like municipal and metropolis inherit from the base, only overriding specific tokens like colors and component styles where needed, with their own theme configs establishing the parent-child relationships. Continuing with the rest of the directory structure, I'm laying out the styles organization with utility functions, responsive helpers, and variables all feeding into a global entry point that pulls in the active theme tokens. Then there's the fonts directory for typography assets, public folder for static files, and a generated folder where GraphQL codegen outputs its types. I'm also mapping out a per-site configuration system where each site like the demo can specify its theme and enabled features.

Now I'm starting to define the actual boilerplate code, beginning with the theme configuration structure that establishes how themes inherit from parent themes and get named.

Building the theme resolver...

For the Vite setup, I'm using additionalData in the SCSS preprocessor options to automatically inject the active theme's tokens into every SCSS file at build time, and setting up path aliases so @theme points to the currently selected theme directory.

Actually, I need to reconsider this approach—the theme tokens need to properly cascade through multiple levels. The system relies on CSS custom properties where the base theme defines all variables, and then parent and child themes selectively override only what they need. This means I need to load the stylesheets in the correct order at runtime: base theme first, then parent theme overrides, then child theme overrides, then any site-specific customizations. The component SCSS files themselves just reference these variables with var() and don't need to know about the cascade.

For component-level overrides, I'm using a virtual module approach with Vite aliases instead of duplicating the cascade logic. files, not SCSS. So we need a different strategy.

For component overrides, I could use a Vite alias that resolves through a priority chain—site-specific overrides first, then child theme, then parent theme, then base components. A Vite plugin that intercepts @theme/ imports would be the cleanest approach, letting me resolve them through that same cascade. For styling, I'll layer SCSS tokens via CSS custom properties and keep module-level overrides in each theme's directory.

Building the Vite theme plugin...

Implementing the resolution logic... Setting up the block module registry...

I'm using Vite's glob import to dynamically load all block definitions, then extracting the module name from each file path and converting it to a component typename so I can map them for lazy loading. I need to verify the path structure matches what I'm expecting from the modules directory.

The typename pattern is consistent with the GraphQL schema—news becomes NewsBlock, flash-info becomes FlashInfoBlock, and so on. This aligns perfectly with how the \_\_typename field works in the GraphQL responses.

Now I'm thinking about the router setup with TanStack Router, which will be driven by the GraphQL typename to determine which component to render.

Writing the catch-all route... Wrapping the page component in Suspense to handle async loading, then I'm realizing I should scope this to just the specific block types we're actually using—news, flash-info, and albums. For the theme system, the approach is simpler than I initially thought: leverage the CSS custom properties already in use, load base tokens first, then layer theme-specific overrides on top, and use a Vite virtual module to handle per-theme SCSS imports so components can reference @theme-module without worrying about which theme is active.

Now I'm mapping out the full scaffold the user needs: the architecture explanation, updated folder structure, essential boilerplate files, what's different from the original setup, and the concrete migration steps. The key migrations for moving to Vite and React are swapping out Next.js-specific patterns—require.context becomes import.meta.glob, Next's routing and image components get replaced with TanStack Router and a custom Image component, dynamic imports use React's lazy with Suspense, font loading switches to plain CSS, and environment variables work differently in an SPA context.

I now have everything needed. Let me produce the complete analysis and scaffold.

PHASE 1 — CURRENT ARCHITECTURE ANALYSIS
High-Level Architecture

citeopolis-frontend/
├── packages/ # Shared tooling (npm publishable)
│ ├── commitlint-config/
│ ├── create-app/ # CLI: `npm create citeopolis`
│ ├── eslint-config/
│ ├── prettier-config/
│ └── stylelint-config/
└── template/ # Next.js 15 App (App Router, SSR)
├── app/ # File-based routes
│ ├── (site)/ # Main site routes (grouped layout)
│ ├── (map)/ # Map routes (no site header/footer)
│ └── (extranet)/ # Extranet routes
├── components/
│ ├── blocks/ # WP structured content blocks (AUTO-REGISTERED)
│ ├── ui/ # Pure UI primitives
│ ├── widgets/ # Composed data-fetching components
│ ├── cartography/ # Map components
│ ├── filters/ # List filter system
│ ├── comments/
│ ├── cookie-consent/
│ └── accessibility-config/
├── styles/
│ └── lib/
│ ├── tokens/ # CSS custom properties (:root vars)
│ └── variables/ # SCSS variables (breakpoints, etc.)
├── lib/ # Server-only utilities (Apollo, env)
├── utils/ # Shared pure utilities
├── fonts/ # Local WOFF2 files
├── generated/graphql/ # GraphQL codegen output
└── .storybook/
Detected Patterns

1. Route-as-Type (Middleware Router)
   The entire routing system lives in middleware.ts. Every URL → GraphQL route(url) query → typename → internal rewrite:

/actualites/my-news-slug
→ GET route(url: "/actualites/my-news-slug")
→ { \__typename: "News" }
→ rewrite to /news?_=<b64 pathname>
→ app/(site)/news/page.tsx renders
No file-based routing needed for content. The middleware IS the router.

2. Auto-Registered Block System (webpack require.context)
   BlockRenderer.tsx uses webpack's require.context("./", true, /._\/block\.ts$/) to auto-discover every _/block.ts file. Each block's folder name becomes its typename (paragraph/block.ts → ParagraphBlock). Zero manual registration.

3. Two-Layer Apollo Client
   Server layer (lib/graphql.ts): registerApolloClient → server-only, forwards cookies, used in page.tsx async components
   Client layer (Providers.tsx): ApolloNextAppProvider → browser, upload-capable, for "use client" components
4. Design Token System (CSS Custom Properties)
   Three-layer SCSS architecture:

styles/lib/variables/\_colors.scss → SCSS variables ($color-blue: #...)
styles/lib/tokens/\_color.scss → CSS vars on :root using semantics
styles/lib/tokens/\_component.scss → Component-scoped CSS vars (--button-\*)
components/blocks/news/News.module.scss → uses var(--spacing-3xl) etc.
The entire token system is flat. There is no theme inheritance — one set of tokens for all deployments.

5. Per-Block Dynamic Import
   Every block and many UI components use next/dynamic(() => import(...)) for code splitting. This is critical for performance — the homepage only loads the blocks present on the page.

6. WP Capabilities → Feature Presence
   Features are implicit: if the WP backend returns a block typename (e.g., PollBlock), the frontend renders it. If the backend never returns it, the component is never loaded. No explicit feature flags.

7. No Theme Inheritance — Single Theme Only
   The current codebase has zero theme system. One set of color/spacing/component tokens. All deployments share the same visual identity with manual per-project token overrides in .env or direct token file edits.

PHASE 2 — NEW SCAFFOLD ARCHITECTURE
Core Design Decisions
Concern Approach
Theme tokens CSS custom properties cascade (:root overrides in order)
Component overrides File-system resolution via Vite alias chain
Module style overrides Per-theme SCSS override files
Block registration import.meta.glob (Vite) replaces require.context
Routing TanStack Router catch-all, driven by GraphQL typename
Server-side None — SPA (all queries client-side)
Theme Resolution Priority

site override (sites/demo/overrides/)
→ child theme (themes/municipal-dark/)
→ parent theme (themes/municipal/)
→ base theme (themes/base/)
→ default fallback (src/components/)
PHASE 3 — NEW FOLDER STRUCTURE

citeopolis-vite/
├── package.json # pnpm workspace root
├── pnpm-workspace.yaml
│
├── packages/ # Shared tooling (unchanged)
│ ├── commitlint-config/
│ ├── create-app/ # CLI (updated for Vite scaffold)
│ ├── eslint-config/
│ ├── prettier-config/
│ └── stylelint-config/
│
└── template/ # Vite + React app
├── vite.config.ts # Replaces next.config.ts
├── package.json
├── tsconfig.json
├── codegen.ts # GraphQL codegen (unchanged)
├── .env.example
├── .storybook/
│ ├── main.ts # @storybook/react-vite
│ └── preview.tsx
│
├── src/
│ ├── main.tsx # App entry point
│ ├── App.tsx # Root with providers
│ │
│ ├── router/ # TanStack Router (minimal)
│ │ ├── index.ts # createRouter()
│ │ └── routes/
│ │ ├── \_\_root.tsx # Root layout (Header/Footer)
│ │ ├── index.tsx # Redirect / → catch-all
│ │ └── $.tsx # Catch-all: WP route resolver
│ │
│ ├── pages/ # Page-level components (per WP typename)
│ │ ├── HomePage.tsx # typename: Page (url: "/")
│ │ ├── news/
│ │ │ ├── NewsPage.tsx # typename: News
│ │ │ └── NewsListPage.tsx # typename: NewsList (future)
│ │ ├── album/
│ │ │ └── AlbumListPage.tsx # typename: AlbumList
│ │ └── PagePage.tsx # typename: Page
│ │
│ ├── modules/ # Feature modules (opt-in, tree-shakeable)
│ │ ├── news/
│ │ │ ├── blocks/
│ │ │ │ ├── NewsBlock.tsx
│ │ │ │ ├── NewsBlock.module.scss
│ │ │ │ ├── NewsBriefItem.tsx
│ │ │ │ ├── NewsBriefItem.module.scss
│ │ │ │ ├── NewsFocus.tsx
│ │ │ │ ├── NewsItem.tsx
│ │ │ │ ├── NewsItem.module.scss
│ │ │ │ ├── NewsList.tsx
│ │ │ │ └── block.ts # Registry entry: export { default } from './NewsBlock'
│ │ │ ├── api.ts # GraphQL fragments for this module
│ │ │ └── index.ts # Public API: export { NewsBlock }
│ │ │
│ │ ├── flash-info/
│ │ │ ├── blocks/
│ │ │ │ ├── FlashInfoBlock.tsx
│ │ │ │ ├── FlashInfoBlock.module.scss
│ │ │ │ └── block.ts
│ │ │ └── index.ts
│ │ │
│ │ └── albums/
│ │ ├── blocks/
│ │ │ ├── AlbumsBlock.tsx
│ │ │ ├── AlbumsBlock.module.scss
│ │ │ ├── AlbumsItem.tsx
│ │ │ ├── AlbumsItem.module.scss
│ │ │ └── block.ts
│ │ └── index.ts
│ │
│ ├── components/ # Core UI (theme-overridable)
│ │ ├── blocks/
│ │ │ └── BlockRenderer.tsx # Vite import.meta.glob version
│ │ ├── ui/ # UI primitives (Button, Typography, etc.)
│ │ │ ├── button/
│ │ │ │ ├── Button.tsx
│ │ │ │ ├── Button.module.scss
│ │ │ │ └── Button.stories.tsx
│ │ │ ├── typography/
│ │ │ └── ...
│ │ ├── layout/ # Site chrome
│ │ │ ├── Header.tsx
│ │ │ ├── Header.module.scss
│ │ │ ├── Footer.tsx
│ │ │ └── Footer.module.scss
│ │ └── system/ # Error boundaries, 404, etc.
│ │ ├── ErrorBoundary.tsx # Replaces error.ts
│ │ └── NotFound.tsx # Replaces not-found.ts
│ │
│ ├── themes/ # THE CORE SYSTEM
│ │ ├── base/ # Base theme — always loaded first
│ │ │ ├── tokens/
│ │ │ │ ├── \_color.scss # All CSS custom property definitions
│ │ │ │ ├── \_typography.scss
│ │ │ │ ├── \_spacing.scss
│ │ │ │ ├── \_border.scss
│ │ │ │ ├── \_effect.scss
│ │ │ │ ├── \_component.scss # --button-_, --link-_, etc.
│ │ │ │ └── index.scss # @forward all tokens
│ │ │ ├── fonts/
│ │ │ │ └── \_fonts.scss # @font-face declarations
│ │ │ └── theme.config.ts # { name: 'base', parent: null }
│ │ │
│ │ ├── municipal/ # Parent theme
│ │ │ ├── tokens/
│ │ │ │ ├── \_color.scss # Only overrides needed
│ │ │ │ └── index.scss
│ │ │ ├── components/ # JSX overrides (same path as src/components/)
│ │ │ │ └── layout/
│ │ │ │ └── Header.tsx # Replaces src/components/layout/Header.tsx
│ │ │ ├── modules/ # Module SCSS overrides
│ │ │ │ └── news/blocks/
│ │ │ │ └── NewsBlock.module.scss
│ │ │ └── theme.config.ts # { name: 'municipal', parent: 'base' }
│ │ │
│ │ └── metropolis/ # Another parent theme
│ │ ├── tokens/
│ │ └── theme.config.ts # { name: 'metropolis', parent: 'base' }
│ │
│ ├── lib/ # Core utilities
│ │ ├── graphql.ts # Apollo client (client-side only)
│ │ ├── theme-resolver.ts # Theme chain builder
│ │ ├── block-registry.ts # Block map from import.meta.glob
│ │ ├── env.ts # import.meta.env wrapper
│ │ ├── image.ts # Image helper (replaces next/image)
│ │ └── hooks/
│ │ └── useTitleLevel.tsx
│ │
│ ├── styles/ # Theme-agnostic shared SCSS
│ │ ├── lib/
│ │ │ ├── \_mixins.scss # Same as original
│ │ │ ├── \_functions.scss
│ │ │ ├── \_helpers.scss
│ │ │ ├── \_layout.scss
│ │ │ ├── \_responsive.scss
│ │ │ └── \_variables.scss # SCSS vars (breakpoints map, etc.)
│ │ └── global.scss # Entry: theme tokens + reset + base
│ │
│ ├── generated/graphql/ # GraphQL codegen output
│ ├── fonts/ # Font WOFF2 files
│ ├── public/ # Static assets
│ ├── types/ # TypeScript types
│ └── utils/ # Pure utilities (identical to original)
│
└── sites/ # Per-site configurations
└── demo/ # Example site instance
├── site.config.ts # { theme, childTheme, features }
└── overrides/ # Site-specific overrides (highest priority)
├── tokens/
│ └── \_color.scss # e.g., brand primary = client's color
└── components/
└── layout/
└── Logo.tsx # Client logo override
BOILERPLATE CODE

1. Vite Config + Theme Plugin
   template/vite.config.ts:

import react from '@vitejs/plugin-react';
import path from 'node:path';
import process from 'node:process';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { themePlugin } from './src/lib/vite-plugin-theme';

// Active theme chain: site > child > parent > base
const SITE = process.env.SITE || 'demo';
const THEME = process.env.THEME || 'municipal';

export default defineConfig({
plugins: [
react(),
svgr({ include: /\.svg$/ }),
themePlugin({ theme: THEME, site: SITE }),
],

resolve: {
alias: {
'@': path.resolve(**dirname, './src'),
// @theme resolves to active theme directory
'@theme': path.resolve(**dirname, `./src/themes/${THEME}`),
// @site resolves to active site overrides
'@site': path.resolve(\_\_dirname, `./sites/${SITE}`),
},
},

css: {
preprocessorOptions: {
scss: {
api: 'modern-compiler',
},
},
},
}); 2. Vite Theme Plugin (Component Override Resolution)
src/lib/vite-plugin-theme.ts:

import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import type { ThemeConfig } from '../themes/base/theme.config';

interface ThemePluginOptions {
theme: string;
site?: string;
}

/\*\*

- Resolves @components/\* imports through the theme chain.
- Resolution order:
- 1.  sites/{site}/overrides/components/
- 2.  themes/{theme}/components/
- 3.  themes/{parent}/components/
- ...
- N. src/components/
  \*/
  export function themePlugin(options: ThemePluginOptions): Plugin {
  const srcDir = path.resolve(\_\_dirname, '../..');
  const chain = buildChain(options, srcDir);

return {
name: 'citeopolis-theme',

    resolveId(id) {
      if (!id.startsWith('@components/')) return;

      const relativePath = id.replace('@components/', '');

      for (const base of chain) {
        const candidate = path.resolve(base, relativePath);
        if (exists(candidate)) return candidate;

        // Try with extensions
        for (const ext of ['.tsx', '.ts', '/index.tsx', '/index.ts']) {
          if (exists(candidate + ext)) return candidate + ext;
        }
      }
    },

};
}

function buildChain(options: ThemePluginOptions, srcDir: string): string[] {
const chain: string[] = [];

// 1. Site overrides (highest priority)
if (options.site) {
chain.push(path.join(srcDir, 'sites', options.site, 'overrides', 'components'));
}

// 2. Theme chain (child → parent → ... → base)
const themeChain = resolveThemeChain(options.theme, srcDir);
for (const themeName of themeChain) {
chain.push(path.join(srcDir, 'src', 'themes', themeName, 'components'));
}

// 3. Base components (fallback)
chain.push(path.join(srcDir, 'src', 'components'));

return chain;
}

function resolveThemeChain(themeName: string, srcDir: string): string[] {
const chain: string[] = [];
let current: string | null = themeName;

while (current) {
chain.push(current);
const configPath = path.join(srcDir, 'src', 'themes', current, 'theme.config.ts');
const config = loadThemeConfig(configPath);
current = config?.parent ?? null;
}

return chain; // [child, parent, ..., base]
}

function loadThemeConfig(configPath: string): ThemeConfig | null {
if (!exists(configPath)) return null;
// Simple regex parse to avoid ts-node dependency at build time
const content = fs.readFileSync(configPath, 'utf-8');
const parentMatch = content.match(/parent:\s\*['"]([^'"]+)['"]/);
return { parent: parentMatch?.[1] ?? null } as ThemeConfig;
}

function exists(p: string): boolean {
return fs.existsSync(p);
} 3. Theme Configs
src/themes/base/theme.config.ts:

export interface ThemeConfig {
name: string;
parent: string | null;
displayName?: string;
}

const config: ThemeConfig = {
name: 'base',
parent: null,
displayName: 'Base',
};

export default config;
src/themes/municipal/theme.config.ts:

import type { ThemeConfig } from '../base/theme.config';

const config: ThemeConfig = {
name: 'municipal',
parent: 'base',
displayName: 'Municipal',
};

export default config; 4. Global SCSS (Theme Cascade)
src/styles/global.scss:

// ============================================================
// THEME TOKEN CASCADE
// Order matters: later @use overrides earlier :root vars.
// This file is generated/updated by the theme system.
// ============================================================

// 1. Base theme (always first)
@use "../themes/base/tokens/index.scss";

// 2. Active parent theme (injected by vite-plugin-theme or CLI)
// @use "../themes/municipal/tokens/index.scss";

// 3. Active child theme (if any)
// @use "../themes/municipal-dark/tokens/index.scss";

// 4. Site-specific overrides (highest priority, injected by CLI)
// @use "../../sites/demo/overrides/tokens/index.scss";

// ============================================================
// BASE STYLES (theme-agnostic)
// ============================================================
@use "lib/reset.scss";
@use "lib/base.scss";
@use "lib/layout.scss";
@use "lib/helpers.scss";
src/themes/base/tokens/index.scss:

@forward "color.scss";
@forward "typography.scss";
@forward "spacing.scss";
@forward "border.scss";
@forward "effect.scss";
@forward "component.scss";
src/themes/base/tokens/\_color.scss:

// BASE THEME: Full token definitions
// Child/parent themes only override what they need.
:root {
--color-primary-50: #e5ecfa;
--color-primary-100: #ccdaf5;
--color-primary-200: #98b4eb;
--color-primary-300: #658fe1;
--color-primary-400: #3269d7;
--color-primary-500: #214fab;
--color-primary-600: #1a3f89;
--color-primary-700: #142f67;
--color-primary-800: #0d2044;

// ... (same as original \_color.scss)

// Semantic aliases
--color-primary-brand: var(--color-primary-500);
--color-primary-brand-high: var(--color-primary-400);
--color-primary-brand-low: var(--color-primary-600);

// ... (full token set)
}
src/themes/municipal/tokens/\_color.scss:

// MUNICIPAL THEME: Only override what differs from base.
// CSS cascade handles the rest automatically.
:root {
--color-primary-500: #1a5c8a; // Municipal blue instead of default
--color-primary-400: #2170a8;
--color-primary-600: #144d73;
// --color-primary-brand inherits the override automatically
// via: --color-primary-brand: var(--color-primary-500)
} 5. BlockRenderer (Vite version)
src/components/blocks/BlockRenderer.tsx:

import { pascalCase } from 'change-case';
import { ComponentType, lazy, Suspense } from 'react';
import type { BlockInterface } from '@/generated/graphql/graphql';

// Vite replaces webpack require.context
// Scans all modules' block.ts entrypoints
const blockEntries = import.meta.glob<{ default: ComponentType<any> }>(
'../../modules/\*/blocks/block.ts',
{ import: 'default' }
);

const components = new Map<string, ComponentType<any>>();

for (const [filepath, loader] of Object.entries(blockEntries)) {
// '../../modules/news/blocks/block.ts' → 'news' → 'NewsBlock'
const match = filepath.match(/modules\/([^/]+)\/blocks\/block\.ts$/);
if (!match) continue;

const moduleName = match[1]; // 'news', 'flash-info', 'albums'
const typename = pascalCase(moduleName) + 'Block'; // 'NewsBlock'

components.set(typename, lazy(loader as () => Promise<{ default: ComponentType<any> }>));
}

interface BlockRendererProps {
structuredContent: (BlockInterface & { \_\_typename?: string })[] | null | undefined;
}

export default function BlockRenderer({ structuredContent }: BlockRendererProps) {
return (
<>
{structuredContent?.map((block, index) => {
const { \_\_typename: typename, innerBlocks, ...data } = block;

        if (!typename) {
          console.warn('BlockRenderer: Missing __typename');
          return null;
        }

        const Component = components.get(typename);

        if (!Component) {
          console.warn(`BlockRenderer: No component for "${typename}"`);
          return null;
        }

        return (
          <Suspense key={data.id ?? index} fallback={null}>
            <Component {...data}>
              {innerBlocks && <BlockRenderer structuredContent={innerBlocks} />}
            </Component>
          </Suspense>
        );
      })}
    </>

);
} 6. TanStack Router — Catch-All Route (WP Router Equivalent)
src/router/routes/$.tsx:

import { createFileRoute, redirect } from '@tanstack/react-router';
import { kebabCase } from 'change-case';
import { lazy, Suspense } from 'react';
import { getApolloClient } from '@/lib/graphql';
import { graphql } from '@/generated/graphql';
import NotFound from '@/components/system/NotFound';
import ErrorBoundary from '@/components/system/ErrorBoundary';

const ROUTE_QUERY = graphql(`  query GetRoute($url: URL!) {
    route(url: $url) {
      __typename
      ... on Redirect {
        redirectCode
        url
      }
      ... on Page { url }
      ... on News { url }
    }
  }`);

// Lazy page components keyed by WP typename
// Add new page types here as features are added
const pageComponents = {
Page: lazy(() => import('@/pages/PagePage')),
News: lazy(() => import('@/pages/news/NewsPage')),
AlbumList: lazy(() => import('@/pages/album/AlbumListPage')),
} as const;

export const Route = createFileRoute('/$')({
async loader({ params, location }) {
const url = '/' + (params['_splat'] ?? '');
const client = getApolloClient();

    const { data, error } = await client.query({
      query: ROUTE_QUERY,
      variables: { url },
      errorPolicy: 'all',
    });

    // Handle server errors (503, 401, 403 equivalent)
    if (error) throw error;

    // Handle redirects
    if (data?.route?.__typename === 'Redirect' && data.route.url) {
      throw redirect({
        href: data.route.url,
        statusCode: data.route.redirectCode ?? 302,
      });
    }

    if (!data?.route) return { typename: null, url };

    return { typename: data.route.__typename, url };

},

errorComponent: ({ error }) => <ErrorBoundary error={error} />,

component: function CatchAllPage() {
const { typename, url } = Route.useLoaderData();

    if (!typename) return <NotFound />;

    const Component = pageComponents[typename as keyof typeof pageComponents];

    if (!Component) {
      console.warn(`CatchAllPage: No page component for typename "${typename}"`);
      return <NotFound />;
    }

    return (
      <ErrorBoundary>
        <Suspense fallback={<div className="page-loading" />}>
          <Component url={url} />
        </Suspense>
      </ErrorBoundary>
    );

},
});
src/router/routes/\_\_root.tsx:

import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@components/layout/Header'; // theme-resolved
import Footer from '@components/layout/Footer'; // theme-resolved
import Providers from '@/App';

export const Route = createRootRoute({
component: RootLayout,
});

function RootLayout() {
return (

<div id="top" className="site-wrapper">
<Header />
<main id="main" className="site-content" tabIndex={-1}>
<Outlet />
</main>
<Footer />
</div>
);
}
src/router/index.ts:

import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // TanStack Router CLI output

export const router = createRouter({
routeTree,
defaultPreload: 'intent',
scrollRestoration: true,
});

declare module '@tanstack/react-router' {
interface Register {
router: typeof router;
}
} 7. Apollo Client (SPA — Client-Side Only)
src/lib/graphql.ts:

import { ApolloClient, InMemoryCache } from '@apollo/client';
import generatedIntrospection from '@/generated/graphql/introspection.json';
import { getEnv } from './env';

let client: ApolloClient<unknown> | null = null;

export function getApolloClient(): ApolloClient<unknown> {
if (client) return client;

const { GRAPHQL_URL } = getEnv();

client = new ApolloClient({
uri: GRAPHQL_URL,
credentials: 'include',
cache: new InMemoryCache({
possibleTypes: generatedIntrospection.possibleTypes,
typePolicies: {
SiteConfig: { merge: true },
Query: {
fields: {
route: { keyArgs: ['id', 'url', 'slug'], merge: true },
page: { keyArgs: ['id', 'url', 'slug'], merge: true },
},
},
},
}),
});

return client;
} 8. Environment Variables (import.meta.env replaces next-public-env)
src/lib/env.ts:

export interface PublicEnv {
GRAPHQL_URL: string;
BACKEND_URL: string;
}

export function getEnv(): PublicEnv {
return {
GRAPHQL_URL: import.meta.env.VITE_GRAPHQL_URL,
BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
};
}
template/.env.example:

VITE_BACKEND_URL=https://citeopolis-v5.fr.dev08.stratis.pro
VITE_GRAPHQL_URL=$VITE_BACKEND_URL/wp/graphql
INTROSPECTION_URL=./node_modules/@citeopolis-graphql/schema/dist/schema.graphql
THEME=municipal
SITE=demo
STORYBOOK_DISABLE_TELEMETRY=true 9. Image Helper (replaces next/image)
src/lib/image.ts:

interface ImageLoaderParams {
src: string;
width: number;
quality?: number;
}

// Mirrors the original lib/image-loader.ts but for client-side use
export function imageLoader({ src, width, quality = 75 }: ImageLoaderParams): string {
const url = new URL(src);
url.searchParams.set('w', String(width));
url.searchParams.set('q', String(quality));
return url.toString();
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
src: string;
width: number;
height: number;
alt: string;
quality?: number;
priority?: boolean;
}

export function Image({ src, width, height, alt, quality, priority, ...rest }: ImageProps) {
const srcSet = [0.5, 1, 1.5, 2]
.map((scale) => {
const w = Math.round(width \* scale);
return `${imageLoader({ src, width: w, quality })} ${w}w`;
})
.join(', ');

return (
<img
src={imageLoader({ src, width, quality })}
srcSet={srcSet}
sizes={`${width}px`}
width={width}
height={height}
alt={alt}
loading={priority ? 'eager' : 'lazy'}
decoding={priority ? 'sync' : 'async'}
{...rest}
/>
);
} 10. News Module
src/modules/news/blocks/block.ts:

export { default } from './NewsBlock';
src/modules/news/blocks/NewsBlock.tsx:

import { Link } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import Typography from '@components/ui/typography/Typography';
import type { NewsBlock } from '@/generated/graphql/graphql';
import styles from './NewsBlock.module.scss';

const Button = lazy(() => import('@components/ui/button/Button'));
const NewsBriefList = lazy(() => import('./NewsBriefList'));
const NewsFocus = lazy(() => import('./NewsFocus'));
const NewsList = lazy(() => import('./NewsList'));

type NewsBlockProps = Partial<Omit<NewsBlock, '\_\_typename' | 'innerBlocks'>>;

export default function NewsBlock({ anchor, briefNews, focusedNews, listUrl, news, proposeUrl, tags }: NewsBlockProps) {
return (

<section id={anchor ?? undefined} className={`block block-news contained ${styles.news}`}>
<div className={styles.titleWrapper}>
<Typography variant="display-3" as="h2">
Actualités
</Typography>
</div>

      {focusedNews && (
        <Suspense fallback={null}>
          <NewsFocus news={focusedNews} />
        </Suspense>
      )}
      {news && news.length > 0 && (
        <Suspense fallback={null}>
          <NewsList items={news} />
        </Suspense>
      )}
      {briefNews && briefNews.length > 0 && (
        <Suspense fallback={null}>
          <NewsBriefList items={briefNews} />
        </Suspense>
      )}

      {(listUrl || proposeUrl) && (
        <div className={styles.actions}>
          {listUrl && (
            <Suspense fallback={null}>
              <Button asChild variant="contained" size="lg" startIcon="fa fa-plus">
                <Link to={listUrl}>Toutes les actualités</Link>
              </Button>
            </Suspense>
          )}
          {proposeUrl && (
            <Suspense fallback={null}>
              <Button asChild variant="outlined" size="lg" startIcon="fa fa-lightbulb-on">
                <Link to={proposeUrl}>Proposer une actualité</Link>
              </Button>
            </Suspense>
          )}
        </div>
      )}
    </section>

);
}
src/modules/news/blocks/NewsBlock.module.scss:

@use "@/styles/lib/mixins.scss" as \*;

.news {
width: 100%;
margin-block: var(--spacing-3xl);
container: block-news / inline-size;
}

.titleWrapper {
margin-bottom: var(--spacing-xl);
}

.actions {
display: flex;
flex-direction: column;
gap: var(--spacing-sm);
margin-top: var(--spacing-xl);

@include breakpoint(tablet up) {
display: grid;
grid-template-columns: 1fr 1fr;
}

@include breakpoint(desktop up) {
flex-direction: row;
}
}
Theme override example — src/themes/municipal/modules/news/blocks/NewsBlock.module.scss:

// Municipal theme overrides the news block background
// Import base module first, then override
@use "@/styles/lib/mixins.scss" as \*;

.news {
width: 100%;
margin-block: var(--spacing-3xl);
container: block-news / inline-size;

// Municipal-specific: add branded background section
background-color: var(--color-primary-brand-subtle);
padding: var(--spacing-xl);
border-radius: var(--border-radius-lg);
}

.titleWrapper {
margin-bottom: var(--spacing-xl);
}

.actions {
display: flex;
flex-direction: column;
gap: var(--spacing-sm);
margin-top: var(--spacing-xl);

@include breakpoint(tablet up) {
display: grid;
grid-template-columns: 1fr 1fr;
}
} 11. FlashInfo Module
src/modules/flash-info/blocks/FlashInfoBlock.tsx:

import type { FlashInfoBlock } from '@/generated/graphql/graphql';
import styles from './FlashInfoBlock.module.scss';

type FlashInfoProps = Partial<Omit<FlashInfoBlock, '\_\_typename' | 'innerBlocks'>>;

export default function FlashInfoBlock({ anchor, title, content, url }: FlashInfoProps) {
return (

<aside id={anchor ?? undefined} className={`block block-flash-info ${styles.flashInfo}`} role="note">
{title && <p className={styles.title}>{title}</p>}
{content && <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />}
</aside>
);
}
src/modules/flash-info/blocks/FlashInfoBlock.module.scss:

@use "@/styles/lib/mixins.scss" as \*;

.flashInfo {
padding: var(--spacing-md) var(--spacing-lg);
margin-block: var(--spacing-xl);
background-color: var(--color-system-warning-300);
border-left: 4px solid var(--color-system-warning-400);
border-radius: var(--border-radius-sm);
}

.title {
font-weight: var(--font-weight-bold);
color: var(--color-system-warning-500);
margin-bottom: var(--spacing-xs);
}

.content {
color: var(--color-text-default);
} 12. Albums Module
src/modules/albums/blocks/block.ts:

export { default } from './AlbumsBlock';
src/modules/albums/blocks/AlbumsBlock.tsx:

import { Link } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import Typography from '@components/ui/typography/Typography';
import type { AlbumsBlock } from '@/generated/graphql/graphql';
import styles from './AlbumsBlock.module.scss';

const AlbumsItem = lazy(() => import('./AlbumsItem'));
const Button = lazy(() => import('@components/ui/button/Button'));

type AlbumsProps = Partial<Omit<AlbumsBlock, '\_\_typename' | 'innerBlocks'>>;

export default function AlbumsBlock({ anchor, listUrl, albums }: AlbumsProps) {
return (

<section id={anchor ?? undefined} className={`block block-albums contained ${styles.albums}`}>
<Typography variant="display-3" as="h2" className={styles.title}>
Voir &amp; revoir
</Typography>

      {albums && albums.length > 0 && (
        <ul className={styles.list}>
          {albums.map((album, index) => (
            <li key={index}>
              <Suspense fallback={null}>
                <AlbumsItem album={album} />
              </Suspense>
            </li>
          ))}
        </ul>
      )}

      {listUrl && (
        <div className={styles.actions}>
          <Suspense fallback={null}>
            <Button asChild variant="contained" size="lg" startIcon="fa fa-plus">
              <Link to={listUrl}>Tous les albums</Link>
            </Button>
          </Suspense>
        </div>
      )}
    </section>

);
} 13. Site Config
sites/demo/site.config.ts:

export interface SiteConfig {
name: string;
theme: string; // Which theme to activate
childTheme?: string; // Optional child theme (overrides parent)
features: string[]; // Enabled feature modules
graphqlUrl?: string; // Per-site API override
}

const config: SiteConfig = {
name: 'demo',
theme: 'municipal',
features: ['news', 'flash-info', 'albums'],
};

export default config; 14. Site-Specific Token Override
sites/demo/overrides/tokens/\_color.scss:

// Demo site: override brand colors with client's palette
// This runs LAST in the cascade, highest specificity
:root {
--color-primary-500: #c8102e; // Client's red brand
--color-primary-400: #e0143a;
--color-primary-600: #a00d24;
// All semantic tokens (--color-primary-brand, etc.) automatically
// pick up the new values via CSS var() references.
} 15. Storybook (Theme Switcher)
template/.storybook/main.ts:

import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
stories: ['../src/**/*.stories.@(ts|tsx)'],
addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
framework: {
name: '@storybook/react-vite',
options: {},
},
staticDirs: ['../public', { from: '../src/fonts', to: '/fonts' }],
async viteFinal(config) {
config.resolve = config.resolve ?? {};
config.resolve.alias = {
...config.resolve.alias,
'@': path.resolve(import.meta.dirname, '../src'),
// In Storybook, @theme and @components point to base by default
'@theme': path.resolve(import.meta.dirname, '../src/themes/base'),
'@components': path.resolve(import.meta.dirname, '../src/components'),
};
config.plugins = config.plugins ?? [];
config.plugins.push(svgr({ include: /\.svg$/ }));
return config;
},
};

export default config;
template/.storybook/preview.tsx:

import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.scss';

// Theme switcher: renders every story under each registered theme
const THEMES = ['base', 'municipal', 'metropolis'] as const;

const preview: Preview = {
globalTypes: {
theme: {
description: 'Active theme',
toolbar: {
title: 'Theme',
icon: 'paintbrush',
items: THEMES.map((t) => ({ value: t, title: t })),
dynamicTitle: true,
},
},
},
parameters: {
// Auto-render under all themes in Chromatic
chromatic: {
modes: Object.fromEntries(
THEMES.map((theme) => [theme, { theme }])
),
},
},
decorators: [
(Story, context) => {
const theme = context.globals.theme ?? 'base';

      // Dynamically inject the selected theme's CSS tokens
      // by loading the theme's token stylesheet
      if (typeof document !== 'undefined') {
        const existingLink = document.querySelector('#storybook-theme-tokens');
        if (existingLink) existingLink.remove();

        const link = document.createElement('link');
        link.id = 'storybook-theme-tokens';
        link.rel = 'stylesheet';
        link.href = `/themes/${theme}/tokens.css`; // Pre-built token CSS per theme
        document.head.appendChild(link);
      }

      return <Story />;
    },

],
};

export default preview; 16. Font Loading (replaces next/font/local)
src/themes/base/fonts/\_fonts.scss:

// Replaces next/font/local — plain @font-face
@font-face {
font-family: 'RethinkSans';
src: url('/fonts/RethinkSans-Regular.woff2') format('woff2');
font-weight: 400;
font-style: normal;
font-display: swap;
}

@font-face {
font-family: 'RethinkSans';
src: url('/fonts/RethinkSans-Bold.woff2') format('woff2');
font-weight: 700;
font-style: normal;
font-display: swap;
}

// Dyslexia font
@font-face {
font-family: 'OpenDyslexic';
src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
font-weight: 400;
font-style: normal;
font-display: swap;
}
src/themes/base/tokens/\_typography.scss:

:root {
--font-family-primary: 'RethinkSans', Arial, Helvetica, sans-serif;
--font-family-alternate: 'RethinkSans', Arial, Helvetica, sans-serif;
--font-family-dyslexia: 'OpenDyslexic', 'Comic Sans', sans-serif;
// ... rest of typography tokens
} 17. Package.json (template)

{
"name": "@citeopolis/template",
"type": "module",
"scripts": {
"dev": "dotenv -- pnpm run generate && vite",
"build": "pnpm run generate && vite build",
"build-storybook": "pnpm run generate && storybook build",
"storybook": "storybook dev -p 6006",
"generate": "dotenv -- graphql-codegen",
"preview": "vite preview",
"test": "pnpm run generate && vitest run",
"routes": "tsr generate"
},
"dependencies": {
"@apollo/client": "^4.0.5",
"@tanstack/react-router": "^1.x",
"change-case": "^5.4.4",
"clsx": "^2.1.1",
"react": "^19.0.0",
"react-dom": "^19.0.0"
},
"devDependencies": {
"@citeopolis-graphql/schema": "^2.1.6",
"@storybook/addon-a11y": "^10.x",
"@storybook/addon-docs": "^10.x",
"@storybook/react-vite": "^10.x",
"@tanstack/router-plugin": "^1.x",
"@vitejs/plugin-react": "^5.x",
"graphql": "^16.x",
"sass-embedded": "^1.x",
"typescript": "^5.x",
"vite": "^7.x",
"vite-plugin-svgr": "^4.x",
"vitest": "^3.x"
}
}
DIFFERENCES VS ORIGINAL
Area Original (Next.js 15) New Scaffold (Vite + TanStack Router)
Rendering SSR (server components) SPA (client-side only)
Routing Middleware → NextResponse.rewrite Catch-all route loader → typename map
Block auto-registration require.context (webpack) import.meta.glob (Vite)
Dynamic imports next/dynamic React lazy + Suspense
Links next/link TanStack Router Link
Images next/image with optimization server Custom Image with srcset
Fonts next/font/local Plain @font-face in SCSS
Env vars next-public-env + process.env import.meta.env.VITE\_\*
Apollo (server) registerApolloClient (server-only) Singleton client (SPA)
Theme system None — single flat tokens Full cascade: base→parent→child→site
Component overrides None Vite alias chain resolution
Features Implicit (WP capabilities) Explicit in site.config.ts
Storybook @storybook/nextjs-vite @storybook/react-vite
Stories themes Single (hardcoded) Multi-theme switcher toolbar
Build next build vite build
Config next.config.ts vite.config.ts
What is NOT different:

SCSS module approach (identical)
Design token CSS custom property system (identical)
GraphQL codegen setup (identical)
Block structure (block.ts registry entry pattern, preserved)
Component directory conventions (preserved)
pnpm workspace / monorepo structure (preserved)
packages/ tooling (commitlint, eslint, prettier, stylelint — unchanged)
create-app CLI concept (updated internally for Vite)
MIGRATION STEPS
Step 1 — Install new stack

pnpm add vite @vitejs/plugin-react @tanstack/react-router @tanstack/router-plugin
pnpm remove next eslint-config-next @next/eslint-plugin-next next-logger next-public-env
pnpm add -D @storybook/react-vite
pnpm remove @storybook/nextjs-vite
Step 2 — Create theme directory structure

mkdir -p src/themes/base/tokens src/themes/base/fonts
mkdir -p src/themes/municipal/tokens src/themes/municipal/components src/themes/municipal/modules
mkdir -p sites/demo/overrides/tokens sites/demo/overrides/components
Step 3 — Move token files

template/styles/lib/tokens/\_color.scss → src/themes/base/tokens/\_color.scss
template/styles/lib/tokens/\_component.scss → src/themes/base/tokens/\_component.scss
(repeat for all token files)
template/styles/lib/ → src/styles/lib/ (mixins, reset, base — unchanged)
Step 4 — Move blocks to modules

components/blocks/news/ → src/modules/news/blocks/
components/blocks/albums/ → src/modules/albums/blocks/
(flash-info doesn't exist yet — create from scratch)
Rename: Albums.tsx → AlbumsBlock.tsx, News.tsx → NewsBlock.tsx
Step 5 — Update BlockRenderer
Replace require.context with import.meta.glob (code above).

Step 6 — Replace routing

template/middleware.ts → src/router/routes/$.tsx (catch-all loader)
template/app/(site)/layout.tsx → src/router/routes/\_\_root.tsx
template/app/(site)/news/page.tsx → src/pages/news/NewsPage.tsx
template/app/(site)/homepage/page.tsx → src/pages/HomePage.tsx
Step 7 — Replace Next.js primitives

next/link → import { Link } from '@tanstack/react-router'
next/dynamic → React.lazy + Suspense
next/image → import { Image } from '@/lib/image'
next/font → @font-face in themes/base/fonts/_fonts.scss
next-public-env → import.meta.env.VITE_\*
server-only → remove (SPA, no server)
Step 8 — Create vite.config.ts + vite-plugin-theme.ts (code above)

Step 9 — Update Storybook
Replace main.ts framework to @storybook/react-vite, add theme toolbar to preview.tsx.

Step 10 — Create site configs

sites/demo/site.config.ts (theme: 'municipal', features: ['news', 'flash-info', 'albums'])
Step 11 — Update env vars

BACKEND_URL → VITE_BACKEND_URL
GRAPHQL_URL → VITE_GRAPHQL_URL
Add: THEME=municipal, SITE=demo
Step 12 — To add a new theme (ongoing)

mkdir -p src/themes/new-theme/tokens

# Create: src/themes/new-theme/theme.config.ts { parent: 'base' }

# Create: src/themes/new-theme/tokens/\_color.scss (overrides only)

# Build: THEME=new-theme SITE=my-site vite build

Step 13 — To add a new feature module (ongoing)

mkdir -p src/modules/my-feature/blocks

# Create: src/modules/my-feature/blocks/MyFeatureBlock.tsx

# Create: src/modules/my-feature/blocks/MyFeatureBlock.module.scss

# Create: src/modules/my-feature/blocks/block.ts → export { default } from './MyFeatureBlock'

# BlockRenderer auto-discovers it via import.meta.glob

# Add 'my-feature' to sites/demo/site.config.ts features[]

Update Todos

Create root workspace files (package.json, pnpm-workspace.yaml)

Create template package.json, vite.config.ts, tsconfig.json, .env.example, codegen.ts

Create src/lib/ (graphql, env, image, theme, hooks)

Create theme system (base + municipal tokens, theme.config.ts)

Create SCSS infrastructure (global.scss, styles/lib/)

Create core components (BlockRenderer, UI, layout, system)

Create modules (news, flash-info, albums)

Create router + pages (TanStack Router, catch-all, page components)

Create sites config + Storybook + App entry
