// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import K8sIcon from "../../assets/kubernetes.png";
import JarIcon from "../../assets/jar.png";
import IconGear from "../../assets/icon-prereqs.png";
import IconCloud from "../../assets/icon-backup.png";
import IconArrow from "./../../manual/assets/icon-arrow.png";

export const mainUpgradeCard = [
  {
    link: "../880-to-890",
    title: "Upgrade Camunda components from 8.8 to 8.9",
    image: K8sIcon,
    description:
      "Review component-level changes introduced in Camunda 8.9, including identity migration, data and exporter changes, API updates, and web application behavior.",
  },
];

export const helmIndexCards = [
  {
    link: "../helm/880-to-890",
    title: "Upgrade Camunda 8.8 to 8.9 using Helm",
    image: IconArrow,
    description:
      "Follow the main Helm upgrade guide to perform the required configuration changes and run the Helm upgrade.",
  },
  {
    link: "../helm/880-to-890-dual-region",
    title: "Upgrade a dual-region deployment from 8.8 to 8.9 using Helm",
    image: IconArrow,
    description:
      "If your deployment is configured for dual-region operation, first complete the standard Helm upgrade, then follow the additional dual-region steps.",
  },
];
