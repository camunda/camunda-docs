// this makes use of the Zeebe react grid component

import IconGear from "./icon-prereqs.png";
import IconCloud from "./icon-install.png";
import IconArrow from "./icon-config.png";

// Installation overview cards data
export const overviewCards = [
  {
    link: "#infrastructure-prerequisites",
    title: "Infrastructure prerequisites",
    image: IconGear,
    description:
      "Set up your infrastructure dependencies using managed services or operators for PostgreSQL, Elasticsearch, and Keycloak.",
  },
  {
    link: "#installing-the-orchestration-cluster",
    title: "Install Camunda Platform",
    image: IconCloud,
    description:
      "Deploy the Camunda 8 Self-Managed platform using the Helm chart with your configured infrastructure.",
  },
  {
    link: "#advanced-configuration",
    title: "Advanced configuration",
    image: IconArrow,
    description:
      "Configure additional components, authentication methods, and customize the platform for your needs.",
  },
];
