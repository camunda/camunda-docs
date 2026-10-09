// this makes use of the Zeebe react grid component

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
      "Create a backup of Zeebe, Operate, Tasklist, and Admin while using an RDBMS as secondary storage. Optimize and Management Identity are not included.",
  },
  {
    link: "../rdbms/rdbms-restore",
    title: "Restore a backup",
    image: IconRepeat,
    description:
      "Restore Zeebe, Operate, Tasklist, and Admin while using an RDBMS as secondary storage. Optimize and Management Identity are not included.",
  },
];

// Restore approach cards for the Elasticsearch / OpenSearch restore chooser page
export const esRestoreApproachCards = [
  {
    link: "../es-restore-api",
    title: "Restore API",
    image: IconRepeat,
    description:
      "**Recommended**, Camunda 8.10+. Restore through the REST API; brokers stay up in recovery mode.",
  },
  {
    link: "../es-restore-application",
    title: "Restore Application (legacy)",
    image: IconRepeat,
    description:
      "**Legacy**, all versions. Stop all components and run the standalone restore app.",
  },
];

// Restore approach cards for the RDBMS restore chooser page
export const rdbmsRestoreApproachCards = [
  {
    link: "../rdbms-restore-api",
    title: "Restore API",
    image: IconRepeat,
    description:
      "**Recommended**, Camunda 8.10+. Restore through the REST API; brokers stay up in recovery mode.",
  },
  {
    link: "../rdbms-restore-application",
    title: "Restore Application (legacy)",
    image: IconRepeat,
    description:
      "**Legacy**, all versions. Stop all components and run the standalone restore app.",
  },
];
