---
id: user-task-access-restrictions
title: "Configure user task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

:::info
User task access restrictions are only supported with the Tasklist v1 API. For more information, see the documentation on [Tasklist API versions](components/tasklist/api-versions.md).
:::

[User task access restrictions](components/tasklist/user-task-access-restrictions.md) are used in Tasklist to control task access for a user or a group.

They are enabled by default and can be disabled using the `userAccessRestrictionsEnabled` [Tasklist environment variable](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md).
This configuration does not affect API users. When retrieving tasks using the APIs, all tasks are returned.

See [Tasklist authentication documentation](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md) on **user task access restrictions** for configuration details.
