export type AppId =
  | "home"
  | "about"
  | "leads"
  | "team"
  | "projects"
  | "roadmap"
  | "certifications"
  | "resources"
  | "internships"
  | "terminal"
  | "feed"
  | "contact";

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category:
    | "Leadership"
    | "Technical"
    | "Community Management"
    | "Social Media & Management"
    | "Advisors"
    | "Interns";
  tier?: "Lead" | "Co-Lead" | "Core Team" | "Coordinator";
  department?: string;
  affiliation: string;
  institute: string;
  image?: string;
  bio?: string;
  focusAreas: string[];
  responsibilities?: string[];
  email?: string;
}

export interface InternItem {
  id: string;
  name: string;
  institute: string;
  track?: string;
  domain?: string;
  offerLetter?: string;
  year?: string;
}

export type ProjectStatus = "IDEA" | "BUILDING" | "SHIPPED" | "EXPERIMENTAL";

export interface ArchitectureNode {
  id: string;
  label: string;
  service: string;
  type: "client" | "gateway" | "compute" | "database" | "storage" | "ai" | "monitoring";
  iconName: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  domain?: string;
  problem: string;
  status: ProjectStatus;
  technology: string[];
  repository?: string;
  demo?: string;
  contributors: string[];
  architectureSummary: string;
  nodes?: ArchitectureNode[];
  edges?: ArchitectureEdge[];
  technicalNotes?: string[];
  deliverables?: string[];
}

export type EventStatus = "Upcoming" | "Completed" | "Registration Open";
export type EventType = "Workshop" | "Builder Session" | "Hackathon" | "Cloud Lab" | "Webinar";

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  type: EventType;
  status: EventStatus;
  speaker?: {
    name: string;
    title: string;
    organization?: string;
  };
  description: string;
  registrationUrl?: string;
  meetupUrl?: string;
  topics: string[];
}

export type ResourceDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type ResourceType =
  | "Video Course"
  | "Research Paper"
  | "Engineering Blog"
  | "Whitepaper"
  | "Lab & Tutorial"
  | "Architecture Spec"
  | "Workshop"
  | "Official Docs"
  | "Video Series";

export interface ResourceItem {
  id: string;
  title: string;
  category:
    | "AWS Fundamentals"
    | "Cloud Architecture"
    | "DevOps"
    | "Containers"
    | "Serverless"
    | "AI / ML"
    | "Databases"
    | "Networking"
    | "Security"
    | "Certification Resources"
    | "Builder Resources";
  type: ResourceType;
  difficulty: ResourceDifficulty;
  description: string;
  link: string;
  readTime?: string;
  tags: string[];
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
  category: "project" | "event" | "community" | "repo" | "resource";
  author: string;
  hash?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  appId?: AppId;
}
