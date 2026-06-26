---
id: database
title: Database
sidebar_label: Database
description: "Database configuration for the Data Migrator."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Database configuration is required for both Camunda 7 and Camunda 8 (RDBMS history) data sources. The Data Migrator uses JDBC to connect to these databases.

## Setup

1. Download the JDBC driver JAR for your database and drop it into `configuration/userlib`. The H2 driver is bundled for development and testing; all other database drivers must be provided by you.
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
| ------------------------ | -------------- | ---------------------------------------------- | -------------------------- |
| **PostgreSQL**           | 15, 16, 17, 18 | `org.postgresql.Driver`                        | Recommended for production |
| **Oracle**               | 19c, 23ai      | `oracle.jdbc.OracleDriver`                     | Recommended for production |
| **Microsoft SQL Server** | 2022           | `com.microsoft.sqlserver.jdbc.SQLServerDriver` | Recommended for production |
| **MariaDB**              | 11.8           | `org.mariadb.jdbc.Driver`                      | Recommended for production |

:::note
JDBC drivers are not bundled with the Data Migrator distribution (except H2, which is included for development and testing). Download the driver JAR for your database vendor and drop it into `configuration/userlib` before starting the migrator.
:::

The migrator supports migration only within the same database vendor:

| Migration Path          | Status           |
| ----------------------- | ---------------- |
| PostgreSQL → PostgreSQL | ✅ Supported     |
| PostgreSQL → Oracle     | ❌ Not supported |

## Dropping the migration mapping schema

The migrator uses the `{prefix}MIGRATION_MAPPING` table to keep track of instances.

To drop this table after the migration is complete, use `--drop-schema` when starting the migrator. This will drop the migration mapping schema on shutdown if the migration was successful (no entities were skipped):

<Tabs groupId="os" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' }
]}>

<TabItem value="maclinux">

```bash
# Migrate and drop the migration mapping schema on shutdown if migration was successful
./start.sh --runtime --drop-schema
```

To drop the table regardless of the migration status, use `--force` in combination with `--drop-schema`. This will perform the drop in all cases:

```bash
# Migrate and force drop the migration mapping schema on shutdown
./start.sh --runtime --drop-schema --force
```

</TabItem>

<TabItem value="windows">

```bash
# Migrate and drop the migration mapping schema on shutdown if migration was successful
start.bat --runtime --drop-schema
```

To drop the table regardless of the migration status, use `--force` in combination with `--drop-schema`. This will perform the drop in all cases:

```bash
# Migrate and force drop the migration mapping schema on shutdown
start.bat --runtime --drop-schema --force
```

</TabItem>

</Tabs>

:::warning
Using `--force` can lead to data loss. Use with caution.
:::
