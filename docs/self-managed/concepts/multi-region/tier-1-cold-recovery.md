---
id: tier-1-cold-recovery
title: "Tier 1: Cold Recovery"
sidebar_label: "Tier 1 — Cold Recovery"
description: "Cold backup-based disaster recovery for Camunda Self-Managed: backup scope, cross-region S3 configuration, restore procedure, per-component RTO/RPO breakdown, and DR drill checklist."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tier 1 is Camunda's lowest-cost multi-region resilience configuration. It provides a documented, repeatable recovery path from complete primary-region loss using scheduled backups exported to cross-region object storage and a manual restore procedure into a secondary region.

Tier 1 is suited for development and staging environments, low-criticality production workloads, and deployments where recovery measured in hours is operationally acceptable.

| Property | Value |
|----------|-------|
| **RTO** | ~2–8 hours (operator and environment dependent) |
| **RPO** | 15 minutes – 4 hours (backup-interval dependent) |
| **Failover mode** | Manual, human-initiated |
| **Standing second region required** | No — restore into a newly provisioned region |
| **Primary compliance fit** | Basic BCM requirements |

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

A complete Tier 1 backup covers two storage layers. Both must be backed up — and ideally aligned in time — to produce a consistent restore point.

| Layer | Backup target | Backup mechanism |
|-------|--------------|-----------------|
| **Primary storage** (Zeebe log stream) | Zeebe partition snapshots | Zeebe Backup Management API |
| **Secondary storage** (Elasticsearch) | Elasticsearch index snapshots | Elasticsearch Snapshot API |
| **Secondary storage** (RDBMS) | Database dump or continuous backup | Database-native tools (`pg_dump`, Oracle RMAN, AWS RDS automated backup) |

:::note
Restoring only Zeebe without the corresponding secondary storage backup (or vice versa) will produce an inconsistent cluster. The two backups are correlated by backup ID on the Elasticsearch path, or by timestamp alignment on the RDBMS path.
:::

### Backup scope by component

| Component | Included in Tier 1 backup | Notes |
|-----------|--------------------------|-------|
| **Zeebe** (primary storage) | Yes — partition snapshots | Required |
| **Operate** | Yes — via Elasticsearch or RDBMS backup | State is stored in secondary storage |
| **Tasklist** | Yes — via Elasticsearch or RDBMS backup | State is stored in secondary storage |
| **Admin / Identity** | Yes — via Elasticsearch or RDBMS backup | Authentication and authorization configuration |
| **Optimize** | Elasticsearch path only | Not supported with RDBMS secondary storage |
| **Web Modeler** | Not included | Standalone component; back up independently |
| **Connectors** | Not included | Stateless; redeploy from source |

## Backup configuration

### S3 cross-region replication

Configure your primary S3 backup bucket to replicate objects to a bucket in the secondary AWS region. This ensures backup data is available for restore even if the primary region's S3 service is unavailable.

```hcl
# Terraform example — S3 bucket with cross-region replication
resource "aws_s3_bucket" "camunda_backup_primary" {
  bucket = "camunda-backup-us-east-1"
}

resource "aws_s3_bucket_versioning" "primary_versioning" {
  bucket = aws_s3_bucket.camunda_backup_primary.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_replication_configuration" "replication" {
  bucket = aws_s3_bucket.camunda_backup_primary.id
  role   = aws_iam_role.s3_replication.arn

  rule {
    id     = "replicate-camunda-backups"
    status = "Enabled"

    destination {
      bucket        = aws_s3_bucket.camunda_backup_replica.arn
      storage_class = "STANDARD_IA"
    }
  }
}
```

### Zeebe backup configuration

Configure Zeebe to use S3 as the backup store. Apply the same configuration on all brokers in your cluster.

```yaml
# Helm chart values.yaml excerpt
zeebe:
  env:
    - name: ZEEBE_BROKER_DATA_BACKUP_STORE
      value: S3
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME
      value: "camunda-backup-us-east-1"
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_REGION
      value: "us-east-1"
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_ENDPOINT
      value: ""  # leave empty for standard AWS S3
```

See [Zeebe S3 backup configuration](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackups3) for all available parameters.

### Backup schedule

{TODO: Engineering — provide a recommended backup frequency, a Kubernetes CronJob example for triggering the Zeebe Backup API on a schedule, and coordination guidance for aligning Zeebe and Elasticsearch backup IDs.}

