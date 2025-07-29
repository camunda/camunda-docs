---
id: restore
title: "Restore a backup"
sidebar_label: "Restore a backup"
keywords: ["backup", "backups", "restore"]
description: "Learn how to restore a Camunda 8 Self-Managed backup."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore a previous backup of your Camunda 8 Self-Managed components and cluster.

## About restoring a backup

To restore a backup you must complete the following main steps:

1. [Restore of Elasticsearch/OpenSearch](#restore-elasticsearch-opensearch)
2. [Restore Zeebe Cluster](#restore-zeebe-cluster)
3. [Start all Camunda 8 components](#start-all-camunda-8-components)

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
camunda_optimize_1748937221_8.5.17_part_1_of_2
camunda_optimize_1748937221_8.5.17_part_2_of_2
camunda_operate_1748937221_8.5.16_part_1_of_6
camunda_operate_1748937221_8.5.16_part_2_of_6
camunda_operate_1748937221_8.5.16_part_3_of_6
camunda_operate_1748937221_8.5.16_part_4_of_6
camunda_operate_1748937221_8.5.16_part_5_of_6
camunda_operate_1748937221_8.5.16_part_6_of_6
camunda_tasklist_1748937221_8.5.18_part_1_of_6
camunda_tasklist_1748937221_8.5.18_part_2_of_6
camunda_tasklist_1748937221_8.5.18_part_3_of_6
camunda_tasklist_1748937221_8.5.18_part_4_of_6
camunda_tasklist_1748937221_8.5.18_part_5_of_6
camunda_tasklist_1748937221_8.5.18_part_6_of_6
camunda_zeebe_records_backup_1748937221
```

From this, we know:

- Optimize: 8.5.17
- Operate: 8.5.16
- Tasklist: 8.5.18

Based on this, we can look in the [matrix versioning of 8.5](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.5) and see the corresponding Camunda Helm chart version is `10.9.0`.

   </summary>
</details>

## Step 1: Restore of Elasticsearch/OpenSearch {#restore-elasticsearch-opensearch}

### Prerequisites

The following specific prerequisites are required when restoring Elasticsearch/OpenSearch:

| Prerequisite        | Description                                                                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Clean state/data    | Elasticsearch/OpenSearch is set up and running with a clean state and no data on it.                                                                                                  |
| Snapshot repository | Elasticsearch/OpenSearch are configured with the same snapshot repository as used for backup, using the documentation linked in [prerequisites](backup-and-restore.md#prerequisites). |

### 1. Restore [Templates](https://www.elastic.co/docs/manage-data/data-store/templates)

This step includes restoring index and component templates crucial for Camunda 8 to function properly on continuous use.

These templates are automatically applied on newly created indices. These templates are only created on the initial start of the components and the first seeding of the secondary datastore, due to which you have to temporarily restore them before you can restore all Elasticsearch/OpenSearch snapshots.

**Start Camunda 8 configured with your secondary datastore endpoint**

- For example, deploy the Camunda Helm chart.
- For manual context, start Camunda 8 components manually.
- Depending on your setup this can mean Operate, Optimize, Tasklist, Zeebe, and the required secondary datastore.

The templates are created by Operate, Optimize, and Tasklist on startup on the first seeding of the datastore. Zeebe creates this whenever it is required, and isn't limited to the initial start. We recommend starting your full required Camunda 8 stack for the applications to show up as healthy.

You can confirm the successful creation of the index templates by using the Elasticsearch/OpenSearch API. The index templates rely on the component templates, so it also confirms these were successfully recreated.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following uses the [Elasticsearch Index API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-index-template) to list all index templates.

```bash
curl -s "$ELASTIC_ENDPOINT/_index_template" \
   | jq -r '.index_templates[].name' \
   | grep -E 'operate|tasklist|optimize|zeebe' \
   | sort
```

   <details>
      <summary>Example Output</summary>
      <summary>

      ```bash
      operate-batch-operation-1.0.0_template
      operate-decision-instance-8.3.0_template
      operate-event-8.3.0_template
      operate-flownode-instance-8.3.1_template
      operate-incident-8.3.1_template
      operate-list-view-8.3.0_template
      operate-message-8.5.0_template
      operate-operation-8.4.1_template
      operate-post-importer-queue-8.3.0_template
      operate-sequence-flow-8.3.0_template
      operate-user-task-8.5.0_template
      operate-variable-8.3.0_template
      tasklist-draft-task-variable-8.3.0_template
      tasklist-task-8.5.0_template
      tasklist-task-variable-8.3.0_template
      ...
      ```

      </summary>

   </details>

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following uses the [OpenSearch Index API](https://docs.opensearch.org/docs/latest/api-reference/index-apis/get-index-template/) to list all index templates.

```bash
curl -s "$OPENSEARCH_ENDPOINT/_index_template" \
   | jq -r '.index_templates[].name' \
   | grep -E 'operate|tasklist|optimize|zeebe' \
   | sort
```

   <details>
      <summary>Example Output</summary>
      <summary>

      ```bash
      operate-batch-operation-1.0.0_template
      operate-decision-instance-8.3.0_template
      operate-event-8.3.0_template
      operate-flownode-instance-8.3.1_template
      operate-incident-8.3.1_template
      operate-list-view-8.3.0_template
      operate-message-8.5.0_template
      operate-operation-8.4.1_template
      operate-post-importer-queue-8.3.0_template
      operate-sequence-flow-8.3.0_template
      operate-user-task-8.5.0_template
      operate-variable-8.3.0_template
      tasklist-draft-task-variable-8.3.0_template
      tasklist-task-8.5.0_template
      tasklist-task-variable-8.3.0_template
      ...
      ```

      </summary>

   </details>

   </TabItem>
</Tabs>

### 2. Find available backup IDs

With the active environment that was required to restore the datastore templates you can quickly work out available backups, using the backup APIs for each component to list available backups.

:::note
You will need the output for your chosen backup ID in the following steps to be able to restore datastore snapshots as it contains the snapshot names.
:::

   <details>
      <summary>Operate Example</summary>
      <summary>

      Using the [Operate management API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md#get-backups-list-api) to list backups.

      ```bash
      curl $OPERATE_MANAGEMENT_API/actuator/backups
      ```

      ```json
      [
      {
         "backupId": 1748937221,
         "state": "COMPLETED",
         "details": [
            {
               "snapshotName":"camunda_operate_1748937221_8.5.16_part_1_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:15.685+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.5.16_part_2_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:16.288+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.5.16_part_3_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.092+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.5.16_part_4_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.293+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.5.16_part_5_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:18.298+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.5.16_part_6_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:18.499+0000",
               "failures":[]
            }
         ]
      }
      ]
      ```
      </summary>

   </details>

   <details>
      <summary>Optimize Example</summary>
      <summary>

      Using the [Optimize management API](/self-managed/operational-guides/backup-restore/optimize-backup.md#get-backup-info-api) to list backups.

      ```bash
      curl $OPTIMIZE_MANAGEMENT_API/actuator/backups
      ```

      ```json
      [
      {
         "backupId": 1748937221,
         "state": "COMPLETED",
         "details": [
            {
               "snapshotName":"camunda_optimize_1748937221_8.5.17_part_1_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_optimize_1748937221_8.5.17_part_2_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[]
            }
         ]
      }
      ]
      ```
      </summary>

   </details>

   <details>
      <summary>Tasklist Example</summary>
      <summary>

      Using the [Tasklist management API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md#get-backups-list-api) to list backups.

      ```bash
      curl $TASKLIST_MANAGEMENT_API/actuator/backups
      ```

      ```json
      [
      {
         "backupId": 1748937221,
         "state": "COMPLETED",
         "failureReason": null,
         "details": [
            {
            "snapshotName": "camunda_tasklist_1748937221_8.5.18_part_6_of_6",
            "state": "SUCCESS",
            "startTime": "2025-06-03T07:56:56.519+0000",
            "failures": []
            },
            {
            "snapshotName": "camunda_tasklist_1748937221_8.5.18_part_5_of_6",
            "state": "SUCCESS",
            "startTime": "2025-06-03T07:56:56.519+0000",
            "failures": []
            },
            {
            "snapshotName": "camunda_tasklist_1748937221_8.5.18_part_4_of_6",
            "state": "SUCCESS",
            "startTime": "2025-06-03T07:56:56.519+0000",
            "failures": []
            },
            {
            "snapshotName": "camunda_tasklist_1748937221_8.5.18_part_3_of_6",
            "state": "SUCCESS",
            "startTime": "2025-06-03T07:56:56.519+0000",
            "failures": []
            },
            {
            "snapshotName": "camunda_tasklist_1748937221_8.5.18_part_2_of_6",
            "state": "SUCCESS",
            "startTime": "2025-06-03T07:56:56.519+0000",
            "failures": []
            },
            {
            "snapshotName": "camunda_tasklist_1748937221_8.5.18_part_1_of_6",
            "state": "SUCCESS",
            "startTime": "2025-06-03T07:56:56.519+0000",
            "failures": []
            }
         ]
      }
      ]
      ```
      </summary>

   </details>

   <details>
      <summary>Zeebe Example</summary>
      <summary>

      Using the [Zeebe management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md#list-backups-api) to list backups.

      ```bash
      curl $GATEWAY_MANAGEMENT_API/actuator/backups
      ```

      ```json
      [
      {
         "backupId": 1748937221,
         "state": "COMPLETED",
         "details": [
            {
            "partitionId": 1,
            "state": "COMPLETED",
            "createdAt": "2025-06-03T08:06:10.408893628Z",
            "brokerVersion": "8.7.1"
            },
            {
            "partitionId": 2,
            "state": "COMPLETED",
            "createdAt": "2025-06-03T08:06:10.408893628Z",
            "brokerVersion": "8.7.1"
            },
            {
            "partitionId": 3,
            "state": "COMPLETED",
            "createdAt": "2025-06-03T08:06:10.408893628Z",
            "brokerVersion": "8.7.1"
            }
         ]
      }
      ]
      ```
      </summary>

   </details>

As there may be cases where this is not possible, an alternative approach is covered in the following example.

#### Available Backups on Elasticsearch/OpenSearch

In this scenario, follow the steps above, but when you have your Elasticsearch/OpenSearch available, use the snapshot API to list available snapshots and correlate this to the available snapshots in your backup bucket (AWS S3, Azure Store, Google GCS). It is important to use the same ID for all backups.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

      The following uses the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-get) to list all registered snapshots in a repository.

      ```bash
      ELASTIC_ENDPOINT=http://localhost:9200       # Your Elasticsearch endpoint
      ELASTIC_SNAPSHOT_REPOSITORY=camunda_backup   # Your defined snapshot repository on Elasticsearch for Camunda backups

      # Get a list of all available snapshots
      curl $ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/_all

      # Get a list of all available snapshots and use jq to parse just the names for easier readability
      curl $ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/_all | jq -r '.snapshots[].snapshot'
      ```

      Ensure that all backups and parts exist for each component for your chosen backup ID.

      <details>
         <summary>Example output</summary>
         <summary>

         ```bash
         camunda_optimize_1748937221_8.5.17_part_1_of_2
         camunda_optimize_1748937221_8.5.17_part_2_of_2
         camunda_operate_1748937221_8.5.16_part_1_of_6
         camunda_operate_1748937221_8.5.16_part_2_of_6
         camunda_operate_1748937221_8.5.16_part_3_of_6
         camunda_operate_1748937221_8.5.16_part_4_of_6
         camunda_operate_1748937221_8.5.16_part_5_of_6
         camunda_operate_1748937221_8.5.16_part_6_of_6
         camunda_tasklist_1748937221_8.5.18_part_1_of_6
         camunda_tasklist_1748937221_8.5.18_part_2_of_6
         camunda_tasklist_1748937221_8.5.18_part_3_of_6
         camunda_tasklist_1748937221_8.5.18_part_4_of_6
         camunda_tasklist_1748937221_8.5.18_part_5_of_6
         camunda_tasklist_1748937221_8.5.18_part_6_of_6
         camunda_zeebe_records_backup_1748937221
         ```

         </summary>
      </details>

   </TabItem>

   <TabItem value="opensearch" label="OpenSearch">

      The following uses the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot/) to list all registered snapshots in a repository.

      ```bash
      OPENSEARCH_ENDPOINT=http://localhost:9200       # Your OpenSearch endpoint
      OPENSEARCH_SNAPSHOT_REPOSITORY=camunda_backup   # Your defined snapshot repository on OpenSearch for Camunda backups

      # Get a list of all available snapshots
      curl $OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all

      # Get a list of all available snapshots and use jq to parse just the names for easier readability
      curl $OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all | jq -r '.snapshots[].snapshot'
      ```

      Ensure that all backups and parts exist for each component for your chosen backup ID.

      <details>
      <summary>Example output</summary>
      <summary>

      ```bash
      camunda_optimize_1748937221_8.5.17_part_1_of_2
      camunda_optimize_1748937221_8.5.17_part_2_of_2
      camunda_operate_1748937221_8.5.16_part_1_of_6
      camunda_operate_1748937221_8.5.16_part_2_of_6
      camunda_operate_1748937221_8.5.16_part_3_of_6
      camunda_operate_1748937221_8.5.16_part_4_of_6
      camunda_operate_1748937221_8.5.16_part_5_of_6
      camunda_operate_1748937221_8.5.16_part_6_of_6
      camunda_tasklist_1748937221_8.5.18_part_1_of_6
      camunda_tasklist_1748937221_8.5.18_part_2_of_6
      camunda_tasklist_1748937221_8.5.18_part_3_of_6
      camunda_tasklist_1748937221_8.5.18_part_4_of_6
      camunda_tasklist_1748937221_8.5.18_part_5_of_6
      camunda_tasklist_1748937221_8.5.18_part_6_of_6
      camunda_zeebe_records_backup_1748937221
      ```

      </summary>
      </details>

   </TabItem>
</Tabs>

#### Available Backups of Zeebe Partitions

For the Zeebe partitions backup, you will need to check your configured backup store for available backup IDs, and correlate those to the available backups on Elasticsearch/OpenSearch.

Zeebe creates a folder for each Partition ID and subfolder in this with each backup ID.

:::warning
Using the Zeebe Management Backup API is the recommended method for listing available backups, as it ensures the backups are complete and valid. Manually identifying backup IDs can result in restoring an incomplete backup, which will fail the restore process. If this occurs, you will need to choose a different backup ID and repeat the restore process for all components with the new backup ID, including the datastore, to avoid mismatched backup windows and potential data loss.
:::

<details>
   <summary>Example output</summary>
   <summary>
   Example in the case of 3 partitions with two available backups:

```bash
#PartitionID folder
#   BackupID folder
1/
├── 1748937221
└── 1749130104
2/
├── 1748937221
└── 1749130104
3/
├── 1748937221
└── 1749130104
```

   </summary>
</details>

### 3. Stop all components apart from Elasticsearch/OpenSearch

If you are using an external Elasticsearch/OpenSearch and Kubernetes, you could temporarily [uninstall](https://helm.sh/docs/helm/helm_uninstall/) the Camunda Helm chart or [scale](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) all components to 0, so that nothing is running and potentially interacting with the datastore.

In a manual setup, you can simply stop all components.

If you are using the Camunda Helm chart with an embedded Elasticsearch, you can achieve this by (for example) disabling all other components in the `values.yml`.

```yaml
elsaticsearch:
  enabled: true

connectors:
  enabled: false
optimize:
  enabled: false
operate:
  enabled: false
tasklist:
  enabled: false
zeebe:
  enabled: false
zeebeGateway:
  replicas: 0
```

### 4. Delete all indices

Now that you have successfully restored the templates and stopped the components adding more indices, you must delete the existing indices to be able to successfully restore the snapshots (otherwise these will block a successful restore).

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following uses the [Elasticsearch CAT API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-indices) to list all indices. It also uses the [Elasticsearch Index API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete) to delete an index.

```bash
for index in $(curl -s "$ELASTIC_ENDPOINT/_cat/indices?h=index" \
   | grep -E 'operate|tasklist|optimize|zeebe'); do
      echo "Deleting index: $index"
      curl -X DELETE "$ELASTIC_ENDPOINT/$index"
done
```

   <details>
      <summary>Example Output</summary>
      <summary>

      ```bash
      Deleting index: operate-import-position-8.3.0_
      {"acknowledged":true}Deleting index: operate-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-flownode-instance-8.3.1_
      {"acknowledged":true}Deleting index: operate-event-8.3.0_
      {"acknowledged":true}Deleting index: operate-incident-8.3.1_
      {"acknowledged":true}Deleting index: tasklist-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-user-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-import-position-8.2.0_
      {"acknowledged":true}Deleting index: tasklist-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-flownode-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-process-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-operation-8.4.1_
      {"acknowledged":true}Deleting index: operate-metric-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-decision-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-8.4.0_
      {"acknowledged":true}Deleting index: operate-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-message-8.5.0_
      {"acknowledged":true}Deleting index: operate-decision-requirements-8.3.0_
      {"acknowledged":true}Deleting index: operate-batch-operation-1.0.0_
      {"acknowledged":true}Deleting index: operate-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-user-1.4.0_
      {"acknowledged":true}Deleting index: operate-list-view-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-metric-8.3.0_
      {"acknowledged":true}Deleting index: operate-post-importer-queue-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-form-8.4.0_
      {"acknowledged":true}Deleting index: operate-user-1.2.0_
      {"acknowledged":true}Deleting index: tasklist-draft-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-decision-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-sequence-flow-8.3.0_
      {"acknowledged":true}
      ```

      </summary>

   </details>

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following uses the [OpenSearch CAT API](https://docs.opensearch.org/docs/latest/api-reference/cat/cat-indices/) to list all indices. It also uses the [OpenSearch Index API](https://docs.opensearch.org/docs/latest/api-reference/index-apis/delete-index/) to delete an index.

```bash
for index in $(curl -s "$OPENSEARCH_ENDPOINT/_cat/indices?h=index" \
   | grep -E 'operate|tasklist|optimize|zeebe'); do
      echo "Deleting index: $index"
      curl -X DELETE "$OPENSEARCH_ENDPOINT/$index"
done
```

   <details>
      <summary>Example Output</summary>
      <summary>

      ```bash
      Deleting index: operate-import-position-8.3.0_
      {"acknowledged":true}Deleting index: operate-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-flownode-instance-8.3.1_
      {"acknowledged":true}Deleting index: operate-event-8.3.0_
      {"acknowledged":true}Deleting index: operate-incident-8.3.1_
      {"acknowledged":true}Deleting index: tasklist-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-user-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-import-position-8.2.0_
      {"acknowledged":true}Deleting index: tasklist-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-flownode-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-process-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-operation-8.4.1_
      {"acknowledged":true}Deleting index: operate-metric-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-decision-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-8.4.0_
      {"acknowledged":true}Deleting index: operate-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-message-8.5.0_
      {"acknowledged":true}Deleting index: operate-decision-requirements-8.3.0_
      {"acknowledged":true}Deleting index: operate-batch-operation-1.0.0_
      {"acknowledged":true}Deleting index: operate-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-user-1.4.0_
      {"acknowledged":true}Deleting index: operate-list-view-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-metric-8.3.0_
      {"acknowledged":true}Deleting index: operate-post-importer-queue-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-form-8.4.0_
      {"acknowledged":true}Deleting index: operate-user-1.2.0_
      {"acknowledged":true}Deleting index: tasklist-draft-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-decision-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-sequence-flow-8.3.0_
      {"acknowledged":true}
      ```

      </summary>

   </details>

   </TabItem>
</Tabs>

### 5. Restore Elasticsearch/OpenSearch snapshots

Although the backup order was important so far to ensure consistent backups, you can restore the backed up indices in any order.

As the components do not have an endpoint to restore the backup in Elasticsearch, you will need to restore it yourself directly in your selected datastore.

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
camunda_optimize_1748937221_8.5.17_part_1_of_2
camunda_optimize_1748937221_8.5.17_part_2_of_2
camunda_operate_1748937221_8.5.16_part_1_of_6
camunda_operate_1748937221_8.5.16_part_2_of_6
camunda_operate_1748937221_8.5.16_part_3_of_6
camunda_operate_1748937221_8.5.16_part_4_of_6
camunda_operate_1748937221_8.5.16_part_5_of_6
camunda_operate_1748937221_8.5.16_part_6_of_6
camunda_tasklist_1748937221_8.5.18_part_1_of_6
camunda_tasklist_1748937221_8.5.18_part_2_of_6
camunda_tasklist_1748937221_8.5.18_part_3_of_6
camunda_tasklist_1748937221_8.5.18_part_4_of_6
camunda_tasklist_1748937221_8.5.18_part_5_of_6
camunda_tasklist_1748937221_8.5.18_part_6_of_6
camunda_zeebe_records_backup_1748937221
```

## Step 2: Restore Zeebe Cluster {#restore-zeebe-cluster}

### Prerequisites

The following specific prerequisites are required when restoring the Zeebe Cluster:

| Prerequisite       | Description                                                                                                                                                                                      |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pre-existing data  | Persistent volumes or disks must not contain any pre-existing data.                                                                                                                              |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](backup-and-restore.md#prerequisites).                                                                        |
| Components stopped | It’s critical that no Camunda components are running during a Zeebe restore. Restored components may propagate an incorrect cluster configuration, potentially disrupting cluster communication. |

### Restore Zeebe Cluster

:::note
During the restoration of the Elasticsearch / OpenSearch state, we had to temporarily deploy Zeebe. This will have resulted in persistent volumes on Kubernetes and a filled data directory on each Zeebe broker in case of a manual deployment.

In the case of Kubernetes to remove all related persistent volumes.

```bash
kubectl get pvc -o custom-columns=NAME:.metadata.name --no-headers \
  | grep zeebe \
  | while read pvc; do
      kubectl delete pvc "$pvc"
    done
```

New persistent volumes will be created on a new Camunda Helm chart upgrade and install.

In case of a manual deployment, this means to remove the data directory of each Zeebe broker.
:::

Camunda provides a standalone app which must be run on each node where a Zeebe broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count **must be same** as in the backup.

The amount of partitions backed up are also visible in the backup store of Zeebe, see [how to figure out available backups](#available-backups-of-zeebe-partitions).
If brokers were dynamically scaled between backup and restore, this is not an issue - as long as the partition count remains unchanged.
:::

<Tabs>
   <TabItem value="kubernetes" label="Kubernetes" default>

Assuming you're using the official [Camunda Helm chart](/self-managed/setup/install.md), you'll have to adjust your Helm `values.yml` to supply the following temporarily.

It will overwrite the start command of the resulting Zeebe pod, executing a restore script.
It's important that the backup is configured for Zeebe to be able to restore from the backup!

The following example is possible starting from the Camunda Helm chart version `10.8.0`.
Look at the note below the example to see how it can be achieved with an older Camund Helm chart version.

```yaml
zeebe:
   enabled: true
   env:
   # Environment variables to overwrite the Zeebe startup behavior
   - name: ZEEBE_RESTORE
     value: "true"
   - name: ZEEBE_RESTORE_FROM_BACKUP_ID
     value: "$BACKUP_ID" # Change the $BACKUP_ID to your actual value
   # all the envs related to the backup store as outlined in the prerequisites
   - name: ZEEBE_BROKER_DATA_BACKUP_STORE
     value: "S3" # just as an example
   ...

# assuming you're using the inbuilt Elasticsearch, otherwise should be set to false
elsaticsearch:
   enabled: true

connectors:
   enabled: false
optimize:
   enabled: false
operate:
   enabled: false
tasklist:
   enabled: false
zeebeGateway:
   replicas: 0
```

:::note Older Camunda Helm charts

For older Camunda Helm chart versions one can overwrite the startup behaviour of the Zeebe brokers by setting the command.

```yaml
zeebe:
   enabled: true
   command: ["/usr/local/zeebe/bin/restore", "--backupId=$BACKUP_ID"] # Change the $BACKUP_ID to your actual value
   env:
   # all the envs related to the backup store as outlined in the prerequisites
   ...
```

:::

If you're not using the Camunda Helm chart, you can use a similar approach natively with Kubernetes to overwrite the command.

The application will exit and restart the pod and will be interpreted by Kubernetes as a `crashloop`. This is an expected behavior. The restore application will not try to restore the state again since the partitions were already restored to the persistent disk.

:::tip

In Kubernetes, Zeebe is a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which are meant for long-running and persistent applications. There is no `restartPolicy` due to which the resulting pods of the Zeebe `StatefulSet` will always restart and `crashloop` as the restore application won't overwrite the data. Meaning that you have to observe the Zeebe brokers during restore and may have to look at the logs with `--previous` if it already restarted.

It will not try to import or overwrite the data again but should be noted that you may miss the `successful` first run if you're not observing it actively.

:::

   </TabItem>
   <TabItem value="manual" label="Manual" default>

To restore a Zeebe Cluster, run the following in each node where the broker will be running:

```bash
mkdir -p zeebe
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C zeebe/
./zeebe/bin/restore --backupId=<backupId>
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
Brokers's data directory /usr/local/zeebe/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted.
In such cases, the restore application can be configured to ignore the presence of these files and folders.
The config `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore.
By default, it ignores `lost+found` folder found on ext4 filesystems.
To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.

## Step 3: Start all Camunda 8 components {#start-all-camunda-8-components}

Now that you have actively restored Elasticsearch/OpenSearch and the Zeebe cluster partitions, you can start all components again and use Camunda 8 as normal.

For example:

- For Kubernetes, enable all components again in the Helm chart and remove the environment variables that overwrite the Zeebe startup behavior.

- For a manual setup, execute the broker and all other components in their normal way.

## (Optional) Restore a Web Modeler data backup

If you have previously backed up your Web Modeler data, you can restore this backup.

Backups can only be restored with downtime.
To restore the database dump, first ensure that Web Modeler is stopped.
Then, to restore the database use the following command:

```bash
psql -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql <DATABASE_NAME>
```

After the database has been restored, you can start Web Modeler again.

:::danger
When restoring Web Modeler data from a backup, ensure that the ids of the users stored in your OIDC provider (e.g. Keycloak) do not change in between the backup and restore.
Otherwise, users may not be able to access their projects after the restore (see [Web Modeler's login troubleshooting guide](self-managed/modeler/web-modeler/troubleshooting/troubleshoot-login.md#unique-constraint-violation)).
:::

:::tip
Some vendors provide tools that help with database backups and restores, such as [AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-rds-backup-restore-using-aws-backup/) or [Cloud SQL backups](https://cloud.google.com/sql/docs/postgres/backup-recovery/backups).
:::
