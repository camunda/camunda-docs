import IconTypescriptImg from "../../img/icon-typescript.png";
import IconMigrationImg from "../../img/icon-earlyaccess.png";
import IconBackpressureImg from "../../img/icon-backpressure.png";
import IconDataImg from "../../img/icon-orchcluster.png";

export const gsCards = [
  {
    link: "../oca-client/",
    title: "Orchestration Cluster API TypeScript client",
    image: IconTypescriptImg,
    description:
      "The enhanced client for the Camunda 8.8+ Orchestration Cluster REST API. Use it in Node.js or in the browser.",
    ctaLabel: "@camunda8/orchestration-cluster-api",
    ctaLink:
      "https://www.npmjs.com/package/@camunda8/orchestration-cluster-api",
  },
  {
    link: "../camunda8-sdk/",
    title: "TypeScript Node.js SDK",
    image: IconTypescriptImg,
    description:
      "The TypeScript SDK provides clients for v1 and v2 Camunda 8 APIs, including gRPC. Only supports Node.js environments.",
    ctaLabel: "@camunda8/sdk",
    ctaLink: "https://www.npmjs.com/package/@camunda8/sdk",
  },
];

export const frCards = [
  {
    link: "../migrating-to-oca/",
    title: "Migrate to the Orchestration Cluster API",
    image: IconMigrationImg,
    description:
      "Migrate an existing Camunda 8 TypeScript application to use the Orchestration Cluster API.",
  },
  {
    link: "../backpressure/",
    title: "Manage backpressure",
    image: IconBackpressureImg,
    description: "Learn how to manage backpressure with the TypeScript SDK.",
  },
  {
    link: "../eventual-consistency/",
    title: "Manage data consistency",
    image: IconDataImg,
    description:
      "Learn how to manage eventually consistent data when using the Orchestration Cluster API.",
  },
];
