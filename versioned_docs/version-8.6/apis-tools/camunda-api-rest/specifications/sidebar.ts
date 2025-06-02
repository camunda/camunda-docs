import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-8.6/apis-tools/camunda-api-rest/specifications/camunda-8-rest-api",
    },
    {
      type: "category",
      label: "Cluster",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/get-cluster-topology",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/get-status-of-camunda-license",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/activate-jobs",
          label: "Activate jobs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/fail-job",
          label: "Fail job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/throw-job-error",
          label: "Throw error for job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/complete-job",
          label: "Complete job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/update-a-job",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/resolve-incident",
          label: "Resolve incident",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-incidents-alpha",
          label: "Query incidents (alpha)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/get-incident-by-key-alpha",
          label: "Get incident by key (alpha)",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/complete-user-task",
          label: "Complete user task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/assign-user-task",
          label: "Assign user task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/update-user-task",
          label: "Update user task",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/unassign-user-task",
          label: "Unassign user task",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-user-tasks-alpha",
          label: "Query user tasks (alpha)",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/pin-internal-clock-alpha",
          label: "Pin internal clock (alpha)",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/reset-internal-clock-alpha",
          label: "Reset internal clock (alpha)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Process instance",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/create-process-instance",
          label: "Create process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-process-instances-alpha",
          label: "Query process instances (alpha)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/cancel-process-instance",
          label: "Cancel process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/migrate-process-instance",
          label: "Migrate process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/modify-process-instance",
          label: "Modify process instance",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Flow node Instance",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-flow-node-instances-alpha",
          label: "Query flow node instances (alpha)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Decision definition",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-decision-definitions-alpha",
          label: "Query decision definitions (alpha)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/get-decision-definition-xml-alpha",
          label: "Get decision definition XML (alpha)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/evaluate-decision",
          label: "Evaluate decision",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Decision requirements",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-decision-requirements-alpha",
          label: "Query decision requirements (alpha)",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/query-decision-instances-alpha",
          label: "Query decision instances (alpha)",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/publish-a-message",
          label: "Publish a message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/correlate-a-message",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/upload-document-alpha",
          label: "Upload document (alpha)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/download-document-alpha",
          label: "Download document (alpha)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/delete-document-alpha",
          label: "Delete document (alpha)",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/create-document-link-alpha",
          label: "Create document link (alpha)",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/deploy-resources",
          label: "Deploy resources",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/delete-resource",
          label: "Delete resource",
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
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/update-element-instance-variables",
          label: "Update element instance variables",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Signal",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/broadcast-signal",
          label: "Broadcast signal",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
