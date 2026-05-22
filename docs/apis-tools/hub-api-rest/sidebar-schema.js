/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Camunda Hub API",
    link: {
      type: "doc",
      id: "apis-tools/hub-api-rest/camunda-hub-api-overview",
    },
    items: [
      "apis-tools/hub-api-rest/camunda-hub-api-authentication",
      {
        Specifications: require("./specifications/sidebar"),
      },
    ],
  },
];
