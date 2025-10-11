---
id: manage-user-groups
title: "Manage user groups"
sidebar_label: "Manage user groups"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

User groups are a way to organize users within your organization.

## Creating a group

To create a group, navigate to the **Organization** section of Console and click on the **Groups** tab.

![Groups Management](./img/group-management.png)

Click **Create a group** and enter the name of the group.

![Create a group](./img/create-group.png)

## Adding users to a group

To add users to a group, navigate to the **Organization** section of Console and click **Users > Assign members**.

![Groups Members](./img/group-members.png)

Select the user you want to add to a group and click **Assign**.

![Assign a Member](./img/assign-member.png)

## User task access restrictions

:::info
User task access restrictions are only supported with the Tasklist v1 API. For more information, see the documentation on [Tasklist API versions](components/tasklist/api-versions.md#user-task-access-restrictions-and-the-tasklist-api).
:::

You can use user groups to manage access to user tasks in Tasklist via [user task access restrictions](components/tasklist/user-task-access-restrictions.md).

For example, if a task has a candidate group named `Team A` and a candidate user named `example`, only the users that belong to `Team A` and the user `example` will have access to the task.
