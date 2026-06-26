---
id: how-to-restore
title: Restore a cluster from backup
description: "Restore a Camunda 8 SaaS cluster from a selected backup in Console."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

Use this guide to restore a SaaS cluster from an existing backup.

:::note Related pages

- [Backup and restore overview](./backup-restore-overview.md)
- [Restore scenarios](./restore-scenarios.md)
- [Restore troubleshooting](./restore-troubleshooting.md)

:::

## Before you start

- You need organization admin permissions for the target cluster.
- The backup must be in `Completed` state.
- The backup must include a `generationUuid` label.
- Restore must not already be in progress for the cluster.
- Partition count in the backup must match the cluster partition count.

Restore is destructive for current cluster data and causes cluster unavailability during execution.

<!-- TODO(restore-from-backup): Add concrete user-facing downtime guidance once validated restore timing guidance is published. -->

## Restore in Console

1. Open **Console** and select your organization.
2. Open the target cluster and go to **Backups**.
3. In the backup list, find the backup you want to restore.
4. Click **Restore** on that backup row.
5. In the confirmation modal, verify:
   - Backup name
   - Backup completion date
   - Backup version
6. If the backup version differs from the current cluster version, review the warning and select the acknowledgment checkbox.
7. Click **Restore** to start.

After confirmation, cluster status changes to **Restoring** and the cluster is unavailable until completion.

<!-- TODO(restore-from-backup): Add screenshots for Backups table row action, restore confirmation modal, version-mismatch warning, and restoring status. Capture from staging once the final UI is available. -->

## Monitor restore progress

During restore:

- Cluster status shows **Restoring**.
- Component cards show **Restoring**.
- Restore-conflicting actions are disabled.
- Backups tab shows active restore context.

Phase-level progress is not shown in Console in this release.

## Confirm outcome

On success:

- Cluster status returns to **Healthy**.
- A success notification confirms which backup was restored.
- You can validate behavior in Operate and other cluster applications.

On failure:

- Cluster data remains unchanged.
- Cluster status returns to prior healthy/available state.
- Error notification is shown on the Backups tab until dismissed.

For failure handling, see [Restore troubleshooting](./restore-troubleshooting.md).

## Restore with API

You can trigger restore from the Administration API:

```http
POST /api/orgs/:orgId/clusters/:clusterId/backups/:backupId/restore
```

Expected response:

- `202 Accepted` with restore metadata

Common error responses:

- `400` for invalid backup state, legacy backup, or compatibility failure
- `404` for missing cluster or backup
- `409` when a restore is already in progress
- `501` when feature flag is disabled
