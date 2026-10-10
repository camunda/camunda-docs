import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/management-api/specifications/exporters/exporters-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/exporters/disable-an-exporter",
          label: "Disable an exporter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/exporters/enable-an-exporter",
          label: "Enable an exporter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/exporters/delete-an-exporter",
          label: "Delete an exporter",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/exporters/list-all-exporters",
          label: "List all exporters",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
