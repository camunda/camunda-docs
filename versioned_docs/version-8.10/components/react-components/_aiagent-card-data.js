import IconAoAgentImg from "../assets/icon-agentic.png";
import IconBpmnImg from "../assets/icon-bpmn.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconConfig from "../assets/icon-config.png";
import IconLlmImg from "../assets/icon-llm.png";
import IconIdpImg from "../assets/icon-idp.png";

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
    link: "../agentic-ai-aiagent-execution-model/",
    title: "Execution model",
    image: IconAoAgentImg,
    description:
      "Learn how the AI Agent connector runs, from prompts to responses.",
  },
  {
    link: "../agentic-ai-aiagent-tool-definitions/",
    title: "Tool definitions",
    image: IconConfig,
    description: "Understand how tools are resolved and defined for the LLM.",
  },
  {
    link: "../agentic-ai-aiagent-migration/",
    title: "Process instance migration",
    image: IconAoDesignImg,
    description:
      "Review which migration scenarios are supported for running AI agents.",
  },
];

// Configure and extend cards on the AI Agent connector page
export const configureCards = [
  {
    link: "../agentic-ai-aiagent-model-providers/",
    title: "Model providers",
    image: IconLlmImg,
    description: "Configure the LLM provider and model used by the connector.",
  },
  {
    link: "../agentic-ai-aiagent-documents/",
    title: "Document support",
    image: IconIdpImg,
    description:
      "Understand how the connector passes documents and images to the LLM.",
  },
  {
    link: "../agentic-ai-aiagent-customization/",
    title: "Customize in Self-Managed",
    image: IconConfig,
    description:
      "Set up an HTTP proxy and extend the connector in Self-Managed.",
  },
];
