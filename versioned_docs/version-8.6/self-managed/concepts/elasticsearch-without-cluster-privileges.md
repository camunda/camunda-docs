---
id: elasticsearch-without-cluster-privileges
title: "Elasticsearch without cluster privileges"
keywords: ["elasticsearch", "schema", "backup", "backups"]
---

## Standalone Schema Manager

If the Camunda single application cannot access Elasticsearch with cluster-level privileges, it is possible to run the schema manager as a standalone application separate from the main application.

In this case, cluster privileges are only required for the schema creation, the single application does not need cluster privileges to work.

:::note Database Support
This feature is only available from version 8.6.10 onwards and is also only supported for Elasticsearch installations (no OpenSearch support).
:::

:::note Essential privileges required by the single application
An index-level privilege of at least `manage` is still required for the Camunda single application to work properly.
:::

### Setup

For this setup to work:

- The database schema must be initialized first (step 1). This requires cluster level privileges for the database. This only needs to be executed once.
- Once the schema is initialized, the application can be started without cluster level privileges (step 2).

The steps are described in detail below.

#### 1. Initialize the Schema Manager

The schema manager is started as a separate standalone Java application and is responsible for creating and managing the database schema and applying database settings, such as retention policies for example.

This step requires a user with cluster-level privileges for the database (for instance: `superuser`) and only needs to be executed once per installation.

#### 1.1 Configure Schema Manager

Create an additional custom configuration for the schema manager with the following values:

```
zeebe.broker.exporters.elasticsearch:
  className: io.camunda.zeebe.exporter.ElasticsearchExporter
  args:
    index:
      createTemplate: true
    retention:
      enabled: true
    # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
    authentication:
      username: camunda-admin
      password: camunda123
camunda:
  operate:
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
    archiver:
      # Optional, only if ILM is enabled
      ilmEnabled: true
  tasklist:
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
    archiver:
      # Optional, only if ILM is enabled
      ilmEnabled: true

```

#### 1.2 Start the Schema Manager with the config above

