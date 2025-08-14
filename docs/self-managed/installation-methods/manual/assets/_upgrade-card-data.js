// this makes use of the Zeebe react grid component

import IconGear from "./icon-prereqs.png";
import IconCloud from "./icon-backup.png";
import IconArrow from "./icon-arrow.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "#plan",
    title: "Plan",
    image: IconGear,
    description:
      "Identify your current version, determine the target version, and confirm the upgrade path and required changes.",
  },
  {
    link: "#back-up",
    title: "Back up",
    image: IconCloud,
    description:
      "Create a backup. This involves backing up the Orchestration Cluster.",
  },
  {
    link: "#execute",
    title: "Execute",
    image: IconArrow,
    description:
      "Execute the upgrade by stopping Camunda, downloading the new version, merging files and configs, and starting Camunda again.",
  },
];
