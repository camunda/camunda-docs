---
id: in-process-restore
title: "Restore a cluster in place"
sidebar_label: "In-process restore"
keywords:
  [
    "backup",
    "backups",
    "restore",
    "recovery",
    "recovery mode",
    "in-process restore",
  ]
description: "Restore Zeebe partition data on running brokers by switching the cluster into recovery mode and triggering a restore over the Orchestration Cluster REST API."
---

In-process restore restores Zeebe partition data on the brokers that are already running. In Camunda 8.10 and later, you switch the cluster into recovery mode, trigger a restore over the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), and track its progress per broker and partition.

Compared to the [standalone restore application](./elasticsearch/restore.md#restore-zeebe-cluster), in-process restore requires no deployment changes. The brokers keep running, so you don't override the broker start command, set restore-only environment variables, or clear broker data directories yourself.

The procedure uses two endpoints: [change cluster mode](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) and [restore from a backup](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx).

## How in-process restore works

A restore runs in three phases, driven by two API requests:

1. **Entering recovery mode**: every broker deactivates its partitions and switches to a restricted partition manager. While the cluster is in recovery mode it processes no work, and only read-only operations and restore remain available.
2. **Restoring the partitions**: the cluster plans a single change that, for every broker and partition, first drops the local partition data and then restores that partition from the selected backups. The steps of that plan run one at a time across the cluster.
3. **Returning to processing**: once every partition is restored, the same change switches all brokers back to `PROCESSING` and the partitions become active again. You don't send a second mode change request for this.

Both requests are non-blocking. Each is acknowledged as soon as the cluster accepts the change and returns the `changeId` of the cluster configuration change that carries it out.

## Prerequisites

| Prerequisite     | Description                                                                                                                                                                                                                                |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Camunda 8.10 or later, restored with the exact version the backup was created with.                                                                                                                                                        |
| Backup store     | Every broker is configured with the same backup store that holds the backup, as described in the [Elasticsearch and OpenSearch](./elasticsearch/backup.md#prerequisites) or [RDBMS](./rdbms/backup.md#prerequisites) backup prerequisites. |
| Completed backup | A completed backup exists for every partition. List the available backups with the [Zeebe backup management API](./zeebe-backup-and-restore.md#list-backups-api).                                                                          |
| Partition count  | The partition count of the cluster matches the partition count of the backup. Brokers can be scaled between backup and restore as long as the partition count is unchanged.                                                                |
| API access       | Authenticated access to the Orchestration Cluster REST API. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).                                                             |

## Step 1: Restore secondary storage

Restore your secondary storage to the point in time you intend to restore Zeebe's primary storage to, before you touch the cluster's mode. In-process restore only restores Zeebe's primary storage; secondary storage is restored independently, using the procedure for your deployment:

- [Elasticsearch and OpenSearch](./elasticsearch/restore.md#restore-elasticsearch-opensearch): restore the snapshots of all components using the same backup ID you'll use for the Zeebe restore in [step 2](#step-2-restore-a-cluster-in-place). A mismatched backup ID produces an inconsistent restore point.
- [Relational databases (RDBMS)](./rdbms/restore.md): restore the database with its native tooling. Camunda aligns the Zeebe and RDBMS restore points automatically.

For the components and coordination rules of each path, see [Camunda back up and restore](./backup-and-restore.md).

## Step 2: Restore a cluster in place

The examples below use the following variables:

```bash
export ORCHESTRATION_CLUSTER_API=http://localhost:8080/v2
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600
```

Before you start, be aware of the following. Entering recovery mode stops all processing in the cluster, so plan the restore as a downtime window. The restore then deletes the local partition data on every broker before it writes the data from the backup, and this cannot be undone. Run the restore only against a cluster whose current primary storage data you intend to replace.

### 1. Switch the cluster into recovery mode

Change the cluster mode to `RECOVERING`:

```bash
curl -X PATCH "${ORCHESTRATION_CLUSTER_API}/mode?mode=RECOVERING"
```

The response returns the ID of the cluster change and the operations it will apply. The plan contains one `ModeChangeOperation` and one `AwaitModeChangeOperation` per broker:

```json
{
  "changeId": "7",
  "plannedChanges": [
    { "operation": "ModeChangeOperation", "mode": "RECOVERING" },
    { "operation": "AwaitModeChangeOperation", "mode": "RECOVERING" }
  ]
}
```

Wait until this change has completed before you trigger the restore. Query the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) and check that `lastChange.id` matches the returned `changeId` and that no `pendingChange` is reported:

```bash
curl "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster"
```

A restore is only accepted while every broker of the cluster is in recovery mode. Requests sent earlier are rejected with `409`.

### 2. Trigger the restore

Post the backup to restore from. Camunda validates the request, resolves the backups for every partition, and acknowledges the request with `202` before the restore itself runs:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

The response returns the `changeId` of the restore, along with the planned operations. The plan ends with the mode change back to `PROCESSING`:

```json
{
  "changeId": "8",
  "plannedChanges": [
    { "operation": "PartitionPreRestoreOperation", "mode": null },
    { "operation": "PartitionRestoreOperation", "mode": null },
    { "operation": "ModeChangeOperation", "mode": "PROCESSING" },
    { "operation": "AwaitModeChangeOperation", "mode": "PROCESSING" }
  ]
}
```

How you select the data to restore depends on your secondary storage:

| Secondary storage            | Selection                                                               | Notes                                                                                                                                                                                                                                                     |
| :--------------------------- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elasticsearch and OpenSearch | A single backup ID in `backupIds`.                                      | Restoring from a time range or from multiple backups is not supported.                                                                                                                                                                                    |
| RDBMS                        | `backupIds`, the time range `from` and `to`, or no request body at all. | Omitting both resolves the best available restore point automatically, the same default behavior as the [standalone restore app](./rdbms/restore.md#default-restore). The time range requires [continuous backups](./rdbms/backup.md#continuous-backups). |

With an RDBMS as secondary storage and continuous backups enabled, restore to a point in time by passing an ISO 8601 range instead of backup IDs:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "from": "2026-01-01T10:00:00Z", "to": "2026-01-01T12:00:00Z" }'
```

With an RDBMS as secondary storage, you can also omit the request body entirely to let Camunda resolve the restore point for each partition automatically:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore"
```

Requests that combine `backupIds` with `from` or `to`, that specify a time range without continuous backups enabled, or that reference a backup with no completed state in the store, are rejected with `400`.

### 3. Track the restore

While a restore is in flight, the restore status reports progress per broker and per partition:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/restore"
```

```json
{
  "status": "IN_PROGRESS",
  "changeId": "8",
  "startedAt": "2026-01-01T10:00:00Z",
  "brokers": [
    {
      "brokerId": "1",
      "partitionsRestored": 1,
      "partitionsToRestore": 3,
      "partitions": [
        {
          "partitionId": 1,
          "state": "RESTORED",
          "backupIds": [1748937221],
          "completedAt": "2026-01-01T10:02:00Z"
        },
        {
          "partitionId": 2,
          "state": "RESTORING",
          "backupIds": [1748937221],
          "completedAt": null
        }
      ]
    }
  ]
}
```

The overall `status` reports the state of the cluster change that performs the restore:

| Status        | Meaning                                                              |
| :------------ | :------------------------------------------------------------------- |
| `IN_PROGRESS` | The restore is running.                                              |
| `COMPLETED`   | Every partition was restored and the brokers returned to processing. |
| `FAILED`      | The restore change failed and did not complete.                      |
| `CANCELLED`   | The restore change was cancelled.                                    |

Each partition entry reports the progress of a single broker's copy of that partition:

| State       | Meaning                                                             |
| :---------- | :------------------------------------------------------------------ |
| `PENDING`   | The partition is queued and its restore has not started yet.        |
| `RESTORING` | The partition is being restored from its backups.                   |
| `RESTORED`  | The partition was restored and validated, and `completedAt` is set. |

At most one restore is in flight at any time. Once the restore has finished, this endpoint returns `404` and the per-partition detail is no longer retained, so use the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) to confirm that the restore's `changeId` completed.

### 4. Confirm the cluster processes work again

Check that every partition is active and healthy again:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/topology"
```

The cluster leaves recovery mode as part of the restore, so no further mode change is required.

## Validate a restore without applying it

Both endpoints accept the `dryRun` query parameter. With `dryRun=true`, the request is validated and the resulting plan is returned, but nothing is applied to the cluster. Use this to check a backup selection before the downtime window starts:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore?dryRun=true" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

## Handle a failed restore

If a single partition fails to restore — for example because its backup is corrupted or the backup store is temporarily unreachable — the partial data of that partition is dropped and the failed step is retried automatically with a backoff. The restore change stays pending, and the restore status keeps reporting the partition as `RESTORING`.

Because the retry is automatic, fix the root cause instead of sending a new restore request. Once the cause is resolved, the pending change continues on its own and completes.

:::warning
Don't abandon a restore that has partially failed. If you cancel a pending restore change or otherwise stop retrying before every partition reaches `RESTORED`, Zeebe's internal data is left in a mix of restored and pre-restore state and can no longer be trusted. Resolve the failure so the pending change completes, or, if you must abandon it, treat the cluster as unrecoverable and restore again from a clean state.
:::

To leave recovery mode without restoring, for example if the cluster was switched into recovery mode by mistake before a restore was ever triggered, change the mode back:

```bash
curl -X PATCH "${ORCHESTRATION_CLUSTER_API}/mode?mode=PROCESSING"
```
