import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";
import IconConnectorImg from "../connectors/img/icon-connectors.png";
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

// Cards on the Build AI agents page
export const buildCapabilityCards = [
  {
    link: "../add-tool-to-ai-agent/",
    title: "Add tools to an AI agent",
    image: IconAoAgentImg,
    description: "Add BPMN elements as callable tools to your AI agents.",
  },
  {
    link: "../rag-ai-agents/",
    title: "Add long-term memory",
    image: IconRAG,
    description:
      "Add long-term memory to your AI agents using RAG and the Vector Database connector.",
  },
];

export const buildExternalAgentCards = [
  {
    link: "../connect-external-agent/",
    title: "Connect an external agent",
    image: IconAoAgentImg,
    description:
      "Connect an agent built with an external framework, such as LangGraph or CrewAI, to Camunda.",
  },
];

export const buildExposeCards = [
  {
    link: "../expose-process-as-mcp-tool/",
    title: "Expose a process as an MCP tool",
    image: IconMCP,
    description:
      "Expose BPMN processes as MCP tools so AI agents can discover and run them.",
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
