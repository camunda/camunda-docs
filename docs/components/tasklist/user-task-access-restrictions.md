---
id: user-task-access-restrictions
title: "User task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

User task access restrictions allow you to ensure that only assigned or candidate [users](components/console/manage-organization/manage-users.md) and [groups](components/console/manage-organization/manage-user-groups.md) can access user tasks in [Tasklist](./introduction-to-tasklist.md) when using Tasklist V1. These restrictions are based on the candidate users and groups defined in a BPMN diagram.

:::caution Tasklist V1 only
User task access restrictions are supported only by the Tasklist V1 API and are not supported in Tasklist V2. From Camunda 8.8, Tasklist runs in V2 mode by default.

To continue using user task access restrictions, see
[switching between V1 and V2 modes](components/tasklist/api-versions.md#switching-between-v1-and-v2-modes)
to enable Tasklist V1 mode.

In Tasklist V2, task visibility is controlled by authorization-based access control rather than user task access restrictions. Starting with Camunda 8.9, Tasklist V2 supports:

- Process-level permissions such as `READ_USER_TASK` and `UPDATE_USER_TASK` on the `Process Definition` resource, which allow managers to see and act on all user tasks for a process.

- Task-level permissions on the `USER_TASK` resource type, including `READ`, `UPDATE`, `CLAIM`, and `COMPLETE`.

- Property-based access control using the `assignee`, `candidateUsers`, and `candidateGroups` task properties, so task workers can only see or work on tasks where they are involved.

For more information about the differences between V1 and V2 and how authorizations work, see [Tasklist API versions](components/tasklist/api-versions.md) and
[authorization-based access control](../concepts/access-control/authorizations.md).
:::

For a user to see a task in Tasklist V1, they must meet one of the following criteria in the BPMN process definition:

- Be the **Assignee**.
- Be listed as a **Candidate user**.
- Belong to a **Candidate group**.

### Example use case

In Tasklist V1, if a task has a candidate group named `Team A` and a candidate user named `example`, only users that belong to `Team A` and the user `example` will have access to the task.

### Enable/disable user task access restrictions (Tasklist V1)

:::note
User task access restrictions are enabled by default on SaaS clusters that run Tasklist in V1 mode. For details on user task access restrictions in Self-Managed, visit the [Self-Managed documentation](../../self-managed/components/orchestration-cluster/tasklist/user-task-access-restrictions.md).
:::

You can enable or disable user task access restrictions for Tasklist V1 from the
[cluster settings in Console](components/console/manage-clusters/settings.md#enforce-user-task-restrictions).

When activated, tasks are only visible to:

- the assigned user,
- users listed as candidate users, or
- members of the respective candidate groups.

When deactivated, every user can see any task in Tasklist V1, regardless of the assignment.

This configuration does not affect OIDC API clients that call the Tasklist V1 REST API. When you retrieve tasks using such a client, all tasks are returned. It also does not affect Tasklist V2 or the Orchestration Cluster REST API, which always rely on authorization-based access control for task visibility.
