import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/hub-api-saas/specifications/hub-public-api-v-2",
    },
    {
      type: "category",
      label: "Catalog",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/ingest-catalog-assets",
          label: "Ingest catalog assets",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/delete-catalog-asset",
          label: "Delete a catalog asset",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "File",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/create-file",
          label: "Create a file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/get-file",
          label: "Get a file",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/update-file",
          label: "Update a file",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/delete-file",
          label: "Delete a file",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/search-files",
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
          id: "apis-tools/hub-api-saas/specifications/create-folder",
          label: "Create a folder",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/get-folder",
          label: "Get a folder",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/update-folder",
          label: "Update a folder",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/delete-folder",
          label: "Delete a folder",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Info",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/get-info",
          label: "Get API info",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Project",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/create-project",
          label: "Create a project",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/get-project",
          label: "Get a project",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/update-project",
          label: "Update a project",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/delete-project",
          label: "Delete a project",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/search-projects",
          label: "Search projects",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Version",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/create-version",
          label: "Create a version",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/get-version",
          label: "Get a version",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/update-version",
          label: "Update a version",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/delete-version",
          label: "Delete a version",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/search-versions",
          label: "Search versions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/restore-version",
          label: "Restore a version",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Workspace",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/create-workspace",
          label: "Create a workspace",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/get-workspace",
          label: "Get a workspace",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/update-workspace",
          label: "Update a workspace",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/delete-workspace",
          label: "Delete a workspace",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/search-workspaces",
          label: "Search workspaces",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Collaborator",
      items: [
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/add-collaborator",
          label: "Add or update a collaborator",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/remove-collaborator",
          label: "Remove a collaborator",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/hub-api-saas/specifications/search-collaborators",
          label: "Search collaborators",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
