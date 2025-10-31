---
id: saas
title: Camunda 8 SaaS
description: "Learn about Camunda 8 SaaS, the fully managed cloud-based service requiring no technical setup or installation, with maintenance and scaling is handled by Camunda."
---

import SaasComplianceImg from './img/saas-compliance.png';

Run Camunda 8 as a fully managed, cloud-based service. No technical setup or installation is needed, and maintenance and scaling is handled by Camunda.

:::warning
This documentation is a work in progress and may contain incomplete, placeholder, or evolving content.
:::

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

- Management cluster components Console and Web Modeler are hosted in GCP in the _europe-west1_ [region](/components/saas/regions.md).
- Orchestration cluster components such as Zeebe, Tasklist, Operate, Optimize, and Connectors, are hosted in GCP or Amazon Web Services (AWS) regions. An Orchestration Cluster is a provided group of production-ready nodes that run Camunda 8.

Camunda 8 SaaS uses single-tenant clusters, with all data contained in a single tenant for easier administration and simpler security.

A cell-based architecture means that each cluster runs as dedicated processes in a separate cell isolated from all other clusters, allowing secure fault and workload separation. Scaling is achieved by deploying additional clusters for new use cases and/or teams.

:::note
Camunda Self-Managed also supports [multi-tenant](/components/concepts/multi-tenancy.md) clusters, where multiple tenants share the same underlying infrastructure, but with their data logically isolated. Each data entry (for example, process definition, process instance, job) is appended with a tenant ID to ensure separation.
:::

### Zeebe

The [Zeebe](/components/zeebe/zeebe-overview.md) core process automation engine that powers Camunda 8 is fully managed by Camunda in SaaS, and is already pre-integrated with other Camunda 8 components such as Operate, Optimize, and Tasklist.

You can interact with Zeebe in SaaS using both gRPC and REST APIs. See [working with APIs and tools](/apis-tools/working-with-apis-tools.md).

### Deployment

You can configure a number of deployment options to meet your specific business and hosting requirements. For example, you can choose where to host your data and what level of data encryption to use.

