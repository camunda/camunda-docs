---
title: Manage users and roles
description: "Learn about the users, roles, and permissions in your organization."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda Hub controls access to the workspaces, projects, and clusters of your organization through users and roles. Organization admins assign roles and manage users to decide who can use these resources.

## Users

Users access Camunda Hub with an organization-level role, and organization admins decide which users can see and change the workspaces, projects, environments, and clusters of the organization. Where you manage users depends on your deployment:

<Tabs groupId="permissions" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

You invite and manage users and groups in Camunda Hub, on the **Organization > Manage organization** page. The Organization Owner has all rights in the organization.

- [Create and manage users](/components/saas/organization/create-manage-users.md)
- [Manage user groups](/components/saas/organization/manage-user-groups.md)
- [Manage resource-based authorizations](/components/saas/organization/resource-based-auth.md) (legacy, for clusters before version 8.8)
- [Organization ownership](/components/saas/organization/organization-ownership.md)

</TabItem>

<TabItem value='self-managed'>

You create users in your identity provider, and manage users, groups, and roles in Management Identity.

- [Management Identity user, group, and role management](/self-managed/components/management-identity/application-user-group-role-management/identity-application-user-group-role-management-overview.md)
- [Manage groups](/self-managed/components/management-identity/application-user-group-role-management/manage-groups.md)
- [Manage roles](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md)

</TabItem>

</Tabs>

The following sections describe the roles and permissions of users in your organization.

### Roles and permissions

Every user holds one organization-level role. Organization Owner, Organization Admin, Analyst, and Member form a ladder, where each role includes everything the role below it can do. **DevOps** is a specialized role for infrastructure management that sits outside this ladder.

| Role               | Organization | Workspaces and projects | Clusters | Environments  | Catalog   | Optimize and business value |
| :----------------- | :----------- | :---------------------- | :------- | :------------ | :-------- | :-------------------------- |
| Organization Owner | Full access  | Manage                  | Manage   | Manage        | Manage    | Yes                         |
| Organization Admin | Manage       | Manage                  | Manage   | Manage        | Manage    | Yes                         |
| DevOps             | None         | Create and collaborate  | Manage   | Read-only     | Read-only | No                          |
| Analyst            | Read-only    | Create and collaborate  | None     | Assigned only | Manage    | Yes                         |
| Member             | Read-only    | Create and collaborate  | None     | Assigned only | Read-only | No                          |

- **Organization Owner**: All rights in the organization, including settings, billing, and ownership transfer. Reserved for a single user per organization; transferred rather than assigned or removed like other roles.
- **Organization Admin**: Manages the organization, its members, and its workspaces, with full access to every workspace and project by default. No separate mode needs to be enabled.
- **Analyst**: Includes everything a Member can do, plus full access to Optimize to build process dashboards and reports. Access to specific dashboards and reports within Optimize is governed separately by [Optimize collection roles](/components/optimize/userguide/user-permissions.md).
- **Member**: Full access to create and collaborate on workspaces and projects, plus read-only visibility into the organization.
- **DevOps**: A specialized role for infrastructure management, not people management. Grants cluster create and update, cluster clients, connector secrets, IP allowlisting, secure connectivity, encryption, and the connector-management view, plus Member-level modeling. Cannot manage or view organization members, billing, or organization settings.

Catalog access has two levels: **Read-only** (browse and use catalog items) for Member and DevOps, and **Manage** (also see usage statistics and adoption data) for Analyst, Organization Admin, and Organization Owner.

Environment access has three levels: **Manage** (view all environments and assign them to workspaces) for Organization Owner and Organization Admin, **Read-only** (view all environments, but can't assign them) for DevOps, and **Assigned only** for Analyst and Member. Users with the **Assigned only** level see the environments assigned to the workspaces where they are an editor or a workspace admin.

Business value access includes viewing the [business value dashboard](/components/hub/organization/analyze-operations/business-value-dashboard.md) and setting targets. The same roles that grant access to Optimize also grant access to business value.

Starting with version 8.8, user access to clusters' Operate, Tasklist, and Zeebe applications is managed independently of the organization role. To control what a user can access there, define their authorizations in the cluster's [Admin](/components/admin/authorization.md).

If cluster authorizations are disabled, the user will have full access to the cluster and its components.

### Elevated workspace access

Organization admins and owners always have **Workspace Admin** access to every workspace in the organization, including workspaces they aren't explicitly a member of. This access is on by default and can't be changed.

The main purpose of this access is to assign members to workspaces that have no members. Ordinarily, these workspaces would not be accessible or visible to any other users.

<Tabs groupId="permissions" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

The user must be assigned the organization **Organization Owner** or **Organization Admin** role.

</TabItem>

<TabItem value='self-managed'>

The user must be assigned the **Hub Admin** role.

If the role is not pre-existing, it can be created with the following permissions:

- Hub Internal API - `write:*`
- Hub Internal API - `admin:*`
- Camunda Identity Resource Server - `read:users`

Refer to the documentation pages about [assigning roles](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md) and [adding permissions](/self-managed/components/management-identity/access-management/access-management-overview.md) for detailed instructions.

</TabItem>

</Tabs>

#### Other roles

Beyond the roles above, an organization may show a few additional roles depending on its history:

- **Developer** _(deprecated)_: No longer offered for new assignment. Existing holders keep their current permissions unchanged; they are not automatically moved to another role.
- **Task user** and **Visitor** _(legacy)_: Available only for organizations with at least one cluster on version 8.7 or older, alongside a user's organization-level role. They govern access to the older cluster apps and disappear once no such clusters remain.
- **Support agent** _(internal)_: Used only by the Camunda support team. Not assignable by customers.

Users are invited to a Camunda 8 organization via their email address, which must be accepted by the user. The user remains in the `Pending` state until the invitation is accepted.

People who do not yet have a Camunda 8 account can also be invited to an organization. To access the organization, the invited individual must first create a Camunda 8 account by following the instructions in the invitation email.

## User task access restrictions

:::note
User task access restrictions were removed in Camunda 8.10 together with Tasklist V1.

Use [authorization-based access control](../../concepts/access-control/authorizations.md) and [user task authorization](/components/tasklist/user-task-authorization.md) to control user access to tasks in the current version.
:::
