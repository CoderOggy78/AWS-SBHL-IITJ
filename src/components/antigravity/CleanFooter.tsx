"use client";

import React from "react";
import { BuilderChip } from "@/components/ui/Logo";
import { SOCIAL_LINKS } from "@/config/socials";
import { ExternalLink, ArrowUp, MessageCircle, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

export const CleanFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="about" className="border-t border-cyan-500/15 bg-[#02050c] text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25">
                <BuilderChip size={28} variant="cyan" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight">
                  AWS Student Builder Group IITJ
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  IIT Jodhpur Chapter • 2026-27
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering student developers at Indian Institute of Technology Jodhpur to build,
              experiment, and deploy in the cloud-first era on Amazon Web Services.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-all shadow-sm"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: SBG Teams */}
          <div>
            <div className="font-mono text-white text-xs uppercase font-semibold mb-3 tracking-wider">
              SBG Teams
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#team-technical" className="hover:text-cyan-300 transition-colors">
                  Technical Team (Lead: Bishal Saha)
                </a>
              </li>
              <li>
                <a href="#team-community" className="hover:text-cyan-300 transition-colors">
                  Community (Lead: Quazi Arqam)
                </a>
              </li>
              <li>
                <a href="#team-social" className="hover:text-cyan-300 transition-colors">
                  Social Media (Lead: Rahul Wakhale)
                </a>
              </li>
              <li>
                <a href="#team-leadership" className="hover:text-cyan-300 transition-colors">
                  Leadership & Advisory
                </a>
              </li>
              <li>
                <a href="#directory" className="hover:text-cyan-300 transition-colors">
                  All 17 Members Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Community Links */}
          <div>
            <div className="font-mono text-white text-xs uppercase font-semibold mb-3 tracking-wider">
              Resources & Institute
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#lectures" className="hover:text-cyan-300 transition-colors font-medium text-cyan-400">
                  Free AWS Video Lectures
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-cyan-300 transition-colors">
                  Curriculum Roadmap
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-300 transition-colors">
                  Research Papers & CLI Labs
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-cyan-300 transition-colors">
                  100 Free Badges & Certs
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.iitj}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <span>IIT Jodhpur Official</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.meetup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <span>Official Meetup Chapter</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 AWS Student Builder Group IITJ • Indian Institute of Technology Jodhpur.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-all flex items-center gap-1 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
