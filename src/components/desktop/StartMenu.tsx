"use client";

import React, { useState } from "react";
import { AppId } from "@/types/os";
import { BuilderChip } from "@/components/ui/Logo";
import { SOCIAL_LINKS } from "@/config/socials";
import { LinkedinIcon, WindowsXpLogo } from "@/components/ui/BrandIcons";
import {
  Home,
  Info,
  UserCheck,
  Users,
  FolderGit2,
  BookOpen,
  Briefcase,
  Mail,
  Terminal,
  Compass,
  Award,
  Cloud,
  Search,
  Power,
  Key,
  Globe,
  HardDrive,
  Folder,
  Settings,
  HelpCircle,
  Play,
  Layers,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onLockScreen: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onLockScreen,
}) => {
  const [allProgramsOpen, setAllProgramsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-45 bg-transparent"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-[30px] left-0 w-[420px] max-w-[96vw] bg-white rounded-t-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-2 border-[#003882] z-50 flex flex-col font-sans select-none overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-100"
      >
        {/* Windows XP Start Menu Top User Header */}
        <div className="h-[56px] bg-gradient-to-r from-[#0055ea] via-[#1065ea] to-[#003399] px-4 flex items-center gap-3 border-b border-[#002266]">
          {/* User Profile Avatar with White Border */}
          <div className="w-[42px] h-[42px] rounded-[4px] bg-slate-900 border-2 border-white/80 shadow-md flex items-center justify-center shrink-0">
            <BuilderChip size={30} variant="blue" glow={true} />
          </div>
          <div className="text-white">
            <p className="text-sm font-bold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              AWS Student Builder
            </p>
            <p className="text-[11px] text-sky-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              IIT Jodhpur Node
            </p>
          </div>
        </div>

        {/* 2-Column Classic Start Menu Body */}
        <div className="flex bg-white min-h-[380px]">
          {/* Left Column (White Background - Frequent & Pinned Applications) */}
          <div className="w-[54%] p-2 flex flex-col justify-between border-r border-[#d3d3d3] bg-white text-slate-800 text-xs">
            <div className="space-y-1">
              {/* Pinned: Internet Explorer (AWS Builder Center) */}
              <a
                href="https://builder.aws.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors group cursor-pointer"
              >
                <div className="w-7 h-7 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-white">
                  <Globe className="w-4 h-4 text-[#0055ea]" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[11px] text-slate-900 group-hover:text-white truncate">Internet</p>
                  <p className="text-[10px] text-slate-500 group-hover:text-sky-100 truncate">AWS Builder Center</p>
                </div>
              </a>

              {/* Pinned: E-mail (Join Us / Contact) */}
              <button
                onClick={() => {
                  onOpenApp("contact");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors group text-left"
              >
                <div className="w-7 h-7 rounded bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-white">
                  <Mail className="w-4 h-4 text-teal-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[11px] text-slate-900 group-hover:text-white truncate">E-mail</p>
                  <p className="text-[10px] text-slate-500 group-hover:text-sky-100 truncate">Join & Community</p>
                </div>
              </button>

              {/* Beveled Separator */}
              <div className="my-1.5 border-t border-[#d6d6d6] border-b border-white" />

              {/* Frequent Programs List */}
              <button
                onClick={() => {
                  onOpenApp("home");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left group"
              >
                <Home className="w-4 h-4 text-blue-600 group-hover:text-white shrink-0" />
                <span className="truncate text-[11px]">Overview</span>
              </button>

              <button
                onClick={() => {
                  onOpenApp("projects");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left group"
              >
                <FolderGit2 className="w-4 h-4 text-sky-600 group-hover:text-white shrink-0" />
                <span className="truncate text-[11px]">Builder Lab (50 Ideas)</span>
              </button>

              <button
                onClick={() => {
                  onOpenApp("roadmap");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left group"
              >
                <Compass className="w-4 h-4 text-emerald-600 group-hover:text-white shrink-0" />
                <span className="truncate text-[11px]">Cloud Roadmap</span>
              </button>

              <button
                onClick={() => {
                  onOpenApp("certifications");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left group"
              >
                <Award className="w-4 h-4 text-amber-600 group-hover:text-white shrink-0" />
                <span className="truncate text-[11px]">Free Certifications</span>
              </button>

              <button
                onClick={() => {
                  onOpenApp("resources");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left group"
              >
                <BookOpen className="w-4 h-4 text-indigo-600 group-hover:text-white shrink-0" />
                <span className="truncate text-[11px]">Cloud Library</span>
              </button>

              <button
                onClick={() => {
                  onOpenApp("terminal");
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left group"
              >
                <Terminal className="w-4 h-4 text-slate-800 group-hover:text-white shrink-0" />
                <span className="truncate text-[11px]">Command Prompt</span>
              </button>
            </div>

            {/* All Programs Button */}
            <div className="pt-2 border-t border-[#e0e0e0]">
              <button
                onClick={() => {
                  onOpenApp("projects");
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-1.5 rounded hover:bg-[#2f71cd] hover:text-white text-slate-800 font-bold text-xs group transition-colors"
              >
                <span>All Programs</span>
                <Play className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600 group-hover:fill-white group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Right Column (Soft Blue Background `#d3e5fa` - Special Folders & System Utilities) */}
          <div className="w-[46%] p-2.5 bg-[#d3e5fa] text-[#001433] text-[11px] flex flex-col justify-between space-y-1 border-l border-white">
            <div className="space-y-1">
              {/* My Documents */}
              <button
                onClick={() => {
                  onOpenApp("projects");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left font-bold"
              >
                <Folder className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">My Documents</span>
              </button>

              {/* My Recent Documents */}
              <button
                onClick={() => {
                  onOpenApp("roadmap");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left"
              >
                <Folder className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Cloud Roadmap</span>
              </button>

              {/* My Computer */}
              <button
                onClick={() => {
                  onOpenApp("home");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left font-bold"
              >
                <HardDrive className="w-4 h-4 text-sky-700 shrink-0" />
                <span className="truncate">My Computer</span>
              </button>

              {/* My Network Places */}
              <button
                onClick={() => {
                  onOpenApp("feed");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left"
              >
                <Globe className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="truncate">My Network Places</span>
              </button>

              {/* Beveled Separator */}
              <div className="my-1.5 border-t border-[#b6cde8] border-b border-white" />

              {/* Control Panel */}
              <button
                onClick={() => {
                  onOpenApp("leads");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left font-bold"
              >
                <Users className="w-4 h-4 text-indigo-700 shrink-0" />
                <span className="truncate">Team Hierarchy</span>
              </button>

              {/* Help and Support */}
              <button
                onClick={() => {
                  onOpenApp("about");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left"
              >
                <HelpCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="truncate">Help and Support</span>
              </button>

              {/* Search */}
              <button
                onClick={() => {
                  onOpenApp("resources");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left"
              >
                <Search className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">Search</span>
              </button>

              {/* Run */}
              <button
                onClick={() => {
                  onOpenApp("terminal");
                  onClose();
                }}
                className="w-full flex items-center gap-2 p-1 rounded hover:bg-[#2f71cd] hover:text-white transition-colors text-left"
              >
                <Terminal className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="truncate">Run...</span>
              </button>
            </div>
          </div>
        </div>

        {/* Windows XP Bottom Navy Footer Bar */}
        <div className="h-[44px] bg-gradient-to-r from-[#003399] via-[#0044cc] to-[#003399] px-4 flex items-center justify-end gap-3 text-white text-xs border-t border-[#002266]">
          {/* Log Off Button */}
          <button
            onClick={() => {
              onClose();
              onLockScreen();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/20 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-sm">
              <Key className="w-3 h-3" />
            </div>
            <span className="font-semibold">Log Off</span>
          </button>

          {/* Turn Off Computer Button */}
          <button
            onClick={() => {
              onClose();
              window.location.reload();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/20 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white shadow-sm">
              <Power className="w-3 h-3" />
            </div>
            <span className="font-semibold">Turn Off Computer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
