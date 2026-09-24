---
id: es-restore-api
title: "Restore a backup with the Restore API"
sidebar_label: "Restore API"
keywords:
  ["backup", "backups", "restore", "restore api", "elasticsearch", "opensearch"]
description: "Learn how to restore a Camunda 8 Self-Managed backup with the Orchestration Cluster Restore API when using Elasticsearch or OpenSearch."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BeforeYouStart from '../\_partials/\_restore-api-before-you-start.md';
import TrackRestore from '../\_partials/\_restore-api-track.md';
import FailedRestore from '../\_partials/\_restore-api-failed.md';
import RetryRestore from '../\_partials/\_restore-api-retry.md';
import RestoreHub from '../\_partials/\_restore-camunda-hub-data.md';
import RestoreTemplates from '../\_partials/\_es-restore-templates.md';
import StopOptimize from '../\_partials/\_es-stop-optimize.md';
import DeleteIndices from '../\_partials/\_es-delete-indices.md';
import RestoreSnapshotsAction from '../\_partials/\_es-restore-snapshots-action.md';

Restore Zeebe partition data through the Orchestration Cluster Restore API without restarting the brokers, when using Elasticsearch or OpenSearch as secondary storage.

This page is part of the Elasticsearch/OpenSearch [restore procedure](./restore.md). To compare it with the legacy Restore Application, see [choosing a restore approach](../backup-and-restore.md#choosing-a-restore-approach).

## About the Restore API

With Camunda 8.10 and later, a Restore API recovery runs during a downtime window while the cluster is in recovery mode. It runs in four phases, driven by two API requests:

1. **Entering recovery mode**: every broker deactivates its partitions and switches to a restricted partition manager. While the cluster is in recovery mode it processes no work, and only read-only operations and restore remain available.
2. **Restoring secondary storage**: while the cluster is in recovery mode, restore the Elasticsearch/OpenSearch snapshots for the intended backup ID.
3. **Restoring the partitions**: the cluster plans a single change that, for every broker and partition, first drops the local partition data and then restores that partition from the selected backup. The steps of that plan run one at a time across the cluster.
4. **Returning to processing**: once every partition is restored, the same change switches all brokers back to `PROCESSING` and the partitions become active again.

Both requests are non-blocking. Each is acknowledged as soon as the cluster accepts the change and returns the `changeId` of the cluster configuration change that carries it out.

## Prerequisites

In addition to the [general restore prerequisites](./restore.md#prerequisites), the Restore API requires the following:

| Prerequisite     | Description                                                                                                                                                                                                                    |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Camunda 8.10 or later, restored with the exact version the backup was created with.                                                                                                                                            |
| Backup store     | Every broker is configured with the same backup store that holds the Zeebe backup, and Elasticsearch/OpenSearch is configured with the same snapshot repository as the backup. See [prerequisites](./backup.md#prerequisites). |
| Sizing           | Elasticsearch/OpenSearch should be sized the same or larger than the original cluster; a smaller cluster can prevent shards from being assigned and fail the restore.                                                          |
| Completed backup | A completed backup exists for every partition. List the available backups with [step 2](#find-available-backup-ids) below.                                                                                                     |
| Snapshot backup  | Elasticsearch/OpenSearch snapshots for all components exist under the same backup ID. See [step 3](#restore-es-snapshots-step) below.                                                                                          |
| Optimize stopped | Optimize must be stopped before you restore the Elasticsearch/OpenSearch snapshots in [step 3](#restore-es-snapshots-step); every other component keeps running in recovery mode.                                              |
| Partition count  | The partition count of the cluster matches the partition count of the backup. Brokers can be scaled between backup and restore as long as the partition count is unchanged.                                                    |
| API access       | Authenticated access to the Orchestration Cluster REST API. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).                                                 |
| Authorizations   | If [authorizations](/components/concepts/access-control/authorizations.md) are enabled, the caller needs the `RESTORE` permission on the `BACKUP` resource.                                                                    |

## Restoring an Elasticsearch/OpenSearch-backed cluster

<BeforeYouStart />

### 1. Switch the cluster into recovery mode

[Change the cluster mode](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) to `RECOVERING`:

```bash
curl -X PATCH "${ORCHESTRATION_CLUSTER_API}/mode?mode=RECOVERING"
```

Wait until the mode change has completed. Query the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) and check that `lastChange.id` matches the returned `changeId` and that no `pendingChange` is reported:

```bash
curl "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster"
```

A Restore API request is only accepted while every broker of the cluster is in recovery mode. Requests sent earlier are rejected with `409`.

### 2. Find available backup IDs {#find-available-backup-ids}

With the cluster in recovery mode, use the Orchestration Cluster REST API to list the available runtime and history backups for the current Physical Tenant. Both endpoints require the `BACKUP:READ` permission. Use the returned backup ID to select the matching Elasticsearch/OpenSearch snapshots and Zeebe primary storage backup.

<Tabs groupId="elasticsearch-restore-api-backup-listing">
  <TabItem value="runtime" label="Runtime backups" default>

Use [list runtime backups](/apis-tools/orchestration-cluster-api-rest/specifications/list-runtime-backups.api.mdx) to list available Zeebe primary storage backups. Omit `prefix` to list all backups, or use a numeric prefix followed by `*` to narrow the results.

```bash
curl "${ORCHESTRATION_CLUSTER_API}/backups/runtime"
```

To list backups matching a prefix:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/backups/runtime?prefix=1748937*"
```

  </TabItem>
  <TabItem value="history" label="History backups">

Use [list history backups](/apis-tools/orchestration-cluster-api-rest/specifications/list-history-backups.api.mdx) to list available Operate, Tasklist, and Optimize history backups. This endpoint is available because Elasticsearch/OpenSearch is the secondary storage. Use `verbose=false` when snapshot-level details are not needed.

```bash
curl "${ORCHESTRATION_CLUSTER_API}/backups/history"
```

To list backups matching a prefix without snapshot-level details:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/backups/history?prefix=1748937*&verbose=false"
```

  </TabItem>
</Tabs>

The runtime and history listings are scoped to the Physical Tenant associated with the caller's credentials. For other tenants or all tenants, use the cluster-admin endpoints described in [restoring a cluster with multiple Physical Tenants](#restoring-a-cluster-with-multiple-physical-tenants). Ensure that the runtime and history backups you select use the same backup ID before continuing.

### 3. Restore Elasticsearch/OpenSearch snapshots {#restore-es-snapshots-step}

With the cluster in recovery mode, restore the Elasticsearch/OpenSearch snapshots to the intended point in time, using the same backup ID that you pass to the Restore API. A mismatched backup ID produces an inconsistent restore point.

Keep the Orchestration Cluster running in recovery mode while you restore the snapshots.

<RestoreTemplates />

<StopOptimize />

<DeleteIndices />

<RestoreSnapshotsAction />

Complete this step before you trigger the Zeebe restore. The Restore API switches the brokers back to `PROCESSING` as soon as the last partition is restored, and processing then resumes against whatever secondary storage is in place.

### 4. Trigger the restore {#trigger-the-restore}

[Provide the restore parameters](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx). Camunda validates the request, resolves the backups for every partition, and acknowledges the request with `202` before the restore itself runs:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

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

### 5. Track the Restore API operation

<TrackRestore />

### 6. Confirm the cluster state after Restore API recovery

Check that every partition is active and healthy again using [the topology](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx):

```bash
curl "${ORCHESTRATION_CLUSTER_API}/topology"
```

The cluster leaves recovery mode as part of the restore, so no further action is required.

## Restoring a cluster with multiple Physical Tenants

<span class="badge badge--platform">Self-Managed only</span>

For multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md), tenant-scoped Restore API calls target the Physical Tenant associated with the caller's credentials. To restore another tenant or all tenants, use the cluster-wide endpoints with [cluster admin](/components/admin/cluster-admin.md) access.

| Step          | Tenant-scoped (your own tenant)                                                                           | Cluster-wide (cluster admin)                                                                                                             |
| :------------ | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Recovery mode | [`PATCH /v2/mode`](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx) | [`PATCH /cluster/v2/mode`](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode-as-cluster-admin.api.mdx)       |
| Trigger       | [`POST /v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/restore.api.mdx)           | [`POST /cluster/v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/restore-as-cluster-admin.api.mdx)                 |
| Track         | [`GET /v2/restore`](/apis-tools/orchestration-cluster-api-rest/specifications/get-restore-status.api.mdx) | No cluster-wide status endpoint exists. Check each tenant's own restore status, or confirm recovery through cluster-wide topology below. |
| Confirm       | [`GET /v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx)      | [`GET /cluster/v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-cluster-topology.api.mdx)                     |

Use a tenant-scoped restore when one Physical Tenant has corrupted or missing data and the other tenants should keep processing. Use a cluster-wide restore when several tenants need recovery, or when the whole cluster must be returned to a coordinated state.

The cluster-wide endpoints accept an optional `physicalTenantId` query parameter. Naming a tenant restores only that tenant; omitting the parameter restores every configured tenant. Each tenant must have its own non-overlapping backup location, and the same backup ID must refer to compatible snapshots for every tenant included in the restore.

```bash
export CLUSTER_ADMIN_API=http://localhost:8080/cluster/v2

curl -X POST "${CLUSTER_ADMIN_API}/restore" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

Before returning a restored tenant to normal traffic, confirm through tenant-scoped topology that its partitions are healthy, that the expected data is present, and that exporting has resumed.

## Validating a Restore API request without applying it

The Restore API accepts the `dryRun` query parameter. With `dryRun=true`, the request is validated and the resulting plan is returned, but nothing is applied to the cluster. Use this to check a backup selection before the downtime window starts:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore?dryRun=true" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

A dry run rejects requests without a backup ID, with multiple backup IDs, or with a time range. It also checks that a completed backup exists for every partition. A request that passes the dry run is accepted as a real request as long as the cluster and the backup store do not change in between.

## Handling a failed Restore API operation

<FailedRestore />

### Retry a Restore API operation externally

<RetryRestore />

<RestoreHub />
