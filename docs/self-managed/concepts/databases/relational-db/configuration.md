---
id: database-configuration
title: "RDBMS configuration overview"
description: Learn how to configure Camunda to use a relational database as secondary storage, including exporter setup, schema management, privileges, and connection settings.
---

Camunda can use a relational database (RDBMS) as the secondary storage backend for Operate, Tasklist, Identity, and the Camunda REST API.

This page explains how RDBMS configuration works at the application level. If you are deploying with Helm, see:

- [RDBMS configuration in Helm](/self-managed/deployment/helm/configure/database/rdbms.md)
- [Access native SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)

For supported database vendors and versions, see the  
[RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

## Enable RDBMS as secondary storage

To activate an RDBMS backend, configure two components:

1. **Enable the RDBMS exporter in Zeebe**, which streams workflow data to the database.
2. **Configure the application layer** (Operate, Tasklist, Identity, REST API) to use RDBMS for secondary storage.

Example configuration:

```yaml
# Enable the RDBMS exporter in Zeebe
zeebe:
  broker:
    exporters:
      rdbms:
        className: camunda.data.exporters.rdbms.className

# Configure secondary storage for Camunda applications
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://localhost:5432/camunda
        username: camunda
        password: camunda
```

The RDBMS exporter can be used alongside other exporters, but enabling multiple exporters may affect performance.

## Schema management

Camunda uses Liquibase to automatically create and update the database schema on startup.

Liquibase creates two internal management tables:

- `DATABASECHANGELOG`
- `DATABASECHANGELOGLOCK`

These tables must not be modified or deleted.

For Helm deployments requiring manual schema control or access to vendor-specific SQL, see:  
**[Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)**.

### Configure table prefix

To add a prefix to all Camunda-managed database tables:

```yaml
camunda.data.secondary-storage.rdbms.prefix: c8_
```

## Disable automatic schema creation

If your organization manages schema manually:

```yaml
camunda.data.secondary-storage.rdbms.auto-ddl: false
```

SQL scripts for manual schema creation are documented in the Liquibase/SQL access guide linked above.

## Database privileges

The configured database user must have the following privileges on all Camunda tables:

- SELECT
- INSERT
- UPDATE
- DELETE

### Additional privileges for automatic schema management

If Liquibase schema management is enabled, the following privileges must be granted before the first startup:

- CREATE
- ALTER
- DROP

### Additional privilege for purge operations

If using the RDBMS purge feature, the following privilege is required:

- TRUNCATE

## History cleanup

The RDBMS exporter performs automatic history cleanup using two mechanisms:

1. **TTL-based marking**  
   Finished process instances and related data are marked for deletion after their configured history TTL expires.

2. **Periodic cleanup job**  
   A scheduled cleanup process deletes marked data in batches, adjusting its interval dynamically:

- If no data is deleted → interval doubles (up to `max-history-cleanup-interval`)
- If the batch limit is reached → interval halves (down to `min-history-cleanup-interval`)
- Otherwise → the interval remains unchanged

## Database driver

Camunda images include JDBC drivers for all supported databases except Oracle and MySQL.

If you use one of these databases, you must provide the driver yourself.

### Docker Compose

When running Camunda with Docker Compose, mount the driver into `/driver-lib`:

```yaml
services:
  camunda:
    image: camunda/camunda:<tag>
    volumes:
      - <local-path>/driver-lib:/driver-lib
```

Place the driver JAR directly inside the mounted directory (not in subfolders).

### Helm

If you are using the Helm charts, refer to the database configuration guide for the supported driver configuration options:

- [Helm database configuration](../../../../self-managed/deployment/helm/configure/database/index.md)

## Database configuration

RDBMS configuration properties are defined under:

```yaml
camunda.data.secondary-storage.rdbms.*
```

| Property             | Description                                                      | Default |
| -------------------- | ---------------------------------------------------------------- | ------- |
| `url`                | JDBC connection URL                                              | _empty_ |
| `user`               | Username for the connection                                      | _empty_ |
| `password`           | Password for the connection                                      | _empty_ |
| `auto-ddl`           | Enables Liquibase schema management                              | `true`  |
| `prefix`             | Optional table name prefix                                       | `""`    |
| `database-vendor-id` | Manually override vendor detection (`postgres`, `mariadb`, etc.) | _empty_ |

## Connection pool configuration

Camunda uses HikariCP for JDBC connection pooling. The following properties can be adjusted:

| Property name                                                             | Description                                                               | Default |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------- |
| `camunda.data.secondary-storage.rdbms.connection-pool.maximum-pool-size`  | Maximum number of simultaneous connections                                | 10      |
| `camunda.data.secondary-storage.rdbms.connection-pool.minimum-idle`       | Minimum number of idle connections                                        | 10      |
| `camunda.data.secondary-storage.rdbms.connection-pool.idle-timeout`       | Timeout (ms) before closing an idle connection                            | 600000  |
| `camunda.data.secondary-storage.rdbms.connection-pool.max-lifetime`       | Maximum lifetime (ms) of each connection before it is closed and replaced | 1800000 |
| `camunda.data.secondary-storage.rdbms.connection-pool.connection-timeout` | Maximum time (ms) the application waits for a connection from the pool    | 30000   |

## Exporter configuration

The RDBMS exporter is automatically enabled when:

```yaml
camunda.data.secondary-storage.type: rdbms
```

The following additional configuration options are available under `camunda.data.secondary-storage.rdbms`:

### Exporter performance settings

| Property name        | Description                                                                                       | Default |
| -------------------- | ------------------------------------------------------------------------------------------------- | ------- |
| `flush-interval`     | Maximum time a record waits in the flush queue before being flushed and committed to the database | PT0.5S  |
| `max-queue-size`     | Maximum number of records allowed in the flush queue before a forced flush                        | 1000    |
| `queue-memory-limit` | Maximum memory usage (MB) allowed for queued records before a forced flush                        | 20      |

## History cleanup

The RDBMS exporter provides automatic history cleanup, which works in two stages:

1. **TTL marking**  
   When a process instance finishes, its data is marked for deletion once its time-to-live expires.

2. **Periodic cleanup job**  
   A scheduled cleanup job deletes marked records in batches and adjusts future intervals dynamically:

- If no records are deleted → interval doubles (up to `maxHistoryCleanupInterval`)
- If the batch size is fully used → interval halves (down to `minHistoryCleanupInterval`)
- Otherwise → interval remains unchanged

### History cleanup configuration

| Property name                                          | Description                                                             | Default |
| ------------------------------------------------------ | ----------------------------------------------------------------------- | ------- |
| `history.default-history-ttl`                          | TTL for finished process instances and related data (ISO-8601 duration) | P30D    |
| `history.default-batch-operation-ttl`                  | TTL for batch operation history                                         | P5D     |
| `history.batch-operation-cancel-process-instance-ttl`  | TTL for cancel-process-instance batch operations                        | P5D     |
| `history.batch-operation-migrate-process-instance-ttl` | TTL for migrate-process-instance batch operations                       | P5D     |
| `history.batch-operation-modify-process-instance-ttl`  | TTL for modify-process-instance batch operations                        | P5D     |
| `history.batch-operation-resolve-incident-ttl`         | TTL for resolve-incident batch operations                               | P5D     |
| `history.historyCleanupBatchSize`                      | Maximum number of entries deleted per cleanup run                       | 1000    |
| `history.minHistoryCleanupInterval`                    | Minimum duration between cleanup runs (ISO-8601 duration)               | PT1M    |
| `history.maxHistoryCleanupInterval`                    | Maximum duration between cleanup runs (ISO-8601 duration)               | PT60M   |
| `history.usage-metrics-ttl`                            | TTL for usage metrics                                                   | P730D   |
| `history.usage-metrics-cleanup`                        | Interval between usage metrics cleanup runs (ISO-8601 duration)         | PT24H   |

## Exporter cache configuration

| Property name                    | Description                                                      | Default |
| -------------------------------- | ---------------------------------------------------------------- | ------- |
| `process-cache.max-size`         | Maximum number of process definitions held in the exporter cache | 1000    |
| `batch-operation-cache.max-size` | Maximum number of cached batch operations                        | 1000    |
