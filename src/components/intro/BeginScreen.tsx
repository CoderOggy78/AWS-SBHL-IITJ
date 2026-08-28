"use client";

import React, { useEffect, useRef, useState } from "react";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import { cloudAudio } from "@/components/ui/AudioSynthesizer";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

interface BeginScreenProps {
  onBegin: () => void;
  onSkip?: () => void;
}

export const BeginScreen: React.FC<BeginScreenProps> = ({ onBegin, onSkip }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioActive, setAudioActive] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Cloud Definition
    const particleCount = Math.min(85, Math.floor((width * height) / 18000));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(56, 189, 248,", // AWS blue
      "rgba(168, 85, 247,", // Builder purple
      "rgba(147, 197, 253,", // soft cyan
      "rgba(255, 255, 255,", // star white
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient cloud fog gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        width * 0.6
      );
      grad1.addColorStop(0, "rgba(24, 34, 58, 0.45)");
      grad1.addColorStop(0.5, "rgba(15, 23, 42, 0.2)");
      grad1.addColorStop(1, "rgba(8, 13, 26, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Connect near particles with faint network web
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse repulsion / perturbation
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouseRef.current.radius) {
          const force = (1 - mdist / mouseRef.current.radius) * 1.5;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;
          p.alpha = Math.min(1, p.baseAlpha + 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleSound = () => {
    const active = cloudAudio.toggle();
    setAudioActive(active);
  };

  return (
    <div
      onClick={onBegin}
      className="relative w-screen h-screen bg-[#070e1c] overflow-hidden flex flex-col items-center justify-center select-none font-sans text-slate-100 cursor-pointer"
    >      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
      />

      {/* Atmospheric Sky Blue Ambient Halo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-b from-sky-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf815_1px,transparent_1px),linear-gradient(to_bottom,#38bdf815_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Corner Sound Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleSound}
          aria-label={audioActive ? "Mute ambient audio" : "Enable ambient cloud sound"}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-md hover:border-sky-500/50 text-slate-400 hover:text-slate-200 transition-all text-xs"
        >
          {audioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-sky-300">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
              <span className="text-[11px] font-mono tracking-wider">SOUND: MUTED</span>
            </>
          )}
        </button>
      </div>

      {/* Top Left Institution Badge */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <div className="px-2.5 py-1 rounded-md border border-slate-800 bg-slate-950/70 backdrop-blur-md flex items-center gap-2">
          <AwsLogo size={14} color="#94a3b8" />
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            IIT Jodhpur Node
          </span>
        </div>
      </div>

      {/* Center Cinematic Hero */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl">
        {/* Glow Ring Behind Logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-sky-500/20 to-purple-600/20 rounded-2xl blur-xl animate-pulse" />
          <div className="relative p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:scale-105">
            <BuilderChip size={76} variant="purple" glow={true} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            Builder Operating System
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            AWS Student Builder Group
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-light tracking-wide">
            Indian Institute of Technology Jodhpur
          </p>
        </div>

        {/* Clean Call To Action Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={onBegin}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl text-sm font-semibold tracking-widest text-white uppercase bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 hover:from-sky-500 hover:via-blue-500 hover:to-purple-500 shadow-[0_0_28px_rgba(56,189,248,0.4)] hover:shadow-[0_0_42px_rgba(168,85,247,0.6)] border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Builder OS</span>
            <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[11px] font-mono text-slate-500 tracking-wider">Click anywhere to enter the desktop</p>
        </div>

        {/* Footer Subtext */}
        <div className="mt-12 flex items-center gap-2 text-[11px] font-mono text-slate-600 tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block animate-pulse" />
          <span>STATUS: READY FOR BOOT SEQUENCE</span>
        </div>
      </div>
    </div>
  );
};
