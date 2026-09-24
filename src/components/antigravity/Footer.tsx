"use client";

import React from "react";
import { BuilderChip } from "@/components/ui/Logo";
import { SOCIAL_LINKS } from "@/config/socials";
import {
  ExternalLink,
  MessageCircle,
  Mail,
  ArrowUp,
  Heart,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/BrandIcons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#030712] text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BuilderChip size={32} variant="purple" glow />
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight">
                  AWS Student Builders Guild
                </span>
                <span className="text-[11px] font-mono text-sky-400">
                  IIT Jodhpur Chapter • 2026-27
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering student developers to innovate, architect, and deploy production-grade
              cloud solutions on Amazon Web Services.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/aws-sbg-iitj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div>
            <div className="font-mono text-white text-xs uppercase font-semibold mb-4 tracking-wider">
              Platform
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#blueprints" className="hover:text-white transition-colors">
                  Builder Blueprints
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-white transition-colors">
                  Engineering Roadmap
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-white transition-colors">
                  Free Badges & Certs
                </a>
              </li>
              <li>
                <a href="#terminal" className="hover:text-white transition-colors">
                  AWS Shell Sandbox
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-white transition-colors">
                  Track Personas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Guild Teams */}
          <div>
            <div className="font-mono text-white text-xs uppercase font-semibold mb-4 tracking-wider">
              Guild Teams
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Leadership & Advisory
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Community Management
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Technical Team
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Social Media Team
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Institute */}
          <div>
            <div className="font-mono text-white text-xs uppercase font-semibold mb-4 tracking-wider">
              Institute & Links
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={SOCIAL_LINKS.iitj}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>IIT Jodhpur</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.meetup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Meetup Chapter</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://aws.amazon.com/developer/community/students/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>AWS Student Hub</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://explore.skillbuilder.aws/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>AWS Skill Builder</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 AWS Student Builders Guild • Indian Institute of Technology Jodhpur.
          </div>

          <div className="flex items-center gap-4">
            <span>Built with Next.js 16 & Antigravity Aesthetics</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1"
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
