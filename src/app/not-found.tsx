"use client";

import React from "react";
import Link from "next/link";
import { BuilderChip } from "@/components/ui/Logo";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-[#070b14] flex flex-col items-center justify-center p-6 text-center select-none font-sans text-slate-100">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80d_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80d_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-lg p-8 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 mx-auto flex items-center justify-center shadow-lg">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            KERNEL PANIC // 404 NOT FOUND
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Unmapped Cloud Route
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            Unable to resolve packet route on IIT Jodhpur cluster [ap-south-iitj]. The requested memory page or cloud node does not exist.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left font-mono text-xs text-slate-400 space-y-1">
          <p className="text-slate-500">panic(cpu 0 caller 0xffffff801a2b):</p>
          <p className="text-rose-300">
            &ldquo;Kernel trap at 0xffffff7f804: route_unreachable&rdquo;
          </p>
          <p className="text-slate-500">
            Backtrace: 0x404 &rarr; 0x000 &rarr; 0xROOT
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow-lg shadow-sky-500/25 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reboot AWS Builder OS</span>
        </Link>
      </div>
    </div>
  );
}
