"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import MetricsBar from "@/components/MetricsBar";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TechnologyEcosystem from "@/components/TechnologyEcosystem";
import ArchitectureVisualizer from "@/components/ArchitectureVisualizer";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import ResumeModal from "@/components/ResumeModal";
import MobileDock from "@/components/MobileDock";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-white transition-colors duration-400">
      {/* Navigation Header */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full pb-16 lg:pb-0">
        {/* 1. Cyber-Editorial Hero with Interactive Terminal & Holographic Card */}
        <Hero />

        {/* 2. Key Quantifiable Metrics */}
        <MetricsBar />

        {/* 3. About & Engineering Principles */}
        <AboutSection />

        {/* 4. Experience Timeline */}
        <ExperienceTimeline />

        {/* 5. Production Projects & Case Studies */}
        <ProjectsShowcase />

        {/* 6. Technology Constellation Ecosystem */}
        <TechnologyEcosystem />

        {/* 7. Interactive Production Architecture Visualizer */}
        <ArchitectureVisualizer />

        {/* 8. Engineering Services & Deliverables */}
        <ServicesSection />

        {/* 9. Direct Contact & Official Resume Download */}
        <ContactSection onOpenResume={() => setResumeModalOpen(true)} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Theme Customizer */}
      <ThemeCustomizer />

      {/* Mobile Bottom Dock */}
      <MobileDock onOpenResume={() => setResumeModalOpen(true)} />

      {/* Verified Resume Dossier Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Keyboard Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
