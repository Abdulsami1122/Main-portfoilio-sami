"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

import { useLanguage } from "@/app/context/LanguageContext";

const DoorOverlay = ({ onOpen }: { onOpen: () => void }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    onOpen();
    setTimeout(() => {
      setIsVisible(false);
    }, 900); // Updated to match the longer animation duration
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.5, ease: "easeInOut" } 
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const leftDoorVariants: Variants = {
    initial: { x: "0%" },
    exit: { 
      x: "-100%", 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1
      }
    }
  };

  const rightDoorVariants: Variants = {
    initial: { x: "0%" },
    exit: { 
      x: "100%", 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1
      }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {!isOpening && (
        <div className="fixed inset-0 z-[10000] flex overflow-hidden">
          {/* Left Door */}
          <motion.div
            variants={leftDoorVariants}
            initial="initial"
            exit="exit"
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#050505] z-10"
          />
          
          {/* Right Door */}
          <motion.div
            variants={rightDoorVariants}
            initial="initial"
            exit="exit"
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#050505] z-10"
          />

          {/* Content Wrapper (fades out) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-20 w-full h-full flex flex-col items-center justify-center bg-transparent"
          >
            {/* Background elements that stay centered and fade out */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/10 blur-[80px] md:blur-[120px]"
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, 25, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3] 
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-rose-500/10 blur-[80px] md:blur-[120px]"
                animate={{ 
                  x: [0, -50, 0],
                  y: [0, -25, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:[mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
            </div>

            {/* Center Content */}
            <div className="relative z-30 flex flex-col items-center justify-center space-y-12 px-4 w-full max-w-5xl text-center">
              <motion.div variants={textVariants} className="overflow-hidden py-2">
                <h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-tight" 
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  {t("welcome.title")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                    {t("welcome.portfolio")}
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={textVariants} className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-8 mb-8" />

              <motion.div variants={buttonVariants}>
                <Button
                  size="lg"
                  onClick={handleOpen}
                  className="group relative h-16 px-10 overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 text-white rounded-full transition-all duration-500 uppercase tracking-[0.15em] text-sm backdrop-blur-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-3">
                    {t("welcome.open")}
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DoorOverlay;

