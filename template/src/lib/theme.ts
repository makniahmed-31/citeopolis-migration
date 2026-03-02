import { createContext, useContext } from "react";

/* ──────────────────────────────────────────────────────────
   CSS theme application
────────────────────────────────────────────────────────── */

export function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
}

export function getActiveTheme(): string {
  return document.documentElement.dataset.theme ?? "base";
}

/* ──────────────────────────────────────────────────────────
   Contexts
────────────────────────────────────────────────────────── */

export interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "base",
  setTheme: () => {},
});

export const FeaturesContext = createContext<string[]>([]);

/* ──────────────────────────────────────────────────────────
   Hooks
────────────────────────────────────────────────────────── */

export function useTheme() {
  return useContext(ThemeContext);
}

export function useFeatures() {
  return useContext(FeaturesContext);
}
