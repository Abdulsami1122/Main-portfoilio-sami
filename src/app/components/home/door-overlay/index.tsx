"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const DoorOverlay = ({ onOpen }: { onOpen: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    onOpen();
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.6, ease: "easeInOut" } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const doorVariants = {
    initial: { y: "0%", borderRadius: "0 0 0 0" },
    exit: { 
      y: "-100%", 
      borderRadius: "0 0 50% 50%",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          className="fixed inset-0 z-[10000] flex overflow-hidden bg-[#050505] flex-col items-center justify-center"
          variants={doorVariants}
          initial="initial"
          exit="exit"
        >
          {/* Subtle animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/10 blur-[120px]"
              animate={{ 
                x: [0, 100, 0], 
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-rose-500/10 blur-[120px]"
              animate={{ 
                x: [0, -100, 0], 
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Grid Pattern overlay for texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
          </div>

          {/* Center Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-[10002] flex flex-col items-center justify-center space-y-12 px-4 w-full max-w-5xl"
          >
            <div className="text-center space-y-6 flex flex-col items-center w-full">
              <motion.div variants={textVariants} className="overflow-hidden">
                <h2 className="text-sm md:text-base font-medium text-neutral-400 tracking-[0.4em] uppercase mb-2">
                  Portfolio Entry
                </h2>
              </motion.div>
              
              <motion.div variants={textVariants} className="overflow-hidden py-2">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-tight" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                  Welcome To My
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                    Portfolio
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
                    Open Portfolios
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoorOverlay;
