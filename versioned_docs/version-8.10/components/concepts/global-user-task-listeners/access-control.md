---
id: access-control
title: Access control for global user task listeners
sidebar_label: Access control for global user task listeners
description: Permissions required to manage global user task listeners.
---

Global user task listeners are managed through the Orchestration Cluster authorization model. This page lists the permissions required to manage listeners through the Orchestration Cluster REST API and Admin UI.

## When you need to configure permissions

Configure permissions for global user task listeners if all of the following apply:

- [Authorizations are enabled for the cluster](/components/concepts/access-control/authorizations.md#configuration).
- You manage global user task listeners through one of the following:
  - The [Orchestration Cluster API](./configuration.md#configure-via-orchestration-cluster-api), or
  - The [Admin UI](./configuration.md#configure-via-admin-ui).

You do not need additional Orchestration Cluster authorizations when:

- Defining listeners via [Unified Configuration](./configuration.md#configure-through-unified-configuration).
- You only execute processes that are already affected by global listeners. Execution-time behavior is not guarded by separate permissions.

## Required permissions

Global user task listeners use the `GLOBAL_LISTENER` resource type in the Orchestration Cluster authorization model. Only the wildcard resource ID `*` is supported. Authorizations for specific listener IDs are not evaluated.

To allow a user, group, role, or client to manage listeners through the Orchestration Cluster API or the Admin UI, grant authorizations on `GLOBAL_LISTENER` with resource ID `*` and the following permissions:

| Operation                                    | Required permission    | Related API endpoint                                                                                                                |
| :------------------------------------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| List or search global user task listeners    | `READ_TASK_LISTENER`   | [Search global user task listeners](/apis-tools/orchestration-cluster-api-rest/specifications/search-global-task-listeners.api.mdx) |
| View a single global user task listener      | `READ_TASK_LISTENER`   | [Get global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/get-global-task-listener.api.mdx)         |
| Create a new global user task listener       | `CREATE_TASK_LISTENER` | [Create global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-task-listener.api.mdx)   |
| Update an existing global user task listener | `UPDATE_TASK_LISTENER` | [Update global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/update-global-task-listener.api.mdx)   |
| Delete an existing global user task listener | `DELETE_TASK_LISTENER` | [Delete global user task listener](/apis-tools/orchestration-cluster-api-rest/specifications/delete-global-task-listener.api.mdx)   |
