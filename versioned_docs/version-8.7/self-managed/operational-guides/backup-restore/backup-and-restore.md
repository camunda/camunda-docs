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

The following will explore the motive, considerations and actual backup and restore procedures in detail. The goal is for you to understand the steps and choices taken. The manually described procedures should be automated within your organization with the tools of your choice to fulfill your companies requirements.

You need to use the backup feature of Camunda 8 Self-Managed to regularly back up the state of all of its components (Zeebe, Operate, Tasklist, and Optimize) without any downtime (except Web Modeler, see [the Web Modeler backup and restore documentation](./modeler-backup-and-restore.md)).
In case of failures that lead to data loss, you can recover the cluster from a backup.

## Motive

Camunda 8 components - Zeebe, Operate, Tasklist, and Optimize - store data in various formats and across multiple indices in Elasticsearch / OpenSearch. Because of this distributed and interdependent architecture, creating a consistent and reliable backup **requires coordination** between the components themselves.

For example, using Elasticsearch / OpenSearch’s native snapshot capabilities directly will not produce a coherent backup. This is because Operate, Tasklist, and Optimize each manage their data across multiple indices, which cannot be reliably captured together without involvement from the components that understand their structure. For this reason, **backups must be** initiated through each component individually, using **their built-in backup functionality**.

The same principle applies to Zeebe. **Backups must be** scheduled through Zeebe to ensure a **consistent snapshot** of all partition data. Simply taking a disk-level snapshot of each Zeebe broker is insufficient, as the brokers operate independently and data may not be aligned across them at the time of the snapshot. Since disk-level backups are not synchronized, this can lead to inconsistencies and invalid recovery points.

A complete backup of a Camunda 8 cluster includes:

- Backups of Operate, Tasklist, and Optimize (triggered through their APIs)
- Exported Zeebe-related indices from Elasticsearch/OpenSearch
- A Zeebe broker partition backup (triggered through its API)

Because the data across these systems is interdependent, **all components must be backed up** as part of the **same backup window**. Backups taken independently at different times may not align and could result in an unreliable restore point.

:::warning
To ensure a consistent backup, follow the process outlined in the documentation. Deviating from it can result in undetected data loss, as there is no reliable method to verify cross-component data integrity afterward.
:::

Following the documented procedure results in a hot backup, meaning that:

- Zeebe continues processing and exporting data
- WebApps (Operate, Tasklist, Optimize) remain fully operational during the backup process

This ensures high availability while preserving the integrity of the data snapshot.

## Prerequisites

Following items are required to be configured to make use of the backup and restore functionality:

