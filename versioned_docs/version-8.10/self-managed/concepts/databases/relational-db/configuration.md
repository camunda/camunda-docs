---
id: database-configuration
title: "RDBMS configuration overview"
sidebar_label: "Configuration overview"
description: Learn how to configure Camunda to use a relational database as secondary storage, including exporter setup, schema management, privileges, and connection settings.
---

Camunda can use a relational database (RDBMS) as the secondary storage backend for Operate, Tasklist, Identity, and the Camunda REST API.

This page explains how RDBMS configuration works at the application level. If you are deploying with Helm, see:

- [RDBMS configuration in Helm](/self-managed/deployment/helm/configure/database/rdbms.md)
- [Access native SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)

For supported database vendors and versions, see the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

:::tip Need end-to-end guidance?
For a unified setup guide covering provisioning, topology decisions, driver management, and backup strategies across both Orchestration Cluster and Camunda Hub, see the [end-to-end RDBMS setup guide](/self-managed/concepts/databases/relational-db/rdbms-setup-guide.md). This guide is useful both when starting a new setup and when harmonizing existing component configurations.
:::

## Enable RDBMS as secondary storage

Set the `camunda.data.secondary-storage.type` property to `rdbms` to activate the full RDBMS backend in a single step. This automatically enables the RDBMS exporter, which streams workflow data to the database, and configures the application layer (Operate, Tasklist, Identity, REST API) to use RDBMS for secondary storage.

Example configuration:

