"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, Check, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeId } from "@/types/portfolio";
import { playMicroClick } from "@/lib/sound";

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playMicroClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-xl border border-[var(--color-border)] shadow-xl text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-primary)] transition-all"
        aria-label="Customize Palette"
      >
        <div
          className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-inner"
          style={{ backgroundColor: currentTheme.colors.primary }}
        />
        <span className="hidden sm:inline font-mono text-[11px]">Theme: {currentTheme.name}</span>
        <Palette className="w-4 h-4 text-[var(--color-primary)]" />
      </motion.button>

      {/* Floating Theme Switcher Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              className="absolute bottom-14 right-0 w-72 p-3.5 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl z-50 backdrop-blur-2xl text-left"
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span className="text-xs font-bold text-[var(--color-text)]">
                    Color Palettes
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {availableThemes.map((t) => {
                  const isSelected = themeId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id as ThemeId);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 text-[var(--color-text)] font-semibold"
                          : "hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-1">
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.primary }}
                          />
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.secondary }}
                          />
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.bg }}
                          />
                        </div>
                        <div>
                          <div className="leading-none text-[11px] text-[var(--color-text)]">
                            {t.name}
                          </div>
                          <div className="text-[9px] text-[var(--color-text-muted)] mt-0.5 max-w-[150px] truncate">
                            {t.tagline}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
