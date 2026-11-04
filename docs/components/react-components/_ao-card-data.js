import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";
import IconOptimize from "../assets/icon-optimize.png";
import IconConnectorImg from "../connectors/img/icon-connectors.png";
import IconOperate from "../assets/icon-operate.png";
import IconTest from "../hub/workspace/modeler/idp/img/icon-prereqs.png";
import IconRAG from "../assets/icon-long-term-memory.png";
import IconMCP from "../assets/icon-mcp.png";

// Get started cards on introduction page
export const getStartedCards = [
  {
    link: "../../../guides/getting-started-agentic-orchestration/",
    title: "Build your first AI agent",
    image: IconAoImg,
    description: "Get started by running your first AI agent.",
  },
  {
    link: "../camunda-provided-llm/",
    title: "Camunda-provided LLM",
    image: IconAoLlmImg,
    description:
      "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.",
  },
];

// Fundamentals cards on introduction page
export const fundamentalCards = [
  {
    link: "../ai-agents/",
    title: "AI agents",
    image: IconAoAgentImg,
    description:
      "Build and integrate AI agents into your end-to-end processes.",
  },
  {
    link: "../agent-definitions-and-instances/",
    title: "Definitions and instances",
    image: IconAoDesignImg,
    description: "Understand how Camunda models AI agents.",
  },
  {
    link: "../agent-states-and-metrics/",
    title: "States and usage metrics",
    image: IconAoDesignImg,
    description: "Understand agent states and usage metrics.",
  },
];

// Evaluate cards on the Evaluate AI agents page
export const evaluateCards = [
  {
    link: "../test-ai-agents/",
    title: "Test with CPT",
    image: IconTest,
    description: "Test your AI agents with Camunda Process Test.",
  },
  {
    link: "../monitor-ai-agents/",
    title: "Monitor with Operate",
    image: IconOperate,
    description: "Monitor your AI agents with Operate.",
  },
  {
    link: "../detect-off-rail-agents/",
    title: "Detect off-rail agents",
    image: IconAoAgentImg,
    description: "Identify a stuck or looping AI agent before it fails.",
  },
  {
    link: "../analyze-ai-agents/",
    title: "Analyze with Optimize",
    image: IconOptimize,
    description: "Analyze your AI agents with Optimize.",
  },
  {
    link: "../../agent-states-and-metrics/",
    title: "States and usage metrics",
    image: IconAoDesignImg,
    description: "Understand agent states and usage metrics.",
  },
];

// Cards on the Build AI agents page
export const buildLlmCards = [
  {
    link: "../camunda-provided-llm/",
    title: "Camunda-provided LLM",
    image: IconAoLlmImg,
    description:
      "Run your agent right away in Camunda SaaS with a Camunda-managed LLM and no credentials to set up. Intended for testing and experimentation.",
  },
];

export const buildCapabilityCards = [
  {
    link: "../add-tool-to-ai-agent/",
    title: "Add tools to an AI agent",
    image: IconAoAgentImg,
    description:
      "Add BPMN elements to the agent's ad-hoc sub-process so the LLM can select and call them as tools.",
  },
  {
    link: "../rag-ai-agents/",
    title: "Add long-term memory",
    image: IconRAG,
    description:
      "Use retrieval-augmented generation (RAG) and the Vector Database connector to let your agent recall knowledge across process instances.",
  },
];

export const buildExternalAgentCards = [
  {
    link: "../connect-external-agent/",
    title: "Connect an external agent",
    image: IconAoAgentImg,
    description:
      "Orchestrate an agent built with a framework such as LangGraph or CrewAI, and surface its activity in Camunda.",
  },
];

export const buildExposeCards = [
  {
    link: "../expose-process-as-mcp-tool/",
    title: "Expose a process as an MCP tool",
    image: IconMCP,
    description:
      "Register a BPMN process as a callable tool in the Processes MCP Server so agents can discover and run it.",
  },
];

// Best practices cards on the Best practices page
export const bestPracticeCards = [
  {
    link: "../ai-usage-guidelines/",
    title: "AI usage guidelines",
    image: IconAoDesignImg,
    description: "Use Camunda AI features responsibly.",
  },
  {
    link: "../ao-design/",
    title: "Design and architecture",
    image: IconAoDesignImg,
    description: "Plan and design your agentic orchestration solutions.",
  },
  {
    link: "../choose-right-model-agentic/",
    title: "Choose the right LLM",
    image: IconAoLlmImg,
    description: "Choose the right Large Language Model (LLM) for AI agents.",
  },
  {
    link: "../model-recommendations-agentic/",
    title: "LLM recommendations",
    image: IconAoLlmImg,
    description: "Best practices for working with models and prompts.",
  },
];

export const a2aConnectorCards = [
  {
    link: "../a2a-client/a2a-client-connector/",
    title: "A2A Client connector",
    image: IconConnectorImg,
    description:
      "Retrieve a remote agent's Agent Card and send messages to it.",
  },
  {
    link: "../a2a-client/a2a-client-polling-connector/",
    title: "A2A Client Polling connector",
    image: IconConnectorImg,
    description: "Poll for responses from asynchronous A2A tasks.",
  },
  {
    link: "../a2a-client/a2a-client-webhook-connector/",
    title: "A2A Client Webhook connector",
    image: IconConnectorImg,
    description: "Receive callbacks from remote A2A agents via HTTP webhooks.",
  },
];
