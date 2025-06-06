/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Orchestration Cluster API": [
    "apis-tools/camunda-api-rest/camunda-api-rest-overview",
    "apis-tools/camunda-api-rest/camunda-api-rest-data-fetching",
    "apis-tools/camunda-api-rest/camunda-api-rest-authentication",
    {
      Tutorials: [
        "apis-tools/camunda-api-rest/camunda-8-api-tutorial",
        "apis-tools/camunda-api-rest/camunda-8-api-intermediate-tutorial",
      ],
    },
    {
      Specifications: require("./specifications/sidebar"),
    },
  ],
};
