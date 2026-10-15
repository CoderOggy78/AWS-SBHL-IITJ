"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/config/socials";
import { Flame, Skull, Ghost, Heart, ArrowUp } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

export const HalloweenFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-neutral-950 border-t border-neutral-900 text-neutral-400 font-sans overflow-hidden pt-16 pb-12">
      {/* Background Ambience: Realistic Graveyard Zombie Hand image + Red Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25 select-none">
        <Image
          src="/halloween/graveyard-zombie-hand.jpg"
          alt="Graveyard Zombie Hand"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/95" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-red-950/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center p-1">
                <Image
                  src="/brand/aws-sbg-chip-purple.png"
                  alt="AWS SBG Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  AWS SBG IIT JODHPUR
                </span>
                <p className="text-[11px] text-orange-400 font-mono">
                  Nightmare Abyss Edition • Halloween 2026
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              The official AWS Student Builders Group student chapter at Indian Institute of
              Technology Jodhpur. Driving cloud architectures, serverless prototypes, and student developer cohorts.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => horrorAudio.playThunder()}
                className="px-3 py-1.5 rounded-full bg-neutral-900 border border-red-900 hover:border-red-500 text-red-400 hover:text-red-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Skull className="w-3.5 h-3.5" />
                <span>Summon Thunder</span>
              </button>
              <button
                onClick={() => horrorAudio.playWitchCackle()}
                className="px-3 py-1.5 rounded-full bg-neutral-900 border border-emerald-900 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Ghost className="w-3.5 h-3.5" />
                <span>Witch Cackle</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Haunted Realms
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#curriculum-roadmap" className="hover:text-orange-400 transition-colors">
                  Path of Shadows (Curriculum)
                </a>
              </li>
              <li>
                <a href="#video-library" className="hover:text-orange-400 transition-colors">
                  50 Video Masterclasses
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-orange-400 transition-colors">
                  100 Free AWS Badges
                </a>
              </li>
            </ul>
          </div>

          {/* Council & Chapter */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Guild Chapter
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#team-directory" className="hover:text-orange-400 transition-colors">
                  Guild Council (Team Roster)
                </a>
              </li>
              <li>
                <span className="text-neutral-500">IIT Jodhpur, Rajasthan, India</span>
              </li>
              <li>
                <span className="text-neutral-500">Department of Computer Science</span>
              </li>
            </ul>
          </div>

          {/* Official Social Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Summon Us
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-mono">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                LinkedIn Community
              </a>
              <a
                href={SOCIAL_LINKS.meetup}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                Meetup Pro Chapter
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                WhatsApp Guild Chat
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="hover:text-orange-400 transition-colors"
              >
                Email Contact
              </a>
              <a
                href={SOCIAL_LINKS.iitj}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                IIT Jodhpur Portal
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} AWS Student Builders Group, IIT Jodhpur. Happy Halloween! 🎃</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
