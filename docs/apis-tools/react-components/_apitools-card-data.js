import IconJavaImg from "../img/icon-java.png";
import IconSpringBootImg from "../img/icon-spring.png";
import IconTypescriptImg from "../img/icon-typescript.png";
import IconOrchClusterImg from "../img/icon-orchcluster.png";
import IconAdminImg from "../img/icon-console.png";
import IconOptimizeImg from "../img/icon-optimize.png";
import IconModelerImg from "../img/icon-modeler.png";
import IconZeebeImg from "../img/icon-orchcluster.png";
import IconMcpImg from "../img/icon-mcp.png";
import IconCliImg from "../img/icon-cli.png";
import IconPythonImg from "../img/icon-python.png";
import IconCsharpImg from "../img/icon-csharp.png";

export const apiCards = [
  {
    link: "../orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview/",
    title: "Orchestration Cluster API",
    image: IconOrchClusterImg,
    description:
      "Main API for process automation, orchestration, and task management.",
    type: "REST",
  },
  {
    link: "../orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview/",
    title: "Orchestration Cluster MCP Server",
    image: IconMcpImg,
    description:
      "Exposes selected Orchestration Cluster APIs as MCP tools for AI agents and LLM-powered applications.",
    type: "MCP",
  },
  {
    link: "../processes-mcp/processes-mcp-overview/",
    title: "Processes MCP Server",
    image: IconMcpImg,
    description:
      "Expose deployed BPMN processes as callable MCP tools for AI agents.",
    type: "MCP",
  },
  {
    link: "../administration-api/administration-api-reference/",
    title: "Administration API (SaaS)",
    image: IconAdminImg,
    description: "Manage Camunda clusters and API clients in SaaS.",
    type: "REST",
  },
  {
    link: "../optimize-api/overview/",
    title: "Optimize API",
    image: IconOptimizeImg,
    description: "Process analytics, dashboards, and reporting data.",
    type: "REST",
  },
  {
    link: "../hub-api-saas/overview/",
    title: "Camunda Hub API (SaaS)",
    image: IconModelerImg,
    description: "Manage Camunda Hub resources in SaaS.",
    type: "REST",
  },
  {
    link: "../hub-api-sm/overview/",
    title: "Camunda Hub API (Self-Managed)",
    image: IconModelerImg,
    description: "Manage Camunda Hub resources in Self-Managed.",
    type: "REST",
  },
  {
    link: "../zeebe-api/overview/",
    title: "Zeebe API (gRPC)",
    image: IconZeebeImg,
    description: "Advanced integrations and high-performance use cases.",
    type: "gRPC",
  },
];

export const clientCards = [
  {
    link: "../java-client/getting-started/",
    title: "Camunda Java Client",
    image: IconJavaImg,
    description:
      "The recommended way to build Orchestration Cluster integrations and job workers in Java.",
    type: "",
  },
  {
    link: "../camunda-spring-boot-starter/getting-started/",
    title: "Camunda Spring Boot Starter",
    image: IconSpringBootImg,
    description:
      "Build Spring Boot applications to connect to the Orchestration Cluster to build job workers.",
    type: "",
  },
  {
    link: "../typescript/typescript-sdk/",
    title: "TypeScript SDK",
    image: IconTypescriptImg,
    description:
      "Build Camunda 8 applications using the Camunda TypeScript SDK.",
    type: "",
  },
  {
    link: "../c8ctl/getting-started/",
    title: "c8ctl CLI",
    image: IconCliImg,
    description:
      "Inspect clusters, deploy resources, and manage processes from the terminal. (Alpha)",
    type: "",
  },
  {
    link: "../python-sdk/",
    title: "Python SDK",
    image: IconPythonImg,
    description: "Build Camunda 8 applications using the Camunda Python SDK.",
    type: "",
  },
  {
    link: "../csharp-sdk/",
    title: "C# SDK",
    image: IconCsharpImg,
    description:
      "Technical preview of the C# client SDK for the Camunda 8 Orchestration Cluster REST API.",
    type: "",
  },
];
