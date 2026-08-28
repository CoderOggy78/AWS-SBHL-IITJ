"use client";

import React, { useState } from "react";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import { cloudAudio } from "@/components/ui/AudioSynthesizer";
import { Volume2, VolumeX, ArrowRight, Power, KeyRound } from "lucide-react";
import { WindowsXpLogo } from "@/components/ui/BrandIcons";

interface BeginScreenProps {
  onBegin: () => void;
  onSkip?: () => void;
}

export const BeginScreen: React.FC<BeginScreenProps> = ({ onBegin, onSkip }) => {
  const [audioActive, setAudioActive] = useState(false);

  const toggleSound = () => {
    const active = cloudAudio.toggle();
    setAudioActive(active);
  };

  return (
    <div
      onClick={onBegin}
      className="relative w-screen h-screen bg-gradient-to-r from-[#001740] via-[#003399] to-[#001740] overflow-hidden flex flex-col justify-between p-6 select-none font-sans text-white cursor-pointer"
    >
      {/* Top Banner with XP Flag & Title */}
      <div className="w-full flex items-center justify-between border-b-2 border-white/20 pb-4 z-10">
        <div className="flex items-center gap-3">
          <WindowsXpLogo size={32} />
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-sans drop-shadow-md">
                Microsoft<span className="text-sky-300 font-extrabold ml-1">Windows</span>
              </span>
              <span className="text-base font-extrabold text-orange-500 italic drop-shadow-md">
                xp
              </span>
            </div>
            <p className="text-[11px] font-mono text-sky-200 uppercase tracking-wider">
              AWS Student Builder Group — IIT Jodhpur Edition
            </p>
          </div>
        </div>

        {/* Audio Synth Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          aria-label={audioActive ? "Mute audio" : "Enable audio"}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-950/60 border border-blue-400/40 hover:bg-blue-900 text-sky-200 hover:text-white transition-all text-xs"
        >
          {audioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span className="text-[11px] font-mono text-yellow-200">AUDIO: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-mono">AUDIO: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Center 2-Panel Classic Windows XP Welcome Split */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 my-auto">
        {/* Left Instruction Panel */}
        <div className="text-center md:text-right md:border-r-2 border-orange-500/40 md:pr-10 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            To begin, click your user name
          </h1>
          <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed font-sans">
            Welcome to the AWS Student Builder Group interactive cloud operating environment at IIT Jodhpur.
          </p>
        </div>

        {/* Right User Tile Panel */}
        <div className="flex flex-col items-center md:items-start md:pl-6 space-y-3">
          <div
            onClick={onBegin}
            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-blue-900/60 active:bg-blue-950 border border-transparent hover:border-blue-400/50 transition-all cursor-pointer shadow-lg"
          >
            {/* User Avatar with Orange Border */}
            <div className="w-18 h-18 rounded-[6px] bg-slate-950 border-2 border-orange-400 shadow-md flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <BuilderChip size={46} variant="blue" glow={true} />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white tracking-tight drop-shadow-sm group-hover:text-yellow-300 transition-colors">
                AWS Student Builder
              </h2>
              <p className="text-xs text-sky-200">
                Indian Institute of Technology Jodhpur
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready to log on</span>
              </div>
            </div>

            {/* Green Arrow Action Button */}
            <div className="w-8 h-8 rounded bg-gradient-to-b from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-md ml-2 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer with Turn Off & Telemetry */}
      <div className="w-full flex items-center justify-between border-t-2 border-white/20 pt-4 z-10 text-xs">
        <button
          onClick={onBegin}
          className="flex items-center gap-2 text-sky-200 hover:text-white transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white shadow-sm">
            <Power className="w-3 h-3" />
          </div>
          <span>Turn off AWS SBG Node</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-sky-300 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>REGION: ap-south-1 • 50 PROJECTS LOADED</span>
        </div>
      </div>
    </div>
  );
};
