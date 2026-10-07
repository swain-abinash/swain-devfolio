"use client";

import React from "react";
import { motion } from "framer-motion";
import { METRICS } from "@/data/portfolioData";
import { Zap, Users, Database, ShieldCheck, Activity, TestTube2 } from "lucide-react";

const ICONS = [Users, Database, ShieldCheck, Activity, Zap, TestTube2];

export default function MetricsBar() {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-y border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {METRICS.map((metric, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col items-center text-center p-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight font-mono">
                  {metric.value}
                  <span className="text-xs sm:text-sm font-normal text-[var(--color-primary)] font-sans ml-0.5">
                    {metric.suffix}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)] mt-1 font-medium leading-tight max-w-[130px]">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
