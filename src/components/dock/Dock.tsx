"use client";

import React, { useState } from "react";
import { AppId } from "@/types/os";
import { SOCIAL_LINKS } from "@/config/socials";
import {
  Home,
  Info,
  UserCheck,
  Users,
  FolderGit2,
  Calendar,
  BookOpen,
  Briefcase,
  Mail,
  Terminal,
  MessageCircle,
  Radio,
  Compass,
  Award,
  Cloud,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

interface DockProps {
  openApps: AppId[];
  activeAppId: AppId | null;
  onAppClick: (id: AppId) => void;
}

interface DockItem {
  id: AppId | "linkedin" | "whatsapp" | "meetup" | "builder-center";
  label: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  isExternal?: boolean;
  externalUrl?: string;
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    gradient: "from-sky-500 to-blue-600",
    iconColor: "text-white",
  },
  {
    id: "about",
    label: "About",
    icon: Info,
    gradient: "from-blue-600 to-indigo-600",
    iconColor: "text-white",
  },
  {
    id: "leads",
    label: "Leads Directory",
    icon: UserCheck,
    gradient: "from-purple-500 to-violet-600",
    iconColor: "text-white",
  },
  {
    id: "team",
    label: "Team Directory",
    icon: Users,
    gradient: "from-indigo-500 to-purple-600",
    iconColor: "text-white",
  },
  {
    id: "projects",
    label: "Builder Lab",
    icon: FolderGit2,
    gradient: "from-cyan-500 to-sky-600",
    iconColor: "text-white",
  },
  {
    id: "roadmap",
    label: "Cloud Roadmap",
    icon: Compass,
    gradient: "from-emerald-500 to-teal-600",
    iconColor: "text-white",
  },
  {
    id: "certifications",
    label: "Free Certifications",
    icon: Award,
    gradient: "from-amber-500 to-orange-600",
    iconColor: "text-white",
  },

  {
    id: "resources",
    label: "Cloud Library",
    icon: BookOpen,
    gradient: "from-amber-500 to-orange-600",
    iconColor: "text-white",
  },
  {
    id: "contact",
    label: "Join & Contact",
    icon: Mail,
    gradient: "from-teal-500 to-cyan-600",
    iconColor: "text-white",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: Terminal,
    gradient: "from-slate-800 to-slate-950",
    iconColor: "text-emerald-400",
  },
  // Separator & External Socials
  {
    id: "builder-center",
    label: "AWS Builder Center",
    icon: Cloud,
    gradient: "from-purple-500 to-indigo-600",
    iconColor: "text-white",
    isExternal: true,
    externalUrl: "https://builder.aws.com/",
  },
  {
    id: "linkedin",
    label: "LinkedIn Page",
    icon: LinkedinIcon,
    gradient: "from-blue-600 to-blue-800",
    iconColor: "text-white",
    isExternal: true,
    externalUrl: SOCIAL_LINKS.linkedin,
  },
  {
    id: "meetup",
    label: "Meetup Group",
    icon: Radio,
    gradient: "from-red-500 to-rose-600",
    iconColor: "text-white",
    isExternal: true,
    externalUrl: SOCIAL_LINKS.meetup,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Community",
    icon: MessageCircle,
    gradient: "from-emerald-600 to-green-700",
    iconColor: "text-white",
    isExternal: true,
    externalUrl: SOCIAL_LINKS.whatsapp,
  },
];

export const Dock: React.FC<DockProps> = ({
  openApps,
  activeAppId,
  onAppClick,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (hoveredIdx === null) return 1;
    const dist = Math.abs(index - hoveredIdx);
    if (dist === 0) return 1.35;
    if (dist === 1) return 1.18;
    if (dist === 2) return 1.06;
    return 1;
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto">
      <div
        className="flex items-end gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl bg-slate-900/75 backdrop-blur-2xl border border-sky-400/35 shadow-[0_16px_45px_rgba(2,132,199,0.3)] ring-1 ring-white/10"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {DOCK_ITEMS.map((item, idx) => {
          const IconComp = item.icon;
          const scale = getScale(idx);
          const isOpen = !item.isExternal && openApps.includes(item.id as AppId);
          const isActive = !item.isExternal && activeAppId === item.id;

          // Separator line before external social links
          const showSeparator = item.id === "linkedin";

          return (
            <React.Fragment key={item.id}>
              {showSeparator && (
                <div className="w-px h-8 bg-slate-700/60 mx-1 self-center" />
              )}
              <div
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                {/* macOS Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 text-[11px] font-mono text-slate-200 shadow-xl border border-slate-700/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                  {item.label}
                  {item.isExternal && " ↗"}
                </div>

                {/* Dock Icon Button */}
                <button
                  onClick={() => {
                    if (item.isExternal && item.externalUrl) {
                      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
                    } else {
                      onAppClick(item.id as AppId);
                    }
                  }}
                  style={{
                    transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 20 : 0}px)`,
                    transformOrigin: "bottom center",
                  }}
                  className="transition-transform duration-150 ease-out focus:outline-none"
                  aria-label={item.label}
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg border border-white/20 flex items-center justify-center transition-shadow ${isActive
                        ? "ring-2 ring-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                        : "hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                      }`}
                  >
                    <IconComp className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${item.iconColor}`} />
                  </div>
                </button>

                {/* Active Indicator Dot under Icon */}
                <div className="h-1.5 flex items-center justify-center mt-1">
                  {isOpen && (
                    <span
                      className={`w-1 h-1 rounded-full ${isActive ? "bg-sky-400 shadow-[0_0_6px_#38bdf8]" : "bg-slate-400"
                        }`}
                    />
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
