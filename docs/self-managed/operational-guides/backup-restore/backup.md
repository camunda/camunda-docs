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

To create a backup you must complete the following [back up process](#back-up-process).

You can also optionally [back up your Web Modeler data](#back-up-web-modeler-data).

:::caution before you begin

- To create a consistent backup, you **must** complete the backing in the outlined order.
- You must complete the [prerequisites](backup-and-restore.md#prerequisites) before creating a backup.

:::

## Back up process

### Example API endpoint definition

:::note

This will heavily depend on your setup, the following examples are based on examples given in the [Management API](backup-and-restore.md#management-api) in Kubernetes using either active port-forwarding or overwrite of the local curl command.

As noted in the [Management API](backup-and-restore.md#management-api) section, this API is typically not publicly exposed. Therefore, you will need to access it directly using any means available within your environment.

:::

   <Tabs groupId="application-ports">
      <TabItem value="port-forwarding" label="Port Forwarding" default>

      ```bash
      # only export the BACKUP_ID once as it has to stay consistent throughout the backup procedure
      export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID

      export ELASTIC_SNAPSHOT_REPOSITORY="camunda" # the name of your snapshot repository
      export ELASTIC_ENDPOINT="http://localhost:9200"

      export ORCHESTRATION_CLUSTER_MANAGEMENT_API="http://localhost:9600"
      export OPTIMIZE_MANAGEMENT_API="http://localhost:9620"
      ```

      </TabItem>
      <TabItem value="exec" label="Exec">

      ```bash
      # only export the BACKUP_ID once as it has to stay consistent throughout the backup procedure
      export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID
      export CAMUNDA_RELEASE_NAME="camunda"

      export ELASTIC_SNAPSHOT_REPOSITORY="camunda" # the name of your snapshot repository
      export ELASTIC_ENDPOINT="$CAMUNDA_RELEASE_NAME-elasticsearch:9200"

      export ORCHESTRATION_CLUSTER_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-core:9600"
      export OPTIMIZE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-optimize:8092"
      ```

      </TabItem>

   </Tabs>

### 1. Soft pause exporting in Zeebe

This step uses the [management API](/self-managed/zeebe-deployment/operations/management-api.md?exporting=softPause#exporting-api).

This will continue exporting records, but not delete those records (log compaction) from Zeebe. This makes the backup a hot backup, as covered in the [why you should use backup and restore](backup-and-restore.md#why-you-should-use-backup-and-restore).

```bash
curl -XPOST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/exporting/pause?soft=true"
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

### 2. Start a backup `x` of the web applications (Operate / Tasklist)

This step uses the [web applications management backup API](/self-managed/operational-guides/backup-restore/webapps-backup.md).

```bash
curl -XPOST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupHistory" \
   -H "Content-Type: application/json" \
   -d "{\"backupId\": $BACKUP_ID}"
```

   <details>
      <summary>Example output</summary>
      <summary>

      ```json

      {
         "scheduledSnapshots":[
            "camunda_webapps_1748937221_8.8.0_part_1_of_5",
            "camunda_webapps_1748937221_8.8.0_part_2_of_5",
            "camunda_webapps_1748937221_8.8.0_part_3_of_5",
            "camunda_webapps_1748937221_8.8.0_part_4_of_5",
            "camunda_webapps_1748937221_8.8.0_part_5_of_5"
         ]
      }
      ```

      </summary>

   </details>

### 3. Start a backup `x` of Optimize

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

### 4. Wait for backup `x` of the web applications (Operate / Tasklist) to complete

This step uses the the [web applications management backup API](/self-managed/operational-guides/backup-restore/webapps-backup.md).

```bash
curl -s "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupHistory/$BACKUP_ID"
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
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_1_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:15.685+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_2_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:16.288+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_3_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.092+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_4_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:17.293+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_webapps_1748937221_8.8.0_part_5_of_5",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:55:18.298+0000",
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
while [[ "$(curl -s "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupHistory/$BACKUP_ID" | jq -r .state)" != "COMPLETED" ]]; do echo "Waiting..."; sleep 5; done; echo "Finished backup with ID $BACKUP_ID"
```

### 5. Wait for backup `x` of Optimize to complete

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
               "snapshotName":"camunda_optimize_1748937221_8.8.0_part_1_of_2",
               "state":"SUCCESS",
               "startTime":"2025-06-03T07:53:54.389+0000",
               "failures":[

               ]
            },
            {
               "snapshotName":"camunda_optimize_1748937221_8.8.0_part_2_of_2",
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

### 6. Create a backup `x` of the exported Zeebe indices in Elasticsearch/OpenSearch

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
               "version":"8.18.0",
               "indices":[
                  "zeebe-record_process_8.8.0_2025-06-03",
                  "zeebe-record_job_8.8.0_2025-06-03",
                  "zeebe-record_process-instance_8.8.0_2025-06-03",
                  "zeebe-record_deployment_8.8.0_2025-06-03"
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
                  "total":8,
                  "failed":0,
                  "successful":8
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
                  "zeebe-record_process_8.8.0_2025-06-03",
                  "zeebe-record_job_8.8.0_2025-06-03",
                  "zeebe-record_process-instance_8.8.0_2025-06-03",
                  "zeebe-record_deployment_8.8.0_2025-06-03"
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
                  "total":8,
                  "failed":0,
                  "successful":8
               }
            }
         }
         ```

         </summary>
      </details>

      </TabItem>

   </Tabs>

### 7. Wait for backup `x` of the exported Zeebe indices to complete before proceeding

   <Tabs groupId="search-engine">
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      Using `?wait_for_completion=true` in the previous call, as outlined, ensures that the request only returns once the backup has finished. However, to double-check that the backup completed successfully, you can perform the following verification:

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
                     "done":8,
                     "failed":0,
                     "total":8
                  },
                  "stats":{
                     "incremental":{
                        "file_count":0,
                        "size_in_bytes":0
                     },
                     "total":{
                        "file_count":8,
                        "size_in_bytes":0
                     },
                     "start_time_in_millis":1748937910633,
                     "time_in_millis":0
                  },
                  "indices":{
                     "zeebe-record_process_8.8.0_2025-06-03",
                     "zeebe-record_job_8.8.0_2025-06-03",
                     "zeebe-record_process-instance_8.8.0_2025-06-03",
                     "zeebe-record_deployment_8.8.0_2025-06-03"
                  }
               }
            ]
         }
         ```

         </summary>
      </details>

      </TabItem>
      <TabItem value="opensearch" label="OpenSearch">

      Using `?wait_for_completion=true` in the previous call, as outlined, ensures that the request only returns once the backup has finished. However, to double-check that the backup completed successfully, you can perform the following verification:

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
                     "done":8,
                     "failed":0,
                     "total":8
                  },
                  "stats":{
                     "incremental":{
                        "file_count":0,
                        "size_in_bytes":0
                     },
                     "total":{
                        "file_count":8,
                        "size_in_bytes":0
                     },
                     "start_time_in_millis":1748943465623,
                     "time_in_millis":0
                  },
                  "indices":{
                     "zeebe-record_process_8.8.0_2025-06-03",
                     "zeebe-record_job_8.8.0_2025-06-03",
                     "zeebe-record_process-instance_8.8.0_2025-06-03",
                     "zeebe-record_deployment_8.8.0_2025-06-03"
                  }
               }
            ]
         }
         ```

         </summary>
      </details>

      </TabItem>

   </Tabs>

### 8. Create a backup `x` of the Zeebe broker partitions

This step uses the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

      ```bash
      curl -XPOST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime" \
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

### 9. Wait for backup `x` of Zeebe to complete before proceeding

This step uses the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

      ```bash
      curl "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime/$BACKUP_ID"
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
                  "brokerVersion":"8.8.0"
               }
            ]
         }
         ```

         </summary>
      </details>

      Alternatively as a one-line to wait until the state is `COMPLETED` using a while loop and jq to parse the response JSON.

      ```bash
      while [[ "$(curl -s "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime/$BACKUP_ID" | jq -r .state)" != "COMPLETED" ]]; do echo "Waiting..."; sleep 5; done; echo "Finished backup with ID $BACKUP_ID"
      ```

### 10. Resume exporting in Zeebe using the [management API](/self-managed/zeebe-deployment/operations/management-api.md)

      ```bash
      curl -XPOST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/exporting/resume"
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

- [Web Applications](/self-managed/operational-guides/backup-restore/webapps-backup.md#delete-backup-api)
- [Optimize](/self-managed/operational-guides/backup-restore/optimize-backup.md#delete-backup-api)
- [Zeebe](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md#delete-backup-api)

For Zeebe, you would also have to remove the separately backed up `zeebe-record` index snapshot using the [Elasticsearch](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-delete) / [OpenSearch](https://docs.opensearch.org/docs/latest/api-reference/snapshots/delete-snapshot/) API directly.
