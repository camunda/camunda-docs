---
id: saas
title: Camunda 8 SaaS
description: "Learn about Camunda 8 SaaS, the fully managed cloud-based service requiring no technical setup or installation, with maintenance and scaling handled by Camunda."
---

Run Camunda 8 as a fully managed, cloud-based service. No technical setup or installation is needed, and maintenance and scaling is handled by Camunda.

:::tip
Use [Camunda 8 Self-Managed](/self-managed/about-self-managed.md) if you want to deploy and manage Camunda on your own infrastructure, with responsibility for updates, security, and scaling.
:::

## Sign up

Sign up and start your developer journey with Camunda 8 SaaS.

1. Visit [accounts.cloud.camunda.io/signup](https://accounts.cloud.camunda.io/signup) to sign up.
1. Fill out the signup form and click **Create account**.
1. Click on the link in your confirmation email to verify your email address.
1. Log in to Camunda 8 SaaS using either the email address and password you signed up with or the social login buttons. You can also log in to Camunda 8 SaaS directly at [camunda.io](https://weblogin.cloud.camunda.io/).

## Architecture

The Camunda 8 SaaS platform is built on Google Cloud Platform (GCP) and based on a microservices architecture.

### Clusters

There are two types of [cluster](/components/concepts/clusters.md) used when running Camunda 8 SaaS:

- Camunda Hub is hosted in GCP in the _europe-west1_ [region](/reference/regions.md).
- Orchestration cluster components such as Zeebe, Tasklist, Operate, Optimize, and Connectors, are hosted in GCP or Amazon Web Services (AWS) regions. An Orchestration Cluster is a provided group of production-ready nodes that run Camunda 8.

Camunda 8 SaaS uses single-tenant clusters, with all data contained in a single tenant for easier administration and simpler security.

### Zeebe

The [Zeebe](/components/zeebe/zeebe-overview.md) core process automation engine that powers Camunda 8 is fully managed by Camunda in SaaS, and is already pre-integrated with other Camunda 8 components such as Operate, Optimize, and Tasklist.

You can interact with Zeebe in SaaS using both gRPC and REST APIs. See [working with APIs and tools](/apis-tools/working-with-apis-tools.md).

## Deployment

You can configure a number of deployment options to meet your specific business and hosting requirements. For example, you can choose where to host your data and what level of data encryption to use.

| Deployment option | Description |
| :--- | :--- |
| [Cluster](/components/concepts/clusters.md) | Configure the cluster type and size to meet your organization's availability and scalability needs. |
| [Region](/reference/regions.md) | Choose the region and type of hosting you want to use for your clusters. GCP and AWS region hosting options are available. |
| [Encryption at rest](/components/concepts/encryption-at-rest.md) | Cluster data is encrypted at rest to provide data security and protection. |
| [Backups](/components/concepts/backups.md) | Back up the state of all Camunda 8 components on a regular basis and with zero downtime. |
| [Auto-updates](/reference/auto-updates.md) | Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster is updated once a new patch release is available. |

## Security and compliance

- Visit the [Camunda Trust Center](https://camunda.com/trust-center/) to learn more about our standards and certifications, including SOC 2 compliance, ISO/IEC 27001 certification, and GDPR Compliance.
- Camunda is a member of the [Cloud Security Alliance](https://cloudsecurityalliance.org/star/registry/camunda/services/camunda).

### Data retention

In Camunda 8 SaaS, [data retention](/components/concepts/data-retention.md) strategies are implemented. This is necessary as the amount of data can grow significantly over time.

### Data locations

See [data locations](/reference/data-locations.md) to learn more about where your Camunda 8 SaaS data is located and how data is handled.
