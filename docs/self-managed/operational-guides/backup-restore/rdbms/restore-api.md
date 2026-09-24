---
id: rdbms-restore-api
title: "Restore a backup with the Restore API (RDBMS)"
sidebar_label: "Restore API"
keywords:
  [
    "backup",
    "backups",
    "restore",
    "restore api",
    "rdbms",
    "point in time restore",
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup with the Orchestration Cluster Restore API when using a relational database as secondary storage."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BeforeYouStart from '../\_partials/\_restore-api-before-you-start.md';
import TrackRestore from '../\_partials/\_restore-api-track.md';
import FailedRestore from '../\_partials/\_restore-api-failed.md';
import RetryRestore from '../\_partials/\_restore-api-retry.md';
import RestoreOptimize from '../\_partials/\_restore-optimize-data.md';
import RestoreHub from '../\_partials/\_restore-camunda-hub-data.md';

Restore Zeebe partition data through the Orchestration Cluster Restore API without restarting the brokers, when using a relational database management system (RDBMS) as secondary storage.

This page is part of the RDBMS [restore procedure](./restore.md). To compare it with the legacy Restore Application, see [choosing a restore approach](../backup-and-restore.md#choosing-a-restore-approach).

## About the Restore API

With Camunda 8.10 and later, a Restore API recovery runs during a downtime window while the cluster is in recovery mode. It runs in four phases, driven by two API requests:

1. **Entering recovery mode**: every broker deactivates its partitions and switches to a restricted partition manager. While the cluster is in recovery mode it processes no work, and only read-only operations and restore remain available.
2. **Restoring secondary storage**: while the cluster is in recovery mode, restore the RDBMS to the intended point that the primary storage backup aligns to.
3. **Restoring the partitions**: the cluster plans a single change that, for every broker and partition, first drops the local partition data and then restores that partition from the selected backups. The steps of that plan run one at a time across the cluster.
4. **Returning to processing**: once every partition is restored, the same change switches all brokers back to `PROCESSING` and the partitions become active again.

Both requests are non-blocking. Each is acknowledged as soon as the cluster accepts the change and returns the `changeId` of the cluster configuration change that carries it out.

## Prerequisites

The Restore API requires the following:

| Prerequisite     | Description                                                                                                                                                                                    |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Camunda 8.10 or later, restored with the exact version the backup was created with.                                                                                                            |
| Backup store     | Every broker is configured with the same backup store that holds the backup, as described in the [RDBMS backup prerequisites](./backup.md#prerequisites).                                      |
| Completed backup | A completed backup exists for every partition. List the available backups with [list runtime backups](/apis-tools/orchestration-cluster-api-rest/specifications/list-runtime-backups.api.mdx). |
| Partition count  | The partition count of the cluster matches the partition count of the backup. Brokers can be scaled between backup and restore as long as the partition count is unchanged.                    |
| API access       | Authenticated access to the Orchestration Cluster REST API. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).                 |
| Authorizations   | If [authorizations](/components/concepts/access-control/authorizations.md) are enabled, the caller needs the `RESTORE` permission on the `BACKUP` resource.                                    |

## Restoring an RDBMS-backed cluster

<BeforeYouStart />

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

### 3. Trigger the restore {#trigger-the-restore}

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

<TrackRestore />

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

## Restoring a cluster with multiple Physical Tenants

<span class="badge badge--platform">Self-Managed only</span>

In a cluster running multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md), the `/v2/mode` and `/v2/restore` endpoints used above are scoped to whichever Physical Tenant your credentials belong to. There is no way to target a different tenant from these self-service endpoints, because the tenant is resolved from the caller's identity, not from the request path.

To restore a specific tenant other than your own, or every tenant at once, use the cluster-wide endpoints under `/cluster/v2/...`. These require [cluster admin](/components/admin/cluster-admin.md) access instead of an Orchestration Cluster user's credentials:

| Step          | Tenant-scoped (your own tenant)                                                                           | Cluster-wide (cluster admin)                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Recovery mode | [`PATCH /v2/mode`](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) | [`PATCH /cluster/v2/mode`](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode-as-cluster-admin.api.mdx)       |
| Trigger       | [`POST /v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx)           | [`POST /cluster/v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/restore-as-cluster-admin.api.mdx)                 |
| Track         | [`GET /v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/get-restore-status.api.mdx) | No cluster-wide status endpoint exists. Check each tenant's own restore status, or confirm recovery through cluster-wide topology below. |
| Confirm       | [`GET /v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx)      | [`GET /cluster/v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-cluster-topology.api.mdx)                     |

### Choosing the Restore API scope

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

## Validating a Restore API request without applying it

Both endpoints accept the `dryRun` query parameter. With `dryRun=true`, the request is validated and the resulting plan is returned, but nothing is applied to the cluster. Use this to check a backup selection before the downtime window starts:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore?dryRun=true" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

A dry run of a restore covers the same validation as the real request. It rejects invalid parameter combinations, checks that a completed backup exists for every partition, and, for an RDBMS time range or an empty request body, resolves the restore point from the backup metadata. A request that passes the dry run is accepted as a real request as long as the cluster and the backup store do not change in between.

The dry run does not report which backups it resolved. The response only contains the `changeId` and the planned operations, in the same shape as a real request, so the concrete backup ID per partition is not part of it. To confirm the selection, list the available backups with the [Zeebe backup management API](../zeebe-backup-and-restore.md#list-backups-api) before the restore, or pass explicit `backupIds` instead of relying on automatic resolution.

## Handling a failed Restore API operation

<FailedRestore />

### Retry a Restore API operation externally

<RetryRestore />

<RestoreOptimize />

<RestoreHub />
