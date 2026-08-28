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

    // Drifting Puffy Clouds
    const cloudCount = 6;
    const clouds = Array.from({ length: cloudCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.4) + 20,
      vx: (Math.random() * 0.15 + 0.05),
      scale: Math.random() * 0.7 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.75);
      if (theme === "midnight") {
        skyGrad.addColorStop(0, "#050b18");
        skyGrad.addColorStop(0.5, "#0b1938");
        skyGrad.addColorStop(1, "#122a5a");
      } else if (theme === "azure") {
        skyGrad.addColorStop(0, "#0047ba");
        skyGrad.addColorStop(0.4, "#006ee6");
        skyGrad.addColorStop(0.8, "#3aa6ff");
        skyGrad.addColorStop(1, "#99d6ff");
      } else {
        // Classic Windows XP Bliss Sky (Rich Radiant Azure)
        skyGrad.addColorStop(0, "#084999");
        skyGrad.addColorStop(0.25, "#1565c0");
        skyGrad.addColorStop(0.55, "#2196f3");
        skyGrad.addColorStop(0.85, "#64b5f6");
        skyGrad.addColorStop(1, "#bbdefb");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Sun Ambient Highlight in Upper Right
      if (theme !== "midnight") {
        const sunGrad = ctx.createRadialGradient(
          width * 0.82,
          height * 0.18,
          0,
          width * 0.82,
          height * 0.18,
          width * 0.4
        );
        sunGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        sunGrad.addColorStop(0.4, "rgba(255, 255, 240, 0.2)");
        sunGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Floating Puffy Cumulus Clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.vx;
        if (cloud.x - 250 > width) {
          cloud.x = -250;
          cloud.y = Math.random() * (height * 0.4) + 20;
        }

        ctx.save();
        ctx.translate(cloud.x, cloud.y);
        ctx.scale(cloud.scale, cloud.scale);

        // Multiple overlapping soft circles to build a cumulus puff
        const puffs = [
          { cx: 0, cy: 0, r: 40, a: 0.75 },
          { cx: 35, cy: -10, r: 48, a: 0.85 },
          { cx: 75, cy: -8, r: 42, a: 0.8 },
          { cx: 105, cy: 5, r: 35, a: 0.7 },
          { cx: 45, cy: 12, r: 38, a: 0.65 },
          { cx: -25, cy: 10, r: 30, a: 0.6 },
        ];

        puffs.forEach((p) => {
          const puffGrad = ctx.createRadialGradient(
            p.cx - 5,
            p.cy - 8,
            0,
            p.cx,
            p.cy,
            p.r
          );
          if (theme === "midnight") {
            puffGrad.addColorStop(0, `rgba(180, 210, 255, ${p.a * 0.15})`);
            puffGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          } else {
            puffGrad.addColorStop(0, `rgba(255, 255, 255, ${p.a * 0.95})`);
            puffGrad.addColorStop(0.6, `rgba(240, 248, 255, ${p.a * 0.75})`);
            puffGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
          }
          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      // 3. Iconic Windows XP Bliss Rolling Green Hills (Layered Terrain)

      // Background Hill (Soft muted depth)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.58);
      ctx.bezierCurveTo(
        width * 0.25, height * 0.52,
        width * 0.55, height * 0.62,
        width, height * 0.55
      );
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const hillBgGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
      if (theme === "midnight") {
        hillBgGrad.addColorStop(0, "#081b1e");
        hillBgGrad.addColorStop(1, "#040e10");
      } else if (theme === "azure") {
        hillBgGrad.addColorStop(0, "#026aa2");
        hillBgGrad.addColorStop(1, "#034870");
      } else {
        // Distant soft green ridge
        hillBgGrad.addColorStop(0, "#568e22");
        hillBgGrad.addColorStop(0.5, "#487a1c");
        hillBgGrad.addColorStop(1, "#386214");
      }
      ctx.fillStyle = hillBgGrad;
      ctx.fill();

      // Midground Main Rolling Hill (The signature steep Bliss hill)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.68);
      ctx.bezierCurveTo(
        width * 0.28, height * 0.48,
        width * 0.68, height * 0.56,
        width, height * 0.72
      );
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const hillMidGrad = ctx.createLinearGradient(
        width * 0.28, height * 0.48,
        width * 0.6, height
      );
      if (theme === "midnight") {
        hillMidGrad.addColorStop(0, "#0d2b27");
        hillMidGrad.addColorStop(0.4, "#091e1c");
        hillMidGrad.addColorStop(1, "#040d0c");
      } else if (theme === "azure") {
        hillMidGrad.addColorStop(0, "#0284c7");
        hillMidGrad.addColorStop(0.5, "#0369a1");
        hillMidGrad.addColorStop(1, "#075985");
      } else {
        // Lush Vibrant Windows XP Grass
        hillMidGrad.addColorStop(0, "#8ecf38"); // Sunlit bright grass peak
        hillMidGrad.addColorStop(0.2, "#74b827");
        hillMidGrad.addColorStop(0.55, "#529117");
        hillMidGrad.addColorStop(0.85, "#3d730e");
        hillMidGrad.addColorStop(1, "#2b5608");
      }
      ctx.fillStyle = hillMidGrad;
      ctx.fill();

      // Foreground Right Hill Crest (Adds classic Bliss 3D contour)
      ctx.beginPath();
      ctx.moveTo(width * 0.38, height);
      ctx.bezierCurveTo(
        width * 0.55, height * 0.65,
        width * 0.85, height * 0.59,
        width, height * 0.64
      );
      ctx.lineTo(width, height);
      ctx.closePath();

      const hillFgGrad = ctx.createLinearGradient(
        width * 0.75, height * 0.59,
        width * 0.85, height
      );
      if (theme === "midnight") {
        hillFgGrad.addColorStop(0, "#103830");
        hillFgGrad.addColorStop(1, "#061512");
      } else if (theme === "azure") {
        hillFgGrad.addColorStop(0, "#38bdf8");
        hillFgGrad.addColorStop(1, "#0284c7");
      } else {
        hillFgGrad.addColorStop(0, "#9de03f"); // Warm sunny highlight
        hillFgGrad.addColorStop(0.3, "#7cbd25");
        hillFgGrad.addColorStop(0.7, "#589816");
        hillFgGrad.addColorStop(1, "#366b0a");
      }
      ctx.fillStyle = hillFgGrad;
      ctx.fill();

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
      {/* Dynamic Bliss Terrain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
};
