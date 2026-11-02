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

// Cards for choosing an LLM on the Build AI agents page
export const buildModelCards = [
  {
    link: "../choose-right-model-agentic/",
    title: "Choose the right LLM",
    image: IconAoLlmImg,
    description: "Choose the right LLM for AI agents.",
  },
  {
    link: "../model-recommendations-agentic/",
    title: "LLM recommendations",
    image: IconAoLlmImg,
    description: "Best practices for working with models and prompts.",
  },
  {
    link: "../camunda-provided-llm/",
    title: "Camunda-provided LLM",
    image: IconAoLlmImg,
    description:
      "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-model-providers/",
    title: "AI Agent model providers",
    image: IconConnectorImg,
    description: "Configure the LLM provider used by the AI Agent connector.",
  },
];

// Cards for building a Camunda AI agent on the Build AI agents page
export const buildAgentCards = [
  {
    link: "../ai-agents/",
    title: "AI agents",
    image: IconAoAgentImg,
    description: "Learn about agent types and how the agent loop works.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-aiagent/",
    title: "AI Agent connector",
    image: IconConnectorImg,
    description:
      "Embed LLM-powered agents in your processes with the AI Agent connector.",
  },
  {
    link: "../add-tool-to-ai-agent/",
    title: "Add tools to an AI agent",
    image: IconAoAgentImg,
    description: "Add BPMN elements as callable tools to your AI agents.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions/",
    title: "AI agent tool definitions",
    image: IconConnectorImg,
    description:
      "Understand how tool names, descriptions, and parameters work.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-mcp-client/",
    title: "MCP Client",
    image: IconMCP,
    description: "Give your AI agent access to tools on MCP servers.",
  },
  {
    link: "../rag-ai-agents/",
    title: "Add long-term memory",
    image: IconRAG,
    description: "Add long-term memory to your AI agents.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-documents/",
    title: "Document support",
    image: IconConnectorImg,
    description: "Pass documents and images to the LLM.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-mcp-client-human-in-the-loop/",
    title: "Human in the loop",
    image: IconAoDesignImg,
    description: "Route sensitive tool calls to a person for approval.",
  },
];

// Cards for external agents on the Build AI agents page
export const buildExternalAgentCards = [
  {
    link: "../connect-external-agent/",
    title: "Connect an external agent",
    image: IconAoAgentImg,
    description: "Connect an agent built with an external framework.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/amazon-bedrock-agentcore-runtime/",
    title: "Amazon Bedrock AgentCore Runtime",
    image: IconConnectorImg,
    description: "Invoke agents deployed on AWS Bedrock AgentCore Runtime.",
  },
];

// Cards for exposing processes as tools on the Build AI agents page
export const buildExposeCards = [
  {
    link: "../expose-process-as-mcp-tool/",
    title: "Expose a process as an MCP tool",
    image: IconMCP,
    description:
      "Configure a BPMN process as a callable MCP tool for AI agents.",
  },
  {
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-mcp-start-event/",
    title: "MCP start event",
    image: IconConnectorImg,
    description: "Register a BPMN process as a callable MCP tool.",
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
