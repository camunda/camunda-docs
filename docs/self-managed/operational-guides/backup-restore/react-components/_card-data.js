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
    title: "Restore a backup ",
    image: IconRepeat,
    description:
      "Perform a restore of all components while using an RDBMS as secondary storage.",
  },
];
