---
id: user-restrictions
title: "User restrictions"
sidebar_label: "User task access restrictions"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

:::caution
User restrictions are enabled by default and can be disabled using environment variables. This feature should be enabled in the required component, see [Identity feature flags](../../../../self-managed/identity/deployment/configuration-variables/#feature-flags).
:::

User restrictions allow you to control the level of access a [user](/self-managed/identity/user-guide/roles/add-assign-role.md) or
[group](self-managed/identity/user-guide/groups/create-group.md) has to perform tasks where they are candidates in the system.

### User restrictions

[User restrictions](self-managed/tasklist-deployment/tasklist-authentication.md/#user-restrictions) are used in Tasklist to control task access for a
[user](/self-managed/identity/user-guide/roles/add-assign-role.md) or [role](/self-managed/identity/user-guide/roles/add-assign-role.md). The restrictions are
related to the candidate users or groups set up on the task definition.
