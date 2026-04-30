"use client";

import { Button } from "@/components/ui/button";
import Logo from "../logo";
import { LanguageSwitcher } from "../../ui/language-switcher";
import { useLanguage } from "@/app/context/LanguageContext";

const Header = () => {
  const { t, language } = useLanguage();

  const handleDownloadPDF = () => {
    window.location.href = "/images/resumedownload/Abul Sami CV1.pdf";
  };
  return (
    <header className="navbar top-0 left-0 z-[999] w-full absolute">
      <div className="container">
        <nav className="py-7">
          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
              <div className="shrink-0">
                <Logo />
              </div>

              <Button
                variant={"outline"}
                onClick={handleDownloadPDF}
                className="relative overflow-hidden cursor-pointer w-fit h-full py-2 sm:py-3 md:py-5 px-3 sm:px-5 md:px-7 border border-primary rounded-full group"
              >
                <span className="relative z-10 text-xs sm:text-sm md:text-lg font-medium text-black group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {t("resume.download")}
                </span>
              </Button>
            </div>
            <div className="shrink-0">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
