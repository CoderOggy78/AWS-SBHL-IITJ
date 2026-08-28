"use client";

import React from "react";
import { AppId } from "@/types/os";
import {
  FolderGit2,
  Library,
  Users,
  Briefcase,
  FileText,
  Terminal as TerminalIcon,
  Compass,
  Award,
  ExternalLink,
  Cloud,
} from "lucide-react";

interface DesktopIconsProps {
  onOpenApp: (id: AppId) => void;
}

interface DesktopShortcut {
  id?: AppId;
  label: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  externalUrl?: string;
}

const SHORTCUTS: DesktopShortcut[] = [
  {
    id: "projects",
    label: "Builder Lab",
    icon: FolderGit2,
    iconBg: "from-sky-500 to-blue-600",
    iconColor: "text-white",
  },
  {
    id: "roadmap",
    label: "Cloud Roadmap",
    icon: Compass,
    iconBg: "from-emerald-500 to-teal-600",
    iconColor: "text-white",
  },
  {
    id: "certifications",
    label: "Free Certifications",
    icon: Award,
    iconBg: "from-amber-500 to-orange-600",
    iconColor: "text-white",
  },
  {
    label: "Builder Center",
    icon: Cloud,
    iconBg: "from-purple-500 to-indigo-600",
    iconColor: "text-white",
    externalUrl: "https://builder.aws.com/",
  },
  {
    id: "resources",
    label: "Resources",
    icon: Library,
    iconBg: "from-cyan-500 to-blue-600",
    iconColor: "text-white",
  },
  {
    id: "team",
    label: "Team Directory",
    icon: Users,
    iconBg: "from-indigo-500 to-purple-600",
    iconColor: "text-white",
  },
  {
    id: "internships",
    label: "Internships",
    icon: Briefcase,
    iconBg: "from-rose-500 to-pink-600",
    iconColor: "text-white",
  },
  {
    id: "terminal",
    label: "Terminal.app",
    icon: TerminalIcon,
    iconBg: "from-slate-700 to-slate-900",
    iconColor: "text-emerald-400",
  },
  {
    id: "about",
    label: "README.md",
    icon: FileText,
    iconBg: "from-slate-600 to-slate-800",
    iconColor: "text-slate-200",
  },
];

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenApp }) => {
  return (
    <div className="absolute top-11 left-4 z-10 hidden sm:flex flex-col gap-3.5 select-none pointer-events-auto">
      {SHORTCUTS.map((item, idx) => {
        const IconComponent = item.icon;

        if (item.externalUrl) {
          return (
            <a
              key={`shortcut-ext-${idx}`}
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 w-20 p-1.5 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center focus:outline-none focus:ring-1 focus:ring-sky-400/50 cursor-pointer"
              title="Open AWS Builder Center in a new tab"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.iconBg} shadow-lg flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-200 relative`}
              >
                <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border border-white/30 flex items-center justify-center">
                  <ExternalLink className="w-2.5 h-2.5 text-sky-400" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-100 tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1 rounded group-hover:bg-sky-600/70 leading-tight">
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <button
            key={item.id || `shortcut-${idx}`}
            onClick={() => item.id && onOpenApp(item.id)}
            className="group flex flex-col items-center gap-1 w-20 p-1.5 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center focus:outline-none focus:ring-1 focus:ring-sky-400/50"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.iconBg} shadow-lg flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-200`}
            >
              <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
            </div>
            <span className="text-[10px] font-medium text-slate-100 tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1 rounded group-hover:bg-sky-600/70 leading-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
