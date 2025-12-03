import IconAoImg from "../assets/icon-play.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoLlmImg from "../assets/icon-llm.png";
import IconConnectorImg from "../connectors/img/icon-connectors.png";

export const introCards = [
  {
    link: "../../../guides/getting-started-agentic-orchestration/",
    title: "Build your first AI Agent",
    image: IconAoImg,
    description: "Get started by building and running your first AI agent.",
  },
  {
    link: "../ao-design",
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
