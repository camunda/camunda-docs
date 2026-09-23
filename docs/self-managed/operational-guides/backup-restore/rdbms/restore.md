---
id: rdbms-restore
title: "Restore a backup (RDBMS)"
sidebar_label: "Restore a backup"
hide_table_of_contents: true
keywords:
  [
    "backup",
    "backups",
    "restore",
    "rdbms",
    "postgresql",
    "mariadb",
    "oracle",
    "sql server",
    "mysql",
    "time range restore",
    "point in time restore",
    "backup range",
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup using a relational database, including all restore options and RDBMS-aware restore."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore a previous backup of your Camunda 8 Self-Managed Orchestration cluster components (Zeebe, Operate, Tasklist, and Admin) when using a relational database management system (RDBMS) as secondary storage.

:::tip
This procedure is the recovery step of [Cold Recovery](../../../concepts/multi-region/cold-recovery.md) when restoring into a secondary region after primary-region loss.
:::

We recommend using the new Restore API approach, however, the legacy Restore Application is still available.

<Tabs groupId="rdbms-restore-approach">
<TabItem value="restore-api" label="Restore API" default>

With Camunda 8.10 and later, you can restore Zeebe partition data through the Orchestration Cluster Restore API without restarting the brokers. Restore API recovery runs during a downtime window with the cluster being in recovery mode.

A Restore API recovery runs in four phases, driven by two API requests:

1. **Entering recovery mode**: every broker deactivates its partitions and switches to a restricted partition manager. While the cluster is in recovery mode it processes no work, and only read-only operations and restore remain available.
2. **Restoring secondary storage**: while the cluster is in recovery mode, restore the RDBMS to the intended point that the primary storage backup aligns to.
3. **Restoring the partitions**: the cluster plans a single change that, for every broker and partition, first drops the local partition data and then restores that partition from the selected backups. The steps of that plan run one at a time across the cluster.
4. **Returning to processing**: once every partition is restored, the same change switches all brokers back to `PROCESSING` and the partitions become active again.

Both requests are non-blocking. Each is acknowledged as soon as the cluster accepts the change and returns the `changeId` of the cluster configuration change that carries it out.

### Restore API prerequisites

| Prerequisite     | Description                                                                                                                                                                    |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Camunda 8.10 or later, restored with the exact version the backup was created with.                                                                                            |
| Backup store     | Every broker is configured with the same backup store that holds the backup, as described in the [RDBMS backup prerequisites](./backup.md#prerequisites).                      |
| Completed backup | A completed backup exists for every partition. List the available backups with the [Zeebe backup management API](../zeebe-backup-and-restore.md#list-backups-api).             |
| Partition count  | The partition count of the cluster matches the partition count of the backup. Brokers can be scaled between backup and restore as long as the partition count is unchanged.    |
| API access       | Authenticated access to the Orchestration Cluster REST API. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md). |
| Authorizations   | If [authorizations](/components/concepts/access-control/authorizations.md) are enabled, the caller needs the `RESTORE` permission on the `BACKUP` resource.                    |

## Restore an RDBMS-backed cluster

The examples below use the following variables:

```bash
export ORCHESTRATION_CLUSTER_API=http://localhost:8080/v2
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600
```

Before you start, be aware of the following. Entering recovery mode stops all processing in the cluster, so plan the restore as a downtime window. The Restore API then deletes the local partition data on every broker before it writes the data from the backup, and this cannot be undone. Run the Restore API only against a cluster whose current primary storage data you intend to replace.

### 1. Switch the cluster into recovery mode

[Change the cluster mode](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) to `RECOVERING`:

```bash
curl -X PATCH "${ORCHESTRATION_CLUSTER_API}/mode?mode=RECOVERING"
```

The response returns the ID of the cluster change and the operations it will apply. The plan contains one `ModeChangeOperation` and one `AwaitModeChangeOperation` per broker:

<details>
<summary>Example response</summary>

```json
{
  "changeId": "7",
  "plannedChanges": [
    {
      "physicalTenantId": "default",
      "operations": [
        { "operation": "ModeChangeOperation", "mode": "RECOVERING" },
        { "operation": "AwaitModeChangeOperation", "mode": "RECOVERING" }
      ]
    }
  ]
}
```

</details>

Wait until this change has completed before you trigger the restore. A restore request is only accepted while every broker of the cluster is in recovery mode. Requests sent earlier are rejected with `409`. Verify that all brokers are in recovery mode using either the Cluster API or the Management API.

<Tabs groupId="recovery-mode-verification">
<TabItem value="cluster-api" label="Cluster API" default>

You can use the [topology API](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx) to verify the state for all partitions and brokers:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/topology"
```

The response shows the current state of all brokers and partitions. In recovery mode, every partition should have the state `recovering`.

<details>
<summary>Example response</summary>

```json
{
  "brokers": [
    {
      "nodeId": 0,
      "brokerId": "0",
      "host": "192.168.1.51",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "inactive",
          "health": "healthy",
          "state": "recovering"
        },
        {
          "partitionId": 2,
          "role": "inactive",
          "health": "healthy",
          "state": "recovering"
        }
      ]
    }
  ]
}
```

</details>

</TabItem>
<TabItem value="management-api" label="Management API">
  Query the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) and check that `lastChange.id` matches the returned `changeId` and that no `pendingChange` is reported. Additionally, you can verify that partitions of all brokers are in `recovering` state.

```bash
curl "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster"
```

</TabItem>
</Tabs>

### 2. Restore RDBMS

With the cluster in recovery mode, nothing is exported to secondary storage, so restore the RDBMS now. Skip this step if the RDBMS was already restored another way, for example as part of a wider disaster recovery procedure.

Restore the RDBMS to the point in time you intend to restore the primary storage to. Camunda aligns the Zeebe and RDBMS restore points automatically.

Complete this step before you trigger the Zeebe restore. The Restore API switches the brokers back to `PROCESSING` as soon as the last partition is restored, and processing then resumes against whatever secondary storage is in place.

### 3. Trigger the restore

There are multiple ways to define your restore point objective depending on your backup strategy. Requests that combine `backupIds` with `from` or `to`, that specify a time range without continuous backups enabled, or that reference a backup with no completed state in the store, are rejected with `400`.

[Provide the restore parameters](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx). Camunda validates the request, resolves the backups for every partition, and acknowledges the request with `202` before the restore itself runs:

<Tabs groupId="rdbms-restore-selection">
  <TabItem value="auto" label="Auto" default>

Camunda resolves the best available restore point automatically for each partition when you omit the request body.

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore"
```

  </TabItem>
  <TabItem value="backup-ids" label="Defined backupIds">

