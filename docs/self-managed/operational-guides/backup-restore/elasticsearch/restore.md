---
id: es-restore
title: "Restore a backup"
sidebar_label: "Restore a backup"
hide_table_of_contents: true
keywords: ["backup", "backups", "restore", "elasticsearch", "opensearch"]
description: "Learn how to restore a Camunda 8 Self-Managed backup using Elasticsearch or OpenSearch."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore a previous backup of your Camunda 8 Self-Managed components and cluster.

## About restoring a backup

:::note
When restoring Camunda 8 from a backup, all components must be restored from their backup that corresponds to the same backup ID.
:::

## Prerequisites

The following general prerequisites are required before you can restore a backup:

| Prerequisite          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component clean state | The restore process assumes a **clean state** for all components, including Elasticsearch/OpenSearch. This means **no prior persistent volumes** or **component state** should exist - all data is restored from scratch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Camunda version       | <p>**Backups must be restored** using the **exact Camunda version** they were created with. As noted during the backup process, the version is embedded in the backup name.</p><p>This is essential because starting a component with a mismatched version may result in startup failures due to schema incompatibilities with Elasticsearch/OpenSearch and the component itself. Although schema changes are generally avoided in patch releases, they can still occur.</p><p>When using the Camunda Helm chart, this means figuring out the corresponding version. For this the [Camunda Helm chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/) can help. Click on the `major.minor` release and then search for the backed up patch release of your component. The other components would typically fit in there as well.</p> |

<details>
   <summary>Example: Work out your correct Camunda version</summary>
   <summary>

Our Backups look as follows:

```bash
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
camunda_webapps_1748937221_8.8.0_part_1_of_5
camunda_webapps_1748937221_8.8.0_part_2_of_5
camunda_webapps_1748937221_8.8.0_part_3_of_5
camunda_webapps_1748937221_8.8.0_part_4_of_5
camunda_webapps_1748937221_8.8.0_part_5_of_5
camunda_zeebe_records_backup_1748937221
```

From this, we know:

- Optimize: 8.8.0
- Web Applications (Operate / Tasklist): 8.8.0

Based on this, we can look in the [matrix versioning of 8.8](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.8) and see the corresponding Camunda Helm chart version is `13.0.0`.

   </summary>
</details>

We recommend using the new Restore API approach, however, the legacy Restore Application is still available.

<Tabs groupId="elasticsearch-restore-approach">
<TabItem value="restore-api" label="Restore API" default>

## Restore API

With Camunda 8.10 and later, you can restore Zeebe partition data through the Orchestration Cluster Restore API without restarting the brokers. Restore API recovery runs during a downtime window while the cluster is in recovery mode.

A Restore API recovery runs in four phases, driven by two API requests:

1. **Entering recovery mode**: every broker deactivates its partitions and switches to a restricted partition manager. While the cluster is in recovery mode it processes no work, and only read-only operations and restore remain available.
2. **Restoring secondary storage**: while the cluster is in recovery mode, restore the Elasticsearch/OpenSearch snapshots for the intended backup ID.
3. **Restoring the partitions**: the cluster plans a single change that, for every broker and partition, first drops the local partition data and then restores that partition from the selected backup. The steps of that plan run one at a time across the cluster.
4. **Returning to processing**: once every partition is restored, the same change switches all brokers back to `PROCESSING` and the partitions become active again.

Both requests are non-blocking. Each is acknowledged as soon as the cluster accepts the change and returns the `changeId` of the cluster configuration change that carries it out.

### Restore API prerequisites

