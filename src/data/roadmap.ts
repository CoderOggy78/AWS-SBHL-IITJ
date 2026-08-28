export interface RoadmapMilestone {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedWeeks: string;
  description: string;
  keySkills: string[];
  awsServices: string[];
  practiceProjects: string[];
  recommendedCert: string;
  checkpoint: string;
}

export const CLOUD_ROADMAP_STAGES: RoadmapMilestone[] = [
  {
    id: "stage-1",
    title: "Phase 1: Computer Science & Systems Foundations",
    level: "Beginner",
    estimatedWeeks: "Weeks 1 – 4",
    description:
      "Master the essential operating system and networking primitives that every cloud engineer and systems programmer must know before touching AWS infrastructure.",
    keySkills: [
      "Linux Operating System fundamentals & Bash scripting",
      "TCP/IP, Subnetting, CIDR blocks, IPv4/IPv6, and OSI model",
      "DNS records (A, CNAME, ALIAS, MX, TXT) and HTTP/1.1 vs HTTP/2/3",
      "SSL/TLS Handshakes, Public Key Cryptography, and SSH keypairs",
      "Git version control, Branching strategies, and GitHub workflows",
      "Python 3 or TypeScript programming for automation scripts",
    ],
    awsServices: ["AWS Free Tier Account Setup", "AWS CloudShell", "AWS CLI v2 configuration"],
    practiceProjects: [
      "Write a Bash script to monitor server CPU/Memory and send alerts",
      "Configure a custom domain with SSL certs on a local Nginx reverse proxy",
      "Automate GitHub repository setup with pre-commit lint hooks",
    ],
    recommendedCert: "Linux Foundation Certified System Administrator (LFCS) or CS50",
    checkpoint: "Can comfortably navigate the terminal, write shell scripts, and debug DNS/HTTP network issues.",
  },
  {
    id: "stage-2",
    title: "Phase 2: AWS Core Essentials & Cloud Practitioner",
    level: "Beginner",
    estimatedWeeks: "Weeks 5 – 8",
    description:
      "Understand the foundational building blocks of the Amazon Web Services ecosystem. Learn identity governance, virtual private clouds, compute instances, and object storage.",
    keySkills: [
      "IAM Policies, Users, Roles, Groups, and Multi-Factor Authentication (MFA)",
      "VPC Networking: Public/Private subnets, Internet Gateways, Route Tables, NAT Gateways",
      "EC2 compute: Instance types, AMIs, Keypairs, Security Groups vs NACLs",
      "S3 Storage: Buckets, Versioning, Lifecycle Rules, Presigned URLs, Static Hosting",
      "Relational Databases: Amazon RDS PostgreSQL/MySQL, Multi-AZ, Read Replicas",
      "CloudWatch Alarms, Metrics, and CloudTrail audit logging",
      "AWS Billing, Cost Explorer, Budgets, and the AWS Shared Responsibility Model",
    ],
    awsServices: [
      "Amazon EC2",
      "Amazon S3",
      "Amazon VPC",
      "AWS IAM",
      "Amazon RDS",
      "Amazon CloudWatch",
      "AWS CloudTrail",
    ],
    practiceProjects: [
      "Deploy a 2-tier web application (FastAPI + RDS PostgreSQL) inside a custom VPC",
      "Host a secure static portfolio website on S3 with CloudFront HTTPS distribution",
      "Configure automated nightly EC2 snapshots with CloudWatch event triggers",
    ],
    recommendedCert: "AWS Certified Cloud Practitioner (CLF-C02)",
    checkpoint: "Can architect a secure VPC from scratch and pass the AWS Cloud Practitioner exam with 850+.",
  },
  {
    id: "stage-3",
    title: "Phase 3: Serverless Architectures & Distributed Systems",
    level: "Intermediate",
    estimatedWeeks: "Weeks 9 – 14",
    description:
      "Transition from managing virtual machines to building resilient, highly scalable event-driven serverless backends with zero idle cost.",
    keySkills: [
      "AWS Lambda: Execution lifecycle, Cold starts, Concurrency limits, Layers",
      "Amazon API Gateway: REST vs HTTP APIs, Request validation, CORS, Cognito Authorizers",
      "Amazon DynamoDB: Single-table design, Partition & Sort keys, GSI, TTL, DynamoDB Streams",
      "Decoupled Messaging: Amazon SQS (Standard vs FIFO), Amazon SNS fan-out",
      "Event-Driven Architecture: Amazon EventBridge custom event buses and schema registry",
      "State Machines: AWS Step Functions for distributed transaction workflows & saga patterns",
      "Asynchronous processing, Idempotency, and Dead-Letter Queues (DLQ)",
    ],
    awsServices: [
      "AWS Lambda",
      "Amazon API Gateway",
      "Amazon DynamoDB",
      "Amazon SQS",
      "Amazon SNS",
      "Amazon EventBridge",
      "AWS Step Functions",
      "Amazon Cognito",
    ],
    practiceProjects: [
      "Build a high-throughput URL shortener with API Gateway, Lambda, and DynamoDB",
      "Implement an event-driven order processing pipeline with SQS FIFO and EventBridge",
      "Create a multi-step user onboarding saga workflow in AWS Step Functions with rollbacks",
    ],
    recommendedCert: "AWS Certified Developer Associate (DVA-C02) or Solutions Architect Associate (SAA-C03)",
    checkpoint: "Can build full-stack serverless APIs and model production access patterns in Amazon DynamoDB.",
  },
  {
    id: "stage-4",
    title: "Phase 4: Containers, Kubernetes & Infrastructure as Code (IaC)",
    level: "Intermediate",
    estimatedWeeks: "Weeks 15 – 20",
    description:
      "Modernize application deployments with container runtimes, Kubernetes clusters, declarative Infrastructure as Code (IaC), and automated CI/CD release pipelines.",
    keySkills: [
      "Docker: Multi-stage builds, Distroless images, Container security scanning",
      "Amazon ECR: Private image repositories, Image scanning on push, Lifecycle policies",
      "Amazon ECS with AWS Fargate: Task definitions, Services, Application Load Balancer target groups",
      "Amazon EKS: Kubernetes architecture, Pods, Deployments, Services, Helm charts, Karpenter",
      "Infrastructure as Code: AWS Cloud Development Kit (CDK) in TypeScript or HashiCorp Terraform",
      "CI/CD Pipelines: GitHub Actions, AWS OIDC federated credentials, automated testing and zero-downtime blue/green rollouts",
    ],
    awsServices: [
      "Amazon ECR",
      "Amazon ECS Fargate",
      "Amazon EKS",
      "AWS CDK",
      "Terraform",
      "Elastic Load Balancing (ALB)",
      "AWS Secrets Manager",
    ],
    practiceProjects: [
      "Deploy a microservices application on Amazon ECS Fargate managed 100% via AWS CDK",
      "Provision a production-grade Amazon EKS cluster with Karpenter spot node autoscaling via Terraform",
      "Create a GitHub Actions pipeline with zero hardcoded AWS keys using IAM GitHub OIDC",
    ],
    recommendedCert: "AWS Certified Solutions Architect Associate (SAA-C03) & Certified Kubernetes Administrator (CKA)",
    checkpoint: "Never click in the AWS Console to deploy infrastructure; everything is reproducible via CDK/Terraform code.",
  },
  {
    id: "stage-5",
    title: "Phase 5: Production Scale, Cloud Security, Big Data & GenAI",
    level: "Advanced",
    estimatedWeeks: "Weeks 21 – 28+",
    description:
      "Reach elite engineering mastery: multi-account landing zones, zero-trust security postures, streaming big data lakes, and cutting-edge GenAI/RAG architectures on AWS.",
    keySkills: [
      "Enterprise Multi-Account Architecture: AWS Organizations, Control Tower, Service Control Policies (SCPs)",
      "Cloud Security & Compliance: AWS WAF, AWS Shield, Amazon GuardDuty, Security Hub, KMS envelope encryption",
      "Real-Time Big Data: Amazon Kinesis Data Streams, Managed Apache Flink, Glue Data Catalog, Athena",
      "Generative AI & LLMs on AWS: Amazon Bedrock, Titan & Claude 3.5, Vector search in OpenSearch Serverless, RAG pipelines",
      "Observability & SRE: OpenTelemetry, AWS X-Ray distributed tracing, CloudWatch Synthetics canary tests",
      "Disaster Recovery: Cross-region replication, Route 53 Application Recovery Controller (ARC), RTO/RPO optimization",
    ],
    awsServices: [
      "Amazon Bedrock",
      "Amazon OpenSearch Serverless",
      "AWS Organizations & Control Tower",
      "Amazon Kinesis & Flink",
      "AWS WAF & Shield",
      "AWS KMS",
      "Amazon GuardDuty",
    ],
    practiceProjects: [
      "Architect a campus RAG search engine with Amazon Bedrock and OpenSearch Serverless",
      "Implement automated multi-region active-active failover with DynamoDB Global Tables and Route 53",
      "Build a real-time fraud detection pipeline processing 20k events/sec using Kinesis and Apache Flink",
    ],
    recommendedCert: "AWS Certified Solutions Architect Professional (SAP-C02) or AWS Certified Security / Machine Learning Specialty",
    checkpoint: "Capable of designing fault-tolerant, cost-optimized, secure multi-region enterprise architectures for millions of users.",
  },
];
