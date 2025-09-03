---
id: config-properties
title: Configuration property reference
sidebar_label: Property reference
description: "Data Migrator property reference."
---

Reference for all Data Migrator configuration properties, set in the `configuration/application.yml` file.

## `camunda.client`

Prefix: `camunda.client`

:::info
Read more about Camunda Client [configuration options](/apis-tools/spring-zeebe-sdk/configuration.md).
:::

| Property        | Type     | Description                                                                                         |
| :-------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| `.mode`         | `string` | Operation mode of the Camunda 8 client. Options: `self-managed` or `cloud`. Default: `self-managed` |
| `.grpc-address` | `string` | The gRPC API endpoint for Camunda 8 Platform. Default: `http://localhost:26500`                     |
| `.rest-address` | `string` | The REST API endpoint for Camunda 8 Platform. Default: `http://localhost:8088`                      |

## `camunda.migrator`

Prefix: `camunda.migrator`

| Property               | Type      | Description                                                                                                                                                        |
| :--------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.page-size`           | `number`  | Number of records to process in each page. Default: `100`                                                                                                          |
| `.job-type`            | `string`  | Job type for actual job activation. Default: `migrator`.                                                                                                           |
| `.validation-job-type` | `string`  | Job type for validation purposes. Optional: falls back to `job-type` if not defined. Set to `DISABLED` to disable job type execution listener validation entirely. |
| `.auto-ddl`            | `boolean` | Automatically create/update migrator database schema. Default: `false`                                                                                             |
| `.table-prefix`        | `string`  | Optional prefix for migrator database tables. Default: _(empty)_                                                                                                   |
| `.data-source`         | `string`  | Choose if the migrator schema is created in the `C7` or `C8` data source. Default: `C7`                                                                            |
| `.database-vendor`     | `string`  | Database vendor for migrator schema. Options: `h2`, `postgresql`, `oracle`. Default: Automatically detected.                                                       |
| `.interceptors`        | `array`   | List of custom variable interceptors to apply during migration. Each interceptor must implement the `VariableInterceptor` interface.                               |

## `camunda.migrator.c7.data-source`

Prefix: `camunda.migrator.c7.data-source`

| Property             | Type      | Description                                                                                                                                  |
| :------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `.table-prefix`      | `string`  | Optional prefix for Camunda 7 database tables. Default: _(empty)_                                                                            |
| `.auto-ddl`          | `boolean` | Automatically create/update Camunda 7 database schema. Default: `false`                                                                      |
| `.database-vendor`   | `string`  | The database vendor is automatically detected and can currently not be overridden.                                                           |
| `.*`                 |           | You can apply all [`HikariConfig` properties](https://github.com/brettwooldridge/HikariCP?tab=readme-ov-file#gear-configuration-knobs-baby). |
| `.jdbc-url`          | `string`  | JDBC connection URL for the source Camunda 7 database. Default: `jdbc:h2:mem:migrator`                                                       |
| `.username`          | `string`  | Username for Camunda 7 database connection. Default: `sa`                                                                                    |
| `.password`          | `string`  | Password for Camunda 7 database connection. Default: `sa`                                                                                    |
| `.driver-class-name` | `string`  | JDBC driver class for Camunda 7 database. Default: `org.h2.Driver`                                                                           |

## `camunda.migrator.c8`

Prefix: `camunda.migrator.c8`

| Property          | Type     | Description                                                                            |
| :---------------- | :------- | :------------------------------------------------------------------------------------- |
| `.deployment-dir` | `string` | Define directory which resources like BPMN processes are automatically deployed to C8. |

## `camunda.migrator.c8.data-source`

Prefix: `camunda.migrator.c8.data-source`

If the `c8.data-source` configuration is absent, the RDBMS history data migrator is disabled.

:::info
**Heads-up:** History Data Migrator is experimental.
:::

| Property             | Type      | Description                                                                                                                                               |
| :------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.table-prefix`      | `string`  | Optional prefix for Camunda 8 RDBMS database tables. Default: _(empty)_                                                                                   |
| `.auto-ddl`          | `boolean` | Automatically create/update Camunda 8 RDBMS database schema. Default: `false`                                                                             |
| `.database-vendor`   | `string`  | Database vendor for C8 schema. Options: `h2`, `postgresql`, `oracle`. Default: Automatically detected.                                                    |
| `.*`                 |           | You can apply all [`HikariConfig` properties](https://github.com/brettwooldridge/HikariCP?tab=readme-ov-file#gear-configuration-knobs-baby). For example: |
| `.jdbc-url`          | `string`  | JDBC connection URL for the target Camunda 8 RDBMS database. Default: `jdbc:h2:mem:migrator`                                                              |
| `.username`          | `string`  | Username for Camunda 8 database connection. Default: `sa`                                                                                                 |
| `.password`          | `string`  | Password for Camunda 8 database connection. Default: `sa`                                                                                                 |
| `.driver-class-name` | `string`  | JDBC driver class for Camunda 8 database. Default: `org.h2.Driver`                                                                                        |

## `logging`

Prefix: `logging`

| Property                     | Type     | Description                                                                                                           |
| :--------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------- |
| `.level.root`                | `string` | Root logger level. Default: `INFO`                                                                                    |
| `.level.io.camunda.migrator` | `string` | Migrator logging level. Default: `INFO`                                                                               |
| `.file.name`                 | `string` | Log file location. Set to: `logs/camunda-7-to-8-data-migrator.log`. If not specified, logs are output to the console. |
