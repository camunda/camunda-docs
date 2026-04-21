---
id: optimize-backup-and-restore
sidebar_label: "Optimize — independent backup"
title: "Back up and restore Optimize independently"
description: "Learn how to back up and restore Optimize independently of the Orchestration Cluster, including when the Orchestration Cluster uses RDBMS as secondary storage."
keywords:
  [
    "backup",
    "backups",
    "restore",
    "optimize",
    "standalone",
    "rdbms",
    "independent",
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Back up and restore Optimize independently of the Orchestration Cluster.

## About this guide

Optimize always stores its data in Elasticsearch or OpenSearch, regardless of what the Orchestration Cluster uses as secondary storage. Which backup procedure to follow depends on what secondary storage the Orchestration Cluster uses:

| Orchestration Cluster secondary storage | How to back up Optimize                                                                                                                                                                                                                                                                                                              |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Elasticsearch / OpenSearch**          | Optimize shares the same ES/OS instance with the Orchestration Cluster. Backup must be **coordinated**: all components use a single shared backup ID within the same backup window. Optimize cannot be backed up independently in this configuration — use the [Elasticsearch / OpenSearch backup guide](./elasticsearch/backup.md). |
| **RDBMS**                               | Optimize uses a **dedicated ES/OS instance** separate from the Orchestration Cluster's storage. There is no shared state to keep consistent. Optimize can be backed up on its own schedule with its own backup IDs — use this guide.                                                                                                 |

:::warning
When the Orchestration Cluster uses Elasticsearch or OpenSearch, backing up Optimize with a different backup ID or at a different time than the other components produces an **inconsistent restore point**: Optimize analytics data will describe a state that no longer matches the underlying process data in Operate and Zeebe.
:::

This guide covers:

- **Optimize alongside an RDBMS-backed Orchestration Cluster**: Optimize must be backed up and restored separately from the Orchestration Cluster. The two are fully independent.
- **Optimize as a fully standalone application**: Optimize deployed without other Camunda components.

Optimize stores its data across multiple indices in Elasticsearch or OpenSearch. A backup consists of two snapshots that must be taken through the Backup Management API to ensure consistency across indices. For example, a backup with ID `123456` produces:

```
camunda_optimize_123456_8.8.0_part_1_of_2
camunda_optimize_123456_8.8.0_part_2_of_2
```

Backups are created asynchronously while Optimize continues running, and are restored using the standard Elasticsearch/OpenSearch snapshot restore API.

## Prerequisites

Before creating a backup, complete the following setup:

| Prerequisite                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Snapshot repository           | Register a snapshot repository with Elasticsearch or OpenSearch. See [Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories) or [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/).                                                                                                                                                                        |
| Optimize backup configuration | Configure the repository name in Optimize using the `CAMUNDA_OPTIMIZE_BACKUP_REPOSITORY_NAME` environment variable, or by adding it to your Optimize [`environment-config.yaml`](/self-managed/components/optimize/configuration/system-configuration.md). See [Elasticsearch backup settings](/self-managed/components/optimize/configuration/system-configuration.md#elasticsearch-backup-settings) or [OpenSearch backup settings](/self-managed/components/optimize/configuration/system-configuration.md#opensearch-backup-settings). |

:::note
The management API is accessible via the management port (default `8092`). Direct access is required — the management port is not publicly exposed. In Kubernetes, use [port-forwarding](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) or [exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/).

```bash
# Port-forwarding example (Kubernetes)
kubectl port-forward services/camunda-optimize 8092:8092
```

:::

:::note
The configured `contextPath` does not apply to the management port. Setting `contextPath` in the Camunda Helm chart for Optimize will not change the management API path, which remains at `/`.
:::

## Set up environment variables

The following examples use environment variables for conciseness:

<Tabs groupId="application-ports">
  <TabItem value="port-forwarding" label="Port Forwarding" default>

<Tabs groupId="search-engine">
  <TabItem value="elasticsearch" label="Elasticsearch" default>

```bash
export BACKUP_ID=$(date +%s)   # Unix timestamp as unique, always-increasing ID

export OPTIMIZE_MANAGEMENT_API="http://localhost:8092"

export ELASTIC_SNAPSHOT_REPOSITORY="camunda"   # Name of your snapshot repository
export ELASTIC_ENDPOINT="http://localhost:9200"
```

  </TabItem>
  <TabItem value="opensearch" label="OpenSearch">

```bash
export BACKUP_ID=$(date +%s)   # Unix timestamp as unique, always-increasing ID

export OPTIMIZE_MANAGEMENT_API="http://localhost:8092"

export OPENSEARCH_SNAPSHOT_REPOSITORY="camunda"   # Name of your snapshot repository
export OPENSEARCH_ENDPOINT="<your-opensearch-endpoint>"
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem value="exec" label="Exec">

<Tabs groupId="search-engine">
  <TabItem value="elasticsearch" label="Elasticsearch" default>

```bash
export BACKUP_ID=$(date +%s)
export CAMUNDA_RELEASE_NAME="camunda"

export OPTIMIZE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-optimize:8092"

export ELASTIC_SNAPSHOT_REPOSITORY="camunda"
export ELASTIC_ENDPOINT="http://$CAMUNDA_RELEASE_NAME-elasticsearch:9200"
```

  </TabItem>
  <TabItem value="opensearch" label="OpenSearch">

```bash
export BACKUP_ID=$(date +%s)
export CAMUNDA_RELEASE_NAME="camunda"

export OPTIMIZE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-optimize:8092"

export OPENSEARCH_SNAPSHOT_REPOSITORY="camunda"
export OPENSEARCH_ENDPOINT="<your-opensearch-endpoint>"
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>

:::note
We recommend using the Unix timestamp as the backup ID. The backup ID must be a positive integer and must be greater than the ID used for any previous backup.
:::

## Create a backup

### 1. Trigger the backup

Use the following API to initiate a backup:

```bash
curl -XPOST "$OPTIMIZE_MANAGEMENT_API/actuator/backups" \
  -H 'Content-Type: application/json' \
  -d "{\"backupId\": $BACKUP_ID}"
```

A successful response confirms the backup has been scheduled:

```json
{
  "message": "Backup creation for ID 1748937221 has been scheduled. Use the GET API to monitor completion of backup process"
}
```

For the full API reference including response codes, see the [Optimize backup management API](./optimize-backup.md#create-backup-api).

### 2. Wait for the backup to complete

Backup creation is asynchronous. Poll the following endpoint until the state is `COMPLETE`:

```bash
curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

<details>
  <summary>Example response</summary>

```json
{
  "backupId": 1748937221,
  "failureReason": null,
  "state": "COMPLETE",
  "details": [
    {
      "snapshotName": "camunda_optimize_1748937221_8.8.0_part_1_of_2",
      "state": "SUCCESS",
      "startTime": "2025-06-03T07:53:54.389+0000",
      "failures": []
    },
    {
      "snapshotName": "camunda_optimize_1748937221_8.8.0_part_2_of_2",
      "state": "SUCCESS",
      "startTime": "2025-06-03T07:53:54.389+0000",
      "failures": []
    }
  ]
}
```

</details>

Alternatively, use a loop to wait until completion:

```bash
while [[ "$(curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID" | jq -r .state)" != "COMPLETE" ]]; do
  echo "Waiting..."
  sleep 5
done
echo "Backup $BACKUP_ID complete"
```

Possible backup states:

- `COMPLETE`: The backup can be used to restore data.
- `IN_PROGRESS`: Backup creation is still in progress. Wait before using for restore.
- `FAILED`: Something went wrong. Use the [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/get-snapshot-status-api.html) or [OpenSearch](https://opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-status/) get snapshot status API for each snapshot to investigate.
- `INCOMPATIBLE`: The backup is incompatible with the current Elasticsearch/OpenSearch version.
- `INCOMPLETE`: The backup is incomplete, for example if backup creation was interrupted or individual snapshots were deleted.

## Restore a backup

Restoring Optimize requires downtime. Optimize must be stopped before restoring snapshots, and the restore targets a clean Elasticsearch/OpenSearch state.

### Prerequisites

| Prerequisite        | Description                                                                                                                                                |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Optimize stopped    | Optimize must not be running while restoring the datastore.                                                                                                |
| Clean state         | Elasticsearch or OpenSearch must have no existing Optimize indices — all data will be restored from the snapshots.                                         |
| Camunda version     | The backup must be restored using the **same Optimize version** it was created with. The version is embedded in the snapshot names (for example, `8.8.0`). |
| Snapshot repository | Elasticsearch or OpenSearch must be configured with the same snapshot repository used during backup.                                                       |

:::warning
Do not start Optimize against a partially restored datastore. Ensure all snapshots are fully restored before starting Optimize.
:::

### Step 1: Create Optimize index templates on the target datastore

Optimize creates its index templates on first startup. These templates must exist before snapshots can be successfully restored.

Start Optimize connected to the target Elasticsearch/OpenSearch instance (the clean instance where you intend to restore). Allow it to reach a healthy state, which seeds the required index templates and component templates.

You can verify the templates were created:

<Tabs groupId="search-engine">
  <TabItem value="elasticsearch" label="Elasticsearch" default>

```bash
curl -s "$ELASTIC_ENDPOINT/_index_template" \
  | jq -r '.index_templates[].name' \
  | grep optimize \
  | sort
```

  </TabItem>
  <TabItem value="opensearch" label="OpenSearch">

```bash
curl -s "$OPENSEARCH_ENDPOINT/_index_template" \
  | jq -r '.index_templates[].name' \
  | grep optimize \
  | sort
```

  </TabItem>
</Tabs>

### Step 2: Find available backup IDs

With Optimize running from the previous step, identify which backups are available. You can query either the Optimize management API or the snapshot repository directly.

**Using the Optimize management API:**

```bash
curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups"
```

<details>
  <summary>Example response</summary>

```json
[
  {
    "backupId": 1748937221,
    "state": "COMPLETED",
    "details": [
      {
        "snapshotName": "camunda_optimize_1748937221_8.8.0_part_1_of_2",
        "state": "SUCCESS",
        "startTime": "2025-06-03T07:53:54.389+0000",
        "failures": []
      },
      {
        "snapshotName": "camunda_optimize_1748937221_8.8.0_part_2_of_2",
        "state": "SUCCESS",
        "startTime": "2025-06-03T07:53:54.389+0000",
        "failures": []
      }
    ]
  }
]
```

</details>

**Alternatively, query the snapshot repository directly.** Optimize snapshot names follow the pattern `camunda_optimize_{backupId}_{version}_part_N_of_2`.

<Tabs groupId="search-engine">
  <TabItem value="elasticsearch" label="Elasticsearch" default>

```bash
curl -s "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/_all" \
  | jq -r '.snapshots[].snapshot' \
  | grep "^camunda_optimize_"
```

<details>
  <summary>Example output</summary>

```
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
camunda_optimize_1749130104_8.8.0_part_1_of_2
camunda_optimize_1749130104_8.8.0_part_2_of_2
```

</details>

  </TabItem>
  <TabItem value="opensearch" label="OpenSearch">

```bash
curl -s "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all" \
  | jq -r '.snapshots[].snapshot' \
  | grep "^camunda_optimize_"
```

<details>
  <summary>Example output</summary>

```
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
camunda_optimize_1749130104_8.8.0_part_1_of_2
camunda_optimize_1749130104_8.8.0_part_2_of_2
```

</details>

  </TabItem>
</Tabs>

Ensure both `part_1_of_2` and `part_2_of_2` exist for your chosen backup ID before proceeding. An incomplete backup cannot be used for restore.

Once you have chosen the backup ID, set it as an environment variable for use in subsequent steps:

```bash
export BACKUP_ID=1748937221
```

### Step 3: Stop Optimize

If you are using an external Elasticsearch/OpenSearch and Kubernetes, you could temporarily [uninstall](https://helm.sh/docs/helm/helm_uninstall/) the Camunda Helm chart or [scale](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) all components to 0, so that nothing is running and potentially interacting with the datastore.

In a manual setup, you can simply stop Optimize component.

If you are using the Camunda Helm chart with an embedded Elasticsearch, you can achieve this by (for example) disabling Optimize in the `values.yml`.

```yaml
elasticsearch:
  enabled: true

optimize:
  enabled: false
```

### Step 4: Delete all existing Optimize indices

Delete the indices created during startup so they do not block the snapshot restore:

<Tabs groupId="search-engine">
  <TabItem value="elasticsearch" label="Elasticsearch" default>

```bash
for index in $(curl -s "$ELASTIC_ENDPOINT/_cat/indices?h=index" | grep optimize); do
  echo "Deleting index: $index"
  curl -X DELETE "$ELASTIC_ENDPOINT/$index"
done
```

  </TabItem>
  <TabItem value="opensearch" label="OpenSearch">

```bash
for index in $(curl -s "$OPENSEARCH_ENDPOINT/_cat/indices?h=index" | grep optimize); do
  echo "Deleting index: $index"
  curl -X DELETE "$OPENSEARCH_ENDPOINT/$index"
done
```

  </TabItem>
</Tabs>

### Step 5: Restore the Optimize snapshots

Although the backup order was important so far to ensure consistent backups, you can restore the backed up Optimize indices in any order.

As the Optimize do not have an endpoint to restore the backup in Elasticsearch, you will need to restore it yourself directly in your selected datastore.

Based on your chosen backup ID in [find available backup IDs](#2-find-available-backup-ids), you can now restore the snapshots in Elasticsearch/OpenSearch for each available backup under the same backup ID.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following uses the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-restore) to restore a snapshot.

```bash
curl -XPOST "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
```

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following uses the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/restore-snapshot/) to restore a snapshot.

```bash
curl -XPOST "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
```

   </TabItem>
</Tabs>

Where `$SNAPSHOT_NAME` would be any of the following based on our example in [find available backups IDs](#2-find-available-backup-ids).

Ensure that all your backups correspond to the same backup ID and that each one is restored one-by-one.

```bash
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
```

### Step 6: Start Optimize

After all snapshots are successfully restored, start Optimize again. It will connect to the restored datastore and resume from the backed-up state.

Monitor the Optimize logs for any errors after startup.

## Delete a backup

To delete an existing backup and free storage, use the following API:

```bash
curl --request DELETE "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

This removes all snapshots associated with the given backup ID from the configured snapshot repository.

A successful response returns `204 No Content`.

For the full API reference including response codes, see the [Optimize backup management API](./optimize-backup.md#delete-backup-api).

## List existing backups

To list all available Optimize backups:

```bash
curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups"
```

To retrieve information about a specific backup:

```bash
curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

For the full API reference, see the [Optimize backup management API](./optimize-backup.md#get-backup-info-api).
