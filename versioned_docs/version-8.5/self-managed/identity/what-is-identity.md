---
id: what-is-identity
title: "What is Identity?"
sidebar_label: "What is Identity?"
description: "Identity is the component within the Camunda 8 stack responsible for authentication and authorization."
---

Identity is the component within the Camunda 8 stack responsible for authentication and authorization. It allows you to manage:

- Applications
- APIs
- Permissions
- Roles

For example, using Identity you can:

- [Add and assign a role to a user](/self-managed/identity/user-guide/roles/add-assign-role.md), which is a way to group sets of permissions which can be assigned to users using the Identity UI.
- [Add and assign a permission to a role](/self-managed/identity/user-guide/roles/add-assign-permission.md) to control the level of access a user or an application has to a particular component.
- [Create a group](/self-managed/identity/user-guide/groups/create-group.md) to apply a set of roles and authorizations to users.
- [Manage resource authorizations](/self-managed/identity/user-guide/authorizations/managing-resource-authorizations.md) to control resource access within the Identity application.
- [Utilize configuration variables](/self-managed/identity/deployment/configuration-variables.md).

## Next steps

If you're new to Identity, we suggest reviewing our [getting started guide](./getting-started/install-identity.md).

You can use Identity for authentication with Keycloak. The following guidance can be used during platform installation and deployment:

- [Use existing Keycloak](/self-managed/setup/guides/using-existing-keycloak.md)
- [Connect to an OIDC provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md)
