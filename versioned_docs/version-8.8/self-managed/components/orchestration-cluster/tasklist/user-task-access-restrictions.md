---
id: user-task-access-restrictions
title: "Configure user task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

:::caution Tasklist V1 only
User task access restrictions are only supported with the Tasklist V1 API and are currently not supported in V2. From Camunda 8.8, Tasklist runs on V2 by default.

To continue using user task access restrictions, see [Switching between V1 and V2 modes](components/tasklist/api-versions.md#switching-between-v1-and-v2-modes) to enable Tasklist V1 mode.

For Tasklist V2, use [authorization-based access control](components/concepts/access-control/authorizations.md) to manage user permissions and control access to tasks.

For more information about the differences between V1 and V2, see [Tasklist API versions](components/tasklist/api-versions.md).
:::

[User task access restrictions](components/tasklist/user-task-access-restrictions.md) are used in Tasklist to control task access for a user or a group.

They are enabled by default and can be disabled using the `userAccessRestrictionsEnabled` [Tasklist environment variable](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md).
This configuration does not affect API users. When retrieving tasks using the APIs, all tasks are returned.

See [Tasklist authentication documentation](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md) on **user task access restrictions** for configuration details.
