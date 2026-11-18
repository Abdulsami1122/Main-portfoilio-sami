"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Download, 
  Share2,
  LayoutGrid,
  User,
  Layers,
  Zap,
  Briefcase,
  Mail
} from "lucide-react";
import { LanguageSwitcher } from "@/app/components/ui/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/app/context/LanguageContext";
import { SectionTab } from "./types";

interface NavbarProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
  viewMode: "tabbed" | "continuous";
  onToggleViewMode: (mode: "tabbed" | "continuous") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onSelectTab,
  viewMode,
  onToggleViewMode,
}) => {
  const { t } = useLanguage();

  const handleDownloadCV = () => {
    window.open("/images/resumedownload/Abdul-Sami-SE.pdf", "_blank");
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: "Abdul Sami — Full-Stack Developer",
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Portfolio URL copied to clipboard!");
    }
  };

  const navItems: { id: SectionTab; label: string; icon: React.ReactNode }[] = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: <User className="w-3.5 h-3.5" /> 
    },
    { 
      id: "projects", 
      label: "Projects", 
      icon: <Layers className="w-3.5 h-3.5" /> 
    },
    { 
      id: "skills", 
      label: "Skills", 
      icon: <Zap className="w-3.5 h-3.5" /> 
    },
    { 
      id: "experience", 
      label: "Experience", 
      icon: <Briefcase className="w-3.5 h-3.5" /> 
    },
    { 
      id: "contact", 
      label: "Contact", 
      icon: <Mail className="w-3.5 h-3.5" /> 
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-xs transition-colors select-none">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Avatar Brand */}
        <div 
          onClick={() => onSelectTab("overview")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shadow-2xs group-hover:scale-105 transition-transform">
            <Image
              src="/favicon.jpeg"
              alt="Abdul Sami"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-foreground text-xs sm:text-sm tracking-tight leading-none group-hover:text-primary transition-colors">
              Abdul Sami
            </span>
            <span className="text-[10px] text-muted-foreground font-medium mt-1 leading-none">
              Full-Stack Developer
            </span>
          </div>
        </div>

        {/* Center: Clean Modern Segmented Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/60 dark:bg-muted/40 border border-border/80 rounded-full p-1 text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-background rounded-full border border-border shadow-2xs"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Tabbed vs Continuous */}
          <button
            onClick={() => onToggleViewMode(viewMode === "tabbed" ? "continuous" : "tabbed")}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              viewMode === "continuous"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border"
            }`}
            title={viewMode === "continuous" ? "Switch to Tabbed Focus" : "Switch to Continuous All-in-One View"}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">
              {viewMode === "continuous" ? "Continuous" : "View All"}
            </span>
          </button>

          {/* Download CV */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg font-semibold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("resume.download")}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground border border-border cursor-pointer"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <div className="border border-border rounded-lg px-1 py-0.5 bg-card">
            <LanguageSwitcher />
          </div>

          {/* Theme Toggle */}
          <div className="border border-border rounded-lg bg-card">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Strip (Hidden on md and above) */}
      <div className="md:hidden border-t border-border/60 bg-background/95 px-2 py-1.5 flex items-center justify-center overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
