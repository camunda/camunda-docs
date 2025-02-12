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

## Architecture

The Camunda 8 SaaS platform is built on the Google Cloud Platform (GCP) and based on a micro-services architecture, with [clusters](/components/concepts/clusters.md) and [regions](/reference/regions.md).

<img src={SaasArchitectureImg} alt="World map showing the location of each GCP and AWS region" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}}/>

### Clusters

There are two types of cluster used when running Camunda 8 SaaS:

- Management cluster components Console and Web Modeler are hosted in GCP in the _europe-west1_ region.
- Orchestration cluster (user interface) components such as Zeebe, Tasklist, Operate, Optimize, and Connectors can be hosted in either GCP or Amazon Web Services (AWS) regions. An orchestration cluster is a provided group of production-ready nodes that run Camunda 8.

Camunda 8 SaaS uses single-tenant clusters where all data is contained within a single tenant for easier administration and simplified security. A cell-based architecture means that each C8 cluster runs as dedicated processes in a separate cell isolated from all other clusters, allowing secure fault and workload separation. Scaling is achieved by deploying additional clusters for new use cases or teams.

:::note
Camunda Self-Managed also supports [multi-tenant](/self-managed/concepts/multi-tenancy.md) clusters, where multiple tenants share the same underlying infrastructure, but with their data logically isolated. Each data entry (for example, process definition, process instance, job) is appended with a tenant ID to ensure separation.
:::
