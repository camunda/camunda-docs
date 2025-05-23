---
id: manage-roles
title: Manage roles
sidebar_label: "Manage roles"
description: "Use Identity to manage roles"
---

Use roles to simplify and standardize access control across your system, help enforce consistent permission sets, reduce errors, and scale access management as your organization grows.

## About roles

- Roles define the actions a user or application can perform in Camunda 8 by grouping together a set of related [permissions](../access-management/manage-permissions.md).
- You can assign roles [directly to a user](#assign-a-role-to-a-user) or [using groups](../application-user-group-role-management/manage-groups.md#assign-roles-to-a-group).

## Add a role

To add a role, take the following steps:

1. Navigate to the **Roles** tab.

2. Click the **Add role** button located on the top right of the table and a modal will open to enter the name and description.

On confirmation, the modal will close, the table will update, and the new role will be shown.

## Delete a role

Roles can be deleted in two ways: through the trash button in the table view, or in the overflow menu once the role is selected.

1. Navigate to the **Roles** tab.

2. Search for a role by clicking the magnifying glass next to **Add role**.

3. Click the trash button next to the role or click the role, click the overflow menu, then **Delete**.

On confirmation, the modal will close, the table will update, and the role will be removed.

## Assign a role to a user

To assign a role to a user, take the following steps:

1. Navigate to the **Users** tab.

2. Click on the user you want to assign a role to to view their details.

3. Click on **Assigned roles** to view the roles currently assigned to the user.

4. Click the **Assign roles** button located on the top right of the table and a modal will open.

5. Select the role you want to assign to the user and click **Add**.

On confirmation, the modal will close, the table will update, and the newly assigned role will be shown for the user.

## Delete an assigned role from a user

To delete an assigned role from a user, take the following steps:

1. Navigate to the **Users** tab.

2. Click on the user you want to remove a role from to view their details.

3. Click on **Assigned roles** to view the roles currently assigned to the user.

4. Click the trash icon next to the role.

On confirmation, the modal will close, the table will update, and the role will be removed from the user.
