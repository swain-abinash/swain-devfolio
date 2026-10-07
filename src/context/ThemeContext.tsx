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

function applyThemeToDOM(id: ThemeId) {
  const theme = THEMES[id] || THEMES["earth-graphite"];
  const root = document.documentElement;

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

  root.setAttribute("data-theme", id);
  try {
    localStorage.setItem("portfolio_theme", id);
  } catch {
    // ignore
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("portfolio_theme") as ThemeId;
        if (saved && THEMES[saved]) return saved;
      } catch {
        // ignore
      }
    }
    return "earth-graphite";
  });

  useEffect(() => {
    applyThemeToDOM(themeId);
  }, [themeId]);

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
