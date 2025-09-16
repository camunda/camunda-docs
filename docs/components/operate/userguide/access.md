---
id: access
title: Access
description: "Grant users access to work with Operate."
---

If authorization checks are enabled for your Orchestration Cluster, users need authorizations as described in this section to work with Operate. You can assign those [in the Identity UI](components/identity/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for an overview of all available authorizations.

## Mandatory authorizations

- Component access for Operate:
  - Resource type: `Component`
  - Resource id: `operate` or `*` (for access to all web components)
  - Permission: `ACCESS`
- View process definitions and process instances
  - Resource type: `Process Definition`
  - Resource id: ID of the respective BPMN process definition or `*` (for all process definitions)
  - Permissions: `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`

## Optional authorizations

- View decision definitions and decision instances
  - Resource type: `Decision Definition`
  - Resource id: ID of the respective DMN decision definition or `*` (for all process definitions)
  - Permissions: `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`
- View decision requirements definitions
  - Resource type: `Decision Requirements Definition`
  - Resource id: ID of the respective DRD or `*` (for all process definitions)
  - Permissions: `READ`
- View running and completed batch operations
  - Resource type: `Batch`
  - Resource id: `*`
  - Permissions: `READ`
- Update process instances via batch (cancellation, retries)
  - Resource type: `Batch`
  - Resource id: `*`
  - Permissions: `CREATE` and corresponding permissions for the individual batch operation (e.g. `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`)
- Update process instance directly
  - Resource type: `Process Definition`
  - Resource id: ID of the respective BPMN process definition or `*` (for all process definitions)
  - Permissions: `UPDATE_PROCESS_INSTANCE`
- Cancel process instance directly
  - Resource type: `Process Definition`
  - Resource id: ID of the respective BPMN process definition or `*` (for all process definitions)
  - Permissions: `CANCEL_PROCESS_INSTANCE`
