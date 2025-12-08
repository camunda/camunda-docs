---
id: backup-and-restore
sidebar_label: Back up and restore
title: Camunda back up and restore
keywords: ["backup", "backups"]
description: "Learn how to back up and restore your Camunda 8 Self-Managed components."
---

:::note
The Camunda 8.8 release introduces breaking changes for [Operate and Tasklist](./webapps-backup.md).
:::

:::note
If the Camunda applications cannot access Elasticsearch with cluster-level privileges, run the backup of Operate and Tasklist indices (steps 2 and 4 from the [backup](./backup.md) procedure) as a standalone application separate from the main application. For details, see the [standalone backup application](/self-managed/concepts/databases/elasticsearch/elasticsearch-without-cluster-privileges.md#standalone-backup-application).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './react-components/\_card-data';

Use the backup feature to back up and restore your Camunda 8 Self-Managed components and cluster.

## About this guide

This guide covers how to back up and restore your Camunda 8 Self-Managed components and cluster. Automate backup and restore procedures with tools that meet your organization’s requirements.

:::info

With Camunda 8.8, the architecture was updated. For clarity, the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) now consists of:

- Zeebe
- Web Applications (Operate and Tasklist)
- Identity

Depending on context, we may refer to a specific subcomponent of the Orchestration Cluster where appropriate.

:::

This guide includes procedures to:

- Regularly [back up](./backup.md) the state of the Orchestration Cluster and Optimize without any downtime. You can also back up and restore Web Modeler data.

- [Restore](./restore.md) a cluster from a backup if any failures occur that cause data loss.

<ZeebeGrid zeebe={overviewCards} />

:::note

