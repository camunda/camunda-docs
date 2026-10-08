---
id: resilience-tiers
title: "Multi-region resilience"
sidebar_label: "Multi-region resilience"
description: "Learn about multi-region deployment and choose the right strategy for your recovery and resilience needs."
---

import PageDescription from '@site/src/components/PageDescription';
import OverviewImg from './img/multi-region-overview.png';

<PageDescription />

## About

Camunda provides a structured multi-region resilience framework for Self-Managed Orchestration Cluster deployments.

<img src={OverviewImg} alt="Comparison of Cold Recovery, Dual-Region, and three-region active-active architectures with shared RDBMS secondary storage" title="Cold Recovery, Dual-Region, and Multi-Region RDBMS strategies" class="img-noborder img-900"/>

- **[Cold Recovery](./cold-recovery.md)**: Camunda's lowest-cost multi-region configuration uses scheduled cross-region backups and a manual restore procedure to recover from complete primary-region loss. Recovery measured in hours is operationally acceptable.

- **[Dual-Region](./dual-region.md)**: Dual-region deployment with continuous replication. A full Camunda Orchestration Cluster runs continuously in both a primary and secondary region.

- **[Multi-Region RDBMS](./multi-region-rdbms.md)**: One Orchestration Cluster runs active-active across two or more regions, and survives a region loss with three or more. A relational database (RDBMS) with cross-region replication holds the secondary storage. Losing one region preserves the cluster quorum. You must fail over the database writer if the lost region held the writer.

:::tip Looking for single-region high availability?

To protect against availability-zone outages within one region, see [high-availability architecture](/self-managed/reference-architecture/kubernetes.md#high-availability-ha) and [topology spread constraints](/self-managed/deployment/helm/install/production/index.md#topology-spread-constraints). Multi-AZ deployment doesn't protect against a complete region outage.

:::

## Get started: choose your strategy

Choosing the right recovery strategy is determined by how critical your process automation is to your business. How much downtime and data loss can you tolerate, and what compliance obligations do you have?

First, determine how critical your workload is:

| If your business can accept the following outcome:                                 | Choose this option                            |
| :--------------------------------------------------------------------------------- | :-------------------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**.             | [Cold Recovery](./cold-recovery.md)           |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture.       | [Dual-Region](./dual-region.md)               |
| Processing continues after a single region loss, and you can run without Optimize. | [Multi-Region RDBMS](./multi-region-rdbms.md) |

What each strategy asks of you:

- **Cold Recovery** is a manual procedure built on the [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md) guide. There is no reference architecture. Validate the procedure in your own environment.
- **Dual-Region** includes a reference architecture and an operational runbook, with documented [Recovery Time Objective (RTO)](/reference/glossary.md#recovery-time-objective-rto) and [Recovery Point Objective (RPO)](/reference/glossary.md#recovery-point-objective-rpo) targets. A region loss stops processing until an operator runs the failover.
- **Multi-Region RDBMS**, with three or more regions, keeps processing through a region loss with no Zeebe operator step. The database handles secondary-storage replication. In exchange, it costs a third region of capacity. Optimize is unavailable, because Optimize requires Elasticsearch or OpenSearch instead of a relational secondary storage.

## Comparison of multi-region resilience

The following table provides a detailed comparison of the available multi-region deployment options:

| Consideration           | Cold Recovery                                                                     | Dual-Region (Elasticsearch)                                                                                             | Multi-Region RDBMS                                                                                                                            |
| :---------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Regions**             | One, plus cross-region backups                                                    | Exactly two                                                                                                             | Two or more. Three or more for [region-loss continuity](#region-loss-continuity).                                                             |
| **Recovery time (RTO)** | ~1–4 hours                                                                        | ~15 minutes                                                                                                             | Zeebe: seconds. Client and database recovery can take minutes. See [recovery time](#recovery-time).                                           |
| **Data loss (RPO)**     | 15 minutes–4 hours, backup-dependent                                              | RPO 0                                                                                                                   | Primary storage: RPO 0. Secondary storage: RPO 0 after replay. See [data loss and replay](#data-loss-and-replay).                             |
| **Failover**            | Manual restore                                                                    | Manual failover                                                                                                         | Automatic Zeebe recovery. Promote the database writer if it was lost                                                                          |
| **Secondary storage**   | Elasticsearch or OpenSearch, restored from backup                                 | Elasticsearch, one cluster per region                                                                                   | One RDBMS, replicated by the database                                                                                                         |
| **Architecture**        | Scheduled cross-region backups. Manual restore into a recovery region.            | One Orchestration Cluster across two regions, with dual-region exporters and manual failover.                           | One Orchestration Cluster across all regions, with zone-aware replica placement and one exporter.                                             |
| **Typical use case**    | Hours-long recovery is acceptable                                                 | Region recovery with operator intervention                                                                              | Processing resumes without a Zeebe operator step                                                                                              |
| **Optimize**            | Supported                                                                         | Supported                                                                                                               | Not available. Optimize requires Elasticsearch or OpenSearch                                                                                  |
| **Compliance fit**      | Basic business continuity                                                         | Published, auditable recovery runbook                                                                                   | Published, auditable runbook, plus processing continuity                                                                                      |
| **Relative cost**       | **$**: Lower cost; cross-region object storage, with no standing recovery region. | **$$$**: Two running regions, with spare capacity to sustain the workload after region loss, plus cross-region traffic. | **$$$$**: Two or more running regions; three or more for region-loss continuity, with sufficient surviving capacity and cross-region traffic. |

### Cold Recovery recovery conditions

Cold Recovery RTO and RPO are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

### Dual-Region recovery conditions

Dual-Region RTO is based on internal operational tests. Actual times can vary depending on your environment, level of automation, and the manual steps performed during recovery. See [Dual-Region](./dual-region.md#recovery-objectives) for the failover and failback recovery objectives.

### Multi-Region RDBMS recovery conditions

#### Region-loss continuity

Region-loss continuity requires quorum-preserving replica placement, where no zone holds half the replicas or more, and enough surviving capacity to carry the load. In this reference layout, one zone maps to one region. A zone can also be an availability zone (AZ).

#### Recovery time

Multi-Region RDBMS removes the Zeebe recovery procedure, not the recovery window. Zeebe recovers affected partitions in seconds; other partitions continue processing. Client rerouting and database writer promotion can take minutes and depend on your configuration. Full data freshness also requires the exporter backlog to clear. See [recovery objectives](./multi-region-rdbms-region-loss.md#recovery-objectives).

#### Data loss and replay

Primary storage contains Zeebe's replicated log and runtime state. Secondary-storage RPO 0 depends on the replication-monitoring strategy, an eligible failover target, enough disk capacity to retain the unacknowledged log, and replay completion. See the strategy-specific conditions in [recovery objectives](./multi-region-rdbms-region-loss.md#recovery-objectives).

For Multi-Region RDBMS, measure the actual recovery window, including client reconnection, with a real failover test in your environment.
