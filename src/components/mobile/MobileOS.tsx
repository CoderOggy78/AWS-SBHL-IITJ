"use client";

import React, { useState } from "react";
import { AppId } from "@/types/os";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import { WindowsLogo } from "@/components/ui/BrandIcons";
import { SOCIAL_LINKS } from "@/config/socials";
import {
  Home,
  Info,
  Users,
  FolderGit2,
  BookOpen,
  Briefcase,
  Terminal,
  Mail,
  Activity,
  Compass,
  Award,
  X,
  ExternalLink,
  Search,
  MessageCircle,
  Radio,
  Sparkles,
} from "lucide-react";

interface MobileOSProps {
  onOpenApp: (id: AppId) => void;
  renderAppContent: (id: AppId) => React.ReactNode;
}

export const MobileOS: React.FC<MobileOSProps> = ({
  onOpenApp,
  renderAppContent,
}) => {
  const [activeSheet, setActiveSheet] = useState<AppId | null>(null);

  const apps: Array<{ id: AppId; name: string; icon: React.ElementType; gradient: string }> = [
    { id: "home", name: "Home", icon: Home, gradient: "from-sky-500 to-blue-600" },
    { id: "about", name: "About", icon: Info, gradient: "from-blue-600 to-indigo-600" },
    { id: "leads", name: "Leads", icon: Users, gradient: "from-purple-500 to-violet-600" },
    { id: "team", name: "Team", icon: Users, gradient: "from-indigo-500 to-purple-600" },
    { id: "projects", name: "Builder Lab", icon: FolderGit2, gradient: "from-cyan-500 to-sky-600" },
    { id: "roadmap", name: "Roadmap", icon: Compass, gradient: "from-emerald-500 to-teal-600" },
    { id: "certifications", name: "Free Certs", icon: Award, gradient: "from-amber-500 to-orange-600" },
    { id: "resources", name: "Library", icon: BookOpen, gradient: "from-blue-600 to-cyan-600" },
    { id: "internships", name: "Internships", icon: Briefcase, gradient: "from-rose-500 to-pink-600" },
    { id: "terminal", name: "PowerShell", icon: Terminal, gradient: "from-slate-800 to-slate-950" },
    { id: "feed", name: "Activity", icon: Activity, gradient: "from-teal-600 to-emerald-700" },
    { id: "contact", name: "Join Us", icon: Mail, gradient: "from-sky-600 to-cyan-600" },
  ];

  return (
    <div className="md:hidden relative w-screen h-screen bg-[#070b14] overflow-hidden flex flex-col font-sans text-slate-200 select-none">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80d_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80d_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Windows 11 Mobile Header */}
      <div className="relative z-20 px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-sky-500/20 text-sky-400">
            <WindowsLogo size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-white tracking-tight leading-none">
              Windows Builder OS
            </p>
            <p className="text-[10px] font-mono text-sky-400">IIT Jodhpur Node</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ap-south-1</span>
        </div>
      </div>

      {/* Main Home Screen: Windows Fluent Tiles Grid */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 relative z-10 no-scrollbar">
        {/* Windows Widget Banner */}
        <div className="p-4 rounded-xl border border-slate-800 bg-[#0c1427]/80 backdrop-blur-xl mb-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-sky-400">
            <span>AWS CLOUD INFRASTRUCTURE</span>
            <span className="text-emerald-400 font-semibold">99.9% HEALTHY</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white">
            AWS Student Builder Group — IIT Jodhpur
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Explore 50 project blueprints, 100 free certifications, team hierarchy, and interactive PowerShell terminal.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={SOCIAL_LINKS.meetup}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-medium"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Meetup</span>
            </a>
          </div>
        </div>

        {/* 4-Column Windows 11 Fluent App Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
          {apps.map((app) => {
            const AppIcon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setActiveSheet(app.id)}
                className="flex flex-col items-center gap-1 group focus:outline-none"
              >
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${app.gradient} shadow-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform`}
                >
                  <AppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 tracking-tight line-clamp-1">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Sheet Modal for Active Application */}
      {activeSheet && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-200">
          {/* Windows 11 Mobile Window Header */}
          <div className="h-12 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <h2 className="text-xs font-semibold text-white tracking-wide uppercase font-mono">
                {activeSheet}
              </h2>
            </div>
            <button
              onClick={() => setActiveSheet(null)}
              className="p-1.5 rounded-md hover:bg-[#e81123] hover:text-white text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sheet Body Content */}
          <div className="flex-1 overflow-y-auto bg-slate-950 pb-6">
            {renderAppContent(activeSheet)}
          </div>
        </div>
      )}

      {/* Windows 11 Bottom Taskbar Navigation Bar */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 px-4 flex items-center justify-around z-30">
        <button
          onClick={() => setActiveSheet("home")}
          className={`flex flex-col items-center gap-1 ${
            activeSheet === "home" ? "text-sky-400 font-semibold" : "text-slate-400"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-mono">Home</span>
        </button>

        <button
          onClick={() => setActiveSheet("projects")}
          className={`flex flex-col items-center gap-1 ${
            activeSheet === "projects" ? "text-sky-400 font-semibold" : "text-slate-400"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span className="text-[10px] font-mono">Projects</span>
        </button>

        {/* Windows 11 Center Start Button */}
        <button
          onClick={() => setActiveSheet(null)}
          className="w-10 h-10 -mt-2 rounded-xl bg-sky-600 text-white shadow-lg flex items-center justify-center border border-sky-400/40 active:scale-95 transition-transform"
        >
          <WindowsLogo size={18} />
        </button>

        <button
          onClick={() => setActiveSheet("terminal")}
          className={`flex flex-col items-center gap-1 ${
            activeSheet === "terminal" ? "text-sky-400 font-semibold" : "text-slate-400"
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span className="text-[10px] font-mono">CLI</span>
        </button>

        <button
          onClick={() => setActiveSheet("contact")}
          className={`flex flex-col items-center gap-1 ${
            activeSheet === "contact" ? "text-sky-400 font-semibold" : "text-slate-400"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span className="text-[10px] font-mono">Join</span>
        </button>
      </div>
    </div>
  );
};
