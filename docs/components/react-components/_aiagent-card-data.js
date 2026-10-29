import IconAoAgentImg from "../assets/icon-agentic.png";
import IconBpmnImg from "../assets/icon-bpmn.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconConfig from "../assets/icon-config.png";

// Implementation cards on the AI Agent connector page
export const connectorCards = [
  {
    link: "../agentic-ai-aiagent-subprocess/",
    title: "AI Agent Sub-process",
    image: IconAoAgentImg,
    description:
      "Recommended for most use cases. Handles tool resolution and the agent loop automatically.",
  },
  {
    link: "../agentic-ai-aiagent-task/",
    title: "AI Agent Task",
    image: IconBpmnImg,
    description:
      "Run one-shot LLM calls, or model the agent loop explicitly for full control.",
  },
];

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