1. Depending on the choice of secondary datastore, following must be configured on the datastore itself:

   - [Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories)
   - [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

2. Configure the components backup storage, these will partly be important for restore as well:

- [Operate](/self-managed/operate-deployment/operate-configuration.md#backups)
- Optimize
  - [Elasticsearch](/self-managed/optimize-deployment/configuration/system-configuration.md#elasticsearch-backup-settings)
  - [OpenSearch](/self-managed/optimize-deployment/configuration/system-configuration.md#opensearch-backup-settings)
- [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md#backups)
- [Zeebe](/self-managed/zeebe-deployment/configuration/broker.md#zeebebrokerdatabackup)

:::note
You should keep the backup storage of the components configured at all times to ease the backup and restore process and avoid unnecessary restarts.
:::

:::tip
You can use the same backup storage location for both Elasticsearch / OpenSearch snapshots and Zeebe partition backups, as long as different paths are configured:

- Set the `basePath` for Zeebe
- Set the `base_path` for Elasticsearch / OpenSearch

For details on how to configure these settings, refer to the linked documentation above.
:::

In the guide, we're showcasing backup and restore, based on the following tools:

- [curl](https://curl.se/)
- [jq](https://jqlang.org/)
- [kubectl](https://kubernetes.io/de/docs/reference/kubectl/)

## Considerations

The backup of each component and the backup of a Camunda 8 cluster is identified by an ID. This means a backup `x` of Camunda 8 consists of backup `x` of Zeebe, backup `x` of Optimize, backup `x` of Operate, and backup `x` of Tasklist. The backup ID must be an integer and greater than the previous backups.

:::note
We recommend using the unix timestamp as the backup ID.
:::

The steps outlined on this page are general applicable for any kind of deployment but may differ slightly depending on your setup.

### Management API

The management API is an extension of the [Spring Boot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html), typically used for monitoring and other operational purposes. This is not a public API and not exposed. You will need direct access to your Camunda cluster to be able to interact with these management APIs. That's why you'll often see the reference to `localhost`.

Direct access, may depend on your deployment environment. For example, direct Kubernetes cluster access with [port-forwarding](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) or [exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/) to execute commands directly on Kubernetes pods. In case of a manual deployment you will need to be able to reach the machines that host Camunda. Typically, the management port is on port `9600` but may differ on your setup and on the components. You will find the default for each component in their configuration page.

| Component                                                                                            | Port |
| ---------------------------------------------------------------------------------------------------- | ---- |
| [Operate](/self-managed/operate-deployment/operate-configuration.md#monitoring-operate)              | 9600 |
| [Optimize](/self-managed/optimize-deployment/configuration/system-configuration.md#container)        | 8092 |
| [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md#monitoring-and-health-probes) | 9600 |
| [Zeebe](/self-managed/zeebe-deployment/configuration/gateway.md#managementserver)                    | 9600 |

#### Examples for Kubernetes approaches

<Tabs groupId="application-ports">
   <TabItem value="port-forwarding" label="Port Forwarding" default>

Port-forwarding allows to temporarily bind a remote Kubernetes cluster port of a service or pod directly to your local machine, allowing you to interact with it via `localhost:PORT`.

Since the services are bound to your local machine, you **cannot reuse the same port for all port-forwards** unless you start and stop each one based on usage. To avoid this limitation, the examples use different local ports for each service, allowing them to run simultaneously without conflict.

```bash
export CAMUNDA_RELEASE_NAME="camunda"
# kubectl port-forward services/$SERVICE_NAME $LOCAL_PORT:$REMOTE_PORT
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-operate 9600:9600 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-optimize 9620:8092 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-tasklist 9640:9600 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9660:9600 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-elasticsearch 9200:9200 &
```

Using the bash instruction `&` at the end of each line would run the command in a subshell allowing the use of a single terminal.

   </TabItem>
   <TabItem value="exec" label="Exec">

An alternative to port-forwarding could be to run commands directly on Kubernetes pods.
In this example we're going to spawn a temporary pod to execute a curl request.
Alternatives could be to use existing pods within the namespace. Camunda's pod come with different base images due to which not all provide the same feature set.

```bash
# following will create a temporary alias within your terminal to overwrite the normal curl
export CAMUNDA_NAMESPACE="camunda"
export CAMUNDA_RELEASE_NAME="camunda"
# temporary overwrite of curl, can be removed with `unalias curl` again
alias curl="kubectl run curl --rm -i -n $CAMUNDA_NAMESPACE --restart=Never --image=alpine/curl -- -sS"

curl $CAMUNDA_RELEASE_NAME-operate:9600/actuator/health
curl $CAMUNDA_RELEASE_NAME-optimize:8092/actuator/health
curl $CAMUNDA_RELEASE_NAME-tasklist:9600/actuator/health
curl $CAMUNDA_RELEASE_NAME-zeebe-gateway:9600/actuator/health
curl $CAMUNDA_RELEASE_NAME-elasticsearch:9200/_cluster/health
```

This will allow to directly execute commands within the namespace and talk to available services.

   </TabItem>
   <TabItem value="jobs" label="Cronjob">

In our examples, we will showcase the backup process in a manual fashion to fully understand the process.
You may want to use [Kubernetes Cronjobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) to automate the backup process for your own use case based on your own environment on a regular schedule.

Kubernetes Cronjobs will spawn a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) on a regular basis. The job will run a defined image within a given namespace, allowing you to run commands and interact with the environment.

:::note

You may want to get inspired what our Consultants have been coming up with in the [Backup and Restore Workshop](https://github.com/camunda-consulting/c8-devops-workshop/tree/main/03%20-%20Lab%203%20-%20Backup%20and%20Restore). These examples in there can be used to achieve a similar automation.

:::

   </TabItem>

</Tabs>

### ContextPath

If you're defining the `contextPath` in the Camunda Helm chart or the `management.server.servlet.context-path` in a standalone setup, your API requests will require to prepend the value specific to the `contextPath` for the individual component. In case the `management.server.port` is defined then this also applies to `management.endpoints.web.base-path`. You can read more about this behavior in the [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/production-ready-monitoring.html#production-ready-customizing-management-server-context-path).

:::warning Optimize Helm chart Exception
Setting the `contextPath` in the Helm chart for Optimize will not overwrite the `contextPath` of the management API and it will remain `/`.
:::

<details>
<summary>Example</summary>
<summary>

If you're defining the `contextPath` for Operate in the Camunda Helm chart:

```bash
operate:
   contextPath: /operate
```

A call to the management API of Operate would look like the following:

```bash
OPERATE_MANAGEMENT_API=http://localhost:9600

curl $OPERATE_MANAGEMENT_API/operate/health
```

Without the `contextPath` it would just be:

```bash
OPERATE_MANAGEMENT_API=http://localhost:9600

curl $OPERATE_MANAGEMENT_API/health
```

</summary>
</details>

## Backup process

The backup process is divided in two parts:

1. [Backup of the WebApps](#backup-of-the-webapps)
2. [Backup of the Zeebe Cluster](#backup-of-the-zeebe-cluster)

These two parts must be executed in a sequential order with their sub-steps to form a consistent backup and are outlined below.

For the WebApps the sub-step order is not crucial, meaning you can interchangeably start the back up first Operate, Optimize, Tasklist or in any other order, as long as those backups are completed before proceeding with the Zeebe Cluster backup. In the Zeebe Cluster backup the order is of importance.

### Backup of the WebApps

#### 0. Example definition of the API endpoints

:::note

This will heavily depend on your setup, the following examples are based on examples given in the [Management API](#management-api) in Kubernetes using either active port-forwarding or overwrite of the local curl command.

As noted in the [Management API](#management-api) section, this API is typically not publicly exposed. Therefore, you will need to access it directly using any means available within your environment.

:::

   <Tabs groupId="application-ports">
      <TabItem value="port-forwarding" label="Port Forwarding" default>

      ```bash
      # only export the BACKUP_ID once as it has to stay consistent throughout the backup procedure
      export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID

      export ELASTIC_SNAPSHOT_REPOSITORY="camunda" # the name of your snapshot repository
      export ELASTIC_ENDPOINT="http://localhost:9200/"

      export OPERATE_MANAGEMENT_API="http://localhost:9600/"
      export OPTIMIZE_MANAGEMENT_API="http://localhost:9620/"
      export TASKLIST_MANAGEMENT_API="http://localhost:9640/"
      export GATEWAY_MANAGEMENT_API="http://localhost:9660/"
      ```

      </TabItem>
      <TabItem value="exec" label="Exec">

      ```bash
      # only export the BACKUP_ID once as it has to stay consistent throughout the backup procedure
      export BACKUP_ID=$(date +%s) # unix timestamp as unique always increasing ID
      export CAMUNDA_RELEASE_NAME="camunda"

      export ELASTIC_SNAPSHOT_REPOSITORY="camunda" # the name of your snapshot repository
      export ELASTIC_ENDPOINT="$CAMUNDA_RELEASE_NAME-elasticsearch:9200"

      export OPERATE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-operate:9600/"
      export OPTIMIZE_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-optimize:8092/"
      export TASKLIST_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-tasklist:9600/"
      export GATEWAY_MANAGEMENT_API="http://$CAMUNDA_RELEASE_NAME-zeebe-gateway:9600/"
      ```

      </TabItem>

   </Tabs>

#### 1. Trigger a backup `x` of Optimize. Using the [Optimize management backup API](/self-managed/operational-guides/backup-restore/optimize-backup.md)

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

#### 2. Trigger a backup `x` of Operate. Using the [Operate management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md)

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

#### 3. Trigger a backup `x` of Tasklist. Using the [Tasklist management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md)

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

#### 4. Wait until the backup `x` of Optimize is complete. Using the [Optimize management backup API](/self-managed/operational-guides/backup-restore/optimize-backup.md)

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

#### 5. Wait until the backup `x` of Operate is complete. Using the [Operate management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md)

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

#### 6. Wait until the backup `x` of Tasklist is complete. Using the [Tasklist management backup API](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md)

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

#### 1. Soft pause exporting in Zeebe. Using the [management API](/self-managed/zeebe-deployment/operations/management-api.md?exporting=softPause#exporting-api)

This will continue exporting records, but not delete those records (log compaction) from Zeebe. This makes the backup a hot backup as outlined in the [motive](#motive).

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

#### 2. Take a backup `x` of the exported Zeebe indices in Elasticsearch / OpenSearch using the respective Snapshots API

By default, the indices are prefixed with `zeebe-record`. If you have configured a different prefix when configuring Elasticsearch / OpenSearch exporter in Zeebe, use this instead.

   <Tabs groupId="search-engine">
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      The following is using the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-create) to create a snapshot.

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

      The following is using the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-snapshot/) to create a snapshot.

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

#### 3. Wait until the backup `x` of the exported Zeebe indices is complete before proceeding

   <Tabs groupId="search-engine">
      <TabItem value="elasticsearch" label="Elasticsearch" default>

      The following is using the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-status-2) to get the snapshot status.

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

      The following is using the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-status/) to get the snapshot status.

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

#### 4. Take a backup `x` of the Zeebe broker partitions. Using the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md)

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

#### 5. Wait until the backup `x` of Zeebe is completed before proceeding. Using the [Zeebe management backup API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md)

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

#### 6. Resume exporting in Zeebe using the [management API](/self-managed/zeebe-deployment/operations/management-api.md)

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
If any of the steps above fail, you may have to restart with a new backup ID. Ensure Zeebe exporting is resumed if the backup process force quits in the middle of the process.
:::

## Restore process

The restore process is divided in two parts:

1. [Restore of Elasticsearch / OpenSearch](#restore-of-elasticsearch--opensearch)
2. [Restore of the Zeebe Cluster](#restore-the-zeebe-cluster)

To restore Camunda 8 from a backup, all components must be restored from their backup corresponding to the same backup ID.

The restore process assumes a **clean state** for all components, including Elasticsearch / OpenSearch. This means **no prior persistent volumes** or **component state** should exist - all data is restored from scratch.

**Backups must be restored** using the **exact Camunda version** they were created with. As noted during the backup process, the version is embedded in the backup name. This is essential because starting a component with a mismatched version may result in startup failures due to schema incompatibilities with Elasticsearch / OpenSearch and the component itself. Although schema changes are generally avoided in patch releases, they can still occur.

When using the Camunda Helm chart, this means figuring out the corresponding version. For this the [Camunda Helm chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/) can help. Click on the `major.minor` release and then search for the backed up patch release of your component. The other components would typically fit in there as well.

<details>
   <summary>Example</summary>
   <summary>

Our Backup looks as follows:

```bash
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

This means, we know:

- Optimize: 8.7.1
- Operate / Tasklist: 8.7.2

Based on that we can look in the [matrix versioning of 8.7](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.7) and quickly see that the corresponding Camunda Helm chart version is `12.0.2`.

   </summary>
</details>

### Restore of Elasticsearch / OpenSearch

Prerequisite:

- Elasticsearch / OpenSearch is set up and running with a clean state and no data on it.
- Elasticsearch / OpenSearch are configured with the same snapshot repository as used for backup, using the outlined documentation in [prerequisites](#prerequisites).

#### 1. Restore of [Templates](https://www.elastic.co/docs/manage-data/data-store/templates)

This includes the restoration of index templates and component templates, which are crucial for Camunda 8 to function properly on continuous use.

Those templates will automatically be applied on newly created indices. These templates are only created on the initial start of the components and the first seeding of the datastore, due to which we have to temporarily restore them before we can restore all Elasticsearch / OpenSearch snapshots.

- **Start Camunda 8 configured with your datastore endpoint**
  - for example deploy the Camunda Helm chart
  - in case of manual context, start Camunda 8 components manually
  - depending on your setup this may mean Operate, Optimize, Tasklist, Zeebe, and the required datastore

The templates are created by Operate, Optimize, and Tasklist on startup on the first seeding of the datastore. While Zeebe creates it whenever required, and isn't limited to the initial start. We recommend starting your full required Camunda 8 stack, so the applications show up healthy.

You can confirm the successful creation of the index templates by using the Elasticsearch / OpenSearch API. The index templates rely on the component templates, so it also confirms that those were successfully re-created.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following is using the [Elasticsearch Index API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-index-template) to list all index templates.

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
      operate-job-8.6.0_template
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

The following is using the [OpenSearch Index API](https://docs.opensearch.org/docs/latest/api-reference/index-apis/get-index-template/) to list all index templates.

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
      operate-job-8.6.0_template
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

#### 2. Stop all components but Elasticsearch / OpenSearch

If you're using an external Elasticsearch / OpenSearch and Kubernetes, you could temporarily [uninstall](https://helm.sh/docs/helm/helm_uninstall/) the Camunda Helm chart or [scale](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) all components to 0, so that nothing is running and potentially interacting with the datastore.

In case of a manual setup, you can simply stop all components.

If you're using the Camunda Helm chart with an embedded Elasticsearch, you can achieve it by e.g. disabling all other components in the `values.yml`.

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

#### 3. Deletion of all indices

Now that we have successfully restored the templates and stopped the components of adding more indices. We have to delete the existing indices to be able to successfully restore the snapshots, otherwise those will block a successful restore.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following is using the [Elasticsearch CAT API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-indices) to list all indices. It's also using the [Elasticsearch Index API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete) to delete an index.

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
      {"acknowledged":true}Deleting index: operate-job-8.6.0_
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

The following is using the [OpenSearch CAT API](https://docs.opensearch.org/docs/latest/api-reference/cat/cat-indices/) to list all indices. It's also using the [OpenSearch Index API](https://docs.opensearch.org/docs/latest/api-reference/index-apis/delete-index/) to delete an index.

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
      {"acknowledged":true}Deleting index: operate-job-8.6.0_
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

#### 4. Restore Elasticsearch / OpenSearch snapshots

While the backup order was important to ensure consistent backups. It does not matter in case of the restore process and we can restore the backed up indices in any order.

The components don't have any endpoint to restore the backup in Elasticsearch, so you'll have to restore it yourself directly.

See also [the section about figuring out available backups](#how-to-figure-out-available-backups) since the components won't be available during backup as mentioned due to the automatic seeding.

After you have figured out a backup ID that you want to restore, do so for Elasticsearch / OpenSearch for each available backup under the same backupID.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following is using the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-restore) to restore a snapshot.

```bash
curl -XPOST "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
```

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following is using the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/restore-snapshot/) to restore a snapshot.

```bash
curl -XPOST "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
```

   </TabItem>
</Tabs>

Where `$SNAPSHOT_NAME` would be any of the following based on our example in [figuring out available backups](#how-to-figure-out-available-backups).
Ensure that all your backups are corresponding to the same backup ID and that each one is restored one by one.

```bash
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

### Restore the Zeebe Cluster

Prerequisites:

- No persistent volumes or disks should contain any pre-existing data.
- Zeebe is configured with the same backup storage as outlined in the [prerequisites](#prerequisites).

:::note
During the restoration of the Elasticsearch / OpenSearch state, we had to temporarily deploy Zeebe. This will have resulted in persistent volumes on Kubernetes and a filled data directory on each Zeebe broker in case of a manual deployment.

In the case of Kubernetes to remove all related persistent volumes.

```bash
kubectl get pvc \
  | grep zeebe \
  | while read namespace pvc; do
      kubectl delete pvc "$pvc"
    done
```

New persistent volumes will be created on a new Camunda Helm Chart upgrade and install.

In case of a manual deployment, this means to remove the data directory of each Zeebe broker.
:::

:::note
When using the Camunda Helm chart, you can optionally disable Operate, Tasklist, Optimize, etc. apart from Zeebe in the `values.yml`. Their data was restored already in the previous section about [Restore of Elasticsearch / OpenSearch](#restore-of-elasticsearch--opensearch) and can be executed from now on, but they depend on Zebee and will crashloop till Zeebe is fully restored.
:::

Camunda provides a standalone app which must be run on each node where a Zeebe broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

:::note
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count must be same as in the backup.

The amount of partitions backed up are also visible in the backup store of Zeebe, see [how to figure out available backups](#available-backups-of-zeebe-partitions).
:::

<Tabs>
   <TabItem value="kubernetes" label="Kubernetes" default>

Assuming you're using the official [Camunda Helm chart](/self-managed/setup/install.md), you'll have to adjust your Helm `values.yml` to supply the following temporarily.

It will overwrite the start command of the resulting Zeebe pod, executing a restore script.
It's important that the backup is configured for Zeebe to be able to restore from the backup!

The following example is possible starting from the Camunda Helm chart version `12.1.0`.
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

The application will exit and restart the pod. This is an expected behavior. The restore application will not try to restore the state again since the partitions were already restored to the persistent disk.

:::tip

In Kubernetes, Zeebe is a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which are meant for long-running and persistent applications. There is no `restartPolicy` due to which the resulting pods of the Zeebe `StatefulSet` will always restart. Meaning that you have to observe the Zeebe brokers during restore and may have to look at the logs with `--previous` if it already restarted.

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

If restore was successful, the app exits with a log message of `Successfully restored broker from backup`.

Restore fails if:

- There is no valid backup with the given backupId.
- Backup store is not configured correctly.
- The configured data directory is not empty.
- Any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

### Start all Camunda 8 components

You have actively restored Elasticsearch / OpenSearch and the Zeebe cluster partitions. You can now normally start everything again and use Camunda 8.

In the case of Kubernetes this would mean, to enable all components again in the Helm chart and removing the environment variables that overwrite the Zeebe startup behavior.

In the case of a manual setup this would mean to execute the broker and all other components in their normal way.

### How to figure out available backups

If you have an active environment you can quickly figure out available backups utilizing the backups APIs for each component to list available backups.

- [Operate](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md#get-backups-list-api)
- [Optimize](/self-managed/operational-guides/backup-restore/optimize-backup.md#get-backup-info-api)
- [Tasklist](/self-managed/operational-guides/backup-restore/operate-tasklist-backup.md#get-backups-list-api)
- [Zeebe](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md#list-backups-api)

This may not be possible in a lot of cases, especially if doing disaster recovery.

#### Available Backups on Elasticsearch / OpenSearch

In that case, follow the described steps above and when you have your Elasticsearch / OpenSearch available, use the snapshot API to list available snapshots and correlate that to available snapshots in your backup bucket (AWS S3, Azure Store, Google GCS). It's important to have the same ID for all backups.

<Tabs groupId="search-engine">
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

         ```bash
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

      ```bash
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
