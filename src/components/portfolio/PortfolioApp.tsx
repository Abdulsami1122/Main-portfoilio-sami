"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { OverviewSection } from "./OverviewSection";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { SkillsProficiency } from "./SkillsProficiency";
import { ExperienceSection } from "./ExperienceSection";
import { ContactSection } from "./ContactSection";
import Footer from "@/app/components/layout/footer";
import { SectionTab } from "./types";

export const PortfolioApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionTab>("overview");
  const [viewMode, setViewMode] = useState<"tabbed" | "continuous">("tabbed");

  const scrollToSection = (tab: SectionTab) => {
    const el = document.getElementById(`section-${tab}`);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSelectTab = (tab: SectionTab) => {
    setActiveTab(tab);
    if (viewMode === "continuous") {
      scrollToSection(tab);
    }
  };

  // Track active section on scroll in continuous mode
  useEffect(() => {
    if (viewMode !== "continuous") return;

    const sections: SectionTab[] = ["overview", "projects", "skills", "experience", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of sections) {
        const el = document.getElementById(`section-${section}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors selection:bg-primary/20 flex flex-col">
      {/* 1. Modern Top Navbar with Navigation Tabs & View All Toggle */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 pt-18 sm:pt-28 pb-16">
        {/* Tabbed View vs Continuous View */}
        {viewMode === "tabbed" ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {activeTab === "overview" && (
                <OverviewSection
                  onNavigateToProjects={() => setActiveTab("projects")}
                  onNavigateToContact={() => setActiveTab("contact")}
                />
              )}
              {activeTab === "projects" && <ProjectsCarousel />}
              {activeTab === "skills" && <SkillsProficiency />}
              {activeTab === "experience" && <ExperienceSection />}
              {activeTab === "contact" && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="space-y-16">
            <div id="section-overview">
              <OverviewSection
                onNavigateToProjects={() => scrollToSection("projects")}
                onNavigateToContact={() => scrollToSection("contact")}
              />
            </div>
            <div className="border-t border-border" />
            <div id="section-projects">
              <ProjectsCarousel />
            </div>
            <div className="border-t border-border" />
            <div id="section-skills">
              <SkillsProficiency />
            </div>
            <div className="border-t border-border" />
            <div id="section-experience">
              <ExperienceSection />
            </div>
            <div className="border-t border-border" />
            <div id="section-contact">
              <ContactSection />
            </div>
          </div>
        )}
      </main>

      {/* 3. Clean Professional Footer */}
      <Footer />
    </div>
  );
};
