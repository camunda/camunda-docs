---
id: user-task-access-restrictions
title: "User task access restrictions (Tasklist V1 only)"
sidebar_label: "User task access restrictions (V1)"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

User task access restrictions are the legacy task visibility model used by Tasklist V1. They ensure that only assigned or candidate [users](components/hub/organization/manage-members/manage-users.md) and [groups](components/hub/organization/manage-members/manage-user-groups.md) can access user tasks in [Tasklist](./introduction-to-tasklist.md).

These restrictions are based on the `candidateUsers` and `candidateGroups` defined in the BPMN process.

:::caution Tasklist V1 only
User task access restrictions are supported only by the Tasklist V1 API and aren't supported in Tasklist V2. From Camunda 8.8, Tasklist runs in V2 mode by default.

To continue using user task access restrictions, see [switching between V1 and V2 modes](components/tasklist/api-versions.md#switching-between-v1-and-v2-modes) to enable Tasklist V1 mode.

In Tasklist V2, task visibility is controlled using authorization-based access control. See [user task authorization](./user-task-authorization.md).
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
[cluster settings in Camunda Hub](components/hub/organization/manage-clusters/settings.md#enforce-user-task-restrictions).

When activated, tasks are visible only to:

- The assigned user.
- Users listed as candidate users.
- Members of the respective candidate groups.

When deactivated, every user can see any task in Tasklist V1, regardless of the assignment.

This configuration doesn't affect OIDC API clients that call the Tasklist V1 REST API. When you retrieve tasks using such a client, all tasks are returned. It also doesn't affect Tasklist V2 or the Orchestration Cluster REST API, which always rely on authorization-based access control for task visibility.
