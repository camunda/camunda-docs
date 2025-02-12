---
id: user-task-access-restrictions
title: "User task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

:::caution
User task access restrictions are enabled by default and can be disabled using environment variables. This feature is controlled in the required component, see [Identity feature flags](../../../../self-managed/identity/deployment/configuration-variables/#feature-flags).
This configuration does not affect API users. When retrieving tasks using the APIs, all tasks are returned.
:::

User task access restrictions allow you to control the level of access a [user](/self-managed/identity/user-guide/roles/add-assign-role.md) or
[group](self-managed/identity/user-guide/groups/create-group.md) has to perform BPMN user tasks where they are candidates.

### User task access restrictions

[User task access restrictions](self-managed/tasklist-deployment/tasklist-authentication.md#user-restrictions) are used in Tasklist to control task access for a
user or [group](/self-managed/identity/user-guide/groups/create-group.md). The restrictions are
related to the candidate users or groups set up on user task definitions.

For example, if a task has a candidate group named `Team A` and a candidate user named `example`, only the
users that belong to `Team A` and the user `example` will have access to the task.
