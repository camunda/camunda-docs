import IconIdpImg from "../assets/icon-idp.png";
import IconRpaImg from "../assets/icon-rpa.png";
import IconAgenticImg from "../assets/icon-agentic.png";
import IconDocsImg from "../assets/icon-docs.png";
import IconIntegrationImg from "../assets/icon-integration.png";
import IconEarlyAccessImg from "../assets/icon-earlyaccess.png";
import IconModelerImg from "../assets/icon-modeler.png";
import IconBpmnImg from "../assets/icon-bpmn.png";
import IconOrchClusterImg from "../assets/icon-orchcluster.png";
import IconConnectorsImg from "../assets/icon-connectors.png";
import IconOptimizeImg from "../assets/icon-optimize.png";
import IconConsoleImg from "../assets/icon-console.png";

import IconSecurityImg from "../assets/icon-reference-api.png";
import IconLicensingImg from "../assets/icon-reference-api.png";
import IconApiImg from "../assets/icon-reference-api.png";
import IconEnvironmentsImg from "../assets/icon-reference-api.png";
import IconSourceImg from "../assets/icon-reference-api.png";
import IconDataImg from "../assets/icon-reference-api.png";
import IconReleaseNotesImg from "../assets/icon-reference-api.png";

export const featuresCards = [
  {
    link: "./agentic-orchestration/",
    title: "Agentic orchestration",
    image: IconAgenticImg,
    description:
      "Orchestrate and integrate artificial intelligence (AI) agents into your end-to-end processes.",
  },
  {
    link: "./modeler/web-modeler/idp/",
    title: "Intelligent document processing (IDP)",
    image: IconIdpImg,
    description: "integrate automated document processing into your processes.",
  },
  {
    link: "./rpa/overview/",
    title: "Robotic process automation (RPA)",
    image: IconRpaImg,
    description: "Use RPA to automate manual, repetitive tasks.",
  },
  {
    link: "./document-handling/getting-started/",
    title: "Document handling",
    image: IconDocsImg,
    description: "Store, track, and manage documents.",
  },
  {
    link: "./camunda-integrations/overview/",
    title: "Camunda integrations",
    image: IconIntegrationImg,
    description: "Integrations with other systems such as SAP.",
  },
  {
    link: "./early-access/overview/",
    title: "Early access",
    image: IconEarlyAccessImg,
    description:
      "Explore new features and components currently in development.",
  },
];

export const usingCamundaCards = [
  {
    link: "./modeler/about-modeler/",
    title: "Modeler",
    image: IconModelerImg,
    description:
      "Use Web Modeler and Desktop Modeler to model your BPMN diagrams.",
  },
  {
    link: "./concepts/bpmn-dmn-feel/",
    title: "BPMN, DMN, and FEEL",
    image: IconBpmnImg,
    description:
      "Learn about using BPMN, DMN, and FEEL expressions when modeling.",
  },
  {
    link: "./orchestration-cluster/",
    title: "Orchestration Cluster",
    image: IconOrchClusterImg,
    description: "Get started with Zeebe, Operate, Tasklist, and Identity.",
  },
  {
    link: "./connectors/introduction-to-connectors/",
    title: "Connectors",
    image: IconConnectorsImg,
    description:
      "Connect processes to external systems, applications, and data.",
  },
  {
    link: "./optimize/what-is-optimize/",
    title: "Optimize",
    image: IconOptimizeImg,
    description:
      "Business intelligence and analytics for enterprise customers.",
  },
  {
    link: "./console/introduction-to-console/",
    title: "Console",
    image: IconConsoleImg,
    description: "Manage Camunda components, clusters, and your organization.",
  },
];
