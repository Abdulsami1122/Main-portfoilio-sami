"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Share2,
  LayoutGrid,
  Layers,
  Home,
  Zap,
  Briefcase,
  Mail,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

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
      label: "Home", 
      icon: <Home className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: "projects", 
      label: "Projects", 
      icon: <Layers className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: "skills", 
      label: "Skills", 
      icon: <Zap className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: "experience", 
      label: "Experience", 
      icon: <Briefcase className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: "contact", 
      label: "Contact", 
      icon: <Mail className="w-4 h-4 shrink-0" /> 
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-xs transition-colors select-none">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Left: Avatar Brand (Text hidden on mobile, visible on sm and up) */}
          <div 
            onClick={() => onSelectTab("overview")}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-border shadow-2xs group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/favicon.jpeg"
                alt="Abdul Sami"
                fill
                className="object-cover"
              />
            </div>
            {/* Name and subtitle: Hidden on mobile phone, shown on tablet/desktop */}
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-foreground text-xs sm:text-sm tracking-tight leading-none group-hover:text-primary transition-colors">
                Abdul Sami
              </span>
              <span className="text-[10px] text-muted-foreground font-medium mt-1 leading-none">
                Full-Stack Developer
              </span>
            </div>
          </div>

          {/* Center: Desktop Segmented Pill Navigation */}
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
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* View Mode Toggle */}
              <button
                onClick={() => onToggleViewMode(viewMode === "tabbed" ? "continuous" : "tabbed")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
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
                className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg font-semibold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>{t("resume.download")}</span>
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
              <LanguageSwitcher />

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Actions: Quick Switchers + Hamburger Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <LanguageSwitcher />
              <ThemeToggle />

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer flex items-center justify-center shadow-2xs ml-1"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Half-Screen Slide-Over Menu from the Right) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[72vw] min-w-[260px] max-w-[320px] bg-background border-l border-border shadow-2xl flex flex-col p-5 md:hidden select-none"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shadow-2xs">
                    <Image
                      src="/favicon.jpeg"
                      alt="Abdul Sami"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-foreground leading-none">
                      Abdul Sami
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-none font-medium">
                      Full-Stack Dev
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items (Home, Projects, Skills, Experience, Contact) */}
              <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                      }`}
                    >
                      <span className={isActive ? "text-primary-foreground" : "text-primary"}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-border space-y-3">
                {/* View Mode Toggle */}
                <button
                  onClick={() => {
                    onToggleViewMode(viewMode === "tabbed" ? "continuous" : "tabbed");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === "continuous"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-muted text-foreground border-border"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    <span>View Layout</span>
                  </span>
                  <span className="font-semibold text-[11px] px-2 py-0.5 rounded bg-background/50 border border-border">
                    {viewMode === "continuous" ? "Continuous" : "View All"}
                  </span>
                </button>

                {/* Download CV */}
                <button
                  onClick={handleDownloadCV}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-bold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("resume.download")}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
