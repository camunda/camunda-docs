/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Operate API": [
    "apis-tools/operate-api/operate-api-overview",
    "apis-tools/operate-api/operate-api-authentication",
    "apis-tools/operate-api/operate-api-tutorial",
    {
      Specifications: require("./specifications/sidebar"),
    },
  ],
};
