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

## High availability within a region

Single-region high availability (HA) protects against an availability-zone (AZ) outage. Distribute brokers and partition replicas across at least three AZs so that losing one zone preserves a majority of every partition's replicas. Provide enough surviving capacity, and run secondary storage and application dependencies in HA mode as well.

On Kubernetes, configure zonal placement explicitly. The default node anti-affinity places Orchestration Cluster pods on distinct nodes, but doesn't guarantee that those nodes are in different AZs. See [high availability](/self-managed/reference-architecture/kubernetes.md#high-availability-ha) and [topology spread constraints](/self-managed/deployment/helm/install/production/index.md#topology-spread-constraints).

Multi-AZ deployment doesn't protect against a complete region outage. To address a region outage, choose one of the multi-region strategies below.

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

| Consideration         | Cold Recovery                        | Dual-Region (Elasticsearch)                                | Multi-Region RDBMS                                                        |
| :-------------------- | :----------------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Regions**           | One, plus cross-region backups       | Exactly two                                                | Two or more. Three or more for region-loss continuity<sup>1</sup>         |
| **Recovery time**     | ~1–4 hours                           | ~15 minutes                                                | Zeebe: seconds. Client and database recovery can take minutes<sup>2</sup> |
| **Data loss**         | 15 minutes–4 hours, backup-dependent | RPO 0                                                      | Primary storage: RPO 0. Secondary storage: RPO 0 after replay<sup>3</sup> |
| **Failover**          | Manual restore                       | Manual failover                                            | Automatic Zeebe recovery. Promote the database writer if it was lost      |
| **Secondary storage** | Elasticsearch or OpenSearch          | Elasticsearch, one cluster per region                      | One RDBMS, replicated by the database                                     |
| **Architecture**      | Cross-region backups                 | Stretched cluster, dual exporters                          | One zone-aware cluster, one exporter                                      |
| **Typical use case**  | Hours-long recovery is acceptable    | Region recovery with operator intervention                 | Processing resumes without a Zeebe operator step                          |
| **Optimize**          | Supported                            | Supported                                                  | Not available with this RDBMS architecture                                |
| **Compliance fit**    | Basic business continuity            | Published, auditable recovery runbook                      | Published, auditable runbook, plus processing continuity                  |
| **Relative cost**     | **$**: No standing recovery region   | **$$$**: Two regions, spare capacity, cross-region traffic | **$$$$**: Three or more regions, cross-region traffic                     |

Notes for Multi-Region RDBMS:

1. Region-loss continuity requires quorum-preserving replica placement, where no zone holds half the replicas or more, and enough surviving capacity to carry the load. In this reference layout, one zone maps to one region. A zone can also be an AZ.
2. With three or more regions and quorum-preserving replica placement, Zeebe recovers automatically. Partitions whose leader was lost typically resume after a few seconds. Other partitions continue processing. Client access and secondary-storage availability can take longer, because they depend on traffic rerouting, connection retries, and database writer promotion if the writer was in the lost region. Full data freshness also requires the exporter backlog to clear. These are indicative durations based on defaults and vendor documentation, not a measured end-to-end recovery target. See [recovery objectives](./multi-region-rdbms-region-loss.md#recovery-objectives) for the time scale of each part.
3. Primary storage contains Zeebe's replicated log and runtime state. Committed records are preserved while the surviving replicas retain quorum. Secondary-storage RPO 0 depends on your [replication monitoring strategy](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support), promoting an eligible standby, enough broker disk to retain the unexported log, and replay completing after promotion.

Cold Recovery is a manual backup and restore procedure without a reference architecture. Its RTO and RPO are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Dual-Region RTO is based on internal operational tests. Actual times can vary depending on your environment, level of automation, and the manual steps performed during recovery. See [Dual-Region](./dual-region.md#recovery-objectives) for a phase-by-phase breakdown.

For Multi-Region RDBMS, measure the actual recovery window, including client reconnection, with a real failover test in your environment.
