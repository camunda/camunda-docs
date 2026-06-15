---
id: multi-tenancy-overview
title: "Multi-tenancy"
sidebar_label: "Multi-tenancy"
description: "Multi-tenancy enables multiple isolated teams or organizations to run within a single Camunda 8 installation."
---

:::info
Multi-tenancy is available in Camunda 8 Self-Managed only. This feature is not available in Camunda 8 SaaS.
:::

Multi-tenancy enables you to isolate data, configurations, and operations for multiple teams, departments, or organizations within a single Camunda 8 installation. Camunda 8 supports three distinct multi-tenancy models, each with different isolation levels and operational characteristics.

## Three models of multi-tenancy

Choose the model that best fits your isolation requirements and operational constraints:

| Aspect                     | Logical Tenant                   | Physical Tenant                         | Multi-Cluster                             |
| -------------------------- | -------------------------------- | --------------------------------------- | ----------------------------------------- |
| **Isolation**              | Logical only                     | Strong physical data isolation          | Full physical isolation                   |
| **Data sharing**           | Single shared database           | Separate data per tenant                | Separate per cluster                      |
| **Backup/restore**         | Cluster-level only               | Independent per tenant                  | Independent per cluster                   |
| **Cost**                   | Most efficient                   | Balanced                                | Most expensive                            |
| **Operational complexity** | Low                              | Medium                                  | High                                      |
| **Use case**               | Small teams, low-risk separation | Multiple teams, strong isolation needed | Separate organizations, maximum isolation |

## Logical Tenants

**Lightweight tenant-ID based multi-tenancy** for cost-efficient subdivision within a single cluster. Logical Tenants share infrastructure but have logically isolated data, configurations, and access controls.

Best for: Departments or teams within the same organization with low-risk separation needs.

- [Learn more about Logical Tenants](logical-tenants.md).

## Physical Tenants

**Strong physical data isolation within a single cluster** with separate data storage and independent operations per tenant. Physical Tenants still share cluster compute resources such as CPU and memory, so runtime interference is reduced but not fully eliminated.

Best for: Multiple teams or organizations needing strong isolation without the cost and complexity of separate clusters.

- [Learn more about Physical Tenants](physical-tenants.md).

## Multi-Cluster

**Full isolation through dedicated infrastructure** with separate clusters per tenant. Maximum isolation and operational independence, but highest infrastructure cost and complexity.

Best for: Separate organizations with maximum isolation requirements or strict data residency needs.

## Next steps

- Configure [Logical Tenants](/self-managed/deployment/helm/configure/configure-multi-tenancy.md) for lightweight subdivision.
- Explore [Physical Tenants](physical-tenants.md) for strong isolation.
- Manage [tenants in Identity](/self-managed/components/management-identity/manage-tenants.md).
