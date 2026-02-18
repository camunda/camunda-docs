---
id: access-control
title: Access control
description: "Grant users access to work with Operate."
---

If authorization control is enabled for your Orchestration Cluster, users require the following authorizations to work with Operate.

:::note
You can assign these [in the Identity UI](components/identity/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for a list of all available authorizations.
:::

## Mandatory authorizations

The following mandatory authorizations are required to work with Operate:

| Authorization type                             | Resource type        | Resource ID                                                                        | Permission                                         |
| :--------------------------------------------- | :------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------- |
| Component access for Operate                   | `Component`          | `operate` or `*` (for access to all web components).                               | `ACCESS`                                           |
| View process definitions and process instances | `Process Definition` | ID of the respective BPMN process definition or `*` (for all process definitions). | `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE` |

## Optional authorizations

The following optional authorizations can also be defined:

| Authorization type                                                                  | Resource type                      | Resource ID                                                                        | Permission                                                                                                                                 |
| :---------------------------------------------------------------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| View decision definitions and decision instances                                    | `Decision Definition`              | ID of the respective DMN decision definition or `*` (for all process definitions). | `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`                                                                                       |
| View decision requirements definitions                                              | `Decision Requirements Definition` | ID of the respective DRD or `*` (for all process definitions).                     | `READ`                                                                                                                                     |
| View running and completed batch operations                                         | `Batch`                            | `*`                                                                                | `READ`                                                                                                                                     |
| Update process instances via batch (cancellation, retries).                         | `Batch`                            | `*`                                                                                | `CREATE` and corresponding permissions for the individual batch operation (for example, `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`). |
| Update process instance directly (migrate, add/update variables, resolve incidents) | `Process Definition`               | ID of the respective BPMN process definition or `*` (for all process definitions). | `UPDATE_PROCESS_INSTANCE`                                                                                                                  |
| Modify process instances                                                            | `Process Definition`               | ID of the respective BPMN process definition or `*` (for all process definitions). | `MODIFY_PROCESS_INSTANCE`                                                                                                                  |
| Cancel process instance directly                                                    | `Process Definition`               | ID of the respective BPMN process definition or `*` (for all process definitions). | `CANCEL_PROCESS_INSTANCE`                                                                                                                  |
| Delete process instances                                                            | `Process Definition`               | ID of the respective BPMN process definition or `*` (for all process definitions). | `DELETE_PROCESS_INSTANCE`                                                                                                                  |
| Delete process definitions                                                          | `Resource`                         | ID of the respective BPMN process definition or `*` (for all resources).           | `DELETE_PROCESS`                                                                                                                           |
| Delete decisions                                                                    | `Resource`                         | ID of the respective decision ID or `*` (for all resources).                       | `DELETE_DECISION_INSTANCE`                                                                                                                 |
