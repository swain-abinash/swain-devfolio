"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  TrendingUp,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { EXPERIENCES } from "@/data/portfolioData";
import { playMicroClick } from "@/lib/sound";

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(EXPERIENCES[0].id);

  const toggleExpand = (id: string) => {
    playMicroClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Career & Engineering Track</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Work Experience & <span className="text-[var(--color-primary)]">Proven Impact</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            2+ years delivering production code for enterprise SaaS, multi-platform healthcare ecosystems, and high-conversion EdTech portals.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[var(--color-border)] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {EXPERIENCES.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot with pulsing ring if current */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-primary)] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                  {exp.isCurrent && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-60" />
                  )}
                </div>

                {/* Experience Card */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-6 sm:p-7 rounded-3xl glass-panel hover:border-[var(--color-primary)]/50 transition-all cursor-pointer shadow-lg hover:shadow-2xl"
                >
                  {/* Top Bar: Role, Company, Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                          {exp.role}
                        </h3>
                        {exp.isPromotion && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                            <TrendingUp className="w-3 h-3" /> Promoted
                          </span>
                        )}
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] text-[10px] font-mono font-bold border border-[var(--color-primary)]/30">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-semibold text-[var(--color-text-muted)] mt-1 flex flex-wrap items-center gap-3">
                        <span className="text-[var(--color-text)]">{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                          {exp.location}
                        </span>
                        <span>•</span>
                        <span className="text-xs text-[var(--color-primary)] font-mono">{exp.domain}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-muted)]">
                        <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="p-1 rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </div>

                  {/* Impact Metrics Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {exp.impactMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-left"
                      >
                        <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                          {metric.label}
                        </div>
                        <div className="text-sm font-bold text-[var(--color-text)] font-mono mt-0.5">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Responsibilities list (Accordion expandable) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-[var(--color-border)] space-y-2.5">
                          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] mb-1">
                            Key Deliverables & Responsibilities:
                          </div>
                          {exp.responsibilities.map((resp, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed text-left">
                              <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[var(--color-border)]">
                    <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)] mr-1">
                      Stack:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
