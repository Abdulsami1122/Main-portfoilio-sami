"use client";
import { useState, useEffect } from "react";
import DoorOverlay from "./components/home/door-overlay";
import { CursorSnake } from "@/components/cursor-snake";
import { PortfolioApp } from "@/components/portfolio/PortfolioApp";

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
      <div
        className={`transition-opacity duration-700 ease-out ${
          isPortfolioOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ willChange: "opacity" }}
      >
        <PortfolioApp />
      </div>
    </>
  );
};

export default page