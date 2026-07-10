"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  maxRadius: number;
  isClick: boolean;
}

export const RippleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const lastSpawnRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId: number;
    let isDesktop = true;

    // Check if device supports hover interactions (PC check)
    const mediaQuery = window.matchMedia("(hover: hover)");
    isDesktop = mediaQuery.matches;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      isDesktop = e.matches;
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    // Handle canvas resizing
    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    // Run initial resize
    resizeCanvas();

    // Resize observer to handle dynamic size changes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(parent);

    // Spawn a ripple wave
    const spawnRipple = (x: number, y: number, isClick: boolean, speed = 2.0, maxRadius = 120) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        alpha: 1.0,
        speed,
        maxRadius,
        isClick,
      });
    };

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      const rect = parent.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      mouseRef.current.active = true;

      // Spawn trail ripples if cursor moved enough and throttled
      const now = Date.now();
      const lastSpawn = lastSpawnRef.current;
      const dx = mouseX - lastSpawn.x;
      const dy = mouseY - lastSpawn.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8 && now - lastSpawn.time > 50) {
        spawnRipple(mouseX, mouseY, false, 1.4, 90);
        lastSpawnRef.current = { x: mouseX, y: mouseY, time: now };
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (!isDesktop) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Trigger 3 ripples in quick succession with varying speeds to form an interference pattern
      spawnRipple(clickX, clickY, true, 1.8, 180);
      
      const timer1 = setTimeout(() => {
        spawnRipple(clickX, clickY, true, 2.4, 200);
      }, 70);

      const timer2 = setTimeout(() => {
        spawnRipple(clickX, clickY, true, 3.0, 220);
      }, 140);

      // Store timers on parent element to clean up if unmounted
      (parent as any)._rippleTimers = [timer1, timer2];
    };

    // Attach events to the parent element (the button)
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("click", handleClick);

    // Animation Loop
    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clean background (deep dark royal blue gradient matching the ripple theme)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#080c18"); // deep black-blue
      bgGrad.addColorStop(1, "#121d3a"); // navy blue
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // 1. Draw mouse spotlight highlight on PC hover
      if (isDesktop && mouse.active) {
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          75
        );
        spotGrad.addColorStop(0, "rgba(37, 99, 235, 0.4)"); // bright royal blue core
        spotGrad.addColorStop(0.5, "rgba(29, 78, 216, 0.15)");
        spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and draw ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
        ripple.radius += ripple.speed;
        // Fade out as it expands
        ripple.alpha = 1.0 - ripple.radius / ripple.maxRadius;

        if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw primary wave crest (light blue)
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.lineWidth = ripple.isClick ? 2.5 : 1.8;
        ctx.strokeStyle = `rgba(191, 219, 254, ${ripple.alpha * 0.45})`; // light blue-200
        ctx.stroke();

        // Draw secondary trailing wave trough (cyan/blue)
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(0, ripple.radius - 8), 0, Math.PI * 2);
        ctx.lineWidth = ripple.isClick ? 1.5 : 1.0;
        ctx.strokeStyle = `rgba(96, 165, 250, ${ripple.alpha * 0.25})`; // blue-400
        ctx.stroke();

        // Draw outer dark reflection halo
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(0, ripple.radius - 15), 0, Math.PI * 2);
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = `rgba(37, 99, 235, ${ripple.alpha * 0.12})`; // royal blue
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleMediaChange);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("click", handleClick);
      
      const timers = (parent as any)._rippleTimers;
      if (timers) {
        timers.forEach((t: any) => clearTimeout(t));
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
};

export default RippleCanvas;
