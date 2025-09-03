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

## Compatibility

The migrator supports the following SQL databases:

| Database       | Version | JDBC Driver                | Notes                      |
| -------------- | ------- | -------------------------- | -------------------------- |
| **H2**         | 2.3.232 | `org.h2.Driver`            | Default, good for testing  |
| **PostgreSQL** | 17      | `org.postgresql.Driver`    | Recommended for production |
| **Oracle**     | 23ai    | `oracle.jdbc.OracleDriver` | Recommended for production |

The migrator supports migration only within the same database vendor:

| Migration Path          | Status           |
| ----------------------- | ---------------- |
| PostgreSQL → PostgreSQL | ✅ Supported     |
| Oracle → Oracle         | ✅ Supported     |
| H2 → H2                 | ✅ Supported     |
| PostgreSQL → Oracle     | ❌ Not supported |
| Oracle → PostgreSQL     | ❌ Not supported |
