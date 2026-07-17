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
import { CursorSnake } from "@/components/cursor-snake";

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
      {!isPortfolioOpen && <CursorSnake />}
      <main
        className={`transition-opacity duration-700 ease-out ${isPortfolioOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        style={{ willChange: "opacity" }}
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