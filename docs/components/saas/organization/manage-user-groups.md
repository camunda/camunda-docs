---
id: manage-user-groups
title: "Manage user groups"
sidebar_label: "Manage user groups"
description: "Organize users into groups in Camunda Hub."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

User groups created in Camunda Hub are available in SaaS only. They apply only to access control for clusters on version 8.7 or earlier, and don't control access to Camunda Hub, such as workspaces, projects, or organization settings. For clusters on version 8.8 or later, manage [groups](/components/admin/group.md) and authorizations in Admin. Groups created in Console are no longer recommended for use.

## Creating a group

To create a group in Camunda Hub:

1. In the left navigation, click **Organization > Manage organization**.
1. On the **Groups** tab, select **Create group**.

## Adding users to a group

1. In the left navigation, click **Organization > Manage organization**.
1. On the **Groups** tab, select a group.
1. Click **Assign members**.

## User task access restrictions

:::info
User task access restrictions were removed in Camunda 8.10 together with Tasklist V1. Use [user task authorization](/components/tasklist/user-task-authorization.md) and [authorization-based access control](/components/concepts/access-control/authorizations.md) for current task visibility rules.
:::
