---
id: rdbms
sidebar_label: Configure RDBMS
title: Configure RDBMS in Helm chart
description: "Configure an external relational database (RDBMS) as secondary storage for Camunda 8 Self-Managed using the Helm chart."
---

Camunda 8 Self-Managed supports using an external relational database (RDBMS) as the Orchestration Cluster’s secondary storage instead of Elasticsearch or OpenSearch.

## Prerequisites

Provide a supported relational database that is reachable by the Camunda components.

See the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) for the complete list of supported databases and versions.

Ensure that:

- Your network allows traffic from Camunda pods to the database.
- Required JDBC parameters (SSL/TLS, authentication, failover) are configured as needed.
- The database user has permissions to create and modify schema objects if `autoDDL` is enabled.

## Configuration

### Parameters

| Parameter                                                                                          | Type              | Default | Description                                                                        |
| -------------------------------------------------------------------------------------------------- | ----------------- | ------- | ---------------------------------------------------------------------------------- |
| `orchestration.data.secondaryStorage.type`                                                         | string            | `""`    | Sets the secondary storage type. Must be `rdbms` when using a relational database. |
| `orchestration.data.secondaryStorage.rdbms.url`                                                    | string            | `""`    | JDBC connection URL for the external database.                                     |
| `orchestration.data.secondaryStorage.rdbms.username`                                               | string            | `""`    | Username used to authenticate to the database.                                     |
| `orchestration.data.secondaryStorage.rdbms.secret.existingSecret`                                  | string            | `""`    | Name of an existing Kubernetes secret containing the password.                     |
| `orchestration.data.secondaryStorage.rdbms.secret.existingSecretKey`                               | string            | `""`    | Key within the Kubernetes secret that stores the password.                         |
| `orchestration.data.secondaryStorage.rdbms.secret.inlineSecret`                                    | string            | `""`    | Inline password value. Use only for testing environments.                          |
| `orchestration.data.secondaryStorage.rdbms.flushInterval`                                          | ISO-8601 duration | `""`    | How often the exporter flushes events to the database.                             |
| `orchestration.data.secondaryStorage.rdbms.autoDDL`                                                | boolean           | `true`  | Enables Liquibase-powered auto-creation of database schema.                        |
| `orchestration.data.secondaryStorage.rdbms.prefix`                                                 | string            | `""`    | Table name prefix added to all RDBMS tables.                                       |
| `orchestration.data.secondaryStorage.rdbms.queueSize`                                              | integer           | `1000`  | Size of the exporter queue. Larger values buffer more events.                      |
| `orchestration.data.secondaryStorage.rdbms.queueMemoryLimit`                                       | integer           | `20`    | Memory limit (MB) for the exporter queue.                                          |
| `orchestration.data.secondaryStorage.rdbms.history.defaultHistoryTTL`                              | ISO-8601 duration | `""`    | Default TTL for historic process data.                                             |
| `orchestration.data.secondaryStorage.rdbms.history.defaultBatchOperationHistoryTTL`                | ISO-8601 duration | `""`    | TTL for batch operation history.                                                   |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationCancelProcessInstanceHistoryTTL`  | ISO-8601 duration | `""`    | TTL for cancel-process-instance history data.                                      |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationMigrateProcessInstanceHistoryTTL` | ISO-8601 duration | `""`    | TTL for migrate-process-instance history.                                          |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationModifyProcessInstanceHistoryTTL`  | ISO-8601 duration | `""`    | TTL for modify-process-instance history.                                           |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationResolveIncidentHistoryTTL`        | ISO-8601 duration | `""`    | TTL for resolve-incident history.                                                  |
| `orchestration.data.secondaryStorage.rdbms.history.minHistoryCleanupInterval`                      | ISO-8601 duration | `""`    | Minimum interval for periodic history cleanup.                                     |
| `orchestration.data.secondaryStorage.rdbms.history.maxHistoryCleanupInterval`                      | ISO-8601 duration | `""`    | Maximum interval for periodic history cleanup.                                     |
| `orchestration.data.secondaryStorage.rdbms.history.historyCleanupBatchSize`                        | integer           | `1000`  | Batch size when deleting history data.                                             |
| `orchestration.data.secondaryStorage.rdbms.history.usageMetricsCleanup`                            | string            | `""`    | Cleanup configuration for usage metrics.                                           |
| `orchestration.data.secondaryStorage.rdbms.history.processCache.maxSize`                           | string            | `""`    | Cache size for historic process definitions.                                       |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationCache.maxSize`                    | integer           | `10000` | Cache size for batch operation history.                                            |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.maximumPoolSize`                 | integer           | `""`    | Maximum number of JDBC connections.                                                |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.minimumIdle`                     | integer           | `""`    | Minimum number of idle JDBC connections.                                           |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.idleTimeout`                     | ISO-8601 duration | `""`    | Maximum time a connection may remain idle.                                         |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.maxLifetime`                     | ISO-8601 duration | `""`    | Maximum lifetime of a JDBC connection.                                             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.connectionTimeout`               | ISO-8601 duration | `""`    | Timeout for acquiring a connection from the pool.                                  |

