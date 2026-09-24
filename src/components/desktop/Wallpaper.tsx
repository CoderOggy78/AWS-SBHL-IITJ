"use client";

import React, { useEffect, useRef } from "react";

export type DarkWallpaperTheme = "midnight" | "obsidian" | "aurora";

interface WallpaperProps {
  theme?: DarkWallpaperTheme;
}

export const Wallpaper: React.FC<WallpaperProps> = ({ theme = "midnight" }) => {
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

    // Drifting Puffy Clouds in night atmosphere
    const cloudCount = 6;
    const clouds = Array.from({ length: cloudCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.4) + 20,
      vx: Math.random() * 0.12 + 0.04,
      scale: Math.random() * 0.7 + 0.8,
    }));

    // Twinkling Starlight Particles
    const starCount = 50;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.52),
      r: Math.random() * 1.3 + 0.4,
      baseAlpha: Math.random() * 0.6 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Cosmos / Night Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.75);
      if (theme === "obsidian") {
        skyGrad.addColorStop(0, "#010409");
        skyGrad.addColorStop(0.4, "#060c18");
        skyGrad.addColorStop(0.8, "#0d1527");
        skyGrad.addColorStop(1, "#111c33");
      } else if (theme === "aurora") {
        skyGrad.addColorStop(0, "#070314");
        skyGrad.addColorStop(0.35, "#100826");
        skyGrad.addColorStop(0.7, "#1c0d3a");
        skyGrad.addColorStop(1, "#0e2a3b");
      } else {
        // Midnight Bliss (Default Dark Theme)
        skyGrad.addColorStop(0, "#030712");
        skyGrad.addColorStop(0.4, "#071530");
        skyGrad.addColorStop(0.8, "#0d244f");
        skyGrad.addColorStop(1, "#132f5f");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars
      stars.forEach((star) => {
        const alpha = star.baseAlpha + Math.sin(frame * star.speed + star.phase) * 0.25;
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0.1, Math.min(0.9, alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Ambient Starlight / Lunar Glow in Upper Right
      const glowGrad = ctx.createRadialGradient(
        width * 0.82,
        height * 0.18,
        0,
        width * 0.82,
        height * 0.18,
        width * 0.45
      );
      if (theme === "aurora") {
        glowGrad.addColorStop(0, "rgba(45, 212, 191, 0.22)");
        glowGrad.addColorStop(0.5, "rgba(147, 51, 234, 0.12)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (theme === "obsidian") {
        glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.16)");
        glowGrad.addColorStop(0.5, "rgba(30, 58, 138, 0.08)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        glowGrad.addColorStop(0, "rgba(186, 230, 253, 0.18)");
        glowGrad.addColorStop(0.5, "rgba(30, 64, 175, 0.1)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Floating Night Clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.vx;
        if (cloud.x - 250 > width) {
          cloud.x = -250;
          cloud.y = Math.random() * (height * 0.4) + 20;
        }

        ctx.save();
        ctx.translate(cloud.x, cloud.y);
        ctx.scale(cloud.scale, cloud.scale);

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
          if (theme === "aurora") {
            puffGrad.addColorStop(0, `rgba(167, 243, 208, ${p.a * 0.16})`);
            puffGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          } else if (theme === "obsidian") {
            puffGrad.addColorStop(0, `rgba(186, 230, 253, ${p.a * 0.12})`);
            puffGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          } else {
            puffGrad.addColorStop(0, `rgba(191, 219, 254, ${p.a * 0.15})`);
            puffGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          }
          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      // 5. Windows XP Bliss Rolling Hills in Deep Dark Mode (Layered Terrain)

      // Background Hill (Soft muted night depth)
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
      if (theme === "obsidian") {
        hillBgGrad.addColorStop(0, "#040e14");
        hillBgGrad.addColorStop(1, "#02070a");
      } else if (theme === "aurora") {
        hillBgGrad.addColorStop(0, "#091624");
        hillBgGrad.addColorStop(1, "#050d17");
      } else {
        // Midnight Bliss
        hillBgGrad.addColorStop(0, "#071a17");
        hillBgGrad.addColorStop(1, "#030d0c");
      }
      ctx.fillStyle = hillBgGrad;
      ctx.fill();

      // Midground Main Rolling Hill (The signature Bliss hill contour)
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
      if (theme === "obsidian") {
        hillMidGrad.addColorStop(0, "#06222e");
        hillMidGrad.addColorStop(0.4, "#03141c");
        hillMidGrad.addColorStop(1, "#02090e");
      } else if (theme === "aurora") {
        hillMidGrad.addColorStop(0, "#0d2b38");
        hillMidGrad.addColorStop(0.4, "#081d26");
        hillMidGrad.addColorStop(1, "#040e14");
      } else {
        // Midnight Bliss
        hillMidGrad.addColorStop(0, "#0d2b27");
        hillMidGrad.addColorStop(0.4, "#081e1b");
        hillMidGrad.addColorStop(1, "#030e0c");
      }
      ctx.fillStyle = hillMidGrad;
      ctx.fill();

      // Foreground Right Hill Crest (Classic 3D depth)
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
      if (theme === "obsidian") {
        hillFgGrad.addColorStop(0, "#082d3d");
        hillFgGrad.addColorStop(1, "#03131a");
      } else if (theme === "aurora") {
        hillFgGrad.addColorStop(0, "#103947");
        hillFgGrad.addColorStop(1, "#05161f");
      } else {
        // Midnight Bliss
        hillFgGrad.addColorStop(0, "#103830");
        hillFgGrad.addColorStop(1, "#051612");
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
      {/* Dynamic Bliss Night Terrain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
};
