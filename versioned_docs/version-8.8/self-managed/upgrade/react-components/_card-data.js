// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import K8sIcon from "../assets/kubernetes.png";
import JarIcon from "../assets/jar.png";
import IconGear from "../assets/icon-prereqs.png";
import IconCloud from "../assets/icon-backup.png";
import IconArrow from "../manual/assets/icon-arrow.png";

export const overviewCards = [
  {
    link: "./helm",
    title: "Kubernetes with Helm",
    image: K8sIcon,
    description:
      "Upgrade a Helm-managed Camunda 8.7 deployment on Kubernetes to version 8.8.",
  },
  {
    link: "./manual",
    title: "Manual",
    image: JarIcon,
    description:
      "Manually upgrade a local Camunda installation from an archive distribution to version 8.8.",
  },
];

export const helmIndexCards = [
  {
    link: "../helm/870-to-880",
    title: "Upgrade 8.7 to 8.8 using Helm",
    image: IconArrow,
    description:
      "Follow the main Helm upgrade guide to perform the required configuration changes and run the Helm upgrade.",
  },
  {
    link: "../helm/870-to-880-dual-region",
    title: "Upgrade a dual-region deployment from 8.7 to 8.8 using Helm",
    image: IconArrow,
    description:
      "If your deployment is configured for dual-region operation, first complete the standard Helm upgrade, then follow the additional dual-region steps.",
  },
];
