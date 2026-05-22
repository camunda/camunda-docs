/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Camunda Hub API",
    link: {
      type: "doc",
      id: "apis-tools/hub-api-rest/overview",
    },
    items: [
      "apis-tools/hub-api-rest/authentication",
      {
        Specifications: require("./specifications/sidebar"),
      },
    ],
  },
];
