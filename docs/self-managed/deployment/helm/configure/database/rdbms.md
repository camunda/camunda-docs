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

| Parameter                                                                              | Type   | Default | Description |
| -------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `orchestration.exporters.rdbms.url`                                                    | string | `""`    |             |
| `orchestration.exporters.rdbms.username`                                               | string | `""`    |             |
| `orchestration.exporters.rdbms.secret.existingSecret`                                  | string | `""`    |             |
| `orchestration.exporters.rdbms.secret.existingSecretKey`                               | string | `""`    |             |
| `orchestration.exporters.rdbms.secret.inlineSecret`                                    | string | `""`    |             |
| `orchestration.exporters.rdbms.flushInterval`                                          | string | `""`    |             |
| `orchestration.exporters.rdbms.auto-ddl`                                               | string | `""`    |             |
| `orchestration.exporters.rdbms.prefix`                                                 | string | `""`    |             |
| `orchestration.exporters.rdbms.maxQueueSize`                                           | string | `""`    |             |
| `orchestration.exporters.rdbms.history.defaultHistoryTTL`                              | string | `""`    |             |
| `orchestration.exporters.rdbms.history.defaultBatchOperationHistoryTTL`                | string | `""`    |             |
| `orchestration.exporters.rdbms.history.batchOperationCancelProcessInstanceHistoryTTL`  | string | `""`    |             |
| `orchestration.exporters.rdbms.history.batchOperationMigrateProcessInstanceHistoryTTL` | string | `""`    |             |
| `orchestration.exporters.rdbms.history.batchOperationModifyProcessInstanceHistoryTTL`  | string | `""`    |             |
| `orchestration.exporters.rdbms.history.batchOperationResolveIncidentHistoryTTL`        | string | `""`    |             |
| `orchestration.exporters.rdbms.history.minHistoryCleanupInterval`                      | string | `""`    |             |
| `orchestration.exporters.rdbms.history.maxHistoryCleanupInterval`                      | string | `""`    |             |
| `orchestration.exporters.rdbms.history.historyCleanupBatchSize`                        | string | `""`    |             |
| `orchestration.exporters.rdbms.history.usageMetricsCleanup`                            | string | `""`    |             |
| `orchestration.exporters.rdbms.history.processCache.maxSize`                           | string | `""`    |             |
| `orchestration.exporters.rdbms.history.batchOperationCache.maxSize`                    | string | `""`    |             |
| `orchestration.exporters.rdbms.history.connection-pool.maximumPoolSize`                | string | `""`    |             |
| `orchestration.exporters.rdbms.history.connection-pool.maximumPoolSize`                | string | `""`    |             |
| `orchestration.exporters.rdbms.history.connection-pool.minimumIdle`                    | string | `""`    |             |
| `orchestration.exporters.rdbms.history.connection-pool.idleTimeout`                    | string | `""`    |             |
| `orchestration.exporters.rdbms.history.connection-pool.maxLifetime`                    | string | `""`    |             |
| `orchestration.exporters.rdbms.history.connection-pool.connectionTimeout`              | string | `""`    |             |

### Example usage

:::warning Important

Operate will not work with RDBMS until 8.9.0-alpha3

:::

```yaml
rdbms:
  url: jdbc:postgresql://hostname:5432/camunda
  username: camunda
  password: camunda_password

orchestration:
  profiles:
    operate: false
```

## Loading drivers into pods

Some drivers, such as the Oracle JDBC driver, are not included in the Camunda image due to licensing restrictions. To use these databases, you need to somehow include the JDBC driver into the pod. There are a few different ways to accomplish that:

1. **Init Container**: Use an init container to download the driver at pod startup. This is shown in the example below.
2. **Custom Docker Image**: Build a custom Docker image that includes the necessary JDBC drivers and use that image for your Camunda components.
3. **Mounting from a Volume**: If you have the driver stored in a persistent volume or a secret, you can mount that volume into the pod.

### Option 1: Using an Init Container to download the Oracle JDBC driver

:::warning Important

Not yet tested

:::

:::note

This example uses /driver-lib, which is a filepath that the Orchestration Cluster looks for for extra drivers. If you use a different name, you may need to override more settings like the command and entrypoint for a different directory to be added to the classpath.

:::

```yaml
orchestration:
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
          "wget https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar -O /driver-lib/ojdbc.jar",
        ]
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /driver-lib
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

### Option 3: Mounting the JDBC driver from a volume

:::warning Important

Not yet tested

:::

```yaml
orchestration:
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
```

This will mount an empty volume into the container, but on first load you'll need to copy the driver into that folder.

```shell
kubectl cp /path/to/ojdbc8.jar <pod-name>:/app/lib/ojdbc8.jar
```

## References
