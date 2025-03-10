---
id: operate-tasklist-backup-without-cluster-privileges
title: Backup and restore Operate and Tasklist data without cluster privileges
keywords: ["backup", "backups"]
---

If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, it is possible to run the backup Operate and Tasklist data as a standalone application separate from the main application.

In this case, cluster privileges are only required for the backup creation, the Camunda application(s) do not need cluster privileges to work.

:::note Database Support
This feature is only available from version 8.6.12 onwards and is also only supported for Elasticsearch installations (no OpenSearch support).
:::

:::note
This standalone application only takes care of Operate and Tasklist indices; Optimize is not part of this procedure.
:::

:::note Essential privileges required by the single application
An index-level privilege of at least `manage` is still required for the Camunda application(s) to work properly.
:::

The steps are described in detail below.

## Setup

Before you can use the standalone backup manager:

- A user with cluster-level privileges, which includes the creation of snapshots, must be configured in Elasticsearch. See for example: [snapshot_user](https://www.elastic.co/guide/en/elasticsearch/reference/current/built-in-roles.html#:~:text=related%20to%20rollups.-,snapshot_user,-Grants%20the%20necessary).
- An [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) must be configured.

### 1. Configure the Backup application

Create an custom configuration `backup-manager.yaml` file for the backup standalone application with the following values:

```
camunda:
  operate:
    backup:
      # Example assuming an existing snapshot repository 'els-test'
      repositoryName: els-test
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'snapshot_user' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
  tasklist:
    backup:
      # Example assuming an existing snapshot repository 'els-test'
      repositoryName: els-test
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'snapshot_user' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false

```

### 2. Start the Backup application

Start the Java application `backup-webapps` (or `backup-webapps.bat` for Windows) provided in the `bin` folder of the delivered jar file. It takes `<backupID>` as argument. The `<backupID>` is the unique identifier of the backup, used as part of the snapshot names. You can find more details about this in [Backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

Assuming the configuration above was saved in a file named `backup-manager.yaml`, you can start the application with the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/backup-manager.yaml ./bin/backup-webapps <backupID>
```

The standalone application will log the current state of the backup, every 5 seconds, until it completes.

Verify that the application executed successfully.

The backup manager will create a backup of Operate and Tasklist data. The backup includes several
Elasticsearch snapshots containing sets of Operate and Tasklist indices. For example, a backup with an ID of `123` may contain the following Elasticsearch snapshots:

```
camunda_operate_123_8.6.0_part_1_of_6
camunda_operate_123_8.6.0_part_2_of_6
camunda_operate_123_8.6.0_part_3_of_6
camunda_operate_123_8.6.0_part_4_of_6
camunda_operate_123_8.6.0_part_5_of_6
camunda_operate_123_8.6.0_part_6_of_6
camunda_tasklist_123_8.6.0_part_1_of_6
camunda_tasklist_123_8.6.0_part_2_of_6
camunda_tasklist_123_8.6.0_part_3_of_6
camunda_tasklist_123_8.6.0_part_4_of_6
camunda_tasklist_123_8.6.0_part_5_of_6
camunda_tasklist_123_8.6.0_part_6_of_6
```

Once completed, you can proceed with step 7 of the [backup procedure](self-managed/operational-guides/backup-restore/backup-and-restore.md#backup-process).
