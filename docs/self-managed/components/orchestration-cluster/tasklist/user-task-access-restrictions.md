---
id: user-task-access-restrictions
title: "Configure user task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

:::caution Tasklist V1 only
User task access restrictions are only supported with the Tasklist V1 API and are not supported
in Tasklist V2. From Camunda 8.8, Tasklist runs in V2 mode by default.

To continue using user task access restrictions, see
[switching between V1 and V2 modes](components/tasklist/api-versions.md#switching-between-v1-and-v2-modes)
to enable Tasklist V1 mode.

Tasklist V2 does not support task-level visibility restrictions.
[Authorization-based access control](components/concepts/access-control/authorizations.md)
in V2 applies only at the process-definition level and does not limit access to individual tasks.

For more information about the differences between V1 and V2, see
[Tasklist API versions](components/tasklist/api-versions.md).
:::

[User task access restrictions](components/tasklist/user-task-access-restrictions.md) are used in
Tasklist V1 to control task access for a user or a group.

They are enabled by default and can be disabled using the `userAccessRestrictionsEnabled` [Tasklist environment variable](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md).
This configuration does not affect API users. When you retrieve tasks using the APIs, the APIs return all tasks.

See [Tasklist authentication documentation](/versioned_docs/version-8.7/self-managed/tasklist-deployment/tasklist-authentication.md) on user task access restrictions for configuration details.
