"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, NpmIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { playMicroClick } from "@/lib/sound";

export default function Footer() {
  const scrollToTop = () => {
    playMicroClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-border)] bg-[var(--color-surface)]/60 text-xs text-[var(--color-text-muted)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center font-bold text-xs text-[var(--color-primary)]">
              AS
            </div>
            <span className="font-bold text-[var(--color-text)]">{PERSONAL_INFO.name}</span>
          </div>
          <span className="hidden sm:inline opacity-30">|</span>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational • 99.9% Production SLA</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playMicroClick()}
            className="hover:text-[var(--color-text)] transition-colors p-1"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playMicroClick()}
            className="hover:text-[var(--color-text)] transition-colors p-1"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.npm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playMicroClick()}
            className="hover:text-[var(--color-text)] transition-colors p-1"
            aria-label="NPM"
          >
            <NpmIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-4">
          <span>© 2026 Abinash Swain. Built with Next.js & TypeScript.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors"
            title="Scroll back to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
