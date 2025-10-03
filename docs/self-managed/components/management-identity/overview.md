---
id: overview
title: "Management Identity"
sidebar_label: "Overview"
description: "Management Identity is the component within Camunda 8 Self-Managed responsible for authentication and authorization for Web Modeler, Console and Optimize."
---

The Management Identity component in Camunda 8 Self-Managed is used to manage authentication, access, and authorization for components outside the [Orchestration Cluster](/self-managed/components/orchestration-cluster/overview.md) ([Console](../console/overview.md), [Web Modeler](../modeler/web-modeler/overview.md), and [Optimize](../optimize/overview.md)).

:::note
Management Identity is separate from the [Identity component within the Orchestration Cluster](/self-managed/components/orchestration-cluster/identity/overview.md), which handles authentication for Zeebe, Operate, Tasklist, and Orchestration Cluster API.
:::

## About Management Identity

Management Identity is included by default in the [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) and [Helm charts](/self-managed/deployment/helm/install/quick-install.md) deployments of Camunda 8 Self-Managed, and is configured by default to use a packaged Keycloak instance as an identity provider (IdP).

- Administrators can use Management Identity to manage Camunda 8 users, groups, roles, permissions, and applications.
- Users (interacting via Camunda web components) and applications (interacting via Camunda APIs, such as job workers) are supported, using secure authorization based on OAuth 2.0 standards.
- Users log in to web components via an IdP login page. Applications authenticate via machine-to-machine (M2M) tokens.
- You can integrate Management Identity with an [external OIDC provider](./configuration/connect-to-an-oidc-provider.md), [connect to an existing Keycloak instance](./configuration/connect-to-an-existing-keycloak.md), or [configure an external IdP using Keycloak](./configuration/configure-external-identity-provider.md).

## Get started

If you're new to Management Identity, learn how to access and log in to the Management Identity UI.

- [Get started with Management Identity](identity-first-steps.md)

## Core concepts

Learn about the core concepts of Management Identity.

### Authentication

Management Identity supports two types of authentication:

- **Web login**: Users access web applications through an IdP login page.
- **Machine-to-machine (M2M)**: Applications authenticate using tokens for API access.

Both methods use the [OAuth 2.0 protocol](https://oauth.net/2/) for secure authentication.

- [Learn about authentication methods](authentication.md)

### User, group, role, and application management

Organize and control access using a role-based access control (RBAC) model.

- [Manage users, groups, roles, and applications](application-user-group-role-management/identity-application-user-group-role-management-overview.md)

### Access management

Control who can access what by assigning permissions through roles.

- [Manage access and permissions](access-management/access-management-overview.md)

### Multi-tenancy

Isolate data and access in Optimize between different customers or business units by organizing resources into tenants. This is effective only if you have [multi-tenancy checks enabled for your Orchestration Cluster](/components/identity/tenant.md).

- [Manage tenants for Optimize](manage-tenants.md)

### Mapping rules

Automatically assign roles and tenants to users based on information in their authentication tokens (JWT claims). This enables dynamic access control when integrating with external identity providers.

- [Configure mapping rules](mapping-rules.md)

## Reference

- [Configure Management Identity](configuration/identity-configuration-overview.md)
- [Monitor Management Identity](miscellaneous/application-monitoring.md)
- [Configuration variables](miscellaneous/configuration-variables.md)
- [Configure logging](miscellaneous/configure-logging.md)
- [Prepare Management Identity for production](miscellaneous/making-identity-production-ready.md)
- [Keycloak resource management](miscellaneous/resource-management.md)
- [Starting configuration](miscellaneous/starting-configuration.md)
- [Troubleshoot Management Identity](miscellaneous/troubleshoot-identity.md)
