import IconJavaImg from "../img/icon-java.png";
import IconSpringBootImg from "../img/icon-spring.png";
import IconNodeImg from "../img/icon-node-js.png";
import IconOrchClusterImg from "../img/icon-orchcluster.png";
import IconAdminImg from "../img/icon-console.png";
import IconOptimizeImg from "../img/icon-optimize.png";
import IconModelerImg from "../img/icon-modeler.png";
import IconZeebeImg from "../img/icon-orchcluster.png";

export const apiCards = [
  {
    link: "../orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview/",
    title: "Orchestration Cluster API",
    image: IconOrchClusterImg,
    description:
      "Main REST API for process automation, orchestration, and user task management.",
  },
  {
    link: "../administration-api/administration-api-reference/",
    title: "Administration API (SaaS)",
    image: IconAdminImg,
    description: "Manage Camunda clusters and API clients in SaaS.",
  },
  {
    link: "../administration-sm-api/administration-sm-api-overview/",
    title: "Administration API (Self-Managed)",
    image: IconAdminImg,
    description: "Get cluster data including installed apps and usage metrics.",
  },
  {
    link: "../optimize-api/overview/",
    title: "Optimize API",
    image: IconOptimizeImg,
    description: "Process analytics, dashboards, and reporting data.",
  },
  {
    link: "../web-modeler-api/overview/",
    title: "Web Modeler API",
    image: IconModelerImg,
    description: "Integrate with Web Modeler for modeling automation.",
  },
  {
    link: "../zeebe-api/overview/",
    title: "Zeebe API (gRPC)",
    image: IconZeebeImg,
    description:
      "Advanced integrations and high-performance use cases. Use only if you need gRPC (requires HTTP/2).",
  },
];

export const clientCards = [
  {
    link: "../java-client/getting-started/",
    title: "Camunda Java Client",
    image: IconJavaImg,
    description:
      "The recommended way to build Orchestration Cluster integrations and job workers in Java.",
  },
  {
    link: "../spring-zeebe-sdk/getting-started/",
    title: "Camunda Spring Boot SDK",
    image: IconSpringBootImg,
    description:
      "Build Spring Boot applications to connect to the Orchestration Cluster to build job workers.",
  },
  {
    link: "../node-js-sdk/",
    title: "Node.js SDK",
    image: IconNodeImg,
    description:
      "Get started with the official Camunda 8 JavaScript SDK for Node.js.",
  },
];
