---
id: identity-introduction
title: Introduction to Identity
description: "Identity provides unified identity management and authorizations for an orchestration cluster."
---

Use the integrated [Orchestration Cluster](../orchestration-cluster.md) Identity component to manage Camunda 8 authentication, authorization, and entities.

## About Identity

Identity provides a unified and secure way to control access to all Orchestration Cluster components, including Zeebe, Operate, Tasklist, and APIs.

Identity includes the following features:

| Feature                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unified access management   | Authentication and authorizations are handled by an orchestration cluster across all its components and APIs. This eliminates dependencies on external identity components for core orchestration capabilities.                                                                                                                                                                                                                                                                                                    |
| Flexible authentication     | Identity supports three authentication modes: <p><ul><li><p>**No Authentication:** Useful for local development and testing. Useful for local development and testing. Only available for Self-Managed deployments.</p></li><li><p>**Basic Authentication:** Simple user/password-based authentication for APIs. Only available for Self-Managed deployments.</p></li><li><p>**OIDC:** Integration with an OpenID Connect-compatible provider (for example, Keycloak, Microsoft Entra ID, Okta).</p></li></ul></p> |
| Fine-grained authorizations | [Authorizations](authorization.md) provide granular control over resources like process instances, user tasks, and decisions, ensuring a robust security model.                                                                                                                                                                                                                                                                                                                                                    |
| Tenant management           | Multi-tenancy is managed directly within an orchestration cluster, allowing for clear separation of resources.                                                                                                                                                                                                                                                                                                                                                                                                     |

## Manage access

Depending on your setup, Identity allows you to manage Orchestration Cluster access as follows:

| Entity                             | Description                                                                                                                         | Availability      |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| [Users](user.md)                   | Individuals who can access applications and perform actions based on their permissions.                                             | All deployments   |
| [Groups](group.md)                 | Simplify access management by granting permissions collectively to groups of users.                                                 | All deployments   |
| [Roles](role.md)                   | Sets of permissions to define what actions can be performed on specific resources. Roles can be assigned to users and groups.       | All deployments   |
| [Authorizations](authorization.md) | The specific permissions that connect users, groups, or roles with resources and actions (for example, `READ`, `UPDATE`, `DELETE`). | All deployments   |
| [Tenants](tenant.md)               | Isolate data within a single cluster. This is useful for multi-tenancy applications.                                                | Self-Managed only |

:::info Identity in Self-Managed
For documentation on deploying Identity as part of Camunda 8 Self-Managed, see [Identity in Self-Managed](/self-managed/components/orchestration-cluster/identity/overview.md).
:::
