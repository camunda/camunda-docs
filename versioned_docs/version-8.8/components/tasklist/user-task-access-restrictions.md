---
id: user-task-access-restrictions
title: "User task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

User task access restrictions allow you to ensure that only assigned or candidate [users](components/console/manage-organization/manage-users.md) and [groups](components/console/manage-organization/manage-user-groups.md) can access user tasks in [Tasklist](./introduction-to-tasklist.md) when using Tasklist V1. These restrictions are based on
the candidate users and groups defined in a BPMN diagram.

:::caution Tasklist V1 only
User task access restrictions are only supported with the Tasklist V1 API and are not supported
in Tasklist V2. From Camunda 8.8, Tasklist runs in V2 mode by default.

To continue using user task access restrictions, see
[switching between V1 and V2 modes](components/tasklist/api-versions.md#switching-between-v1-and-v2-modes)
to enable Tasklist V1 mode.

Tasklist V2 does not support task-level visibility restrictions.
Authorization-based access control in V2 applies only at the process-definition level and does
not limit access to individual tasks.

For more information about the differences between V1 and V2, see
[Tasklist API versions](components/tasklist/api-versions.md).
:::

For a user to see a task in Tasklist V1, they must meet one of the following criteria in the BPMN
process definition:

- Be the **Assignee**.
- Be listed as a **Candidate user**.
- Belong to a **Candidate group**.

### Example use case

In Tasklist V1, if a task has a candidate group named `Team A` and a candidate user named
`example`, only users that belong to `Team A` and the user `example` will have access to the task.

### Enable/disable user task access restrictions

:::note
User task access restrictions are enabled by default on SaaS. For details on user task access restrictions in Self-Managed, visit the [Self-Managed documentation](../../self-managed/components/orchestration-cluster/tasklist/user-task-access-restrictions.md).
:::

You can enable/disable user task access restrictions from the [cluster settings in Console](components/console/manage-clusters/settings.md#enforce-user-task-restrictions).

When activated, tasks assigned to users or candidate groups are only visible to the assigned user or respective group members. When deactivated, every user can see any task, regardless of the assignment.

This configuration does not affect OIDC API clients. When you retrieve tasks using such a client,
all tasks are returned.
