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
    {
      type: "category",
      label: "Folder",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/create-folder",
          label: "Create a folder",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/get-folder",
          label: "Get a folder",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/update-folder",
          label: "Update a folder",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/delete-folder",
          label: "Delete a folder",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Project",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/create-project",
          label: "Create a project",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/get-project",
          label: "Get a project",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/update-project",
          label: "Update a project",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/delete-project",
          label: "Delete a project",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-sm/specifications/search-projects",
          label: "Search projects",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