Provide a single backup ID in `backupIds` to restore the selected backup for every partition.

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

  </TabItem>
  <TabItem value="range" label="Range">

With an RDBMS as secondary storage and [continuous backups](./backup.md#continuous-backups) enabled, restore to the closest available checkpoint within an ISO 8601 time range:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "from": "2026-01-01T10:00:00Z", "to": "2026-01-01T12:00:00Z" }'
```

  </TabItem>
  <TabItem value="point-in-time" label="Point-in-time">

With an RDBMS as secondary storage and [continuous backups](./backup.md#continuous-backups) enabled, restore to the closest available checkpoint before a specific ISO 8601 timestamp by providing only the `to` parameter:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "to": "2026-01-01T12:00:00Z" }'
```

  </TabItem>
</Tabs>

The response returns the `changeId` of the restore, along with the planned operations. The plan drops and restores every partition of every broker, switches all brokers back to `PROCESSING`, and ends with an incarnation number update:

<details>
<summary>Example response</summary>

```json
{
  "changeId": "8",
  "plannedChanges": [
    {
      "physicalTenantId": "default",
      "operations": [
        {
          "operation": "PartitionPreRestoreOperation",
          "brokerId": "0",
          "partitionId": 1
        },
        {
          "operation": "PartitionRestoreOperation",
          "brokerId": "0",
          "partitionId": 1,
          "backupIds": [1748937221]
        },
        {
          "operation": "ModeChangeOperation",
          "brokerId": "0",
          "mode": "PROCESSING"
        },
        {
          "operation": "AwaitModeChangeOperation",
          "brokerId": "0",
          "mode": "PROCESSING"
        },
        { "operation": "UpdateIncarnationNumberOperation", "brokerId": "0" }
      ]
    }
  ]
}
```

</details>

### 4. Track the Restore API operation

While a restore is in flight, query [the restore status](/apis-tools/orchestration-cluster-api-rest/specifications/get-restore-status.api.mdx) to track progress per broker and per partition:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/restore"
```

<details>
<summary>Example response</summary>

```json
{
  "status": "IN_PROGRESS",
  "changeId": "8",
  "startedAt": "2026-01-01T10:00:00Z",
  "brokers": [
    {
      "brokerId": "1",
      "partitionsRestored": 1,
      "partitionsToRestore": 2,
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

</details>

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

### 5. Confirm the cluster state after Restore API recovery

The cluster leaves recovery mode as part of the restore, so no further action is required. Use either the [topology API](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx) or the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) to verify that the state of all partitions and brokers has returned to normal operational status after the restore.

<Tabs groupId="post-recovery-mode-verification">
<TabItem value="cluster-api" label="Cluster API" default>

```bash
curl "${ORCHESTRATION_CLUSTER_API}/topology"
```

</TabItem>
<TabItem value="management-api" label="Management API">

```bash
curl "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster"
```

</TabItem>
</Tabs>

## Restore a cluster with multiple Physical Tenants

<span class="badge badge--platform">Self-Managed only</span>

In a cluster running multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md), the `/v2/mode` and `/v2/restore` endpoints used above are scoped to whichever Physical Tenant your credentials belong to. There is no way to target a different tenant from these self-service endpoints, because the tenant is resolved from the caller's identity, not from the request path.

To restore a specific tenant other than your own, or every tenant at once, use the cluster-wide endpoints under `/cluster/v2/...`. These require [cluster admin](/components/admin/cluster-admin.md) access instead of an Orchestration Cluster user's credentials:

| Step          | Tenant-scoped (your own tenant)                                                                           | Cluster-wide (cluster admin)                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Recovery mode | [`PATCH /v2/mode`](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) | [`PATCH /cluster/v2/mode`](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode-as-cluster-admin.api.mdx)       |
| Trigger       | [`POST /v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx)           | [`POST /cluster/v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/restore-as-cluster-admin.api.mdx)                 |
| Track         | [`GET /v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/get-restore-status.api.mdx) | No cluster-wide status endpoint exists. Check each tenant's own restore status, or confirm recovery through cluster-wide topology below. |
| Confirm       | [`GET /v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx)      | [`GET /cluster/v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-cluster-topology.api.mdx)                     |

### Choose the Restore API scope

Use a tenant-scoped restore when one Physical Tenant has corrupted or missing data and the other tenants should keep processing. Use a cluster-wide restore when several tenants need recovery, or when the whole cluster must be returned to a coordinated state.

The cluster-wide endpoints accept an optional `physicalTenantId` query parameter. Naming a tenant restores only that tenant; omitting the parameter restores every configured tenant.

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

## Validate a Restore API request without applying it

Both endpoints accept the `dryRun` query parameter. With `dryRun=true`, the request is validated and the resulting plan is returned, but nothing is applied to the cluster. Use this to check a backup selection before the downtime window starts:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore?dryRun=true" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

A dry run of a restore covers the same validation as the real request. It rejects invalid parameter combinations, checks that a completed backup exists for every partition, and, for an RDBMS time range or an empty request body, resolves the restore point from the backup metadata. A request that passes the dry run is accepted as a real request as long as the cluster and the backup store do not change in between.

The dry run does not report which backups it resolved. The response only contains the `changeId` and the planned operations, in the same shape as a real request, so the concrete backup ID per partition is not part of it. To confirm the selection, list the available backups with the [Zeebe backup management API](../zeebe-backup-and-restore.md#list-backups-api) before the restore, or pass explicit `backupIds` instead of relying on automatic resolution.

## Handle a failed Restore API operation

If a single partition fails to restore — for example because its backup is corrupted or the backup store is temporarily unreachable — the partial data of that partition is dropped and the failed step is retried automatically with a backoff. The restore change stays pending, and the restore status keeps reporting the partition as `RESTORING`.

Because the retry is automatic, first try to fix the root cause instead of sending a new restore request. Once the cause is resolved, the pending change continues on its own and completes.

### Retry a Restore API operation externally

Automatic retries can't help if the problem is the backup itself, for example if the selected backup is corrupted or turns out to be the wrong restore point. In that case, retry from the outside:

1. Cancel the pending restore change on the management API, using the `changeId` the restore returned:

   ```bash
   curl -X DELETE "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster/changes/8"
   ```

   The restore status reports the change as `CANCELLED`, and the cluster stays in recovery mode.

2. Send a new [Restore API request](#3-trigger-the-restore). Because each restore drops the local partition data before it writes the backup data, the new attempt does not build on the partial result of the canceled one, and you can select a different backup target.

:::warning
Don't leave a partially failed restore unfinished. Between canceling a restore and completing a new one, Zeebe's internal data is a mix of restored and pre-restore state and cannot be trusted. Keep the cluster in recovery mode and retry until every partition reaches `RESTORED`. If you switch the cluster back to `PROCESSING` in that state, treat it as unrecoverable and restore again from a clean state.
:::

</TabItem>
<TabItem value="legacy-approach" label="Restore Application (Legacy)">

## Overview

1. **Ensure all [prerequisites](#prerequisites) are met** — all Camunda components are stopped.
2. RDBMS has been restored.
3. **Restore Zeebe** from its primary storage backup using one of the [restore options](#restore-options).
4. **Start all Camunda components.**

## Prerequisites

The following prerequisites are required before you can restore a backup:

| Prerequisite       | Description                                                                                                                                                                                                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Camunda version    | Backups can be restored using the same Camunda version they were created with, or up to one minor version newer. For example, a backup taken with 8.9.x can be restored with 8.9.x or 8.10.x.                             |
| RDBMS restored     | You have already restored the RDBMS from its backup using your database vendor's native tools. The restored database must contain the entire Camunda schema.                                                              |
| Backup available   | At least one Zeebe primary storage backup is available in the configured blob store. See [Create a backup](./backup.md).                                                                                                  |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).                                                                                                           |
| Components stopped | All Camunda components (Zeebe, Operate, Tasklist, Optimize, Connectors) must be stopped before starting the restore process.                                                                                              |
| API access         | For the Restore API procedure, authenticated access to the Orchestration Cluster REST API is required. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md). |
| Authorizations     | For the Restore API procedure, if [authorizations](/components/concepts/access-control/authorizations.md) are enabled, the caller needs the `RESTORE` permission on the `BACKUP` resource.                                |

:::warning
It is critical that no Camunda components are running during the restore. Running components may propagate an incorrect cluster configuration, potentially disrupting cluster communication and data consistency.
:::

## Restore Zeebe from its primary storage backup

Camunda provides a standalone restore application that must be run on each node where a Zeebe Broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured — via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
Persistent volumes or disks must not contain any pre-existing data before restoring Zeebe. If data exists from a previous deployment, it must be cleared first.
:::

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running on this node. The partition count **must be the same** as in the backup.

The number of partitions backed up is also visible via the [backup management API](../zeebe-backup-and-restore.md#list-backups-api).
If brokers were dynamically scaled between backup and restore, this is not an issue — as long as the partition count remains unchanged.
:::

### Restore options

There are four restore options. In all cases, the restore app reads the exporter position from the restored RDBMS to ensure consistency between primary and secondary storage.

:::note
`--backupId` is mutually exclusive with `--from`/`--to`. Specifying both will result in error.
:::

<Tabs groupId="rdbms-legacy-restore-options">
<TabItem value="default" label="Default" default>

**This is the recommended restore option.** No additional parameters are required — the restore application automatically determines the best backup to use.

The restore app reads the exporter position from the restored RDBMS for each partition and identifies the most recent backup taken before that position. It then applies all subsequent backups in the range, restoring up to the latest available backup.

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3" # or GCS, AZURE, FILESYSTEM
    # Rest of the backup store configuration (bucket, region, etc.)
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the RDBMS configuration (URL, username, password)

connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="manual" label="Manual">

```bash
# Ensure RDBMS configuration is set (URL, credentials, etc.)
export CAMUNDA_DATA_SECONDARY_STORAGE_TYPE=rdbms
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://localhost:5432/camunda"
# ... other RDBMS config

# Ensure backup store is configured
export CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE=S3
# ... other store config

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore
```

  </TabItem>
</Tabs>

</TabItem>
<TabItem value="point-in-time" label="Point-in-time">

Restore Zeebe to a specific point in time using `--to`. The restore app finds the closest backup to the provided timestamp. The configured [checkpoint interval](./backup.md#checkpoint-interval) determines how fine-grained the restore points are.

Use the [backup state actuator](../zeebe-backup-and-restore.md#request-runtime-state) to inspect available backup ranges.

<Tabs>
  <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "2026-01-10T14:00:00Z"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3"
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the secondary storage configuration

connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="cli" label="Command line">

```bash
export ZEEBE_RESTORE_TO_TIMESTAMP=2026-01-10T14:00:00Z

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --to="${ZEEBE_RESTORE_TO_TIMESTAMP}"
```

  </TabItem>
</Tabs>

:::warning
The `--to` timestamp must not be before the restored state of the RDBMS. If it is, the secondary storage would be ahead of the primary storage and the restore will fail.
:::

</TabItem>
<TabItem value="time-range" label="Time range">

Constrain the restore to a specific backup range by specifying both `--from` and `--to`. This is useful if automatic matching did not work.

The restore app finds a backup range whose start is at or before `--from` and whose end is at or after `--to`, then restores to the checkpoint closest to `--to`.

<Tabs>
  <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_FROM_TIMESTAMP
      value: "2026-01-10T13:00:00Z"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "2026-01-10T14:00:00Z"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3"
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the secondary storage configuration

connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="cli" label="Command line">

```bash
export ZEEBE_RESTORE_FROM_TIMESTAMP=2026-01-10T13:00:00Z
export ZEEBE_RESTORE_TO_TIMESTAMP=2026-01-10T14:00:00Z

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --from="${ZEEBE_RESTORE_FROM_TIMESTAMP}" --to="${ZEEBE_RESTORE_TO_TIMESTAMP}"
```

  </TabItem>
</Tabs>

:::warning
The `--to` timestamp must not be before the restored state of the RDBMS. If it is, the secondary storage would be ahead of the primary storage and the restore will fail.
:::

</TabItem>
<TabItem value="backup-id" label="Backup ID">

Restore from one or more specific backup IDs directly. Multiple IDs can be provided as a comma-separated list. This is an escape hatch for situations where the automatic matching does not work. Use at your own risk — you are responsible for ensuring that the backups are compatible with the restored RDBMS state.

<Tabs>
  <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3"
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the secondary storage configuration

connectors:
  enabled: false
optimize:
  enabled: false
```

With the backup ID passed as a command-line argument:

```yaml
orchestration:
  command:
    - "/usr/local/camunda/bin/restore"
    - "--backupId=1772001869309,1772001899400"
```

  </TabItem>
  <TabItem value="cli" label="Command line">

```bash
mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --backupId=1772001869309,1772001899400
```

  </TabItem>
</Tabs>

:::caution
When using backup ID restore, the RDBMS exporter position is not consulted. You must ensure that the provided backups are compatible with the restored RDBMS state.
:::

---

</TabItem>
</Tabs>

### Kubernetes-specific behavior

When restoring in Kubernetes using the official [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md), there are specific behaviors to be aware of.

:::note Alternative startup override

An alternative approach to overwriting the startup behavior to restore the partitions:

```yaml
orchestration:
  enabled: true
  command:
    - "/usr/local/camunda/bin/restore"
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
  # all the envs related to the backup store as above
```

:::

The application exits after restore and Kubernetes restarts the pod, which appears as `CrashLoopBackOff`. This is expected behavior. The restore application does not restore state again once partitions are already restored to persistent disk.

After removing the temporary restore command or unsetting `ZEEBE_RESTORE` to restore Zeebe's default behavior, you may optionally restart the StatefulSet to ensure the changes take effect immediately. This can be done by [scaling](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) the StatefulSet down and back up, or by [deleting](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/) the pods so they are recreated with the newly deployed revision.

:::tip
In Kubernetes, Zeebe runs as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which is intended for long-running, persistent applications. Because StatefulSet pods are restarted automatically, restore-mode pods can appear in `CrashLoopBackOff` after a successful restore. Observe Zeebe Broker logs during restore. If a pod has already restarted, use `--previous` to view logs from the completed restore run:

```bash
kubectl logs <zeebe-pod-name> --previous
```

The restore app will not import or overwrite data again, but you may miss the first successful run if you are not observing logs actively.
:::

## Restore success or failure

If restore was successful, the app exits with the log message `Successfully restored broker from backup`.

However, the restore will fail if:

- There is no valid backup matching the secondary storage (the exporter position exceeds all available backups).
- There is no valid backup within the specified time range.
- The backup store is not configured correctly.
- The configured data directory is not empty.
- There is a gap in the backup range needed for restore (missing backups between the range start and the required checkpoint).
- The exporter position in the RDBMS is missing for one or more partitions (when using RDBMS-aware restore).
- Due to any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

### Data directory is not empty

If the data directory is not empty, the restore will fail with an error message:

```
Broker's data directory /usr/local/camunda/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted. In such cases, the restore application can be configured to ignore the presence of these files and folders. The configuration option `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore. By default, it ignores the `lost+found` folder found on ext4 filesystems. To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.

## Start all Camunda 8 components {#start-all-camunda-8-components}

After both primary and secondary storage are restored, start all Camunda components. Ensure all components are configured to use the restored database instance and that the configuration matches the original deployment.

:::note
After starting the components, monitor the logs for any errors or warnings. Components will reconcile their state with the restored data, which may take some time depending on the size of the data. When using RDBMS-aware or time range restore, Zeebe re-exports events from the backup's checkpoint position up to its current state, bringing the RDBMS up to date.
:::

</TabItem>
</Tabs>

## (Optional) Restore Optimize data {#restore-optimize-data}

If you previously backed up Optimize data, restore it independently using the standalone Optimize restore procedure. Optimize can be restored while the Orchestration Cluster restore is in progress or after it completes; the restore procedures are independent.

See [back up and restore Optimize independently](../optimize-backup-and-restore.md#restore-a-backup) for the complete procedure.

## (Optional) Restore Camunda Hub data

If you previously backed up Camunda Hub data, restore it using the same RDBMS restore tools.

See [backup and restore Camunda Hub data](../modeler-backup-and-restore.md) for more details.

## How RDBMS restore works

As described in the [architecture overview](./backup.md#architecture-overview), backups involve two independent systems: **primary storage backups** (Zeebe's log stream and snapshots in a blob store) and the **secondary storage backup** (the RDBMS).

During restore, Zeebe reads the **exporter position** from the restored RDBMS — the last log stream position that was successfully exported — and uses it to determine which primary storage backup, or backups, to restore from. This ensures that Zeebe's state is at least as advanced as what the RDBMS contains. After restart, Zeebe re-exports any events between the RDBMS position and its restored checkpoint position, bringing the secondary storage up to date.

## Multiple physical tenant restore

The Restore application supports multiple physical tenant restores, allowing you to restore one or more tenants without affecting the others on the node. It still requires to be run on all brokers while the cluster is offline. By default, the `default` tenant is always selected as a restore target unless explicitly overridden.

To specify a single tenant to restore, use the `ZEEBE_RESTORE_TENANT_ID` environment variable or the corresponding CLI argument, `--tenantId`. Provide the rest of the restore options as you would for a normal restore.

To perform a cluster-wide restore among all physical tenants simultaneously, use the `ZEEBE_RESTORE_ALL_TENANTS` environment variable or the corresponding CLI argument, `--allTenants`. Provide the rest of the restore options as you would for a normal restore.

During a cluster-wide restore, argument overrides can be provided for individual tenants through the `extraConfiguration` as such:

<Tabs>
<TabItem value="yaml" label="HELM Values">

It is required to include the overrides file in the Spring additional locations by setting the `spring.config.additional-location` property to point to the `restore-overrides.yaml` file.

```yaml
orchestration:
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_ALL_TENANTS
      value: "true"
    - name: ZEEBE_RESTORE_FROM_TIMESTAMP
      value: "<TIMESTAMP>"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "<TIMESTAMP>"

  extraConfiguration:
    - file: restore-overrides.yaml
      content: |
        override:
          tenanta:
            from: "<TIMESTAMP>"
            to: "<TIMESTAMP>"
          tenantb:
            backupId: [32]
```

</TabItem>

<TabItem value="cli" label="CLI Arguments">

```bash
./camunda/bin/restore \
  --allTenants \
  --backupId=1748937221 \
  --override.tenanta.from=<TIMESTAMP> --override.tenanta.to=<TIMESTAMP> \
  --override.tenantb.backupId=32
```

</TabItem>
</Tabs>
