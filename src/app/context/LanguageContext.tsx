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
    // Door Overlay
    "welcome.title": "Welcome To My",
    "welcome.portfolio": "Portfolio",
    "welcome.open": "Open Portfolios",
    
    // Header
    "resume.download": "Download CV",
    
    // Hero
    "hero.role": "Full-Stack Developer",
    "hero.desc": "Specializing in MERN and PERN stack development, I build scalable real-world applications with a focus on performance and seamless user experience.",
    
    // About
    "about.title": "About Me",
    "about.desc": "Full-Stack Developer with strong expertise in MERN and PERN stack development, delivering real-world scalable applications including POS and accounting systems. Experienced in working with international clients and deploying production-ready solutions.",
    "about.stats.years": "Year of experience",
    "about.stats.clients": "Happy Clients",
    "about.stats.projects": "Project Completed",
    "about.language": "Language",
    
    // Education & Skills
    "skills.title": "Education & Skills",
    
    // Experience
    "exp.title": "Experience",
    "exp.1.title": "POS Double Accounting (PERN)",
    "exp.1.desc": "Developed a full-stack POS system using PostgreSQL, Express.js, React.js, and Node.js, featuring double-entry accounting, customizable Chart of Accounts, inventory and warehouse management, sales/purchase modules, dropshipping workflow, and investor management.",
    "exp.2.title": "Gul Traders Website (MERN)",
    "exp.2.desc": "Developed a full-stack MERN e-commerce website with responsive UI/UX, featuring both admin and user panels, optimized for business operations.",
    "exp.3.title": "Tech Wiser Consulting Website (MERN & Next.js)",
    "exp.3.desc": "Developed a comprehensive visa assessment and consulting website for Tech Wiser Consulting to assist clients with visa documentation.",
    "exp.type.fullstack": "Full-Stack Development",
    "exp.type.ecommerce": "E-commerce Development",
    
    // Latest Work
    "work.title": "Latest Works",
    "work.client": "Client",
    
    // Contact
    "contact.title": "Contact Me",
    "contact.name": "Name",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Now",
    "contact.success": "Great!!! Email has been Successfully Sent. We will get in touch asap.",
    "footer.designed": "Designed by",
    "footer.rights": "All rights reserved.",
  },
  ar: {
    // Door Overlay
    "welcome.title": "أهلاً بكم في",
    "welcome.portfolio": "ملفي الشخصي",
    "welcome.open": "فتح الملفات",
    
    // Header
    "resume.download": "تنزيل السيرة الذاتية",
    
    // Hero
    "hero.role": "مطور ويب شامل",
    "hero.desc": "متخصص في تطوير MERN و PERN، أقوم ببناء تطبيقات واقعية قابلة للتطوير مع التركيز على الأداء وتجربة المستخدم السلسة.",
    
    // About
    "about.title": "من أنا",
    "about.desc": "مطور ويب شامل بخبرة قوية في تطوير MERN و PERN، أقدم تطبيقات واقعية قابلة للتطوير بما في ذلك أنظمة المحاسبة و POS. ذو خبرة في العمل مع عملاء دوليين ونشر حلول جاهزة للإنتاج.",
    "about.stats.years": "سنة من الخبرة",
    "about.stats.clients": "عملاء سعداء",
    "about.stats.projects": "مشروع مكتمل",
    "about.language": "اللغة",
    
    // Education & Skills
    "skills.title": "التعليم والمهارات",
    
    // Experience
    "exp.title": "الخبرة",
    "exp.1.title": "نظام POS للمحاسبة المزدوجة (PERN)",
    "exp.1.desc": "تطوير نظام POS شامل باستخدام PostgreSQL و Express.js و React.js و Node.js، يتميز بالمحاسبة المزدوجة، وإدارة المخزون والمستودعات، ووحدات البيع/الشراء.",
    "exp.2.title": "موقع Gul Traders (MERN)",
    "exp.2.desc": "تطوير موقع تجارة إلكترونية كامل باستخدام MERN مع واجهة مستخدم مستجيبة، يتميز بلوحات تحكم للمسؤول والمستخدم.",
    "exp.3.title": "موقع Tech Wiser Consulting (MERN & Next.js)",
    "exp.3.desc": "تطوير موقع شامل لتقييم التأشيرات والاستشارات لمساعدة العملاء في توثيق التأشيرات لشركة Tech Wiser Consulting.",
    "exp.type.fullstack": "تطوير شامل",
    "exp.type.ecommerce": "تطوير التجارة الإلكترونية",
    
    // Latest Work
    "work.title": "أحدث الأعمال",
    "work.client": "العميل",
    
    // Contact
    "contact.title": "اتصل بي",
    "contact.name": "الاسم",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الآن",
    "contact.success": "رائع!!! تم إرسال البريد الإلكتروني بنجاح. سنتواصل معك في أقرب وقت ممكن.",
    "footer.designed": "صمم بواسطة",
    "footer.rights": "جميع الحقوق محفوظة.",
  },
  ur: {
    // Door Overlay
    "welcome.title": "میری ویب سائٹ پر",
    "welcome.portfolio": "خوش آمدید",
    "welcome.open": "پورٹ فولیو کھولیں",
    
    // Header
    "resume.download": "سی وی ڈاؤن لوڈ کریں",
    
    // Hero
    "hero.role": "فل اسٹیک ڈیولپر",
    "hero.desc": "میں MERN اور PERN اسٹیک میں مہارت رکھتا ہوں اور بہترین کارکردگی کی حامل قابل توسیع ویب ایپلیکیشنز بناتا ہوں۔",
    
    // About
    "about.title": "میرے بارے میں",
    "about.desc": "میں ایک فل اسٹیک ڈیولپر ہوں جس کے پاس MERN اور PERN اسٹیک میں مہارت حاصل ہے۔ میں نے کئی کامیاب پروجیکٹس بشمول اکاؤنٹنگ اور POS سسٹمز بنائے ہیں اور بین الاقوامی کلائنٹس کے ساتھ کام کا تجربہ رکھتا ہوں۔",
    "about.stats.years": "سال کا تجربہ",
    "about.stats.clients": "خوش کن کلائنٹس",
    "about.stats.projects": "مکمل شدہ پروجیکٹس",
    "about.language": "زبان",
    
    // Education & Skills
    "skills.title": "تعلیم اور مہارتیں",
    
    // Experience
    "exp.title": "تجربہ",
    "exp.1.title": "POS ڈبل اکاؤنٹنگ (PERN)",
    "exp.1.desc": "میں نے PostgreSQL، Express.js، React.js، اور Node.js کا استعمال کرتے ہوئے ایک مکمل POS سسٹم تیار کیا ہے جس میں اکاؤنٹنگ، انوینٹری مینجمنٹ اور انویسٹر مینجمنٹ کی سہولیات موجود ہیں۔",
    "exp.2.title": "Gul Traders ویب سائٹ (MERN)",
    "exp.2.desc": "ایک مکمل MERN ای کامرس ویب سائٹ تیار کی جس میں ایڈمن اور یوزر پینلز شامل ہیں، جو کاروباری ضروریات کے مطابق بنائی گئی ہے۔",
    "exp.3.title": "Tech Wiser Consulting ویب سائٹ (MERN & Next.js)",
    "exp.3.desc": "Tech Wiser Consulting کے لیے ایک مکمل ویزا اسیسمنٹ اور کنسلٹنگ ویب سائٹ تیار کی جو کلائنٹس کو ویزا دستاویزات اور امیگریشن کے عمل میں مدد فراہم کرتی ہے۔",
    "exp.type.fullstack": "فل اسٹیک ڈیولپمنٹ",
    "exp.type.ecommerce": "ای کامرس ڈیولپمنٹ",
    
    // Latest Work
    "work.title": "تازہ ترین کام",
    "work.client": "کلائنٹ",
    
    // Contact
    "contact.title": "مجھ سے رابطہ کریں",
    "contact.name": "نام",
    "contact.phone": "فون",
    "contact.email": "ای میل",
    "contact.message": "پیغام",
    "contact.send": "ابھی بھیجیں",
    "contact.success": "بہت خوب!!! آپ کا ای میل کامیابی کے ساتھ بھیج دیا گیا ہے۔ ہم جلد ہی آپ سے رابطہ کریں گے۔",
    "footer.designed": "تیار کردہ",
    "footer.rights": "جملہ حقوق محفوظ ہیں۔",
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
