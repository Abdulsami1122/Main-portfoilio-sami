import Logo from "../logo";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-6 sm:py-14 flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col gap-1.5 items-center sm:items-start">
          <div className="relative flex items-center w-full">
            <div className="grow h-px bg-foreground/30" />
            <div className="mx-4">
              <Logo />
            </div>
            <div className="grow h-px bg-foreground/30" />
          </div>
          <p className="text-muted-foreground text-center sm:text-left text-sm sm:text-base mt-4 sm:mt-0">
            2026 © {t("footer.designed")}{" "}
            <Link
              href={"/"}
              className="hover:text-foreground font-semibold transition-colors"
            >
              Abdul Sami
            </Link>{" "}
            - {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

