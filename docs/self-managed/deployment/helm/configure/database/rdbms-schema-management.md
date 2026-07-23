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
  extraConfiguration:
    - file: "manual-schema-management.yaml"
      content: |
        camunda:
          data:
            secondary-storage:
              rdbms:
                auto-ddl: false
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

Expected tables include workflow and history tables (for example, `process_instance`, `variable`, and `job`) and Liquibase metadata tables like `databasechangelog` and `databasechangeloglock`.

You can also verify by checking logs:

```bash
kubectl logs <pod-name> | grep -i liquibase
```

Success indicators:

```
INFO  io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS
INFO  org.springframework.web.servlet.DispatcherServlet - Completed initialization in X ms
```

## Upgrading the schema

When upgrading Camunda versions, choose the schema migration path that matches your `autoDDL` configuration.

### Step 1: Prepare for the upgrade

Before upgrading the production cluster, perform the following steps:

#### Back up your database

Back up your database before upgrading. Use your database vendor's native tools:

- **PostgreSQL**: [pg_dump documentation](https://www.postgresql.org/docs/current/app-pgdump.html)
- **Oracle**: [EXPDP documentation](https://docs.oracle.com/en/database/oracle/oracle-database/sutil/oracle-data-pump-export-utility.html)
- **MySQL**: [mysqldump documentation](https://dev.mysql.com/doc/refman/en/mysqldump.html)
- **MariaDB**: [mariadb-dump documentation](https://mariadb.com/kb/en/mariadb-dump/)
- **SQL Server**: [SQL Server backup documentation](https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases)

#### Test the upgrade in staging

Deploy the new Camunda version in a staging environment first to validate schema migrations.

### Step 2a: Automatic schema management

If `autoDDL: true`, Liquibase applies schema migrations automatically when an upgraded Camunda orchestration pod starts.

Camunda supports rolling upgrades for RDBMS deployments. During the upgrade, the first upgraded cluster node applies the
schema changes. Liquibase holds a lock on the database schema while the migration runs, and other cluster nodes wait for
the lock to be released before they start.

(Optional) For large production clusters, reduce the orchestration deployment to one replica before the upgrade so only
one upgraded pod starts the Liquibase migration:

```bash
kubectl scale deployment camunda-orchestration --replicas=1 -n camunda
```

:::note
This reduces processing capacity during the upgrade because only one orchestration replica remains. The schema
migration is performed when the first upgraded cluster node starts.
:::

Keep the effective replica count at `1` until Liquibase completes. If your Helm values manage the replica count, make
sure the upgrade does not restore the larger replica count before the migration finishes.

Deploy the new Camunda version:

```bash
helm upgrade camunda camunda/camunda-platform --version X.Y.Z -f values.yaml -n camunda
```

For large databases and long-running schema migrations, review [Liquibase lock issues](#liquibase-lock-issues) before
upgrading. You might need to increase the DDL lock wait timeout so a long-running migration is not treated as stale.

The Helm chart defines a default `readinessProbe`. Longer-running migrations may cause the pod to be marked as not ready. If this happens, you can increase the `readinessProbe` timeout in your Helm values:

```yaml
orchestration:
  readinessProbe:
    # Wait 300 + 30 * 20 = 900 seconds (15m) until the pod is marked as not ready
    initialDelaySeconds: 300
    periodSeconds: 30
    failureThreshold: 20
```

After Liquibase completes, scale the orchestration deployment back to your desired replica count:

```bash
kubectl scale deployment camunda-orchestration --replicas=3 -n camunda
```

:::note
The RDBMS upgrade is a rolling upgrade and does not require downtime of the orchestration cluster. Some schema
operations might take longer to complete when the cluster and database is under load. If you experience long-running
migrations, consider reducing the client-side load of the orchestration cluster or scale down the cluster to 0 nodes
before the upgrade.
:::

### Step 2b: Migrate the schema manually with SQL scripts

If `autoDDL: false`, apply the SQL migration scripts before or during the Camunda version upgrade. The SQL scripts are
forward compatible with the previous Camunda version, so you can apply them while the existing cluster is running.

(Optional) Scale the orchestration deployment to zero replicas if your maintenance process requires the application to
stop before schema changes are applied:

```bash
kubectl scale deployment camunda-orchestration --replicas=0 -n camunda
```

Apply the SQL scripts from the Camunda release bundle or from
the [Liquibase scripts page](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md), then
deploy the new Camunda version:

```bash
helm upgrade camunda camunda/camunda-platform --version X.Y.Z -f values.yaml -n camunda
```

If you scaled the deployment to zero replicas, scale the orchestration deployment back to your desired replica count
after the upgrade:

```bash
kubectl scale deployment camunda-orchestration --replicas=3 -n camunda
```

Monitor the rollout:

```bash
kubectl rollout status deployment/camunda-orchestration -n camunda
```

### Step 3: Verify schema initialization

Verify that Liquibase completed the schema migration successfully by checking logs:

```bash
kubectl logs <pod-name> | grep -i liquibase
```

Look for "Liquibase: Update successful" or similar completion messages. If the migration fails, Liquibase will log the
specific error.

You can also verify schema initialization by checking the `databasechangelog` table:

```sql
-- Verify Liquibase changelog table exists and contains entries
SELECT COUNT(*)
FROM databasechangelog;
```

This table should exist and contain entries for a fresh Camunda installation. On upgrades, this number increases as
new changesets are applied.

For troubleshooting, see [schema troubleshooting](#schema-troubleshooting).

## Rolling upgrades

Rolling upgrades are available for RDBMS deployments that use Liquibase schema migration. For upgrade steps and optional
scaling guidance, see [automatic schema management](#step-2a-automatic-schema-management).

### Rollback

Camunda schema migrations are compatible with the previous version. This means that if you need to stop an upgrade and
rollback to a previous version, you can do so without any issues. The previous version will be able to read the schema
and continue processing.

## Schema troubleshooting

### Liquibase lock issues

If a previous schema migration failed, Liquibase may hold a lock.

Camunda waits for stale Liquibase DDL locks using `camunda.data.secondary-storage.rdbms.ddl-lock-wait-timeout` (default: `PT15M`).
For large schema changes, you can increase this timeout so a long-running migration is not treated as stale. See [RDBMS troubleshooting](/self-managed/deployment/helm/configure/database/rdbms-troubleshooting.md#liquibase-lock-after-pod-crash-or-restart).

Only release the lock manually after confirming no migration is currently running:

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
