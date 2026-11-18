"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ArrowUpRight
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export const ProjectsCarousel: React.FC = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: "1",
      title: "POS System (PERN Stack)",
      category: "Full-Stack Enterprise POS & Accounting",
      stack: ["PostgreSQL", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      client: "Double-entry accounting, inventory, warehouses & international clients",
      description: "An enterprise-grade Point of Sale (POS) and inventory ERP engineered with double-entry accounting principles, custom Chart of Accounts, multi-warehouse tracking, dropshipping logistics, and investor ledger management.",
      features: [
        "Double-entry bookkeeping and customizable Chart of Accounts",
        "Multi-warehouse inventory management with automated reorders",
        "Dropshipping fulfillment, sales registers, and purchase orders",
        "Role-based access control (RBAC) and audit logging"
      ],
      image: "/images/work/pos.png",
      slug: "https://sa.wiserconsulting.info/login",
      status: "Production Live",
    },
    {
      id: "2",
      title: "Gul Traders Website (MERN)",
      category: "E-Commerce & Digital Commerce",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Tailwind CSS"],
      client: "Responsive UI/UX and business-focused design",
      description: "Comprehensive full-stack MERN e-commerce application equipped with responsive catalog navigation, live search, cart state management, customer auth, and an administrative control suite for product and order fulfillment.",
      features: [
        "Interactive product catalog with fast filtering and search",
        "User authentication and responsive shopping cart",
        "Admin control panel for live order & product management",
        "Optimized mobile-first responsive design"
      ],
      image: "/images/work/gultraders1.png",
      slug: "https://gultraders.com/",
      status: "Production Live",
    },
    {
      id: "3",
      title: "Wiser Consulting Website (MERN & Next.js)",
      category: "Global Immigration & Visa Consulting Portal",
      stack: ["Next.js", "React.js", "Node.js", "MongoDB", "Tailwind CSS"],
      client: "Global visa assistance, documentation, and user-friendly portal",
      description: "Customer-facing visa and consulting portal developed for Wiser Consulting to assist international clients with eligibility assessment tools, documentation guidance, consultation bookings, and automated lead pipelines.",
      features: [
        "Visa assessment points calculator",
        "Client documentation guidance and portal workflow",
        "Consultation scheduling and automated lead management",
        "SEO-optimized responsive UI"
      ],
      image: "/images/work/visa-mockup.png",
      slug: "https://wiserconsulting.info/",
      status: "Production Live",
    },
    {
      id: "4",
      title: "Tech Wiser Consulting Software House",
      category: "Corporate Software House Agency",
      stack: ["Next.js 15", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion"],
      client: "A professional software development house specializing in robust web systems and custom enterprise solutions.",
      description: "Modern corporate portfolio for a software development house highlighting enterprise software architectures, digital transformation, custom SaaS builds, and client onboarding automation.",
      features: [
        "Corporate portfolio with interactive smooth animations",
        "Custom enterprise web application showcases",
        "Inquiry generation and client onboarding flow",
        "Ultra-fast page speed and production deployments"
      ],
      image: "/images/work/wiser-consulting-software.png",
      slug: "https://tech.wiserconsulting.info/",
      status: "Production Live",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentProject = projects[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, projects.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Production Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("work.title")}
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Explore live production web apps, e-commerce stores, and enterprise accounting systems.
          </p>
        </div>

        {/* Carousel Playback & Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              isPlaying 
                ? "bg-primary/10 border-primary/30 text-primary" 
                : "bg-muted border-border text-muted-foreground"
            }`}
            title={isPlaying ? "Pause Auto-Slide" : "Resume Auto-Slide"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="font-mono text-[11px]">{isPlaying ? "Auto" : "Paused"}</span>
          </button>

          <div className="flex items-center bg-card border border-border rounded-xl p-1 shadow-2xs">
            <button
              onClick={handlePrev}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors text-foreground cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 font-mono text-xs font-semibold text-muted-foreground">
              {currentIndex + 1} / {projects.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors text-foreground cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Carousel Display */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Project Image with Hover Overlay */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-border shadow-md group">
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <a
                    href={currentProject.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Launch Live Web Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Slide Navigation Dots */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx 
                        ? "w-8 bg-primary" 
                        : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                    title={`Jump to ${p.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Project Details Panel */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                  {currentProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2 bg-muted/40 p-4 rounded-2xl border border-border/80">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Key Deliverables:
                </div>
                {currentProject.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5">
                {currentProject.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-card border border-border text-foreground text-xs font-mono font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={currentProject.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={handleNext}
                  className="py-3 px-4 bg-muted hover:bg-muted/80 text-foreground rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Next Project</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Projects Thumbnail Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {projects.map((p, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                isActive
                  ? "bg-card border-primary ring-2 ring-primary/20 shadow-xs"
                  : "bg-card/60 hover:bg-card border-border text-muted-foreground"
              }`}
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-border">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
              <div className="truncate">
                <div className={`text-xs font-bold truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                  {p.title}
                </div>
                <div className="text-[10px] text-muted-foreground truncate font-mono">
                  {p.stack[0]} &bull; {p.stack[1]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
