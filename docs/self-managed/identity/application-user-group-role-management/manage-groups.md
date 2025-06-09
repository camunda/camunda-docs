---
id: manage-groups
title: "Groups"
description: "Groups are a way to apply a set of roles and permissions to users. Use Identity to create a group."
---

Use groups and roles to manage and organize user access in Camunda 8.

## About groups

Organize your users into groups as an efficient and scalable way of controlling access in Camunda 8.

- Instead of assigning roles to individual users, [map a set of roles to a group](#assign-roles-to-a-group).
- All group members automatically inherit the role permissions of a group.

:::note
You do not create or manage users in Identity itself. Users are managed in Keycloak or your connected IdP.
:::

## Manage groups

### Create a group

1. Navigate to the **Groups** tab.

2. Click the **Create group** button located on the top right of the table and a modal will open.

3. Enter the group name and click **Create group**.

On confirmation, the modal closes, the table updates, and your new group is shown.

### Modify or delete a group

1. Navigate to the **Groups** tab.

2. Use the pencil icon to edit the group or the trash icon to remove a group.

## Manage group users

### Assign users to a group

1. Navigate to the **Groups** tab. Select the group you want to assign a member to from the table.

2. Click **Assign members** and a modal will open.

3. Search and select the member to assign to the group. After selecting the member, click **Assign**.

On confirmation, the modal closes, the table updates, and your assigned members are shown.

### Remove a user from a group

1. Navigate to the **Groups** tab.

2. Click the trash icon next to the member you want to remove from the group.

On confirmation, the modal closes, the table updates, and your member is removed from the group.

## Manage group roles

### Assign roles to a group

1. Navigate to the **Groups** tab. Select the group you want to assign a role to from the table, and click on the **Roles** tab.

2. Click **Assign roles** and a modal will open.

3. Select the roles to assign to the group. When you have selected the roles, click **Add**.

On confirmation, the modal closes, the table updates, and your assigned roles are shown.

### Remove a role from a group

1. Navigate to the **Groups** tab. Select the group.

2. Navigate to the **Roles** tab.

3. Click the trash icon next to the user you want to remove from the group.

On confirmation, the modal closes, the table updates, and your role is removed from the group.
