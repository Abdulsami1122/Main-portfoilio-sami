"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "../logo";
import { LanguageSwitcher } from "../../ui/language-switcher";
import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadPDF = () => {
    window.open("/images/resumedownload/Abdul-Sami-CV.pdf", "_blank");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`navbar fixed top-0 left-0 z-[999] w-full transition-all duration-300 ${scrolled ? "py-4 bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40" : "py-7 bg-transparent"
        }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between gap-1 min-[360px]:gap-2 sm:gap-4 w-full">
          <div className="flex items-center gap-1 min-[360px]:gap-2 sm:gap-4 md:gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0"
            >
              <Logo />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0">
              <Button
                variant={"outline"}
                onClick={handleDownloadPDF}
                className="relative overflow-hidden cursor-pointer w-fit py-1.5 sm:py-2 md:py-2.5 px-2 min-[360px]:px-3 sm:px-4 md:px-5 border border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm rounded-full group shadow-sm transition-all duration-300"
              >
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-medium text-foreground transition-colors duration-300 whitespace-nowrap flex items-center gap-1 min-[360px]:gap-2">
                  <svg className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t("resume.download")}
                </span>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-1 min-[360px]:gap-2 sm:gap-4 shrink-0"
          >
            <ThemeToggle />
            <LanguageSwitcher />
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
