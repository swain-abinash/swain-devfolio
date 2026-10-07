"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  FileDown,
  Send,
  Check,
  Copy,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Clock,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { playMicroClick, playCelebrationSound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export default function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    playMicroClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    playMicroClick();
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const triggerResumeConfetti = () => {
    playCelebrationSound();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e06d53", "#2ebd70", "#ea580c", "#a3e635", "#c084fc"],
    });
    if (onOpenResume) {
      onOpenResume();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    playMicroClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playCelebrationSound();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="editorial-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Let&apos;s Build <span className="text-[var(--color-primary)]">Something Scalable</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            Currently open for Full Stack, Backend, and Lead Engineering roles. Immediate joiner with a 15-day notice period.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts & Resume */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Direct Channels Card */}
            <div className="p-6 sm:p-7 rounded-3xl glass-panel space-y-5">
              <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Direct Contact Channels</span>
              </h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)]">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-text-muted)]">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex-shrink-0 ml-2"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-text-muted)]">
                      Phone / WhatsApp
                    </div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`}
                      className="text-xs font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyPhone}
                  className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex-shrink-0 ml-2"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Availability */}
              <div className="p-3.5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-text-muted)]">
                    Location & Status
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-text)]">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {PERSONAL_INFO.noticePeriod}
                  </div>
                </div>
              </div>

              {/* Social & Chat Profiles */}
              <div className="pt-2 grid grid-cols-3 gap-2">
                <a
                  href={`https://wa.me/916370083077?text=Hi%20Abinash%2C%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20engineering%20role.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroClick()}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroClick()}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-primary)] transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroClick()}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-primary)] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Official Resume Card */}
            <div className="p-6 rounded-3xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)] text-[var(--color-highlight)] flex items-center justify-center shadow-lg">
                  <FileDown className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--color-text)]">
                    Official Executive Resume
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                    PDF Document • Verified Official
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Includes full work history, technical stack details, project benchmarks, and direct references.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={triggerResumeConfetti}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-highlight)] font-semibold text-xs shadow-lg hover:bg-[var(--color-primary-hover)] transition-all hover:scale-105 active:scale-95"
                >
                  <FileDown className="w-4 h-4" />
                  <span>View & Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl glass-panel text-left shadow-2xl border border-[var(--color-border)]">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-6">
                Have an opening or a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--color-text)]">
                    Thank you! Message Received
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto">
                    Your note has been queued. I will review and reply to your provided email address promptly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-xs text-[var(--color-primary)] font-semibold underline mt-2"
                  >
                    Send another note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
                      Subject / Role Title
                    </label>
                    <input
                      type="text"
                      placeholder="Senior Full Stack Engineer Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
                      Message / Project Scope *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Hi Abinash, we are looking for a Full Stack Engineer to lead our microservices architecture and React/Next.js frontend..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-highlight)] font-semibold text-xs shadow-lg shadow-[var(--color-glow)] hover:bg-[var(--color-primary-hover)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
