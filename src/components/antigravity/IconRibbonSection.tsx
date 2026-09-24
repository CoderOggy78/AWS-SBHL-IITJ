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
  Layers,
} from "lucide-react";

export const IconRibbonSection: React.FC = () => {
  // 16 icons matching Reference Image 3 arranged in a gentle curved arc
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
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white text-center overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Curved Icon Ribbon (Exact Reference Image 3 Style) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3.5 overflow-x-auto pb-8 pt-4 no-scrollbar">
          {ribbonIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{ transform: `translateY(${item.y}px)` }}
                className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-800 shrink-0 shadow-sm transition-all hover:scale-110 cursor-pointer"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
              </div>
            );
          })}
        </div>

        {/* Large Clean Antigravity Statement (Exact Reference Image 3 Style) */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto text-left sm:text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.2]">
            AWS Student Builder Group IITJ is our premier cloud innovation
            community, allowing anyone to build at IIT Jodhpur.
            <span className="blinking-cursor" aria-hidden="true" />
          </h2>
        </div>
      </div>
    </section>
  );
};
