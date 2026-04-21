import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";
import IconOptimize from "../assets/icon-optimize.png";
import IconConnectorImg from "../connectors/img/icon-connectors.png";
import IconOperate from "../assets/icon-operate.png";
import IconTest from "../modeler/web-modeler/idp/img/icon-prereqs.png";
import IconRAG from "../assets/icon-rag.png";

// Get started cards on introduction page
export const getStartedCards = [
  {
    link: "../../../guides/getting-started-agentic-orchestration/",
    title: "Build your first AI agent",
    image: IconAoImg,
    description: "Get started by building and running your first AI agent.",
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
    link: "../ao-design/",
    title: "Design and architecture",
    image: IconAoDesignImg,
    description: "Plan and design your agentic orchestration solutions.",
  },
];

// Fundamentals cards on introduction page
export const fundamentalCards_monitoring = [
  {
    link: "../monitor-ai-agents/",
    title: "Monitor your AI agents",
    image: IconOperate,
    description: "Monitor your AI agents with Operate.",
  },
  {
    link: "../analyze-ai-agents/",
    title: "Analyze your AI agents",
    image: IconOptimize,
    description: "Analyze your AI agents with Optimize.",
  },
  {
    link: "../test-ai-agents/",
    title: "Test your AI agents",
    image: IconTest,
    description: "Test your AI agents with Camunda Process Test.",
  },
];

// Recommendation cards on introduction page
export const recommendationCards = [
  {
    link: "../rag-ai-agents/",
    title: "Add long-term memory",
    image: IconRAG,
    description: "Add long-term memory to your AI agents.",
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
