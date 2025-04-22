---
id: what-is-identity
title: "What is Identity?"
sidebar_label: "What is Identity?"
description: "Identity is the component within the Camunda 8 stack responsible for authentication and authorization."
---

Identity in the Camunda 8 stack is handled by two distinct components: Identity for [Orchestration clusters](#identity-for-orchestration-clusters), and Identity for [Web Modeler, Console, and Optimize](#identity-for-web-modeler-and-console). In both cases, Identity is responsible for managing authentication and authorization within the Camunda 8 stack, but each implementation requires different configurations. In the case of Web Modeler, Console, and Optimize, Identity must be set up independently.

For more information on these differences, see the Self-Managed [reference architecture](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster-vs-web-modeler-and-console).

:::note

The following guides are on Identity configuration in Self-Managed environments. For information on Identity use and management, see the [user guides](/components/identity/identity-introduction.md).

:::

## Identity for Orchestration clusters

Identity is included by default in the [Orchestration cluster](/self-managed//reference-architecture/reference-architecture.md#orchestration-cluster), and does not require any external dependencies. For more information, see the Identity [configuration options](/self-managed/identity/orchestration-identity/configuration.md).

## Identity for Web Modeler, Console, and Optimize

For [Web Modeler, Console, and Optimize deployments](/self-managed/reference-architecture/reference-architecture.md#), Identity runs as a separate and dedicated component. For more information, see the guides on using an [existing Keycloak](/self-managed/setup/guides/using-existing-keycloak.md) instance, and connecting to an [OIDC provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md).

Once deployed, Identity manages the following in Web Modeler, Console, and Optimize:

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
