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

- **Three-region active-active (RDBMS)**: A three-region Kubernetes deployment with the Orchestration Cluster running active-active across all three regions, backed by a relational database (RDBMS) with cross-region replication as secondary storage. Losing one region requires no operator intervention, because the cluster never loses quorum.

## Get started: Choose your strategy

Choosing the right recovery strategy is determined by how critical your process automation is to your business. How much downtime and data loss can you tolerate, and what compliance obligations do you have?

First, determine how critical your workload is:

| If your business can tolerate the following:                                                                      | Choose this option                  |
| :---------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**.                                            | [Cold Recovery](./cold-recovery.md) |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture.                                      | [Dual-Region](./dual-region.md)     |
| No operator-initiated failover for a single region loss, and no data loss under nominal database replication lag. | Three-region active-active (RDBMS)  |

Dual-Region includes a reference architecture and operational runbook with documented [Recovery Time Objective (RTO)](/reference/glossary.md#recovery-time-objective-rto) and [Recovery Point Objective (RPO)](/reference/glossary.md#recovery-point-objective-rpo) targets. Cold Recovery is a manual procedure built on the [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md) guide; validate it in your environment. Three-region active-active (RDBMS) relies on the database, rather than Camunda, to own secondary-storage replication.

## Comparison of multi-region resilience

The following table provides a detailed comparison of the available multi-region deployment options:

| Consideration           | Cold Recovery                                                                           | Dual-Region                                                                                                                                                       | Three-region active-active (RDBMS)                                                                                                                                             |
| :---------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Recovery time (RTO)** | ~1–4 hours                                                                              | ~15 minutes                                                                                                                                                       | Primary storage: ~0 (no failover procedure). Secondary storage: depends on the database's own failover behavior.                                                               |
| **Data loss (RPO)**     | 15 min – 4 hours (backup-interval dependent)                                            | 0 minutes                                                                                                                                                         | 0 minutes, under nominal database replication lag (see note below)                                                                                                             |
| **Failover mode**       | Manual, operator-initiated                                                              | Manual, operator-initiated                                                                                                                                        | None required for a single region loss; partition quorum is preserved                                                                                                          |
| **Architecture**        | Scheduled backup to cross-region object storage; manual restore into a secondary region | Orchestration Cluster running in both regions; dual-region exporters; manual failover                                                                             | Orchestration Cluster active-active across three regions, one partition replica per region; single RDBMS instance as secondary storage, with replication owned by the database |
| **Typical use case**    | Low-criticality production; environments where hours-long recovery is acceptable        | Enterprise production workloads that must survive a region failure                                                                                                | Enterprise workloads that require automatic resilience to a single region loss, without a manual failover step                                                                 |
| **Compliance fit**      | Basic business continuity management (BCM) requirements                                 | Certified, auditable region-recovery posture with a published runbook                                                                                             | No split-brain risk: a minority partition can't elect a leader, so there's no split brain to resolve                                                                           |
| **Relative cost**       | **$** (lower cost): Object storage only; no standing second region                      | **$$$** (higher cost): Orchestration Cluster running across both regions with extra capacity to sustain load in case of Region failure, plus cross-region traffic | **$$$** (higher cost): Orchestration Cluster running across three regions, plus cross-region traffic and a globally replicated database                                        |

:::important
Cold Recovery RTO and RPO targets are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Dual-Region RTO is based on internal operational tests. Actual times may vary depending on your environment, level of automation and the specific manual steps performed during recovery. See [Dual-Region](./dual-region.md#recovery-objectives) for a phase-by-phase breakdown.

Three-region active-active (RDBMS) reaches an RPO of 0 by keeping the Orchestration Cluster's exported log history until the database confirms replication, rather than by requiring the database itself to replicate synchronously. On databases that expose a replication-lag signal (for example, log sequence number tracking on Aurora PostgreSQL), the Orchestration Cluster monitors that lag and pauses new exports if it grows too large. This preserves consistency on recovery as long as the database's replication stays within nominal operating parameters; it doesn't protect against a database that has stopped replicating entirely.
:::
