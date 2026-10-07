"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FileDown,
  MessageSquare,
  Terminal as TerminalIcon,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, NpmIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import InteractiveProfileCard from "./InteractiveProfileCard";
import InteractiveTerminal from "./InteractiveTerminal";
import ResumeModal from "./ResumeModal";
import { playMicroClick, playCelebrationSound } from "@/lib/sound";
import confetti from "canvas-confetti";

export default function Hero() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleOpenResume = () => {
    playCelebrationSound();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e06d53", "#2ebd70", "#ea580c", "#a3e635", "#c084fc"],
    });
    setResumeModalOpen(true);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playMicroClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-cyber"
    >
      {/* Ambient Atmospheric Radial Light */}
      <div className="ambient-glow w-[600px] h-[600px] -top-32 -left-32 opacity-30" />
      <div className="ambient-glow-secondary w-[550px] h-[550px] top-1/3 -right-32 opacity-25" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Editorial Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Editorial Narrative & Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Executive Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] shadow-sm mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)]">
                Senior Full Stack Developer & Systems Architect
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.08] mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text)] via-[var(--color-highlight)] to-[var(--color-primary)]">
                {PERSONAL_INFO.name}
              </span>
            </motion.h1>

            {/* Role & Tech Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 mb-6"
            >
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] tracking-tight">
                Full Stack Developer & Systems Architect
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {["React.js 19", "Next.js 16+", "Node.js v22", "TypeScript", "Redis Cache", "GCP & Docker"].map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-8"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-highlight)] font-semibold text-xs sm:text-sm shadow-xl shadow-[var(--color-glow)] hover:bg-[var(--color-primary-hover)] transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleOpenResume}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold text-xs sm:text-sm hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <FileDown className="w-4 h-4 text-[var(--color-primary)]" />
                <span>View & Download Resume</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] font-medium text-xs sm:text-sm hover:border-[var(--color-primary)] transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Let&apos;s Connect</span>
              </a>
            </motion.div>

            {/* Trust Markers & Social Profiles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-5 border-t border-[var(--color-border)] w-full text-xs text-[var(--color-text-muted)]"
            >
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroClick()}
                  className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroClick()}
                  className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroClick()}
                  className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                  aria-label="NPM Package"
                >
                  <NpmIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px] ml-auto">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Bangalore, India
                </span>
                <span className="opacity-30">•</span>
                <span className="text-[var(--color-primary)] font-bold">Immediate Joiner</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Ultra-Modern Editorial Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <InteractiveProfileCard />
          </div>
        </div>

        {/* Interactive CLI Console Drawer (Toggleable for high elegance) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full pt-4"
        >
          <div className="flex items-center justify-between px-2 mb-3">
            <button
              onClick={() => {
                playMicroClick();
                setShowTerminal(!showTerminal);
              }}
              className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--color-primary)] hover:underline"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>{showTerminal ? "Hide Interactive Developer Console" : "Open Interactive Developer Console (CLI)"}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showTerminal ? "rotate-90" : ""}`} />
            </button>
            <span className="text-[10px] font-mono text-[var(--color-text-muted)] hidden sm:inline">
              Execute live commands & telemetry
            </span>
          </div>

          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <InteractiveTerminal onOpenResume={() => setResumeModalOpen(true)} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Verified Resume Dossier Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </section>
  );
}
