"use client";
import { useState, useEffect } from "react";
import AboutMe from "./components/home/about-me"
import Contact from "./components/home/contact"
import EducationSkills from "./components/home/education-skills"
import ExperienceSec from "./components/home/experience-sec"
import HeroSection from "./components/home/hero-section"
import ContactBar from "./components/home/hero-section/contact-bar"
import LatestWork from "./components/home/latest-work"
import DoorOverlay from "./components/home/door-overlay";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const page = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  useEffect(() => {
    if (!isPortfolioOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPortfolioOpen]);

  return (
    <>
      <DoorOverlay
        onOpen={() => {
          setIsPortfolioOpen(true);
          window.scrollTo(0, 0);
        }}
      />
      <main
        className={`transition-all duration-1000 ${isPortfolioOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <Header />
        <HeroSection />
        <ContactBar />
        <AboutMe />
        <ExperienceSec />
        <EducationSkills />
        <LatestWork />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default page