---
id: operation-structure
title: Operation data structure
description: Learn how operation data from the audit log is presented in different contexts.
---

Learn more about how operation data from the audit log is presented in different contexts.

## Applications

Depending on the view you're using to access the audit log in [Operate](../../operate/userguide/audit-operations.md), [Admin](../../admin/audit-operations.md), or [Tasklist](../../tasklist/userguide/audit-task-history.md), you'll see a subset of the following operation details:

| Property       | Description                                                                 |
| :------------- | :-------------------------------------------------------------------------- |
| Status         | The status of the operation.                                                |
| Operation type | The type of operation applied.                                              |
| Entity type    | The type of entity the operation was applied to.                            |
| Entity key     | The key and name of the entity the operation was applied to, if applicable. |
| Parent entity  | The key and name of the parent entity, if applicable.                       |
| Related entity | The ID or name of the related entity, if applicable.                        |
| Details        | Details about the operation.                                                |
| Actor          | The user, client, or agent that applied the operation.                      |
| Date           | The date and time at which the operation was applied.                       |

### Entity key

Some audit log entries contain extra details about the entity in the **entity key** field:

| Operation type | Entity type      | Entity key    |
| :------------- | :--------------- | :------------ |
| Create         | Process instance | Process name  |
| Delete         | Process instance | Process name  |
| Create         | Variable         | Variable name |
| Create         | Resource         | Resource name |
| Delete         | Resource         | Resource name |
| Create         | Decision         | Decision name |
| Delete         | Decision         | Decision name |

### Details

Some audit log entries contain extra details about the operation in the **details** field:

| Operation type | Entity type   | Details                            |
| :------------- | :------------ | :--------------------------------- |
| Create         | Batch         | Batch operation type               |
| Assign         | User task     | Assignee                           |
| Unassign       | User task     | Assignee                           |
| Create         | Authorization | Owner(entity type, entity name)    |
| Assign         | Tenant        | Assignee(entity type, entity name) |
| Unassign       | Tenant        | Assignee(entity type, entity name) |
| Assign         | Role          | Assignee(entity type, entity name) |
| Unassign       | Role          | Assignee(entity type, entity name) |
| Assign         | Group         | Assignee(entity type, entity name) |
| Unassign       | Group         | Assignee(entity type, entity name) |

### Actor

The following actor types can trigger operations:

| Actor type | Identifier |
| :--------- | :--------- |
| User       | Username   |
| Client     | Client ID  |

Agents can perform operations on behalf of a user or client. In this case, you will see the agent's information in the record.

## REST API

With the API, you can access more operation data than you can in the applications. See the [API response schema](../../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx#responses) for more information.
