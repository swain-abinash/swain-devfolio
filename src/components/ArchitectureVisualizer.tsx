"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Cloud,
  Box,
  GitBranch,
  Activity,
  ShieldCheck,
  Zap,
  Info,
  Play,
  CheckCircle2,
} from "lucide-react";
import { ARCHITECTURE_NODES } from "@/data/portfolioData";
import { ArchitectureNode } from "@/types/portfolio";
import { playMicroClick, playThemeSwitchSound } from "@/lib/sound";

export default function ArchitectureVisualizer() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectNode = (node: ArchitectureNode) => {
    playMicroClick();
    setSelectedNode(node);
  };

  const handleToggleSimulation = () => {
    playThemeSwitchSound();
    setIsSimulating(!isSimulating);
  };

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Interactive System Topology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Production System <span className="text-[var(--color-primary)]">Architecture</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            Interactive high-concurrency data flow blueprint powering multi-tenant SaaS, healthcare compliance, and microservices resilience.
          </p>

          {/* Simulation Toggle */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleToggleSimulation}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isSimulating
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)]"
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Simulating 1,000+ RPM Stream" : "Simulate Live Traffic Stream"}</span>
            </button>
            <span className="text-xs font-mono text-[var(--color-text-muted)] hidden sm:inline">
              Click any node to inspect latency & recovery policies
            </span>
          </div>
        </div>

        {/* Main Diagram & Node Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Visual Pipeline */}
          <div className="lg:col-span-7 space-y-4">
            {/* Supporting DevOps & Cloud Foundation Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-6">
              {[
                { label: "Docker Containers", icon: Box, sub: "Multi-stage Isolation" },
                { label: "GitHub CI/CD", icon: GitBranch, sub: "Zero-Downtime Deploy" },
                { label: "GCP Cloud Infrastructure", icon: Cloud, sub: "IAM & VPC Mesh" },
                { label: "Observability", icon: Activity, sub: "Sentry & Winston Logs" },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.label}
                    className="p-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-left"
                  >
                    <Icon className="w-4 h-4 text-[var(--color-primary)] mb-1" />
                    <div className="text-[11px] font-bold text-[var(--color-text)] truncate">{pillar.label}</div>
                    <div className="text-[9px] font-mono text-[var(--color-text-muted)] truncate">{pillar.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Step-by-Step Flow Pipeline */}
            <div className="space-y-3 relative">
              {ARCHITECTURE_NODES.slice(0, 9).map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <React.Fragment key={node.id}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleSelectNode(node)}
                      className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between text-left ${
                        isSelected
                          ? "bg-[var(--color-surface-hover)] border-[var(--color-primary)] shadow-lg shadow-[var(--color-glow)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                      }`}
                    >
                      {/* Left: Indicator & Name */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                            isSelected
                              ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
                              : "bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--color-text)]">
                              {node.label}
                            </span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                              {node.category}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-[var(--color-primary)]">
                            {node.protocol}
                          </div>
                        </div>
                      </div>

                      {/* Right: Latency Benchmark & Pulse */}
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline font-mono text-[10px] text-[var(--color-text-muted)]">
                          {node.latencyBenchmark}
                        </span>
                        {isSimulating && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                        )}
                        <Info className="w-4 h-4 text-[var(--color-text-muted)] opacity-60" />
                      </div>
                    </motion.div>

                    {/* Flow Arrow with Animated Packet */}
                    {index < 8 && (
                      <div className="relative flex items-center justify-center py-0.5">
                        <div className="w-0.5 h-4 bg-[var(--color-border)] relative overflow-hidden">
                          {isSimulating && (
                            <div className="w-full h-2 bg-emerald-400 rounded-full animate-packet-flow" />
                          )}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Inspector Drawer */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 sm:p-7 rounded-3xl glass-panel text-left space-y-6 shadow-2xl border border-[var(--color-border)]">
              {/* Header */}
              <div className="border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="editorial-pill text-[10px] text-[var(--color-primary)]">
                    {selectedNode.category} Layer
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {selectedNode.latencyBenchmark}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text)]">
                  {selectedNode.label}
                </h3>
                <div className="text-xs font-mono text-[var(--color-primary)] mt-1">
                  Protocol: {selectedNode.protocol}
                </div>
              </div>

              {/* Role & Description */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                  Architectural Role:
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Resilience Strategy */}
              <div className="p-4 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Resilience & Failover Policy</span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {selectedNode.resilienceStrategy}
                </p>
              </div>

              {/* Abinash's Implementation Notes */}
              <div className="p-4 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>Abinash&apos;s Implementation Notes</span>
                </div>
                <p className="text-xs text-[var(--color-text)] leading-relaxed">
                  {selectedNode.abinashNotes}
                </p>
              </div>

              {/* Quick Checklist */}
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 99.9% Uptime Verified
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Multi-Tenant Ready
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Zero-Trust Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
