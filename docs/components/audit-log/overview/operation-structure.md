---
id: operation-structure
title: Operation data structure
description: Learn how operation data from the audit log is presented in different contexts.
---

Learn how operation data from the audit log is presented in different contexts.

## Applications

Depending on the view you're using to access the audit log in [Operate](../../operate/userguide/audit-operations.md), [Identity](../../identity/audit-operations.md), or [Tasklist](../../tasklist/userguide/audit-task-history.md), you'll see some subset of the following operation details:

| Property   | Description                                            |
| :--------- | :----------------------------------------------------- |
| Operation  | The applied operation.                                 |
| Entity     | The entity type the operation was applied to.          |
| Status     | The status of the operation.                           |
| Applied to | The entity instance the operation was applied to.      |
| Actor      | The user, client, or agent that applied the operation. |
| Time       | The time at which the operation was applied.           |

### Actor

Two types of actors may trigger operations:

| Actor type | Identifier |
| :--------- | :--------- |
| User       | Username   |
| Client     | Client ID  |

Agents can perform operations on behalf of a user or client. In this case, you'll see the agent's information in the record.

## REST API

With the API, you can access more operation data than you can in the applications. See the [API response schema](../../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx#responses) for more information.
