"use client";

import React, { useEffect, useRef } from "react";

interface GrassBlade {
  x: number;
  length: number;
  thickness: number;
  angle: number;
  targetAngle: number;
  swayOffset: number;
  baseColor: string;
  tipColor: string;
  speed: number;
}

const GREEN_PALETTES = [
  { base: "#14532d", tip: "#4ade80" }, // dark green to light green
  { base: "#166534", tip: "#22c55e" }, // green-800 to green-500
  { base: "#064e3b", tip: "#10b981" }, // dark emerald to emerald-500
  { base: "#0f5132", tip: "#198754" }, // forest to grass green
  { base: "#14532d", tip: "#86efac" }, // dark green to pale green
];

export const GrassCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bladesRef = useRef<GrassBlade[]>([]);
  const mouseRef = useRef({ x: 0, active: false });
  const clickRef = useRef({ x: 0, progress: 0, active: false });
  const clickEnergyRef = useRef(0);

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

    // Initialize grass blades
    const initBlades = (width: number, height: number) => {
      const blades: GrassBlade[] = [];
      const density = 4; // spacing in pixels between blades
      const numBlades = Math.floor(width / density);

      for (let i = 0; i <= numBlades; i++) {
        const x = i * density + (Math.random() - 0.5) * 2;
        // height should be around 35-55% of container height (taller grass)
        const length = height * (0.35 + Math.random() * 0.20);
        const thickness = 1.5 + Math.random() * 1.5;
        const palette = GREEN_PALETTES[Math.floor(Math.random() * GREEN_PALETTES.length)];

        blades.push({
          x,
          length,
          thickness,
          angle: 0,
          targetAngle: 0,
          swayOffset: Math.random() * Math.PI * 2,
          baseColor: palette.base,
          tipColor: palette.tip,
          speed: 0.04 + Math.random() * 0.03, // Slower speed = smoother, more organic momentum transition
        });
      }
      bladesRef.current = blades;
    };

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

      initBlades(rect.width, rect.height);
    };

    // Run initial resize
    resizeCanvas();

    // Resize observer to handle dynamic size changes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(parent);

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.active = true;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (!isDesktop) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      
      // Trigger click ripple wave
      clickRef.current = {
        x: clickX,
        progress: 0,
        active: true,
      };

      // Boost overall wind/sway energy
      clickEnergyRef.current = 1.5;
    };

    // Attach events to the parent element (the button)
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("click", handleClick);

    // Animation Loop
    let time = 0;
    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      time += 1;
      
      // Decaying click energy
      if (clickEnergyRef.current > 0.01) {
        clickEnergyRef.current *= 0.94; // dampening factor
      } else {
        clickEnergyRef.current = 0;
      }

      // Update click ripple wave
      if (clickRef.current.active) {
        clickRef.current.progress += 8; // speed of the ripple wave
        if (clickRef.current.progress > width * 1.5) {
          clickRef.current.active = false;
        }
      }

      const blades = bladesRef.current;
      const mouse = mouseRef.current;
      const click = clickRef.current;
      const clickEnergy = clickEnergyRef.current;

      // Base wind sway (increased amplitude for more movement)
      const baseWindSpeed = 0.015 + clickEnergy * 0.08;
      const baseWindAngle = Math.sin(time * baseWindSpeed) * (0.12 + clickEnergy * 0.15);

      for (let i = 0; i < blades.length; i++) {
        const blade = blades[i];

        // 1. Natural sway (increased amplitude and slowed speed factor for smoothness)
        let targetAngle = baseWindAngle + Math.sin(time * 0.03 + blade.swayOffset) * 0.08;

        // 2. Click ripple wave bend
        if (click.active) {
          const distToClick = Math.abs(blade.x - click.x);
          const waveHalfWidth = 40; // width of the ripple wave front
          
          if (Math.abs(distToClick - click.progress) < waveHalfWidth) {
            const direction = blade.x > click.x ? 1 : -1;
            const waveStrength = 1 - Math.abs(distToClick - click.progress) / waveHalfWidth;
            // Strong outward push from click
            targetAngle += direction * waveStrength * 1.2;
          }
        }

        // 3. Desktop Hover cursor parting ("blades: part(x)")
        if (isDesktop && mouse.active) {
          const dx = mouse.x - blade.x;
          const hoverRadius = 45;

          if (Math.abs(dx) < hoverRadius) {
            const force = (hoverRadius - Math.abs(dx)) / hoverRadius;
            // Part away: push left if cursor is right, push right if cursor is left
            const direction = dx > 0 ? -1 : 1;
            // Curve the force: square it for smoother falloff
            targetAngle += direction * force * force * 0.8;
          }
        }

        // Apply interpolation (smooth transition to target angle)
        blade.angle += (targetAngle - blade.angle) * blade.speed;

        // Drawing the blade
        const tipX = blade.x + Math.sin(blade.angle) * blade.length;
        const tipY = height - Math.cos(blade.angle) * blade.length;
        
        // Control point for quadratic curve
        const cpX = blade.x + Math.sin(blade.angle * 0.75) * blade.length * 0.5;
        const cpY = height - Math.cos(blade.angle * 0.75) * blade.length * 0.5;

        // Draw blade
        ctx.beginPath();
        ctx.moveTo(blade.x - blade.thickness / 2, height);
        ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
        ctx.quadraticCurveTo(cpX + blade.thickness / 3, cpY, blade.x + blade.thickness / 2, height);
        ctx.closePath();

        // Create gradient
        const gradient = ctx.createLinearGradient(blade.x, height, tipX, tipY);
        gradient.addColorStop(0, blade.baseColor);
        gradient.addColorStop(1, blade.tipColor);

        ctx.fillStyle = gradient;
        ctx.fill();
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

export default GrassCanvas;
