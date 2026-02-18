// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import IconGear from "../../../components/assets/icon-orchcluster.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "./helm",
    title: "Kubernetes with Helm",
    image: IconGear,
    description:
      "Install and manage Camunda 8 on Kubernetes using Helm charts — recommended approach to deploy Camunda 8 Self‑Managed in production",
  },
  {
    link: "./manual/install",
    title: "Manual installation",
    image: IconGear,
    description:
      "Follow the step‑by‑step manual installation guide for Camunda 8 Self‑Managed, including requirements and configuration.",
  },
  {
    link: "./docker",
    title: "Docker Compose",
    image: IconGear,
    description:
      "Run Camunda 8 with Docker/Docker Compose for local development and testing.",
  },
];
