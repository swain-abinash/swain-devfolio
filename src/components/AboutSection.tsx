"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Languages,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { EDUCATION, CERTIFICATIONS, LANGUAGES } from "@/data/portfolioData";
import { playMicroClick } from "@/lib/sound";

const PRINCIPLES = [
  {
    icon: Cpu,
    title: "Distributed Microservices & Resilience",
    desc: "Decoupling systems with event-driven message queues (RabbitMQ), Dead Letter Queues (DLQ), and independent deployability to prevent cascading failures.",
  },
  {
    icon: Zap,
    title: "Cache-Aside & Sub-50ms Latency",
    desc: "Aggressive multi-tier caching with Redis, sliding-window rate limiters, and SQL index optimization cutting database read loads by 70%.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust RBAC & Regulatory Privacy",
    desc: "Rigorous Role-Based Access Control and FHIR/HL7 aware schemas compliant with India's DPDP Act and ABDM healthcare specifications.",
  },
  {
    icon: Layers,
    title: "End-to-End Type Safety & Automated CI/CD",
    desc: "Dual ESM/CJS open-source libraries, strict TypeScript schemas with Zod, and automated GitHub Actions test pipelines delivering 90%+ branch coverage.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Engineering Philosophy & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            From Frontend Craftsmanship to <br className="hidden sm:block" />
            <span className="text-[var(--color-primary)]">Distributed Production Systems</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            A look into my technical journey, architecture principles, education, and verified certifications.
          </p>
        </div>

        {/* Narrative & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            <div className="p-6 rounded-3xl glass-panel space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                The Full-Stack Evolution
              </h3>
              <p>
                My engineering path began with a deep appreciation for fluid, responsive user interfaces in React, Next.js, and TypeScript. But building products like the <strong className="text-[var(--color-text)]">Swastyam Healthcare Platform</strong> and <strong className="text-[var(--color-text)]">Email Extractor SaaS</strong> quickly exposed the crucial reality: frontends are only as strong as the distributed backends and database architectures that power them.
              </p>
              <p>
                Over the past 2+ years, I transitioned deliberately toward full-stack engineering: designing normalized relational schemas in MariaDB/PostgreSQL, engineering low-latency Redis cache-aside layers, setting up Docker multi-stage containers, and automating GitHub Actions CI/CD pipelines that slash release cycles from 3 days down to 4 hours.
              </p>
              <p>
                Whether developing cross-platform mobile apps in React Native CLI, publishing open-source libraries like <code className="text-xs font-mono text-[var(--color-primary)] bg-[var(--color-surface)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">@abinashswain/node-developer-toolkit</code>, or managing NGINX reverse proxies on Linux VPS, I strive for clean architecture, bulletproof uptime, and exceptional speed.
              </p>
            </div>

            {/* Language & Location Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  className="p-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center"
                >
                  <div className="text-xs font-bold text-[var(--color-text)]">{lang.name}</div>
                  <div className="text-[10px] text-[var(--color-primary)] font-medium mt-0.5">
                    {lang.level}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Principles Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 rounded-3xl glass-card flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-3.5 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[var(--color-text)] mb-2 leading-snug">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-primary)]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Production Tested</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Education Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl glass-panel flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Foundation</span>
              </div>
              <h3 className="text-base font-bold text-[var(--color-text)]">
                {EDUCATION.degree}
              </h3>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">
                {EDUCATION.institution}
              </div>
              <div className="flex items-center gap-2.5 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  {EDUCATION.cgpa}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{EDUCATION.period}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-4 pt-3 border-t border-[var(--color-border)]">
              {EDUCATION.highlight}
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="lg:col-span-7 p-6 rounded-3xl glass-panel">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[var(--color-primary)]">
                <Award className="w-4 h-4" />
                <span>Verified Technical Certifications</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">HackerRank Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="p-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors text-left"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-[var(--color-text)] leading-tight">
                      {cert.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-primary)] mt-1">
                    {cert.date} • {cert.issuer}
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 line-clamp-2">
                    {cert.skills}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
