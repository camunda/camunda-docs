/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Orchestration Cluster API": [
    "apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview",
    "apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-data-fetching",
    "apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication",
    {
      Tutorials: [
        "apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-tutorial",
        "apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-intermediate-tutorial",
      ],
    },
    {
      Specifications: require("./specifications/sidebar"),
    },
  ],
};
