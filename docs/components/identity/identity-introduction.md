---
id: identity-introduction
title: Introduction to Identity
description: "Identity provides unified identity management and authorizations for an orchestration cluster."
---

Identity is an integrated component of the [Orchestration Cluster](../orchestration-cluster.md) responsible for managing authentication, authorization, and entities within Camunda 8. It provides a unified and secure way to control access to all Orchestration Cluster components, including Zeebe, Operate, Tasklist, and APIs.

## Key concepts

- **Unified access management:** Authentication and authorizations are handled by an orchestration cluster across all its components and APIs. This eliminates dependencies on external identity components for core orchestration capabilities.
- **Flexible authentication:** Identity supports three authentication modes:
  - **No Authentication:** Useful for local development and testing.
    - This authentication mode is available only on Self-Managed deployment.
  - **Basic Authentication:** Simple user/password-based authentication for APIs.
    - This authentication mode is available only on Self-Managed deployment.
  - **OIDC:** Integration with an OpenID Connect-compatible provider (e.g., Keycloak, Microsoft Entra ID, Okta).
- **Fine-grained authorizations:** [Authorizations](authorization.md) provide granular control over resources like process instances, user tasks, and decisions, ensuring a robust security model.
- **Tenant management:** Multi-tenancy is managed directly within an orchestration cluster, allowing for clear separation of resources.
  - Multi-tenancy is available only on [Self-Managed deployment](/self-managed/components/orchestration-cluster/identity/manage-tenants.md).

## Access management

Depending on your setup, Identity allows you to manage the following entities to control access to your orchestration cluster:

- **[Users](user.md):** Individuals who can access to Camunda 8 applications and perform actions based on their permissions.
- **[Groups](group.md):** Collections of users that simplify access management by allowing permissions to be granted to teams collectively.
- **[Roles](role.md):** Sets of permissions that define what actions can be performed on specific resources. Roles can be assigned to users or groups.
- **[Authorizations](authorization.md):** The specific permissions that connect users, groups, or roles with resources and actions (e.g `READ`, `UPDATE`, `DELETE`).
- **[Tenants](/self-managed/components/orchestration-cluster/identity/manage-tenants.md):** A mechanism for isolating data within a single Camunda 8 cluster, which is useful for multi-tenancy applications. (Self-Managed only).

## Identity on Self-Managed

For documentation on deploying Identity as part of Camunda 8 Self-Managed, refer to the [configuration guides](/self-managed/components/orchestration-cluster/identity/overview.md).
