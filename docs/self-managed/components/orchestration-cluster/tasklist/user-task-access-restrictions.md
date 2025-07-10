---
id: user-task-access-restrictions
title: "User task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

:::caution
User task access restrictions are enabled by default and can be disabled using the [`userAccessRestrictionsEnabled` Tasklist environment variable](/self-managed/components/tasklist/tasklist-authentication.md?authentication=identity#configure-identity).
This configuration does not affect API users. When retrieving tasks using the APIs, all tasks are returned.
:::

User task access restrictions are used in Tasklist to control task access for a
user or a [group](/self-managed/components/management-identity/application-user-group-role-management/manage-groups.md). The currently logged-in user needs to be either in the `Assignee` field, in the `Candidate users` field, or a member of the `Candidate groups` as defined in the BPMN definition to see the task in the Tasklist.

For example, if a task has a candidate group named `Team A` and a candidate user named `example`, only the users that belong to `Team A` and the user `example` will have access to the task.

See [Tasklist authentication documentation on **user task access restrictions**](self-managed/tasklist-deployment/tasklist-authentication.md#user-task-access-restrictions) for a more detailled description.
