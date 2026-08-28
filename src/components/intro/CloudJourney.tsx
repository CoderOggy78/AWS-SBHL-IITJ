"use client";

import React, { useEffect, useState, useRef } from "react";
import { BuilderChip } from "@/components/ui/Logo";
import { Server, Database, Cpu, Network, Bot, Shield, Globe, Terminal } from "lucide-react";

interface CloudJourneyProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: "Initializing Builder Environment...", delay: 600, status: "OK" },
  { text: "Loading Cloud Infrastructure...", delay: 1300, status: "OK" },
  { text: "Connecting Builders & IIT Jodhpur Node...", delay: 2100, status: "OK" },
  { text: "Mounting Builder Lab Projects...", delay: 2900, status: "OK" },
  { text: "Synchronizing Community Channels...", delay: 3600, status: "OK" },
  { text: "AWS Builder OS Ready.", delay: 4400, status: "SUCCESS" },
];

const CLOUD_NODES = [
  { icon: Network, label: "Amazon API Gateway", x: 25, y: 35, z: 1 },
  { icon: Cpu, label: "AWS Lambda / Compute", x: 70, y: 30, z: 1.6 },
  { icon: Bot, label: "Amazon Bedrock AI Node", x: 30, y: 65, z: 2.2 },
  { icon: Database, label: "Amazon DynamoDB Cluster", x: 75, y: 70, z: 2.8 },
  { icon: Server, label: "AWS Fargate Containers", x: 50, y: 25, z: 3.4 },
  { icon: Shield, label: "AWS IAM Security Boundary", x: 20, y: 50, z: 4.0 },
  { icon: Globe, label: "Amazon CloudFront Edge", x: 80, y: 55, z: 4.6 },
];

export const CloudJourney: React.FC<CloudJourneyProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<Array<{ text: string; status: string }>>([]);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Skip keyboard shortcut (Space or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Escape") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  // Boot sequence timer progression
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 5200;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressInterval);
        setTimeout(onComplete, 500);
      }
    }, 40);

    BOOT_MESSAGES.forEach((item, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { text: item.text, status: item.status }]);
        setCurrentStep(index + 1);
      }, item.delay);
    });

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // 3D forward-travel starfield / cloud node tunnel
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

    const count = 180;
    const stars: Array<{ x: number; y: number; z: number; color: string; size: number }> = [];
    const colors = ["#38bdf8", "#a855f7", "#60a5fa", "#ffffff", "#818cf8"];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      // Gentle trail
      ctx.fillStyle = "rgba(7, 11, 20, 0.35)";
      ctx.fillRect(0, 0, width, height);

      const fov = 350;
      const cx = width / 2;
      const cy = height / 2;

      for (const s of stars) {
        // Move stars forward toward viewer
        s.z -= 7.5;
        if (s.z <= 0) {
          s.z = 1000;
          s.x = (Math.random() - 0.5) * width * 2;
          s.y = (Math.random() - 0.5) * height * 2;
        }

        const k = fov / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1000 - s.z) / 400);
          const radius = Math.max(0.5, (1 - s.z / 1000) * 3);

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#070b14] overflow-hidden flex flex-col items-center justify-between p-6 select-none font-sans text-slate-200">
      {/* 3D Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80a_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Floating 3D Cloud Infrastructure Nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {CLOUD_NODES.map((node, i) => {
          const NodeIcon = node.icon;
          const isVisible = currentStep >= 1;
          return (
            <div
              key={i}
              className={`absolute transition-all duration-1000 flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-sky-500/25 bg-slate-950/70 backdrop-blur-md text-xs font-mono shadow-[0_0_15px_rgba(56,189,248,0.15)] ${
                isVisible ? "opacity-90 scale-100" : "opacity-0 scale-75"
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) scale(${1 + (progress / 100) * 0.25})`,
                transitionDelay: `${i * 180}ms`,
              }}
            >
              <span className="p-1 rounded bg-sky-500/10 text-sky-400">
                <NodeIcon className="w-3.5 h-3.5 animate-pulse" />
              </span>
              <span className="text-sky-200 tracking-wide">{node.label}</span>
            </div>
          );
        })}
      </div>

      {/* Top Header & Skip Button */}
      <div className="relative z-20 w-full flex items-center justify-between max-w-4xl">
        <div className="flex items-center gap-2.5">
          <BuilderChip size={28} variant="blue" glow={true} />
          <div>
            <p className="text-xs font-mono font-medium tracking-wider text-slate-300">
              AWS BUILDER OS // BOOTLOADER
            </p>
            <p className="text-[10px] font-mono text-slate-500">
              IIT JODHPUR CLOUD REGION [ap-south-iitj]
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:border-sky-500/60 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-lg"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-sans">
            [Esc]
          </span>
        </button>
      </div>

      {/* Center Cinematic Revelation */}
      <div className="relative z-20 flex flex-col items-center text-center my-auto max-w-xl">
        <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-sky-400 mb-2 animate-pulse">
          Travelling Through Cloud Infrastructure
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
          WELCOME TO THE BUILDER CLOUD
        </h2>
        <p className="text-sm font-mono text-purple-300 tracking-widest uppercase">
          Connecting to Indian Institute of Technology Jodhpur...
        </p>

        {/* System Terminal Console */}
        <div className="w-full mt-6 p-4 rounded-xl border border-slate-800 bg-slate-950/85 backdrop-blur-xl shadow-2xl text-left font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>system-init.sh</span>
            </div>
            <span>{progress}%</span>
          </div>

          <div className="space-y-1.5 min-h-[120px]">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300 animate-fadeIn">
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    log.status === "SUCCESS"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                  }`}
                >
                  [{log.status}]
                </span>
                <span className="text-slate-200">{log.text}</span>
              </div>
            ))}
            {currentStep < BOOT_MESSAGES.length && (
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="inline-block w-1.5 h-3.5 bg-sky-400 animate-pulse" />
                <span className="text-[11px]">Negotiating peer connections...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-20 w-full max-w-xl flex flex-col gap-2">
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 transition-all duration-150 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>AWS BUILDER OS // FAST-BOOT</span>
          <span>ESTABLISHING DESKTOP SHELL</span>
        </div>
      </div>
    </div>
  );
};
