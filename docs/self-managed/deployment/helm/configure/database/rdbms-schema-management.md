---
id: rdbms-schema-management
sidebar_label: Schema management
title: Schema creation and management
description: "Manage database schemas for RDBMS deployments using Liquibase or SQL scripts."
---

This page covers schema creation, upgrades, and management for RDBMS deployments. For configuration reference and troubleshooting, see [configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md).

:::note Related pages

- **[Access SQL and Liquibase scripts](access-sql-liquibase-scripts.md)** - Where to find and download schema scripts.
- **[Validate RDBMS connectivity](validate-rdbms.md)** - Verify schema and exporter after deployment.
- **[JDBC drivers](rdbms-jdbc-drivers.md)** - Managing database drivers.
  :::

## Automatic schema creation (autoDDL)

By default, `autoDDL: true` enables automatic schema creation via Liquibase. This happens at pod startup:

1. Liquibase detects that the schema does not exist or is outdated.
2. Liquibase executes all SQL migrations to initialize the schema.
3. The exporter begins writing data.

**Prerequisites for autoDDL:**

For all databases, the database user must have `CREATE TABLE`, `ALTER TABLE`, and `DROP TABLE` permissions.

Additional database-specific requirements:

- **PostgreSQL**: `CREATE` permission on the database.
- **Oracle**: `CREATE TABLE` and `TABLESPACE` (if using non-default tablespaces).
- **SQL Server**: `CREATE TABLE`, `ALTER TABLE`, and `CONTROL` on the schema.
- **MariaDB/MySQL**: `ALL PRIVILEGES` on the target database.

## Database user permissions

### PostgreSQL

```sql
CREATE ROLE camunda WITH LOGIN PASSWORD 'password';
GRANT CONNECT ON DATABASE camunda TO camunda;
GRANT USAGE ON SCHEMA public TO camunda;
GRANT CREATE ON DATABASE camunda TO camunda;
```

### Oracle

```sql
CREATE USER camunda IDENTIFIED BY password;
GRANT CREATE TABLE TO camunda;
GRANT UNLIMITED TABLESPACE TO camunda;
```

### MariaDB/MySQL

```sql
CREATE USER camunda@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON camunda.* TO camunda@'%';
FLUSH PRIVILEGES;
```

### SQL Server

```sql
CREATE LOGIN camunda WITH PASSWORD = 'password';
CREATE USER camunda FOR LOGIN camunda;
GRANT CREATE TABLE TO camunda;
GRANT ALTER ON SCHEMA::dbo TO camunda;
```

## Manual schema management

If your database is managed by a dedicated DBA, disable autoDDL and manage schema updates manually:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        autoDDL: false
```

With `autoDDL: false`, you must:

1. Apply SQL scripts to the database before deploying Camunda.
2. SQL scripts are available in the Camunda release bundle or from the [Liquibase scripts page](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

### When to use manual schema management

- Your organization requires a separate schema deployment phase.
- A dedicated DBA manages the database and DDL changes.
- You need to validate schema changes before applying them to production.

## Schema verification

After initial deployment or upgrade, verify the schema:

```sql
-- PostgreSQL: Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- MySQL/MariaDB: Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = DATABASE();

-- Oracle: Check tables
SELECT table_name FROM user_tables;

-- SQL Server: Check tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'dbo';
```

Expected tables include process instances, history, and metadata tables (roughly 20-30 total).

You can also verify by checking logs:

```bash
kubectl logs <pod-name> | grep -i liquibase
```

Success indicators:

```
io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS
org.springframework.web.servlet.DispatcherServlet - Completed initialization in X ms
```

## Upgrading the schema

When upgrading Camunda versions:

### Step 1: Backup your database

Backup your database before upgrading. Use your database vendor's native tools:

- **PostgreSQL**: [pg_dump documentation](https://www.postgresql.org/docs/current/app-pgdump.html)
- **Oracle**: [EXPDP documentation](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-data-pump-export-utility.html)
- **MySQL/MariaDB**: [mysqldump documentation](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- **SQL Server**: [SQL Server backup documentation](https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases)

### Step 2: Test the upgrade in staging

Deploy the new Camunda version in a staging environment first to validate schema migrations.

### Step 3: Scale down deployment (optional but recommended)

For large production clusters, scale down to avoid connection pool exhaustion during migration:

```bash
kubectl scale deployment camunda-orchestration --replicas=0 -n camunda
```

### Step 4: Deploy the new Camunda version

```bash
helm upgrade camunda camunda/camunda-platform --version X.Y.Z -f values.yaml -n camunda
```

Liquibase will automatically apply new migrations if `autoDDL: true`.

### Step 5: Scale back up

```bash
kubectl scale deployment camunda-orchestration --replicas=3 -n camunda
```

Monitor the rollout:

```bash
kubectl rollout status deployment/camunda-orchestration -n camunda
```

### Step 6: Verify schema initialization

Verify that Liquibase completed the schema migration successfully by checking logs:

```bash
kubectl logs <pod-name> | grep -i liquibase
```

Look for "Liquibase: Update successful" or similar completion messages. If the migration fails, Liquibase will log the specific error.

You can also verify schema initialization by checking the `databasechangelog` table:

```sql
-- Verify Liquibase changelog table exists and contains entries
SELECT COUNT(*) FROM databasechangelog;
```

This table should exist and contain entries for a fresh Camunda 8.9 installation. On upgrades, this number increases as new changesets are applied.

For troubleshooting, see [schema troubleshooting](#schema-troubleshooting).

## Schema troubleshooting

### Liquibase lock issues

If a previous schema migration failed, Liquibase may hold a lock:

```sql
-- PostgreSQL/MariaDB: Release the lock
DELETE FROM databasechangeloglock WHERE locked = true;

-- Oracle: Connect as schema owner and release
DELETE FROM databasechangeloglock WHERE locked = 1;
```

Then redeploy.

### Permission errors during autoDDL

**Symptom:** Logs show "permission denied" or "cannot create table."

**Fix:** Verify database user has DDL permissions (see [Database user permissions](#database-user-permissions) above).

### Out-of-sync schema

If your schema doesn't match the expected version:

1. Check Liquibase logs for failed migrations.
2. Restore from backup if necessary.
3. Manually apply missing SQL scripts from the [Liquibase scripts page](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## Liquibase resource access

SQL migration scripts and Liquibase change logs are available in the Camunda release bundle. For details on accessing these resources, see [access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).
