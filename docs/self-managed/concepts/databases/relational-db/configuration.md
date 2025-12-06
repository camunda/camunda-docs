---
id: database-configuration
title: "Configuration"
---

## Installation

To enable Camunda to use a relational database, two main configuration steps are required:

1. Add the RDBMS [Exporter](./../../exporters.md) to the Zeebe broker configuration.
2. Enable the RDBMS as primary database
   for [Camunda REST API](./../../../../apis-tools/camunda-api-rest/camunda-api-rest-overview)
3. Configure the database connection. This is done by configuring the Spring datasource.

```yaml
# enable the exporter
zeebe:
  broker:
    exporters:
      rdbms:
        className: io.camunda.exporter.rdbms.RdbmsExporter

# set the RDBMS as primary database for Camunda REST API
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql:camunda # example for a local PostgreSQL database with schema "camunda"
        username: camunda
        password: camunda
```

The RDBMS [Exporter](./../../exporters.md) configuration can be enabled in addition to
other [Exporter](./../../exporters.md) as well. Note, that adding more exporters, can slow down the cluster.

#### DB Schema management

By default, Camunda will automatically create and update the database schema on startup. For this it uses the
tool [Liquibase](https://www.liquibase.com/). In addition to the Camunda core tables, Liquibase will create the two
tables `DATABASECHANGELOG` and `DATABASECHANGELOGLOCK`. These tables must not be changed or updated.

If the target database schema is not empty, it sometimes can be useful to define a prefix for the Camunda tables. This
can be done by setting the following property in the configuration:

```yaml
camunda.data.secondary-storage.rdbms.prefix: c8_
```

To disable the automatic schema management, set the following property in the configuration:

```yaml
camunda.data.secondary-storage.rdbms.auto-ddl: false
```

Native SQL scripts for all supported databases can be found in the Camunda distribution (TODO:LINK). These scripts can
be used to create the schema manually.

### Database privileges

To use Camunda with the RDBMS, the configured database user must have the following privileges on the all Camunda
tables (the actual privilege names might depend on the database vendor):

- SELECT
- INSERT
- UPDATE
- DELETE

Optionally, to enable the automatic schema management by Camunda and [Liquibase](https://www.liquibase.com/), the
additional privileges must have been granted before the first start of any Camunda instance:

- CREATE
- ALTER
- DROP

Optionally, to enable the PURGE (TODO: Link) feature of the RDBMS Exporter, the following privilege must be granted to
the camunda database user on all Camunda tables:

- TRUNCATE

## History cleanup

The RDBMS Exporter supports automatic history cleanup. This is implemented in two parts:

When a process instance is finished (completed or terminated), all related data is marked for deletion after a
configurable time-to-live (rdbms exporter configuration `default-history-ttl`).

In addition to that, a periodic cleanup job is executed to delete all marked data. But to not overload the database, not
all marked data is deleted in one run. Instead, the cleanup job deletes a configurable amount of data (rdbms exporter
configuration `history-cleanup-batch-size`) in each run.
The interval between two cleanup runs can be configured with the `min-history-cleanup-interval`
and `max-history-cleanup-interval` properties (both ISO-8601
duration). The cleanup scheduler will dynamically determine the duration until the next cleanup run depending on the
amount of deleted
data.

- When no data is deleted at all, the scheduler will double the duration until the next cleanup run up to the
  configured `max-history-cleanup-interval`.
- When the amount of deleted data at the configured `history-cleanup-batch-size` limit, the scheduler will half the
  duration until the next cleanup run to the configured `min-history-cleanup-interval`.
- Otherwise, the duration until the next cleanup run will stay the same.

## Configuration

### Database driver

The Camunda docker images ship the required database drivers for all the supported databases, except for Oracle and MySQL. If one of these is the preferred database, the driver must be added during the deployment by mounting it into the container. The Docker image provides a `/driver-lib` mount point for this purpose.

Please note that the driver must be placed directly in the **directory that is mounted, not in a subdirectory**.

```yaml
services:
  camunda:
    image: camunda/camunda:<tag>
    ports:
      - "8080:8080"
      - "26500:26500"
      - "9600:9600"
    environment:
      # environment configuration
    volumes:
      - <local-path>/driver-lib:/driver-lib
```

### Database configuration

Camunda RDBMS database configuration reference:

| Property name                                           | Description                                                                                                                                                                                      | Default setting |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| camunda.data.secondary-storage.rdbms.url                | The JDBC connection url of the database                                                                                                                                                          | _empty_         |
| camunda.data.secondary-storage.rdbms.user               | The username for the database connection                                                                                                                                                         | _empty_         |
| camunda.data.secondary-storage.rdbms.password           | The password for the database connection                                                                                                                                                         | _empty_         |
| camunda.data.secondary-storage.rdbms.auto-ddl           | If the Liquibase schemamanagement should be used or not. If not, the DBA has to install the schema from available [scripts](#db-schema-management)                                               | true            |
| camunda.data.secondary-storage.rdbms.prefix             | A custom prefix for all camunda related database objects.                                                                                                                                        | '' (empty)      |
| camunda.data.secondary-storage.rdbms.database-vendor-id | Camunda uses vendor auto-detection vendor specific functions. With this property this auto-detection can be overridden. Possible values: _h2_, _mariadb_, _oracle_, _postgres_, _mysql_, _mssql_ | _empty_         |

#### Advanced database connection pool configuration

By default, Camunda uses Hikari connection pool to manage database connections. This connection pool can be configured with the following additional properties:

| Property name                                                           | Description                                                                                                          | Default setting |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- |
| camunda.data.secondary-storage.rdbms.connection-pool.maximum-pool-size  | The maximum number of simultaneous connections                                                                       | 10              |
| camunda.data.secondary-storage.rdbms.connection-pool.minimum-idle       | The minimum number of idle connections                                                                               | 10              |
| camunda.data.secondary-storage.rdbms.connection-pool.idle-timeout       | The timeout (ms) until an idle connection is closed                                                                  | 600000          |
| camunda.data.secondary-storage.rdbms.connection-pool.max-lifetime       | The maximum lifetime (ms) of a connection in the pool after which it will be closed and replaced by a new connection | 1800000         |
| camunda.data.secondary-storage.rdbms.connection-pool.connection-timeout | The maximum time (ms) the application is waiting for a connection from the pool                                      | 30000           |

### Exporter Configuration

The RDBMS Exporter is automatically enabled when configuring `camunda.data.secondary-storage.type=rdbms`.

The following additional configuration options are available with the prefix `camunda.data.secondary-storage.rdbms`:

| Property name                                        | Description                                                                                                           | Default setting |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------- |
| flush-interval                                       | The maximum time an exported record waits in the flush queue before being flushed and committed to the database       | PT0.5S          |
| max-queue-size                                       | The maximum number of records that can be added to the flush queue before being flushed and committed to the database | 1000            |
| queue-memory-limit                                   | The maximum number of records that can be added to the flush queue before being flushed and committed to the database | 20              |
|                                                      | **History cleanup configuration**                                                                                     |                 |
| history.default-history-ttl                          | The duration a finished processInstance and its related data is kept in the database (ISO-8601 duration)              | P30D            |
| history.default-batch-operation-ttl                  | The duration a finished batch operation and its related data is kept in the database (ISO-8601 duration)              | P5D             |
| history.batch-operation-cancel-process-instance-ttl  | The duration a finished batch operation to cancel process instances (ISO-8601 duration)                               | P5D             |
| history.batch-operation-migrate-process-instance-ttl | The duration a finished batch operation to cancel process instances (ISO-8601 duration)                               | P5D             |
| history.batch-operation-modify-process-instance-ttl  | The duration a finished batch operation to cancel process instances (ISO-8601 duration)                               | P5D             |
| history.batch-operation-resolve-incident-ttl         | The duration a finished batch operation to cancel process instances (ISO-8601 duration)                               | P5D             |
| history.historyCleanupBatchSize                      | Maximum amount of deleted entries per cleanup run                                                                     | 1000            |
| history.minHistoryCleanupInterval                    | The minimal duration between two history cleanup runs (ISO-8601 duration)                                             | PT1M            |
| history.maxHistoryCleanupInterval                    | The maximal duration between two history cleanup runs (ISO-8601 duration)                                             | PT60M           |
| history.usage-metrics-ttl                            | The duration usage metrics will be kept in the database (ISO-8601 duration)                                           | P730D           |
| history.usage-metrics-cleanup                        | The interval between two cleanup intervals for usage metrics (ISO-8601 duration)                                      | PT24H           |
|                                                      | **Exporter cache configuration**                                                                                      |                 |
| process-cache.max-size                               | The maximum number of process definitions kept in the internal exporter cache                                         | 1000            |
| batch-operation-cache.max-size                       | The maximum number of batch operations kept in the internal exporter cache                                            | 1000            |
