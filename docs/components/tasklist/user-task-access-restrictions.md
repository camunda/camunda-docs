---
id: user-task-access-restrictions
title: "User task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

User task access restrictions allow you to ensure that only assigned or candidate [users](components/console/manage-organization/manage-users.md) and [groups](components/console/manage-organization/manage-user-groups.md) can access user tasks in [Tasklist](./introduction-to-tasklist.md). These restrictions are based on the candidate users and groups defined in a BPMN diagram.

:::caution Tasklist V1 only
User task access restrictions are only supported with the Tasklist V1 API and are currently not supported in V2.

For Tasklist V2, use [authorization-based access control](../concepts/access-control/authorizations.md) to manage user permissions and control access to tasks.

For more information about the differences between V1 and V2, see [Tasklist API versions](api-versions.md).
:::

If a user task has no access restrictions in the BPMN process definition, all users can see the task in Tasklist. If the task has access restrictions, a user can only see the task if they meet one of the following criteria:

- Be the **Assignee**.
- Be listed as a **Candidate user**.
- Belong to a **Candidate group**.

### Example use case

If a task has a candidate group named `Team A` and a candidate user named `example`, only the
users that belong to `Team A` and the user `example` will have access to the task.

### Enable/disable user task access restrictions

:::note
User task access restrictions are enabled by default on SaaS. For details on user task access restrictions in Self-Managed, visit the [Self-Managed documentation](../../self-managed/components/orchestration-cluster/tasklist/user-task-access-restrictions.md).
:::

You can enable/disable user task access restrictions from the [cluster settings in Console](components/console/manage-clusters/settings.md#enforce-user-task-restrictions).

When activated, tasks assigned to users or candidate groups are only visible to the assigned user or respective group members. When deactivated, every user can see any task, regardless of the assignment.

This configuration does not affect OIDC API clients. When retrieving tasks using such a client, all tasks are returned.
