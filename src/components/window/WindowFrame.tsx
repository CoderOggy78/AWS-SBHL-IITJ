"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppId, WindowState } from "@/types/os";
import {
  Minus,
  Square,
  Copy,
  X,
  Home,
  Info,
  UserCheck,
  Users,
  FolderGit2,
  Compass,
  Award,
  BookOpen,
  Briefcase,
  Terminal,
  Activity,
  Mail,
} from "lucide-react";

interface WindowFrameProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
}

const APP_ICONS: Record<AppId, React.ElementType> = {
  home: Home,
  about: Info,
  leads: UserCheck,
  team: Users,
  projects: FolderGit2,
  roadmap: Compass,
  certifications: Award,
  resources: BookOpen,
  terminal: Terminal,
  feed: Activity,
  contact: Mail,
};

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
}) => {
  const [position, setPosition] = useState(windowState.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  useEffect(() => {
    setPosition(windowState.position);
  }, [windowState.position]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".xp-win-btn")) return;

    onFocus();
    if (windowState.isMaximized) return;

    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: position.x,
      winY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const newX = Math.max(0, Math.min(window.innerWidth - 200, dragStartRef.current.winX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.winY + dy));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isMax = windowState.isMaximized;
  const AppIconComponent = APP_ICONS[windowState.id] || FolderGit2;

  const style: React.CSSProperties = isMax
    ? {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "calc(100vh - 30px)", // 30px for XP Taskbar
        zIndex: windowState.zIndex,
        borderRadius: "0px",
      }
    : {
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        maxWidth: "calc(100vw - 16px)",
        maxHeight: "calc(100vh - 46px)",
        zIndex: windowState.zIndex,
      };

  return (
    <div
      style={style}
      onClick={onFocus}
      className={`flex flex-col shadow-[0_12px_32px_rgba(0,0,0,0.6)] ${
        isMax ? "border-0" : "rounded-t-[8px] border-[3px]"
      } ${
        isActive
          ? "border-[#0055ea] ring-1 ring-[#003882]"
          : "border-[#7a96df] opacity-95"
      }`}
    >
      {/* Windows XP Luna Blue Glossy Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className={`h-[28px] px-2 flex items-center justify-between select-none cursor-default ${
          isMax ? "" : "rounded-t-[5px]"
        } ${
          isActive
            ? "bg-gradient-to-r from-[#0058ee] via-[#267df8] to-[#0050d8] text-white shadow-[inset_0_1px_rgba(255,255,255,0.6)]"
            : "bg-gradient-to-r from-[#759cf6] via-[#8baeff] to-[#7398f0] text-slate-200"
        }`}
      >
        {/* Left Side: Icon + Title */}
        <div className="flex items-center gap-1.5 min-w-0 pr-2 pointer-events-none">
          <div className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0">
            <AppIconComponent className="w-3.5 h-3.5 text-white drop-shadow-sm" />
          </div>
          <span
            className="text-xs font-bold tracking-tight truncate drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]"
            style={{ textShadow: "1px 1px 1px #002266" }}
          >
            {windowState.title}
          </span>
        </div>

        {/* Right Side: Iconic 3D Luna XP Window Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize"
            title="Minimize"
            className="xp-win-btn w-[21px] h-[21px] rounded-[3px] bg-[#0050d8] hover:brightness-110 active:brightness-90 border border-white/80 shadow-[inset_1px_1px_#8bb8ff,inset_-1px_-1px_#002868] flex items-center justify-center text-white focus:outline-none"
          >
            <Minus className="w-3 h-3 stroke-[2.5]" />
          </button>

          {/* Maximize / Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label={isMax ? "Restore" : "Maximize"}
            title={isMax ? "Restore" : "Maximize"}
            className="xp-win-btn w-[21px] h-[21px] rounded-[3px] bg-[#0050d8] hover:brightness-110 active:brightness-90 border border-white/80 shadow-[inset_1px_1px_#8bb8ff,inset_-1px_-1px_#002868] flex items-center justify-center text-white focus:outline-none"
          >
            {isMax ? (
              <Copy className="w-2.5 h-2.5 stroke-[2] -rotate-90" />
            ) : (
              <Square className="w-2.5 h-2.5 stroke-[2]" />
            )}
          </button>

          {/* Close Button (Iconic Crimson Red) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            title="Close"
            className="xp-win-btn w-[21px] h-[21px] rounded-[3px] bg-[#d13b19] hover:bg-[#e04322] active:bg-[#b02e12] border border-white/90 shadow-[inset_1px_1px_#ff9580,inset_-1px_-1px_#6b1502] flex items-center justify-center text-white focus:outline-none ml-0.5"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-auto bg-[#080f1d] text-slate-100 flex flex-col border-t border-[#003882]">
        {children}
      </div>
    </div>
  );
};
