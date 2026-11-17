---
id: clusters
title: "Clusters"
description: "Learn more about the clusters available in your Camunda 8 plan."
---

A [cluster](/components/console/manage-clusters/create-cluster.md) is a provided group of production-ready nodes that run Camunda 8.

When [creating a cluster in SaaS](/components/console/manage-clusters/create-cluster.md), you can choose the cluster **type** and **size** to meet your organization's availability and scalability needs, and to provide control over cluster performance and availability.

## Cluster type

The cluster type defines the Availability Target for the cluster.

You can choose from three different cluster types:

- **Basic**: A cluster for non-production use, including experimentation, early development, and basic use cases that don't require a high Availability Target.
- **Standard**: A production-ready cluster with a higher Availability Target.
- **Advanced**: A production-ready cluster with the highest Availability Target.

### Cluster availability and uptime

| Type                                                               | Basic                                                                                  | Standard                                                      | Advanced                                                         |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------- |
| Usage                                                              | Non-production use, including experimentation, early development, and basic use cases. | A production-ready cluster with a higher Availability Target. | A production-ready cluster with the highest Availability Target. |
| Availability Target<br/>(Orchestration Cluster<strong>\*</strong>) | 99%                                                                                    | 99.5%                                                         | 99.9%                                                            |

<p><strong>* Orchestration Cluster</strong> means the core components for process automation and orchestration: Zeebe, Operate, Tasklist, Identity, and the Orchestration Cluster APIs (or any successor or renamed equivalent as specified in the Documentation from time to time).</p>

:::info
See the terms of your agreement with Camunda for the definitions of Availability Target, Downtime, and Excluded Downtime.
:::

## Recovery objectives by outage type

Camunda 8 SaaS sets Recovery Time Objective (RTO) and Recovery Point Objective (RPO) targets for each type of outage, based on how much infrastructure the outage affects. They don't vary by cluster type. These objectives, including those in the **Recovery objectives summary** table and the RTO/RPO assessments for each type of outage below, describe expected behavior on a best-effort basis. They aren't contractual commitments and are separate from the Availability Target.

### Availability Target versus recovery objectives

The Availability Target and recovery objectives measure different things. Keep them separate when you plan for disaster recovery.

- **The Availability Target** is a contractual commitment. It measures the percentage of minutes in a calendar month during which the Orchestration Cluster is available, based on connection checks by Camunda's monitoring system, as defined in your agreement with Camunda. It doesn't describe what happens during or immediately after an outage.
- **RTO (Recovery Time Objective)** measures how long a failure disrupts service, from the moment it starts affecting your cluster until the cluster is fully functional again. For outages that need manual recovery, RTO also includes the time to detect, escalate, and diagnose the problem.
- **RPO (Recovery Point Objective)** measures how much data you can lose when that failure happens, expressed as the time between the last recoverable point and the failure.

A high Availability Target doesn't imply a fast recovery or minimal data loss during a major infrastructure failure. The Availability Target tells you how rarely a failure disrupts your cluster; RTO and RPO tell you how well the cluster recovers when a major failure does happen.

### Recovery objectives summary

| Outage                                | RPO                            | RTO                                          | Recovery                            | Requirement                                            |
| :------------------------------------ | :----------------------------- | :------------------------------------------- | :---------------------------------- | :----------------------------------------------------- |
| Node                                  | Zero                           | Near zero                                    | Automatic                           | None                                                   |
| Availability zone                     | Zero                           | Near zero                                    | Automatic                           | None                                                   |
| Region                                | Time since the restored backup | Depends on data volume and reconnection time | Manual cold recovery that you start | Dual-region backup location in a supported region pair |
| Cloud provider or third-party service | Not defined                    | Not defined                                  | Depends on the provider's recovery  | Not available                                          |
| Platform or cluster incident          | Typically zero                 | Depends on the incident                      | Camunda incident response           | None                                                   |

Near zero means service resumes automatically, typically within seconds, without a backup restore. Requests in progress during that time can fail, so configure your clients and job workers to retry them, for example with exponential backoff.

Your application's overall recovery time also depends on your own job workers and clients being able to reach the cluster and continue processing.

### Node failure

