module.exports = {
  "Tasklist API": [
    { type: "doc", id: "reference/tasklist-api/schema" },
    {
      type: "category",
      label: "Queries",
      items: [
        "reference/tasklist-api/queries/current-user",
        "reference/tasklist-api/queries/task",
        "reference/tasklist-api/queries/tasks",
      ],
    },
    {
      type: "category",
      label: "Mutations",
      items: [
        "reference/tasklist-api/mutations/claim-task",
        "reference/tasklist-api/mutations/complete-task",
        "reference/tasklist-api/mutations/unclaim-task",
      ],
    },
    {
      type: "category",
      label: "Directives",
      items: [
        "reference/tasklist-api/directives/deprecated",
        "reference/tasklist-api/directives/include",
        "reference/tasklist-api/directives/skip",
        "reference/tasklist-api/directives/specified-by",
      ],
    },
    {
      type: "category",
      label: "Objects",
      items: [
        "reference/tasklist-api/objects/task",
        "reference/tasklist-api/objects/user",
        "reference/tasklist-api/objects/variable",
      ],
    },
    {
      type: "category",
      label: "Enums",
      items: ["reference/tasklist-api/enums/task-state"],
    },
    {
      type: "category",
      label: "Inputs",
      items: [
        "reference/tasklist-api/inputs/task-query",
        "reference/tasklist-api/inputs/variable-input",
      ],
    },
    {
      type: "category",
      label: "Scalars",
      items: [
        "reference/tasklist-api/scalars/boolean",
        "reference/tasklist-api/scalars/id",
        "reference/tasklist-api/scalars/int",
        "reference/tasklist-api/scalars/string",
      ],
    },
  ],
};
