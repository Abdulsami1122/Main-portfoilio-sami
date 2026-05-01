"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only apply on desktop
    if (window.innerWidth < 768) return;

    // Hide default cursor across the body
    document.body.style.cursor = "none";

    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over standard clickable elements
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hydration safety: do not render until mounted on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || typeof window === "undefined" || window.innerWidth < 768) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] rounded-full border border-primary/40 transition-all duration-100 ease-out flex items-center justify-center bg-primary/10 shadow-sm"
      style={{
        left: 0,
        top: 0,
        width: isHovering ? "48px" : "28px",
        height: isHovering ? "48px" : "28px",
        transform: `translate(${position.x - (isHovering ? 24 : 14)}px, ${position.y - (isHovering ? 24 : 14)}px)`,
      }}
    >
      <div 
        className={`bg-primary rounded-full transition-all duration-300 ${
          isHovering ? "w-1.5 h-1.5 opacity-40 scale-150" : "w-1.5 h-1.5 opacity-100"
        }`} 
      />
    </div>
  );
}
