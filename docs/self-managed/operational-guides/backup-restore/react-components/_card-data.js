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
      "Set up a snapshot repository in Elasticsearch or OpenSearch and configure component backup storage.",
  },
  {
    link: "../elasticsearch/es-backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Create a backup using Elasticsearch or OpenSearch as secondary storage.",
  },
  {
    link: "../elasticsearch/es-restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Restore a backup using Elasticsearch or OpenSearch as secondary storage.",
  },
];

// Relational database (RDBMS) cards
export const rdbmsCards = [
  {
    link: "../rdbms/rdbms-backup#prerequisites",
    title: "Prerequisites",
    image: IconGear,
    description:
      "Ensure database backup tooling is available and configure Zeebe backup storage.",
  },
  {
    link: "../rdbms/rdbms-backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Create a backup using a relational database as secondary storage.",
  },
  {
    link: "../rdbms/rdbms-restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Restore a backup using a relational database as secondary storage.",
  },
];
