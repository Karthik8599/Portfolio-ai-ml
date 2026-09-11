/**
 * Single source of truth for every piece of content on the site.
 * Pulled from Siva Motamarri's resume + LinkedIn profile.
 * House rule: no em-dashes anywhere in copy.
 */

export const profile = {
  name: "Siva Motamarri",
  firstName: "Siva",
  role: "AI/ML Engineer",
  location: "San Francisco, California",
  email: "sivamotamarris@gmail.com",
  phone: "(314) 292-9809",
  linkedin: "https://www.linkedin.com/in/sivamotamarri/",
  linkedinLabel: "linkedin.com/in/sivamotamarri",
  resume: "Siva-Motamarri-Resume.pdf",
  /** one label per intent, used everywhere */
  contactCta: "Get in touch",
  headline:
    "I take AI systems from experiment to production. Reliable architectures, fast inference, and evaluation pipelines that keep them honest.",
  summary:
    "AI/ML Engineer with five years designing, building and deploying enterprise Generative AI, agentic systems, RAG and machine learning. I work across LLM applications, intelligent retrieval, multi-agent workflows and the infrastructure that serves them at scale.",
} as const;

/**
 * The one place metrics live on the whole site (the hero stat row).
 * Kept deliberately short: three numbers, not a dashboard.
 */
export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Years in production AI" },
  { value: 2, suffix: "M+", label: "Requests served monthly" },
  { value: 36, suffix: "%", label: "Lower inference latency" },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Scale AI",
    role: "AI/ML Engineer",
    location: "San Francisco, CA",
    period: "Jun 2025 to Present",
    summary: "Multi-agent workflows and inference infrastructure for enterprise knowledge assistants.",
    highlights: [
      "Built multi-agent AI workflows with Python, LangGraph and FastAPI, powering enterprise knowledge assistants that handle over 2M monthly requests.",
      "Architected production RAG on LangChain, Pinecone and PostgreSQL with optimized semantic search and scalable document ingestion.",
      "Designed intelligent inference routing that picks the optimal model per workload, cutting serving cost with vLLM, TensorRT-LLM, Redis and Kubernetes.",
      "Deployed distributed inference on Ray Serve, Docker, Kubernetes and Prometheus. 3x higher concurrent traffic and 36% lower latency.",
      "Optimized multi-agent orchestration with LangGraph, Kafka and Redis Streams, improving workflow efficiency 29% across 1.5M automated tasks a month.",
      "Built automated LLM evaluation with DeepEval, LangSmith, MLflow and OpenAI Evals for continuous quality and regression checks.",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "Ray Serve", "vLLM", "Kubernetes", "Pinecone", "Kafka"],
  },
  {
    company: "Adobe",
    role: "Machine Learning Engineer",
    location: "San Jose, CA",
    period: "Apr 2024 to May 2025",
    summary: "Enterprise RAG, semantic search and LLM inference optimization on Azure.",
    highlights: [
      "Built enterprise RAG on LangChain, OpenSearch and embedding models serving 120,000+ users with hybrid retrieval optimization.",
      "Developed semantic search pipelines over millions of indexed documents using OpenSearch vector search and knowledge-graph retrieval.",
      "Optimized LLM inference with PyTorch, MLflow and continuous evaluation on Azure. 31% lower latency and reduced infrastructure cost.",
      "Automated end-to-end MLOps with MLflow, GitHub Actions, Docker, Kubernetes and model versioning for reproducible releases.",
      "Implemented hallucination detection, prompt optimization, guardrails and citation validation with Azure OpenAI.",
      "Designed multimodal retrieval on LangChain, OpenSearch, knowledge graphs and vector databases. 85,000+ monthly users, 29% better retrieval relevance.",
    ],
    stack: ["PyTorch", "LangChain", "OpenSearch", "Azure OpenAI", "MLflow", "Docker", "Kubernetes"],
  },
  {
    company: "Accenture",
    role: "Machine Learning Engineer",
    location: "India",
    period: "Mar 2020 to Jul 2023",
    summary: "Feature engineering, forecasting models and large-scale data pipelines.",
    highlights: [
      "Built Python feature-engineering pipelines with PySpark, Databricks, Delta Lake and Scikit-learn, producing ML-ready datasets for 800+ users.",
      "Designed forecasting and classification models with XGBoost and MLflow. 19% better prediction accuracy on production workloads.",
      "Built batch and streaming pipelines with Apache Airflow, Spark Structured Streaming and AWS Glue across multi-source datasets.",
      "Developed containerized ML microservices (FastAPI, Docker, Kubernetes) delivering sub-second prediction APIs for 600+ daily users.",
      "Optimized Spark processing, Delta Lake storage, caching and partitioning on AWS. 34% lower data-processing cost.",
    ],
    stack: ["Python", "PySpark", "Databricks", "XGBoost", "Airflow", "AWS Glue", "FastAPI"],
  },
];

