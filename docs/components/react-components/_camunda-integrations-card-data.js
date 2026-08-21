import IconIntegrationImg from "../assets/icon-integration.png";
import IconConnectorsImg from "../assets/icon-connectors.png";
import IconConfigImg from "../assets/icon-config.png";

export const msTeamsCard = {
  link: "./ms-teams/ms-teams/",
  title: "Microsoft Teams",
  image: IconIntegrationImg,
  description:
    "Start processes, complete tasks, and get notifications from Camunda in Microsoft Teams.",
};

export const sapCard = {
  link: "./sap/camunda-sap-integration/",
  title: "SAP",
  image: IconConnectorsImg,
  description:
    "Call SAP S/4HANA, ECC, and BTP functionality directly from your BPMN processes.",
};

export const serviceNowCard = {
  link: "./servicenow/servicenow-integration/",
  title: "ServiceNow",
  image: IconConfigImg,
  description:
    "Orchestrate ServiceNow ITSM workflows and Camunda processes end-to-end.",
};
