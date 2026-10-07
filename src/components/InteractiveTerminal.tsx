"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, Play, Check, CornerDownLeft, Trash2 } from "lucide-react";
import { PERSONAL_INFO, METRICS, PROJECTS, EXPERIENCES, TECHNOLOGIES } from "@/data/portfolioData";
import { playMicroClick, playCelebrationSound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export default function InteractiveTerminal({ onOpenResume }: { onOpenResume: () => void }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init",
      command: "sys.init --profile abinash-swain",
      output: (
        <div className="space-y-1 text-[11px] text-[var(--color-text-muted)]">
          <p className="text-emerald-400 font-bold">
            ✓ Core Runtimes Loaded: Node.js v22 • React 19 • Next.js 16+ • Redis • MariaDB
          </p>
          <p>
            Status: <span className="text-[var(--color-primary)] font-bold">🟢 Immediate Joiner (15 Days Notice)</span> • Bangalore, India
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">
            Type <code className="text-amber-400">help</code> or click a quick prompt below to inspect systems.
          </p>
        </div>
      ),
      time: "21:28",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    playMicroClick();

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    let resultNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        resultNode = (
          <div className="space-y-1 text-[11px] text-[var(--color-text-muted)]">
            <p className="text-[var(--color-primary)] font-bold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
              <div><span className="text-emerald-400">cat bio</span> — Engineering background</div>
              <div><span className="text-emerald-400">metrics</span> — Verified benchmarks</div>
              <div><span className="text-emerald-400">projects</span> — Top production apps</div>
              <div><span className="text-emerald-400">stack</span> — Core technologies</div>
              <div><span className="text-emerald-400">resume</span> — Open & download PDF</div>
              <div><span className="text-emerald-400">contact</span> — Direct channels</div>
              <div><span className="text-emerald-400">clear</span> — Wipe screen</div>
            </div>
          </div>
        );
        break;

      case "cat bio":
      case "bio":
        resultNode = (
          <div className="text-[11px] text-[var(--color-text)] space-y-1">
            <p className="font-bold text-[var(--color-primary)]">Abinash Swain — Full Stack Systems Architect</p>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              2+ years experience building production healthcare ecosystems (Swastyam B2C - 10k+ users), high-throughput SaaS (Email Extractor - 50k+ records/day), and published open-source developer tooling (@abinashswain/node-developer-toolkit).
            </p>
          </div>
        );
        break;

      case "metrics":
      case "benchmarks":
        resultNode = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono">
            {METRICS.map((m) => (
              <div key={m.label} className="p-1.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="text-emerald-400 font-bold">{m.value}{m.suffix}</div>
                <div className="text-zinc-400 text-[9px] truncate">{m.label}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-1.5 text-[11px]">
            {PROJECTS.slice(0, 4).map((p) => (
              <div key={p.id} className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1">
                <span className="font-bold text-[var(--color-text)]">{p.title}</span>
                <span className="text-[var(--color-primary)] font-mono">{p.domain}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "stack":
        resultNode = (
          <div className="text-[10px] font-mono space-y-1 text-zinc-300">
            <p><strong className="text-cyan-400">Frontend:</strong> React 19, Next.js 16 (App Router), TypeScript, React Native, Tailwind CSS</p>
            <p><strong className="text-emerald-400">Backend:</strong> Node.js v22, Express.js, Microservices, WebSockets, RabbitMQ</p>
            <p><strong className="text-amber-400">Database:</strong> MariaDB, PostgreSQL, Redis (Cache-Aside), Prisma ORM</p>
            <p><strong className="text-purple-400">DevOps:</strong> GCP, Docker Compose, GitHub Actions CI/CD, NGINX</p>
          </div>
        );
        break;

      case "resume":
        playCelebrationSound();
        confetti({ particleCount: 70, spread: 60 });
        onOpenResume();
        resultNode = (
          <p className="text-emerald-400 font-bold text-[11px]">
            ✓ Opened verified resume dossier modal & triggered download pipeline.
          </p>
        );
        break;

      case "contact":
        resultNode = (
          <div className="text-[11px] space-y-1 font-mono text-zinc-300">
            <p>📧 Email: <a href="mailto:swainabinash36@gmail.com" className="text-[var(--color-primary)] underline">swainabinash36@gmail.com</a></p>
            <p>📱 Phone: <a href="tel:+916370083077" className="text-emerald-400 underline">+91 6370083077</a></p>
            <p>📍 Location: Bangalore, India (Immediate Joiner - 15 Days)</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        resultNode = (
          <p className="text-rose-400 text-[11px]">
            Command not recognized: &quot;{trimmed}&quot;. Type <code className="text-amber-400">help</code> for list.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output: resultNode,
        time: timestamp,
      },
    ]);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0a0d10] border border-[var(--color-border)] shadow-2xl overflow-hidden font-mono text-left flex flex-col">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#12161b] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] text-zinc-400 ml-2 flex items-center gap-1.5 font-semibold">
            <TerminalIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            abinash@production-node:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
            Interactive CLI
          </span>
          <button
            onClick={() => {
              playMicroClick();
              setHistory([]);
            }}
            className="text-zinc-500 hover:text-zinc-300 p-0.5"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-3 sm:p-4 max-h-56 sm:max-h-64 overflow-y-auto space-y-3 text-xs">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <span className="text-[var(--color-primary)] font-bold">➜</span>
              <span className="text-zinc-200 font-semibold">{item.command}</span>
              <span className="text-[9px] text-zinc-600 ml-auto">{item.time}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Click Prompts */}
      <div className="px-3 py-2 bg-[#0e1217] border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[10px]">
        <span className="text-zinc-500 mr-1 text-[9px] uppercase">Quick Execute:</span>
        {["help", "cat bio", "metrics", "stack", "projects", "resume", "contact"].map((btn) => (
          <button
            key={btn}
            onClick={() => handleCommand(btn)}
            className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-[var(--color-primary)] hover:text-black text-zinc-300 transition-colors border border-white/5"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center px-3.5 py-2.5 bg-[#080a0c] border-t border-white/5"
      >
        <span className="text-[var(--color-primary)] mr-2 font-bold text-xs">➜</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command ('help', 'resume', 'stack')..."
          className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none"
        />
        <button
          type="submit"
          className="p-1 text-zinc-500 hover:text-[var(--color-primary)] transition-colors"
          title="Send"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
