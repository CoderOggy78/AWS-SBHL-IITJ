"use client";

import React from "react";
import {
  Code,
  Users,
  Share2,
  ShieldCheck,
  ChevronDown,
  Plus,
  Mic,
  Folder,
  GitBranch,
  Laptop,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const TeamFeatureShowcases: React.FC<{ onOpenJoinModal: () => void }> = ({
  onOpenJoinModal,
}) => {
  return (
    <section className="py-20 bg-[#030712] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Showcase 1: Technical Team */}
        <div id="team-technical" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-28">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10">
              <Code className="w-3.5 h-3.5 text-slate-400" />
              Technical Team
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Technical Team
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-200">
                Lead: <span className="text-white font-bold">Bishal Saha</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Core Team: Satyam Mishra • Aryan Vishwakarma • Yash Gogawale • Tanmay Damre
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Leading core cloud engineering initiatives at IIT Jodhpur. We architect serverless
              microservices, build generative AI pipelines with Amazon Bedrock, and run hands-on
              code reviews and developer cohorts.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="ag-btn-light text-sm px-5 py-2.5"
              >
                Join Technical Track
              </button>
              <a
                href="#directory"
                className="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Crafted Technical Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-6 sm:p-8 bg-[#080d1a] border border-white/10">
              {/* Clean Mock Interface */}
              <div className="bg-[#050914] rounded-xl border border-white/10 p-6 space-y-4 text-slate-200">
                {/* Top selector */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Folder className="w-4 h-4 text-slate-400" />
                  <span className="text-white font-mono">aws-bedrock-rag-agent</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {/* Input prompt area */}
                <div className="rounded-lg border border-white/10 bg-[#030712] p-3.5 space-y-3">
                  <div className="text-xs text-slate-400">
                    Ask anything, @ to mention, / for cloud actions
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-slate-200 font-medium">
                      <Plus className="w-3.5 h-3.5 text-slate-400" />
                      <span>Amazon Bedrock (Claude 3.7)</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </div>
                    <Mic className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                {/* Mock dropdown status pills */}
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                    <GitBranch className="w-3 h-3 text-slate-400" />
                    <span>main</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                    <Laptop className="w-3 h-3 text-slate-400" />
                    <span>ap-south-1 (Mumbai)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 2: Community Management Team */}
        <div id="team-community" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-28">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              Community Management Team
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Community Management
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-200">
                Lead: <span className="text-white font-bold">Quazi Arqam</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Core Team: Harshpreet Singh • Lakshya Gupta • Anita Kumari • Sadaf Naaz
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Managing community operations, onboarding student cohorts, facilitating peer learning
              study groups, and connecting IIT Jodhpur builders with industry cloud mentors.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="ag-btn-light text-sm px-5 py-2.5"
              >
                Join Student Cohorts
              </button>
              <a
                href="#directory"
                className="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Crafted Cohort Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-6 sm:p-8 bg-[#080d1a] border border-white/10">
              <div className="bg-[#050914] rounded-xl border border-white/10 p-6 space-y-4 text-slate-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Active Cohort (2026-27)</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono text-[10px] border border-white/10">
                      Live
                    </span>
                  </div>
                  <span>IIT Jodhpur</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-[#030712] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-200">AWS Cloud Practitioner Study Circle</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">Free Tier</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#030712] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-200">Hands-on Bedrock AI Immersion Labs</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">Hands-On</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#030712] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-200">Peer Architecture Review Sessions</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">Mentored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 3: Social Media Team */}
        <div id="team-social" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-28">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10">
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              Social Media Team
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Social Media & Branding
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-200">
                Lead: <span className="text-white font-bold">Rahul Wakhale</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Core Team: Kavita Dixit • Shantanu Joshi • Tanuj Khatkar • Lipika Parida
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Directing creative vision, branding campaigns, technical infographics, student
              spotlights, and public communications across official digital channels.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="ag-btn-light text-sm px-5 py-2.5"
              >
                Connect With Us
              </button>
              <a
                href="#directory"
                className="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Crafted Brand Strategy Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-6 sm:p-8 bg-[#080d1a] border border-white/10">
              <div className="bg-[#050914] rounded-xl border border-white/10 p-6 space-y-4 text-slate-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-slate-400">
                  <span className="font-semibold text-white">Brand Strategy & Media</span>
                  <span>IIT Jodhpur</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-[#030712] border border-white/10">
                    <div className="text-xs font-bold text-white">Visual Identity</div>
                    <div className="text-[11px] text-slate-400 mt-1">Flyers, infographics & slides</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#030712] border border-white/10">
                    <div className="text-xs font-bold text-white">Student Stories</div>
                    <div className="text-[11px] text-slate-400 mt-1">Spotlights on campus builders</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300 font-mono">
                  Official Channels: LinkedIn • WhatsApp • Meetup Chapter
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 4: Leadership & Advisory */}
        <div id="team-leadership" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-28">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Leadership & Advisory
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Leadership & Advisory
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-200">
                Club Lead & Organizer: <span className="text-white font-bold">Vishwanath Barve</span>
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Club Co-Ordinator: <span className="text-white font-bold">Ashwani Dwivedi Sir</span>
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Providing strategic vision, institutional alignment with IIT Jodhpur academic councils,
              and mentorship for student project leads to ensure execution quality and industry relevance.
            </p>

            <div className="pt-2">
              <a
                href="#directory"
                className="ag-btn-light text-sm px-5 py-2.5 inline-flex items-center gap-2"
              >
                <span>Inspect All 17 Members in Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Crafted Leadership Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-6 sm:p-8 bg-[#080d1a] border border-white/10">
              <div className="bg-[#050914] rounded-xl border border-white/10 p-6 space-y-4 text-slate-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-slate-400">
                  <span className="font-semibold text-white">Executive Mandate</span>
                  <span>Session 2026-27</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Directing student cloud architecture curriculum and milestone roadmap</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Connecting IIT Jodhpur builders with AWS industry mentors and alumni</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Institutional coordination ensuring adherence to campus technical standards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
