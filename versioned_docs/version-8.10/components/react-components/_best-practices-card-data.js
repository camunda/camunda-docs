import IconPlayImg from "../assets/icon-play.png";
import IconOrchClusterImg from "../assets/icon-orchcluster.png";
import IconBpmnImg from "../assets/icon-bpmn.png";
import IconOperateImg from "../assets/icon-operate.png";
import IconConfigImg from "../assets/icon-config.png";

export const projectManagementCards = [
  {
    link: "../management/following-the-customer-success-path/",
    title: "Following the customer success path",
    image: IconPlayImg,
    description:
      "Follow proven steps for evaluating and introducing process automation successfully.",
  },
  {
    link: "../management/doing-a-proper-poc/",
    title: "Doing a proper POC",
    image: IconPlayImg,
    description:
      "Use a proof of concept to check whether your approach and technology fit your needs.",
  },
];

export const architectureCards = [
  {
    link: "../architecture/data-flow/",
    title: "Data flow",
    image: IconOrchClusterImg,
    description:
      "Understand how data moves through Camunda 8 and why it matters for sizing your environment.",
  },
  {
    link: "../architecture/deciding-about-your-stack/",
    title: "Deciding about your stack",
    image: IconOrchClusterImg,
    description:
      "Our recommended technology stack for building Camunda solutions.",
  },
  {
    link: "../architecture/sizing-your-environment/",
    title: "Size your environment",
    image: IconOrchClusterImg,
    description:
      "Understand sizing considerations for Camunda 8, for both SaaS and Self-Managed.",
  },
  {
    link: "../architecture/understanding-human-tasks-management/",
    title: "Understanding human task management",
    image: IconOrchClusterImg,
    description:
      "Use Camunda task management features, or implement your own requirements for readable models.",
  },
];

export const developmentCards = [
  {
    link: "../development/connecting-the-workflow-engine-with-your-world/",
    title: "Connecting the workflow engine with your world",
    image: IconPlayImg,
    description:
      "Learn how to connect the Zeebe workflow engine with your application or remote systems.",
  },
  {
    link: "../development/service-integration-patterns/",
    title: "Service integration patterns with BPMN",
    image: IconPlayImg,
    description:
      "Choose the right BPMN modeling approach when integrating systems and services.",
  },
  {
    link: "../development/writing-good-workers/",
    title: "Writing good workers",
    image: IconPlayImg,
    description:
      "Implement job workers that perform the work behind your service tasks.",
  },
  {
    link: "../development/dealing-with-problems-and-exceptions/",
    title: "Dealing with problems and exceptions",
    image: IconPlayImg,
    description:
      "Handle exceptions, leverage retries, and use incidents to deal with problems in your processes.",
  },
  {
    link: "../development/handling-data-in-processes/",
    title: "Handling data in processes",
    image: IconPlayImg,
    description:
      "Understand how to work with process variables and associate data with process instances.",
  },
  {
    link: "../development/routing-events-to-processes/",
    title: "Routing events to processes",
    image: IconPlayImg,
    description:
      "Choose the right technology to start a process instance or route a message to a running one.",
  },
  {
    link: "../development/testing-process-definitions/",
    title: "Testing process definitions",
    image: IconPlayImg,
    description:
      "Test your executable BPMN processes with automated, fast in-memory workflow engine tests.",
  },
  {
    link: "../development/local-development-with-element-templates/",
    title: "Local development with element templates and Camunda 8 Run",
    image: IconPlayImg,
    description:
      "Use Camunda 8 Run with element templates in your local development environment.",
  },
];

export const modelingCards = [
  {
    link: "../modeling/creating-readable-process-models/",
    title: "Creating readable process models",
    image: IconBpmnImg,
    description:
      "Create visual process models that are easy to read, discuss, and remember.",
  },
  {
    link: "../modeling/naming-bpmn-elements/",
    title: "Naming BPMN elements",
    image: IconBpmnImg,
    description:
      "Name activities, events, and gateways in your BPMN diagrams from a business perspective.",
  },
  {
    link: "../modeling/naming-technically-relevant-ids/",
    title: "Naming technically relevant IDs",
    image: IconBpmnImg,
    description:
      "Properly name technical element IDs in your BPMN diagrams for executable flows.",
  },
  {
    link: "../modeling/modeling-beyond-the-happy-path/",
    title: "Modeling beyond the happy path",
    image: IconBpmnImg,
    description:
      "Model the happy path first, then incrementally introduce problems and exceptions.",
  },
  {
    link: "../modeling/modeling-with-situation-patterns/",
    title: "Modeling with situation patterns",
    image: IconBpmnImg,
    description:
      "Document recurring patterns and find satisfying solutions for modeling them.",
  },
  {
    link: "../modeling/building-flexibility-into-bpmn-models/",
    title: "Building flexibility into BPMN models",
    image: IconBpmnImg,
    description:
      "Build flexibility into process models to handle operational problems or allow human intervention.",
  },
  {
    link: "../modeling/choosing-the-dmn-hit-policy/",
    title: "Choosing the DMN hit policy",
    image: IconBpmnImg,
    description:
      "Understand the different ways to evaluate rules in a DMN decision table.",
  },
  {
    link: "../modeling/choosing-the-resource-binding-type/",
    title: "Choosing the resource binding type",
    image: IconBpmnImg,
    description:
      "Understand the differences between latest and deployment binding for linked resources.",
  },
];

export const operationsCards = [
  {
    link: "../operations/versioning-process-definitions/",
    title: "Versioning process definitions",
    image: IconOperateImg,
    description:
      "Understand how Camunda handles evolving process definitions through versioning.",
  },
  {
    link: "../operations/reporting-about-processes/",
    title: "Reporting about processes",
    image: IconOperateImg,
    description:
      "Leverage historical process data collected by the Camunda engine to generate relevant reports.",
  },
];

export const cicdCards = [
  {
    link: "../cicd-guidelines/element-templates-at-scale/",
    title: "Element templates at scale",
    image: IconConfigImg,
    description:
      "Provision element templates at runtime and make them available across your organization and Desktop Modeler.",
  },
];
