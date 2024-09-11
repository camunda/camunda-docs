module.exports = [
  {
    type: "doc",
    id: "apis-tools/camunda-api-rest/specifications/camunda-8-rest-api",
  },
  {
    type: "category",
    label: "Cluster",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-cluster-topology",
        label: "Get cluster topology",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "License",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-status-of-camunda-license",
        label: "Get status of Camunda license",
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
        id: "apis-tools/camunda-api-rest/specifications/report-error-for-job",
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
        id: "apis-tools/camunda-api-rest/specifications/update-a-job",
        label: "Update a job",
        className: "api-method patch",
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
        id: "apis-tools/camunda-api-rest/specifications/query-incident-experimental",
        label: "Query incident (experimental)",
        className: "api-method post",
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
        id: "apis-tools/camunda-api-rest/specifications/update-user-task",
        label: "Update user task",
        className: "api-method patch",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/unassign-user-task",
        label: "Unassign user task",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/query-user-tasks-experimental",
        label: "Query user tasks (experimental)",
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
        id: "apis-tools/camunda-api-rest/specifications/pin-the-zeebe-engines-internal-clock-to-a-specific-time-experimental",
        label:
          "Pin the Zeebe engine’s internal clock to a specific time (experimental)",
        className: "api-method put",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/reset-the-zeebe-engines-internal-clock-to-the-system-time-experimental",
        label:
          "Reset the Zeebe engine’s internal clock to the system time (experimental)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Process Instance",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/start-process-instance",
        label: "Start process instance",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/query-process-instances-experimental",
        label: "Query process instances (experimental)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Decision Definition",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/query-decision-definitions-experimental",
        label: "Query decision definitions (experimental)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/get-decision-definition-xml-experimental",
        label: "Get decision definition XML (experimental)",
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
        id: "apis-tools/camunda-api-rest/specifications/query-decision-requirements-experimental",
        label: "Query decision requirements (experimental)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Authorization",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/patch-authorization",
        label: "Patch an authorization",
        className: "api-method patch",
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
        label: "Create a user",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/find-all-users",
        label: "Get list of users",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Message",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/correlate-a-message",
        label: "Correlate a message",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Documents",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/upload-document-experimental",
        label: "Upload document (experimental)",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/download-document-experimental",
        label: "Download document (experimental)",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/delete-document-experimental",
        label: "Delete document (experimental)",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/create-document-link-experimental",
        label: "Create document link (experimental)",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Resources",
    items: [
      {
        type: "doc",
        id: "apis-tools/camunda-api-rest/specifications/deploy-resources",
        label: "Deploy resources",
        className: "api-method post",
      },
    ],
  },
];
