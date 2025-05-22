---
id: what-is-identity
title: "Identity"
sidebar_label: "Identity"
description: "Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization."
---

Use Identity in Camunda 8 Self-Managed to manage authentication, access, and authorization for your Camunda 8 users, resources, and the Camunda 8 API.

## About Identity

Identity is included by default in the [Docker Compose](/self-managed/setup/deploy/local/docker-compose.md) and [Helm](/self-managed/setup/install.md) deployments of Camunda 8 Self-Managed, and is configured by default to use a packaged Keycloak instance as an identity provider (IdP).

- Administrators can use Identity to manage users, groups, roles, permissions, and applications within the Camunda 8 platform.
- Identity supports both users (interacting via Camunda UIs) and applications (interacting via Camunda APIs, such as job workers) with secure authorization based on OAuth 2.0 standards.
- Users can log in to Camunda 8 component UIs via an IdP login page. Applications can authenticate via machine-to-machine (M2M) tokens.
- You can also choose to integrate Identity with an external OIDC provider or connect to an existing Keycloak installation.

## Get started with Identity

If you're new to Identity, learn how to open and log in to the Identity interface.

- [Get started with Identity](identity-first-steps.md)

## Configure Identity

Configure the Identity Keycloak and OIDC integration, and learn more about how Identity authentication works.

- [Configure Identity](configuration/identity-configuration-overview.md)

## Manage Identity

Manage and control access for your users and applications, using groups and roles/permissions (role-based access control).

- [Manage users, groups, roles, and applications](application-user-group-role-management/identity-application-user-group-role-management-overview.md)
- [Manage access and permissions](access-management/access-management-overview.md)
- [Manage tenants](managing-tenants.md)

## Prepare Identity for production

Learn more about what to consider when moving Identity into a production environment, such as ensuring your Keycloak instance is production-ready, and enabling Transport Layer Security (TLS) for Identity.

- [Prepare Identity for production](miscellaneous/making-identity-production-ready.md)

## Monitoring and troubleshooting Identity

Learn how you can monitor the Identity component metrics and status, and how to troubleshoot and resolve common issues.

- [Monitoring Identity](miscellaneous/application-monitoring.md)
- [Troubleshooting Identity](miscellaneous/troubleshoot-identity.md)
