/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Zeebe API (REST)": [
    "apis-tools/zeebe-api-rest/zeebe-api-rest-overview",
    {
      Specifications: require("./specifications/sidebar.js"),
    },
  ],
};
