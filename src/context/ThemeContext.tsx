"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeId, ThemeConfig } from "@/types/portfolio";
import { THEMES } from "@/data/portfolioData";
import { playThemeSwitchSound } from "@/lib/sound";

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("earth-graphite");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio_theme") as ThemeId;
    if (savedTheme && THEMES[savedTheme]) {
      setThemeId(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const theme = THEMES[themeId] || THEMES["earth-graphite"];
    const root = document.documentElement;

    // Set CSS variables for current theme
    root.style.setProperty("--color-bg", theme.colors.bg);
    root.style.setProperty("--color-surface", theme.colors.surface);
    root.style.setProperty("--color-surface-hover", theme.colors.surfaceHover);
    root.style.setProperty("--color-border", theme.colors.border);
    root.style.setProperty("--color-text", theme.colors.text);
    root.style.setProperty("--color-text-muted", theme.colors.textMuted);
    root.style.setProperty("--color-primary", theme.colors.primary);
    root.style.setProperty("--color-primary-hover", theme.colors.primaryHover);
    root.style.setProperty("--color-secondary", theme.colors.secondary);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-highlight", theme.colors.highlight);
    root.style.setProperty("--color-glow", theme.colors.glow);

    // Update body class and data attribute
    root.setAttribute("data-theme", themeId);
    localStorage.setItem("portfolio_theme", themeId);
  }, [themeId, mounted]);

  const handleSetTheme = (id: ThemeId) => {
    if (THEMES[id]) {
      playThemeSwitchSound();
      setThemeId(id);
    }
  };

  const currentTheme = THEMES[themeId] || THEMES["earth-graphite"];
  const availableThemes = Object.values(THEMES);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setTheme: handleSetTheme,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
