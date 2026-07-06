---
id: multi-tenancy
title: "Multi-tenancy"
sidebar_label: "Multi-tenancy"
description: "Multi-tenancy lets you host multiple isolated tenants within a single Camunda 8 installation, on both SaaS and Self-Managed."
---

[Multi-tenancy](/reference/glossary.md#multi-tenancy) in Camunda 8 enables a single installation to serve multiple [tenants](/reference/glossary.md#tenant) such as departments, teams, or external clients, while keeping each tenant's data and processes logically isolated.

This page describes **logical multi-tenancy**: tenant-ID based isolation within a single cluster. Logical multi-tenancy is available on both **Camunda 8 SaaS** and **Camunda 8 Self-Managed**.

:::note
Self-Managed also supports stronger isolation models. For a comparison of logical tenants, Physical Tenants, and multi-cluster deployments, see the [Self-Managed multi-tenancy overview](/self-managed/concepts/multi-tenancy/index.md).
:::

## How multi-tenancy works

Camunda 8 implements multi-tenancy using tenant identifiers within a single installation. All tenant data is stored in the same database, with isolation enforced by appending a tenant identifier to each data object, such as process definitions, process instances, and jobs.

### Tenant identifier

The tenant identifier is added to all data created in Camunda 8. By default, all data is assigned to the `<default>` tenant identifier.

:::note
The `<default>` tenant identifier is reserved and cannot be changed by users.
:::

Organizations can create additional tenants. Tenant identifiers must meet the following requirements:

- Use only alphanumeric characters, dashes (`-`), underscores (`_`), or dots (`.`).
- Be no longer than 31 characters.

### Multi-tenancy checks

Multi-tenancy checks enforce tenant-based access control.

By default, multi-tenancy checks are **disabled**. This means that although tenants can be created and assigned, the system does not restrict access based on those assignments. All data is associated with the `<default>` tenant.

When **enabled**, the system verifies that users can only access resources associated with their assigned tenants. Users, groups, and roles not assigned to a tenant lose access to resources scoped to that tenant.

:::warning
Before you enable multi-tenancy checks, assign all users, groups, and roles that need access to their tenants **and** to the `<default>` tenant. Once checks are enforced, any principal not assigned to a tenant loses access to the resources scoped to that tenant.
:::

### Inherited tenant ownership

Tenant ownership in Camunda 8 is hierarchical. A user can only deploy resources to authorized tenants. Any data created by those resources inherits the same tenant identifier.

## Example: tenant membership in action

When a user deploys a process model or starts a process instance, the system validates the user's tenant assignments.

For example, assume a user belongs to `Tenant A` but not `Tenant B`:

1. **Deploying a process model**
   - If the user deploys to `Tenant A`, the Orchestration Cluster verifies the assignment. If valid, the model is deployed and all related process instances belong to `Tenant A`.
   - If the user deploys to `Tenant B`, the deployment fails because the user lacks access to that tenant.

2. **Running process instances**
   - When querying process instances, the user only sees instances belonging to `Tenant A`.

This mechanism ensures proper isolation and access control across tenants.

## Enable multi-tenancy checks

Tenants can be created and principals assigned regardless of whether checks are enabled. Enabling checks enforces the assignments. How you enable checks depends on your deployment model.

### SaaS

On SaaS, enable multi-tenancy checks per cluster using the **Multi-tenancy** toggle in Camunda Hub:

1. Navigate to **Camunda Hub**, and select the **Clusters** tab.
2. Select the cluster you want to manage, and select the **Settings** tab.
3. Enable the **Multi-tenancy** setting.

For details on the toggle, its default state, and who can change it, see [cluster settings](/components/hub/organization/manage-clusters/settings.md#multi-tenancy).

<!-- TODO: Confirm the exact minimum cluster generation with eng. The Console toggle is shown on clusters that ship MultiTenancyConfiguration (Zeebe 8.8.0-alpha7+)... the docs issue states "generation 8.8+". Confirm the customer-facing wording? -->

The **Multi-tenancy** toggle is available for clusters running generation 8.8 and later. It is disabled by default, and only organization admins can change it. Disabling the toggle restores the implicit `<default>`-tenant behavior.

### Self-Managed

On Self-Managed, operators enable multi-tenancy checks through configuration properties. See [Orchestration Cluster configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#multi-tenancy).

## Manage tenants

Administrators can manage all tenants centrally in [Admin](/components/admin/tenant.md). This unified management interface simplifies monitoring, configuration, and maintenance tasks across tenant environments.

The **Tenants** tab in Admin is available to organization admins on SaaS clusters running generation 8.8 and later, even before multi-tenancy checks are enabled. This allows admins to set up tenants and assignments before enforcing checks.

## Optimize and multi-tenancy

Optimize multi-tenancy is available in **Self-Managed only**.

On SaaS, Optimize can only access data from the `<default>` tenant. Data scoped to other tenants is not available in Optimize on SaaS.

In Self-Managed, [Management Identity](/self-managed/components/management-identity/overview.md) is used for identity and access management of components outside the [Orchestration Cluster](/self-managed/components/orchestration-cluster/overview.md). Of those, only [Optimize](/self-managed/components/optimize/overview.md) is tenant aware and can make use of multi-tenancy. To use it with the same tenants as an Orchestration Cluster, you must manually synchronize the tenants in both the Orchestration Cluster and Management Identity. This means manually creating them, and updating them whenever they change. Two tenants are considered the same if they have the same ID.
