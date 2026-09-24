"use client";

import React, { useState } from "react";
import {
  Server,
  Sparkles,
  Layers,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  Shield,
  Cloud,
} from "lucide-react";

export const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const cases = [
    {
      id: "cloud-architects",
      persona: "Cloud & DevOps Architects",
      tagline: "Design resilient, multi-region cloud infrastructure with Infrastructure-as-Code.",
      badge: "Architecture & DevOps",
      icon: Server,
      bullets: [
        "VPC peering, AWS Transit Gateway, and subnets configuration",
        "Containerization with Docker, AWS ECS Fargate, and EKS Kubernetes",
        "CI/CD release pipelines with GitHub Actions and AWS CodePipeline",
        "Cost optimization, AWS Budgets alerts, and Well-Architected Framework",
      ],
      techStack: ["Terraform", "AWS CDK", "ECS Fargate", "CloudWatch", "IAM"],
      stats: { primary: "99.99%", label: "High Availability Blueprints" },
    },
    {
      id: "ai-engineers",
      persona: "AI/ML & Data Engineers",
      tagline: "Build production generative AI applications powered by Amazon Bedrock.",
      badge: "GenAI & Foundation Models",
      icon: Sparkles,
      bullets: [
        "Serverless RAG pipelines with Amazon Bedrock Knowledge Bases",
        "Prompt engineering with Claude 3.7 Sonnet, Amazon Nova, and Llama 3",
        "Vector embeddings and similarity search with Amazon OpenSearch Serverless",
        "Model training and batch inference pipelines on Amazon SageMaker",
      ],
      techStack: ["Amazon Bedrock", "SageMaker", "OpenSearch", "Python", "LangChain"],
      stats: { primary: "10x", label: "Faster Prototype Liftoff" },
    },
    {
      id: "fullstack-devs",
      persona: "Fullstack Web Developers",
      tagline: "Ship fullstack applications that automatically scale from zero to millions of users.",
      badge: "Fullstack Engineering",
      icon: Layers,
      bullets: [
        "Deploy Next.js 16, Vite, and React with serverless SSR on AWS Amplify",
        "REST and GraphQL APIs powered by Amazon API Gateway and AWS Lambda",
        "Single-table NoSQL design and fast caching with DynamoDB and ElastiCache",
        "User authentication and social login integration with Amazon Cognito",
      ],
      techStack: ["Next.js", "TypeScript", "AWS Lambda", "DynamoDB", "Cognito"],
      stats: { primary: "Zero", label: "Server Management Overhead" },
    },
    {
      id: "first-year",
      persona: "First-Year Explorers & Beginners",
      tagline: "Learn cloud computing from absolute zero with peer mentors and free labs.",
      badge: "Zero to One Cohort",
      icon: GraduationCap,
      bullets: [
        "No prior cloud experience required—beginner friendly study circles",
        "Hands-on free cloud lab accounts via AWS Educate with no credit card needed",
        "Preparation sprints for the AWS Certified Cloud Practitioner credential",
        "Join student hackathon teams and build real resume-ready projects",
      ],
      techStack: ["AWS Console", "Cloud Practitioner", "Linux CLI", "Git", "S3"],
      stats: { primary: "100%", label: "Free for IITJ Students" },
    },
  ];

  const current = cases[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section id="use-cases" className="py-24 relative overflow-hidden bg-[#070d1a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            Tailored For Student Builders
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Built for developers across every discipline
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Whether you are building your first serverless website, training ML models, or
            architecting enterprise cloud pipelines, AWS SBG has a track for you.
          </p>
        </div>

        {/* Persona Tabs Slider */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(idx)}
              className={`ag-button text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === idx
                  ? "ag-button-primary shadow-md"
                  : "ag-button-secondary text-slate-400 hover:text-white"
              }`}
            >
              {c.persona}
            </button>
          ))}
        </div>

        {/* Persona Active Card Display */}
        <div className="ag-card-elevated p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  {current.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {current.persona}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {current.tagline}
              </p>

              {/* Bullet checklist */}
              <div className="space-y-3 mb-8">
                {current.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{b}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase mb-2">
                  Featured Technologies & Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card / Metric Visualizer */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between h-full space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <CurrentIcon className="w-7 h-7" />
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-bold font-mono text-white mb-1">
                    {current.stats.primary}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {current.stats.label}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="text-xs font-medium text-slate-300 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-400" />
                    <span>Hands-On Blueprint Available</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Includes ready-to-deploy code, architecture diagrams, and step-by-step setup docs.
                  </p>
                </div>

                <a
                  href="#blueprints"
                  className="ag-button ag-button-primary text-xs sm:text-sm w-full py-3"
                >
                  <span>Explore Track Blueprints</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