- The examples in this guide are based on using the following tools: [curl](https://curl.se/), [jq](https://jqlang.org/), and [kubectl](https://kubernetes.io/de/docs/reference/kubectl/).

:::

## Why you should use backup and restore

The Camunda 8 components like the Orchestration Cluster and Optimize store data in various formats and across multiple indices in Elasticsearch or OpenSearch. Because of this distributed and interdependent architecture, creating a consistent and reliable backup requires coordination between the components.

For example, using Elasticsearch or OpenSearch’s native snapshot capabilities directly does not produce a coherent backup. This is because Operate, Tasklist, and Optimize each manage their data across multiple indices, which cannot be reliably captured together without involvement from the components that understand their structure. For this reason, backups must be initiated through each component individually, using their built-in backup functionality.

The same principle applies to Zeebe. Backups must be scheduled through Zeebe to ensure a consistent snapshot of all partition data. Simply taking a disk-level snapshot of each Zeebe broker is not enough, as the brokers operate independently and data may not be aligned across them at the time of the snapshot. Since disk-level backups are not synchronized, this can lead to inconsistencies and invalid recovery points.

A complete backup of a Camunda 8 cluster includes:

- Backups of Web Applications (Operate, Tasklist), and Optimize (triggered through their APIs).
- Backup of indices from Elasticsearch/OpenSearch containing exported Zeebe records.
- A Zeebe broker partition backup (triggered through its API).

Because the data across these systems is interdependent, all components must be backed up as part of the same backup window. Backups taken independently at different times may not align and could result in an unreliable restore point.

:::warning
To ensure a consistent backup, you must follow the process outlined in this guide. Deviating from it can result in undetected data loss, as there is no reliable method to verify cross-component data integrity after backup.
:::

Following the documented procedure results in a hot backup, meaning that:

- Zeebe continues to process and export data.
- Web Applications (Operate, Tasklist), and Optimize remain fully operational during the backup process.

This ensures high availability while preserving the integrity of the data snapshot.

## Prerequisites

The following prerequisites are required before you can create and restore backups:

| Prerequisite                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Set up a snapshot repository in the secondary datastore. | <p>Depending on the choice of secondary datastore, you must configure the following on the datastore itself:</p><p><ul><li>[Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories)</li><li>[OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)</li></ul></p><p><small>Note: For Elasticsearch configuration with the Camunda Helm chart on AWS EKS using IRSA, see [configuration example](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/irsa.md#backup-related).</small></p>                                                                                  |
| Configure component backup storage.                      | <p>Configure the backup storage for the components. This is also important for restoring a backup.</p><p><ul><li>[Operate](../../../self-managed/components/orchestration-cluster/operate/operate-configuration.md#backups)</li><li>[Optimize Elasticsearch](../../../self-managed/components/optimize/configuration/system-configuration.md#elasticsearch-backup-settings) / [Optimize OpenSearch](../../components/optimize/configuration/system-configuration.md#opensearch-backup-settings)</li><li>[Tasklist](../../../self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#backups)</li><li>[Zeebe](../../../self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackup)</li></ul></p> |

:::note
You should keep the backup storage of the components configured at all times to ease the backup and restore process and avoid unnecessary restarts.
:::

:::tip
You can use the same backup storage location for both Elasticsearch / OpenSearch snapshots and Zeebe partition backups, as long as different paths are configured:

- Set the `basePath` for Zeebe.
- Set the `base_path` for Elasticsearch / OpenSearch.

To learn more about how to configure these settings, refer to the prerequisites linked documentation above.
:::

## Considerations

The backup of each component and the backup of a Camunda 8 cluster is identified by an ID. This means a backup `x` of Camunda 8 consists of backup `x` of Zeebe, backup `x` of Optimize, backup `x` of Web Applications (Operate, Tasklist). The backup ID must be an integer and greater than the previous backups.

:::note
We recommend using the unix timestamp as the backup ID.
:::

The steps outlined on this page are generally applicable for any kind of deployment but might differ slightly depending on your setup.

Optimize is not part of the Web Applications backup API and needs to be executed separately to successfully make a backup. Depending on your deployment configuration, you may not have Optimize deployed. It is safe to ignore the backup instructions for Optimize if it is not deployed.

:::warning breaking change
As of Camunda 8.8, the `indexPrefix` of Operate and Takslist must match. By default it is set to `""`. If overriden, it must set consistently across Operate and Tasklist.
:::

:::warning breaking change
As of Camunda 8.8, configuring Operate and Tasklist with different repository names will potentially create multiple backups in different repositories.
:::

:::warning breaking changes
As of Camunda 8.8, the `/actuator` endpoints for backups have been moved to `/actuator/backupHistory` (Web Applications) and `/actuator/backupRuntime` (Zeebe). The previous `/actuator/backups` endpoint is still active only if the applications are deployed standalone (each application is running in its own process).
:::

### Management API

The management API is an extension of the [Spring Boot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html), typically used for monitoring and other operational purposes. This is not a public API and not exposed. You will need direct access to your Camunda cluster to be able to interact with these management APIs. This is why you'll often see the reference to `localhost`.

Direct access will depend on your deployment environment. For example, direct Kubernetes cluster access with [port-forwarding](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) or [exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/) to execute commands directly on Kubernetes pods. In a manual deployment you will need to be able to reach the machines that host Camunda. Typically, the management port is on port `9600` but might differ on your setup and on the components. You can find the default for each component in their configuration page.

| Component                                                                                                               | Port |
| ----------------------------------------------------------------------------------------------------------------------- | ---- |
| [Optimize](/self-managed/components/optimize/configuration/system-configuration.md#container)                           | 8092 |
| [Orchestration Cluster](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#managementserver) | 9600 |

#### Examples for Kubernetes approaches

<Tabs groupId="application-ports">
   <TabItem value="port-forwarding" label="Port Forwarding" default>

Port-forwarding allows you to temporarily bind a remote Kubernetes cluster port of a service or pod directly to your local machine, allowing you to interact with it via `localhost:PORT`.

Since the services are bound to your local machine, you **cannot reuse the same port for all port-forwards** unless you start and stop each one based on usage. To avoid this limitation, the examples use different local ports for each service, allowing them to run simultaneously without conflict.

```bash
export CAMUNDA_RELEASE_NAME="camunda"
# kubectl port-forward services/$SERVICE_NAME $LOCAL_PORT:$REMOTE_PORT
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-optimize 8092:8092 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-elasticsearch 9200:9200 &
```

Using the bash instruction `&` at the end of each line would run the command in a subshell allowing the use of a single terminal.

   </TabItem>
   <TabItem value="exec" label="Exec">

An alternative to port-forwarding is to run commands directly on Kubernetes pods.
In this example we're going to spawn a temporary pod to execute a curl request.
Alternatives are to use existing pods within the namespace. Camunda's pod includes different base images, each with a different feature set.

```bash
# following will create a temporary alias within your terminal to overwrite the normal curl
export CAMUNDA_NAMESPACE="camunda"
export CAMUNDA_RELEASE_NAME="camunda"
# temporary overwrite of curl, can be removed with `unalias curl` again
alias curl="kubectl run curl --rm -i -n $CAMUNDA_NAMESPACE --restart=Never --image=alpine/curl -- -sS"

curl $CAMUNDA_RELEASE_NAME-zeebe-gateway:9600/actuator/health
curl $CAMUNDA_RELEASE_NAME-optimize:8092/actuator/health
curl $CAMUNDA_RELEASE_NAME-elasticsearch:9200/_cluster/health
```

This allows you to directly execute commands within the namespace and communicate with available services.

   </TabItem>
   <TabItem value="jobs" label="Cronjob">

The examples in this guide showcase the backup process in a manual fashion to help you fully understand the process.
You might want to use [Kubernetes Cronjobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) to automate the backup process for your own use case based on your own environment on a regular schedule.

Kubernetes Cronjobs will spawn a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) on a regular basis. The job will run a defined image within a given namespace, allowing you to run commands and interact with the environment.

:::note

You can see further examples from Camunda consultants in the [Backup and Restore Workshop](https://github.com/camunda-consulting/c8-devops-workshop/tree/main/03%20-%20Lab%203%20-%20Backup%20and%20Restore). You can use these examples to achieve similar automation.

:::

   </TabItem>

</Tabs>

### ContextPath

If you are defining the `contextPath` in the Camunda Helm chart or the `management.server.servlet.context-path` in a standalone setup, your API requests must prepend the value specific to the `contextPath` for the individual component. If the `management.server.port` is defined this also applies to `management.endpoints.web.base-path`. You can learn more about this behavior in the [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/production-ready-monitoring.html#production-ready-customizing-management-server-context-path).

:::warning Optimize Helm chart Exception
Setting the `contextPath` in the Helm chart for Optimize will not overwrite the `contextPath` of the management API, it will remain as `/`.
:::

<details>
<summary>Example</summary>
<summary>

If you are defining the `contextPath` for the Orchestration Cluster in the Camunda Helm chart:

```bash
orchestration:
   contextPath: /example
```

A call to the management API of the Orchestration Cluster would look like the following example:

```bash
ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600

curl $ORCHESTRATION_CLUSTER_MANAGEMENT_API/example/actuator/health
```

Without the `contextPath` it would just be:

```bash
ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600

curl $ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/health
```

</summary>
</details>

<!-- TODO: This section was originally written before the storage architecture changes.
It has now been modernized, but should be reviewed again once full RDBMS support for Operate/Tasklist is GA. -->

### Using a relational database management system (RDBMS)

When Camunda uses an RDBMS as **secondary storage**, backups and restores involve **two independent systems**:

- **Zeebe (primary storage)**
- **The external RDBMS used for secondary storage**

Because these systems maintain complementary portions of the data, **their backups must be coordinated**.  
A consistent restore requires restoring _both_ to the same backup point.

## Backing up when using an RDBMS

When using PostgreSQL, MariaDB, Oracle, SQL Server, or MySQL as secondary storage, follow this process:

1. **Soft-pause exporting in Zeebe**  
   Pausing ensures Zeebe stops writing new records to secondary storage.  
   See the [Zeebe management API](../../components/orchestration-cluster/zeebe/operations/management-api.md).

2. **Back up the relational database**  
   Use your database system’s native tools (e.g., `pg_dump`, Oracle RMAN, MariaDB `mysqldump`, SQL Server backups).  
   Use a backup identifier (recommended: **timestamp**) that matches the Zeebe backup ID in the next step.

3. **Take a Zeebe backup**  
   Create a Zeebe backup using the Backup Management API.  
   See [Take a Zeebe backup](../../operational-guides/backup-restore/zeebe-backup-and-restore.md).

4. **Wait for backup completion**  
   Confirm Zeebe has finished creating the backup.  
   See [Monitor a backup](../../operational-guides/backup-restore/zeebe-backup-and-restore.md).

5. **Resume exporting in Zeebe**  
   Once both backups are complete, resume exporting.  
   See the [Zeebe management API](../../components/orchestration-cluster/zeebe/operations/management-api.md).

:::note
We recommend using a **timestamp** as the shared backup ID to simplify correlation between Zeebe and RDBMS backups.
:::

## Restoring when using an RDBMS

To restore a Camunda 8 system backed by an RDBMS:

1. **Restore the RDBMS backup**  
   Restore the database backup into an empty or clean database instance using your RDBMS-specific tooling.

2. **Restore Zeebe from its backup**  
   See [Restore Zeebe](../../operational-guides/backup-restore/zeebe-backup-and-restore.md).

3. **Start dependent applications**  
   After both primary and secondary storage are restored:
   - Start Zeebe
   - Start Operate (requires consistent secondary storage)
   - Start Tasklist
   - Start Optimize

   Ensure all components use the restored database and backup ID.