Start the Java application `schema` (or `schema.bat` for Windows) provided in the `bin` folder of the delivered jar file. The schema manager will create the necessary indices and templates in the database and apply the respective settings.
Assuming the configuration above was saved in a file named `schema-manager.yaml`, you can start the application with the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/schema-manager.yaml ./bin/schema
```

Verify that the application executed successfully.

#### 2. Start the Camunda single application

The Camunda single application can now be started without cluster-level privileges. The application will connect to the database and use the schema created by the schema manager.

#### 2.1 Ensure that an Elasticsearch user with sufficient privileges exists

The application requires a database user with at least `manage` privileges on the indices it is meant to work with.

If preferred, you can use an existing user with the required privileges. Alternatively the required privileges can be assigned to an example user named `camunda-app` with the following request to the Elasticsearch REST API:

```
PUT _security/role/read_write_role
{
  "indices": [
    {
      "names": [
        "*"
      ],
      "privileges": [
        "read",
        "write",
        "view_index_metadata"
      ],
      "allow_restricted_indices": false
    },
    {
      "names": [
        "operate-*",
        "tasklist-*",
        "zeebe-*"
      ],
      "privileges": [
        "manage"
      ],
      "allow_restricted_indices": false
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata": {},
  "transient_metadata": {
    "enabled": true
  }
}
```

Then, assign the user to the role defined above. For example, if Elasticsearch is running on Docker, this can be achieved with the following command:

```
docker exec -t elasticsearch elasticsearch-users useradd camunda-app -p camunda123
docker exec -t elasticsearch elasticsearch-users roles camunda-app -a read_write_role
```

#### 2.2 Configure the Camunda single application

Create a configuration for the Camunda single application with the values below. This essentially disables schema creation for the app.

```
zeebe.broker.exporters.elasticsearch:
  className: io.camunda.zeebe.exporter.ElasticsearchExporter
  args:
    index:
      createTemplate: false
    retention:
      enabled: false
      managePolicy: false
    # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
    authentication:
      username: camunda-app
      password: camunda123
camunda:
  tasklist:
    elasticsearch:
      createSchema: false
      username: camunda-app
      password: camunda123
      healthCheckEnabled: false
    zeebeElasticsearch:
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
    archiver:
      ilmEnabled: false
      ilmManagePolicy: false
    migration:
      migrationEnabled: false
  operate:
    elasticsearch:
      createSchema: false
      username: camunda-app
      password: camunda123
      healthCheckEnabled: false
    zeebeElasticsearch:
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
    archiver:
      ilmEnabled: false
    migration:
      migrationEnabled: false
```

#### 2.3 Start the application with the above configuration

#### Starting the application from the JAR file

Start the Java application `camunda` (or `camunda.bat` for Windows) provided in the `bin` folder of the delivered JAR file.
Assuming the configuration above was saved in a file named `application-custom.yaml`, you can start the application with the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/application-custom.yaml ./bin/camunda
```

#### Starting the application using Helm charts

##### Case 1: Auto-generated app config by Helm chart

[Spring Boot convention](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables) environment variables can be used to override configuration.

These are the Helm values needed to disable the schema manager in the Camunda apps.

```
# Helm chart values file.
zeebe:
  env:
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_CREATETEMPLATE
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_RETENTION_ENABLED
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_RETENTION_MANAGEPOLICY
      value: "false"

tasklist:
  env:
    - name: CAMUNDA_TASKLIST_ELASTICSEARCH_CREATESCHEMA
      value: "false"
    - name: CAMUNDA_TASKLIST_ELASTICSEARCH_HEALTHCHECKENABLED
      value: "false"
    - name: CAMUNDA_TASKLIST_ARCHIVER_ILMENABLED
      value: "false"
    - name: CAMUNDA_TASKLIST_ARCHIVER_ILMMANAGEPOLICY
      value: "false"
    - name: CAMUNDA_TASKLIST_MIGRATION_MIGRATIONENABLED
      value: "false"

operate:
  env:
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_CREATESCHEMA
      value: "false"
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_HEALTHCHECKENABLED
      value: "false"
    - name: CAMUNDA_OPERATE_ARCHIVER_ILMENABLED
      value: "false"
    - name: CAMUNDA_OPERATE_MIGRATION_MIGRATIONENABLED
      value: "false"
```

##### Case 2: Manually-managed app config by the user

If the application configurations are managed directly and do not rely on the Helm chart auto-generated configuration.

```
# Helm chart values file.

zeebe:
  configuration |
    [...] # Any other custom config.
    zeebe.broker.exporters.elasticsearch:
      className: io.camunda.zeebe.exporter.ElasticsearchExporter
      args:
        index:
          createTemplate: false
        retention:
          enabled: false
          managePolicy: false
    [...] # Any other custom config.

tasklist:
  configuration |
    [...] # Any other custom config.
    camunda.tasklist:
      elasticsearch:
        createSchema: false
        healthCheckEnabled: false
      archiver:
        ilmEnabled: false
        ilmManagePolicy: false
      migration:
        migrationEnabled: false
    [...] # Any other custom config.

operate:
  configuration |
    [...] # Any other custom config.
    camunda.operate:
      elasticsearch:
        createSchema: false
        healthCheckEnabled: false
      archiver:
        ilmEnabled: false
      migration:
        migrationEnabled: false
    [...] # Any other custom config.
```

### Limitations

- This feature is only available for the Camunda `8.6.10` version and above.
- This feature only works for installations using Elasticsearch.
- Camunda Optimize cannot be executed with this setup.

## Standalone Backup application

Creating backup snapshot in Elasticsearch requires `manage_snapshots` cluster-level privileges. If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, it is possible to run the backup Operate and Tasklist data as a standalone application separate from the main application.

In this case, cluster privileges are only required for the backup creation, the Camunda application(s) do not need cluster privileges to work.

:::note Database Support
This feature is only available from version 8.6.12 onwards and is also only supported for Elasticsearch installations (no OpenSearch support).
:::

:::note
This standalone application only takes care of Operate and Tasklist indices; Optimize is not part of this procedure.
:::

The steps are described in detail below.

### Setup

Before you can use the standalone backup manager, you need

- A user with cluster-level privileges, which includes the creation of snapshots, must be configured in Elasticsearch. A user with [snapshot_user](https://www.elastic.co/guide/en/elasticsearch/reference/current/built-in-roles.html#:~:text=related%20to%20rollups.-,snapshot_user,-Grants%20the%20necessary) role should be enough to run the backup applications. However, when restoring snapshots, index-level permissions are needed to restore data.
- An [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) must be configured.

#### 1. Configure the Backup application

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

#### 2. Start the Backup application

Start the Java application `backup-webapps` (or `backup-webapps.bat` for Windows) provided in the `bin` folder of the delivered jar file. It takes `<backupID>` as argument. The `<backupID>` is the unique identifier of the backup, used as part of the snapshot names. You can find more details about this in [Backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

Assuming the configuration above was saved in a file named `backup-manager.yaml`, you can start the application with the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/backup-manager.yaml ./bin/backup-webapps <backupID>
```

The standalone application will log the current state of the backup, every 5 seconds, until it completes.

Verify that the application executed successfully. Example output logs:

```
INFO  io.camunda.application.StandaloneBackupManager - Snapshot observation:
INFO  io.camunda.application.StandaloneBackupManager - Operate indices snapshot is COMPLETED. Details: [GetBackupStateResponseDto{backupId=12345, state=COMPLETED, failureReason='null', details=[GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.6.11-snapshot_part_1_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.016+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.6.11-snapshot_part_2_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.216+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.6.11-snapshot_part_3_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.216+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.6.11-snapshot_part_4_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.416+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.6.11-snapshot_part_5_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.617+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.6.11-snapshot_part_6_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.617+01:00, failures=[]}]}]
INFO  io.camunda.application.StandaloneBackupManager - Tasklist indices snapshot is COMPLETED. Details: [GetBackupStateResponseDto{backupId=12345, state=COMPLETED, failureReason='null', details=[GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.6.11-snapshot_part_1_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.016+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.6.11-snapshot_part_2_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.216+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.6.11-snapshot_part_3_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.416+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.6.11-snapshot_part_4_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.416+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.6.11-snapshot_part_5_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.617+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.6.11-snapshot_part_6_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.818+01:00, failures=[]}]}]
INFO  io.camunda.application.StandaloneBackupManager - Backup with id:[12345] is completed!
```

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

### Limitations

- This feature is only available for the Camunda `8.6.12` version and above.
- This feature only works for installations using Elasticsearch.
- Camunda Optimize data cannot be backed up with this setup.
- Some operations that are supported by the backup actuator API are not supported by this feature.

As a workaround you can use Elasticsearch API as following:

#### List the snapshots of a backup

```
GET /_snapshot/<repository-name>/*_<backupID>_*
```

#### Delete the snapshots of a backup

:::note Warning
Make sure the `<backupID>` is not a single digit integer, otherwise the command below will delete more snapshots than desired.
:::

```
DELETE /_snapshot/<repository-name>/*_<backupID>_*
```
