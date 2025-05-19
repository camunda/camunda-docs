---
id: what-is-identity
title: "What is Identity?"
sidebar_label: "What is Identity?"
description: "Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization."
---

Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization. It offers the following capabilities:

- [Configure](/self-managed/identity/configuration/identity-configuration-overview.md) to either use Keycloak or a generic OIDC provider as IdP
- [Authenticate](/self-managed/identity/authentication.md) users via the IdP log-in screen or services via Machine2Machine tokens
- [Organize](/self-managed/identity/application-user-group-role-management/identity-application-user-group-role-management-overview.md) your _Users_ in _Groups_, or _Roles_
- [Manage Access](/self-managed/identity/access-management/access-management-overview.md) to Camunda 8 via:
  - _APIs_ represent the different Camunda 8 components (e.g., Operate, Tasklist). Each APIs defines for itself a set of [_permissions_](/self-managed/identity/access-management/access-management-overview.md#available-permissions) that can be used to control access to it
  - [_Permissions_](/self-managed/identity/access-management/access-management-overview.md#available-permissions) can be [organized in _Roles_](/self-managed/identity/access-management/manage-permissions.md#managing-permissions-for-roles), which can be assigned to _Users_ either directly or via _Groups_. Additonally, _permissions_ can be [assigned](/self-managed/identity/access-management/manage-permissions.md#managing-permissions-for-applications) to your [custom _Application_ (e.g., job worker)](versioned_docs/version-8.7/self-managed/identity/application-user-group-role-management/applications.md)
  - Optionally, you can grant more fine-grined access control to Camunda 8 resources to _Users_ or _Groups_ using [_resource authorizations_](/self-managed/identity/access-management/resource-authorizations.md#overview)
- Isolate data access for your custom _Applications_ or _Users_ [using _Tenants_](/self-managed/identity/managing-tenants.md)
- Use [_Mapping Rules_](/self-managed/identity/mapping-rules.md) to integrate Camunda Identity concepts to your existing OIDC-based IdP

## Next steps

If you're new to Identity, find out how to access Identity by visiting [first steps](/self-managed/identity/identity-first-steps.md).
