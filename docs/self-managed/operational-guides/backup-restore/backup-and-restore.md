---
id: backup-and-restore
sidebar_label: Back up and restore
title: Camunda back up and restore
keywords: ["backup", "backups"]
description: "Learn how to back up and restore your Camunda 8 Self-Managed components."
---

Back up and restore your Camunda 8 Self-Managed components and cluster.

:::tip Disaster recovery context
If you are using backups as the foundation of a cross-region recovery strategy, see [Cold Recovery](../../concepts/multi-region/cold-recovery.md) for the architecture, RTO/RPO targets, and recovery flow. Cold Recovery builds on the procedures in this guide.
:::

## Backup process {#backup-process}

Use the backup procedure for the secondary storage in your deployment:

1. [Back up with Elasticsearch or OpenSearch](./backup/elasticsearch/backup.md) when your cluster uses Elasticsearch or OpenSearch as secondary storage.
2. [Back up with an RDBMS](./backup/rdbms/backup.md) when your cluster uses a relational database as secondary storage.
3. Verify that the backup completed and that the required primary and secondary storage backups are available.

Elasticsearch and OpenSearch backups use one backup ID across the component backup set. RDBMS backups use independent primary storage and database backups, which Camunda aligns during restore.

## Restore process

Restore the secondary storage and Zeebe primary storage to a consistent point before starting the Camunda components:

1. Restore the Elasticsearch/OpenSearch snapshots or the RDBMS using the procedure for your deployment.
2. For Camunda 8.10 and later, [restore Zeebe in process](./restore/in-process-restore.md) while the brokers remain running.
3. Restore Elasticsearch/OpenSearch secondary storage with the [ES/OS restore procedure](./restore/elasticsearch/es-os-restore.md), then restore Zeebe with [in-process restore](./restore/in-process-restore.md). If in-process restore is unavailable, use the applicable legacy [Elasticsearch/OpenSearch](./restore/elasticsearch/es-restore.md) or [RDBMS](./restore/rdbms/restore.md) restore application. These procedures are deprecated.
4. Start the Camunda components and verify that the cluster and secondary storage are healthy.

:::warning
Restoring a backup replaces the current state. Confirm the backup and restore point before starting the restore, and plan the required downtime.
:::

## Choose a backup path

| Secondary storage          | Components covered                            | Procedure                                                                                                      |
| :------------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| Elasticsearch / OpenSearch | Zeebe, Operate, Tasklist, Admin, and Optimize | [ES/OS backup](./backup/elasticsearch/backup.md) and [ES/OS restore](./restore/elasticsearch/es-os-restore.md) |
| RDBMS                      | Zeebe, Operate, Tasklist, and Admin           | [RDBMS backup](./backup/rdbms/backup.md) and [RDBMS restore](./restore/rdbms/restore.md)                       |

Optimize always stores its data in Elasticsearch or OpenSearch. When the Orchestration Cluster uses an RDBMS, back up and restore Optimize independently using [the Optimize procedure](./optimize-backup-and-restore.md).

## Management API

The management API provides the operational endpoints used in the backup procedures. It is not a public API, so access it directly through your deployment, for example with Kubernetes port forwarding or a command executed in a pod. The Orchestration Cluster management port is typically `9600`, but the port can differ in your configuration.

## Back up a cluster with multiple Physical Tenants {#back-up-a-cluster-with-multiple-physical-tenants}

For a cluster with multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md), use the tenant-scoped or cluster-wide backup endpoints described in the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md). Use the [in-process restore procedure](./restore/in-process-restore.md#restore-a-cluster-with-multiple-physical-tenants) to restore tenant data.

## Additional backup procedures

- [Zeebe backup management API](./zeebe-backup-and-restore.md)
- [Web applications backup management API](./webapps-backup.md)
- [Optimize backup management API](./optimize-backup.md)
- [Back up and restore Camunda Hub data](./modeler-backup-and-restore.md)
