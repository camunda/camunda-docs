---
id: role
title: Roles
description: "Learn how to manage roles in an orchestration cluster."
---

A role is a collection of [authorizations](authorization.md) that defines a set of permissions. Roles are used to grant users the system and data access they need to fulfill a certain responsibility. A role can be assigned to [users](user.md) directly or through a [group](group.md) they are a member of.

## Create a role

To create a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the **Create role** button, and provide the following role details:
   - **Role ID**: The unique identifier for the role.
   - **Name**: The name of the role.
   - **Description**: A description of the role.
3. Click on the **Create role** button.

The role is created and can now be assigned to users or groups.

![identity-create-role-tab](./img/create-role-tab.png)

## Update a role

To update a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the **pencil icon** next to the role you want to update.
3. Update the role details:
   - **Name**: The name of the role.
   - **Description**: A description of the role.
4. Click on the **Save** button.

The role details are updated.

## Delete a role

To delete a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the **Delete** button next to the role you want to delete.
3. Confirm the deletion by clicking on the **Delete** button in the confirmation dialog.

The role is deleted. The authorizations that were granted to the role will also be removed.

## Assign authorizations to a role

See the [authorization](./authorization.md) section to learn how to create authorizations for roles.

## Manage users

### Assign users to a role

To assign users to a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the role you want to assign users to.
3. Click on the **Users** tab.
4. Click on the **Assign user** button.
5. Type the username of the user you want to assign to the role, and click on the **Assign user** button.

:::note
For Self-Managed deployments with basic authentication, you must search for existing users.
:::

The user is assigned to the role and inherits its permissions.

### Remove users from a role

To remove users from a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the role you want to remove users from.
3. Click on the **Users** tab.
4. Click on the **Remove** button next to the user you want to remove from the role.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The user is removed from the role and loses any permissions that were granted through it.

## Manage clients

:::note
In Self-Managed deployment, [client management](client.md) is only available for OIDC authentication.
:::

### Assign client to a role

To assign a client to a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the role you want to assign a client to.
3. Click on the **Clients** tab.
4. Click on the **Assign client** button.
5. Type the ID of the client you want to assign to the role, and click on the **Assign client** button.

The client is assigned to the role.

### Remove client from a role

To remove a client from a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the role you want to remove a client from.
3. Click on the **Clients** tab.
4. Click on the **Remove** button next to the client you want to remove from the role.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The client is removed from the role.

## Manage mapping rules

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

:::note
[Mapping rules](/self-managed/concepts/mapping-rules.md) are only available for OIDC authentication.
:::

### Assign mapping rules to a role

To assign mapping rules to a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the role you want to assign mapping rules to.
3. Click on the **Mapping rules** tab.
4. Click on the **Assign mapping rule** button.
5. Search for the ID of the mapping rule you want to assign to the role, and click on the **Assign mapping rule** button.

The mapping rule is assigned to the role.

### Remove mapping rules from a role

To remove a mapping rule from a role:

1. Log in to Identity in your cluster, and click on the **Roles** tab.
2. Click on the role you want to remove mapping rules from.
3. Click on the **Mapping rules** tab.
4. Click on the **Remove** button next to the mapping rule you want to remove from the role.
5. Confirm the removal by clicking on the **Remove** button in the confirmation dialog.

The mapping rule is removed from the role.
