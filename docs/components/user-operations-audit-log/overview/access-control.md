---
id: access-control
title: Access control
sidebar_label: Access control
description: Reference the permissions required to access user operations audit log entries.
---

Reference the permissions required to access audit log entries.

## About

To access entries in the audit log, you must have the authorizations that match your needs:

| Authorization type                                                                                                                                                                                   | Resource type        | Resource ID                                                                                       | Permission              |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :------------------------------------------------------------------------------------------------ | :---------------------- |
| View audit log entries.                                                                                                                                                                              | `AUDIT_LOG`          | An operation category (`ADMIN`, `DEPLOYED_RESOURCES`, or `USER_TASKS`) or `*` for all categories. | `READ`                  |
| View `DEPLOYED_RESOURCES` and `USER_TASKS` operations for instances of a specific process definition. This provides access to both the general and process instance-level operation logs in Operate. | `PROCESS_DEFINITION` | A process definition ID or `*` for all process definitions.                                       | `READ_PROCESS_INSTANCE` |
| View `USER_TASKS` operations for instances of a specific process definition. This provides access to the operation log in Operate and the task history in Tasklist.                                  | `PROCESS_DEFINITION` | A process definition ID or `*` for all process definitions.                                       | `READ_USER_TASK`        |
| View operations related to specific tasks the user has access to based on task properties. This provides access to task history records in Tasklist.                                                 | `USER_TASK`          | A user task property (assignee, candidateUsers, candidateGroups).                                 | `READ`                  |

Read more about the operation categories in [Recorded operations](./recorded-operations.md).
