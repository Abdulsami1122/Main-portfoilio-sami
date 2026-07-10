"use client";

import React, { useEffect, useRef } from "react";

export const HeatCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const posRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const clickRef = useRef({ x: 0, y: 0, radius: 0, active: false });

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
      
      // Initialize position to center
      if (posRef.current.x === 0 && posRef.current.y === 0) {
        posRef.current.x = rect.width / 2;
        posRef.current.y = rect.height / 2;
      }
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
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
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

      // Trigger click thermal wave
      clickRef.current = {
        x: clickX,
        y: clickY,
        radius: 0,
        active: true,
      };
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

      // Clean background (very dark warm charcoal)
      ctx.fillStyle = "#0c0908";
      ctx.fillRect(0, 0, width, height);

      time += 1;

      // Update click ripple wave
      const click = clickRef.current;
      if (click.active) {
        click.radius += 5; // speed of expansion
        if (click.radius > width * 1.5) {
          click.active = false;
        }
      }

      const mouse = mouseRef.current;
      const pos = posRef.current;

      // Define target coordinates
      let targetX = 0;
      let targetY = 0;

      if (isDesktop && mouse.active) {
        targetX = mouse.x;
        targetY = mouse.y;
      } else {
        // Idle floating path (lissajous curve near center)
        targetX = width / 2 + Math.sin(time * 0.02) * (width * 0.25);
        targetY = height / 2 + Math.cos(time * 0.035) * (height * 0.18);
      }

      // Spring physics (inertia and smooth drag)
      const dx = targetX - pos.x;
      const dy = targetY - pos.y;

      const springK = 0.08; // stiffness
      const friction = 0.85; // damping

      pos.vx = (pos.vx + dx * springK) * friction;
      pos.vy = (pos.vy + dy * springK) * friction;

      pos.x += pos.vx;
      pos.y += pos.vy;

      // Draw the main thermal heat spot
      const radius = 55;
      const thermalGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
      
      thermalGrad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");      // white core (hottest)
      thermalGrad.addColorStop(0.2, "rgba(255, 215, 0, 0.95)");     // yellow (very hot)
      thermalGrad.addColorStop(0.5, "rgba(255, 80, 0, 0.75)");       // orange (hot)
      thermalGrad.addColorStop(0.75, "rgba(180, 0, 0, 0.4)");        // deep red (warm)
      thermalGrad.addColorStop(1.0, "rgba(15, 5, 0, 0.0)");          // fade to black

      ctx.fillStyle = thermalGrad;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Render secondary thermal noise spots (gentle glowing vapors) for realism
      const noiseRadius = 25;
      const noiseX = pos.x + Math.sin(time * 0.05) * 12;
      const noiseY = pos.y + Math.cos(time * 0.04) * 8;
      const noiseGrad = ctx.createRadialGradient(noiseX, noiseY, 0, noiseX, noiseY, noiseRadius);
      noiseGrad.addColorStop(0.0, "rgba(255, 69, 0, 0.35)"); // orange glow
      noiseGrad.addColorStop(0.7, "rgba(139, 0, 0, 0.1)");   // dark red glow
      noiseGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
      ctx.fillStyle = noiseGrad;
      ctx.beginPath();
      ctx.arc(noiseX, noiseY, noiseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw click wave (expanding thermal signature blast)
      if (click.active) {
        ctx.beginPath();
        const waveRadius = click.radius;
        const clickGrad = ctx.createRadialGradient(
          click.x,
          click.y,
          Math.max(0, waveRadius - 40),
          click.x,
          click.y,
          waveRadius
        );

        clickGrad.addColorStop(0.0, "rgba(255, 80, 0, 0.0)");
        clickGrad.addColorStop(0.5, "rgba(255, 100, 0, 0.25)");
        clickGrad.addColorStop(0.85, "rgba(255, 215, 0, 0.6)");  // yellow hot front
        clickGrad.addColorStop(0.95, "rgba(255, 255, 255, 0.8)"); // white hot shockwave edge
        clickGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

        ctx.fillStyle = clickGrad;
        ctx.arc(click.x, click.y, waveRadius, 0, Math.PI * 2);
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

export default HeatCanvas;
