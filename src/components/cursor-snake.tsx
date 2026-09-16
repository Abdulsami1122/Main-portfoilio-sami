"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

export const CursorSnake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const lastActivityTimeRef = useRef<number>(0);
  const currentAlphaRef = useRef<number>(0);

  // Settings
  const numSegments = 22;
  const segmentLength = 9; // Spacing between segments
  const easeFactor = 0.35; // Easing speed

  useEffect(() => {
    // Only run on devices that support hover (desktops)
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (!mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize points array
    const initPoints = (startX: number, startY: number) => {
      const pts: Point[] = [];
      for (let i = 0; i < numSegments; i++) {
        pts.push({ x: startX, y: startY });
      }
      pointsRef.current = pts;
    };

    // Handle canvas resizing
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track activity (mousemove and scroll)
    const updateActivity = () => {
      lastActivityTimeRef.current = Date.now();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      updateActivity();

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        initPoints(e.clientX, e.clientY);
      }
    };

    const handleScroll = () => {
      updateActivity();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      if (!hasMovedRef.current || pointsRef.current.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Calculate visibility alpha based on idle time
      const now = Date.now();
      const idleTimeout = 1200; // Time in ms before fading out (1.2s)
      const isActive = now - lastActivityTimeRef.current < idleTimeout;

      const targetAlpha = isActive ? 1.0 : 0.0;
      const alphaEase = isActive ? 0.15 : 0.06; // Quick fade in, smooth fade out
      currentAlphaRef.current += (targetAlpha - currentAlphaRef.current) * alphaEase;

      // Ensure clean zero
      if (currentAlphaRef.current < 0.001) {
        currentAlphaRef.current = 0;
      }

      if (currentAlphaRef.current === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // Update Physics
      // Head follows mouse
      points[0].x += (mouse.x - points[0].x) * easeFactor;
      points[0].y += (mouse.y - points[0].y) * easeFactor;

      // Body segments follow previous segments with length constraint
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > segmentLength) {
          const targetX = prev.x + (dx / dist) * segmentLength;
          const targetY = prev.y + (dy / dist) * segmentLength;

          curr.x += (targetX - curr.x) * easeFactor;
          curr.y += (targetY - curr.y) * easeFactor;
        }
      }

      // Draw a tapering white trail line following the points
      ctx.save();
      ctx.globalAlpha = currentAlphaRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#ffffff";

      for (let i = 0; i < points.length - 1; i++) {
        const t = i / (points.length - 1);
        const width = 3 * (1 - t * 0.85);
        const segmentAlpha = 1 - t * 0.7;

        ctx.beginPath();
        ctx.globalAlpha = currentAlphaRef.current * segmentAlpha;
        ctx.lineWidth = width;
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.stroke();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999, display: "block" }}
    />
  );
};

export default CursorSnake;
