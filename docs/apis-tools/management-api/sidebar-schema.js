/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Cluster management API",
    link: {
      type: "doc",
      id: "apis-tools/management-api/management-api-overview",
    },
    items: [
      {
        "Cluster topology": require("./specifications/cluster/sidebar"),
      },
      {
        Exporters: require("./specifications/exporters/sidebar"),
      },
      {
        Backups: require("./specifications/backups/sidebar"),
      },
      {
        "Upgrade readiness": require("./specifications/upgrade-readiness/sidebar"),
      },
    ],
  },
];
