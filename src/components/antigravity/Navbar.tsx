"use client";

import React, { useState, useEffect } from "react";
import { BuilderChip } from "@/components/ui/Logo";
import {
  ChevronDown,
  Terminal,
  Layers,
  Award,
  Compass,
  Users,
  ShieldCheck,
  Code,
  Share2,
  BookOpen,
  Activity,
  Calendar,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Rocket,
} from "lucide-react";

interface NavbarProps {
  onLaunchOS: () => void;
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchOS, onOpenJoinModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDropdowns = () => setActiveDropdown(null);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050b14]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative flex items-center justify-center p-1 rounded-xl bg-white/5 border border-white/10 group-hover:border-sky-500/40 transition-colors">
            <BuilderChip size={28} variant="purple" glow />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-300 transition-colors">
                AWS Student Builders
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30">
                IIT Jodhpur
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Chapter Guild • 2026-27
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Dropdown 1: Platform & Blueprints */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("products")}
            onMouseLeave={closeDropdowns}
          >
            <button
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeDropdown === "products"
                  ? "text-white bg-white/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Platform
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "products" ? "rotate-180 text-sky-400" : ""
                }`}
              />
            </button>

            {activeDropdown === "products" && (
              <div className="absolute top-full left-0 mt-2 w-84 p-3 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-mono font-semibold uppercase text-slate-400 px-3 py-1.5">
                  Cloud Hubs & Portals
                </div>
                <a
                  href="#blueprints"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-sky-300">
                      Builder Blueprints
                    </div>
                    <div className="text-xs text-slate-400">
                      50+ production architectures on AWS
                    </div>
                  </div>
                </a>

                <a
                  href="#roadmap"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-purple-300">
                      Engineering Roadmap
                    </div>
                    <div className="text-xs text-slate-400">
                      Zero-to-Hero cloud milestone curriculum
                    </div>
                  </div>
                </a>

                <a
                  href="#certifications"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-amber-300">
                      100 Free Badges & Certs
                    </div>
                    <div className="text-xs text-slate-400">
                      AWS Educate, practitioner & vouchers
                    </div>
                  </div>
                </a>

                <a
                  href="#terminal"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-emerald-300">
                      Interactive AWS Terminal
                    </div>
                    <div className="text-xs text-slate-400">
                      Live in-browser AWS CLI sandbox
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Dropdown 2: Team Directory */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("teams")}
            onMouseLeave={closeDropdowns}
          >
            <button
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeDropdown === "teams"
                  ? "text-white bg-white/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Guild Teams
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "teams" ? "rotate-180 text-sky-400" : ""
                }`}
              />
            </button>

            {activeDropdown === "teams" && (
              <div className="absolute top-full left-0 mt-2 w-84 p-3 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-mono font-semibold uppercase text-slate-400 px-3 py-1.5">
                  Organizing Cohorts
                </div>
                <a
                  href="#team"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-amber-300">
                      Leadership & Advisory
                    </div>
                    <div className="text-xs text-slate-400">
                      Lead: Vishwanath Barve • Coordinator: Ashwani Dwivedi Sir
                    </div>
                  </div>
                </a>

                <a
                  href="#team"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-sky-300">
                      Community Management Team
                    </div>
                    <div className="text-xs text-slate-400">
                      Lead: Quazi Arqam • Member cohorts & outreach
                    </div>
                  </div>
                </a>

                <a
                  href="#team"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-emerald-300">
                      Technical Team
                    </div>
                    <div className="text-xs text-slate-400">
                      Lead: Bishal Saha • Architectures & builder labs
                    </div>
                  </div>
                </a>

                <a
                  href="#team"
                  onClick={closeDropdowns}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-purple-300">
                      Social Media Team
                    </div>
                    <div className="text-xs text-slate-400">
                      Lead: Rahul • Branding, campaigns & visual stories
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Simple Link: Use Cases */}
          <a
            href="#use-cases"
            className="px-3.5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Use Cases
          </a>

          {/* Simple Link: Activity & Events */}
          <a
            href="#events"
            className="px-3.5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Activity & Events
          </a>

          {/* Simple Link: Resources */}
          <a
            href="#resources"
            className="px-3.5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Resources
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Antigravity Signature Rocket Link: Launch Cloud OS / Remote Control */}
          <button
            onClick={onLaunchOS}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-medium text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-sky-500/40 transition-all cursor-pointer group"
            title="Launch interactive Windows XP Luna Cloud OS simulation"
          >
            <span className="text-base group-hover:scale-110 transition-transform">🚀</span>
            <span>Launch Cloud OS</span>
          </button>

          {/* Antigravity Primary CTA Pill Button */}
          <button
            onClick={onOpenJoinModal}
            className="ag-button ag-button-primary text-xs sm:text-sm font-medium px-4 sm:px-5 py-2"
          >
            <span>Join Guild</span>
            <Sparkles className="w-3.5 h-3.5 ml-1.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#050b14]/98 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <a
              href="#blueprints"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Blueprints</span>
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>Team Roster</span>
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Roadmap</span>
            </a>
            <a
              href="#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Free Badges</span>
            </a>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchOS();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <span>🚀 Launch Interactive Cloud OS</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-500 text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <span>Join Guild Community (Discord & WhatsApp)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
