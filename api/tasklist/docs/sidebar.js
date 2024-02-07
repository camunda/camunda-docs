module.exports = [
  { type: "doc", id: "docs/tasklist-webapp-api" },
  {
    type: "category",
    label: "Form",
    items: [
      {
        type: "doc",
        id: "docs/get-form",
        label: "Get the form details by form id and processDefinitionKey.",
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
        label: "Get the variable details by variable id.",
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
        label: "Saves draft variables for a task.",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/search-task-variables",
        label: "Returns the list of task variables",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/search-tasks",
        label: "Returns the list of tasks that satisfy search request params",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/unassign-task",
        label: "Unassign a task with provided id. Returns the task.",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/complete-task",
        label:
          "Complete a task with taskId and optional variables. Returns the task.",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/assign-task",
        label: "Assign a task with id to assignee. Returns the task.",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/get-task-by-id",
        label:
          "Get one task by id. Returns task or error when task does not exist.",
        className: "api-method get",
      },
    ],
  },
];
