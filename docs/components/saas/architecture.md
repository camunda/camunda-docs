---
id: architecture
title: SaaS architecture
sidebar_label: Architecture
description: "Learn how Camunda 8 SaaS is built, including how clusters and Zeebe run on the managed platform."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Clusters

The Camunda 8 SaaS platform is built on Amazon Web Services (AWS) and based on a microservices architecture.

Camunda Hub is hosted in AWS in the eu-central-1 [region](/components/saas/regions.md). It is where you manage your organization, workspaces, environments, and clusters.

Your processes run on [clusters](/components/saas/clusters.md). Each cluster hosts one or more environments, and you choose its [type](/components/saas/clusters.md#cluster-type) and [size](/components/saas/clusters.md#cluster-size) when you create it. A cluster runs the Orchestration Cluster components such as Zeebe, Tasklist, Operate, Optimize, and Connectors in GCP or Amazon Web Services (AWS) regions. An Orchestration Cluster is a provided group of production-ready nodes that run Camunda 8.

By default, each cluster serves a single [logical tenant](/components/concepts/multi-tenancy.md), with all data associated with the `<default>` tenant.

A cell-based architecture means that each cluster runs as dedicated processes in a separate cell isolated from all other clusters, allowing secure fault and workload separation. Scaling is achieved by deploying additional clusters for new use cases and/or teams.

:::note
On clusters running generation 8.8 and later, you can enable [logical multi-tenancy](/components/concepts/multi-tenancy.md) to serve multiple logical tenants from the same cluster. The tenants share the cluster infrastructure, and their data is logically isolated. Each data entry (for example, process definition, process instance, job) is appended with a tenant ID to ensure separation.
:::

### Cluster options

| Cluster option                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Cluster](/components/saas/clusters.md)          | <p>Configure the cluster [type](/components/saas/clusters.md#cluster-type) and [size](/components/saas/clusters.md#cluster-size) to meet your organization's availability and scalability needs, and to provide control over cluster performance and [availability and uptime](/components/saas/clusters.md#cluster-availability-and-uptime).</p><p>To learn more about choosing your cluster size, see [sizing your runtime environment](/components/best-practices/architecture/sizing-your-environment.md).</p> |
| [Auto-updates](/components/saas/auto-updates.md) | Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster is updated once a new patch release is available.                                                                                                                                                                                                                                                                                                                                                                                      |

## Zeebe

The [Zeebe](/components/zeebe/zeebe-overview.md) core process automation engine that powers Camunda 8 is fully managed by Camunda in SaaS, and is already pre-integrated with other Camunda 8 components such as Operate, Optimize, and Tasklist.

You can interact with Zeebe in SaaS using both gRPC and REST APIs. See [working with APIs and tools](/apis-tools/working-with-apis-tools.md).
