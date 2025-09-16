---
id: access
title: Access
description: "Grant users access to work with Tasklist."
---

If authorization checks are enabled for your Orchestration Cluster, users need authorizations as described in this section to work with Tasklist. You can assign those [in the Identity UI](components/identity/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for an overview of all available authorizations.

## Mandatory authorizations

- Component access for Tasklist:
  - Resource type: `Component`
  - Resource id: `tasklist` or `*` (for access to all web components)
  - Permission: `ACCESS`
- Read user tasks
  - Resource type: `Process Definition`
  - Resource id: ID of the respective BPMN process definition or `*` (for all process definitions)
  - Permission: `READ_USER_TASK`

## Optional authorizations

- Assign and complete user tasks
  - Resource type: `Process Definition`
  - Resource id: ID of the respective BPMN process definition or `*` (for all process definitions)
  - Permission: `UPDATE_USER_TASK`
- View BPMN diagrams
  - Resource type: `Process Definition`
  - Resource id: ID of the respective BPMN process definition or `*` (for all process definitions)
  - Permission: `READ_PROCESS_DEFINITION`
