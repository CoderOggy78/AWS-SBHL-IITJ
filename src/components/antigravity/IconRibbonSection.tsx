"use client";

import React from "react";
import {
  LayoutGrid,
  Sparkles,
  CheckCircle2,
  Search,
  Command,
  Folder,
  Star,
  Code2,
  ArrowUp,
  Terminal,
  CornerDownLeft,
  GitFork,
  Box,
  Code,
  FileCode,
} from "lucide-react";

export const IconRibbonSection: React.FC = () => {
  // 16 icons arranged in a gentle curved arc
  const ribbonIcons = [
    { icon: LayoutGrid, y: 16 },
    { icon: Sparkles, y: 8 },
    { icon: CheckCircle2, y: 2 },
    { icon: Search, y: 0 },
    { icon: Command, y: 2 },
    { icon: Folder, y: 8 },
    { icon: Star, y: 16 },
    { icon: Code2, y: 24 },
    { icon: ArrowUp, y: 24 },
    { icon: Terminal, y: 16 },
    { icon: CornerDownLeft, y: 8 },
    { icon: GitFork, y: 2 },
    { icon: Box, y: 0 },
    { icon: Star, y: 2 },
    { icon: Code, y: 8 },
    { icon: FileCode, y: 16 },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#030712] text-center overflow-hidden border-t border-cyan-500/10">
      <div className="max-w-6xl mx-auto">
        {/* Curved Icon Ribbon */}
        <div className="flex items-center justify-center gap-2 sm:gap-3.5 overflow-x-auto pb-8 pt-4 no-scrollbar">
          {ribbonIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{ transform: `translateY(${item.y}px)` }}
                className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/[0.04] hover:bg-cyan-500/15 border border-cyan-500/20 hover:border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-sm transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </div>
            );
          })}
        </div>

        {/* Large Statement with Electric Cyan-Blue Cursor */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto text-left sm:text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-100 leading-[1.2]">
            AWS Student Builder Group IITJ is our premier cloud innovation
            community, allowing anyone to build at IIT Jodhpur.
            <span className="blinking-cursor" aria-hidden="true" />
          </h2>
        </div>
      </div>
    </section>
  );
};
