"use client";

import React, { useState } from "react";
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
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const TeamFeatureShowcases: React.FC<{ onOpenJoinModal: () => void }> = ({
  onOpenJoinModal,
}) => {
  return (
    <section className="py-20 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Showcase 1: Technical Team (Matches Image 4 Layout & Style) */}
        <div id="team-technical" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-sky-50 text-sky-700 border border-sky-200">
              <Code className="w-3.5 h-3.5 text-sky-600" />
              Technical Team
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              Technical Team
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-neutral-900">
                Lead: <span className="text-sky-600 font-bold">Bishal Saha</span>
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                Core Team: Satyam Mishra • Aryan Vishwakarma • Yash Gogawale • Tanmay Damre
              </div>
            </div>

            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              Leading core cloud engineering initiatives at IIT Jodhpur. We architect serverless
              microservices, build generative AI pipelines with Amazon Bedrock, and run hands-on
              code reviews and developer cohorts.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="ag-btn-light text-sm px-6 py-2.5"
              >
                Join Technical Track
              </button>
              <a
                href="#directory"
                className="text-sm font-medium text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pastel Aura Card (Exact Image 4 Style) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[36px] p-6 sm:p-10 ag-aura-blue border border-black/5 shadow-xl shadow-sky-500/5">
              {/* Clean Mock Interface from Image 4 */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-4">
                {/* Top selector */}
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                  <Folder className="w-4 h-4 text-sky-500" />
                  <span>aws-bedrock-rag-agent</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                {/* Input prompt area like Image 4 */}
                <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-3.5 space-y-3">
                  <div className="text-xs text-neutral-400">
                    Ask anything, @ to mention, / for cloud actions
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 text-xs">
                    <div className="flex items-center gap-2 text-neutral-600 font-medium">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Amazon Bedrock (Claude 3.7)</span>
                      <ChevronDown className="w-3 h-3 text-neutral-400" />
                    </div>
                    <Mic className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                </div>

                {/* Mock dropdown status pills */}
                <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200">
                    <GitBranch className="w-3 h-3 text-neutral-500" />
                    <span>main</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200">
                    <Laptop className="w-3 h-3 text-neutral-500" />
                    <span>ap-south-1 (Mumbai)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 2: Community Management Team (Matches Image 5 Layout & Style) */}
        <div id="team-community" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-purple-50 text-purple-700 border border-purple-200">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              Community Management Team
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              Community Management
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-neutral-900">
                Lead: <span className="text-purple-600 font-bold">Quazi Arqam</span>
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                Core Team: Harshpreet Singh • Lakshya Gupta • Anita Kumari • Sadaf Naaz
              </div>
            </div>

            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              Managing community operations, onboarding student cohorts, facilitating peer learning
              study groups, and connecting IIT Jodhpur builders with industry cloud mentors.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="ag-btn-light text-sm px-6 py-2.5"
              >
                Join Student Cohorts
              </button>
              <a
                href="#directory"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pastel Aura Card (Exact Image 5 Style) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[36px] p-6 sm:p-10 ag-aura-purple border border-black/5 shadow-xl shadow-purple-500/5">
              {/* Clean Mock Interface from Image 5 */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">Active Cohort (2026-27)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                      Live
                    </span>
                  </div>
                  <span>IIT Jodhpur</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-neutral-800">AWS Cloud Practitioner Study Circle</span>
                    </div>
                    <span className="text-neutral-500 font-mono text-[11px]">Free Tier</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-neutral-800">Hands-on Bedrock AI Immersion Labs</span>
                    </div>
                    <span className="text-neutral-500 font-mono text-[11px]">Hands-On</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-neutral-800">Peer Architecture Review Sessions</span>
                    </div>
                    <span className="text-neutral-500 font-mono text-[11px]">Mentored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 3: Social Media Team */}
        <div id="team-social" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-amber-50 text-amber-700 border border-amber-200">
              <Share2 className="w-3.5 h-3.5 text-amber-600" />
              Social Media Team
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              Social Media & Branding
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-neutral-900">
                Lead: <span className="text-amber-600 font-bold">Rahul Wakhale</span>
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                Core Team: Kavita Dixit • Shantanu Joshi • Tanuj Khatkar • Lipika Parida
              </div>
            </div>

            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              Directing creative vision, branding campaigns, technical infographics, student
              spotlights, and public communications across official digital channels.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="ag-btn-light text-sm px-6 py-2.5"
              >
                Connect With Us
              </button>
              <a
                href="#directory"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pastel Aura Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[36px] p-6 sm:p-10 ag-aura-amber border border-black/5 shadow-xl shadow-amber-500/5">
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 text-xs font-mono text-neutral-500">
                  <span className="font-semibold text-neutral-900">Brand Strategy & Media</span>
                  <span>IIT Jodhpur</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <div className="text-xs font-bold text-neutral-800">Visual Identity</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Flyers, infographics & slides</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <div className="text-xs font-bold text-neutral-800">Student Stories</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Spotlights on campus builders</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  Official Channels: LinkedIn • WhatsApp • Meetup Chapter
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 4: Leadership & Advisory */}
        <div id="team-leadership" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Leadership & Advisory
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              Leadership & Advisory
            </h2>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-neutral-900">
                Club Lead & Organizer: <span className="text-emerald-700 font-bold">Vishwanath Barve</span>
              </div>
              <div className="text-sm font-semibold text-neutral-900">
                Club Co-Ordinator: <span className="text-emerald-700 font-bold">Ashwani Dwivedi Sir</span>
              </div>
            </div>

            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              Providing strategic vision, institutional alignment with IIT Jodhpur academic councils,
              and mentorship for student project leads to ensure execution quality and industry relevance.
            </p>

            <div className="pt-2">
              <a
                href="#directory"
                className="ag-btn-light text-sm px-6 py-2.5 inline-flex items-center gap-2"
              >
                <span>Inspect All 17 Members in Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pastel Aura Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[36px] p-6 sm:p-10 ag-aura-emerald border border-black/5 shadow-xl shadow-emerald-500/5">
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 text-xs font-mono text-neutral-500">
                  <span className="font-semibold text-neutral-900">Executive Mandate</span>
                  <span>Session 2026-27</span>
                </div>

                <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Directing student cloud architecture curriculum and milestone roadmap</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Connecting IIT Jodhpur builders with AWS industry mentors and alumni</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
