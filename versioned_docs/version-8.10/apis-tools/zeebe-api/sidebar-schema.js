/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = [
  {
    type: "category",
    label: "Zeebe API (gRPC)",
    link: {
      type: "doc",
      id: "apis-tools/zeebe-api/grpc",
    },
    items: [
      "apis-tools/zeebe-api/zeebe-api-authentication",
      "apis-tools/zeebe-api/gateway-service",
      "apis-tools/zeebe-api/deprecated-rpcs",
      "apis-tools/zeebe-api/technical-error-handling",
    ],
  },
];
