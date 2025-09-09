---
id: elasticsearch-without-cluster-privileges
title: "Elasticsearch without cluster privileges"
keywords: ["elasticsearch", "schema", "backup", "backups"]
---

If the Camunda single application cannot access Elasticsearch with cluster-level privileges, you can run the schema manager as a standalone application separate from the main application.

## Standalone schema manager

When running the schema manager as a standalone application, cluster privileges are only required for the schema creation. The single application does not need cluster privileges.

- **Database Support**: This feature is also only supported for Elasticsearch installations (no OpenSearch support).
- **Essential privileges required by the single application**: An index-level privilege of at least `manage` is still required for the Camunda single application to work correctly.

To run the schema manager as a standalone application:

1. [Initialize the schema manager](#initialize): The database schema must first be initialized.
1. [Start the Camunda single application](#start): Once the schema is initialized, start the application without cluster level privileges.

### 1. Initialize the schema manager {#initialize}

The schema manager is started as a separate standalone Java application and is responsible for creating and managing the database schema and applying database settings, such as retention policies for example.

:::note

- Initialization requires a user with cluster-level privileges for the database (`superuser` for example).
- Initialization only needs to be executed once per installation.

:::

#### Configure the schema manager

Create an additional custom configuration for the schema manager with the following values:

```
zeebe.broker.exporters.elasticsearch:
  className: io.camunda.zeebe.exporter.ElasticsearchExporter
  args:
    url: https://localhost:9200
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
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
    archiver:
      # Optional, only if ILM is enabled
      ilmEnabled: true
  tasklist:
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
    archiver:
      # Optional, only if ILM is enabled
      ilmEnabled: true
```

For additional configuration options available, please take a look at the respective guides from [Operate](../../operate-deployment/operate-configuration/), [Tasklist](../../tasklist-deployment/tasklist-configuration/), and [Zeebe Elasticsearch Exporter](../../zeebe-deployment/exporters/elasticsearch-exporter/).

#### Start the schema manager

Using the custom configuration provided, start the Java application `schema` (or `schema.bat` for Windows) provided in the `bin` folder of the delivered jar file. The schema manager will create the necessary indices and templates in the database and apply the respective settings.

Assuming the custom configuration was saved in a `schema-manager.yaml`, start the application using the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/schema-manager.yaml ./bin/schema
```

Verify that the application executed successfully.

### 2. Start the Camunda single application {#start}

The Camunda single application can now be started without cluster-level privileges. The application will connect to the database and use the schema created by the schema manager.

#### Elasticsearch user with sufficient privileges

Ensure that an Elasticsearch user with sufficient privileges exists. The application requires a database user with at least `manage` privileges on the indices it is meant to work with.

If preferred, you can use an existing user with the required privileges. Alternatively the required privileges can be assigned to an example user named `camunda-app` by sending the following request to the Elasticsearch REST API:

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

Next, assign the user to the role defined above. For example, if Elasticsearch is running on Docker, use the following command:

```
docker exec -t elasticsearch elasticsearch-users useradd camunda-app -p camunda123
docker exec -t elasticsearch elasticsearch-users roles camunda-app -a read_write_role
```

#### Configure the Camunda single application

Create a configuration for the Camunda single application with the following values. This essentially disables schema creation for the application.

```
zeebe.broker.exporters.elasticsearch:
  className: io.camunda.zeebe.exporter.ElasticsearchExporter
  args:
    url: https://localhost:9200
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
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
    zeebeElasticsearch:
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
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
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
    zeebeElasticsearch:
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
    archiver:
      ilmEnabled: false
    migration:
      migrationEnabled: false
```

#### Start the application

You can start the application with this custom configuration from the JAR file or using Helm Charts.

#### Start the application from the JAR file

Start the Java application `camunda` (or `camunda.bat` for Windows) provided in the `bin` folder of the delivered JAR file.

Assuming the configuration above was saved in an `application-custom.yaml` file, start the application using the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/application-custom.yaml ./bin/camunda
```

#### Starting the application using Helm charts

##### Case 1: Auto-generated app configuration by Helm chart

[Spring Boot convention](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables) environment variables can be used to override configuration.

The following Helm values are needed to disable the schema manager in the Camunda apps.

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

### Minor version upgrades using the standalone schema manager {#minor-upgrades}

A Camunda minor version upgrade can be prepared by first running the standalone schema manager for the target version `N+1` to pre-create or adjust index templates and mappings, then upgrading the Camunda single application. This minimizes downtime when only schema adjustments are needed.

If the target upgrade ALSO requires a data/application migration step (as documented in the [upgrade guide](/self-managed/setup/upgrade.md)), follow the documented migration sequence. That may require:

1. Stopping the Camunda application (or scaling down) before executing the migration logic.
2. Running the schema manager (if schema changes are part of the upgrade) with the new version `N+1` using a privileged user.
3. Executing any required migration tooling/steps per the upgrade documentation.
4. Starting (or rolling out) the Camunda application at version `N+1` with schema creation disabled.

If no explicit migration is required, the running application at version `N` may remain online while you run the `N+1` schema manager.

#### High-level flow

1. Current state: Camunda single application is running at version `N` (example 8.6) (already processing traffic) with its indices in Elasticsearch.
2. Verification: Check the upgrade documentation for upgrading from `N` to `N+1` (example 8.7). Determine whether additional migrations are required:

- No migrations: proceed while keeping `N` running.
- Migrations required: schedule downtime/maintenance window and stop the application before executing required migration steps.

3. Preparation: Obtain the Camunda distribution for version `N+1`.
4. Run schema manager (version `N+1`) standalone with a configuration granting the required cluster privileges (as shown earlier under [Initialize the schema manager](#initialize)). Leave the existing application (version `N`) running. The schema manager applies any new or updated templates / mappings (and ILM policies if enabled) required by version `N+1`.
5. Completion check: Wait until the schema manager logs successful completion and exits without errors.
6. Application upgrade: Upgrade (or perform a rolling update of) the Camunda single application from version `N` to `N+1`, using the configuration that disables schema creation (as shown above). At this point, the new application version will reuse the already-prepared indices.

#### Example timeline

| Time | Action                                                          |
| ---- | --------------------------------------------------------------- |
| T0   | App v8.6.X running, serving workload                            |
| T1   | Launch schema manager v8.7.Y with elevated (cluster) privileges |
| T2   | Schema manager finishes (success) and exits                     |
| T3   | Upgrade / roll application to v8.7.Y (schema creation disabled) |
| T4   | Traffic now served by app v8.7.Y                                |

This staged approach reduces (or can eliminate) downtime for minor upgrades that only need schema adjustments.

### Updating index settings (shards, replicas, template priority) {#settings-updates}

You can also use the standalone schema manager to roll out certain supported index template setting changes without granting cluster privileges to the continuously running Camunda single application.

Supported settings (see the detailed configuration references for [Operate](../../operate-deployment/operate-configuration/#settings-for-shards-and-replicas), [Tasklist](../../tasklist-deployment/tasklist-configuration/#settings-for-shards-and-replicas), and the [Elasticsearch Exporter](../../zeebe-deployment/exporters/elasticsearch-exporter/#configuration)):

- numberOfShards (Operate / Tasklist / Zeebe elasticsearch exporter) – static: only affects new indices created after the change (existing indices keep their shard count).
- numberOfReplicas (Operate / Tasklist) – dynamic: applied to existing indices and index templates.
- numberOfReplicas (Zeebe elasticsearch exporter) – static: only affects new indices created after the change (existing indices keep their replica count).
- templatePriority (Operate / Tasklist / Zeebe elasticsearch exporter, 8.7.11+) – affects precedence when multiple index templates match; higher priority templates win.

#### Use the standalone schema manager for schema settings updates

You can use the standalone schema manager if:

- You need to adjust index template-level settings (for future indices) or trigger a global index replicas count change.
- You want to modify index template priority.

#### Procedure

1. Prepare a schema manager configuration including the new settings. For Operate / Tasklist 8.7.11+ include `updateSchemaSettings: true`, for example:
   ```yaml
   zeebe.broker.exporters.elasticsearch:
     className: io.camunda.zeebe.exporter.ElasticsearchExporter
     args:
       index:
         createTemplate: true
         numberOfShards: 3 # affects only new Zeebe record indices
         numberOfReplicas: 1 # affects only new Zeebe record indices
         templatePriority: 25 # optional (8.7.11+), overrides default priority 20
       ... # other settings
   camunda:
     operate:
       elasticsearch:
         updateSchemaSettings: true # required to push dynamic schema settings (8.7.11+)
         numberOfShards: 1 # only new Operate indices
         numberOfReplicas: 1 # updates existing Operate indices
         indexTemplatePriority: 25 # optional (8.7.11+), overrides default priority 0
       ... # other settings
     tasklist:
       elasticsearch:
         updateSchemaSettings: true # required to push dynamic schema settings (8.7.11+)
         numberOfShards: 1 # only new Tasklist indices
         numberOfReplicas: 1 # updates existing Tasklist indices
         indexTemplatePriority: 25 # optional (8.7.11+), overrides default priority 0
       ... # other settings
   ```
2. Run the standalone schema manager with a user that has the required cluster privileges (as shown under [Initialize the schema manager](#initialize)). The running Camunda application (without cluster privileges) can stay online.
3. Wait for successful completion in the logs.

### Limitations

- This feature only works for installations using Elasticsearch.
- Camunda Optimize cannot be executed with this setup.

## Standalone backup application

If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, you can run the backup Operate and Tasklist data as a standalone application separate from the main application.

Creating a backup snapshot in Elasticsearch requires `manage_snapshots` cluster-level privileges. In this case, cluster privileges are only required for the application that takes care of the backup creation, the Camunda application(s) do not need cluster privileges.

- **Database Support**: This feature is also only supported for Elasticsearch installations (no OpenSearch support).
- **Indices**: This standalone application only takes care of Operate and Tasklist indices; Optimize is not included in this procedure.

:::note

Before you can use the standalone backup manager:

- A user with cluster-level privileges (including snapshot creation) must be configured in Elasticsearch. A user with [snapshot_user](https://www.elastic.co/guide/en/elasticsearch/reference/current/built-in-roles.html#:~:text=related%20to%20rollups.-,snapshot_user,-Grants%20the%20necessary) role should be enough to run the backup applications. However, when restoring snapshots, index-level permissions are needed to restore data.
- An [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) must be configured.

:::

### 1. Configure the backup application

Create a custom configuration `backup-manager.yaml` file for the backup standalone application using the following values:

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
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT
  tasklist:
    backup:
      # Example assuming an existing snapshot repository 'els-test'
      repositoryName: els-test
    elasticsearch:
      # Example assuming an existing user called 'camunda-admin' who has 'snapshot_user' privileges
      username: camunda-admin
      password: camunda123
      healthCheckEnabled: false
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        selfSigned: true
        verifyHostname: false
        certificatePath: PATH_TO_CA_CERT

```

For additional configuration options available, please take a look at the respective guides from [Operate](../../operate-deployment/operate-configuration/), [Tasklist](../../tasklist-deployment/tasklist-configuration/), and [Zeebe Elasticsearch Exporter](../../zeebe-deployment/exporters/elasticsearch-exporter/).

### 2. Start the backup application

Start the Java application `backup-webapps` (or `backup-webapps.bat` for Windows) provided in the `bin` folder of the delivered JAR file.

It takes `<backupID>` as argument. The `<backupID>` is the unique identifier of the backup from type `java.lang.Long`, used as part of the snapshot names. To learn more, see [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

Assuming this custom configuration was saved in a `backup-manager.yaml` file, start the application using the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/backup-manager.yaml ./bin/backup-webapps <backupID>
```

The standalone application will log the current state of the backup, every 5 seconds, until it completes.

Verify that the application executed successfully.

Example output logs:

```
INFO  io.camunda.application.StandaloneBackupManager - Snapshot observation:
INFO  io.camunda.application.StandaloneBackupManager - Operate indices snapshot is COMPLETED. Details: [GetBackupStateResponseDto{backupId=12345, state=COMPLETED, failureReason='null', details=[GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.7-snapshot_part_1_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.016+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.7-snapshot_part_2_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.216+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.7-snapshot_part_3_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.216+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.7-snapshot_part_4_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.416+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.7-snapshot_part_5_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.617+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_operate_12345_8.7-snapshot_part_6_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.617+01:00, failures=[]}]}]
INFO  io.camunda.application.StandaloneBackupManager - Tasklist indices snapshot is COMPLETED. Details: [GetBackupStateResponseDto{backupId=12345, state=COMPLETED, failureReason='null', details=[GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.7-snapshot_part_1_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.016+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.7-snapshot_part_2_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.216+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.7-snapshot_part_3_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.416+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.7-snapshot_part_4_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.416+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.7-snapshot_part_5_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.617+01:00, failures=[]}, GetBackupStateResponseDetailDto{snapshotName='camunda_tasklist_12345_8.7-snapshot_part_6_of_6', state='SUCCESS', startTime=2025-03-11T17:49:08.818+01:00, failures=[]}]}]
INFO  io.camunda.application.StandaloneBackupManager - Backup with id:[12345] is completed!
```

The backup manager creates a backup of Operate and Tasklist data. The backup includes several Elasticsearch snapshots containing sets of Operate and Tasklist indices.

For example, a backup with an ID of `123` might contain the following Elasticsearch snapshots:

```
camunda_operate_123_8.7.0_part_1_of_6
camunda_operate_123_8.7.0_part_2_of_6
camunda_operate_123_8.7.0_part_3_of_6
camunda_operate_123_8.7.0_part_4_of_6
camunda_operate_123_8.7.0_part_5_of_6
camunda_operate_123_8.7.0_part_6_of_6
camunda_tasklist_123_8.7.0_part_1_of_6
camunda_tasklist_123_8.7.0_part_2_of_6
camunda_tasklist_123_8.7.0_part_3_of_6
camunda_tasklist_123_8.7.0_part_4_of_6
camunda_tasklist_123_8.7.0_part_5_of_6
camunda_tasklist_123_8.7.0_part_6_of_6
```

Once completed, you can proceed with the [backup of the Zeebe Cluster](self-managed/operational-guides/backup-restore/backup-and-restore.md#backup-of-the-zeebe-cluster).

### Limitations

- This feature only works for installations using Elasticsearch.
- Camunda Optimize data cannot be backed up with this setup.
- Some operations that are supported by the backup actuator API are not supported by this feature.

As a workaround, you can use the Elasticsearch API as follows:

#### List the snapshots of a backup

```
GET /_snapshot/<repository-name>/*_<backupID>_*
```

#### Delete the snapshots of a backup

:::warning Warning
Make sure the `<backupID>` you provide is not a single digit integer, otherwise the following command will delete more snapshots than desired.
:::

```
DELETE /_snapshot/<repository-name>/*_<backupID>_*
```
