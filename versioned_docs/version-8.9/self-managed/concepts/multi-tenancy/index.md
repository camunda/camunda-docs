---
id: index
title: "Multi-tenancy"
sidebar_label: "Multi-tenancy"
description: "Isolate data, configurations, and operations for multiple teams, departments, or organizations within a single Camunda 8 installation."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

Camunda 8 supports multiple multi-tenancy models, each with different isolation levels and operational characteristics.

All models run on the same platform and tooling. They differ in how much they isolate, from a shared database separated by a tenant ID, to a fully separate cluster per tenant.

### Choose your model

Choose the model that best fits your isolation requirements and operational constraints:

| Aspect                     | Logical Tenant                   | Multi-Cluster                             |
| :------------------------- | :------------------------------- | :---------------------------------------- |
| **Availability**           | Self-Managed and SaaS            | Self-Managed and SaaS                     |
| **Isolation**              | Logical only                     | Full physical isolation                   |
| **Data sharing**           | Single shared database           | Separate per cluster                      |
| **Backup/restore**         | Cluster-level only               | Independent per cluster                   |
| **Cost**                   | Most efficient                   | Most expensive                            |
| **Operational complexity** | Low                              | High                                      |
| **Use case**               | Small teams, low-risk separation | Separate organizations, maximum isolation |

## Logical Tenants

Lightweight tenant-ID based multi-tenancy for cost-efficient subdivision within a single cluster.

Logical Tenants share infrastructure but have logically isolated data, configurations, and access controls. This model is best for departments or teams within the same organization with low-risk separation needs.

<p class="link-arrow">[Logical Tenants](logical-tenants.md)</p>

## Multi-Cluster

Full isolation through dedicated infrastructure with separate clusters per tenant. Maximum isolation and operational independence, but highest infrastructure cost and complexity.

This model is best for separate organizations with maximum isolation requirements or strict data residency needs.

On SaaS, this means provisioning a separate cluster per tenant rather than configuring a distinct mode. See [Clusters](/components/concepts/clusters.md).

For example, a retail bank and an investment bank under the same parent company might each run their own dedicated cluster, with no shared processes, storage, or networking between them.

## Next steps

- Configure [multi-tenancy](/self-managed/deployment/helm/configure/configure-multi-tenancy.md) for lightweight subdivision.
- Manage [tenants in Identity](/self-managed/components/management-identity/manage-tenants.md).
