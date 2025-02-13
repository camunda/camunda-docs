import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/camunda-api-rest/specifications/camunda-8-rest-api",
    },
    {
      type: "category",
      label: "Authentication",
      items: [
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-authentication",
          label: "Get current user",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Authorization",
      items: [
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-authorization",
          label: "Create authorization",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/update-authorization",
          label: "Update authorization",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/delete-authorization",
          label: "Delete authorization",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/find-authorizations",
          label: "Query authorizations",
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
          label: "Query decision definitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-decision-definition",
          label: "Get decision definition",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-decision-definition-xml",
          label: "Get decision definition XML",
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
          label: "Query decision instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-decision-instance",
          label: "Get decision instance",
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
          label: "Query decision requirements",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-decision-requirements",
          label: "Get decision requirements",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-decision-requirements-xml",
          label: "Get decision requirements XML",
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
          label: "Upload document",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-documents",
          label: "Upload multiple documents",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-document",
          label: "Download document",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/delete-document",
          label: "Delete document",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-document-link",
          label: "Create document link",
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
          label: "Query flow node instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-flow-node-instance",
          label: "Get flow node instance",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Group",
      items: [
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-group",
          label: "Create group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-group",
          label: "Get group",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/update-group",
          label: "Update group",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/delete-group",
          label: "Delete group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/add-user-to-group",
          label: "Assign a user to a group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/unassign-user-from-group",
          label: "Unassign a user from a group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/search-groups",
          label: "Query groups",
          className: "api-method post",
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
          label: "Query incidents",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-incident",
          label: "Get incident",
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
      label: "Mapping rule",
      items: [
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-mapping-rule",
          label: "Create mapping rule",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/delete-mapping-rule",
          label: "Delete a mapping rule",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/find-mappings",
          label: "Query mappings",
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
          label: "Query process definitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-process-definition",
          label: "Get process definition",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-process-definition-xml",
          label: "Get process definition XML",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-start-process-form",
          label: "Get process start form",
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
          label: "Get process instance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/find-process-instances",
          label: "Query process instances",
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
      label: "Tenant",
      items: [
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-tenant",
          label: "Create tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-tenant",
          label: "Get tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/update-tenant",
          label: "Update tenant",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/delete-tenant",
          label: "Delete tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/assign-user-to-tenant",
          label: "Assign a user to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/remove-user-from-tenant",
          label: "Remove a user from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/search-users-for-tenant",
          label: "Query users for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/assign-mapping-rule-to-tenant",
          label: "Assign a mapping rule to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/remove-mapping-rule-from-tenant",
          label: "Remove a mapping rule from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/assign-group-to-tenant",
          label: "Assign a group to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/remove-group-from-tenant",
          label: "Remove a group from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/search-tenants",
          label: "Query tenants",
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
          id: "apis-tools/camunda-api-rest/specifications/search-users-for-tenant",
          label: "Query users for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/create-user",
          label: "Create user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/find-users",
          label: "Query users",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/delete-user",
          label: "Delete user",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/update-user",
          label: "Update user",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Usage metrics",
      items: [
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-usage-metrics",
          label: "Get usage metrics",
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
          label: "Get user task",
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
          label: "Get user task form",
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
          label: "Query user tasks",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/find-user-task-variables",
          label: "Query user task variables",
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
          label: "Query variables",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/camunda-api-rest/specifications/get-variable",
          label: "Get variable",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
