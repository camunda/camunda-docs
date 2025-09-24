---
id: authorization
title: Authorizations
description: "Learn how to manage authorizations to an orchestration cluster."
---

import AuthImg from './img/create-authorization-tab.png';

An authorization grants an **owner** access to a **resource** and defines the specific **permissions** they have.

- **Owner**: The entity that receives permissions, such as a [user](user.md), [group](group.md), [role](role.md), [client](client.md), or [mapping rule](mapping-rules.md).
- **Resource**: The object that the permissions apply to, such as a process definition, decision definition, or system. See the full list of [available resources](/components/concepts/access-control/authorizations.md#available-resources).

Each authorization specifies which permissions the owner has for the resource (for example, `READ`, `UPDATE`, `DELETE`).

For authorization to be applied, it must be [enabled in your cluster configuration](/components/concepts/access-control/authorizations.md#configuration).

:::info
To learn more, see [Orchestration Cluster authorization](/components/concepts/access-control/authorizations.md).
:::

## Create authorization

To create a new authorization:

1. Log in to Identity in your cluster, and click on the **Authorizations** tab.
2. Select a resource type from the list on the left, and click **Create authorization**.
3. Provide the following information:
   - **Owner type**: The entity to which you want to assign permissions, such as a User, Group, Role, Client, or Mapping rule.
   - **Owner ID**: The unique ID of the owner.
   - **Resource type**: The selected resource type.
   - **Resource ID**: The ID of the resource. Use `*` to grant permissions for all resources of the selected type.
4. Select the permissions you want to grant.
5. Click **Create authorization**.

The authorization is created, and the owner is granted the specified permissions.

<img src={AuthImg} alt="Create authorization tab" class="img-700"/>

## Update authorization

Authorizations cannot be updated after they are created.

To edit an authorization, [delete](#delete-an-authorization) the existing authorization and create a new authorization with the updated permissions.

## Delete authorization

To delete an authorization:

1. Log in to Identity in your cluster, and click on the **Authorizations** tab.
2. Select the resource type of the authorization you want to delete.
3. In the list, find the authorization you want to remove and click **Delete**.
4. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The authorization is deleted, and the owner no longer has the permissions granted by it.

:::caution
Deleting an authorization is permanent and cannot be undone.
:::
