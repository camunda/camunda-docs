---
id: architecture
title: SaaS architecture
sidebar_label: Architecture
description: "Learn how Camunda 8 SaaS is built, including how clusters and Zeebe run on the managed platform."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

The Camunda 8 SaaS platform is built on Amazon Web Services (AWS) and based on a microservices architecture.

## Clusters

There are two types of [cluster](/components/concepts/clusters.md) used when running Camunda 8 SaaS:

- Management cluster components Console and Web Modeler are hosted in AWS in the eu-central-1 [region](/components/saas/regions.md).
- Orchestration cluster components such as Zeebe, Tasklist, Operate, Optimize, and Connectors, are hosted in GCP or Amazon Web Services (AWS) regions. An Orchestration Cluster is a provided group of production-ready nodes that run Camunda 8.

Camunda 8 SaaS uses single-tenant clusters, with all data contained in a single tenant for easier administration and simpler security.

A cell-based architecture means that each cluster runs as dedicated processes in a separate cell isolated from all other clusters, allowing secure fault and workload separation. Scaling is achieved by deploying additional clusters for new use cases and/or teams.

:::note
Camunda Self-Managed also supports [multi-tenant](/components/concepts/multi-tenancy.md) clusters, where multiple tenants share the same underlying infrastructure, but with their data logically isolated. Each data entry (for example, process definition, process instance, job) is appended with a tenant ID to ensure separation.
:::

## Zeebe

The [Zeebe](/components/zeebe/zeebe-overview.md) core process automation engine that powers Camunda 8 is fully managed by Camunda in SaaS, and is already pre-integrated with other Camunda 8 components such as Operate, Optimize, and Tasklist.

You can interact with Zeebe in SaaS using both gRPC and REST APIs. See [working with APIs and tools](/apis-tools/working-with-apis-tools.md).

## Deployment

You can configure a number of deployment options to meet your specific business and hosting requirements. For example, you can choose where to host your data and what level of data encryption to use.

| Deployment option                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Cluster](/components/concepts/clusters.md)                                            | <p>Configure the cluster [type](/components/concepts/clusters.md#cluster-type) and [size](/components/concepts/clusters.md#cluster-size) to meet your organization's availability and scalability needs, and to provide control over cluster performance and [availability](/components/concepts/clusters.md#cluster-availability-and-uptime).</p><p>To learn more about choosing your cluster size, see [sizing your runtime environment](/components/best-practices/architecture/sizing-saas.md#determine-your-cluster-size).</p>                                                                                                                                                         |
| [Region](/components/saas/regions.md)                                                  | Choose the region and type of hosting you want to use for your clusters. GCP and AWS region hosting options are available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [Encryption at rest](/components/saas/encryption-at-rest.md)                           | <p>Cluster data is encrypted at rest to provide data security and protection.</p><p><ul><li><p>By default, Camunda 8 SaaS GCP and AWS cluster data at rest is protected with a provider-managed encryption key using GCP encryption. The encryption key is owned and managed by GCP.</p></li><li><p>Enterprise customers requiring a higher level of protection can select a dedicated Camunda-managed software or hardware (HSM) encryption key when creating a new GCP cluster. The encryption key is managed by Camunda using Google Cloud Key Management Service (KMS).</p></li><li><p>Camunda-managed encryption is not currently supported for AWS region clusters.</p></li></ul></p> |
| [Backups](/components/saas/backups.md)                                                 | Back up the state of all Camunda 8 components (Zeebe, Operate, Tasklist, and Optimize) on a regular basis and with zero downtime. In case of failures that lead to data loss, you can restore the cluster from a backup. See [backup and restore overview](/components/saas/backup-restore-overview.md).                                                                                                                                                                                                                                                                                                                                                                                    |
| [Auto-updates](/components/saas/auto-updates.md)                                       | Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster is updated once a new patch release is available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Secure connectivity (AWS PrivateLink)](/components/saas/secure-connectivity/index.md) | Enable private inbound connectivity from your VPC to AWS-hosted Orchestration Clusters using AWS PrivateLink. Available for Enterprise plans.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