```yaml
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

For Helm deployments requiring manual schema control or access to vendor-specific SQL, see [access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

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

When deploying with Helm, see [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md).

## Database configuration

RDBMS configuration properties are defined under:

```yaml
camunda.data.secondary-storage.rdbms.*
```

| Property                | Description                                                      | Default |
| ----------------------- | ---------------------------------------------------------------- | ------- |
| `url`                   | JDBC connection URL                                              | _empty_ |
| `user`                  | Username for the connection                                      | _empty_ |
| `password`              | Password for the connection                                      | _empty_ |
| `auto-ddl`              | Enables Liquibase schema management                              | `true`  |
| `prefix`                | Optional table name prefix                                       | `""`    |
| `database-vendor-id`    | Manually override vendor detection (`postgres`, `mariadb`, etc.) | _empty_ |
| `ddl-lock-wait-timeout` | Max time Liquibase can hold a lock on the database               | PT15M   |

## Connection pool configuration

Camunda uses HikariCP for JDBC connection pooling. The following properties can be adjusted:

| Property name                                                             | Description                                                               | Default |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------- |
| `camunda.data.secondary-storage.rdbms.connection-pool.maximum-pool-size`  | Maximum number of simultaneous connections                                | 10      |
| `camunda.data.secondary-storage.rdbms.connection-pool.minimum-idle`       | Minimum number of idle connections                                        | 2       |
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

| Property name                                     | Description                                                                                       | Default |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------- |
| `flush-interval`                                  | Maximum time a record waits in the flush queue before being flushed and committed to the database | PT0.5S  |
| `max-queue-size`                                  | Maximum number of records allowed in the flush queue before a forced flush                        | 1000    |
| `queue-memory-limit`                              | Maximum memory usage (MB) allowed for queued records before a forced flush                        | 20      |
| `export-batch-operation-items-on-creation`        | If due items should be exported at the beginning of a batch operation or only after processing    | true    |
| `insert-batching.max-audit-log-insert-batch-size` | Maximum number of rows to batch into a single insert statement into the AUDIT_LOG table           | 50      |
| `insert-batching.max-flow-node-insert-batch-size` | Maximum number of rows to batch into a single insert statement into the FLOW_NODE table           | 25      |
| `insert-batching.max-job-insert-batch-size`       | Maximum number of rows to batch into a single insert statement into the JOB table                 | 25      |
| `insert-batching.max-variable-insert-batch-size`  | Maximum number of rows to batch into a single insert statement into the VARIABLE table            | 25      |

## History cleanup

The RDBMS exporter provides automatic history cleanup, which works in two stages:

1. **TTL marking**  
   When a root process instance finishes, the entire process instance hierarchy (the root and any child process instances started via Call Activities), and all related data are marked for deletion once the root instance's time-to-live expires.

2. **Periodic cleanup job**  
   A scheduled cleanup job deletes marked records in batches and adjusts future intervals dynamically:

- If no records are deleted → interval doubles (up to `max-history-cleanup-interval`)
- If the batch size is fully used → interval halves (down to `min-history-cleanup-interval`)
- Otherwise → interval remains unchanged
- Additionally, cleanup execution is capped by `max-history-cleanup-usage`. The current cleanup run is not interrupted, but the next interval is adjusted.

### History cleanup configuration

RDBMS history configuration properties are defined under:

```yaml
camunda.data.secondary-storage.rdbms.history.*
```

| Property name                                  | Description                                                                                     | Default    |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| `default-history-ttl`                          | TTL for finished process instances and related data (ISO-8601 duration)                         | P30D       |
| `default-batch-operation-ttl`                  | TTL for batch operation history                                                                 | P5D        |
| `batch-operation-cancel-process-instance-ttl`  | TTL for cancel-process-instance batch operations                                                | P5D        |
| `batch-operation-migrate-process-instance-ttl` | TTL for migrate-process-instance batch operations                                               | P5D        |
| `batch-operation-modify-process-instance-ttl`  | TTL for modify-process-instance batch operations                                                | P5D        |
| `batch-operation-resolve-incident-ttl`         | TTL for resolve-incident batch operations                                                       | P5D        |
| `historyCleanupBatchSize`                      | Maximum number of entries deleted per cleanup run                                               | 1000       |
| `min-history-cleanup-interval`                 | Minimum duration between cleanup runs (ISO-8601 duration)                                       | PT1M       |
| `max-history-cleanup-interval`                 | Maximum duration between cleanup runs (ISO-8601 duration)                                       | PT60M      |
| `max-history-cleanup-usage`                    | Maximum percentage of usage time the history cleanup is allowed to use (values between 0 and 1) | 0.25 (25%) |
| `history-cleanup-process-instance-batch-size`  | Number of process instances to be cleaned per cleanup run                                       | 500        |
| `history-cleanup-batch-size`                   | Number of rows to be cleaned per cleanup run in each table                                      | 10000      |
| `usage-metrics-ttl`                            | TTL for usage metrics                                                                           | P730D      |
| `usage-metrics-cleanup`                        | Interval between usage metrics cleanup runs (ISO-8601 duration)                                 | PT24H      |

## Exporter cache configuration

| Property name                    | Description                                                      | Default |
| -------------------------------- | ---------------------------------------------------------------- | ------- |
| `process-cache.max-size`         | Maximum number of process definitions held in the exporter cache | 1000    |
| `batch-operation-cache.max-size` | Maximum number of cached batch operations                        | 1000    |

## Multi-region support

Multi-region support for RDBMS uses the asynchronous replication feature of the underlying database and is highly
dependent on the database vendor. While most multi-region replication is performed by the database itself, Camunda
provides additional features to enhance automatic recovery in the event of a failure.

Asynchronous replicated databases are synchronized with a delay, meaning that after a failover, the new primary database
may not contain all the data written to the old primary database. This can lead to data loss in secondary storage. While
this data can be reproduced by replaying past records from the Zeebe log stream, the relevant segments and records must still
be present on all brokers. Zeebe's logstream segments are usually compacted as soon as all exporters have acknowledged the
records.

Camunda supports different strategies to handle this situation and preventing Zeebe log stream segments from being
compacted prematurely.
The following strategies are supported:

- **LSN replication monitoring:** dynamic monitoring of the replication lag based on the database LSN. This is the most
  preferred strategy and should be used whenever possible with the used database vendor.
- **Delay backoff replication monitoring:** Adds a static delay to the acknowledgement of records to the broker.

:::note
Deferring the logstream compaction with either strategy may drastically increase the disk space usage of the logstream.
It is recommended to monitor the disk space usage and adjust the disk size or delay limit accordingly.
:::

### LSN replication monitoring

The exporter monitors the replication lag to the secondary databases based on the Log Sequence Number (LSN) of the last
exported record. Only when an RDBMS redo log segment is replicated to a minimum quorum of secondary databases, the
exporter will acknowledge the records in the logstream.

```yaml
camunda.data.secondary-storage.rdbms.async-replication.enabled: true
camunda.data.secondary-storage.rdbms.async-replication.type: LOG_SEQ
camunda.data.secondary-storage.rdbms.async-replication.min-sync-replicas: 2
```

| Property name                                 | Description                                                                   | Default |
| --------------------------------------------- | ----------------------------------------------------------------------------- | ------- |
| `async-replication.enabled`                   | If the async replication monitoring should be enabled                         | false   |
| `async-replication.min-sync-replicas`         | The minimum number of replicas in sync                                        | 1       |
| `async-replication.polling-interval`          | The interval in which to check the replicas                                   | PT15S   |
| `async-replication.max-lag`                   | The max tolerated lag of a replication (ISO-8601 duration)                    | PT15M   |
| `async-replication.pause-on-max-lag-exceeded` | If the exporter should pause exporting when the maximum lag limit is exceeded | false   |

#### Vendor support

The following databases are supported for LSN replication monitoring:

- Aurora Global Database with PostgreSQL
- Aurora Global Database with MySQL
- MSSQL
- PostgreSQL

To use the LSN replication monitoring with PostgreSQL, the database user must have the following additional privileges:

- `PG_MONITOR` role

```sql
GRANT PG_MONITOR TO <user>;
```

To use the LSN replication monitoring with MSSQL, the database user must have the following additional privileges:

- `VIEW SERVER STATE` role on SQL Server 2019 and earlier versions

  ```sql
  GRANT VIEW SERVER STATE TO <user>;
  ```

- `VIEW SERVER PERFORMANCE STATE` role on SQL Server 2022 and newer versions

  ```sql
  GRANT VIEW SERVER PERFORMANCE STATE TO <user>;
  ```

### Delay backoff replication monitoring

The exporter always waits for a configured amount of time until an exported record is acknowledged to the broker as exported. This is supported for all databases.

This is a fallback strategy for databases that do not support any other direct replication monitoring — prefer [LSN replication monitoring](#lsn-replication-monitoring) whenever your database vendor supports it. Delay backoff does not
directly monitor any replication state, but instead adds a static delay to the acknowledgement of records to the broker.
This can be used as a safety net to ensure that the Zeebe logstream segments are not compacted too early, even if the database
replication is not fully in sync. This strategy requires external monitoring of the actual replication lag to ensure
that the configured delay is sufficient for the database replication to catch up in case of a failover.

:::warning
The disk space used by the logstream is heavily influenced by the `delay` parameter: records accumulate on disk for the entire delay interval before they can be compacted. Size the persistent volume to hold all records produced during that interval. If the volume is too small, Zeebe runs out of disk space and stops processing.
:::

```yaml
camunda.data.secondary-storage.rdbms.async-replication.enabled: true
camunda.data.secondary-storage.rdbms.async-replication.type: DELAY
```

| Property name                           | Description                                                                       | Default |
| --------------------------------------- | --------------------------------------------------------------------------------- | ------- |
| `async-replication.enabled`             | If the async replication monitoring should be enabled                             | false   |
| `async-replication.delay`               | The delay to wait until a flushed record is acknowledged to the broker            | --      |
| `async-replication.queue-capacity`      | Size of the internal queue of record positions to acknowledge                     | 8192    |
| `async-replication.queue-debounce-time` | A debounce time to not add every record to the queue but only one every X seconds | PT5S    |

## Usage with AWS Aurora PostgreSQL

Camunda supports **PostgreSQL** as a secondary storage backend. AWS Aurora PostgreSQL is a PostgreSQL-compatible managed service and works when configured like a standard PostgreSQL database.

In addition to the standard PostgreSQL JDBC driver, you can use the **AWS Advanced JDBC Wrapper** to take advantage of Aurora-specific features such as improved failover handling and IAM-based authentication.

To use the AWS JDBC wrapper, configure the JDBC URL as follows:

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:aws-wrapper:postgresql://aurora-host:5432/camunda
        username: camunda
        password: camunda
```

