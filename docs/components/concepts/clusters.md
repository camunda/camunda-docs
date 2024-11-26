---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda 8 plan."
---

A [cluster](../../guides/create-cluster.md) is a provided group of production-ready nodes that run Camunda 8.

When [creating a cluster in SaaS](/components/console/manage-clusters/create-cluster.md), you can choose the cluster **type** and **size** to meet your organization's availability and scalability needs, and to provide control over cluster performance, uptime, and disaster recovery guarantees.

:::note

Prior to 8.6, clusters were configured by hardware size (S, M, L).

- This documentation covers the SaaS cluster model introduced in 8.6. To learn more about clusters prior to 8.6, see previous documentation versions.
- To learn how you can migrate your existing clusters to the newer model, contact your Customer Success Manager.

:::

## Cluster type

The cluster type defines the level of availability and uptime for the cluster.

You can choose from three different cluster types:

- **Basic**: A cluster for non-production use, including experimentation, early development, and basic use cases that do not require a guaranteed high uptime.
- **Standard**: A production-ready cluster with guaranteed higher uptime.
- **Advanced**: A production-ready cluster with guaranteed minimal disruption and the highest uptime.

### Cluster availability and uptime

| Type                                                                        | Basic                                                                                  | Standard                                                  | Advanced                                                                              |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| Usage                                                                       | Non-production use, including experimentation, early development, and basic use cases. | Production-ready use cases with guaranteed higher uptime. | Production-ready use cases with guaranteed minimal disruption and the highest uptime. |
| Uptime Percentage<br/> (Orchestration Cluster<strong>\*</strong>)           | 99%                                                                                    | 99.5%                                                     | 99.9%                                                                                 |
| RTO/RPO<strong>\*\*</strong><br/>(Orchestration Cluster<strong>\*</strong>) | RTO: 8 hours<br/>RPO: 24 hours                                                         | RTO: 2 hours<br/>RPO: 4 hours                             | RTO: < 1 hour<br/>RPO: < 1 hour                                                       |

<p><strong>* Orchestration Cluster</strong> means the components critical for automating processes and decisions, such as Zeebe, Operate, Tasklist, Optimize, and Connectors.</p>
<p><strong>**  RTO (Recovery Time Objective)</strong> means the maximum allowable time that a system or application can be down after a failure or disaster before it must be restored. It defines the target time to get the system back up and running. <strong>RPO (Recovery Point Objective)</strong> means the maximum acceptable amount of data loss measured in time. It indicates the point in time to which data must be restored to resume normal operations after a failure. It defines how much data you can afford to lose. The RTO/RPO figures shown in the table are provided on a best-effort basis and are not guaranteed.</p>

:::info
See [Camunda Enterprise General Terms](https://legal.camunda.com/licensing-and-other-legal-terms#camunda-enterprise-general-terms) for term definitions for **Monthly Uptime Percentage** and **Downtime**.
:::

## Cluster size

The cluster size defines the cluster performance and capacity.

After you have chosen your cluster type, choose the cluster size that best meets your cluster environment requirements.

To learn more about choosing your cluster size, see [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md#sizing-your-runtime-environment).

- You can choose from four cluster sizes: 1x, 2x, 3x, and 4x.
- Larger cluster sizes include increased performance and capacity, allowing you to serve more workload.
- Increased usage such as higher throughput or longer data retention requires a larger cluster size.
- Each size increase uses one of your available cluster reservations. For example, purchasing two HWP advanced reservations for your production cluster allows you to configure two clusters of size 1x, or one cluster of size 2x.
- You can change the cluster size at any time. See [resize a cluster](/components/console/manage-clusters/manage-cluster.md#resize-a-cluster).

:::note
Contact your Customer Success Manager to increase the cluster size beyond the maximum 4x size. This requires custom sizing and pricing.
:::

## Free Trial clusters

Free Trial clusters have the same functionality as a production cluster, but are of a Basic type and 1x size, and only available during your trial period. You cannot convert a Free Trial cluster to a different type of cluster.

Once you sign up for a Free Trial, you are able to create one production cluster for the duration of your trial.

When your Free Trial plan expires, you are automatically transferred to the Free plan. This plan allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster created during your trial is deleted, and you cannot create new clusters.

### Auto-pause

Free Trial clusters are automatically paused after a period of inactivity. Auto-pause occurs regardless of cluster usage.

You can resume a paused cluster at any time, which typically takes five to ten minutes to complete. See [resume a cluster](/components/console/manage-clusters/manage-cluster.md#resume-a-cluster).

- Clusters tagged as `dev` (or untagged) auto-pause eight hours after the cluster is created or resumed from a paused state.
- Clusters tagged as `test`, `stage`, or `prod` auto-pause if there is no cluster activity for 48 hours.
- Cluster disk space is cleared when a trial cluster is paused.
  - You will need to redeploy processes to the cluster once it is resumed from a paused state.
  - Cluster configuration settings (for example, API Clients, Connector secrets, and IP allowlists) are saved so you can easily resume a cluster.

:::tip
To prevent auto-pause, [upgrade your Free Trial plan](https://camunda.com/pricing/) to a Starter or Enterprise plan.
:::
