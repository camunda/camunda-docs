---
id: access-control
title: Access control
description: "Grant users access to work with Tasklist."
---

If authorization control is enabled for your Orchestration Cluster, users require the following authorizations to work with Tasklist.

:::note
You can assign these [in the Identity UI](components/identity/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for a list of all available authorizations.
:::

## Mandatory authorizations

The following mandatory authorizations are required to work with Tasklist:

| Authorization type             | Resource type        | Resource ID                                                                        | Permission       |
| :----------------------------- | :------------------- | :--------------------------------------------------------------------------------- | :--------------- |
| Component access for Tasklist. | `Component`          | `tasklist` or `*` (for access to all web components).                              | `ACCESS`         |
| Read user tasks.               | `Process Definition` | ID of the respective BPMN process definition or `*` (for all process definitions). | `READ_USER_TASK` |

## Optional authorizations

The following optional authorizations can also be defined:

| Authorization type                                                                                                                                                    | Resource type        | Resource ID                                                                        | Permission                |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :--------------------------------------------------------------------------------- | :------------------------ |
| Assign and complete user tasks.                                                                                                                                       | `Process Definition` | ID of the respective BPMN process definition or `*` (for all process definitions). | `UPDATE_USER_TASK`        |
| View BPMN diagrams.                                                                                                                                                   | `Process Definition` | ID of the respective BPMN process definition or `*` (for all process definitions). | `READ_PROCESS_DEFINITION` |
| View [`USER_TASKS` operations](../../user-operations-audit-log/overview/recorded-operations.md#user_tasks-operations) for instances of a specific process definition. | `PROCESS_DEFINITION` | A process definition ID or `*` for all process definitions.                        | `READ_USER_TASK`          |
| View task history records related to specific tasks the user has access to based on task properties.                                                                  | `USER_TASK`          | A user task property (`assignee`, `candidateUsers`, `candidateGroups`).            | `READ`                    |
