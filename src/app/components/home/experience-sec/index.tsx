"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const ExperienceSec = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      year: "2026 - PRESENT",
      title: t("exp.1.title"),
      company: "",
      type: t("exp.type.fullstack"),
      description: t("exp.1.desc"),
    },
    {
      year: "2025 - 2026",
      title: t("exp.2.title"),
      company: "Gul Traders",
      type: t("exp.type.ecommerce"),
      description: t("exp.2.desc"),
    },
    {
      year: "2025 - 2026",
      title: t("exp.3.title"),
      company: "Wiser Consulting",
      type: t("exp.type.fullstack"),
      description: t("exp.3.desc"),
    },
  ];

  return (
    <section>
      <div className="py-12 md:py-18">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 border-b border-foreground/30 pb-7 mb-6 md:mb-10">
            <h2>{t("exp.title")}</h2>
            <p className="text-xl text-primary">
              ( {String(experiences.length).padStart(2, "0")} )
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative"
              >
                <div className="">
                  <h3 className="font-bold mb-2 text-foreground">{exp.year}</h3>
                  <h4 className="text-lg font-normal">{exp.title}</h4>
                </div>

                <div className=" relative">
                  {index < experiences.length && (
                    <div
                      className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? "h-40" : "h-30"} bg-muted`}
                    ></div>
                  )}

                  <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                    <div
                      className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-background flex items-center justify-center ${index === 0 ? "border-primary" : "border-foreground"
                        }`}
                    >
                      {index === 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      )}
                      {index !== 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
                      )}
                    </div>
                  </div>

                  <div className="pl-4 lg:pl-7">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl text-foreground font-normal">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-base font-normal">{exp.type}</p>
                  </div>
                </div>

                <div className="pl-8 sm:pl-0">
                  <p className="leading-relaxed text-base">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSec;

