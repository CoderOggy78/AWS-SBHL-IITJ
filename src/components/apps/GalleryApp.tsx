"use client";

import React, { useState } from "react";
import {
  Camera,
  Calendar,
  MapPin,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
  Users,
  CheckCircle2,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/config/socials";

interface EventRecap {
  id: string;
  title: string;
  category: "Workshops" | "Hackathons" | "Builder Sessions" | "Team Moments";
  date: string;
  venue: string;
  attendees: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

const RECAP_DATA: EventRecap[] = [
  {
    id: "recap-1",
    title: "Hands-on GenAI: RAG Pipelines with Amazon Bedrock",
    category: "Workshops",
    date: "Semester Immersion",
    venue: "Computer Center Lab 1, IIT Jodhpur",
    attendees: "65+ Student Builders",
    summary:
      "Deep dive into foundation models on Amazon Bedrock. Students learned how to chunk and embed campus technical documents using Amazon Titan, persist vectors in OpenSearch Serverless, and orchestrate low-latency retrieval with Claude 3.5 Sonnet.",
    highlights: [
      "Built multi-modal Q&A bot answering syllabus questions in <1.2s",
      "IAM least-privilege policies configured for Bedrock API access",
      "Interactive prompt engineering and temperature tuning demo",
    ],
    techStack: ["Amazon Bedrock", "Claude 3.5 Sonnet", "OpenSearch Serverless", "AWS Lambda", "Python Boto3"],
  },
  {
    id: "recap-2",
    title: "Jodhpur Cloud Hack: 36-Hour Builder Sprint",
    category: "Hackathons",
    date: "Annual Flagship Challenge",
    venue: "IIT Jodhpur Campus & Hybrid",
    attendees: "12 Cross-Disciplinary Teams",
    summary:
      "Intensive 36-hour competitive hackathon focused on architecting resilient cloud systems under constraints. Teams shipped working serverless prototypes spanning desert IoT sensor monitoring, automated grading engines, and distributed campus caches.",
    highlights: [
      "12 fully functional serverless architectures deployed live",
      "Zero server down-time throughout the evaluation window",
      "Evaluated by student peer leads on architecture, cost, and resilience",
    ],
    techStack: ["AWS Fargate", "AWS IoT Core", "Amazon DynamoDB", "API Gateway", "AWS CDK"],
  },
  {
    id: "recap-3",
    title: "Zero to Containerized Microservices on AWS Fargate",
    category: "Workshops",
    date: "Cloud Lab Session",
    venue: "Seminar Hall 2 & Google Meet",
    attendees: "80+ Attendees",
    summary:
      "Practical container engineering workshop dissecting Docker workflows, container vulnerability scanning with Amazon ECR, task definitions, Application Load Balancers, and auto-scaling serverless containers on AWS Fargate.",
    highlights: [
      "Containerized a Next.js full-stack app and pushed to ECR",
      "Configured path-based routing rules on Application Load Balancer",
      "Demonstrated zero-downtime rolling task deployments",
    ],
    techStack: ["Docker", "Amazon ECR", "AWS Fargate", "ALB", "CloudWatch Logs"],
  },
  {
    id: "recap-4",
    title: "AWS Builder Kickoff & Cloud ID Setup",
    category: "Builder Sessions",
    date: "Academic Kickoff",
    venue: "Auditorium, IIT Jodhpur",
    attendees: "110+ Attendees",
    summary:
      "Welcoming freshers and curious students to the AWS Student Builder Group. Covered AWS Builder ID creation, student sandbox credits, setting up AWS Toolkit for VS Code, and walking through our open-source project roadmap.",
    highlights: [
      "100+ student builder accounts onboarded to AWS community sandbox",
      "Explained Well-Architected Framework and serverless philosophy",
      "Introduced recruitment tracks and project opportunities",
    ],
    techStack: ["AWS Toolkit", "AWS CLI", "CloudFormation", "VS Code"],
  },
  {
    id: "recap-5",
    title: "Serverless Concurrency & Lambda SnapStart Optimization",
    category: "Builder Sessions",
    date: "Advanced Lab Session",
    venue: "Online Community Room",
    attendees: "45+ Builders",
    summary:
      "Deep technical session examining AWS Lambda execution environments, cold start profiling, microVM virtualization under Firecracker, and leveraging SnapStart to achieve sub-100ms initialization for Java and Python runtimes.",
    highlights: [
      "Measured cold start reduction from 1.8s down to 140ms with SnapStart",
      "Architected SQS batch processing with partial failure reporting",
      "Benchmarked provisioned concurrency vs on-demand scaling",
    ],
    techStack: ["AWS Lambda", "Firecracker", "Amazon SQS", "AWS X-Ray", "CloudWatch Synthetics"],
  },
  {
    id: "recap-6",
    title: "Core Technical Team Strategic Planning & Roadmap",
    category: "Team Moments",
    date: "Semester Milestone",
    venue: "Student Activity Center, IITJ",
    attendees: "Core Leadership Cohort",
    summary:
      "The student organizers, technical leads, and track coordinators mapped out the semester calendar, open-source repository architecture guidelines, and workshop themes for the academic year.",
    highlights: [
      "Formulated student cohort structure across student interns",
      "Finalized curriculum for AWS certification study groups",
      "Established project milestones for campus IoT telemetry",
    ],
    techStack: ["Architecture Planning", "Cohort Mentorship", "Curriculum Design"],
  },
];

export const GalleryApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Workshops",
    "Hackathons",
    "Builder Sessions",
    "Team Moments",
  ];

  const filteredRecaps = RECAP_DATA.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="flex flex-col h-full font-sans select-none overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Header / Categories Filter */}
      <div className="h-14 px-4 sm:px-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-200">Event Captures & Highlights</span>
            <span className="text-slate-500 mx-1.5">•</span>
            <span className="text-[11px] font-mono text-slate-400">
              {filteredRecaps.length} Sessions Logged
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-pink-600 text-white font-semibold shadow-md shadow-pink-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6 select-text">
        {/* Prominent Official 'Photos Dropping Soon' Notice */}
        <div className="p-5 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-950/30 via-slate-900/70 to-purple-950/20 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400">
                  PHOTOGRAPHY NOTICE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                High-Resolution Event Photography Dropping Soon!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                We are currently curating and post-processing the photo albums and video captures from our recent campus workshops, hackathon build sprints, and tech talks at IIT Jodhpur. High-definition galleries will drop here shortly!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <a
              href={SOCIAL_LINKS.meetup}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>RSVP for Next Event</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400">
              // SESSION DOSSIERS & HIGHLIGHTS
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified records of technical sessions and hands-on builder labs conducted by the community.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Recaps Verified
          </span>
        </div>

        {/* Recap Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredRecaps.map((recap) => (
            <div
              key={recap.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-pink-950/60 text-pink-300 border border-pink-500/30">
                      {recap.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {recap.date}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Photos Dropping Soon
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                  {recap.title}
                </h4>

                {/* Venue & Attendees info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{recap.venue}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{recap.attendees}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {recap.summary}
                </p>

                {/* Key Highlights Bulleted */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Session Takeaways:
                  </span>
                  {recap.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-tight">
                      <span className="text-pink-400 font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center gap-1.5">
                  {recap.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-sky-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

