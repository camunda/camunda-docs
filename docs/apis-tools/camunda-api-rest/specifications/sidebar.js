module.exports = [
  {
    type: "doc",
    id: "apis-tools/camunda-api-rest/specifications/camunda-8-rest-api",
  },
  {
    type: "category",
    label: "Authorization",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/update-authorization",
        label: "Update authorization",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-authorizations",
        label: "Query authorizations (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-user-authorizations",
        label: "Query user authorizations (alpha)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Clock",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/pin-clock",
        label: "Pin internal clock (alpha)",
        className: "api-method put",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/reset-clock",
        label: "Reset internal clock (alpha)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Cluster",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-topology",
        label: "Get cluster topology",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Decision definition",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-decision-definitions",
        label: "Query decision definitions (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-decision-definition",
        label: "Get decision definition (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-decision-definition-xml",
        label: "Get decision definition XML (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/evaluate-decision",
        label: "Evaluate decision",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Decision instance",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-decision-instances",
        label: "Query decision instances (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-decision-instance",
        label: "Get decision instance (alpha)",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Decision requirements",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-decision-requirements",
        label: "Query decision requirements (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-decision-requirements",
        label: "Get decision requirements (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-decision-requirements-xml",
        label: "Get decision requirements XML (alpha)",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Document",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-document",
        label: "Upload document (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-document",
        label: "Download document (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/delete-document",
        label: "Delete document (alpha)",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-document-link",
        label: "Create document link (alpha)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Element instance",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-element-instance-variables",
        label: "Update element instance variables",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Flow node instance",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-flow-node-instances",
        label: "Query flow node instances (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-flow-node-instance",
        label: "Get flow node instance (alpha)",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Incident",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/resolve-incident",
        label: "Resolve incident",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-incidents",
        label: "Query incidents (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-incident",
        label: "Get incident (alpha)",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Job",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/activate-jobs",
        label: "Activate jobs",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/fail-job",
        label: "Fail job",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/report-job-error",
        label: "Report error for job",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/complete-job",
        label: "Complete job",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/update-job",
        label: "Update job",
        className: "api-method patch",
      },
    ],
  },
  {
    type: "category",
    label: "License",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-license",
        label: "Get license status",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Message",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/publish-message",
        label: "Publish message",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/correlate-message",
        label: "Correlate message",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Process definition",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-process-definitions",
        label: "Query process definitions (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-process-definition",
        label: "Get process definition (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-process-definition-xml",
        label: "Get process definition XML (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-start-process-form",
        label: "Get process start form (alpha)",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Process instance",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-process-instance",
        label: "Create process instance",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-process-instance",
        label: "Get process instance (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-process-instances",
        label: "Query process instances (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/cancel-process-instance",
        label: "Cancel process instance",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/migrate-process-instance",
        label: "Migrate process instance",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/modify-process-instance",
        label: "Modify process instance",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Resource",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-deployment",
        label: "Deploy resources",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/delete-resource",
        label: "Delete resource",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Role",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-role",
        label: "Create role",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-role",
        label: "Get role",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/update-role",
        label: "Update role",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/delete-role",
        label: "Delete role",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/search-roles",
        label: "Query roles",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Signal",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/broadcast-signal",
        label: "Broadcast signal",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "User",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-user",
        label: "Create user",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-users",
        label: "Query users (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/delete-user",
        label: "Delete user",
        className: "api-method delete",
      },
    ],
  },
  {
    type: "category",
    label: "User task",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/complete-user-task",
        label: "Complete user task",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/assign-user-task",
        label: "Assign user task",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-user-task",
        label: "Get user task (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/update-user-task",
        label: "Update user task",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-user-task-form",
        label: "Get user task form (alpha)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/unassign-user-task",
        label: "Unassign user task",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-user-tasks",
        label: "Query user tasks (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-user-task-variables",
        label: "Query user task variables (alpha)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Variable",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-variables",
        label: "Query variables (alpha)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-variable",
        label: "Get variable (alpha)",
        className: "api-method get",
      },
    ],
  },
];
