/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Camunda 8 API (REST)": [
    "apis-tools/camunda-api-rest/camunda-api-rest-overview",
    "apis-tools/camunda-api-rest/camunda-api-rest-guidelines",
    "apis-tools/camunda-api-rest/camunda-api-rest-authentication",
    {
      Specifications: require("./specifications/sidebar.js"),
    },
  ],
};
