import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyTheme } from "@/lib/theme";
import "@/styles/global.scss";
import App from "./App";
import { ACTIVE_THEME } from "./lib/env";

// Apply active theme to <html data-theme="...">
// Drives CSS token cascade: base → theme → site overrides
applyTheme(ACTIVE_THEME);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found. Check your index.html.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
