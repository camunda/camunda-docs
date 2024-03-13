module.exports = [
  { type: "doc", id: "docs/zeebe-rest-api" },
  {
    type: "category",
    label: "Cluster",
    items: [
      {
        type: "doc",
        id: "docs/get-cluster-topology",
        label: "Get cluster topology.",
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
        id: "docs/complete-a-user-task",
        label: "Complete a user task.",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/assigns-a-user-task",
        label: "Assigns a user task.",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "docs/update-a-user-task",
        label: "Update a user task.",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "docs/remove-the-assignee-of-a-task",
        label: "Remove the assignee of a task.",
        className: "api-method delete",
      },
    ],
  },
];
