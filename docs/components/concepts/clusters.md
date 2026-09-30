---
id: clusters
title: "Clusters"
description: "A cluster is the infrastructure that runs Camunda 8. Learn how clusters relate to Environments, workspaces, and Physical Tenants."
---

A cluster is the infrastructure that runs Camunda 8. It includes the Orchestration Cluster that automates your processes, and the components that run alongside it, such as connectors and Optimize.

In Camunda Hub, a cluster is an administrative unit: the infrastructure that org admins create, size, and maintain. Teams don't deploy to a cluster directly. They deploy to an [Environment](./environments.md) hosted on it.

## Clusters and Environments

A cluster is an administrative unit, and an Environment is an operational unit. Org admins create, size, update, and back up clusters. Teams deploy and run processes in the Environments that are assigned to their [workspace](./workspaces.md).

| Cluster                             | Environments of the cluster                                                               |
| :---------------------------------- | :---------------------------------------------------------------------------------------- |
| SaaS                                | Exactly one, named after the cluster.                                                     |
| Self-Managed, before version 8.10   | Exactly one, named after the cluster.                                                     |
| Self-Managed, version 8.10 or later | One for each [Physical Tenant](/self-managed/concepts/multi-tenancy/physical-tenants.md). |

Every Environment belongs to exactly one cluster. The tags of a cluster, such as `dev` or `prod`, appear on each of its Environments.

Learn more about [Environments](./environments.md).

## Clusters in SaaS

In SaaS, org admins create clusters in Camunda Hub. When you create a cluster, you choose its type, size, region, and version. The type defines the availability and uptime of the cluster, and the size defines its capacity.

Learn more about [SaaS clusters](/components/saas/clusters.md), including cluster types, sizes, and Free Trial clusters.

## Clusters in Self-Managed

In Self-Managed, you provision clusters outside Camunda Hub, and you don't create them in Camunda Hub. To show a cluster and its Environments in Camunda Hub, add it to the Camunda Hub configuration.

Learn more about [Environments in the Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#environments).

## Manage clusters

Org admins and DevOps users manage clusters in Camunda Hub, for example to rename, resume, update, or resize a cluster in SaaS.

- [Manage clusters](/components/hub/organization/manage-clusters/index.md)
- [Create a cluster](/components/hub/organization/manage-clusters/create-cluster.md)

## Next steps

- Read about [Environments](./environments.md), [workspaces](./workspaces.md), and [projects](./projects.md).
- Learn how [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) isolate teams inside a cluster.
