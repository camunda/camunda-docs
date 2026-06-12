/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Camunda Hub API (SaaS)",
    link: {
      type: "doc",
      id: "apis-tools/hub-api-saas/overview",
    },
    items: [
      "apis-tools/hub-api-saas/authentication",
      {
        Specifications: require("./specifications/sidebar"),
      },
    ],
  },
];
