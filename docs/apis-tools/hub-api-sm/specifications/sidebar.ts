import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/hub-api-sm/specifications/hub-public-api-v-2",
    },
    {
      type: "category",
      label: "File",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/create-file",
          label: "Create a file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/get-file",
          label: "Get a file",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/update-file",
          label: "Update a file",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/delete-file",
          label: "Delete a file",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/search-files",
          label: "Search files",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
