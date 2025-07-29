---
id: backup-and-restore
title: "Back up and restore"
sidebar_label: "Back up and restore"
keywords: ["backup", "backups"]
description: "Learn how to back up and restore your Camunda 8 Self-Managed components."
---

:::note
The Camunda 8.8 release introduces breaking changes for [Operate and Tasklist](./webapps-backup.md).
:::

:::note
If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, it is possible to run the backup of Operate and Tasklist indices (steps 2 and 4 from the backup procedure below) as a standalone application separate from the main application (see [standalone backup application](/self-managed/concepts/elasticsearch-without-cluster-privileges.md#standalone-backup-application)).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './react-components/\_card-data';

Use the backup feature to back up and restore your Camunda 8 Self-Managed components and cluster.

## About this guide

This guide covers how to back up and restore your Camunda 8 Self-Managed components and cluster. You should automate the procedures in this guide, choosing tools that fulfil the requirements of your organization.

- Regularly [back up](./backup.md) the state of your Zeebe, Web Applications (Operate, Tasklist), and Optimize components without any downtime. You can also back up and restore Web Modeler data.

- [Restore](./restore.md) a cluster from a backup if any failures occur that cause data loss.

<ZeebeGrid zeebe={overviewCards} />

:::note

- The examples in this guide are based on using the following tools: [curl](https://curl.se/), [jq](https://jqlang.org/), and [kubectl](https://kubernetes.io/de/docs/reference/kubectl/).

:::

## Why you should use backup and restore

1. Soft pause exporting in Zeebe. See the [Zeebe management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).
2. Trigger a backup `x` of the web applications. See how to take a [web application backup](./webapps-backup.md).
3. Trigger a backup `x` of Optimize. See how to take an [Optimize backup](./optimize-backup.md)
4. Wait until the backup `x` of web applications is complete. See how to [monitor a web application backup](./webapps-backup.md).
5. Wait until the backup `x` of Optimize is complete. See how to [monitor an Optimize backup](./optimize-backup.md).
6. Take a backup `x` of the exported Zeebe records in Elasticsearch using the Elasticsearch Snapshots API.

For example, using Elasticsearch / OpenSearch’s native snapshot capabilities directly does not produce a coherent backup. This is because Operate, Tasklist, and Optimize each manage their data across multiple indices, which cannot be reliably captured together without involvement from the components that understand their structure. For this reason, **backups must be** initiated through each component individually, using **their built-in backup functionality**.

The same principle applies to Zeebe. **Backups must be** scheduled through Zeebe to ensure a **consistent snapshot** of all partition data. Simply taking a disk-level snapshot of each Zeebe broker is not enough, as the brokers operate independently and data may not be aligned across them at the time of the snapshot. Since disk-level backups are not synchronized, this can lead to inconsistencies and invalid recovery points.

A complete backup of a Camunda 8 cluster includes:

- Backups of Web Applications (Operate, Tasklist), and Optimize (triggered through their APIs).
- Backup of indices from Elasticsearch/OpenSearch containing exported Zeebe records.
- A Zeebe broker partition backup (triggered through its API).

7. Wait until the backup `x` of the exported Zeebe records is complete before proceeding.
8. Take a backup `x` of Zeebe. See how to take a [Zeebe backup](./zeebe-backup-and-restore.md).
9. Wait until the backup `x` of Zeebe is completed before proceeding. See how to [monitor a Zeebe backup](./zeebe-backup-and-restore.md).
10. Resume exporting in Zeebe. See [Zeebe management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).
    Because the data across these systems is interdependent, **all components must be backed up** as part of the **same backup window**. Backups taken independently at different times may not align and could result in an unreliable restore point.

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
| Set up a snapshot repository in the secondary datastore. | <p>Depending on the choice of secondary datastore, you must configure the following on the datastore itself:</p><p><ul><li>[Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories)</li><li>[OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)</li></ul></p><p><small>Note: For Elasticsearch configuration with the Camunda Helm chart on AWS EKS using IRSA, see [configuration example](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/irsa.md#backup-related).</small></p>                                                                        |
| Configure component backup storage.                      | <p>Configure the backup storage for the components. This is also important for restoring a backup.</p><p><ul><li>[Operate](../../../self-managed/components/orchestration-cluster/operate/operate-configuration.md#backups)</li><li>[Optimize Elasticsearch](../../../self-managed/components/optimize/configuration/system-configuration.md#elasticsearch-backup-settings) / [Optimize OpenSearch](../../components/optimize/configuration/system-configuration.md#opensearch-backup-settings)</li><li>[Tasklist](../../../self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#backups)</li><li>[Zeebe](../../../self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackup)</li></ul></p> |

:::note
You should keep the backup storage of the components configured at all times to ease the backup and restore process and avoid unnecessary restarts.
:::

:::tip
You can use the same backup storage location for both Elasticsearch / OpenSearch snapshots and Zeebe partition backups, as long as different paths are configured:

- Set the `basePath` for Zeebe.
- Set the `base_path` for Elasticsearch / OpenSearch.

1. Start Zeebe, Operate, Tasklist, and Optimize. (To ensure templates/aliases etc. are created)
2. Confirm proper configuration (such as shards, replicas count, etc.)
3. Stop Operate, Tasklist, and Optimize.
4. Delete all indices.
5. Restore the state of the [web applications](./webapps-backup.md) and [Optimize](./optimize-backup.md).
6. Restore `zeebe-records*` indices from Elasticsearch snapshot.
7. Delete the data directory of all Zeebe brokers
8. Restore [Zeebe](./zeebe-backup-and-restore.md).
9. Start Zeebe, Operate, Tasklist, and Optimize.
