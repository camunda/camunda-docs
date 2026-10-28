import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconConfig from "../assets/icon-config.png";

// Fundamentals cards on the AI Agent connector page
export const fundamentalCards = [
  {
    link: "../agentic-ai-aiagent-concepts/",
    title: "Concepts",
    image: IconAoAgentImg,
    description:
      "Learn how prompts, the agent loop, agent context, and response format work.",
  },
  {
    link: "../agentic-ai-aiagent-tool-definitions/",
    title: "Tool definitions",
    image: IconConfig,
    description:
      "Learn how the connector resolves tools and how to define their parameters and responses.",
  },
  {
    link: "../agentic-ai-aiagent-migration/",
    title: "Process instance migration",
    image: IconAoDesignImg,
    description:
      "Learn which migration scenarios are supported for running AI agents.",
  },
];
