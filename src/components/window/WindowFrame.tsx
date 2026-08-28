"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppId, WindowState } from "@/types/os";
import { Minus, Square, X, Maximize2 } from "lucide-react";

interface WindowFrameProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
}

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

  // Update if external state resets position
  useEffect(() => {
    setPosition(windowState.position);
  }, [windowState.position]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only drag from title bar
    if ((e.target as HTMLElement).closest(".window-control-btn")) return;

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

      const newX = Math.max(10, Math.min(window.innerWidth - 300, dragStartRef.current.winX + dx));
      const newY = Math.max(36, Math.min(window.innerHeight - 100, dragStartRef.current.winY + dy));

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

  const style: React.CSSProperties = isMax
    ? {
        position: "fixed",
        top: "32px",
        left: "0px",
        width: "100vw",
        height: "calc(100vh - 32px - 72px)",
        zIndex: windowState.zIndex,
      }
    : {
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "calc(100vh - 120px)",
        zIndex: windowState.zIndex,
      };

  return (
    <div
      style={style}
      onClick={onFocus}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col backdrop-blur-2xl ${
        isActive
          ? "border-sky-400/50 bg-slate-950/90 shadow-[0_24px_70px_rgba(2,132,199,0.3)] ring-1 ring-sky-400/30"
          : "border-slate-800/90 bg-slate-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      }`}
    >
      {/* Title bar / Header */}
      <div
        onMouseDown={handleMouseDown}
        className={`h-10 px-4 flex items-center justify-between select-none cursor-grab active:cursor-grabbing border-b ${
          isActive
            ? "border-slate-800 bg-slate-900/80"
            : "border-slate-900 bg-slate-950/60"
        }`}
      >
        {/* macOS Traffic Lights - Comfortably Sized for Easy Clicking */}
        <div className="flex items-center gap-2.5 group/lights py-1">
          {/* Close (Red) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close window"
            title="Close"
            className="window-control-btn w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center text-black/80 focus:outline-none transition-all shadow-sm active:scale-90"
          >
            <X className="w-2.5 h-2.5 opacity-0 group-hover/lights:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Minimize (Yellow) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize window"
            title="Minimize"
            className="window-control-btn w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center text-black/80 focus:outline-none transition-all shadow-sm active:scale-90"
          >
            <Minus className="w-2.5 h-2.5 opacity-0 group-hover/lights:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Maximize (Green) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label="Maximize window"
            title="Maximize"
            className="window-control-btn w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center text-black/80 focus:outline-none transition-all shadow-sm active:scale-90"
          >
            <Maximize2 className="w-2 h-2 opacity-0 group-hover/lights:opacity-100 transition-opacity stroke-[2.5]" />
          </button>
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300 pointer-events-none truncate max-w-[65%]">
          <span>{windowState.title}</span>
        </div>

        {/* Right side spacer / indicator */}
        <div className="w-12 flex justify-end">
          <span className="text-[10px] font-mono text-slate-600 uppercase">
            IITJ
          </span>
        </div>
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-auto bg-slate-950/40 text-slate-100">
        {children}
      </div>
    </div>
  );
};
