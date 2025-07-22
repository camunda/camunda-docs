---
title: "Camunda 8.8 Self-Managed Upgrade Guide"
description: "Plan and execute an update of your Camunda 8 Self-Managed installation to version 8.8. Includes architectural highlights, prerequisites, breaking changes and update paths for administrators."
---

# Camunda 8.8 Self-Managed Upgrade Guide

:::warning
This documentation page is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, details and sections here are actively being refined.

See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

This page helps you plan and run an update of an existing **Camunda 8.7** Self-Managed environment to **Camunda 8.8**. It summarizes what changed, what you must do before updating, and where to find step-by-step instructions based on your role.

> **Who should read this?**  
> Platform administrators, DevOps engineers, and application developers maintaining Camunda-based solutions in self-managed Kubernetes or VM environments.

## Camunda 8.8 is a latest release

Camunda 8.8 represents a significant architectural evolution that affects both infrastructure deployment and application integration. This update introduces the new **Orchestration cluster architecture**, unified APIs, and new authentication models while deprecating several legacy components.

## Why this update matters

Camunda 8.8 introduces changes that affect both **infrastructure** and **application integration**:

- **Orchestration Cluster architecture:** Consolidates and streamlines the runtime components to simplify deployment and scaling. [See Architectural changes](#architectural-changes).
- **Unified APIs & SDK alignment:** Earlier component-specific APIs (V1) are deprecated; migrate to the Orchestration Cluster API and updated SDKs to access new capabilities and ensure forward compatibility.
- **Authentication & authorization overhaul:** Shift to an OIDC-based identity model with cluster-level and scoped permissions. LDAP integration for Operate/Tasklist is removed.
- **Unified configuration schema:** A consistent configuration model reduces divergence across components and eases automation. [Link to schema docs – VERIFY]

> **Update complexity:** **Moderate–High.** Expect coordination across platform and application teams and plan a controlled maintenance window. Validate in a non-production environment first.

---

## Quick Start Checklist

1. Confirm your current Camunda version and supported direct upgrade path to 8.8. [VERIFY matrix]
2. Back up stateful data (Elasticsearch / OpenSearch indices, configuration, secrets).
3. Prepare an OIDC provider (Identity, Keycloak, or corporate IdP) and map required roles.
4. Migrate configuration to the unified schema (dry run).
5. Update SDK dependencies in development branches; address deprecations.
6. Stand up a test environment that mirrors production scale where possible.
7. Run update and validate workflows, user tasks, and custom integrations.

---

[Camunda 8.8 Upgrade guide for Administrator](./administrators/prepare-for-upgrade.md)

You can navigate to one of these guides to start your upgrade.

---

## Architectural changes in 8.8

### Streamlined / Orchestration Cluster Architecture

Camunda 8.8 completes the “streamlined architecture” initiative announced in 2024. At a high level:

- Reduces the number of separately deployed component services.
- Aligns component communication through a unified cluster identity and API surface.
- Simplifies scaling by letting you size the orchestration cluster independently of management tooling.
- Standardizes configuration keys and secrets across components.
- Sets the foundation for future multi-cluster and federation patterns. [VERIFY]

For background, see the 2024 architecture announcement blog post. [blog post](https://camunda.com/blog/2024/04/simplified-deployment-options-accelerated-getting-started-experience/)

---

## Update prerequisites and compatibility

For full OS, Kubernetes, database, and runtime version details, see the **[Supported environments](../../reference/supported-environments.md)** reference. Highlights relevant to the 8.8 update appear below.

:::warning Breaking changes
Camunda 8.8 includes changes that **require** both application updates and infrastructure modifications. Review the deprecation deadlines and plan your migration. For the full technical delta, see **[Update guide: 8.7.x → 8.8](../operational-guides/update-guide/870-to-880.md)**. [VERIFY path]
:::

### API & SDK status

| Component / Use          | Status in 8.8  | Migrate To                 | Migrate By (no later than) |
| ------------------------ | -------------- | -------------------------- | -------------------------- |
| V1 component APIs        | **Deprecated** | Orchestration Cluster API  | Before Camunda 8.10        |
| Community Spring Zeebe   | **Deprecated** | Camunda Spring SDK         | Before Camunda 8.10        |
| Zeebe Process Test (ZPT) | **Deprecated** | Camunda Process Test (CPT) | Before Camunda 8.10        |
| Job-based User Tasks     | **Deprecated** | Camunda User Tasks         | Before Camunda 8.10        |

> Start migration now to reduce risk when upgrading beyond 8.8.

For More information see [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/)

### Authentication & authorization

- LDAP-based authentication for **Operate** and **Tasklist** has been removed. Use **Identity** backed by an **OIDC** provider (Keycloak or your enterprise IdP).
- A **cluster-level permission model** replaces previous per-component role handling; review role mappings.
- **Scoped permissions** differentiate orchestration (runtime execution) from management (operate, administer). Adjust access control policies accordingly.
- An OIDC provider is required. Camunda Identity can integrate with Keycloak or external OIDC sources. [Add link to Identity setup]

### Infrastructure versions

- **Elasticsearch: 8.16 or later** required. Confirm whether OpenSearch is supported for 8.8 and note minimum version. [VERIFY]
- Ensure storage classes and performance settings meet event throughput needs; reindexing may be required after schema changes. [VERIFY]

### Deployment changes

- The **Orchestration Cluster deployment architecture** replaces prior component-scattered topologies. See **[Administrators: Prepare for update](./administrators/prepare-for-upgrade.md)**.
- **Unified configuration schema**: migrate existing Helm values or environment settings to the new schema. [Add link to schema migration instructions]

---

## Update execution paths

Choose the path that matches your role. Teams should coordinate; many tasks are interdependent.

---

### Platform Administrators / DevOps

**Typical responsibilities**

- Kubernetes clusters & Helm chart lifecycle
- Elasticsearch / OpenSearch management
- Authentication systems (Identity, Keycloak, enterprise OIDC)
- Backup / restore and disaster recovery
- Monitoring, logging, and alerting

**Your upgrade flow**

1. **[Prepare for an upgrade](./administrators/prepare-for-upgrade.md)** – Validate backups, review prerequisites, map configuration changes, stage images.
2. **[Run the upgrade](./administrators/run-upgrade.md)** – Apply chart changes, perform rolling or controlled restart, validate cluster health and data access.
