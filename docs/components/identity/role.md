---
id: role
title: Roles
description: "Learn how to manage roles in an orchestration cluster."
---

import CreateRoleImg from './img/create-role-tab.png';

A role is a collection of [authorizations](authorization.md) that defines a set of permissions.

## About roles

Roles are used to grant users the system and data access required to fulfill a certain responsibility. A role can be assigned to [users](user.md) directly or as part of a [group](group.md) they belong to.

:::info
The Orchestration Cluster creates [a set of default roles](../concepts/access-control/authorizations.md#default-roles) on startup. If deleted, default roles are automatically recreated on cluster startup.
:::

## Create role

To create a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click **Create role**, and enter the following role details:
   - **Role ID**: The unique identifier for the role.
   - **Role name**: The name of the role.
   - **Description**: An optional description of the role.
3. Click **Create role**.

The role is created and can now be assigned to users or groups.

<img src={CreateRoleImg} alt="Create a role" class="img-700"/>

## Delete role

To delete a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click **Delete** next to the role you want to delete.
3. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The role is deleted. The authorizations that were granted to the role are also removed.

## Assign authorizations to a role

See [authorizations](./authorization.md) to learn how to create authorizations for roles.

## Manage users

### Assign users to a role

To assign users to a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to assign users to.
3. Select the **Users** tab.
4. Click **Assign user**.
5. Type the username of the user you want to assign to the role, and click **Assign user**.

:::note
For Self-Managed deployments with basic authentication, you must search for existing users.
:::

The user is assigned to the role and inherits its permissions.

### Remove users from a role

To remove users from a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to remove users from.
3. Select the **Users** tab.
4. Click **Remove** next to the user you want to remove from the role.
5. Confirm the removal by clicking **Remove** in the confirmation dialog.

The user is removed from the role and loses any permissions that were granted through it.

## Manage groups

### Assign groups to a role

To assign groups to a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to assign users to.
3. Select the **Groups** tab.
4. Click **Assign group**.
5. Type the ID of the group you want to assign to the role, and click **Assign group**.

The group is assigned to the role and inherits its permissions.

### Remove groups from a role

To remove groups from a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to remove groups from.
3. Select the **Groups** tab.
4. Click **Remove** next to the group you want to remove from the role.
5. Confirm the removal by clicking **Remove** in the confirmation dialog.

The group is removed from the role and loses any permissions that were granted through it.

## Manage clients

:::note
In a Self-Managed deployment, [client management](client.md) is only available for OIDC authentication.
:::

### Assign client to a role

To assign a client to a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to assign a client to.
3. Select the **Clients** tab.
4. Click **Assign client**.
5. Type the ID of the client you want to assign to the role, and click **Assign client**.

The client is assigned to the role.

### Remove client from a role

To remove a client from a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to remove a client from.
3. Select the **Clients** tab.
4. Click **Remove** next to the client you want to remove from the role.
5. Confirm the removal by clicking **Remove** in the confirmation dialog.

The client is removed from the role.

## Manage mapping rules

<span class="badge badge--platform">Self-Managed only</span>

:::note
[Mapping rules](../concepts/access-control/mapping-rules.md) are only available for OIDC authentication.
:::

### Assign mapping rules to a role

To assign mapping rules to a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to assign mapping rules to.
3. Select the **Mapping rules** tab.
4. Click **Assign mapping rule**.
5. Search for the ID of the mapping rule you want to assign to the role, and click **Assign mapping rule**.

The mapping rule is assigned to the role.

### Remove mapping rules from a role

To remove a mapping rule from a role:

1. Log in to Identity in your cluster, and select the **Roles** tab.
2. Click on the role you want to remove mapping rules from.
3. Select the **Mapping rules** tab.
4. Click **Remove** next to the mapping rule you want to remove from the role.
5. Confirm the removal by clicking **Remove** in the confirmation dialog.

The mapping rule is removed from the role.
