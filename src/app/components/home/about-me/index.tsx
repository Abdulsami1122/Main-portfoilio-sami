import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/app/context/LanguageContext";

const AboutMe = () => {
  const { t } = useLanguage();
  
  return (
    <section>
      <div className="relative bg-muted py-10 md:py-32">
        <div className="relative z-10">
          <div className="container">
            <div className="flex items-center justify-between gap-2 border-b border-foreground/30 pb-7">
              <h2>{t("about.title")}</h2>
              <p className="text-xl text-primary">( 01 )</p>
            </div>

            <div className="pt-10 xl:pt-16 flex flex-col lg:flex-row gap-10 items-center justify-between">
              <div className="w-[303px] h-[440px] hidden lg:flex">
                <Image
                  src="/images/home/about-me/about-banner-img.svg"
                  alt="about-banner"
                  width={303}
                  height={440}
                  className="w-full h-full"
                />
              </div>

              <div className="w-full lg:max-w-2xl flex-1">
                <p>
                  {t("about.desc")}
                </p>

                <div className="grid grid-cols-3 py-10 xl:py-16 gap-5 border-b border-gray-300">
                  {[
                    { count: "01", label: t("about.stats.years") },
                    { count: "4+", label: t("about.stats.clients") },
                    { count: "5", label: t("about.stats.projects") },
                  ].map((item, i) => (
                    <div key={i}>
                      <h3>{item.count}</h3>
                      <p className="text-base md:text-lg text-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 xl:pt-14 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3.5">
                    <Image
                      src="/images/icon/lang-icon.svg"
                      alt="lang-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-base xl:text-xl text-foreground">{t("about.language")}</p>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-2.5">
                    {[
                      { key: "about.langs.en", label: "English" },
                      { key: "about.langs.ur", label: "Urdu" },
                      { key: "about.langs.pa", label: "Pashto" }
                    ].map((lang, index) => (
                      <Badge
                        key={index}
                        className="h-full bg-background rounded-full"
                      >
                        <p className="bg-background py-2 md:py-3.5 px-4 md:px-5 text-base xl:text-xl text-muted-foreground">
                          {lang.label}
                        </p>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

