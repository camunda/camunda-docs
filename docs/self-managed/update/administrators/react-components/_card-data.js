// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import IconGear from "../assets/icon-prereqs.png";
import IconCloud from "../assets/icon-backup.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "../prepare-for-admin-upgrade",
    title: "Prepare for upgrade",
    image: IconGear,
    description:
      "First, evaluate your infrastructure, understand operational changes, and choose the best upgrade strategy for your environment.",
  },
  {
    link: "../run-admin-upgrade",
    title: "Perform upgrade",
    image: IconCloud,
    description:
      "Once you have completed your preparation, learn how to safely perform an upgrade.",
  },
];
