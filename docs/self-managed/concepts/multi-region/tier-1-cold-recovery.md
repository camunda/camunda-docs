---
id: tier-1-cold-recovery
title: "Tier 1 Cold Recovery"
sidebar_label: "Tier 1 — Cold Recovery"
description: "Conceptual overview of Tier 1 cold backup-based disaster recovery for Camunda Self-Managed: how it works, backup scope, recovery flow, and RTO/RPO characteristics."
---

<!-- Image source: https://miro.com/app/board/uXjVL-6SrPc=/ -->

import ColdRecovery from "./img/cold-recovery-diagram.jpg";

Tier 1 is Camunda's lowest-cost multi-region resilience configuration. It provides a documented, repeatable recovery path from complete primary-region loss using scheduled backups exported to cross-region object storage and a manual restore procedure into a secondary region.

Tier 1 is suited for development and staging environments, low-criticality production workloads, and deployments where recovery measured in hours is operationally acceptable.

| Property                            | Value                                            |
| ----------------------------------- | ------------------------------------------------ |
| **RTO**                             | ~1–4 hours (operator and environment dependent)  |
| **RPO**                             | 15 minutes – 4 hours (backup-interval dependent) |
| **Failover mode**                   | Manual, human-initiated                          |
| **Standing second region required** | No — restore into a newly provisioned region     |

:::important
Tier 1 RTO and RPO are **not engine-guaranteed**. Recovery time depends on data volume, backup frequency, operator familiarity with the restore procedure, and the speed at which a secondary region can be provisioned. Treat the ranges above as planning targets, not contractual commitments.
:::

## Architecture overview

In Tier 1, a single active region runs the full Camunda Orchestration Cluster. Automated backup jobs export Zeebe partition snapshots and secondary storage backups (Elasticsearch or RDBMS) to an S3-compatible object storage bucket replicated to a separate region. There is no warm standby — no second cluster runs during normal operations.

<img src={ColdRecovery} alt="Camunda Cold Recovery from Backup architecture" style={{border: 'none'}} />

On primary-region failure, an operator provisions a new environment in the secondary region and restores from the most recent consistent backup set.

## Backup scope

