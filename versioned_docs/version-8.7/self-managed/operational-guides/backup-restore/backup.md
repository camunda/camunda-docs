---
id: backup
title: "Create a backup"
sidebar_label: "Create a backup"
keywords: ["backup", "backups"]
description: "Learn how to back up your Camunda 8 Self-Managed components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Back up your Camunda 8 Self-Managed components and cluster.

## About the backup process

To create a backup you must complete the following main steps:

1. [Back up WebApps](#back-up-webapps)
2. [Back up Zeebe Cluster](#back-up-zeebe)

You can also optionally [back up your Web Modeler data](#back-up-web-modeler-data).

:::caution before you begin

- To create a consistent backup, you **must** complete backing up the WebApps first before backing up the Zeebe Cluster.
- You must complete the [prerequisites](backup-and-restore.md#prerequisites) before creating a backup.

:::

## Step 1: Back up WebApps {#back-up-webapps}

Start the backup process by first backing up the WebApps.

:::note
When backing up the WebApps, the order in which you execute the following sub-steps is not important (you can start by backing up Operate, Optimize, Tasklist in any order for example).
:::

### Example API endpoint definition

:::note

This will heavily depend on your setup, the following examples are based on examples given in the [Management API](#management-api) in Kubernetes using either active port-forwarding or overwrite of the local curl command.

As noted in the [Management API](backup-and-restore.md#management-api) section, this API is typically not publicly exposed. Therefore, you will need to access it directly using any means available within your environment.

:::

   <Tabs groupId="application-ports">
      <TabItem value="port-forwarding" label="Port Forwarding" default>

      ```bash
      # only export the BACKUP_ID once as it has to stay consistent throughout the backup procedure
      export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID

      export ELASTIC_SNAPSHOT_REPOSITORY="camunda" # the name of your snapshot repository
      export ELASTIC_ENDPOINT="http://localhost:9200"

      export OPERATE_MANAGEMENT_API="http://localhost:9600"
      export OPTIMIZE_MANAGEMENT_API="http://localhost:9620"
      export TASKLIST_MANAGEMENT_API="http://localhost:9640"
      export GATEWAY_MANAGEMENT_API="http://localhost:9660"
      ```

      </TabItem>
      <TabItem value="exec" label="Exec">

      ```bash
      # only export the BACKUP_ID once as it has to stay consistent throughout the backup procedure
      export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID
      export CAMUNDA_RELEASE_NAME="camunda"

      export ELASTIC_SNAPSHOT_REPOSITORY="camunda" # the name of your snapshot repository
      export ELASTIC_ENDPOINT="$CAMUNDA_RELEASE_NAME-elasticsearch:9200"

      export OPERATE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-operate:9600"
      export OPTIMIZE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-optimize:8092"
      export TASKLIST_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-tasklist:9600"
      export GATEWAY_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-zeebe-gateway:9600"
      ```

      </TabItem>

   </Tabs>

### 1. Start a backup `x` of Optimize

This step uses the [Optimize management backup API](/self-managed/operational-guides/backup-restore/optimize-backup.md).

```bash
curl -XPOST "$OPTIMIZE_MANAGEMENT_API/actuator/backups" \
   -H "Content-Type: application/json" \
   -d "{\"backupId\": $BACKUP_ID}"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json
      {
         "message":"Backup creation for ID 1748937221 has been scheduled. Use the GET API to monitor completion of backup process"
      }
      ```

      </summary>

   </details>

### 2. Start a backup `x` of Operate

This step uses the [Operate management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

```bash
curl -XPOST "$OPERATE_MANAGEMENT_API/actuator/backups" \
   -H "Content-Type: application/json" \
   -d "{\"backupId\": $BACKUP_ID}"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json
      {
         "scheduledSnapshots":[
            "camunda_operate_1748937221_8.7.2_part_1_of_6",
            "camunda_operate_1748937221_8.7.2_part_2_of_6",
            "camunda_operate_1748937221_8.7.2_part_3_of_6",
            "camunda_operate_1748937221_8.7.2_part_4_of_6",
            "camunda_operate_1748937221_8.7.2_part_5_of_6",
            "camunda_operate_1748937221_8.7.2_part_6_of_6"
         ]
      }
      ```

      </summary>

   </details>

### 3. Start a backup `x` of Tasklist

This step uses the [Tasklist management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

```bash
curl -XPOST "$TASKLIST_MANAGEMENT_API/actuator/backups" \
   -H "Content-Type: application/json" \
   -d "{\"backupId\": $BACKUP_ID}"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json
      {
         "scheduledSnapshots":[
            "camunda_tasklist_1748937221_8.7.2_part_1_of_6",
            "camunda_tasklist_1748937221_8.7.2_part_2_of_6",
            "camunda_tasklist_1748937221_8.7.2_part_3_of_6",
            "camunda_tasklist_1748937221_8.7.2_part_4_of_6",
            "camunda_tasklist_1748937221_8.7.2_part_5_of_6",
            "camunda_tasklist_1748937221_8.7.2_part_6_of_6"
         ]
      }
      ```

      </summary>

   </details>

### 4. Wait for backup `x` of Optimize to complete

This step uses the [Optimize management backup API](/self-managed/operational-guides/backup-restore/optimize-backup.md).

```bash
curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json
      {
         "backupId":1748937221,
         "failureReason":null,
         "state":"COMPLETED",
         "details":[
            {
               "snapshotName":"camunda_optimize_1748937221_8.7.1_part_1_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_optimize_1748937221_8.7.1_part_2_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[

               ]
            }
         ]
      }
      ```

      </summary>

   </details>

Alternatively as a one-line to wait until the state is `COMPLETED` using a while loop and jq to parse the response JSON.

```bash
while [[ "$(curl -s "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID" | jq -r .state)" != "COMPLETED" ]]; do echo "Waiting..."; sleep 5; done; echo "Finished backup with ID $BACKUP_ID"
```

### 5. Wait for backup `x` of Operate to complete

This step uses the the [Operate management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

```bash
curl -s "$OPERATE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json
      {
         "backupId":1748937221,
         "state":"COMPLETED",
         "failureReason":null,
         "details":[
            {
               "snapshotName":"camunda_operate_1748937221_8.7.2_part_1_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:15.685+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.7.2_part_2_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:16.288+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.7.2_part_3_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.092+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.7.2_part_4_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.293+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.7.2_part_5_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:18.298+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_operate_1748937221_8.7.2_part_6_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:18.499+0000",
               "failures":[

               ]
            }
         ]
      }
      ```

      </summary>

   </details>

Alternatively as a one-line to wait until the state is `COMPLETED` using a while loop and jq to parse the response JSON.

```bash
while [[ "$(curl -s "$OPERATE_MANAGEMENT_API/actuator/backups/$BACKUP_ID" | jq -r .state)" != "COMPLETED" ]]; do echo "Waiting..."; sleep 5; done; echo "Finished backup with ID $BACKUP_ID"
```

### 6. Wait for backup `x` of Tasklist to complete

This step uses the [Tasklist management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

```bash
curl "$TASKLIST_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json
      {
         "backupId":1748937221,
         "state":"COMPLETED",
         "failureReason":null,
         "details":[
            {
               "snapshotName":"camunda_tasklist_1748937221_8.7.2_part_1_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:56:56.519+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_tasklist_1748937221_8.7.2_part_2_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:56:57.324+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_tasklist_1748937221_8.7.2_part_3_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:56:57.927+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_tasklist_1748937221_8.7.2_part_4_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:56:58.329+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_tasklist_1748937221_8.7.2_part_5_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:56:58.933+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_tasklist_1748937221_8.7.2_part_6_of_6",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:56:59.535+0000",
               "failures":[

               ]
            }
         ]
      }
      ```

      </summary>

   </details>

Alternatively as a one-line to wait until the state is `COMPLETED` using a while loop and jq to parse the response JSON.

```bash
while [[ "$(curl -s "$TASKLIST_MANAGEMENT_API/actuator/backups/$BACKUP_ID" | jq -r .state)" != "COMPLETED" ]]; do echo "Waiting..."; sleep 5; done; echo "Finished backup with ID $BACKUP_ID"
```

## Step 2: Backup Zeebe Cluster {#back-up-zeebe}

Once you have completed backing up all the WebApps, you can back up the Zeebe Cluster.

:::caution
When backing up the the Zeebe Cluster, you must execute the following sub-steps in the correct sequential order.
:::

### 1. Soft pause exporting in Zeebe

This step uses the [management API](/self-managed/zeebe-deployment/operations/management-api.md?exporting=softPause#exporting-api).

This will continue exporting records, but not delete those records (log compaction) from Zeebe. This makes the backup a hot backup, as covered in the [backup considerations](backup-and-restore.md#considerations).

```bash
curl -XPOST "$GATEWAY_MANAGEMENT_API/actuator/exporting/pause?soft=true"
```

   <details>
      <summary>Example output</summary>
      <summary>

      :::note
      Yes, 204 is the expected result and indicates a successful soft pause.
      :::

      ```json
      {
         "body":null,
         "status":204,
         "contentType":null
      }
      ```

      </summary>

   </details>

### 2. Create a backup `x` of the exported Zeebe indices in Elasticsearch/OpenSearch

You can create this backup using the respective Snapshots API.

By default, the indices are prefixed with `zeebe-record`. If you have configured a different prefix when configuring Elasticsearch/OpenSearch exporter in Zeebe, use this instead.

   <Tabs groupId="search-engine">
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      The following uses the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-create) to create a snapshot.

      ```bash
      curl -XPUT "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/camunda_zeebe_records_backup_$BACKUP_ID?wait_for_completion=true" \
      -H 'Content-Type: application/json' \
      -d '{
            "indices": "zeebe-record*",
            "feature_states": ["none"]
            }'
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         ```json
         {
            "snapshot":{
               "snapshot":"camunda_zeebe_records_backup_1748937221",
               "uuid":"1p_HdzKeTZ-zY-SN1LJ9VQ",
               "repository":"camunda",
               "version_id":8521000,
               "version":"8.17.0-8.17.4",
               "indices":[
                  "zeebe-record_process_8.7.2_2025-06-03",
                  "zeebe-record_job_8.7.2_2025-06-03",
                  "zeebe-record_process-instance-creation_8.7.2_2025-06-03",
                  "zeebe-record_process-instance_8.7.2_2025-06-03",
                  "zeebe-record_deployment_8.7.2_2025-06-03"
               ],
               "data_streams":[

               ],
               "include_global_state":true,
               "state":"SUCCESS",
               "start_time":"2025-06-03T08:05:10.633Z",
               "start_time_in_millis":1748937910633,
               "end_time":"2025-06-03T08:05:11.336Z",
               "end_time_in_millis":1748937911336,
               "duration_in_millis":603,
               "failures":[

               ],
               "shards":{
                  "total":9,
                  "failed":0,
                  "successful":9
               },
               "feature_states":[

               ]
            }
         }
         ```

         </summary>
      </details>

      </TabItem>
      <TabItem value="opensearch" label="OpenSearch">

      The following uses the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-snapshot/) to create a snapshot.

      ```bash
      curl -XPUT "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/camunda_zeebe_records_backup_$BACKUP_ID?wait_for_completion=true" \
      -H 'Content-Type: application/json' \
      -d '{
            "indices": "zeebe-record*"
            }'
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         ```json
         {
            "snapshot":{
               "snapshot":"camunda_zeebe_records_backup_1748937221",
               "uuid":"PUFbcSJZT1Cqc4jY8OE2uA",
               "version_id":136408027,
               "version":"2.19.2",
               "remote_store_index_shallow_copy":false,
               "indices":[
                  "zeebe-record_process_8.7.2_2025-06-03",
                  "zeebe-record_job_8.7.2_2025-06-03",
                  "zeebe-record_process-instance-creation_8.7.2_2025-06-03",
                  "zeebe-record_process-instance_8.7.2_2025-06-03",
                  "zeebe-record_deployment_8.7.2_2025-06-03"
               ],
               "data_streams":[

               ],
               "include_global_state":true,
               "state":"SUCCESS",
               "start_time":"2025-06-03T09:37:45.623Z",
               "start_time_in_millis":1748943465623,
               "end_time":"2025-06-03T09:37:46.342Z",
               "end_time_in_millis":1748943466342,
               "duration_in_millis":719,
               "failures":[

               ],
               "shards":{
                  "total":9,
                  "failed":0,
                  "successful":9
               }
            }
         }
         ```

         </summary>
      </details>

      </TabItem>

   </Tabs>

### 3. Wait for backup `x` of the exported Zeebe indices to complete before proceeding

   <Tabs groupId="search-engine">
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      The following uses the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-status-2) to get the snapshot status.

      ```bash
      curl "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/camunda_zeebe_records_backup_$BACKUP_ID/_status"
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         ```
         {
            "snapshots":[
               {
                  "snapshot":"camunda_zeebe_records_backup_1748937221",
                  "repository":"camunda",
                  "uuid":"1p_HdzKeTZ-zY-SN1LJ9VQ",
                  "state":"SUCCESS",
                  "include_global_state":true,
                  "shards_stats":{
                     "initializing":0,
                     "started":0,
                     "finalizing":0,
                     "done":9,
                     "failed":0,
                     "total":9
                  },
                  "stats":{
                     "incremental":{
                        "file_count":0,
                        "size_in_bytes":0
                     },
                     "total":{
                        "file_count":9,
                        "size_in_bytes":0
                     },
                     "start_time_in_millis":1748937910633,
                     "time_in_millis":0
                  },
                  "indices":{
                     "zeebe-record_process_8.7.2_2025-06-03",
                     "zeebe-record_job_8.7.2_2025-06-03",
                     "zeebe-record_process-instance-creation_8.7.2_2025-06-03",
                     "zeebe-record_process-instance_8.7.2_2025-06-03",
                     "zeebe-record_deployment_8.7.2_2025-06-03"
                  }
               }
            ]
         }
         ```

         </summary>
      </details>

      </TabItem>
      <TabItem value="opensearch" label="OpenSearch">

      The following uses the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-status/) to get the snapshot status.

      ```bash
      curl "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/camunda_zeebe_records_backup_$BACKUP_ID/_status"
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         ```json
         {
            "snapshots":[
               {
                  "snapshot":"camunda_zeebe_records_backup_1748937221",
                  "repository":"camunda",
                  "uuid":"PUFbcSJZT1Cqc4jY8OE2uA",
                  "state":"SUCCESS",
                  "include_global_state":true,
                  "shards_stats":{
                     "initializing":0,
                     "started":0,
                     "finalizing":0,
                     "done":9,
                     "failed":0,
                     "total":9
                  },
                  "stats":{
                     "incremental":{
                        "file_count":0,
                        "size_in_bytes":0
                     },
                     "total":{
                        "file_count":9,
                        "size_in_bytes":0
                     },
                     "start_time_in_millis":1748943465623,
                     "time_in_millis":0
                  },
                  "indices":{
                     "zeebe-record_process_8.7.2_2025-06-03",
                     "zeebe-record_job_8.7.2_2025-06-03",
                     "zeebe-record_process-instance-creation_8.7.2_2025-06-03",
                     "zeebe-record_process-instance_8.7.2_2025-06-03",
                     "zeebe-record_deployment_8.7.2_2025-06-03"
                  }
               }
            ]
         }
         ```

         </summary>
      </details>

      </TabItem>

   </Tabs>

### 4. Create a backup `x` of the Zeebe broker partitions

This step uses the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

      ```bash
      curl -XPOST "$GATEWAY_MANAGEMENT_API/actuator/backups" \
         -H "Content-Type: application/json" \
         -d "{\"backupId\": $BACKUP_ID}"
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         ```json
         {
            "message":"A backup with id 1748937221 has been scheduled. Use GET actuator/backups/1748937221 to monitor the status."
         }
         ```

         </summary>
      </details>

### 5. Wait for backup `x` of Zeebe to complete before proceeding

This step uses the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

      ```bash
      curl "$GATEWAY_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         ```json
         {
            "backupId":1748937221,
            "state":"COMPLETED",
            "details":[
               {
                  "partitionId":1,
                  "state":"COMPLETED",
                  "createdAt":"2025-06-03T08:06:06.246997293Z",
                  "lastUpdatedAt":"2025-06-03T08:06:10.408893628Z",
                  "checkpointPosition":1,
                  "brokerVersion":"8.7.2"
               }
            ]
         }
         ```

         </summary>
      </details>

      Alternatively as a one-line to wait until the state is `COMPLETED` using a while loop and jq to parse the response JSON.

      ```bash
      while [[ "$(curl -s "$GATEWAY_MANAGEMENT_API/actuator/backups/$BACKUP_ID" | jq -r .state)" != "COMPLETED" ]]; do echo "Waiting..."; sleep 5; done; echo "Finished backup with ID $BACKUP_ID"
      ```

### 6. Resume exporting in Zeebe using the [management API](/self-managed/zeebe-deployment/operations/management-api.md)

      ```bash
      curl -XPOST "$GATEWAY_MANAGEMENT_API/actuator/exporting/resume"
      ```

      <details>
         <summary>Example output</summary>
         <summary>

         :::note
         Yes, 204 is the expected result and indicates a successful resume.
         :::

         ```json
         {
            "body":null,
            "status":204,
            "contentType":null
         }
         ```

         </summary>
      </details>

:::warning
If any of the steps above fail, you might have to restart with a new backup ID. Ensure Zeebe exporting is resumed if the backup process force quits in the middle of the process.
:::

## (Optional) Back up Web Modeler data {#back-up-web-modeler-data}

To create a Web Modeler data backup, refer to the [official PostgreSQL documentation](https://www.postgresql.org/docs/current/backup-dump.html) to back up the database that Web Modeler uses.

For example, to create a backup of the database using `pg_dumpall`, use the following command:

```bash
pg_dumpall -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql --quote-all-identifiers
Password: <DATABASE_PASSWORD>
```

`pg_dumpall` might ask multiple times for the same password. The database will be dumped into `dump.psql`.

:::note
Database dumps created with `pg_dumpall`/`pg_dump` can only be restored into a database with the same or later version of PostgreSQL, see [PostgreSQL documentation](https://www.postgresql.org/docs/current/app-pgdump.html#PG-DUMP-NOTES).
:::

:::info
You can [restore a Web Modeler data backup](restore.md#optional-restore-a-web-modeler-data-backup).
:::

## Cleaning up backups

Depending on your company’s backup policies (for example, retention periods and number of backups to keep) you should consider regularly cleaning up your old backups to reduce storage costs and efficiently manage resources.

You can use the **delete backup APIs** for each component to remove the associated resources from the configured backup storage. You will have to provide the same backup ID for all calls to remove it from all backup stores.

- [Operate](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md#delete-backup-api)
- [Optimize](/self-managed/operational-guides/backup-restore/optimize-backup.md#delete-backup-api)
- [Tasklist](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md#delete-backup-api)
- [Zeebe](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md#delete-backup-api)

For Zeebe, you would also have to remove the separately backed up `zeebe-record` index snapshot using the [Elasticsearch](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-delete) / [OpenSearch](https://docs.opensearch.org/docs/latest/api-reference/snapshots/delete-snapshot/) API directly.
