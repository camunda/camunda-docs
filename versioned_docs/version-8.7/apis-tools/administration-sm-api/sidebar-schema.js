/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Administration API (Self-Managed)": [
    "apis-tools/administration-sm-api/administration-sm-api-overview",
    "apis-tools/administration-sm-api/administration-sm-api-authentication",
    {
      Specifications: require("./specifications/sidebar"),
    },
  ],
};
