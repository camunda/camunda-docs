---
id: resilience-tiers
title: "Multi-region deployment"
sidebar_label: "Multi-region deployment"
description: "Learn about multi-region deployment and choosing the right option for your recovery and resilience needs."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

Camunda provides a structured multi-region resilience framework for Self-Managed Orchestration Cluster deployments.

You can choose from either of the following types of multi-region configuration:

- **[Cold Recovery](./cold-recovery.md)**: Camunda's lowest-cost multi-region configuration. Recovery measured in hours is operationally acceptable.
- **[Dual-Region](./dual-region.md)**: Dual-region deployment with continuous replication. A full Camunda Orchestration Cluster runs continuously in both a primary and secondary region.

### Choosing the right option

The right option for you is determined by how critical your process automation is to your business, specifically, how much downtime and data loss you can tolerate, and what compliance obligations you have.

First, determine how critical your workload is:

| If your business can tolerate the following:                                 | Choose this option                  |
| :--------------------------------------------------------------------------- | :---------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**.       | [Cold Recovery](./cold-recovery.md) |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture. | [Dual-Region](./dual-region.md)     |

Each option includes a reference architecture, deployment guide, and operational runbook with documented [Recovery Time Objective (RTO)](/reference/glossary.md#recovery-time-objective-rto) and [Recovery Point Objective (RPO)](/reference/glossary.md#recovery-point-objective-rpo) targets.

## Comparison of multi-region deployment options

The following table provides a comparison of the different multi-region deployment options:

| Consideration           | Cold Recovery                                                                           | Dual-Region                                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Recovery time (RTO)** | ~1–4 hours                                                                              | ~15 minutes                                                                                                                                          |
| **Data loss (RPO)**     | 15 min – 4 hours (backup-interval dependent)                                            | 0 minutes                                                                                                                                            |
| **Failover mode**       | Manual, operator-initiated                                                              | Manual or operator-initiated                                                                                                                         |
| **Architecture**        | Scheduled backup to cross-region object storage; manual restore into a secondary region | Orchestration Cluster running in both regions; dual-region exporters; manual failover                                                                |
| **Typical use case**    | Low-criticality production; environments where hours-long recovery is acceptable        | Enterprise production workloads that must survive a region failure                                                                                   |
| **Compliance fit**      | Basic business continuity management (BCM) requirements                                 | Certified, auditable region-recovery posture with a published runbook                                                                                |
| **Relative cost**       | **$** — object storage only; no standing second region                                  | **$$$** — Orchestration Cluster running across both regions with extra capacity to sustain load in case of Region failure, plus cross-region traffic |

:::important
Cold Recovery RTO and RPO targets are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Dual-Region RTO is based on internal operational tests. Actual times may vary depending on your environment, level of automation and the specific manual steps performed during recovery. See [Dual-Region](./dual-region.md#rto-summary) for a phase-by-phase breakdown.
:::

## Next steps

- [Cold Recovery](./cold-recovery.md): backup scope, restore procedure, per-component RTO/RPO breakdown, and DR drill checklist.
- [Dual-Region](./dual-region.md): reference architecture, failover runbook, RTO/RPO breakdown, and upgrade path.
