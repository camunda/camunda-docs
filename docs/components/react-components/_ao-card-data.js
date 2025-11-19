import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";

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
    link: "../ao-design/",
    title: "Design and architecture",
    image: IconAoDesignImg,
    description: "Plan and design your agentic orchestration solutions.",
  },
  {
    link: "../ai-agents/",
    title: "AI agents",
    image: IconAoAgentImg,
    description:
      "Learn how to build and integrate AI agents into your end-to-end processes.",
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