A complete Tier 1 backup covers two storage layers. Both must be backed up, see the [Backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

| Layer                                  | Backup target                      | Backup mechanism                                                         |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| **Primary storage** (Zeebe log stream) | Zeebe partition snapshots          | Zeebe Backup Management API                                              |
| **Secondary storage** (Elasticsearch)  | Elasticsearch index snapshots      | Orchestration cluster backup API                                         |
| **Secondary storage** (RDBMS)          | Database dump or continuous backup | Database-native tools (`pg_dump`, Oracle RMAN, AWS RDS automated backup) |

### Component coverage

| Component                   | Included in Tier 1 backup               | Notes                                          |
| --------------------------- | --------------------------------------- | ---------------------------------------------- |
| **Zeebe** (primary storage) | Yes — partition snapshots               | Required                                       |
| **Operate**                 | Yes — via Elasticsearch or RDBMS backup | State is stored in secondary storage           |
| **Tasklist**                | Yes — via Elasticsearch or RDBMS backup | State is stored in secondary storage           |
| **Admin / Identity**        | Yes — via Elasticsearch or RDBMS backup | Authentication and authorization configuration |
| **Optimize**                | Elasticsearch path only                 | back up independently                          |
| **Web Modeler**             | Not included                            | Standalone component; back up independently    |
| **Connectors**              | Not included                            | Stateless; redeploy from source                |

## Cross-region backup replication

Cross-region replication of the backup storage is the **load-bearing assumption** of Tier 1. If backups exist only in the primary region, there is no disaster recovery when that region is lost — the backups are lost with it. Replication is therefore not optional and not merely a best practice; it is the prerequisite that makes Tier 1 work.

The primary backup bucket must replicate objects to a bucket in a **separate region** so that backup data remains accessible if the primary region becomes unavailable. For S3-compatible object storage, this is typically configured as continuous cross-region replication on the bucket itself.

Concretely, this means:

- The replica bucket lives in a different region from the primary cluster.
- Replication runs continuously and automatically — there is no manual copy step.
- Replication lag is monitored and bounded; an unreplicated backup is not yet a recoverable backup.
- The replica bucket's access policies allow restore from a freshly provisioned secondary-region environment that does not yet exist at backup time.

For provider-specific guidance, see the [Backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

## Backup requirements

In addition to cross-region replication, two further conditions must be in place before a failure occurs:

- **Regular backup schedule** — Both Orchestration cluster and secondary storage must be backed up on a consistent schedule. Backup frequency directly determines RPO: a 1-hour backup interval means up to 1 hour of data loss in the worst case.
- **Backup validation** — Backups should be periodically verified to confirm they are complete and restorable. An untested backup provides no recovery guarantee.

For configuration instructions and scheduling guidance, see the [Backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

## Recovery flow

When the primary region fails, Tier 1 recovery follows this sequence:

1. **Detect and declare** — Confirm the primary region is unavailable and initiate the recovery process.
2. **Provision** — Spin up a new Camunda environment in the secondary region (or activate a pre-provisioned standby if one exists).
3. **Select restore point** — Identify the most recent complete, consistent backup set from the replica S3 bucket.
4. **Restore Camunda Orchestration cluster** — Follow [Restore procedure](../../operational-guides/backup-restore/backup-and-restore.md).
5. **Start and verify** — Deploy the Orchestration Cluster against the restored data and confirm health before routing traffic.
6. **Fence the old region** — Before redirecting traffic, ensure the original region's cluster, job workers, and connectors are stopped or otherwise prevented from acting (see [Fencing the old region](#fencing-the-old-region) below).
7. **Redirect traffic** — Update applications, DNS or load balancer configuration to point production traffic at the secondary region.

The total elapsed time across all these steps is the realized RTO.

:::important Detection and decision time count toward RTO
Steps 1 (detect and declare) is **not instantaneous** and is often the largest variable contributor to total RTO. Time-to-detect (how long until the outage is recognized) and time-to-decide (how long until the on-call operator authorizes a failover) can each run from minutes to hours depending on monitoring coverage, paging rotation, and escalation policy. The published 1–4 hour RTO assumes these phases are exercised regularly; otherwise they dominate the realized recovery time.
:::

### Fencing the old region

If the primary region failure is a true region loss, the old cluster is already gone and no further action is needed. However, if the failure is actually a **network partition** — the region is unreachable from your control plane but still running — the original Orchestration Cluster, its job workers, and its connectors may still be active. Promoting the restored cluster without fencing the old one results in **two live clusters that both believe they own the same process instances**, able to drive the same external side effects (payments, emails, downstream API calls) twice.

Repointing DNS or load balancers does not solve this: job workers and connectors do not route through the front-door traffic layer. They poll Zeebe and call external systems directly.

Before redirecting traffic, ensure the old region cannot act. Use one or more of the following mechanisms, in order of preference:

- **Stop or scale down the old deployment** if it is reachable (for example, scale Zeebe brokers, gateways, workers, and connector deployments to zero).
- **Revoke the old region's credentials and identity** so it can no longer authenticate to external systems or downstream APIs.
- **Isolate the old region at the network layer** (security groups, firewall rules, or VPC routing) so it cannot reach external systems even if it remains running.

Document and rehearse the specific mechanism you will use as part of your DR drill — fencing is operationally specific to your environment and must be tested before a real incident.

For step-by-step restore instructions, see the [Backup and restore guides](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

## Related documentation

- [Multi-region resilience tiers overview](./resilience-tiers.md)
- [Tier 2 — Dual-Region](./dual-region.md)
- [Backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
- [Zeebe backup management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md)
- [Elasticsearch backup](/self-managed/operational-guides/backup-restore/elasticsearch/backup.md)
- [Elasticsearch restore](/self-managed/operational-guides/backup-restore/elasticsearch/restore.md)
- [RDBMS backup](/self-managed/operational-guides/backup-restore/rdbms/backup.md)
- [RDBMS restore](/self-managed/operational-guides/backup-restore/rdbms/restore.md)
