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

:::tip Looking for single-region high availability?

To protect against availability-zone outages within one region, see [high-availability architecture](/self-managed/reference-architecture/kubernetes.md#high-availability-ha) and [topology spread constraints](/self-managed/deployment/helm/install/production/index.md#topology-spread-constraints). Multi-AZ deployment doesn't protect against a complete region outage.

:::

## Get started: choose your strategy

Choosing the right recovery strategy is determined by how critical your process automation is to your business. How much downtime and data loss can you tolerate, and what compliance obligations do you have?

First, determine how critical your workload is:

| If your business can accept the following outcome:                           | Choose this option                  |
| :--------------------------------------------------------------------------- | :---------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**.       | [Cold Recovery](./cold-recovery.md) |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture. | [Dual-Region](./dual-region.md)     |

What each strategy asks of you:

- **Cold Recovery** is a manual procedure built on the [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md) guide. There is no reference architecture. Validate the procedure in your own environment.
- **Dual-Region** includes a reference architecture and an operational runbook, with documented [Recovery Time Objective (RTO)](/reference/glossary.md#recovery-time-objective-rto) and [Recovery Point Objective (RPO)](/reference/glossary.md#recovery-point-objective-rpo) targets. A region loss stops processing until an operator runs the failover.

## Comparison of multi-region resilience

The following table provides a detailed comparison of the available multi-region deployment options:

| Consideration           | Cold Recovery                                                                     | Dual-Region (Elasticsearch)                                                                                             |
| :---------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Regions**             | One, plus cross-region backups                                                    | Exactly two                                                                                                             |
| **Recovery time (RTO)** | ~1–4 hours                                                                        | ~15 minutes                                                                                                             |
| **Data loss (RPO)**     | 15 minutes–4 hours, backup-dependent                                              | RPO 0                                                                                                                   |
| **Failover**            | Manual restore                                                                    | Manual failover                                                                                                         |
| **Secondary storage**   | Elasticsearch or OpenSearch, restored from backup                                 | Elasticsearch, one cluster per region                                                                                   |
| **Architecture**        | Scheduled cross-region backups. Manual restore into a recovery region.            | One Orchestration Cluster across two regions, with dual-region exporters and manual failover.                           |
| **Typical use case**    | Hours-long recovery is acceptable                                                 | Region recovery with operator intervention                                                                              |
| **Optimize**            | Supported                                                                         | Supported                                                                                                               |
| **Compliance fit**      | Basic business continuity                                                         | Published, auditable recovery runbook                                                                                   |
| **Relative cost**       | **$**: Lower cost; cross-region object storage, with no standing recovery region. | **$$$**: Two running regions, with spare capacity to sustain the workload after region loss, plus cross-region traffic. |

### Cold Recovery recovery conditions

Cold Recovery RTO and RPO are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

### Dual-Region recovery conditions

Dual-Region RTO is based on internal operational tests. Actual times can vary depending on your environment, level of automation, and the manual steps performed during recovery. See [Dual-Region](./dual-region.md#recovery-objectives) for the failover and failback recovery objectives.
