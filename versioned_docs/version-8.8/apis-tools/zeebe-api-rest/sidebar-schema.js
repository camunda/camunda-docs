/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Zeebe API (REST)": [
    "apis-tools/zeebe-api-rest/zeebe-api-rest-overview",
    "apis-tools/zeebe-api-rest/zeebe-api-rest-authentication",
    "apis-tools/zeebe-api-rest/zeebe-api-tutorial",
    {
      Specifications: require("./specifications/sidebar.js"),
    },
  ],
};
