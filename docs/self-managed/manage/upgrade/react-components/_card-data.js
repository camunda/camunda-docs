// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import K8sIcon from "../assets/kubernetes.png";
import IconArrow from "../assets/icon-arrow.png";

export const overviewCards = [
  {
    link: "./helm",
    title: "Kubernetes with Helm",
    image: K8sIcon,
    description:
      "Upgrade a Helm-managed Camunda 8.8 deployment on Kubernetes to version 8.9.",
  },
];

export const helmIndexCards = [
  {
    link: "./890-to-8100",
    title: "Upgrade Camunda 8.9 to 8.10 using Helm",
    image: IconArrow,
    description:
      "Switch to the Helm v4 CLI and migrate the deprecated app-config Helm keys to extraConfiguration before running the Helm upgrade.",
  },
  {
    link: "./880-to-890",
    title: "Upgrade Camunda 8.8 to 8.9 using Helm",
    image: IconArrow,
    description:
      "Follow the main Helm upgrade guide to perform the required configuration changes and run the Helm upgrade.",
  },
];
