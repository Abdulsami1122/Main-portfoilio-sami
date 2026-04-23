"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative hero-section overflow-hidden pt-35 md:pt-40 pb-12 lg:pb-30 xl:pt-52">
      <div className="container">
        <div className="lg:flex lg:justify-between grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-4 items-center">
          <div className="flex flex-col gap-4 md:gap-7 max-w-2xl">
            <div>
              <h1>Abdul Sami</h1>
              <h1>{t("hero.role")}</h1>
            </div>
            <p className="text-muted-foreground font-normal max-w-md xl:max-w-xl">
              {t("hero.desc")}
            </p>
          </div>
          <div className="flex w-full justify-center lg:justify-end mt-12 lg:mt-0 lg:w-1/2">
            <div className="relative flex h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] items-center justify-center animate-float">
              {/* Outer rotating dashed ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-primary/50 animate-spin-slow"></div>

              {/* Diffused morphing glow effect */}
              <div className="absolute inset-4 bg-primary/20 animate-morph blur-2xl"></div>

              {/* Solid inner border for contrast */}
              <div className="absolute inset-6 rounded-full border border-primary/20"></div>

              {/* Profile Image container */}
              <div className="relative h-[270px] w-[270px] sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px] overflow-hidden shadow-2xl rounded-full border-4 border-white dark:border-gray-900 bg-muted/20">
                <Image
                  src={"/images/home/banner/Sami.jpeg"}
                  alt="Abdul Sami"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
