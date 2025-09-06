---
id: user-task-access-restrictions
title: "Configure user task access restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

[User task access restrictions](components/tasklist/user-task-access-restrictions.md) are used in Tasklist to control task access for a user or a group.

They are enabled by default and can be disabled using the `userAccessRestrictionsEnabled` [Tasklist environment variable](/self-managed/components/orchestration-cluster/core-settings/concepts/authentication.md).
This configuration does not affect API users. When retrieving tasks using the APIs, all tasks are returned.

See [Tasklist authentication documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/authentication.md) on **user task access restrictions** for configuration details.
