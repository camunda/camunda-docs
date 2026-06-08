---
id: resilience-tiers
title: "Multi-region resilience"
sidebar_label: "Multi-region resilience"
description: "Camunda's framework for multi-region disaster recovery: compare Cold Recovery and Dual-Region by RTO, RPO, cost, and compliance fit."
---

Camunda provides a structured multi-region resilience framework for Self-Managed Orchestration Cluster deployments. The right option for you is determined by how critical your process automation is to the business — specifically, how much downtime and data loss it can tolerate, and what compliance obligations apply.

Each option combines a published reference architecture with documented RTO and RPO targets, a deployment guide, and an operational runbook, so you can match your Camunda disaster recovery posture to those requirements without reverse-engineering undocumented capabilities.

## Start here: how critical is your workload?

Use the following questions to identify the option that matches your business needs. The architecture follows from the answer — not the other way around.

| If your business can tolerate…                                              | …then you need                          |
| --------------------------------------------------------------------------- | --------------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**       | [**Cold Recovery**](./cold-recovery.md) |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture | [**Dual-Region**](./dual-region.md)     |

### RTO and RPO definitions

**Recovery Point Objective (RPO)** is the maximum tolerable amount of data loss, measured as the time between the last consistent backup or replication point and the moment of failure.

**Recovery Time Objective (RTO)** is the maximum tolerable time from failure detection to service restoration in a functional state.

## Option comparison

| Consideration           | Cold Recovery                                                                           | Dual-Region                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Recovery time (RTO)** | ~1–4 hours                                                                              | ~15 minutes                                                                                          |
| **Data loss (RPO)**     | 15 min – 4 hours (backup-interval dependent)                                            | 0 minutes                                                                                            |
| **Failover mode**       | Manual, operator-initiated                                                              | Manual or operator-initiated                                                                         |
| **Architecture**        | Scheduled backup to cross-region object storage; manual restore into a secondary region | Full Orchestration Cluster running in both regions; dual-region exporters; manual failover           |
| **Typical use case**    | Low-criticality production; environments where hours-long recovery is acceptable        | Enterprise production workloads that must survive a region failure                                   |
| **Compliance fit**      | Basic business continuity management (BCM) requirements                                 | Certified, auditable region-recovery posture with a published runbook                                |
| **Relative cost**       | **$** — object storage only; no standing second region                                  | **$$$** — full Orchestration Cluster running continuously in both regions, plus cross-region traffic |

:::important
Cold Recovery RTO and RPO targets are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Dual-Region RTO is based on internal operational tests. Actual times may vary depending on your environment, level of automation and the specific manual steps performed during recovery. See [Dual-Region](./dual-region.md#rto-summary) for a phase-by-phase breakdown.
:::

## Next steps

- [Cold Recovery](./cold-recovery.md): backup scope, restore procedure, per-component RTO/RPO breakdown, and DR drill checklist.
- [Dual-Region](./dual-region.md): reference architecture, failover runbook, RTO/RPO breakdown, and upgrade path.
