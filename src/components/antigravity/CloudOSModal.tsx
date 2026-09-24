"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppId, WindowState, NotificationItem } from "@/types/os";
import { Taskbar } from "@/components/desktop/Taskbar";
import { StartMenu } from "@/components/desktop/StartMenu";
import { ActionCenter } from "@/components/desktop/ActionCenter";
import { Wallpaper, DarkWallpaperTheme } from "@/components/desktop/Wallpaper";
import { DesktopIcons } from "@/components/desktop/DesktopIcons";
import { Spotlight } from "@/components/desktop/Spotlight";
import { WindowFrame } from "@/components/window/WindowFrame";
import { HomeApp } from "@/components/apps/HomeApp";
import { AboutApp } from "@/components/apps/AboutApp";
import { LeadsApp } from "@/components/apps/LeadsApp";
import { TeamApp } from "@/components/apps/TeamApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ResourcesApp } from "@/components/apps/ResourcesApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { RoadmapApp } from "@/components/apps/RoadmapApp";
import { CertificationsApp } from "@/components/apps/CertificationsApp";
import { FeedApp } from "@/components/apps/FeedApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { cloudAudio } from "@/components/ui/AudioSynthesizer";
import { X, Minimize2, Maximize2 } from "lucide-react";

const INITIAL_WINDOWS: Record<AppId, Omit<WindowState, "zIndex" | "isOpen" | "isMinimized" | "isMaximized">> = {
  home: { id: "home", title: "My Computer — AWS Student Builders Guild Overview", position: { x: 50, y: 25 }, size: { width: 930, height: 590 }, icon: "home" },
  about: { id: "about", title: "About AWS SBG — README.txt", position: { x: 70, y: 40 }, size: { width: 890, height: 570 }, icon: "info" },
  leads: { id: "leads", title: "Leads Directory (2026-27) — AWS SBG", position: { x: 90, y: 55 }, size: { width: 890, height: 560 }, icon: "user-check" },
  team: { id: "team", title: "C:\\Documents and Settings\\Builder\\Team", position: { x: 105, y: 65 }, size: { width: 870, height: 550 }, icon: "users" },
  projects: { id: "projects", title: "Builder Lab — 50 Project Blueprints", position: { x: 80, y: 45 }, size: { width: 950, height: 610 }, icon: "folder-git2" },
  roadmap: { id: "roadmap", title: "Cloud Engineering Roadmap — Milestone Curriculum", position: { x: 95, y: 40 }, size: { width: 930, height: 590 }, icon: "compass" },
  certifications: { id: "certifications", title: "100 Free Cloud Certifications & Badges", position: { x: 105, y: 50 }, size: { width: 940, height: 600 }, icon: "award" },
  resources: { id: "resources", title: "AWS Cloud Learning Library — 100 Resources", position: { x: 115, y: 60 }, size: { width: 900, height: 570 }, icon: "book-open" },
  terminal: { id: "terminal", title: "Command Prompt (cmd.exe)", position: { x: 135, y: 80 }, size: { width: 780, height: 480 }, icon: "terminal" },
  feed: { id: "feed", title: "My Network Places — Real-Time Activity Feed", position: { x: 125, y: 70 }, size: { width: 830, height: 540 }, icon: "activity" },
  contact: { id: "contact", title: "Connect & Community Portals — IIT Jodhpur", position: { x: 110, y: 60 }, size: { width: 870, height: 570 }, icon: "mail" },
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "notif-1", title: "AWS Builder OS Active", message: "Cloud Sandbox loaded. Click Start to explore.", time: "Just now", read: false },
  { id: "notif-2", title: "Cloud Roadmap Loaded", message: "Foundational to Advanced milestones available.", time: "1m ago", read: false, appId: "roadmap" },
  { id: "notif-3", title: "50 Blueprints Synced", message: "Ready-to-deploy architectures online.", time: "2m ago", read: false, appId: "projects" },
];

