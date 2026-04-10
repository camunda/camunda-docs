import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";
import IconOptimize from "../assets/icon-optimize.png";
import IconConnectorImg from "../connectors/img/icon-connectors.png";
import IconOperate from "../assets/icon-operate.png";

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
];

// Recommendation cards on introduction page
export const recommendationCards = [
  {
    link: "../choose-right-model-agentic/",
    title: "Choose the right LLM",
    image: IconAoLlmImg,
    description:
      "Learn how to choose the right Large Language Model (LLM) for AI agents.",
  },
  {
    link: "../model-recommendations-agentic/",
    title: "LLM recommendations",
    image: IconAoLlmImg,
    description:
      "Recommendations and best practices for working with models and prompts.",
  },
];
