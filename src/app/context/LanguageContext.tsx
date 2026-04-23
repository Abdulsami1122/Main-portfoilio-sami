"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // A simple dictionary fetcher helper
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary mapping
export const dictionaries = {
  en: {
    "hero.role": "Full-Stack Developer",
    "hero.desc": "Specializing in MERN and PERN stack development, I build scalable real-world applications with a focus on performance and seamless user experience.",
    "resume.download": "Download PDF Resume",
  },
  ar: {
    "hero.role": "مطور ويب شامل",
    "hero.desc": "متخصص في تطوير MERN و PERN، أقوم ببناء تطبيقات واقعية قابلة للتطوير مع التركيز على الأداء وتجربة المستخدم السلسة.",
    "resume.download": "تنزيل السيرة الذاتية PDF",
  },
  ur: {
    "hero.role": "فل اسٹیک ڈیولپر",
    "hero.desc": "میں MERN اور PERN اسٹیک میں مہارت رکھتا ہوں اور بہترین کارکردگی کی حامل قابل توسیع ویب ایپلیکیشنز بناتا ہوں۔",
    "resume.download": "اپنا ریزیومے ڈاؤن لوڈ کریں PDF",
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-lang") as Language;
    if (saved && (saved === "en" || saved === "ar" || saved === "ur")) {
      setLanguage(saved);
      document.documentElement.dir = saved === "ar" || saved === "ur" ? "rtl" : "ltr";
      // Optional: Set document lang attribute
      document.documentElement.lang = saved;
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.dir = lang === "ar" || lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string) => {
    return (dictionaries[language] as any)[key] || (dictionaries["en"] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
