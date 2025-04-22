import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/tasklist-api-rest/specifications/tasklist-rest-api",
    },
    {
      type: "category",
      label: "Form",
      items: [
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/get-form",
          label: "Get a form",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Task",
      items: [
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/save-draft-task-variables",
          label: "Save draft variables",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/search-task-variables",
          label: "Search task variables",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/search-tasks",
          label: "Search tasks",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/unassign-task",
          label: "Unassign a task",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/complete-task",
          label: "Complete a task",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/assign-task",
          label: "Assign a task",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/get-task-by-id",
          label: "Get a task",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Variables",
      items: [
        {
          type: "doc",
          id: "apis-tools/tasklist-api-rest/specifications/get-variable-by-id",
          label: "Get a variable",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
