---
id: access-sql-liquibase-scripts
title: Access SQL and Liquibase scripts
description: Learn where to obtain Camunda 8 SQL and Liquibase scripts, how to download them, and how to use them safely for provisioning and upgrades.
---

Access and safely use the SQL and Liquibase scripts provided with Camunda 8 for supported databases. These scripts can be used for provisioning, upgrading, or managing database schemas in your environment.

## Where the scripts are published

The scripts are included in the **Camunda 8 Run distribution** and in each **Camunda GitHub release** as a versioned ZIP file:

- **GitHub release example:** [Camunda 8.9.0-alpha1](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha1)
- **C8Run distribution:** top-level folder `rdbms-schema/`

## Distribution & ZIP contents

The ZIP contains SQL scripts and Liquibase change sets for all supported databases:

```
/ -
| liquibase
  - changelog-master.xml
  | changesets
    - 8.9.0.xml
    - 8.10.0.xml
| sql
  | create
    | h2
      - h2_create_8.9.0.sql
    | mariadb
      - mariadb_create_8.9.0.sql
    | mssql
      - mssql_create_8.9.0.sql
    | mysql
      - mysql_create_8.9.0.sql
    | oracle
      - oracle_create_8.9.0.sql
    | postgresql
      - postgres_create_8.9.0.sql
  | upgrade
    | h2
      - h2_upgrade_8.9.0_to_8.10.0.sql
    ...
```

:::note
Drop scripts are not provided.
:::

## How to download

- **From a GitHub release (ZIP):** Download the schema scripts from `https://github.com/camunda/camunda/releases/tag/<release version>/camunda-db-rdbms-schema-<release version>.zip`.
- **From a C8Run distribution:** Retrieve the schema scripts from the `rdbms-schema/` folder included in the distribution.

## Usage guidance

- **Version matching:** Always use scripts corresponding to your Camunda 8 version.
- **Database selection:** Use the folder for your target database flavor (PostgreSQL, Oracle, MariaDB, etc.).
- **Automatic schema management:** Camunda will manage the schema by default. Manual management requires disabling auto-DDL:

```yaml
camunda:
  data:
    secondary-storage:
      rdbms:
        auto-ddl: false
```

- **SQL vs. Liquibase**
  - Do not mix SQL upgrade scripts with Liquibase-managed schema.
  - Liquibase changelogs are **forward-only**. Rollbacks are not supported.
- **Backup first:** Always [back up](/self-managed/operational-guides/backup-restore/backup-and-restore.md) your database before applying scripts manually.

## Optional

- **Checksums:** SHA1 or SHA256 checksums are provided in GitHub release assets.
- **Liquibase CLI example:** See [Liquibase getting started](https://www.liquibase.org/get-started/running-your-first-update).
- **Upgrade workflow:** Recommended approach is to allow Camunda to manage the schema automatically. Manual upgrades are supported, but users must apply scripts sequentially from the initial version to the target version.
- **Performance:** Indexes are included in scripts as needed. Adding custom indexes may affect future upgrades.
