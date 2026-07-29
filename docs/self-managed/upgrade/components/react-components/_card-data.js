// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import K8sIcon from "../../assets/kubernetes.png";
import JarIcon from "../../assets/jar.png";
import IconGear from "../../assets/icon-prereqs.png";
import IconCloud from "../../assets/icon-backup.png";
import IconArrow from "../../assets/icon-arrow.png";

export const helmIndexCards = [
  {
    link: "../helm/880-to-890",
    title: "Upgrade Camunda 8.8 to 8.9 using Helm",
    image: IconArrow,
    description:
      "Follow the main Helm upgrade guide to perform the required configuration changes and run the Helm upgrade.",
  },
];
