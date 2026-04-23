"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
    { code: "ur", label: "UR" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group z-50 inline-block" ref={dropdownRef}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen) }}
        className="cursor-pointer overflow-hidden flex items-center gap-2 px-3 py-2 rounded-full border border-primary/20 hover:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-primary relative z-10" />
        <span className="text-sm font-medium uppercase text-foreground relative z-10">
          {language}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full mt-2 right-0 min-w-[100px] bg-background border border-primary/20 rounded-xl shadow-xl overflow-hidden transition-all duration-200 origin-top-right ${
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="flex flex-col py-1">
          {languages.map((lang) => (
            <div
              key={lang.code}
              role="button"
              tabIndex={0}
              onClick={() => {
                setLanguage(lang.code as any);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }
              }}
              className={`cursor-pointer flex items-center px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 w-full text-left ${
                language === lang.code ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