### Example usage

:::warning Important
Operate does not support RDBMS until **Camunda 8.9.0-alpha3**.
:::

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://hostname:5432/camunda
        username: camunda
        secret:
          existingSecret: camunda-db-secret
          existingSecretKey: password
```

## Loading JDBC drivers into pods

Some databases—such as Oracle—require JDBC drivers that cannot be included in the Camunda image due to licensing restrictions. You must provide these drivers at runtime using one of the following approaches:

1. **Init container**: Download JDBC drivers at pod startup.
2. **Custom Docker image**: Build an image that bundles the driver.
3. **Mounted volume**: Mount a persistent volume or secret that contains the driver.

### Option 1: Using an init container

:::note
This example uses `/driver-lib`, which the Orchestration Cluster automatically adds to the classpath. If you use a different directory, additional override configuration may be required (command, entrypoint).
:::

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        secret:
          inlineSecret: mypassword
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
      emptyDir: {}
  initContainers:
    - name: fetch-jdbc-drivers
      image: alpine:3.19
      imagePullPolicy: Always
      command:
        - sh
        - -c
        - >
          wget https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc11/23.9.0.25.07/ojdbc11-23.9.0.25.07.jar
          -O /driver-lib/ojdbc.jar
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /driver-lib
      securityContext:
        runAsUser: 1001
```

### Option 2: Using a custom Docker image

:::warning Important
This approach has not yet been validated in production.
:::

```dockerfile
FROM camunda/camunda-platform:8.8.0
ADD ojdbc8.jar /driver-lib/ojdbc8.jar
```

```sh
docker build -t internal-registry/orchestration:8.8.0 .
docker push internal-registry/orchestration:8.8.0
```

To use this custom image:

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  image:
    repository: internal-registry/orchestration
    tag: 8.8.0
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        secret:
          inlineSecret: mypassword
```

### Option 3: Mounting a JDBC driver from a volume

:::warning Important
Mounting an `emptyDir volume` does not persist across pod restarts. Use a ConfigMap, PersistentVolume, or custom image for production.
:::

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        secret:
          inlineSecret: mypassword
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
```

Copy the driver manually to the pod:

```sh
kubectl cp /path/to/ojdbc8.jar <pod-name>:/driver-lib/ojdbc8.jar
```

## Verifying connectivity

To confirm that the Orchestration Cluster is successfully writing to the database:

1. Verify that tables were created (for example, `\dt` or `\d` in PostgreSQL).
2. Deploy a process model and start a process instance using Web Modeler.
3. Query the database directly:

```sql
SELECT * FROM process_instances;
```

4. Review logs for messages such as:

```
io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS with global table trimmedPrefix ''.
...

io.camunda.exporter.rdbms.RdbmsExporter - [RDBMS Exporter[] RdbmsExporter created with Configuration: flushInterval=PT0.5S, queueSize=1000
io.camunda.exporter.rdbms.RdbmsExporter - [RDBMS Exporter[] Exporter opened with last exported position 3318
...
org.springframework.web.servlet.DispatcherServlet - Completed initialization in 0 ms
```

If the flush interval is long or the queue size is large, exported data may take several seconds to appear in the database.