export type Project = {
  title: string;
  kind: string;
  blurb: string;
  metrics: { label: string; value: string }[];
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Multi-Agent Knowledge Platform",
    kind: "Agentic AI",
    blurb:
      "Orchestrated LangGraph agents behind a FastAPI gateway, powering enterprise knowledge assistants with reliable performance at scale.",
    metrics: [
      { label: "Requests / month", value: "2M+" },
      { label: "Workflow efficiency", value: "+29%" },
      { label: "Automated tasks / mo", value: "1.5M+" },
    ],
    tags: ["LangGraph", "FastAPI", "Kafka", "Redis Streams", "Python"],
  },
  {
    title: "Production RAG Engine",
    kind: "Retrieval-Augmented Generation",
    blurb:
      "Hybrid semantic and keyword retrieval over millions of documents, with scalable ingestion, re-ranking and citation validation for grounded answers.",
    metrics: [
      { label: "Users served", value: "120K+" },
      { label: "Retrieval relevance", value: "+29%" },
      { label: "Vector store", value: "Pinecone" },
    ],
    tags: ["LangChain", "Pinecone", "OpenSearch", "Knowledge Graphs", "PostgreSQL"],
  },
  {
    title: "Intelligent Inference Router",
    kind: "AI Infrastructure",
    blurb:
      "A routing service that scores each request and dispatches it to the cheapest capable model, backed by distributed serving on Ray Serve.",
    metrics: [
      { label: "Latency", value: "-36%" },
      { label: "Concurrent traffic", value: "3x" },
      { label: "Serving", value: "vLLM, TensorRT" },
    ],
    tags: ["Ray Serve", "vLLM", "TensorRT-LLM", "Kubernetes", "Redis"],
  },
  {
    title: "LLM Evaluation and Guardrails",
    kind: "AI Safety and MLOps",
    blurb:
      "A continuous evaluation harness that scores model quality, prompt reliability and regressions, wired into CI with guardrails that gate every release.",
    metrics: [
      { label: "Response accuracy", value: "+18%" },
      { label: "Hallucinations", value: "Reduced" },
      { label: "Tooling", value: "DeepEval" },
    ],
    tags: ["DeepEval", "LangSmith", "MLflow", "OpenAI Evals", "Guardrails"],
  },
];

/**
 * The curated "mastery" set for the Skills section. Not a dump of every skill on
 * the resume, just the tools reached for daily. `icon` is a simple-icons export
 * name, resolved in the Skills component. `bg` / `fg` are a soft tint pulled from
 * each tool's real brand colour, tuned for a dark surface: a low-alpha wash of
 * the brand hue behind a brightened version of it, so every tile carries its
 * own quiet identity instead of one flat monochrome set.
 */
export type FlagshipSkill = { name: string; note: string; icon: string; bg: string; fg: string };

export const flagshipSkills: FlagshipSkill[] = [
  { name: "Python", note: "Primary language, five years", icon: "siPython", bg: "rgba(55,118,171,0.16)", fg: "#6FA8DC" },
  { name: "PyTorch", note: "Training, fine-tuning, inference", icon: "siPytorch", bg: "rgba(238,76,44,0.15)", fg: "#FF8567" },
  { name: "LangGraph", note: "Multi-agent orchestration", icon: "siLanggraph", bg: "rgba(127,200,255,0.15)", fg: "#8FD0FF" },
  { name: "Hugging Face", note: "Models, datasets, embeddings", icon: "siHuggingface", bg: "rgba(255,210,30,0.15)", fg: "#FFDD57" },
  { name: "NVIDIA", note: "TensorRT-LLM, GPU serving", icon: "siNvidia", bg: "rgba(118,185,0,0.15)", fg: "#9ADC1F" },
  { name: "Ray", note: "Distributed inference at scale", icon: "siRay", bg: "rgba(2,140,240,0.16)", fg: "#5FBBFF" },
  { name: "FastAPI", note: "Production model APIs", icon: "siFastapi", bg: "rgba(0,150,136,0.16)", fg: "#3DDCC8" },
  { name: "MLflow", note: "Evaluation and MLOps", icon: "siMlflow", bg: "rgba(1,148,226,0.16)", fg: "#5FC2FF" },
  { name: "Kubernetes", note: "Orchestration and scale", icon: "siKubernetes", bg: "rgba(50,108,229,0.16)", fg: "#8CA8FF" },
];

export const marqueeSkills: string[] = [
  "Generative AI",
  "Agentic AI",
  "LLMs",
  "RAG",
  "PyTorch",
  "LangGraph",
  "vLLM",
  "Kubernetes",
  "Ray Serve",
  "Vector Search",
  "MLOps",
  "Distributed Inference",
  "AI Safety",
  "Knowledge Graphs",
  "FastAPI",
  "AWS and Azure",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];
