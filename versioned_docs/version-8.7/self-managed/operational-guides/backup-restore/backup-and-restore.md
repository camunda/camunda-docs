---
id: backup-and-restore
title: "Backup and restore"
sidebar_label: "Backup and restore"
keywords: ["backup", "backups"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, it is possible to run the backup of Operate and Tasklist indices (steps 2, 3, 5 and 6 from the backup procedure below) as a standalone application separate from the main application (see [standalone backup application](/self-managed/concepts/elasticsearch-without-cluster-privileges.md#standalone-backup-application)).
:::

You need to use the backup feature of Camunda 8 Self-Managed to regularly back up the state of all of its components (Zeebe, Operate, Tasklist, and Optimize) without any downtime (except Web Modeler, see [the Web Modeler backup and restore documentation](./modeler-backup-and-restore.md)).
In case of failures that lead to data loss, you can recover the cluster from a backup.

<!-- TODO: insert reasoning here - Elaticsearch, consistent backups, etc. Explain on why it's different with Elasticsearch, the pointers etc.
Why is it important? Backup for Operate / Tasklit / Optimize taken in a certain order.
The reasoning -->

A backup of a Camunda 8 cluster consists of a backup of Zeebe, Operate, Tasklist, Optimize, and exported Zeebe records in Elasticsearch. Since the data of these applications are dependent on each other, it is important that the backup is consistent across all components. The backups of individual components taken independently may not form a consistent recovery point. Therefore, you must take the backup of a Camunda 8 cluster as a whole. To ensure a consistent backup, follow the process described below. Failing to do so will result in the loss of data and you might not even notice it. There is currently no way to verify this. <!-- TODO: Rewrite the last two lines -->

<!-- TODO: Add part about being hot backups and what exactly that means. What's happening in the background etc. data overlap... -->

## Prerequisites

<!-- TODO: add tool prerequsisites: curl, jq, kubectl -->

Operate, Tasklist, and Optimize use Elasticsearch / OpenSearch as backend storage and use the snapshot feature of Elasticsearch / OpenSearch for backing up their state. Zeebe does not have an in-built API for its related indices but will need to use the snapshot API of Elasticsearch / OpenSearch directly.

Zeebe stores its partition backup to an external storage and must be configured before the cluster is started.

Following items are required to be configured to make use of the backup and restore functionality:

1. Depending on the choice of database, following must be configured on the database itself:

   - [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)
   - [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

2. Configure the components backup storages, these will partly be important for restore as well:

- [Operate](/self-managed/operate-deployment/operate-configuration.md#backups)
- Optimize
   - [Elasticsearch](/self-managed/optimize-deployment/configuration/system-configuration.md#elasticsearch-backup-settings)
   - [OpenSearch](/self-managed/optimize-deployment/configuration/system-configuration.md#opensearch-backup-settings)
- [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md#backups)
- [Zeebe](/self-managed/zeebe-deployment/configuration/broker.md#zeebebrokerdatabackup)

## Considerations

The backup of each component and the backup of a Camunda 8 cluster is identified by an ID. This means a backup `x` of Camunda 8 consists of backup `x` of Zeebe, backup `x` of Optimize, backup `x` of Operate, and backup `x` of Tasklist. The backup ID must be an integer and greater than the previous backups.

:::note
We recommend using the unix timestamp as the backup ID.
:::

The steps outlined on this page are general applicable for any kind of deployment but may differ slightly depending on your setup.

If you're defining the `contextPath` in the Helm chart or the `management.server.servlet.context-path` in a standalone setup, your API requests will require to prepend the value specific to the `contextPath` for the individual application. In case the `management.server.port` is defined then this also applies to `management.endpoints.web.base-path`. You can read more about this behavior in the [Spriing Boot documentation](https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/production-ready-monitoring.html#production-ready-customizing-management-server-context-path).

:::warning Optimize Helm Chart Exception
Setting the `contextPath` in the Helm Chart for Optimize will not overwrite the `contextPath` of the management API and it will remain `/`.
:::

<details>
<summary>Example</summary>
<summary>

If you're defining `management.server.base-path` for Operate:

```bash
# Helm Chart
operate:
   contextPath: /operate

# Standalone
management.server.base-path: /operate
```

A call to the management API of Operate would look like the following:

```
OPERATE_MANAGEMENT_API=http://localhost:9600

curl $OPERATE_MANAGEMENT_API/operate/health
```

Without the `contextPath` / `base-path` it would just be:

```
OPERATE_MANAGEMENT_API=http://localhost:9600

curl $OPERATE_MANAGEMENT_API/health
```

</summary>
</details>

The management API is an extension of the [Spring Boot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html), typically used for monitoring and other operational purposes. This is not a public API and not exposed. You will need direct access to your Camunda cluster to be able to interact with these management APIs.

Direct access, may depend on your deployment environment. For example, direct Kubernetes cluster access with [port-forwarding](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) or [exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/) to execute commands directly on Kubernetes pods. In case of a manual deployment you will need to be able to reach the machines that host Camunda. Typically, the management port is on port `9600` but may differ on your setup and on the components. You will find the default for each component in their configuration page.

| Component | Port |
| --------- | ---- |
| [Operate](/self-managed/operate-deployment/operate-configuration.md#monitoring-operate) | 9600 |
| [Optimize](/self-managed/optimize-deployment/configuration/system-configuration.md#container) | 8092 |
| [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md#monitoring-and-health-probes) | 9600 |
| [Zeebe](/self-managed/zeebe-deployment/configuration/gateway.md#managementserver) | 9600 |

Examples for Kubernetes approaches:

<Tabs>
   <TabItem value="port-forwarding" label="Port Forwarding" default>

   Port-forwarding allows to temporarily bind a remote Kubernetes cluster port of a service or pod directly to your local machine, allowing you to interact with it via `localhost:PORT`

   ```bash
   HELM_RELEASE_NAME=camunda
   # kubectl port-forward services/$SERVICE_NAME $LOCAL_PORT:$REMOTE_PORT
   kubectl port-forward services/$HELM_RELEASE_NAME-operate 9600:9600 & \
   kubectl port-forward services/$HELM_RELEASE_NAME-optimize 9620:8092 & \
   kubectl port-forward services/$HELM_RELEASE_NAME-tasklist 9640:9600 & \
   kubectl port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9660:9600 &
   ```

   Using the bash instruction `&` at the end of each line would run the command in a subshell allowing the use of a single terminal.

   </TabItem>
   <TabItem value="exec" label="Exec">

   An alternative to port-forwarding could be to run commands directly on Kubernetes pods.
   In this example we're going to spawn a temporary pod to execute a curl request.
   Alternatives could be to use existing pods within the namespace. Camunda's pod come with different base images due to which not all provide the same feature set.

   ```bash
   # following will create a temporary alias within your terminal to overwrite the normal curl
   CAMUNDA_NAMESPACE=camunda <!-- TODO: double check consistent naming with our guides -->
   HELM_RELEASE_NAME=camunda
   <!-- TODO: consider renaming kubecurl to curl to temporarily overwrite it locally, will allow to have the same commands for everything -->
   alias kubecurl="kubectl run curl --rm -i -n $CAMUNDA_NAMESPACE --restart=Never --image=alpine/curl -- -sS"

   kubecurl $HELM_RELEASE_NAME-operate:9600/actuator/health
   kubecurl $HELM_RELEASE_NAME-optimize:8092/actuator/health
   kubecurl $HELM_RELEASE_NAME-tasklist:9600/actuator/health
   kubecurl $HELM_RELEASE_NAME-zeebe-gateway:9600/actuator/health
   ```

   This will allow to directly execute commands within the namespace and talk to available services.

   ```bash
   kubectl get services
   ```

   </TabItem>
   <TabItem value="jobs" label="Cronjob">

   In our examples, we will showcase the backup process in a manual fashion to fully understand the process.
   You may want to use [Kubernetes Cronjobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) to automate the backup process for your own use case based on your own environment on a regular schedule.

   Kubernetes Cronjobs will spawn a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) on a regular basis. The job will run a defined image within a given namespace, allowing you to run commands and interact with the environment.

   </TabItem>

</Tabs>

## Backup process

The backup process is divided in two parts:

1. Backup of the WebApps
2. Backup of the Zeebe Cluster

These two parts have to be executed in a sequential order with their sub-steps to form a consistent backup and are outlined below.

<!-- TODO: Rewrite actionable step names -->

<!-- TODO: Explain why the certain order is so important; Basically, WebApps interchangable, overlap with Zeebe is important and softpause topic.

Softpause = exported + but not deleted (log compacted) from Zeebe.
Maybe in the form of like a short TL;DR
WebApp Backup
Export Pause
Zeebe exports ("db" + partitions)
Resume Pause
-->

```bash
<!-- TODO: Define all endpoints somehow - maybe specific per use case -->
# Don't export the BACKUP_ID multiple times, it needs to be consistent with all backups for easier identification
export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID
export OPTIMIZE_MANAGEMENT_API=
export OPERATE_MANAGEMENT_API=
export TASKLIST_MANAGEMENT_API=
export GATEWAY_MANAGEMENT_API=
```

### Backup of the WebApps

1. **Trigger a backup `x` of Optimize. Using the [Optimize management backup API](/self-managed/operational-guides/backup-restore/optimize-backup.md).**

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

2. **Trigger a backup `x` of Operate. Using the [Operate management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).**

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

3. **Trigger a backup `x` of Tasklist. Using the [Tasklist management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).**

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

4. **Wait until the backup `x` of Optimize is complete. Using the [Optimize management backup API](/self-managed/operational-guides/backup-restore/optimize-backup.md).**

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

5. **Wait until the backup `x` of Operate is complete. Using the [Operate management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).**

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

6. **Wait until the backup `x` of Tasklist is complete. Using the [Tasklist management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).**

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

### Backup of the Zeebe Cluster

1. **Soft pause exporting in Zeebe. Using the [management API](/self-managed/zeebe-deployment/operations/management-api.md).**

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

2. **Take a backup `x` of the exported Zeebe records in Elasticsearch / OpenSearch using the respective Snapshots API.**

   By default, the indices are prefixed with `zeebe-record`. If you have configured a different prefix when configuring Elasticsearch / OpenSearch exporter in Zeebe, use this instead.

   <Tabs>
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      [Elasticsearch documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-create)

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

      [OpenSearch documentation](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-snapshot/)

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
<!-- TODO: double check consistent phrasing records vs indices -->
3. **Wait until the backup `x` of the exported Zeebe records is complete before proceeding.**

   <Tabs>
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      [Elasticsearch documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-create)

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

      [OpenSearch documentation](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-status/)

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

4. **Take a backup `x` of the Zeebe broker partitions. Using the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).**

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

5. **Wait until the backup `x` of Zeebe is completed before proceeding. Using the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).**

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

6. **Resume exporting in Zeebe using the [management API](/self-managed/zeebe-deployment/operations/management-api.md).**

      ```bash
      curl -XPOST "$GATEWAY_MANAGEMENT_API/actuator/exporting/resume"
      ```

      <details>
         <summary>Example output</summary>
         <summary>

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
If any of the steps above fail, you may have to restart with a new backup ID. Ensure Zeebe exporting is resumed if the backup process force quits in the middle of the process.
:::

## Restore process

To restore a Camunda 8 cluster from a backup, all components must be restored from their backup corresponding to the same backup ID.

<!--  TODO: Explain why we have to restore certain items in a certain way. -->
<!--  TODO: Differentiate between managed and helm chart deployed ElasticSearch -->
<!--  TODO: Change it to not start Zeebe / Operate / Tasklist / Optimize by default. Because of the seeding, why do extra work. You can worst case fix your definitions afterwards, at least your database is pre-seeded with the backups. -->
<!--  TODO: Unify everthing within this single page on what you have to do. -->
<!-- TODO: Intro on why we have to restore from empty state -->

For the restore we assume we're starting off from a clean slate for all applications including Elasticsearch / OpenSearch. Meaning there is no previous persistent disk or state present and we're restoring everything from new.

It's important to note that starting any application will automatically result in the seeding of the database or persistent disk. This will hinder the restore process and existing data will block a successful restore process.

1. **Restore the Elasticsearch / OpenSearch indices that were previously backed up.**

   Prerequisite:
   - Elasticsearch / OpenSearch is set up and running with a clean slate and no data on it.
   - Elasticsearch / OpenSearch are configured with the same snapshot repository as used for backup, as outlined in [prerequisites](#prerequisites).

   If you're using an external Elasticsearch you don't have to interact with the Camunda Helm Chart or Camunda components in general until step 2.

   :::note
   In case of the Camunda Helm Chart, this could be achieved by e.g. disabling all other applications in the `values.yml`.

   ```yaml
   elsaticsearch:
      enabled: true

   connectors:
      enabled: false
   identity:
      enabled: false
   optimize:
      enabled: false
   operate:
      enabled: false
   tasklist:
      enabled: false
   zeebe:
      enabled: false
   zeebe-gateway:
      enabled: false
   ```

   :::

   While the backup order was important to ensure consistent backups. It does not matter in case of the restore process and we can restore the backed up indices in any order.

   The applications don't have any endpoint to restore the backup in Elasticsearch, so you'll have to restore it yourself directly.

   See also [the section about figuring out available backups](#how-to-figure-out-available-backups) since the applications won't be available during backup as mentioned due to the automatic seeding.

   After you have figured out a backup ID that you want to restore, do so for Elasticsearch / OpenSearch for each available backup under the same backupID.

   <Tabs>
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      [Elasticsearch documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-restore)

      ```bash
      curl -XPOST "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
      ```

      </TabItem>
      <TabItem value="opensearch" label="OpenSearch">

      [OpenSearch documentation](https://docs.opensearch.org/docs/latest/api-reference/snapshots/restore-snapshot/)

      ```bash
      curl -XPOST "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
      ```

      </TabItem>
   </Tabs>

   Where `$SNAPSHOT_NAME` would be any of the following based on our example in [figuring out available backups](#how-to-figure-out-available-backups).
   Ensure that all your backups are corresponding to the same backup ID and that each one is restored one by one.

   ```
   camunda_optimize_1748937221_8.7.1_part_1_of_2
   camunda_optimize_1748937221_8.7.1_part_2_of_2
   camunda_operate_1748937221_8.7.2_part_1_of_6
   camunda_operate_1748937221_8.7.2_part_2_of_6
   camunda_operate_1748937221_8.7.2_part_3_of_6
   camunda_operate_1748937221_8.7.2_part_4_of_6
   camunda_operate_1748937221_8.7.2_part_5_of_6
   camunda_operate_1748937221_8.7.2_part_6_of_6
   camunda_tasklist_1748937221_8.7.2_part_1_of_6
   camunda_tasklist_1748937221_8.7.2_part_2_of_6
   camunda_tasklist_1748937221_8.7.2_part_3_of_6
   camunda_tasklist_1748937221_8.7.2_part_4_of_6
   camunda_tasklist_1748937221_8.7.2_part_5_of_6
   camunda_tasklist_1748937221_8.7.2_part_6_of_6
   camunda_zeebe_records_backup_1748937221
   ```

2. **Restore the Zeebe partitions for each Zeebe broker**

<!-- TODO: 2. Confirm proper configuration (such as shards, replicas count, etc.) - if that really is important, how to figure that out just based on your backup?! -->

   <Tabs>
      <TabItem value="kubernetes" label="Kubernetes" default>

      Assuming you're using the official [Camunda Helm Chart](/self-managed/setup/install.md), you'll have to adjust your Helm `values.yml` to supply the following temporarily.
      It will overwrite the start command of the resulting Zeebe pod, executing a restore script.
      It's important that the backup is configured for Zeebe to be able to restore from the backup!

      ```yaml
      zeebe:
         enabled: true
         command: ["/usr/local/zeebe/bin/restore", "--backupId=$BACKUP_ID"] # Change the $BACKUP_ID to your actual value for restoring
         env:
         ... # all the envs related to the backup store

      # assuming you're using the inbuilt Elasticsearch, otherwise should be set to false
      elsaticsearch:
         enabled: true

      connectors:
         enabled: false
      identity:
         enabled: false
      optimize:
         enabled: false
      operate:
         enabled: false
      tasklist:
         enabled: false
      zeebe-gateway:
         enabled: false
      ```

      If you're not using the Camunda Helm Chart, you can use a similar approach natively with Kubernetes to overwrite the command.

      The application will exit and restart the pod. This is an expected behavior. The restore application will not try to restore the state again since the partitions were already restored to the persistent disk.

      </TabItem>
      <TabItem value="manual" label="Manual" default>

      To restore a Zeebe Cluster, run the following in each node where the broker will be running:

      ```
      tar -xzf zeebe-distribution-X.Y.Z.tar.gz -C zeebe/
      ./bin/restore --backupId=<backupId>
      ```

      </TabItem>
   </Tabs>

   If restore was successful, the app exits with a log message of `Successfully restored broker from backup`.

   Restore fails if:

   - There is no valid backup with the given backupId.
   - Backup store is not configured correctly.
   - The configured data directory is not empty.
   - Any other unexpected errors.

   If the restore fails, you can re-run the application after fixing the root cause.

3. **Start all the Camunda 8 applications**

   In the case of Kubernetes this would mean, to enable all applications again in the Helm chart and removing the command overwrite of Zeebe.

   In the case of a manual setup this would mean to execute the broker and all other applications in their normal way.

### How to figure out available backups

The easiest way to figure out available backups is by utilizing the backup APIs of each component to list available backups. <!-- TODO: Link to subpages that are now becoming API focused -->

This may not be possible in a lot of cases, especially if doing disaster recovery.

#### Available Backups on Elasticsearch / OpenSearch

In that case, follow the described steps above and when you have your Elasticsearch / OpenSearch available, use the snapshot API to list available snapshots and correlate that to available snapshots in your backup bucket (AWS S3, Azure Store, Google GCS). It's important to have the same ID for all backups.

<!-- TODO: Tabs: Elastic / OS with the call -->

<Tabs>
   <TabItem value="elasticsearch" label="Elasticsearch" default>

      The following is using the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-get) to list all registered snapshots in a repository.

      ```bash
      ELASTIC_ENDPOINT=http://localhost:9200       # Your Elasticsearch endpoint
      ELASTIC_SNAPSHOT_REPOSITORY=camunda_backup   # Your defined snapshot repository on Elasticsearch for Camunda backups

      # Get a list of all available snapshots
      curl $ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/_all

      # Get a list of all available snapshots and use jq to parse just the names for easier readability
      curl $ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/_all | jq -r '.snapshots[].snapshot'
      ```

      Ensure that all backups and parts exists for each component for your chosen backup ID.

      <details>
         <summary>Example output</summary>
         <summary>

         ```
         camunda_optimize_1748937221_8.7.1_part_1_of_2
         camunda_optimize_1748937221_8.7.1_part_2_of_2
         camunda_operate_1748937221_8.7.2_part_1_of_6
         camunda_operate_1748937221_8.7.2_part_2_of_6
         camunda_operate_1748937221_8.7.2_part_3_of_6
         camunda_operate_1748937221_8.7.2_part_4_of_6
         camunda_operate_1748937221_8.7.2_part_5_of_6
         camunda_operate_1748937221_8.7.2_part_6_of_6
         camunda_tasklist_1748937221_8.7.2_part_1_of_6
         camunda_tasklist_1748937221_8.7.2_part_2_of_6
         camunda_tasklist_1748937221_8.7.2_part_3_of_6
         camunda_tasklist_1748937221_8.7.2_part_4_of_6
         camunda_tasklist_1748937221_8.7.2_part_5_of_6
         camunda_tasklist_1748937221_8.7.2_part_6_of_6
         camunda_zeebe_records_backup_1748937221
         ```

         </summary>
      </details>
   </TabItem>

   <TabItem value="opensearch" label="OpenSearch">

      The following is using the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot/) to list all registered snapshots in a repository.

      ```bash
      OPENSEARCH_ENDPOINT=http://localhost:9200       # Your OpenSearch endpoint
      OPENSEARCH_SNAPSHOT_REPOSITORY=camunda_backup   # Your defined snapshot repository on OpenSearch for Camunda backups

      # Get a list of all available snapshots
      curl $OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all

      # Get a list of all available snapshots and use jq to parse just the names for easier readability
      curl $OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all | jq -r '.snapshots[].snapshot'
      ```

      Ensure that all backups and parts exists for each component for your chosen backup ID.

      <details>
      <summary>Example output</summary>
      <summary>

      ```
      camunda_optimize_1748937221_8.7.1_part_1_of_2
      camunda_optimize_1748937221_8.7.1_part_2_of_2
      camunda_operate_1748937221_8.7.2_part_1_of_6
      camunda_operate_1748937221_8.7.2_part_2_of_6
      camunda_operate_1748937221_8.7.2_part_3_of_6
      camunda_operate_1748937221_8.7.2_part_4_of_6
      camunda_operate_1748937221_8.7.2_part_5_of_6
      camunda_operate_1748937221_8.7.2_part_6_of_6
      camunda_tasklist_1748937221_8.7.2_part_1_of_6
      camunda_tasklist_1748937221_8.7.2_part_2_of_6
      camunda_tasklist_1748937221_8.7.2_part_3_of_6
      camunda_tasklist_1748937221_8.7.2_part_4_of_6
      camunda_tasklist_1748937221_8.7.2_part_5_of_6
      camunda_tasklist_1748937221_8.7.2_part_6_of_6
      camunda_zeebe_records_backup_1748937221
      ```

      </summary>
      </details>
   </TabItem>
</Tabs>

#### Available Backups of Zeebe Partitions

For the Zeebe partitions backup, you will have to check your configured backup store for availablbe backup IDs and correlate those to the available backups on Elasticsearch / OpenSearch.

Zeebe will create a folder for each Partition ID and subfolder in there with each backupID.

<details>
   <summary>Example output</summary>
   <summary>
   Example in the case of 3 partitions with two available backups:

   ```bash
   #PartitionID folder
   #   BackupID folder
   1
      1748937221
      1749130104
   2
      1748937221
      1749130104
   3
      1748937221
      1749130104
   ```

   </summary>
</details>

<!-- TODO: rethink phrasing around WebApps / Elasticsearch / OpenSearch and Zeebe Cluster / Partitions 
Would love to just say WebApps and Zeebe Cluster (Workflow Engine) the problem is that the backups are overlaping due to the Zeebe indices in ES / OS.
So you always have Elasticsearch backups and Zeebe parititon backups.
While e.g. for Backups I can say Backup of WebApps and Backup of Zeebe Cluster. I can't say the same in restore since it's overlapping.
-->

---

<!-- TODO: Add tab grouping to allow to switch for the whole page between elastic and opensearch -->

<!-- TODO: add how to figure out what backups are available? -->

<!-- TODO: Add Tabs for different usages Docker | Compose | Kubernetes (Helm Chart) | Local -->

<!-- TODO: Troubleshooting page? -->

<!-- TODO: Talk about k8s specifics, with snapshots of the disks and potential inconsistencies. -->
