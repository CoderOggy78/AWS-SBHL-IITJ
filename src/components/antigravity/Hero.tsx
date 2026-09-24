"use client";

import React, { useState } from "react";
import { CanvasParticles } from "./CanvasParticles";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import {
  ArrowRight,
  Terminal,
  Layers,
  Award,
  Sparkles,
  Play,
  CheckCircle,
  Copy,
  Server,
  Database,
  Cpu,
  Cloud,
  Shield,
  Activity,
} from "lucide-react";

interface HeroProps {
  onLaunchOS: () => void;
  onOpenJoinModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchOS, onOpenJoinModal }) => {
  const [activeTab, setActiveTab] = useState<"arch" | "terminal" | "certs" | "pulse">("arch");
  const [selectedService, setSelectedService] = useState<string>("bedrock");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "aws sbg --version",
      output: "AWS Student Builders Guild CLI v2.4.0 (IIT Jodhpur Chapter)",
    },
    {
      cmd: "aws bedrock list-foundation-models --query 'models[].modelId'",
      output: "[ anthropic.claude-3-7-sonnet, meta.llama-3-70b-instruct, amazon.nova-pro ]",
    },
  ]);
  const [copied, setCopied] = useState(false);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    if (cmd === "help") {
      output = "Available commands: 'aws bedrock', 'aws s3 ls', 'guild team', 'guild certs', 'blueprints', 'join', 'clear'";
    } else if (cmd.includes("team")) {
      output = "Leadership: Vishwanath Barve, Ashwani Dwivedi Sir\nCommunity Lead: Quazi Arqam\nTechnical Lead: Bishal Saha\nSocial Media Lead: Rahul";
    } else if (cmd.includes("bedrock")) {
      output = "Amazon Bedrock API connected: Claude 3.7 Sonnet, Amazon Nova Pro, Titan Embeddings active in ap-south-1.";
    } else if (cmd.includes("certs")) {
      output = "100 Free Cloud Certifications & Badges available! Run 'blueprints' to inspect builder architectures.";
    } else if (cmd.includes("blueprints")) {
      output = "50 production blueprints loaded: Serverless RAG, Event-Driven Microservices, Multi-Region ECS.";
    } else if (cmd.includes("join")) {
      onOpenJoinModal();
      output = "Opening Guild Community onboarding...";
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (cmd.includes("s3")) {
      output = "2026-09-24 s3://aws-sbg-iitj-blueprints\n2026-09-24 s3://aws-sbg-iitj-workshops\n2026-09-24 s3://aws-sbg-iitj-artifacts";
    } else {
      output = `Command '${cmd}' executed successfully in cloud-sandbox-ap-south-1. Type 'help' for options.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, output }]);
    setTerminalInput("");
  };

  const copyCloneCmd = () => {
    navigator.clipboard.writeText("git clone https://github.com/aws-sbg-iitj/builder-blueprints.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-20 overflow-hidden">
      {/* Dynamic Antigravity Canvas Particles */}
      <CanvasParticles />

      {/* Ambient background glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-sky-500/20 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-glow w-[400px] h-[400px] bg-amber-500/15 top-1/3 right-10" />
      <div className="ambient-glow w-[450px] h-[450px] bg-purple-500/15 bottom-10 left-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Eyebrow Chip */}
        <div className="flex justify-center mb-6">
          <div className="ag-chip hover:bg-white/10 transition-colors group cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-slate-300 font-medium tracking-tight">
              Official Chapter • Indian Institute of Technology Jodhpur
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          </div>
        </div>

        {/* Main Antigravity Mega Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Experience liftoff with the{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              AWS Student Builders Guild
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            The premier cloud engineering and student developer community at IIT Jodhpur.
            Architect real-world cloud systems, harness generative AI with Amazon Bedrock,
            and build alongside industry mentors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={onOpenJoinModal}
            className="ag-button ag-button-primary text-sm sm:text-base px-6 sm:px-7 py-3 shadow-lg shadow-sky-500/25 group"
          >
            <span>Join Guild Community</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#blueprints"
            className="ag-button ag-button-secondary text-sm sm:text-base px-6 py-3"
          >
            <Layers className="w-4 h-4 mr-2 text-sky-400" />
            <span>Explore 50+ Blueprints</span>
          </a>

          <button
            onClick={onLaunchOS}
            className="ag-button ag-button-secondary text-sm sm:text-base px-5 py-3 border-amber-500/30 hover:border-amber-500/60"
          >
            <span className="mr-2">🚀</span>
            <span>Launch Cloud OS</span>
          </button>
        </div>

        {/* Interactive Antigravity "Cloud Sandbox Window" Showcase */}
        <div className="max-w-5xl mx-auto">
          <div className="ag-card-elevated p-2 sm:p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Window Topbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-400">
                  sandbox.aws-sbg-iitj.ac.in
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/5 text-xs font-medium">
                <button
                  onClick={() => setActiveTab("arch")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === "arch"
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === "terminal"
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>AWS Shell</span>
                </button>
                <button
                  onClick={() => setActiveTab("certs")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === "certs"
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Free Badges</span>
                </button>
                <button
                  onClick={() => setActiveTab("pulse")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === "pulse"
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Guild Pulse</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Architecture Interactive Graph */}
            {activeTab === "arch" && (
              <div className="p-4 sm:p-6 bg-slate-950/60 rounded-2xl border border-white/5">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        Production Blueprint #01
                      </span>
                      <span className="text-xs text-slate-400">AWS Well-Architected</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Serverless Generative AI & Event-Driven Microservices
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyCloneCmd}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied Git URL" : "Clone Blueprint"}</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Node Graph */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-6 px-2 border border-white/5 rounded-xl bg-black/30">
                  {/* Node 1 */}
                  <div
                    onClick={() => setSelectedService("cloudfront")}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedService === "cloudfront"
                        ? "bg-sky-500/20 border-sky-500 text-white scale-105"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Cloud className="w-6 h-6 mx-auto mb-2 text-sky-400" />
                    <div className="text-xs font-semibold">CloudFront</div>
                    <div className="text-[10px] opacity-75">Global Edge CDN</div>
                  </div>

                  {/* Node 2 */}
                  <div
                    onClick={() => setSelectedService("apigateway")}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedService === "apigateway"
                        ? "bg-sky-500/20 border-sky-500 text-white scale-105"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Server className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                    <div className="text-xs font-semibold">API Gateway</div>
                    <div className="text-[10px] opacity-75">REST & WebSocket</div>
                  </div>

                  {/* Node 3 */}
                  <div
                    onClick={() => setSelectedService("lambda")}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedService === "lambda"
                        ? "bg-amber-500/20 border-amber-500 text-white scale-105"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Cpu className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                    <div className="text-xs font-semibold">AWS Lambda</div>
                    <div className="text-[10px] opacity-75">Serverless Compute</div>
                  </div>

                  {/* Node 4 */}
                  <div
                    onClick={() => setSelectedService("bedrock")}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedService === "bedrock"
                        ? "bg-sky-500/20 border-sky-500 text-white scale-105"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-sky-400" />
                    <div className="text-xs font-semibold">Amazon Bedrock</div>
                    <div className="text-[10px] opacity-75">Foundation Models</div>
                  </div>

                  {/* Node 5 */}
                  <div
                    onClick={() => setSelectedService("dynamodb")}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedService === "dynamodb"
                        ? "bg-emerald-500/20 border-emerald-500 text-white scale-105"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Database className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                    <div className="text-xs font-semibold">DynamoDB</div>
                    <div className="text-[10px] opacity-75">Single-Digit MS</div>
                  </div>
                </div>

                {/* Node Inspector */}
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                      Inspecting: {selectedService.toUpperCase()}
                    </span>
                    <p className="text-sm text-slate-200 mt-0.5">
                      {selectedService === "bedrock" &&
                        "Amazon Bedrock: Fully managed foundation models (Claude 3.7, Amazon Nova, Llama 3) with Knowledge Bases & Vector search."}
                      {selectedService === "lambda" &&
                        "AWS Lambda: Event-driven execution running Node.js / Python without server management, auto-scaling from 0 to 10k req/s."}
                      {selectedService === "apigateway" &&
                        "Amazon API Gateway: Traffic management, CORS, API throttling, Cognito authorization, and WebSocket state."}
                      {selectedService === "cloudfront" &&
                        "Amazon CloudFront: Ultra-low latency static caching and edge compute (CloudFront Functions) at 600+ PoPs worldwide."}
                      {selectedService === "dynamodb" &&
                        "Amazon DynamoDB: Fully managed NoSQL database with seamless scaling and zero maintenance overhead."}
                    </p>
                  </div>
                  <a
                    href="#blueprints"
                    className="ag-button ag-button-secondary text-xs px-4 py-2 shrink-0"
                  >
                    View Terraform Code ↗
                  </a>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive AWS Shell */}
            {activeTab === "terminal" && (
              <div className="p-4 bg-slate-950/90 rounded-2xl border border-white/5 font-mono text-xs text-slate-300 min-h-[280px] flex flex-col">
                <div className="flex-1 space-y-2 overflow-y-auto max-h-64 no-scrollbar">
                  <div className="text-slate-500">
                    # AWS SBG Interactive Cloud Shell • ap-south-1 (Mumbai Region)
                  </div>
                  <div className="text-slate-500">
                    # Type &apos;help&apos;, &apos;guild team&apos;, &apos;aws bedrock&apos;, or &apos;join&apos;
                  </div>

                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sky-400">
                        <span>builder@aws-sbg-iitj:~$</span>
                        <span className="text-white">{item.cmd}</span>
                      </div>
                      <div className="text-slate-300 pl-4 whitespace-pre-wrap">
                        {item.output}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleRunCommand} className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                  <span className="text-sky-400 font-bold shrink-0">builder@aws-sbg-iitj:~$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="type 'help' or 'guild team' and hit Enter..."
                    className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 text-xs border border-sky-500/30"
                  >
                    Run
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: Free Badges & Credentials */}
            {activeTab === "certs" && (
              <div className="p-4 sm:p-6 bg-slate-950/60 rounded-2xl border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                      Foundational
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      AWS Cloud Practitioner
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Official cloud concepts, security, billing, and core services roadmap.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-emerald-400">
                      ✓ Free Study Lab Track
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono uppercase text-sky-400 font-semibold">
                      Generative AI Badge
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      AWS Educate Machine Learning
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Earn free digital badges on Credly demonstrating real model deployment on AWS.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-emerald-400">
                      ✓ 100% Free Credly Badge
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                      <Server className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono uppercase text-purple-400 font-semibold">
                      Associate Level
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      Solutions Architect Associate
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Design resilient, high-performance, cost-optimized cloud architectures.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-purple-400">
                      ✓ Exam Voucher Sprints
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Live Guild Pulse */}
            {activeTab === "pulse" && (
              <div className="p-4 sm:p-6 bg-slate-950/60 rounded-2xl border border-white/5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          Cloud Immersion Sprint 2026 Announced
                        </div>
                        <div className="text-xs text-slate-400">
                          Community Management Team • Lead: Quazi Arqam
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Today</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          AWS Bedrock Agent Blueprint Published
                        </div>
                        <div className="text-xs text-slate-400">
                          Technical Team • Lead: Bishal Saha
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Yesterday</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          Campus Builder Spotlight Series Launched
                        </div>
                        <div className="text-xs text-slate-400">
                          Social Media Team • Lead: Rahul
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">3 days ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">50+</div>
            <div className="text-xs text-slate-400 mt-1">Production Blueprints</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono">100</div>
            <div className="text-xs text-slate-400 mt-1">Free Badges & Certs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">17+</div>
            <div className="text-xs text-slate-400 mt-1">Guild Leads & Mentors</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">Open Source & Free</div>
          </div>
        </div>
      </div>
    </section>
  );
};
