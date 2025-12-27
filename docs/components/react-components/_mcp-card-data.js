import IconAoImg from "../assets/icon-play.png";
import IconAoAgentImg from "../assets/icon-agentic.png";
import IconAoDesignImg from "../assets/icon-docs.png";
import IconConfig from "../assets/icon-config.png";

// Fundamentals cards on introduction page
export const fundamentalCards = [
  {
    link: "../mcp-client/mcp-client-config/",
    title: "Configure",
    image: IconConfig,
    description: "Learn how to configure MCP Client connectors.",
  },
  {
    link: "../mcp-client/mcp-client-tool-discovery/",
    title: "Tool discovery",
    image: IconAoDesignImg,
    description:
      "Learn how AI agents automatically discover and invoke MCP client tools.",
  },
  {
    link: "../mcp-client/mcp-client-human-in-the-loop/",
    title: "Human in the loop",
    image: IconAoAgentImg,
    description:
      "Learn how to build human-in-the-loop AI workflows with MCP and BPMN.",
  },
];
