export interface AwsLecture {
  id: string;
  youtubeId: string;
  title: string;
  category: "Cloud" | "DevOps" | "Cloud Security" | "System Design" | "Generative AI";
  instructor: string;
  channel: string;
  duration: string;
  description: string;
  topics: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const LECTURE_CATEGORIES = [
  "All",
  "Cloud",
  "DevOps",
  "Cloud Security",
  "System Design",
  "Generative AI",
] as const;

export const AWS_LECTURES: AwsLecture[] = [
  {
    "id": "lec-cloud-1",
    "youtubeId": "c3Cn4xYfxJY",
    "title": "AWS Solutions Architect Associate (SAA-C03) Full Course",
    "category": "Cloud",
    "instructor": "Andrew Brown",
    "channel": "freeCodeCamp.org",
    "duration": "13 Hours",
    "level": "Intermediate",
    "description": "Comprehensive certification training covering EC2, S3, VPC networking, RDS, DynamoDB, IAM, Auto Scaling, Elastic Load Balancing, and AWS Well-Architected Framework.",
    "topics": [
      "EC2 & S3",
      "VPC & Subnets",
      "High Availability",
      "Storage & DBs",
      "Architecture Design"
    ]
  },
  {
    "id": "lec-cloud-2",
    "youtubeId": "SOTamWNgDKc",
    "title": "AWS Certified Cloud Practitioner Full Exam Preparation",
    "category": "Cloud",
    "instructor": "Andrew Brown",
    "channel": "freeCodeCamp.org",
    "duration": "14 Hours",
    "level": "Beginner",
    "description": "The ultimate beginner-friendly course on AWS cloud concepts, core cloud infrastructure, billing & pricing models, security policies, and foundational AWS services.",
    "topics": [
      "Cloud Fundamentals",
      "Global Infrastructure",
      "Security & Compliance",
      "AWS Core Services",
      "Billing & Budgets"
    ]
  },
  {
    "id": "lec-cloud-3",
    "youtubeId": "hyEw7dQ9-JE",
    "title": "AWS Solutions Architect Professional (SAP-C02) Course",
    "category": "Cloud",
    "instructor": "Andrew Brown",
    "channel": "freeCodeCamp.org",
    "duration": "12 Hours",
    "level": "Advanced",
    "description": "Master-level cloud architectural strategy: multi-account AWS Organizations, Direct Connect, hybrid cloud networking, multi-region disaster recovery, and enterprise migrations.",
    "topics": [
      "Multi-Account AWS",
      "Disaster Recovery",
      "Hybrid Cloud",
      "Complex Routing",
      "Cost Governance"
    ]
  },
  {
    "id": "lec-cloud-4",
    "youtubeId": "k1RI5locZE4",
    "title": "AWS Tutorial For Beginners \u2014 10 Hours Full Cloud Training",
    "category": "Cloud",
    "instructor": "Edureka Cloud Team",
    "channel": "edureka!",
    "duration": "10 Hours",
    "level": "Beginner",
    "description": "In-depth walkthrough of compute, storage, databases, networking, monitoring with CloudWatch, and step-by-step hands-on demonstrations in the AWS Management Console.",
    "topics": [
      "AWS Console",
      "Compute & Storage",
      "CloudWatch",
      "Databases",
      "Hands-on Demos"
    ]
  },
  {
    "id": "lec-cloud-5",
    "youtubeId": "Ia-UEYYR44s",
    "title": "AWS Certified Solutions Architect Associate Complete Guide",
    "category": "Cloud",
    "instructor": "Andrew Brown",
    "channel": "freeCodeCamp.org",
    "duration": "16 Hours",
    "level": "Intermediate",
    "description": "Massive 16-hour deep dive into production AWS architecture: decoupled messaging with SQS/SNS, serverless APIs, Aurora database clustering, and resilient multi-AZ deployments.",
    "topics": [
      "Decoupled Systems",
      "Aurora DB",
      "SQS & SNS",
      "Route 53",
      "Cost Optimization"
    ]
  },
  {
    "id": "lec-cloud-6",
    "youtubeId": "7HKot-brXFE",
    "title": "AWS Certified Cloud Practitioner Certification Course (CLF-C02)",
    "category": "Cloud",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "15 Hours",
    "level": "Beginner",
    "description": "Updated curriculum for the CLF-C02 exam covering AWS billing structures, support plans, shared security model, global regions, and compute virtualization.",
    "topics": [
      "CLF-C02 Prep",
      "Shared Responsibility",
      "Billing & Budgets",
      "Support Plans",
      "EC2 & S3"
    ]
  },
  {
    "id": "lec-cloud-7",
    "youtubeId": "TTcyhhH2FWE",
    "title": "AWS Certified Developer Associate (DVA-C02) Certification Course",
    "category": "Cloud",
    "instructor": "Andrew Brown",
    "channel": "freeCodeCamp.org",
    "duration": "13 Hours",
    "level": "Intermediate",
    "description": "Complete developer guide covering AWS Lambda serverless compute, API Gateway integrations, Amazon Cognito user pools, DynamoDB single-table design, and CI/CD with AWS CDK.",
    "topics": [
      "AWS Lambda",
      "Amazon Cognito",
      "API Gateway",
      "AWS CDK",
      "Serverless APIs"
    ]
  },
  {
    "id": "lec-cloud-8",
    "youtubeId": "3hLmDS179YE",
    "title": "AWS Certified Cloud Practitioner Training \u2014 Full Course",
    "category": "Cloud",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "4 Hours",
    "level": "Beginner",
    "description": "Focused primer on AWS fundamentals, elasticity, high availability, storage tiering, identity policies, and cloud cost management for beginner builders.",
    "topics": [
      "Cloud Concepts",
      "AWS Architecture",
      "Storage Classes",
      "IAM Basics",
      "Exam Walkthrough"
    ]
  },
  {
    "id": "lec-cloud-9",
    "youtubeId": "N4sJj-SxX00",
    "title": "AWS in One Video: Complete Hands-on Guide for Beginners",
    "category": "Cloud",
    "instructor": "M Prashant",
    "channel": "M Prashant",
    "duration": "4 Hours",
    "level": "Beginner",
    "description": "A comprehensive Hindi & English walkthrough explaining core AWS services, launching real EC2 instances, configuring S3 buckets, and connecting databases.",
    "topics": [
      "Hands-on AWS",
      "EC2 Setup",
      "S3 Hosting",
      "RDS Database",
      "Console Walkthrough"
    ]
  },
  {
    "id": "lec-cloud-10",
    "youtubeId": "7m_q1ldzw0U",
    "title": "AWS Project: Architect and Build an End-to-End Cloud Web App",
    "category": "Cloud",
    "instructor": "Tiny Technical Tutorials",
    "channel": "Tiny Technical Tutorials",
    "duration": "1.5 Hours",
    "level": "Intermediate",
    "description": "Real-world guided project building a full-stack serverless web application using AWS Amplify, Lambda, DynamoDB, API Gateway, and SES email notifications.",
    "topics": [
      "End-to-End Project",
      "AWS Amplify",
      "Lambda Functions",
      "DynamoDB",
      "SES Notifications"
    ]
  },
  {
    "id": "lec-devops-1",
    "youtubeId": "Cpy20DnIDTI",
    "title": "How to Learn DevOps from Zero & Master Cloud Automation",
    "category": "DevOps",
    "instructor": "Nana Janashia",
    "channel": "TechWorld with Nana",
    "duration": "1 Hour",
    "level": "Beginner",
    "description": "A complete structured breakdown of the DevOps engineer roadmap: Linux basics, Git, CI/CD pipelines, containerization on AWS, Kubernetes orchestration, and Infrastructure as Code.",
    "topics": [
      "DevOps Roadmap",
      "CI/CD Pipelines",
      "Containerization",
      "IaC Tools",
      "Automation Workflows"
    ]
  },
  {
    "id": "lec-devops-2",
    "youtubeId": "Wf2eSG3owoA",
    "title": "Docker and Kubernetes on Cloud \u2014 Full Course for Beginners",
    "category": "DevOps",
    "instructor": "Kunal Kushwaha",
    "channel": "freeCodeCamp.org",
    "duration": "4.5 Hours",
    "level": "Intermediate",
    "description": "Learn container fundamentals, Dockerfile optimizations, multi-stage builds, and orchestrating container workloads on Kubernetes and AWS container engines.",
    "topics": [
      "Dockerfiles",
      "Containers",
      "Pods & Services",
      "Ingress & Deployments",
      "Cluster Architecture"
    ]
  },
  {
    "id": "lec-devops-3",
    "youtubeId": "3c-iBn73dDE",
    "title": "Docker Tutorial for Beginners (Full 3-Hour Course)",
    "category": "DevOps",
    "instructor": "Nana Janashia",
    "channel": "TechWorld with Nana",
    "duration": "3 Hours",
    "level": "Beginner",
    "description": "Complete practical Docker training: architecture, container vs VM, image layering, Docker compose, volumes, network bridging, and publishing to container registries.",
    "topics": [
      "Docker Engine",
      "Images & Layers",
      "Docker Compose",
      "Volumes & Mounts",
      "Networking"
    ]
  },
  {
    "id": "lec-devops-4",
    "youtubeId": "X48VuDVv0do",
    "title": "Kubernetes Tutorial for Beginners (Full 4-Hour Course)",
    "category": "DevOps",
    "instructor": "Nana Janashia",
    "channel": "TechWorld with Nana",
    "duration": "4 Hours",
    "level": "Intermediate",
    "description": "Comprehensive Kubernetes masterclass: control plane architecture, kubectl CLI, Deployments, ConfigMaps, Secrets, Ingress controllers, and persistent volumes on cloud clusters.",
    "topics": [
      "K8s Architecture",
      "Kubectl CLI",
      "ConfigMaps & Secrets",
      "StatefulSets",
      "EKS Ready"
    ]
  },
  {
    "id": "lec-devops-5",
    "youtubeId": "SLB_c_ayRMo",
    "title": "Terraform with AWS: Automate Cloud Infrastructure as Code",
    "category": "DevOps",
    "instructor": "Andrew Brown",
    "channel": "freeCodeCamp.org",
    "duration": "4.5 Hours",
    "level": "Intermediate",
    "description": "Declare AWS resources using HashiCorp Terraform: providers, remote state in S3 with DynamoDB state locking, modules, input/output variables, and automated infrastructure deployments.",
    "topics": [
      "Terraform HCL",
      "S3 State Locking",
      "Terraform Modules",
      "VPC Automation",
      "IaC Best Practices"
    ]
  },
  {
    "id": "lec-devops-6",
    "youtubeId": "0yWAtQ6wYNM",
    "title": "What is DevOps? REALLY Understand It | DevOps vs SRE",
    "category": "DevOps",
    "instructor": "Nana Janashia",
    "channel": "TechWorld with Nana",
    "duration": "30 Mins",
    "level": "Beginner",
    "description": "Conceptual deep dive into continuous integration, continuous delivery (CI/CD), site reliability engineering (SRE), automated monitoring, and team deployment cadences.",
    "topics": [
      "CI/CD Culture",
      "DevOps vs SRE",
      "Deployment Pipelines",
      "Reliability Engineering"
    ]
  },
  {
    "id": "lec-devops-7",
    "youtubeId": "_uQrJ0TkZlc",
    "title": "Python for Cloud Automation & Boto3 SDK Scripting",
    "category": "DevOps",
    "instructor": "Mosh Hamedani",
    "channel": "Programming with Mosh",
    "duration": "6 Hours",
    "level": "Beginner",
    "description": "Master Python programming essential for AWS automation, Lambda functions, event handling, boto3 cloud scripting, and infrastructure management.",
    "topics": [
      "Python Fundamentals",
      "Automation Scripts",
      "Functions & Modules",
      "Data Structures",
      "Cloud Scripting"
    ]
  },
  {
    "id": "lec-devops-8",
    "youtubeId": "RGOj5yH7evk",
    "title": "Git and GitHub for Beginners \u2014 Full Crash Course",
    "category": "DevOps",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "2 Hours",
    "level": "Beginner",
    "description": "Foundational version control: repository initialization, commits, branches, pull requests, merge conflict resolution, and setting up automated GitHub Actions.",
    "topics": [
      "Git Commands",
      "Branching",
      "Merge Conflicts",
      "Pull Requests",
      "GitHub Actions"
    ]
  },
  {
    "id": "lec-devops-9",
    "youtubeId": "fqMOX6JJhGo",
    "title": "Docker Tutorial for Beginners \u2014 Full DevOps Course",
    "category": "DevOps",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "2 Hours",
    "level": "Beginner",
    "description": "Hands-on containerization tutorial: container registries, running microservice containers, Docker networking, volume persistence, and cloud container deployments.",
    "topics": [
      "Container Basics",
      "Port Forwarding",
      "Volume Mounts",
      "Container Registries",
      "Deployment"
    ]
  },
  {
    "id": "lec-devops-10",
    "youtubeId": "Xv9dnKHO8tg",
    "title": "Kubernetes Architecture & Concepts Explained in 5 Minutes",
    "category": "DevOps",
    "instructor": "Nana Janashia",
    "channel": "TechWorld with Nana",
    "duration": "10 Mins",
    "level": "Beginner",
    "description": "Super quick and crystal-clear visual explanation of worker nodes, master nodes, pods, services, and how container orchestration functions behind the scenes.",
    "topics": [
      "Kubernetes Basics",
      "Master vs Worker",
      "Pods & Containers",
      "Cluster Concepts",
      "Visual Architecture"
    ]
  },
  {
    "id": "lec-sec-1",
    "youtubeId": "_ZCTvmaPgao",
    "title": "AWS IAM Core Concepts You NEED to Know for Production",
    "category": "Cloud Security",
    "instructor": "Daniel Vassallo",
    "channel": "Be A Better Dev",
    "duration": "25 Mins",
    "level": "Intermediate",
    "description": "Essential production security: IAM users, groups, roles, policy evaluation logic, permission boundaries, resource-based policies, and least-privilege access enforcement.",
    "topics": [
      "IAM Policies",
      "AssumeRole",
      "Least Privilege",
      "Permission Boundaries",
      "Security Best Practices"
    ]
  },
  {
    "id": "lec-sec-2",
    "youtubeId": "bgPuPSPZe2U",
    "title": "AWS Security, VPC Networking & Identity Management",
    "category": "Cloud Security",
    "instructor": "NetworkChuck",
    "channel": "NetworkChuck",
    "duration": "45 Mins",
    "level": "Beginner",
    "description": "Understand how packets traverse AWS networks, public vs private subnets, internet gateways, route tables, security groups, and network access control lists (NACLs).",
    "topics": [
      "VPC Architecture",
      "Subnets & Routing",
      "Security Groups",
      "NACLs",
      "Firewalls"
    ]
  },
  {
    "id": "lec-sec-3",
    "youtubeId": "ZMJV5AIfVBE",
    "title": "AWS VPC Deep Dive: Complete Guide to Virtual Private Cloud",
    "category": "Cloud Security",
    "instructor": "M Prashant",
    "channel": "M Prashant",
    "duration": "1.5 Hours",
    "level": "Intermediate",
    "description": "Step-by-step masterclass configuring isolated VPC networks, CIDR blocks, NAT Gateways, VPC Peering, and private endpoint connections with AWS PrivateLink.",
    "topics": [
      "VPC Design",
      "CIDR & Subnetting",
      "NAT Gateways",
      "VPC Peering",
      "PrivateLink"
    ]
  },
  {
    "id": "lec-sec-4",
    "youtubeId": "IPvYjXCsTg8",
    "title": "Computer Networking & OSI Model Deep Dive for Cloud",
    "category": "Cloud Security",
    "instructor": "Kunal Kushwaha",
    "channel": "Kunal Kushwaha",
    "duration": "8 Hours",
    "level": "Beginner",
    "description": "Comprehensive networking fundamentals: OSI model 7 layers, TCP vs UDP, IP addressing, DNS resolution, TLS/SSL encryption, and cloud VPC traffic routing.",
    "topics": [
      "OSI 7 Layers",
      "TCP/IP Suite",
      "DNS & HTTP/HTTPS",
      "Subnetting & CIDR",
      "TLS Security"
    ]
  },
  {
    "id": "lec-sec-5",
    "youtubeId": "b6UiR1qx8Po",
    "title": "AWS Certified Security Specialty (SCS-C02) Full Course",
    "category": "Cloud Security",
    "instructor": "Cybr Team",
    "channel": "Cybr",
    "duration": "8 Hours",
    "level": "Advanced",
    "description": "Advanced security operations on AWS: cryptographic key management with AWS KMS, incident response, vulnerability assessment with Amazon Inspector, and security posture monitoring.",
    "topics": [
      "AWS KMS",
      "Incident Response",
      "Security Hub",
      "Inspector",
      "Threat Detection"
    ]
  },
  {
    "id": "lec-sec-6",
    "youtubeId": "g2JOHLHh4rI",
    "title": "AWS Virtual Private Cloud (VPC): Beginner to Pro Tutorial",
    "category": "Cloud Security",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "2.5 Hours",
    "level": "Intermediate",
    "description": "Architect production-grade virtual networks in AWS with multi-tier architecture, public/private subnets, bastion hosts, internet connectivity, and network ACL rules.",
    "topics": [
      "Multi-Tier VPC",
      "Bastion Hosts",
      "Internet Gateways",
      "Route Tables",
      "Security Groups"
    ]
  },
  {
    "id": "lec-sec-7",
    "youtubeId": "DN1I_H8MFyY",
    "title": "Master AWS IAM & AWS CLI for AWS Architecture",
    "category": "Cloud Security",
    "instructor": "Peace Of Code",
    "channel": "Peace Of Code",
    "duration": "1.5 Hours",
    "level": "Intermediate",
    "description": "Hands-on mastery of AWS IAM user management, MFA enforcement, programmatic CLI credentials, creating granular JSON policies, and delegating permissions via roles.",
    "topics": [
      "AWS CLI",
      "JSON Policies",
      "MFA Enforcement",
      "Cross-Account Roles",
      "Security Credentials"
    ]
  },
  {
    "id": "lec-sec-8",
    "youtubeId": "Cm7rpqcVQPw",
    "title": "Roadmap to Becoming an AWS Cloud Security Engineer",
    "category": "Cloud Security",
    "instructor": "Caleb Oni",
    "channel": "Caleb Oni",
    "duration": "45 Mins",
    "level": "Beginner",
    "description": "Career guidance and technical skills breakdown for aspiring Cloud Security Engineers: SIEM logging with CloudWatch/CloudTrail, SOC monitoring, and compliance certifications.",
    "topics": [
      "Security Roadmap",
      "SIEM & SOC",
      "CloudTrail Logs",
      "Security Certifications",
      "Career Strategy"
    ]
  },
  {
    "id": "lec-sec-9",
    "youtubeId": "x_pM1LMgM9A",
    "title": "Create a Custom AWS VPC: Wizard vs Manual Network Configuration",
    "category": "Cloud Security",
    "instructor": "TechStudyDeck",
    "channel": "TechStudyDeck",
    "duration": "35 Mins",
    "level": "Intermediate",
    "description": "Clear, practical walkthrough contrasting automatic VPC wizard creation against manual subnet, routing table, and internet gateway configurations for high security.",
    "topics": [
      "VPC Configuration",
      "Manual Subnetting",
      "Route Tables",
      "Gateway Routing",
      "Security Best Practices"
    ]
  },
  {
    "id": "lec-sec-10",
    "youtubeId": "3Kq1MIfTWCE",
    "title": "Network Penetration & Cloud Security Fundamentals",
    "category": "Cloud Security",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "5 Hours",
    "level": "Intermediate",
    "description": "Hands-on ethical hacking and network security course exploring port scanning, firewall evasion, packet analysis with Wireshark, and defensive cloud hardening.",
    "topics": [
      "Ethical Hacking",
      "Port Scanning",
      "Packet Analysis",
      "Firewall Rules",
      "Defensive Hardening"
    ]
  },
  {
    "id": "lec-sys-1",
    "youtubeId": "HaEPXoXVf2k",
    "title": "Amazon DynamoDB Deep Dive: Advanced Design Patterns (DAT401)",
    "category": "System Design",
    "instructor": "Rick Houlihan",
    "channel": "Amazon Web Services",
    "duration": "1 Hour",
    "level": "Advanced",
    "description": "The legendary AWS re:Invent session by Rick Houlihan on Single-Table NoSQL design, partition key strategies, Global Secondary Indexes (GSIs), and scaling for ultra-high throughput.",
    "topics": [
      "Single-Table Design",
      "NoSQL Modeling",
      "Partition Keys",
      "GSIs & Sparse Indexes",
      "High Throughput"
    ]
  },
  {
    "id": "lec-sys-2",
    "youtubeId": "xfxBhvGpoa0",
    "title": "AWS re:Invent: DynamoDB Advanced Design Patterns & Architecture",
    "category": "System Design",
    "instructor": "Rick Houlihan",
    "channel": "AWS Events",
    "duration": "1 Hour",
    "level": "Advanced",
    "description": "Modeling transactional relational workloads in NoSQL DynamoDB, ACID transactions, streams, and optimizing read/write capacity units for multi-million user apps.",
    "topics": [
      "Transactions",
      "Data Modeling",
      "Capacity Optimization",
      "DynamoDB Streams",
      "Event Sourcing"
    ]
  },
  {
    "id": "lec-sys-3",
    "youtubeId": "SqcXvc3ZmRU",
    "title": "System Design Primer: Distributed Systems & Scalability",
    "category": "System Design",
    "instructor": "Gaurav Sen",
    "channel": "Gaurav Sen",
    "duration": "40 Mins",
    "level": "Intermediate",
    "description": "Core distributed systems theory: CAP theorem, consistent hashing, message brokers, caching strategies, replication, and handling database read/write bottlenecks.",
    "topics": [
      "Distributed Systems",
      "CAP Theorem",
      "Consistent Hashing",
      "Caching Strategies",
      "Load Balancing"
    ]
  },
  {
    "id": "lec-sys-4",
    "youtubeId": "xpDnVSmNFX0",
    "title": "System Design Basics: Horizontal vs Vertical Scaling",
    "category": "System Design",
    "instructor": "Gaurav Sen",
    "channel": "Gaurav Sen",
    "duration": "25 Mins",
    "level": "Beginner",
    "description": "How to scale web applications from a single machine to globally distributed systems using stateless servers, database sharding, and elastic scaling groups.",
    "topics": [
      "Elastic Scaling",
      "Stateless Architecture",
      "Database Sharding",
      "Fault Tolerance"
    ]
  },
  {
    "id": "lec-sys-5",
    "youtubeId": "m8Icp_Cid5o",
    "title": "System Design for Beginners: Full Architecture Course",
    "category": "System Design",
    "instructor": "freeCodeCamp Team",
    "channel": "freeCodeCamp.org",
    "duration": "2.5 Hours",
    "level": "Beginner",
    "description": "Foundational software architecture: monolithic vs microservices, database normalization vs denormalization, async messaging queues, and REST vs GraphQL APIs.",
    "topics": [
      "Architecture Basics",
      "Monolith vs Microservices",
      "Message Queues",
      "REST vs GraphQL",
      "Caching Layers"
    ]
  },
  {
    "id": "lec-sys-6",
    "youtubeId": "HEYY7m7EroU",
    "title": "Client-Server Architecture & Cloud Scalability Models",
    "category": "System Design",
    "instructor": "Nehra Classes",
    "channel": "Nehra Classes",
    "duration": "45 Mins",
    "level": "Beginner",
    "description": "Detailed architectural study of client-server requests, connection pooling, reverse proxies, content delivery networks (CDNs), and state synchronization.",
    "topics": [
      "Client-Server Model",
      "Reverse Proxies",
      "Connection Pools",
      "State Management",
      "CDN Edge Caching"
    ]
  },
  {
    "id": "lec-sys-7",
    "youtubeId": "Ai0Osa1-f74",
    "title": "Designing Google Drive: Senior-Level System Design Interview",
    "category": "System Design",
    "instructor": "Hayk Simonyan",
    "channel": "Hayk Simonyan",
    "duration": "45 Mins",
    "level": "Advanced",
    "description": "Step-by-step architectural design for distributed file synchronization systems: chunking large files, deduplication, metadata databases, and cross-device conflict resolution.",
    "topics": [
      "File Sync Architecture",
      "Chunking & Dedup",
      "Metadata DB",
      "S3 Object Store",
      "Conflict Resolution"
    ]
  },
  {
    "id": "lec-sys-8",
    "youtubeId": "9T-gNZ5bGCw",
    "title": "Why Do Databases Fail? Anti-Patterns to Avoid in Production",
    "category": "System Design",
    "instructor": "Gaurav Sen",
    "channel": "Gaurav Sen",
    "duration": "20 Mins",
    "level": "Intermediate",
    "description": "Crucial production lessons on database failure modes: deadlocks, index degradation, unindexed foreign key lookups, connection exhaustion, and replication lag.",
    "topics": [
      "Database Anti-Patterns",
      "Deadlocks",
      "Replication Lag",
      "Connection Pools",
      "Index Tuning"
    ]
  },
  {
    "id": "lec-sys-9",
    "youtubeId": "dmGybCohHsw",
    "title": "Cloud Computing Complete Syllabus & System Models",
    "category": "System Design",
    "instructor": "Varun Singla",
    "channel": "Gate Smashers",
    "duration": "30 Mins",
    "level": "Beginner",
    "description": "Academic and competitive foundations of cloud system architecture: IaaS, PaaS, SaaS, virtualization hypervisors, and multi-tenant resource scheduling.",
    "topics": [
      "IaaS vs PaaS vs SaaS",
      "Hypervisors",
      "Resource Scheduling",
      "Virtualization",
      "Fault Tolerance"
    ]
  },
  {
    "id": "lec-sys-10",
    "youtubeId": "aaL61HouKLs",
    "title": "Evolution of Cloud Systems & High-Availability Principles",
    "category": "System Design",
    "instructor": "Varun Singla",
    "channel": "Gate Smashers",
    "duration": "35 Mins",
    "level": "Beginner",
    "description": "How computing transitioned from centralized mainframes and grid computing to elastic cloud clusters, SLA definitions, and nine-nines availability architectures.",
    "topics": [
      "Cluster Computing",
      "High Availability",
      "SLA Metrics",
      "Elasticity",
      "Failure Domains"
    ]
  },
  {
    "id": "lec-ai-1",
    "youtubeId": "2maPaQutcWs",
    "title": "Generative AI on AWS \u2014 Amazon Bedrock Full Crash Course",
    "category": "Generative AI",
    "instructor": "Krish Naik",
    "channel": "Krish Naik",
    "duration": "1.5 Hours",
    "level": "Intermediate",
    "description": "Hands-on building with Amazon Bedrock: accessing foundation models (Claude 3.7, Amazon Nova, Llama 3), API integrations via Boto3, prompt engineering, and vector search with RAG.",
    "topics": [
      "Amazon Bedrock",
      "Boto3 SDK",
      "RAG Pipelines",
      "Prompt Engineering",
      "Vector Embeddings"
    ]
  },
  {
    "id": "lec-ai-2",
    "youtubeId": "_vdK5PgcNvc",
    "title": "Introducing Amazon Bedrock: Foundation Models & AI Workloads",
    "category": "Generative AI",
    "instructor": "AWS GenAI Specialist Team",
    "channel": "Amazon Web Services",
    "duration": "20 Mins",
    "level": "Beginner",
    "description": "Official architecture introduction to Amazon Bedrock: serverless AI APIs, knowledge bases, agent orchestration, fine-tuning, and enterprise security guardrails.",
    "topics": [
      "Foundation Models",
      "Knowledge Bases",
      "AI Agents",
      "Security Guardrails",
      "Serverless AI"
    ]
  },
  {
    "id": "lec-ai-3",
    "youtubeId": "TsLiW91GjPM",
    "title": "AWS Bedrock Tutorial: Setup, Model Access & Real-Time Invocations",
    "category": "Generative AI",
    "instructor": "Rajeev Kanth",
    "channel": "BEPEC",
    "duration": "35 Mins",
    "level": "Beginner",
    "description": "Step-by-step walkthrough in the AWS Console requesting foundation model access, testing text prompts in Bedrock Playgrounds, and generating Python API calls.",
    "topics": [
      "Bedrock Playground",
      "Model Request",
      "Prompt Testing",
      "Python API",
      "Access Controls"
    ]
  },
  {
    "id": "lec-ai-4",
    "youtubeId": "LkR3GNDB0HI",
    "title": "AWS SageMaker for Machine Learning & Deep Learning Playlist",
    "category": "Generative AI",
    "instructor": "Krish Naik",
    "channel": "Krish Naik",
    "duration": "2 Hours",
    "level": "Intermediate",
    "description": "End-to-end ML workflows on AWS SageMaker: setting up Jupyter Lab instances, feature engineering, model training algorithms, hyperparameter tuning, and endpoint deployment.",
    "topics": [
      "SageMaker Studio",
      "Model Training",
      "Hyperparameter Tuning",
      "Inference Endpoints",
      "Data Prep"
    ]
  },
  {
    "id": "lec-ai-5",
    "youtubeId": "HuDzjNTgS2A",
    "title": "Build, Train & Deploy Machine Learning Models in AWS",
    "category": "Generative AI",
    "instructor": "Krish Naik",
    "channel": "Krish Naik",
    "duration": "45 Mins",
    "level": "Intermediate",
    "description": "Practical tutorial deploying predictive machine learning models to production using Amazon S3 storage buckets, SageMaker built-in estimators, and REST prediction endpoints.",
    "topics": [
      "SageMaker Estimators",
      "S3 Training Data",
      "Real-Time Inference",
      "Boto3 Deployment",
      "MLOps"
    ]
  },
  {
    "id": "lec-ai-6",
    "youtubeId": "5p248yoa3oE",
    "title": "Andrew Ng: Opportunities in Artificial Intelligence & Foundation Models",
    "category": "Generative AI",
    "instructor": "Andrew Ng",
    "channel": "DeepLearning.AI",
    "duration": "45 Mins",
    "level": "Beginner",
    "description": "Insightful keynote by AI pioneer Andrew Ng on building AI-first software applications, foundation model capabilities, enterprise adoption trends, and agentic workflows.",
    "topics": [
      "AI Opportunities",
      "Foundation Models",
      "Agentic Workflows",
      "Prompt Engineering",
      "AI Ethics"
    ]
  },
  {
    "id": "lec-ai-7",
    "youtubeId": "xUtGqC-NXJE",
    "title": "Automating Cloud AI & Infrastructure with Terraform",
    "category": "Generative AI",
    "instructor": "Piyush Sachdeva",
    "channel": "Tech Tutorials with Piyush",
    "duration": "1 Hour",
    "level": "Intermediate",
    "description": "Provision automated AI data pipelines and serverless backend resources on AWS using Terraform infrastructure modules, S3 buckets, and IAM execution roles.",
    "topics": [
      "AI Infrastructure",
      "Terraform Modules",
      "Data Pipeline",
      "IAM Execution Roles",
      "Serverless Setup"
    ]
  },
  {
    "id": "lec-ai-8",
    "youtubeId": "rGx1QNdYzvs",
    "title": "Data Engineering & Analytics for AI Applications",
    "category": "Generative AI",
    "instructor": "Alex Freberg",
    "channel": "Alex The Analyst",
    "duration": "4 Hours",
    "level": "Beginner",
    "description": "Core data engineering skills necessary for training and feeding AI models: SQL queries, data cleansing, ETL pipelines, and working with cloud data warehouses.",
    "topics": [
      "Data Cleansing",
      "SQL Pipelines",
      "ETL Workflows",
      "Vector Preparation",
      "Data Warehouses"
    ]
  },
  {
    "id": "lec-ai-9",
    "youtubeId": "H83xYoC3z4A",
    "title": "Serverless AI & Web Hosting: Deploying Modern AI Frontends",
    "category": "Generative AI",
    "instructor": "Tiny Technical Tutorials",
    "channel": "Tiny Technical Tutorials",
    "duration": "1 Hour",
    "level": "Beginner",
    "description": "Deploy responsive AI application frontends connected to cloud backends using Amazon S3, CloudFront CDN, and Route 53 with custom domain SSL encryption.",
    "topics": [
      "S3 Web Hosting",
      "CloudFront Distribution",
      "Edge Caching",
      "SSL Certificates",
      "AI UI"
    ]
  },
  {
    "id": "lec-ai-10",
    "youtubeId": "EN4fEbcFZ_E",
    "title": "Cloud Computing & Next-Gen AI Infrastructure Masterclass",
    "category": "Generative AI",
    "instructor": "Simplilearn Cloud Experts",
    "channel": "Simplilearn",
    "duration": "5 Hours",
    "level": "Beginner",
    "description": "Comprehensive masterclass on modern cloud architectures powering generative AI: GPU compute clusters, Elastic Fabric Adapter (EFA), high-throughput storage, and scalable APIs.",
    "topics": [
      "GPU Compute",
      "AI Infrastructure",
      "High-Throughput Storage",
      "Elastic Fabric",
      "Scalable APIs"
    ]
  }
];
