---
id: rdbms
sidebar_label: Configure RDBMS
title: Configure RDBMS in Helm chart
description: "Learn how to configure RDBMS secondary storage types"
---

Camunda 8 Self-Managed supports connecting to external relational databases (RDBMS) as an alternative to Elasticsearch and OpenSearch.

## Prerequisites

Requires a database accessible to the camunda components. Can be any of the following:

- PostgreSQL 15/16/17
- Oracle 19c/ 23ai
- Maria DB 10.1111.4/11.8
- MySQL
- MS SQLServer

## Configuration

### Parameters

| Parameter                                                                                          | Type                      | Default | Description |
| -------------------------------------------------------------------------------------------------- | ------------------------- | ------- | ----------- |
| `orchestration.data.secondaryStorage.type`                                                         | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.url`                                                    | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.username`                                               | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.secret.existingSecret`                                  | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.secret.existingSecretKey`                               | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.secret.inlineSecret`                                    | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.flushInterval`                                          | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.autoDDL`                                                | boolean                   | `false` |             |
| `orchestration.data.secondaryStorage.rdbms.prefix`                                                 | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.queueSize`                                              | integer                   | `1000`  |             |
| `orchestration.data.secondaryStorage.rdbms.queueMemoryLimit`                                       | integer                   | `20`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.defaultHistoryTTL`                              | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.defaultBatchOperationHistoryTTL`                | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationCancelProcessInstanceHistoryTTL`  | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationMigrateProcessInstanceHistoryTTL` | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationModifyProcessInstanceHistoryTTL`  | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationResolveIncidentHistoryTTL`        | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.minHistoryCleanupInterval`                      | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.maxHistoryCleanupInterval`                      | ISO8601 Duration (string) | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.historyCleanupBatchSize`                        | integer                   | `1000`  |             |
| `orchestration.data.secondaryStorage.rdbms.history.usageMetricsCleanup`                            | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.processCache.maxSize`                           | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.batchOperationCache.maxSize`                    | integer                   | `10000` |             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.maximumPoolSize`                 | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.maximumPoolSize`                 | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.minimumIdle`                     | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.idleTimeout`                     | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.maxLifetime`                     | string                    | `""`    |             |
| `orchestration.data.secondaryStorage.rdbms.history.connectionPool.connectionTimeout`               | string                    | `""`    |             |

### Example usage

:::warning Important

Operate will not work with RDBMS until 8.9.0-alpha3

:::

```yaml
orchestration:
  data:
    secondary-storage:
      rdbms:
        url: jdbc:postgresql://hostname:5432/camunda
        username: camunda
        secret:
          inlineSecret: camunda_password

  profiles:
    operate: false
```

## Loading drivers into pods

Some drivers, such as the Oracle JDBC driver, are not included in the Camunda image due to licensing restrictions. To use these databases, you need to somehow include the JDBC driver into the pod. There are a few different ways to accomplish that:

1. **Init Container**: Use an init container to download the driver at pod startup. This is shown in the example below.
2. **Custom Docker Image**: Build a custom Docker image that includes the necessary JDBC drivers and use that image for your Camunda components.
3. **Mounting from a Volume**: If you have the driver stored in a persistent volume or a secret, you can mount that volume into the pod.

### Option 1: Using an Init Container to download the Oracle JDBC driver

:::note

This example uses /driver-lib, which is a filepath that the Orchestration Cluster looks for for extra drivers. If you use a different name, you may need to override more settings like the command and entrypoint for a different directory to be added to the classpath.

:::

```yaml
orchestration:
  data:
    secondary-storage:
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
      imagePullPolicy: "Always"
      command:
        [
          "sh",
          "-c",
          "wget https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc11/23.9.0.25.07/ojdbc11-23.9.0.25.07.jar -O /driver-lib/ojdbc.jar",
        ]
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /driver-lib
      securityContext:
        runAsUser: 1001
```

### Option 2: Creating a custom Docker image with the Oracle JDBC driver

:::warning Important

Not yet tested

:::

```Dockerfile
FROM camunda/camunda-platform:8.8.0
ADD ojdbc8.jar /driver-lib/ojdbc8.jar
```

```shell
docker build -t internal-registry/orchestration:8.8.0 .
docker push internal-registry/orchestration:8.8.0
```

Then use the new image in your Helm values:

```yaml
orchestration:
  data:
    secondary-storage:
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        inlineSecret: mypassword
  image:
    repository: internal-registry/orchestration
    tag: 8.8.0
```

### Option 3: Mounting the JDBC driver from a volume

:::warning Important

Not yet tested

:::

```yaml
orchestration:
  data:
    secondary-storage:
      rdbms:
        url: jdbc:oracle:thin:@//hostname:1521/FREEPDB1
        username: myuser
        inlineSecret: mypassword
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
```

This will mount an empty volume into the container, but on first load you'll need to copy the driver into that folder.

```shell
kubectl cp /path/to/ojdbc8.jar <pod-name>:/driver-lib/ojdbc8.jar
```

## References
