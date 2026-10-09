---
title: Manage users and roles
description: "Learn about the users, roles, and permissions in your organization, and how access to workspaces, clusters, environments, the catalog, and runtime environments is controlled."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda Hub controls access to the workspaces, projects, environments, and clusters of your organization through users and roles. Organization admins assign roles and manage users to decide who can use these resources.

Access is controlled on three levels:

- **Organization**: Users are assigned organization-level roles. They decide what a user can do in Camunda Hub across the organization. See [roles and permissions](#roles-and-permissions) and [access to resources](#access-to-resources).
- **Workspace**: Within a workspace, the role of a user decides what they can do with its projects and files. See [workspace roles](./manage-workspaces/manage-workspace-members.md#workspace-roles).
- **Runtime environments**: Access to the runtime of an environment, such as Operate, Tasklist, Admin, and Zeebe, is managed separately, with authorizations in Admin, not by organization-level roles. See [access to runtime environments](#access-to-runtime-environments).

## Manage users

Where and how you manage users depends on the edition of Camunda that you use.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

You invite and manage users and groups in Camunda Hub, on the **Organization > Manage organization** page. The Organization Owner has all rights in the organization.

- [Create and manage users](/components/saas/organization/create-manage-users.md)
- [Manage user groups](/components/saas/organization/manage-user-groups.md)
- [Organization ownership](/components/saas/organization/organization-ownership.md)

Users are invited to a Camunda 8 organization via their email address, which must be accepted by the user. The user remains in the `Pending` state until the invitation is accepted.

People who do not yet have a Camunda 8 account can also be invited to an organization. To access the organization, the invited individual must first create a Camunda 8 account by following the instructions in the invitation email.

</TabItem>

<TabItem value='self-managed'>

You create users in your identity provider, and manage users, groups, and roles in Management Identity.

- [Management Identity user, group, and role management](/self-managed/components/management-identity/application-user-group-role-management/identity-application-user-group-role-management-overview.md)
- [Manage groups](/self-managed/components/management-identity/application-user-group-role-management/manage-groups.md)
- [Manage roles](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md)

</TabItem>

</Tabs>

## Roles and permissions

Users are assigned organization-level roles. The following table shows what each role can do.

| Role                           | Organization | Workspaces and projects | Clusters | Environments  | Catalog   | Optimize and business value |
| :----------------------------- | :----------- | :---------------------- | :------- | :------------ | :-------- | :-------------------------- |
| Organization Owner (SaaS only) | Full access  | Manage                  | Manage   | Manage        | Manage    | Yes                         |
| Organization Admin             | Manage       | Manage                  | Manage   | Manage        | Manage    | Yes                         |
| DevOps                         | None         | Create and collaborate  | Manage   | Manage        | Read-only | No                          |
| Analyst                        | Read-only    | Create and collaborate  | None     | Assigned only | Manage    | Yes                         |
| Member                         | Read-only    | Create and collaborate  | None     | Assigned only | Read-only | No                          |

- **Organization Owner** (SaaS only): All rights in the organization, including settings, billing, and ownership transfer. Reserved for a single user per organization; transferred rather than assigned or removed like other roles.
- **Organization Admin**: Manages the organization, its members, and its workspaces, with full access to every workspace and project by default. No separate mode needs to be enabled.
- **DevOps**: A specialized role for infrastructure management, not people management. Grants cluster create and update, cluster clients, connector secrets, IP allowlisting, secure connectivity, encryption, and the connector-management view, plus Member-level modeling. Cannot manage or view organization members, billing, or organization settings.
- **Analyst**: Includes everything a Member can do, plus full access to Optimize to build process dashboards and reports. Access to specific dashboards and reports within Optimize is governed separately by [Optimize collection roles](/components/optimize/userguide/user-permissions.md).
- **Member**: Full access to create and collaborate on workspaces and projects, plus read-only visibility into the organization.

### Additional roles

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

Beyond the roles above, an organization may show a few legacy roles depending on its history. They aren't recommended with Camunda Hub:

- **Developer** _(deprecated)_: No longer offered for new assignment. Existing holders keep their current permissions unchanged; they are not automatically moved to another role.
- **Task user** and **Visitor** _(legacy)_: Available only for organizations with at least one cluster on version 8.7 or older, alongside a user's organization-level roles. They govern access to the older cluster apps and disappear once no such clusters remain.

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, you assign roles in Management Identity. The default roles **DevOps**, **Hub**, and **Hub Admin** were previously known as **Console**, **Web Modeler**, and **Web Modeler Admin**. The earlier roles still exist, grant the same permissions, and are kept for backward compatibility. See [default roles](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#default-roles).

</TabItem>

</Tabs>

## Access to resources

The organization-level roles of a user set the level of access to each of the following resources. The table above lists the level for each role. This section describes what each level means.

| Resource                    | Levels                               | Described in                                                  |
| :-------------------------- | :----------------------------------- | :------------------------------------------------------------ |
| Organization                | Full access, Manage, Read-only, None | [Roles and permissions](#roles-and-permissions)               |
| Workspaces and projects     | Manage, Create and collaborate       | [Workspace and project access](#workspace-and-project-access) |
| Clusters                    | Manage, None                         | [Cluster access](#cluster-access)                             |
| Environments                | Manage, Assigned only                | [Environment access](#environment-access)                     |
| Catalog                     | Manage, Read-only                    | [Catalog access](#catalog-access)                             |
| Optimize and business value | Yes, No                              | [Business value access](#business-value-access)               |

### Workspace and project access

- **Manage**: Full access to every workspace and project in the organization. Organization Owner and Organization Admin have this level. See [elevated workspace access](#elevated-workspace-access).
- **Create and collaborate**: Create and collaborate on workspaces and projects. DevOps, Analyst, and Member have this level. What a user can do inside a workspace also depends on their [workspace role](./manage-workspaces/manage-workspace-members.md#workspace-roles).

### Cluster access

- **Manage**: Create and update clusters, and manage cluster clients, connector secrets, IP allowlists, secure connectivity, and encryption. Organization Owner, Organization Admin, and DevOps have this level.
- **None**: No access to the cluster pages. Analyst and Member have this level.

### Environment access

- **Manage**: View all environments and resume paused ones. Organization Owner, Organization Admin, and DevOps have this level. Only Organization Owner and Organization Admin can assign environments to workspaces.
- **Assigned only**: See only the environments assigned to the workspaces where the user is an editor or a workspace admin. Analyst and Member have this level.

### Catalog access

- **Manage**: Browse and use catalog items, and also see usage statistics and adoption data. Analyst, Organization Admin, and Organization Owner have this level.
- **Read-only**: Browse and use catalog items. Member and DevOps have this level.

### Business value access

Access to Optimize includes access to the [business value dashboard](/components/hub/organization/analyze-operations/business-value-dashboard.md), where users view metrics and set targets. The same roles that grant access to Optimize also grant access to business value: Analyst, Organization Admin, and Organization Owner.

### Elevated workspace access

Organization admins and owners always have **Workspace Admin** access to every workspace in the organization, including workspaces they aren't explicitly a member of. This access is on by default and can't be changed.

The main purpose of this access is to assign members to workspaces that have no members. Ordinarily, these workspaces would not be accessible or visible to any other users.

<Tabs groupId="edition" defaultValue="saas" queryString values={
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

## Access to runtime environments

Organization-level roles control what a user can do in Camunda Hub. They don't control what the user can do in the runtime of an environment, which includes Operate, Tasklist, Admin, and Zeebe. Starting with version 8.8, access to the runtime is managed independently of the organization role. To control what a user can access there, define their authorizations in [Admin](/components/admin/authorization.md).

If authorizations are disabled in the runtime, the user has full access to the runtime and its components.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

For clusters before version 8.8, access is controlled with resource-based authorizations and the legacy **Task user** and **Visitor** roles. See [manage resource-based authorizations](/components/saas/organization/resource-based-auth.md).

</TabItem>

<TabItem value='self-managed'>

Authorizations for the runtime applications (Zeebe, Operate, and Tasklist) are managed as part of the Orchestration Cluster and configured in Admin. See the [Admin overview](/self-managed/components/orchestration-cluster/admin/overview.md).

</TabItem>

</Tabs>

### User task access restrictions

:::note
User task access restrictions were removed in Camunda 8.10 together with Tasklist V1.

Use [authorization-based access control](../../concepts/access-control/authorizations.md) and [user task authorization](/components/tasklist/user-task-authorization.md) to control user access to tasks in the current version.
:::
