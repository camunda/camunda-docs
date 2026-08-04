---
id: logical-tenants
title: "Logical Tenants"
sidebar_label: "Logical Tenants"
description: "Logical Tenants provide lightweight tenant-ID based isolation within a single Camunda 8 cluster."
---

**Logical Tenants** are the lightweight tenant-ID based multi-tenancy model available within Camunda 8. Logical Tenants provide data isolation through tenant identifiers (stored in the `tenantId` field) but share infrastructure with other Logical Tenants. Multiple Logical Tenants can coexist within a single Physical Tenant or cluster.

Logical Tenants are best for cost-efficient sub-division of teams or departments within the same organization. See [Multi-tenancy overview](index.md) to compare with other isolation models.

## How Logical Tenants work

Camunda 8 implements Logical Tenancy using tenant identifiers within a single installation. All tenant data is stored in the same database, with isolation enforced by appending a tenant identifier to each data object (e.g., process definitions, process instances, jobs).

### Tenant identifier

The tenant identifier is added to all data created in Camunda 8. By default, all data is assigned to the `<default>` tenant identifier.

:::note
The `<default>` tenant identifier is reserved and cannot be changed by users.
:::

Organizations can create additional tenants. Tenant identifiers must meet the following requirements:

- Use only alphanumeric characters, dashes (`-`), underscores (`_`), or dots (`.`).
- Be no longer than 31 characters.

### Multi-tenancy checks

Multi-tenancy checks enforce tenant-based access control. By default, multi-tenancy checks are **disabled**. This means that although tenants can be created and assigned, the system does not restrict access based on those assignments. All data is associated with the `<default>` tenant.

When **enabled**, the system verifies that users can only access resources associated with their assigned tenants.

### Inherited tenant ownership

Tenant ownership in Camunda 8 is hierarchical. A user can only deploy resources to authorized tenants. Any data created by those resources inherits the same tenant identifier.

## Isolation of data and processes

Each tenant's data and processes are logically isolated from others. This ensures that one tenant's workflows, data models, and configurations do not interfere with or affect other tenants. Each tenant operates in a secure, independent space within the same Camunda 8 instance.

## Resource sharing

Logical multi-tenancy provides cost efficiency by allowing multiple tenants to share the same Camunda 8 installation and infrastructure. This reduces operational overhead while maintaining logical isolation between tenants.

## Efficient administration

Administrators can manage all tenants centrally using [Admin](/components/admin/tenant.md). This unified management interface simplifies monitoring, configuration, and maintenance tasks across tenant environments.

## Security

Strong access control mechanisms prevent tenants from accessing each other's data or processes. These controls ensure tenant-level security and maintain data integrity across all environments.

## Example: tenant membership in action

When a user deploys a process model or starts a process instance, the system validates the user's tenant assignments.

For example, assume a user belongs to `Tenant A` but not `Tenant B`:

1. **Deploying a process model**
   - If the user deploys to `Tenant A`, the Orchestration Cluster verifies the assignment. If valid, the model is deployed and all related process instances belong to `Tenant A`.
   - If the user deploys to `Tenant B`, the deployment fails because the user lacks access to that tenant.

2. **Running process instances**
   - When querying process instances, the user only sees instances belonging to `Tenant A`.

This mechanism ensures proper isolation and access control across tenants.

## Management Identity

[Management Identity](/self-managed/components/management-identity/overview.md) is a component of Camunda 8 Self-Managed used for identity and access management of components outside the [Orchestration Cluster](/self-managed/components/orchestration-cluster/overview.md). Of those, only [Optimize](/self-managed/components/optimize/overview.md) is tenant aware, and can make use of logical multi-tenancy.

If you wish to use it with the same tenants as an Orchestration Cluster, you will have to manually synchronize the tenants in both the Orchestration Cluster and Management Identity. This means manually creating them, and updating them whenever they change. Two tenants are considered the same if they have the same ID.

## Configuration and management

All Logical Tenant configuration and management pages are consolidated here. Each page focuses on a specific aspect:

### Deployment configuration

- [Configure multi-tenancy in Helm chart](/self-managed/deployment/helm/configure/configure-multi-tenancy.md) — Set up multi-tenancy flags and prerequisites for Orchestration Cluster and Management Identity.

### Tenant initialization

- [Initialize tenants for Optimize](/self-managed/components/management-identity/configuration/initialize-tenants.md) — Programmatically create tenants at startup using configuration files or environment variables.

### Runtime management

- [Manage tenants in Identity](/self-managed/components/management-identity/manage-tenants.md) — Create, view, and manage tenants through the Identity UI; assign users, groups, and applications.

### Component-specific setup

- [Optimize multi-tenancy](/self-managed/components/optimize/configuration/multi-tenancy.md) — Enable and configure multi-tenancy features specific to Optimize.

## Next steps

- Need stronger isolation? See [Physical Tenants](physical-tenants.md).
- Compare all models: [Multi-tenancy overview](index.md).
