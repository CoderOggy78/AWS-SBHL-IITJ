"use client";

import React from "react";
import {
  Layers,
  Terminal,
  Compass,
  Award,
  ArrowUpRight,
  Sparkles,
  Server,
  CloudLightning,
  ShieldCheck,
} from "lucide-react";

export const Pillars: React.FC = () => {
  const pillars = [
    {
      id: "blueprints",
      title: "Builder Blueprints",
      badge: "50+ Architectures",
      badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      description:
        "Production-grade AWS architecture templates designed specifically for student developers. Covering serverless event-driven microservices, RAG AI with Amazon Bedrock, and high-availability ECS clusters.",
      icon: Layers,
      iconColor: "text-sky-400 bg-sky-500/10",
      link: "#blueprints",
      features: [
        "Infrastructure-as-Code (Terraform & CDK)",
        "Zero-trust security & IAM best practices",
        "Cost-optimized free-tier blueprints",
      ],
    },
    {
      id: "roadmap",
      title: "Cloud Engineering Roadmap",
      badge: "Curriculum 2026-27",
      badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
      description:
        "Step-by-step milestone pathways guiding builders from zero cloud background to advanced enterprise cloud engineering. Master networking, storage, compute, containers, and serverless architectures.",
      icon: Compass,
      iconColor: "text-purple-400 bg-purple-500/10",
      link: "#roadmap",
      features: [
        "Milestone 1: Linux, Networking & Fundamentals",
        "Milestone 2: Serverless & Containerized Workloads",
        "Milestone 3: Cloud Security & System Architecture",
      ],
    },
    {
      id: "certifications",
      title: "100 Free Badges & Certs",
      badge: "Official Credentials",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      description:
        "Earn globally recognized cloud credentials without breaking your wallet. Free digital badges from AWS Educate, foundational exam prep tracks, and chapter voucher opportunities.",
      icon: Award,
      iconColor: "text-amber-400 bg-amber-500/10",
      link: "#certifications",
      features: [
        "AWS Educate Machine Learning & Cloud Badges",
        "AWS Certified Cloud Practitioner (CLF-C02)",
        "Solutions Architect Associate study sprints",
      ],
    },
    {
      id: "terminal",
      title: "Interactive Cloud Shell",
      badge: "Terminal-First",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      description:
        "The fastest way to learn AWS is at the keyboard. Practice AWS CLI commands, query cloud resources, simulate deployments, and master shell automation with our zero-friction in-browser terminal.",
      icon: Terminal,
      iconColor: "text-emerald-400 bg-emerald-500/10",
      link: "#terminal",
      features: [
        "Live AWS CLI command execution",
        "Synthesized cloud sandboxes for labs",
        "Instant architecture inspection shortcuts",
      ],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5 bg-[#050b14]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Core Platform Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Everything you need to build in the cloud era
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            AWS Student Builders Guild provides IIT Jodhpur students with an end-to-end
            ecosystem of architectures, learning roadmaps, credentials, and hands-on tooling.
          </p>
        </div>

        {/* 4 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="ag-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden hover:-translate-y-1"
              >
                {/* Subtle top corner gradient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pillar.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${pillar.badgeColor}`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-8">
                    {pillar.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-slate-300 font-mono"
                      >
                        <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={pillar.link}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors group-hover:translate-x-1"
                  >
                    <span>Explore {pillar.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
