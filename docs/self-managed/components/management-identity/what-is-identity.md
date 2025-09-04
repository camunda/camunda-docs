---
id: what-is-identity
title: "Management Identity"
sidebar_label: "Identity"
description: "Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization."
---

Use the [Management Identity](/reference/glossary.md#management-identity) component in Camunda 8 Self-Managed to manage authentication, access, and authorization for components outside the [Orchestration Cluster](/self-managed/components/orchestration-cluster/overview.md) (Console, Web Modeler, and Optimize).

## About Identity

Identity is included by default in the [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) and [Helm](/self-managed/installation-methods/helm/install.md) deployments of Camunda 8 Self-Managed, and is configured by default to use a packaged Keycloak instance as an identity provider (IdP).

- Administrators can use Identity to manage users, groups, roles, permissions, and applications within the Camunda 8 platform.
- Identity supports both users (interacting via Camunda UIs) and applications (interacting via Camunda APIs, such as job workers) with secure authorization based on OAuth 2.0 standards.
- Users can log in to Camunda 8 component UIs via an IdP login page. Applications can authenticate via machine-to-machine (M2M) tokens.
- You can also choose to integrate Identity with an external OIDC provider or connect to an existing Keycloak installation.

## Get started with Identity

If you're new to Identity, get started by learning how to open and log in to the Identity interface.

- [Get started with Identity](identity-first-steps.md)

## Configure Identity

Configure your Identity Keycloak and OIDC integration.

- [Configure Identity](configuration/identity-configuration-overview.md)

## Authentication

Depending on your configuration, users and applications can authenticate with Camunda 8 via the IdP using the [OAuth 2.0 protocol](https://oauth.net/2/), using either a login page or M2M tokens.

- [Authentication](authentication.md)

## Manage Identity

Manage and control access for your users and applications, using groups and roles/permissions (role-based access control).

- [Manage users, groups, roles, and applications](application-user-group-role-management/identity-application-user-group-role-management-overview.md)
- [Manage access and permissions](access-management/access-management-overview.md)
- [Manage tenants](manage-tenants.md)
- [Mapping rules](mapping-rules.md)

## Reference

- [Monitoring Identity](miscellaneous/application-monitoring.md)
- [Configuration variables](miscellaneous/configuration-variables.md)
- [Configure logging](miscellaneous/configure-logging.md)
- [Prepare Identity for production](miscellaneous/making-identity-production-ready.md)
- [Keycloak resource management](miscellaneous/resource-management.md)
- [Starting configuration](miscellaneous/starting-configuration.md)
- [Troubleshoot Identity](miscellaneous/troubleshoot-identity.md)