| Deployment option                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Cluster](/components/concepts/clusters.md)                  | <p>Configure the cluster [type](/components/concepts/clusters.md#cluster-type) and [size](/components/concepts/clusters.md#cluster-size) to meet your organization's availability and scalability needs, and to provide control over cluster performance, [availability and uptime](/components/concepts/clusters.md#cluster-availability-and-uptime), and disaster recovery guarantees.</p><p>To learn more about choosing your cluster size, see [sizing your runtime environment](/components/best-practices/architecture/sizing-your-environment.md#sizing-your-runtime-environment).</p>                                                                                               |
| [Region](/components/saas/regions.md)                        | Choose the region and type of hosting you want to use for your clusters. GCP and AWS region hosting options are available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [Encryption at rest](/components/saas/encryption-at-rest.md) | <p>Cluster data is encrypted at rest to provide data security and protection.</p><p><ul><li><p>By default, Camunda 8 SaaS GCP and AWS cluster data at rest is protected with a provider-managed encryption key using GCP encryption. The encryption key is owned and managed by GCP.</p></li><li><p>Enterprise customers requiring a higher level of protection can select a dedicated Camunda-managed software or hardware (HSM) encryption key when creating a new GCP cluster. The encryption key is managed by Camunda using Google Cloud Key Management Service (KMS).</p></li><li><p>Camunda-managed encryption is not currently supported for AWS region clusters.</p></li></ul></p> |
| [Backups](/components/saas/backups.md)                       | Back up the state of all Camunda 8 components (Zeebe, Operate, Tasklist, and Optimize) on a regular basis and with zero downtime. In case of failures that lead to data loss, you can request to restore the backup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [Auto-updates](/components/saas/auto-updates.md)             | Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster is updated once a new patch release is available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Monitoring

Camunda 8 SaaS offers a number of monitoring options to help you keep track of your processes and system health.

| Monitoring option                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Operate](/components/operate/operate-introduction.md)                                            | Operate allows you to monitor, manage, and troubleshoot process instances in Camunda 8. It allows you to monitor, search, and resolve [incidents](/components/operate/userguide/resolve-incidents-update-variables.md) across your tenants.                                                                                                                                                          |
| [Optimize alerts](/components/optimize/improve-processes-with-optimize.md#alerts)                 | Optimize allows you to create alerts for reports within a collection. These alerts can notify you when a report hits a predefined critical value. For SaaS users, alerts can be sent to the email addresses of Console users.                                                                                                                                                                        |
| [Usage alerts](/components/console/manage-organization/usage-alerts.md)                           | For Starter and Enterprise organizations, Camunda 8 SaaS provides usage alerts for production clusters. <p><ul><li><p>Organization owners and admins can set up alerts for process instances, decision instances, and task users.</p></li><li><p>These alerts are triggered when usage reaches a defined threshold, and notifications are sent via email and in-app notifications.</p></li></ul></p> |
| [Flow control](/self-managed/operational-guides/configure-flow-control/configure-flow-control.md) | Flow control is enabled by default to protect SaaS clusters from excessive load and to maintain a stable state. This feature helps in monitoring and managing cluster performance.                                                                                                                                                                                                                   |
| [Usage metrics](/reference/data-collection/usage-metrics.md)                                      | There are three main usage metrics that have an impact on Camunda 8 pricing. It is important to understand these definitions, their impact on billing, and how to retrieve them.                                                                                                                                                                                                                     |
| [Camunda 8 SaaS status](/components/saas/status.md)                                               | Camunda provides a status page where you can check the current and past service availability of Camunda 8 SaaS. You can also subscribe to updates via Atom and RSS feeds to receive notifications about service status changes.                                                                                                                                                                      |

## Security and compliance

### Compliance

<p><a title="Find a Camunda connector" href="https://camunda.com/trust-center/" target="_new"><img src={SaasComplianceImg} alt="Visit the Camunda Trust Center" style={{border:0,padding:0,paddingLeft:20,margin:0,float: 'right', width: '25%'}} className="fade-in-top-image" title="Visit the Camunda Trust Center"/></a>At Camunda, we're committed to Information Security, Privacy and Compliance. Our mission is to establish trust through transparency.</p>

- Visit the [Camunda Trust Center](https://camunda.com/trust-center/) to learn more about our standards and certifications, including SOC 2 compliance, ISO/IEC 27001 certification, and GDPR Compliance.
- Camunda is a member of the [Cloud Security Alliance](https://cloudsecurityalliance.org/star/registry/camunda/services/camunda).

### Data retention

In Camunda 8 SaaS, [data retention](/components/saas/data-retention.md) strategies are implemented. This is necessary as the amount of data can grow significantly overtime. These settings are a balance between performance and usability.

### Data locations

See [data locations](data-locations.md) to learn more about where your Camunda 8 SaaS data is located and how data is handled.

### Access controls

Camunda 8 SaaS supports the following access controls.

| Access control type                                                                                                   | Description                                                                                                                                                                                                                                      |
| :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Single sign-on (SSO)](/components/console/manage-organization/external-sso.md)                                       | SSO is available for both Starter and Enterprise plans, using Identity as a bridge between an OpenID Connect (OIDC) provider and the Camunda platform.                                                                                           |
| [OAuth](/components/console/manage-clusters/manage-api-clients.md)                                                    | The OAuth service is used to allow client applications to interact with Zeebe in SaaS from the outside. Every client application must authenticate itself using an OAuth Flow.                                                                   |
| [Role based access (RBAC)](/components/console/manage-organization/manage-users.md)                                   | <p>Camunda 8 SaaS supports RBAC through a system of roles and permissions.</p><p>Each role provides a different level of access to Camunda 8 components, allowing organizations to control user permissions based on their responsibilities.</p> |
| [Resource-based authorization](/components/console/manage-organization/manage-users.md#resource-based-authorizations) | Resource authorizations allow you to control the level of access a user has to a particular resource in the system.                                                                                                                              |

:::note
In Enterprise plans, the hostname section of the email address for invites can be restricted to meet your internal security policies. To learn more, contact your Customer Success Manager.
:::
