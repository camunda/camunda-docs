/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Administration API (Self-Managed)",
    link: {
      type: "doc",
      id: "apis-tools/administration-sm-api/administration-sm-api-overview",
    },
    items: [
      "apis-tools/administration-sm-api/administration-sm-api-authentication",
      {
        Specifications: require("./specifications/sidebar"),
      },
    ],
  },
];
