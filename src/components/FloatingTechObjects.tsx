"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Globe,
  Server,
  FileCode2,
  Cloud,
  Box,
  Terminal,
  Zap,
  Activity,
  Sparkles,
} from "lucide-react";
import { playMicroClick } from "@/lib/sound";

export default function FloatingTechObjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[460px] pointer-events-none select-none flex items-center justify-center"
    >
      {/* 1. React 19 Floating Badge (Top Left) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, zIndex: 30 }}
        whileHover={{ scale: 1.05, y: -4 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onPointerDown={() => playMicroClick()}
        className="pointer-events-auto absolute -top-4 -left-2 sm:left-4 z-20 cursor-grab active:cursor-grabbing p-3 rounded-2xl glass-card flex items-center gap-3 shadow-xl backdrop-blur-xl border border-[var(--color-border)] hover:border-cyan-400/50"
      >
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shadow-inner">
          <Atom className="w-6 h-6 animate-spin" style={{ animationDuration: "12s" }} />
        </div>
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[var(--color-text)]">React.js 19</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
              Core
            </span>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
            Concurrent UI & State
          </p>
        </div>
      </motion.div>

      {/* 2. Next.js App Router Capsule (Top Right) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, zIndex: 30 }}
        whileHover={{ scale: 1.05, y: -4 }}
        animate={{
          y: [0, 12, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        onPointerDown={() => playMicroClick()}
        className="pointer-events-auto absolute -top-6 -right-2 sm:right-6 z-20 cursor-grab active:cursor-grabbing p-3 rounded-2xl glass-card flex items-center gap-3 shadow-xl backdrop-blur-xl border border-[var(--color-border)] hover:border-white/50"
      >
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[var(--color-text)] shadow-inner">
          <Globe className="w-5 h-5" />
        </div>
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[var(--color-text)]">Next.js 16+</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-white font-mono">
              Turbopack
            </span>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
            App Router & RSC
          </p>
        </div>
      </motion.div>

      {/* 3. Node.js & Microservices Engine (Middle Left) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, zIndex: 30 }}
        whileHover={{ scale: 1.05, x: 4 }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, -1.5, 0],
        }}
        transition={{
          duration: 6.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        onPointerDown={() => playMicroClick()}
        className="pointer-events-auto absolute top-48 -left-6 sm:-left-8 z-20 cursor-grab active:cursor-grabbing p-3 rounded-2xl glass-card flex items-center gap-3 shadow-xl backdrop-blur-xl border border-[var(--color-border)] hover:border-emerald-400/50"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shadow-inner">
          <Server className="w-5 h-5" />
        </div>
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[var(--color-text)]">Node.js APIs</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              v22
            </span>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
            Event-Driven & Express
          </p>
        </div>
      </motion.div>

      {/* 4. TypeScript Strict Hex Card (Middle Right) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, zIndex: 30 }}
        whileHover={{ scale: 1.05, x: -4 }}
        animate={{
          y: [0, 10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        onPointerDown={() => playMicroClick()}
        className="pointer-events-auto absolute top-44 -right-4 sm:-right-8 z-20 cursor-grab active:cursor-grabbing p-3 rounded-2xl glass-card flex items-center gap-3 shadow-xl backdrop-blur-xl border border-[var(--color-border)] hover:border-blue-400/50"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shadow-inner">
          <FileCode2 className="w-5 h-5" />
        </div>
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[var(--color-text)]">TypeScript 5.7+</span>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
            Type-Safe Architecture
          </p>
        </div>
      </motion.div>

      {/* 5. Live Production Code Snippet Card (Bottom Left) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.05, zIndex: 35 }}
        whileHover={{ scale: 1.02 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        onPointerDown={() => playMicroClick()}
        className="pointer-events-auto absolute -bottom-10 -left-6 sm:-left-12 z-20 cursor-grab active:cursor-grabbing p-3 rounded-2xl glass-card w-72 sm:w-80 shadow-2xl backdrop-blur-2xl border border-[var(--color-border)] hidden md:block"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="font-mono text-[10px] text-[var(--color-text-muted)] ml-1 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-[var(--color-primary)]" />
              cacheAside.ts
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
            <Zap className="w-3 h-3" /> -45% Latency
          </span>
        </div>
        <pre className="font-mono text-[10px] text-left leading-relaxed text-[var(--color-text-muted)] overflow-hidden">
          <code>
            <span className="text-purple-400">const</span> cached = <span className="text-purple-400">await</span> redis.<span className="text-blue-300">get</span>(key);{"\n"}
            <span className="text-purple-400">if</span> (cached) <span className="text-purple-400">return</span> JSON.<span className="text-blue-300">parse</span>(cached);{"\n"}
            <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> db.<span className="text-blue-300">query</span>(sql);{"\n"}
            <span className="text-purple-400">await</span> redis.<span className="text-blue-300">setex</span>(key, <span className="text-amber-400">3600</span>, JSON.<span className="text-blue-300">stringify</span>(data));
          </code>
        </pre>
      </motion.div>

      {/* 6. Docker & GCP Cloud Capsule (Bottom Right) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, zIndex: 30 }}
        whileHover={{ scale: 1.05, y: -4 }}
        animate={{
          y: [0, 8, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 6.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        onPointerDown={() => playMicroClick()}
        className="pointer-events-auto absolute -bottom-8 -right-4 sm:-right-8 z-20 cursor-grab active:cursor-grabbing p-3 rounded-2xl glass-card flex items-center gap-3 shadow-xl backdrop-blur-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]"
      >
        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] shadow-inner">
          <Cloud className="w-5 h-5" />
        </div>
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[var(--color-text)]">GCP & Docker</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-mono">
              CI/CD
            </span>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
            Zero-Downtime Deploy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
