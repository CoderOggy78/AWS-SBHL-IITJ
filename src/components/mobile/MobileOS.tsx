"use client";

import React, { useState } from "react";
import { AppId } from "@/types/os";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import { SOCIAL_LINKS } from "@/config/socials";
import {
  Home,
  Info,
  Users,
  FolderGit2,
  Calendar,
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

  const apps = [
    { id: "home" as AppId, name: "Home", icon: Home, gradient: "from-sky-500 to-blue-600" },
    { id: "about" as AppId, name: "About", icon: Info, gradient: "from-blue-600 to-indigo-600" },
    { id: "leads" as AppId, name: "Leads", icon: Users, gradient: "from-purple-500 to-violet-600" },
    { id: "team" as AppId, name: "Team", icon: Users, gradient: "from-indigo-500 to-purple-600" },
    { id: "projects" as AppId, name: "Builder Lab", icon: FolderGit2, gradient: "from-cyan-500 to-sky-600" },
    { id: "roadmap" as AppId, name: "Roadmap", icon: Compass, gradient: "from-emerald-500 to-teal-600" },
    { id: "certifications" as AppId, name: "Free Certs", icon: Award, gradient: "from-amber-500 to-orange-600" },
    { id: "resources" as AppId, name: "Resources", icon: BookOpen, gradient: "from-amber-500 to-orange-600" },
    { id: "internships" as AppId, name: "Internships", icon: Briefcase, gradient: "from-rose-500 to-pink-600" },
    { id: "terminal" as AppId, name: "Terminal", icon: Terminal, gradient: "from-slate-800 to-slate-950" },
    { id: "feed" as AppId, name: "Build Feed", icon: Activity, gradient: "from-teal-600 to-emerald-700" },
    { id: "contact" as AppId, name: "Join Us", icon: Mail, gradient: "from-sky-600 to-cyan-600" },
  ];

  return (
    <div className="md:hidden relative w-screen h-screen bg-[#070b14] overflow-hidden flex flex-col font-sans text-slate-200 select-none">
      {/* Blueprint Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80d_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80d_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Mobile Status Header */}
      <div className="relative z-20 px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <BuilderChip size={26} variant="blue" glow={true} />
          <div>
            <p className="text-xs font-bold text-white tracking-tight leading-none">
              AWS Builder OS
            </p>
            <p className="text-[10px] font-mono text-sky-400">IIT Jodhpur Node</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
        </div>
      </div>

      {/* Main Home Screen: iOS App Grid */}
      <div className="flex-1 overflow-y-auto p-5 pb-24 relative z-10">
        {/* Widget Banner */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl mb-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-sky-400">
            <span>REGION: ap-south-iitj</span>
            <span className="text-emerald-400 font-semibold">99.9% HEALTHY</span>
          </div>
          <h2 className="text-base font-extrabold text-white">
            Build on AWS. Learn Together.
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Welcome to the official AWS Student Builder Group mobile operating shell at IIT Jodhpur.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/90 text-white text-[11px] font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Group</span>
            </a>
            <a
              href={SOCIAL_LINKS.meetup}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/90 text-white text-[11px] font-medium"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Meetup</span>
            </a>
          </div>
        </div>

        {/* 4-Column iOS App Icon Grid */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-3 text-center">
          {apps.map((app) => {
            const AppIcon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setActiveSheet(app.id)}
                className="flex flex-col items-center gap-1.5 group focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.gradient} shadow-lg border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform`}
                >
                  <AppIcon className="w-6 h-6" />
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
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-250">
          {/* Sheet Header */}
          <div className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                {activeSheet}
              </h2>
            </div>
            <button
              onClick={() => setActiveSheet(null)}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sheet Body Content */}
          <div className="flex-1 overflow-y-auto bg-slate-950 pb-8">
            {renderAppContent(activeSheet)}
          </div>
        </div>
      )}

      {/* iOS Bottom Navigation Bar */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800/80 px-6 flex items-center justify-around z-30">
        <button
          onClick={() => setActiveSheet("home")}
          className={`flex flex-col items-center gap-1 ${activeSheet === "home" ? "text-sky-400" : "text-slate-500"
            }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-mono">Home</span>
        </button>

        <button
          onClick={() => setActiveSheet("leads")}
          className={`flex flex-col items-center gap-1 ${activeSheet === "leads" ? "text-sky-400" : "text-slate-500"
            }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-mono">Leads</span>
        </button>

        <button
          onClick={() => setActiveSheet("projects")}
          className={`flex flex-col items-center gap-1 ${activeSheet === "projects" ? "text-sky-400" : "text-slate-500"
            }`}
        >
          <FolderGit2 className="w-5 h-5" />
          <span className="text-[10px] font-mono">Projects</span>
        </button>

        <button
          onClick={() => setActiveSheet("terminal")}
          className={`flex flex-col items-center gap-1 ${activeSheet === "terminal" ? "text-emerald-400" : "text-slate-500"
            }`}
        >
          <Terminal className="w-5 h-5" />
          <span className="text-[10px] font-mono">Terminal</span>
        </button>

        <button
          onClick={() => setActiveSheet("contact")}
          className={`flex flex-col items-center gap-1 ${activeSheet === "contact" ? "text-sky-400" : "text-slate-500"
            }`}
        >
          <Mail className="w-5 h-5" />
          <span className="text-[10px] font-mono">Join Us</span>
        </button>
      </div>
    </div>
  );
};
