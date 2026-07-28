"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export const CursorSnake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const particlesRef = useRef<Particle[]>([]);
  const lastActivityTimeRef = useRef<number>(0);
  const currentAlphaRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  // Settings
  const numSegments = 22;
  const segmentLength = 9; // Spacing between segments
  const maxRadius = 8.5; // Radius of head
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

    const render = (timestamp: number) => {
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

      // If fully hidden and no active particles, skip rendering details
      if (currentAlphaRef.current === 0 && particlesRef.current.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // 1. Update Physics
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
          // Calculate the target position along the vector at segmentLength distance
          const targetX = prev.x + (dx / dist) * segmentLength;
          const targetY = prev.y + (dy / dist) * segmentLength;

          curr.x += (targetX - curr.x) * easeFactor;
          curr.y += (targetY - curr.y) * easeFactor;
        }
      }

      // Calculate movement speed and direction of the head
      const headDx = points[0].x - points[1].x;
      const headDy = points[0].y - points[1].y;
      const headDist = Math.sqrt(headDx * headDx + headDy * headDy);
      const angle = Math.atan2(headDy, headDx);

      // 2. Spawn particles from the tail
      const tail = points[points.length - 1];
      const secondTail = points[points.length - 2];
      const tailDx = tail.x - secondTail.x;
      const tailDy = tail.y - secondTail.y;
      const tailSpeed = Math.sqrt(tailDx * tailDx + tailDy * tailDy);

      // Theme-based setup
      const isDark = resolvedTheme === "dark" || document.documentElement.classList.contains("dark");

      // Color palette for the snake segments (RGB interpolations)
      // Light Mode: Emerald Green to Royal Blue
      // Dark Mode: Emerald Green to Vibrant Cyan to Indigo Glow
      const colors = isDark
        ? [
          { r: 16, g: 185, b: 129 }, // Emerald Green
          { r: 6, g: 182, b: 212 },  // Cyan
          { r: 99, g: 102, b: 241 }  // Indigo
        ]
        : [
          { r: 16, g: 185, b: 129 }, // Emerald Green
          { r: 14, g: 165, b: 233 }, // Sky Blue
          { r: 59, g: 130, b: 246 }  // Royal Blue
        ];

      const getSegmentColor = (index: number, total: number) => {
        const pct = index / (total - 1);
        let r, g, b;
        if (pct < 0.5) {
          const subPct = pct * 2;
          r = colors[0].r + (colors[1].r - colors[0].r) * subPct;
          g = colors[0].g + (colors[1].g - colors[0].g) * subPct;
          b = colors[0].b + (colors[1].b - colors[0].b) * subPct;
        } else {
          const subPct = (pct - 0.5) * 2;
          r = colors[1].r + (colors[2].r - colors[1].r) * subPct;
          g = colors[1].g + (colors[2].g - colors[1].g) * subPct;
          b = colors[1].b + (colors[2].b - colors[1].b) * subPct;
        }
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${1 - pct * 0.4})`;
      };

      // Spawn particles when moving
      if (tailSpeed > 1 && Math.random() < 0.3) {
        particlesRef.current.push({
          x: tail.x,
          y: tail.y,
          vx: (Math.random() - 0.5) * 0.8 - (tailDx / tailSpeed) * 0.5,
          vy: (Math.random() - 0.5) * 0.8 - (tailDy / tailSpeed) * 0.5,
          alpha: 1.0,
          size: Math.random() * 2 + 1,
          color: getSegmentColor(points.length - 1, points.length),
        });
      }

      // Update and Draw Particles
      const particles = particlesRef.current;
      ctx.shadowBlur = 0; // reset shadow for particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.alpha})`);
        ctx.fill();
      }

      // 3. Draw Snake Tongue (draw under the head)
      ctx.save();
      ctx.globalAlpha = currentAlphaRef.current;

      // Periodic flicking using sine wave
      const tongueCycle = Math.sin(timestamp * 0.015);
      if (tongueCycle > 0.4 && headDist > 0.1) {
        const tongueLength = 10 + Math.sin(timestamp * 0.05) * 3;
        const tongueX = points[0].x + Math.cos(angle) * (maxRadius + 1);
        const tongueY = points[0].y + Math.sin(angle) * (maxRadius + 1);

        const tipX = points[0].x + Math.cos(angle) * (maxRadius + tongueLength);
        const tipY = points[0].y + Math.sin(angle) * (maxRadius + tongueLength);

        // Y fork split
        const forkAngle = 0.4; // radians
        const forkLength = 4;
        const leftForkX = tipX + Math.cos(angle + forkAngle) * forkLength;
        const leftForkY = tipY + Math.sin(angle + forkAngle) * forkLength;
        const rightForkX = tipX + Math.cos(angle - forkAngle) * forkLength;
        const rightForkY = tipY + Math.sin(angle - forkAngle) * forkLength;

        ctx.beginPath();
        ctx.moveTo(tongueX, tongueY);
        ctx.lineTo(tipX, tipY);
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(leftForkX, leftForkY);
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(rightForkX, rightForkY);

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(239, 68, 68, 0.9)"; // Red tongue
        ctx.lineCap = "round";
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(239, 68, 68, 0.5)";
        ctx.stroke();
      }

      // 4. Draw Snake Body segments (back to front so head is on top)
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = points.length - 1; i >= 0; i--) {
        const pt = points[i];

        // Taper radius
        const t = i / (points.length - 1);
        const radius = maxRadius * (1 - t * 0.7);

        // Segment glow in dark mode
        if (isDark) {
          ctx.shadowBlur = i === 0 ? 8 : 4;
          ctx.shadowColor = getSegmentColor(i, points.length);
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = getSegmentColor(i, points.length);
        ctx.fill();

        // Subtle dark or lighht outline for 3D depth
        ctx.shadowBlur = 0; // turn off shadow for outline
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)";
        ctx.stroke();
      }

      // 5. Draw Eyes on the Head (points[0])
      // Only draw if we have a direction reference from points[1]
      if (points.length > 1) {
        const head = points[0];

        // Offset eyes perpendicular to direction
        const eyeAngleOffset = Math.PI / 3.2; // roughly 56 degrees to the side

        // Eye center positions
        const leftEyeX = head.x + Math.cos(angle - eyeAngleOffset) * (maxRadius * 0.65);
        const leftEyeY = head.y + Math.sin(angle - eyeAngleOffset) * (maxRadius * 0.65);
        const rightEyeX = head.x + Math.cos(angle + eyeAngleOffset) * (maxRadius * 0.65);
        const rightEyeY = head.y + Math.sin(angle + eyeAngleOffset) * (maxRadius * 0.65);

        // Draw Sclera (White background)
        const eyeRadius = 2.2;
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeRadius, 0, Math.PI * 2);
        ctx.arc(rightEyeX, rightEyeY, eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw pupils looking towards the target (mouse)
        // Vector from head to mouse
        const toMouseX = mouse.x - head.x;
        const toMouseY = mouse.y - head.y;
        const distToMouse = Math.max(1, Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY));

        // Pupil displacement offset
        const dispLimit = 0.6;
        const dispX = (toMouseX / distToMouse) * dispLimit;
        const dispY = (toMouseY / distToMouse) * dispLimit;

        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(leftEyeX + dispX, leftEyeY + dispY, 1.0, 0, Math.PI * 2);
        ctx.arc(rightEyeX + dispX, rightEyeY + dispY, 1.0, 0, Math.PI * 2);
        ctx.fill();
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
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999, display: "block" }}
    />
  );
};

export default CursorSnake;
