"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Play,
  Apple,
  Package,
  Layers,
  Sparkles,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { GithubIcon, NpmIcon } from "./Icons";
import { PROJECTS } from "@/data/portfolioData";
import { Project, ProjectCategory } from "@/types/portfolio";
import ProjectModal from "./ProjectModal";
import { playMicroClick } from "@/lib/sound";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "Cloud",
];

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedCategory === "All") return true;
    return project.category.includes(selectedCategory);
  });

  const handleCategorySelect = (cat: ProjectCategory) => {
    playMicroClick();
    setSelectedCategory(cat);
  };

  const handleOpenModal = (project: Project) => {
    playMicroClick();
    setActiveProjectModal(project);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Featured Case Studies & Software</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Production Projects & <span className="text-[var(--color-primary)]">Architecture</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            From high-throughput B2B SaaS and multi-platform healthcare to open-source NPM libraries and distributed microservices.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                    isSelected
                      ? "text-[var(--color-highlight)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl bg-[var(--color-primary)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-card hover:-translate-y-1.5 transition-all duration-300 text-left"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary)] px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                    {project.domain}
                  </span>
                  {project.badge && (
                    <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed line-clamp-3">
                  {project.subtitle}
                </p>

                {/* Key Metrics Preview */}
                <div className="grid grid-cols-2 gap-2 my-5">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-left"
                    >
                      <div className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                        Benchmark
                      </div>
                      <div className="text-xs font-bold font-mono text-[var(--color-text)] truncate mt-0.5">
                        {m}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Pills & Actions */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono text-[var(--color-text-muted)]">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Architecture</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMicroClick()}
                        className="p-2 rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                        title="Live Site"
                        aria-label="Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.playStore && (
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMicroClick()}
                        className="p-2 rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-emerald-400 transition-colors"
                        title="Google Play Store"
                        aria-label="Google Play Store"
                      >
                        <Play className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.npm && (
                      <a
                        href={project.links.npm}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMicroClick()}
                        className="p-2 rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
                        title="NPM Registry"
                        aria-label="NPM Registry"
                      >
                        <NpmIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMicroClick()}
                        className="p-2 rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        title="GitHub Repo"
                        aria-label="GitHub Repo"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep Architecture & Detail Modal */}
      <ProjectModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
    </section>
  );
}
