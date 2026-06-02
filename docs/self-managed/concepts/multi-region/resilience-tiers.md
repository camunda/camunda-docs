---
id: resilience-tiers
title: "Multi-region resilience tiers"
sidebar_label: "Resilience tiers"
description: "Camunda's structured framework for multi-region disaster recovery: compare Tier 1 (Cold Recovery) and Tier 2 (Warm Standby) by RTO, RPO, cost, and compliance fit."
---

Camunda provides a structured, tiered multi-region resilience framework for Self-Managed Orchestration Cluster deployments. The right tier for you is determined by how critical your process automation is to the business — specifically, how much downtime and data loss it can tolerate, and what compliance obligations apply. Each tier combines a published reference architecture with documented RTO and RPO targets, a deployment guide, and an operational runbook, so you can match your Camunda disaster recovery posture to those requirements without reverse-engineering undocumented capabilities.

## Start here: how critical is your workload?

Use the following questions to identify the tier that matches your business needs. The architecture follows from the answer — not the other way around.

| If your business can tolerate…                                              | …then you need                                          |
| --------------------------------------------------------------------------- | ------------------------------------------------------- |
| Recovery measured in **hours**, and **minutes to hours of data loss**       | [**Tier 1 — Cold Recovery**](./tier-1-cold-recovery.md) |
| Recovery in **~15 minutes**, with **no data loss**, and audit-ready posture | [**Tier 2 — Dual-Region**](./dual-region.md)            |

### RTO and RPO definitions

**Recovery Point Objective (RPO)** is the maximum tolerable amount of data loss, measured as the time between the last consistent backup or replication point and the moment of failure.

**Recovery Time Objective (RTO)** is the maximum tolerable time from failure detection to service restoration in a functional state.

## Tier comparison

| Consideration           | Tier 1 — Cold Recovery                                                                  | Tier 2 — Dual-Region                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Recovery time (RTO)** | ~1–4 hours                                                                              | ~15 minutes                                                                                          |
| **Data loss (RPO)**     | 15 min – 4 hours (backup-interval dependent)                                            | 0 minutes                                                                                            |
| **Failover mode**       | Manual, human-initiated                                                                 | Manual or semi-automated                                                                             |
| **Architecture**        | Scheduled backup to cross-region object storage; manual restore into a secondary region | Full Orchestration Cluster running in both regions; dual-region exporters; manual failover           |
| **Typical use case**    | Low-criticality production; environments where hours-long recovery is acceptable        | Enterprise production workloads that must survive a region failure                                   |
| **Relative cost**       | **$** — object storage only; no standing second region                                  | **$$$** — full Orchestration Cluster running continuously in both regions, plus cross-region traffic |

:::important
Tier 1 RTO and RPO targets are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Tier 2 RTO is based on internal operational tests. Actual times may vary depending on your environment and the specific manual steps performed during recovery. See [Tier 2 — Dual-Region](./dual-region.md#rto-summary) for a phase-by-phase breakdown.
:::

## Choosing a tier

### When to choose Tier 1

Choose Tier 1 if:

- Region recovery in hours is acceptable for your SLA or risk classification.
- Some data loss is tolerated (based on backup frequency)
- You are subject to basic business continuity management (BCM) requirements but not stringent regulatory mandates.
- Infrastructure cost is the primary constraint — a standing warm secondary region is not justified.

### When to choose Tier 2

Choose Tier 2 if:

- Your SLA requires service restoration within 15 minutes.
- No data loss is acceptable.
- You are running enterprise production workloads and need a certified, auditable region-recovery posture with a published runbook.

## Next steps

- [Tier 1 — Cold Recovery](./tier-1-cold-recovery.md): backup scope, restore procedure, per-component RTO/RPO breakdown, and DR drill checklist.
- [Tier 2 — Dual-Region](./dual-region.md): reference architecture, failover runbook, RTO/RPO breakdown, and upgrade path.
