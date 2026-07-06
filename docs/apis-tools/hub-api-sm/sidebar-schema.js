/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Camunda Hub API (Self-Managed)",
    link: {
      type: "doc",
      id: "apis-tools/hub-api-sm/overview",
    },
    items: [
      "apis-tools/hub-api-sm/authentication",
      {
        Specifications: require("./specifications/sidebar"),
      },
    ],
  },
];