interface CloudOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudOSModal: React.FC<CloudOSModalProps> = ({ isOpen, onClose }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    (Object.keys(INITIAL_WINDOWS) as AppId[]).forEach((key) => {
      initial[key] = {
        ...INITIAL_WINDOWS[key],
        isOpen: key === "home", // Open home window by default
        isMinimized: false,
        isMaximized: false,
        zIndex: key === "home" ? 2 : 1,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  const [activeAppId, setActiveAppId] = useState<AppId | null>("home");
  const [highestZ, setHighestZ] = useState(15);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [wallpaperTheme, setWallpaperTheme] = useState<DarkWallpaperTheme>("midnight");
  const [soundOn, setSoundOn] = useState(false);

  // Disable body scroll when OS is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSound = useCallback(() => {
    const active = cloudAudio.toggle();
    setSoundOn(active);
  }, []);

  const bringToFront = useCallback((id: AppId) => {
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWindows((wPrev) => ({
        ...wPrev,
        [id]: {
          ...wPrev[id],
          zIndex: nextZ,
          isMinimized: false,
        },
      }));
      return nextZ;
    });
    setActiveAppId(id);
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
        },
      }));
      bringToFront(id);
      setStartMenuOpen(false);
      setSearchOpen(false);
    },
    [bringToFront]
  );

  const closeWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
        },
      }));
      if (activeAppId === id) {
        setActiveAppId(null);
      }
    },
    [activeAppId]
  );

  const minimizeWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      }));
      if (activeAppId === id) {
        setActiveAppId(null);
      }
    },
    [activeAppId]
  );

  const maximizeWindow = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  }, []);

  const showDesktop = useCallback(() => {
    setWindows((prev) => {
      const updated = { ...prev };
      (Object.keys(updated) as AppId[]).forEach((id) => {
        if (updated[id].isOpen) {
          updated[id] = { ...updated[id], isMinimized: true };
        }
      });
      return updated;
    });
    setActiveAppId(null);
    setStartMenuOpen(false);
    setActionCenterOpen(false);
  }, []);

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case "home":
        return <HomeApp onOpenApp={openApp} />;
      case "about":
        return <AboutApp onOpenApp={openApp} />;
      case "leads":
        return <LeadsApp />;
      case "team":
        return <TeamApp />;
      case "projects":
        return <ProjectsApp />;
      case "roadmap":
        return <RoadmapApp />;
      case "certifications":
        return <CertificationsApp />;
      case "resources":
        return <ResourcesApp />;
      case "terminal":
        return <TerminalApp onOpenApp={openApp} />;
      case "feed":
        return <FeedApp />;
      case "contact":
        return <ContactApp onOpenApp={openApp} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  const openAppList = (Object.keys(windows) as AppId[]).filter(
    (id) => windows[id].isOpen
  );

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden select-none bg-[#050b18] font-sans animate-in fade-in duration-200">
      {/* Top Floating Exit Button */}
      <div className="absolute top-3 right-4 z-50 flex items-center gap-2">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white text-xs font-mono border border-white/20 shadow-xl transition-all cursor-pointer backdrop-blur-md"
          title="Exit Cloud OS Sandbox and return to website"
        >
          <X className="w-4 h-4" />
          <span>Exit Cloud OS</span>
        </button>
      </div>

      {/* Windows XP Bliss Wallpaper */}
      <Wallpaper theme={wallpaperTheme} />

      {/* Desktop Icons */}
      <DesktopIcons onOpenApp={openApp} />

      {/* Windows Canvas Area */}
      <main className="relative z-20 w-full h-[calc(100vh-30px)] overflow-hidden pointer-events-none">
        {(Object.keys(windows) as AppId[]).map((id) => {
          const win = windows[id];
          if (!win.isOpen || win.isMinimized) return null;

          return (
            <div key={id} className="pointer-events-auto">
              <WindowFrame
                windowState={win}
                isActive={activeAppId === id}
                onFocus={() => bringToFront(id)}
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
                onMaximize={() => maximizeWindow(id)}
              >
                {renderAppContent(id)}
              </WindowFrame>
            </div>
          );
        })}
      </main>

      {/* Luna Blue Taskbar */}
      <Taskbar
        openApps={openAppList}
        activeAppId={activeAppId}
        onAppClick={(id) => {
          if (windows[id]?.isOpen && !windows[id]?.isMinimized && activeAppId === id) {
            minimizeWindow(id);
          } else {
            openApp(id);
          }
        }}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => {
          setStartMenuOpen((prev) => !prev);
          setSearchOpen(false);
          setActionCenterOpen(false);
        }}
        searchOpen={searchOpen}
        onToggleSearch={() => {
          setSearchOpen((prev) => !prev);
          setStartMenuOpen(false);
          setActionCenterOpen(false);
        }}
        actionCenterOpen={actionCenterOpen}
        onToggleActionCenter={() => {
          setActionCenterOpen((prev) => !prev);
          setStartMenuOpen(false);
          setSearchOpen(false);
        }}
        unreadNotifications={notifications.filter((n) => !n.read).length}
        soundOn={soundOn}
        onToggleSound={toggleSound}
        onShowDesktop={showDesktop}
      />

      {/* 2-Column Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={openApp}
        onLockScreen={onClose}
      />

      {/* Search Companion */}
      <Spotlight
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenApp={openApp}
      />

      {/* Action Center / Control Panel */}
      <ActionCenter
        isOpen={actionCenterOpen}
        onClose={() => setActionCenterOpen(false)}
        onOpenApp={openApp}
        notifications={notifications}
        onClearNotifications={() => setNotifications([])}
        soundOn={soundOn}
        onToggleSound={toggleSound}
        currentTheme={wallpaperTheme}
        onSelectTheme={setWallpaperTheme}
      />
    </div>
  );
};
