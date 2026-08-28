"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppId, WindowState, NotificationItem } from "@/types/os";
import { BeginScreen } from "@/components/intro/BeginScreen";
import { CloudJourney } from "@/components/intro/CloudJourney";
import { Taskbar } from "@/components/desktop/Taskbar";
import { StartMenu } from "@/components/desktop/StartMenu";
import { ActionCenter } from "@/components/desktop/ActionCenter";
import { Wallpaper } from "@/components/desktop/Wallpaper";
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
import { MobileOS } from "@/components/mobile/MobileOS";
import { cloudAudio } from "@/components/ui/AudioSynthesizer";

type Stage = "begin" | "journey" | "desktop";

const INITIAL_WINDOWS: Record<AppId, Omit<WindowState, "zIndex" | "isOpen" | "isMinimized" | "isMaximized">> = {
  home: { id: "home", title: "My Computer — AWS Student Builder Group Overview", position: { x: 50, y: 25 }, size: { width: 930, height: 590 }, icon: "home" },
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
  { id: "notif-1", title: "Windows XP — AWS Builder Edition Loaded", message: "Click Start to explore the cloud community environment.", time: "Just now", read: false },
  { id: "notif-2", title: "Cloud Roadmap Loaded", message: "Foundational to Advanced milestones available.", time: "1m ago", read: false, appId: "roadmap" },
  { id: "notif-3", title: "Builder Lab Blueprints Synced", message: "50 real AWS architectures and project ideas ready.", time: "2m ago", read: false, appId: "projects" },
];

export default function DesktopPage() {
  const [stage, setStage] = useState<Stage>("begin");
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    (Object.keys(INITIAL_WINDOWS) as AppId[]).forEach((key) => {
      initial[key] = {
        ...INITIAL_WINDOWS[key],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [highestZ, setHighestZ] = useState(15);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [wallpaperTheme, setWallpaperTheme] = useState<"sky" | "azure" | "midnight">("sky");
  const [soundOn, setSoundOn] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const openApp = useCallback((id: AppId) => {
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
  }, [bringToFront]);

  const closeWindow = useCallback((id: AppId) => {
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
  }, [activeAppId]);

  const minimizeWindow = useCallback((id: AppId) => {
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
  }, [activeAppId]);

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

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "t") {
        e.preventDefault();
        openApp("terminal");
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        showDesktop();
      } else if (e.key === "Escape") {
        setStartMenuOpen(false);
        setSearchOpen(false);
        setActionCenterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openApp, showDesktop]);

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

  // Stage 1: Windows XP Welcome Screen
  if (stage === "begin") {
    return (
      <BeginScreen
        onBegin={() => setStage("desktop")}
        onSkip={() => setStage("desktop")}
      />
    );
  }

  // Stage 2: Cloud Journey Flythrough & System Bootloader
  if (stage === "journey") {
    return <CloudJourney onComplete={() => setStage("desktop")} />;
  }

  // Stage 3 (Mobile Mode): Windows XP mobile touch interface
  if (isMobile) {
    return <MobileOS onOpenApp={openApp} renderAppContent={renderAppContent} />;
  }

  // Stage 3 (Desktop Mode): Full Windows XP Luna Cloud OS
  const openAppList = (Object.keys(windows) as AppId[]).filter(
    (id) => windows[id].isOpen
  );

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-500 font-sans ${
        wallpaperTheme === "midnight" ? "bg-[#050b18]" : "bg-[#084999]"
      }`}
    >
      {/* Windows XP Bliss Dynamic Wallpaper */}
      <Wallpaper theme={wallpaperTheme} />

      {/* Desktop Icons (Classic Left-Aligned Layout) */}
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

      {/* Classic Windows XP Luna Blue Taskbar */}
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

      {/* Windows XP 2-Column Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={openApp}
        onLockScreen={() => setStage("begin")}
      />

      {/* Windows XP Search Companion */}
      <Spotlight
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenApp={openApp}
      />

      {/* Windows XP Control Panel & Notifications Dialog */}
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
}
