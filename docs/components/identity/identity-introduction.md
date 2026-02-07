---
id: identity-introduction
title: Introduction to Identity
description: "Identity provides unified identity management and authorizations for an orchestration cluster."
---

Use the integrated [Orchestration Cluster](../orchestration-cluster.md) Identity component to manage Camunda 8 authentication, authorization, and entities.

## About Identity

Identity provides a unified and secure way to control access to all Orchestration Cluster components, including Zeebe, Operate, Tasklist, and APIs.

Identity includes the following features:

| Feature                   | Description                                                                                                                                                      |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unified access management | Authentication and authorization are handled consistently across all Orchestration Cluster components and APIs.                                                  |
| Flexible authentication   | Identity supports multiple authentication modes, including no authentication, basic authentication, and OpenID Connect (OIDC), depending on the deployment type. |
| Tenant management         | Multi-tenancy is managed directly within the Orchestration Cluster, allowing for clear separation of resources.                                                  |

For details about authorization concepts, resources, and configuration, see
[Orchestration Cluster authorizations](../concepts/access-control/authorizations.md).

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
