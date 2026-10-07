"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Layers,
  Cpu,
  Smartphone,
  Cloud,
  Database,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SERVICES } from "@/data/portfolioData";
import { playMicroClick } from "@/lib/sound";

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Cpu,
  Smartphone,
  Cloud,
  Database,
  Sparkles,
};

export default function ServicesSection() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playMicroClick();
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Consulting & Technical Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Engineering Services & <span className="text-[var(--color-primary)]">Deliverables</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            Contract, full-stack consulting, and senior engineering capabilities ready for immediate production deployment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Layers;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 sm:p-7 rounded-3xl glass-card flex flex-col justify-between text-left hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-5 shadow-inner group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-text)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack Pills & Inquire Link */}
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.stack.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 rounded-md bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-muted)]"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
