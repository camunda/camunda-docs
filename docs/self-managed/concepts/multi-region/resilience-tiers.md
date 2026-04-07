---
id: resilience-tiers
title: "Multi-region resilience tiers"
sidebar_label: "Resilience tiers"
description: "Camunda's structured framework for multi-region disaster recovery: compare Tier 1 (Cold Recovery) and Tier 2 (Warm Standby) by RTO, RPO, cost, and compliance fit."
---

Camunda provides a structured, tiered multi-region resilience framework for Self-Managed deployments. Each tier combines a published reference architecture with documented RTO and RPO targets, a deployment guide, and an operational runbook — so you can match your Camunda disaster recovery posture to your operational requirements and compliance obligations without reverse-engineering undocumented capabilities.

## Available tiers

| Tier  | Label                                      | Architecture                                                                            | RTO         | RPO              |
| ----- | ------------------------------------------ | --------------------------------------------------------------------------------------- | ----------- | ---------------- |
| **1** | [Cold Recovery](./tier-1-cold-recovery.md) | Scheduled backup to cross-region object storage; manual restore into a secondary region | ~2–8 hours  | 15 min – 4 hours |
| **2** | [Dual-Region](./tier-2-dual-region.md)     | Dual-region exporters with a secondary region; manual failover                          | ~15 minutes | 0 minutes        |

:::note
A third tier — Active-Active with near-zero RTO/RPO using a globally distributed RDBMS — is in development.
:::

## Which tier is right for you?

Use the following table to select the tier that matches your recovery requirements, compliance obligations, and infrastructure budget.

| Consideration               | Tier 1 — Cold Recovery                                  | Tier 2 — Dual Region                                                   |
| --------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Recovery time tolerance** | Hours (typically 2–8 h)                                 | ~15 minutes                                                            |
| **Data loss tolerance**     | Minutes to hours (backup-interval dependent)            | ~5 minutes                                                             |
| **Failover mode**           | Manual, human-initiated                                 | Manual or semi-automated                                               |
| **Typical use case**        | low-criticality production                              | enterprise production workloads that require to sustain Region failure |
| **Infrastructure cost**     | Lowest — object storage only; no standing second region | Moderate — full Orchestration Cluster running in both regions          |

### When to choose Tier 1

Choose Tier 1 if:

- Region recovery in hours is acceptable for your SLA or risk classification.
- The workload is non-mission-critical (development, staging, internal tooling).
- You are subject to basic business continuity management (BCM) requirements but not stringent regulatory mandates.
- Infrastructure cost is the primary constraint — a standing warm secondary region is not justified.

### When to choose Tier 2

Choose Tier 2 if:

- Your SLA requires service restoration within 15 minutes.
- Data loss must not exceed approximately 5 minutes.
- Your deployment must certify against DORA, SR 11-7, or equivalent financial-services continuity standards.
- You are running enterprise production workloads and need a certified, auditable Region recovery posture with a published runbook.

## RTO and RPO definitions

**Recovery Point Objective (RPO)** is the maximum tolerable amount of data loss, measured as the time between the last consistent backup or replication point and the moment of failure.

**Recovery Time Objective (RTO)** is the maximum tolerable time from failure detection to service restoration in a functional state.

:::important
Tier 1 RTO and RPO targets are **not engine-guaranteed**. They are bounded by data volume, backup frequency, and operator restore speed. Treat published ranges as planning targets, not contractual commitments.

Tier 2 RTO is based on internal operational tests. Actual times may vary depending on your environment and the specific manual steps performed during recovery. See [Tier 2 — Warm Standby](./tier-2-dual-region.md#rto-summary) for a phase-by-phase breakdown.
:::

## Next steps

- [Tier 1 — Cold Recovery](./tier-1-cold-recovery.md): backup scope, restore procedure, per-component RTO/RPO breakdown, and DR drill checklist.
- [Tier 2 — Warm Standby](./tier-2-dual-region.md): reference architecture, exporter configuration, failover runbook, Elasticsearch vs. RDBMS comparison, and upgrade path.
