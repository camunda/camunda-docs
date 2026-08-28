---
id: backup-restore-overview
title: Backup and restore overview
description: "Understand what Camunda 8 SaaS backups include, how same-cluster restore works, and which limits apply."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

Camunda 8 SaaS lets you create backups and restore a cluster from a selected backup in Console, without opening a support ticket.

Backups are designed for disaster recovery, not long-term archival.

:::note Related pages

- [How to restore a cluster](./how-to-restore.md)
- [Restore scenarios](./restore-scenarios.md)
- [Restore troubleshooting](./restore-troubleshooting.md)
- [Backups](./backups.md)

:::

## What is included in a backup

A backup captures a consistent cluster snapshot across Camunda components:

- Zeebe data
- Operate data
- Tasklist data
- Optimize data
- Exported Zeebe records stored in Elasticsearch/OpenSearch

## Restore model

Restore operates within the same cluster, organization, and region only. The operation is in-place and overwrites current cluster data.

When a restore starts, the cluster enters a restoring state and is unavailable until restore completes.

## Recovery objectives and timing

- RPO depends on your backup cadence and the selected backup point.
- RTO depends mainly on cluster data volume and backend restore duration.

## Backup retention policy

Camunda SaaS retains backups as count-based retention:

- Manual backups: up to five recent backups per cluster category
- Scheduled backups: up to five backups per schedule category

## Limitations and constraints

- Cross-cluster restore is not supported in this release.
- Cross-region restore is not supported in this release.
- Cross-organization restore is not supported in this release.
- Replication factor and node count differences are not blocking constraints for restore.
- Backups created before the restore feature was introduced are not eligible for restore.
- Cluster endpoints do not change after restore; applications reconnect to the same endpoints.
- A new restore request is rejected while another restore is in progress.

## Operations blocked during restore

While restore is in progress, mutating cluster operations are blocked. This includes:

- Create backup
- Start another restore
- Create, update, or delete schedules
- Rename or delete cluster
- Upgrade cluster
- Sleep or wake cluster
- Change IP allowlists
- Change encryption key settings
- Change plan or hardware profile

These operations remain available:

- Delete a stored backup
- View backups and schedules
- Manage connector secrets
- Manage API clients
- View alerts

## API access

You can also initiate restore through the Administration API.

- Endpoint: `POST /api/orgs/:orgId/clusters/:clusterId/backups/:backupId/restore`
- Permission: `CreateHotBackups`

See the [Administration API reference](/apis-tools/administration-api/administration-api-reference.md).
