"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  FileDown,
  Volume2,
  VolumeX,
  Command,
  Menu,
  X,
  Sparkles,
  Check,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { toggleSound, playMicroClick } from "@/lib/sound";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Architecture", href: "#architecture" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenCommandPalette, onOpenResume }: NavbarProps) {
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playMicroClick();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playMicroClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-3 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center font-bold text-sm text-[var(--color-text)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[var(--color-primary)]">
              <span className="text-[var(--color-primary)]">A</span>S
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[var(--color-text)] flex items-center gap-2">
                {PERSONAL_INFO.name}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for roles" />
              </span>
              <span className="text-xs text-[var(--color-text-muted)] hidden sm:inline">
                Full Stack Developer • Systems Architect
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--color-surface)]/80 border border-[var(--color-border)] backdrop-blur-md shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[var(--color-highlight)] font-semibold"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                playMicroClick();
                onOpenCommandPalette();
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
              title="Open Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] opacity-70">⌘K</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              title={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
              aria-label="Toggle sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[var(--color-primary)]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  playMicroClick();
                  setThemeDropdownOpen(!themeDropdownOpen);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] transition-all"
                title="Switch Theme"
              >
                <Palette className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="hidden md:inline">{currentTheme.name}</span>
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setThemeDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      className="absolute right-0 mt-2 w-64 p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl z-50 backdrop-blur-xl"
                    >
                      <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border)] flex items-center justify-between">
                        <span>Select Color Palette</span>
                        <Sparkles className="w-3 h-3 text-[var(--color-primary)]" />
                      </div>
                      <div className="mt-1 space-y-1">
                        {availableThemes.map((theme) => {
                          const isSelected = themeId === theme.id;
                          return (
                            <button
                              key={theme.id}
                              onClick={() => {
                                setTheme(theme.id);
                                setThemeDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                                isSelected
                                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-semibold"
                                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                                  style={{ backgroundColor: theme.colors.primary }}
                                />
                                <div>
                                  <div className="leading-none">{theme.name}</div>
                                  <div className="text-[10px] text-[var(--color-text-muted)] font-normal truncate mt-0.5 max-w-[150px]">
                                    {theme.tagline}
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

            {/* Resume Button */}
            <button
              onClick={() => {
                playMicroClick();
                onOpenResume();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-highlight)] text-xs font-semibold shadow-md hover:bg-[var(--color-primary-hover)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-30 p-4 bg-[var(--color-surface)]/95 backdrop-blur-2xl border-b border-[var(--color-border)] shadow-2xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "bg-[var(--color-primary)] text-[var(--color-highlight)] font-semibold"
                      : "text-[var(--color-text)] bg-[var(--color-surface-hover)]"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-highlight)] text-xs font-semibold"
              >
                <FileDown className="w-4 h-4" />
                View & Download Resume
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] flex items-center gap-1.5"
              >
                <Command className="w-4 h-4" />
                ⌘K
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
