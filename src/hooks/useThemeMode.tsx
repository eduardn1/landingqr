/**
 * Theme Mode Hook - Handles 3 theme modes: light, dark, colorful
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useEffect, useState, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "colorful";

const THEME_KEY = "flavour-theme-mode";

export function useThemeMode() {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return stored || "light";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (stored) {
      setModeState(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "colorful");
    
    // Apply theme classes based on mode
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "colorful") {
      root.classList.add("colorful");
      // Check system preference for colorful dark variant
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      }
    }
    
    localStorage.setItem(THEME_KEY, mode);
  }, [mode, mounted]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const cycleMode = useCallback(() => {
    setModeState((current) => {
      if (current === "light") return "dark";
      if (current === "dark") return "colorful";
      return "light";
    });
  }, []);

  return { mode, setMode, cycleMode, mounted };
}
