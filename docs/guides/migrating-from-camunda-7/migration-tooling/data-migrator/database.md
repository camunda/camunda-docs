---
id: database
title: Database
sidebar_label: Database
description: "Database configuration for the Data Migrator."
---

Database configuration is required for both Camunda 7 and Camunda 8 (RDBMS history) data sources. The Data Migrator uses JDBC to connect to these databases.

## Setup

1. Include the appropriate JDBC driver in the classpath by dropping the JAR into `configuration/userlib`.
2. Configure connection details in `configuration/application.yml`.
3. Set table prefixes if your installation uses them.
4. Verify connectivity before starting migration.
5. Ensure sufficient disk space for migration data.

:::info
The database vendor is automatically detected but can be overridden using the `database-vendor` property.
:::

## Transaction isolation level

The required isolation level to run the Data Migrator with is `READ COMMITTED`.
Other transaction isolation levels are not supported and might lead to unexpected behavior.

## History migration atomicity

Read more about [history migration atomicity](../data-migrator/history.md#atomicity).

## Compatibility

The migrator supports the following SQL databases:

| Database                 | Version        | JDBC Driver                                    | Notes                      |
|--------------------------|----------------|------------------------------------------------|----------------------------|
| **H2**                   | 2.3.232        | `org.h2.Driver`                                | Default, good for testing  |
| **PostgreSQL**           | 15, 16, 17, 18 | `org.postgresql.Driver`                        | Recommended for production |
| **Oracle**               | 19c, 23ai      | `oracle.jdbc.OracleDriver`                     | Recommended for production |
| **Microsoft SQL Server** | 2022           | `com.microsoft.sqlserver.jdbc.SQLServerDriver` | Recommended for production |
| **MySQL**                | 8.0            | `com.mysql.cj.jdbc.Driver`                     | Recommended for production |
| **MariaDB**              | 10.6, 11.8     | `org.mariadb.jdbc.Driver`                      | Recommended for production |

The migrator supports migration only within the same database vendor:

| Migration Path          | Status           |
| ----------------------- | ---------------- |
| PostgreSQL → PostgreSQL | ✅ Supported     |
| PostgreSQL → Oracle     | ❌ Not supported |

## Dropping the migration mapping schema

The migrator uses the `{prefix}MIGRATION_MAPPING` table to keep track of instances.

To drop this table after the migration is complete, use `--drop-schema` when starting the migrator. This will drop the migration mapping schema on shutdown if the migration was successful (no entities were skipped):

```bash
# Migrate and drop the migration mapping schema on shutdown if migration was successful
./start.sh --runtime --drop-schema
```

To drop the table regardless of the migration status, use `--force` in combination with `--drop-schema`. This will perform the drop in all cases:

```bash
# Migrate and force drop the migration mapping schema on shutdown
./start.sh --runtime --drop-schema --force
```

:::warning
Using `--force` can lead to data loss. Use with caution.
:::
