"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileDown,
  Printer,
  ExternalLink,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, EDUCATION, CERTIFICATIONS } from "@/data/portfolioData";
import { playMicroClick, playCelebrationSound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"formatted" | "skills" | "embed">("formatted");
  const [copiedText, setCopiedText] = useState(false);

  const handleDownloadPDF = () => {
    playCelebrationSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e06d53", "#2ebd70", "#ea580c", "#a3e635", "#c084fc"],
    });

    const link = document.createElement("a");
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = "Abinash_Swain_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    playMicroClick();
    window.print();
  };

  const copyPlaintextResume = () => {
    playMicroClick();
    const text = `
ABINASH SWAIN
Full Stack Developer | Bangalore, India
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}
Notice Period: Immediate Joiner (15 Days)
LinkedIn: ${PERSONAL_INFO.socials.linkedin} | GitHub: ${PERSONAL_INFO.socials.github}

SUMMARY:
Senior Full Stack Engineer with 3+ years of production experience architecting high-throughput distributed systems, healthcare ecosystems, and enterprise web applications.

EXPERIENCE:
- Freelance Full Stack Developer (Aug 2026 - Present) | JavaTechnocrat
- Software Developer [Promoted] (June 2025 - July 2026) | Mindcys Consultancy Pvt. Ltd.
- Software Developer Trainee (June 2024 - May 2025) | Mindcys Consultancy Pvt. Ltd.
- Junior Programmer (June 2023 - May 2024) | Juvenilia Technology Pvt. Ltd.

FEATURED PROJECTS:
- Swastyam Healthcare Platform (Web, iOS, Android - 10k+ Patients)
- Lab Management Diagnostic Ecosystem (300+ daily sample pickups)
- Node.js Developer Toolkit (@abinashswain/node-developer-toolkit on NPM)
- Scalable Distributed E-Commerce Microservices Engine
- Email Extractor B2B SaaS (50k+ daily records)

EDUCATION:
- B.Tech in CSE, Biju Patnaik University of Technology (2020 - 2024) | CGPA: 8.00+
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-4 sm:p-8 z-10 text-left flex flex-col"
        >
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="editorial-pill text-[10px] text-[var(--color-primary)]">
                  Verified Executive Dossier
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  🟢 15-Day Notice Period
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text)]">
                Abinash Swain — Resume & Credentials
              </h2>
            </div>

            {/* Actions: Download PDF, Print, Close */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-highlight)] text-xs font-semibold shadow-lg hover:bg-[var(--color-primary-hover)] transition-all hover:scale-105 active:scale-95"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Official PDF</span>
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                title="Open PDF in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open PDF</span>
              </a>

              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                title="Print Resume"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={copyPlaintextResume}
                className="p-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                title="Copy Plaintext"
              >
                {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  playMicroClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors ml-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 my-4 border-b border-[var(--color-border)] pb-2 text-xs">
            <button
              onClick={() => {
                playMicroClick();
                setActiveTab("formatted");
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === "formatted"
                  ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              Formatted Document
            </button>
            <button
              onClick={() => {
                playMicroClick();
                setActiveTab("skills");
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === "skills"
                  ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              Skills & Matrix
            </button>
            <button
              onClick={() => {
                playMicroClick();
                setActiveTab("embed");
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === "embed"
                  ? "bg-[var(--color-primary)] text-[var(--color-highlight)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              PDF Viewer
            </button>
          </div>

          {/* Tab 1: Formatted Document */}
          {activeTab === "formatted" && (
            <div className="space-y-8 p-4 sm:p-6 rounded-2xl bg-[var(--color-surface-hover)]/60 border border-[var(--color-border)] text-[var(--color-text)]">
              {/* Header Info */}
              <div className="text-center pb-6 border-b border-[var(--color-border)]">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">ABINASH SWAIN</h1>
                <div className="text-xs sm:text-sm text-[var(--color-primary)] font-mono font-semibold mt-1">
                  Full Stack Developer • Distributed Systems • Microservices
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--color-text-muted)] mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    Bangalore, India
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    +91 6370083077
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    swainabinash36@gmail.com
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-mono font-semibold">
                    Immediate Joiner (15 Days)
                  </span>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] border-b border-[var(--color-border)] pb-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Employment Experience</span>
                </h3>
                <div className="space-y-6">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="font-bold text-sm text-[var(--color-text)]">{exp.role}</span>
                          <span className="text-xs text-[var(--color-text-muted)] ml-2">
                            | {exp.company}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[var(--color-primary)]">{exp.period}</span>
                      </div>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured & Personal Projects */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] border-b border-[var(--color-border)] pb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Featured & Personal Production Projects</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECTS.slice(0, 5).map((p) => (
                    <div key={p.id} className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1.5">
                      <div className="font-bold text-xs text-[var(--color-text)] flex items-center justify-between">
                        <span>{p.title}</span>
                        <span className="text-[9px] font-mono text-[var(--color-primary)]">{p.domain}</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        {p.solution}
                      </p>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                        Stack: {p.technologies.slice(0, 5).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements & Awards */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] border-b border-[var(--color-border)] pb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Achievements & Awards</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--color-text-muted)]">
                  <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="font-bold text-[var(--color-text)] mb-1">Production Healthcare Platform</div>
                    <p className="text-[11px] leading-relaxed">Deployed Swastyam live on Web, Google Play Store, and Apple App Store, serving 10,000+ users.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="font-bold text-[var(--color-text)] mb-1">Open-Source & Commercial Launches</div>
                    <p className="text-[11px] leading-relaxed">Published @abinashswain/node-developer-toolkit on npm and deployed JavaTechnocrat (javatechnocrat.in).</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="font-bold text-[var(--color-text)] mb-1">CI/CD Velocity & Latency</div>
                    <p className="text-[11px] leading-relaxed">Accelerated release turnaround by 60% via GitHub Actions and improved API latency by 45%.</p>
                  </div>
                </div>
              </div>

              {/* Education & Awards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] border-b border-[var(--color-border)] pb-1 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </h3>
                  <div className="text-xs font-bold text-[var(--color-text)]">{EDUCATION.degree}</div>
                  <div className="text-[11px] text-[var(--color-text-muted)]">{EDUCATION.institution}</div>
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold">{EDUCATION.cgpa} ({EDUCATION.period})</div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] border-b border-[var(--color-border)] pb-1 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Certifications & Languages</span>
                  </h3>
                  <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                    {CERTIFICATIONS.map((c) => (
                      <div key={c.name} className="flex justify-between">
                        <span>{c.name}</span>
                        <span className="font-mono text-[10px] text-[var(--color-primary)]">{c.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Skills & Matrix */}
          {activeTab === "skills" && (
            <div className="space-y-4 p-4 sm:p-6 rounded-2xl bg-[var(--color-surface-hover)]/60 border border-[var(--color-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { cat: "Languages", items: ["JavaScript (ES6+)", "TypeScript 5.7+", "Python", "SQL", "HTML5", "CSS3"] },
                  { cat: "Frontend", items: ["React.js 19", "Next.js 16+ (App Router)", "React Native CLI", "Tailwind CSS", "Redux Saga", "TanStack Query"] },
                  { cat: "Backend & APIs", items: ["Node.js v22", "Express.js", "RESTful Architecture", "WebSockets", "Event-Driven Messaging", "RBAC"] },
                  { cat: "Databases & Caching", items: ["MariaDB", "PostgreSQL", "MySQL", "MongoDB", "Redis (Cache-Aside)", "Prisma ORM"] },
                  { cat: "Cloud & DevOps", items: ["GCP Cloud", "Docker & Compose", "GitHub Actions CI/CD", "NGINX Reverse Proxy", "Linux Shell (Bash)", "AWS (EC2/S3)"] },
                  { cat: "Testing & Quality", items: ["Vitest", "Jest", "Supertest", "tsup", "Winston", "Sentry", "Zod", "Postman"] },
                ].map((group) => (
                  <div key={group.cat} className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="text-xs font-bold text-[var(--color-primary)] uppercase font-mono mb-2">
                      {group.cat}
                    </div>
                    <ul className="space-y-1 text-xs text-[var(--color-text)]">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: PDF Direct Embed */}
          {activeTab === "embed" && (
            <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-zinc-900">
              <iframe
                src={`${PERSONAL_INFO.resumeUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title="Abinash Swain Resume PDF"
              />
            </div>
          )}

          {/* Footer Download CTA */}
          <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
            <div>
              Direct file: <code className="font-mono text-[var(--color-primary)]">Abinash_Swain_Resume.pdf</code>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-highlight)] font-semibold shadow-lg hover:bg-[var(--color-primary-hover)] transition-all hover:scale-105 active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
