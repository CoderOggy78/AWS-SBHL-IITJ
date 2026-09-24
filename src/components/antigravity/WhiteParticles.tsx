"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  angle: number;
  shape: "dot" | "dash";
}

export const WhiteParticles: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Multi-color palette from Image 1 (Google & AWS rainbow dispersion)
    const palette = [
      "#3186ff", // Google/AWS Blue
      "#fc413d", // Coral Red
      "#fbbc04", // Gold Yellow
      "#00b95c", // Emerald Green
      "#a855f7", // Purple
      "#ff9900", // AWS Orange
      "#94a3b8", // Slate
    ];

    const particleCount = Math.min(Math.floor((width * height) / 9000), 160);
    const particles: Particle[] = [];

    // Bias particles toward upper right & center as in Reference Image 1
    for (let i = 0; i < particleCount; i++) {
      const isClustered = Math.random() < 0.65;
      const x = isClustered
        ? width * 0.4 + Math.random() * width * 0.6
        : Math.random() * width;
      const y = isClustered
        ? Math.random() * height * 0.8
        : Math.random() * height;

      particles.push({
        x,
        y,
        vx: 0.15 + (Math.random() - 0.4) * 0.4,
        vy: -0.2 - Math.random() * 0.4,
        size: Math.random() * 2.8 + 1.2,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.65 + 0.25,
        angle: Math.random() * Math.PI,
        shape: Math.random() > 0.4 ? "dash" : "dot",
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse avoidance deflection
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
        }

        // Wrap around edges
        if (p.y < -15) {
          p.y = height + 15;
          p.x = width * 0.3 + Math.random() * width * 0.7;
        }
        if (p.x > width + 15) p.x = -15;
        if (p.x < -15) p.x = width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === "dash") {
          ctx.fillRect(-p.size, -p.size * 0.4, p.size * 2, p.size * 0.8);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
