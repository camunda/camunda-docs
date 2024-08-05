/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Console SM API (REST)": [
    "apis-tools/console-sm-api/console-sm-api-overview",
    "apis-tools/console-sm-api/console-sm-api-authentication",
    {
      Specifications: require("./specifications/sidebar.js"),
    },
  ],
};
