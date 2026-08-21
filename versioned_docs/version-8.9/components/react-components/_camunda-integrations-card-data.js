import IconIntegrationImg from "../assets/icon-integration.png";
import IconConnectorsImg from "../assets/icon-connectors.png";
import IconConfigImg from "../assets/icon-config.png";

export const camundaIntegrationsCards = [
  {
    link: "./ms-teams/ms-teams/",
    title: "Microsoft Teams",
    image: IconIntegrationImg,
    description:
      "Start processes, complete tasks, and get notifications from Camunda in Microsoft Teams.",
  },
  {
    link: "./sap/camunda-sap-integration/",
    title: "SAP",
    image: IconConnectorsImg,
    description:
      "Call SAP S/4HANA, ECC, and BTP functionality directly from your BPMN processes.",
  },
  {
    link: "./servicenow/servicenow-integration/",
    title: "ServiceNow",
    image: IconConfigImg,
    description:
      "Orchestrate ServiceNow ITSM workflows and Camunda processes end-to-end.",
  },
];
