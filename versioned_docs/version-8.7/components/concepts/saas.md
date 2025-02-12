---
id: saas
title: "Camunda 8 SaaS"
description: "Learn about Camunda 8 SaaS, the fully managed cloud-based service requiring no technical setup or installation, with maintenance and scaling is handled by Camunda."
---

import SaasArchitectureImg from './assets/saas-architecture.png';

Camunda 8 SaaS allows you to run Camunda 8 as a fully managed cloud-based service requiring no technical setup or installation, with all maintenance and scaling handled by Camunda.

:::note
Choose [Camunda 8 Self-Managed](/self-managed/about-self-managed.md) if you want to deploy and manage the Camunda platform on your own infrastructure, with responsibility for updates, security, and scaling.
:::

## Get started

## Architecture

The Camunda 8 SaaS platform is built on the Google Cloud Platform (GCP) and based on a micro-services architecture.

<img src={SaasArchitectureImg} alt="World map showing the location of each GCP and AWS region" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

### Clusters

There are two types of [cluster](/components/concepts/clusters.md) used when running Camunda 8 SaaS:

- Management cluster components Console and Web Modeler are hosted in GCP in the _europe-west1_ [region](/reference/regions.md).
- Orchestration cluster components such as Zeebe, Tasklist, Operate, Optimize, and Connectors, are hosted in GCP or Amazon Web Services (AWS) regions. An orchestration cluster is a provided group of production-ready nodes that run Camunda 8.

Camunda 8 SaaS uses single-tenant clusters, with all data contained in a single tenant for easier administration and simpler security.

- A cell-based architecture means that each C8 cluster runs as dedicated processes in a separate cell isolated from all other clusters.
- This allows secure fault and workload separation, with scaling achieved by deploying additional clusters for new use cases and/or teams.

:::note
Camunda Self-Managed also supports [multi-tenant](/self-managed/concepts/multi-tenancy.md) clusters, where multiple tenants share the same underlying infrastructure, but with their data logically isolated. Each data entry (for example, process definition, process instance, job) is appended with a tenant ID to ensure separation.
:::

### Zeebe

The [Zeebe](/components/zeebe/zeebe-overview.md) core process automation engine that powers Camunda 8 is fully managed by Camunda in SaaS, and is already pre-integrated with other Camunda 8 components such as Operate, Optimize, and Tasklist.

You can interact with Zeebe in SaaS using both gRPC and REST APIs. See [working with APIs and tools](/apis-tools/working-with-apis-tools.md).

### Deployment

You can configure a number of deployment options to meet your specific business and hosting requirements. For example, you can choose where to host your data and what level of data encryption to use.

| Deployment option                           | Description                                                                                                                                                                                                                                                                                 |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Cluster](/components/concepts/clusters.md) | Configure the cluster **type** and **size** to meet your organization's availability and scalability needs, and to provide control over cluster performance, [availability and uptime](/components/concepts/clusters.md#cluster-availability-and-uptime), and disaster recovery guarantees. |
| [Hosting and region](/reference/regions.md) | Choose the region and type of hosting you want to use for your clusters. Google Cloud Platform (GCP) and Amazon Web Services (AWS) region hosting options are supported.                                                                                                                    |

### Data storage

Content

### Monitoring
