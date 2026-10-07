"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { playMicroClick } from "@/lib/sound";

export default function InteractiveProfileCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [istTime, setIstTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        playMicroClick();
      }}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md mx-auto perspective-1000 select-none py-4"
    >
      {/* Luxury Ambient Halo Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 via-[var(--color-secondary)]/15 to-[var(--color-accent)]/20 rounded-full blur-3xl opacity-70 animate-pulse-slow pointer-events-none" />

      {/* Floating Status Pill (Top) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] shadow-lg"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold text-[var(--color-text)]">
          Immediate Joiner
        </span>
        <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
          • 15 Days Notice
        </span>
      </motion.div>

      {/* Seamless Editorial Portrait Pedestal */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-64 sm:w-72 md:w-80 aspect-[4/4.9] rounded-[2.5rem] overflow-hidden p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] group"
      >
        {/* Inner Glass Shell */}
        <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-gradient-to-b from-[var(--color-surface-hover)] to-[var(--color-surface)]">
          {/* Authentic Portrait Image */}
          <Image
            src={PERSONAL_INFO.profilePhoto}
            alt={PERSONAL_INFO.name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Smooth Vignette Mask at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Subtle Ambient Edge Glow */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.3rem] pointer-events-none" />
        </div>
      </motion.div>

      {/* Floating Executive Credentials Bar (Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 z-20 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[var(--color-text-muted)]"
      >
        <span className="px-3 py-1 rounded-full bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text)] font-semibold flex items-center gap-1.5 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          Full Stack Systems
        </span>
        <span className="px-3 py-1 rounded-full bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] text-emerald-400 font-semibold flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5" />
          Bangalore ({istTime || "IST"})
        </span>
      </motion.div>
    </div>
  );
}