The AWS JDBC wrapper supports standard username/password authentication as well as IAM-based authentication.

To use IAM authentication, enable the corresponding wrapper plugin and configure a database user without a password that has the required IAM permissions:

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:aws-wrapper:postgresql://aurora-host:5432/camunda?wrapperPlugins=iam
        username: camunda
```

The AWS JDBC wrapper JAR is shipped with the Camunda distribution alongside most of the other JDBC drivers. There is no need to provide it separately.

### Per-physical-tenant credentials on Aurora

When using [physical tenants](/self-managed/concepts/physical-tenants/index.md), each tenant can connect to Aurora with its own database user. Database-level permissions (schema grants, row-level security) are administered entirely in PostgreSQL, so tenant isolation is enforced by the database rather than by the application.

For standard username/password authentication, override the connection settings per tenant:

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:aws-wrapper:postgresql://aurora-host:5432/camunda?currentSchema=default_schema
        username: camunda
        password: camunda
  physical-tenants:
    tenanta:
      data:
        secondary-storage:
          rdbms:
            url: jdbc:aws-wrapper:postgresql://aurora-host:5432/camunda?currentSchema=tenant_a_schema
            username: tenant_a_user
            password: tenant-a-secret
```

For IAM authentication, the same pattern applies with the `iam` wrapper plugin and passwordless database users:

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:aws-wrapper:postgresql://aurora-host:5432/camunda?wrapperPlugins=iam&currentSchema=default_schema
        username: camunda
  physical-tenants:
    tenanta:
      data:
        secondary-storage:
          rdbms:
            url: jdbc:aws-wrapper:postgresql://aurora-host:5432/camunda?wrapperPlugins=iam&currentSchema=tenant_a_schema
            username: tenant_a_user
```

With IAM authentication, the wrapper driver generates short-lived authentication tokens using the application's AWS identity (for example, the pod's IAM role when running on EKS with IRSA). The IAM permission `rds-db:connect` is granted **per database user**, so the single application identity is granted access to exactly the tenant database users it should reach — one AWS identity, many tenant-scoped database users.
