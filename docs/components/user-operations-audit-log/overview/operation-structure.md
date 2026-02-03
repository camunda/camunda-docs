---
id: operation-structure
title: Operation data structure
description: Learn how operation data from the audit log is presented in different contexts.
---

Learn how operation data from the audit log is presented in different contexts.

## Applications

Depending on the view you're using to access the audit log in [Operate](../../operate/userguide/audit-operations.md), [Identity](../../identity/audit-operations.md), or [Tasklist](../../tasklist/userguide/audit-task-history.md), you'll see some subset of the following operation details:

| Property   | Description                                       |
| :--------- | :------------------------------------------------ |
| Operation  | The applied operation.                            |
| Entity     | The entity type the operation was applied to.     |
| Status     | The status of the operation.                      |
| Applied to | The entity instance the operation was applied to. |
| Actor      | The user or client that applied the operation.    |
| Time       | The time at which the operation was applied.      |

## REST API

With the API, you can access more operation data than you can in the applications. See the [API response schema](../../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx#responses) for more information.
