// this makes use of the Zeebe react grid component

import IconGear from "./icon-prereqs.png";
import IconCloud from "./icon-backup.png";
import IconArrow from "./icon-arrow.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "#plan-the-upgrade",
    title: "Plan the upgrade",
    image: IconGear,
    description:
      "Identify your current version, choose the target version, and confirm the upgrade path and required changes.",
  },
  {
    link: "#back-up-your-installation",
    title: "Back up your installation",
    image: IconCloud,
    description:
      "Take a full backup of your Orchestration cluster, including data and configuration files.",
  },
  {
    link: "#run-the-upgrade",
    title: "Run the upgrade",
    image: IconArrow,
    description:
      "Stop Camunda, unpack the new version, merge configuration changes, and restart Camunda.",
  },
];
