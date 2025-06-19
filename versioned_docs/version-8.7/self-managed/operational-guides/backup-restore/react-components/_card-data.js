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
      "1. **Setup a snapshot repository in the datastore**\n" +
      "2. **Configure Camunda component backup storage**",
  },
  {
    link: "#backup-process",
    title: "Backup",
    image: IconCloud,
    description:
      "1. **Backup WebApps**\n" +
      "\t1. Backup indices through WebApps\n" +
      "2. **Backup Zeebe Cluster**\n" +
      "\t1. Soft pause of Zeebe exporting\n" +
      "\t2. Backup Zeebe indices\n" +
      "\t3. Backup Zeebe partitions\n" +
      "\t4. Resume Zeebe exporting\n",
  },
  {
    link: "#restore-process",
    title: "Restore",
    image: IconRepeat,
    description:
      "1. **Restore of datastore**\n" +
      "\t1. Restore templates\n" +
      "\t\t1. Start Camunda 8\n" +
      "\t\t2. Stop Camunda 8\n" +
      "\t\t3. Delete all indices\n" +
      "\t2. Restore indices from backup\n" +
      "2. **Restore Zeebe Cluster**\n" +
      "\t1. Reset Volumes/Disk\n" +
      "\t2. Restore Zeebe partitions\n" +
      "3. **Start and use Camunda 8**",
  },
];
