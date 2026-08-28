---
id: resilience-tiers
title: "Multi-region resilience"
sidebar_label: "Multi-region resilience"
description: "Learn about multi-region deployment and choose the right strategy for your recovery and resilience needs."
---

import PageDescription from '@site/src/components/PageDescription';
import OverviewImg from './img/multi-region-overview.png';

<PageDescription />

Camunda provides a structured multi-region resilience framework for Self-Managed Orchestration Cluster deployments.

<img src={OverviewImg} alt="High-level diagram showing Cold Recovery and Dual-Region strategies" title="Cold Recovery and Dual-Region strategies" class="img-noborder img-700"/>

- **[Cold Recovery](./cold-recovery.md)**: Camunda's lowest-cost multi-region configuration uses scheduled cross-region backups and a manual restore procedure to recover from complete primary-region loss. Recovery measured in hours is operationally acceptable.

- **[Dual-Region](./dual-region.md)**: Dual-region deployment with continuous replication. A full Camunda Orchestration Cluster runs continuously in both a primary and secondary region.

- **[Multi-Region RDBMS](./multi-region-rdbms.md)**: One Orchestration Cluster stretched across three or more regions, with relational secondary storage. A region loss leaves every partition with a majority of its replicas, so processing continues without operator intervention.

## Get started: Choose your strategy

Choosing the right recovery strategy is determined by how critical your process automation is to your business. How much downtime and data loss can you tolerate, and what compliance obligations do you have?

First, determine how critical your workload is:

| If your business can tolerate the following:                                               | Choose this option                            |
| :----------------------------------------------------------------------------------------- | :-------------------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**.                     | [Cold Recovery](./cold-recovery.md)           |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture.               | [Dual-Region](./dual-region.md)               |
| **No interruption of processing** when a region is lost, and you can run without Optimize. | [Multi-Region RDBMS](./multi-region-rdbms.md) |

Dual-Region includes a reference architecture and operational runbook with documented [Recovery Time Objective (RTO)](/reference/glossary.md#recovery-time-objective-rto) and [Recovery Point Objective (RPO)](/reference/glossary.md#recovery-point-objective-rpo) targets. Cold Recovery is a manual procedure built on the [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md) guide; validate it in your environment. Multi-Region RDBMS trades Optimize and a third region of capacity for continuous processing through a region loss.

## Comparison of multi-region resilience

The following table provides a detailed comparison of the available multi-region deployment options:

| Consideration           | Cold Recovery                                                                           | Dual-Region                                                                                                                                                       | Multi-Region RDBMS                                                                                                    |
| :---------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Regions**             | One, plus cross-region object storage                                                   | Exactly two                                                                                                                                                       | Three or more                                                                                                         |
| **Recovery time (RTO)** | ~1–4 hours                                                                              | ~15 minutes                                                                                                                                                       | Processing does not stop, so there is nothing to recover in Zeebe                                                     |
| **Data loss (RPO)**     | 15 min – 4 hours (backup-interval dependent)                                            | 0 minutes                                                                                                                                                         | 0 for Zeebe. For secondary storage, bounded by the database replication lag if the writer region is lost unexpectedly |
| **Failover mode**       | Manual, operator-initiated                                                              | Manual, operator-initiated                                                                                                                                        | Automatic for Zeebe. Manual for the database writer, and only if it was in the lost region                            |
| **Secondary storage**   | Elasticsearch or OpenSearch, restored from backup                                       | Elasticsearch, one cluster per region                                                                                                                             | RDBMS, one database replicated by the database itself                                                                 |
| **Architecture**        | Scheduled backup to cross-region object storage; manual restore into a secondary region | Orchestration Cluster running in both regions; dual-region exporters; manual failover                                                                             | One Orchestration Cluster across every region; one exporter; zone-aware partition placement                           |
| **Typical use case**    | Low-criticality production; environments where hours-long recovery is acceptable        | Enterprise production workloads that must survive a region failure                                                                                                | Workloads that cannot pause while an operator runs a failover                                                         |
| **Optimize**            | Supported                                                                               | Supported                                                                                                                                                         | Not available, Optimize requires Elasticsearch or OpenSearch                                                          |
| **Compliance fit**      | Basic business continuity management (BCM) requirements                                 | Certified, auditable region-recovery posture with a published runbook                                                                                             | Auditable region-recovery posture with a published runbook, for organizations that also require continuous processing |
| **Relative cost**       | **$** (lower cost): Object storage only; no standing second region                      | **$$$** (higher cost): Orchestration Cluster running across both regions with extra capacity to sustain load in case of Region failure, plus cross-region traffic | **$$$$** (highest cost): Orchestration Cluster running across three or more regions, plus cross-region traffic        |

:::important
Cold Recovery RTO and RPO targets are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Dual-Region RTO is based on internal operational tests. Actual times may vary depending on your environment, level of automation and the specific manual steps performed during recovery. See [Dual-Region](./dual-region.md#recovery-objectives) for a phase-by-phase breakdown.

Multi-Region RDBMS does not publish RTO and RPO targets. Zeebe keeps processing through a region loss, so the objectives that matter are set by your database's replication configuration. See [region failure and recovery](./multi-region-rdbms.md#region-failure-and-recovery).
:::
