// this makes use of the Zeebe react grid component

import IconGear from "../assets/gear.png";
import IconCloud from "../assets/cloud.png";
import IconRepeat from "../assets/repeat.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "#prerequisites",
    title: "Configure Storage",
    image: IconGear,
    description:
      "1. [Setup a snapshot repository in the secondary datastore](#prerequisites)\n" +
      "2. [Configure Camunda component backup storage](#prerequisites)",
  },
  {
    link: "#backup-process",
    title: "Backup",
    image: IconCloud,
    description:
      "1. [Backup WebApps](#backup-of-the-webapps)\n" +
      "2. [Backup Zeebe Cluster](#backup-of-the-zeebe-cluster)\n",
  },
  {
    link: "#restore-process",
    title: "Restore",
    image: IconRepeat,
    description:
      "1. [Restore of secondary datastore](#restore-of-elasticsearch--opensearch)\n" +
      "2. [Restore Zeebe Cluster](#restore-the-zeebe-cluster)\n" +
      "3. [Start and use Camunda 8](#start-all-camunda-8-components)",
  },
];
