---
id: assign-users-roles-to-group
title: "Assign users and roles to a group"
description: "Groups are a way to apply a set of roles and authorizations to users. Use Identity to assign users and roles to a group."
---

In this guide we will show you how to use Identity to assign users and roles to a group.

:::tip Want to learn more about groups?
Head over to our documentation on [groups](/self-managed/identity/user-guide/groups/create-group.md) to learn more.
:::

## Assign users to a group

:::caution Write access needed
To assign a user to a group, you must have write access to Identity.
Read our [guide on managing user access](/self-managed/identity/user-guide/authorizations/managing-user-access.md) to learn more.
:::

1. Log in to the Identity UI and navigate to the **Groups** tab. Select the group you would like to assign a user to from the table:

![assign-user-to-group-tab](../img/assign-user-to-group-tab.png)

2. Click **Assign Members** and a modal will open.

3. Search and select the users to assign to the group. After selecting the users, click **Assign**.

On confirmation, the modal closes, the table updates, and your assigned members are shown:

![assign-user-to-group-refreshed-table](../img/assign-user-to-group-refreshed-table.png)

## Assign roles to a group

:::caution Write access needed
To assign a role to a group, you must have write access to Identity.
Read our [guide on managing user access](/self-managed/identity/user-guide/authorizations/managing-user-access.md) to learn more.
:::

1. Log in to the Identity UI and navigate to the **Groups** tab. Select the group you would like to assign a role to from the table, and click on the **Roles** tab:

![assign-role-to-group-tab](../img/assign-role-to-group-tab.png)

2. Click **Assign Role** and a modal will open.

3. Select the roles to assign to the group. When you have selected the roles, click **Add**.

On confirmation, the modal closes, the table updates, and your assigned roles are shown:

![assign-role-to-group-refreshed-table](../img/assign-role-to-group-refreshed-table.png)
