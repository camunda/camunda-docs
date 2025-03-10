---
id: operate-tasklist-backup-without-cluster-privileges
title: Backup and restore Operate and Tasklist data without cluster privileges
keywords: ["backup", "backups"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, it is possible to run the backup as a standalone application separate from the main application.

In this case, cluster privileges are only required for the backup creation, the single application does not need cluster privileges to work.

:::note Database Support
This feature is only available from version 8.6.12 onwards and is also only supported for Elasticsearch installations (no OpenSearch support).
:::

:::note Essential privileges required by the single application
An index-level privilege of at least `manage` is still required for the Camunda single application to work properly.
:::

The steps are described in detail below.

## Setup

Before you can use the standalone backup manager:

- The [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) must be configured.

### 1. Initialize the Backup Manager

The backup manager is started as a separate standalone Java application and is responsible for creating backup snapshots .

This step requires a user with cluster-level privileges for the database (for instance: `superuser`) and only needs to be executed once per installation.

#### 1.1 Configure the Backup Manager

Create an additional custom configuration for the backup manager with the following values:

```
camunda:
  operate:
    backup:
      # Example assuming an existing snapshot repository 'els-test'
      repositoryName: els-test
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123
  tasklist:
    backup:
      # Example assuming an existing snapshot repository 'els-test'
      repositoryName: els-test
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123

```

#### 1.2 Start the Backup Manager with the config above

Start the Java application `backup-webapps` (or `backup-webapps.bat` for Windows) provided in the `bin` folder of the delivered jar file. It takes `<backupID>` as argument. The backup ID must be an integer and greater than the previous backups.

Assuming the configuration above was saved in a file named `backup-manager.yaml`, you can start the application with the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/backup-manager.yaml ./bin/backup-webapps <backupID>
```

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
