export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  level: "Foundations" | "Intermediate" | "Expert";
  levelCode: "Level 100" | "Level 200-300" | "Level 400";
  awsServices: string[];
  summary: string;
  keyInsights: string[];
  pdfUrl: string;
  cliSnippet: {
    title: string;
    description: string;
    command: string;
    explanation: string;
  };
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  // FOUNDATIONS (LEVEL 100)
  {
    id: "amazon-dynamo-2007",
    title: "Dynamo: Amazon's Highly Available Key-value Store",
    authors: "Giuseppe DeCandia, Deniz Hastorun, Madan Jampani, et al. (Amazon)",
    venue: "ACM SOSP 2007",
    year: 2007,
    level: "Foundations",
    levelCode: "Level 100",
    awsServices: ["Amazon DynamoDB", "Amazon S3", "Apache Cassandra"],
    summary:
      "The seminal architecture paper that birthed modern NoSQL. Explains how Amazon achieved 99.9th percentile SLA latency on shopping carts using consistent hashing and quorum replication.",
    keyInsights: [
      "Consistent Hashing with virtual nodes (tokens) for incremental linear scale without hotspotting.",
      "Sloppy Quorum & Hinted Handoff (N, R, W) favoring availability over strict consistency under network partitions.",
      "Vector Clocks for decentralized conflict reconciliation and optimistic writes.",
      "Background Anti-Entropy with Merkle trees for rapid divergence detection across replicas.",
    ],
    pdfUrl: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
    cliSnippet: {
      title: "Query DynamoDB with Strongly Consistent Reads",
      description: "Experiment with DynamoDB's R/W quorum semantics using the AWS CLI.",
      command: `aws dynamodb get-item \\
  --table-name UserSessions \\
  --key '{"SessionId": {"S": "sess_builder_99"}}' \\
  --consistent-read \\
  --return-consumed-capacity TOTAL`,
      explanation:
        "The `--consistent-read` flag forces DynamoDB to query a majority quorum of storage nodes, reflecting the R + W > N quorum guarantee introduced in the Dynamo paper.",
    },
  },
  {
    id: "lamport-logical-clocks-1978",
    title: "Time, Clocks, and the Ordering of Events in a Distributed System",
    authors: "Leslie Lamport (Massachusetts Computer Associates)",
    venue: "Communications of the ACM (CACM)",
    year: 1978,
    level: "Foundations",
    levelCode: "Level 100",
    awsServices: ["AWS EventBridge", "Amazon SQS FIFO", "AWS X-Ray"],
    summary:
      "The most foundational distributed systems paper ever written. Proves that physical wall-clock time cannot order distributed events and introduces logical timestamps.",
    keyInsights: [
      "The 'Happens-Before' relation (->) defining partial order in concurrent systems.",
      "Lamport Timestamps: Monotonically increasing counters synchronized on message receipt.",
      "State Machine Replication: Ordering state transitions deterministically across nodes.",
      "Why relying on NTP clocks alone causes distributed data corruption.",
    ],
    pdfUrl: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf",
    cliSnippet: {
      title: "Trace Distributed Message Causality via AWS X-Ray",
      description: "Inspect causal message traces across microservices with trace IDs.",
      command: `aws xray get-trace-summaries \\
  --start-time $(date -v-1H +%s) \\
  --end-time $(date +%s) \\
  --filter-expression 'service("OrderService") AND error = false' \\
  --query 'TraceSummaries[*].[Id, Duration, ResponseTime]'`,
      explanation:
        "AWS X-Ray trace headers (X-Amzn-Trace-Id) propagate Lamport-style causal chains across asynchronous API calls and serverless Lambda functions.",
    },
  },
  {
    id: "google-mapreduce-2004",
    title: "MapReduce: Simplified Data Processing on Large Clusters",
    authors: "Jeffrey Dean, Sanjay Ghemawat (Google)",
    venue: "USENIX OSDI 2004",
    year: 2004,
    level: "Foundations",
    levelCode: "Level 100",
    awsServices: ["Amazon EMR", "AWS Glue", "Amazon Athena"],
    summary:
      "Introduced functional data parallelism (Map and Reduce) to commodity server clusters, igniting modern big data processing and cloud analytics.",
    keyInsights: [
      "Separation of user business logic (mapper/reducer) from distributed execution details.",
      "Moving compute to data: scheduling tasks on machines physically storing the chunk.",
      "Automatic speculative execution (backup tasks) to defeat stragglers.",
      "Deterministic fault tolerance via re-execution of idempotent partitions.",
    ],
    pdfUrl: "https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf",
    cliSnippet: {
      title: "Launch an AWS EMR Serverless Spark / MapReduce Job",
      description: "Execute a distributed mapper/reducer across GigaBytes in S3.",
      command: `aws emr-serverless start-job-run \\
  --application-id "00f123456789abc" \\
  --execution-role-arn "arn:aws:iam::123456789012:role/EMRServerlessRole" \\
  --job-driver '{"sparkSubmit": {"entryPoint": "s3://aws-sbg-data/jobs/wordcount.py"}}'`,
      explanation:
        "Amazon EMR dynamically provisions compute partitions to process massive input splits in Amazon S3, directly realizing the MapReduce computing model.",
    },
  },

  // INTERMEDIATE (LEVEL 200-300)
  {
    id: "aws-firecracker-2020",
    title: "Firecracker: Lightweight Virtualization for Serverless Applications",
    authors: "Alexandru Agache, Marc Brooker, Andreea Florescu, et al. (Amazon Web Services)",
    venue: "USENIX NSDI 2020",
    year: 2020,
    level: "Intermediate",
    levelCode: "Level 200-300",
    awsServices: ["AWS Lambda", "AWS Fargate", "Amazon ECS"],
    summary:
      "AWS's revolutionary open-source MicroVM engine written in Rust. Achieves multi-tenant hardware isolation in under 5 milliseconds with less than 5MB memory overhead.",
    keyInsights: [
      "Replaces heavy QEMU with a minimal Rust VMM utilizing Linux KVM.",
      "Drops legacy hardware device emulation in favor of virtio-net, virtio-block, and virtio-vsock.",
      "Enables over-subscription of CPU and memory for massive serverless density.",
      "Rate-limiting built directly into the IO engine using token buckets.",
    ],
    pdfUrl: "https://www.usenix.org/system/files/nsdi20-paper-agache.pdf",
    cliSnippet: {
      title: "Boot a Firecracker MicroVM via Local UNIX Socket API",
      description: "Configure kernel, rootfs, and start a MicroVM in milliseconds.",
      command: `curl --unix-socket /tmp/firecracker.socket -i \\
  -X PUT 'http://localhost/actions' \\
  -H 'Content-Type: application/json' \\
  -d '{"action_type": "InstanceStart"}'`,
      explanation:
        "Firecracker exposes a REST API over a local UNIX domain socket that AWS Lambda orchestrates to spawn tenant microVMs on demand.",
    },
  },
  {
    id: "raft-consensus-2014",
    title: "In Search of an Understandable Consensus Algorithm (Raft)",
    authors: "Diego Ongaro and John Ousterhout (Stanford University)",
    venue: "USENIX ATC 2014",
    year: 2014,
    level: "Intermediate",
    levelCode: "Level 200-300",
    awsServices: ["Amazon EKS (etcd)", "AWS Systems Manager", "Consul"],
    summary:
      "Designed specifically for understandability to replace Paxos. Raft decomposes distributed consensus into leader election, log replication, and safety.",
    keyInsights: [
      "Strong Leader model: log entries only flow outward from the elected leader.",
      "Randomized election timeouts to prevent split votes during leader failovers.",
      "Log Matching Invariant: identical index & term guarantees identical prior logs.",
      "Safe cluster membership changes via 2-phase joint consensus.",
    ],
    pdfUrl: "https://raft.github.io/raft.pdf",
    cliSnippet: {
      title: "Inspect etcd Raft Cluster Leadership and Log Index",
      description: "Examine consensus term, leader ID, and applied Raft index.",
      command: `etcdctl endpoint status --write-out=table \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt`,
      explanation:
        "Shows the current Raft Term, whether the node is the Raft Leader, and the Raft Applied Index in Kubernetes control planes.",
    },
  },
  {
    id: "kafka-messaging-2011",
    title: "Kafka: A Distributed Messaging System for Log Processing",
    authors: "Jay Kreps, Neha Narkhede, Jun Rao (LinkedIn)",
    venue: "ACM NetDB 2011",
    year: 2011,
    level: "Intermediate",
    levelCode: "Level 200-300",
    awsServices: ["Amazon MSK", "Amazon Kinesis Data Streams", "AWS EventBridge Pipes"],
    summary:
      "Re-imagined messaging as an append-only distributed commit log. Powers mission-critical event backbones across Amazon, Netflix, and Fortune 500 tech stacks.",
    keyInsights: [
      "O(1) disk writes utilizing sequential disk I/O and OS Page Cache.",
      "Zero-Copy network transfers with the Linux `sendfile()` system call bypass user-space memory copies.",
      "Dumb broker, smart consumer: consumers track their own offset pointers.",
      "Horizontal scale via topic partitioning with per-partition ordering guarantees.",
    ],
    pdfUrl: "https://notes.stephenholiday.com/Kafka.pdf",
    cliSnippet: {
      title: "Describe Amazon MSK Cluster & Partition Offsets",
      description: "Inspect topic partition status and high-watermark offsets.",
      command: `aws kafka describe-cluster-v2 \\
  --cluster-arn "arn:aws:kafka:ap-south-1:123456789012:cluster/sbg-events/abcd" \\
  --query 'ClusterInfo.Provisioned.[ClusterName, State, CurrentVersion]'`,
      explanation:
        "Amazon MSK (Managed Streaming for Apache Kafka) manages multi-broker replication with automatic partition rebalancing and EBS persistence.",
    },
  },

  // EXPERT (LEVEL 400)
  {
    id: "amazon-aurora-2017",
    title: "Amazon Aurora: Design Considerations for High Throughput Cloud-Native Relational Databases",
    authors: "Alexandre Verbitski, Anurag Gupta, Debanjan Saha, et al. (Amazon Web Services)",
    venue: "ACM SIGMOD 2017",
    year: 2017,
    level: "Expert",
    levelCode: "Level 400",
    awsServices: ["Amazon Aurora", "Amazon RDS Multi-AZ", "Amazon EBS"],
    summary:
      "The masterwork of cloud storage design. Decouples database compute from storage using 'The Log is the Database' philosophy, delivering 5x MySQL throughput.",
    keyInsights: [
      "'The Log is the Database': database engines write only REDO log records across the network, eliminating dirty page writes.",
      "6-way quorum replication across 3 Availability Zones (4 of 6 write quorum, 3 of 6 read quorum).",
      "Self-healing storage fleet: continuous background gossip replaces corrupted 10GB segment splits without downtime.",
      "Elimination of double-write buffer and distributed checkpoints from the query critical path.",
    ],
    pdfUrl: "https://web.stanford.edu/class/cs245/readings/aurora.pdf",
    cliSnippet: {
      title: "Inspect Aurora Cluster Multi-AZ Storage Quorum & Replicas",
      description: "Verify Aurora cluster endpoints, engine mode, and storage replication.",
      command: `aws rds describe-db-clusters \\
  --db-cluster-identifier "sbg-production-aurora" \\
  --query 'DBClusters[*].[Endpoint, Status, MultiAZ, AllocatedStorage]' \\
  --output table`,
      explanation:
        "Amazon Aurora automatically spreads each 10GB database slice across 6 storage nodes in 3 AWS Availability Zones, providing continuous write availability even during an AZ outage.",
    },
  },
  {
    id: "google-spanner-2012",
    title: "Spanner: Google's Globally-Distributed Database",
    authors: "James C. Corbett, Jeffrey Dean, Michael Epstein, et al. (Google)",
    venue: "USENIX OSDI 2012",
    year: 2012,
    level: "Expert",
    levelCode: "Level 400",
    awsServices: ["Amazon DynamoDB Global Tables", "Amazon Aurora Global Database"],
    summary:
      "The first globally distributed database providing external consistency (linearizability) across continents at scale using GPS and atomic clocks.",
    keyInsights: [
      "TrueTime API: exposes clock uncertainty explicitly as an interval [earliest, latest] with bounded epsilon.",
      "Commit Wait: guarantees transaction timestamps reflect real-world causal ordering without global coordinator communication.",
      "Multi-Version Concurrency Control (MVCC) enabling lock-free, strongly consistent global read transactions.",
      "Two-Phase Commit (2PC) executed over Paxos groups for cross-shard ACID transactions.",
    ],
    pdfUrl: "https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf",
    cliSnippet: {
      title: "Create DynamoDB Global Table with Multi-Region Active-Active Replication",
      description: "Deploy globally distributed tables across Mumbai and Singapore.",
      command: `aws dynamodb create-global-table \\
  --global-table-name UserProfiles \\
  --replication-group RegionName=ap-south-1 RegionName=ap-southeast-1`,
      explanation:
        "Employs distributed conflict resolution and multi-region replication inspired by Spanner and Dynamo to provide sub-10ms localized global access.",
    },
  },
  {
    id: "react-toolformer-agent-2023",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao",
    venue: "ICLR 2023",
    year: 2023,
    level: "Expert",
    levelCode: "Level 400",
    awsServices: ["Amazon Bedrock Agents", "AWS Lambda", "Anthropic Claude on Bedrock"],
    summary:
      "The core cognitive architecture powering modern AI agents. Integrates Thought (reasoning trace) and Action (API execution) to solve complex real-world workflows.",
    keyInsights: [
      "Interleaves explicit verbal reasoning tokens with discrete environment tool invocations.",
      "Observation tokens provide grounding to counteract hallucinations and dynamic state changes.",
      "Allows language models to inspect error exceptions, self-correct, and re-plan multi-hop paths.",
      "Forms the architectural foundation for Amazon Bedrock Agents and OpenAI Function Calling.",
    ],
    pdfUrl: "https://arxiv.org/pdf/2210.03629.pdf",
    cliSnippet: {
      title: "Invoke Amazon Bedrock Claude 3.7 with Native Tool Use Schema",
      description: "Trigger an autonomous agent ReAct loop with JSON schema tools.",
      command: `aws bedrock-runtime invoke-model \\
  --model-id "anthropic.claude-3-7-sonnet-20250219-v1:0" \\
  --body '{"anthropic_version":"bedrock-2023-05-31","max_tokens":1024,"messages":[{"role":"user","content":"Inspect S3 bucket sbg-backups and summarize logs"}]}' \\
  --cli-binary-format raw-in-base64-out \\
  response.json`,
      explanation:
        "Amazon Bedrock executes the ReAct loop: the model generates structured tool calls, Bedrock dispatches them to AWS Lambda actions, and feeds back observations.",
    },
  },
];

