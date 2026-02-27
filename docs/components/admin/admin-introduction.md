---
id: admin-introduction
title: Introduction to Admin
description: "Admin is the cluster-level admin UI for managing identity and access control for an orchestration cluster."
---

Use the integrated [Orchestration Cluster](../orchestration-cluster.md) Admin (the cluster-level admin UI hosting Identity and other administrative features, previously known as Orchestration Cluster Identity) to manage Camunda 8 authentication, authorization, and entities.

## About Admin

Admin provides a unified and secure way to control access to all Orchestration Cluster components, including Zeebe, Operate, Tasklist, and APIs.

Admin includes the following features:

| Feature                   | Description                                                                                                                                                    |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unified access management | Authentication and authorization are handled consistently across all Orchestration Cluster components and APIs.                                                |
| Flexible authentication   | Admin supports multiple authentication modes, including no authentication, Basic authentication, and OpenID Connect (OIDC), depending on the deployment type. |
| Tenant management         | Multi-tenancy is managed directly within the Orchestration Cluster, allowing for clear separation of resources.                                                |

For details about authorization concepts, resources, and configuration, see
[Orchestration Cluster authorizations](../concepts/access-control/authorizations.md).

## Manage access

Depending on your setup, Admin allows you to manage Orchestration Cluster access as follows:

| Entity                             | Description                                                                                                                         | Availability      |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| [Users](user.md)                   | Individuals who can access applications and perform actions based on their permissions.                                             | All deployments   |
| [Groups](group.md)                 | Simplify access management by granting permissions collectively to groups of users.                                                 | All deployments   |
| [Roles](role.md)                   | Sets of permissions to define what actions can be performed on specific resources. Roles can be assigned to users and groups.       | All deployments   |
| [Authorizations](authorization.md) | The specific permissions that connect users, groups, or roles with resources and actions (for example, `READ`, `UPDATE`, `DELETE`). | All deployments   |
| [Tenants](tenant.md)               | Isolate data within a single cluster. This is useful for multi-tenancy applications.                                                | Self-Managed only |

:::info Admin in Self-Managed
For documentation on deploying Admin as part of Camunda 8 Self-Managed, see [Admin in Self-Managed](/self-managed/components/orchestration-cluster/admin/overview.md).
:::
