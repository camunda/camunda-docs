// this makes use of the Zeebe react grid component

import IconGear from "../assets/icon-prereqs.png";
import IconCloud from "../assets/icon-backup.png";
import IconRepeat from "../assets/icon-restore.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "#prerequisites",
    title: "Prerequisites",
    image: IconGear,
    description:
      "Set up a snapshot repository in the secondary datastore and configure component backup storage.",
  },
  {
    link: "../backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Create a backup. This involves backing up the WebApps and the Zeebe Cluster.",
  },
  {
    link: "../restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Restore a backup. This involves restoring Elasticsearch/OpenSearch and the Zeebe Cluster.",
  },
];
