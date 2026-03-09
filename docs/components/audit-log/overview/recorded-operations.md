---
id: recorded-operations
title: Recorded operations
sidebar_label: Recorded operations
description: Learn more about which operations are recorded in the audit log.
---

Learn more about which operations are recorded in the audit log.

## Limitations and constraints

The audit log contains operations performed using:

- [Operate](../../operate/userguide/audit-operations.md), [Identity](../../identity/audit-operations.md), and [Tasklist](../../tasklist/userguide/audit-task-history.md)
- [Orchestration Cluster REST API](../../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx)

However, only operations that are authenticated, authorized, and reach execution with a success or execution‑time failure are recorded. Operations rejected before execution are not recorded in the audit log.

Additionally, only user operations are tracked by default, not [client](../../zeebe/technical-concepts/architecture.md#clients) operations. Unlike the other constraints, you can configure this behavior.

## Recorded operations

There are three categories of recorded operations:

- `USER_TASKS`
- `ADMIN`
- `DEPLOYED_RESOURCES`

### `USER_TASKS` operations

You can review the full history of user task actions, including assignment changes, completions, and updates. With this, you can resolve disputes, investigate SLA breaches, and validate that required steps were followed during case handling.

These operations belong to the category `USER_TASKS`. The following operations are recorded in the audit log:

| Operation type | Entity    | Tracked rejections |
| :------------- | :-------- | :----------------- |
| Update         | User task | INVALID_STATE      |
| Assign         | User task | INVALID_STATE      |
| Unassign       | User task | INVALID_STATE      |
| Complete       | User task | INVALID_STATE      |

### `ADMIN` operations

You can track all changes to identity resources, like authorizations, users, and tenants. With this, you can detect misconfigurations and investigate potential unauthorized access to sensitive process data.

These operations belong to the category `ADMIN`. The following operations are recorded in the audit log:

| Operation type | Entity        | Tracked rejections |
| :------------- | :------------ | :----------------- |
| Create         | Authorization | –                  |
| Update         | Authorization | –                  |
| Delete         | Authorization | –                  |
| Create         | User          | –                  |
| Update         | User          | –                  |
| Delete         | User          | –                  |
| Create         | Tenant        | –                  |
| Update         | Tenant        | –                  |
| Delete         | Tenant        | –                  |
| Assign         | Tenant        | –                  |
| Unassign       | Tenant        | –                  |
| Create         | Role          | –                  |
| Update         | Role          | –                  |
| Delete         | Role          | –                  |
| Assign         | Role          | –                  |
| Unassign       | Role          | –                  |
| Create         | Group         | –                  |
| Update         | Group         | –                  |
| Delete         | Group         | –                  |
| Assign         | Group         | –                  |
| Unassign       | Group         | –                  |
| Create         | Mapping rule  | –                  |
| Update         | Mapping rule  | –                  |
| Delete         | Mapping rule  | –                  |

### `DEPLOYED_RESOURCES` operations

You can audit user and client actions that modified or influenced deployed resources and dependent entities, like process instances, batch operations, and variables. With this, you can identify manual corrections and confirm the sequence of actions that led to a process failure or escalation.

These operations belong to the category `DEPLOYED_RESOURCES`. The following operations are recorded in the audit log:

| Operation type | Entity           | Tracked rejections              |
| :------------- | :--------------- | :------------------------------ |
| Create         | Process instance | –                               |
| Cancel         | Process instance | –                               |
| Modify         | Process instance | –                               |
| Migrate        | Process instance | INVALID_STATE, PROCESSING_ERROR |
| Create         | Variable         | –                               |
| Update         | Variable         | –                               |
| Resolve        | Incident         | INVALID_STATE                   |
| Create         | Resource         | –                               |
| Delete         | Resource         | –                               |
| Create         | Batch            | –                               |
| Suspend        | Batch            | INVALID_STATE                   |
| Resume         | Batch            | INVALID_STATE                   |
| Cancel         | Batch            | INVALID_STATE                   |
| Create         | Decision         | –                               |
| Delete         | Decision         | –                               |
| Evaluate       | Decision         | –                               |

#### Batch operations

While the operations for creating and managing batch operations are recorded in the audit log, the batch operation state changes aren't. For more information, learn how to [monitor batch operations](../../operate/userguide/monitor-batch-operations.md).
