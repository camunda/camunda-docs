---
id: authorization
title: Authorizations
description: "Learn how to manage authorizations to an orchestration cluster."
---

An authorization grants permissions to an **owner** to perform actions on a specific **resource**.

- The **owner** is the entity that receives permissions, such as a [user](user.md), [group](group.md), [role](role.md), [client](client.md), or [mapping rule](/self-managed/components/orchestration-cluster/identity/mapping-rules/managing-mapping-rules.md).
- The **resource** is the object that the permissions apply to, like a process definition or a decision instance.

Each authorization specifies which actions (e.g., `READ`, `UPDATE`, `DELETE`) the owner is allowed to perform on the resource.

To learn more about authorizations, see [authorizations](/components/concepts/access-control/authorizations.md).

## Create an authorization

To create a new authorization:

1. Log in to Identity in your cluster, and click on the **Authorizations** tab.
2. Select a resource type from the list on the left, and click **Create authorization**.
3. Provide the following information:
   - **Owner type**: The entity to which you want to assign permissions, such as a User, Group, Role, Client, or Mapping rule.
   - **Owner ID**: The unique ID of the owner.
   - **Resource type**: The selected resource type from the list of [available resources](/components/concepts/access-control/authorizations.md#available-resources).
   - **Resource ID**: The ID of the resource. Use `*` to grant permissions for all resources of the selected type.
4. Select the permissions you want to grant.
5. Click **Create authorization**.

The authorization is created, and the owner is granted the specified permissions.

![identity-create-authorization-tab](./img/create-authorization-tab.png)

## Delete an authorization

To delete an authorization:

1. Log in to Identity in your cluster, and click on the **Authorizations** tab.
2. Select the resource type of the authorization you want to delete.
3. In the list, find the authorization you want to remove and click the **Delete** button next to it.
4. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The authorization is deleted, and the owner no longer has the permissions granted by it.
