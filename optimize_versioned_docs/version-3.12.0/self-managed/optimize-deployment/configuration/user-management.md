---
id: user-management
title: "User access management"
description: "Define which users have access to Optimize."
---

<span class="badge badge--platform">Camunda 7 only</span>

:::note Good to know!

Providing Optimize access to a user just enables them to log in to Optimize. To be able
to create reports, the user also needs to have permission to access the engine data. To see
how this can be done, refer to the [Authorization Management](./authorization-management.md) section.
:::

You can use the credentials from the Camunda 7 users to access Optimize. However, for the users to gain access to Optimize, they need to be authorized. This is not done in Optimize itself, but needs to be configured in the Camunda 7 and can be achieved on different levels with different options. If you do not know how authorization in Camunda works, visit the [authorization service documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/).

When defining an authorization to grant Optimize access, the most important aspect is that you grant access on resource type application with resource ID "optimize" (or "\*" if you want to grant access to all applications including Optimize). The permissions you can set, are either `ALL` or `ACCESS`. They are treated equally, so there is no difference between them.

Authorizing users in admin can be done as follows:

![Grant Optimize Access in Admin](img/Admin-GrantAccessAuthorizations.png)

1. The first option allows access for Optimize on a global level. With this setting all users are allowed to log into Camunda Optimize.
2. The second option defines the access for a single user. The user `Kermit` can now log into Camunda Optimize.
3. The third option provides access on group level. All users belonging to the group `optimize-users` can log into Camunda Optimize.

It is also possible to revoke the Optimize authorization for specific users or groups. For instance, you can define Optimize on a global scale, but exclude the `engineers` group:

![Revoke Optimize Access for group 'engineers' in Admin](img/Admin-RevokeGroupAccess.png)

When Optimize is configured to load data from multiple instances of Camunda 7, then it suffices to be granted by one instance for the user to be able to log into Optimize. Notice that, like for all authorizations, grants have precedence over revokes. That is, if there is a Camunda 7 instance that grants access to optimize to a user, the user can log in even if another instance revokes access to Optimize for this user.
