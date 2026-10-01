---
id: clusters
title: "Clusters"
description: "A cluster is the infrastructure that runs Camunda 8. Learn how clusters relate to environments, workspaces, and Physical Tenants."
---

A cluster is the infrastructure that runs Camunda 8. It includes the Orchestration Cluster that automates your processes, and the components that run alongside it, such as connectors and Optimize.

In Camunda Hub, a cluster is an administrative unit: the infrastructure that organization admins create, size, and maintain. Teams don't deploy to a cluster directly. They deploy to an [environment](./environments.md) hosted on it.

## Clusters and environments

A cluster is an administrative unit, and an environment is an operational unit. Organization admins create, size, update, and back up clusters. Teams deploy and run processes in the environments that are assigned to their [workspace](./workspaces.md).

| Cluster                             | Environments of the cluster                                                               |
| :---------------------------------- | :---------------------------------------------------------------------------------------- |
| SaaS                                | Exactly one, named after the cluster.                                                     |
| Self-Managed, before version 8.10   | Exactly one, named after the cluster.                                                     |
| Self-Managed, version 8.10 or later | One for each [Physical Tenant](/self-managed/concepts/multi-tenancy/physical-tenants.md). |

Every environment belongs to exactly one cluster. The tags of a cluster, such as `dev` or `prod`, appear on each of its environments.

Learn more about [environments](./environments.md).

## Clusters in SaaS

In SaaS, organization admins create clusters in Camunda Hub. When you create a cluster, you choose its type, size, region, and version. The type defines the availability and uptime of the cluster, and the size defines its capacity.

Learn more about [SaaS clusters](/components/saas/clusters.md), including cluster types, sizes, and Free Trial clusters.

## Clusters in Self-Managed

In Self-Managed, you provision clusters outside Camunda Hub, and you don't create them in Camunda Hub. To show a cluster and its environments in Camunda Hub, add it to the Camunda Hub configuration.

Learn more about [clusters in Self-Managed](/components/hub/organization/manage-clusters/self-managed-clusters.md) and [environments in the Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#environments).

## Manage clusters

How you manage clusters in Camunda Hub depends on your deployment:

- In SaaS, organization admins and DevOps users [manage clusters](/components/saas/clusters/manage-cluster.md), for example to rename, resume, update, or resize a cluster, and [create a cluster](/components/saas/clusters/create-cluster.md).
- In Self-Managed, you provision clusters outside Camunda Hub, and Camunda Hub shows them. See [clusters in Self-Managed](/components/hub/organization/manage-clusters/self-managed-clusters.md).

## Next steps

- Read about [environments](./environments.md), [workspaces](./workspaces.md), and [projects](./projects.md).
- Learn how [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) isolate teams inside a cluster.
