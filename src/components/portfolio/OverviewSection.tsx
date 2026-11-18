"use client";

import React from "react";
import Image from "next/image";
import { 
  Download, 
  ArrowRight, 
  Briefcase, 
  Users, 
  Layers, 
  Globe2, 
  Mail, 
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface OverviewSectionProps {
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const { t } = useLanguage();

  const handleDownloadCV = () => {
    window.open("/images/resumedownload/Abdul-Sami-SE.pdf", "_blank");
  };

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
      {/* 2+ Years Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-semibold">{t("about.stats.years")}</span>
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-black text-foreground">
          2+ Years
        </div>
        <p className="text-xs text-muted-foreground">
          Building production web apps & POS accounting engines.
        </p>
      </div>

      {/* 10+ Projects Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-semibold">{t("about.stats.projects")}</span>
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-black text-foreground">
          10+ Projects
        </div>
        <p className="text-xs text-muted-foreground">
          Full-stack systems, e-commerce, and enterprise portals.
        </p>
      </div>

      {/* 4+ Clients Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-semibold">{t("about.stats.clients")}</span>
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-black text-foreground">
          4+ Clients
        </div>
        <p className="text-xs text-muted-foreground">
          International clients and businesses served globally.
        </p>
      </div>
    </div>
  );

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* 1. Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full-Stack Developer • Available for New Opportunities</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                Abdul Sami
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-muted-foreground mt-2">
                {t("hero.role")} (MERN & PERN Stack)
              </h2>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              {t("hero.desc")}
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto px-3 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg sm:rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t("resume.download")}</span>
              </button>
              <button
                onClick={onNavigateToProjects}
                className="w-full sm:w-auto px-3 sm:px-6 py-2.5 sm:py-3 bg-muted hover:bg-muted/80 text-foreground border border-border sm:border-transparent rounded-lg sm:rounded-2xl font-semibold text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span className="whitespace-nowrap">View Projects</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative aspect-4/5 w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-card ring-1 ring-border group">
              <Image
                src="/images/home/banner/Sami-formal.jpeg"
                alt="Abdul Sami"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats Cards Row (Desktop / Tablet ONLY: hidden on mobile) */}
      <div className="hidden sm:block">
        {renderStatsCards()}
      </div>

      {/* 3. About Me & Spoken Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* About Bio Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>{t("about.title")}</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("about.desc")}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="font-semibold text-foreground mr-1 self-center">Specializations:</span>
              <span className="px-3 py-1 rounded-lg bg-muted text-foreground font-medium">
                Double-Entry Accounting POS
              </span>
              <span className="px-3 py-1 rounded-lg bg-muted text-foreground font-medium">
                E-Commerce Stores
              </span>
              <span className="px-3 py-1 rounded-lg bg-muted text-foreground font-medium">
                Linux Server Deployments
              </span>
              <span className="px-3 py-1 rounded-lg bg-muted text-foreground font-medium">
                Next.js 15 Full-Stack
              </span>
            </div>
          </div>

          {/* Stats Cards Row (Mobile ONLY: shown right after About Me on mobile screens!) */}
          <div className="block sm:hidden">
            {renderStatsCards()}
          </div>
        </div>

        {/* Languages & Quick Channels */}
        <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
              <Globe2 className="w-4 h-4 text-primary" />
              <span>Languages Spoken</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-muted/60">
                <span className="font-medium text-foreground">English</span>
                <span className="text-primary font-semibold text-[11px]">Professional</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-muted/60">
                <span className="font-medium text-foreground">Urdu</span>
                <span className="text-primary font-semibold text-[11px]">Native</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-muted/60">
                <span className="font-medium text-foreground">Pashto</span>
                <span className="text-primary font-semibold text-[11px]">Native</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <button
              onClick={onNavigateToContact}
              className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch with Abdul Sami</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
