"use client";

import React from "react";
import { AppId, NotificationItem } from "@/types/os";
import { BuilderChip } from "@/components/ui/Logo";
import { Bell, CheckCircle2, Cloud, Sparkles, X } from "lucide-react";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  notifications: NotificationItem[];
  onClear: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  notifications,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-45 bg-transparent"
      onClick={onClose}
    >
      <div
        className="absolute top-9 right-3 w-80 max-w-[calc(100vw-24px)] rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-2xl shadow-2xl p-4 text-slate-200 z-50 animate-in slide-in-from-top-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold tracking-wide text-slate-100">
              System Notifications
            </span>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={onClear}
                className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-3 space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.appId) onOpenApp(item.appId);
                  onClose();
                }}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-sky-500/40 hover:bg-slate-800/40 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <BuilderChip size={14} variant="blue" />
                    <span className="text-[11px] font-medium text-slate-200">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.message}
                </p>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No new notifications
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Cloud Telemetry: Healthy
          </span>
          <span>ap-south-iitj</span>
        </div>
      </div>
    </div>
  );
};
