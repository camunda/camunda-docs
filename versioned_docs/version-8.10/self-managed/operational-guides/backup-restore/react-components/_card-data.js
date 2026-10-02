// this makes use of the Zeebe react grid component

import IconGear from "../assets/icon-prereqs.png";
import IconCloud from "../assets/icon-backup.png";
import IconRepeat from "../assets/icon-restore.png";

// Elasticsearch / OpenSearch cards
export const esCards = [
  {
    link: "../elasticsearch/es-backup#elasticsearch--opensearch-prerequisites",
    title: "Prerequisites",
    image: IconGear,
    description:
      "Set up a snapshot repository in Elasticsearch or OpenSearch and configure component backup storage. Covers all components including Optimize.",
  },
  {
    link: "../elasticsearch/es-backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Create a backup of all Orchestration Cluster components and Optimize using Elasticsearch or OpenSearch as secondary storage.",
  },
  {
    link: "../elasticsearch/es-restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Restore all Orchestration Cluster components and Optimize using Elasticsearch or OpenSearch as secondary storage.",
  },
];

// Relational database (RDBMS) cards
export const rdbmsCards = [
  {
    link: "../rdbms/rdbms-backup#prerequisites",
    title: "Prerequisites",
    image: IconGear,
    description:
      "Configure Zeebe continuous backup storage and your RDBMS backup tooling. Zeebe and RDBMS can be backed up independently Covers Zeebe, Operate, and Tasklist only.",
  },
  {
    link: "../rdbms/rdbms-backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Enable decoupled continuous backups for Zeebe, Operate, and Tasklist. Zeebe automatically takes regular snapshots; the RDBMS is backed up separately using native database tools. Optimize is not supported.",
  },
  {
    link: "../rdbms/rdbms-restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Restore Zeebe, Operate, and Tasklist to any available snapshot timestamp. Camunda automatically aligns Zeebe and RDBMS state during restore. Optimize is not supported.",
  },
];
