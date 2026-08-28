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
  HardDrive,
  Globe,
  Folder,
  Network,
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

// Column 1 Icons (Main System & Programs)
const COLUMN_1_SHORTCUTS: DesktopShortcut[] = [
  {
    id: "home",
    label: "My Computer",
    icon: HardDrive,
    iconBg: "from-[#2f71cd] to-[#124294]",
    iconColor: "text-white",
  },
  {
    id: "projects",
    label: "My Documents",
    icon: Folder,
    iconBg: "from-[#f4b400] to-[#db8a00]",
    iconColor: "text-white",
  },
  {
    id: "feed",
    label: "My Network Places",
    icon: Network,
    iconBg: "from-[#0f9d58] to-[#0b6c3c]",
    iconColor: "text-white",
  },
  {
    label: "Internet Explorer",
    icon: Globe,
    iconBg: "from-[#0055ea] to-[#003399]",
    iconColor: "text-[#ffd700]",
    externalUrl: "https://builder.aws.com/",
  },
  {
    id: "terminal",
    label: "Command Prompt",
    icon: TerminalIcon,
    iconBg: "from-slate-900 to-black",
    iconColor: "text-white",
  },
  {
    id: "roadmap",
    label: "Cloud Roadmap",
    icon: Compass,
    iconBg: "from-[#0288d1] to-[#01579b]",
    iconColor: "text-white",
  },
  {
    id: "certifications",
    label: "Free Certs",
    icon: Award,
    iconBg: "from-[#e65100] to-[#bf360c]",
    iconColor: "text-white",
  },
];

// Column 2 Icons (Additional programs and documentation)
const COLUMN_2_SHORTCUTS: DesktopShortcut[] = [
  {
    id: "resources",
    label: "Cloud Library",
    icon: Library,
    iconBg: "from-[#5e35b1] to-[#311b92]",
    iconColor: "text-white",
  },
  {
    id: "leads",
    label: "Team Hierarchy",
    icon: Users,
    iconBg: "from-[#00897b] to-[#004d40]",
    iconColor: "text-white",
  },
  {
    id: "about",
    label: "README.txt",
    icon: FileText,
    iconBg: "from-slate-700 to-slate-800",
    iconColor: "text-slate-200",
  },
];

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenApp }) => {
  const renderShortcut = (item: DesktopShortcut, idx: number) => {
    const IconComponent = item.icon;

    if (item.externalUrl) {
      return (
        <a
          key={`shortcut-ext-${idx}`}
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-1 w-20 p-1.5 rounded hover:bg-[#0055ea]/30 active:bg-[#0055ea]/50 transition-all text-center focus:outline-none cursor-pointer"
          title="Open AWS Builder Center in new window"
        >
          <div
            className={`w-9 h-9 rounded bg-gradient-to-br ${item.iconBg} shadow-md flex items-center justify-center border border-white/40 group-hover:scale-105 transition-transform duration-100 relative`}
          >
            <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-slate-900 border border-white/40 flex items-center justify-center">
              <ExternalLink className="w-2 h-2 text-sky-400" />
            </div>
          </div>
          <span
            className="text-[11px] font-normal text-white leading-tight px-1 rounded group-hover:bg-[#0055ea] group-hover:text-white"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.9)" }}
          >
            {item.label}
          </span>
        </a>
      );
    }

    return (
      <button
        key={item.id || `shortcut-${idx}`}
        onClick={() => {
          if (item.id) {
            onOpenApp(item.id);
          }
        }}
        className="group flex flex-col items-center gap-1 w-20 p-1.5 rounded hover:bg-[#0055ea]/30 active:bg-[#0055ea]/50 transition-all text-center focus:outline-none"
      >
        <div
          className={`w-9 h-9 rounded bg-gradient-to-br ${item.iconBg} shadow-md flex items-center justify-center border border-white/40 group-hover:scale-105 transition-transform duration-100`}
        >
          <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
        </div>
        <span
          className="text-[11px] font-normal text-white leading-tight px-1 rounded group-hover:bg-[#0055ea] group-hover:text-white"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.9)" }}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="absolute top-3 left-3 z-10 hidden sm:flex gap-2 select-none pointer-events-auto font-sans">
      {/* Column 1 */}
      <div className="flex flex-col gap-2">
        {COLUMN_1_SHORTCUTS.map((item, idx) => renderShortcut(item, idx))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-2">
        {COLUMN_2_SHORTCUTS.map((item, idx) => renderShortcut(item, idx + 10))}
      </div>
    </div>
  );
};
