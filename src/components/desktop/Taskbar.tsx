"use client";

import React, { useState, useEffect } from "react";
import { AppId } from "@/types/os";
import { WindowsXpLogo } from "@/components/ui/BrandIcons";
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
  Volume2,
  VolumeX,
  Bell,
  HardDrive,
  Globe,
  Radio,
  MessageCircle,
} from "lucide-react";

interface TaskbarProps {
  openApps: AppId[];
  activeAppId: AppId | null;
  onAppClick: (id: AppId) => void;
  startMenuOpen: boolean;
  onToggleStartMenu: () => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
  actionCenterOpen: boolean;
  onToggleActionCenter: () => void;
  unreadNotifications: number;
  soundOn: boolean;
  onToggleSound: () => void;
  onShowDesktop: () => void;
}

const APP_TASK_INFO: Record<
  AppId,
  { label: string; icon: React.ElementType }
> = {
  home: { label: "Overview", icon: Home },
  about: { label: "About SBG", icon: Info },
  leads: { label: "Leads Directory", icon: UserCheck },
  team: { label: "Team Hierarchy", icon: Users },
  projects: { label: "Builder Lab", icon: FolderGit2 },
  roadmap: { label: "Cloud Roadmap", icon: Compass },
  certifications: { label: "Free Certs", icon: Award },
  resources: { label: "Cloud Library", icon: BookOpen },
  internships: { label: "Internships", icon: Briefcase },
  terminal: { label: "Command Prompt", icon: Terminal },
  feed: { label: "Build Feed", icon: Radio },
  contact: { label: "Join Us", icon: Mail },
};

export const Taskbar: React.FC<TaskbarProps> = ({
  openApps,
  activeAppId,
  onAppClick,
  startMenuOpen,
  onToggleStartMenu,
  searchOpen,
  onToggleSearch,
  actionCenterOpen,
  onToggleActionCenter,
  unreadNotifications,
  soundOn,
  onToggleSound,
  onShowDesktop,
}) => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-[30px] bg-gradient-to-b from-[#245edb] via-[#1b4cc4] to-[#123aa2] border-t border-[#3a75e8] z-40 flex items-center justify-between select-none shadow-[0_-2px_6px_rgba(0,0,0,0.4)] font-sans text-white">
      {/* Left Section: Start Button + Quick Launch */}
      <div className="flex items-center h-full">
        {/* Legendary Windows XP Green "start" Button */}
        <button
          onClick={onToggleStartMenu}
          aria-label="Start"
          className={`relative h-[30px] px-3.5 flex items-center gap-2 font-bold italic tracking-wide text-[14px] text-white shadow-[inset_1px_1px_#85e07a,inset_-1px_-1px_#185516] transition-all duration-100 ${
            startMenuOpen
              ? "bg-gradient-to-b from-[#2d6f30] via-[#388e3c] to-[#42a83e] rounded-tr-[12px] shadow-[inset_2px_2px_#124010]"
              : "bg-gradient-to-b from-[#48b543] via-[#3ca237] to-[#2e8229] hover:from-[#54c44f] hover:to-[#389a32] rounded-tr-[14px] active:from-[#2e8229] active:to-[#48b543]"
          }`}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          <WindowsXpLogo size={18} className="drop-shadow-sm shrink-0" />
          <span className="leading-none pt-0.5">start</span>
        </button>

        {/* Quick Launch Separator & Icons */}
        <div className="flex items-center gap-1 px-2 border-r border-[#1941a5] h-full hidden sm:flex">
          {/* Show Desktop */}
          <button
            onClick={onShowDesktop}
            title="Show Desktop"
            className="p-1 hover:bg-white/20 rounded-sm text-sky-200 hover:text-white transition-colors"
          >
            <HardDrive className="w-3.5 h-3.5" />
          </button>

          {/* Internet Explorer / AWS Builder Center */}
          <a
            href="https://builder.aws.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Launch AWS Builder Center"
            className="p-1 hover:bg-white/20 rounded-sm text-sky-200 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#ffcc00]" />
          </a>

          {/* PowerShell / Command Prompt */}
          <button
            onClick={() => onAppClick("terminal")}
            title="Command Prompt (cmd.exe)"
            className="p-1 hover:bg-white/20 rounded-sm text-sky-200 hover:text-white transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Running Windows Task Buttons */}
        <div className="flex items-center gap-1 px-1.5 overflow-x-auto max-w-[calc(100vw-340px)] h-full no-scrollbar">
          {openApps.map((appId) => {
            const app = APP_TASK_INFO[appId];
            if (!app) return null;
            const Icon = app.icon;
            const isActive = activeAppId === appId;

            return (
              <button
                key={appId}
                onClick={() => onAppClick(appId)}
                className={`h-[24px] px-2.5 rounded-[3px] flex items-center gap-1.5 text-xs font-normal max-w-[170px] truncate transition-all duration-75 ${
                  isActive
                    ? "bg-[#1941a5] shadow-[inset_1px_1px_#091c4d,inset_-1px_-1px_#3468d6] font-semibold text-white border-t border-[#12317c]"
                    : "bg-gradient-to-b from-[#3d7eff] via-[#2f6ce6] to-[#1f57cc] hover:from-[#4d8cff] hover:to-[#2a64dc] shadow-[inset_1px_1px_#8bb8ff,inset_-1px_-1px_#103590] text-white border-t border-[#6298ff]"
                }`}
                style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.6)" }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-sky-200" />
                <span className="truncate">{app.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Section: Windows XP System Tray */}
      <div className="h-full bg-gradient-to-b from-[#0c8cee] via-[#166ae0] to-[#1055c2] border-l border-[#003882] shadow-[inset_1px_1px_#47b2ff,inset_-1px_-1px_#083884] flex items-center gap-2 px-3 shrink-0">
        {/* Audio Synthesizer Speaker */}
        <button
          onClick={onToggleSound}
          title={soundOn ? "Cloud Synth: ON" : "Cloud Synth: Muted"}
          className="p-0.5 hover:bg-white/20 rounded text-white transition-colors"
        >
          {soundOn ? (
            <Volume2 className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-300" />
          )}
        </button>

        {/* AWS Region ap-south-1 Network Indicator */}
        <div
          title="AWS SBG Connected: ap-south-1 (99.9% Health)"
          className="flex items-center gap-1 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-sky-100 hidden sm:inline">ap-south-1</span>
        </div>

        {/* Notifications Tray Icon */}
        <button
          onClick={onToggleActionCenter}
          title="Notifications & Settings"
          className="relative p-0.5 hover:bg-white/20 rounded"
        >
          <Bell className="w-3.5 h-3.5 text-sky-100" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400" />
          )}
        </button>

        {/* Digital Clock */}
        <div
          onClick={onToggleActionCenter}
          title="Date and Time Properties"
          className="text-xs font-normal text-white pl-1 cursor-pointer"
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.6)" }}
        >
          {timeString || "5:30 PM"}
        </div>
      </div>
    </footer>
  );
};
