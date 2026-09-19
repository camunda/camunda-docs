// this makes use of the Zeebe react grid component

import IconGear from "../assets/icon-prereqs.png";
import IconConsiderations from "../assets/icon-considerations.png";
import IconCloud from "../assets/icon-backup.png";
import IconRepeat from "../assets/icon-restore.png";
import IconElasticsearch from "../assets/icon-elasticsearch.png";
import IconRdbms from "../assets/icon-rdbms.png";

// Secondary storage cards
export const storageCards = [
  {
    link: "#elasticsearch--opensearch",
    title: "Elasticsearch / OpenSearch",
    image: IconElasticsearch,
    description: "Elasticsearch or OpenSearch as secondary storage.",
  },
  {
    link: "#relational-databases-rdbms",
    title: "RDBMS",
    image: IconRdbms,
    description:
      "Relational database management system (RDBMS) as secondary storage.",
  },
  {
    link: "#considerations",
    title: "Additional Information",
    image: IconConsiderations,
    description: "Things worth knowing for the backup and restore procedure.",
  },
];

// Elasticsearch / OpenSearch operation cards
export const esCards = [
  {
    link: "../elasticsearch/es-backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Create a backup of all components while using Elasticsearch or OpenSearch as secondary storage.",
  },
  {
    link: "../elasticsearch/es-restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Perform a restore of all components while using Elasticsearch or OpenSearch as secondary storage.",
  },
];

// Relational database (RDBMS) operation cards
export const rdbmsCards = [
  {
    link: "../rdbms/rdbms-backup",
    title: "Create a backup",
    image: IconCloud,
    description:
      "Create a backup of all components while using an RDBMS as secondary storage.",
  },
  {
    link: "../rdbms/rdbms-restore",
    title: "Restore a backup ",
    image: IconRepeat,
    description:
      "Perform a restore of all components while using an RDBMS as secondary storage.",
  },
];

// Restore mode cards
export const esRestoreCards = [
  {
    link: "../in-process-restore.md",
    title: "In-process restore",
    image: IconRepeat,
    description:
      "Restore Elasticsearch/OpenSearch secondary storage while the Zeebe brokers remain running in recovery mode.",
  },
  {
    link: "#restore-zeebe-cluster",
    title: "Legacy restore with broker restart",
    image: IconGear,
    description:
      "Restore Elasticsearch/OpenSearch secondary storage with the legacy standalone restore application.",
  },
];

export const rdbmsRestoreCards = [
  {
    link: "#restore-api",
    title: "Restore API",
    image: IconRepeat,
    description:
      "Restore RDBMS-backed clusters through the Orchestration Cluster Restore API without restarting brokers.",
  },
  {
    link: "#legacy-approach",
    title: "Legacy approach",
    image: IconGear,
    description:
      "Restore the RDBMS and Zeebe primary storage with the standalone restore application and broker restart.",
  },
];
