"use client";

import React, { useEffect, useState } from "react";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import { cloudAudio } from "@/components/ui/AudioSynthesizer";
import { AppId } from "@/types/os";
import {
  Wifi,
  Bell,
  Search,
  Volume2,
  VolumeX,
  Activity,
  Terminal,
  Layers,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/config/socials";

import { DarkWallpaperTheme } from "@/components/desktop/Wallpaper";

interface MenuBarProps {
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onOpenSpotlight: () => void;
  onToggleNotifications: () => void;
  unreadNotifications: number;
  currentTheme?: DarkWallpaperTheme;
  onSelectTheme?: (theme: DarkWallpaperTheme) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppId,
  onOpenApp,
  onOpenSpotlight,
  onToggleNotifications,
  unreadNotifications,
  currentTheme = "midnight",
  onSelectTheme,
}) => {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [showOsMenu, setShowOsMenu] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDateString(
        now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const active = cloudAudio.toggle();
    setSoundOn(active);
  };

  const getActiveTitle = () => {
    if (!activeAppId) return "Finder";
    const titleMap: Record<AppId, string> = {
      home: "Overview",
      about: "About SBG",
      leads: "Leads Directory",
      team: "Team Directory",
      projects: "Builder Lab",
      roadmap: "Cloud Roadmap",
      certifications: "Free Certifications",
      resources: "Cloud Library",
      terminal: "Terminal (~/aws-sbg)",
      feed: "Build Feed",
      contact: "Connect & Socials",
    };
    return titleMap[activeAppId] || "Builder OS";
  };

  return (
    <>
      <header className="relative z-40 w-full h-8 px-3.5 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-300 select-none shadow-sm">
        {/* Left Side: System Logo & Menu Items */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <button
              onClick={() => setShowOsMenu((prev) => !prev)}
              aria-label="AWS Builder OS Menu"
              className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-slate-800/80 transition-colors focus:outline-none"
            >
              <BuilderChip size={15} variant="blue" glow={true} />
              <span className="font-semibold text-slate-100 hidden sm:inline tracking-tight">
                AWS Builder OS
              </span>
            </button>

            {/* Apple-style OS Dropdown */}
            {showOsMenu && (
              <div
                className="absolute top-full left-0 mt-1 w-56 p-1 rounded-lg border border-slate-700 bg-slate-900/95 backdrop-blur-2xl shadow-2xl text-slate-200 z-50 text-[11px]"
                onMouseLeave={() => setShowOsMenu(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="font-semibold text-slate-100">AWS Builder OS</p>
                  <p className="text-[10px] text-slate-400">v1.2 (IIT Jodhpur Build)</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onOpenApp("about");
                      setShowOsMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-sky-600 hover:text-white flex items-center justify-between"
                  >
                    <span>About This Community</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenApp("leads");
                      setShowOsMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-sky-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Leadership Profiles</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenApp("terminal");
                      setShowOsMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-sky-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Launch Terminal</span>
                    <span className="text-[10px] opacity-70">⌘T</span>
                  </button>
                </div>
                <div className="border-t border-slate-800 p-2 space-y-1.5 bg-slate-950/50 rounded-b-lg">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block px-1">
                    Desktop Wallpaper
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => onSelectTheme?.("midnight")}
                      className={`px-2 py-1 rounded text-[10px] font-mono text-center transition-all ${
                        currentTheme === "midnight"
                          ? "bg-sky-500 text-white font-semibold shadow-sm"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Midnight
                    </button>
                    <button
                      onClick={() => onSelectTheme?.("obsidian")}
                      className={`px-2 py-1 rounded text-[10px] font-mono text-center transition-all ${
                        currentTheme === "obsidian"
                          ? "bg-sky-500 text-white font-semibold shadow-sm"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Obsidian
                    </button>
                    <button
                      onClick={() => onSelectTheme?.("aurora")}
                      className={`px-2 py-1 rounded text-[10px] font-mono text-center transition-all ${
                        currentTheme === "aurora"
                          ? "bg-sky-500 text-white font-semibold shadow-sm"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Aurora
                    </button>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <button
                    onClick={() => {
                      window.open("https://www.linkedin.com/company/aws-student-builder-group-at-iit-jodhpur/", "_blank");
                      setShowOsMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-sky-600 hover:text-white"
                  >
                    LinkedIn Community ↗
                  </button>
                  <button
                    onClick={() => {
                      window.open("https://www.meetup.com/aws-sbg-at-indian-institute-of-technology-jodhpur/", "_blank");
                      setShowOsMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-sky-600 hover:text-white"
                  >
                    Meetup Chapter ↗
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-3.5 w-px bg-slate-800 hidden sm:block" />

          {/* Active Application Title */}
          <span className="font-medium text-slate-200 hidden md:inline">
            {getActiveTitle()}
          </span>

          {/* Menus */}
          <div className="hidden xl:flex items-center gap-3 text-slate-400 text-[11px]">
            <button
              onClick={() => onOpenApp("terminal")}
              className="hover:text-slate-100 transition-colors"
            >
              Terminal
            </button>
            <button
              onClick={() => onOpenApp("projects")}
              className="hover:text-slate-100 transition-colors"
            >
              Builder Lab
            </button>
            <button
              onClick={() => onOpenApp("resources")}
              className="hover:text-slate-100 transition-colors"
            >
              Resources
            </button>
            <a
              href={SOCIAL_LINKS.meetup}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium cursor-pointer"
              title="Join us on official Meetup"
            >
              <span>Join Us</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Center: AWS Student Builder Group — IIT Jodhpur (xl only to avoid any clashes) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-2 pointer-events-none">
          <span className="font-medium tracking-wide text-slate-200 text-[11px]">
            AWS Student Builder Group
          </span>
          <span className="text-slate-500">—</span>
          <span className="text-sky-400 font-mono text-[11px]">IIT Jodhpur</span>
        </div>

        {/* Right Side: Status, Sound, Spotlight, Notifications, Clock */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-slate-400">
          {/* Cloud Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-[10px] font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cloud Operational</span>
          </div>

          {/* Audio Ambient Synth Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? "Mute Ambient Sound" : "Play Cloud Ambient Sound"}
            className="p-1 rounded hover:bg-slate-800/80 hover:text-slate-100 transition-colors"
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Wi-Fi / Cloud Network Status */}
          <div className="flex items-center" title="AWS Region ap-south-1 Connected">
            <Wifi className="w-3.5 h-3.5 text-sky-400" />
          </div>

          {/* Spotlight Search */}
          <button
            onClick={onOpenSpotlight}
            title="Spotlight Search (⌘K)"
            className="p-1 rounded hover:bg-slate-800/80 hover:text-slate-100 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Notification Center */}
          <button
            onClick={onToggleNotifications}
            title="Notification Center"
            className="relative p-1 rounded hover:bg-slate-800/80 hover:text-slate-100 transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-500" />
            )}
          </button>

          {/* Clock */}
          <div className="flex items-center gap-1.5 pl-1 font-mono text-[11px] text-slate-200">
            <span className="hidden sm:inline text-slate-400">{dateString}</span>
            <span>{timeString}</span>
          </div>
        </div>
      </header>
    </>
  );
};
