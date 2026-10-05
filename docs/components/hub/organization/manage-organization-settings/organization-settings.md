---
id: organization-settings
title: Manage organization
description: "An organization is the top-level entity in Camunda Hub. Learn how to manage your organization, its users, and its settings in SaaS and Self-Managed."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

An organization is the top-level entity in Camunda Hub. It holds your [workspaces](/components/concepts/workspaces.md), [environments](/components/concepts/environments.md), [clusters](/components/concepts/clusters.md), and users. How you manage an organization depends on your deployment.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

## Access organization settings

In the left navigation, click **Organization > Manage organization**.

The **Overview** tab provides a summary of the organization, including the organization name and the pricing plan.

In other tabs, you can:

- Manage users
- Manage groups
- View activity
- View usage
- Grant API access credentials
- Manage organization settings

### Manage organization settings

Under the **Settings** tab, you can:

- Leave the organization
- [Enable alpha features](/components/saas/organization/enable-alpha-features.md)

If you are the owner of the organization, you can change the organization name.

## Manage your organization in SaaS

The following pages describe how to manage your SaaS organization:

| Task                                        | Where to find it                                                                          |
| :------------------------------------------ | :---------------------------------------------------------------------------------------- |
| Add and manage users, groups, and roles     | [Manage users and roles](../users-and-roles.md)                                           |
| View user and cluster activity              | [View organization activity](/components/saas/organization/view-organization-activity.md) |
| Monitor your usage                          | [View usage history](/components/saas/organization/usage-history.md)                      |
| Get notified when usage reaches a threshold | [View usage alerts](/components/saas/organization/usage-alerts.md)                        |
| Opt in to alpha features                    | [Enable alpha features](/components/saas/organization/enable-alpha-features.md)           |
| Sign in with your own identity provider     | [Connect to an identity provider](/components/saas/organization/external-sso.md)          |
| Work in more than one organization          | [Switch organization](/components/saas/organization/switch-organization.md)               |
| Manage your plan, billing, and reservations | [Create an account](/components/saas/organization/manage-plan/create-account.md)          |

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, you manage the users, groups, and roles of your organization in your identity provider and in Management Identity. See [manage users and roles](../users-and-roles.md).

</TabItem>

</Tabs>

## Next steps

- [Manage users and roles](../users-and-roles.md)
- [Manage workspaces](../manage-workspaces/index.md)
