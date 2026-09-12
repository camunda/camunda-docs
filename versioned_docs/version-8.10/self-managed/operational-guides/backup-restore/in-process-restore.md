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
description: "Restore Zeebe partition data in-process without requiring the restart of the brokers themselves."
---

With Camunda 8.10 and later, you can restore Zeebe partition data in-process without requiring the restart of the brokers themselves. In-process restore is a downtime operation that runs while the cluster is in recovery mode, but it does not require any deployment changes or broker restarts, in contrast to the old [standalone restore application](./elasticsearch/restore.md#restore-zeebe-cluster). The brokers keep running, so you don't override the broker start command, set restore-only environment variables, or clear broker data directories yourself.

## How in-process restore works

A restore runs in three phases, driven by two API requests:

1. **Entering recovery mode**: every broker deactivates its partitions and switches to a restricted partition manager. While the cluster is in recovery mode it processes no work, and only read-only operations and restore remain available.
2. **Restoring secondary storage**: while the cluster is in recovery mode, restore the secondary storage to the intended point that the primary storage backup aligns to.
3. **Restoring the partitions**: the cluster plans a single change that, for every broker and partition, first drops the local partition data and then restores that partition from the selected backups. The steps of that plan run one at a time across the cluster.
4. **Returning to processing**: once every partition is restored, the same change switches all brokers back to `PROCESSING` and the partitions become active again.

Both requests are non-blocking. Each is acknowledged as soon as the cluster accepts the change and returns the `changeId` of the cluster configuration change that carries it out.

## Prerequisites

| Prerequisite     | Description                                                                                                                                                                                                                                |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Camunda 8.10 or later, restored with the exact version the backup was created with.                                                                                                                                                        |
| Backup store     | Every broker is configured with the same backup store that holds the backup, as described in the [Elasticsearch and OpenSearch](./elasticsearch/backup.md#prerequisites) or [RDBMS](./rdbms/backup.md#prerequisites) backup prerequisites. |
| Completed backup | A completed backup exists for every partition. List the available backups with the [Zeebe backup management API](./zeebe-backup-and-restore.md#list-backups-api).                                                                          |
| Partition count  | The partition count of the cluster matches the partition count of the backup. Brokers can be scaled between backup and restore as long as the partition count is unchanged.                                                                |
| API access       | Authenticated access to the Orchestration Cluster REST API. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).                                                             |
| Authorizations   | If [authorizations](/components/concepts/access-control/authorizations.md) are enabled, the caller needs the `RESTORE` permission on the `BACKUP` resource.                                                                                |

## Restoring a cluster

The examples below use the following variables:

```bash
export ORCHESTRATION_CLUSTER_API=http://localhost:8080/v2
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600
```

Before you start, be aware of the following. Entering recovery mode stops all processing in the cluster, so plan the restore as a downtime window. The restore then deletes the local partition data on every broker before it writes the data from the backup, and this cannot be undone. Run the restore only against a cluster whose current primary storage data you intend to replace.

### 1. Switch the cluster into recovery mode

[Change the cluster mode](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) to `RECOVERING`:

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

### 2. Restore secondary storage

With the cluster in recovery mode, nothing is exported to secondary storage, so restore it now. Skip this step if secondary storage was already restored another way, for example as part of a wider disaster recovery procedure.

In-process restore only restores Zeebe's primary storage. Restore secondary storage to the point in time you intend to restore the primary storage to, using the procedure for your deployment:

- [Elasticsearch and OpenSearch](./elasticsearch/restore.md#restore-elasticsearch-opensearch): restore the snapshots of all components using the same backup ID you pass to the Zeebe restore in [step 3](#3-trigger-the-restore). A mismatched backup ID produces an inconsistent restore point.
- [Relational databases (RDBMS)](./rdbms/restore.md): restore the database with its native tooling. Camunda aligns the Zeebe and RDBMS restore points automatically.

For the components and coordination rules of each path, see [Camunda back up and restore](./backup-and-restore.md).

Complete this step before you trigger the Zeebe restore. The restore switches the brokers back to `PROCESSING` as soon as the last partition is restored, and processing then resumes against whatever secondary storage is in place.

### 3. Trigger the restore

[Provide the restore parameters](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx). Camunda validates the request, resolves the backups for every partition, and acknowledges the request with `202` before the restore itself runs:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

The response returns the `changeId` of the restore, along with the planned operations. The plan drops and restores every partition of every broker, switches all brokers back to `PROCESSING`, and ends with an incarnation number update:

```json
{
  "changeId": "8",
  "plannedChanges": [
    { "operation": "PartitionPreRestoreOperation", "mode": null },
    { "operation": "PartitionRestoreOperation", "mode": null },
    { "operation": "ModeChangeOperation", "mode": "PROCESSING" },
    { "operation": "AwaitModeChangeOperation", "mode": "PROCESSING" },
    { "operation": "UpdateIncarnationNumberOperation", "mode": null }
  ]
}
```

The partition operations repeat once per broker and partition, and the plan does not name the broker, the partition, or the resolved backup. Use the [restore status](#4-track-the-restore) to see which backups a partition is restored from.

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

### 4. Track the restore

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
| `CANCELLED`   | The restore change was canceled.                                     |

Each partition entry reports the progress of a single broker's copy of that partition:

| State       | Meaning                                                             |
| :---------- | :------------------------------------------------------------------ |
| `PENDING`   | The partition is queued and its restore has not started yet.        |
| `RESTORING` | The partition is being restored from its backups.                   |
| `RESTORED`  | The partition was restored and validated, and `completedAt` is set. |

At most one restore is in flight at any time. Once the restore has finished, this endpoint returns `404` and the per-partition detail is no longer retained, so use the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) to confirm that the restore's `changeId` completed.

### 5. Confirm the cluster state after restore

Check that every partition is active and healthy again:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/topology"
```

The cluster leaves recovery mode as part of the restore, so no further action is required.

## Restore a cluster with multiple Physical Tenants

<span class="badge badge--platform">Self-Managed only</span>

In a cluster running multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md), the `/v2/mode` and `/v2/restore` endpoints used above target a single tenant. An unprefixed request targets the default Physical Tenant; prefix the path with `/physical-tenants/{physicalTenantId}` to target another one.

The cluster-wide counterparts under `/cluster/v2/...` apply the same two-request flow to every Physical Tenant at once and require [cluster admin](/components/admin/cluster-admin.md) access:

| Step          | Tenant-scoped                                          | Cluster-wide               |
| ------------- | ------------------------------------------------------ | -------------------------- |
| Recovery mode | `PATCH /physical-tenants/{physicalTenantId}/v2/mode`   | `PATCH /cluster/v2/mode`   |
| Trigger       | `POST /physical-tenants/{physicalTenantId}/v2/restore` | `POST /cluster/v2/restore` |
| Track         | `GET /physical-tenants/{physicalTenantId}/v2/restore`  | `GET /cluster/v2/restore`  |
| Confirm       | `GET /physical-tenants/{physicalTenantId}/v2/topology` | `GET /cluster/v2/topology` |

### Choose the restore scope

Use a tenant-scoped restore when one Physical Tenant has corrupted or missing data and the other tenants should keep processing. Use a cluster-wide restore when several tenants need recovery, or when the whole cluster must be returned to a coordinated state.

Both cluster-wide endpoints accept an optional `physicalTenantId` query parameter. Naming a tenant restores only that tenant; omitting the parameter restores every configured tenant.

```bash
export CLUSTER_ADMIN_API=http://localhost:8080/cluster/v2

curl -X POST "${CLUSTER_ADMIN_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

To restore tenants from different backups in a single request, supply per-tenant restore arguments in the `overrides` field of the request body. A request that both names a single tenant and supplies overrides is rejected, because the two express conflicting targets.

### Cross-tenant safety

A backup created for one Physical Tenant is not reachable from another tenant's restore. This is enforced by configuration rather than by a runtime check: every Physical Tenant must resolve to a distinct backup store location, and Camunda fails startup if two tenants resolve to the same one. See [storage isolation](/self-managed/concepts/physical-tenants/storage-isolation.md).

Before returning a restored tenant to normal traffic, confirm through tenant-scoped topology that its partitions are healthy, that the expected process definitions, instances, variables, and history are present, and that exporting has resumed.

<!-- TODO(physical-tenants-day-2): Add backend-specific restore fallback steps for primary-storage loss, including the supported RDBMS, Elasticsearch/OpenSearch, and document-store boundaries. Owner/reviewer: Houssain Barouni. -->

## Validate a restore without applying it

Both endpoints accept the `dryRun` query parameter. With `dryRun=true`, the request is validated and the resulting plan is returned, but nothing is applied to the cluster. Use this to check a backup selection before the downtime window starts:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore?dryRun=true" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

A dry run of a restore covers the same validation as the real request. It rejects invalid parameter combinations, checks that a completed backup exists for every partition, and, for an RDBMS time range or an empty request body, resolves the restore point from the backup metadata. A request that passes the dry run is accepted as a real request as long as the cluster and the backup store do not change in between.

The dry run does not report which backups it resolved. The response only contains the `changeId` and the planned operations, in the same shape as a real request, so the concrete backup ID per partition is not part of it. To confirm the selection, list the available backups with the [Zeebe backup management API](./zeebe-backup-and-restore.md#list-backups-api) before the restore, or pass explicit `backupIds` instead of relying on automatic resolution.

## Handle a failed restore

If a single partition fails to restore — for example because its backup is corrupted or the backup store is temporarily unreachable — the partial data of that partition is dropped and the failed step is retried automatically with a backoff. The restore change stays pending, and the restore status keeps reporting the partition as `RESTORING`.

Because the retry is automatic, first try to fix the root cause instead of sending a new restore request. Once the cause is resolved, the pending change continues on its own and completes.

### Retry a restore externally

Automatic retries can't help if the problem is the backup itself, for example if the selected backup is corrupted or turns out to be the wrong restore point. In that case, retry from the outside:

1. Cancel the pending restore change on the management API, using the `changeId` the restore returned:

   ```bash
   curl -X DELETE "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster/changes/8"
   ```

   The restore status reports the change as `CANCELLED`, and the cluster stays in recovery mode.

2. Send a new [restore request](#3-trigger-the-restore). Because each restore drops the local partition data before it writes the backup data, the new attempt does not build on the partial result of the canceled one, and you can select a different backup target.

:::warning
Don't leave a partially failed restore unfinished. Between canceling a restore and completing a new one, Zeebe's internal data is a mix of restored and pre-restore state and cannot be trusted. Keep the cluster in recovery mode and retry until every partition reaches `RESTORED`. If you switch the cluster back to `PROCESSING` in that state, treat it as unrecoverable and restore again from a clean state.
:::
