---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda 8 plan."
---

A [cluster](/components/hub/organization/manage-clusters/create-cluster.md) is a provided group of production-ready nodes that run Camunda 8.

When [creating a cluster in SaaS](/components/hub/organization/manage-clusters/create-cluster.md), you can choose the cluster **type** and **size** to meet your organization's availability and scalability needs, and to provide control over cluster performance, uptime, and disaster recovery objectives.

## Cluster type

The cluster type defines the level of availability and uptime for the cluster.

You can choose from three different cluster types:

- **Basic**: A cluster for non-production use, including experimentation, early development, and basic use cases that do not require a guaranteed high uptime.
- **Standard**: A production-ready cluster with guaranteed higher uptime.
- **Advanced**: A production-ready cluster with guaranteed minimal disruption and the highest uptime.

### Cluster availability and uptime

| Type                                                             | Basic                                                                                  | Standard                                                  | Advanced                                                                              |
| :--------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| Usage                                                            | Non-production use, including experimentation, early development, and basic use cases. | Production-ready use cases with guaranteed higher uptime. | Production-ready use cases with guaranteed minimal disruption and the highest uptime. |
| Uptime percentage<br/>(Orchestration Cluster<strong>\*</strong>) | 99%                                                                                    | 99.5%                                                     | 99.9%                                                                                 |

<p><strong>* Orchestration Cluster</strong> means the components critical for automating processes and decisions, such as Zeebe, Operate, Tasklist, Optimize, and connectors.</p>

