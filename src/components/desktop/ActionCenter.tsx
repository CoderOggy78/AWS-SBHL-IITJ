"use client";

import React, { useState } from "react";
import { AppId, NotificationItem } from "@/types/os";
import {
  Volume2,
  VolumeX,
  Sliders,
  X,
  Calendar as CalendarIcon,
  Bell,
  CheckCircle2,
  HardDrive,
  Sparkles,
} from "lucide-react";

interface ActionCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  notifications: NotificationItem[];
  onClearNotifications: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  currentTheme: "sky" | "azure" | "midnight";
  onSelectTheme: (theme: "sky" | "azure" | "midnight") => void;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  notifications,
  onClearNotifications,
  soundOn,
  onToggleSound,
  currentTheme,
  onSelectTheme,
}) => {
  const [activeTab, setActiveTab] = useState<"settings" | "calendar">("settings");
  const today = new Date();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-45 bg-transparent"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-[32px] right-2 w-[360px] max-w-[calc(100vw-16px)] bg-[#ece9d8] border-2 border-[#0055ea] rounded-t-[6px] shadow-[0_8px_25px_rgba(0,0,0,0.7)] z-50 flex flex-col font-sans select-none overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-100 text-slate-900 text-xs"
      >
        {/* Windows XP Dialog Title Bar */}
        <div className="h-[26px] bg-gradient-to-r from-[#0058ee] via-[#267df8] to-[#0050d8] px-2 flex items-center justify-between text-white border-b border-[#003882]">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs drop-shadow-sm">
            <Sliders className="w-3.5 h-3.5" />
            <span>Control Panel & Notifications</span>
          </div>
          <button
            onClick={onClose}
            className="w-[18px] h-[18px] rounded-[2px] bg-[#d13b19] hover:bg-[#e04322] border border-white/80 flex items-center justify-center text-white"
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>

        {/* XP Dialog Tabs */}
        <div className="flex bg-[#d8d0c5] px-2 pt-1.5 gap-1 border-b border-[#919b9c]">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1 text-xs rounded-t font-semibold transition-colors border-t border-x ${
              activeTab === "settings"
                ? "bg-[#ece9d8] text-slate-900 border-[#919b9c] -mb-px pb-1.5"
                : "bg-[#d8d0c5] text-slate-600 hover:text-slate-900 border-transparent"
            }`}
          >
            Theme & Audio
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3 py-1 text-xs rounded-t font-semibold transition-colors border-t border-x ${
              activeTab === "calendar"
                ? "bg-[#ece9d8] text-slate-900 border-[#919b9c] -mb-px pb-1.5"
                : "bg-[#d8d0c5] text-slate-600 hover:text-slate-900 border-transparent"
            }`}
          >
            Date & Time
          </button>
        </div>

        {/* Dialog Body Content */}
        <div className="p-3 bg-[#ece9d8] space-y-3">
          {activeTab === "settings" ? (
            <>
              {/* Wallpaper Desktop Theme Selector */}
              <div className="p-2.5 rounded bg-white border border-[#7f9db9] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Desktop Theme:</span>
                  <span className="font-mono text-[11px] text-blue-700 uppercase font-semibold">{currentTheme}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => onSelectTheme("sky")}
                    className={`py-1 px-1.5 rounded text-[11px] font-sans font-semibold border transition-all ${
                      currentTheme === "sky"
                        ? "bg-[#316ac5] text-white border-[#003882] shadow-inner"
                        : "bg-[#f1efe2] text-slate-800 border-[#7f9db9] hover:bg-[#e2dfd3]"
                    }`}
                  >
                    Classic Bliss
                  </button>
                  <button
                    onClick={() => onSelectTheme("azure")}
                    className={`py-1 px-1.5 rounded text-[11px] font-sans font-semibold border transition-all ${
                      currentTheme === "azure"
                        ? "bg-[#316ac5] text-white border-[#003882] shadow-inner"
                        : "bg-[#f1efe2] text-slate-800 border-[#7f9db9] hover:bg-[#e2dfd3]"
                    }`}
                  >
                    Royale Blue
                  </button>
                  <button
                    onClick={() => onSelectTheme("midnight")}
                    className={`py-1 px-1.5 rounded text-[11px] font-sans font-semibold border transition-all ${
                      currentTheme === "midnight"
                        ? "bg-[#316ac5] text-white border-[#003882] shadow-inner"
                        : "bg-[#f1efe2] text-slate-800 border-[#7f9db9] hover:bg-[#e2dfd3]"
                    }`}
                  >
                    Night Bliss
                  </button>
                </div>
              </div>

              {/* Sound & Telemetry Toggles */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onToggleSound}
                  className="p-2 rounded bg-white border border-[#7f9db9] hover:bg-blue-50 flex items-center gap-2 text-left transition-colors"
                >
                  <div className="p-1.5 rounded bg-blue-100 text-blue-700">
                    {soundOn ? <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 leading-none">Cloud Audio</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{soundOn ? "Playing" : "Muted"}</p>
                  </div>
                </button>

                <div className="p-2 rounded bg-white border border-[#7f9db9] flex items-center gap-2 text-left">
                  <div className="p-1.5 rounded bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 leading-none">SLA Status</p>
                    <p className="text-[10px] text-emerald-600 font-mono mt-0.5">99.99% Online</p>
                  </div>
                </div>
              </div>

              {/* Notifications Area */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-0.5">
                  <span className="font-bold text-slate-800">
                    System Alerts ({notifications.length})
                  </span>
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearNotifications}
                      className="text-[11px] text-blue-700 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="p-2 rounded bg-white border border-[#7f9db9] max-h-36 overflow-y-auto space-y-1.5 no-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.appId) onOpenApp(item.appId);
                          onClose();
                        }}
                        className="p-1.5 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-blue-900 text-[11px]">{item.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-snug">{item.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-2 text-[11px] text-slate-400">No active alerts.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Classic Date & Time Calendar View */
            <div className="space-y-2">
              <div className="text-center p-2 bg-white rounded border border-[#7f9db9]">
                <p className="font-bold text-slate-900">
                  {today.toLocaleDateString([], { month: "long", year: "numeric" })}
                </p>
                <p className="text-[11px] text-blue-700 font-medium">
                  {today.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
                </p>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs p-2 bg-white rounded border border-[#7f9db9]">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={i} className="font-bold text-slate-600 text-[10px]">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const isToday = day === today.getDate();
                  return (
                    <span
                      key={day}
                      className={`py-0.5 rounded text-[11px] ${
                        isToday
                          ? "bg-[#316ac5] text-white font-bold"
                          : "text-slate-800 hover:bg-blue-100"
                      }`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* XP Dialog OK / Cancel Action Buttons */}
          <div className="flex justify-end gap-2 pt-1 border-t border-[#d8d0c5]">
            <button
              onClick={onClose}
              className="px-4 py-1 rounded bg-[#ece9d8] hover:bg-[#dedad0] border border-[#7f9db9] shadow-sm font-semibold text-slate-900 text-xs active:shadow-inner"
            >
              OK
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1 rounded bg-[#ece9d8] hover:bg-[#dedad0] border border-[#7f9db9] shadow-sm text-slate-900 text-xs active:shadow-inner"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
