---
id: organization-settings
title: Manage organization
description: "An organization is the top-level entity in Camunda Hub. Learn how to manage your organization, its users, and its settings in SaaS and Self-Managed."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

An organization is the top-level entity in Camunda Hub. It holds your [workspaces](/components/concepts/workspaces.md), [environments](/components/concepts/environments.md), [clusters](/components/concepts/clusters.md), and users.

## What you manage in an organization

- [Users and roles](../users-and-roles.md): Decide who can use Camunda Hub and what they can do.
- [Workspaces](../manage-workspaces/index.md): Create workspaces and manage their members.
- [Environments](../manage-environments/index.md): See the environments of your organization and assign them to workspaces.
- [Clusters](../manage-clusters/index.md): Create, monitor, and maintain the clusters that host your environments.
- [Credentials](../credentials/index.md): Create reusable credentials for connectors and other element templates.
- [Catalog](../manage-catalog/index.md): Manage reusable automation assets and publish them to Camunda Hub.

## Organization settings

How you manage the settings of an organization depends on the edition of Camunda that you use.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

In the left navigation, click **Organization > Manage organization**.

The **Overview** tab provides a summary of the organization, including the organization name and the pricing plan.

In other tabs, you can:

- Manage users
- Manage groups
- View activity
- View usage
- Grant API access credentials
- Manage organization settings

Under the **Settings** tab, you can:

- Leave the organization
- [Enable alpha features](/components/saas/organization/enable-alpha-features.md)

If you are the owner of the organization, you can change the organization name.

For all tasks that are specific to SaaS organizations, such as ownership, usage, plans, and billing, see [Organization in SaaS](/components/saas/organization/index.md).

</TabItem>

<TabItem value='self-managed'>

Self-Managed has no organization settings page. You manage the users, groups, and roles of your organization in your identity provider and in Management Identity. See [manage users and roles](../users-and-roles.md).

</TabItem>

</Tabs>
