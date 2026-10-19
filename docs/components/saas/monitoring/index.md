---
id: overview
title: Monitoring
description: Learn how to monitor Camunda 8 SaaS Orchestration Clusters using a secure metrics endpoint and your existing monitoring and observability tools.
---

Use your own monitoring and observability tools to observe the health and performance of your Camunda 8 SaaS Orchestration Clusters.

## Monitoring options

Camunda 8 SaaS offers a number of monitoring options to help you keep track of your processes and system health.

| Monitoring option                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Operate](/components/operate/operate-introduction.md)                                            | Operate allows you to monitor, manage, and troubleshoot process instances in Camunda 8. It allows you to monitor, search, and resolve [incidents](/components/operate/userguide/resolve-incidents-update-variables.md) across your tenants.                                                                                                                                              |
| [Optimize alerts](/components/optimize/improve-processes-with-optimize.md#alerts)                 | Optimize allows you to create alerts for reports within a collection. These alerts can notify you when a report hits a predefined critical value. For SaaS users, alerts can be sent to the email addresses of Camunda Hub users.                                                                                                                                                        |
| [Usage alerts](/components/saas/organization/usage-alerts.md)                                     | For Enterprise organizations, Camunda 8 SaaS provides usage alerts for production clusters. <p><ul><li><p>Organization owners and admins can set up alerts for process instances, decision instances, and task users.</p></li><li><p>These alerts are triggered when usage reaches a defined threshold, and notifications are sent via email and in-app notifications.</p></li></ul></p> |
| [Flow control](/self-managed/operational-guides/configure-flow-control/configure-flow-control.md) | Flow control is enabled by default to protect SaaS clusters from excessive load and to maintain a stable state. This feature helps in monitoring and managing cluster performance.                                                                                                                                                                                                       |
| [Usage metrics](/reference/data-collection/usage-metrics.md)                                      | There are three main usage metrics that have an impact on Camunda 8 pricing. It is important to understand these definitions, their impact on billing, and how to retrieve them.                                                                                                                                                                                                         |
| [Camunda 8 SaaS status](/components/saas/status.md)                                               | Camunda provides a status page where you can check the current and past service availability of Camunda 8 SaaS. You can also subscribe to updates via Atom and RSS feeds to receive notifications about service status changes.                                                                                                                                                          |

## Cluster Metrics endpoint

Camunda provides a secure, customer-facing metrics endpoint that exposes aggregated cluster metrics for external consumption.

<p class="link-arrow">[Cluster Metrics endpoint](cluster-metrics-endpoint/index.md)</p>
