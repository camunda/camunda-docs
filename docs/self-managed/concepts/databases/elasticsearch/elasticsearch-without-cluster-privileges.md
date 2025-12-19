---
id: elasticsearch-without-cluster-privileges
title: "Elasticsearch without cluster privileges"
keywords: ["elasticsearch", "schema", "backup", "backups"]
---

If the Camunda single application cannot access Elasticsearch with cluster-level privileges, you can run the schema manager as a standalone application, separate from the main application.

## Standalone schema manager

When running the schema manager as a standalone application, cluster-level privileges are required only during schema creation. The single application itself does not need cluster-level privileges.

- **Database support**: This setup is supported only for Elasticsearch installations (OpenSearch is not supported).
- **Privileges required by the single application**: The Camunda single application still requires an index-level privilege of at least `manage` to function properly.

To run the schema manager as a standalone application:

1. [Initialize the schema manager](#initialize): The database schema must first be initialized.
2. [Start the Camunda single application](#start): Once the schema is initialized, start the application without cluster-level privileges.

### 1. Initialize the schema manager {#initialize}

The schema manager is a separate standalone Java application responsible for creating and managing the database schema, and applying database settings (e.g., retention policies).

:::note

- Initialization requires a user with cluster-level privileges (e.g., `superuser`) in the database.
- Initialization needs to be executed only once per installation.

:::

#### Configure the schema manager

Create a custom configuration for the schema manager with the following values:

```yaml
camunda:
  data:
    secondary-storage:
      type: elasticsearch
      elasticsearch:
        # Example assuming an existing user called 'camunda-admin' who has 'superuser' privileges
        username: camunda-admin
        password: camunda123
        url: https://localhost:9200
        # If custom SSL configuration is necessary
        security:
          enabled: true
          self-signed: true
          verify-hostname: false
          certificate-path: PATH_TO_CA_CERT
  # Optional, only if ILM is enabled
  database:
    retention:
      enabled: true
# Optional, only if legacy Elasticsearch exporter is used
zeebe.broker.exporters.elasticsearch:
  class-name: io.camunda.zeebe.exporter.ElasticsearchExporter
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
```

For additional configuration options, see the [common secondary storage configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage).

#### Start the schema manager

Using the custom configuration file, start the Java application `schema` (or `schema.bat` on Windows) located in the `bin` folder of the delivered JAR package. The schema manager will create the necessary indices and templates in the database and apply the configured settings.

Assuming your custom configuration is saved as `schema-manager.yaml`, you can start the application with the following command:

```shell
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/schema-manager.yaml ./bin/schema
```

Verify that the application executed successfully.

### 2. Start the Camunda single application {#start}

The Camunda single application can now be started without cluster-level privileges. It will connect to the database and use the schema previously created by the schema manager.

#### Elasticsearch user with sufficient privileges

Ensure that an Elasticsearch user with sufficient privileges exists. The application requires a database user with at least `manage` privileges on the indices it needs to access.

You can either use an existing user with the required privileges or assign the necessary privileges to an example user named `camunda-app` by sending the following request to the Elasticsearch REST API:

```yaml
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
        "camunda-*",
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

```shell
docker exec -t elasticsearch elasticsearch-users useradd camunda-app -p camunda123
docker exec -t elasticsearch elasticsearch-users roles camunda-app -a read_write_role
```

#### Configure the Camunda single application

Create a configuration for the Camunda single application with the following values. This essentially disables schema creation for the application.

```yaml
camunda:
  data:
    secondary-storage:
    type: elasticsearch
    elasticsearch:
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      security:
        enabled: true
        self-signed: true
        verify-hostname: false
        certificate-path: PATH_TO_CA_CERT
  database:
    schema-manager:
      createSchema: false
  # only required for upgrades from 8.7
  tasklist:
    zeebe-elasticsearch:
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        self-signed: true
        verify-hostname: false
        certificate-path: PATH_TO_CA_CERT
  # only required for upgrades from 8.7
  operate:
    zeebe-elasticsearch:
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      # If custom SSL configuration is necessary
      ssl:
        self-signed: true
        verify-hostname: false
        certificate-path: PATH_TO_CA_CERT
zeebe.broker.exporters:
  camundaexporter:
    class-name: io.camunda.zeebe.exporter.CamundaExporter
    args:
      createSchema: false
      history:
        # Optional, only if ILM is enabled
        retention:
          enabled: true
  # Optional, only if legacy Elasticsearch exporter is used
  elasticsearch:
    class-name: io.camunda.zeebe.exporter.ElasticsearchExporter
    args:
      url: https://localhost:9200
      index:
        create-template: false
      retention:
        enabled: false
        manage-policy: false
      # Example assuming an existing user called 'camunda-app' with the privileges described in 2.1
      authentication:
        username: camunda-app
        password: camunda123
```

#### Start the application

You can start the application using the custom configuration either from the JAR file or with Helm charts.

#### Start the application from the JAR file

Start the Java application `camunda` (or `camunda.bat` on Windows), located in the `bin` folder of the delivered JAR package.

Assuming the configuration is saved in a file named `application-custom.yaml`, start the application with the following command:

```
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/application-custom.yaml ./bin/camunda
```

#### Starting the application using Helm charts

##### Case 1: Auto-generated app configuration by Helm chart

[Spring Boot convention](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables) environment variables can be used to override configuration.

The following Helm values are needed to disable the schema manager in the Camunda apps.

```yaml
# Helm chart values file.
orchestration:
  env:
    - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
      value: "false"
    - name: CAMUNDA_TASKLIST_ELASTICSEARCH_HEALTHCHECKENABLED
      value: "false"
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_HEALTHCHECKENABLED
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CREATESCHEMA
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_CREATETEMPLATE
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_RETENTION_ENABLED
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_RETENTION_MANAGEPOLICY
      value: "false"
```

##### Case 2: Manually-managed app config by the user

If the application configurations are managed directly and do not rely on the Helm chart auto-generated configuration.

```yaml
# Helm chart values file.

orchestration:
  configuration |
    [...] # Any other custom config.
    camunda.database:
      schema-manager:
        create-schema: false
    camunda.tasklist:
      elasticsearch:
        health-check-enabled: false
    camunda.operate:
      elasticsearch:
        health-check-enabled: false
    zeebe.broker.exporters:
      camundaexporter:
        class-name: io.camunda.zeebe.exporter.CamundaExporter
        args:
          create-schema: false
      elasticsearch:
        class-name: io.camunda.zeebe.exporter.ElasticsearchExporter
        args:
          index:
            create-template: false
          retention:
            enabled: false
            manage-policy: false
    [...] # Any other custom config.
```

### Minor version upgrades using the standalone schema manager {#minor-upgrades}

Prepare a Camunda minor version upgrade by running the standalone schema manager for the target version (`N+1`). This pre-creates or adjusts index templates and mappings. You can then upgrade the Camunda single application, minimizing downtime for upgrades that require only schema adjustments.

:::important
Upgrading from 8.7 → 8.8 requires migration steps. Follow the relevant guides and plan a maintenance window:

- [Components update 8.7 to 8.8](../../../components/components-upgrade/870-to-880.md)
- [Helm chart upgrade guide: 8.7 to 8.8](../../../deployment/helm/upgrade/helm-870-880.md)

These steps may require stopping or scaling down the Camunda application before running the migration.
:::

If the target upgrade also requires a data or application migration (as documented in [Upgrade to Camunda 8.8](/self-managed/update/administrators/overview.md)), follow the migration sequence:

1. Stop the Camunda application (or scale it down) before executing the migration logic.
2. Run the schema manager for version `N+1` with a privileged user if schema changes are part of the upgrade.
3. Execute any required migration tooling or steps described in the upgrade documentation.
4. Start or roll out the Camunda application at version `N+1` with schema creation disabled.

If no migration is required, you can keep the application running at version `N` while you run the schema manager for version `N+1`.

#### High-level flow

1. Current state: Camunda single application is running at version `N` (for example, 8.7) and processing traffic with its indices in Elasticsearch.

2. Verification: Check the upgrade documentation for version `N → N+1` (for example, 8.7 → 8.8) to determine if migrations are required.
   - If migrations are not required, continue while keeping `N` running.
   - If migrations are required, schedule downtime and stop the application before running migration steps.

3. Preparation: Obtain the Camunda distribution for version `N+1`.

4. Run the schema manager for version `N+1` with a configuration that grants the required cluster privileges (see [Initialize the schema manager](#initialize)). Keep the existing application at version `N` running. The schema manager applies any new or updated templates, mappings, and ILM policies (if enabled) required by version `N+1`.

5. Completion check: Wait until the schema manager logs successful completion and exits without errors.

6. Application upgrade: Upgrade or perform a rolling update of the Camunda single application from version `N` to `N+1`, using a configuration that disables schema creation. The new version will reuse the already-prepared indices.

#### Example timeline

| Time | Action                                                                  |
| ---- | ----------------------------------------------------------------------- |
| T0   | App v8.6.X running, serving workload                                    |
| T1   | Launch schema manager v8.7.Y with elevated cluster privileges           |
| T2   | Schema manager completes successfully and exits                         |
| T3   | Upgrade or roll out application to v8.7.Y with schema creation disabled |
| T4   | Traffic now served by app v8.7.Y                                        |

This staged approach reduces or eliminates downtime for minor upgrades that require only schema adjustments.

### Update index settings with the standalone schema manager {#settings-updates}

You can use the standalone schema manager to roll out certain index template setting changes without granting cluster privileges to the continuously running Camunda application.

Supported settings (see [configuration references](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#index--retention-settings) and the [Elasticsearch exporter configuration](../../../components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)):

- **numberOfShards** (Operate / Tasklist / Camunda / Zeebe Elasticsearch exporter) — static: applies only to new indices created after the change. Existing indices keep their shard count.
- **numberOfReplicas** (Operate / Tasklist / Camunda) — dynamic: applied to existing indices and index templates.
- **numberOfReplicas** (Zeebe Elasticsearch exporter) — static: applies only to new indices created after the change. Existing indices keep their replica count.
- **templatePriority** (Operate / Tasklist / Camunda / Zeebe Elasticsearch exporter): determines precedence when multiple index templates match. Higher priority templates override lower ones.

#### When to use the schema manager for settings updates

Use the standalone schema manager if you need to:

- Adjust index template-level settings for future indices.
- Trigger a global index replicas count change.
- Modify index template priority.

#### Procedure

1. Prepare a schema manager configuration that includes the new settings.
   - For Operate and Tasklist version 8.7.11+, set `updateSchemaSettings: true`.

   Example configuration:

   ```yaml
   zeebe.broker.exporters.elasticsearch:
     class-name: io.camunda.zeebe.exporter.ElasticsearchExporter
     args:
       index:
         create-template: true
         number-of-shards: 3 # affects only new Zeebe record indices
         number-of-replicas: 1 # affects only new Zeebe record indices
         template-priority: 25 # optional, overrides default priority 20
        ... # other settings
   camunda:
     database:
       index:
         number-of-shards: 1 # only new Operate/Tasklist/Camunda indices
         number-of-replicas: 1 # updates existing Operate/Tasklist/Camunda indices
         template-priority: 25 # optional, overrides default priority 0
        ... # other settings
   ```

2. Run the standalone schema manager with a user that has the required cluster privileges (see [Initialize the schema manager](#initialize)). You can keep the Camunda application online without cluster privileges.
3. Check the logs to confirm the schema manager completed successfully.

### Limitations

- This feature only works with Elasticsearch installations.
- Camunda Optimize cannot be used with this setup.

## Standalone backup application

If the Camunda application(s) cannot access Elasticsearch with cluster-level privileges, you can run the backup for Operate and Tasklist data as a standalone application, separate from the main application.

Creating a snapshot in Elasticsearch requires `manage_snapshots` cluster-level privileges. These privileges are only needed by the application responsible for creating the backups; the Camunda application(s) do not require cluster-level privileges.

- **Database support**: This setup is supported only for Elasticsearch installations (OpenSearch is not supported).
- **Indices**: The standalone application only handles Operate and Tasklist indices. Optimize is not included in this procedure.

:::note

Before using the standalone backup manager:

- A user with cluster-level privileges (including snapshot creation) must be configured in Elasticsearch. A user with the [snapshot_user](https://www.elastic.co/guide/en/elasticsearch/reference/current/built-in-roles.html#:~:text=related%20to%20rollups.-,snapshot_user,-Grants%20the%20necessary) role should be sufficient to run the backup application.  
  However, restoring snapshots also requires index-level permissions.
- An [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) must be configured.

:::

### 1. Configure the backup application

Create a custom `backup-manager.yaml` configuration file for the standalone backup application using the following values:

```yaml
camunda:
  data:
    backup:
      # Example assuming an existing snapshot repository 'els-test'
      repository-name: els-test
    secondary-storage:
      type: elasticsearch
      elasticsearch:
        # Example assuming an existing user called 'camunda-admin' who has 'snapshot_user' privileges
        username: camunda-admin
        password: camunda123
        url: https://localhost:9200
        # If custom SSL configuration is necessary
        security:
          enabled: true
          self-signed: true
          verify-hostname: false
          certificate-path: PATH_TO_CA_CERT
```

For additional configuration options, see the [common database configuration guide](#TODO link to common database configuration page after it is created).

### 2. Start the backup application

Start the Java application `backup-webapps` (or `backup-webapps.bat` on Windows), located in the `bin` folder of the delivered JAR package.

This application requires a `<backupID>` argument—a unique identifier of type `java.lang.Long`, used as part of the snapshot names.  
To learn more, see the [backup and restore guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

Assuming your custom configuration is saved in a file named `backup-manager.yaml`, start the application using the following command:

```shell
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/backup-manager.yaml ./bin/backup-webapps <backupID>
```

The standalone application will log the current state of the backup every five seconds until it completes.

Verify that the application executed successfully.

Example output logs:

```
11:42:13.713 [main] INFO  i.c.a.StandaloneBackupManager - Snapshot observation:
11:42:13.714 [main] INFO  i.c.a.StandaloneBackupManager - Indices snapshot is COMPLETED. Details: [GetBackupStateResponseDto{backupId=12345, state=COMPLETED, failureReason='null', details=[GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_1_of_7', state='SUCCESS', startTime=2025-06-25T11:42:08.495+02:00, failures=null}, GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_2_of_7', state='SUCCESS', startTime=2025-06-25T11:42:08.695+02:00, failures=null}, GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_3_of_7', state='SUCCESS', startTime=2025-06-25T11:42:08.897+02:00, failures=null}, GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_4_of_7', state='SUCCESS', startTime=2025-06-25T11:42:08.897+02:00, failures=null}, GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_5_of_7', state='SUCCESS', startTime=2025-06-25T11:42:08.897+02:00, failures=null}, GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_6_of_7', state='SUCCESS', startTime=2025-06-25T11:42:09.097+02:00, failures=null}, GetBackupStateResponseDetailDto{snapshotName='camunda_webapps_12345_snapshot_part_7_of_7', state='SUCCESS', startTime=2025-06-25T11:42:09.097+02:00, failures=null}]}]
11:42:13.714 [main] INFO  i.c.a.StandaloneBackupManager - Backup with id:[12345] is completed!
```

The backup manager creates a backup of Elasticsearch data. The backup includes several Elasticsearch snapshots containing sets of Camunda, Operate and Tasklist indices.

For example, a backup with an ID of `123` might contain the following Elasticsearch snapshots:

```
camunda_webapps_123_8.8.0_part_1_of_7
camunda_webapps_123_8.8.0_part_2_of_7
camunda_webapps_123_8.8.0_part_3_of_7
camunda_webapps_123_8.8.0_part_4_of_7
camunda_webapps_123_8.8.0_part_5_of_7
camunda_webapps_123_8.8.0_part_6_of_7
camunda_webapps_123_8.8.0_part_7_of_7
```

Once completed, you can proceed with step 7 of the [backup procedure](/self-managed/operational-guides/backup-restore/backup-and-restore.md#backup-process).

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

:::warning
Make sure the `<backupID>` you provide is not a single digit integer, otherwise the following command will delete more snapshots than desired.
:::

```
DELETE /_snapshot/<repository-name>/*_<backupID>_*
```
