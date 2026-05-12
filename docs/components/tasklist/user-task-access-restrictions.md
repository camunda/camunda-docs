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
title: "User task access restrictions were removed"

description: "User task access restrictions were removed with Tasklist V1 in Camunda 8.10."
[cluster settings in Camunda Hub](components/hub/organization/manage-clusters/settings.md#enforce-user-task-restrictions).

User task access restrictions were removed in Camunda 8.10 together with Tasklist V1.

- The assigned user.
  Use [user task authorization](./user-task-authorization.md) and [authorization-based access control](/components/concepts/access-control/authorizations.md) for current Tasklist access control.
- Members of the respective candidate groups.
  If you are migrating from an older installation, review [Tasklist API changes](./api-versions.md) to understand which legacy V1 features were removed.
