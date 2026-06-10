---
id: physical-tenants
title: "Physical Tenants"
sidebar_label: "Physical Tenants"
description: "Physical Tenants enable strong data isolation and independent management within a single Camunda 8 cluster."
---

A **Physical Tenant** is an isolated execution unit within an Orchestration Cluster. Multiple Physical Tenants can run in a single cluster, each acting like a self-contained mini-cluster with fully isolated data, independent lifecycle management, and no runtime interference between tenants.

Physical Tenants provide a balanced approach to multi-tenancy—offering strong isolation without the operational complexity and cost of running separate clusters. See [Multi-tenancy overview](index.md) to compare with other isolation models.

## Why Physical Tenants

**Strong isolation without complexity:** Run multiple teams or organizations on one cluster with complete data separation and independent operations, without the overhead of managing multiple orchestration clusters.

**Independent operations:** Back up, restore, scale, and manage each Physical Tenant independently. Tenant-specific performance issues do not affect other tenants.

**Cost efficiency:** Share infrastructure while maintaining tenant autonomy, reducing operational overhead compared to multi-cluster deployments.

## Terminology

### Physical Tenant

An isolated execution unit within an Orchestration Cluster. Each Physical Tenant has separate data storage, independent lifecycle management, and API access scoped to that tenant.

### Default Physical Tenant

Every Orchestration Cluster automatically includes a default Physical Tenant created at provisioning time. In Camunda 8.10, the default Physical Tenant is immutable and cannot be renamed, disabled, or deleted. For backward compatibility, traffic not explicitly scoped to a Physical Tenant is internally routed to the default Physical Tenant.

### Cluster-wide operation

An operation that affects the entire Orchestration Cluster, such as cluster configuration updates, cluster-level health checks, or cluster backups. Cluster-wide operations are protected by the cluster-admin role and are not scoped to a specific Physical Tenant.

### Tenant-scoped operation

An operation that targets a specific Physical Tenant, such as deploying a process to a tenant, backing up a tenant's data, or querying a tenant's process instances.

## API and access patterns

**Tenant-scoped APIs** are accessible at `/physical-tenants/{physicalTenantId}/v2/`:

- REST API: `POST /physical-tenants/my-tenant/v2/process-definitions`
- Webapps: `https://your-cluster/physical-tenants/my-tenant/operate`

**Cluster-wide APIs** are accessible at `/cluster/v2/`:

- Cluster operations: `POST /cluster/v2/backup`
- Cluster health: `GET /cluster/v2/health`

**gRPC clients** specify the Physical Tenant using the `Camunda-Physical-Tenant` custom header.

## Logical and Physical Tenants together

Logical Tenants remain available within each Physical Tenant as a lightweight subdivision mechanism. You can use Logical Tenants for cost-efficient sub-division (for example, multiple departments within a team) while relying on Physical Tenants for strong isolation (for example, separate teams within an organization).

See [Logical Tenants](logical-tenants.md) for details on the lightweight tenant-ID based model.

**Important:** There is no migration path from Logical Tenants to Physical Tenants. Logical Tenants created in a Physical Tenant remain associated with that tenant and cannot be migrated to another Physical Tenant.

## Wording conventions

When referencing Physical Tenants and Logical Tenants in documentation and code:

- Use **`physicalTenantId`** when referencing Physical Tenant API parameters, configuration keys, or system identifiers.
- Use **`tenantId`** only when referencing Logical Tenants (backward-compatible with existing API).
- Existing API keys remain unchanged.
- Use **Physical Tenant** and **Logical Tenant** (capitalized) as the canonical terms.

## Learn more

For detailed technical information about isolation model, architecture, and storage configuration, see [Physical Tenant isolation model](/self-managed/concepts/physical-tenants/index.md).
