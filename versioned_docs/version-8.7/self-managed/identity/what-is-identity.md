---
id: what-is-identity
title: "What is Identity?"
sidebar_label: "What is Identity?"
description: "Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization."
---

Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization. It offers the following capabilities:

- [Configure](/self-managed/identity/configuration/identity-configuration-overview.md) to either use KeyCloak or a generic OIDC provider as IdP
- [Authenticate](/self-managed/identity/authentication.md) users via the IdP log-in screen or services via Machine2Machine tokens
- [Organize](/self-managed/identity/application-user-group-role-management/identity-application-user-group-role-management-overview.md) your **Users** in **Groups**, or **Roles**
- [Manage Access](/self-managed/identity/access-management/access-management-overview.md) to Camunda 8 via...
  - **APIs** represent the different Camunda 8 components (e.g., Operate, Tasklist). Each APIs defines for itself a set of [**permissions**](/self-managed/identity/access-management/access-management-overview.md#available-permissions) that can be used to control access to it
  - [**Permissions**](/self-managed/identity/access-management/access-management-overview.md#available-permissions) can be [organized in **Roles**](/self-managed/identity/access-management/manage-permissions.md#managing-permissions-for-roles), which can be assigned to **Users** either directly or via **Groups**. Additonally, **permissions** can be [assigned](/self-managed/identity/access-management/manage-permissions.md#managing-permissions-for-applications) to your [custom **Application** (e.g., job worker)](versioned_docs/version-8.7/self-managed/identity/application-user-group-role-management/applications.md)
  - Optionally, you can grant more fine-grined access control to Camunda 8 resources to **Users** or **Groups** using [**resource authorizations**](/self-managed/identity/access-management/resource-authorizations.md#overview)
- Isolate data access for your custom **Applications** or **Users** [using **Tenants**](/self-managed/identity/managing-tenants.md)
- Use [**mapping rules**](/self-managed/identity/mapping-rules.md) to integrate Camunda Identity concepts to your existing OIDC-based IdP

## Next steps

If you're new to Identity, find out how to access Identity by visiting [first steps](/self-managed/identity/install-identity.md).
