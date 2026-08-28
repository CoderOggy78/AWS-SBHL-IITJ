"use client";

import React, { useEffect, useRef } from "react";

interface WallpaperProps {
  theme?: "sky" | "azure" | "midnight";
}

export const Wallpaper: React.FC<WallpaperProps> = ({ theme = "sky" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Drifting realistic volumetric clouds
    const clouds = Array.from({ length: 9 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.75,
      vx: (Math.random() * 0.16 + 0.05) * (Math.random() > 0.4 ? 1 : -1),
      radius: Math.random() * 280 + 160,
      opacity: Math.random() * 0.28 + 0.22,
      isSunGlow: Math.random() > 0.6,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light Sky Blue Atmospheric Gradient (Best One: Crisp daylight sky with horizon glow)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (theme === "midnight") {
        bgGrad.addColorStop(0, "#080c16");
        bgGrad.addColorStop(0.5, "#0b1222");
        bgGrad.addColorStop(1, "#070a12");
      } else if (theme === "azure") {
        bgGrad.addColorStop(0, "#0284c7");
        bgGrad.addColorStop(0.4, "#0ea5e9");
        bgGrad.addColorStop(0.8, "#7dd3fc");
        bgGrad.addColorStop(1, "#bae6fd");
      } else {
        // Default: Light Theme Sky Blue (Crisp, modern, airy, ethereal)
        bgGrad.addColorStop(0, "#0284c7"); // Deep Azure peak
        bgGrad.addColorStop(0.28, "#0ea5e9"); // Sky Blue 500
        bgGrad.addColorStop(0.62, "#38bdf8"); // Sky Blue 400
        bgGrad.addColorStop(0.88, "#7dd3fc"); // Sky Blue 300
        bgGrad.addColorStop(1, "#e0f2fe"); // Luminous daylight cloud base
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Sun / Ambient highlight in upper right
      if (theme !== "midnight") {
        const sunGrad = ctx.createRadialGradient(
          width * 0.85,
          height * 0.15,
          0,
          width * 0.85,
          height * 0.15,
          width * 0.5
        );
        sunGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        sunGrad.addColorStop(0.4, "rgba(224, 242, 254, 0.2)");
        sunGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Floating clouds
      for (const c of clouds) {
        c.x += c.vx;
        if (c.x - c.radius > width) c.x = -c.radius;
        if (c.x + c.radius < 0) c.x = width + c.radius;

        const radGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radius);
        if (theme === "midnight") {
          radGrad.addColorStop(0, "rgba(14, 165, 233, 0.04)");
          radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          // Soft bright white and light azure cloud puffs
          const colorCenter = c.isSunGlow
            ? `rgba(255, 255, 255, ${c.opacity * 1.2})`
            : `rgba(240, 249, 255, ${c.opacity})`;
          const colorMid = `rgba(224, 242, 254, ${c.opacity * 0.5})`;
          radGrad.addColorStop(0, colorCenter);
          radGrad.addColorStop(0.6, colorMid);
          radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Dynamic canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Blueprint Grid lines with modular squares */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Subtle diagonal micro-dots */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0369a1_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Center glowing logo watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none scale-150">
        <div className="w-96 h-96 border-4 border-sky-600 rounded-3xl rotate-12 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-2xl -rotate-12" />
        </div>
      </div>
    </div>
  );
};
