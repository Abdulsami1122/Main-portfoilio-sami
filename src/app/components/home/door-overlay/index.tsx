"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DoorOverlay = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleOpen = () => {
    setIsOpening(true);
    onOpen();
    // After animation duration, hide the overlay completely
    setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 1s duration
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex overflow-hidden bg-background">
      {/* Left Door */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-1/2 bg-black z-[10001] transition-transform duration-1000 ease-in-out flex items-center justify-end ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
      >
         <div className="h-20 w-1 bg-primary/30 mr-2 rounded-full hidden md:block"></div>
      </div>

      {/* Right Door */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-1/2 bg-black z-[10001] transition-transform duration-1000 ease-in-out flex items-center justify-start ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="h-20 w-1 bg-primary/30 ml-2 rounded-full hidden md:block"></div>
      </div>

      {/* Center Content (Button) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-[10002] transition-opacity duration-500 ${
          isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase mb-8">
            Welcome To My Portfolio
          </h2>
          <Button
            size="lg"
            onClick={handleOpen}
            className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-10 py-8 text-xl rounded-full transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(254,67,0,0.5)] uppercase tracking-widest"
          >
            <span className="relative z-10">Open Portfolios</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoorOverlay;