For reference, the Camunda community maintains a backup automation example at [camunda-consulting/c8-devops-workshop](https://github.com/camunda-consulting/c8-devops-workshop/tree/main/03%20-%20Lab%203%20-%20Backup%20and%20Restore).

## RTO and RPO breakdown per component

The following table provides per-component estimates. Values assume a 15-minute backup schedule and a data volume within normal production range. Your actual figures will vary.

| Component | RPO | RTO contribution | Notes |
|-----------|-----|-----------------|-------|
| **Zeebe** (primary storage) | = backup interval (15 min – 4 h) | Snapshot download and restore time | RPO equals the age of the last completed Zeebe backup at the time of failure. |
| **Operate** | = secondary storage backup interval | Included in ES / RDBMS restore | Operate state is stored in secondary storage; its RPO tracks the secondary storage backup frequency. |
| **Tasklist** | = secondary storage backup interval | Included in ES / RDBMS restore | Same as Operate. |
| **Admin / Identity** | = secondary storage backup interval | Included in ES / RDBMS restore | Auth configuration is lost if it changed after the last backup. |
| **Infrastructure provisioning** | N/A | 20–60 minutes | Time to provision a Kubernetes / ECS cluster in the secondary region. Reduced to <10 minutes with a pre-provisioned, scaled-down cluster. |
| **Backup download** | N/A | 10 min – 2 hours | Depends on snapshot size and cross-region bandwidth. |
| **Restore and startup** | N/A | 10–30 minutes | Includes Zeebe restore API, ES index restore, and pod startup. |
| **Total (typical)** | **15 min – 4 hours** | **~2–8 hours** | Wide range due to operator speed, data volume, and whether a secondary region is pre-provisioned. |

:::tip Reduce RTO with a pre-provisioned secondary region
Maintaining a scaled-down (but provisioned) Kubernetes cluster in the secondary region eliminates the infrastructure provisioning step and can reduce total RTO to the lower end of the 2–8 hour range.
:::

## Restore procedure

### Prerequisites

- A complete backup set (Zeebe snapshots + secondary storage) is confirmed available in the cross-region S3 bucket.
- You have recorded the backup ID (Elasticsearch path) or backup timestamp (RDBMS path) for the last successful backup.
- An AWS environment in the secondary region is available or can be provisioned.
- You have `kubectl` (Kubernetes) or equivalent ECS access for the secondary region.

### Step 1 — Provision the secondary region environment

If a secondary region cluster does not exist, provision it now.

```bash
# Apply your Terraform configuration targeting the secondary region
terraform apply -target=module.eks_secondary

# Verify access once provisioned
kubectl --context secondary-region get nodes
```

{TODO: Engineering — provide a reference Terraform / Helm values snippet for a minimal restore-ready Camunda environment.}

### Step 2 — Configure backup store access

Point the secondary region Helm chart values to the **replica** bucket in the secondary AWS region.

```yaml
# values-restore.yaml
zeebe:
  env:
    - name: ZEEBE_BROKER_DATA_BACKUP_STORE
      value: S3
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME
      value: "camunda-backup-us-west-2"   # replica bucket
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_REGION
      value: "us-west-2"
```

### Step 3 — List and select the restore point

Before restoring, confirm which backup IDs are available.

```bash
# Port-forward to the Zeebe gateway management port
kubectl --context secondary-region -n camunda \
  port-forward svc/camunda-zeebe-gateway 9600:9600 &

# List available backups
curl -s http://localhost:9600/actuator/backupRuntime \
  | jq '.backups[] | {backupId, state, createdAt}'
```

Select the most recent backup with `state: "COMPLETED"`.

### Step 4 — Restore Zeebe from snapshot

```bash
export BACKUP_ID=<your_completed_backup_id>

curl -s -X POST http://localhost:9600/actuator/backupRuntime/restore \
  -H "Content-Type: application/json" \
  -d "{\"backupId\": $BACKUP_ID}"

# Poll for restore completion
curl -s http://localhost:9600/actuator/backupRuntime/$BACKUP_ID \
  | jq '{state, details}'
```

See [Zeebe backup management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md) for the full API reference.

### Step 5 — Restore secondary storage

<Tabs groupId="secondary-storage">
  <TabItem value="elasticsearch" label="Elasticsearch" default>

Restore the Elasticsearch snapshot that corresponds to your selected Zeebe backup ID.

```bash
# List available snapshots in the backup repository
curl -s http://localhost:9200/_snapshot/camunda_backup/_all?pretty \
  | jq '.snapshots[] | {snapshot, state, start_time}'

# Restore the snapshot matching your Zeebe backup ID
export SNAPSHOT_NAME="camunda_backup_${BACKUP_ID}"

curl -X POST "http://localhost:9200/_snapshot/camunda_backup/${SNAPSHOT_NAME}/_restore" \
  -H "Content-Type: application/json" \
  -d '{
    "indices": "operate-*,tasklist-*,identity-*",
    "ignore_unavailable": true,
    "include_global_state": false
  }'
```

See [Elasticsearch restore](/self-managed/operational-guides/backup-restore/elasticsearch/restore.md) for the full procedure.

  </TabItem>
  <TabItem value="rdbms" label="RDBMS">

Restore the database backup. Camunda automatically aligns Zeebe state and RDBMS state during startup — no manual backup ID coordination is required.

```bash
# PostgreSQL / Amazon RDS example
pg_restore \
  --host=<secondary-rds-endpoint> \
  --port=5432 \
  --username=camunda \
  --dbname=camunda \
  <backup-file>.dump

# {TODO: Engineering — add Oracle RMAN restore example}
```

See [RDBMS restore](/self-managed/operational-guides/backup-restore/rdbms/restore.md) for the full procedure.

  </TabItem>
</Tabs>

### Step 6 — Deploy and start the Orchestration Cluster

Deploy Camunda in the secondary region, pointing to the restored data volumes.

```bash
helm install camunda camunda/camunda-platform \
  --namespace camunda \
  --create-namespace \
  --values values-restore.yaml
```

Wait for all pods to reach `Running` state:

```bash
kubectl --context secondary-region -n camunda get pods --watch
```

### Step 7 — Verify cluster health

```bash
# Check Zeebe gateway health
curl -s http://localhost:9600/actuator/health | jq '.status'
# Expected: "UP"

# Verify Operate is accessible and shows expected process instances
# Navigate to the Operate UI at the secondary region endpoint
```

{TODO: Engineering — add a post-restore health verification checklist covering Zeebe partition status, Operate index freshness, and Identity configuration.}

### Step 8 — Redirect production traffic

Update your DNS records or load balancer configuration to route traffic to the secondary region endpoint.

:::warning
Do not redirect production traffic until all health checks in Step 7 pass. A partially restored cluster can produce data inconsistencies.
:::

## DR drill checklist

Run this drill at least quarterly to validate your Tier 1 recovery posture. Perform drills in a non-production environment that mirrors your production setup as closely as possible.

```
Tier 1 DR Drill Checklist
=========================

Preparation
[ ] Last successful Zeebe backup ID (or timestamp) confirmed and recorded
[ ] Corresponding secondary storage backup confirmed (Elasticsearch or RDBMS)
[ ] Cross-region S3 replication verified: backup data accessible from secondary region bucket
[ ] Secondary region environment provisioned (or documented provisioning time validated)
[ ] Helm chart values for secondary region (values-restore.yaml) reviewed and current
[ ] AWS access credentials for secondary region verified

Restore execution (non-production environment)
[ ] Step 1: Secondary region cluster provisioned within expected time — actual: _____ min
[ ] Step 2: Backup store (replica S3 bucket) configured in Helm values
[ ] Step 3: Available backup IDs listed; restore point selected
[ ] Step 4: Zeebe restored from snapshot — restore state: COMPLETED confirmed via API
[ ] Step 5: Secondary storage restored
       [ ] Elasticsearch snapshot restored and all indices healthy
       [ ] OR: RDBMS restored and Camunda startup alignment confirmed
[ ] Step 6: Orchestration Cluster deployed — all pods Running
[ ] Step 7: Health checks passed
       [ ] Zeebe gateway: UP
       [ ] Operate: accessible, recent process instances visible
       [ ] Identity: authentication functional
[ ] Step 8: DNS/load balancer redirect validated (test traffic only, not production)

Measurement
[ ] Total time from drill start to traffic live: _______ minutes
[ ] Effective RPO (age of selected backup at time of drill): _______ minutes
[ ] Steps that exceeded expected duration: _______________________
[ ] Issues or gaps discovered: _______________________
[ ] Follow-up actions required: _______________________

Sign-off
[ ] Drill completed by: _______________________ Date: _______________
[ ] Results reviewed by: _______________________
```

## Related documentation

- [Multi-region resilience tiers overview](./resilience-tiers.md)
- [Tier 2 — Warm Standby](./tier-2-warm-standby.md)
- [Camunda backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
- [Zeebe backup management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md)
- [Elasticsearch backup](/self-managed/operational-guides/backup-restore/elasticsearch/backup.md)
- [Elasticsearch restore](/self-managed/operational-guides/backup-restore/elasticsearch/restore.md)
- [RDBMS backup](/self-managed/operational-guides/backup-restore/rdbms/backup.md)
- [RDBMS restore](/self-managed/operational-guides/backup-restore/rdbms/restore.md)
