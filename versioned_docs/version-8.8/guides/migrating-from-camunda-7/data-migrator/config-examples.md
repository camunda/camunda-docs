---
id: config-examples
title: Configuration examples
sidebar_label: Configuration examples
description: "Configuration examples for the Data Migrator."
---

Configuration examples for the Data Migrator's `configuration/application.yml`.

## Camunda 8 Client

```yaml
camunda.client:
  mode: self-managed # Operation mode: 'self-managed' or 'cloud'
  grpc-address: http://localhost:26500 # The gRPC API endpoint
  rest-address: http://localhost:8088 # The REST API endpoint
```

## Data Migrator

```yaml
camunda.migrator:
  page-size: 500 # Number of records to process in each page
  job-type: migrator # Job type for actual job activation (used for validation and activation unless validation-job-type is defined)
  validation-job-type: '=if legacyId != null then "migrator" else "noop"' # Job type for validation (optional - falls back to job-type if not defined)
  auto-ddl: true # Automatically create/update database schema
  table-prefix: MY_PREFIX_ # Optional table prefix for migrator schema
  data-source: C7 # Choose if the migrator schema is created on the data source of 'C7' or 'C8'
  interceptors:
    - class-name: com.example.MyCustomInterceptor # Custom interceptor class
    - class-name: com.example.AnotherInterceptor # Another custom interceptor class
```

## Datasource

Configure the Camunda 7 and Camunda 8 datasources. You can use the same or different databases for Camunda 7 and Camunda 8.

### Camunda 7 (runtime and history)

```yaml
camunda.migrator.c7.data-source:
  table-prefix: MY_PREFIX_ # Optional prefix for Camunda 7 database tables
  auto-ddl: true # Automatically create/update Camunda 7 database schema
  jdbc-url: jdbc:h2:./h2/data-migrator-source.db
  username: sa # Database username
  password: sa # Database password
  driver-class-name: org.h2.Driver
```

You can apply any HikariCP property (for example, pool size) under `camunda.migrator.c7.data-source`.

### Camunda 8 RDBMS (history)

```yaml
camunda.migrator.c8.data-source:
  table-prefix: MY_PREFIX_ # Optional prefix for Camunda 8 RDBMS database tables
  auto-ddl: true # Automatically create/update Camunda 8 RDBMS database schema
  jdbc-url: jdbc:h2:./h2/data-migrator-target.db
  username: sa # Database username
  password: sa # Database password
  driver-class-name: org.h2.Driver
```

You can apply any HikariCP property (for example, pool size) under `camunda.migrator.c8.data-source`.

## Logging

```yaml
logging:
  level:
    root: INFO # Root logger level
    io.camunda.migration.data: INFO # Migrator logging
    io.camunda.migration.data.RuntimeMigrator: DEBUG # Runtime migration logging
    io.camunda.migration.data.persistence.IdKeyMapper: DEBUG # ID mapping logging
  file:
    name: logs/camunda-7-to-8-data-migrator.log
```
