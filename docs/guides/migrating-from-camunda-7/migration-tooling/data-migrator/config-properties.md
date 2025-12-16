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
Read more about Camunda Client [configuration options](/apis-tools/camunda-spring-boot-starter/configuration.md).
:::

| Property        | Type     | Description                                                                                         |
| :-------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| `.mode`         | `string` | Operation mode of the Camunda 8 client. Options: `self-managed` or `cloud`. Default: `self-managed` |
| `.grpc-address` | `string` | The gRPC API endpoint for Camunda 8 Platform. Default: `http://localhost:26500`                     |
| `.rest-address` | `string` | The REST API endpoint for Camunda 8 Platform. Default: `http://localhost:8088`                      |

## `camunda.migrator`

Prefix: `camunda.migrator`

| Property               | Type      | Description                                                                                                                                                                                                                                                                                                               |
| :--------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.page-size`           | `number`  | Number of records to process in each page. Default: `100`                                                                                                                                                                                                                                                                 |
| `.job-type`            | `string`  | Job type for actual job activation. Default: `migrator`.                                                                                                                                                                                                                                                                  |
| `.validation-job-type` | `string`  | Job type for validation purposes. Optional: falls back to `job-type` if not defined. Set to `DISABLED` to disable job type execution listener validation entirely.                                                                                                                                                        |
| `.auto-ddl`            | `boolean` | Automatically create/update migrator database schema. Default: `false`                                                                                                                                                                                                                                                    |
| `.table-prefix`        | `string`  | Optional prefix for migrator database tables. Default: _(empty)_                                                                                                                                                                                                                                                          |
| `.data-source`         | `string`  | Choose if the migrator schema is created in the `C7` or `C8` data source. **Should not be changed during migration**, as it can lead to duplicate data migration. Default: `C7`                                                                                                                                           |
| `.tenantIds`           | `string`  | Comma-separated list of tenant ids for which process instances should be migrated during runtime migration. For more information: [Tenant in Runtime](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/runtime.md#tenants) Default: _(empty)_ (migrate only process instances without assigned tenant id) |
| `.database-vendor`     | `string`  | Database vendor for migrator schema. Options: `h2`, `postgresql`, `oracle`. Default: Automatically detected.                                                                                                                                                                                                              |
| `.interceptors`        | `array`   | List of variable interceptors (built-in and custom) to configure during migration.                                                                                                                                                                                                                                        |
| `.save-skip-reason`    | `boolean` | Whether to persist skip reasons for entities that could not be migrated. Required when using the Cockpit plugin. Default: `false`.                                                                                                                                                                                        |

## `camunda.migrator.interceptors.[n]`

Prefix: `camunda.migrator.interceptors.[n]`

There are two types of interceptors: **VariableInterceptors** for [Runtime migration](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/variables.md#transformation)
and **EntityInterceptors** for [History migration](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/history.md#entity-transformation).
The configuration is the same for both types.

| Property     | Type      | Description                                                                                                                                   |
| :----------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `class-name` | `string`  | **Required.** Fully qualified class name of the interceptor (built-in or custom).                                                             |
| `enabled`    | `boolean` | Whether the interceptor is enabled. Default: `true` for all interceptors.                                                                     |
| `properties` | `map`     | Custom properties (key:value pairs) to configure the interceptor. Properties call setter methods on the interceptor class and pass the value. |

### Built-in interceptors

The following built-in interceptors are available and can be disabled:

**Validators (reject unsupported types):**

- `io.camunda.migration.data.impl.interceptor.ByteArrayVariableValidator`
- `io.camunda.migration.data.impl.interceptor.FileVariableValidator`
- `io.camunda.migration.data.impl.interceptor.ObjectJavaVariableValidator`

**Transformers (convert supported types):**

- `io.camunda.migration.data.impl.interceptor.PrimitiveVariableTransformer`
- `io.camunda.migration.data.impl.interceptor.NullVariableTransformer`
- `io.camunda.migration.data.impl.interceptor.DateVariableTransformer`
- `io.camunda.migration.data.impl.interceptor.ObjectJsonVariableTransformer`
- `io.camunda.migration.data.impl.interceptor.ObjectXmlVariableTransformer`
- `io.camunda.migration.data.impl.interceptor.SpinJsonVariableTransformer`
- `io.camunda.migration.data.impl.interceptor.SpinXmlVariableTransformer`

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

| Property          | Type     | Description                                                                                                                                                  |
| :---------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.deployment-dir` | `string` | Define directory which resources like BPMN processes are automatically deployed to C8. In case multi-tenancy is enabled, please perform a manual deployment. |

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
| `.database-vendor`   | `string`  | Database vendor for Camunda 8 schema. Options: `h2`, `postgresql`, `oracle`. Default: Automatically detected.                                             |
| `.*`                 |           | You can apply all [`HikariConfig` properties](https://github.com/brettwooldridge/HikariCP?tab=readme-ov-file#gear-configuration-knobs-baby). For example: |
| `.jdbc-url`          | `string`  | JDBC connection URL for the target Camunda 8 RDBMS database. Default: `jdbc:h2:mem:migrator`                                                              |
| `.username`          | `string`  | Username for Camunda 8 database connection. Default: `sa`                                                                                                 |
| `.password`          | `string`  | Password for Camunda 8 database connection. Default: `sa`                                                                                                 |
| `.driver-class-name` | `string`  | JDBC driver class for Camunda 8 database. Default: `org.h2.Driver`                                                                                        |

## `logging`

Prefix: `logging`

| Property                           | Type     | Description                                                                                                           |
| :--------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------- |
| `.level.root`                      | `string` | Root logger level. Default: `INFO`                                                                                    |
| `.level.io.camunda.migration.data` | `string` | Migrator logging level. Default: `INFO`                                                                               |
| `.file.name`                       | `string` | Log file location. Set to: `logs/camunda-7-to-8-data-migrator.log`. If not specified, logs are output to the console. |
