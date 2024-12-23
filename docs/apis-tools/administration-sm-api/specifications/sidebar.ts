import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/administration-sm-api/specifications/administration-api-self-managed",
    },
    {
      type: "category",
      label: "Usage Metrics",
      items: [
        {
          type: "doc",
          id: "apis-tools/administration-sm-api/specifications/get-usage-metrics",
          label: "Get usage metrics for clusters",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Clusters",
      items: [
        {
          type: "doc",
          id: "apis-tools/administration-sm-api/specifications/get-clusters",
          label: "Get current clusters",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
