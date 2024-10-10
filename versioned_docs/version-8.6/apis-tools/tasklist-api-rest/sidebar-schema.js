/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Tasklist API (REST)": [
    "apis-tools/tasklist-api-rest/tasklist-api-rest-overview",
    "apis-tools/tasklist-api-rest/tasklist-api-rest-authentication",
    {
      Specifications: require("./specifications/sidebar.js"),
    },
    "apis-tools/tasklist-api-rest/migrate-to-zeebe-user-tasks",
  ],
};