A node failure is the loss of a single Zeebe broker or [secondary storage](/reference/glossary.md#secondary-storage) node within a cluster. Camunda SaaS clusters replicate each partition across multiple brokers, typically one broker per availability zone. When a single broker fails, the remaining brokers take over its partitions automatically, without data loss. Secondary storage is managed by Camunda and also replicated, so losing a single secondary storage node doesn't lose data. To learn more, see [clustering](/components/zeebe/technical-concepts/clustering.md).

**RTO/RPO assessment:** RPO is zero, because every committed record is already stored on the remaining nodes. RTO is near zero, and clients recover through their standard retry mechanisms.

**Your responsibilities:** Configure your clients and job workers to retry failed requests. Run job workers across multiple availability zones so that the same outage doesn't disrupt them.

### Availability zone failure

An availability zone (AZ) failure is the loss of an entire zone in the cluster's region, taking every broker hosted there down at once. All cluster types keep three copies of your data, one in each of three availability zones, so losing one zone leaves the cluster fully operational.

**RTO/RPO assessment:** RPO is zero, because the remaining zones already hold every committed record. RTO is near zero. Failover is automatic, doesn't require a restore, and clients recover through their standard retry mechanisms. While the zone is unavailable, the cluster runs with reduced redundancy. A second failure in another zone before recovery can make the cluster unavailable.

**Your responsibilities:** Configure your clients and job workers to retry failed requests. Run job workers across multiple availability zones so that the same outage doesn't disrupt them.

### Region failure

A region failure is the loss of every availability zone in the cluster's region at once, for example, during a regional cloud provider outage. Camunda SaaS clusters run in a [single region](/components/saas/regions.md). By default, backups are stored in the same region as the cluster. If you select a [dual-region backup location](/components/saas/backups.md#backup-location), backups are also replicated to the secondary backups region. For [supported region pairs](/components/saas/cross-region-cold-recovery.md#supported-region-pairs), you can then use [cross-region cold recovery](/components/saas/cross-region-cold-recovery.md) to recover the cluster in the secondary region.

**RTO/RPO assessment:** Recovery from a region failure is a manual cold recovery that you start in Console or the API. Camunda creates a new cluster in the recovery region and restores the backup you select. Without a dual-region backup location in a supported region pair, recovery to another region isn't possible.

- **RPO** is the time between the backup you restore and the failure. It depends on your backup schedule, on backups being created and replicated successfully, and on the restore point you select. A 15-minute backup schedule doesn't guarantee a 15-minute RPO.
- **RTO** is the time needed to detect the outage, start failover, restore the backup, and reconnect your applications. The more data your cluster holds, the longer the restore takes, which increases the RTO. The recovered cluster has new endpoints, so you must update your DNS or client configuration. Preparing network infrastructure in the recovery region in advance reduces the RTO.

**Your responsibilities:** Choose a dual-region backup location in a supported region pair when you create the cluster, and keep your backup schedule healthy. Prepare network infrastructure in the recovery region in advance. After failover, point your clients and job workers at the recovered cluster, and don't use the original cluster again. For the full procedure, see [fail over](/components/saas/cross-region-cold-recovery.md#fail-over).

### Cloud provider or third-party service outage

An outage at Camunda's cloud provider, network and edge providers, or other third-party services can make clusters unreachable, or prevent Camunda from starting or replacing infrastructure, until the provider recovers. Camunda SaaS clusters run on a single cloud provider and can't fail over to another provider.

This differs from a region failure. If an outage affects only your cluster's region and your secondary backups region is still available, you can recover through cross-region cold recovery. If the outage also affects the secondary backups region, or prevents Camunda from creating infrastructure there, the cluster stays unavailable until the provider recovers.

**RTO/RPO assessment:** Clusters stay unavailable until the provider recovers, so Camunda doesn't set an RTO or RPO for this type of outage. Camunda follows its incident response process and publishes updates on the [Camunda status page](/components/saas/status.md).

### Platform or cluster incident

Some incidents originate in Camunda's own platform or in a single cluster. Examples include platform configuration issues that affect network access, software defects, and cluster components in an inconsistent state.

**RTO/RPO assessment:** RTO depends on how quickly the incident is detected, escalated, diagnosed, and resolved, so Camunda doesn't set a fixed RTO. RPO is typically zero, because these incidents usually affect availability, not stored data.

## Cluster size

The cluster size defines the cluster performance and capacity.

After you have chosen your cluster type, choose the cluster size that best meets your cluster environment requirements.

To learn more about choosing your cluster size, see [size your SaaS cluster](/components/best-practices/architecture/sizing-saas.md#determine-your-cluster-size).

- You can choose from four cluster sizes: 1x, 2x, 3x, and 4x.
- Larger cluster sizes include increased performance and capacity, allowing you to serve more workload.
- Increased usage such as higher throughput or longer data retention requires a larger cluster size.
- Each size increase uses one of your available cluster reservations. For example, purchasing two HWP advanced reservations for your production cluster allows you to configure two clusters of size 1x, or one cluster of size 2x.
- You can change the cluster size at any time. See [resize a cluster](/components/console/manage-clusters/manage-cluster.md#resize-a-cluster).

:::note
To increase the cluster size beyond the maximum 4x size, [reach out to Camunda](https://camunda.com/contact-us/). This requires custom sizing and pricing.
:::

## Free Trial clusters

Free Trial clusters have the same functionality as a production cluster, but are of a Basic type and 1x size, and only available during your trial period. You cannot convert a Free Trial cluster to a different type of cluster.

Once you sign up for a Free Trial, you are able to create one production cluster for the duration of your trial.

When your Free Trial plan expires, you are automatically transferred to the Free plan. This plan allows you to model BPMN and DMN collaboratively, but does not support execution of your models. Any cluster created during your trial is deleted, and you cannot create new clusters.

### Auto-pause

Free Trial clusters are automatically paused after a period of inactivity. Auto-pause occurs regardless of cluster usage.

You can resume a paused cluster at any time, which typically takes five to ten minutes to complete. See [resume a cluster](/components/console/manage-clusters/manage-cluster.md#resume-a-cluster).

- Clusters tagged as `dev` (or untagged) auto-pause eight hours after the cluster is created or resumed from a paused state.
- Clusters auto-pause if there is no cluster activity for 48 hours.
- Cluster disk space is cleared when a trial cluster is paused.
  - You will need to redeploy processes to the cluster once it is resumed from a paused state.
  - Cluster configuration settings (for example, API Clients, connector secrets, and IP allowlists) are saved so you can easily resume a cluster.

:::tip
To prevent auto-pause, [upgrade your Free Trial plan](https://camunda.com/pricing/) to an Enterprise plan.
:::
