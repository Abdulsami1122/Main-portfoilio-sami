"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Building, Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      year: "2026 - PRESENT",
      title: t("exp.1.title"),
      company: "Independent Enterprise Software",
      type: t("exp.type.fullstack"),
      description: t("exp.1.desc"),
      tech: ["PostgreSQL", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    },
    {
      year: "2025 - 2026",
      title: t("exp.2.title"),
      company: "Gul Traders",
      type: t("exp.type.ecommerce"),
      description: t("exp.2.desc"),
      tech: ["MongoDB", "React.js", "Express.js", "Node.js", "Redux"],
    },
    {
      year: "2025 - 2026",
      title: t("exp.3.title"),
      company: "Wiser Consulting",
      type: t("exp.type.fullstack"),
      description: t("exp.3.desc"),
      tech: ["Next.js", "MongoDB", "React.js", "Node.js", "EmailJS"],
    },
  ];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career Timeline</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {t("exp.title")}
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mt-2">
          Verified professional experience delivering full-stack solutions, e-commerce platforms, and accounting systems.
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs hover:border-primary/40 transition-colors space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/80">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono">
                {exp.year}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {exp.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 space-y-1.5">
                <h3 className="text-lg font-bold text-foreground">
                  {exp.title}
                </h3>
                {exp.company && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building className="w-4 h-4 text-primary" />
                    <span>{exp.company}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-8 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-muted-foreground font-semibold mr-1">Stack:</span>
                  {exp.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
