/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Unified API (REST)": [
    "apis-tools/unified-api-rest/unified-api-rest-overview",
    "apis-tools/unified-api-rest/unified-api-rest-authentication",
    {
      Specifications: require("./specifications/sidebar.js"),
    },
  ],
};
