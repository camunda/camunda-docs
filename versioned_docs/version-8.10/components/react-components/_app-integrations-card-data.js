import IconIntegration from "../assets/icon-integration.png";
import IconDocs from "../assets/icon-docs.png";
import IconConfig from "../assets/icon-config.png";

export const appIntegrationsCards = [
  {
    link: "./microsoft-teams/",
    title: "Microsoft Teams",
    image: IconIntegration,
    description:
      "Use the chatbot and tabs to work with Camunda inside Microsoft Teams.",
  },
  {
    link: "./slack/",
    title: "Slack",
    image: IconDocs,
    description:
      "Use the /camunda slash command and direct message to work with Camunda inside Slack.",
  },
  {
    link: "./troubleshoot/",
    title: "Troubleshoot",
    image: IconConfig,
    description:
      "Troubleshoot Camunda app integrations to fix common setup and connectivity issues.",
  },
];