:::info
See [Camunda Enterprise General Terms](https://legal.camunda.com/licensing-and-other-legal-terms#camunda-enterprise-general-terms) for term definitions for **Monthly Uptime Percentage** and **Downtime**.
:::

### SLA versus RTO and RPO

An uptime SLA and RTO/RPO targets measure different things. Keep them separate when you evaluate a cluster type for disaster recovery planning.

- **Uptime percentage (SLA)** is a contractual commitment that measures how much of the time, in a given month, the service is available and responsive. It doesn't describe what happens during or immediately after an outage.
- **RTO (Recovery Time Objective)** measures how long a failure disrupts service, from the moment it starts affecting your cluster until the cluster is fully functional again.
- **RPO (Recovery Point Objective)** measures how much data you can lose when that failure happens, expressed as the time between the last recoverable point and the failure.

A high uptime percentage doesn't imply a fast recovery or minimal data loss during a major infrastructure failure. Uptime percentage tells you how rarely a failure disrupts your cluster; RTO and RPO tell you how well the cluster recovers when a major failure does happen. See [how Camunda SaaS recovers from node, zone, and region failures](#how-camunda-saas-recovers-from-node-zone-and-region-failures) for the RTO and RPO of each failure scenario.

## How Camunda SaaS recovers from node, zone, and region failures

Camunda 8 SaaS sets recovery objectives for each type of outage, based on how much infrastructure the outage affects. These objectives describe expected behavior on a best-effort basis and aren't contractual commitments.

| Outage              | RPO                                                           | RTO                                          | Recovery                           | Requirement                 |
| :------------------ | :------------------------------------------------------------ | :------------------------------------------- | :--------------------------------- | :-------------------------- |
| Node                | Zero                                                          | Near zero                                    | Automatic                          | None                        |
| Availability zone   | Zero                                                          | Near zero                                    | Automatic                          | None                        |
| Region              | Time since the last backup replicated to the secondary region | Depends on provisioning time and data volume | Manual cold recovery by Camunda    | Dual-region backup location |
| Cloud provider-wide | Not defined                                                   | Not defined                                  | Depends on the provider's recovery | Not available               |

Your application's overall recovery time also depends on your own job workers and clients being able to reach the cluster and continue processing.

### Node failure

A node failure is the loss of a single Zeebe broker (or other component instance) within a cluster. Camunda SaaS orchestration clusters replicate each partition across multiple brokers using [Raft consensus](/components/zeebe/technical-concepts/clustering.md), typically one broker per availability zone. When a single broker fails, the remaining brokers already hold every committed record and automatically elect a new leader for the affected partitions.

**RTO/RPO assessment:** RPO is zero, because every committed record is already replicated to the remaining brokers. RTO is near zero. Partition leader election typically completes within seconds, and clients recover through their standard retry mechanisms.

**Your responsibilities:** Configure your clients and job workers to retry failed requests. Run job workers across multiple availability zones so that the same outage doesn't disrupt them.

### Availability zone failure

An availability zone (AZ) failure is the loss of an entire zone in the cluster's region, taking every broker hosted there down at once. Basic, Standard, and Advanced clusters use a replication factor of three spread across three availability zones, so losing one zone still leaves a quorum of two zones able to confirm writes.

**RTO/RPO assessment:** RPO is zero, because the remaining zones already hold every committed record. RTO is near zero. Failover is automatic, doesn't require a restore, and clients recover through their standard retry mechanisms. While the zone is unavailable, the cluster runs with reduced redundancy. A second failure in another zone before recovery can cause partitions to lose quorum.

**Your responsibilities:** Configure your clients and job workers to retry failed requests. Run job workers across multiple availability zones so that the same outage doesn't disrupt them.

### Region failure

A region failure is the loss of every availability zone in the cluster's region at once, for example, during a regional cloud provider outage. Camunda SaaS clusters run in a [single region](/components/saas/regions.md). By default, backups are stored in the same region as the cluster. If you select a [dual-region backup location](/components/saas/backups.md#backup-location), backups are also replicated to the secondary backups region. Self-service [restore is limited to the same cluster, organization, and region](/components/saas/backup-restore-overview.md#limitations-and-constraints). For some region pairs, Camunda can perform a cold recovery to the secondary backups region.

**RTO/RPO assessment:** Recovery from a region failure is a manual, user initiated cold recovery, the same strategy as the Cold Recovery tier in [multi-region resilience](/self-managed/concepts/multi-region/resilience-tiers.md) for Self-Managed. Camunda provisions a new cluster in the secondary backups region and restores it from the replicated backup. Without dual-region backups, recovery to another region isn't possible.

- **RPO** is the time between the most recent backup replicated to the secondary region and the failure. Your backup schedule determines this value.
- **RTO** is the time needed to provision the new cluster, restore its data, and reconnect your applications. Restore duration depends on cluster data volume. The recovered cluster has new endpoints, so you must update your client configuration.

**Your responsibilities:** Choose a dual-region backup location when you create the cluster. Set a backup schedule that matches the data loss you can tolerate. Plan how you'll point your clients and job workers at the recovered cluster's new endpoints.

### Cloud provider-wide outage

A cloud provider-wide outage affects several regions of the same cloud provider at once, or prevents the provider from starting or replacing infrastructure. Camunda SaaS clusters run on a single cloud provider and can't fail over to another provider.

**RTO/RPO assessment:** Clusters stay unavailable until the provider recovers, so Camunda doesn't set an RTO or RPO for this type of outage. Camunda follows its incident response process and publishes updates on the [Camunda status page](/components/saas/status.md).

## Cluster size

The cluster size defines the cluster performance and capacity.

After you have chosen your cluster type, choose the cluster size that best meets your cluster environment requirements.

To learn more about choosing your cluster size, see [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md#sizing-your-runtime-environment).

- You can choose from four cluster sizes: 1x, 2x, 3x, and 4x.
- Larger cluster sizes include increased performance and capacity, allowing you to serve more workload.
- Increased usage such as higher throughput or longer data retention requires a larger cluster size.
- Each size increase uses one of your available cluster reservations. For example, purchasing two HWP advanced reservations for your production cluster allows you to configure two clusters of size 1x, or one cluster of size 2x.
- You can change the cluster size at any time. See [resize a cluster](/components/hub/organization/manage-clusters/manage-cluster.md#resize-a-cluster).

:::note
To increase the cluster size beyond the maximum 4x size, [reach out to Camunda](https://camunda.com/contact-us/). This requires custom sizing and pricing.
:::

## Free Trial clusters

Free Trial clusters have the same functionality as a production cluster, but are of a Basic type and 1x size, and only available during your trial period. You cannot convert a Free Trial cluster to a different type of cluster.

Once you sign up for a Free Trial, you are able to create one production cluster for the duration of your trial.

When your Free Trial plan expires, you are automatically transferred to the Free plan. This plan allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster created during your trial is deleted, and you cannot create new clusters.

### Auto-pause

Free Trial clusters are automatically paused after a period of inactivity. Auto-pause occurs regardless of cluster usage.

You can resume a paused cluster at any time, which typically takes five to ten minutes to complete. See [resume a cluster](/components/hub/organization/manage-clusters/manage-cluster.md#resume-a-cluster).

- Clusters tagged as `dev` (or untagged) auto-pause eight hours after the cluster is created or resumed from a paused state.
- Clusters auto-pause if there is no cluster activity for 48 hours.
- Cluster disk space is cleared when a trial cluster is paused.
  - You will need to redeploy processes to the cluster once it is resumed from a paused state.
  - Cluster configuration settings (for example, API Clients, connector secrets, and IP allowlists) are saved so you can easily resume a cluster.

:::tip
To prevent auto-pause, [upgrade your Free Trial plan](https://camunda.com/pricing/) to an Enterprise plan.
:::
