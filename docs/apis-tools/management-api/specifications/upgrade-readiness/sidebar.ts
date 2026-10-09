import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/management-api/specifications/upgrade-readiness/upgrade-readiness-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/upgrade-readiness/get-the-upgrade-readiness-status-of-this-cluster",
          label: "Get the upgrade-readiness status of this cluster",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
