"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppId } from "@/types/os";
import { TEAM_MEMBERS } from "@/data/team";
import { PROJECTS_DATA } from "@/data/projects";
import { RESOURCES_DATA } from "@/data/resources";
import {
  Search,
  User,
  FolderGit2,
  BookOpen,
  Terminal,
  ArrowRight,
  Sparkles,
  X,
  FileCode,
  Globe,
  Folder,
} from "lucide-react";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  isOpen,
  onClose,
  onOpenApp,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const results: Array<{
    id: string;
    title: string;
    subtitle: string;
    appId: AppId;
    category: "Programs" | "People" | "Projects" | "Resources";
    icon: React.ElementType;
  }> = [];

  // Core Programs
  const coreApps: Array<{ id: AppId; name: string; desc: string }> = [
    { id: "home", name: "My Computer (Overview)", desc: "AWS Student Builder OS overview" },
    { id: "projects", name: "Builder Lab (50 Projects)", desc: "50 real AWS blueprints and architecture diagrams" },
    { id: "roadmap", name: "Cloud Engineering Roadmap", desc: "Foundational to Advanced milestones" },
    { id: "certifications", name: "100 Free Cloud Certifications", desc: "Free cloud badges & course catalog" },
    { id: "resources", name: "Cloud Learning Library", desc: "Whitepapers, labs and specs" },
    { id: "leads", name: "Team Hierarchy Directory", desc: "Official Core Team organizational structure" },
    { id: "terminal", name: "Command Prompt (cmd.exe)", desc: "Windows XP command shell" },
    { id: "about", name: "About AWS SBG (README.txt)", desc: "Manifesto, philosophy & tracks" },
    { id: "contact", name: "Join Us & Socials", desc: "WhatsApp, Meetup & LinkedIn links" },
  ];

  coreApps.forEach((a) => {
    if (a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)) {
      results.push({
        id: a.id,
        title: a.name,
        subtitle: a.desc,
        appId: a.id,
        category: "Programs",
        icon: FileCode,
      });
    }
  });

  // People
  TEAM_MEMBERS.forEach((m) => {
    if (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.focusAreas.some((f) => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: m.id,
        title: m.name,
        subtitle: `${m.role} • ${m.category}`,
        appId: "leads",
        category: "People",
        icon: User,
      });
    }
  });

  // Projects
  PROJECTS_DATA.forEach((p) => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.problem.toLowerCase().includes(q) ||
      p.technology.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: p.id,
        title: p.name,
        subtitle: `Project [${p.status}] • ${p.technology.slice(0, 3).join(", ")}`,
        appId: "projects",
        category: "Projects",
        icon: FolderGit2,
      });
    }
  });

  // Resources
  RESOURCES_DATA.forEach((r) => {
    if (
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: r.id,
        title: r.title,
        subtitle: `${r.category} • ${r.type}`,
        appId: "resources",
        category: "Resources",
        icon: BookOpen,
      });
    }
  });

  const displayResults = results.slice(0, 8);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, displayResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayResults.length) % Math.max(1, displayResults.length));
    } else if (e.key === "Enter" && displayResults[selectedIndex]) {
      e.preventDefault();
      onOpenApp(displayResults[selectedIndex].appId);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#ece9d8] border-2 border-[#0055ea] rounded-t-[6px] shadow-[0_12px_36px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luna Blue Search Header */}
        <div className="h-[28px] bg-gradient-to-r from-[#0058ee] via-[#267df8] to-[#0050d8] px-2.5 flex items-center justify-between text-white border-b border-[#003882]">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs drop-shadow-sm">
            <Search className="w-3.5 h-3.5" />
            <span>Search Companion</span>
          </div>
          <button
            onClick={onClose}
            className="w-[19px] h-[19px] rounded-[2px] bg-[#d13b19] hover:bg-[#e04322] border border-white/80 flex items-center justify-center text-white"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-3 bg-[#ece9d8] border-b border-[#d8d0c5] flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for programs, projects, leads, free certs..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="w-full h-8 pl-8 pr-3 bg-white border border-[#7f9db9] rounded-sm text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#316ac5]"
            />
          </div>
          <button
            onClick={() => displayResults[0] && onOpenApp(displayResults[0].appId)}
            className="px-3 h-8 bg-[#ece9d8] hover:bg-[#dedad0] border border-[#7f9db9] rounded-sm text-xs font-bold text-slate-900 shadow-sm active:shadow-inner"
          >
            Search
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 bg-white max-h-80 overflow-y-auto space-y-0.5 no-scrollbar text-xs">
          {displayResults.length > 0 ? (
            displayResults.map((item, idx) => {
              const ItemIcon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => {
                    onOpenApp(item.appId);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2 rounded-sm text-left transition-colors ${
                    isSelected
                      ? "bg-[#316ac5] text-white"
                      : "hover:bg-blue-50 text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ItemIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-[#0055ea]"}`} />
                    <div className="min-w-0">
                      <p className="font-bold text-xs truncate">{item.title}</p>
                      <p className={`text-[11px] truncate ${isSelected ? "text-sky-100" : "text-slate-500"}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 font-sans">
              No matching Windows XP records found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* XP Status Footer */}
        <div className="h-6 px-3 bg-[#ece9d8] border-t border-[#d8d0c5] flex items-center justify-between text-[11px] text-slate-600 font-sans">
          <span>{displayResults.length} item(s) found</span>
          <span>Press Enter to Open</span>
        </div>
      </div>
    </div>
  );
};
