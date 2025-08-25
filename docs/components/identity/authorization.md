---
id: authorization
title: Authorization
description: "Learn how to manage authorizations in your orchestration cluster."
---

Authorizations are managed through permissions that can be assigned to [users](user.md), [groups](group.md), [roles](role.md), clients, and mapping rules.

To learn more about authorizations, see [authorizations](/components/concepts/access-control/authorizations.md).

## Create an authorization

To create a new authorization:

1. Log in to Identity in your cluster, and click on the **Authorizations** tab.
2. Select the resource type on the left side of the screen, and click **Create authorization**.
3. Provide the following information for your authorization:
   - **Owner type:** The entity (user, group, role, client, or mapping) to which you want to assign permissions.
   - **Owner ID:** The ID of the owner to which you want to assign permissions.
   - **Resource type:** A dropdown pre-populated with the selected resource type.
   - **Resource ID**: The ID of the resource to which the owner's permissions apply.
4. Select the permissions this authorization will grant.
5. Click on the **Create authorization** button to finish.

The authorization is then created, and the user, group, role, client, or mapping is granted the permission to perform the action on the specified resource.

![identity-create-authorization-tab](./img/create-authorization-tab.png)

## Delete an authorization

To delete an authorization:

1. Log in to Identity in your cluster, and click on the **Authorizations** tab.
2. Select the resource type of the authorization you want to delete.
3. Click on the **Delete** button next to the authorization you want to delete.
4. Confirm the deletion by clicking **Delete** button in the confirmation dialog.

The authorization is deleted, and the user, group, role, client, or mapping no longer has permission to perform the action on the specified resource.
