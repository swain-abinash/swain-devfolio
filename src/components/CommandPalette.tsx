"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  FileDown,
  Palette,
  FolderGit2,
  Cpu,
  Layers,
  Sparkles,
  Copy,
  Check,
  X,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";
import { ThemeId } from "@/types/portfolio";
import { playMicroClick, playCelebrationSound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const { setTheme, availableThemes } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered from parent
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleAction = (action: () => void) => {
    playMicroClick();
    action();
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playMicroClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerConfetti = () => {
    playCelebrationSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e06d53", "#2ebd70", "#ea580c", "#a3e635", "#c084fc"],
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-[var(--color-border)]">
            <Search className="w-5 h-5 text-[var(--color-text-muted)] mr-3" />
            <input
              type="text"
              placeholder="Type a command, project, technology, or theme..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs">
            {/* Navigation Actions */}
            <div>
              <div className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Navigation & Quick Jumps
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: "Hero / Home", href: "#home", icon: Sparkles },
                  { name: "About & Principles", href: "#about", icon: Layers },
                  { name: "Experience Timeline", href: "#experience", icon: Cpu },
                  { name: "Projects Showcase", href: "#projects", icon: FolderGit2 },
                  { name: "Technology Constellation", href: "#skills", icon: Cpu },
                  { name: "System Architecture", href: "#architecture", icon: Layers },
                  { name: "Services", href: "#services", icon: Sparkles },
                  { name: "Contact & Inquiries", href: "#contact", icon: ExternalLink },
                ]
                  .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
                  .map((item) => (
                    <button
                      key={item.name}
                      onClick={() =>
                        handleAction(() => {
                          const target = document.querySelector(item.href);
                          if (target) target.scrollIntoView({ behavior: "smooth" });
                        })
                      }
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <item.icon className="w-3.5 h-3.5 opacity-70" />
                      <span>{item.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Quick Actions
              </div>
              <div className="space-y-1">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download="Abinash_Swain_Resume.pdf"
                  onClick={() => {
                    triggerConfetti();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileDown className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-medium">Download Official Resume (PDF)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">Verified Official</span>
                </a>

                <button
                  onClick={copyEmail}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[var(--color-primary)]" />
                    )}
                    <span>{copied ? "Copied to Clipboard!" : `Copy Email (${PERSONAL_INFO.email})`}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">swainabinash36@gmail.com</span>
                </button>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClose()}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>View GitHub Profile</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">github.com/swain-abinash</span>
                </a>

                <a
                  href={PERSONAL_INFO.socials.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClose()}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>View NPM Package (@abinashswain/node-developer-toolkit)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">Published Open Source</span>
                </a>
              </div>
            </div>

            {/* Switch Themes */}
            <div>
              <div className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Switch Theme Palette
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {availableThemes
                  .filter((t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.tagline.toLowerCase().includes(query.toLowerCase()))
                  .map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleAction(() => setTheme(theme.id as ThemeId))}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                      <Palette className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <span className="truncate">{theme.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <div className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Projects
              </div>
              <div className="space-y-1">
                {PROJECTS.filter((p) =>
                  p.title.toLowerCase().includes(query.toLowerCase()) ||
                  p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                ).map((project) => (
                  <button
                    key={project.id}
                    onClick={() =>
                      handleAction(() => {
                        const target = document.querySelector("#projects");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                  >
                    <div>
                      <div className="font-medium text-[var(--color-text)]">{project.title}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] truncate max-w-md">
                        {project.subtitle}
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                      {project.category.join(", ")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-[var(--color-surface-hover)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
            <div className="flex items-center gap-3">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[10px]">↓</kbd> to navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[10px]">ESC</kbd> to close</span>
            </div>
            <div className="font-mono text-[10px] text-[var(--color-primary)]">
              Abinash Swain • Full Stack Systems Architect
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
