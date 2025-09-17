---
id: group
title: User groups
description: "Learn how to manage user group access to an orchestration cluster."
---

A user group is a way to organize multiple [users](user.md) in one unit. Groups simplify access management by allowing you to assign permissions to a collection of users at once, rather than individually. You can grant permissions to a group by assigning [roles](role.md) to it or creating direct [authorizations](authorization.md).

## Create a group

To create a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the **Create group** button, and provide the following group details:
   - **Group ID**: The unique identifier for the group.
   - **Name**: The name of the group.
   - **Description**: A description of the group.
3. Click on the **Create group** button.

The group is created and can now be assigned to roles or users.

![identity-create-group-tab](./img/create-group-tab.png)

## Update a group

To update a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the **pencil icon** next to the group you want to update.
3. Update the group details:
   - **Name**: The name of the group.
   - **Description**: A description of the group.
4. Click on the **Save** button.

The group details are updated.

## Delete a group

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the **Delete** button next to the group you want to delete.
3. Confirm the deletion by clicking on the **Delete** button in the confirmation dialog.

The group is deleted. Users and roles that were assigned to the group will not be affected, but they will no longer be part of the group. The authorizations that were granted to the group will also be removed.

## Assign authorizations to a group

See the [authorization](./authorization.md) section to learn how to create authorizations for groups.

## Manage users

### Assign users to a group

To assign users to a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to assign users to.
3. Click on the **Users** tab.
4. Click on the **Assign user** button.
5. Type the username of the user you want to assign to the group, and click on the **Assign user** button.

:::note
For Self-Managed deployments with basic authentication, you must search for existing users.
:::

The user is assigned to the group and inherits its permissions.

### Remove users from a group

To remove users from a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to remove users from.
3. Click on the **Users** tab.
4. Click on the **Remove** button next to the user you want to remove from the group.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The user is removed from the group and loses any permissions that were granted through the group.

## Manage roles

### Assign roles to a group

To assign roles to a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to assign roles to.
3. Click on the **Roles** tab.
4. Click on the **Assign role** button.
5. Search for the ID of the role you want to assign to the group, and click on the **Assign role** button.

The role is assigned to the group. Users in the group now have the permissions granted by that role.

### Remove roles from a group

To remove roles from a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to remove roles from.
3. Click on the **Roles** tab.
4. Click on the **Remove** button next to the role you want to remove from the group.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The role is removed from the group. Users in the group will lose the permissions that were granted through that role.

## Manage clients

:::note
In Self-Managed deployment, [client management](client.md) is only available for OIDC authentication.
:::

### Assign client to a group

To assign a client to a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to assign a client to.
3. Click on the **Clients** tab.
4. Click on the **Assign client** button.
5. Type the ID of the client you want to assign to the group, and click on the **Assign client** button.

The client is assigned to the group.

### Remove client from a group

To remove a client from a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to remove a client from.
3. Click on the **Clients** tab.
4. Click on the **Remove** button next to the client you want to remove from the group.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The client is removed from the group.

## Manage mapping rules

<span class="badge badge--platform">Self-Managed only</span>

:::note
[Mapping rules](../concepts/access-control/mapping-rules.md) are only available for OIDC authentication.
:::

### Assign mapping rules to a group

To assign a mapping rule to a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to assign mapping rules to.
3. Click on the **Mapping rules** tab.
4. Click on the **Assign mapping rule** button.
5. Search for the ID of the mapping rule you want to assign to the group, and click on the **Assign mapping rule** button.

The mapping rule is assigned to the group.

### Remove mapping rules from a group

To remove a mapping rule from a group:

1. Log in to Identity in your cluster, and click on the **Groups** tab.
2. Click on the group you want to remove mapping rules from.
3. Click on the **Mapping rules** tab.
4. Click on the **Remove** button next to the mapping rule you want to remove from the group.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The mapping rule is removed from the group.