| Prerequisite     | Description                                                                                                                                                                    |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Camunda 8.10 or later, restored with the exact version the backup was created with.                                                                                            |
| Backup store     | Every broker is configured with the same backup store that holds the Zeebe backup, as described in the [backup prerequisites](./backup.md#prerequisites).                      |
| Completed backup | A completed backup exists for every partition. List the available backups with the [Zeebe backup management API](../zeebe-backup-and-restore.md#list-backups-api).             |
| Snapshot backup  | Elasticsearch/OpenSearch snapshots for all components exist under the same backup ID. See [Restore Elasticsearch/OpenSearch snapshot](./restore-snapshot.md).                  |
| Partition count  | The partition count of the cluster matches the partition count of the backup. Brokers can be scaled between backup and restore as long as the partition count is unchanged.    |
| API access       | Authenticated access to the Orchestration Cluster REST API. See [authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md). |
| Authorizations   | If [authorizations](/components/concepts/access-control/authorizations.md) are enabled, the caller needs the `RESTORE` permission on the `BACKUP` resource.                    |

## Restore an Elasticsearch/OpenSearch-backed cluster

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

Wait until the mode change has completed. Query the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) and check that `lastChange.id` matches the returned `changeId` and that no `pendingChange` is reported:

```bash
curl "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster"
```

A Restore API request is only accepted while every broker of the cluster is in recovery mode. Requests sent earlier are rejected with `409`.

### 2. Find available backup IDs

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

The runtime and history listings are scoped to the Physical Tenant associated with the caller's credentials. For other tenants or all tenants, use the cluster-admin endpoints described in [Restore a cluster with multiple Physical Tenants](#restore-a-cluster-with-multiple-physical-tenants). Ensure that the runtime and history backups you select use the same backup ID before continuing.

### 3. Restore Elasticsearch/OpenSearch snapshots

With the cluster in recovery mode, restore the Elasticsearch/OpenSearch snapshots to the intended point in time. Use the [Restore Elasticsearch/OpenSearch snapshot](./restore-snapshot.md) procedure, but restore the snapshots for the same backup ID that you pass to the Restore API. A mismatched backup ID produces an inconsistent restore point.

Complete this step before you trigger the Zeebe restore. The Restore API switches the brokers back to `PROCESSING` as soon as the last partition is restored, and processing then resumes against whatever secondary storage is in place.

### 4. Trigger the restore

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

### 6. Confirm the cluster state after Restore API recovery

Check that every partition is active and healthy again using [the topology](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx):

```bash
curl "${ORCHESTRATION_CLUSTER_API}/topology"
```

The cluster leaves recovery mode as part of the restore, so no further action is required.

## Validate a Restore API request without applying it

The Restore API accepts the `dryRun` query parameter. With `dryRun=true`, the request is validated and the resulting plan is returned, but nothing is applied to the cluster. Use this to check a backup selection before the downtime window starts:

```bash
curl -X POST "${ORCHESTRATION_CLUSTER_API}/restore?dryRun=true" \
  -H 'Content-Type: application/json' \
  -d '{ "backupIds": [1748937221] }'
```

A dry run rejects requests without a backup ID, with multiple backup IDs, or with a time range. It also checks that a completed backup exists for every partition. A request that passes the dry run is accepted as a real request as long as the cluster and the backup store do not change in between.

## Handle a failed Restore API operation

If a single partition fails to restore, for example because its backup is corrupted or the backup store is temporarily unreachable, the partial data of that partition is dropped and the failed step is retried automatically with a backoff. The restore change stays pending, and the restore status keeps reporting the partition as `RESTORING`.

Because the retry is automatic, first try to fix the root cause instead of sending a new restore request. Once the cause is resolved, the pending change continues on its own and completes.

### Retry a Restore API operation externally

Automatic retries can't help if the problem is the backup itself, for example if the selected backup is corrupted or turns out to be the wrong restore point. In that case, retry from the outside:

1. Cancel the pending restore change on the management API, using the `changeId` the restore returned:

   ```bash
   curl -X DELETE "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster/changes/8"
   ```

   The restore status reports the change as `CANCELLED`, and the cluster stays in recovery mode.

2. Send a new [Restore request](#4-trigger-the-restore). Because each restore drops the local partition data before it writes the backup data, the new attempt does not build on the partial result of the canceled one, and you can select a different backup target.

:::warning
Don't leave a partially failed restore unfinished. Between canceling a restore and completing a new one, Zeebe's internal data is a mix of restored and pre-restore state and cannot be trusted. Keep the cluster in recovery mode and retry until every partition reaches `RESTORED`. If you switch the cluster back to `PROCESSING` in that state, treat it as unrecoverable and restore again from a clean state.
:::

## Restore a cluster with multiple Physical Tenants

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

</TabItem>
<TabItem value="legacy-approach" label="Legacy approach">

## Restore Application (Legacy)

### Step 1: Restore Elasticsearch/OpenSearch snapshots

Restore the Elasticsearch/OpenSearch snapshots using the [Restore Elasticsearch/OpenSearch snapshot](./restore-snapshot.md) procedure, then restore the Zeebe cluster and start the components as described below.

## Restore Zeebe Cluster {#restore-zeebe-cluster}

### Prerequisites

The following specific prerequisites are required when restoring the Zeebe Cluster:

| Prerequisite       | Description                                                                                                                                                                                      |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pre-existing data  | Persistent volumes or disks must not contain any pre-existing data.                                                                                                                              |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).                                                                                  |
| Components stopped | It’s critical that no Camunda components are running during a Zeebe restore. Restored components may propagate an incorrect cluster configuration, potentially disrupting cluster communication. |

:::note
During the restoration of the Elasticsearch / OpenSearch state, we had to temporarily deploy Zeebe. This will have resulted in persistent volumes on Kubernetes and a filled data directory on each Zeebe Broker in case of a manual deployment.

In the case of Kubernetes to remove all related persistent volumes.

```bash
kubectl get pvc -o custom-columns=NAME:.metadata.name --no-headers \
  | grep zeebe \
  | while read pvc; do
      kubectl delete pvc "$pvc"
    done
```

New persistent volumes will be created on a new Camunda Helm chart upgrade and install.

In case of a manual deployment, this means to remove the data directory of each Zeebe Broker.
:::

Camunda provides a standalone app which must be run on each node where a Zeebe Broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count **must be same** as in the backup.

The amount of partitions backed up are also visible in the backup store of Zeebe, see [how to figure out available backups](./restore-snapshot.md#available-backups-of-zeebe-partitions).
If brokers were dynamically scaled between backup and restore, this is not an issue - as long as the partition count remains unchanged.
:::

<Tabs>
   <TabItem value="kubernetes" label="Kubernetes" default>

Assuming you're using the official [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md), you'll have to adjust your Helm `values.yml` to supply the following temporarily.

It will overwrite the start command of the resulting Zeebe pod, executing a restore script.
It's important that the backup is configured for Zeebe to be able to restore from the backup!

```yaml
orchestration:
  enabled: true
  env:
    # Environment variables to overwrite the Zeebe startup behavior
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_FROM_BACKUP_ID
      value: "$BACKUP_ID" # Change the $BACKUP_ID to your actual value
    # all the envs related to the backup store as outlined in the prerequisites
    - name: CAMUNDA_DATA_BACKUP_STORE
      value: "S3" # just as an example
    - name: CAMUNDA_DATA_BACKUP_REPOSITORYNAME
      value: camunda # Change to name of the repository in Elasticsearch/OpenSearch
    ...

# If you use Elasticsearch from the embedded Helm chart, set this to true. Otherwise, set it to false.
elasticsearch:
  enabled: true
connectors:
  enabled: false
optimize:
  enabled: false
```

:::note Alternative command overwrite

Use this alternative approach to restore Zeebe partitions:

```yaml
orchestration:
  enabled: true
  command:
    - "/usr/local/camunda/bin/restore"
    - "--backupId=$BACKUP_ID" # Change the $BACKUP_ID to your actual value.
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
   # All the envs related to the backup store as outlined in the prerequisites
   ...
```

If you're not using the Camunda Helm chart, you can use a similar approach natively with Kubernetes to overwrite the command.
:::

The application exits after restore and Kubernetes restarts the pod, which appears as `CrashLoopBackOff`. This is expected behavior. The restore application does not restore state again once partitions are already restored to persistent disk.

After removing the temporary restore command or unsetting the `ZEEBE_RESTORE` and related backup ID environment variable to restore Zeebe’s default behavior, you may optionally restart the StatefulSet to ensure the changes take effect immediately. This can be done by [scaling](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) the StatefulSet down and back up, or by [deleting](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/) the pods so they are recreated with the newly deployed revision.

:::tip

In Kubernetes, Zeebe runs as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which is intended for long-running, persistent applications. Because StatefulSet pods are restarted automatically, restore-mode pods can appear in `CrashLoopBackOff` after a successful restore. Observe Zeebe Broker logs during restore, and use `--previous` if a pod has already restarted.

The restore app will not import or overwrite data again, but you may miss the first successful run if you are not observing logs actively.

:::

   </TabItem>
   <TabItem value="manual" label="Manual" default>

To restore a Zeebe Cluster, run the following in each node where the broker will be running:

```bash
mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --backupId=<backupId>
```

   </TabItem>
</Tabs>

### Restore success or failure

If restore was successful, the app exits with the log message `Successfully restored broker from backup`.

However, the restore will fail if:

- There is no valid backup with the given backupId.
- The backup store is not configured correctly.
- The configured data directory is not empty.
- Due to any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

#### Data directory is not empty

If the data directory is not empty, the restore will fail with an error message:

```
Brokers's data directory /usr/local/camunda/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted.
In such cases, the restore application can be configured to ignore the presence of these files and folders.
The config `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore.
By default, it ignores `lost+found` folder found on ext4 filesystems.
To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.

### Step 3: Start all Camunda 8 components {#start-all-camunda-8-components}

Now that you have actively restored Elasticsearch/OpenSearch and the Zeebe cluster partitions, you can start all components again and use Camunda 8 as normal.

For example:

- For Kubernetes, apply Helm values for normal startup and explicitly set `ZEEBE_RESTORE=false`. Also, keep your backup-store environment variables configured as outlined in the prerequisites.

```yaml
orchestration:
  enabled: true
  env:
    - name: ZEEBE_RESTORE
      value: "false"
    # all the envs related to the backup store as outlined in the prerequisites
    - name: CAMUNDA_DATA_BACKUP_STORE
      value: "S3" # just as an example
    - name: CAMUNDA_DATA_BACKUP_REPOSITORYNAME
      value: camunda # Change to name of the repository in Elasticsearch/OpenSearch
```

Ensure restore-only settings are not present in this final configuration (for example, `SPRING_PROFILES_ACTIVE=restore`, `ZEEBE_RESTORE_FROM_BACKUP_ID`, or a temporary restore command override).

- For a manual setup, execute the broker and all other components in their normal way.

## (Optional) Restore a Camunda Hub data backup

If you have previously backed up your Camunda Hub data, you can restore this backup.

Backups can only be restored with downtime.
To restore the database dump, first ensure that Camunda Hub is stopped.
Then, to restore the database use the following command:

```bash
psql -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql <DATABASE_NAME>
```

After the database has been restored, you can start Camunda Hub again.

:::danger
When restoring Camunda Hub data from a backup, ensure that the ids of the users stored in your OIDC provider (e.g. Keycloak) do not change in between the backup and restore.
Otherwise, users may not be able to access their projects after the restore (see [Camunda Hub's troubleshooting guide](/self-managed/components/hub/troubleshooting/troubleshoot-missing-data.md)).
:::

:::tip
Some vendors provide tools that help with database backups and restores, such as [AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-rds-backup-restore-using-aws-backup/) or [Cloud SQL backups](https://cloud.google.com/sql/docs/postgres/backup-recovery/backups).
:::

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
    - name: ZEEBE_RESTORE_FROM_BACKUP_ID
      value: "27"

  extraConfiguration:
    - file: restore-overrides.yaml
      content: |
        override:
          tenanta:
            backupId: [31]
          tenantb:
            backupId: [32]
```

</TabItem>

<TabItem value="cli" label="CLI Arguments">

```bash
./camunda/bin/restore \
  --allTenants \
  --backupId=1748937221 \
  --override.tenanta.backupId=31 \
  --override.tenantb.backupId=32
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>
