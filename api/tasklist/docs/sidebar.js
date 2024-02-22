module.exports = [
  { type: "doc", id: "docs/tasklist-rest-api" },
  {
    type: "category",
    label: "Form",
    items: [
      {
        type: "doc",
        id: "docs/get-form",
        label: "Get form details",
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
        id: "docs/get-variable-by-id",
        label: "Get variable details",
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
        id: "docs/save-draft-task-variables",
        label: "Save draft variables",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/search-task-variables",
        label: "Search task variables",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/search-tasks",
        label: "Search tasks",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/unassign-task",
        label: "Unassign a task",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/complete-task",
        label: "Complete a task",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/assign-task",
        label: "Assign a task",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/get-task-by-id",
        label: "Get task details",
        className: "api-method get",
      },
    ],
  },
];
