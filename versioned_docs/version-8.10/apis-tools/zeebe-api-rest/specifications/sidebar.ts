import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-8.6/apis-tools/zeebe-api-rest/specifications/zeebe-rest-api",
    },
    {
      type: "category",
      label: "Cluster",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/zeebe-api-rest/specifications/get-cluster-topology",
          label: "Get cluster topology",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "User task",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/zeebe-api-rest/specifications/complete-a-user-task",
          label: "Complete a user task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/zeebe-api-rest/specifications/assign-a-user-task",
          label: "Assign a user task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/zeebe-api-rest/specifications/update-a-user-task",
          label: "Update a user task",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/zeebe-api-rest/specifications/unassign-a-user-task",
          label: "Unassign a user task",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
