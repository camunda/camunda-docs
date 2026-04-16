---
id: tier-1-cold-recovery
title: "Tier 1 Cold Recovery"
sidebar_label: "Tier 1 — Cold Recovery"
description: "Conceptual overview of Tier 1 cold backup-based disaster recovery for Camunda Self-Managed: how it works, backup scope, recovery flow, and RTO/RPO characteristics."
---

import DualRegion from "./img/dual-region.jpg";

Tier 1 is Camunda's lowest-cost multi-region resilience configuration. It provides a documented, repeatable recovery path from complete primary-region loss using scheduled backups exported to cross-region object storage and a manual restore procedure into a secondary region.

Tier 1 is suited for development and staging environments, low-criticality production workloads, and deployments where recovery measured in hours is operationally acceptable.

| Property                            | Value                                                   |
| ----------------------------------- | ------------------------------------------------------- |
| **RTO**                             | ~1–4 hours (operator and environment dependent)         |
| **RPO**                             | 15 minutes – 4 hours (backup-interval dependent)        |
| **Failover mode**                   | Manual, human-initiated                                 |
| **Standing second region required** | No — restore into a newly provisioned region            |
| **Primary compliance fit**          | Basic Business Continuity Management (BCM) requirements |

:::important
Tier 1 RTO and RPO are **not engine-guaranteed**. Recovery time depends on data volume, backup frequency, operator familiarity with the restore procedure, and the speed at which a secondary region can be provisioned. Treat the ranges above as planning targets, not contractual commitments.
:::

## Architecture overview

In Tier 1, a single active region runs the full Camunda Orchestration Cluster. Automated backup jobs export Zeebe partition snapshots and secondary storage backups (Elasticsearch or RDBMS) to an S3-compatible object storage bucket replicated to a separate AWS region. There is no warm standby — no second cluster runs during normal operations.

```
┌──────────────────────────────────────────────────────────┐
│ Primary region (e.g. us-east-1)                          │
│                                                          │
│  ┌────────────────────────────────────────────────┐      │
│  │ Orchestration Cluster                           │      │
│  │   Zeebe  │  Operate  │  Tasklist  │  Admin      │      │
│  │   Secondary storage (Elasticsearch / RDBMS)     │      │
│  └─────────────────────┬──────────────────────────┘      │
│                        │ scheduled backup jobs           │
└────────────────────────┼─────────────────────────────────┘
                         ▼
         ┌────────────────────────────────┐
         │ Cross-region S3 bucket         │
         │ (e.g. us-west-2)               │
         │   Zeebe partition snapshots    │
         │   ES snapshots / RDBMS dumps   │
         └────────────────────────────────┘
```

On primary-region failure, an operator provisions a new environment in the secondary region and restores from the most recent consistent backup set.

## Backup scope

A complete Tier 1 backup covers two storage layers. Both must be backed up — and aligned in time — to produce a consistent restore point.

| Layer                                  | Backup target                      | Backup mechanism                                                         |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| **Primary storage** (Zeebe log stream) | Zeebe partition snapshots          | Zeebe Backup Management API                                              |
| **Secondary storage** (Elasticsearch)  | Elasticsearch index snapshots      | Orchestration cluster backup API                                         |
| **Secondary storage** (RDBMS)          | Database dump or continuous backup | Database-native tools (`pg_dump`, Oracle RMAN, AWS RDS automated backup) |

:::note
Restoring only Zeebe without the corresponding secondary storage backup (or vice versa) will produce an inconsistent cluster. The two backups are correlated by backup ID on the Elasticsearch path, or by timestamp alignment on the RDBMS path.
:::

### Component coverage

| Component                   | Included in Tier 1 backup               | Notes                                          |
| --------------------------- | --------------------------------------- | ---------------------------------------------- |
| **Zeebe** (primary storage) | Yes — partition snapshots               | Required                                       |
| **Operate**                 | Yes — via Elasticsearch or RDBMS backup | State is stored in secondary storage           |
| **Tasklist**                | Yes — via Elasticsearch or RDBMS backup | State is stored in secondary storage           |
| **Admin / Identity**        | Yes — via Elasticsearch or RDBMS backup | Authentication and authorization configuration |
| **Optimize**                | Elasticsearch path only                 | Not supported with RDBMS secondary storage     |
| **Web Modeler**             | Not included                            | Standalone component; back up independently    |
| **Connectors**              | Not included                            | Stateless; redeploy from source                |

## Backup requirements

For Tier 1 recovery to be viable, three conditions must be in place before a failure occurs:

- **Cross-region replication** — The primary S3 backup bucket must replicate objects to a bucket in the secondary region so that backup data remains accessible if the primary region becomes unavailable.
- **Regular backup schedule** — Both Zeebe and secondary storage must be backed up on a consistent schedule. Backup frequency directly determines RPO: a 1-hour backup interval means up to 1 hour of data loss in the worst case.
- **Backup validation** — Backups should be periodically verified to confirm they are complete and restorable. An untested backup provides no recovery guarantee.

For configuration instructions and scheduling guidance, see the [Backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

## Recovery flow

When the primary region fails, Tier 1 recovery follows this sequence:

1. **Detect and declare** — Confirm the primary region is unavailable and initiate the recovery process.
2. **Provision** — Spin up a new Camunda environment in the secondary region (or activate a pre-provisioned standby if one exists).
3. **Select restore point** — Identify the most recent complete, consistent backup set from the replica S3 bucket.
4. **Restore Camunda Orchestration cluster** — Follow [Restore procedure](../../operational-guides/backup-restore/backup-and-restore.md).
5. **Start and verify** — Deploy the Orchestration Cluster against the restored data and confirm health before routing traffic.
6. **Redirect traffic** — Update DNS or load balancer configuration to point production traffic at the secondary region.

The total elapsed time across these steps is the realized RTO.

For step-by-step restore instructions, see the [Backup and restore guides](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

## DR testing

A Tier 1 recovery plan that has never been exercised should be treated as unverified. Run a full DR drill at least quarterly in a non-production environment that mirrors the production setup. The drill should validate that:

- Backup data is accessible from the secondary region
- The restore procedure completes successfully within the target RTO
- The restored cluster passes health checks and processes work as expected

Regular drills also ensure the team is familiar with the restore procedure before a real incident requires it.

## Related documentation

- [Multi-region resilience tiers overview](./resilience-tiers.md)
- [Tier 2 — Dual-Region Active/Passive](./tier-2-dual-region.md)
- [Backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
- [Zeebe backup management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md)
- [Elasticsearch backup](/self-managed/operational-guides/backup-restore/elasticsearch/backup.md)
- [Elasticsearch restore](/self-managed/operational-guides/backup-restore/elasticsearch/restore.md)
- [RDBMS backup](/self-managed/operational-guides/backup-restore/rdbms/backup.md)
- [RDBMS restore](/self-managed/operational-guides/backup-restore/rdbms/restore.md)
