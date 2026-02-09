---
id: recorded-operations
title: Recorded operations
sidebar_label: Recorded operations
description: Learn what operations are recorded in the audit log.
---

Learn what operations are recorded in the audit log.

## Limitations and constraints

The audit log contains operations performed using:

- [Operate](../../operate/userguide/audit-operations.md), [Identity](../../identity/audit-operations.md), and [Tasklist](../../tasklist/userguide/audit-task-history.md)
- [Orchestration Cluster REST API](../../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx)

However, only operations that are authenticated, authorized, and reach execution with a success or execution‑time failure are recorded. Operations rejected before execution aren't recorded in the audit log.

Additionally, only user operations are tracked by default, not [client](../../zeebe/technical-concepts/architecture.md#clients) operations. Unlike the other constraints, you can configure this behavior.

## Recorded operations

There are three categories of recorded operations:

- `USER_TASKS`
- `ADMIN`
- `DEPLOYED_RESOURCES`

### USER_TASKS operations

You can review the full history of user task actions, including assignment changes, completions, and updates. With this, you can resolve disputes, investigate SLA breaches, and validate that required steps were followed during case handling.

These operations belong to the category `USER_TASKS`. The following are recorded in the audit log:

| Operation         | Entity              | Tracked rejections |
| :---------------- | :------------------ | :----------------- |
| Assign task       | User task           | INVALID_STATE      |
| Unassign task     | User task           | INVALID_STATE      |
| Complete task     | User task           | INVALID_STATE      |
| Update task       | User task           | INVALID_STATE      |
| Command rejection | Command entity type | –                  |

### ADMIN operations

You can trace all changes to identity resources, like authorizations, users, and tenants. With this, you can detect misconfigurations and investigate potential unauthorized access to sensitive process data.

These operations belong to the category `ADMIN`. The following are recorded in the audit log:

| Operation            | Entity              | Tracked rejections |
| :------------------- | :------------------ | :----------------- |
| Create Authorization | Authorization       | –                  |
| Delete Authorization | Authorization       | –                  |
| Update Authorization | Authorization       | –                  |
| Create User          | User                | –                  |
| Update User          | User                | –                  |
| Delete User          | User                | –                  |
| Create Tenant        | Tenant              | –                  |
| Assign Tenant        | Tenant              | –                  |
| Unassign Tenant      | Tenant              | –                  |
| Update Tenant        | Tenant              | –                  |
| Delete Tenant        | Tenant              | –                  |
| Create Role          | Role                | –                  |
| Delete Role          | Role                | –                  |
| Update Role          | Role                | –                  |
| Assign Role          | Role                | –                  |
| Unassign Role        | Role                | –                  |
| Create Group         | Group               | –                  |
| Update Group         | Group               | –                  |
| Assign Group         | Group               | –                  |
| Unassign Group       | Group               | –                  |
| Delete Group         | Group               | –                  |
| Create Mapping Rule  | MappingRule         | –                  |
| Update Mapping Rule  | MappingRule         | –                  |
| Delete Mapping Rule  | MappingRule         | –                  |
| Command rejection    | Command entity type | –                  |

### DEPLOYED_RESOURCES operations

You can audit user and client actions that modified or influenced deployed resources and dependent entities, like process instances, batch operations, and variables. With this, you can identify manual corrections and confirm the sequence of actions that led to a process failure or escalation.

These operations belong to the category `DEPLOYED_RESOURCES`. The following are recorded in the audit log:

| Operation                | Entity              | Tracked rejections              |
| :----------------------- | :------------------ | :------------------------------ |
| Create Process instance  | Process instance    | –                               |
| Cancel Process instance  | Process instance    | –                               |
| Modify Process instance  | Process instance    | –                               |
| Migrate Process instance | Process instance    | INVALID_STATE, PROCESSING_ERROR |
| Create Variable          | Variable            | –                               |
| Update Variable          | Variable            | –                               |
| Create Resource          | Resource            | –                               |
| Delete Resource          | Resource            | –                               |
| Create Batch             | Batch               | –                               |
| Resolve Incident         | Incident            | INVALID_STATE                   |
| Suspend Batch            | Batch               | INVALID_STATE                   |
| Resume Batch             | Batch               | INVALID_STATE                   |
| Cancel Batch             | Batch               | INVALID_STATE                   |
| Create Decision          | Decision            | –                               |
| Delete Decision          | Decision            | –                               |
| Evaluate Decision        | Decision            | –                               |
| Command rejection        | Command entity type | –                               |

#### Batch operations

While the operations for creating and managing batch operations are recorded in the user operations audit log, the batch operation state changes aren't. For more information, learn how to [monitor batch operations](../../operate/userguide/monitor-batch-operations.md).
