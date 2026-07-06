import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";
import IconOptimize from "../assets/icon-optimize.png";
import IconConnectorImg from "../connectors/img/icon-connectors.png";
import IconOperate from "../assets/icon-operate.png";
import IconRAG from "../assets/icon-long-term-memory.png";
import IconTest from "../assets/icon-prereqs.png";

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
    link: "../../connectors/out-of-the-box-connectors/agentic-ai-aiagent/",
    title: "AI Agent connector",
    image: IconConnectorImg,
    description:
      "Embed LLM-powered agents in your processes with the AI Agent connector.",
  },
  {
    link: "../camunda-provided-llm/",
    title: "Camunda-provided LLM",
    image: IconAoLlmImg,
    description:
      "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.",
  },
  {
    link: "../ao-design/",
    title: "Design and architecture",
    image: IconAoDesignImg,
    description: "Plan and design your agentic orchestration solutions.",
  },
  {
    link: "../evaluate-agents/evaluate-agents-overview/",
    title: "Evaluate AI agents",
    image: IconTest,
    description:
      "Evaluate the performance and effectiveness of your AI agents.",
  },
];

// Fundamentals cards on introduction page
export const fundamentalCards_monitoring = [
  {
    link: "../monitor-ai-agents/",
    title: "Monitor with Operate",
    image: IconOperate,
    description: "Monitor your AI agents with Operate.",
  },
  {
    link: "../analyze-ai-agents/",
    title: "Analyze with Optimize",
    image: IconOptimize,
    description: "Analyze your AI agents with Optimize.",
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
