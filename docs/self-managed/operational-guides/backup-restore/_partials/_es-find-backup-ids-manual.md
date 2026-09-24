import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Find available backup IDs**

With the active environment that was required to restore the datastore templates you can quickly work out available backups, using the backup APIs for each component to list available backups.

:::note
You will need the output for your chosen backup ID in the following steps to be able to restore datastore snapshots as it contains the snapshot names.
:::

   <details>
      <summary>Web Applications Example</summary>

      Using the [Web Applications management API](/self-managed/operational-guides/backup-restore/webapps-backup.md#get-backups-list-api) to list backups.

      You must have the Elasticsearch / OpenSearch backup repository configured to be able to retrieve backups.

      ```bash
      curl $ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupHistory
      ```

      ```json
      [
      {
         "backupId": 1748937221,
         "state": "COMPLETED",
         "details": [
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_1_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:15.685+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_2_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:16.288+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_3_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.092+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_4_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.293+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_5_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:18.298+0000",
               "failures":[]
            }
         ]
      }
      ]
      ```

   </details>

   <details>
      <summary>Optimize Example</summary>

      Using the [Optimize management API](/self-managed/operational-guides/backup-restore/optimize-backup.md#get-backup-info-api) to list backups.

      You must have the Elasticsearch / OpenSearch backup repository configured to be able to retrieve backups.

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
               "snapshotName":"camunda_optimize_1748937221_8.8.0_part_1_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[]
            },
            {
               "snapshotName":"camunda_optimize_1748937221_8.8.0_part_2_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[]
            }
         ]
      }
      ]
      ```

   </details>

   <details>
      <summary>Zeebe Example</summary>

      Using the [Zeebe management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md#list-backups-api) to list backups.

      ```bash
      curl $ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime
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
            "brokerVersion": "8.8.0"
            },
            {
            "partitionId": 2,
            "state": "COMPLETED",
            "createdAt": "2025-06-03T08:06:10.408893628Z",
            "brokerVersion": "8.8.0"
            },
            {
            "partitionId": 3,
            "state": "COMPLETED",
            "createdAt": "2025-06-03T08:06:10.408893628Z",
            "brokerVersion": "8.8.0"
            }
         ]
      }
      ]
      ```

   </details>

As there may be cases where this is not possible, an alternative approach is covered in the following example.

**Available backups on Elasticsearch/OpenSearch**

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

      </details>

   </TabItem>
</Tabs>

**Available backups of Zeebe partitions**

For the Zeebe partitions backup, you will need to check your configured backup store for available backup IDs, and correlate those to the available backups on Elasticsearch/OpenSearch.

Zeebe creates a folder for each Partition ID and subfolder in this with each backup ID.

:::warning
Using the [Zeebe Management Backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md#list-backups-api) is the recommended method for listing available backups, as it ensures the backups are complete and valid. Manually identifying backup IDs can result in restoring an incomplete backup, which will fail the restore process. If this occurs, you will need to choose a different backup ID and repeat the restore process for all components with the new backup ID, including the datastore, to avoid mismatched backup windows and potential data loss.
:::

<details>
   <summary>Example output</summary>
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

</details>
