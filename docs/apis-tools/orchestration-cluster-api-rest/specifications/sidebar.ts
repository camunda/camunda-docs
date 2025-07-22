import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/orchestration-cluster-api-rest/specifications/orchestration-cluster-rest-api",
    },
    {
      type: "category",
      label: "Ad-hoc sub-process",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/activate-ad-hoc-sub-process-activities",
          label: "Activate activities within an ad-hoc sub-process",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Authentication",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-authentication",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-authorization",
          label: "Create authorization",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-authorization",
          label: "Update authorization",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-authorization",
          label: "Get authorization",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-authorization",
          label: "Delete authorization",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-authorizations",
          label: "Search authorizations",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Batch operation",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-batch-operation",
          label: "Get batch operation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-batch-operations",
          label: "Search batch operations",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/cancel-batch-operation",
          label: "Cancel Batch operation",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/suspend-batch-operation",
          label: "Suspend Batch operation",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/resume-batch-operation",
          label: "Resume Batch operation",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-batch-operation-items",
          label: "Search batch operation items",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/pin-clock",
          label: "Pin internal clock (alpha)",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/reset-clock",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-topology",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-decision-definitions",
          label: "Search decision definitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-decision-definition",
          label: "Get decision definition",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-decision-definition-xml",
          label: "Get decision definition XML",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/evaluate-decision",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-decision-instances",
          label: "Search decision instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-decision-instance",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-decision-requirements",
          label: "Search decision requirements",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-decision-requirements",
          label: "Get decision requirements",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-decision-requirements-xml",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-document",
          label: "Upload document",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-documents",
          label: "Upload multiple documents",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-document",
          label: "Download document",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-document",
          label: "Delete document",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-document-link",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-element-instances",
          label: "Search element instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-element-instance",
          label: "Get element instance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables",
          label: "Update element instance variables",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Group",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-group",
          label: "Create group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-group",
          label: "Get group",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-group",
          label: "Update group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-group",
          label: "Delete group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-users-for-group",
          label: "Search group users",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-mapping-rules-for-group",
          label: "Search group mapping rules",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-roles-for-group",
          label: "Search group roles",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-clients-for-group",
          label: "Search group clients",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/add-user-to-group",
          label: "Assign a user to a group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/unassign-user-from-group",
          label: "Unassign a user from a group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/add-client-to-group",
          label: "Assign a client to a group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/unassign-client-from-group",
          label: "Unassign a client from a group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-mapping-rule-to-group",
          label: "Assign a mapping rule to a group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/unassign-mapping-rule-from-group",
          label: "Unassign a mapping rule from a group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-groups",
          label: "Search groups",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/resolve-incident",
          label: "Resolve incident",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-incidents",
          label: "Search incidents",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-incident",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/activate-jobs",
          label: "Activate jobs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-jobs",
          label: "Search jobs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/fail-job",
          label: "Fail job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/throw-job-error",
          label: "Throw error for job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/complete-job",
          label: "Complete job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-job",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-license",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-mapping-rule",
          label: "Create mapping rule",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-mapping-rule",
          label: "Update mapping rule",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-mapping-rule",
          label: "Delete a mapping rule",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-mapping-rule",
          label: "Get a mapping rule",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-mapping-rule",
          label: "Search mapping rules",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/publish-message",
          label: "Publish message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/correlate-message",
          label: "Correlate message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-message-subscriptions",
          label: "Search message subscriptions",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Message subscription",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-message-subscriptions",
          label: "Search message subscriptions",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-process-definitions",
          label: "Search process definitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-definition",
          label: "Get process definition",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-definition-xml",
          label: "Get process definition XML",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-start-process-form",
          label: "Get process start form",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-definition-statistics",
          label: "Get process definition statistics",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance",
          label: "Create process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-instance",
          label: "Get process instance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-instance-sequence-flows",
          label: "Get process instance sequence flows",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-instance-statistics",
          label: "Get process instance statistics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-process-instances",
          label: "Search process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-process-instance-incidents",
          label: "Search for incidents associated with a process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/cancel-process-instance",
          label: "Cancel process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/cancel-process-instances-batch-operation",
          label: "Create a batch operation to cancel process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/resolve-incidents-batch-operation",
          label:
            "Create a batch operation to resolve incidents of process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/migrate-process-instances-batch-operation",
          label: "Create a batch operation to migrate process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/modify-process-instances-batch-operation",
          label: "Create a batch operation to modify process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/migrate-process-instance",
          label: "Migrate process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/modify-process-instance",
          label: "Modify process instance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-process-instance-call-hierarchy",
          label: "Get call hierarchy for process instance",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Resource",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-deployment",
          label: "Deploy resources",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-resource",
          label: "Delete resource",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-resource",
          label: "Get resource",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-resource-content",
          label: "Get resource content",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Role",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-role",
          label: "Create role",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-role",
          label: "Get role",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-role",
          label: "Update role",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-role",
          label: "Delete role",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-users-for-role",
          label: "Search role users",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-clients-for-role",
          label: "Search role clients",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/add-role-to-user",
          label: "Assign a role to a user",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-user-from-role",
          label: "Unassign a user from a role",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/add-role-to-client",
          label: "Assign a role to a client",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-role-from-client",
          label: "Unassign a role from a client",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-roles",
          label: "Search roles",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/add-role-to-group",
          label: "Assign a role to a group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-role-from-group",
          label: "Unassign a role from a group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-groups-for-role",
          label: "Search role groups",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/add-role-to-mapping-rule",
          label: "Assign a role to a mapping rule",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-role-from-mapping-rule",
          label: "Unassign a role from a mapping rule",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-mapping-rules-for-role",
          label: "Search role mapping rules",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Setup",
      items: [
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-admin-user",
          label: "Create admin user",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/broadcast-signal",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-tenant",
          label: "Create tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-tenant",
          label: "Get tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-tenant",
          label: "Update tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-tenant",
          label: "Delete tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-user-to-tenant",
          label: "Assign a user to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-user-from-tenant",
          label: "Remove a user from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-users-for-tenant",
          label: "Search users for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-clients-for-tenant",
          label: "Search clients for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-group-ids-for-tenant",
          label: "Search groups for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-groups-for-tenant",
          label: "Search groups for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-roles-for-tenant",
          label: "Search roles for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-client-to-tenant",
          label: "Assign a client to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-client-from-tenant",
          label: "Remove a client from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-mapping-rule-to-tenant",
          label: "Assign a mapping rule to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-mapping-rule-from-tenant",
          label: "Remove a mapping rule from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-mappings-for-tenant",
          label: "Search mapping rules for tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-group-to-tenant",
          label: "Assign a group to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-group-from-tenant",
          label: "Remove a group from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-role-to-tenant",
          label: "Assign a role to a tenant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/remove-role-from-tenant",
          label: "Remove a role from a tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-tenants",
          label: "Search tenants",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/create-user",
          label: "Create user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-users",
          label: "Search users",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-user",
          label: "Get user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/delete-user",
          label: "Delete user",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-user",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-usage-metrics",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/complete-user-task",
          label: "Complete user task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/assign-user-task",
          label: "Assign user task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-user-task",
          label: "Get user task",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/update-user-task",
          label: "Update user task",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-user-task-form",
          label: "Get user task form",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/unassign-user-task",
          label: "Unassign user task",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-user-tasks",
          label: "Search user tasks",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-user-task-variables",
          label: "Search user task variables",
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
          id: "apis-tools/orchestration-cluster-api-rest/specifications/search-variables",
          label: "Search variables",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/orchestration-cluster-api-rest/specifications/get-variable",
          label: "Get variable",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
