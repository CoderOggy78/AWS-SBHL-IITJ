"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppId, WindowState, NotificationItem } from "@/types/os";
import { BeginScreen } from "@/components/intro/BeginScreen";
import { CloudJourney } from "@/components/intro/CloudJourney";
import { MenuBar } from "@/components/desktop/MenuBar";
import { Wallpaper } from "@/components/desktop/Wallpaper";
import { DesktopIcons } from "@/components/desktop/DesktopIcons";
import { Spotlight } from "@/components/desktop/Spotlight";
import { NotificationCenter } from "@/components/desktop/NotificationCenter";
import { Dock } from "@/components/dock/Dock";
import { WindowFrame } from "@/components/window/WindowFrame";
import { HomeApp } from "@/components/apps/HomeApp";
import { AboutApp } from "@/components/apps/AboutApp";
import { LeadsApp } from "@/components/apps/LeadsApp";
import { TeamApp } from "@/components/apps/TeamApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ResourcesApp } from "@/components/apps/ResourcesApp";
import { InternshipsApp } from "@/components/apps/InternshipsApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { RoadmapApp } from "@/components/apps/RoadmapApp";
import { CertificationsApp } from "@/components/apps/CertificationsApp";
import { FeedApp } from "@/components/apps/FeedApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { MobileOS } from "@/components/mobile/MobileOS";

type Stage = "begin" | "journey" | "desktop";

const INITIAL_WINDOWS: Record<AppId, Omit<WindowState, "zIndex" | "isOpen" | "isMinimized" | "isMaximized">> = {
  home: { id: "home", title: "AWS Student Builder Group — Overview", position: { x: 60, y: 55 }, size: { width: 920, height: 600 }, icon: "home" },
  about: { id: "about", title: "About SBG — Manifesto & Tracks", position: { x: 80, y: 70 }, size: { width: 880, height: 580 }, icon: "info" },
  leads: { id: "leads", title: "Finder — Leads Directory", position: { x: 100, y: 85 }, size: { width: 880, height: 560 }, icon: "user-check" },
  team: { id: "team", title: "Finder — /Team Hierarchy", position: { x: 115, y: 95 }, size: { width: 860, height: 550 }, icon: "users" },
  projects: { id: "projects", title: "Builder Lab — 50 Project Ideas", position: { x: 90, y: 75 }, size: { width: 940, height: 610 }, icon: "folder-git2" },
  roadmap: { id: "roadmap", title: "Cloud Roadmap — Beginner to Advanced", position: { x: 100, y: 70 }, size: { width: 920, height: 600 }, icon: "compass" },
  certifications: { id: "certifications", title: "100 Free Cloud Certifications & Badges", position: { x: 110, y: 80 }, size: { width: 930, height: 610 }, icon: "award" },
  resources: { id: "resources", title: "Cloud Library — Whitepapers & Specs", position: { x: 120, y: 90 }, size: { width: 890, height: 570 }, icon: "book-open" },
  internships: { id: "internships", title: "Internships & Builder Cohorts", position: { x: 125, y: 95 }, size: { width: 860, height: 560 }, icon: "briefcase" },
  terminal: { id: "terminal", title: "Terminal — zsh (~/aws-sbg)", position: { x: 140, y: 110 }, size: { width: 780, height: 490 }, icon: "terminal" },
  feed: { id: "feed", title: "Build Feed — Real-Time Activity Log", position: { x: 130, y: 100 }, size: { width: 820, height: 540 }, icon: "activity" },
  contact: { id: "contact", title: "Join Us & Official Community Portals", position: { x: 115, y: 90 }, size: { width: 860, height: 570 }, icon: "mail" },
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "notif-1", title: "Welcome to Builder OS", message: "Desktop environment initialized. Explore applications from the dock or press ⌘K.", time: "Just now", read: false },
  { id: "notif-2", title: "Cloud Roadmap Loaded", message: "Beginner to Advanced cloud engineering curriculum available.", time: "1m ago", read: false, appId: "roadmap" },
  { id: "notif-3", title: "Builder Lab Synced", message: "50 AWS project ideas and architectural blueprints loaded.", time: "2m ago", read: false, appId: "projects" },
];

export default function DesktopPage() {
  const [stage, setStage] = useState<Stage>("begin");
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    (Object.keys(INITIAL_WINDOWS) as AppId[]).forEach((key) => {
      initial[key] = {
        ...INITIAL_WINDOWS[key],
        isOpen: false, // Start clean with no windows automatically popping up
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [highestZ, setHighestZ] = useState(15);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [wallpaperTheme, setWallpaperTheme] = useState<"sky" | "azure" | "midnight">("sky");

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for Spotlight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "t") {
        e.preventDefault();
        openApp("terminal");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
      case "internships":
        return <InternshipsApp />;
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

  // Stage 1: Initial Click to Begin Screen
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

  // Stage 3 (Mobile Mode): iOS-adapted interface
  if (isMobile) {
    return <MobileOS onOpenApp={openApp} renderAppContent={renderAppContent} />;
  }

  // Stage 3 (Desktop Mode): Full macOS Cloud OS
  const openAppList = (Object.keys(windows) as AppId[]).filter(
    (id) => windows[id].isOpen
  );

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-500 ${
        wallpaperTheme === "midnight" ? "bg-[#070b14]" : "bg-[#e0f2fe]"
      }`}
    >
      {/* Dynamic Animated Cloud Wallpaper & Grid */}
      <Wallpaper theme={wallpaperTheme} />

      {/* Top macOS Menu Bar */}
      <MenuBar
        activeAppId={activeAppId}
        onOpenApp={openApp}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onToggleNotifications={() => setNotificationsOpen((prev) => !prev)}
        unreadNotifications={notifications.filter((n) => !n.read).length}
        currentTheme={wallpaperTheme}
        onSelectTheme={setWallpaperTheme}
      />

      {/* Desktop App Shortcuts */}
      <DesktopIcons onOpenApp={openApp} />

      {/* Windows Layer */}
      <main className="relative z-20 w-full h-[calc(100vh-32px)] overflow-hidden pointer-events-none">
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

      {/* Bottom macOS Glass Dock */}
      <Dock
        openApps={openAppList}
        activeAppId={activeAppId}
        onAppClick={(id) => {
          if (windows[id]?.isOpen && !windows[id]?.isMinimized && activeAppId === id) {
            minimizeWindow(id);
          } else {
            openApp(id);
          }
        }}
      />

      {/* Spotlight Search Modal */}
      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={openApp}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onOpenApp={openApp}
        notifications={notifications}
        onClear={() => setNotifications([])}
      />
    </div>
  );
}
