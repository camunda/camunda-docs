---
id: access-control
title: Access control for global user task listeners API
sidebar_label: Access control for global user task listeners API
description: Reference the permissions required to manage global user task listeners via API.
---

Global user task listeners are managed through the Orchestration Cluster authorization model. This page explains which permissions are required to configure global listeners via the Orchestration Cluster REST API and the Admin UI, and how they relate to the existing authorization concepts.

## When you need to configure permissions

Configure permissions for global user task listeners if all the following apply:

- [Authorizations are enabled for the cluster](/components/concepts/access-control/authorizations.md#configuration).
- You want to manage global user task listeners via:
  - The [Orchestration Cluster API](./configuration.md#configure-via-orchestration-cluster-api), or
  - The [Admin UI](./configuration.md#configure-via-admin-ui).

You do not need additional Orchestration Cluster authorizations when:

- Defining listeners via [Unified Configuration](./configuration.md#configure-through-unified-configuration).
- Merely executing processes that are already affected by global listeners. Execution-time behavior is not guarded by separate permissions; any user or client allowed to run processes and user tasks will see the effect of configured listeners.

## Required permissions

Global user task listeners use the `GLOBAL_LISTENER` resource type in the Orchestration Cluster authorization model. Only the wildcard resource ID `*` is supported; authorizations for specific listener IDs are not evaluated.

To allow a user, group, role, or client to manage global user task listeners via either the Orchestration Cluster API or the Admin UI, grant authorizations on `GLOBAL_LISTENER` with resource ID `*` and the following permissions:

| Operation                                    | Required permission    | Related API endpoint                                                                                                                |
| :------------------------------------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| List or search global user task listeners    | `READ_TASK_LISTENER`   | [Search global user task listeners](/apis-tools/orchestration-cluster-api-rest/specifications/search-global-task-listeners.api.mdx) |
| View a single global user task listener      | `READ_TASK_LISTENER`   | [Get global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/get-global-task-listener.api.mdx)         |
| Create a new global user task listener       | `CREATE_TASK_LISTENER` | [Create global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-task-listener.api.mdx)   |
| Update an existing global user task listener | `UPDATE_TASK_LISTENER` | [Update global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/update-global-task-listener.api.mdx)   |
| Delete an existing global user task listener | `DELETE_TASK_LISTENER` | [Delete global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/delete-global-task-listener.api.mdx)   |
