---
id: managing-user-access
title: "Managing user access to Identity"
sidebar_label: "Managing user access"
description: "Learn about the different access levels users can receive within the Identity application."
---

In this guide, you will learn about the different access levels users can receive within the Identity application.

## Permissions supported by Identity

Identity implements the following permissions:

- `read`: Users can access all pages in Identity. They _cannot_ create, modify, or delete any data.
- `read:users`: Users can access only the **Users** page and related subpages.
- `write`: Users have access to all pages. They can create, modify, and delete data.

You can [assign the above permissions to users as part of a role](/self-managed/identity/user-guide/roles/add-assign-permission.md).
This gives the user access to the Identity application.

## Assign Identity permissions to a user

Users are always able to use Identity to log in to the components.
However, they are unable to access the Identity UI without at least one of the permissions listed above.

To grant a user access to the UI, assign at least one Identity permission as part of a role to the user. This can be achieved in one of the following ways described below.

### Use our component presets

When you start Identity with our pre-configured Keycloak container, Identity creates the `Identity` role automatically.
The role contains the necessary permissions to give a user full read and write access to Identity.

[Assign the `Identity` role to a user](/self-managed/identity/user-guide/roles/add-assign-role.md) to enable the user to access the Identity UI.

### Create a custom role

When using an existing Keycloak instance, or if you want to create your own set of permissions, follow our guides to
[create a new role and assign it to users](/self-managed/identity/user-guide/roles/add-assign-role.md).
