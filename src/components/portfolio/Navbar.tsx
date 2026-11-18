"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Download, 
  Share2,
  LayoutGrid,
  Layers,
  User,
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
      icon: <User className="w-3.5 h-3.5 shrink-0" /> 
    },
    { 
      id: "projects", 
      label: "Projects", 
      icon: <Layers className="w-3.5 h-3.5 shrink-0" /> 
    },
    { 
      id: "skills", 
      label: "Skills", 
      icon: <Zap className="w-3.5 h-3.5 shrink-0" /> 
    },
    { 
      id: "experience", 
      label: "Experience", 
      icon: <Briefcase className="w-3.5 h-3.5 shrink-0" /> 
    },
    { 
      id: "contact", 
      label: "Contact", 
      icon: <Mail className="w-3.5 h-3.5 shrink-0" /> 
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-xs transition-colors select-none">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Left: Avatar Brand */}
        <div 
          onClick={() => onSelectTab("overview")}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shadow-2xs group-hover:scale-105 transition-transform shrink-0">
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
            <span className="hidden min-[380px]:inline-block text-[10px] text-muted-foreground font-medium mt-0.5 sm:mt-1 leading-none">
              Full-Stack Developer
            </span>
          </div>
        </div>

        {/* Center: Desktop Segmented Pill Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-muted/60 dark:bg-muted/40 border border-border/80 rounded-full p-1 text-xs">
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* View Mode Toggle: Tabbed vs Continuous (Shown on mobile & desktop!) */}
          <button
            onClick={() => onToggleViewMode(viewMode === "tabbed" ? "continuous" : "tabbed")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 ${
              viewMode === "continuous"
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border"
            }`}
            title={viewMode === "continuous" ? "Switch to Tabbed Focus" : "Switch to Continuous All-in-One View"}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold whitespace-nowrap">
              {viewMode === "continuous" ? "Continuous" : "View All"}
            </span>
          </button>

          {/* Download CV */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-1 sm:gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs shadow-xs transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden min-[480px]:inline">{t("resume.download")}</span>
            <span className="min-[480px]:hidden">CV</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="hidden sm:flex p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground border border-border cursor-pointer shrink-0"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <div className="shrink-0 scale-90 sm:scale-100 origin-right">
            <LanguageSwitcher />
          </div>

          {/* Theme Toggle */}
          <div className="shrink-0 scale-90 sm:scale-100 origin-right">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Strip (Visible on screens below lg) */}
      <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md px-2 py-1.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 min-w-max mx-auto px-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
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
