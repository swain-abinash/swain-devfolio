"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  FolderGit2,
  Layers,
  FileDown,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { playMicroClick } from "@/lib/sound";

interface MobileDockProps {
  onOpenResume: () => void;
}

export default function MobileDock({ onOpenResume }: MobileDockProps) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "architecture", "contact"];
      const scrollPosition = window.scrollY + 250;

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

  const handleNav = (href: string) => {
    playMicroClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 lg:hidden flex items-center justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 p-2 rounded-2xl bg-[var(--color-surface)]/90 backdrop-blur-2xl border border-[var(--color-border)] shadow-2xl">
        <button
          onClick={() => handleNav("#home")}
          className={`p-2.5 rounded-xl transition-colors ${
            activeSection === "home"
              ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNav("#projects")}
          className={`p-2.5 rounded-xl transition-colors ${
            activeSection === "projects"
              ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
          aria-label="Projects"
        >
          <FolderGit2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNav("#architecture")}
          className={`p-2.5 rounded-xl transition-colors ${
            activeSection === "architecture"
              ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
          aria-label="Architecture"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            playMicroClick();
            onOpenResume();
          }}
          className="p-2.5 rounded-xl text-[var(--color-primary)] bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 font-bold"
          aria-label="Resume"
          title="Resume"
        >
          <FileDown className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNav("#contact")}
          className={`p-2.5 rounded-xl transition-colors ${
            activeSection === "contact"
              ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
          aria-label="Contact"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
