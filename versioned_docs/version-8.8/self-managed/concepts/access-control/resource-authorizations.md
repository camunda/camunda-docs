---
id: resource-authorizations
title: "Resource authorizations"
sidebar_label: "Resource authorizations"
description: "Resource authorizations allow you to control the level of access a user or group has to a particular resource in the system."
---

:::caution
Resource authorizations are disabled by default and can be enabled by the use of environment variables. This feature must be enabled in all required components, see:

- [Identity feature flags](../../../../self-managed/identity/deployment/configuration-variables/#feature-flags)
- [Operate resource based permissions](../../../../self-managed/operate-deployment/operate-authentication/?authentication=identity#resource-based-permissions)
- [Tasklist resource based permissions](../../../../self-managed/tasklist-deployment/tasklist-authentication/?authentication=identity#resource-based-permissions)

:::

Resource authorizations allow you to control the level of access a [user](/self-managed/identity/user-guide/roles/manage-roles.md) or
[group](self-managed/identity/user-guide/groups/manage-groups.md) has to a particular resource in the system.

### Permissions or resource authorizations

[Permissions](self-managed/identity/user-guide/roles/manage-permissions.md) are designed to control component access for a
[user](/self-managed/identity/user-guide/roles/manage-roles.md) or [role](/self-managed/identity/user-guide/roles/manage-roles.md). Resource
authorizations, as described above, relate to the resources which may be used within a given component, such as a process definition.
