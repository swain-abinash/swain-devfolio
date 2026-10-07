"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Atom,
  Globe,
  FileCode2,
  Smartphone,
  Palette,
  Layers,
  RefreshCw,
  Server,
  Cpu,
  Network,
  Radio,
  ShieldCheck,
  Database,
  HardDrive,
  Zap,
  Code,
  Cloud,
  Box,
  GitBranch,
  Share2,
  CheckCircle2,
  Activity,
  ShieldAlert,
  Search,
  Filter,
} from "lucide-react";
import { TECHNOLOGIES } from "@/data/portfolioData";
import { TechCategory, TechItem } from "@/types/portfolio";
import { playMicroClick } from "@/lib/sound";

const ICON_MAP: Record<string, React.ElementType> = {
  Atom,
  Globe,
  FileCode2,
  Smartphone,
  Palette,
  Layers,
  RefreshCw,
  Server,
  Cpu,
  Network,
  Radio,
  ShieldCheck,
  Database,
  HardDrive,
  Zap,
  Code,
  Cloud,
  Box,
  GitBranch,
  Share2,
  CheckCircle2,
  Activity,
  ShieldAlert,
};

const CATEGORIES: TechCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "DevOps",
  "Testing & Tools",
];

export default function TechnologyEcosystem() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("Frontend");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTechCard, setActiveTechCard] = useState<TechItem | null>(null);

  const filteredTechnologies = TECHNOLOGIES.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productionUse.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim() !== "") return matchesSearch;
    return item.category === activeCategory;
  });

  const handleCategorySelect = (cat: TechCategory) => {
    playMicroClick();
    setActiveCategory(cat);
    setSearchQuery("");
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Core Engineering Stack & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Technology Ecosystem & <span className="text-[var(--color-primary)]">Tooling</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            A comprehensive overview of language runtimes, distributed backends, caching strategies, and DevOps automation used in production.
          </p>

          {/* Controls: Search & Category Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-4xl mt-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat && !searchQuery;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                      isSelected
                        ? "text-[var(--color-highlight)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeTechCategory"
                        className="absolute inset-0 rounded-xl bg-[var(--color-primary)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech, index) => {
              const Icon = ICON_MAP[tech.iconName] || Code;
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  onClick={() => {
                    playMicroClick();
                    setActiveTechCard(activeTechCard?.name === tech.name ? null : tech);
                  }}
                  className="p-5 rounded-3xl glass-card hover:border-[var(--color-primary)]/50 transition-all text-left flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Card Top: Icon, Name, Level */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] shadow-inner group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                            {tech.name}
                          </h3>
                          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                            {tech.experience}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          tech.level === "Core"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : tech.level === "Advanced"
                            ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                            : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {tech.level}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-4">
                      {tech.description}
                    </p>
                  </div>

                  {/* Production Use Footnote */}
                  <div className="pt-3 border-t border-[var(--color-border)]">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-primary)] mb-0.5">
                      Production Footprint:
                    </div>
                    <div className="text-[11px] text-[var(--color-text)] font-medium truncate">
                      {tech.productionUse}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
