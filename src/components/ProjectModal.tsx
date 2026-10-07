"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Play,
  Apple,
  Package,
  Layers,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Cpu,
  Globe,
} from "lucide-react";
import { GithubIcon, NpmIcon } from "./Icons";
import { Project } from "@/types/portfolio";
import { playMicroClick } from "@/lib/sound";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-6 sm:p-8 z-10 text-left"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playMicroClick();
              onClose();
            }}
            className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-12">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="editorial-pill text-[10px] text-[var(--color-primary)]">
                {project.domain}
              </span>
              {project.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] text-[10px] font-mono font-bold border border-[var(--color-primary)]/30">
                  {project.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{project.subtitle}</p>
          </div>

          {/* Links Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8 pb-6 border-b border-[var(--color-border)]">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-highlight)] text-xs font-semibold shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-xs font-medium hover:border-[var(--color-primary)] transition-colors"
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Google Play Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-xs font-medium hover:border-[var(--color-primary)] transition-colors"
              >
                <Apple className="w-4 h-4 text-neutral-300" />
                <span>Apple App Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.npm && (
              <a
                href={project.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-xs font-medium hover:border-[var(--color-primary)] transition-colors"
              >
                <NpmIcon className="w-4 h-4 text-red-400" />
                <span>NPM Package Registry</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] text-xs font-medium hover:border-[var(--color-primary)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-center"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary)]">
                  Benchmark
                </div>
                <div className="text-sm font-bold font-mono text-[var(--color-text)] mt-0.5">
                  {metric}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Problem Card */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)]/70 border border-[var(--color-border)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>The Problem & Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)]/70 border border-[var(--color-border)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                <Zap className="w-4 h-4" />
                <span>Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Blueprint */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)]/70 border border-[var(--color-border)] mb-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Production Architecture Flow</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[var(--color-text)] leading-relaxed bg-[var(--color-surface)] p-3.5 rounded-xl border border-[var(--color-border)]">
              {project.architecture}
            </p>
          </div>

          {/* Key Features List */}
          <div className="space-y-3 mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              Core Engineering Deliverables:
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {project.keyFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs sm:text-sm text-[var(--color-text-muted)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Technologies & Infrastructure:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
