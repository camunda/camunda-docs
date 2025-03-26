---
id: what-is-identity
title: "What is Identity?"
sidebar_label: "What is Identity?"
description: "Identity is the component within the Camunda 8 stack responsible for authentication and authorization."
---

Identity is the component within the Camunda 8 stack responsible for authentication and authorization. It allows you to manage:

- Applications
- APIs
- Roles
- Permissions

For example, using Identity you can:

- [Manage roles](/self-managed/identity/user-guide/roles/manage-roles.md), which is a way to group sets of permissions which can be assigned to users using the Identity UI.
- [Manage permissions](/self-managed/identity/user-guide/roles/manage-permissions.md) to control the level of access a user or an application has to a particular component.
- [Manage groups](/self-managed/identity/user-guide/groups/manage-groups.md) to apply a set of roles and authorizations to users.
- [Manage resource authorizations](/self-managed/identity/user-guide/authorizations/managing-resource-authorizations.md) to control resource access within the Identity application.
- [Utilize configuration variables](/self-managed/identity/deployment/configuration-variables.md).

## Next steps

If you're new to Identity, we suggest reviewing our [getting started guide](./getting-started/install-identity.md).

You can use Identity for authentication with Keycloak. The following guidance can be used during platform installation and deployment:

- [Use existing Keycloak](/self-managed/setup/guides/using-existing-keycloak.md)
- [Connect to an OIDC provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md)
