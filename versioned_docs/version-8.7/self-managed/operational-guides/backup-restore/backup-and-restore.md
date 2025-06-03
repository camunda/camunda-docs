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

### Prerequisites

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

### Considerations

The backup of each component and the backup of a Camunda 8 cluster is identified by an ID. This means a backup `x` of Camunda 8 consists of backup `x` of Zeebe, backup `x` of Optimize, backup `x` of Operate, and backup `x` of Tasklist. The backup ID must be an integer and greater than the previous backups.

:::note
We recommend using the timestamp as the backup ID.
:::

The steps outlined on this page are general applicable for any kind of deployment but may differ slightly depending on your setup.

If you're defining the `contextPath` in the Helm chart or the `management.server.base-path` in a standalone setup, your API requests will require to prepend the value specific to the `contextPath` / `base-path` for the individual application.

<!-- TODO:
   CHECK OPTIMIZE's STATEMENT:

   The configured context path does not apply to the management port.
   If so, it would go against all the other apps. The `base-path` does overwrite it and the Helm Chart does hardcode it.

   ---
   This really seems to be the case, even with the helm chart.
   TODO: add exception for optimzie ...
 -->

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

### Backup process

To back up a Camunda 8 cluster, execute the following sequential steps:

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

1. Trigger a backup `x` of Optimize.

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

2. Trigger a backup `x` of Operate. See [how to take an Operate backup](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

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

3. Trigger a backup `x` of Tasklist. See [how to take a Tasklist backup](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

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

4. Wait until the backup `x` of Optimize is complete. See [how to monitor an Optimize backup](/self-managed/operational-guides/backup-restore/optimize-backup.md).

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

5. Wait until the backup `x` of Operate is complete. See [how to monitor an Operate backup](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

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

6. Wait until the backup `x` of Tasklist is complete. See [how to monitor a Tasklist backup](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md).

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

7. Soft pause exporting in Zeebe. See [Zeebe management API](/self-managed/zeebe-deployment/operations/management-api.md).

   ```bash
   curl -XPOST "$GATEWAY_MANAGEMENT_API/actuator/exporting/pause?soft=true"
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


8. Take a backup `x` of the exported Zeebe records in Elasticsearch / OpenSearch using the respective Snapshots API.

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
                  
               ],
               "data_streams":[
                  
               ],
               "include_global_state":true,
               "state":"SUCCESS",
               "start_time":"2025-06-03T08:05:10.633Z",
               "start_time_in_millis":1748937910633,
               "end_time":"2025-06-03T08:05:10.633Z",
               "end_time_in_millis":1748937910633,
               "duration_in_millis":0,
               "failures":[
                  
               ],
               "shards":{
                  "total":0,
                  "failed":0,
                  "successful":0
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

         <!-- TODO: You get the idea -->

         </summary>
      </details>

      </TabItem>
   </Tabs>

9. Wait until the backup `x` of the exported Zeebe records is complete before proceeding.

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
                     "done":0,
                     "failed":0,
                     "total":0
                  },
                  "stats":{
                     "incremental":{
                        "file_count":0,
                        "size_in_bytes":0
                     },
                     "total":{
                        "file_count":0,
                        "size_in_bytes":0
                     },
                     "start_time_in_millis":1748937910633,
                     "time_in_millis":0
                  },
                  "indices":{
                     
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

         <!-- TODO: You get the idea -->

         </summary>
      </details>

      </TabItem>
   </Tabs>

10. Take a backup `x` of Zeebe. See [how to take a Zeebe backup](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

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

11. Wait until the backup `x` of Zeebe is completed before proceeding. See [how to monitor a Zeebe backup](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

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

12. Resume exporting in Zeebe. See [Zeebe management API](/self-managed/zeebe-deployment/operations/management-api.md).

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

### Restore

To restore a Camunda 8 cluster from a backup, all components must be restored from their backup corresponding to the same backup ID:

<!--  TODO: Explain why we have to restore certain items in a certain way. -->
<!--  TODO: Differentiate between managed and helm chart deployed ElasticSearch -->
<!--  TODO: Change it to not start Zeebe / Operate / Tasklist / Optimize by default. Because of the seeding, why do extra work. You can worst case fix your definitions afterwards, at least your database is pre-seeded with the backups. -->
<!--  TODO: Unify everthing within this single page on what you have to do. -->

1. Start Zeebe, Operate, Tasklist, and Optimize. (To ensure templates/aliases etc. are created)
2. Confirm proper configuration (such as shards, replicas count, etc.)
3. Stop Operate, Tasklist, and Optimize.
4. Delete all indices.
5. Restore the state of [Operate](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md), [Tasklist](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md), and [Optimize](/self-managed/operational-guides/backup-restore/optimize-backup.md).
6. Restore `zeebe-records*` indices from Elasticsearch snapshot.
7. Restore [Zeebe](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).
8. Start Zeebe, Operate, Tasklist, and Optimize.

#### How to figure out available backups

The easiest way to figure out available backups is by utilizing the backup APIs of each component to list available backups. <!-- TODO: Link to subpages that are now becoming API focused -->

This may not be possible in a lot of cases, especially if doing disaster recovery.

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

      <!-- TODO: Try it out and adjust for OpenSearch, at least not publicly documented about `_all` may switch to the CAT API --->

      ```bash
      OPENSEARCH_ENDPOINT=http://localhost:9200       # Your OpenSearch endpoint
      OPENSEARCH_SNAPSHOT_REPOSITORY=camunda_backup   # Your defined snapshot repository on OpenSearch for Camunda backups

      # Get a list of all available snapshots
      curl -XGET $OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all

      # Get a list of all available snapshots and use jq to parse just the names for easier readability
      curl -XGET $OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/_all | jq -r '.snapshots[].snapshot'
      ```

      Ensure that all backups and parts exists for each component for your chosen backup ID.

      <details>
      <summary>Example output</summary>
      <summary>

      <!-- TODO: You get the idea -->

      </summary>
      </details>
   </TabItem>
</Tabs>

<!-- TODO: add remaing item to figure out available Zeebe partition backups -->

<!-- TODO: Add tab grouping to allow to switch for the whole page between elastic and opensearch -->

<!-- TODO: add how to figure out what backups are available? -->

<!-- TODO: Add Tabs for different usages Docker | Compose | Kubernetes (Helm Chart) | Local -->

<!-- TODO: Troubleshooting page? -->

<!-- TODO: Talk about k8s specifics, with snapshots of the disks and potential inconsistencies. -->
