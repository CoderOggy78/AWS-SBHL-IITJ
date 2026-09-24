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
    <footer id="about" className="border-t border-neutral-200 bg-white text-neutral-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <BuilderChip size={30} variant="purple" />
              <div className="flex flex-col">
                <span className="font-bold text-neutral-950 text-base tracking-tight">
                  AWS Student Builder Group IITJ
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  IIT Jodhpur Chapter • 2026-27
                </span>
              </div>
            </div>
            <p className="text-neutral-600 text-xs leading-relaxed max-w-sm">
              Empowering student developers at Indian Institute of Technology Jodhpur to build,
              experiment, and deploy in the cloud-first era on Amazon Web Services.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: SBG Teams */}
          <div>
            <div className="font-mono text-neutral-900 text-xs uppercase font-semibold mb-3 tracking-wider">
              SBG Teams
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a href="#team-technical" className="hover:text-black transition-colors">
                  Technical Team (Lead: Bishal Saha)
                </a>
              </li>
              <li>
                <a href="#team-community" className="hover:text-black transition-colors">
                  Community (Lead: Quazi Arqam)
                </a>
              </li>
              <li>
                <a href="#team-social" className="hover:text-black transition-colors">
                  Social Media (Lead: Rahul)
                </a>
              </li>
              <li>
                <a href="#team-leadership" className="hover:text-black transition-colors">
                  Leadership & Advisory
                </a>
              </li>
              <li>
                <a href="#directory" className="hover:text-black transition-colors">
                  All 17 Members Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Community Links */}
          <div>
            <div className="font-mono text-neutral-900 text-xs uppercase font-semibold mb-3 tracking-wider">
              Resources & Institute
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a href="#lectures" className="hover:text-black transition-colors font-medium text-sky-700">
                  Free AWS Video Lectures
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-black transition-colors">
                  Curriculum Roadmap
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-black transition-colors">
                  100 Free Badges & Certs
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.iitj}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors flex items-center gap-1"
                >
                  <span>IIT Jodhpur Official</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.meetup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors flex items-center gap-1"
                >
                  <span>Official Meetup Chapter</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            © 2026 AWS Student Builder Group IITJ • Indian Institute of Technology Jodhpur.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
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
